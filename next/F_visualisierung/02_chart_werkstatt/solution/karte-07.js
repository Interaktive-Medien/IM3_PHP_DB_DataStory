// Karte 7 · Heisse Sommer hervorheben
// Neu: backgroundColor ist eine Liste – eine Farbe pro Balken.

const ENDPUNKT =
  'https://26hs.nickschnee.ch/code-alongs/C_transform/09_hitzesommer_transformieren/unload.php?city=Bern';

async function zeichneHitzetage() {
  const response = await fetch(ENDPUNKT);
  const rows = await response.json();

  const labels = rows.map((row) => row.year);
  const data = rows.map((row) => row.hitzetage);

  // neu: ab 10 Hitzetagen orange, sonst petrol
  const farben = data.map((wert) => (wert >= 10 ? '#b5723a' : '#4b93a4'));

  new Chart(document.querySelector('#hitzetage'), {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Hitzetage in Bern',
          data: data,
          backgroundColor: farben, // neu
        },
      ],
    },
  });
}

zeichneHitzetage();
