# Verlaufsplanung: «HTML-Werkstatt»

**Kontext:** CAS Hochschuldidaktik, Lernsequenz aus dem eigenen Fachgebiet
**Zielgruppe:** Dozierende, mehrheitlich fachfremd, kein Vorwissen im Programmieren
**Dauer:** 20 Minuten
**Material:** Projektor, Laptop, ausgedruckte Arbeitsblätter, Tag-Karten, CSS-Karten, Post-its

## Ausgangslage und didaktische Reduktion

Wer noch nie programmiert hat, hält Code für eine Geheimsprache. Diese
Vorstellung blockiert den Einstieg stärker als jede fehlende Fachkenntnis.

Die Sequenz reduziert deshalb radikal: Sie behandelt nicht «Webentwicklung»,
sondern eine Kette aus zwei Schritten.

> Zuerst wird benannt, welche Rolle jeder Teil des Textes spielt. Danach wird
> einmal gesagt, wie alles mit demselben Namen aussehen soll.

Der zweite Schritt ist keine Zierde, sondern die Begründung für den ersten.
Solange nur ausgezeichnet wird, bleibt offen, wozu ein Titel `h1` heissen muss
statt einfach gross zu sein. Erst wenn eine einzige Regel alle drei
Listenpunkte gleichzeitig verändert, wird das Benennen sichtbar nützlich.

Alles andere wird weggelassen: kein Editor, keine Installation, keine Layouts,
keine Klassen, keine verschachtelten Selektoren. Gearbeitet wird auf Papier.
Der Computer erscheint nur dort, wo er einen Mehrwert hat, nämlich als
sofortige Rückmeldung auf ein selbst erstelltes Produkt.

Eingeführt werden fünf Elemente (Überschrift, Absatz, Liste, Listenpunkt,
Hervorhebung) und ein einziger Regelbau (Selektor, Eigenschaft, Wert).

## Lernziele

Die Teilnehmenden können nach dieser Sequenz:

| Nr. | Lernziel | Bloom-Stufe |
| --- | --- | --- |
| LZ1 | mit eigenen Worten erklären, dass eine Webseite aus Inhalt und zusätzlichen Markierungen der Struktur besteht | 2 Verstehen |
| LZ2 | einen vorgegebenen unformatierten Text mit den fünf Grundelementen vollständig und korrekt auszeichnen | 3 Anwenden |
| LZ3 | eine Gestaltungsregel aus Selektor, Eigenschaft und Wert korrekt zusammensetzen und begründen, warum sie alle gleich benannten Teile auf einmal trifft | 4 Analysieren |
| LZ4 | beschreiben, welche Rolle Präzision und unmittelbare Rückmeldung beim Lernen einer formalen Sprache spielen | 2 Verstehen |

LZ1 bis LZ3 sind die fachlichen Ziele. LZ3 ist zweiteilig: Das Zusammensetzen
der Regel ist der Anwendungsanteil und liefert den beobachtbaren Nachweis, das
Begründen der Reichweite ist der Analyseanteil. Dieser zweite Teil ist der
Grund, weshalb die Sequenz überhaupt zwei Schritte hat; ohne ihn bliebe die
Auszeichnungsarbeit aus Schritt eins unmotiviert.

LZ4 ist das Transferziel für dieses Publikum: Die Teilnehmenden erleben in
wenigen Minuten selbst, woran Novizinnen und Novizen scheitern, statt es
erzählt zu bekommen.

## Constructive Alignment

