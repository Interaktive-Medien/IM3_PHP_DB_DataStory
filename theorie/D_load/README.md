# Block D – Load: Daten bekommen einen Ort, an dem sie bleiben

## Lernziel

Nach diesem Block könnt ihr erklären und umsetzen,

- warum eine Datenbank mehr kann als eine Datei;
- was eine Tabelle, eine Zeile, eine Spalte und ein Datentyp sind;
- worin sich relationale und nicht relationale Datenbanken unterscheiden;
- wie aus eurem Datenvertrag ein Datenmodell mit einer oder zwei Tabellen wird;
- was ein Primär- und was ein Fremdschlüssel ist;
- wie ihr mit SQL Tabellen anlegt und Zeilen schreibt;
- wie ihr über PDO aus PHP heraus sicher in die Datenbank schreibt;
- warum ein Ladeskript mehrmals aufrufbar sein muss.

## Der zentrale Gedanke

Der Transform hat saubere, gleich gebaute Datensätze geliefert. Sie leben aber
nur, solange das Skript läuft.

```text
Transform: Welche Daten brauchen wir, und in welche Form bringen wir sie?
Load:      Wie kommen sie an einen Ort, an dem sie bleiben?
```

Die gute Nachricht: Der Datenvertrag aus dem Transform ist bereits fast das
Datenmodell. Wer entschieden hat, was eine Zeile bedeutet und welchen Datentyp
jedes Feld hat, hat die Tabelle schon entworfen.

## Tooling vor dem Input

Der Block beginnt mit rund 60 Minuten Einrichtung. Ab hier arbeiten wir nicht
mehr mit `php -S` auf dem eigenen Rechner, sondern auf dem Webserver bei
Hostpoint: Dort liegen die PHP-Dateien und die Datenbank nebeneinander. Die
Einrichtung zeigt die YouTube-Playlist im [Ablauf](../../ablauf.md); hier nur
die Schritte in Kurzform.

1. In PhpStorm den FTP-Zugang zu Hostpoint einrichten und den automatischen
   Upload beim Speichern einschalten. Der Kursordner liegt danach 1:1 auf dem
   Server.
2. Im Control Panel von Hostpoint eine Datenbank und einen Benutzer anlegen.
3. Im Hauptordner des Kurses `config.template.php` zu `config.php` kopieren und
   die Werte eintragen. Diese Datei gibt es genau einmal für alle Übungen.
4. Prüfen, dass `config.php` nicht im Git auftaucht – sie steht in `.gitignore`.
   Auf den Server lädt PhpStorm sie trotzdem hoch, denn dort wird sie gebraucht.
5. phpMyAdmin über das Control Panel öffnen.
6. Verbindung mit Code-Along 11 prüfen.

| Wert | Bei Hostpoint |
| --- | --- |
| Host | `konto.mysql.db.hostpoint.ch` |
| Datenbank | `konto_im3` |
| Benutzer | `konto_im3` |
| Passwort | im Control Panel selbst gesetzt |
| phpMyAdmin | über das Control Panel |

`konto` steht für den Namen des eigenen Hostpoint-Kontos. Hostpoint setzt ihn
vor Host, Datenbank und Benutzer. Wer ihn weglässt, bekommt `Access denied` oder
`Unknown database` – das ist der häufigste Fehler des Blocks.

```php
$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";
```

Einen Port braucht es nicht. Wer einmal ohne Server arbeiten muss, findet in
[`theorie/00_lokale_db/`](../00_lokale_db/) eine Datenbank auf dem eigenen
Rechner als Ausweichweg.

## Was eine Datenbank ist

Eine JSON-Datei zu speichern wäre für 258 Zeilen technisch möglich. Vier Dinge
werden damit aber mühsam:

- gezielt suchen und filtern;
- eine einzelne Zeile ergänzen, ohne alles neu zu schreiben;
- gleichzeitige Zugriffe, ohne die Datei zu zerstören;
- sortieren und zählen.

Eine Datenbank ist ein Programm, das genau diese Arbeit übernimmt. Sie
beantwortet Fragen an die Daten, statt Text aufzubewahren.

