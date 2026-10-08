# F Frontend – Chart.js in der Werkstatt

> Alternative Unterrichtseinheit zu Chart.js. Statt zwei langer Code-Alongs
> gibt es einen kurzen Code-Along und danach eine Werkstatt, in der die
> Studierenden selbst entscheiden, ausprobieren und Fehler finden. Am Ende
> steht die eigene Projektgrafik mit echten Daten (M8).
>
> Geplant mit `dozierende/unterrichtsplanung/README.md`. Dauer etwa 3¾ Stunden
> inklusive Pause.

## Warum anders

Die bisherigen Code-Alongs 16 und 17 lassen die Studierenden 70 und 60 Minuten
mittippen. Der grösste Teil davon ist Infrastruktur (`fetch`-Prüfungen, `Set`,
`sort`, `chart.update()`), Chart.js selbst sind wenige Zeilen. Die
Studierenden tippen viel und entscheiden nichts.

Chart.js ist aber kein Algorithmus, sondern ein Konfigurationsobjekt. Man
lernt es am besten, indem man ein funktionierendes Diagramm verändert. Diese
Einheit folgt deshalb dem Muster **Vorhersagen → Ausführen → Verändern →
Selbst bauen** (PRIMM, Use-Modify-Create).

## Lernziele

Die Student:innen können …

| Lernziel | Bloom-Stufe | Lernaktivität | Nachweis |
| --- | --- | --- | --- |
| eine mögliche Verzerrung der eigenen Datenquelle benennen (Survivorship Bias) | Analysieren | Einstieg mit den Flugzeugen, Grafik-Ticket | genannte Lücke im Projektteam, Lügen-Check auf dem Ticket |
| für eine Datenaussage einen passenden Diagrammtyp wählen und die Wahl begründen | Evaluieren | Welche Grafik ist am neutralsten?, Lügen-Karte, Grafik-Ticket | Begründung bei der Abstimmung, Feld 2 und 3 auf dem Ticket |
| Chart.js-Konfigurationen den passenden Grafiken zuordnen und die entscheidende Zeile benennen | Analysieren | Code-Matching | ausgefülltes Matching-Blatt, Begründung bei der Auflösung |
| eine Chart.js-Konfiguration anpassen (Typ, Farbe, Titel, Achsen, Datasets) | Anwenden | Chart-Werkstatt | gelöste Karten an der Kartenwand |
| JSON-Datensätze mit `map()` und `filter()` in `labels` und `data` umformen | Anwenden | Code-Along, Werkstatt-Karten 6, 9, 10 | Diagramm stimmt mit dem Zielbild überein |
| typische Fehlermeldungen beim Laden ihrer Ursache zuordnen | Analysieren | Fehler-Zuordnung | Zuordnung in Paaren |
| die eigene Projektgrafik an den eigenen Endpunkt anschliessen | Erschaffen | Projektarbeit | Fortschrittsboard Spalte 4 = **M8** |

## Ablaufplan

| Zeit | Dauer | Lerninhalt und Lernphase | Methode und Sozialform | Material | Beobachtung oder Nachweis |
| --- | ---: | --- | --- | --- | --- |
| 0:00 | 10' | **Wo würdet ihr die Flugzeuge verstärken?** Survivorship Bias nach Abraham Wald – Irritation | Plenum: alle zeigen auf die Stellen, Auflösung, dann zwei Minuten Austausch im Projektteam: Was fehlt in unseren Daten? | Folien 2–4 | Jede Gruppe nennt eine mögliche Lücke ihrer Datenquelle |
| 0:10 | 10' | **Welche Grafik ist am neutralsten?** Drei Grafiken derselben Hitzesommer-Daten – Irritation | Abstimmung per Handzeichen im Plenum, zwei, drei Begründungen | Folien 5–8 | Begründungen nennen Achse und Diagrammtyp |
| 0:20 | 15' | **Welcher Code zeichnet welche Grafik?** – Vorwissen aktivieren | Code-Matching in Partnerarbeit ohne Laptop (10'), Auflösung im Plenum (5') | Folien 9–12, [`00_code_matching/`](00_code_matching/) | Matching-Blatt; wer A und C verwechselt, übersieht die Achse |
| 0:35 | 20' | **Vom Endpunkt zum Balken** – Informationen aufnehmen und verarbeiten | Kurzinput (5'), dann Code-Along mit Vorhersagen und Diktat durch die Klasse | Folien 13–16, [`01_code_along_balken/`](01_code_along_balken/) | Jede Person hat ein Balkendiagramm im Browser |
| 0:55 | 40' | **Chart-Werkstatt** – üben und vertiefen | Pair Programming mit Rollentausch nach jeder Karte | Folien 17–18, [`02_chart_werkstatt/`](02_chart_werkstatt/) | Kartenwand nach Stufen |
| 1:35 | 15' | **Lügen-Karte und Galerie** – übertragen und reflektieren | Partnerarbeit (5'), dann Galerie im Plenum: drei Paare zeigen, die Klasse findet den Trick | Folie 19, Wandtafel | Liste der gefundenen Tricks an der Wandtafel |
| 1:50 | 15' | **Pause** | | | |
| 2:05 | 15' | **Echte Daten, echte Fehler** – Fehlerdiagnose | Zuordnung in Partnerarbeit, Auflösung im Plenum; Kurzinput zu CORS und Übergabe | Folien 20–23 | Zuordnungen der Paare |
| 2:20 | 10' | **Grafik-Ticket** – planen | Leitfragenbasierte Gruppenarbeit im Projektteam, auf Papier | Folien 24–25, [`03_projekt/grafik-ticket.html`](03_projekt/grafik-ticket.html) | Visum der Lehrperson auf dem Ticket |
| 2:30 | 60' | **Eigene Grafik bauen** – selbst bauen | Projektarbeit, Frontend- und Backend-Paar parallel | Folie 26, [`03_projekt/fortschrittsboard.html`](03_projekt/fortschrittsboard.html) | Fortschrittsboard, Ziel Spalte 4 = **M8** |
| 3:30 | 15' | **Speed-Galerie und Exit Ticket** – Ergebnissicherung | Gruppen tauschen Laptops und sagen die Aussage der fremden Grafik in einem Satz; Exit Ticket in Einzelarbeit | Folien 27–28, [`03_projekt/exit-ticket.html`](03_projekt/exit-ticket.html) | Satz stimmt mit Ticket überein; Exit Tickets |

