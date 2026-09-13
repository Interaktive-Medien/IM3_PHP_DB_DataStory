# Ablauf `19_sharkdaten_karte`

> **Ziel:** Dieselben Daten wie in Code-Along 18, aber als Karte – und mit einer
> zweiten Bibliothek. Am Schluss beantwortet ein Klick auf ein Land die ganze
> Forschungsfrage: wo, welche Art, welche Tätigkeit. Richtwert: 45 Minuten.

## Einordnung

Zusatzmaterial. Voraussetzung ist Code-Along 18 – der Bauplan holen, umformen,
zeichnen, reagieren muss sitzen, denn er ändert sich heute **nicht**.

Das ist die eigentliche Botschaft dieser Lektion: Eine andere Bibliothek ist
kein anderes Vorgehen. `fetch()`, der Datenvertrag, die Prüfung der Antwort und
die eine Zeichenfunktion bleiben, wie sie waren. Ausgetauscht wird nur das
Werkzeug, das am Schluss malt.

| Frage | Balken (18) | Karte (19) |
| --- | --- | --- |
| Bibliothek | Chart.js | Leaflet |
| Wie viele Dateien einbinden? | eine (JS) | zwei (CSS **und** JS) |
| Behälter im HTML | `<canvas>` | `<div>` mit **Höhe im CSS** |
| Wie viele Quellen? | eine | zwei, mit `Promise.all` |
| Was verbindet Daten und Bild? | die Reihenfolge der Liste | der Ländercode |
| Woher kommt die Farbe? | Platz 1 oder nicht | Klassengrenzen |

## Ausgangslage

Die 120 Länderzeilen liegen seit Code-Along 13 in `shark_countries` und kommen
über den Endpunkt aus Code-Along 15.

Hochladen und über die eigene Domain öffnen. Vorher einmal prüfen, ob die Daten
da sind:

→ `https://eure-domain.ch/code-alongs/F_visualisierung/19_sharkdaten_karte/unload.php?dataset=countries`

Kommt `[]`, wurde `load.php` aus Code-Along 13 nie aufgerufen.

Im Ordner liegen ausserdem:

| Datei | was drin ist |
| --- | --- |
| `data/laender.geojson` | 177 Ländergrenzen, Natural Earth 1:110m, Public Domain |
| `data/shark-countries.json` | Musterdaten, falls die Datenbank streikt |

Die Kartendatei wurde auf zwei Angaben pro Land reduziert – `iso3` und `name`.
Das Original von Natural Earth bringt 168 Eigenschaften pro Land mit und ist
dreimal so gross. Kurz zeigen: Auch eine Kartendatei ist ein Datensatz, den man
transformieren darf.

## Vor dem Code (10')

### Warum keine Punkte?

Erst fragen: Wir haben pro Land eine Zahl. Man könnte einen Punkt pro Land
setzen, je grösser desto mehr Vorfälle. Was spricht dagegen?

Der Punkt bräuchte Koordinaten, und ein Land hat keine – nur eine Fläche. Man
müsste sich also einen Punkt aussuchen, meist die Mitte. Für die USA liegt die
in Kansas, gut 1500 Kilometer vom nächsten Hai entfernt.

Deshalb die Fläche. Wo eine Zahl zu einem ganzen Gebiet gehört, färbt man das
Gebiet ein. Das nennt sich **Choroplethenkarte**.

### Die Klassengrenzen festlegen

Die Zahlen an die Tafel:

```text
USA         1486
AUSTRALIA    540
SOUTH AFRICA 322
...
über 60 Länder mit genau 1
```

Frage: Wenn wir «wenig Vorfälle = hell, viele = dunkel» einfach hochrechnen –
wie sieht die Karte aus?

Die USA wären dunkel, Australien schon deutlich heller, und alles ab Platz 4
praktisch weiss. Die Karte hätte genau eine Information: «USA».

Deshalb Klassen. Die Grenzen in `KLASSEN` sind eine **Entscheidung**, keine
Rechnung – wer sie verschiebt, ändert die Aussage der Karte, ohne eine einzige
Zahl anzufassen. Das ist derselbe Gedanke wie beim Histogramm im Theorieteil:
Klassen bilden ist Datenarbeit, nicht Sache der Grafikbibliothek.

Wer mehr wissen will: Es gibt Verfahren dafür (gleiche Breite, Quantile,
Jenks). Für diesen Kurs genügt eine begründete Wahl von Hand.

### Was die Karte verschweigt

Kurz benennen, bevor jemand die Karte für vollständig hält:

- 70 Länder haben keinen Eintrag in `laender_iso.json` und damit keinen Code;
- 8 Länder haben einen Code, aber in der 110m-Datei keine eigene Fläche –
  darunter Réunion mit 53 Vorfällen, Hongkong mit 22 und
  Französisch-Polynesien mit 17;
- kleine Inselstaaten sind zwar da, aber bei dieser Zoomstufe kaum zu sehen.

Zusammen sind das rund 7 Prozent der erfassten Vorfälle. Das gehört unter die
Karte, und genau das baut TODO 6.