| Lernziel | Lernaktivität | Beobachtbarer Nachweis |
| --- | --- | --- |
| LZ1 | Vergleich von gestalteter Seite und unmarkiertem Text, danach Kurzinput | Die Teilnehmenden benennen im Plenum, welcher Teil Inhalt und welcher Teil Markierung ist. |
| LZ2 | Werkstatt 1 in Partnerarbeit: gedruckten Text mit Tag-Karten auszeichnen | Auf dem Tisch liegt eine vollständige Auszeichnung; sie wird abgetippt und erzeugt im Browser die erwartete Struktur. |
| LZ3 | Werkstatt 2 in Partnerarbeit: vier Regeln aus Karten auf Regel-Streifen legen, danach live tippen | Vier vollständige Regeln liegen mit richtig zugeordneten Rollen; die Paare lesen sie als Satz vor und benennen bei der `li`-Regel, dass alle drei Listenpunkte betroffen sind. |
| LZ4 | One-Sentence Summary auf Post-it und kurze Blitzlichtfrage | Die Post-its nennen Präzision, Benennung oder Rückmeldung als Kern der Erfahrung. |

Keines der Ziele wird durch blosses Zuhören erreicht. LZ2 und LZ3 liegen auf
den Stufen Anwenden und Analysieren, entsprechend führen die Teilnehmenden die
Handlung in beiden Fällen selbst aus.

## Ablaufplan

| Min | Dauer | Lerninhalt und Lernphase | Methode und Sozialform | LZ | Material | Beobachtung oder Nachweis |
| --- | ---: | --- | --- | --- | --- | --- |
| 00 | 2' | **Einstieg.** Fertige Webseite zeigen, danach denselben Text ohne jede Markierung. Frage: «Was fehlt hier?» Irritation und Vorwissen aktivieren. | Impulsfrage im Plenum | LZ1 | `01_einstieg.html`, `06_live.html` | Teilnehmende erkennen im rohen Text ihren eigenen Inhalt wieder. |
| 02 | 3' | **Input 1.** Ein Prinzip: Markierung auf, Inhalt, Markierung zu. Die fünf Elemente an einem Beispiel zeigen. Lernziel und Relevanz in einem Satz. | Interaktiver Kurzinput im Plenum | LZ1 | `02_prinzip.html` | Zwischenfrage nach der Rolle eines Textteils wird korrekt beantwortet. |
| 05 | 6' | **Werkstatt 1.** Jedes Paar zeichnet den gedruckten Text mit den Tag-Karten aus. Integrieren und verarbeiten. | Werkstattarbeit in Partnerarbeit | LZ2 | `03_werkstatt_textstreifen`, `04_tag_karten`, `05_werkstatt_auftrag` | Rundgang: liegen Karten paarweise und in richtiger Reihenfolge? |
| 11 | 2' | **Sicherung 1.** Ein Paar liest seine Lösung vor, die Lehrperson tippt sie live ab und lädt die Seite. Unmittelbare Rückmeldung am eigenen Produkt. | Ergebnissicherung im Plenum | LZ2 | `06_live.html`, Editor | Die projizierte Seite zeigt Überschrift, Absätze und Liste korrekt. |
| 13 | 1' | **Input 2.** Eine Regel besteht aus Selektor, Eigenschaft und Wert. Eine `li`-Regel trifft alle drei Listenpunkte auf einmal. | Kurzinput im Plenum | LZ3 | `08_css_prinzip.html` | Zwischenfrage: «Wie viele Regeln brauche ich für drei Listenpunkte?» |
| 14 | 3' | **Werkstatt 2.** Jedes Paar legt vier Regeln aus Karten auf die Regel-Streifen. Vertiefen und übertragen. | Werkstattarbeit in Partnerarbeit | LZ3 | `09_css_karten`, `10_css_auftrag` | Rundgang: liegt auf jedem Feld eine Karte der passenden Rolle? |
| 17 | 1' | **Sicherung 2.** Regeln live tippen, Seite lädt neu und bekommt Farbe. Dann zurück zur Seite aus Minute 0: dieselbe Art von Regeln, nur dreissig davon. | Ergebnissicherung im Plenum | LZ3 | `06_live.html`, `01_einstieg.html` | Die Seite verändert sich sichtbar; die `li`-Regel wirkt auf alle drei Punkte. |
| 18 | 2' | **Abschluss.** Post-it: «Code ist für mich …». Blitzlicht: «An welcher Stelle sind Sie kurz steckengeblieben?» | One-Sentence Summary in Einzelarbeit, danach Blitzlicht im Plenum | LZ4 | Post-its, Flipchart | Post-its am Flipchart; sie sind der Einstieg in die Feedbackrunde. |

