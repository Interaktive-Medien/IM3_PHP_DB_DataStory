# Lösung – Den fetch-Helfer entschlüsseln

Diese Lösung ist für die Besprechung gedacht. Die Formulierungen der
Studierenden dürfen abweichen, solange die Sache stimmt.

## Teil 1 – Zeile für Zeile

```php
function fetchJson(string $url): array {
    $ch = curl_init($url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_TIMEOUT, 10);
    $response = curl_exec($ch);
    return json_decode($response, true);
}
```

**(1) `function fetchJson(string $url): array {`**

Die Funktion heisst `fetchJson`. Sie bekommt genau einen Wert hinein: eine URL
als Text. Sie verspricht, ein Array zurückzugeben.

**(2) `$ch = curl_init($url);`**

Hier wird die Anfrage nur **vorbereitet**, noch nicht abgeschickt. `curl_init`
legt eine Art Auftragszettel für diese URL an. `$ch` ist der Griff an diesem
Zettel („curl handle"), über den wir ihn in den nächsten Zeilen weiterreichen.

**(3) `curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);`**

Eine Einstellung am Auftragszettel: Die Antwort soll als Wert
**zurückgegeben** und nicht direkt auf die Seite ausgegeben werden. Nur so
können wir sie in einer Variablen auffangen.

**(4) `curl_setopt($ch, CURLOPT_TIMEOUT, 10);`**

Zweite Einstellung: Nach spätestens 10 Sekunden wird abgebrochen.

**(5) `$response = curl_exec($ch);`**

Jetzt wird die Anfrage tatsächlich abgeschickt. PHP wartet, bis der fremde
Server antwortet. Die Antwort landet als **Text** in `$response`.

**(6) `return json_decode($response, true);`**

Zwei Dinge auf einmal: `json_decode` wandelt den JSON-Text in eine PHP-Struktur
um, und `return` gibt dieses Ergebnis an die aufrufende Stelle zurück.

## Teil 2 – Was steckt in den Variablen?

| Variable | Inhalt |
| --- | --- |
| `$url` | ein Text, die Adresse der API |
| `$ch` | der vorbereitete Auftrag, noch keine Daten |
| `$response` | ein langer Text mit `{`, `}` und `"` – die rohe Antwort |
| Rückgabe | ein verschachteltes PHP-Array |

Beschriftung der Pfeile:

```text
$url  ──►  $ch  ──►  $response  ──►  Rückgabewert
        │        │              │
        │        │              └── umwandeln (json_decode)
        │        └── abschicken und warten (curl_exec)
        └── vorbereiten und einstellen (curl_init, curl_setopt)
```

**Die entscheidende Frage:** Bei `json_decode`. Vorher ist alles ein einziger
langer Text, danach eine Struktur, in der `$data['hourly']['time']`
funktioniert.

## Teil 3 – Der Helfer im Einsatz

**(a)** Eine Zeile: `$data = fetchJson($url);`

**(b)** Der ganze cURL-Teil steht nur einmal da. Für eine zweite und dritte API
ändert sich nur die URL, nicht der Code. Und wenn wir später etwas an der
Anfrage anpassen – zum Beispiel den Timeout – tun wir das an genau einer
Stelle.

**(c)** **Extract.** Der Helfer holt Rohdaten aus einer Quelle. Er ändert
nichts an ihnen, sortiert nicht und speichert nichts. Das kommt in Transform
und Load.

## Teil 4 – Nachdenkfragen

**(d) Das `true` in `json_decode($response, true)`**

Ohne `true` liefert `json_decode` Objekte statt Arrays. Der Zugriff hiesse dann
`$data->hourly->time` statt `$data['hourly']['time']`. Im Kurs arbeiten wir
durchgehend mit Arrays, deshalb steht das `true` immer da.

**(e) Der Timeout**

Nach 10 Sekunden bricht cURL ab. `$response` ist dann `false`, und der Helfer
liefert kein brauchbares Array. Ohne Grenze würde unsere Seite im schlechtesten
Fall ewig warten und hängen bleiben, nur weil ein fremder Server nicht
antwortet. Wir sind von jemandem abhängig, den wir nicht kontrollieren.

**(f) Das gebrochene Versprechen**

Zum Beispiel: kein Internet, Server offline, Timeout, Tippfehler in der URL,
oder die API antwortet mit einer Fehlermeldung, die kein JSON ist. In all diesen
Fällen kann `json_decode` kein Array bauen, und PHP meldet einen Fehler, weil
die Funktion `: array` versprochen hat. Genau deshalb brauchen Projekte mit
Live-API einen gespeicherten Datenstand als Fallback.

**(g) `$_GET` und cURL**

- `$_GET`: Jemand anderes ruft **unser** Skript auf und hängt Parameter an
  unsere URL. Die Anfrage kommt bei uns **an**.
- cURL / `fetchJson`: **Wir** schicken eine Anfrage an einen **fremden**
  Server. Die Anfrage geht von uns **weg**.

Merksatz: `$_GET` ist die Post im eigenen Briefkasten, cURL ist der Brief, den
wir selbst einwerfen.

## Teil 5 – Zusatz

**(h) Kochrezept, Beispiel**

1. Nimm eine Adresse entgegen.
2. Bereite eine Anfrage an diese Adresse vor.
3. Schicke sie ab und warte höchstens zehn Sekunden auf die Antwort.
4. Übersetze die Antwort in eine Form, mit der wir weiterarbeiten können.

**(i) Fehlende Prüfung**

Sinnvoll wäre eine Prüfung nach `curl_exec`: Ist überhaupt etwas angekommen?
Und eine nach `json_decode`: Ist wirklich ein Array daraus geworden? Für den
Kurs bleibt der Helfer bewusst kurz – aber die Studierenden sollen wissen, dass
hier etwas fehlt.

## Wenn Zeit bleibt

Zwei Beobachtungen, die im Gespräch fast immer kommen:

- **`curl_close` fehlt.** Ab PHP 8 wird die Verbindung automatisch aufgeräumt.
  In älteren Beispielen im Internet steht es noch. Wer es bemerkt hat, hat sehr
  genau gelesen.
- **Der Helfer ist nicht magisch.** Er ist eine ganz normale Funktion mit einem
  Parameter und einem Rückgabewert – genau wie `bewerteTemperatur` aus Block A.
