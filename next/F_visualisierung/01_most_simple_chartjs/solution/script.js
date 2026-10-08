/**
 * Code-Along: Ein Balkendiagramm aus einer API – fertige Fassung
 *
 *   1 Holen   2 Umformen   3 Zeichnen
 */

const ENDPUNKT =
  'https://api.open-meteo.com/v1/forecast?latitude=46.95&longitude=7.45&daily=temperature_2m_max&timezone=Europe%2FZurich';

async function zeichneTemperatur() {
  // --- 1 Holen --------------------------------------------------------------
  const response = await fetch(ENDPUNKT);
  const json = await response.json();
  console.log(json);

  // --- 2 Umformen -----------------------------------------------------------
  const labels = json.daily.time;
  const data = json.daily.temperature_2m_max;

  // --- 3 Zeichnen -----------------------------------------------------------
  new Chart(document.querySelector('#temperatur'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Höchsttemperatur in Bern (°C)',
          data: data,
        },
      ],
    },
  });
}

zeichneTemperatur();
