# Lernsequenz «HTML-Werkstatt»

20-minütige Unterrichtseinheit für das CAS Hochschuldidaktik. Zielgruppe sind
Dozierende ohne jedes Vorwissen im Programmieren.

Die didaktische Planung mit Lernzielen, Alignment-Tabelle und Ablaufplan steht
in [`verlaufsplanung.md`](verlaufsplanung.md). Diese Datei hier ist die
Regieanweisung für die Durchführung.

## Idee in vier Sätzen

Die Teilnehmenden zeichnen einen gedruckten Text mit Karten aus, auf denen
HTML-Tags stehen. Ihre Lösung wird live abgetippt und im Browser gezeigt.
Danach bauen sie aus einem zweiten Kartensatz vier Gestaltungsregeln, und die
Seite bekommt vor ihren Augen Farbe.

Der zweite Teil ist der Grund für den ersten: Eine einzige Regel für `li`
verändert alle drei Listenpunkte gleichzeitig. Erst dadurch wird sichtbar,
wozu die Benennung im ersten Schritt gut war.

Gearbeitet wird auf Papier. Niemand braucht einen Laptop.

## Vorbereitung

### Drucken und schneiden

Für **jedes Paar** einmal:

| Datei | Was daraus wird |
| --- | --- |
| `material/03_werkstatt_textstreifen.html` | 8 Textstreifen, entlang der gestrichelten Linien schneiden |
| `material/04_tag_karten.html` | 18 Tag-Karten, schneiden und mischen |
| `material/05_werkstatt_auftrag.html` | 1 Auftragsblatt für Werkstatt 1, bleibt ganz |
| `material/09_css_karten.html` | 12 CSS-Karten schneiden und mischen, 4 Regel-Streifen auseinanderschneiden |
| `material/10_css_auftrag.html` | 1 Auftragsblatt für Werkstatt 2, bleibt ganz |

Alle fünf passen auf je eine A4-Seite. Fertig ausgegeben liegen sie als PDF in
`druckvorlagen/`; das ist der schnellste Weg zum Drucker und die Fassung für
den Austauschordner. Wer etwas ändern will, bearbeitet die HTML-Datei in
`material/`, öffnet sie im Browser und druckt sie neu.

Das Schneiden dauert länger als das Drucken. Pro Paar sind es 42 Schnipsel
(18 Tag-Karten, 8 Textstreifen, 12 CSS-Karten, 4 Regel-Streifen), für sechs
Paare also gut 250 Stück und rund 45 Minuten Vorbereitung. Die beiden
Kartensätze gehören in **getrennte Couverts** pro Paar, sonst vermischen sich
Tag-Karten und CSS-Karten und das Material ist nicht wiederverwendbar.

Wer nicht drucken kann, schreibt die Karten von Hand auf Moderationskarten und
die Textstreifen auf Papierstreifen. Die Regel-Streifen lassen sich auf einem
Blatt mit `{`, `:`, `;` und `}` von Hand vorzeichnen. Das funktioniert genauso.

### Am Laptop vorbereiten

Vier Tabs in dieser Reihenfolge offen halten:

1. `material/01_einstieg.html` – die fertige Seite
2. `material/02_prinzip.html` – HTML-Code und Ergebnis nebeneinander
3. `material/06_live.html` – hier wird zweimal live getippt, Editor daneben offen
4. `material/08_css_prinzip.html` – der Aufbau einer Regel

`material/07_loesung.html` und `material/11_css_loesung.html` sind die
Rückfallebene, falls das Livetippen scheitert. Nicht als Tab offen lassen,
sondern nur bei Bedarf öffnen.

In `06_live.html` steht im Kopf bereits ein leerer `<style>`-Block. Dort hinein
kommen später die Regeln. Vorher kurz nachsehen, dass er noch da ist.

### Im Raum

Tische so stellen, dass jedes Paar etwa eine A3-Fläche frei hat. Die Streifen
liegen untereinander, die Tag-Karten links und rechts davon. Die Lösung wird
also etwa 40 cm breit und 30 cm hoch. Für Werkstatt 2 braucht es daneben noch
Platz für vier Regel-Streifen.

Flipchart für die Post-its am Schluss bereitstellen.

## Regie

