// Karte 9 · Die zehn heissesten Sommer
// Neu: sortieren, abschneiden, liegende Balken.

const ENDPUNKT =
  'https://26hs.nickschnee.ch/code-alongs/C_transform/09_hitzesommer_transformieren/unload.php?city=Bern';

async function zeichneHitzetage() {
  const response = await fetch(ENDPUNKT);
  const rows = await response.json();

  // neu: absteigend sortieren und die ersten zehn behalten.
  // [...rows] macht eine Kopie, weil sort() die Liste selbst verändert.
  const top10 = [...rows]
    .sort((a, b) => b.hitzetage - a.hitzetage)
    .slice(0, 10);

  const labels = top10.map((row) => row.year);
  const data = top10.map((row) => row.hitzetage);

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
    // neu: Balken liegen, damit die Rangliste von oben nach unten liest
    options: {
      indexAxis: 'y',
    },
  });
}

zeichneHitzetage();
