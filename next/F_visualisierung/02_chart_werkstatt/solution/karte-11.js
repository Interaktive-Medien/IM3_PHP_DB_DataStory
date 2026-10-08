// Karte 11 · Per Knopf die Stadt wechseln
// Neu: Das Diagramm wird einmal erzeugt und danach nur noch aktualisiert.
// Dazu im HTML zwei Knöpfe über dem Canvas (siehe karte-11.html):
//
//   <button id="bern">Bern</button>
//   <button id="zuerich">Zürich</button>

const ENDPUNKT =
  'https://26hs.nickschnee.ch/code-alongs/C_transform/09_hitzesommer_transformieren/unload.php';

// neu: einmal erzeugen – zuerst ohne Daten
const chart = new Chart(document.querySelector('#hitzetage'), {
  type: 'bar',
  data: {
    labels: [],
    datasets: [{ label: '', data: [] }],
  },
});

// neu: holt eine Stadt und füllt das bestehende Diagramm
async function zeigeStadt(city) {
  const response = await fetch(`${ENDPUNKT}?city=${encodeURIComponent(city)}`);
  const rows = await response.json();

  chart.data.labels = rows.map((row) => row.year);
  chart.data.datasets[0].data = rows.map((row) => row.hitzetage);
  chart.data.datasets[0].label = `Hitzetage in ${city}`;
  chart.update();
}

document.querySelector('#bern').addEventListener('click', () => zeigeStadt('Bern'));
document.querySelector('#zuerich').addEventListener('click', () => zeigeStadt('Zürich'));

zeigeStadt('Bern');
