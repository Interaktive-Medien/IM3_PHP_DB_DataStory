# Projektkontext: Interaktive Medien 3

## Zweck dieses Repositories

Dieses Repository enthaelt den Kurs fuer das Modul **Interaktive Medien 3
(IM3)**. Der Kursablauf fuer Studierende und Dozierende steht in `ablauf.md`,
Hinweise und offene Todos fuer Dozierende in `dozierende/README.md`. Der
lokale, nicht eingecheckte Ordner `2026_im2_javascript-main/` dient als
Referenz fuer Aufbau, Ablaufplan, Code-Alongs und Uebungsstruktur.

## Kursziel

Die Studierenden lernen die notwendigen PHP-, Datenbank-, ETL- und
Chart.js-Grundlagen und entwickeln danach ein datenjournalistisches Projekt.
Der Kurs ist in `ablauf.md` nach Bloecken gegliedert: Kickoff, Block A bis F
sowie Marktstand und Abgabe. Ein Block kann sich ueber mehrere Kurstage
erstrecken. Der Kickoff enthaelt noch keine PHP-Grundlagen. Ein zweistuendiger
Input von Pascal Albisser zum Datenjournalismus laeuft als Story-Input neben
den technischen Bloecken und ist auf den 28. September fixiert. Die
ausstellungsfaehige Fassung sollte vor dem Marktstand stehen.

## Projekt- und Rollenmodell

- Ein Projektteam besteht aus vier Studierenden.
- Das Team teilt sich in zwei Zweierteams.
- Das Backend-Team baut auf einem PHP-Server einen einfachen ETL-Prozess.
- Das Frontend-Team entwickelt die datenjournalistische Story und die
  Visualisierung mit Chart.js.
- Beide Teams vereinbaren frueh eine gemeinsame JSON-Schnittstelle, damit das
  Frontend zuerst mit Mock-Daten und spaeter mit echten Backend-Daten arbeiten
  kann.

Der technische Datenfluss ist:

```text
Datenquelle -> Extract -> Transform -> Load -> Datenbank -> Unload/JSON -> Chart.js/Story
```

`Unload` ist die Kursbezeichnung fuer den Schritt nach ETL: `unload.php` liest
die gespeicherten Daten per PDO aus der Datenbank, formt sie nach dem
vereinbarten Datenvertrag und liefert sie als JSON-Endpunkt fuer Chart.js aus.

## Datenquellen

Alle Projekte sollen einen nachvollziehbaren ETL-Prozess verwenden. Erlaubte
Varianten sind insbesondere:

- Einen bestehenden historischen JSON-Datensatz importieren.
- Einen bestehenden historischen CSV-Datensatz importieren.
- Daten regelmaessig von einer Live-API sammeln, wenn die zeitliche Sammlung
  inhaltlich sinnvoll ist und bis zum Marktstand genuegend Daten entstehen.
- Daten einer vorhandenen Sensorbox ueber eine Sensor-API konsumieren. Die
  Boxen werden gezeigt, aber in diesem Kurs nicht programmiert.
- Ein eigenes oder manuell erhobenes Dataset aufbereiten.

Auch statische und eigene Daten muessen sinnvoll extrahiert, transformiert,
in die Datenbank geladen und wieder als JSON ausgegeben werden. Projekte mit
Fremd- oder Sensor-APIs brauchen fuer den Marktstand einen stabilen
gespeicherten Datenstand als Fallback.

## Sensor-API

Eine Sensor-API ist im ETL-Prozess einfach eine weitere Extract-Variante neben
Live-API, statischem JSON und CSV. Eine vorhandene Sensorbox liefert Daten ueber
HTTP/JSON. Die Studierenden konsumieren diese Daten mit PHP und sehen dabei
Boxen, die sie eventuell in einem spaeteren Kurs selbst verwenden. Hardware,
Sensorik und Programmierung der Box sind nicht Inhalt dieses Kurses.

## Geplanter Lernpfad

Das Rueckgrat des Kurses ist die ETL+U-Kette:
`Extract -> Transform -> Load -> Datenbank -> Unload -> Chart.js`. Jeder
technische Block ist ein Schritt darin.

1. Kickoff: Rueckblick, Data-Story-Workshop, Kursaufbau und Themenboerse.
   Keine PHP-Grundlagen.
