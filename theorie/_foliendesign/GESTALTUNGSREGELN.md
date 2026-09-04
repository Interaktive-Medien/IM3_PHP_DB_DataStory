# Gestaltungsregeln für Folien

Diese inhaltlichen und visuellen Regeln gelten für alle Foliensätze in
`theorie/`. Sie wachsen mit – was sich im Unterricht bewährt oder stört,
kommt hier rein.

> `fhgr-slides.css` setzt das gemeinsame Design technisch um.
> Diese Datei beschreibt Inhalt und Einsatz der Gestaltungsbausteine.

---

## 1. Ein Absatz, ein Satz

Ein `<p>` enthält genau eine Aussage. Stehen zwei Sätze zusammen, werden sie
zwei Absätze.

```html
<!-- nein -->
<p>Doppelte Anführungszeichen setzen Variablen ein. Einfache nicht.</p>

<!-- ja -->
<p>Doppelte Anführungszeichen setzen Variablen ein.</p>
<p>Einfache nicht.</p>
```

Gilt auch innerhalb von `.callout` und `.box`. Der Abstand kommt automatisch
aus `p + p`.

**Ausnahme:** Wenn der zweite Satz nur ein Zusatz von zwei, drei Wörtern ist,
lieber zu einem Satz zusammenziehen als einen Mini-Absatz bauen.

```html
<!-- nein: Absatz mit einem Wort -->
<p>Erst die Regel, dann der Code. Immer.</p>

<!-- ja -->
<p>Erst die Regel, dann der Code – immer.</p>
```

**Prüfen:** Der Check unter „Vor der Abgabe prüfen" in `README.md` findet alle
Absätze mit mehr als einem Satz.

## 2. Ein Aufzählungspunkt, ein Gedanke

Dieselbe Regel für Listen. Zwei Aussagen in einem `<li>` werden zwei `<li>`.

```html
<!-- nein -->
<li>Erlaubt: Buchstaben, Zahlen, _ – aber nie mit einer Zahl beginnen</li>

<!-- ja -->
<li>Erlaubt: Buchstaben, Zahlen, _</li>
<li>Aber nie mit einer Zahl beginnen</li>
```

## 3. Keine Blockstruktur des Kurses auf den Folien

Studierende denken nicht in „Block A" und „Block C". Auf den Folien steht
„in diesem Kurs", „später", „im Projekt" – nicht die interne Kursstruktur.
Blocknamen gehören in `ablauf_studierende.md` und in die Sprechernotizen.

## 4. Titel benennt die Sache, nicht die Kategorie

„Warum Funktionen?" statt „Funktionen 1". Der Titel sagt, was die Folie
beantwortet.

## 5. Fachbegriffe beim ersten Auftreten erklären

Ein neuer Begriff bekommt direkt eine kurze Erklärung in Alltagssprache.
Danach darf er unerklärt verwendet werden.

## 6. Regeln zuerst in Alltagssprache, dann als Code

Vor einem Code-Beispiel steht, was die Regel inhaltlich besagt – erst danach
die Umsetzung.

## 7. Ein roter Faden pro Foliensatz

Alle Beispiele eines Foliensatzes nutzen denselben kleinen Datensatz. In
Block A ist das der Aare-Messwert (Ort, Temperatur, Zeitpunkt). Pro Schritt
ändert sich die Technik, nicht das Thema.

Der Code auf den Folien ist derselbe wie in den Code-Alongs – gleiche
Variablennamen, gleiche Schreibweise.

## 8. Bewusste Begrenzungen benennen

Was absichtlich weggelassen wird, wird gesagt und ins Cheatsheet verwiesen
(„`array_map` und `array_filter` stehen im Cheatsheet"). Sonst wirkt es wie
eine Lücke.

## 9. Sprechernotizen für alles, was nicht auf die Folie gehört

Fragen an die Klasse, Zeitangaben, didaktische Hinweise und Grenzwerte zum
Durchtesten kommen in `<aside class="notes">`, nicht auf die Folie.

## 10. Sprache

- Deutsch, direkt, kurze Sätze.
- Schweizer Rechtschreibung: `ss` statt `ß`.
- Studierende werden mit „du" angesprochen, Gruppen mit „ihr".
- Englische Fachbegriffe bleiben englisch (`Array`, `String`, `return`).

## 11. Interaktive Folien

Soll eine Frage in die Klasse gehen, startet die Folie leer und die Antwort
wird schrittweise eingeblendet – siehe `.code-lines` in `README.md`. Der
Ablauf gehört in die Sprechernotizen.

## 12. Geteilte Folien

Geteilte Folien bleiben auf beiden Seiten weiss.

Eine olivbraune vertikale Linie trennt die beiden Hälften in der Mitte.

Flächige Rot-/Grün-Codierungen werden nicht verwendet.

Die Gegenüberstellung entsteht durch Überschriften, Inhalt und die mittige
Trennlinie.

## 13. Boxen nebeneinander

Boxen, die nebeneinander stehen und direkt verglichen werden, erhalten dieselbe
Höhe.

Ober- und Unterkante der Boxen liegen auf derselben Linie. Für Code-Boxen wird
die gemeinsame Höhe mit einem Grid oder Flex-Layout hergestellt.

## 14. Einfache PHP-Syntax bevorzugen

Theorie-Folien verwenden nach Möglichkeit benannte Funktionen statt Arrow
Functions mit `fn`.

Arrow Functions erscheinen nur, wenn sie selbst Lernziel sind oder eine
benannte Funktion die Erklärung deutlich komplizierter machen würde.

## 15. Abstand vor Aufzählungen

Ein kurzer Einleitungssatz vor einer Aufzählung erhält immer denselben Abstand
zu den ersten Aufzählungspunkten.

Dafür wird die Klasse `list-intro` verwendet.

## 16. Callouts sitzen auf der Unterkante

Ein Callout am Schluss einer Folie steht immer ganz unten am Inhaltsbereich,
nicht direkt unter dem letzten Absatz.

So liegen die farbigen Kaesten ueber alle Folien hinweg auf derselben Linie,
und die Kernaussage steht dort, wo der Blick am Ende hinwandert.

Das macht das gemeinsame Stylesheet automatisch, sobald der Callout das letzte
Element in `.content` ist:

```html
<div class="content">
  <p class="list-intro">Einleitung:</p>
  <ul class="list-tight"> ... </ul>
  <div class="callout callout-green">
    <p>Die Kernaussage.</p>
  </div>
</div>
```

Es braucht dafuer **kein** `style="margin-top: auto;"` und **kein** `mt-2`.

Ein Callout mitten im Inhalt, auf den noch etwas folgt, bleibt dagegen an
seiner Stelle stehen.

## 17. Bilder brauchen eine Legende

Jedes Bild bekommt eine `figcaption`, die zwei Dinge sagt: was zu sehen ist und
woher es stammt.

Ohne diese Zeile muss die Lehrperson das Bild jedes Mal mündlich erklären, und
im exportierten PDF steht es ohne Zusammenhang da.

```html
<figure>
  <img class="shot" src="bilder/beispiel.jpg" alt="Kurze Beschreibung">
  <figcaption>Abfahrten Bern – Zürich HB, aus der Fahrplan-API.</figcaption>
</figure>
```

Ein Bild ist ausserdem kein Ersatz für den Folientitel. Auch eine reine
Bildfolie bekommt eine `<h2>`, die sagt, worum es geht.

Screenshots bekommen `class="shot"`, damit ihr weisser Rand nicht mit dem
Folienhintergrund verschmilzt. Der Baustein steht in
[README.md](README.md#bilder).