**Relational** heisst: Daten stehen in Tabellen mit vorher festgelegten Spalten
und sind untereinander verknüpft (MySQL, MariaDB, PostgreSQL, SQLite).
**Nicht relational** heisst: Daten stehen als einzelne Dokumente nebeneinander,
die unterschiedliche Felder haben dürfen (MongoDB, Firebase, Redis).

Nach dem Transform sind alle unsere Zeilen gleich gebaut. Deshalb ist eine
Tabelle hier das einfachere Werkzeug.

## Das Datenmodell

### Von der Zeile zur Tabelle

Die Untersuchungseinheit aus dem Transform wird zur Zeile in der Tabelle. Bei
den Hitzesommer-Daten ist das eine Stadt in einem Sommer.

### Datentypen

| Typ | Wofür |
| --- | --- |
| `INT` | ganze Zahlen |
| `SMALLINT` | kleine ganze Zahlen wie Jahreszahlen oder Zähler |
| `DECIMAL(4,1)` | Kommazahl mit fester Genauigkeit |
| `VARCHAR(80)` | Text bis zu einer Höchstlänge |
| `DATE`, `DATETIME` | Datum und Zeitpunkt |
| `BOOLEAN` | ja oder nein |

Der Datentyp ist eine Zusage: Was nicht hineinpasst, bleibt draussen.
Zeitpunkte gehören immer in `DATETIME` und nie in ein Textfeld, sonst sortiert
später nichts richtig.

### Schlüssel

- **Primärschlüssel:** eine eindeutige Nummer pro Zeile, von der Datenbank
  vergeben (`id INT AUTO_INCREMENT PRIMARY KEY`).
- **Fremdschlüssel:** eine Spalte, die auf den Primärschlüssel einer anderen
  Tabelle verweist (`city_id`).

### Eine oder zwei Tabellen

Im Kursbeispiel steht der Stadtname sonst 86-mal in der Tabelle. In dieser
Grössenordnung ist das kein Platzproblem, sondern ein Fehlerrisiko: Ein
Tippfehler erzeugt eine vierte Stadt, die es nicht gibt. Bei sehr grossen
Datenmengen kommt der Speicherplatz als zweites Argument dazu.

```text
cities                 1 ─── n   heat_summers
  id            PK               id                 PK
  name          VARCHAR(80)      city_id            FK
                                 year               SMALLINT
                                 measurement_days   SMALLINT
                                 hot_days           SMALLINT
                                 max_temperature_c  DECIMAL(4,1)
```

Für das eigene Projekt reichen vier Fragen, beantwortet auf Papier:

1. Was bedeutet eine Zeile in euren Daten?
2. Welche Felder hat sie, und welchen Datentyp hat jedes davon?
3. Welcher Wert wiederholt sich in fast jeder Zeile?
4. Woran erkennt ihr eine einzelne Zeile eindeutig?

Der wiederholte Wert ist der Kandidat für die zweite Tabelle. Mehr als zwei
Tabellen braucht in diesem Kurs kein Projekt – ausser ihr kombiniert mehrere
Datensätze. Eine schlecht geschnittene zweite Tabelle kostet mehr, als sie
einbringt.

## SQL

| Befehl | Was er tut |
| --- | --- |
| `INSERT` | schreibt eine Zeile hinein |
| `SELECT` | holt Zeilen heraus |
| `UPDATE` | ändert vorhandene Zeilen |
| `DELETE` | löscht Zeilen |

Die Tabellen lassen sich als SQL schreiben oder in phpMyAdmin zusammenklicken –
beides führt zum selben Ergebnis:

```sql
CREATE TABLE cities (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE heat_summers (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  city_id           INT NOT NULL,
  year              SMALLINT NOT NULL,
  measurement_days  SMALLINT NOT NULL,
  hot_days          SMALLINT NOT NULL,
  max_temperature_c DECIMAL(4,1),
  FOREIGN KEY (city_id) REFERENCES cities(id)
);
```

