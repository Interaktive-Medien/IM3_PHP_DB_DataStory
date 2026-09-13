# Chart.js – Daten zeichnen

> Block F · Code-Alongs `16_hitzesommer_liniendiagramm`,
> `17_hitzesommer_ranking`, `18_sharkdaten_balkendiagramm`

Ab hier läuft alles im Browser, also in JavaScript. Der eigene Endpunkt aus
[Block E](E1_unload.md) ist die Datenquelle.

## Erst die Aussage, dann der Diagrammtyp

| Absicht | Typ |
| --- | --- |
| Verlauf über die Zeit | `line` |
| Werte vergleichen, Rangliste | `bar` |
| Anteile an einem Ganzen | `pie`, `doughnut` – nur bei wenigen Kategorien |
| Zusammenhang zweier Werte | `scatter` |

Chart.js kennt keine Karten, keine Sankey-Diagramme und keine Netzwerke. Für
Karten gibt es [Leaflet](F2_leaflet.md).

## Einbinden

```html
<script src="https://cdn.jsdelivr.net/npm/chart.js@4.5.1/dist/chart.umd.min.js"></script>
<script src="script.js" type="module"></script>

<div class="chart-box">
  <canvas id="verlauf"></canvas>
</div>
```

Chart.js zeichnet in ein `<canvas>`. Die Höhe kommt aus CSS, nicht aus dem
HTML-Attribut.

Die Seite muss auf dem Webserver laufen: hochladen und über die eigene Domain
öffnen. Per Doppelklick oder über `localhost` kommt von `unload.php` kein JSON.

## Daten holen

