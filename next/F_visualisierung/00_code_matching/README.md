# Code-Matching

> Welcher Code zeichnet welche Grafik? Zu zweit, ohne Laptop. Richtwert:
> 10 Minuten Matching, 5 Minuten Auflösung.

## Ziel

Ihr lest eine Chart.js-Konfiguration und erkennt, welche Zeile das Aussehen
der Grafik bestimmt: `type`, die Anzahl Datasets, `indexAxis`, `min` auf der
Achse, `stacked`.

## Material

| Datei | Wofür |
| --- | --- |
| [`matching.html`](matching.html) | Druckblatt: Seite 1 Codekarten A–H, Seite 2 Grafiken 1–8 |
| [`karten.js`](karten.js) | Die acht Karten. Der Code auf der Karte ist genau der Code, der die Grafik zeichnet |

Im Browser öffnen und A4 hoch drucken, farbig, mit Hintergrundgrafiken. Ein
Satz pro Paar.

Zwei Varianten:

- **Als Blatt:** Die Paare tragen bei jeder Grafik den Buchstaben ins Kästchen
  ein. Kein Schneiden nötig.
- **Als Karten:** Entlang der gestrichelten Linien ausschneiden, mischen und pro
  Paar in ein Couvert legen. Die Paare legen Code und Grafik nebeneinander.
  Mehr Aufwand in der Vorbereitung, aber haptischer und schneller zu
  kontrollieren.

## Aufbau der Karten

Sechs Codekarten für alle, zwei Bonuskarten für schnelle Paare. Die acht
Grafiken sind gemischt nummeriert. Wer nur A bis F löst, hat also zwei
Grafiken übrig, und die letzte Zuordnung ergibt sich nicht von selbst.

Die Karten sind absichtlich ähnlich. Es gibt jeweils Paare, die sich nur in
einer Zeile unterscheiden:

| Paar | Der Unterschied |
| --- | --- |
| A ↔ B | `indexAxis: 'y'` legt die Balken hin |
| A ↔ C | `min: 20` schneidet die Achse ab – dieselben Zahlen wirken völlig anders |
| D ↔ E | `type: 'line'` oder `'bar'` bei denselben zwei Datasets |
| E ↔ G | `stacked: true` stapelt die Balken statt sie nebeneinanderzustellen |
| F ↔ H | `'doughnut'` oder `'pie'` |

## Lösung

| Code | A | B | C | D | E | F | G | H |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| Grafik | 4 | 8 | 2 | 6 | 1 | 7 | 5 | 3 |

## Auflösung im Plenum

1. Folie «Die Auflösung»: Lösung einblenden, Paare kontrollieren selbst.
2. Fragen: «Bei welchem Paar wart ihr euch am wenigsten sicher – und welche
   Zeile hat entschieden?» Meist kommen A ↔ C und E ↔ G.
3. Folie «A und C zeigen dieselben Zahlen»: Die abgeschnittene Achse ist die
   Brücke zurück zum Einstieg und voraus zur Lügen-Karte in der Werkstatt.

## Auswertung

Wer A ↔ C verwechselt, liest die Achsenbeschriftung nicht. Genau das ist im
Projekt später die häufigste Ursache für irreführende Grafiken. Diese Paare in
der Werkstatt gezielt auf Karte 5 (Achsen beschriften) hinweisen.
