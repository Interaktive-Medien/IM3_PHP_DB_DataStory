/**
 * Code-Along: Punkte auf eine Karte setzen
 *
 * Drei Schritte, nach jedem Schritt die Seite neu laden:
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
  // TODO 1: Den Endpunkt mit fetch() abfragen und die Antwort als JSON lesen.
  //         Die Stationen stecken in json.velospot.responseData.
  //         Danach console.log(stationen) – was steht in der Konsole?

  // --- 2 Punkt setzen ---------------------------------------------------------
  // Eine Station sieht so aus (gekürzt):
  //
  //   {station_name: 'Abendstrasse - Bern', totalBike: 3,
  //    lat: '46.94…', lng: '7.43…', …}
  //
  // Achtung: MapLibre will [Längengrad, Breitengrad], also zuerst lng, dann lat.
  // lat und lng sind Text – Number() macht daraus Zahlen.
  //
  // TODO 2: Für die erste Station stationen[0] ein <div class="punkt"> bauen
  //         und mit new maplibregl.Marker({ element: punkt })
  //         .setLngLat([…]).addTo(map) auf die Karte setzen.

  // --- 3 Alle Punkte ----------------------------------------------------------
  // TODO 3: Den Code aus Schritt 2 in stationen.forEach(…) packen.
  //         Bonus: Mit .setPopup(new maplibregl.Popup().setText(…)) zeigt
  //         ein Klick auf den Punkt den Namen und die Anzahl Velos.
}

zeigeStationen();
