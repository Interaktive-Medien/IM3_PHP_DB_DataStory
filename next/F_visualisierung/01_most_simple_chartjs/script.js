/**
 * Code-Along: Ein Balkendiagramm aus einer API
 *
 * Drei Schritte, nach jedem Schritt die Seite neu laden:
 *
 *   1 Holen   2 Umformen   3 Zeichnen
 */

const ENDPUNKT =
  'https://api.open-meteo.com/v1/forecast?latitude=46.95&longitude=7.45&daily=temperature_2m_max&timezone=Europe%2FZurich';

async function zeichneTemperatur() {
  // --- 1 Holen --------------------------------------------------------------
  // TODO 1: Den Endpunkt mit fetch() abfragen und die Antwort als JSON lesen.
  //         Danach console.log(json) – was steht in der Konsole?

  // --- 2 Umformen -----------------------------------------------------------
  // Chart.js will zwei gleich lange Listen:
  //
  //   labels: ['2026-10-08', '2026-10-09', …]   die Tage
  //   data:   [14.9, 14.7, …]                   die Höchsttemperaturen
  //
  // TODO 2: Die beiden Listen in json.daily finden und in labels und data
  //         speichern.

  // --- 3 Zeichnen -----------------------------------------------------------
  // TODO 3: new Chart(...) mit type 'bar' in das Canvas #temperatur zeichnen.
}

zeichneTemperatur();
