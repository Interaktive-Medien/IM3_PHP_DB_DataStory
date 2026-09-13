# Ablauf `16_hitzesommer_liniendiagramm`

> **Ziel:** Aus dem JSON-Endpunkt von gestern wird ein Liniendiagramm, das auf
> die Stadtauswahl reagiert. Richtwert: 70 Minuten.

## Ausgangslage

Die Kette ist bis hierher gebaut: extrahiert (Block B), transformiert
(Block C), geladen (Block D), als JSON ausgeliefert (Block E). Heute wird sie
sichtbar.

```text
unload.php  ->  fetch()  ->  umformen  ->  Chart.js
gestern         heute
```

Ein Diagramm, ein Bedienelement – mehr nicht. Das zweite Diagramm und die
Interaktion, die ohne Server auskommt, folgen in Code-Along 17.

Im Ordner liegen bereit:

| Datei | Rolle |
| --- | --- |
| `index.html` | fertig – Überschriften, Auswahlfeld, ein `<canvas>` |
| `style.css` | fertig – Gestaltung ist heute nicht das Thema |
| `script.js` | Startcode mit sechs TODO-Marken |
| `unload.php` | der fertige Endpunkt aus Code-Along 14 |
| `data/heat-summers.json` | dieselben 258 Datensätze als Datei |

Hochladen und über die eigene Domain öffnen:

→ `https://eure-domain.ch/code-alongs/F_visualisierung/16_hitzesommer_liniendiagramm/`

### Über die Domain öffnen – das kostet sonst die halbe Lektion

Diese zwei Minuten am Anfang sind gut investiert, weil alle Fälle in jeder
Klasse vorkommen und die Fehlermeldungen in die Irre führen.

| Wie geöffnet | Was passiert |
| --- | --- |
| Doppelklick auf die Datei (`file://`) | Die Seite bleibt **komplett leer und still**: `script.js` ist ein Modul, und Module blockiert der Browser von der Festplatte aus. Es läuft keine Zeile, also auch kein `fetch()` und keine Meldung auf der Seite – nur in der Konsole |
| Browser-Symbol in PhpStorm (`localhost:63342`) | Die Seite läuft über den eingebauten Server von PhpStorm auf dem eigenen Rechner statt auf Hostpoint. `unload.php` liefert dort kein brauchbares JSON |
| Datei geändert, aber nicht hochgeladen | Der Browser zeigt den alten Stand. Im Fenster «File Transfer» von PhpStorm nachsehen, ob der Upload geklappt hat |
| `https://eure-domain.ch/…` | richtig |

Der erste Fall ist der unangenehmere, weil er wie ein kaputtes Skript aussieht.
Deshalb als Merksatz an die Klasse: **Keine Diagramme, keine Meldung, kein
Netzwerkaufruf – dann liegt es nicht am Code, sondern an der Adresse.**

Die Fälle einmal vorführen und die Regel danebenstellen: **In der Adressleiste
steht die eigene Domain. Wer `localhost` oder `file://` sieht, testet nicht den
Stand auf dem Server.**

## Vor dem Code (10')

### Welches Diagramm passt zu welcher Aussage?

Zuerst die Aussage an die Wand, dann erst der Diagrammtyp. Die Frage heute
lautet: «Nimmt die Zahl der Hitzetage zu?» – das ist eine Entwicklung über die
Zeit.

| Aussage | Diagramm | Warum |
| --- | --- | --- |
| Entwicklung über die Zeit | Linie | Die Verbindung zwischen den Punkten bedeutet etwas |
| Rangliste, Vergleich | Balken | Die Länge lässt sich direkt vergleichen |
| Anteile an einem Ganzen | Kreis, selten | Nur bei wenigen Teilen, die zusammen 100 % ergeben |

Der Diagrammtyp ist eine Aussage, keine Geschmacksfrage. Die zweite Zeile der
Tabelle wird in Code-Along 17 gebraucht – heute genügt die Linie.

### Die eine Umformung, um die es heute geht

An die Wandtafel, bevor jemand tippt:

```text
[{city: 'Bern', year: 1940, hot_days: 0}, …]     was der Endpunkt liefert
labels: [1940, 1941, …]   data: [0, 2, …]        was Chart.js will
```

Chart.js kennt unsere Datensätze nicht. Es will zwei Listen, die gleich lang
sind und in derselben Reihenfolge stehen. Alles andere heute ist Beiwerk.

## Schritte im Code (45')

`script.js` enthält sechs TODO-Marken, wieder in vier Bausteinen:
`1 Holen → 2 Umformen → 3 Zeichnen → 4 Reagieren`.

### Baustein 1 – Holen (15')

1. **TODO 1:** `loadSummers()` mit `fetch()` und `await` füllen, danach in
   `reload()` einmal `console.log(summers)` schreiben. Die Konsole zeigt 258
   Objekte – das erste sichtbare Ergebnis, noch ohne Diagramm.
2. **TODO 2:** `response.ok` und den Content-Type prüfen. Vorher den Umweg
   gehen: die URL absichtlich auf `data/heat-summer.json` (ohne `s`) ändern.
   Der Browser meldet «Unexpected token '<'» – eine Meldung, die nichts mit
   dem Problem zu tun hat. Grund: `fetch()` wirft bei 404 keinen Fehler, es
   ist ja eine Antwort angekommen, und `.json()` versucht danach, eine
   HTML-Fehlerseite zu lesen.

### Baustein 2 – Umformen (15')

