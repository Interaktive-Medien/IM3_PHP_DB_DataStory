// Karte 4 · Titel statt Legende
// Neu: options mit plugins.title und plugins.legend.

const ENDPUNKT =
  'https://26hs.nickschnee.ch/code-alongs/C_transform/09_hitzesommer_transformieren/unload.php?city=Bern';

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
          label: 'Hitzetage in Bern',
          data: data,
        },
      ],
    },
    // neu: alles ab hier
    options: {
      plugins: {
        title: {
          display: true,
          text: 'Sommer 2026: so viele Hitzetage wie nie seit 1940',
        },
        legend: {
          display: false,
        },
      },
    },
  });
}

zeichneHitzetage();
