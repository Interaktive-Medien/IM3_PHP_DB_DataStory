# Funktionen

> Block A · Code-Along `02_funktionen`

Eine Funktion ist ein Stück Code mit einem Namen. Man schreibt es einmal und
ruft es beliebig oft auf – mit anderen Werten.

## Deklarieren und aufrufen

```php
function formatMeasurement($location, $temperatureC, $measuredAt)
{
    return "Aare in $location: $temperatureC °C um $measuredAt Uhr.";
}

$bernMessage = formatMeasurement('Bern', 19.4, '10:00');
echo $bernMessage . "\n";

echo formatMeasurement('Brienz', 16.8, '10:00') . "\n";
```

| Baustein | Bedeutung |
| --- | --- |
| `function` | Schlüsselwort, damit PHP weiss: Hier kommt eine Funktion |
| `formatMeasurement` | der Name, unter dem sie aufgerufen wird |
| `($location, ...)` | die Parameter: Werte, die von aussen hineinkommen |
| `return` | gibt einen Wert zurück und beendet die Funktion |

Die Reihenfolge der Werte beim Aufruf muss zur Reihenfolge der Parameter
passen. Die Namen der Parameter gelten nur innerhalb der Funktion.

## `return` statt `echo`

```php
// gut: die Funktion liefert einen Wert
function classifyTemperature($temperatureC)
{
    if ($temperatureC < 16) {
        return 'kalt';
    }

    return 'warm';
}

$label = classifyTemperature(19.4);

// schlecht: die Funktion gibt selbst aus und liefert nichts
function printTemperature($temperatureC)
{
    echo $temperatureC;
}
```

Eine Funktion, die `return` benutzt, lässt sich weiterverwenden: in einer
Variablen speichern, in ein Array legen, an `json_encode()` geben. Eine
Funktion, die `echo` benutzt, kann nur eines – ausgeben.

Nach einem `return` läuft die Funktion nicht weiter. Deshalb braucht es nach
einem `return` im `if` kein `else`.

## Standardwerte

```php
function topSummers(array $rows, $count = 10)
{
    // ...
}

topSummers($rows);       // nimmt 10
topSummers($rows, 3);    // nimmt 3
```

Parameter mit Standardwert stehen immer zuletzt.

## Typen angeben

Ab Block B stehen in den Code-Alongs Typen an den Funktionen:

```php
function fetchJson(string $url): array
{
    // ...
}
```

`string $url` heisst: Hier muss Text hinein. `: array` heisst: Es kommt ein
Array heraus. Das ist kein Muss, hilft aber, Fehler früh zu finden. Ein
`?string` erlaubt zusätzlich `null`:

```php
function countryIso(string $raw): ?string
{
    return $isoByCountry[strtoupper(trim($raw))] ?? null;
}
```

## Was drinnen und draussen gilt

```php
$temperatureC = 19.4;

function show()
{
    echo $temperatureC;   // Fehler: hier drin ist die Variable unbekannt
}
```

Eine Funktion sieht nur ihre eigenen Parameter und Variablen. Alles, was sie
braucht, kommt als Parameter hinein; alles, was sie liefert, kommt per `return`
heraus. Das ist keine Einschränkung, sondern der Grund, warum man eine Funktion
an einer anderen Stelle wiederverwenden kann.

## Eingebaute Funktionen

PHP bringt Tausende mit. Diese begegnen euch im Kurs am häufigsten:

| Funktion                       | Zweck                                   | Manual                                                                                                                                    |
|--------------------------------|-----------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------|
| `count($array)`                | Anzahl Einträge                         | [count](https://www.php.net/count)                                                                                                        |
| `max($array)`, `min($array)`   | grösster / kleinster Wert               | [max](https://www.php.net/manual/de/function.max.php) / [min](https://www.php.net/manual/de/function.min.php)                             |
| `round($zahl, 1)`              | runden                                  | [round](https://www.php.net/manual/de/function.round.php)                                                                                 |
| `trim($text)`                  | Leerzeichen am Rand entfernen           | [trim](https://www.php.net/manual/de/function.trim.php)                                                                                   |
| `strtolower()`, `strtoupper()` | Klein-/Grossschreibung vereinheitlichen | [strtolower](https://www.php.net/manual/de/function.strtolower.php) / [strtoupper](https://www.php.net/manual/de/function.strtoupper.php) |                                                                       |
| `implode(', ', $array)`        | Array zu Text verbinden                 | [implode](https://www.php.net/manual/de/function.implode.php)                                                                             |
| `substr($text, 5, 2)`          | Textausschnitt                          | [substr](https://www.php.net/manual/de/function.substr.php)                                                                               |
| `is_numeric($wert)`            | Steckt eine Zahl darin?                 | [is_numeric](https://www.php.net/manual/en/function.is-numeric.php)                                                                       |
| `date('Y-m-d H:i:s')`          | aktueller Zeitpunkt als Text            | [date](https://www.php.net/manual/de/function.date.php)                                                                                   |

## Verwandte Cheatsheets

- [A3 Bedingungen](A3_bedingungen.md) – Entscheidungen in einer Funktion
- [C1 Transform](C1_transform.md) – Regeln als kleine Funktionen schreiben
