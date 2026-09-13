**Dieses File ist für AI Agents geschrieben**

# Didaktischer Werkzeugkasten für die Unterrichtsplanung

Dieses Dokument sammelt die zentralen Begriffe und Methoden aus dem CAS
Hochschuldidaktik und übersetzt sie in direkt nutzbare Beispiele für
Interaktive Medien 3.

Es dient als Nachschlagewerk für die Planung einzelner Lektionen. Nicht jede
Unterrichtseinheit muss alle hier aufgeführten Phasen oder Methoden enthalten.
Entscheidend ist, dass Lernziele, Lernaktivitäten und die Überprüfung des
Lernens zusammenpassen.

## Unterricht mit AI planen

Diese Datei ist vor allem als Wissen für eine AI gedacht.

Bitte die AI, diese Datei vor der Planung zu lesen:

`dozierende/unterrichtsplanung/README.md`

Ein einfacher Auftrag kann so aussehen:

> Erstelle einen Ablaufplan für eine Unterrichtseinheit.
> Lies zuerst `AGENTS.md` und
> `dozierende/unterrichtsplanung/README.md`.
> Formuliere klare Lernziele.
> Plane kurze Inputs und einfache Übungen.

Prüfe den Vorschlag danach selbst.

Die AI unterstützt die Planung.

Die Verantwortung bleibt bei den Dozierenden.

## Begriffe auseinanderhalten

| Begriff                        | Leitfrage                                                                                | Beispiele                                                         |
| ------------------------------ | ---------------------------------------------------------------------------------------- | ----------------------------------------------------------------- |
| Lernphase                      | Welche Funktion hat dieser Abschnitt im Lernprozess?                                     | Vorwissen aktivieren, Informationen aufnehmen, üben, reflektieren |
| Methode                        | Wie wird das Lernen angeregt?                                                            | Think-Pair-Share, Code-Along, Concept Map, Peer-Feedback          |
| Sozialform                     | Wer arbeitet mit wem?                                                                    | Plenum, Einzelarbeit, Partnerarbeit, Projektgruppe                |
| Material oder Medium           | Womit wird gearbeitet?                                                                   | Folien, Whiteboard, Laptop, Startcode, Cheatsheet                 |
| Classroom Assessment Technique | Wie wird während des Unterrichts sichtbar, was gelernt oder noch nicht verstanden wurde? | Exit Ticket, Muddiest Point, Code Prediction                      |

`Plenum` und `Einzelarbeit` sind somit keine Methoden, sondern Sozialformen.
In einem Ablaufplan können Methode und Sozialform gemeinsam genannt werden:

- interaktiver Kurzinput im Plenum;
- Think-Pair-Share in Einzelarbeit, Partnerarbeit und Plenum;
- geführtes Code-Along mit individueller Umsetzung am Laptop;
- digitale Anwendungsübung in Einzelarbeit;
- leitfragenbasierte Gruppenarbeit im Projektteam.

## Constructive Alignment und Backward Course Design

Beim Backward Course Design wird die Planung vom gewünschten Ergebnis her
gedacht:

1. Festlegen, was die Student:innen am Ende tun können sollen.
2. Bestimmen, woran die Zielerreichung beobachtet werden kann.
3. Lernaktivitäten planen, welche genau auf diesen Nachweis vorbereiten.

Constructive Alignment verlangt, dass diese drei Elemente zusammenpassen.
Ein Lernziel auf der Stufe `anwenden` kann nicht allein durch Zuhören erreicht
oder überprüft werden. Die Student:innen müssen selbst eine entsprechende
Handlung ausführen.

Beispiel für Block A:

| Lernziel                         | Lernaktivität                    | Beobachtbarer Nachweis                                          |
| -------------------------------- | -------------------------------- | --------------------------------------------------------------- |
| Eine `foreach`-Schleife anwenden | Code-Along und eigene Übung      | Das Skript gibt für jeden Datensatz eine Zeile aus.             |
| Einfache Fehler analysieren      | Fehlerdiagnose und Testwerte     | Die Student:innen benennen den Fehler und korrigieren den Code. |
| Eine Datenfrage formulieren      | Leitfragenbasierte Gruppenarbeit | Die Gruppe legt eine offene, mit Daten beantwortbare Frage vor. |

