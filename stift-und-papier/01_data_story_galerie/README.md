# 01 – Data-Story-Posten

> **Ziel:** Die Studierenden schauen sich fertige Data-Storys an und finden
> heraus, welche Daten dahinterstecken – bevor sie wissen, wie man so etwas
> baut. Botschaft am Schluss: Hinter jeder dieser Grafiken steht eine Tabelle,
> ein Datensatz.

**Dauer:** 40' inklusive Auswertung · **Sozialform:** freier Postenlauf zu
zweit → Plenum

**Einsatz:** im Kickoff, direkt nach dem Kapiteltrenner «Workshop
Data-Storys» der [Kickoff-Folien](../../theorie/00_kickoff/index.html). Die
Auswertung läuft danach über die Folie «Resultate Workshop».

**Lernphase:** Irritation und Vorwissen aktivieren (MOMBI 1–2, siehe
[Werkzeugkasten](../../dozierende/unterrichtsplanung/README.md))

## Warum diese Übung

Die Studierenden bauen in den nächsten Wochen eine Data-Story, ohne je eine
auseinandergenommen zu haben. Diese Übung dreht die Reihenfolge um: Zuerst
kommt das fertige Ergebnis, dann die Überlegung rückwärts, was es dafür
gebraucht hat. Nebenbei zeigt sie, wie unterschiedlich Data-Storys aussehen
dürfen – vom persönlichen Begegnungsprotokoll bis zu gekauften Ortungsdaten.

## Raum und Bestuhlung

- **Plenum ohne Tische.** Stühle im Halbkreis zur Leinwand, die Tische an den
  Rand oder aus dem Raum. So ist die Fläche für den Postenlauf frei und die
  Auswertung braucht kein Umstellen.
- Die Posten stehen rundherum an den Wänden, mit genug Abstand, damit Gruppen gleichzeitig davorstehen können.
- Vor der Lektion einrichten!

## Die Posten

