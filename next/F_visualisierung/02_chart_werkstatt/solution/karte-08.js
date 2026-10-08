// Karte 8 · Ein Tooltip, der Tage sagt
// Neu: options.plugins.tooltip.callbacks.label

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
        tooltip: {
          callbacks: {
            label: (context) => `${context.parsed.y} Hitzetage`,
          },
        },
      },
    },
  });
}

zeichneHitzetage();
