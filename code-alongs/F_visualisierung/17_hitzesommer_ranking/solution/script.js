/**
 * Code-Along 17: Rangliste und Interaktion im Browser – Lösung
 *
 * Für Dozierende: Die Nummern verweisen auf die TODOs im Startcode
 * ../script.js. Kommentiert ist nur, was gegenüber Code-Along 16 neu ist –
 * der Rest ist wortgleich und dort erklärt.
 *
 * Was heute dazukommt:
 *
 *   1 Rangliste     ein zweites Diagramm, diesmal Balken
 *   2 Zeitraum      ein Schieber, der ohne Server auskommt
 *   3 Messwert      dieselben Diagramme, andere Zahl
 *
 * Diese Datei liegt in solution/, deshalb steht vor jeder URL ein `../`.
 *
 * WICHTIG: Auch die Lösung läuft nur auf dem Webserver. Hochladen und
 * https://eure-domain.ch/code-alongs/F_visualisierung/17_hitzesommer_ranking/solution/
 * öffnen.
 */

// ---------------------------------------------------------------------------
// Einstellungen
// ---------------------------------------------------------------------------

const MUSTERDATEN = '../data/heat-summers.json';
const ENDPUNKT = '../unload.php';

const DATEN_URL = ENDPUNKT;

// Jede Stadt behält in beiden Diagrammen dieselbe Farbe. Das ist keine
// Dekoration: Weil die Farbe in der Rangliste die Stadt benennt, braucht das
// zweite Diagramm keine eigene Legende.
const CITY_COLORS = {
  Bern: '#4b93a4',
  Chur: '#b5723a',
  Zürich: '#8b8a6e',
};

// TODO 5 (Teil 1): Die zwei Messwerte
//
// Die Schlüssel sind die Feldnamen aus dem Datenvertrag. Deshalb genügt weiter
// unten row[metric] – kein if, keine zweite Funktion. Wer einen dritten
// Messwert zeigen will, ergänzt hier einen Eintrag und im HTML einen Knopf.

const METRICS = {
  hot_days: {
    label: 'Hitzetage',
    unit: ' Tage',
    axis: 'Tage ab 30 °C',
  },
  max_temperature_c: {
    label: 'Höchste Temperatur',
    unit: ' °C',
    axis: 'Grad Celsius',
  },
};

// ---------------------------------------------------------------------------
// Zustand
// ---------------------------------------------------------------------------
//
// Aus einer Variablen sind drei geworden. Jede Interaktion ändert genau eine
// davon und ruft danach render() auf. Diese Trennung ist der Grund, warum drei
// Bedienelemente zwei Diagramme steuern können, ohne dass der Code
// unübersichtlich wird.

let summers = [];
let fromYear = 1940;
let metric = 'hot_days';

// ---------------------------------------------------------------------------
// Elemente
// ---------------------------------------------------------------------------

const citySelect = document.querySelector('#city');
const statusText = document.querySelector('#status');
const fromYearInput = document.querySelector('#from-year');
const fromYearValue = document.querySelector('#from-year-value');
const metricSwitch = document.querySelector('#metric');

// ---------------------------------------------------------------------------
// Holen – unverändert aus Code-Along 16
// ---------------------------------------------------------------------------

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

// ---------------------------------------------------------------------------
// Umformen
// ---------------------------------------------------------------------------

// TODO 3 (Teil 2): Der sichtbare Ausschnitt
//
// Der Schieber filtert im Browser, ohne den Server zu fragen. Bei 258
// Datensätzen ist das der richtige Weg: Die Daten sind schon da, ein zweiter
// Netzwerkaufruf würde nur warten lassen.
//
// Die Stadtauswahl macht es anders herum – und beides ist richtig. Der Server
// filtert, was viel ist; der Browser filtert, was schon da ist.

function visibleSummers() {
  return summers.filter((summer) => summer.year >= fromYear);
}

function yearsOf(rows) {
  return [...new Set(rows.map((row) => row.year))].sort((a, b) => a - b);
}

function cityNamesOf(rows) {
  return [...new Set(rows.map((row) => row.city))].sort();
}

function datasetFor(rows, city) {
  const cityRows = rows.filter((row) => row.city === city);

  return {
    label: city,

    // TODO 5 (Teil 4): Aus row.hot_days wird row[metric]. Das ist die ganze
    // Änderung – weil die Schlüssel in METRICS genau so heissen wie die Felder
    // im Datenvertrag.
    data: cityRows.map((row) => row[metric]),

    borderColor: CITY_COLORS[city] ?? '#575757',
    backgroundColor: CITY_COLORS[city] ?? '#575757',
    borderWidth: 2,
    tension: 0.3,
    pointRadius: 0,
    pointHoverRadius: 5,
  };
}

// TODO 1: Die Rangliste
//
// Zwei Schritte: sortieren, dann abschneiden.
//
// [...rows] macht eine Kopie, bevor sortiert wird. sort() verändert nämlich
// die Liste, auf der es aufgerufen wird. Hier kommt rows ohnehin frisch aus
// filter() – wer aber einmal summers direkt sortiert, hat die geladenen Daten
// dauerhaft umsortiert, und die Linie im ersten Diagramm springt.
//
// b - a sortiert absteigend, a - b aufsteigend. Bei einer Rangliste steht der
// grösste Wert oben.

