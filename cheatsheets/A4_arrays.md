# Arrays

> Block A · Code-Along `04_arrays`

Ein Array speichert mehrere Werte in einer Variablen. Es ist der wichtigste
Datentyp des Kurses: **Jeder Extract endet in einem PHP-Array.**

## Die drei Formen

```php
// 1. Indexiert – eine Liste, Nummern als Schlüssel, beginnend bei 0
$temperatures = [18.9, 19.4, 20.1];

// 2. Assoziativ – ein Datensatz, Namen als Schlüssel
$measurement = [
    'location' => 'Bern',
    'temperature_c' => 19.4,
    'measured_at' => '10:00',
];

// 3. Verschachtelt – eine Liste von Datensätzen
$measurements = [
    ['time' => '08:00', 'temperature_c' => 18.9],
    ['time' => '10:00', 'temperature_c' => 19.4],
];
```

Form 3 ist die Zielform des ganzen Kurses: eine Zeile pro Beobachtung, überall
dieselben Schlüssel. Genau so geht es in die Datenbank und später als JSON
hinaus.

## Lesen

```php
echo $temperatures[1];                  // 19.4 – Achtung, der erste Index ist 0
echo $measurement['location'];          // Bern
echo $measurements[0]['temperature_c']; // 18.9
echo count($measurements);              // 2 (Anzahl Einträge)
```

Bei unsicheren Schlüsseln `??` benutzen:

```php
$temperature = $measurement['temperature_c'] ?? null;
```

## Schreiben und ergänzen

```php
$temperatures[] = 20.3;                    // Wert am Ende einer Liste anhängen
$stations['Interlaken'] = 17.5;            // Schlüssel setzen oder überschreiben
$measurements[] = ['time' => '16:00', 'temperature_c' => 20.0];

unset($stations['Thun']);                  // Eintrag entfernen
```

Ein Array in einer Variablen zu ändern, verändert nur diese Variable. Arrays
werden in PHP kopiert, nicht geteilt – ausser man arbeitet ausdrücklich mit
`&` (siehe [C1](C1_transform.md)).

## Struktur ansehen

```php
var_dump($measurement);                    // Typen und Werte
print_r($measurement);                     // nur die Struktur
echo implode(', ', array_keys($data));     // welche Schlüssel gibt es?
```

`array_keys()` ist der schnellste Weg, eine fremde JSON-Struktur zu verstehen:

```php
echo "Schlüssel in 'daily': " . implode(', ', array_keys($data['daily'])) . "\n";
```

## Die Funktionen, die wir wirklich brauchen

| Funktion | Zweck | Beispiel |
| --- | --- | --- |
| `count()` | Anzahl Einträge | `count($rows)` |
| `max()` / `min()` | grösster / kleinster Wert | `max($temps)` |
| `array_sum()` | Summe | `array_sum($temps)` |
| `array_keys()` | alle Schlüssel als Liste | `array_keys($cityIds)` |
| `array_values()` | alle Werte, Schlüssel neu nummeriert | `array_values($gefiltert)` |
| `implode()` | Array zu Text | `implode(', ', $header)` |
| `in_array()` | Wert enthalten? | `in_array($month, [6,7,8], true)` |
| `array_combine()` | Schlüssel + Werte zu einem Datensatz | siehe CSV in [B1](B1_extract.md) |
| `array_slice()` | Ausschnitt | `array_slice($counts, 0, 10, true)` |

### map, filter, reduce

Dieselben drei wie in JavaScript, nur mit dem Array als erstem Argument:

```php
// map: jede Zeile umformen
$data = array_map('normalizeSummer', $rows);
$temperaturesF = array_map(fn($c) => $c * 1.8 + 32, $temperatures);

// filter: Zeilen behalten, die zur Frage passen
$warm = array_filter($temperatures, fn($t) => $t >= 20);

// reduce: aus vielen Werten einen machen
$sum = array_reduce($temperatures, fn($carry, $t) => $carry + $t, 0);
```

`array_filter()` behält die alten Schlüssel. Wer danach eine saubere Liste
braucht, packt `array_values()` darum:

```php
$warm = array_values(array_filter($temperatures, fn($t) => $t >= 20));
```

`fn($t) => ...` ist die Kurzschreibweise für eine kleine Funktion – wie die
Pfeilfunktion in JavaScript.

## Sortieren

```php
sort($temperatures);    // aufsteigend, Schlüssel gehen verloren
rsort($temperatures);   // absteigend
arsort($counts);        // absteigend nach Wert, Schlüssel bleiben – für Ranglisten

// nach mehreren Feldern
usort($rows, function (array $a, array $b): int {
    return [$a['year'], $a['city']] <=> [$b['year'], $b['city']];
});
```

Diese Funktionen verändern das Array direkt und geben es nicht zurück.
`$sortiert = sort($rows);` ist deshalb ein Fehler.

## Zusammenfügen

```php
$alle = array_merge($bern, $chur);
$alle = [...$bern, ...$chur];      // gleichbedeutend
```

## Verwandte Cheatsheets

- [A5 Schleifen](A5_schleifen.md) – jedes Element eines Arrays anfassen
- [B2 JSON](B2_json.md) – Array und JSON sind dasselbe in zwei Schreibweisen
