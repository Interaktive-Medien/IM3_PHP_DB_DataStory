/**
 * Code-Along 19: Hai-Vorfälle als Choroplethenkarte – Lösung
 *
 * Für Dozierende: Die Nummern verweisen auf die TODOs im Startcode
 * ../script.js. Wer die Code-Alongs 16 bis 18 gemacht hat, erkennt fast alles
 * wieder – die Kommentare beschränken sich auf das, was mit Leaflet anders ist.
 *
 * Datenfluss dieser Datei:
 *
 *   zwei Quellen parallel        unload.php?dataset=countries + laender.geojson
 *     -> Nachschlagetabelle      iso3 -> Zeile
 *       -> eine Farbe pro Land   Klassengrenzen, nicht Farbverlauf
 *         -> L.geoJSON           177 Flächen, davon 42 eingefärbt
 *           -> Popup             die Antwort auf die Forschungsfrage
 */

// ---------------------------------------------------------------------------
// Einstellungen
// ---------------------------------------------------------------------------

const MUSTERDATEN = '../data/shark-countries.json';
const ENDPUNKT = '../unload.php?dataset=countries';

const DATEN_URL = ENDPUNKT;

// Die Ländergrenzen liegen als Datei bei. Sie ändern sich nicht und müssen
// deshalb nicht aus einer Datenbank kommen.
const GRENZEN_URL = '../data/laender.geojson';

/**
 * Die Klassen der Karte, von viel nach wenig.
 *
 * Warum Klassen und kein Farbverlauf? Die USA haben 1486 Vorfälle, mehr als
 * die Hälfte aller Länder hat einen einzigen. Bei einem linearen Verlauf wären
 * die USA dunkel und alles andere praktisch weiss – die Karte hätte genau eine
 * Information.
 *
 * Die Grenzen sind eine Entscheidung, keine Rechnung. Wer sie verschiebt,
 * verändert die Aussage der Karte, ohne eine einzige Zahl zu ändern. Deshalb
 * stehen sie hier oben und nicht irgendwo in einer Funktion.
 *
 * Von oben nach unten geprüft: Die erste Klasse, deren Untergrenze erreicht
 * ist, gewinnt.
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
//
// Genau wie in Code-Along 17: ein Ort für die Daten, eine Funktion zum
// Zeichnen. Neu ist nur, dass zwei Dinge geladen werden müssen.

let laenderNachCode = new Map();
let grenzen = null;

// ---------------------------------------------------------------------------
// Elemente
// ---------------------------------------------------------------------------

const statusText = document.querySelector('#status');
const legendeSkala = document.querySelector('#legende-skala');
const legendeHinweis = document.querySelector('#legende-hinweis');

// --- Holen ------------------------------------------------------------------

/**
 * TODO 1: beide Quellen holen.
 *
 * Neu gegenüber allen bisherigen Code-Alongs: Es gibt zwei Anfragen, und die
 * Karte kann erst gezeichnet werden, wenn beide da sind.
 *
 * Promise.all schickt beide gleichzeitig los und wartet, bis die letzte fertig
 * ist. Nacheinander mit zwei await wäre auch richtig, aber langsamer: Die
 * zweite Anfrage würde erst starten, wenn die erste zurück ist.
 *
 * Scheitert eine von beiden, scheitert Promise.all – und der catch in reload()
 * bekommt den Fehler. Eine halbe Karte gibt es nicht.
 */
async function ladeAlles() {
  const [laender, geojson] = await Promise.all([
    ladeVomEndpunkt(DATEN_URL),
    ladeKartendatei(GRENZEN_URL),
  ]);

  return { laender, geojson };
}

/**
 * Die Prüfkette aus Code-Along 18, unverändert.
 *
 * Sie gilt für den Endpunkt und nur für ihn: Der Content-Type-Test fängt genau
 * einen Fehler ab, nämlich dass der Server das PHP nicht ausgeführt und
 * stattdessen den Quelltext geschickt hat.
 */
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

