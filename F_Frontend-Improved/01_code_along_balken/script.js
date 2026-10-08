/**
 * Code-Along: Ein Balkendiagramm aus dem Endpunkt
 *
 * Drei Schritte, nach jedem Schritt die Seite neu laden:
 *
 *   1 Holen   2 Umformen   3 Zeichnen
 */

const ENDPUNKT =
  'https://26hs.nickschnee.ch/code-alongs/C_transform/09_hitzesommer_transformieren/unload.php?city=Bern';

async function zeichneHitzetage() {
  // --- 1 Holen --------------------------------------------------------------
  // TODO 1: Den Endpunkt mit fetch() abfragen und die Antwort als JSON lesen.
  //         Danach console.log(rows) – was steht in der Konsole?

  // --- 2 Umformen -----------------------------------------------------------
  // Chart.js will keine Datensätze, sondern zwei gleich lange Listen:
  //
  //   [{city: 'Bern', year: '1940', hitzetage: 0}, …]   was wir haben
  //   labels: ['1940', '1941', …]  data: [0, 1, …]      was Chart.js will
  //
  // TODO 2: Mit map() die Liste labels (Jahre) und die Liste data
  //         (Hitzetage) bauen.

  // --- 3 Zeichnen -----------------------------------------------------------
  // TODO 3: new Chart(...) mit type 'bar' in das Canvas #hitzetage zeichnen.
}

zeichneHitzetage();