## Lernphasen nach MOMBI

Die CAS-Unterlagen zeigen das Model of Model-Based Instruction (MOMBI) nach
Hanke. Es beschreibt sechs aufeinander bezogene Lernphasen. Die deutschen
Bezeichnungen in der folgenden Tabelle sind eine praxisnahe Übertragung für
die Unterrichtsplanung.

| Phase                                  | Funktion                                                              | Mögliche Lehraktivität                                      | Beispiel für Block A                                                                     |
| -------------------------------------- | --------------------------------------------------------------------- | ----------------------------------------------------------- | ---------------------------------------------------------------------------------------- |
| 1. Irritation oder Problemorientierung | Aufmerksamkeit und eine produktive Irritation erzeugen                | überraschendes Beispiel, Konfliktfall, offene Frage         | Zwei fast gleiche PHP-Beispiele liefern unterschiedliche Ausgaben. Warum?                |
| 2. Vorwissen aktivieren                | Vorhandenes Wissen abrufen und anschlussfähig machen                  | Retrieval Practice, Think-Pair-Share, Kurzquiz              | Bekannte JavaScript-Konzepte in einem PHP-Beispiel markieren.                            |
| 3. Lernziele und Relevanz klären       | Ziel, Nutzen und beruflichen Bezug sichtbar machen                    | Lernziele transparent machen, Projektbezug erklären         | Zeigen, weshalb Backend- und Frontend-Team einfachen PHP-Code verstehen müssen.          |
| 4. Informationen aufnehmen             | Neue Begriffe, Modelle oder Vorgehensweisen kennenlernen              | Kurzinput, Beispiel, Demonstration                          | Unterschiede zwischen JavaScript- und PHP-Syntax zeigen.                                 |
| 5. Integrieren und verarbeiten         | Neues Wissen mit Vorwissen verbinden und geführt anwenden             | Code-Along, Vergleich, Verständnisfragen, Reflexionsimpulse | Variablen, Funktionen und Bedingungen gemeinsam in PHP umsetzen.                         |
| 6. Vertiefen, üben und übertragen      | Eine Handlung selbst ausführen und auf einen neuen Kontext übertragen | Anwendungsübung, Fallaufgabe, Projektarbeit                 | Den Städtevergleich selbstständig programmieren oder eine eigene Datenfrage formulieren. |

Eine kurze Reflexion oder Ergebnissicherung schliesst die Einheit ab. Sie kann
Teil der Integration oder Vertiefung sein und beispielsweise mit einem Exit
Ticket oder Muddiest Point erfolgen.

### Deduktiver und induktiver Verlauf

Die CAS-Unterlagen unterscheiden zwei mögliche Dramaturgien:

- **Deduktiv:** Theorie -> Verarbeitung -> Handlung.
- **Induktiv:** Handlung oder Problem -> Reflexion -> Theorie -> erneute
  Handlung.

Beide Varianten sind möglich. Für Programmierunterricht eignet sich häufig ein
kurzer induktiver Einstieg: Die Student:innen untersuchen zuerst eine Ausgabe
oder einen Fehler und leiten daraus gemeinsam eine Regel ab.

### Sandwich-Prinzip

Längere Vermittlungsphasen werden mit Phasen der aktiven Auseinandersetzung
abgewechselt:

```text
Einstieg
-> kurzer Input
-> aktive Verarbeitung
-> kurzer Input oder Demonstration
-> eigene Anwendung
-> Abschluss
```

Auch eine einminütige Code Prediction oder eine kurze Partnerfrage kann eine
lange Inputphase sinnvoll unterbrechen.

## Methoden für aktives Lernen

### Think-Pair-Share

