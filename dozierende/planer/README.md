# IM3 Planer

Ein kleines Werkzeug für Dozierende: Pro Standort wird festgehalten, welche
Inhalte aus [`ablauf.md`](../../ablauf.md) an welchem Kurstag geplant und
tatsächlich gemacht wurden. So sehen wir am Ende des Semesters, was Chur, Bern
und Zürich jeweils durchgenommen haben, auch wenn die Standorte in
unterschiedlichem Tempo arbeiten.

Studierende können den Planer ansehen. Ändern kann nur, wer das Passwort für
den Bearbeiten-Modus kennt.

## Was man damit macht

- **Standort wählen:** Chur (grün), Bern (orange) und Zürich (blau), die Farben
  entsprechen dem Detailstundenplan.
- **Offen:** Links stehen alle Einträge aus dem Ablauf, die noch keinem Kurstag
  zugeteilt sind. Einträge, die ausfallen, lassen sich durchstreichen.
- **Stundenplan:** Rechts stehen die Kurstage. Ein Eintrag auf einem Kurstag
  heisst geplant, abgehakt heisst erledigt.
- **Verschieben:** Am Computer per Drag & Drop, auf Handy und Tablet per
  Antippen (Aktionsblatt und «+» am Kurstag).
- **Pausen und Pflichttermine:** Pause, Mittag und Termin lassen sich beliebig
  oft auf Kurstage legen.
- **Bearbeiten:** Emoji, Titel, Block, Dauer, Link und Notiz jedes Eintrags.
  Die Farbe einer Karte richtet sich nach ihrem Emoji. Neue Einträge und neue
  Kurstage lassen sich anlegen.
- **Kurstage:** Datum, Notiz und Dozierende vor Ort. Ein zweites Datum steht für
  Halbklassen, die dasselbe an zwei Tagen machen (Chur).

## Datenquellen

Die Daten wurden einmalig importiert und liegen seither in der Datenbank. Der
Planer synchronisiert sich **nicht** mit den Quellen. Änderungen dort müssen im
Planer nachgetragen werden.

| Quelle | Verwendet für | Nicht übernommen |
| --- | --- | --- |
| [`ablauf.md`](../../ablauf.md) | Einträge pro Block mit Emoji, Titel, Dauer und Link | – |
| [Detailstundenplan HS26](https://docs.google.com/spreadsheets/d/15O2AQXVUzGkFAMEFGKPe8KQaKRPyJdmPVkzoRn2wbik/edit): Tabs [Chur](https://docs.google.com/spreadsheets/d/15O2AQXVUzGkFAMEFGKPe8KQaKRPyJdmPVkzoRn2wbik/edit?gid=0#gid=0), [Bern](https://docs.google.com/spreadsheets/d/15O2AQXVUzGkFAMEFGKPe8KQaKRPyJdmPVkzoRn2wbik/edit?gid=836719563#gid=836719563), [Zürich](https://docs.google.com/spreadsheets/d/15O2AQXVUzGkFAMEFGKPe8KQaKRPyJdmPVkzoRn2wbik/edit?gid=1026691990#gid=1026691990) | Kurstage pro Standort, Bemerkungen wie «nur mmp25c1» | Programm und Dozierende (stimmen nicht) |
| [Präsenzplanung HS26](https://docs.google.com/spreadsheets/d/1LlTfQ3DV-2a-lOTwqFNcACHw6S6VLRqklLZ2Ix9wGuE/edit?gid=429151594#gid=429151594), Tab «HS26» | Dozierende vor Ort: IM3-Zusammenfassung pro Halbtag (Spalten Chur, Bern, Zürich), Vor- und Nachmittag zusammengeführt | Räume und andere Module |

Beim Import angepasst:

- Chur: Die Halbklassen-Tage 30.9./1.10. und 7.10./8.10. sind je ein Kurstag.
- Entfernt: 16.10. (letzte Coachingmöglichkeit) und 8.1.2027 (Abgabe).
- Pflichttermine ergänzt: Datenjournalismus mit Pascal Albisser (28.9., alle
  Standorte), Marktstand Zürich (13.10.), Marktstand Bern und Chur (15.10.).

Den importierten Stand hält [`seed.json`](seed.json) fest.

## Aufbau

| Datei | Aufgabe |
| --- | --- |
| `index.html`, `style.css`, `app.js` | Oberfläche, Vanilla HTML, CSS und JavaScript ohne Framework |
| `api.php` | JSON-Schnittstelle: `GET` liest einen Standort, `POST` ändert (nur mit Login) |
| `lib.php` | Datenbankverbindung, Tabellen, Standorte und Liste der Dozierenden |
| `config.example.php` | Vorlage für `config.php` ohne Werte, im Repository |
| `config.php` | Zugangsdaten und Passwort, nicht im Repository |
| `install.php` | Tabellen anlegen, fehlende Spalten ergänzen, aus `seed.json` befüllen |
| `seed.json` | Ausgangsdaten: Einträge, Kurstage, Dozierende, Pflichttermine |

Die Datenbank hat zwei Tabellen: `planer_tage` (Kurstage pro Standort) und
`planer_eintraege` (Einträge, Pausen und Pflichttermine; `tag_id` leer heisst
offen).

## Einrichten und hochladen

1. `config.example.php` in diesem Ordner nach `config.php` kopieren
   (`cp config.example.php config.php`), die Zugangsdaten zur Datenbank
   eintragen und `$planerPasswort` für den Bearbeiten-Modus setzen.
2. Einmalig im Terminal `php install.php` ausführen. Das legt die Tabellen an
   und befüllt sie, falls sie leer sind. `php install.php --reset` löscht alles
   und befüllt neu, **alle Planungen gehen dabei verloren**.
3. Per FTP in denselben Ordner hochladen: `index.html`, `app.js`, `style.css`,
   `api.php`, `lib.php` und `config.php`. Der Server braucht PHP 8.1 oder neuer.

Neue Dozierende kommen in `lib.php` in die Liste `DOZIERENDE`.
