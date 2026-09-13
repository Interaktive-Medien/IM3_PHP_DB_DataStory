/**
 * Code-Along 18: Hai-Ranglisten als Balkendiagramm – Lösung
 *
 * Für Dozierende: Die Nummern verweisen auf die TODOs im Startcode
 * ../script.js. Kommentiert ist vor allem, was gegenüber den Code-Alongs 16
 * und 17 neu ist.
 *
 * Drei Unterschiede zum Hitzesommer:
 *
 *   1. Diese Daten haben keine Zeitachse – eine Linie wäre hier falsch.
 *   2. Die Beschriftungen sind lang, also müssen die Balken liegen.
 *   3. Der Endpunkt kann eine Anfrage ablehnen, und diese Begründung zeigen wir.
 *
 * Diese Datei liegt in solution/, deshalb steht vor jeder URL ein `../`.
 *
 * WICHTIG: Auch die Lösung läuft nur auf dem Webserver. Hochladen und
 * https://eure-domain.ch/code-alongs/F_visualisierung/18_sharkdaten_balkendiagramm/solution/
 * öffnen.
 */

// ---------------------------------------------------------------------------
// Einstellungen
// ---------------------------------------------------------------------------

const MUSTERDATEN = '../data/shark-rankings.json';
const ENDPUNKT = '../unload.php';

const DATEN_URL = ENDPUNKT;

// Platz 1 ist die Geschichte, der Rest ist der Vergleich dazu. Deshalb zwei
// Farben statt zehn: Farbe bedeutet hier «wichtig» und nicht «anders».
const FARBE_ERSTER = '#4b93a4';
const FARBE_REST = '#b7cfd6';

// Zu jeder Rangliste gehört ein eigener Titel. Der Datenvertrag liefert nur
// die technischen Schlüssel – die lesbaren Texte stehen hier.
const RANGLISTEN = {
  shark_category: {
    title: 'Welche Hai-Arten sind erfasst?',
    note: 'Nur Vorfälle, bei denen die Art bestimmt werden konnte.',
  },
  activity_group: {
    title: 'Was haben die Menschen im Wasser gemacht?',
    note: 'Zusammengefasste Tätigkeiten aus den Freitextangaben.',
  },
};

// ---------------------------------------------------------------------------
// Zustand
// ---------------------------------------------------------------------------

let rankings = [];

// ---------------------------------------------------------------------------
// Elemente
// ---------------------------------------------------------------------------

const dimensionSelect = document.querySelector('#dimension');
const statusText = document.querySelector('#status');
const chartTitle = document.querySelector('#chart-title');
const chartNote = document.querySelector('#chart-note');

// ---------------------------------------------------------------------------
// TODO 1 und 2: Holen und die Fehlerantwort lesen
// ---------------------------------------------------------------------------
//
// Der Anfang ist derselbe wie beim Hitzesommer. Neu ist, was im Fehlerfall
// passiert.
//
// Der Endpunkt aus Code-Along 15 lehnt einen unbekannten Wert mit Status 400
// ab und schickt dabei eine Begründung mit:
//
//   {"error": "Unbekannte Rangliste.", "allowed": ["shark_category", ...]}
//
// Genau dafür haben wir sie damals geschrieben. Wer hier nur «Fehler beim
// Laden» anzeigt, wirft die beste Information weg, die der Server hat.
//
// .catch(() => null) fängt den Fall ab, dass im Fehlerfall gar kein JSON
// zurückkommt – etwa bei einer HTML-Fehlerseite des Webservers.

async function loadRankings(dimension) {
  const response = await fetch(`${DATEN_URL}?dimension=${encodeURIComponent(dimension)}`);

  if (!response.ok) {
    const problem = await response.json().catch(() => null);

    throw new Error(problem?.error ?? `Der Endpunkt antwortet mit Status ${response.status}.`);
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    throw new Error('Die Antwort ist kein JSON. Öffne unload.php direkt im Browser.');
  }

  return await response.json();
}

// ---------------------------------------------------------------------------
// TODO 3: Umformen
// ---------------------------------------------------------------------------
//
// Warum filtern wir hier noch einmal, wo doch der Endpunkt schon filtert?
//
// Wegen der Musterdatei: Sie enthält beide Ranglisten, und ein ?dimension= in
// der URL wirkt auf eine statische Datei nicht. Mit dieser einen Zeile
// funktioniert die Seite mit beiden Quellen – und damit auch als Fallback am
// Marktstand, wenn die Datenbank streikt.
//
// Sortieren müssen wir nicht: Der Endpunkt liefert nach rank_position
// sortiert. Genau dafür steht dort das ORDER BY.