1. **Think:** Jede Person bearbeitet eine Frage zunächst allein.
2. **Pair:** Zwei Personen vergleichen und begründen ihre Antworten.
3. **Share:** Ausgewählte Ergebnisse werden im Plenum geteilt.

Geeignet für:

- JavaScript und PHP vergleichen;
- die Ausgabe eines Codes begründen;
- Regeln für eine Datenfrage formulieren.

### Retrieval Practice

Student:innen rufen Wissen ohne unmittelbaren Blick in die Unterlagen ab. Das
Abrufen ist selbst eine Lernaktivität und nicht nur eine Kontrolle.

Mögliche Varianten:

- Codeausgabe vorhersagen;
- einen Begriff aus dem Gedächtnis erklären;
- eine bekannte PHP-Struktur auf einem leeren Blatt skizzieren;
- drei zentrale Erkenntnisse der letzten Lektion notieren.

### Code Prediction

Vor dem Ausführen eines Codes sagen die Student:innen dessen Ausgabe oder
Verhalten voraus und begründen die Vorhersage. Danach wird der Code ausgeführt
und die Vorhersage mit dem Ergebnis verglichen.

Code Prediction verbindet Retrieval Practice, Selbstüberprüfung und
Fehleranalyse. Sie lässt sich als kurze Aktivierung im Code-Along oder als
formativer Lerncheck einsetzen.

### Code-Along

Die Lehrperson entwickelt ein Beispiel schrittweise, während die
Student:innen selbst mittippen und das Resultat prüfen. Ein Code-Along wird
aktiver, wenn die Student:innen regelmässig:

- die nächste Codezeile vorschlagen;
- eine Ausgabe vorhersagen;
- eine Variable selbst verändern;
- einen Fehler suchen;
- einen Zwischenschritt einer Partnerperson erklären.

Wenn nur die Lehrperson programmiert und alle zuschauen, handelt es sich eher
um eine Demonstration.

### Peer-Feedback

Student:innen prüfen gegenseitig ein Arbeitsergebnis anhand weniger klarer
Kriterien. Noviz:innen benötigen eine enge Struktur.

Mögliche Checkliste für PHP:

- Entspricht die Ausgabe der Aufgabenstellung?
- Werden die geforderten Datenstrukturen verwendet?
- Funktionieren die vorgegebenen Testwerte und Grenzfälle?
- Sind Variablen und Funktionen verständlich benannt?
- Welcher konkrete nächste Schritt würde die Lösung verbessern?

### Placemat

Alle Gruppenmitglieder notieren zuerst individuell Ideen. Danach lesen und
bündeln sie die Beiträge und halten in der Mitte ein gemeinsames Ergebnis
fest.

Geeignet für:

- Themenideen sammeln;
- eine gemeinsame Datenfrage formulieren;
- Kriterien für eine Datenquelle festlegen;
- Projektentscheidungen treffen.

### Concept Map

Schlüsselbegriffe werden gesammelt und durch beschriftete Beziehungen
verbunden. Die Beziehungen sind wichtiger als eine reine Liste von Begriffen.

Beispiel:

```text
Array -> enthält -> Datensätze
foreach -> durchläuft -> Array
Funktion -> verarbeitet -> Wert
Bedingung -> bewertet -> Wert
echo -> erzeugt -> Ausgabe
```

### Leitfragenbasierte Gruppenarbeit

Eine Gruppe bearbeitet einen offenen Auftrag anhand weniger verbindlicher
Leitfragen und liefert ein klar definiertes Ergebnis ab.

Beispiel für eine Datenfrage:

- Was möchten wir herausfinden?
- Welche Untersuchungseinheit betrachten wir?
- Welchen Zeitraum benötigen wir?
- Welche Daten könnten die Frage beantworten?
- Ist die Frage offen und nicht bereits mit Ja oder Nein beantwortet?

## Classroom Assessment Techniques (CATs)

