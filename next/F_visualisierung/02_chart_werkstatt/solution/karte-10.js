// Karte 10 · Zwei Städte vergleichen
// Neu: alle Städte holen, pro Stadt filtern, zwei Datasets.

const ENDPUNKT =
  'https://26hs.nickschnee.ch/code-alongs/C_transform/09_hitzesommer_transformieren/unload.php'; // neu: ohne ?city=… kommen alle drei Städte

async function zeichneHitzetage() {
  const response = await fetch(ENDPUNKT);
  const rows = await response.json();

  // neu: pro Stadt eine eigene Liste
  const bern = rows.filter((row) => row.city === 'Bern');
  const zuerich = rows.filter((row) => row.city === 'Zürich');

  // Beide Städte haben dieselben Jahre – die Jahre von Bern genügen.
  const labels = bern.map((row) => row.year);

  new Chart(document.querySelector('#hitzetage'), {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Bern',
          data: bern.map((row) => row.hitzetage),
        },
        {
          label: 'Zürich',
          data: zuerich.map((row) => row.hitzetage),
        },
      ],
    },
  });
}

zeichneHitzetage();
