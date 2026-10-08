# Projekt: Die eigene Grafik

> Vom Satz zur Skizze zur Grafik mit echten Daten. Richtwert: 10 Minuten
> Ticket, 60 Minuten Umsetzung, 15 Minuten Abschluss. Ziel ist **M8: Erste
> Integration steht**.

## Material

| Datei | Wofür | Drucken |
| --- | --- | --- |
| [`grafik-ticket.html`](grafik-ticket.html) | Aussage, Diagrammtyp, Felder aus dem Datenvertrag, Skizze, Lügen-Check | 1 × pro Projektgruppe, A4 hoch |
| [`fortschrittsboard.html`](fortschrittsboard.html) | Vier Spalten von der Skizze bis M8, an die Wand | 1 ×, A4 quer, am besten auf A3 vergrössert |
| [`exit-ticket.html`](exit-ticket.html) | Zwei Fragen zum Schluss | 6 Zettel pro A4, 1 pro Person |

Dazu Klebepunkte oder Magnete in einer Farbe pro Gruppe.

## Verlauf

### 1 Grafik-Ticket (10')

Die Gruppe füllt das Ticket gemeinsam aus, alle vier Personen. Die Skizze
entsteht auf Papier, nicht am Laptop.

Die Lehrperson gibt das Ticket mit einem Visum frei. Kurze Prüffragen dabei:

- Ist die Aussage ein ganzer Satz, nicht nur ein Thema?
- Passt der Diagrammtyp zur Aussage (Verlauf, Vergleich, Anteil)?
- Gibt es die Felder für `labels` und `data` im Datenvertrag wirklich?
- Ist keiner der Tricks aus der Lügen-Galerie drin?

Erst mit Visum geht es an den Laptop – ohne Visum gibt es kein Programmieren.

### 2 Umsetzung (60')

Die zwei Zweierteams arbeiten parallel:

| Frontend-Paar | Backend-Paar |
| --- | --- |
| baut die Grafik mit einer JSON-Datei nach dem Datenvertrag (Mock-Daten) | prüft den eigenen Endpunkt im Browser: valides JSON, richtige Felder, richtige Sortierung |
| nimmt den Code aus Code-Along und Werkstatt als Vorlage | ergänzt den CORS-Header, falls Frontend und Endpunkt auf verschiedenen Domains liegen |

Sobald beide Seiten stehen: **eine Zeile ändern** – die URL der Mock-Datei
durch die URL des Endpunkts ersetzen. Funktioniert die Grafik danach
unverändert, haben beide Seiten den Datenvertrag eingehalten.

Jede Gruppe verschiebt ihren Klebepunkt auf dem Fortschrittsboard selbst.
Die Lehrperson geht zuerst zu den Gruppen, die am weitesten links stehen.

### 3 Abschluss (15')

**Speed-Galerie (10'):** Je zwei Gruppen tauschen die Laptops. Die andere
Gruppe schaut die Grafik eine Minute lang an und sagt die Aussage in einem
Satz. Stimmt der Satz mit Feld 1 auf dem Grafik-Ticket überein, erzählt die
Grafik, was sie soll. Wenn nicht, fehlt meist ein Titel, eine
Achsenbeschriftung oder eine Hervorhebung – passende Werkstatt-Karte nennen.

**Exit Ticket (5'):** Jede Person füllt einen Zettel aus.

## Auswertung

- **Fortschrittsboard:** Gruppen, die nicht in Spalte 4 angekommen sind,
  bekommen in der nächsten Lektion zuerst Betreuung.
- **Exit Tickets:** Nach Gruppen sortieren. Die häufigste Antwort auf
  «Was war am unklarsten?» wird der Einstieg der nächsten Lektion. Die
  Antworten auf «Was fehlt bis zum Marktstand?» ergeben die Prioritätenliste
  pro Gruppe.
