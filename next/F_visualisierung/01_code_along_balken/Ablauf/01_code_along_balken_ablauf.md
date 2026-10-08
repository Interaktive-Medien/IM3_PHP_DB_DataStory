# Ablauf `01_code_along_balken`

> **Ziel:** In 15 Minuten vom Endpunkt zum ersten Balkendiagramm. Kein
> Fehlerhandling, keine Interaktion, keine Gestaltung – nur die Kette
> `fetch → map → new Chart`. Alles Weitere entdecken die Studierenden danach
> selbst in der Chart-Werkstatt.

## Vorbereitung (einmalig, vor der Lektion)

Der Endpunkt liegt auf `26hs.nickschnee.ch`, die Seiten der Studierenden laufen
auf ihrer eigenen Domain oder per Doppelklick (`file://`). Ohne CORS-Header
blockiert der Browser die Antwort, obwohl der Server sie geschickt hat.

In `code-alongs/C_transform/09_hitzesommer_transformieren/unload.php` direkt
unter dem bestehenden `header(...)` ergänzen und hochladen:

```php
header("Content-type: application/json");
header("Access-Control-Allow-Origin: *");
```

Danach testen: `solution/index.html` per Doppelklick öffnen – das Diagramm
muss erscheinen.

## Ausgangslage

| Datei | Rolle |
| --- | --- |
| `index.html` | fertig – Titel, ein `<canvas id="hitzetage">`, Chart.js vom CDN |
| `style.css` | fertig |
| `script.js` | drei TODOs |

Die Seite braucht keinen eigenen Server: `index.html` per Doppelklick öffnen
oder auf die eigene Domain hochladen – beides funktioniert, weil `script.js`
kein Modul ist und der Endpunkt CORS erlaubt.

## Schritte (15')

### 1 Holen (5')

Zuerst die URL des Endpunkts im Browser öffnen und **fragen, bevor getippt
wird:** «Was müssen wir tun, damit diese Daten in unserem JavaScript landen?»
Die Antwort `fetch` kommt aus IM2.

```js
const response = await fetch(ENDPUNKT);
const rows = await response.json();
console.log(rows);
```

**Code Prediction:** «Wie viele Einträge zeigt die Konsole?» Kurz schätzen
lassen, dann neu laden: 87 – ein Sommer pro Jahr von 1940 bis 2026, nur Bern,
weil `?city=Bern` in der URL steht.

### 2 Umformen (5')

Die Kommentarzeilen im Code zeigen, was wir haben und was Chart.js will.
**Die Klasse die zwei Zeilen diktieren lassen**, nicht vorschreiben:

```js
const labels = rows.map((row) => row.year);
const data = rows.map((row) => row.hitzetage);
```

Kontrolle mit `console.log(labels, data)`: zwei Listen, beide 87 lang.

### 3 Zeichnen (5')

**Vorher skizzieren lassen:** «Zeichnet in zehn Sekunden auf ein Blatt, wie das
Diagramm aussehen wird.» Dann tippen:

```js
new Chart(document.querySelector('#hitzetage'), {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{ label: 'Hitzetage in Bern', data: data }],
  },
});
```

Das Diagramm steht. Kurz gemeinsam hinschauen: 2026 sticht heraus – 26
Hitzetage, mehr als jeder Sommer davor.

Danach direkt in die Werkstatt: Dieser Stand ist der Startpunkt für alle
Auftragskarten.

## Bewusst weggelassen

Wird in der Werkstatt oder im Projekt nachgeholt, nicht hier:

- Fehlermeldungen → Fehler-Zuordnung nach der Pause
- `response.ok` und Content-Type-Prüfung → Code-Along 16 als Nachschlagematerial
- `options` (Titel, Achsen, Farben) → Auftragskarten Stufe 1 und 2
- Interaktion und `chart.update()` → Auftragskarte 11

## Häufige Fehler

| Meldung oder Symptom | Ursache |
| --- | --- |
| `blocked by CORS policy` | Der Header `Access-Control-Allow-Origin` fehlt im Endpunkt (siehe Vorbereitung) |
| `Chart is not defined` | Chart.js nicht geladen – Internet weg oder Tippfehler in der CDN-Adresse |
| `await is only valid in async functions` | `await` ausserhalb von `zeichneHitzetage()` geschrieben |
| Diagramm leer, keine Fehlermeldung | `data` und `labels` vertauscht oder `row.hitzetag` statt `row.hitzetage` |
| `Canvas is already in use` | `new Chart(...)` zweimal ausgeführt, z. B. die Funktion zweimal aufgerufen |
