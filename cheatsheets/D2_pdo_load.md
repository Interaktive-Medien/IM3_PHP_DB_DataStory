# PDO und Load – Daten in die Datenbank schreiben

> Block D · Code-Alongs `11_datenbank_testen`, `12_hitzesommer_laden`

PHP spricht kein SQL. **PDO** ist die Brücke: Es baut die Verbindung auf,
schickt SQL-Befehle hin und liefert Zeilen als PHP-Arrays zurück.

```text
transform.php  ->  load.php  ->  PDO  ->  Datenbank
```

`load.php` ist ein Werkzeug, keine Webseite. Sie wird aufgerufen, wenn neue
Daten in die Datenbank sollen – nicht bei jedem Seitenaufruf.

## Zugangsdaten: config.php

Die Zugangsdaten stehen **einmal** im Hauptordner des Kurses, in `config.php`.
Diese Datei steht in `.gitignore` und landet nie auf GitHub; im Repository
liegt nur `config.template.php` ohne Werte.

```php
$host     = 'konto.mysql.db.hostpoint.ch';
$dbname   = 'konto_im3';
$username = 'konto_im3';
$password = '…';

$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

$options = [
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,  // Fehler brechen laut ab
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,        // Zeilen als $row['name']
    PDO::ATTR_EMULATE_PREPARES   => false,                   // echte Prepared Statements
];
```

Alle Werte stehen im Control Panel von Hostpoint. Zwei Stolpersteine:

- Hostpoint setzt den Kontonamen vor Host, Datenbank und Benutzer. Fehlt er,
  kommt «Access denied» oder «Unknown database».
- `config.php` landet nicht auf GitHub, muss aber auf den Server. PhpStorm lädt
  sie beim Speichern mit hoch.

Eingebunden wird die Datei mit dem Pfad zum Hauptordner:

```php
require __DIR__ . '/../../../config.php';
```

## Verbindung aufbauen

```php
try {
    $pdo = new PDO($dsn, $username, $password, $options);
    echo "Verbindung steht.\n\n";
} catch (PDOException $e) {
    exit('Verbindung fehlgeschlagen: ' . $e->getMessage() . "\n");
}
```

Der `try/catch` steht hier, weil eine falsche Angabe in `config.php` sonst eine
unlesbare Fehlerseite ergibt.

## Erst vorbereiten, dann ausführen

```php
$insert = $pdo->prepare(
    'INSERT INTO measurements (location, temperature_c, measured_at)
     VALUES (:location, :temperature_c, :measured_at)'
);

$insert->execute([
    'location' => 'Chur',
    'temperature_c' => 21.4,
    'measured_at' => date('Y-m-d H:i:s'),
]);
```

`:location` ist ein **Platzhalter**, kein Wert. Der Wert reist getrennt vom
SQL-Text und wird deshalb nie als Befehl gelesen. Wer Werte stattdessen in den
Text schreibt (`"WHERE name = '$city'"`), hat bei einem Namen wie O'Brien
kaputtes SQL – und die bekannteste Sicherheitslücke im Web (SQL-Injection).

Bei einem einzigen Wert genügt das kürzere Fragezeichen:

```php
$findCity = $pdo->prepare('SELECT id FROM cities WHERE name = ?');
$findCity->execute([$city]);
```

## Einmal vorbereiten, oft ausführen

```php
$insertSummer = $pdo->prepare(
    'INSERT INTO heat_summers (city_id, year, measurement_days, hot_days, max_temperature_c)
     VALUES (:city_id, :year, :measurement_days, :hot_days, :max_temperature_c)'
);

foreach ($rows as $row) {
    $insertSummer->execute([
        'city_id' => $cityIds[$row['city']],
        'year' => $row['year'],
        'measurement_days' => $row['measurement_days'],
        'hot_days' => $row['hot_days'],
        'max_temperature_c' => $row['max_temperature_c'],
    ]);
}
```

`prepare()` steht **vor** der Schleife und läuft einmal: Die Datenbank bekommt
den Bauplan. `execute()` steht **in** der Schleife und schickt nur noch Werte.

In dieser Schleife wird nichts mehr umgerechnet oder umbenannt. Wer hier noch
rechnen muss, hat es im [Transform](C1_transform.md) vergessen.

## Suchen, sonst anlegen

Das Muster für die zweite Tabelle: Im Transform steht «Bern», in
`heat_summers` braucht es die Nummer von Bern.

