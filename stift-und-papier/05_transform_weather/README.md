# 02 – Wetterdaten transformieren

> **Ziel:** Ihr wendet die Transformationsformen aus der Theorie auf eine
> kleine, absichtlich schmutzige Wettertabelle an und formuliert daraus
> überprüfbare Regeln.

**Dauer:** 35 Minuten inklusive Besprechung

**Sozialform:** zuerst allein, dann zu zweit

**Einsatz:** direkt nach [Theorie C](../../theorie/C_transform) und vor dem
Code-Along
[09 Hitzesommer transformieren](../../code-alongs/C_transform/09_hitzesommer_transformieren).

## Warum diese Übung

In der Theorie habt ihr die sieben Formen kennengelernt: filtern,
deduplizieren, bereinigen, normalisieren, umbenennen, ableiten, aggregieren.
Sie einzeln zu verstehen ist das eine – sie in echten Daten wiederzuerkennen das
andere.

Hier macht ihr das von Hand, bevor daraus Code wird. Wer direkt mit
`transform.php` anfängt, hält Transformieren für Aufräumen. Es ist aber eine
Kette von Entscheidungen, und jede davon folgt aus eurer Datenfrage.

## Die Frage

```text
Wir wollen eine Data-Story über das Wetter in 2023 erstellen.
Welche Transformationen müssen wir vornehmen?
```

## Material

- [`arbeitsblatt.html`](arbeitsblatt.html), pro Person einmal ausdrucken: im
  Browser öffnen, `Cmd+P`, A4 quer, Hintergrundgrafiken einschalten;
- Stift, kein Laptop, keine KI;
- Whiteboard für die gesammelten Begriffe.

## Auftrag

1. Markiert allein alles, was ihr so nicht in eine Datenbank schreiben würdet,
   und schreibt den passenden Begriff daneben.
2. Vergleicht zu zweit und formuliert zu jeder Markierung einen Satz: *Was
   machen wir damit?* «Das Datum ist komisch» ist keine Regel, «alle Daten
   kommen ins Format `JJJJ-MM-TT`» ist eine.
3. Prüft: Kommt jeder der sechs Begriffe mindestens einmal vor?
4. Füllt die leere Spalte aus – zuerst die Regel aufschreiben, dann die Werte.

Unsicheres markieren und ein Fragezeichen daneben setzen. Vermutungen sind
erwünscht.

---

Moderation, Lösung und Audit liegen für die Dozierenden in `Ablauf/`.
