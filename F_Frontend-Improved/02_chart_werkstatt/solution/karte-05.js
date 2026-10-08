// Karte 5 · Achsen beschriften
// Neu: options.scales mit einem Titel pro Achse.

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
      scales: {
        x: {
          title: { display: true, text: 'Sommer' },
        },
        y: {
          title: { display: true, text: 'Tage mit mindestens 30 °C' },
        },
      },
    },
  });
}

zeichneHitzetage();