function forDimension(rows, dimension) {
  return rows.filter((row) => row.dimension === dimension);
}

// TODO 4: Die Farbe trägt eine Aussage
//
// Ein Balken pro Kategorie, aber nur Platz 1 in der kräftigen Farbe. Deshalb
// ist backgroundColor eine Liste und keine einzelne Farbe.

function colorsFor(rows) {
  return rows.map((row) => (row.rank === 1 ? FARBE_ERSTER : FARBE_REST));
}

// Der Anteil an allen erfassten Vorfällen dieser Rangliste. Rechnen darf das
// Frontend – es sind zehn Zahlen, und dafür lohnt sich kein zweiter Endpunkt.

function sharesFor(rows) {
  const total = rows.reduce((sum, row) => sum + row.incidents, 0);

  return rows.map((row) => Math.round((row.incidents / total) * 1000) / 10);
}

// ---------------------------------------------------------------------------
// Zeichnen
// ---------------------------------------------------------------------------
//
// Die Einstellungen sind vorbereitet. Drei davon sind hier keine Kosmetik:
//
//   indexAxis: 'y'        Ohne liegende Balken passt «Sand tiger /
//                         Raggedtooth / Grey nurse shark» nirgends hin.
//   beginAtZero: true     Es sind gezählte Vorfälle. Eine gekappte Achse
//                         würde die Abstände erfinden.
//   autoSkip: false       Sonst blendet Chart.js bei zehn Balken einzelne
//                         Beschriftungen aus, um Platz zu sparen.

const ranglisteOptions = {
  responsive: true,
  maintainAspectRatio: false,
  indexAxis: 'y',

  scales: {
    x: {
      beginAtZero: true,
      title: { display: true, text: 'Erfasste Vorfälle' },
    },
    y: {
      ticks: { autoSkip: false },
      grid: { display: false },
    },
  },

  plugins: {
    legend: { display: false },
    tooltip: {
      callbacks: {
        // shares ist ein eigener Schlüssel im dataset. Chart.js reicht alles
        // durch, was dort steht – praktisch für Werte, die nur im Tooltip
        // gebraucht werden.
        label: (item) => {
          const share = item.dataset.shares[item.dataIndex];

          return `${item.formattedValue} erfasste Vorfälle · ${share} %`;
        },
      },
    },
  },
};

// TODO 5: Das Diagramm einmal erzeugen und danach nur noch aktualisieren.

const ranglisteChart = new Chart(document.querySelector('#rangliste'), {
  type: 'bar',
  data: { labels: [], datasets: [] },
  options: ranglisteOptions,
});

function render() {
  const rows = forDimension(rankings, dimensionSelect.value);

  ranglisteChart.data.labels = rows.map((row) => row.category);
  ranglisteChart.data.datasets = [
    {
      label: 'Erfasste Vorfälle',
      data: rows.map((row) => row.incidents),
      backgroundColor: colorsFor(rows),
      shares: sharesFor(rows),
      borderWidth: 0,
    },
  ];

  ranglisteChart.update();

  // TODO 6 (Teil 1): Auch die Texte gehören zur Ansicht. Ein Diagramm, dessen
  // Titel nicht mitwechselt, behauptet etwas Falsches.
  const texte = RANGLISTEN[dimensionSelect.value];

  chartTitle.textContent = texte.title;
  chartNote.textContent = texte.note;
}

// ---------------------------------------------------------------------------
// Reagieren
// ---------------------------------------------------------------------------

async function reload() {
  statusText.classList.remove('is-error');
  statusText.textContent = 'Daten werden geladen …';

  try {
    rankings = await loadRankings(dimensionSelect.value);

    statusText.textContent = `${forDimension(rankings, dimensionSelect.value).length} Kategorien geladen.`;

    render();
  } catch (error) {
    console.error(error);

    // Die Meldung des Endpunkts steht jetzt wörtlich auf der Seite.
    statusText.classList.add('is-error');
    statusText.textContent = error.message;
  }
}

// TODO 6 (Teil 2): Die Auswahl fragt den Endpunkt neu an.

dimensionSelect.addEventListener('change', reload);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

reload();
