# Ablauf `05_transform_weather`

> Erste Anwendung nach Theorie C: Die Klasse überträgt die eben eingeführten
> Transformationsformen auf eine schmutzige Wettertabelle – von Hand, bevor
> daraus Code wird. Editor, Browser und KI bleiben zu.

**Einsatz:** Block C, **direkt nach** [Theorie C](../../../theorie/C_transform)
und vor Code-Along
[09 Hitzesommer](../../../code-alongs/C_transform/09_hitzesommer_transformieren).
**Dauer:** 35' · **Methode:** Think-Pair-Share mit Fehlerdiagnose ·
**Sozialform:** Einzelarbeit → Partnerarbeit → Plenum

**Lernziel:** Die Studierenden erkennen die Transformationsbedarfe einer
Rohdatentabelle, ordnen sie den Begriffen aus der Theorie zu und formulieren zu
jedem eine Regel mit Begründung aus der Datenfrage. Nachweis: annotiertes Blatt
pro Paar.

**Material:** [`arbeitsblatt.html`](../arbeitsblatt.html) pro Person, A4 quer
(im Browser öffnen, Cmd+P, Hintergrundgrafiken an). Stift. Whiteboard.
[`loesung.html`](loesung.html) erst zur Besprechung – Seite 1 zeigen, Seite 2
als Handout nach der Diskussion. Die Lösung liegt bewusst hier im Ordner
`Ablauf/` und nicht dort, wo die Studierenden das Arbeitsblatt holen.

## Whiteboard

Beides steht vor der Arbeitsphase an der Wand und bleibt bis zum Schluss stehen.
Oben die Frage:

```text
Wir wollen eine Data-Story über das Wetter in 2023 erstellen.
Welche Transformationen müssen wir vornehmen?
```

Darunter der Werkzeugkasten aus der Theorie:

```text
filtern         – Zeilen weglassen, die nicht zur Frage gehören
deduplizieren   – dieselbe Beobachtung nur einmal behalten
bereinigen      – falsche, unmögliche oder fehlende Werte behandeln
normalisieren   – gleiche Bedeutung, gleiche Schreibweise
umbenennen      – Feldnamen auf den Datenvertrag bringen
ableiten        – aus Werten derselben Zeile einen neuen berechnen
aggregieren     – mehrere Zeilen zu einer zusammenfassen
```

Es sind dieselben sieben Formen wie in der Theorie und im Cheatsheet.

Weil die Begriffe bekannt sind, ist der Auftrag schärfer als reines Suchen:
**Zu jedem Begriff eine Stelle im Blatt finden und die konkrete Regel
formulieren.** Sonst haken die Paare die Liste ab, sobald jeder Begriff einmal
vorkommt, und hören auf zu denken.

Dazu die Warnung: **Ein Begriff bleibt übrig.** Welcher das ist, wird nicht
verraten – das Blatt enthält keinen Fall für `aggregieren`, weil sechs
Tageszeilen sechs Tageszeilen bleiben.

Die Zuordnung nicht selbst vormachen. Die Begriffe stehen da, welcher wo
hingehört, entscheiden die Paare.

## Verlauf

| #   | Schritt                                                                                                                                                                                                    | Dauer |
| --- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----: |
| 1   | **Rahmen:** Frage und Werkzeugkasten stehen an der Wand. Auftrag: markieren, was so nicht in eine Datenbank darf, und den Begriff daneben schreiben. Keine Anzahl Fehler vorgeben, Fragezeichen erlaubt.   |    3' |
| 2   | **Think:** stille Einzelarbeit, nicht helfen, hart abbrechen.                                                                                                                                              |    5' |
| 3   | **Pair:** Blätter vergleichen. Zu jeder Markierung einen Satz _Was machen wir damit?_ – «Datum ist komisch» ist keine Regel, «alles nach `JJJJ-MM-TT`» ist eine. Prüfen, ob jeder Begriff eine Stelle hat. |    8' |
| 4   | **Share:** reihum je ein Fund pro Paar, ohne Wiederholung, beim passenden Begriff ans Whiteboard schreiben. Bei Uneinigkeit über die Zuordnung nicht schlichten, sondern begründen lassen.                 |    7' |
| 5   | **Leere Spalte:** `Weather Condition` ausfüllen, aber zuerst die Regel aufschreiben. Zwei bis drei Regeln vergleichen.                                                                                     |    6' |
| 6   | **Abschluss:** Lösung auflegen, Brücke zum Code-Along.                                                                                                                                                     |    6' |

