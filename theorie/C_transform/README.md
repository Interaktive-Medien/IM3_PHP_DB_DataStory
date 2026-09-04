# Block C – Transform: Eine Frage wird zu Regeln

## Lernziel

Nach diesem Block könnt ihr erklären und dokumentieren,

- warum eine Transformation von der Datenfrage abhängt;
- welche Datensätze und Felder ihr behaltet oder entfernt;
- wie ihr uneinheitliche Werte normalisiert;
- was eine Zeile in eurem Resultat bedeutet;
- wie viele Daten durch eure Entscheidungen verloren gehen;
- wie ihr KI für die Umsetzung nutzt, ohne ihr die fachlichen Entscheidungen
  zu überlassen.

## Der zentrale Gedanke

Im Extract haben wir Rohdaten eingelesen. Sie sind noch nicht automatisch für
eine Story geeignet.

```text
Extract:   Woher kommen die Daten und wie lesen wir sie?
Transform: Welche Daten brauchen wir für unsere Frage, was bedeuten sie,
           und in welche Form bringen wir sie?
```

Säubern gehört also dazu. Es ist nur kein eigener, neutraler Arbeitsschritt:
Welche Werte falsch sind und welche Schreibweise gilt, folgt genauso aus der
Frage wie die Auswahl der Zeilen.

Es gibt keine neutrale «Aufräumfunktion». Dieselbe Spalte kann für eine Frage
wichtig und für eine andere irrelevant sein. Jede Transformation enthält
Entscheidungen.

## Die Frage bestimmt die Form

### Hitzesommer

Eine mögliche Frage lautet:

> Wie hat sich die Anzahl Hitzetage pro meteorologischem Sommer in Bern, Chur
> und Zürich seit 1940 verändert?

Daraus folgen Regeln:

- Wir behalten nur Juni, Juli und August.
- Wir definieren einen Hitzetag als Tag mit mindestens 30 °C Tagesmaximum.
- Wir zählen pro Stadt und Jahr.
- Wir schliessen einen Sommer aus, wenn er nicht vollständig ist.

Wenn die Frage stattdessen «An welchem Tag war es am heissesten?» lautet, wäre
das Filtern auf Sommermonate nicht zwingend. Eine andere Frage führt zu einer
anderen Transformation.

### Shark Attacks

Diese Rohdaten sind viel unordentlicher. In `Species` stehen zum Beispiel
Artname, Grösse und Unsicherheit im selben Textfeld. In `Activity` gibt es viele
Schreibweisen für ähnliche Tätigkeiten.

Die plakative Frage «Wo ist es am gefährlichsten, und welcher Hai greift am
häufigsten an?» behauptet mehr, als die Daten zeigen. Besser ist:

> In welchen Ländern wurden in bestätigten, unprovozierten GSAF-Vorfällen von
> 1950 bis 2018 die meisten Vorfälle erfasst?

Und dazu zwei Anschlussfragen in derselben Auswahl:

> Welche identifizierte Hai-Kategorie kommt am häufigsten vor?

> Bei welcher vereinheitlichten Aktivitätsgruppe wurden die meisten Vorfälle
> erfasst?

Das Resultat ist eine **Häufigkeit in diesem Datensatz**. Es ist kein Risiko.
Für ein Risiko bräuchten wir zusätzlich die Anzahl Personen pro Aktivität, Ort
und Zeitraum – also die Exposition.

Bei der Wo-Frage ist diese Lücke am leichtesten zu sehen und am gefährlichsten,
sobald daraus eine Karte wird: Länder mit langer Küste, vielen Badegästen und
funktionierender Erfassung stehen weiter oben. Somalia ist nicht sicher, dort
zählt nur niemand.

Die Ländernamen werden übrigens nicht in eigene Kategorien einsortiert, sondern
in einer Nachschlagetabelle auf ISO-Codes abgebildet. Wo es einen offiziellen
Code gibt, wird nachgeschlagen statt kategorisiert – erst dadurch lassen sich
die Zahlen später mit einer Kartendatei verbinden.

## Vor dem Code: fünf Entscheidungen

### 1. Auswahl

Welche Fälle gehören zur Frage? Zeitraum, Ort, Vorfalltyp und Mindestqualität
müssen nachvollziehbar definiert sein.

