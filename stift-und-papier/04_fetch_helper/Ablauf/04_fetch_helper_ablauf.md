# Ablauf `04_fetch_helper`

> Die Übung öffnet die Blackbox `fetchJson()`. Ziel ist nicht cURL-Wissen,
> sondern der Unterschied zwischen einem Text und einem Array – und das
> Vertrauen, fremden Code lesen zu können. Während der Arbeitsphase bleiben
> Editor, Browser und KI-Tools geschlossen.

## Voraussetzung

Code-Along [07 API lesen](../../../code-alongs/B_extract/07_api_lesen) ist
gelaufen. Die Studierenden haben `fetchJson($url)` benutzt, ohne ihn zu
verstehen. Genau daran knüpft die Übung an.

## Tag 4 – 40 Minuten

1. **Rahmen setzen (3'):** Der Satz aus dem Code-Along („musst du nicht
   auswendig können") wird kurz zurückgenommen: benutzen reicht heute, aber
   raten wollen wir nicht. Ansage: Vermutungen aufschreiben ist erwünscht,
   Fragezeichen daneben setzen auch.
2. **Teil 1 – Zeile für Zeile (15'):** Zweier- oder Dreiergruppen. Reihum liest
   eine Person eine Zeile laut vor, die Gruppe einigt sich auf einen Satz.
   Erst wenn alle einverstanden sind, wird geschrieben.
3. **Teil 2 – Variablen und Datenfluss (10'):** Die vier Kästchen füllen und
   die Pfeile beschriften. Hier fällt die Entscheidung, ob der Unterschied
   Text/Array sitzt.
4. **Teil 3 und 4 – Einordnen und nachdenken (10'):** Kann bei Zeitdruck als
   Hausaufgabe mitgegeben werden, ausser Frage (c) und (g).
5. **Besprechung (10'):** Nicht alle sechs Zeilen durchgehen. Drei Stellen
   reichen, siehe unten.

## Die drei Stellen für die Besprechung

- **Zeile (2) `curl_init`:** Hier passiert noch **nichts**. Viele glauben, die
  Daten seien schon da. Wer das trennt, versteht auch, wofür die zwei
  `curl_setopt`-Zeilen dazwischen gut sind.
- **Zeile (5) `curl_exec`:** Hier verlässt die Anfrage unseren Server, und wir
  warten auf jemanden, den wir nicht kontrollieren. Brücke zum Timeout und zur
  Fallback-Regel für Projekte mit Live-API.
- **Zeile (6) `json_decode`:** Der Moment, in dem Text zu Struktur wird. Danach
  funktioniert `$data['hourly']['time']`, vorher nicht.

## Beobachtung für Dozierende

- Sagt die Gruppe bei `curl_init` schon „holt die Daten"? Dann gezielt fragen,
  wo genau die Antwort denn hingehen würde.
- Wird zwischen `$response` (Text) und Rückgabewert (Array) unterschieden?
- Können sie den Helfer als ganz normale Funktion mit Parameter und
  Rückgabewert sehen – wie `bewerteTemperatur` aus Block A?
- Wer `$_GET` und cURL verwechselt, wird es später beim Unload wieder tun.
  Frage (g) deshalb nicht überspringen.

## Anschluss

Die Antwort auf Frage (f) – wann der Helfer sein Versprechen bricht – ist die
Begründung dafür, warum Projekte mit Live-API bis zum Marktstand einen
gespeicherten Datenstand brauchen. Diesen Bogen am Schluss laut ziehen.