`UPDATE` und `DELETE` wirken auf alle Zeilen, auf die die Bedingung zutrifft.
Ohne `WHERE` trifft sie auf jede Zeile zu, und es gibt keine Rückfrage.
Verlässliche Reihenfolge: erst als `SELECT` mit derselben Bedingung
ausprobieren, dann `SELECT` durch `UPDATE` oder `DELETE` ersetzen.

phpMyAdmin ist eine Oberfläche für eure Datenbank und zeigt zu jeder Aktion
das SQL an. Die Tabellen legt ihr dort einmal von Hand an. Gefüllt werden sie
danach nur noch von `load.php` – Daten von Hand einzutippen ist im Projekt ein
Warnzeichen.

## PDO

PDO (PHP Data Objects) ist fest in PHP eingebaut und die Brücke zwischen PHP und
der Datenbank: Wir schicken SQL als Text hin und bekommen PHP-Arrays zurück.

### Eine `config.php` für alles

Die Zugangsdaten stehen in genau einer Datei, und zwar im Hauptordner des
Kurses. Alle Code-Alongs und Übungen binden dieselbe ein:

```php
// drei Ordner nach oben zum Hauptordner
require __DIR__ . '/../../../config.php';

$pdo = new PDO($dsn, $username, $password, $options);
```

Zugangsdaten in jedem Übungsordner zu pflegen wäre mühsam und würde die
Wahrscheinlichkeit erhöhen, dass eine Fassung doch in einem Commit landet.

### Prepared Statements

Werte werden nie direkt in den SQL-Text geschrieben. Der Grund lässt sich ohne
Sicherheitsvortrag zeigen: Mit `$city = "O'Brien"` würde in
`VALUES ('$city')` das Anführungszeichen den Text zu früh beenden. Bei passend
gewählten Werten führt die Datenbank stattdessen fremde Befehle aus – das heisst
SQL-Injection. Auf den Folien steht davon nur die Regel; der Hintergrund gehört
in die mündliche Erklärung, wenn die Frage kommt.

```php
$insertSummer = $pdo->prepare(
    'INSERT INTO heat_summers (city_id, year, measurement_days, hot_days, max_temperature_c)
     VALUES (:city_id, :year, :measurement_days, :hot_days, :max_temperature_c)'
);

$insertSummer->execute([
    'city_id' => 1,
    'year' => 2023,
    'measurement_days' => 92,
    'hot_days' => 12,
    'max_temperature_c' => 36.3,
]);
```

`prepare` schickt den Bauplan, `execute` schickt die Werte. Die Datenbank hält
beides getrennt, deshalb kann kein Wert zu Code werden. `prepare` steht vor der
Schleife und läuft einmal, `execute` steht in der Schleife.

### Den Fremdschlüssel füllen

Im Transform steht `Bern`, in der Tabelle braucht es die Nummer von Bern.

```php
$findCity->execute([$city]);
$id = $findCity->fetchColumn();

if ($id === false) {
    $insertCity->execute([$city]);
    $id = $pdo->lastInsertId();
}
```

Das Muster heisst «suchen, sonst anlegen». Der Vergleich mit `=== false` ist
genau, weil sonst die Zahl 0 wie «nicht gefunden» aussähe.

### Fehler laut machen

```php
$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
];
```

Ohne `ERRMODE_EXCEPTION` läuft ein fehlgeschlagenes `INSERT` einfach durch und
die Tabelle bleibt leer. Die drei häufigsten Meldungen:

| Meldung | Ursache |
| --- | --- |
| `Unknown column` | Tippfehler im Spaltennamen |
| `getaddrinfo … failed` | Host in `config.php` falsch geschrieben |
| `Access denied` | falsche Zugangsdaten in `config.php`, oft fehlt der Kontoname davor |
| `Cannot add or update a child row` | Fremdschlüssel ohne passende Zeile |

## Ein Ladeskript muss mehrmals laufen können

`INSERT` fragt nicht, ob es die Zeile schon gibt. Nach dem zweiten Aufruf stehen
516 statt 258 Zeilen in der Tabelle, und der Chart zeigt jeden Sommer doppelt.
Der Fehler meldet sich nicht.

