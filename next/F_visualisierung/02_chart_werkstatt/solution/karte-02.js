// Karte 2 · Eine andere Stadt
// Geändert: die Stadt in der URL und die Beschriftung.

const ENDPUNKT =
  'https://26hs.nickschnee.ch/code-alongs/C_transform/09_hitzesommer_transformieren/unload.php?city=Zürich'; // vorher: Bern

async function zeichneHitzetage() {
  const response = await fetch(ENDPUNKT);
  const rows = await response.json();

  const labels = rows.map((row) => row.year);
  const data = rows.map((row) => row.hitzetage);

  new Chart(document.querySelector('#hitzetage'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Hitzetage in Zürich', // vorher: Bern
          data: data,
        },
      ],
    },
  });
}

zeichneHitzetage();