| #   | Posten                                                              | Story                                                                                                       | Was am Posten steht                     |
| --- | ------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------- | --------------------------------------- |
| 1   | [Wo die Parkbussen herkommen](posten/01_parkbussen)                 | [WIRED-Artikel zur stillgelegten Live-Karte](https://www.wired.com/story/san-francisco-find-my-parking-cops/) | Blatt, ausgedruckter WIRED-Artikel      |
| 2   | [My Social Year 2024](posten/02_my_social_year)                     | [verwandter Post auf r/dataisbeautiful](https://www.reddit.com/r/dataisbeautiful/comments/1ib3r2m)          | Blatt, persönliche Jahreskarte          |
| 3   | [The Pour-igin of Species](posten/03_pourigin_of_species)           | [The Pudding](https://pudding.cool/2025/04/wine-animals/)                                                   | Blatt, Laptop mit offener Seite         |
| 4   | [Der Spion in unseren Handys](posten/04_handy_ortungsdaten)         | [SRF Data](https://www.srf.ch/news/schweiz/tracking-mit-ortungsdiensten-der-spion-in-unseren-handys)        | Blatt, Laptop mit offener SRF-Recherche |
| 5   | [Stromexporte der Schweiz](posten/05_1kwh)                          | [1kwh.ch](https://1kwh.ch)                                                                                  | Blatt, Laptop mit offener Live-Seite    |

Jeder Posten-Ordner enthält das Blatt zum Ausdrucken (`posten.html`), das Bild,
den QR-Code und die erwarteten Antworten. Details zum Drucken stehen in
[`posten/README.md`](posten/README.md).

## Material

- Fünf Postenblätter, je einmal ausgedruckt und aufgehängt.
- Die Seiten 1 bis 4 des WIRED-Artikels von Posten 1 ausgedruckt zum Lesen.
- Die persönliche Jahreskarte von Posten 2.
- Drei Laptops oder Tablets mit Kopfhörern für die Posten 3 bis 5.
- [`arbeitsblatt.html`](arbeitsblatt.html) als Laufzettel im Browser öffnen,
  `Cmd+P`, A4 quer, Hintergrundgrafiken an. Pro Person ein Blatt und ein Stift.
- Whiteboard mit vier vorbereiteten Spalten für die Auswertung.

## Auftrag

Die Paare gehen frei herum, in der Reihenfolge, die sie interessiert. **Drei
ausgefüllte Posten reichen.** Pro Posten beantworten sie auf dem Laufzettel
zwei Fragen:

1. **Welche Daten stecken dahinter?** Eine Zeile der Tabelle aufschreiben, die
   es geben muss, damit diese Grafik existieren kann.
2. **Woher kommen die Daten, und über welchen Zeitraum wurden sie gesammelt?**

Zum Schluss halten sie fest, welcher Posten sie am meisten überzeugt hat. Es
geht nicht darum, Technik zu erraten, sondern ausschliesslich um die Daten.

## Verlauf

| #   | Schritt                                                                                                                               | Dauer |
| --- | ------------------------------------------------------------------------------------------------------------------------------------- | ----: |
| 1   | **Rahmen:** Laufzettel austeilen, die zwei Fragen vorlesen, Posten zeigen. Klar sagen: drei Posten genügen, es geht nicht um Technik. |    3' |
| 2   | **Postenlauf:** zu zweit frei herumgehen. Bei Fragen nicht erklären, sondern zurückfragen: «Was müsste in der Tabelle stehen?»        |   25' |
| 3   | **Share:** pro Posten ein Paar berichten lassen, Antworten am Whiteboard in vier Spalten sammeln.                                     |    8' |
| 4   | **Abschluss:** Die vier Spalten benennen – Daten, Zeit, Darstellung, Einbettung. Danach zurück auf die Folien.                        |    4' |

Wenn es an einem Posten staut: darauf hinweisen, dass die Reihenfolge egal ist.

## Erwartete Antworten

| Posten             | Daten                                                | Quelle                                      | Zeitraum                              |
| ------------------ | ---------------------------------------------------- | ------------------------------------------- | ------------------------------------- |
| 1 Parkbussen       | Kontrolleur, Adresse, Zeit, Bussenart und Betrag      | Ticketsystem der SFMTA, ausgelesen          | wenige Stunden am 23. September 2025  |
| 2 My Social Year   | Datum, Person, bewusste Begegnung ja/nein             | selbst geführt                              | ein Kalenderjahr, 2024                |
| 3 Pour-igin        | Wein, Preis, Bewertung, Rebsorte, erkanntes Tier      | Vivino, Tiere per Bilderkennung ergänzt     | einmalige Sammlung im März 2024       |
| 4 Handy-Ortung     | Geräte-Kennung, Koordinaten, Zeitstempel              | Apps und Datenhändler, von SRF gekauft      | rund eine Woche im März 2024          |
| 5 Stromexporte     | Zeitpunkt, Nachbarland, Leistung in MW                | Swissgrid                                   | laufend, alle zehn Sekunden           |

Resultat: pro Person ein Laufzettel mit mindestens drei ausgefüllten Posten.

## Worauf es ankommt

- Die Zeitspalte wird fast immer vergessen. Genau daran zeigt sich, dass eine
  Data-Story eine Entwicklung braucht und nicht nur eine Zahl.
- Die Posten sammeln unterschiedlich: laufend (5), einmalig abgegriffen (1, 3,
  4) und über lange Zeit selbst geführt (2). Dieser Unterschied ist der
  Aufhänger für das Kapitel zu den Datenquellen.
- Posten 1 ist das Argument für einen eigenen Datenbestand: Die Seite lief nur
  vier Stunden, dann war die Quelle weg.
- Posten 2 und 3 wirken gegen die Sorge, ein Projekt müsse weltbewegend sein.
- Posten 4 zeigt, dass scheinbar anonyme Daten sehr konkrete Folgen für
  Menschen haben können.
- Posten 5 macht Live-Daten und den laufenden Datenfluss unmittelbar sichtbar.

## Vor jedem Durchlauf prüfen

- Alle Links und QR-Codes einmal antippen, Websites verschwinden ohne Vorwarnung.
- Fällt ein Posten aus, steht Ersatz bereit in
  [`posten/_speicher`](posten/_speicher).
