# Ablauf `15_sharkdaten_ausliefern`

> **Ziel:** Die 17 Ranking-Zeilen aus der Datenbank kommen als JSON im Browser
> an – wahlweise beide Ranglisten oder nur eine. Danach lernt derselbe Endpunkt
> einen zweiten Datensatz: die 120 Länderzeilen für die Karte.
> Richtwert: 45 Minuten.

## Einordnung

Zusatzmaterial. Wer Code-Along 14 gemacht hat, kennt die vier Bausteine und
arbeitet hier schneller. Der zweite Durchgang lohnt sich trotzdem, weil andere
Daten andere Entscheidungen verlangen:

| Frage | Hitzesommer (14) | Shark (15) |
| --- | --- | --- |
| Woher kommen die Felder? | zwei Tabellen, `JOIN` | zwei Tabellen, kein `JOIN` |
| Heissen alle Spalten wie im Vertrag? | ja, bis auf `name AS city` | nein, ``rank_position AS `rank` `` |
| Was ist ein unbekannter Filterwert? | eine leere Liste (`200`) | eine falsche Frage (`400`) |
| Wie viele Datenverträge? | einer | zwei, gewählt über `?dataset=` |

Die dritte Zeile ist die eigentliche Botschaft: Ob ein Filterwert unbekannt sein
*darf*, hängt an den Daten und nicht an einer Regel.

Die erste Zeile ist die zweitwichtigste: Zwei Tabellen heissen nicht
automatisch `JOIN`. Beim Hitzesommer gehören Stadt und Messwert zusammen, hier
gehört gar nichts zusammen.

## Ausgangslage

Die 17 Ranking-Zeilen und die 120 Länderzeilen liegen seit Code-Along 13 in
`shark_rankings` und `shark_countries`. Sind die Tabellen leer, dort einmal
`load.php` aufrufen.

Hochladen und über die eigene Domain öffnen:

→ `https://eure-domain.ch/code-alongs/E_unload/15_sharkdaten_ausliefern/unload.php`

## Vor dem Code (10')

### Den Datenvertrag hinlegen

```json
[
  {
    "dimension": "shark_category",
    "rank": 1,
    "category": "White shark",
    "incidents": 426
  }
]
```

Zwei Fragen an die Klasse:

1. Welches Feld heisst in der Tabelle anders? (`rank` – die Spalte heisst
   `rank_position`, weil `rank` in MySQL reserviert ist.)
2. Wo haben wir das beim Laden übersetzt? (Im `execute()`-Array.) Und wo
   müssen wir es jetzt übersetzen? (Im `SELECT`, in die andere Richtung.)

### Zwei Ranglisten in einer Antwort

Ohne Filter liefert der Endpunkt beide Ranglisten in einer flachen Liste; das
Feld `dimension` trennt sie. Kurz benennen, warum wir sie nicht als zwei
verschachtelte Objekte ausliefern: Eine Liste von Datensätzen ist die Form, die
das Frontend ohne Sonderlogik verarbeiten kann – dieselbe Entscheidung wie beim
Hitzesommer.

### Ein Endpunkt oder zwei Dateien?

Die Karte in Block F braucht andere Felder als die Balkendiagramme. Vor dem
Code kurz sammeln lassen, wie man das lösen könnte:

| Weg | dafür | dagegen |
| --- | --- | --- |
| zweite Datei `unload_karte.php` | jede Datei bleibt kurz | zwei Dateien pro Schritt |
| ein Parameter `?dataset=` | eine Datei pro Schritt | ein Parameter mehr zu prüfen |

Wir nehmen den Parameter, weil im ganzen Kurs eine Datei pro Schritt steht: ein
Extract, ein Transform, ein Load, ein Unload. Das ist eine Entscheidung und
keine Regel – wer im Projekt zwei Endpunkte baut, macht nichts falsch, solange
er es begründen kann.

## Schritte im Code (25')

`unload.php` enthält zehn TODO-Marken. Die Bausteine 1 bis 3 laufen wie in
Code-Along 14 und dürfen zügig gehen. Zeit lassen bei drei Stellen:

**Schritt 3 – das reservierte Wort schlägt zurück**

Bewusst zuerst `rank_position AS rank` schreiben und aufrufen. MySQL antwortet
mit «You have an error in your SQL syntax» – dieselbe Meldung wie beim
`CREATE TABLE` in Code-Along 13, und wieder nennt sie den wahren Grund nicht.
Erst dann die Backticks setzen:

```sql
SELECT dimension,
       rank_position AS `rank`,
       category,
       incidents
FROM shark_rankings
ORDER BY dimension, rank_position
```

Die Erkenntnis dahinter: Ein Alias ist ein Name, und für Namen gelten dieselben
Regeln wie für Spalten.

**Schritt 8 – die falsche Frage**

Zuerst die Frage stellen, dann den Code schreiben: Beim Hitzesommer war
`?city=Atlantis` in Ordnung und die Antwort `[]`. Warum ist `?dimension=fische`
etwas anderes?

Weil es genau zwei Ranglisten gibt. «fische» ist keine davon – das ist kein
leeres Ergebnis, sondern ein Tippfehler im Frontend. Deshalb:

| Antwort | Bedeutung |
| --- | --- |
| `200` mit `[]` | Die Frage war in Ordnung, es gibt nichts dazu |
| `400` | Die Frage war falsch gestellt |
| `500` | Bei uns ist etwas kaputt |