3. **TODO 3:** `yearsOf()`. Beim Entdoppeln der Jahre kurz zeigen, warum
   `[...new Set(...)]` und warum die Vergleichsfunktion in
   `sort((a, b) => a - b)` nötig ist.
4. **TODO 4:** `datasetFor()` – ein Objekt mit `label`, `data` und dem
   Aussehen. Hier die Frage stellen, die man leicht überspringt: *Warum passen
   die Werte überhaupt zu den Jahren?* Weil der Endpunkt nach Jahr sortiert
   und jede Stadt jeden Sommer hat. Genau das haben wir im Transform geprüft,
   als wir auf vollständige Sommer bestanden haben.

### Baustein 3 – Zeichnen (10')

5. **TODO 5:** Das Diagramm einmal erzeugen – mit leeren Daten – und `render()`
   schreiben, das es füllt und `chart.update()` aufruft. Die `options` sind
   vorbereitet und werden nicht Zeile für Zeile besprochen.

   Hier der wichtigste Satz des Tages: **einmal erzeugen, danach
   aktualisieren.** Bewusst falsch machen und in `render()` ein zweites
   `new Chart(...)` schreiben: «Canvas is already in use».

An dieser Stelle steht das Diagramm. Kurz hinschauen, was es erzählt – und
dass es das ohne die vier Blöcke davor nicht könnte.

### Baustein 4 – Reagieren (5')

6. **TODO 6:** Eine Zeile ändern: `const DATEN_URL = ENDPUNKT;`. Aus der Datei
   wird die Datenbank, und niemand merkt es dem Diagramm an. Das ist die
   Übergabe zwischen den beiden Teams, und sie funktioniert nur, weil beide
   Seiten denselben Datenvertrag eingehalten haben.

   Danach die Stadtauswahl anschliessen und den Netzwerk-Tab offen lassen: Bei
   jeder Auswahl erscheint ein Aufruf `unload.php?city=Bern`. Der `$_GET`-Filter
   von gestern wird zum ersten Mal wirklich benutzt.

## Kontrolle (15')

| Handlung | Erwartung |
| --- | --- |
| Seite laden | «258 Sommer geladen», drei Linien |
| Stadt «Bern» wählen | «86 Sommer geladen», eine Linie, Netzwerkaufruf mit `?city=Bern` |
| Stadt «Zürich» wählen | Umlaut korrekt, 86 Sommer |
| in `script.js` bei `ENDPUNKT` die Adresse falsch schreiben, Stadt wechseln | verständliche Meldung in der Statuszeile |

Das Diagramm zum Schluss gemeinsam lesen: Bis in die 1980er-Jahre bleibt die
Linie fast am Boden, danach steigt sie. Das ist der Moment, in dem aus einer
Datenbankabfrage eine Aussage wird – und zugleich der Moment für die Frage,
was drei Städte über die Schweiz aussagen (nichts) und was nicht im Diagramm
steht (die Messmethode, der Schwellenwert, die Definition von «Sommer»).

## Gesprächspunkte

- **Beginnt die Achse bei null?** Hier ja, weil eine Anzahl gezeigt wird –
  sonst wirkt jede Schwankung wie ein Sprung. Bei Temperaturen wäre die
  Antwort eine andere; das kommt in Code-Along 17. Die Entscheidung ist
  journalistisch, nicht technisch.
- **Die Musterdatei ist der Notvorrat.** `data/heat-summers.json` hat exakt die
  Form des Endpunkts. Damit kann das Frontend-Team arbeiten, bevor das Backend
  fertig ist – und am Marktstand ist es der Fallback, wenn die Datenbank
  streikt. Für die Ausstellung gehört Chart.js aus demselben Grund lokal in den
  Projektordner statt ans CDN.
- **Farbe ist hier Beschriftung.** Jede Stadt behält ihre Farbe. Wer sie später
  im zweiten Diagramm neu vergibt, macht aus einer Lesehilfe eine Falle.
- **Leerer Zustand und Fehler gehören zum Frontend.** Ein leeres Diagramm ohne
  Text sieht aus wie ein Programmfehler. Die Statuszeile sagt in beiden Fällen,
  was los ist – dieselbe Haltung wie beim Statuscode im Backend.
- **Was das Diagramm nicht zeigt, muss daneben stehen.** Quelle, Zeitraum,
  Schwellenwert und die Grenze der Aussage stehen im Fuss der Seite. Für den
  Marktstand ist das kein Beiwerk, sondern Teil der Abgabe.

## Häufige Fehler

| Meldung oder Symptom | Ursache |
| --- | --- |
| Seite bleibt leer und still, kein Netzwerkaufruf | Per Doppelklick geöffnet (`file://`) – das Modul wird gar nicht geladen |
| `Unexpected token '<', "<?php` | Die Seite läuft nicht auf dem Webserver – in der Adressleiste steht nicht die eigene Domain |
| `Unexpected token '<', "<!DOCTYPE` | Antwort ist eine HTML-Seite: falsche URL oder ein PHP-Fehler im Endpunkt |
| `Chart is not defined` | Chart.js nicht geladen – Internet weg oder Tippfehler in der CDN-Adresse |
| `Canvas is already in use` | `new Chart()` steht in `render()` statt daneben |
| Diagramm bleibt leer, Status «0 Sommer» | `load.php` aus Code-Along 12 wurde nie aufgerufen |
| Jahre in falscher Reihenfolge | `ORDER BY` im Endpunkt fehlt |
| Diagramm wird bei jeder Aktualisierung höher | `maintainAspectRatio: false` ohne feste Höhe im CSS |
| `?city=Zürich` findet nichts | `encodeURIComponent()` fehlt |