### 2. Untersuchungseinheit

Was bedeutet eine Zeile nach dem Transform?

- Heat: eine Stadt in einem Sommer;
- Shark-Ranking: eine Kategorie mit ihrer Anzahl Vorfälle;
- Shark-Länder: ein Land mit seiner Anzahl Vorfälle;
- anderes Projekt: vielleicht ein Messwert, ein Land oder eine Woche.

Die Shark-Daten zeigen dabei etwas Wichtiges: Aus **einem** Transform dürfen
zwei verschiedene Untersuchungseinheiten entstehen. Eine Rangliste und ein Land
haben andere Felder und bleiben deshalb zwei Listen – nicht eine mit halb
leeren Spalten.

Beim Aggregieren verändert sich die Untersuchungseinheit. Danach kann man nicht
mehr jede Detailfrage zu den ursprünglichen Einzelereignissen beantworten.

### 3. Kategorien

Welche Rohwerte werden zusammengefasst? Ein Mapping ist eine fachliche
Behauptung. Es braucht eine Begründung und soll im Code sichtbar bleiben.

### 4. Fehlende Werte

Fehlend ist nicht gleich null, ungefähr null oder «Nein». Unbekannte Werte
werden als `null` behandelt oder bewusst ausgeschlossen. Die Anzahl muss im
Audit erscheinen.

### 5. Zielstruktur

Backend und Frontend vereinbaren Feldnamen, Datentypen und ein Beispiel. Dieser
Datenvertrag wird vor der Implementation geschrieben.

## KI-Workflow

Die KI übernimmt Fleissarbeit gut: Schleifen schreiben, Mapping-Code erzeugen,
Tests ergänzen oder unbekannte Rohwerte gruppieren. Sie kann aber nicht wissen,
welche Definition zu eurer Story passt.

### Auftrag an die KI

Ein guter Auftrag enthält:

```text
Datenfrage
Untersuchungseinheit
Eingabefelder plus repräsentative Beispielwerte
explizite Filter- und Mapping-Regeln
Zieldatenvertrag mit Datentypen
gewünschte Audit-Zahlen
unklare Fälle, die nicht geraten werden dürfen
```

Fordert die KI auf, Annahmen separat zu nennen. Wenn sie eine neue Kategorie
oder einen Filter erfindet, entscheidet ihr, ob dieser fachlich vertretbar ist.

### Was geprüft werden muss

- Stimmen die Summen vor und nach dem Transform?
- Welche Rohwerte landen in `Andere` oder `Unbekannt`?
- Wurden einzelne Wörter versehentlich falsch zugeordnet?
- Sind Zahlen wirklich Zahlen und Wahrheitswerte wirklich `bool` oder `null`?
- Lässt sich jede Regel aus der Datenfrage begründen?

## Die Transform-Notiz gehört zum Projekt

Legt im Projekt eine Datei `TRANSFORM.md` an. Darin stehen:

1. Datenfrage und Zeitraum;
2. Untersuchungseinheit;
3. alle Filter-, Mapping- und Ableitungsregeln;
4. Datenvertrag mit Beispiel;
5. Audit-Zahlen;
6. bekannte Grenzen und offene Fälle;
7. welche Teile mit KI erstellt und wie sie geprüft wurden.

Code kann geändert oder neu generiert werden. Diese Entscheidungen müssen
stabil und für andere nachvollziehbar bleiben.

## Merksatz

> Wir säubern Daten nicht «allgemein». Wir übersetzen eine Datenfrage in
> dokumentierte, überprüfbare Regeln.

---

## Der Foliensatz

`index.html` ist die Präsentation zu diesem Text – eine einzelne HTML-Datei
ohne Build-Schritt. Richtwert 30 Minuten.

```bash
open index.html
```

Reveal.js kommt über ein CDN, für die Präsentation braucht es also eine
Internetverbindung.

| Taste | Wirkung |
| --- | --- |
| `→` / `Leertaste` | nächste Folie |
| `←` | zurück |
| `S` | Referentenansicht mit Notizen |
| `F` | Vollbild |
| `Esc` | Übersicht aller Folien |

### Aufbau