function topSummers(rows, count = 10) {
  return [...rows]
    .sort((a, b) => b[metric] - a[metric])
    .slice(0, count);
}

// ---------------------------------------------------------------------------
// Zeichnen
// ---------------------------------------------------------------------------

const verlaufOptions = {
  responsive: true,
  maintainAspectRatio: false,
  interaction: { mode: 'index', intersect: false },
  scales: {
    x: {
      title: { display: true, text: 'Sommer' },
      ticks: { maxTicksLimit: 12 },
      grid: { display: false },
    },
    y: {
      beginAtZero: true,
      title: { display: true, text: '' },
    },
  },
  plugins: {
    legend: { position: 'bottom' },
    tooltip: {
      callbacks: {
        // Die Einheit kommt jetzt aus METRICS, weil sie wechseln kann.
        label: (item) =>
          `${item.dataset.label}: ${item.formattedValue}${METRICS[metric].unit}`,
      },
    },
  },
};

const ranglisteOptions = {
  responsive: true,
  maintainAspectRatio: false,

  // Der eine Unterschied zum stehenden Balkendiagramm. Die Beschriftungen
  // «2003 · Zürich» brauchen Platz, und den gibt es links.
  indexAxis: 'y',

  scales: {
    x: { beginAtZero: true, title: { display: true, text: '' } },
    y: { grid: { display: false } },
  },

  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (item) => `${item.formattedValue}${METRICS[metric].unit}`,
      },
    },
  },
};

const verlaufChart = new Chart(document.querySelector('#verlauf'), {
  type: 'line',
  data: { labels: [], datasets: [] },
  options: verlaufOptions,
});

// TODO 2 (Teil 1): Das zweite Diagramm
//
// Gleiche Form wie oben, nur type: 'bar'. Auch hier gilt die Regel aus
// Code-Along 16: einmal erzeugen, danach aktualisieren.

const ranglisteChart = new Chart(document.querySelector('#rangliste'), {
  type: 'bar',
  data: { labels: [], datasets: [] },
  options: ranglisteOptions,
});

// render() ist weiterhin die einzige Stelle, die Diagramme anfasst. Egal was
// sich geändert hat – Stadt, Zeitraum oder Messwert – hier wird aus dem
// aktuellen Zustand das aktuelle Bild.

function render() {
  // TODO 3 (Teil 4): Ab hier wird nicht mehr mit allen geladenen Sommern
  // gearbeitet, sondern nur noch mit dem sichtbaren Ausschnitt.
  const rows = visibleSummers();

  // --- Verlauf ---
  verlaufChart.data.labels = yearsOf(rows);
  verlaufChart.data.datasets = cityNamesOf(rows).map((city) => datasetFor(rows, city));

  // TODO 5 (Teil 5): Die Achse beschriftet sich nach dem gewählten Messwert.
  verlaufChart.options.scales.y.title.text = METRICS[metric].axis;

  // Eine Anzahl beginnt bei null, sonst wirkt jede Schwankung wie ein Sprung.
  // Bei Temperaturen wäre die Null dagegen sinnlos: Zwischen 0 und 26 Grad
  // passiert in diesen Daten nichts, und die Unterschiede verschwinden.
  verlaufChart.options.scales.y.beginAtZero = metric === 'hot_days';

  verlaufChart.update();

  // --- Rangliste ---
  // TODO 2 (Teil 2)
  const top = topSummers(rows);

  ranglisteChart.data.labels = top.map((row) => `${row.year} · ${row.city}`);
  ranglisteChart.data.datasets = [
    {
      label: METRICS[metric].label,
      data: top.map((row) => row[metric]),

      // Ein Balken pro Sommer, gefärbt nach Stadt. Deshalb ist
      // backgroundColor hier eine Liste und keine einzelne Farbe.
      backgroundColor: top.map((row) => CITY_COLORS[row.city] ?? '#575757'),
      borderWidth: 0,
    },
  ];
  ranglisteChart.options.scales.x.title.text = METRICS[metric].axis;

  ranglisteChart.update();
}

// ---------------------------------------------------------------------------
// Reagieren
// ---------------------------------------------------------------------------

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

// Der Weg über den Server – unverändert aus Code-Along 16.
citySelect.addEventListener('change', reload);

// TODO 4: Der Zeitraum bleibt im Browser
//
// Kein fetch(), kein Warten: Der Zustand ändert sich, render() zeichnet neu.
// Genau das sagt der Hinweis «rechnet nur im Browser» unter dem Schieber.
//
// input feuert während des Ziehens, change erst beim Loslassen. Weil hier
// nichts nachgeladen wird, darf es die schnellere Variante sein.

fromYearInput.addEventListener('input', () => {
  fromYear = Number(fromYearInput.value);
  fromYearValue.textContent = fromYear;
  render();
});

// TODO 6: Der Messwert ebenfalls
//
// Ein Listener pro Knopf. Der geklickte bekommt die Klasse is-active, die
// anderen verlieren sie – so weiss die Leserin, was gerade gezeigt wird.

for (const button of metricSwitch.querySelectorAll('button')) {
  button.addEventListener('click', () => {
    metric = button.dataset.metric;

    for (const other of metricSwitch.querySelectorAll('button')) {
      other.classList.toggle('is-active', other === button);
    }

    render();
  });
}

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

reload();