Die Prüfung steht vor der Datenbankabfrage, und die gültigen Werte stehen in
der Fehlermeldung. Das ist keine Interna-Preisgabe, sondern genau die Auskunft,
die der fragenden Seite hilft.

**Schritt 10 – was nicht umgewandelt werden darf**

Die zweite `normalize`-Funktion ist die erste im ganzen Kurs, die etwas
absichtlich **stehen lässt**. Die Frage vor dem Schreiben:

> `incidents` machen wir mit `(int)` zur Zahl. Warum nicht `iso3` mit
> `(string)` zum Text?

Weil dort `null` stehen darf. `(string) null` ergibt `""`, und im JSON ist `""`
etwas völlig anderes als `null`. Das Frontend prüft später auf `null`, um zu
wissen, welche Länder es grau lassen muss – ein leerer Text käme durch diese
Prüfung durch und das Land würde eingefärbt, obwohl niemand weiss, welches es
ist.

Einmal vorführen lohnt sich: `'iso3' => (string) $row['iso3']` einsetzen, die
URL mit `?dataset=countries` aufrufen und im JSON nach `COLUMBIA` suchen. Aus
`"iso3": null` wird `"iso3": ""`.

Merksatz an die Tafel:

```text
Umwandeln, was einen Typ hat.
Stehenlassen, was auch fehlen darf.
```

## Kontrolle (10')

| Aufruf | Erwartung |
| --- | --- |
| `/unload.php` | 17 Datensätze, beide Ranglisten |
| `/unload.php?dimension=shark_category` | 10 Datensätze, Platz 1 ist «White shark» |
| `/unload.php?dimension=activity_group` | 7 Datensätze, Platz 1 ist «Surfing & board sports» |
| `/unload.php?dimension=fische` | Status 400 mit den zwei gültigen Werten |
| `/unload.php?dataset=countries` | 120 Datensätze, zuoberst «USA» mit 1486 |
| `/unload.php?dataset=quatsch` | Status 400 mit den zwei gültigen Datensätzen |

Im Netzwerk-Tab bei jedem Aufruf auf den Statuscode schauen – hier ist er
diesmal mehr als eine Formalie.

Zum Schluss im JSON von `?dataset=countries` nach einem Land ohne Code suchen,
etwa `COLUMBIA`. Dort steht `"iso3": null` und `"top_species": null`. Genau
diese beiden `null` erzählen in Block F, warum ein Land auf der Karte grau
bleibt.

## Gesprächspunkte

- **Derselbe Bauplan, andere Abfrage.** Bausteine 1, 3 und 4 sind wortgleich zu
  Code-Along 14. Wer beide Dateien nebeneinanderlegt, sieht: Ein Endpunkt ist
  immer dieselbe Kette, nur `SELECT` und Datenvertrag wechseln.
- **Übersetzt wird an einer Stelle, nicht an dreien.** ``AS `rank` `` erledigt die
  Umbenennung in SQL. Man könnte sie auch in `normalizeRanking()` machen – aber
  nicht an beiden Orten, sonst sucht man den Namen später zweimal.
- **Die Grenze der Aussage reist nicht mit.** Der Satz aus dem Transform
  («Häufigkeiten, keine Aussage über Risiko») steht bewusst nicht in der
  Antwort. Er gehört in die Story, wo ihn Menschen lesen – nicht in eine
  Datenspalte, die in jeder Zeile dasselbe enthält.
- **Wann braucht ein Projekt eine Allow-List?** Immer dann, wenn ein Parameter
  eine feste Auswahl hat: Kategorie, Region, Jahr aus einer bekannten Liste.
  Bei freiem Text wie einem Ortsnamen ist die leere Liste die richtige Antwort.
  `dataset` ist eine feste Auswahl, also `400`. Käme später ein `?country=`
  dazu, wäre das freier Text – und die richtige Antwort wieder `200` mit `[]`.
- **Filter und Auswahl sind nicht dasselbe.** Ohne `?dimension=` kommen alle
  Ranglisten, ohne `?dataset=` kommen die Ranglisten. Der eine Parameter
  schränkt ein und darf deshalb fehlen, der andere wählt aus und braucht eine
  Voreinstellung. Diese Voreinstellung ist zugleich ein Versprechen: Code-Along
  18 kennt `?dataset=` nicht und funktioniert trotzdem weiter.

## Häufige Fehler

| Meldung oder Symptom | Ursache |
| --- | --- |
| `You have an error in your SQL syntax` beim `SELECT` | `AS rank` ohne Backticks |
| `Unknown column 'rank'` | im Vertrag `rank`, in der Tabelle `rank_position` |
| beide Ranglisten durcheinander | `ORDER BY` nennt nur `rank_position`, nicht `dimension` |
| `?dimension=fische` liefert `[]` | Die Prüfung fehlt oder steht nach der Abfrage |
| `[]` bei jedem Aufruf | `load.php` aus Code-Along 13 wurde nie aufgerufen |
| `?dataset=countries` liefert die Ranglisten | Die Abfrage steht vor dem `if`, nicht darin |
| `"iso3": ""` statt `"iso3": null` | ein `(string)` in `normalizeCountry()` |
| `?dimension=shark_category` liefert plötzlich `[]` | Der Filter hängt am falschen Zweig |