## Erwartete Funde

| Stelle                     | Beobachtung                                 | Begriff       |
| -------------------------- | ------------------------------------------- | ------------- |
| Zeile `2024-04-15`         | nicht 2023                                  | filtern       |
| `2023-02-11` zweimal       | dieselbe Beobachtung doppelt                | deduplizieren |
| `2023/02/10`, `13/04/2023` | drei Datumsformate                          | normalisieren |
| `"11"`, `18C`              | Zahl als Text, Einheit am Wert              | bereinigen    |
| Cloud Cover `-50`          | unmöglich, Bewölkung liegt bei 0–100        | bereinigen    |
| Rain `N/A`                 | fehlt – **nicht** 0 mm                      | bereinigen    |
| `Rain (mm)`                | heisst im Datenvertrag `Precipitation (mm)` | umbenennen    |
| `Weather Condition`        | leer, muss abgeleitet werden                | ableiten      |

## Die zwei Stellen, die Zeit verdienen

- **`N/A` beim Regen:** Fast alle setzen 0. Damit wird «wir wissen es nicht» zu
  «es hat nicht geregnet» und jeder Durchschnitt ist falsch. Fehlend ist `null`,
  die Anzahl gehört ins Audit. Das `N/A` steht ausgerechnet in der 2024-Zeile,
  die vorher wegfällt – daran lässt sich zeigen, dass die Reihenfolge der
  Schritte zählt und die Regel im echten Datensatz trotzdem gebraucht wird.
- **`Weather Condition`:** Eine mögliche Regel ist
  `Regen > 0 → regnerisch`, `Bewölkung ≥ 60 → bewölkt`, sonst `sonnig`. Die
  Regeln der Paare werden sich unterscheiden – genau das ist der Punkt. Wer die
  Schwelle bei 60 statt 80 setzt, erzählt eine andere Story. Die Zeile aus 2024
  ist der Stolperstein: Wer sie ausfüllt, hat das Filtern vergessen.

## Beobachtung für Dozierende

- Wird «Wert ist falsch» (`-50`, `18C`) von «Wert fehlt» (`N/A`) unterschieden?
- Sagt jemand «Zeile löschen» bei `N/A`? Fragen, wie viele Zeilen dann bleiben.
- Wird das Duplikat überhaupt gefunden? Unauffälligster Fund, verfälscht später
  jede Summe.
- 22 °C am 10. Februar fällt selten auf – Plausibilität ist etwas anderes als
  Format. Nur aufgreifen, wenn es aus der Klasse kommt.
- Bleibt einer der sechs übrigen Begriffe leer? Dann nicht auflösen, sondern auf
  die Spalte zeigen, in der er steckt.
- Wer `aggregieren` für die leere Spalte einsetzt, verwechselt es mit `ableiten`.
  Nachfragen: Wie viele Zeilen hat das Blatt vorher, wie viele nachher?

## Abschluss und Anschluss

Drei Sätze zum Schluss: Jede Regel folgt aus der Frage an der Wand, bei anderer
Frage andere Regeln. Von sechs Zeilen bleiben vier – diese Zahl gehört ins Audit
und später in `TRANSFORM.md`. Was wir von Hand gemacht haben, wird im Code-Along
zu `transform.php`.

Als Lerncheck schreibt jedes Paar auf sein Blatt: _Welche unserer Regeln müssten
wir im Marktstand am ehesten verteidigen?_ Zwei davon vorlesen lassen.

Die Whiteboard-Liste stehen lassen und im Code-Along
[09 Hitzesommer](../../../code-alongs/C_transform/09_hitzesommer_transformieren)
darauf zurückzeigen: Jede Zeile dort ist eine dieser Regeln in PHP. Die fünf
Entscheidungen aus Theorie C – Auswahl, Untersuchungseinheit, Kategorien,
fehlende Werte, Zielstruktur – lassen sich am ausgefüllten Blatt einzeln
wiederfinden.