## Schritte im Code (25')

`script.js` enthält sechs TODO-Marken.

### Zwei Quellen holen (TODO 1)

Neu: Die Karte braucht zwei Dinge, die unabhängig voneinander geladen werden.
`Promise.all` schickt beide gleichzeitig los.

Frage an die Klasse: Was wäre der Unterschied zu zwei `await` nacheinander?
(Es funktioniert auch, dauert aber so lange wie beide Anfragen zusammen statt
so lange wie die längere.)

Die beiden Ladefunktionen sind fertig – und sie sind **verschieden lang**. Das
ist der Fund dieser Lektion, und es lohnt sich, ihn selbst machen zu lassen:
Wer in `ladeKartendatei()` dieselbe Prüfung einsetzt wie beim Endpunkt, bekommt
einen Fehler, obwohl alles stimmt. Im Netzwerk-Tab steht warum:

```text
unload.php        Content-Type: application/json
laender.geojson   Content-Type: application/geo+json
```

`application/geo+json` ist der offizielle Typ für GeoJSON und völlig korrekt.
Er enthält nur nicht die Zeichenkette, auf die wir geprüft haben.

Die Lehre ist nicht «Prüfungen weglassen». Sie lautet: Eine Prüfung gehört zu
dem Fehler, den sie finden soll. Der Content-Type-Test fängt genau einen Fall
ab – nicht ausgeführtes PHP. Eine statische Datei kann das gar nicht sein.

### Die Verbindung über den Code (TODO 2)

Hier fällt der Groschen zum Datenvertrag. Auf der einen Seite:

```json
{ "country": "USA", "iso3": "USA", "incidents": 1486, "top_species": "White shark" }
```

Auf der anderen:

```json
{ "type": "Feature", "properties": { "iso3": "USA", "name": "United States of America" } }
```

Zwei Dateien aus völlig verschiedenen Quellen, und sie passen zusammen, weil
beide `iso3` kennen. **Deswegen** hat der Transform in Block C nachgeschlagen
statt kategorisiert.

Warum eine `Map` und kein `find()`? Leaflet fragt die Farbe für jedes der 177
Länder einmal ab. Mit `find()` wäre das 177-mal eine ganze Liste durchsuchen.

### Grau ist nicht hell (TODO 3)

Die wichtigste Zeile in `farbeFuer()` ist die für Länder ohne Eintrag. Frage:
Warum nicht einfach die hellste Klasse nehmen?

Weil «keine Daten» und «ein Vorfall» zwei verschiedene Aussagen sind. Nimmt man
dieselbe Farbe, behauptet die Karte, in der Mongolei sei ungefähr so viel
passiert wie in Kroatien.

### Das Popup beantwortet die Frage (TODO 4)

Bis hierhin zeigt die Karte nur das Wo. Erst das Popup bringt die Art und die
Tätigkeit dazu – und damit die ganze Forschungsfrage an einen Ort.

Zwei Entscheidungen darin ansprechen:

1. **Welcher Name?** Angezeigt wird `name` aus der Kartendatei («United States
   of America»), nicht `country` aus dem Datensatz («USA»). Der eine ist der
   Schlüssel, der andere die Beschriftung. Dass beides selten dasselbe ist,
   gilt weit über diese Karte hinaus.
2. **Was bei `null`?** Da steht «keine Art bestimmt», nicht nichts. Ein leeres
   Feld sieht aus wie ein Fehler, ein Satz ist eine Aussage.

Und eine dritte, die man leicht falsch macht. Für ein Land ohne Zeile liegt
«keine erfassten Vorfälle» nahe. Die Klasse soll das ruhig hinschreiben – und
dann auf **Kanada** klicken.

Im Datensatz steht für Kanada genau ein Vorfall. Kanada fehlt nur in
`laender_iso.json`, hat deshalb keinen Ländercode und kommt nie in die
Nachschlagetabelle. Das Popup würde also behaupten, dort sei nie etwas
passiert.

Wir wissen an dieser Stelle nur eines: Wir haben für dieses Land keine Zahl.
Genau das gehört hin, nicht mehr. Dieselbe Unterscheidung wie bei Grau gegen
Hell, nur diesmal in Worten.

### Die Karte bauen (TODO 5)

Drei Zeilen, drei Rollen – die Parallele zu `new Chart()` laut aussprechen:

```text
L.map('karte').setView([20, 0], 2)      wohin und welcher Ausschnitt
L.tileLayer(...).addTo(karte)           der Hintergrund
L.geoJSON(grenzen, {...}).addTo(karte)  unsere Daten
```

Die `attribution` ist Pflicht und nicht Höflichkeit: Wer fremde Kacheln
benutzt, nennt die Quelle. Das gilt genauso für die Projekte.

**Wenn die Karte nicht erscheint:** In neun von zehn Fällen fehlt die Höhe auf
`#karte`. Ein leeres `<div>` ist 0 Pixel hoch, Leaflet zeichnet gehorsam in
0 Pixel, und in der Konsole steht kein einziger Fehler. Hier ist die Höhe schon
im CSS – trotzdem einmal zeigen, indem man sie kurz löscht. Diese zwanzig
Sekunden sparen im Projekt eine halbe Stunde.

