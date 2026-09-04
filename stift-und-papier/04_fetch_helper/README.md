# 01 – Den fetch-Helfer entschlüsseln

> **Ziel:** Die Gruppe nimmt den vorbereiteten Helfer `fetchJson($url)` Zeile
> für Zeile auseinander und erklärt in eigenen Worten, wie aus einer URL ein
> PHP-Array wird.

**Dauer:** 40 Minuten inklusive Besprechung

**Gruppengrösse:** 2 bis 3 Personen

**Einsatz:** Tag 4, direkt nach dem Code-Along
[07 API lesen](../../code-alongs/B_extract/07_api_lesen).

## Warum diese Übung

Im Code-Along heisst es: „Diesen cURL-Code musst du nicht auswendig können –
nur benutzen." Das ist für den Moment richtig, hinterlässt aber eine Blackbox.
Hier wird sie geöffnet, ohne dass jemand cURL auswendig lernen muss. Der Gewinn
ist der Unterschied zwischen **Text** und **Array** – und der entscheidet
später über jeden Zugriff wie `$data['hourly']['time']`.

## Material

- [`arbeitsblatt.php`](arbeitsblatt.php) einmal pro Gruppe ausdrucken;
  die Datei ist zum Drucken aus dem Editor gemacht, mit Schreiblinien
  zwischen den Codezeilen;
- Stift, kein Editor, kein Browser, keine KI;
- [`loesung.md`](loesung.md) erst für die Besprechung.

## Aufbau des Arbeitsblatts

| Teil | Inhalt | Richtwert |
| --- | --- | ---: |
| 1 | Sechs Codezeilen einzeln beschreiben | 15' |
| 2 | Inhalt der Variablen benennen und den Datenfluss beschriften | 10' |
| 3 | Den Helfer im Code-Along wiederfinden und im ETL einordnen | 5' |
| 4 | Nachdenkfragen zu `true`, Timeout, Fehlern und `$_GET` | 10' |
| 5 | Zusatz für schnelle Gruppen | – |

Die vollständige Moderation steht in
[`Ablauf/04_fetch_helper_ablauf.md`](Ablauf/04_fetch_helper_ablauf.md).