CATs sind kurze formative Verfahren. Sie helfen der Lehrperson zu erkennen,
was die Student:innen lernen und wo Schwierigkeiten bestehen. Sie dienen in
der Regel nicht der Benotung. Die Antworten werden genutzt, um den weiteren
Unterricht anzupassen.

### CATs aus den CAS-Unterlagen

| CAT                   | Auftrag                                                                       | Beispiel für IM3                                       | Mögliche Verwendung der Antworten                                   |
| --------------------- | ----------------------------------------------------------------------------- | ------------------------------------------------------ | ------------------------------------------------------------------- |
| Exit Ticket           | Am Ende eine kurze Frage beantworten                                          | «Was gibt diese `foreach`-Schleife aus und weshalb?»   | Einstieg oder Gruppierung in der nächsten Lektion anpassen          |
| Muddiest Point        | Den unklarsten Aspekt notieren                                                | «Welches PHP-Konzept ist noch am wenigsten klar?»      | Häufigste Unklarheit zu Beginn der nächsten Lektion aufnehmen       |
| Approximate Analogies | Eine Beziehung nach dem Muster «A verhält sich zu B wie ...» vervollständigen | «Ein Parameter verhält sich zu einem Argument wie ...» | Fehlvorstellungen in Analogien erkennen und besprechen              |
| Start-Stop-Continue   | Notieren, was beginnen, aufhören und weitergeführt werden sollte              | Rückmeldung zu Input, Code-Along und Hilfsmaterial     | Lernunterstützung und Ablauf anpassen                               |
| Concept Map           | Begriffe in qualitative Beziehungen setzen                                    | Variablen, Funktionen, Arrays und Schleifen verbinden  | Verständnis von Zusammenhängen statt isoliertem Faktenwissen prüfen |

### Weitere einfache formative Lernchecks

Diese Verfahren folgen demselben formativen Grundgedanken:

| Verfahren            | Beispiel                                                                    |
| -------------------- | --------------------------------------------------------------------------- |
| Minute Paper         | «Was ist deine wichtigste Erkenntnis? Welche Frage bleibt offen?»           |
| Code Prediction      | Ausgabe vorhersagen, begründen und anschliessend überprüfen                 |
| Fehlerdiagnose       | Einen Fehler markieren, seine Wirkung erklären und ihn korrigieren          |
| One-Sentence Summary | «Eine `foreach`-Schleife brauche ich, wenn ...»                             |
| Unbenotetes Kurzquiz | Zwei bis drei Fragen zu Datentypen, Syntax oder Codeausgaben                |
| Selbsteinschätzung   | Sicherheit zu einem Lernziel auf einer Skala einschätzen und kurz begründen |

Eine CAT ist nur nützlich, wenn ihre Ergebnisse Konsequenzen haben. In der
Planung sollte deshalb kurz festgehalten werden, wie die Antworten ausgewertet
und in der nächsten Unterrichtsphase verwendet werden.

## Bloomsche Lernzieltaxonomie

Kompetenzorientierte Lernziele beschreiben beobachtbares Verhalten. Sie
bestehen mindestens aus:

```text
aktives Verb + Gegenstand der Handlung
```

Eine Bedingung oder ein Qualitätskriterium kann die Anforderung präzisieren:

```text
Die Student:innen können eine vorbereitete Liste von Messwerten
mit foreach vollständig durchlaufen und pro Messwert eine Zeile ausgeben.
```

Formulierungen wie `kennen`, `wissen`, `lernen` oder bloss `verstehen` sind
schwer beobachtbar. Besser sind Handlungen wie `erklären`, `anwenden`,
`vergleichen`, `prüfen` oder `entwickeln`.

