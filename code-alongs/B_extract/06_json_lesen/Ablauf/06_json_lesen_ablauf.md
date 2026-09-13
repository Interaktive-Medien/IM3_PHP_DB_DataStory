# Ablauf `06_json_lesen`

> **Ziel:** Eine heruntergeladene JSON-Datei mit `file_get_contents` einlesen,
> mit `json_decode` in ein PHP-Array verwandeln und die Struktur verstehen.
> PHP ist hier nur Datenleser, kein Webseiten-Bauer. Richtwert: 30 Minuten.

## Voraussetzung

Im Ordner `data/` liegen die drei Dateien `bern.json`, `zuerich.json` und
`chur.json` (Höchsttemperaturen seit 1940, aus Übung 01).

## Schritte

1. `data/bern.json` kurz in PhpStorm oder im Browser (am besten Firefox) öffnen und den Aufbau ansehen: ganz oben
   Metadaten, unten das Objekt `daily` mit **zwei Listen** `time` und
   `temperature_2m_max`.
2. Den Content-Type-Header auf reinen Text setzen (`text/plain`).
3. Die Datei mit `file_get_contents('data/bern.json')` als String einlesen.
4. Den String mit `json_decode($json, true)` in ein PHP-Array umwandeln. Das
   `true` betonen – ohne bekommt man Objekte statt Arrays.
5. Mit `array_keys(...)` die obersten Schlüssel und die Schlüssel in `daily`
   ausgeben.
6. Die beiden parallelen Listen in `$dates` und `$temps` holen und die Anzahl
   Tage mit `count()` zeigen.
7. Mit einer `for`-Schleife (Index 0–4) die ersten fünf Tage ausgeben.
8. Mit `max($temps)` den höchsten je gemessenen Wert ausgeben.

## Gesprächspunkte

- **Extract = lesen:** Block B holt Daten nur herein – Quelle → PHP-Array. Das
  Umformen kommt später in Transform (Block C), der Endpunkt in Unload (Block E).
- **Parallele Arrays:** Open-Meteo liefert **nicht** eine Liste von Objekten,
  sondern zwei gleich lange Listen. `time[0]` gehört zu
  `temperature_2m_max[0]`. Diese Form bringen wir erst im Transform-Block (C) in
  unsere eigene Struktur.
- **`true` bei `json_decode`:** entscheidet zwischen Array (`$data['daily']`)
  und Objekt (`$data->daily`). Im Kurs arbeiten wir mit Arrays.
- **Index vs. `foreach`:** Weil zwei Listen zusammengehören, brauchen wir den
  gemeinsamen Index `$i` – deshalb hier `for` statt `foreach`.
- **Grosse Datenmenge:** über 31'000 Tage. Genau darum reduzieren und filtern
  wir sie später (Transform und Unload) – hier lesen wir sie nur ein.
