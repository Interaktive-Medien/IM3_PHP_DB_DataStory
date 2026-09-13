# Unload – den JSON-Endpunkt bauen

> Block E · Code-Alongs `14_hitzesommer_ausliefern`,
> `15_sharkdaten_ausliefern`

Unload ist der Schritt nach ETL: `unload.php` liest die gespeicherten Daten aus
der Datenbank, bringt sie in die vereinbarte Form und liefert sie als JSON aus.

```text
GET /unload.php?city=Bern
  -> SELECT mit JOIN      zwei Tabellen werden eine flache Liste
    -> fetchAll()         PHP-Array
      -> Datenvertrag     Namen und Typen festgelegt
        -> JSON-Antwort   genau das, was das Frontend erwartet
```

Anders als `load.php` ist diese Datei eine **öffentliche Schnittstelle**: Sie
läuft bei jedem Seitenaufruf des Frontends erneut.

## Die vier Bausteine

1. aus der Datenbank lesen
2. als JSON antworten
3. leere Resultate und Fehler behandeln
4. mit `$_GET` filtern

## Das Grundgerüst

```php
<?php
header('Content-Type: application/json; charset=utf-8');

require __DIR__ . '/../../../config.php';

$city = trim($_GET['city'] ?? '');

try {
    $pdo = new PDO($dsn, $username, $password, $options);

    $sql = 'SELECT c.name AS city,
                   hs.year,
                   hs.measurement_days,
                   hs.hot_days,
                   hs.max_temperature_c
            FROM heat_summers AS hs
            JOIN cities AS c ON c.id = hs.city_id';

    $params = [];

    if ($city !== '') {
        $sql .= ' WHERE c.name = :city';
        $params['city'] = $city;
    }

    $sql .= ' ORDER BY hs.year, c.name';

    $statement = $pdo->prepare($sql);
    $statement->execute($params);

    $data = array_map('normalizeSummer', $statement->fetchAll());

    echo json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
} catch (Throwable $error) {
    http_response_code(500);
    error_log('unload.php: ' . $error->getMessage());

    echo json_encode(['error' => 'Daten konnten nicht geladen werden.']);
}
```

## Der Header

```php
header('Content-Type: application/json; charset=utf-8');
```

Ohne ihn hält der Browser die Antwort für HTML. Der Header muss **vor jeder
Ausgabe** stehen – ein `echo` davor oder ein Leerzeichen vor `<?php` löst
«headers already sent» aus.

## Nur die vereinbarten Felder lesen

```sql
SELECT c.name AS city, hs.year, hs.hot_days
FROM heat_summers AS hs
JOIN cities AS c ON c.id = hs.city_id
ORDER BY hs.year, c.name
```

Drei Entscheidungen stecken darin:

- **Kein `SELECT *`.** Sonst gehen `id` und `city_id` mit – Innereien der
  Datenbank, die das Frontend nichts angehen. Und beim nächsten `ALTER TABLE`
  ändert sich die Antwort, ohne dass jemand den Endpunkt angefasst hat.
- **`AS city`** gibt der Spalte direkt den Namen aus dem Datenvertrag. Einmal
  in SQL umbenennen ist kürzer als später in PHP.
- **`ORDER BY`** macht die Reihenfolge verlässlich. Ohne sie darf die Datenbank
  liefern, wie es ihr passt – und das Diagramm springt.

Der `JOIN` verbindet die beiden Tabellen über ihre Schlüssel und macht daraus
eine flache Liste. Genau diese Form braucht das Frontend.

## Den Datenvertrag durchsetzen

```php
function normalizeSummer(array $row): array
{
    return [
        'city' => $row['city'],
        'year' => (int) $row['year'],
        'measurement_days' => (int) $row['measurement_days'],
        'hot_days' => (int) $row['hot_days'],
        'max_temperature_c' => $row['max_temperature_c'] === null
            ? null
            : (float) $row['max_temperature_c'],
    ];
}
```

Der Datenbanktyp ist nicht automatisch der JSON-Typ: `DECIMAL` kommt bei PDO
als **Text** zurück. Ohne diese Funktion stünde im JSON `"36.3"` statt `36.3`.

Der zweite Zweck: Hier steht an genau einer Stelle, welche Felder die Antwort
hat. Wer den Vertrag ändert, ändert diese Funktion – und sonst nichts.