**Wenn die Zeit knapp ist:** Nicht bei der Projektzeit kürzen. Lieber das Matching auf die
Karten A bis F beschränken, die Werkstatt auf 30 Minuten begrenzen und beim
Einstieg die Frage an die Projektteams weglassen.

## Vorbereitung

### Am Endpunkt (wichtig)

Code-Along und Werkstatt holen die Daten von

```text
https://26hs.nickschnee.ch/code-alongs/C_transform/09_hitzesommer_transformieren/unload.php
```

Die Seiten der Studierenden laufen auf einer anderen Domain oder per
Doppelklick. Ohne CORS-Header blockiert der Browser die Antwort. In
`code-alongs/C_transform/09_hitzesommer_transformieren/unload.php` unter dem
bestehenden Header ergänzen und hochladen:

```php
header("Access-Control-Allow-Origin: *");
```

Danach `01_code_along_balken/solution/index.html` per Doppelklick öffnen –
das Diagramm muss erscheinen.

### Drucken

| Was | Datei | Menge |
| --- | --- | --- |
| Code-Matching | `00_code_matching/matching.html` | 1 pro Paar, farbig – als Blatt oder ausgeschnitten im Couvert |
| Auftragskarten | `02_chart_werkstatt/auftragskarten.html` | 1 Set pro Paar, farbig, ausgeschnitten |
| Grafik-Ticket | `03_projekt/grafik-ticket.html` | 1 pro Projektgruppe |
| Fortschrittsboard | `03_projekt/fortschrittsboard.html` | 1 ×, auf A3 |
| Exit Ticket | `03_projekt/exit-ticket.html` | 1 Zettel pro Person (6 pro A4) |

Dazu: ein Plakat oder eine Wandtafelfläche als **Kartenwand** mit den Spalten
Stufe 1, 2, 3, Klebepunkte oder Magnete in einer Farbe pro Gruppe, Papier für
die Skizzen.

### Im Raum

- Folien öffnen: `folien/index.html` (die Diagramme auf den Folien
  funktionieren auch ohne Endpunkt, sie nutzen `daten/hitzesommer.js`).
- Den Endpunkt einmal im Browser zeigen können.

## Ordner

| Ordner | Inhalt |
| --- | --- |
| [`folien/`](folien/) | Foliensatz für die ganze Einheit, mit Live-Diagrammen; PDF-Export `chartjs-werkstatt.pdf` |
| [`00_code_matching/`](00_code_matching/) | Acht Codekarten und acht Grafiken zum Zuordnen, Lösung im [README](00_code_matching/README.md) |
| [`01_code_along_balken/`](01_code_along_balken/) | Sehr kurzer Code-Along: `fetch → map → new Chart`, Startcode, Lösung und [Ablauf](01_code_along_balken/Ablauf/01_code_along_balken_ablauf.md) |
| [`02_chart_werkstatt/`](02_chart_werkstatt/) | Auftragskarten mit Zielbildern, Startstand, Lösung pro Karte, [README](02_chart_werkstatt/README.md) |
| [`03_projekt/`](03_projekt/) | Grafik-Ticket, Fortschrittsboard, Exit Ticket, [README](03_projekt/README.md) |
| `daten/` | Momentaufnahme des Endpunkts vom 07.10.2026 als JSON und als JS-Datei für die Folien |

## Auswertung und nächste Lektion

- **Kartenwand:** Hängen viele bei Stufe 1, braucht der Projektteil mehr
  Begleitung.
- **Liste der Lügen-Tricks:** Bleibt an der Wand und ist die Checkliste für
  die Projektgrafiken vor dem Marktstand.
- **Fortschrittsboard:** Gruppen, die nicht in Spalte 4 ankommen, werden in
  der nächsten Lektion zuerst betreut.
- **Exit Tickets:** Die häufigste Unklarheit wird der Einstieg der nächsten
  Lektion. «Was fehlt bis zum Marktstand?» ergibt die Prioritätenliste pro
  Gruppe.

## Verhältnis zum bestehenden Material

`ablauf.md` und die Code-Alongs 16 bis 19 in `code-alongs/F_visualisierung/`
sind unverändert. Sie bleiben als Nachschlagematerial für Studierende, die mehr
wollen, zum Beispiel Fehlerbehandlung mit `response.ok`, Filter über den
Endpunkt oder Karten mit Leaflet.
