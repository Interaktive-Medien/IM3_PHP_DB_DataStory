# Cheatsheets

Kurze Nachschlagewerke zu den Themenblöcken aus [`ablauf.md`](../ablauf.md).
Sie ersetzen weder Theorie noch Code-Along – sie sind das, was man während
einer Übung oder im Projekt schnell nachschlägt.

Der Code in den Cheatsheets stammt aus den Lösungen der Code-Alongs: gleiche
Variablennamen, gleiche Schreibweise, gleicher Datensatz.

## Block A – PHP Basics

| Cheatsheet | Inhalt | Code-Along |
| --- | --- | --- |
| [A0 PHP-Grundlagen](A0_php_grundlagen.md) | Server, `php -S`, `echo`, Header, Fehler lesen | `00_hallo_php` |
| [A1 Variablen](A1_variablen.md) | Datentypen, Text zusammenbauen, Typumwandlung | `01_variablen` |
| [A2 Funktionen](A2_funktionen.md) | Parameter, `return`, Typen, Gültigkeit | `02_funktionen` |
| [A3 Bedingungen](A3_bedingungen.md) | `===`, `??`, `if`, `match` | `03_bedingungen` |
| [A4 Arrays](A4_arrays.md) | die drei Formen, `map`/`filter`/`reduce`, sortieren | `04_arrays` |
| [A5 Schleifen](A5_schleifen.md) | `foreach`, `for`, `while`, `continue` | `05_schleifen` |

## Block B – Extract

| Cheatsheet | Inhalt | Code-Along |
| --- | --- | --- |
| [B1 Extract](B1_extract.md) | JSON-Datei, Live-API mit `fetchJson()`, CSV mit `fgetcsv()` | `06`–`09` |
| [B2 JSON](B2_json.md) | `json_decode`, `json_encode`, Typen, Liste oder Objekt | begleitend |

## Block C – Transform

| Cheatsheet | Inhalt | Code-Along |
| --- | --- | --- |
| [C1 Transform](C1_transform.md) | sieben Transformationsformen, Datenvertrag, Audit, KI | `09`, `10` |

## Block D – Load

| Cheatsheet | Inhalt | Code-Along |
| --- | --- | --- |
| [D1 Datenmodell und SQL](D1_datenmodell_sql.md) | Tabellen planen, Datentypen, Schlüssel, `SELECT`/`INSERT` | `11`, `12` |
| [D2 PDO und Load](D2_pdo_load.md) | `config.php`, Verbindung, `prepare`/`execute`, doppelte Zeilen | `11`, `12` |

## Block E – Unload

| Cheatsheet | Inhalt | Code-Along |
| --- | --- | --- |
| [E1 Unload](E1_unload.md) | JSON-Endpunkt, `JOIN`, Datenvertrag, `$_GET`, Fehler | `14`, `15` |

## Block F – Visualisierung

| Cheatsheet | Inhalt | Code-Along |
| --- | --- | --- |
| [F1 Chart.js](F1_chartjs.md) | `fetch`, labels und datasets, Zustand, Interaktion | `16`–`18` |
| [F2 Leaflet](F2_leaflet.md) | GeoJSON, Klassen, Verbinden über einen Schlüssel | `19` |

## Der rote Faden

```text
Datenquelle -> Extract -> Transform -> Load -> Datenbank -> Unload/JSON -> Chart.js/Story
                  B          C          D                       E              F
```

Dieselben Daten begleiten den ganzen Kurs: die Hitzesommer aus Open-Meteo,
dazu das Shark Attack File für CSV und für die Unordnung echter Daten.

