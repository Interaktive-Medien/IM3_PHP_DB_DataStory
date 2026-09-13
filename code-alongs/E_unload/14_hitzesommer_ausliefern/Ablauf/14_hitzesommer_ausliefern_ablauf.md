# Ablauf `14_hitzesommer_ausliefern`

> **Ziel:** Die 258 Zeilen aus der Datenbank kommen als gültiges JSON im
> Browser an – gefiltert, sortiert und in genau der Form, die das Frontend-Team
> erwartet. Richtwert: 75 Minuten.

## Ausgangslage

Die Daten liegen seit Code-Along 12 in `cities` und `heat_summers`. Heute wird
nichts geschrieben, nur gelesen. Neu gebaut wird eine einzige Datei:
`unload.php`.

```text
Datenbank  ->  UNLOAD  ->  JSON  ->  Chart.js
 gefüllt       heute                 Block F
```

Der Unterschied zu `load.php`: Diese Datei ist kein Werkzeug für uns, sondern
eine Schnittstelle für andere. Sie läuft bei jedem Aufruf des Frontends erneut.

**Vorher prüfen:** Wenn `heat_summers` leer ist, einmal
`code-alongs/D_load/12_hitzesommer_laden/load.php` aufrufen. Ohne Daten sieht
jeder Zwischenschritt heute gleich aus – nämlich nach `[]`.

## Vor dem Code (10')

### Den Datenvertrag hinlegen

Bevor jemand tippt, steht die Zielform an der Wand – dieselbe wie im Transform:

```json
[
  {
    "city": "Bern",
    "year": 1940,
    "measurement_days": 92,
    "hot_days": 0,
    "max_temperature_c": 26.5
  }
]
```

Zwei Fragen an die Klasse:

1. Wie viele Felder hat ein Datensatz, und wie heissen sie? (Fünf, und zwar
   genau so wie im Mock-JSON des Frontend-Teams.)
2. Was liegt in der Datenbank anders? (Zwei Tabellen statt einer Liste, und die
   Stadt steht dort als Nummer.)

Damit ist die Aufgabe des Tages benannt: aus zwei Tabellen eine flache Liste
machen und sie als JSON ausgeben.

### Die vier Bausteine ankündigen

`1 Verbinden → 2 Lesen → 3 Antworten → 4 Filtern`. Nach jedem Baustein wird die
Seite neu geladen. Wer erst am Schluss testet, sucht den Fehler in 40 Zeilen
statt in 4.

## Schritte im Code (45')

`unload.php` enthält acht TODO-Marken.

**Baustein 1 – Verbinden**

1. `header('Content-Type: application/json; charset=utf-8');` – und danach
   sofort die Frage: Warum ganz oben? Weil der Header vor jeder Ausgabe stehen
   muss.
2. `require __DIR__ . '/../../../config.php';` und die Verbindung mit
   `new PDO(...)` – wortgleich wie in Block D.

**Baustein 2 – Lesen**

3. Das `SELECT` gemeinsam entwickeln, nicht vorlesen. Reihenfolge der Fragen:
   Welche Felder braucht der Vertrag? Woher kommt der Stadtname? Wonach
   sortieren wir? So entstehen `AS city`, der `JOIN` und `ORDER BY` als
   Antworten und nicht als Syntax.
4. `prepare()`, `execute()`, `fetchAll()`. Zwischenstand mit
   `error_log(count($rows));` prüfen – oder für einen Moment mit `var_dump()`,
   dann aber wieder löschen.

**Baustein 3 – Antworten**

5. Hier lohnt sich der Umweg: **zuerst ohne** `normalizeSummer()` mit
   `echo json_encode($rows);` ausgeben und die Antwort im Browser ansehen.
   `"max_temperature_c": "26.5"` steht dort in Anführungszeichen – ein String,
   kein Number. `DECIMAL` kommt bei PDO als Text zurück. Erst danach die
   Funktion schreiben, die Namen und Typen festschreibt.
6. `echo json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);`
   Die beiden Optionen einzeln begründen: Fehler sichtbar machen, Umlaute
   lesbar halten.

**Baustein 4 – Filtern**

7. `$_GET['city']` lesen, `WHERE c.name = :city` nur anhängen, wenn ein Wert da
   ist, und den Wert über `$params` mitgeben. Die Richtung ausdrücklich gegen
   Block B abgrenzen: `fetchJson()` fragte eine fremde API, `$_GET` ist die
   Frage, die uns jemand stellt.
