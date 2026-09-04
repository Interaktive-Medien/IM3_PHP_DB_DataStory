# Kickoff (Slides)

> **Ziel:** Der Einstieg in den Kurs. Knüpft an das an, was die Klasse aus den
> bisherigen Modulen kann, zeigt das Backend als das Neue, benennt den Weg von
> der Datenquelle bis zur Grafik und klärt Projekt, Termine und Gruppen.
> Kein PHP. Richtwert: 15 Minuten bis zum Workshop, danach rund 25 Minuten.

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

26 Folien in sechs Kapiteln. Die Kapiteltrenner sind petrolfarben.

| Folien | Kapitel |
| --- | --- |
| 1 | Titel |
| 2–5 | **Rückblick**: was die Klasse kennt, wo das Frontend endet, das Backend als das Neue |
| 6–7 | **Ziel: eine Data-Story**, gezeigt an 1kwh.ch |
| 8 | **Workshop Data-Storys** – Übergabe in die Übung |
| 9 | Resultate des Workshops |
| 10–13 | **Kursaufbau**: die Kette, die sechs Blöcke, Aufbau eines Blocks |
| 14–19 | **Projekt**: Auftrag, vier Bestandteile, was ihr baut, Grenzen, Meilensteine |
| 20–23 | **Administratives**: Pflichttermine, Marktstand-Inspiration, Termine |
| 24–26 | **Gruppenbildung**: Rollen im Team, Themenbörse |

Der Foliensatz wird **in zwei Portionen** gehalten. Folie 8 übergibt direkt in
die Übung `stift-und-papier/01_data_story_galerie`, Folie 9 nimmt deren
Resultate auf.

Der erste Teil bleibt bewusst kurz und zeigt nur ein ausführliches Beispiel
(1kwh.ch, Folie 7, verlinkt auf die Live-Seite). Alle weiteren Beispiele stehen
als Posten im Raum.

Folien mit Klickaufbau: Folie 3 (vier Boxen plus Callout), Folie 12 (die sechs
Blöcke plus Repo-Hinweis) und Folie 13 (linke Spalte, rechte Spalte, Callout).

## Bezug zum übrigen Material

- Übungen dieses Halbtags: `stift-und-papier/01_data_story_galerie/` und
  `stift-und-papier/02_themenboerse/`
- Direkt danach: `theorie/00_lokaler_php_server/` (Tooling)
- Die Quellenfrage technisch: `theorie/B_extract/`
- Meilensteine und Pflichttermine im Original: `ablauf.md`

## Bildquellen

| Datei | Herkunft |
| --- | --- |
| `data-story-1kwh.jpg` | Screenshot 1kwh.ch, eigenes Projekt |
| `pflichttermin-albisser.jpg` | Porträt Pascal Albisser, von ihm zur Verfügung gestellt |
| `srf-logo.png` | Logo Schweizer Radio und Fernsehen |
| `pflichttermin-marktstand.jpg` | Foto eines Marktstands aus einem früheren Durchlauf |

Nicht mehr auf einer Folie, aber als Reserve im Ordner: `api-abfahrtsuhr.jpg`,
`api-portal.jpg`, `data-story-pudding-wine.jpg`, `datensatz-nachrichten.jpg`,
`datensatz-zeitreihe.jpg`, `reverse-engineering-srf1.jpg`,
`webscraping-homegate.jpg`, `webscraping-meme.jpg`. Sie stammen aus dem
Foliensatz «ETL für IM3» des Durchlaufs 24HS und waren im Kapitel zu den
Datenquellen im Einsatz, das aus diesem Foliensatz entfernt wurde.

Alle Bilder sind nur für den internen Unterrichtsgebrauch gedacht.

## Offene Punkte

- Das Kapitel «Woher kommen die Daten» (Datensatz, API, Reverse Engineering,
  Webscraping) ist aus diesem Foliensatz entfernt worden. Falls es wieder
  gebraucht wird, liegt es in der Git-Historie vor dem Kickoff-Umbau.
- Das Marktstand-Foto steht auf der Folie «Pflichttermine» klein neben dem Text
  und auf Folie 22 gross. Ein aktuelleres Foto könnte beides ersetzen.

## Design

Der Foliensatz nutzt das gemeinsame **FHGR Foliendesign** aus
`theorie/_foliendesign/`. Farben, Schriftgrössen und alle Bausteine sind dort
dokumentiert. Änderungen am Design gehören in `fhgr-slides.css`, nicht in
diesen Ordner.

In `styles.css` stehen die Sonderregeln dieses Foliensatzes: engere
Tabellenzeilen für die Meilensteinfolie, die Zeilen der Folie «Kursaufbau»,
die Symbol-Listen auf «Wie ein Block abläuft» sowie Porträt, Logo und
Marktstand-Foto auf «Pflichttermine».

## PDF exportieren

```bash
npx decktape reveal index.html slides.pdf --size 1280x720
```