### Legende und Wahrheit (TODO 6)

Die Legende entsteht aus derselben Liste, die auch die Farben bestimmt. Damit
kann sie gar nicht erst von der Karte abweichen – ein Fehler, den man auf
fertigen Grafiken erstaunlich oft sieht.

Der Hinweis darunter wird **gerechnet**, nicht hingeschrieben. Begründung an
die Klasse: Sobald jemand `laender_iso.json` um `COLUMBIA` ergänzt, stimmt ein
fester Satz nicht mehr. Eine Zahl, die von Hand gepflegt werden muss, ist eine
Zahl, die irgendwann falsch ist.

## Kontrolle (10')

- Die Karte zeigt eingefärbte Flächen, die USA am dunkelsten.
- Die Statuszeile sagt «42 von 120 Ländern sind eingefärbt».
  **Nachfragen:** Warum 42 und nicht 50? (50 Länder haben einen Code, aber acht
  davon haben in der Kartendatei keine Fläche.) Wer hier 50 stehen hat, zählt
  die Länder mit Code statt die gezeichneten.
- Klick auf die USA: 1486 Vorfälle, White shark, Surfing & board sports.
- Klick auf die Bahamas: 78 Vorfälle, Bull / Zambesi shark, **Spearfishing**.
  Das ist die Stelle, an der die Karte mehr sagt als ein Balkendiagramm –
  weltweit führt Surfen, auf den Bahamas nicht.
- Klick auf die Mongolei: «für dieses Land liegt uns keine Zahl vor». Klick auf
  Kanada: derselbe Satz – obwohl dort ein Vorfall erfasst ist. Genau deshalb
  steht dort nicht «keine erfassten Vorfälle».
- Unter der Karte steht, wie viele Länder und Vorfälle fehlen.
- Gegenprobe: `DATEN_URL` auf `MUSTERDATEN` umstellen und neu laden. Die Karte
  muss gleich aussehen. Das ist der Beweis, dass der Datenvertrag hält – und
  der Notfallplan für den Marktstand.

## Gesprächspunkte

- **Die Bibliothek ist der kleinste Teil.** Wer 16 bis 18 kann, hat heute vor
  allem Leaflet-Vokabeln gelernt. Holen, prüfen, umformen, zeichnen ist
  dasselbe geblieben – und wäre mit einer dritten Bibliothek wieder dasselbe.
- **Der Datenvertrag ist die Brücke.** Zwei Dateien aus verschiedenen Welten
  finden über `iso3` zusammen. Ohne den Nachschlage-Schritt in Block C gäbe es
  diese Karte nicht.
- **Fläche ist nicht Menge.** Russland und Kanada sind riesig und fallen
  deshalb ins Auge, auch wenn dort kaum etwas passiert. Umgekehrt sind die
  Bahamas mit 78 Vorfällen kaum zu sehen. Eine Choroplethenkarte betont grosse
  Länder – das ist ihr eingebauter Fehler, und man muss ihn kennen.
- **Der Erfassungsbias ist auf einer Karte am gefährlichsten.** Eine
  eingefärbte Weltkarte sieht nach Wahrheit aus. Sie zeigt aber, wo
  aufgeschrieben wurde: viel Küste, viele Badegäste, funktionierende Behörden.
  Somalia ist hell, weil dort niemand zählt.
- **Für die Projekte:** Eine Karte lohnt sich nur, wenn die Frage wirklich
  räumlich ist. «Wo?» ist eine Frage, «hübsch aussehen» ist keine.

## Häufige Fehler

| Symptom | Ursache |
| --- | --- |
| Seite bleibt weiss, keine Fehlermeldung | `#karte` hat keine Höhe im CSS |
| Kacheln liegen übereinander in der Ecke | das Leaflet-CSS fehlt im `<head>` |
| alle Länder grau | `nachCode()` gibt eine leere Map zurück, oder `iso3` wird falsch gelesen |
| «Die Kartendatei fehlt (Status 404)» | falscher Pfad in `GRENZEN_URL` |
| «Die Antwort ist kein JSON» bei der Kartendatei | die Content-Type-Prüfung wurde kopiert, siehe TODO 1 |
| Karte da, aber keine Popups | `onEachFeature` fehlt in `L.geoJSON` |
| Statuszeile sagt 50 statt 42 | gezählt werden Länder mit Code, nicht gezeichnete Flächen |
| `[]` vom Endpunkt | `load.php` aus Code-Along 13 wurde nie aufgerufen |

## Quellen

- Daten: Global Shark Attack File (GSAF), via Kaggle.
- Ländergrenzen: [Natural Earth](https://www.naturalearthdata.com/),
  `ne_110m_admin_0_countries`, Public Domain. Reduziert auf `iso3` und `name`.
- Kacheln: CARTO Positron, auf Basis von OpenStreetMap. Beide müssen genannt
  werden.