2. Block A - PHP Basics: Tooling (PhpStorm, Terminal, Git, lokaler
   PHP-Server), Variablen, Funktionen, Bedingungen, Arrays und Schleifen.
3. Block B - Extract: dieselben Daten aus JSON-Datei, Live-API und CSV als
   PHP-Array lesen; Sensor-API als weitere Quelle.
4. Block C - Transform: Rohdaten saeubern, reduzieren, umbenennen und
   normalisieren (Datenvertrag).
5. Block D - Load: Datenmodell, SQL, Einrichtung von Webserver und Datenbank,
   PDO und `INSERT`.
6. Block E - Unload: PDO `SELECT` -> JSON-Endpunkt bauen und mit `$_GET`
   filtern.
7. Block F - Visualisierung: Datengrafiken mit Chart.js und erste Integration.
8. Marktstand und Abgabe: Projekt zusammenfuehren, Marktstand im Oktober,
   Abgabe im Januar.

Datenbanken/PDO sind kein eigener Block, sondern werden dort eingefuehrt, wo man
sie braucht: `INSERT` in Load (D), `SELECT` in Unload (E). Datenjournalismus ist
eine Begleitspur (kein nummerierter Block) und laeuft ueber die Story-Karten.

## Didaktische Leitplanken

- Die Studierenden sind zum Teil wenig an PHP und Datenbanken interessiert und
  noch unsicher im Programmieren. Inhalte deshalb kleinschrittig, klar und
  projektbezogen vermitteln.
- Uebungen muessen extrem niederschwellig sein: ein neues Konzept pro Schritt,
  wenige vorbereitete Daten, kurze Anweisungen und ein sofort sichtbares
  Resultat.
- Den Kickoff nicht mit PHP-Syntax ueberladen. PHP wird erst zu Beginn von
  Block A im Rahmen des Toolings geprueft und mit einer minimalen Testdatei
  ueber den lokalen Server aufgerufen.
- Editor im ganzen Kurs ist PhpStorm, nicht VS Code. Anleitungen nennen das
  Terminal von PhpStorm und nie den Live Server von VS Code.
- Die Arbeitsumgebung wechselt im Kurs einmal. In Block A bis C laeuft PHP
  lokal ueber `php -S localhost:8000` (eingerichtet in
  `theorie/00_lokaler_php_server/`). Ab Block D arbeiten die Studierenden auf
  dem Webserver bei Hostpoint: PhpStorm laedt jede gespeicherte Datei per FTP
  hoch, die Datenbank liegt ebenfalls bei Hostpoint und wird ueber phpMyAdmin
  im Control Panel bedient. Die Einrichtung zeigt eine YouTube-Playlist.
  MAMP wird im Kurs nicht mehr verwendet; `theorie/00_lokale_db/` bleibt nur
  als Backup und Zusatzmaterial in Block D. Material ab Block D deshalb fuer
  den Webserver formulieren: Aufruf ueber die eigene Domain, kein `php -S`.
- Technische Konzepte frueh mit Daten und sichtbaren Ergebnissen verbinden.
- Auf jeden Input soll zeitnah eine passende Uebung folgen.
- Code-Alongs sind gefuehrte Unterrichtseinheiten; Uebungen muessen auch
  selbststaendig loesbar sein und sollen Loesungen enthalten.
- Vor komplexeren Implementationen zuerst Datenfluss, Datenmodell, Story oder
  API-Vertrag auf Papier planen.
- PHP-Grundlagen nicht als isolierten Sprachkurs behandeln, sondern frueh auf
  JSON, Daten und den spaeteren ETL-Prozess beziehen.
- Block B (Extract) auf das Lesen von Daten konzentrieren: dieselben Daten aus
  drei Quellen als PHP-Array einlesen (statische JSON-Datei mit
  `file_get_contents`, Live-API ueber den vorbereiteten `fetchJson()`-Helper,
  CSV mit `fgetcsv`). Den eigenen JSON-Endpunkt bauen und mit `$_GET` filtern
  gehoert nicht hierher, sondern nach Unload (Block E). Sensor-API und Google
  Sheets nur einordnen.
- Live-APIs sind kein Selbstzweck. Statische Daten sind eine valide und oft
  robustere Projektgrundlage.