| Min | Was | Womit |
| --- | --- | --- |
| 00 | Fertige Seite zeigen. Fragen: «Was steht hinter dieser Seite?» Antworten sammeln, nicht bewerten. Dann `06_live.html` öffnen: derselbe Text ohne Markierungen, alles klebt in einer Zeile. | Tab 1, dann Tab 3 |
| 02 | Prinzip zeigen: Markierung auf, Inhalt, Markierung zu. Die sechs Markierungen benennen. Sagen, was gleich zu tun ist und warum es um mehr geht als um HTML. | Tab 2 |
| 05 | Tag-Karten und Auftrag 1 verteilen, Auftrag vorlesen lassen, Zeit ansagen. Danach herumgehen und **nicht** korrigieren, nur beobachten. | Couvert 1, Auftragsblatt 1 |
| 11 | Ein Paar liest seine Lösung von oben nach unten vor. Genau das tippen, was gesagt wird, auch wenn es falsch ist. Seite neu laden. | Tab 3, Editor |
| 13 | Regelaufbau zeigen: Selektor, Eigenschaft, Wert. Die `li`-Regel als Beispiel: eine Regel, drei Listenpunkte. | Tab 4 |
| 14 | CSS-Karten und Auftrag 2 verteilen, Zeit ansagen. Wieder nur beobachten. | Couvert 2, Auftragsblatt 2 |
| 17 | Regeln eines Paares in den `<style>`-Block tippen, Seite neu laden. Danach `body { background: beige; }` selbst dazusetzen. Zum Schluss zurück auf Tab 1. | Tab 3, dann Tab 1 |
| 18 | Post-it: «Code ist für mich …». Blitzlicht: «Wo sind Sie kurz steckengeblieben?» Post-its ans Flipchart. | Post-its, Flipchart |

Der Moment in Minute 11 trägt die erste Hälfte. Wenn dort ein Fehler
auftaucht, ist das kein Zwischenfall, sondern das beste Material: Es zeigt in
zwei Sekunden, was Präzision in einer formalen Sprache bedeutet.

Der Moment in Minute 17 trägt die zweite. Beim Tippen der `li`-Regel eine
Sekunde innehalten und fragen: «Wie viele Punkte verändern sich jetzt?»

## Der Schluss

Nach vier Regeln sieht die Seite **nicht** aus wie die Seite aus Minute 0. Sie
hat Farben, aber immer noch die nackte Standardschrift des Browsers. Das ist
kein Mangel, sondern der letzte Satz der Sequenz:

> Das waren vier Regeln. Die Seite von vorhin hat dreissig davon. Mehr
> Unterschied ist da nicht.

Dazu Tab 1 wieder aufrufen. Nicht mehr dazu sagen.

## Dateien

```text
lernsequenz/
├── README.md                      diese Regieanweisung
├── verlaufsplanung.md             Lernziele, Alignment, Ablaufplan
├── handout_lerngruppe.md          Kurzfassung für den Austauschordner
├── druckvorlagen/                 dieselben fünf Blätter als fertiges PDF
└── material/
    ├── 01_einstieg.html                  fertige Webseite, Projektion
    ├── 02_prinzip.html                   HTML-Code und Ergebnis nebeneinander, Projektion
    ├── 03_werkstatt_textstreifen.html    Druckvorlage, 8 Streifen pro Paar
    ├── 04_tag_karten.html                Druckvorlage, 18 Karten pro Paar
    ├── 05_werkstatt_auftrag.html         Druckvorlage, Auftrag für Werkstatt 1
    ├── 06_live.html                      wird im Unterricht zweimal live ergänzt
    ├── 07_loesung.html                   ausgezeichnete Fassung als Rückfallebene
    ├── 08_css_prinzip.html               Aufbau einer Regel, Projektion
    ├── 09_css_karten.html                Druckvorlage, 12 Karten und 4 Regel-Streifen
    ├── 10_css_auftrag.html               Druckvorlage, Auftrag für Werkstatt 2
    ├── 11_css_loesung.html               gestaltete Fassung als Rückfallebene
    └── optional_fehlerjagd/              Erweiterung für längere Fassungen
```

## Hinweise

**Die vier Werte sind so gewählt, dass sie echtes CSS sind.** `olive`, `teal`
und `chocolate` sind gültige Farbnamen, `22px` eine gültige Grösse. Auf den
Karten steht nichts, was später wieder verlernt werden müsste.

**Die Zuordnung ist offen.** Welches Element welche Farbe bekommt, entscheidet
jedes Paar selbst. Nur `font-size` gehört zu `22px`; dieser Hinweis steht auf
dem Auftragsblatt, damit die drei Minuten nicht am Raten vergehen. Es gibt
deshalb keine einzelne richtige Lösung, und beim Livetippen wird die Fassung
eines konkreten Paares getippt, nicht eine Musterlösung.

**Bis Minute 13 wird kein CSS erwähnt.** `06_live.html` und `07_loesung.html`
sehen bewusst nackt aus. Wenn früh jemand fragt, wo Farben und Layout
herkommen, lautet die Antwort ein Satz: das kommt gleich noch. Nicht mehr dazu
sagen, sonst kippt die Reduktion der ersten Hälfte.

**Die Fehlerjagd liegt in `material/optional_fehlerjagd/`.** Sie war in einer
früheren Fassung Teil der Sequenz und ist durch Werkstatt 2 ersetzt worden. Für
eine Fassung ab 30 Minuten lässt sie sich unverändert hinter Minute 11
einschieben; Arbeitsblatt und Lösung sind vollständig.
