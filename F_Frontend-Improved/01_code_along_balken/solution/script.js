/**
 * Code-Along: Ein Balkendiagramm aus dem Endpunkt – fertige Fassung
 *
 *   1 Holen   2 Umformen   3 Zeichnen
 */

const ENDPUNKT =
  'https://26hs.nickschnee.ch/code-alongs/C_transform/09_hitzesommer_transformieren/unload.php?city=Bern';

async function zeichneHitzetage() {
  // --- 1 Holen --------------------------------------------------------------
  const response = await fetch(ENDPUNKT);
  const rows = await response.json();
  console.log(rows);

  // --- 2 Umformen -----------------------------------------------------------
  const labels = rows.map((row) => row.year);
  const data = rows.map((row) => row.hitzetage);

  // --- 3 Zeichnen -----------------------------------------------------------
  new Chart(document.querySelector('#hitzetage'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Hitzetage in Bern',
          data: data,
        },
      ],
    },
  });
}

zeichneHitzetage();
