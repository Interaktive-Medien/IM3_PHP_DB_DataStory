/**
 * Code-Along 19: Hai-Vorfälle als Choroplethenkarte
 *
 * Vierter Durchgang, zweite Bibliothek. Der Bauplan ist derselbe wie in den
 * Code-Alongs 16 bis 18 – holen, umformen, zeichnen, reagieren. Nur gezeichnet
 * wird diesmal nicht mit Chart.js, sondern mit Leaflet.
 *
 * Drei Dinge sind neu:
 *
 *   1. Es werden ZWEI Quellen geladen: eure Daten und die Ländergrenzen.
 *   2. Die Farbe kommt aus Klassen, nicht aus einem Farbverlauf.
 *   3. Ein Land ohne Daten muss anders aussehen als ein Land mit wenig Daten.
 *
 * ---------------------------------------------------------------------------
 * WICHTIG: Die Seite läuft auf dem Webserver.
 * ---------------------------------------------------------------------------
 *
 * In PhpStorm speichern, damit die Datei per FTP hochgeladen wird, und die
 * Seite über die eigene Domain öffnen:
 *
 *   https://eure-domain.ch/code-alongs/F_visualisierung/19_sharkdaten_karte/
 *
 * In der Adressleiste steht eure Domain. Steht dort localhost oder file://,
 * läuft nicht der Stand auf dem Server. Per Doppelklick geöffnet (file://)
 * bleibt die Seite ganz leer, weil der Browser das Modul gar nicht lädt.
 *
 * Vorher: Die Tabelle shark_countries muss gefüllt sein – Code-Along 13,
 * load.php einmal aufrufen.
 *
 * Das HTML und das CSS sind fertig. Diese Elemente stehen bereit:
 *
 *   #karte            der Behälter für die Karte, im CSS 520 Pixel hoch
 *   #status           Zeile für Meldungen an die Leserin
 *   #legende-skala    leere Liste für die Farbklassen
 *   #legende-hinweis  leere Zeile für das, was die Karte nicht zeigt
 */

// ---------------------------------------------------------------------------
// Einstellungen
// ---------------------------------------------------------------------------

const MUSTERDATEN = 'data/shark-countries.json';
const ENDPUNKT = 'unload.php?dataset=countries';

const DATEN_URL = ENDPUNKT;

// Die Ländergrenzen liegen als Datei bei. Sie ändern sich nicht und müssen
// deshalb nicht aus einer Datenbank kommen.
const GRENZEN_URL = 'data/laender.geojson';

/**
 * Die Klassen der Karte, von viel nach wenig.
 *
 * Warum Klassen und kein Farbverlauf? Die USA haben 1486 Vorfälle, mehr als
 * die Hälfte aller Länder hat einen einzigen. Bei einem linearen Verlauf wären
 * die USA dunkel und alles andere praktisch weiss.
 *
 * Die Grenzen sind eine Entscheidung, keine Rechnung. Wer sie verschiebt,
 * verändert die Aussage der Karte, ohne eine einzige Zahl zu ändern.
 */
const KLASSEN = [
  { ab: 500, farbe: '#2f6b7a', text: '500 und mehr' },
  { ab: 100, farbe: '#4b93a4', text: '100 bis 499' },
  { ab: 50, farbe: '#7db0bd', text: '50 bis 99' },
  { ab: 20, farbe: '#a8c9d2', text: '20 bis 49' },
  { ab: 5, farbe: '#cfe0e5', text: '5 bis 19' },
  { ab: 1, farbe: '#eef4f6', text: '1 bis 4' },
];

const FARBE_KEINE_DATEN = '#ebebe7';

// ---------------------------------------------------------------------------
// Zustand
// ---------------------------------------------------------------------------

let laenderNachCode = new Map();
let grenzen = null;

// ---------------------------------------------------------------------------
// Elemente
// ---------------------------------------------------------------------------

const statusText = document.querySelector('#status');
const legendeSkala = document.querySelector('#legende-skala');
const legendeHinweis = document.querySelector('#legende-hinweis');

// --- Holen ------------------------------------------------------------------

// TODO 1: Beide Quellen holen – den Endpunkt und die Kartendatei.
//         Die Karte lässt sich erst zeichnen, wenn beide da sind.
//         Schaut euch Promise.all an: Es schickt beide Anfragen gleichzeitig
//         los und wartet, bis die letzte fertig ist.

async function ladeAlles() {
  return { laender: [], geojson: null };
}

// Fertig: die Prüfkette aus Code-Along 18, unverändert.
async function ladeVomEndpunkt(url) {
  const response = await fetch(url);

  if (!response.ok) {
    const problem = await response.json().catch(() => null);

    throw new Error(
      problem?.error ?? `Der Endpunkt antwortet mit Status ${response.status}.`
    );
  }

  const contentType = response.headers.get('content-type') ?? '';

  if (!contentType.includes('application/json')) {
    throw new Error(
      'Die Antwort ist kein JSON. Öffne unload.php direkt im Browser.'
    );
  }

  return await response.json();
}

