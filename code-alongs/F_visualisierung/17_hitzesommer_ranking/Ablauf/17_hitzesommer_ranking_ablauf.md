# Ablauf `17_hitzesommer_ranking`

> **Ziel:** Ein zweites Diagramm mit einem anderen Diagrammtyp, dazu zwei
> Bedienelemente, die den Server nicht fragen. Richtwert: 60 Minuten.

## Ausgangslage

Der Startcode ist der **fertige Stand von Code-Along 16**. Die Seite läuft
schon: Sie lädt den Endpunkt, zeichnet das Liniendiagramm und reagiert auf die
Stadtauswahl. Wer 16 nicht fertig hat, startet trotzdem hier – der Code ist
vollständig.

Hochladen und über die eigene Domain öffnen:

→ `https://eure-domain.ch/code-alongs/F_visualisierung/17_hitzesommer_ranking/`

Auch heute gilt: In der Adressleiste steht die eigene Domain, nicht `localhost`.

Neu im HTML sind ein zweites `<canvas>`, ein Schieber und zwei Knöpfe. Im
JavaScript sind sechs TODO-Marken zu füllen.

## Vor dem Code (10')

### Warum ein zweites Diagramm?

Zuerst die Aussage, dann der Diagrammtyp – dieselbe Reihenfolge wie gestern.
Die neue Frage lautet: «Welches waren die heissesten Sommer?»

Das ist keine Entwicklung mehr, sondern eine **Rangliste**. Kurz die Gegenprobe
machen: Die zehn heissesten Sommer als Linie würden behaupten, dass 2003 in
2015 übergeht. Deshalb Balken – und weil die Beschriftungen «2003 · Zürich»
Platz brauchen, liegend.

| Aussage | Diagramm |
| --- | --- |
| Entwicklung über die Zeit | Linie (Code-Along 16) |
| Rangliste, Vergleich | Balken (heute) |

### Zwei Sorten Interaktion

Der zweite Gedanke des Tages, und er lohnt sich als Frage an die Klasse:
*Muss jede Bedienung den Server fragen?*

In Code-Along 16 hat die Stadtauswahl den Endpunkt neu angefragt. Heute kommen
zwei Bedienelemente dazu, die das nicht tun – die Daten liegen ja schon im
Browser. Die Hinweise unter den Bedienelementen sagen es bereits, im
Netzwerk-Tab wird es sichtbar.

Die Regel dazu: **Der Server filtert, was viel ist. Der Browser filtert, was
schon da ist.** Bei 258 Zeilen wäre beides richtig; bei 200'000 Zeilen wäre nur
noch der Server möglich.

## Schritte im Code (35')

### Baustein 1 – Die Rangliste (15')

1. **TODO 1:** `topSummers()` – sortieren und abschneiden. Zwei Dinge
   besprechen: `b - a` sortiert absteigend, und `[...rows]` macht vorher eine
   Kopie, weil `sort()` die Liste verändert, auf der es aufgerufen wird.
2. **TODO 2:** Das Balkendiagramm erzeugen und in `render()` füllen. Die
   `options` sind vorbereitet; der einzige interessante Eintrag darin ist
   `indexAxis: 'y'`.

   Bei den Farben kurz innehalten: `backgroundColor` ist hier eine **Liste**,
   eine Farbe pro Balken. Weil jede Stadt ihre Farbe aus dem ersten Diagramm
   behält, braucht die Rangliste keine Legende. Farbe ist hier Beschriftung.

Hier lohnt sich eine Pause zum Lesen: Neun der zehn stärksten Sommer liegen
nach 2000, dazwischen einmal 1947. Das ist der Moment, in dem aus einer
Datenbankabfrage eine Aussage wird.

### Baustein 2 – Der Zeitraum (10')

3. **TODO 3:** `visibleSummers()` schreiben und `render()` darauf umstellen.
   Wichtig ist die eine Zeile am Anfang von `render()`: Ab jetzt arbeitet die
   Funktion mit dem Ausschnitt, nicht mehr mit allen geladenen Daten.