/**
 * Für die Kartendatei genügt die kurze Fassung – und sie MUSS kürzer sein.
 *
 * Wer hier dieselbe Prüfung wie oben einsetzt, bekommt eine Fehlermeldung,
 * obwohl alles stimmt. Der Grund steht im Netzwerk-Tab:
 *
 *   unload.php          Content-Type: application/json
 *   laender.geojson     Content-Type: application/geo+json
 *
 * `application/geo+json` ist der offizielle Typ für GeoJSON und völlig
 * korrekt – er enthält nur nicht die Zeichenkette «application/json».
 *
 * Die Lehre daraus ist nicht «Prüfungen weglassen», sondern: Eine Prüfung
 * gehört zu dem Fehler, den sie finden soll. Eine statische Datei kann gar
 * nicht «nicht ausgeführtes PHP» sein, also ist der Test hier sinnlos.
 */
async function ladeKartendatei(url) {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `Die Kartendatei fehlt (Status ${response.status}): ${url}`
    );
  }

  return await response.json();
}

// --- Umformen ---------------------------------------------------------------

/**
 * TODO 2: aus der Liste eine Nachschlagetabelle machen.
 *
 * Das ist dieselbe Idee wie laender_iso.json im Transform, nur andersherum und
 * im Browser: Dort wurde aus einem Namen ein Code, hier wird aus einem Code
 * eine ganze Zeile.
 *
 * Der Grund ist die Karte. Leaflet ruft die Style-Funktion für jedes der 177
 * Länder einmal auf. Mit find() würde dabei 177-mal die ganze Liste
 * durchsucht; mit einer Map ist es 177-mal ein direkter Zugriff.
 *
 * Länder ohne iso3 kommen gar nicht erst in die Tabelle: Sie haben keine
 * Fläche, die man einfärben könnte. Gezählt werden sie trotzdem – siehe
 * zeichneLegende().
 */
function nachCode(laender) {
  const tabelle = new Map();

  for (const zeile of laender) {
    if (zeile.iso3 !== null) {
      tabelle.set(zeile.iso3, zeile);
    }
  }

  return tabelle;
}

/**
 * TODO 3: die Farbe für ein Land bestimmen.
 *
 * find() liefert die erste Klasse, deren Untergrenze erreicht ist. Weil
 * KLASSEN von gross nach klein sortiert ist, ist das automatisch die richtige.
 *
 * Kein Eintrag heisst nicht «null Vorfälle», sondern «wir wissen es nicht».
 * Deshalb Grau und nicht die hellste Klasse: Ein Land ohne Daten darf nicht
 * aussehen wie ein Land mit einem einzigen Vorfall.
 */
function farbeFuer(iso3) {
  const zeile = laenderNachCode.get(iso3);

  if (zeile === undefined) {
    return FARBE_KEINE_DATEN;
  }

  const klasse = KLASSEN.find((eintrag) => zeile.incidents >= eintrag.ab);

  return klasse === undefined ? FARBE_KEINE_DATEN : klasse.farbe;
}

/**
 * Fertig: der Stil einer Fläche.
 *
 * weight und color zeichnen die Landesgrenze. Ohne sie verschmelzen zwei
 * gleich eingefärbte Nachbarländer zu einer Fläche.
 */
function stilFuer(feature) {
  return {
    fillColor: farbeFuer(feature.properties.iso3),
    fillOpacity: 0.85,
    weight: 0.6,
    color: '#ffffff',
  };
}

// --- Zeichnen ---------------------------------------------------------------

