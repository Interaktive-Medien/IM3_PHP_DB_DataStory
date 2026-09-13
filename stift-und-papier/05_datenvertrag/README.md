# 05 – Datenvertrag

> Nach M3 steht der Datensatz. Backend- und Frontend-Team legen gemeinsam fest,
> in welcher Form die Daten am Ende als JSON ankommen. Endet mit dem
> Datenvertrag für M4.

**Dauer:** 45' · **Sozialform:** Projektteam, beide Zweierteams zusammen

## Material

[`arbeitsblatt.html`](arbeitsblatt.html) im Browser öffnen, `Cmd+P`, A4 hoch,
Hintergrundgrafiken an. Ein Blatt pro Projektteam, dazu der eigene Datensatz
auf einem Laptop.

## Verlauf

| #   | Schritt                                                                                                                                             | Dauer |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------- | ----: |
| 1   | **Rahmen:** Das Beispiel Hitzesommer zeigen, ein Datensatz als JSON und seine Felder. Klarmachen: Der Vertrag beschreibt das Ende der Kette, nicht die Rohdaten. |    5' |
| 2   | **Frage und Datensatz:** Datenfrage aus M2 übertragen und festlegen, wofür ein Datensatz steht.                                                    |    5' |
| 3   | **Felder:** nur Felder, die Grafik oder Story wirklich brauchen – mit Name, Typ, Beispielwert, Bedeutung und ob der Wert fehlen darf.               |   20' |
| 4   | **Filter:** festhalten, wonach das Frontend fragen will, zum Beispiel `?city=Bern`. Das Backend baut genau diese Filter später in `unload.php` ein. |   10' |
| 5   | **Abmachen:** beide Zweierteams unterschreiben, Blatt abfotografieren und im Projekt-Repository ablegen.                                            |    5' |

## Worauf es ankommt

- **Vom Ende her denken.** Nicht die Spalten der Quelle abschreiben, sondern
  fragen, was die Grafik braucht. Alles andere fällt weg.
- **Namen früh festlegen.** Englisch, klein, mit Unterstrich und Einheit im
  Namen, zum Beispiel `max_temperature_c`.
- **Fehlende Werte ehrlich benennen.** Fehlt ein Wert, steht `null` und nicht
  `0`.
- **v0 ist ein Entwurf.** Der Vertrag darf sich ändern, aber nur gemeinsam und
  mit neuer Versionsnummer.

## Abnahme M4

Das ausgefüllte Blatt zeigen: Feldnamen, Typen, Beispielwerte und die nötigen
Filter stehen, und beide Zweierteams haben unterschrieben.