4. **TODO 4:** Den Schieber anschliessen. Den Netzwerk-Tab dabei offen lassen –
   er bleibt still. Das ist der sichtbare Beweis für die Regel von vorhin.

   Nebenbei: Die Überschrift «im gewählten Zeitraum» stimmt jetzt. Wer den
   Schieber auf 1990 zieht, sieht eine andere Rangliste.

### Baustein 3 – Der Messwert (10')

5. **TODO 5:** `METRICS`, die Zustandsvariable und die Umstellung von
   `row.hot_days` auf `row[metric]`. Das ist der Kniff des Tages, und er ist
   kurz: Weil die Schlüssel in `METRICS` genau so heissen wie die Felder im
   Datenvertrag, braucht es kein `if` und keine zweite Funktion.

   Dazu die Achsenbeschriftung und `beginAtZero` – siehe Gesprächspunkte.
6. **TODO 6:** Die Knöpfe anschliessen und `is-active` umhängen.

Wenn die Zeit knapp wird, ist Baustein 3 die Kür: Die Bausteine 1 und 2 tragen
die Erkenntnis des Tages bereits.

## Kontrolle (15')

| Handlung | Erwartung |
| --- | --- |
| Seite laden | zwei Diagramme, Rangliste angeführt von «2003 · Zürich» |
| Schieber auf 1990 | beide Diagramme kürzer, **kein** Netzwerkaufruf |
| Schieber auf 2010 | Rangliste zeigt nur noch Sommer ab 2010 |
| Stadt «Bern» wählen | Netzwerkaufruf mit `?city=Bern`, Rangliste nur mit Bern |
| «Höchste Temperatur» klicken | beide Achsen wechseln zu Grad, kein Netzwerkaufruf |
| bei «Höchste Temperatur» auf die Y-Achse schauen | beginnt nicht bei null – und das ist Absicht |

## Gesprächspunkte

- **Beginnt die Achse bei null?** Bei einer Anzahl ja, sonst wirkt jede
  Schwankung wie ein Sprung. Bei Temperaturen nein: Zwischen 0 und 26 Grad
  passiert in diesen Daten nichts, und die Null würde alle Unterschiede
  plattdrücken. Im Code steht dafür eine Zeile – die Entscheidung dahinter ist
  journalistisch, nicht technisch. Das ist die beste Stelle im ganzen Block,
  um über ehrliche und unehrliche Achsen zu reden.
- **Ein Zustand, eine Zeichenfunktion.** Drei Bedienelemente, zwei Diagramme,
  aber nur ein `render()`. Jede Interaktion ändert eine Variable und ruft
  dieselbe Funktion. Wer stattdessen in jedem Listener am Diagramm herumbaut,
  hat nach dem dritten Bedienelement einen unlesbaren Code.
- **Farbe ist Beschriftung.** Dieselbe Stadt hat in beiden Diagrammen dieselbe
  Farbe, deshalb spart die Rangliste die Legende. Wer die Farben pro Diagramm
  neu vergibt, macht aus einer Lesehilfe eine Falle.
- **Wie viele Bedienelemente braucht eine Story?** Diese Seite hat jetzt drei –
  für ein Kursprojekt ist das die Obergrenze, nicht das Ziel. Jedes
  Bedienelement will erklärt, getestet und am Marktstand bedient werden. Ein
  Diagramm, das seine Aussage ohne Klick zeigt, ist besser als eines, das sie
  versteckt.

## Häufige Fehler

| Meldung oder Symptom | Ursache |
| --- | --- |
| `Canvas is already in use` | `new Chart()` steht in `render()` statt daneben |
| alle Balken haben dieselbe Farbe | `backgroundColor` ist eine einzelne Farbe statt einer Liste |
| Linie springt nach dem Schieben | `sort()` wurde auf `summers` statt auf einer Kopie aufgerufen |
| Schieber ändert nur ein Diagramm | `render()` benutzt teils `summers`, teils `rows` |
| Zahl neben «Ab Jahr» bleibt stehen | `fromYearValue.textContent` fehlt |
| Messwert wechselt, Achse nicht | Achsentitel wird nur in den `options` gesetzt, nicht in `render()` |
| Knöpfe sehen beide aktiv aus | `is-active` wird gesetzt, aber beim anderen nicht entfernt |
| Rangliste bleibt leer | `topSummers()` gibt noch `[]` zurück |