```php
$findCity = $pdo->prepare('SELECT id FROM cities WHERE name = ?');
$insertCity = $pdo->prepare('INSERT INTO cities (name) VALUES (?)');

$cityIds = [];   // Merkzettel: Name => id

foreach ($rows as $row) {
    $city = $row['city'];

    if (isset($cityIds[$city])) {
        continue;   // schon nachgeschlagen
    }

    $findCity->execute([$city]);
    $id = $findCity->fetchColumn();   // erster Wert der ersten Zeile, sonst false

    if ($id === false) {
        $insertCity->execute([$city]);
        $id = $pdo->lastInsertId();
    }

    $cityIds[$city] = (int) $id;
}
```

- `fetchColumn()` liefert `false`, wenn nichts gefunden wurde – deshalb
  `=== false` und nicht `== false`: Die gültige `id` 0 sähe sonst aus wie «nicht
  gefunden».
- `lastInsertId()` gibt die eben vergebene Nummer zurück, als Text – deshalb
  `(int)`.
- Der Merkzettel `$cityIds` spart 255 Abfragen.

## Was beim zweiten Aufruf passiert

`INSERT` fragt nicht, ob es die Zeile schon gibt. Beim zweiten Aufruf von
`load.php` steht alles doppelt da. Es gibt zwei Muster, und die Datenquelle
entscheidet:

```php
// Muster 1: Stand neu schreiben.
// Nur wenn die Quelle die Vergangenheit jederzeit neu liefert (Open-Meteo).
$deleted = $pdo->exec('DELETE FROM heat_summers');

// Muster 2: dazuschreiben ohne Duplikate.
// Für Live-Sammlungen – gelöschte Vergangenheit ist dort für immer weg.
// Voraussetzung: eine UNIQUE-Regel in der Tabelle.
$insert = $pdo->prepare('INSERT IGNORE INTO messungen (...) VALUES (...)');
```

## Kontrollieren

Zählen allein genügt nicht – die Zahl wäre auch richtig, wenn in jeder Zeile
Unsinn stünde. Deshalb ein paar Werte zurücklesen:

```php
$total = $pdo->query('SELECT COUNT(*) FROM heat_summers')->fetchColumn();
echo "In heat_summers stehen jetzt {$total} Zeilen.\n";

$lastSummers = $pdo->prepare(
    'SELECT year, hot_days FROM heat_summers WHERE city_id = ? ORDER BY year DESC LIMIT 3'
);
$lastSummers->execute([$cityId]);

foreach ($lastSummers->fetchAll() as $summer) {
    echo $summer['year'] . "\t" . $summer['hot_days'] . " Hitzetage\n";
}
```

## query oder prepare?

| Methode | Wann |
| --- | --- |
| `$pdo->query($sql)` | nur wenn im SQL **kein** eigener Wert steckt |
| `$pdo->prepare($sql)` + `execute($werte)` | sobald ein Wert hineinkommt – der Normalfall |
| `$pdo->exec($sql)` | Befehl ohne Ergebniszeilen, gibt die Anzahl betroffener Zeilen zurück |

## Zeilen holen

| Methode | Ergebnis |
| --- | --- |
| `fetchAll()` | alle Zeilen als Liste assoziativer Arrays |
| `fetch()` | die nächste einzelne Zeile, sonst `false` |
| `fetchColumn()` | der erste Wert der ersten Zeile – für `COUNT(*)` oder eine `id` |

## Häufige Fehler

| Meldung | Ursache |
| --- | --- |
| `getaddrinfo … failed` | Host in `config.php` falsch geschrieben |
| `Access denied for user` | Benutzer oder Passwort in `config.php` falsch, oft fehlt der Kontoname davor |
| `Unknown database` | `$dbname` stimmt nicht mit phpMyAdmin überein |
| `Base table or view not found` | Tabelle noch nicht angelegt – `schema.sql` ausführen |
| `Invalid parameter number` | Anzahl Platzhalter und Anzahl Werte in `execute()` stimmen nicht überein |
| Zeilen stehen doppelt in der Tabelle | `load.php` zweimal gelaufen – siehe die zwei Muster oben |

## Verwandte Cheatsheets

- [D1 Datenmodell und SQL](D1_datenmodell_sql.md) – die Tabellen dazu
- [E1 Unload](E1_unload.md) – dieselbe Verbindung, diesmal lesend