`array_map('normalizeSummer', $rows)` wendet sie auf jede Zeile an.

## Filtern mit `$_GET`

```php
$city = trim($_GET['city'] ?? '');
```

`$_GET` enthält alles, was in der URL hinter dem `?` steht. Aus
`/unload.php?city=Bern` wird `$_GET['city'] === 'Bern'`.

Richtung nicht verwechseln: In Block B hat `fetchJson()` eine fremde API
gefragt. `$_GET` ist die Gegenrichtung – jemand fragt **uns**.

- `?? ''` verhindert eine Warnung, wenn der Parameter fehlt.
- `trim()` entfernt Leerzeichen aus kopierten URLs.
- Der Filter ist **optional**: Ohne ihn kommt alles.

Der Wert bleibt vom SQL getrennt – `:city` ist ein Platzhalter, kein Text im
Befehl. Für Werte, die nicht in einen Platzhalter passen (Tabellen- oder
Spaltennamen, Sortierrichtung), gilt eine Erlaubnisliste:

```php
$allowedDatasets = ['rankings', 'countries'];

$dataset = trim($_GET['dataset'] ?? 'rankings');

if (!in_array($dataset, $allowedDatasets, true)) {
    http_response_code(400);

    echo json_encode([
        'error' => 'Unbekannter Datensatz.',
        'allowed' => $allowedDatasets,
    ], JSON_UNESCAPED_UNICODE);

    exit;
}
```

Jeder Parameter, der von aussen kommt, bekommt seine eigene Liste erlaubter
Werte. `400` heisst: Die Anfrage war falsch, nicht der Server.

## Kein Treffer ist kein Fehler

Findet die Abfrage nichts, ist `$rows` eine leere Liste. Daraus wird die
Antwort `[]`, und das Frontend kann dieselbe Listenlogik weiterverwenden. Ein
Fehler wäre hier falsch.

## Auch ein Fehler antwortet als JSON

```php
} catch (Throwable $error) {
    http_response_code(500);
    error_log('unload.php: ' . $error->getMessage());

    echo json_encode(['error' => 'Daten konnten nicht geladen werden.']);
}
```

Drei Dinge mit drei Adressaten:

- `http_response_code(500)` sagt der Maschine, dass es schiefging. Ohne die
  Zeile meldet der Server 200 OK.
- `error_log()` schreibt die echte Meldung ins Error-Log des Webservers, nicht
  in den Browser.
- Die öffentliche Antwort bleibt kurz. Tabellennamen, Pfade und Passwörter
  gehören nicht in eine Antwort, die jede Person im Netz abrufen kann.

`Throwable` fängt beides: `Error` und `Exception`.

Zum Debuggen niemals `echo` benutzen – das zerstört das JSON. `error_log()`
nehmen.

## Den Endpunkt prüfen

Vier Aufrufe im Browser, bevor das Frontend drankommt:

| Aufruf | Erwartung |
| --- | --- |
| `/unload.php` | alle Datensätze |
| `/unload.php?city=Bern` | nur Bern |
| `/unload.php?city=Genf` | `[]`, kein Fehler |
| `/unload.php?city=%27` | eine saubere Antwort, kein SQL-Fehler |

Im Netzwerk-Tab prüfen: Steht dort `application/json`, und beginnt die Antwort
mit `[`?

## Häufige Fehler

| Symptom | Ursache |
| --- | --- |
| `headers already sent` | Ausgabe vor `header()`, oft ein Leerzeichen vor `<?php` |
| Der Browser zeigt den PHP-Quelltext | Die Seite läuft nicht auf dem Webserver – in der Adressleiste steht nicht die eigene Domain |
| «Unexpected token <» im Frontend | Der Endpunkt hat HTML geschickt – eine Fehlerseite oder ein `var_dump` |
| Zahlen kommen als `"36.3"` an | Die Umwandlung im Datenvertrag fehlt |
| `Zürich` im JSON | `JSON_UNESCAPED_UNICODE` fehlt |

## Verwandte Cheatsheets

- [D1 Datenmodell und SQL](D1_datenmodell_sql.md) – `SELECT`, `JOIN`, `GROUP BY`
- [B2 JSON](B2_json.md) – Liste oder Objekt, Typen, Optionen
- [F1 Chart.js](F1_chartjs.md) – wer diesen Endpunkt abfragt
