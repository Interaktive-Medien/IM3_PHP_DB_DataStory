# Ablauf `04_most_simple_map`

> **Ziel:** In 15 Minuten von einer API zu Punkten auf einer Karte. Die Karte
> und der Wechsel zwischen den Kartenstilen sind vorbereitet – getippt wird nur
> die Kette `fetch → Marker → forEach`.

## Daten und Karte

| Was | Woher |
| --- | --- |
| Stationen | `https://rest.publibike.ch/v1/public/all/stations` (CORS erlaubt, kein Schlüssel) |
| Karte | [MapLibre GL JS](https://maplibre.org/) vom CDN, Kacheln von [OpenFreeMap](https://openfreemap.org/) (kein Schlüssel) |

PubliBike gehört inzwischen zu Velospot. Die API heisst noch PubliBike, die
Liste `publibike.stations` ist aber leer. Die Stationen (rund 1700) stecken in
`velospot.responseData`.

Kartenstile: `liberty`, `positron` und `dark` von OpenFreeMap. «3D» ist
`liberty` schräg von oben: Der Stil enthält 3D-Gebäude, die ab Zoom 14
erscheinen. Ist man weiter weg, fliegt der Knopf nach Bern.

### Warum MapLibre und nicht Leaflet?

Doku: <https://maplibre.org/maplibre-gl-js/docs/>

Leaflet ist einfacher und wird in Code-Along 19 (`19_sharkdaten_karte`)
verwendet. Für diese Karte passt MapLibre besser:

- **Vektorkacheln:** OpenFreeMap liefert Vektorkacheln mit fertigen Stilen.
  MapLibre zeichnet sie direkt, Leaflet bräuchte dafür ein Plugin.
- **Stil wechseln mit einer URL:** `map.setStyle(…)` tauscht Liberty, Positron
  und Dark aus, ohne dass die Punkte neu gesetzt werden müssen.
- **3D:** MapLibre zeichnet mit WebGL und kann die Karte neigen und drehen.
  Leaflet ist nur flach (2D), 3D-Gebäude gehen damit nicht.

Für die Studierenden ändert sich wenig: Ein Punkt ist auch hier eine Zeile
mit `Marker`, `setLngLat` und `addTo(map)`.

## Ausgangslage

| Datei | Rolle |
| --- | --- |
| `index.html` | fertig – Knöpfe für die Stile, `<div id="karte">`, MapLibre vom CDN |
| `style.css` | fertig – auch die Klasse `.punkt` für die Punkte |
| `script.js` | Karte und Stilwechsel fertig, drei TODOs |

`index.html` per Doppelklick öffnen oder auf die eigene Domain hochladen –
beides funktioniert.

## Schritte (15')

### 1 Holen (4')

Die API-Adresse zuerst im Browser öffnen. Fragen: «Wo in diesem JSON stehen
die Stationen?»

```js
const response = await fetch(ENDPUNKT);
const json = await response.json();
const stationen = json.velospot.responseData;
console.log(stationen);
```

**Code Prediction:** «Welche zwei Felder brauchen wir, um eine Station auf die
Karte zu setzen?» → `lat` und `lng`.

### 2 Punkt setzen (6')

Erst eine einzige Station, damit man sieht, was ein Marker ist:

```js
const station = stationen[0];
const punkt = document.createElement('div');
punkt.className = 'punkt';

new maplibregl.Marker({ element: punkt })
  .setLngLat([Number(station.lng), Number(station.lat)])
  .addTo(map);
```

**Stolperstein bewusst zeigen:** `lat` und `lng` einmal vertauschen. Der Punkt
landet in Ostafrika. Merksatz: MapLibre will **zuerst lng,
dann lat** – wie x und y.

### 3 Alle Punkte (5')

**Die Klasse fragen:** «Wie wird aus einem Punkt jetzt 1700?» → `forEach`.
Den Code aus Schritt 2 hineinschieben, `stationen[0]` wird zu `station`.

Bonus, wenn Zeit bleibt: das Popup.

```js
.setPopup(new maplibregl.Popup().setText(station.station_name + ': ' + station.totalBike + ' Velos'))
```

Zum Schluss die Stile durchklicken. Die Punkte bleiben stehen, weil Marker
über der Karte liegen und nicht Teil des Kartenstils sind.

## Häufige Fehler

| Meldung oder Symptom | Ursache |
| --- | --- |
| Karte ist weiss, 0 Pixel hoch | `#karte` hat keine Höhe – steht in `style.css` |
| `maplibregl is not defined` | MapLibre nicht geladen – Internet weg oder Tippfehler in der CDN-Adresse |
| Punkt in Ostafrika | `lat` und `lng` vertauscht |
| `Cannot read properties of undefined (reading 'responseData')` | `json.velospot` falsch geschrieben |
| Keine Punkte, keine Fehlermeldung | `.addTo(map)` vergessen |
| Viele Punkte, aber Karte ruckelt | normal bei 1700 DOM-Markern; für mehr Punkte wäre eine GeoJSON-Ebene mit `circle`-Layer der nächste Schritt |
