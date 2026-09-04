# Fehlerjagd – Lösung für die Lehrperson

## Fehler 1: Zeile 4, die Markierung wird nie geschlossen

```html
<p>Ein Zopf braucht <strong>wenig Zutaten und viel Geduld.</p>
```

`<strong>` wird geöffnet, aber nirgends wieder geschlossen.

**Sichtbare Wirkung:** Alles ab «wenig Zutaten» bleibt fett, auch der letzte
Absatz weiter unten. Der Browser wartet auf ein `</strong>`, das nie kommt.

**Korrektur:**

```html
<p>Ein Zopf braucht <strong>wenig Zutaten und viel Geduld.</strong></p>
```

## Fehler 2: Zeilen 10 bis 12, die Listenpunkte fehlen

```html
<ul>
  500 g Mehl
  1 Würfel Hefe
  2,5 dl Milch
</ul>
```

Die Aufzählung ist als Ganzes markiert, aber die einzelnen Punkte sind es
nicht.

**Sichtbare Wirkung:** Keine Aufzählungszeichen, und alle drei Zutaten stehen
in einer einzigen Zeile hintereinander. Der Browser weiss nicht, wo ein Punkt
aufhört und der nächste beginnt.

**Korrektur:**

```html
<ul>
  <li>500 g Mehl</li>
  <li>1 Würfel Hefe</li>
  <li>2,5 dl Milch</li>
</ul>
```

## Auflösung im Plenum

Nicht die Lösung vorlesen, sondern in dieser Reihenfolge fragen:

1. «Was am Ergebnis sieht falsch aus?» – Beschreiben lassen, nicht erklären.
2. «Ab welcher Stelle genau ist es fett?» – Die Grenze führt direkt zur Zeile.
3. Erst dann `fehlerjagd_korrekt.html` daneben projizieren.

Der Übergang zum Abschluss:

> Sie haben gerade das gemacht, was beim Programmieren den grössten Teil der
> Zeit ausmacht. Nicht schreiben, sondern herausfinden, warum das Ergebnis
> nicht dem entspricht, was man gemeint hat.