| Datenquelle | Muster | Umsetzung |
| --- | --- | --- |
| historischer Datensatz, jedes Mal vollständig | Stand neu schreiben | `DELETE FROM …` vor der Schleife |
| Live-Sammlung, wächst über Wochen | dazuschreiben ohne Duplikate | `UNIQUE`-Regel plus `INSERT IGNORE` |

Die Entscheidung hängt allein daran, ob die Quelle die Vergangenheit noch einmal
liefern kann. Open-Meteo liefert 1940 bis heute jederzeit neu, ein Sensor
liefert nur jetzt. Bei einer Live-Sammlung wäre Leeren fatal.

## Merksatz

> Der Datenvertrag aus dem Transform ist bereits eine gute Grundlage für euer
> Datenmodell.

---

## Der Foliensatz

`index.html` ist die Präsentation zu diesem Text – eine einzelne HTML-Datei ohne
Build-Schritt. Richtwert 45 Minuten.

```bash
open index.html
```

Reveal.js kommt über ein CDN, für die Präsentation braucht es also eine
Internetverbindung.

| Taste | Wirkung |
| --- | --- |
| `→` / `Leertaste` | nächste Folie |
| `←` | zurück |
| `S` | Referentenansicht mit Notizen |
| `F` | Vollbild |
| `Esc` | Übersicht aller Folien |

### Aufbau

| Folien | Kapitel |
| --- | --- |
| 1–3 | Titel, Inhalt, Einordnung in die ETL-Kette |
| 4–8 | Was eine Datenbank ist: Datei gegen Datenbank, Tabelle, relational, Tooling |
| 9–17 | Das Datenmodell: Zeile, Datentypen, Schlüssel, Redundanz, ERM, eine oder zwei Tabellen |
| 18–24 | SQL: Tabellen anlegen, `INSERT`, `SELECT`, `UPDATE`/`DELETE`, phpMyAdmin |
| 25–31 | PDO: Verbindung, `config.php`, Prepared Statements, Schleife, Fremdschlüssel |
| 32–34 | Zweimal laden, zwei Muster, Fehlerbehandlung |
| 35 | Kernaussage |

Der Satz lässt sich am Kapiteltrenner «PDO» (Folie 25) sauber teilen: die ersten
drei Kapitel als Input vor der Papierübung, das PDO-Kapitel direkt vor dem
Code-Along. Das entspricht der Aufteilung in
[`dozierende/ABLAUF.md`](../../dozierende/ABLAUF.md) (40 Minuten Datenbank und
SQL, später 70 Minuten PDO und Code-Along).

Farbige Boxen gibt es in zwei Varianten: Petrol für Einordnung und Zusage, Gold
für Achtung und Merksatz. Dazu kommt eine bewusste Ausnahme vom Farbschema des
Foliendesigns: Die roten Kästen auf den Folien 27 und 28 gibt es nur für die
Zugangsdaten, weil `config.php` erfahrungsgemäss jedes Semester in einem
öffentlichen Repository landet. Die Regel dafür steht in `styles.css` dieses
Ordners und nicht im gemeinsamen Stylesheet. Jeder Kapiteltrenner trägt oben einen schmalen
Streifen mit der ETL-Kette und der aktuellen Position; er kommt aus `styles.css`
in diesem Ordner. Das ERM auf Folie 15 ist ebenfalls dort gestaltet und kein
Bild.

Alle Zahlen auf den Folien stammen aus der tatsächlichen Ausgabe des
Hitzesommer-Code-Alongs: 258 Zeilen, drei Städte, 86 Jahre von 1940 bis 2025.

### Was wo behandelt wird

Der Anspruch des Foliensatzes: Kein Begriff und kein PHP-Konstrukt taucht im
Code-Along zum ersten Mal auf.