```js
async function loadSummers(city) {
  const url = city === 'alle'
    ? DATEN_URL
    : `${DATEN_URL}?city=${encodeURIComponent(city)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Der Endpunkt antwortet mit Status ${response.status}.`);
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    throw new Error(
      'Die Antwort ist kein JSON. Öffne unload.php direkt im Browser.',
    );
  }

  return await response.json();
}
```

Zwei Prüfungen, die man am häufigsten vergisst:

- `response.ok` – `fetch()` wirft **keinen** Fehler bei 404 oder 500. Es ist ja
  eine Antwort angekommen.
- der Content-Type – fängt genau den Fall ab, dass der Server das PHP nicht
  ausgeführt hat. Ohne diese Prüfung meldet der Browser «Unexpected token '<'»,
  und alle suchen im JavaScript.

`encodeURIComponent()` macht aus «Zürich» das, was in eine URL gehört.

### Musterdaten als Fallback

```js
const MUSTERDATEN = '../data/heat-summers.json';
const ENDPUNKT = '../unload.php';

const DATEN_URL = ENDPUNKT;
```

Die Musterdatei hat exakt dieselbe Form wie die Antwort des Endpunkts. Damit
lässt sich das Frontend bauen, bevor das Backend fertig ist – und sie ist der
Notvorrat für den Marktstand.

## Umformen: Datensätze werden labels und datasets

Chart.js will keine Datensätze, sondern zwei Listen:

```text
[{city: 'Bern', year: 1940, hot_days: 0}, …]     was der Endpunkt liefert
labels: [1940, 1941, …]   data: [0, 2, …]         was Chart.js braucht
```

Beide müssen gleich lang sein und in derselben Reihenfolge stehen.

```js
// Jedes Jahr kommt dreimal vor, einmal pro Stadt. Set wirft Wiederholungen weg.
function yearsOf(rows) {
  return [...new Set(rows.map((row) => row.year))].sort((a, b) => a - b);
}

function cityNamesOf(rows) {
  return [...new Set(rows.map((row) => row.city))].sort();
}

// Ein «dataset» ist eine Linie: die Zahlen plus ihr Aussehen.
function datasetFor(rows, city) {
  const cityRows = rows.filter((row) => row.city === city);

  return {
    label: city,
    data: cityRows.map((row) => row.hot_days),
    borderColor: CITY_COLORS[city] ?? '#575757',
    backgroundColor: CITY_COLORS[city] ?? '#575757',
    borderWidth: 2,
    tension: 0.3,
    pointRadius: 0,
    pointHoverRadius: 5,
  };
}
```

`sort((a, b) => a - b)` ist nötig: Ohne Vergleichsfunktion sortiert
JavaScript als **Text**, und dann kommt 10 vor 9.

Dass die Werte zu den Jahren passen, hängt an zwei Voraussetzungen: Der
Endpunkt sortiert nach Jahr (`ORDER BY`), und jede Stadt hat jedes Jahr. Bei
lückenhaften Daten muss man pro Jahr nachschlagen statt abzuzählen.

## Einmal erzeugen, danach aktualisieren

```js
const verlaufChart = new Chart(document.querySelector('#verlauf'), {
  type: 'line',
  data: { labels: [], datasets: [] },
  options: verlaufOptions,
});

function render() {
  verlaufChart.data.labels = yearsOf(summers);
  verlaufChart.data.datasets = cityNamesOf(summers).map((city) => datasetFor(summers, city));

  verlaufChart.update();
}
```

Der wichtigste Satz des Blocks: **Ein Diagramm wird einmal erzeugt und danach
aktualisiert.** `new Chart()` ein zweites Mal auf demselben Canvas gibt «Canvas
is already in use». Wer stattdessen jedes Mal `destroy()` aufruft, verliert
Animation und Legendenzustand.

`render()` ist die einzige Stelle, die das Diagramm anfasst.

## Ein Zustand, eine Zeichenfunktion

```js
let summers = [];
let fromYear = 1940;
let metric = 'hot_days';
```

Jede Bedienung ändert genau eine dieser Variablen und ruft danach `render()`
auf. So steuern drei Bedienelemente zwei Diagramme, ohne dass der Code
unübersichtlich wird.

### Zwei Sorten Interaktion

| Wer filtert | Wann | Beispiel |
| --- | --- | --- |
| der Server | wenn die Datenmenge gross ist | Stadtauswahl → `?city=Bern` → `reload()` |
| der Browser | wenn die Daten schon da sind | Jahres-Schieber → `filter()` → `render()` |

```js
citySelect.addEventListener('change', reload);      // holt neu

fromYearInput.addEventListener('input', () => {     // zeichnet nur neu
  fromYear = Number(fromYearInput.value);
  render();
});
```

## Fehler und leere Antworten anzeigen

```js
async function reload() {
  statusText.textContent = 'Daten werden geladen …';

  try {
    summers = await loadSummers(citySelect.value);

    statusText.textContent = summers.length === 0
      ? 'Für diese Auswahl gibt es keine Daten.'
      : `${summers.length} Sommer geladen.`;

    render();
  } catch (error) {
    console.error(error);
    statusText.textContent = `Die Daten konnten nicht geladen werden. ${error.message}`;
  }
}
```

Zwei Adressaten wie im Backend: die genaue Meldung in die Konsole, ein
verständlicher Satz auf die Seite. Ein leeres Diagramm ohne Text sieht aus wie
ein Programmfehler.

## Balkendiagramm und Rangliste

```js
const ranglisteChart = new Chart(document.querySelector('#rangliste'), {
  type: 'bar',
  data: { labels: [], datasets: [] },
  options: {
    responsive: true,
    maintainAspectRatio: false,
    indexAxis: 'y',        // liegende Balken – lange Beschriftungen haben links Platz
    scales: { x: { beginAtZero: true }, y: { grid: { display: false } } },
    plugins: { legend: { display: false } },
  },
});

function topSummers(rows, count = 10) {
  return [...rows]                                // Kopie: sort() verändert das Original
    .sort((a, b) => b[metric] - a[metric])        // b - a = absteigend
    .slice(0, count);
}
```

## Die Optionen, die wir brauchen

```js
const verlaufOptions = {
  responsive: true,
  maintainAspectRatio: false,   // zusammen mit einer festen Höhe in CSS

  interaction: { mode: 'index', intersect: false },   // zeigt alle Städte eines Jahres

  scales: {
    x: {
      title: { display: true, text: 'Sommer' },
      ticks: { maxTicksLimit: 12 },
      grid: { display: false },
    },
    y: {
      beginAtZero: true,        // eine Anzahl beginnt bei null
      title: { display: true, text: 'Tage ab 30 °C' },
    },
  },

  plugins: {
    legend: { position: 'bottom' },
    tooltip: {
      callbacks: {
        label: (item) => `${item.dataset.label}: ${item.formattedValue} Tage`,
      },
    },
  },
};
```

`beginAtZero` ist keine technische, sondern eine journalistische Entscheidung:
Bei einer abgeschnittenen Achse wirkt jede Schwankung wie ein Sprung.

## Häufige Fehler

| Symptom | Ursache |
| --- | --- |
| «Canvas is already in use» | `new Chart()` läuft mehrmals auf demselben Canvas |
| «Unexpected token '<'» | Der Endpunkt hat kein JSON geliefert – siehe die Content-Type-Prüfung |
| Das Diagramm wird immer höher | `maintainAspectRatio: false` ohne feste Höhe in CSS |
| Die X-Achse ist unsortiert | `sort()` ohne Vergleichsfunktion, oder `ORDER BY` fehlt im SQL |
| Leere Seite beim Doppelklick auf `index.html` | Die Seite muss über die eigene Domain geöffnet werden |

## Verwandte Cheatsheets

- [E1 Unload](E1_unload.md) – der Endpunkt, den das Frontend abfragt
- [F2 Leaflet](F2_leaflet.md) – Karten
