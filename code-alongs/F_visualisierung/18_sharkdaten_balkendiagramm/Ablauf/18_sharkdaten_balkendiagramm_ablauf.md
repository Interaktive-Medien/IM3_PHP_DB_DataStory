# Ablauf `18_sharkdaten_balkendiagramm`

> **Ziel:** Zwei Ranglisten aus einem Endpunkt werden ein liegendes
> Balkendiagramm, das seine Überschrift und seine Fehlermeldung mitführt.
> Richtwert: 45 Minuten.

## Einordnung

Zusatzmaterial und dritter Durchgang. Wer 16 und 17 gemacht hat, kennt den
Bauplan und arbeitet hier schnell. Der Durchgang lohnt sich, weil andere Daten
andere Entscheidungen verlangen:

| Frage | Hitzesommer (16/17) | Sharks (18) |
| --- | --- | --- |
| Gibt es eine Zeitachse? | ja, 86 Jahre | nein – eine Linie wäre falsch |
| Wie lang sind die Beschriftungen? | vier Zeichen | bis zu 43 Zeichen |
| Was macht der Endpunkt bei einem falschen Filterwert? | leere Liste | Status 400 mit Begründung |

Die letzte Zeile ist das eigentlich Neue: In Code-Along 15 habt ihr eine
Fehlerantwort mit einer Begründung gebaut. Heute liest sie zum ersten Mal
jemand.

## Ausgangslage

Die 17 Zeilen liegen seit Code-Along 13 in `shark_rankings`. Ist die Tabelle
leer, dort einmal `load.php` aufrufen.

Hochladen und über die eigene Domain öffnen:

→ `https://eure-domain.ch/code-alongs/F_visualisierung/18_sharkdaten_balkendiagramm/`

Fertig im Ordner: `index.html`, `style.css`, der Endpunkt aus Code-Along 15 und
`data/shark-rankings.json` als Fallback. Gebaut wird `script.js` mit sechs
TODO-Marken.

## Vor dem Code (10')

### Welcher Diagrammtyp passt hier?

Erst die Frage an die Klasse, dann die Daten zeigen: «Welche Hai-Arten sind in
den erfassten Vorfällen am häufigsten?»

Die meisten greifen nach dem, was sie zuletzt gebaut haben. Deshalb die
Gegenfrage: **Was steht hier auf der X-Achse einer Linie?** Es gibt keine Zeit
in diesen Daten, keine Reihenfolge, kein Dazwischen. Eine Linie von «White
shark» zu «Tiger shark» behauptet einen Verlauf, den es nicht gibt.

Es bleibt der Balken – und weil «Sand tiger / Raggedtooth / Grey nurse shark»
43 Zeichen hat, liegt er.

### Zwei Ranglisten, ein Endpunkt

Kurz die zwei Werte zeigen, die der Endpunkt akzeptiert, und den dritten Fall
danebenstellen:

| Aufruf | Antwort |
| --- | --- |
| `?dimension=shark_category` | 10 Zeilen |
| `?dimension=activity_group` | 7 Zeilen |
| `?dimension=fische` | Status 400 mit `{"error": …, "allowed": […]}` |

Frage an die Klasse: Was soll das Frontend mit dieser dritten Antwort machen?
Antwort: die Begründung anzeigen. Sie ist die beste Information, die der Server
hat.

## Schritte im Code (25')

### Holen und Fehler lesen (10')

1. **TODO 1:** `loadRankings()` mit `fetch()` und `?dimension=`.
2. **TODO 2:** Die Fehlerantwort auswerten. Das ist der Kern des Tages:

   ```js
   if (!response.ok) {
     const problem = await response.json().catch(() => null);
     throw new Error(problem?.error ?? `Der Endpunkt antwortet mit Status ${response.status}.`);
   }
   ```

   Zwei Dinge besprechen: Auch eine Fehlerantwort hat einen Körper, den man
   lesen kann. Und `.catch(() => null)` fängt den Fall ab, dass dort ausnahmsweise
   kein JSON steht – dann greift der Text nach dem `??`.

### Umformen und zeichnen (10')

3. **TODO 3:** `forDimension()`. Hier kommt die Frage, warum wir filtern, wo der
   Endpunkt doch schon filtert. Antwort: wegen der Musterdatei, die beide
   Ranglisten enthält. Mit dieser Zeile funktioniert die Seite mit beiden
   Quellen – und damit auch als Fallback am Marktstand.
