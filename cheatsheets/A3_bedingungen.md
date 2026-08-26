# Bedingungen

> Block A · Code-Along `03_bedingungen`

Eine Bedingung ist ein Ausdruck, der entweder `true` oder `false` ist. Damit
entscheidet das Programm, welcher Code ausgeführt wird.

## Vergleichen

```php
$x = 1;
$y = 2;

var_dump($x === $y);  // gleich?               false
var_dump($x !== $y);  // ungleich?             true
var_dump($x < $y);    // kleiner?              true
var_dump($x <= $y);   // kleiner oder gleich?  true
var_dump($x > $y);    // grösser?              false
var_dump($x >= $y);   // grösser oder gleich?  false
```

## Immer `===`, nie `==`

```php
var_dump(5 == '5');      // true  – PHP wandelt den Text in eine Zahl um
var_dump(5 === '5');     // false – int ist nicht string

var_dump(0 == false);    // true
var_dump(0 === false);   // false
```

`==` vergleicht nur den Wert und wandelt dabei Typen um. `===` vergleicht Wert
**und** Typ.

Das ist keine Stilfrage. In Block D steht:

```php
if ($id === false) {
    // Stadt gibt es noch nicht -> anlegen
}
```

Mit `==` sähe die gültige `id` 0 aus wie «nicht gefunden». Im Kurs gilt
deshalb: immer `===` und `!==`.

## Verknüpfen

```php
var_dump($x >= 1 && $y <= 2);    // UND – beide müssen zutreffen
var_dump($x === 1 || $y === 1);  // ODER – eines genügt
var_dump(!$isOfficial);          // NICHT – dreht die Bedingung um
```

## Prüfen, ob etwas da ist

```php
isset($stations['Bern'])          // Schlüssel vorhanden und nicht null?
$city !== ''                      // nicht der leere Text?
$row['max_temperature_c'] === null // ausdrücklich unbekannt?
in_array($month, [6, 7, 8], true) // im Array enthalten? (true = auch Typ prüfen)
```

Das `true` in `in_array()` ist wichtig: Ohne es gilt auch der Text `"6"` als
Treffer.

### `??` – nimm das hier, sonst das da

```php
$city = trim($_GET['city'] ?? '');
$dates = $location['source']['daily']['time'] ?? [];
```

Der Wert rechts der beiden Fragezeichen `??` greift, wenn der Schlüssel fehlt oder `null` ist. Bei einem
leeren Text oder bei `0` greift er **nicht**.

## if / elseif / else

```php
function classifyTemperature($temperatureC)
{
    if ($temperatureC < 16) {
        return 'kalt';
    } elseif ($temperatureC < 20) {
        return 'frisch';
    } else {
        return 'warm';
    }
}
```

Die Reihenfolge entscheidet: Geprüft wird von oben nach unten, und der erste
Treffer gewinnt. Der Rest wird gar nicht mehr angeschaut.

## match

Kurzform, wenn ein einzelner Wert auf feste Möglichkeiten geprüft wird:

```php
function normalizeFatal(string $raw): ?bool
{
    return match (strtoupper(trim($raw))) {
        'Y' => true,
        'N' => false,
        default => null,
    };
}
```

`match` vergleicht mit `===` und braucht kein `break`. Fehlt `default` und
passt nichts, gibt es einen Fehler – das ist meistens gewollt.

`switch` macht dasselbe mit mehr Zeilen und vergleicht mit `==`. Im Kurs
verwenden wir `match`.

## Kurzform mit `?:`

```php
$label = $temperatureC >= 20 ? 'warm' : 'frisch';

'max_temperature_c' => $row['max_temperature_c'] === null
    ? null
    : (float) $row['max_temperature_c'],
```

Nützlich für genau zwei Möglichkeiten. Bei drei Fällen wird `if` lesbarer.

## Verwandte Cheatsheets

- [A5 Schleifen](A5_schleifen.md) – `continue` überspringt eine Zeile
- [C1 Transform](C1_transform.md) – Filterregeln und `null`