8. Alles ab der Verbindung in `try { … } catch (Throwable $error) { … }`
   packen, mit `http_response_code(500)`, `error_log()` und einer kurzen
   JSON-Fehlermeldung.

## Kontrolle (15')

Vier Aufrufe, und die Zahlen stehen fest:

| Aufruf                      | Erwartung                          |
| --------------------------- | ---------------------------------- |
| `/unload.php`               | 258 Datensätze, nach Jahr sortiert |
| `/unload.php?city=Bern`     | 86 Datensätze aus Bern             |
| `/unload.php?city=Zürich`   | 86 Datensätze mit korrektem Umlaut |
| `/unload.php?city=Atlantis` | leere Liste `[]`                   |

Dazu einmal die Entwicklerkonsole öffnen, Netzwerk-Tab, Seite neu laden: Steht
dort `200` und `application/json`? Das ist der Test, den das Frontend-Team
gleich auch machen wird.

Zwei Fehler bewusst herbeiführen:

- In der Abfrage `heat_summers` falsch schreiben. Im Browser erscheint die
  kurze JSON-Fehlermeldung mit Status 500, die genaue Ursache steht im
  Error-Log des Webservers. Zwei Orte, zwei Zielgruppen.
- Ein `echo 'Test';` über den Header setzen. Die Meldung «headers already sent»
  ist der Grund für Schritt 1 – danach wieder löschen.

## Gesprächspunkte

- **Der Endpunkt ist eine öffentliche Zusage.** Alles, was hier hinausgeht,
  darf das Frontend erwarten. Deshalb keine Innereien wie `id` oder `city_id`
  ausliefern und keine Reihenfolge dem Zufall überlassen.
- **`SELECT *` ist im Endpunkt keine Abkürzung, sondern ein Risiko.** Die
  Antwort ändert sich dann bei jeder Änderung an der Tabelle – ohne dass
  jemand den Endpunkt angefasst hat.
- **Leere Liste ist kein Fehler.** `?city=Atlantis` liefert `[]` mit Status
  200: Die Frage war in Ordnung, die Antwort ist leer. 500 heisst «bei uns ist
  etwas kaputt».
- **Warum Prepared Statements auch ohne Angreifer nötig sind.** Ein Ortsname
  wie `Val d'Illiez` zerlegt eine zusammengebaute SQL-Zeile schon rein
  fachlich. Sicherheit ist hier der zweite Grund, nicht der erste.
- **Ein Endpunkt genügt.** Kein Vorrat an Parametern bauen. `from`, `to` oder
  `limit` kommen erst, wenn die Datenfrage des Projekts sie braucht – jeder
  Parameter will validiert und getestet werden.
- **Die Übergabe ans Frontend.** Sobald der Endpunkt läuft, ändert das
  Frontend-Team nur eine Zeile: aus `fetch('data/heat-summers.json')` wird
  `fetch('unload.php?city=Bern')`. Wenn dann etwas bricht, war der Vertrag
  nicht eingehalten. Genau das ist die Abnahme am Ende des Tages.

## Häufige Fehler

| Meldung oder Symptom              | Ursache                                                      |
| --------------------------------- | ------------------------------------------------------------ |
| `headers already sent`            | Ausgabe oder Leerzeichen vor `header()`                      |
| leere Seite, keine Meldung        | `json_encode` scheiterte still – `JSON_THROW_ON_ERROR` fehlt |
| `[]` obwohl Daten da sein müssten | `load.php` aus Code-Along 12 wurde nie aufgerufen            |
| `Base table or view not found`    | Tabellenname vertippt oder falsche Datenbank in `config.php` |
| `Invalid parameter number`        | `:city` im SQL, aber ein anderer Schlüssel in `$params`      |
| `Unknown column 'c.name'`         | `JOIN cities AS c` fehlt oder das Kürzel heisst anders       |
| `"max_temperature_c": "26.5"`     | Typen nicht festgelegt – `normalizeSummer()` fehlt           |
| Umlaute als `ü`                   | `JSON_UNESCAPED_UNICODE` fehlt                               |
| `SyntaxError` im Frontend         | HTML oder Debug-Ausgabe steht neben dem JSON                 |