/**
 * TODO 4: der Text im Popup.
 *
 * Hier wird die Forschungsfrage beantwortet – wo, welche Art, welche
 * Tätigkeit, alles an einem Ort.
 *
 * Zwei Entscheidungen stecken darin:
 *
 * 1. Angezeigt wird der Name aus der Kartendatei ("United States of America"),
 *    nicht der aus dem Datensatz ("USA"). Der Datensatz-Name ist der
 *    Schlüssel, der Karten-Name ist die Beschriftung. Das ist ein ganz
 *    normaler Fall: Woran man Dinge erkennt und wie man sie nennt, sind zwei
 *    verschiedene Sachen.
 *
 * 2. Fehlt eine Angabe, steht das da. «keine Art bestimmt» ist eine Aussage,
 *    ein leeres Feld wäre ein Versehen.
 *
 * Der wichtigste Satz steht im ersten if. Dort ist es verlockend, «keine
 * erfassten Vorfälle» zu schreiben – und das wäre falsch.
 *
 * Beispiel Kanada: Im Datensatz steht genau ein Vorfall. Kanada fehlt nur in
 * laender_iso.json, hat deshalb keinen Ländercode und landet nie in unserer
 * Nachschlagetabelle. Ein Popup mit «keine erfassten Vorfälle» würde behaupten,
 * dort sei nie etwas passiert.
 *
 * Wir wissen an dieser Stelle nur eines: Wir haben für dieses Land keine Zahl.
 * Genau das schreiben wir hin, nicht mehr.
 */
function popupText(feature) {
  const zeile = laenderNachCode.get(feature.properties.iso3);
  const name = feature.properties.name;

  if (zeile === undefined) {
    return `
      <p class="popup-land">${name}</p>
      <p class="popup-zahl ist-unbekannt">für dieses Land liegt uns keine Zahl vor</p>
    `;
  }

  return `
    <p class="popup-land">${name}</p>
    <p class="popup-zahl"><strong>${zeile.incidents}</strong> erfasste Vorfälle</p>
    <dl class="popup-liste">
      <dt>häufigste Hai-Art</dt>
      <dd${zeile.top_species === null ? ' class="ist-unbekannt"' : ''}>${
        zeile.top_species ?? 'keine Art bestimmt'
      }</dd>
      <dt>häufigste Tätigkeit</dt>
      <dd${zeile.top_activity === null ? ' class="ist-unbekannt"' : ''}>${
        zeile.top_activity ?? 'keine Angabe'
      }</dd>
    </dl>
  `;
}

/**
 * TODO 5: die Karte bauen.
 *
 * Drei Teile, genau wie ein Chart.js-Diagramm drei Teile hatte:
 *
 *   L.map()        wohin gezeichnet wird und welcher Ausschnitt
 *   L.tileLayer()  der Hintergrund
 *   L.geoJSON()    unsere Daten
 *
 * setView([20, 0], 2) heisst: Mittelpunkt bei 20 Grad Nord, 0 Grad Ost,
 * Zoomstufe 2. Die 20 statt 0 verschieben den Ausschnitt etwas nach oben, weil
 * unter dem Äquator viel Wasser liegt.
 *
 * Die attribution ist keine Höflichkeit. Wer fremde Kacheln benutzt, muss die
 * Quelle nennen – das steht in den Nutzungsbedingungen von OpenStreetMap und
 * gilt genauso für die eigenen Projekte in diesem Kurs.
 */
function zeichneKarte() {
  const karte = L.map('karte').setView([20, 0], 2);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png', {
    attribution:
      '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>, ' +
      '&copy; <a href="https://carto.com/attributions">CARTO</a>',
    maxZoom: 8,
  }).addTo(karte);

  // onEachFeature läuft einmal pro Land. layer ist die gezeichnete Fläche.
  L.geoJSON(grenzen, {
    style: stilFuer,
    onEachFeature: (feature, layer) => {
      layer.bindPopup(popupText(feature));
    },
  }).addTo(karte);

  return karte;
}

