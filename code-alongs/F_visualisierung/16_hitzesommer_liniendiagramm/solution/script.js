/**
 * Code-Along 16: Hitzesommer visualisieren – Lösung
 *
 * Für Dozierende: Die Nummern verweisen auf die TODOs im Startcode
 * ../script.js. Die Kommentare erklären, warum eine Zeile so aussieht – im
 * Unterricht wird nicht alles vorgelesen.
 *
 * Datenfluss dieser Datei:
 *
 *   unload.php          JSON, 258 Datensätze
 *     -> fetch()        die Liste kommt als JavaScript-Array an
 *       -> umformen     aus Datensätzen werden labels und datasets
 *         -> Chart.js   ein Liniendiagramm
 *           -> Auswahl  die Stadt fragt den Endpunkt neu an
 *
 * Diese Datei liegt in solution/, deshalb steht vor jeder URL ein `../`.
 * Im eigenen Projekt liegen index.html und unload.php nebeneinander, dort
 * heisst es einfach 'unload.php'.
 *
 * WICHTIG: Auch die Lösung läuft nur auf dem Webserver. Hochladen und
 * https://eure-domain.ch/code-alongs/F_visualisierung/16_hitzesommer_liniendiagramm/solution/
 * öffnen.
 */

// ---------------------------------------------------------------------------
// Einstellungen
// ---------------------------------------------------------------------------
//
// Alles, was man beim Anpassen als Erstes sucht, steht zuoberst.
//
// Die Musterdaten sind der Datenstand vom Tag der Übergabe. Sie sind aus
// unload.php exportiert, haben also exakt dieselbe Form. Mit ihnen lässt sich
// das Frontend bauen, bevor der Endpunkt fertig ist – und sie sind der
// Notvorrat für den Marktstand, falls die Datenbank streikt.

const MUSTERDATEN = '../data/heat-summers.json';
const ENDPUNKT = '../unload.php';

// Ab TODO 6 wird der echte Endpunkt gefragt. Zum Vergleichen genügt es, diese
// eine Zeile auf MUSTERDATEN zurückzustellen.
const DATEN_URL = ENDPUNKT;

// Jede Stadt behält ihre Farbe. Das ist keine Dekoration: Die Farbe ist hier
// die Beschriftung.
const CITY_COLORS = {
  Bern: '#4b93a4',
  Chur: '#b5723a',
  Zürich: '#8b8a6e',
};

// ---------------------------------------------------------------------------
// Zustand
// ---------------------------------------------------------------------------
//
// Eine Variable beschreibt, was gerade zu sehen ist: die geladenen Daten.
// Die Auswahl ändert sie, danach wird neu gezeichnet.

let summers = [];

// ---------------------------------------------------------------------------
// Elemente
// ---------------------------------------------------------------------------

const citySelect = document.querySelector('#city');
const statusText = document.querySelector('#status');

// ---------------------------------------------------------------------------
// Baustein 1: Holen
// ---------------------------------------------------------------------------

// TODO 1 und 2: Daten holen und Fehler bemerken
//
// fetch() liefert erst eine Antwort (die Kopfdaten), dann liest .json() den
// Inhalt. Beides dauert, deshalb await – genau wie in IM2.
//
// response.ok ist der Teil, den man am häufigsten vergisst. fetch() wirft
// keinen Fehler, wenn der Server 404 oder 500 antwortet; es ist ja eine
// Antwort angekommen. Ohne diese Prüfung versucht .json() eine Fehlerseite zu
// lesen und die Konsole meldet «Unexpected token <» – eine Meldung, die vom
// eigentlichen Problem wegführt.
//
// Der Stadtfilter aus Block E wird hier zum ersten Mal benutzt:
// ?city=Bern hängt an der URL, wenn nicht «alle» gewählt ist.
// encodeURIComponent() macht aus Zürich das, was in eine URL gehört.

async function loadSummers(city) {
  const url = city === 'alle'
    ? DATEN_URL
    : `${DATEN_URL}?city=${encodeURIComponent(city)}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Der Endpunkt antwortet mit Status ${response.status}.`);
  }

  // Hier zahlt sich der Header aus Block E aus: Wir können nachsehen, was für
  // eine Antwort angekommen ist, bevor wir sie als JSON lesen.
  //
  // Der häufigste Fall im Unterricht: unload.php gibt vor dem JSON eine
  // PHP-Warnung als HTML aus. Ohne diese Prüfung meldet der Browser
  // «Unexpected token '<'» – und alle suchen im JavaScript.
  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    throw new Error(
      'Die Antwort ist kein JSON. Öffne unload.php direkt im Browser.',
    );
  }

  return await response.json();
}

// ---------------------------------------------------------------------------
// Baustein 2: Umformen
// ---------------------------------------------------------------------------
//
// Der Kern des ganzen Tages. Chart.js will keine Datensätze, sondern zwei
// Listen: labels für die Achse und data für die Werte. Beide müssen gleich
// lang sein und in derselben Reihenfolge stehen.
//
//   [{city: 'Bern', year: 1940, hot_days: 0}, …]   was wir haben
//   labels: [1940, 1941, …]  data: [0, 2, …]        was Chart.js will

// TODO 3: Die Beschriftungen der X-Achse
//
// Jedes Jahr kommt dreimal vor, einmal pro Stadt. new Set() wirft die
// Wiederholungen weg, [...] macht daraus wieder eine Liste.
//
// Die Sortierung ist nötig, weil sort() ohne Vergleichsfunktion als Text
// sortiert. Bei Jahreszahlen fällt das nicht auf, bei 9 und 10 schon.