| Folien | Kapitel |
| --- | --- |
| 1–3 | Titel, Inhalt, Einordnung in die ETL-Kette |
| 4–12 | Die Frage bestimmt die Form (Hitzesommer, Shark-Rohwerte, Datenerkundung, Nenner) |
| 13–15 | Datenvertrag und Audit |
| 16–24 | Der Werkzeugkasten: Übersicht und die sieben Formen, je eine Folie mit Vorher und Nachher |
| 25–26 | `null` gegen `0` und die Reihenfolge der Schritte |
| 27–32 | Verkettung der Skripte, die ganze Kette bis Chart.js, `include`/`return`, `__DIR__`, Kontrollansicht |
| 33–37 | Neue Schreibweisen: `??`, Casts, `continue`, Leseliste |
| 38–41 | KI: Spezifikation statt Zuruf, Prüfliste |
| 42–43 | Ausblick und Kernaussage |

Farbige Boxen gibt es nur in zwei Varianten: Petrol für Einordnung und Zusage,
Gold für Achtung und Merksatz. Im Werkzeugkasten-Kapitel steht die Box immer am
unteren Folienrand.

Jeder Kapiteltrenner trägt oben einen schmalen Streifen mit der ETL-Kette und
der aktuellen Position. Er kommt aus `styles.css` in diesem Ordner; das
gemeinsame Design steht unverändert in `theorie/_foliendesign/`.

Alle Zahlen auf den Folien zu Audit und Abdeckung stammen aus den tatsächlichen
Ausgaben der beiden Code-Alongs, alle Code-Beispiele wörtlich aus deren
Lösungen.

### Was wo behandelt wird

Der Anspruch des Foliensatzes: Kein Begriff und kein PHP-Konstrukt taucht im
Code-Along zum ersten Mal auf.

| Konstrukt | wo erklärt |
| --- | --- |
| `include`, `return` in einer Datei, `__DIR__`, `.` | Folien 30 und 31 |
| `??`, `(int)`/`(float)`/`(string)`, `continue` | Folien 34 bis 36 |
| `json_encode` mit Flags, `header(...)` | Folie 32 |
| `substr`, `is_numeric`, `in_array(..., true)`, `usort`/`<=>`, `str_contains`, `arsort`, `array_slice`, `throw` | Folie 37 als Leseliste, Details im Cheatsheet |
| `preg_match` mit `\b`, Referenzen mit `&`, Spread `...` | nur Cheatsheet und mündlich im Code-Along |

### Bezug zum übrigen Material

- Vorwissen: [`theorie/B_extract/`](../B_extract/)
- Direkt danach: [`stift-und-papier/05_transform_weather/`](../../stift-und-papier/05_transform_weather/)
- Code-Alongs: [`09_hitzesommer_transformieren`](../../code-alongs/C_transform/09_hitzesommer_transformieren/)
  und [`10_sharkdaten_transformieren`](../../code-alongs/C_transform/10_sharkdaten_transformieren/)
- Übungen: [`uebungen/C_transform/`](../../uebungen/C_transform/) – Airbnb-Serie
  (erkunden, Datenfrage, transformieren)
- Nachschlagewerk: [`cheatsheets/C1_transform.md`](../../cheatsheets/C1_transform.md)

### Nach Änderungen prüfen

```bash
python3 theorie/_foliendesign/pruefe-folien.py theorie/C_transform/index.html
node ~/.claude/skills/revealjs-1.0.0/scripts/check-overflow.js theorie/C_transform/index.html
npx decktape reveal theorie/C_transform/index.html slides.pdf --size 1280x720
```

### Offene Punkte

- Der Foliensatz hat 43 Folien und passt so nicht in die 30 Minuten aus
  `dozierende/ABLAUF.md`. Realistisch sind eher 45 Minuten, oder der Input wird
  gekürzt.
- Zum Kürzen eignen sich zwei Stellen: die sieben Einzelfolien zu den
  Transformationsformen (Folien 18 bis 24) lassen sich auf die Übersichtstabelle
  von Folie 17 zusammenziehen, und die Kapitel «Wie die Dateien zusammenhängen»
  und «Neue Schreibweisen» tauchen im Code-Along ohnehin wieder auf.
