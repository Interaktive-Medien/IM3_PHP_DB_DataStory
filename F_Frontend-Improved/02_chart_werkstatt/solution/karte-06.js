// Karte 6 · Nur die Sommer ab 1980
// Neu: filter() vor den beiden map().

const ENDPUNKT =
  'https://26hs.nickschnee.ch/code-alongs/C_transform/09_hitzesommer_transformieren/unload.php?city=Bern';

async function zeichneHitzetage() {
  const response = await fetch(ENDPUNKT);
  const rows = await response.json();

  // neu: zuerst auswählen, dann umformen
  const neuere = rows.filter((row) => row.year >= 1980);

  const labels = neuere.map((row) => row.year); // vorher: rows.map
  const data = neuere.map((row) => row.hitzetage); // vorher: rows.map

  new Chart(document.querySelector('#hitzetage'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Hitzetage in Bern seit 1980',
          data: data,
        },
      ],
    },
  });
}

zeichneHitzetage();