function yearsOf(rows) {
  return [...new Set(rows.map((row) => row.year))].sort((a, b) => a - b);
}

// Welche Städte sind in den Daten? Mit Filter ist es eine, sonst drei.
// Die Liste kommt aus den Daten und steht nicht fest im Code – sonst müsste
// man diese Datei anfassen, sobald eine vierte Stadt dazukommt.

function cityNamesOf(rows) {
  return [...new Set(rows.map((row) => row.city))].sort();
}

// TODO 4: Eine Stadt wird eine Linie
//
// Ein «dataset» ist eine Linie: die Zahlen plus ihr Aussehen.
//
// Dass die Werte zu den Jahren passen, hängt an zwei Voraussetzungen:
// Der Endpunkt sortiert nach Jahr (ORDER BY aus Code-Along 14), und jede
// Stadt hat jedes Jahr. Genau das haben wir im Transform geprüft, als wir auf
// vollständige Sommer bestanden haben – hier zahlt sich das aus. Bei
// lückenhaften Daten müsste man pro Jahr nachschlagen statt einfach
// abzuzählen.

function datasetFor(rows, city) {
  const cityRows = rows.filter((row) => row.city === city);

  return {
    label: city,
    data: cityRows.map((row) => row.hot_days),
    borderColor: CITY_COLORS[city] ?? '#575757',
    backgroundColor: CITY_COLORS[city] ?? '#575757',
    borderWidth: 2,
    tension: 0.3,

    // Ohne Punkte ist die Linie bei 86 Jahren lesbar; beim Darüberfahren
    // erscheinen sie trotzdem.
    pointRadius: 0,
    pointHoverRadius: 5,
  };
}

// ---------------------------------------------------------------------------
// Baustein 3: Zeichnen
// ---------------------------------------------------------------------------
//
// Die Einstellungen stehen bewusst neben dem Diagramm und nicht darin. Sie
// sind Fleissarbeit, keine Erkenntnis – wer sie später braucht, findet sie in
// der Chart.js-Dokumentation.

const verlaufOptions = {
  responsive: true,

  // Zusammen mit der festen Höhe in style.css. Ohne diese Zeile darf sich das
  // Canvas seine Höhe aus der Breite ausrechnen.
  maintainAspectRatio: false,

  // Zeigt beim Darüberfahren alle Städte desselben Jahres – so vergleicht man
  // mit einer Bewegung statt mit dreien.
  interaction: { mode: 'index', intersect: false },

  scales: {
    x: {
      title: { display: true, text: 'Sommer' },
      ticks: { maxTicksLimit: 12 },
      grid: { display: false },
    },
    y: {
      // Eine Anzahl beginnt bei null, sonst wirkt jede Schwankung wie ein
      // Sprung. Das ist eine journalistische Entscheidung, keine technische.
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

// TODO 5 (Teil 1): Das Diagramm einmal erzeugen
//
// Wichtigster Satz des Tages: Ein Diagramm wird einmal erzeugt und danach
// aktualisiert. new Chart() auf demselben Canvas ein zweites Mal aufzurufen
// gibt «Canvas is already in use» – und wer den alten Chart vorher zerstört,
// verliert bei jeder Änderung die Animation und den Zustand der Legende.
//
// Es startet leer. Gefüllt wird es unten in render().

const verlaufChart = new Chart(document.querySelector('#verlauf'), {
  type: 'line',
  data: { labels: [], datasets: [] },
  options: verlaufOptions,
});

// TODO 5 (Teil 2): Aus den Daten wird ein Bild
//
// render() ist die einzige Stelle, die das Diagramm anfasst. Egal woher die
// Daten kommen – heute von der Auswahl, im nächsten Code-Along auch von einem
// Schieber – hier entsteht daraus das aktuelle Bild.

function render() {
  verlaufChart.data.labels = yearsOf(summers);
  verlaufChart.data.datasets = cityNamesOf(summers).map((city) => datasetFor(summers, city));

  verlaufChart.update();
}

// ---------------------------------------------------------------------------
// Baustein 4: Reagieren
// ---------------------------------------------------------------------------

// reload() ist der Weg über den Server: neue Daten holen, dann neu zeichnen.

async function reload() {
  statusText.textContent = 'Daten werden geladen …';

  try {
    summers = await loadSummers(citySelect.value);

    // Eine leere Liste ist kein Fehler, aber die Seite muss es sagen. Ein
    // leeres Diagramm ohne Text sieht aus wie ein Programmfehler.
    statusText.textContent = summers.length === 0
      ? 'Für diese Auswahl gibt es keine Daten.'
      : `${summers.length} Sommer geladen.`;

    render();
  } catch (error) {
    // Zwei Adressaten, wie schon im Backend: die genaue Meldung in die
    // Konsole, ein verständlicher Satz auf die Seite.
    console.error(error);
    statusText.textContent = `Die Daten konnten nicht geladen werden. ${error.message}`;
  }
}

// TODO 6: Die Stadtauswahl fragt den Endpunkt neu an
//
// Hier läuft die Kette einmal komplett: Auswahl -> ?city=Bern -> WHERE im SQL
// -> kleinere JSON-Antwort -> neues Diagramm. Vier Blöcke Arbeit stecken in
// diesem einen Klick.

citySelect.addEventListener('change', reload);

// ---------------------------------------------------------------------------
// Start
// ---------------------------------------------------------------------------

reload();
