/**
 * Code-Matching: die Karten
 *
 * Eine einzige Quelle für Codekarten und Grafiken: Der Code auf der Karte ist
 * genau der Code, der die Grafik zeichnet. So können Karte und Grafik nie
 * auseinanderlaufen.
 *
 * Sechs Codekarten (A–F) für alle, zwei Bonuskarten (G, H) für schnelle
 * Paare. Die acht Grafiken tragen gemischte Nummern – wer nur A–F löst, hat
 * also zwei Grafiken übrig und kann nicht einfach die letzte Karte zuordnen.
 */

const KARTEN = [
  {
    code: 'A',
    grafik: 4,
    js: `new Chart(canvas, {
  type: 'bar',
  data: {
    labels: ['Bern', 'Chur', 'Zürich'],
    datasets: [
      { label: 'Hitzetage 2026', data: [26, 24, 25] },
    ],
  },
});`,
  },
  {
    code: 'B',
    grafik: 8,
    js: `new Chart(canvas, {
  type: 'bar',
  data: {
    labels: ['Bern', 'Chur', 'Zürich'],
    datasets: [
      { label: 'Hitzetage 2026', data: [26, 24, 25] },
    ],
  },
  options: {
    indexAxis: 'y',
  },
});`,
  },
  {
    code: 'C',
    grafik: 2,
    js: `new Chart(canvas, {
  type: 'bar',
  data: {
    labels: ['Bern', 'Chur', 'Zürich'],
    datasets: [
      { label: 'Hitzetage 2026', data: [26, 24, 25] },
    ],
  },
  options: {
    scales: { y: { min: 20 } },
  },
});`,
  },
  {
    code: 'D',
    grafik: 6,
    js: `new Chart(canvas, {
  type: 'line',
  data: {
    labels: ['2022', '2023', '2024', '2025', '2026'],
    datasets: [
      { label: 'Bern', data: [14, 12, 2, 11, 26] },
      { label: 'Zürich', data: [11, 11, 8, 13, 25] },
    ],
  },
});`,
  },
  {
    code: 'E',
    grafik: 1,
    js: `new Chart(canvas, {
  type: 'bar',
  data: {
    labels: ['2022', '2023', '2024', '2025', '2026'],
    datasets: [
      { label: 'Bern', data: [14, 12, 2, 11, 26] },
      { label: 'Zürich', data: [11, 11, 8, 13, 25] },
    ],
  },
});`,
  },
  {
    code: 'F',
    grafik: 7,
    js: `new Chart(canvas, {
  type: 'doughnut',
  data: {
    labels: ['Bern', 'Chur', 'Zürich'],
    datasets: [
      { label: 'Hitzetage 2026', data: [26, 24, 25] },
    ],
  },
});`,
  },
  {
    code: 'G',
    bonus: true,
    grafik: 5,
    js: `new Chart(canvas, {
  type: 'bar',
  data: {
    labels: ['2022', '2023', '2024', '2025', '2026'],
    datasets: [
      { label: 'Bern', data: [14, 12, 2, 11, 26] },
      { label: 'Zürich', data: [11, 11, 8, 13, 25] },
    ],
  },
  options: {
    scales: {
      x: { stacked: true }, y: { stacked: true },
    },
  },
});`,
  },
  {
    code: 'H',
    bonus: true,
    grafik: 3,
    js: `new Chart(canvas, {
  type: 'pie',
  data: {
    labels: ['Bern', 'Chur', 'Zürich'],
    datasets: [
      { label: 'Hitzetage 2026', data: [26, 24, 25] },
    ],
  },
});`,
  },
];

// Zeichnet die Grafik einer Karte in ein Canvas – mit genau dem Code der Karte.
function zeichneKarte(karte, canvas) {
  return new Function('canvas', karte.js)(canvas);
}
