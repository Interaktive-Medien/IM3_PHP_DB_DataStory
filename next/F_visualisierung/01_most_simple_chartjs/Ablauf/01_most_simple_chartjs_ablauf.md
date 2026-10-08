# Ablauf `01_most_simple_chartjs`

> **Ziel:** In 15 Minuten von einer API zum ersten Balkendiagramm. Kein
> Fehlerhandling, keine Interaktion, keine Gestaltung – nur die Kette
> `fetch → json → new Chart`. Alles Weitere entdecken die Studierenden danach
> selbst in der Chart-Werkstatt.

## Daten

Die Daten kommen von der Wetter-API von [Open-Meteo](https://open-meteo.com/):
die Höchsttemperatur in Bern für die nächsten sieben Tage.

```text
https://api.open-meteo.com/v1/forecast?latitude=46.95&longitude=7.45&daily=temperature_2m_max&timezone=Europe%2FZurich
```

Die API simuliert hier den eigenen Unload-Endpunkt. Die Kette ist dieselbe
wie im Projekt: Daten per `fetch` holen, als JSON lesen, an Chart.js geben.
Im Projekt ersetzt später die URL des eigenen Endpunkts diese Adresse.

Open-Meteo braucht keinen Schlüssel und erlaubt Anfragen von jeder Domain.
Der Code-Along läuft deshalb überall: per Doppelklick, auf der eigenen Domain
oder lokal.

## Ausgangslage

| Datei | Rolle |
| --- | --- |
| `index.html` | fertig – Titel, ein `<canvas id="temperatur">`, Chart.js vom CDN |
| `style.css` | fertig |
| `script.js` | drei TODOs |

`index.html` per Doppelklick öffnen oder auf die eigene Domain hochladen –
beides funktioniert.

## Schritte (15')

### 1 Holen (5')

Zuerst die URL der API im Browser öffnen und **fragen, bevor getippt wird:**
«Was müssen wir tun, damit diese Daten in unserem JavaScript landen?» Die
Antwort `fetch` kommt aus IM2.

```js
const response = await fetch(ENDPUNKT);
const json = await response.json();
console.log(json);
```

**Code Prediction:** «Wie viele Tage stehen in `json.daily.time`?» Kurz
schätzen lassen, dann in der Konsole aufklappen: sieben, ab heute.

### 2 Umformen (5')

Die Kommentarzeilen im Code zeigen, was Chart.js will: zwei gleich lange
Listen. **Die Klasse suchen lassen**, wo diese Listen im JSON stehen:

```js
const labels = json.daily.time;
const data = json.daily.temperature_2m_max;
```

Kontrolle mit `console.log(labels, data)`: zwei Listen, beide sieben lang.

Kurz einordnen: Open-Meteo liefert die Listen schon fertig. Der eigene
Endpunkt liefert später eine Liste von Datensätzen, daraus macht `map()` die
zwei Listen. Der Startstand der Werkstatt zeigt genau das, die Karten 6, 9
und 10 üben es.

### 3 Zeichnen (5')

**Vorher skizzieren lassen:** «Zeichnet in zehn Sekunden auf ein Blatt, wie das
Diagramm aussehen wird.» Dann tippen:

```js
new Chart(document.querySelector('#temperatur'), {
  type: 'bar',
  data: {
    labels: labels,
    datasets: [{ label: 'Höchsttemperatur in Bern (°C)', data: data }],
  },
});
```

Das Diagramm steht. Danach direkt in die Werkstatt, die mit ihrem eigenen
Startstand in `02_chart_werkstatt/start/` beginnt.

## Bewusst weggelassen

Wird in der Werkstatt oder im Projekt nachgeholt, nicht hier:

- `map()` für Datensätze → Startstand der Werkstatt, Auftragskarten 6, 9, 10
- Fehlermeldungen → Fehler-Zuordnung nach der Pause
- `response.ok` und Content-Type-Prüfung → Code-Along 16 als Nachschlagematerial
- `options` (Titel, Achsen, Farben) → Auftragskarten Stufe 1 und 2
- Interaktion und `chart.update()` → Auftragskarte 11

## Häufige Fehler

| Meldung oder Symptom | Ursache |
| --- | --- |
| `Chart is not defined` | Chart.js nicht geladen – Internet weg oder Tippfehler in der CDN-Adresse |
| `await is only valid in async functions` | `await` ausserhalb von `zeichneTemperatur()` geschrieben |
| `Cannot read properties of undefined (reading 'time')` | `json.daily` falsch geschrieben, z. B. `json.days` |
| Diagramm leer, keine Fehlermeldung | `data` und `labels` vertauscht oder Tippfehler in `temperature_2m_max` |
| `Canvas is already in use` | `new Chart(...)` zweimal ausgeführt, z. B. die Funktion zweimal aufgerufen |
| `blocked by CORS policy` | Erst später, mit dem eigenen Unload-Endpunkt statt Open-Meteo: Liegt die Seite auf einer anderen Domain oder wird sie per Doppelklick geöffnet, blockiert der Browser die Antwort. Lösung: im `unload.php` `header("Access-Control-Allow-Origin: *");` ergänzen |