| Bloom-Stufe    | Bedeutung                                      | Geeignete Verben                                                  | Beispiel für IM3                                                      |
| -------------- | ---------------------------------------------- | ----------------------------------------------------------------- | --------------------------------------------------------------------- |
| 1. Erinnern    | Bekanntes abrufen                              | aufzählen, benennen, identifizieren, wiedergeben                  | PHP-Datentypen benennen                                               |
| 2. Verstehen   | Zusammenhänge mit eigenen Worten darstellen    | erklären, beschreiben, unterscheiden, vergleichen, zusammenfassen | Unterschiede zwischen PHP und JavaScript erklären                     |
| 3. Anwenden    | Bekanntes Verfahren in einer Aufgabe einsetzen | anwenden, ausführen, implementieren, vervollständigen, berechnen  | Eine vorbereitete Funktion vervollständigen und aufrufen              |
| 4. Analysieren | Bestandteile, Muster oder Ursachen untersuchen | analysieren, strukturieren, differenzieren, zuordnen, ableiten    | Einen Fehler lokalisieren und seine Ursache erklären                  |
| 5. Evaluieren  | Ein Ergebnis anhand von Kriterien beurteilen   | prüfen, beurteilen, bewerten, entscheiden, begründen              | KI-generierten Code mit Testwerten prüfen und die Übernahme begründen |
| 6. Erschaffen  | Eine neue, zusammenhängende Lösung entwickeln  | entwickeln, planen, erstellen, gestalten, kombinieren             | Einen Städtevergleich aus mehreren Anforderungen erstellen            |

### Lernziele überprüfen

Vor der Verwendung eines Lernziels prüfen:

- Beschreibt es das Ergebnis des Lernprozesses statt nur einen Inhalt?
- Enthält es eine beobachtbare Handlung?
- Ist der Gegenstand der Handlung eindeutig?
- Ist die Bloom-Stufe für Vorwissen und Zeitbudget realistisch?
- Gibt es eine Lernaktivität, in der die Handlung ausgeführt wird?
- Gibt es einen sichtbaren Nachweis für die Zielerreichung?
- Besteht ein nachvollziehbarer Bezug zur beruflichen Handlungskompetenz?

## Vorlage für einen Ablaufplan

| Zeit  | Dauer | Lerninhalt und Lernphase | Methode und Sozialform | Lernziel | Material | Beobachtung oder Nachweis |
| ----- | ----: | ------------------------ | ---------------------- | -------- | -------- | ------------------------- |
| 09.15 |       |                          |                        |          |          |                           |

Die Spalte `Beobachtung oder Nachweis` ist in der HSLU-Mustervorlage nicht
enthalten. Sie kann trotzdem beim Planen helfen und macht das Constructive
Alignment sichtbar. Falls die offizielle Vorlage unverändert bleiben soll,
kann dieser Punkt in der Spalte `Lernziele` oder in den Anmerkungen notiert
werden.

## Kompakte Planungscheckliste

- Welche berufliche Situation bildet den Ausgangspunkt?
- Was sollen die Student:innen nach der Einheit beobachtbar tun können?
- Auf welcher Bloom-Stufe liegt jedes Lernziel?
- Welche Lernphase erfüllt jeder Abschnitt?
- Wechseln Input und aktive Auseinandersetzung sinnvoll ab?
- Sind Methode und Sozialform korrekt bezeichnet?
- Wendet jede Person die zentralen Fähigkeiten selbst an?
- Woran wird die Zielerreichung sichtbar?
- Welche CAT liefert Rückmeldung über den Lernstand?
- Wie beeinflusst diese Rückmeldung den weiteren Unterricht?
- Sind Umfang und Komplexität im verfügbaren Zeitbudget realistisch?

## Grundlage

Dieses Nachschlagewerk basiert auf den bereitgestellten CAS-Unterlagen zu:

- kompetenzorientierten Lernzielen und der revidierten Bloomschen Taxonomie;
- Constructive Alignment und Backward Course Design;
- didaktischer Reduktion;
- Lernphasen und Lehrstrategien nach MOMBI;
- deduktiven und induktiven Verlaufsformen sowie dem Sandwich-Prinzip;
- aktivem Lernen, Retrieval Practice und Peer-Feedback;
- Classroom Assessment Techniques.

Die Beispiele und Übertragungen auf PHP, Datenjournalismus und das
IM3-Projekt wurden für diesen Kurs formuliert.
