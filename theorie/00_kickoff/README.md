# Kickoff (Slides)

> **Ziel:** Der Einstieg in den Kurs. Knüpft an das an, was die Klasse aus den
> bisherigen Modulen kann, zeigt das Backend als das Neue, benennt die Kette von
> der Datenquelle bis zur Grafik und öffnet den Blick dafür, woher Daten
> überhaupt kommen. Kein PHP. Richtwert: 20 Minuten bis zum Postenlauf,
> danach nochmals rund 25 Minuten.

## Öffnen

Die Präsentation ist eine einzelne HTML-Datei ohne Build-Schritt:

```bash
open index.html
```

Reveal.js wird über ein CDN geladen – für die Präsentation braucht es also
eine Internetverbindung. Die Bilder liegen lokal in `bilder/`.

## Steuerung

| Taste | Wirkung |
| --- | --- |
| `→` / `Leertaste` | nächste Folie |
| `←` | zurück |
| `S` | Referentenansicht mit Notizen |
| `F` | Vollbild |
| `Esc` | Übersicht aller Folien |
| `?` | alle Kürzel |

## Inhalt

| Folien | Kapitel |
| --- | --- |
| 3–6 | Wo wir herkommen: Frontend, fremde API, neu das eigene Backend |
| 7–11 | Ziel dieses Semester: Marktstand, 1kwh.ch, die Kette, Kursverlauf |
| 12 | Übergang in den Postenlauf |
| 13–15 | Auswertung: was eine Data-Story ausmacht und was ihr dafür baut |
| 16 | Pflichttermine: Input Datenjournalismus und Marktstand |
| 17–23 | Woher kommen die Daten: Übersicht, Datensatz und Übungsauftrag |
| 24–27 | API |
| 28–30 | Reverse Engineering und Übungsauftrag |
| 31–34 | Webscraping und Einordnung für den Kurs |
| 35–42 | Euer Projekt, Rollen, Meilensteine, Termine, Themenbörse, Kernaussage |

Der Foliensatz wird **in zwei Portionen** gehalten. Folie 12 übergibt direkt in
die Übung `01_data_story_galerie`; deren Auswertung wird auf den Folien 13–15
aufgenommen.

Der erste Teil bleibt bewusst kurz und zeigt nur ein ausführliches Beispiel
(1kwh.ch, Folie 9). Alle weiteren Beispiele stehen als Posten im Raum.

Die drei Übungsaufträge auf den Folien 12, 23 und 30 sind nur Anrisse. Der
vollständige Auftrag steht jeweils im Übungsordner.

Folie 16 steht bewusst direkt nach dem Postenlauf: Der Input von Pascal
Albisser ist das Zückerli, der Marktstand das Ziel. Folie 40 fasst dieselben
Termine nochmals kompakt zusammen.

## Bezug zum übrigen Material

- Übungen dieses Halbtags: `uebungen/00_kickoff/`
- Direkt danach: `theorie/00_lokaler_php_server/` (Tooling)
- Vertieft die Quellenfrage technisch: `theorie/B_extract/`
- Meilensteintabelle im Original: `ablauf.md`

**Abgrenzung zu `theorie/B_extract/`:** Hier geht es um die journalistische
Quellenlandschaft – Datensatz, API, Reverse Engineering, Webscraping. Dort geht
es technisch um das Einlesen in ein PHP-Array. Die einzige bewusste
Wiederholung ist die ETL-Kette als roter Faden.

## Bildquellen

| Datei | Herkunft |
| --- | --- |
| `data-story-1kwh.jpg` | Screenshot 1kwh.ch, eigenes Projekt |
| `data-story-pudding-wine.jpg` | Screenshot pudding.cool, «The Pour-igin of Species» – aktuell nicht auf einer Folie, liegt als Reserve bereit |
| `datensatz-zeitreihe.jpg` | AirPassengers-Zeitreihe, Standardbeispiel aus der Statistik |
| `datensatz-nachrichten.jpg` | eigene Auswertung von Chatverläufen |
| `api-portal.jpg` | Screenshot freepublicapis.com |
| `api-abfahrtsuhr.jpg` | eigenes Projekt auf Basis einer Fahrplan-API |
| `reverse-engineering-srf1.jpg` | Screenshot einer Playlist-Seite zu Radio SRF1 |
| `webscraping-homegate.jpg` | eigener Scrape von Wohnungsinseraten |
| `webscraping-meme.jpg` | Internet-Meme, unbekannte Urheberschaft |
| `pflichttermin-albisser.jpg` | Porträt Pascal Albisser, von ihm zur Verfügung gestellt |
| `srf-logo.png` | Logo Schweizer Radio und Fernsehen |
| `pflichttermin-marktstand.jpg` | Foto eines Marktstands aus einem früheren Durchlauf |

Die Bilder stammen aus dem Foliensatz «ETL für IM3» des Durchlaufs 24HS und
sind nur für den internen Unterrichtsgebrauch gedacht.

## Offene Punkte

- **Zwei Zeilen auf der Folie «Termine und Fristen» sind noch offen.**
  Datenfrage und Feature-Freeze stehen erst, wenn der Stundenplan da ist; der
  Hinweis in den Sprechernotizen kann dann weg.
- Das Marktstand-Foto steht auf der Folie «Pflichttermine» als 118-px-Quadrat
  neben dem Text, gleich gross wie das Porträt daneben. Es wirkt dort eher als
  Stimmungsbild; wer den Stand wirklich zeigen will, braucht eine eigene Folie.
- Die Bildlegende zu `api-abfahrtsuhr.jpg` ist eine Rekonstruktion. Falls das
  Projekt anders hiess oder auf einer anderen Quelle beruhte, gehört das auf
  Folie 23 korrigiert.
- Zwei Screenshots (`reverse-engineering-srf1.jpg`, `api-portal.jpg`) zeigen
  Stände von 2024. Sie illustrieren ein Prinzip und müssen nicht aktuell sein –
  wenn sie zu alt wirken, lassen sie sich neu aufnehmen.
- Der Kursverlauf auf Folie 11 nennt bewusst keine Tage und bleibt eine grobe
  Übersicht. Die konkreten Daten stehen auf den Folien 16 und 40.

## Design

Der Foliensatz nutzt das gemeinsame **FHGR Foliendesign** aus
`theorie/_foliendesign/`. Farben, Schriftgrössen und alle Bausteine sind dort
dokumentiert. Änderungen am Design gehören in `fhgr-slides.css`, nicht in
diesen Ordner.

Dieser Foliensatz ist der erste mit Bildern. Der Baustein `figure` mit
`figcaption` und `.shot` sowie die Ablagekonvention `bilder/` sind deshalb im
gemeinsamen Design dokumentiert.

In `styles.css` stehen die Sonderregeln dieses Foliensatzes: engere
Tabellenzeilen für die Meilensteinfolie, die Zeilen der Folie «Kursaufbau»,
die Symbol-Listen auf «Wie ein Block abläuft» und das Porträt auf
«Pflichttermine».

## PDF exportieren

```bash
npx decktape reveal index.html slides.pdf --size 1280x720
```