- Das Endprodukt und die Zusammenarbeit zwischen Backend und Frontend sind der
  rote Faden des gesamten Kurses.
- Datenjournalismus ist kein nachgelagerter Block. Themenfindung, Recherche,
  Datenfrage und Quellenpruefung laufen ab dem Kickoff als kleine Begleitspur zur
  technischen Strecke.
- Der IM2-Kurs ist eine strukturelle Referenz, keine thematische Vorlage.
  Uebungen fuer IM3 eigenstaendig und kreativ im Datenkontext entwickeln.
- Fuer die technischen Bloecke nach Moeglichkeit denselben kleinen Datensatz als
  roten Faden verwenden, z. B. die Hitzesommer-Daten von Open-Meteo (Block B
  nutzt zusaetzlich ein CSV mit Shark-Attack-Daten). So aendert sich pro Schritt
  die Technik, nicht gleichzeitig auch das Thema.
- Die Meilensteine M1 bis M10 stehen in `ablauf.md` und werden als kurze
  Abnahmepunkte in die Bloecke integriert.
- Historische Datensaetze im Projektbriefing bevorzugen. Reine Live-Sammlung
  nur zulassen, wenn Datenmenge und Aussage bis zum Marktstand gesichert sind.
- Der Kursplan ist dicht. Projekte deshalb auf eine Datenquelle, ein kleines
  Datenmodell, einen zentralen JSON-Endpunkt und mindestens eine einfache
  Chart.js-Visualisierung begrenzen. `beispielprojekt/hitzesommer/` zeigt die
  ganze Kette als Orientierung.
- Ein UX-Block ist laut Miro-Board flexibel im Kurs platzierbar; die
  Platzierung ist noch offen und steht noch nicht in `ablauf.md`.
- Die ausstellungsfaehige Fassung sollte vor dem Marktstand stehen und einen
  Offline-/Daten-Fallback besitzen.
- Den Input von Pascal Albisser als Teil der Story-Begleitspur behandeln: er
  laeuft neben den technischen Bloecken, findet am 28. September statt und
  dauert zwei Stunden inklusive Fragen. Er ist ein Pflichttermin.
- Der Marktstand ist ebenfalls ein Pflichttermin und standortabhaengig:
  Zuerich am 13. Oktober, Bern und Chur am 15. Oktober.
- Die Projektabgabe ist im Januar 2027 und damit deutlich nach dem Marktstand.

## Repository-Struktur

- `README.md`: Einstieg, Lernziele und Orientierung fuer Studierende.
- `ablauf.md`: Kursablauf nach Bloecken mit Meilensteinen, fuer Studierende
  und Dozierende.
- `dozierende/`: Hinweise und offene Todos (`README.md`), didaktischer
  Werkzeugkasten (`unterrichtsplanung/README.md`) und der reveal.js-Skill.
- `theorie/`: Inputs nach Themenblock, je ein Ordner mit `index.html` und
  PDF-Export. Keine README-Dateien in den Theorie-Ordnern, der Inhalt steht in
  den Folien.
- `theorie/_foliendesign/`: gemeinsames Foliendesign, Vorlage und
  Gestaltungsregeln fuer alle Foliensaetze.
- `code-alongs/`: gefuehrte Beispiele. Startcode im Ordner, fertige Fassung in
  `solution/`, Regieanweisung fuer Dozierende in `Ablauf/`.
- `uebungen/`: eigenstaendige Aufgaben mit Loesungen.
- `stift-und-papier/`: analoge Uebungen. Pro Uebung genau ein README mit Ziel,
  Material, Verlauf und Auswertung, kein eigener `Ablauf/`-Ordner.
- `cheatsheets/`: kurze Nachschlagewerke.
- `beispielprojekt/`: fertig gebaute Projekte zum Anschauen.
- `config.template.php`: Vorlage fuer die Zugangsdaten zur Datenbank.

Noch nicht vorhanden sind ein Projektordner mit Briefing, Rollen und Bewertung
sowie ein ETL-Starterkit fuer die Projektteams.

## Foliensaetze erstellen und aendern

Die Theorie-Inputs sind reveal.js-Praesentationen als einzelne HTML-Datei
ohne Build-Schritt. Design, Vorlage und Gestaltungsregeln liegen zentral in
`theorie/_foliendesign/`.