4. **TODO 4:** `colorsFor()` – nur Platz 1 in der kräftigen Farbe. Ein Satz
   dazu: Farbe heisst hier «wichtig», nicht «anders». Zehn verschiedene Farben
   würden zehn Kategorien behaupten, die nichts miteinander zu tun haben.
5. **TODO 5:** Diagramm erzeugen und `render()`. Wieder gilt: einmal erzeugen,
   danach `update()`.

### Der Umweg über das falsche Diagramm

Sobald die Balken stehen, lohnt sich ein Klick: `type: 'bar'` in `type: 'pie'`
ändern und die Seite neu laden.

Zehn Segmente, davon vier winzige, und niemand kann «Wobbegong» und
«Hammerhead» auseinanderhalten. Genau deshalb sagt die Regel aus dem Kartenset:
zwei oder drei Stücke, nicht zehn. Danach zurückstellen.

### Reagieren (5')

6. **TODO 6:** Auswahl anschliessen, Titel und Untertitel mitführen, im
   Fehlerfall `is-error` setzen. Der Punkt mit dem Titel ist kein Detail: Ein
   Diagramm, dessen Überschrift nicht mitwechselt, behauptet etwas Falsches.

## Kontrolle (10')

| Handlung | Erwartung |
| --- | --- |
| Seite laden | «10 Kategorien geladen», White shark zuoberst und farbig hervorgehoben |
| auf «Tätigkeiten im Wasser» wechseln | 7 Balken, neuer Titel, Surfing zuoberst |
| über einen Balken fahren | Zahl und Anteil in Prozent |
| in `index.html` einen `value` auf `fische` ändern | rote Meldung «Unbekannte Rangliste.» |
| in `script.js` bei `ENDPUNKT` die Adresse falsch schreiben und neu laden | Meldung «Daten konnten nicht geladen werden.» |

Der vierte Test ist der wichtigste. Danach den Wert wieder zurücksetzen.

## Gesprächspunkte

- **Häufigkeit ist keine Gefahr.** Der längste Balken ist «Surfing & board
  sports» mit 42 Prozent. Das heisst nicht, dass Surfen gefährlich ist – es
  heisst, dass Surfende viel Zeit im Wasser verbringen. Für eine Aussage über
  Risiko fehlt der Nenner: Wie viele Stunden verbringt wer im Wasser? Diese
  Zahl hat niemand. Deshalb steht die Grenze der Aussage im Fuss der Seite und
  nicht im Kleingedruckten.
- **Der Titel ist Teil der Grafik.** «Welche Hai-Arten sind erfasst?» ist etwas
  anderes als «Welche Hai-Arten greifen an?». Die erste Frage kann diese Grafik
  beantworten, die zweite nicht.
- **Kein Diagrammtyp ist neutral.** Dieselben zehn Zahlen wären als Kreis
  unlesbar, als Linie schlicht falsch und als liegender Balken sofort
  verständlich. Die Wahl ist eine inhaltliche Entscheidung.
- **Warum die Prozentwerte im Browser gerechnet werden.** Es sind zehn Zahlen,
  und der Anteil hängt davon ab, welche Rangliste gerade gezeigt wird. Für so
  etwas baut man keinen zweiten Endpunkt.
- **Derselbe Bauplan, drittes Mal.** Holen, umformen, zeichnen, reagieren. Wer
  16, 17 und 18 nebeneinanderlegt, sieht: Der Rahmen bleibt, die
  Entscheidungen wechseln mit den Daten.

## Häufige Fehler

| Meldung oder Symptom | Ursache |
| --- | --- |
| 17 Balken statt 10 | `forDimension()` filtert nicht |
| alle Balken gleich gefärbt | `backgroundColor` ist eine einzelne Farbe statt einer Liste |
| Beschriftungen abgeschnitten | `indexAxis: 'y'` fehlt |
| einzelne Beschriftungen fehlen | `autoSkip: false` fehlt |
| Tooltip zeigt `undefined %` | `shares` fehlt im dataset |
| Fehlermeldung lautet nur «Status 400» | Der Körper der Fehlerantwort wird nicht gelesen |
| Titel bleibt bei «Rangliste» stehen | `render()` setzt `chart-title` nicht |
| Diagramm bleibt leer | `load.php` aus Code-Along 13 wurde nie aufgerufen |