// Fertig – und absichtlich kürzer als die Funktion darüber.
//
// Probiert es ruhig aus: Wer hier dieselbe Content-Type-Prüfung einsetzt,
// bekommt eine Fehlermeldung, obwohl alles stimmt. Der Grund steht im
// Netzwerk-Tab. Die Antwort dazu steht in der Lösung.
async function ladeKartendatei(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Die Kartendatei fehlt (Status ${response.status}): ${url}`);
  }

  return await response.json();
}

// --- Umformen ---------------------------------------------------------------

// TODO 2: Aus der Liste eine Nachschlagetabelle iso3 -> Zeile machen.
//         Dasselbe wie laender_iso.json im Transform, nur andersherum.
//         Länder ohne iso3 gehören nicht hinein – sie haben keine Fläche.
//         Nehmt eine Map: Leaflet fragt die Farbe 177-mal ab.

function nachCode(laender) {
  return new Map();
}

// TODO 3: Die Farbe für einen Ländercode bestimmen.
//         Die erste Klasse aus KLASSEN, deren Untergrenze erreicht ist.
//         Achtung: Kein Eintrag heisst nicht «null Vorfälle», sondern
//         «wir wissen es nicht» – und muss deshalb anders aussehen als die
//         hellste Klasse.

function farbeFuer(iso3) {
  return FARBE_KEINE_DATEN;
}

// Fertig: der Stil einer Fläche.
//
// weight und color zeichnen die Landesgrenze. Ohne sie verschmelzen zwei
// gleich eingefärbte Nachbarländer zu einer Fläche.
function stilFuer(feature) {
  return {
    fillColor: farbeFuer(feature.properties.iso3),
    fillOpacity: 0.85,
    weight: 0.6,
    color: '#ffffff',
  };
}

// --- Zeichnen ---------------------------------------------------------------

// TODO 4: Den Text für das Popup bauen – hier wird die Frage beantwortet.
//         Hinein gehören Land, Vorfälle, häufigste Art und häufigste
//         Tätigkeit.
//         Zwei Entscheidungen: Welchen Namen zeigt ihr, den aus dem Datensatz
//         («USA») oder den aus der Kartendatei («United States of America»)?
//         Und was steht da, wenn top_species null ist?
//
//         Eine dritte, gemeinere: Was schreibt ihr in ein Land, für das ihr
//         gar keine Zeile habt? «Keine erfassten Vorfälle» liegt nahe – prüft
//         das an Kanada, bevor ihr es hinschreibt.

function popupText(feature) {
  return '';
}

// TODO 5: Die Karte bauen. Drei Teile, genau wie bei einem Diagramm:
//
//           L.map('karte').setView([20, 0], 2)   wohin und welcher Ausschnitt
//           L.tileLayer(...).addTo(karte)        der Hintergrund
//           L.geoJSON(grenzen, {...}).addTo(karte)  unsere Daten
//
//         In L.geoJSON gehören style: stilFuer und onEachFeature, um das
//         Popup anzuhängen.
//
//         Die attribution im tileLayer ist Pflicht, nicht Höflichkeit – wer
//         fremde Kacheln benutzt, nennt die Quelle. Nehmt diese Zeile:
//
//           'https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png'
//           attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
//                        '&copy; <a href="https://carto.com/attributions">CARTO</a>'

function zeichneKarte() {
}

// TODO 6: Die Legende zeichnen und darunter schreiben, was fehlt.
//         Die Legende entsteht aus KLASSEN – dann kann sie gar nicht erst
//         von der Karte abweichen. Der Eintrag «keine Daten» gehört dazu.
//
//         Der Hinweis darunter ist der wichtigere Teil. Zwei Sorten Land
//         fehlen auf dieser Karte, und keine davon sieht man ihr an:
//         Länder ohne Ländercode und Länder, die in der Kartendatei keine
//         eigene Fläche haben.
//
//         Rechnet die Zahlen aus, statt sie hinzuschreiben: Sobald jemand
//         laender_iso.json ergänzt, stimmt ein fester Satz nicht mehr.
//
//         Gebt am Schluss zurück, wie viele Länder wirklich eingefärbt sind.

function zeichneLegende(laender) {
  return 0;
}

// --- Reagieren --------------------------------------------------------------

// Fertig: ein Zustand, eine Zeichenfunktion – wie in Code-Along 17.
//
// Diese Karte hat kein Bedienelement, deshalb läuft reload() genau einmal.
// Der Aufbau bleibt trotzdem derselbe. Wer später einen Zeitraum-Filter
// ergänzen will, hängt ihn hier an und muss nichts umbauen.

async function reload() {
  statusText.textContent = 'Daten werden geladen …';
  statusText.classList.remove('is-error');

  try {
    const { laender, geojson } = await ladeAlles();

    laenderNachCode = nachCode(laender);
    grenzen = geojson;

    zeichneKarte();

    const eingefaerbt = zeichneLegende(laender);

    statusText.textContent =
      `${eingefaerbt} von ${laender.length} Ländern sind eingefärbt.`;
  } catch (fehler) {
    statusText.classList.add('is-error');
    statusText.textContent = fehler.message;
  }
}

// --- Start ------------------------------------------------------------------

reload();