/**
 * TODO 6: die Legende und der ehrliche Hinweis darunter.
 *
 * Die Legende entsteht aus derselben Liste KLASSEN, die auch die Farben
 * bestimmt. Wer die Grenzen ändert, ändert beides zugleich – eine Legende, die
 * nicht mehr zur Karte passt, kann so gar nicht entstehen.
 *
 * Der Hinweis darunter ist der wichtigere Teil. Drei Sorten Land fehlen auf
 * dieser Karte, und keine davon sieht man ihr an:
 *
 *   - Länder, deren Name nicht in laender_iso.json steht (COLUMBIA);
 *   - Länder mit Code, die in der 110m-Kartendatei keine Fläche haben
 *     (Réunion, Hongkong, Französisch-Polynesien);
 *   - Vorfälle, bei denen gar kein Land erfasst wurde.
 *
 * Wir rechnen das aus, statt eine Zahl hinzuschreiben: Sonst stimmt der Satz
 * nicht mehr, sobald jemand die Nachschlagetabelle ergänzt.
 */
function zeichneLegende(laender) {
  legendeSkala.innerHTML = KLASSEN.map(
    (klasse) => `
      <li>
        <span class="legende-farbe" style="background: ${klasse.farbe}"></span>
        ${klasse.text}
      </li>
    `
  ).join('');

  legendeSkala.insertAdjacentHTML(
    'beforeend',
    `<li>
       <span class="legende-farbe" style="background: ${FARBE_KEINE_DATEN}"></span>
       keine Daten
     </li>`
  );

  // Welche Codes hat die Kartendatei überhaupt? Ohne diese Menge liesse sich
  // «hat einen Code, aber keine Fläche» nicht von «hat keinen Code»
  // unterscheiden.
  const codesMitFlaeche = new Set(
    grenzen.features.map((feature) => feature.properties.iso3)
  );

  const ohneCode = laender.filter((zeile) => zeile.iso3 === null);
  const ohneFlaeche = laender.filter(
    (zeile) => zeile.iso3 !== null && !codesMitFlaeche.has(zeile.iso3)
  );

  const summe = (liste) =>
    liste.reduce((total, zeile) => total + zeile.incidents, 0);

  const fehlend = summe(ohneCode) + summe(ohneFlaeche);
  const gesamt = summe(laender);
  const anteil = Math.round((fehlend / gesamt) * 1000) / 10;

  const namen = ohneFlaeche
    .slice(0, 3)
    .map((zeile) => zeile.country)
    .join(', ');

  legendeHinweis.textContent =
    `Nicht auf der Karte: ${ohneCode.length} Länder ohne Ländercode und ` +
    `${ohneFlaeche.length} Länder ohne eigene Fläche in der Kartendatei ` +
    `(darunter ${namen}). Zusammen sind das ${fehlend} von ${gesamt} ` +
    `erfassten Vorfällen, also ${anteil} Prozent.`;

  // Die Zahl der wirklich eingefärbten Länder. Sie ist kleiner als die Zahl
  // der Länder mit Code – genau um die acht ohne Fläche.
  return laender.length - ohneCode.length - ohneFlaeche.length;
}

// --- Reagieren --------------------------------------------------------------

/**
 * Ein Zustand, eine Zeichenfunktion – wie in Code-Along 17.
 *
 * Diese Karte hat kein Bedienelement, deshalb läuft reload() genau einmal.
 * Der Aufbau bleibt trotzdem derselbe: holen, in den Zustand schreiben,
 * zeichnen. Wer später einen Zeitraum-Filter ergänzen will, hängt ihn hier an
 * und muss nichts umbauen.
 */
async function reload() {
  statusText.textContent = 'Daten werden geladen …';
  statusText.classList.remove('is-error');

  try {
    const { laender, geojson } = await ladeAlles();

    laenderNachCode = nachCode(laender);
    grenzen = geojson;

    zeichneKarte();

    const eingefaerbt = zeichneLegende(laender);

    // Nicht laenderNachCode.size: Das wären die Länder mit Ländercode, und
    // acht davon haben in der Kartendatei gar keine Fläche. Eine Statuszeile,
    // die mehr behauptet als die Karte zeigt, ist schlimmer als keine.
    statusText.textContent =
      `${eingefaerbt} von ${laender.length} Ländern sind eingefärbt.`;
  } catch (fehler) {
    statusText.classList.add('is-error');
    statusText.textContent = fehler.message;
  }
}

// --- Start ------------------------------------------------------------------

reload();
