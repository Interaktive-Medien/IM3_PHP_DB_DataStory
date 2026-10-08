# Chart-Werkstatt

> Ihr verändert ein fertiges Diagramm Karte für Karte und entdeckt dabei, was
> Chart.js alles kann. Richtwert: 40 Minuten plus 15 Minuten Lügen-Galerie.

## Ziel

Ihr könnt eine Chart.js-Konfiguration selbst anpassen: Diagrammtyp, Farben,
Titel, Achsen, Auswahl der Daten und mehrere Datasets. Dafür lest ihr die
Doku statt Code abzutippen.

## Material

| Datei | Wofür |
| --- | --- |
| [`auftragskarten.html`](auftragskarten.html) | Regelkarte, Startkarte, 11 Auftragskarten, Lügen-Karte und Notizkarte auf zwei A4-Seiten. Farbig drucken, mit dem Papierschneider pro Seite 1 senkrechter und 3 waagrechte Schnitte |
| `start/` | Der fertige Stand des Code-Alongs – Neustart, wenn man sich verrannt hat |
| `zielbilder/` | Die Bilder auf den Karten, Screenshots der Lösungen |
| [`solution/loesungen.md`](solution/loesungen.md) | Übersicht und eine vollständige Lösung pro Karte |

Ein Kartenset pro Paar, ausserdem eine **Kartenwand**: ein leeres Plakat oder
ein Stück Wandtafel mit den Spalten «Stufe 1», «Stufe 2», «Stufe 3». Gelöste
Karten kommen dorthin, mit den Namen des Paars.

## Spielregeln

1. Zu zweit an einem Laptop.
2. Eine Person tippt, die andere liest die Karte und sucht in der Doku.
3. Nach jeder Karte werden die Rollen getauscht.
4. Die Reihenfolge ist frei – Stufe 1 vor Stufe 3.
5. Gearbeitet wird in der Datei vom Code-Along.
6. Erlaubt sind `chartjs.org/docs`, das Cheatsheet und AI mit «Erkläre mir …»,
   nicht mit «Schreib mir …».

Das Zielbild auf der Karte ist die Selbstkontrolle. Stimmt das eigene
Diagramm damit überein, ist die Karte gelöst.

## Ablauf für Dozierende

| Zeit | Was passiert |
| --- | --- |
| 0' | Regeln zeigen (Folie «Chart-Werkstatt»), Kartensets verteilen |
| 0'–40' | Paare arbeiten. Herumgehen, bei Fragen zuerst fragen: «Was steht in der Doku dazu?» |
| 25' | Kurzer Blick auf die Kartenwand. Paare, die noch auf Stufe 1 sind, gezielt besuchen |
| 40' | Alle ziehen die **Lügen-Karte**, 5 Minuten |
| 45'–55' | Galerie: drei Paare zeigen ihre Lügen-Grafik, die Klasse benennt den Trick |

## Auswertung

- **Kartenwand:** Zeigt auf einen Blick, wo die Klasse steht. Wenn die
  meisten bei Stufe 1 hängen, im Projektteil stärker begleiten. Wenn kaum
  jemand Karte 10 oder 11 geschafft hat, diese im Projekt bei Bedarf einzeln
  zeigen.
- **Lügen-Galerie:** Die gefundenen Tricks an der Wandtafel sammeln. Diese
  Liste ist gleichzeitig die Checkliste für die eigene Projektgrafik: Keinen
  dieser Tricks darf eure Grafik enthalten.

## Hinweis zum Endpunkt

Die Werkstatt holt die Daten vom Endpunkt auf `26hs.nickschnee.ch`. Damit das
von anderen Domains und per Doppelklick funktioniert, braucht der Endpunkt den
Header `Access-Control-Allow-Origin: *` (siehe
[Ablauf des Code-Alongs](../01_most_simple_chartjs/Ablauf/01_most_simple_chartjs_ablauf.md)).