| Konstrukt | wo erklärt |
| --- | --- |
| Tabelle, Zeile, Spalte, Schema | Folie 6 |
| Datentypen, `NOT NULL`, `UNIQUE` | Folien 11 und 20 |
| `PRIMARY KEY`, `AUTO_INCREMENT`, `FOREIGN KEY` | Folien 12, 13, 15 und 20 |
| `CREATE TABLE`, `INSERT`, `SELECT`, `UPDATE`, `DELETE` | Folien 19 bis 23 |
| `new PDO`, DSN, `require`, `$options` | Folien 27 und 34 |
| `prepare`, `execute`, benannte Platzhalter | Folie 29 |
| `fetchColumn`, `lastInsertId`, `exec` | Folien 31 und 33 |
| SQL-Injection, `INSERT IGNORE`, Transaktionen | nur Cheatsheet und mündlich |

### Bezug zum übrigen Material

- Vorwissen: [`theorie/C_transform/`](../C_transform/)
- Direkt danach:
  [`code-alongs/D_load/11_datenbank_testen`](../../code-alongs/D_load/11_datenbank_testen/)
  – Verbindung prüfen, bevor es um Daten geht
- Dann:
  [`code-alongs/D_load/12_hitzesommer_laden`](../../code-alongs/D_load/12_hitzesommer_laden/)
  – die 258 Zeilen aus dem Transform in die beiden Tabellen dieses Foliensatzes
  schreiben
- Als Zusatzmaterial:
  [`code-alongs/D_load/13_sharkdaten_laden`](../../code-alongs/D_load/13_sharkdaten_laden/)
  – dieselbe Kette am zweiten Datensatz, mit einer Tabelle statt zwei
- Danach: `unload.php` in Block E baut auf denselben Tabellen auf
- Nachschlagewerke: [`cheatsheets/D1_datenmodell_sql.md`](../../cheatsheets/D1_datenmodell_sql.md)
  und [`cheatsheets/D2_pdo_load.md`](../../cheatsheets/D2_pdo_load.md)
- Vorlage für die Zugangsdaten:
  [`config.template.php`](../../config.template.php)

### Nach Änderungen prüfen

```bash
python3 theorie/_foliendesign/pruefe-folien.py theorie/D_load/index.html
node ~/.claude/skills/revealjs-1.0.0/scripts/check-overflow.js theorie/D_load/index.html
npx decktape reveal theorie/D_load/index.html slides.pdf --size 1280x720
```

### Offene Punkte

- Die Papierübung zum Datenmodell ist noch nicht gebaut; Folie 16 verweist
  bereits darauf. Die Code-Alongs stehen: Verbindungstest (11), Laden der
  Hitzesommer-Daten (12) und als Zusatzmaterial die Shark-Daten (13), die
  zeigen, wann eine zweite Tabelle aus der Form der Daten folgt.
- Reservierte Wörter (`rank`, `order`, `group`, `key`) kommen auf den Folien
  nicht vor. Sie treffen aber jedes Semester ein paar Projekte. Behandelt wird
  das nur im Zusatz-Code-Along 13; ein Satz auf Folie 20 wäre zu überlegen.
- `JOIN` kommt weder auf den Folien noch im Code-Along 12 vor. Die
  Kontrollabfrage dort fragt pro Stadt einzeln nach. Für Block E ist das die
  offene Stelle: Aus dem `SELECT` mit Fremdschlüssel wird dort ein `JOIN`.
- Die Einrichtung von Webserver, FTP-Upload in PhpStorm und Datenbank läuft
  über die YouTube-Playlist im Tooling-Teil vor dem Input. Einen eigenen
  Foliensatz dafür gibt es nicht; `theorie/00_lokale_db/` bleibt als
  Ausweichweg ohne Server.
- Für Gruppen mit Live-Sammlung steht das Beispiel mit `UNIQUE` und
  `INSERT IGNORE` inzwischen im optionalen Teil von
  [`code-alongs/D_load/13_sharkdaten_laden`](../../code-alongs/D_load/13_sharkdaten_laden/Ablauf/13_sharkdaten_laden_ablauf.md).
  Auf Folie 33 ist es weiterhin nur benannt – dort bewusst, weil im Unterricht
  das linke Muster gebaut wird.
