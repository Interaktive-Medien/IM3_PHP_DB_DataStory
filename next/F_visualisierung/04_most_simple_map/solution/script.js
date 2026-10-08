/**
 * Code-Along: Punkte auf eine Karte setzen – fertige Fassung
 *
 *   1 Holen   2 Punkt setzen   3 Alle Punkte
 */

const ENDPUNKT = 'https://rest.publibike.ch/v1/public/all/stations';

// --- Karte (vorbereitet) ------------------------------------------------------

const map = new maplibregl.Map({
  container: 'karte',
  style: 'https://tiles.openfreemap.org/styles/liberty',
  center: [8.23, 46.8], // [Längengrad, Breitengrad] – Mitte der Schweiz
  zoom: 7,
});

map.addControl(new maplibregl.NavigationControl());

// --- Kartenstil wechseln (vorbereitet) ----------------------------------------
// Die Punkte bleiben beim Wechsel stehen, weil Marker über der Karte liegen.

const knoepfe = document.querySelectorAll('.stile button');

knoepfe.forEach((knopf) => {
  knopf.addEventListener('click', () => {
    const stil = knopf.dataset.stil;

    knoepfe.forEach((k) => k.classList.remove('aktiv'));
    knopf.classList.add('aktiv');

    if (stil === '3d') {
      // Liberty enthält 3D-Gebäude. Man sieht sie erst ab Zoom 14 und schräg von oben.
      map.setStyle('https://tiles.openfreemap.org/styles/liberty');
      if (map.getZoom() < 14) {
        map.flyTo({ center: [7.4441, 46.9466], zoom: 16, pitch: 60, bearing: -20 });
      } else {
        map.easeTo({ pitch: 60, bearing: -20 });
      }
    } else {
      map.setStyle('https://tiles.openfreemap.org/styles/' + stil);
      map.easeTo({ pitch: 0, bearing: 0 });
    }
  });
});

// --- Stationen ----------------------------------------------------------------

async function zeigeStationen() {
  // --- 1 Holen ----------------------------------------------------------------
  const response = await fetch(ENDPUNKT);
  const json = await response.json();
  const stationen = json.velospot.responseData;
  console.log(stationen);

  // --- 2 Punkt setzen und 3 Alle Punkte ---------------------------------------
  stationen.forEach((station) => {
    const punkt = document.createElement('div');
    punkt.className = 'punkt';

    new maplibregl.Marker({ element: punkt })
      .setLngLat([Number(station.lng), Number(station.lat)])
      .setPopup(new maplibregl.Popup().setText(station.station_name + ': ' + station.totalBike + ' Velos'))
      .addTo(map);
  });
}

zeigeStationen();