**Vor jeder Arbeit an Folien diese drei Dateien lesen:**

- `theorie/_foliendesign/README.md`: Farben, Bausteine (Callouts, Ablauf,
  Split-Folien, Code-Bloecke), Anleitung fuer einen neuen Foliensatz.
- `theorie/_foliendesign/GESTALTUNGSREGELN.md`: was auf eine Folie kommt, wie
  es formuliert und wie sie gestaltet wird. Wichtigste Regeln: ein Absatz
  enthaelt genau einen Satz, ein Aufzaehlungspunkt genau einen Gedanken, und
  die Blocknamen des Kurses (`Block A`, `Block C`) erscheinen nicht auf den
  Folien, sondern nur in `ablauf.md`. Folien enthalten keine Sprechernotizen.
- `theorie/A_PHP_Basics/index.html`: fertiges Referenzbeispiel.

Regeln beim Arbeiten:

- Das gemeinsame Stylesheet `fhgr-slides.css` wird **verlinkt, nicht
  kopiert**. Deck-spezifische Sonderregeln kommen in ein eigenes
  `styles.css` im Ordner des Foliensatzes.
- Ein neuer Foliensatz startet als Kopie von
  `theorie/_foliendesign/vorlage.html`.
- Code auf den Folien muss zum zugehoerigen Code-Along passen: gleiche
  Variablennamen, gleiche Schreibweise, gleicher Datensatz.
- Keine Sprechernotizen (`<aside class="notes">`). Didaktische Hinweise,
  Fragen an die Klasse und Zeitangaben gehoeren bei Bedarf in `ablauf.md` oder
  in die Ablauf-Datei des Code-Alongs, nicht auf die Folie.

Nach jeder Aenderung pruefen:

```bash
python3 theorie/_foliendesign/pruefe-folien.py theorie/<ordner>/index.html
node ~/.claude/skills/revealjs-1.0.0/scripts/check-overflow.js theorie/<ordner>/index.html
```

Der erste Befehl prueft die Gestaltungsregeln, der zweite findet ueberlaufende
Folien. Zusaetzlich die geaenderten Folien als Screenshot ansehen: sich
ueberlappende Elemente innerhalb einer Folie findet der Overflow-Check
nicht.

```bash
npx decktape reveal theorie/<ordner>/index.html out.pdf \
  --screenshots --screenshots-directory shots --size 1280x720
```

Zum Schluss den PDF-Export im Ordner des Foliensatzes erneuern. Der Dateiname
bleibt gleich, zum Beispiel `theorie/D_load/load.pdf`:

```bash
npx decktape reveal theorie/<ordner>/index.html theorie/<ordner>/<name>.pdf --size 1280x720
```

Neue Erkenntnisse zu Design oder Formulierung nicht in einem einzelnen
Foliensatz verstecken, sondern in `theorie/_foliendesign/` ergaenzen. Die
Gestaltungsregeln sind ausdruecklich als wachsendes Dokument gedacht.

## Hinweise fuer weitere Arbeiten

- Vor groesseren Umbauten zuerst `ablauf.md`, `dozierende/README.md` und den
  IM2-Referenzkurs lesen.
- Bestehendes Material wenn sinnvoll ueberarbeiten und wiederverwenden.
- Aenderungen in kleinen, nachvollziehbaren Schritten vornehmen; das gesamte
  Repository nicht ohne ausdruecklichen Auftrag auf einmal umbauen.
- Deutsche, einfache und direkte Formulierungen fuer Studierende verwenden.
- Fachbegriffe erklaeren und Beispiele konsistent an einem kleinen Datensatz
  oder Mini-Projekt aufbauen.
- Noch offen sind insbesondere der genaue Stundenplan, Bewertungskriterien,
  die konkrete Marktstand-Organisation, Datenjournalismus-Inputs, die
  Platzierung des UX-Blocks und der Code-Along `09_sensor_lesen`, der noch in
  Vorbereitung ist.

## Commit und Push

Vor jedem Push das Datum im Badge `Aktualisiert` in `README.md` auf das
aktuelle Datum setzen (Format `TT.MM.JJJJ`) und diese Aenderung im selben
Push mitschicken:

```markdown
![Static Badge](https://img.shields.io/badge/Aktualisiert-14.09.2026-coral)
```
