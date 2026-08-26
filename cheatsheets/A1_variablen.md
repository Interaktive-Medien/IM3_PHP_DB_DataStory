# Variablen und Datentypen

> Block A · Code-Along `01_variablen`

Eine Variable ist ein benannter Behälter für einen Wert.

```php
$location = 'Bern';
```

- Jeder Name beginnt mit `$`.
- Erlaubt sind Buchstaben, Zahlen und `_`, aber nicht als erstes Zeichen eine Zahl.
- Gross- und Kleinschreibung zählt: `$location` und `$Location` sind zwei Variablen.
- Zugewiesen wird mit `=`. Verglichen wird mit `===` (siehe [A3](A3_bedingungen.md)).

## Namen im Kurs

Wir schreiben Variablennamen auf Englisch in `camelCase`, Array-Schlüssel und
Datenbankspalten in `snake_case`. Das ist keine Regel von PHP, sondern die
Abmachung des Kurses – und sie zieht sich bis in den Datenvertrag durch.

```php
$temperatureC = 19.4;                 // Variable
$row['temperature_c'] = 19.4;         // Feld im Datensatz
```

Der Name sagt, was drin ist, inklusive Einheit: `$temperatureC`, nicht `$t`.

## Die fünf Datentypen, die wir brauchen

```php
$location     = 'Bern';   // string  – Text
$temperatureC = 19.4;     // float   – Kommazahl
$hotDays      = 12;       // int     – Ganzzahl
$isOfficial   = true;     // bool    – true oder false
$maxTemperature = null;   // null    – «wir wissen es nicht»
```

`null` ist nicht `0` und nicht `''`. Ein fehlender Messwert bleibt `null` –
eine `0` wäre die Behauptung, es sei gemessen worden.

Der Typ steht nicht am Namen fest, sondern am Wert. Dieselbe Variable kann
später etwas anderes enthalten. Was drinsteckt, verrät `var_dump()`:

```php
var_dump($temperatureC);   // float(19.4)
var_dump('19.4');          // string(4) "19.4"
```

Das ist der wichtigste Trick für Block B und C: Aus einer CSV kommt jede Zahl
als **Text**.

## Text zusammenbauen

Zwei Wege, beide erlaubt:

```php
// 1. Einsetzen in doppelten Anführungszeichen
$message = "Aare in $location: $temperatureC °C um $measuredAt Uhr.";

// 2. Verketten mit dem Punkt
echo $measurement['location'] . ': ' . $measurement['temperature_c'] . " °C\n";
```

| Anführungszeichen | Variablen werden eingesetzt | `\n` wirkt |
| --- | --- | --- |
| `'einfach'` | nein | nein |
| `"doppelt"` | ja | ja |

Bei einem Wert aus einem Array braucht es in doppelten Anführungszeichen
geschweifte Klammern: `"Stadt: {$row['city']}"`.

## Typ umwandeln

```php
$month = (int) '07';                // 7
$temperatureC = (float) '31.2';     // 31.2
$yearRaw = (string) 1985;           // "1985"
```

Achtung: `(int) 'keine Angabe'` ergibt stillschweigend `0`. Vor der Umwandlung
deshalb `is_numeric()` prüfen – mehr dazu in [C1 Transform](C1_transform.md).

## Rechnen

```php
$sum = 10 + 5;      
$diff = 10 - 5;
$product = 10 * 5;  
$quotient = 10 / 4;     // 2.5
$rest = 10 % 3;         // 1 – Rest der Division

$count = $count + 1;
$count++;               // dasselbe, kürzer
$counts['bern'] = ($counts['bern'] ?? 0) + 1;   // zählen, auch beim ersten Mal
```

## Konstanten

Wir verwenden im Kurs keine. Falls sie in fremdem Code auftauchen:

```php
const APP_ENV = 'dev';   // ohne $, wird nie wieder verändert
```

## Verwandte Cheatsheets

- [A4 Arrays](A4_arrays.md) – mehrere Werte in einer Variablen
- [C1 Transform](C1_transform.md) – Typen erzwingen und prüfen
