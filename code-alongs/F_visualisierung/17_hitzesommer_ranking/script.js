/**
 * Code-Along 17: Rangliste und Interaktion im Browser
 *
 * Dieser Startcode ist der fertige Stand von Code-Along 16: Die Seite lädt den
 * Endpunkt, zeichnet ein Liniendiagramm und reagiert auf die Stadtauswahl.
 * Alles darunter läuft bereits – heute kommt Neues dazu.
 *
 * Drei Bausteine, sechs TODO-Marken:
 *
 *   1 Rangliste     ein zweites Diagramm, diesmal Balken
 *   2 Zeitraum      ein Schieber, der ohne Server auskommt
 *   3 Messwert      dieselben Diagramme, andere Zahl
 *
 * Der rote Faden: In Code-Along 16 hat jede Interaktion den Server gefragt.
 * Heute lernen wir die zweite Sorte kennen – Bedienelemente, die nur mit den
 * Daten rechnen, die schon im Browser liegen. Die Hinweise unter den
 * Bedienelementen sagen jeweils, welche Sorte es ist.
 *
 * ---------------------------------------------------------------------------
 * WICHTIG: Die Seite läuft auf dem Webserver.
 * ---------------------------------------------------------------------------
 *
 * In PhpStorm speichern, damit die Datei per FTP hochgeladen wird, und die
 * Seite über die eigene Domain öffnen:
 *
 *   https://eure-domain.ch/code-alongs/F_visualisierung/17_hitzesommer_ranking/
 *
 * In der Adressleiste steht eure Domain. Steht dort localhost oder file://,
 * läuft nicht der Stand auf dem Server. Per Doppelklick geöffnet (file://)
 * bleibt die Seite ganz leer, weil der Browser das Modul gar nicht lädt.
 *
 * Das HTML ist fertig. Neu dazugekommen sind:
 *
 *   #from-year        Schieber von 1940 bis 2010
 *   #from-year-value  zeigt die eingestellte Jahreszahl an
 *   #metric           zwei Knöpfe mit data-metric="hot_days" bzw.
 *                     "max_temperature_c"
 *   #rangliste        Canvas für das Balkendiagramm
 */

// ---------------------------------------------------------------------------
// Einstellungen
// ---------------------------------------------------------------------------

const MUSTERDATEN = 'data/heat-summers.json';
const ENDPUNKT = 'unload.php';

const DATEN_URL = ENDPUNKT;

const CITY_COLORS = {
  Bern: '#4b93a4',
  Chur: '#b5723a',
  Zürich: '#8b8a6e',
};

// TODO 5 (Teil 1): Die zwei Messwerte beschreiben.
//         Die Schlüssel sind die Feldnamen aus dem Datenvertrag – dann genügt
//         später row[metric], um an den richtigen Wert zu kommen.
//         Pro Messwert brauchen wir: einen Namen, eine Einheit für den
//         Tooltip und eine Achsenbeschriftung.

// ---------------------------------------------------------------------------
// Zustand: was gerade zu sehen ist
// ---------------------------------------------------------------------------
//
// Jede Interaktion ändert genau eine dieser Variablen und ruft danach
// render() auf. Deshalb bleibt der Code übersichtlich, obwohl am Schluss drei
// Bedienelemente zwei Diagramme steuern.

let summers = [];

// TODO 3 (Teil 1) und TODO 5 (Teil 2): zwei weitere Zustandsvariablen für das
//         gewählte Startjahr und den gewählten Messwert.

// ---------------------------------------------------------------------------
// Elemente
// ---------------------------------------------------------------------------

const citySelect = document.querySelector('#city');
const statusText = document.querySelector('#status');

// TODO 3 und 5 (Teil 3): die neuen Bedienelemente holen
//         #from-year, #from-year-value und #metric

// ---------------------------------------------------------------------------
// Holen – fertig aus Code-Along 16
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

// TODO 3 (Teil 2): Den sichtbaren Ausschnitt bestimmen.
//         visibleSummers() gibt alle Sommer ab dem gewählten Startjahr
//         zurück. Danach arbeitet render() nur noch mit diesem Ausschnitt.

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

    // TODO 5 (Teil 4): statt fest hot_days den gewählten Messwert nehmen.
    data: cityRows.map((row) => row.hot_days),

    borderColor: CITY_COLORS[city] ?? '#575757',
    backgroundColor: CITY_COLORS[city] ?? '#575757',
    borderWidth: 2,
    tension: 0.3,
    pointRadius: 0,
    pointHoverRadius: 5,
  };
}

// TODO 1: Die zehn stärksten Sommer bestimmen.
//         Sortieren, dann abschneiden. Achtung: sort() verändert die Liste,
//         auf der es aufgerufen wird – deshalb zuerst eine Kopie machen.

function topSummers(rows, count = 10) {
  return [];
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

// Die Einstellungen für das Balkendiagramm sind schon vorbereitet. Der eine
// Unterschied zum stehenden Balkendiagramm ist indexAxis: 'y' – die
// Beschriftungen «2003 · Zürich» brauchen Platz, und den gibt es links.

const ranglisteOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',
  scales: {
    x: { beginAtZero: true, title: { display: true, text: 'Tage ab 30 °C' } },
    y: { grid: { display: false } },
  },
  plugins: {
    // Eine einzige Reihe braucht keine Legende.
    legend: { display: false },
    tooltip: {
      callbacks: {
        label: (item) => `${item.formattedValue} Tage`,
      },
    },
  },
};

const verlaufChart = new Chart(document.querySelector('#verlauf'), {
  type: 'line',
  data: { labels: [], datasets: [] },
  options: verlaufOptions,
});

// TODO 2 (Teil 1): Das Balkendiagramm einmal erzeugen – leer.
//         Gleiche Form wie oben, nur type: 'bar' und ranglisteOptions.

function render() {
  verlaufChart.data.labels = yearsOf(summers);
  verlaufChart.data.datasets = cityNamesOf(summers).map((city) => datasetFor(summers, city));

  verlaufChart.update();

  // TODO 2 (Teil 2): Die Rangliste füllen.
  //         labels: `${row.year} · ${row.city}` für jeden der zehn Sommer.
  //         Ein dataset mit den Werten und einer Farbe pro Balken – die Stadt
  //         soll dieselbe Farbe behalten wie im Diagramm darüber.

  // TODO 3 (Teil 4): Beide Diagramme sollen nur noch den sichtbaren
  //         Ausschnitt zeigen, nicht mehr alle geladenen Sommer.

  // TODO 5 (Teil 5): Achsenbeschriftungen an den gewählten Messwert anpassen.
  //         Und: beginAtZero gehört zu einer Anzahl, nicht zu Temperaturen.
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

citySelect.addEventListener('change', reload);

// TODO 4: Den Schieber anschliessen.
//         Er ändert das Startjahr, schreibt die Zahl neben die Beschriftung
//         und zeichnet neu – ohne fetch(). Den Netzwerk-Tab dabei offen
//         lassen: Er bleibt still.

// TODO 6: Die Messwert-Knöpfe anschliessen.
//         Der geklickte Knopf bekommt die Klasse is-active, die anderen
//         verlieren sie. Auch hier: nur render(), kein fetch().

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

reload();
