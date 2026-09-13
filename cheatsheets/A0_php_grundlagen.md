# PHP-Grundlagen

> Block A · Code-Along `00_hallo_php`

PHP ist eine Programmiersprache, die auf dem **Server** läuft. Der Browser
bekommt nie den PHP-Code zu sehen, sondern nur das Ergebnis.

```text
Browser fragt an  ->  Server führt die .php-Datei aus  ->  Browser bekommt das Ergebnis
```

In diesem Kurs ist der Server zuerst dein eigener Rechner. Ab dem Load-Block,
wenn die Datenbank dazukommt, arbeitest du auf dem Webserver von Hostpoint.

## Den Server starten

Das Terminal öffnest du in PhpStorm mit `⌥ F12` (Windows: `Alt + F12`). Im
Ordner der Datei starten, nicht irgendwo:

```bash
cd code-alongs/A_PHP_Basics/01_variablen
php -S localhost:8000
```

Dann `http://localhost:8000` im Browser öffnen. Beenden mit `Ctrl + C`.

| Symptom | Ursache |
| --- | --- |
| Der Browser lädt die Datei herunter | Die Seite wurde per Doppelklick geöffnet (`file://`) |
| In der Adressleiste steht `63342` | Die Seite wurde über das Browser-Symbol von PhpStorm geöffnet, nicht über `php -S` |
| «Not Found» | Der Server läuft in einem anderen Ordner |

Änderungen im Code brauchen nur einen Reload im Browser, keinen Neustart des
Servers.

## Die minimale Datei

```php
<?php
echo 'Hallo PHP';
```

- Jede PHP-Datei beginnt mit `<?php`.
- Das schliessende `?>` lässt man in reinen PHP-Dateien weg.
- Jede Anweisung endet mit einem Semikolon.

## PHP als Datenlieferant

Im ganzen Kurs baut PHP **keine Webseiten**, sondern liefert Daten. Deshalb
steht in den Code-Alongs von Block A zuoberst dieser Header:

```php
header('Content-Type: text/plain; charset=utf-8');
```

Er sagt dem Browser: Das hier ist reiner Text. Zeilenumbrüche mit `\n` bleiben
dadurch sichtbar. Ab Block E wird aus derselben Zeile
`application/json` – dann ist die Ausgabe ein Endpunkt.

Der Header muss **vor jeder Ausgabe** stehen. Ein `echo` davor oder ein
Leerzeichen vor `<?php` führt zu «headers already sent».

## Ausgeben

```php
echo 'Text';              // gibt Text aus
echo $temperatureC;       // gibt den Wert einer Variablen aus
echo "\n";                // Zeilenumbruch (nur in doppelten Anführungszeichen)

var_dump($stations);      // zeigt Typ und Struktur – zum Prüfen
print_r($stations);       // zeigt die Struktur lesbar, ohne Typen
```

`echo` ist für die Ausgabe, `var_dump` für die Kontrolle. `var_dump` gehört
nicht in einen fertigen Endpunkt.

## Kommentare

```php
// einzeilig

/*
 mehrzeilig
*/
```

## Häufige Fehler

| Meldung | Bedeutung |
| --- | --- |
| `syntax error, unexpected ...` | meist ein fehlendes Semikolon oder eine fehlende Klammer eine Zeile vorher |
| `Undefined variable $x` | Tippfehler im Namen, oder die Variable wird vor der Zuweisung gelesen |
| `Call to undefined function` | Tippfehler im Funktionsnamen |
| leere weisse Seite | ein Fehler ohne Anzeige – im Terminal nachsehen, wo `php -S` läuft |

Das Terminal mit `php -S` ist dein Logbuch: Jede Anfrage und jeder Fehler
erscheint dort.

## PHP und HTML mischen

Möglich, im Kurs aber die Ausnahme. Backend und Frontend sind bei uns
getrennt: PHP liefert JSON, das Frontend zeichnet damit.

```php
<h1>Aare heute</h1>
<p><?= $temperatureC ?> °C</p>
```

`<?= ... ?>` ist die Kurzform von `<?php echo ... ?>`.

## Verwandte Cheatsheets

- [A1 Variablen](A1_variablen.md)
- [B2 JSON](B2_json.md) – wenn aus der Textausgabe eine Datenausgabe wird