Der Ablauf enthält 6 Minuten Input und 14 Minuten aktive Auseinandersetzung.
Das Sandwich-Prinzip ist zweimal vollständig umgesetzt: Input, Anwendung,
Rückmeldung – und danach dasselbe noch einmal auf der zweiten Ebene.

## Verwendung der formativen Rückmeldungen

Die beiden Werkstätten sind zugleich Classroom Assessment Techniques.

- **Rundgang während Werkstatt 1:** Zeigt sofort, ob das Prinzip «Markierung
  auf und zu» verstanden ist. Fehlen bei mehreren Paaren die schliessenden
  Karten, wird die Sicherung genau an diesem Punkt aufgehängt statt an der
  Gesamtlösung.
- **Rundgang während Werkstatt 2:** Liegt eine Wertkarte auf dem
  Eigenschaftsfeld, ist die Rollenunterscheidung noch nicht da. Das ist kein
  Rechtschreibfehler, sondern der eigentliche Lernpunkt und gehört in die
  Auflösung.
- **One-Sentence Summary am Schluss:** Die Post-its zeigen, ob die Sequenz als
  Sprachlektion oder als Erfahrung über Benennung, Präzision und Rückmeldung
  angekommen ist. In einer längeren Veranstaltung wäre das der Anschlusspunkt
  für die nächste Einheit.

## Vorbereitete Antworten auf erwartbare Fragen

**«Ist HTML überhaupt Programmieren?»**
Streng genommen nicht, es ist eine Auszeichnungssprache ohne Logik. Für die
hier verfolgten Lernziele ist das der Vorteil: Die Regeln formaler Sprachen –
strikte Syntax, feste Reihenfolge, sofortiges Scheitern bei Ungenauigkeit –
gelten identisch, aber das Ergebnis ist nach dreissig Sekunden sichtbar. Diese
Einordnung wird im Abschluss offen benannt.

**«Macht das heute nicht die KI?»**
Sie schreibt den Code, aber sie entscheidet nicht, was auf Ihrer Seite eine
Überschrift ist und was ein Nebensatz. Diese Bedeutung geben Sie vor, und ohne
sie greift keine einzige Gestaltungsregel. Genau das haben die Teilnehmenden in
den beiden Werkstätten getan.

**«Warum nicht einfach jeden Teil direkt einfärben?»**
Weil man es dann bei jedem Teil einzeln wiederholen müsste, auch beim
vierhundertsten. Die Benennung im ersten Schritt ist der Grund, weshalb der
zweite Schritt kurz bleibt.

## Wenn die Zeit knapp wird

Werkstatt 2 wird auf zwei Regeln gekürzt und im Plenum gelegt statt in
Partnerarbeit; die Karten bleiben trotzdem in der Hand der Teilnehmenden.
Werkstatt 1 wird nicht gekürzt, sie trägt das Hauptlernziel.

## Wenn Zeit übrig bleibt

In `material/optional_fehlerjagd/` liegt eine vollständige Fehlerjagd: ein
kaputter Ausschnitt mit zwei Fehlern, Arbeitsblatt und Lösung. Sie fügt der
Sequenz eine Diagnosephase von etwa vier Minuten hinzu und ist der
Erweiterungsbaustein für eine Fassung ab 30 Minuten.

Kürzer geht auch: Zwei Paare vergleichen, welchen Textteil sie hervorgehoben
und welche Farbe sie welchem Element zugeordnet haben, und begründen die
Entscheidung. Das öffnet den Übergang zur Frage, wo bei formalen Sprachen der
Gestaltungsspielraum liegt.
