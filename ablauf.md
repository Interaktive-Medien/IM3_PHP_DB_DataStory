# Ablauf IM3

## Tagesstruktur

1. **Theorie, Code-Alongs und Übungen:** kurze Theorie, dann Code-Along oder Übung.
2. **Projektspur:** Gelerntes mithilfe der [Story-Karten](https://codeanddesign.ch/im3/kartenset.html) auf die eigene Datenfrage übertragen.
3. **Abschluss:** Ergebnis sichern, Meilenstein zeigen.

## Legende

`📕` Theorie / Slides `🧑‍🏫` Code-Along `💻` Digitale Übung
`📝` Analoge Übung `🛠️` Tooling `🎨` Projektarbeit `🃏` Story-Karten
`✅` Meilenstein

## Ablauf nach Blöcken

Der Kurs ist in Themenblöcke gegliedert. Ein Block kann sich über mehrere
Kurstage erstrecken. Die Story-Karten-Spur (`🃏`) und die Arbeit am Gruppenprojekt (`🎨`) laufen parallel mit.

> Dozierende können die Story-Karten-Spur passend in den Kurs einbetten oder sprechen sich mit Nils ab.

### Kickoff

1. `📕` Theorie: [Kickoff – Rückblick und Ziel](theorie/00_kickoff/) `15'`
2. `📝` Analoge Übung: [01 Data-Story-Workshop](stift-und-papier/01_data_story_galerie/) `40'`
3. `📕` Theorie: [Kickoff – Kursaufbau, Projekt und Administratives](theorie/00_kickoff/) `25'`
4. `🎨` Projekt: [02 Themenbörse](stift-und-papier/02_themenboerse/) `45'`
5. `✅` **M1: Gruppen gebildet**

### Block A – PHP Basics

1. `🛠️` Tooling: PhpStorm, Terminal und Git überprüfen `30'`
2. `🛠️` Tooling: Lokaler Server [00 Lokaler PHP-Server](theorie/00_lokaler_php_server/index.html) `30'`
3. `📝` Analoge Übung: [03 Von JavaScript zu PHP](stift-und-papier/03_von_js_zu_php/) `35'`
4. `🧑‍🏫` Code-Along: [00 Hallo PHP](code-alongs/A_PHP_Basics/00_hallo_php) `30'`
5. `📕` Theorie A: [PHP Basics](theorie/A_PHP_Basics) `60'`
6. `🧑‍🏫` Code-Along: [01 Variablen](code-alongs/A_PHP_Basics/01_variablen) `25'`
7. `🧑‍🏫` Code-Along: [02 Funktionen](code-alongs/A_PHP_Basics/02_funktionen) `25'`
8. `🧑‍🏫` Code-Along: [03 Bedingungen](code-alongs/A_PHP_Basics/03_bedingungen) `25'`
9. `🧑‍🏫` Code-Along: [04 Arrays](code-alongs/A_PHP_Basics/04_arrays) `25'`
10. `🧑‍🏫` Code-Along: [05 Schleifen](code-alongs/A_PHP_Basics/05_schleifen) `25'`
11. `💻` Digitale Übung: [06 Städtevergleich](uebungen/A_PHP_Basics/06_staedtevergleich) `45'`
12. `🃏` Story-Karten: [Kapitel 1 Hypothese](https://codeanddesign.ch/im3/kartenset.html) (Datenfrage formulieren) `60'`
13. `✅` **M2: Eigene Datenfrage formuliert**

#### Zusatzmaterial (Block A)

- `💻` [01 Messwert](uebungen/A_PHP_Basics/01_messwert)
- `💻` [02 Badewetter](uebungen/A_PHP_Basics/02_badewetter)
- `💻` [03 Warnstufe](uebungen/A_PHP_Basics/03_warnstufe)
- `💻` [04 Messstation](uebungen/A_PHP_Basics/04_messstation)
- `💻` [05 Aare-Woche](uebungen/A_PHP_Basics/05_aare_woche)

### Block B – Extract

1. `💻` Digitale Übung: [01 Daten finden & herunterladen](uebungen/B_extract/01_daten_finden) `45'`
2. `📕` Theorie B: [Extract](theorie/B_extract) `20'`
3. `🧑‍🏫` Code-Along: [06 JSON lesen](code-alongs/B_extract/06_json_lesen) _(statische Datei)_ `30'`
4. `🧑‍🏫` Code-Along: [07 API lesen](code-alongs/B_extract/07_api_lesen) _(Live-API)_ `30'`
5. `📝` Analoge Übung: [04 Fetch Helper](stift-und-papier/04_fetch_helper/) `40'`
6. `🧑‍🏫` Code-Along: [08 CSV lesen](code-alongs/B_extract/08_csv_lesen) _(CSV-Datei)_ `30'`
7. `🧑‍🏫` Code-Along: [09 Sensor lesen](code-alongs/B_extract/09_sensor_lesen) _(Sensor-API)_ `30'`
8. `🃏` Story-Karten: [Kapitel 2 Datenquellen](https://codeanddesign.ch/im3/kartenset.html) `60'`
9. `✅` **M3: Datensatz gefunden und geprüft**
10. `🎨` Projekt: Datenvertrag v0 zwischen Frontend und Backend vereinbaren
11. `🎨` Projekt: Extract-Step am eigenen Projekt umsetzen
12. `✅` **M4: Erster Extract und Datenvertrag stehen**

### Block C – Transform

1. `📕` [Theorie C: Transform](theorie/C_transform/) `60'`
2. `📝` Analoge Übung: [05 Wetterdaten transformieren](stift-und-papier/05_transform_weather/) `30'`
3. `🧑‍🏫` Code-Along: [09 Hitzesommer transformieren](code-alongs/C_transform/09_hitzesommer_transformieren/) `60'`
4. `🧑‍🏫` Code-Along: [10 Shark-Daten mit KI transformieren](code-alongs/C_transform/10_sharkdaten_transformieren/) `90'`
5. `🃏` Story-Karten: [Kapitel 3 Datenaufbereitung](https://codeanddesign.ch/im3/kartenset.html)
6. `🎨` Eigene Rohdaten nach dem Datenvertrag säubern und umformen
7. `✅` **M5: Transform funktioniert**

### Block D – Load

1. `📕` [Theorie D: Load (bis Kapitel Datenmodell)](theorie/D_load/) `30'`
2. `📝` Analoge Übung: eigenes Datenmodell zeichnen `35'`
3. `📕` [Theorie D: Load (ab Kapitel SQL)](theorie/D_load/) `45'`
4. `🛠️` Tooling: Datenbank einrichten: [YouTube Playlist](https://www.youtube.com/playlist?list=PLLZlqg08CVic) `60'`
5. `🧑‍🏫` Code-Along: [11 Datenbank testen](code-alongs/D_load/11_datenbank_testen/) `60'`
6. `🧑‍🏫` Code-Along: [12 Hitzesommer laden](code-alongs/D_load/12_hitzesommer_laden/) `70'`
7. `🃏` Story-Karten: [Kapitel 4 Datenstory](https://codeanddesign.ch/im3/kartenset.html)
8. `🎨` Projekt: Daten in Datenbank schreiben
9. `✅` **M6: Daten stehen in der Datenbank**

#### Zusatzmaterial (Block D)

- `🧑‍🏫` Code-Along: [13 Shark laden](code-alongs/D_load/13_sharkdaten_laden/)
- `🛠️` Tooling: [00 Lokale Datenbank](theorie/00_lokale_db/) _(Freiwillig, wer lokal arbeiten will.)_

### Block E – Unload

1. `📕` [Theorie E: Unload](theorie/E_unload/) `30'`
2. `🧑‍🏫` Code-Along: [14 Hitzesommer unloaden](code-alongs/E_unload/14_hitzesommer_ausliefern/) `60'`
3. `🛠️` Eigenen Unload-Endpunkt nach dem Datenvertrag bauen und prüfen
4. `✅` **M7: Unload-Endpunkt funktioniert**

#### Zusatzmaterial (Block E)

- `🧑‍🏫` Code-Along: [15 Shark-Ranglisten ausliefern](code-alongs/E_unload/15_sharkdaten_ausliefern/) `60'`

### Block F – Visualisierung

1. `📕` [Theorie F: Datengrafiken](theorie/F_visualisierung/) `30'`
2. `🧑‍🏫` Code-Along: [16 Hitzesommer visualisieren – Teil 1](code-alongs/F_visualisierung/16_hitzesommer_liniendiagramm/) `70'`
3. `🧑‍🏫` Code-Along: [17 Hitzesommer visualisieren – Teil 2](code-alongs/F_visualisierung/17_hitzesommer_ranking/) `60'`
4. `🃏` Story-Karten: [Kapitel 5 Datengrafiken](https://codeanddesign.ch/im3/kartenset.html)
5. `🎨` Projekt: Diagramme wählen und begründen `60'`
6. `🎨` Projekt: mit dem eigenen JSON-Endpunkt verbinden und erste Grafik bauen
7. `✅` **M8: Erste Integration steht**

#### Zusatzmaterial (Block F)

- `🧑‍🏫` Code-Along: [18 Shark-Balkendiagramme](code-alongs/F_visualisierung/18_sharkdaten_balkendiagramm/) `45'`
- `🧑‍🏫` Code-Along: [19 Shark-Karte mit Leaflet](code-alongs/F_visualisierung/19_sharkdaten_karte/) `45'`

### Marktstand & Abgabe

1. `🃏` Story-Karten: [Kapitel 6 Cognitive Biases](https://codeanddesign.ch/im3/kartenset.html)
1. `🎨` Projekt: Datenweg, Story, Oberfläche und Beschriftungen zusammenführen
1. `🎨` Projekt: Marktstand aufbauen und Projekt vorführen
1. `✅` **M9: Marktstand** _(Oktober)_
1. `🎨` Projekt: Projekt nach dem Marktstand überarbeiten und finalisieren
1. `✅` **M10: Abgabe** _(Januar)_

## Meilensteine

|       | Meilenstein                            | Was ihr zeigt                                                                                                                                                                                                                                                                                 |
| ----- | -------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `M1`  | Gruppen gebildet                       | Der lokale PHP-Server läuft, die Vierergruppe steht, Backend- und Frontend-Zweierteam sind festgelegt.                                                                                                                                                                                        |
| `M2`  | Eigene Datenfrage formuliert           | Die Gruppe hat eine offene, mit Daten beantwortbare Frage mit Untersuchungseinheit und passendem Zeitraum formuliert.                                                                                                                                                                         |
| `M3`  | Datensatz gefunden und geprüft         | Eine glaubwürdige Quelle, Beispieldaten, vorhandene Felder und Datenmenge passen zur Frage – oder der Plan für eine Live-Sammlung ist bis zum Marktstand realistisch.                                                                                                                         |
| `M4`  | Erster Extract und Datenvertrag stehen | Ein PHP-Skript liest echte Daten als Array ein. Der Datenvertrag v0 zeigt Feldnamen, Datentypen und Beispielwerte für die spätere JSON-Ausgabe.                                                                                                                                               |
| `M5`  | Transform funktioniert                 | Einige echte Rohdatensätze werden ins vereinbarte Format umgeformt. Der Umgang mit fehlenden, ungültigen oder uneinheitlichen Werten ist sichtbar entschieden.                                                                                                                                |
| `M6`  | Daten stehen in der Datenbank          | Das kleine Datenmodell ist umgesetzt, transformierte Daten sind gespeichert und eine Abfrage zeigt die erwarteten Datensätze.                                                                                                                                                                 |
| `M7`  | Unload-Endpunkt funktioniert           | `unload.php` liest aus der Datenbank und liefert valides JSON nach dem Datenvertrag. Ein benötigter Filter funktioniert, falls das Projekt einen Filter braucht.                                                                                                                              |
| `M8`  | Erste Integration steht                | Das Frontend lädt echte Daten vom eigenen Endpunkt statt aus den Mock-Daten und zeigt mindestens eine einfache, zur Datenfrage passende Grafik.                                                                                                                                               |
| `M9`  | Marktstand (Oktober)                   | Das Projekt läuft am Marktstand und auf dem Server. Story, Beschriftungen und Quellen sind verständlich, ein gespeicherter Datenstand dient als Fallback. Das Team kann die ETL+U-Kette, die Datenquelle, den Datenvertrag sowie die zentralen Story- und Visualisierungsentscheide erklären. |
| `M10` | Abgabe (Januar)                        | Die überarbeitete Fassung liegt im Repository und läuft auf dem Server. Das README erklärt den Betrieb, die Rückmeldungen vom Marktstand sind eingearbeitet.                                                                                                                                  |

## Inhaltliche Struktur

Damit ihr euch auf die Technik konzentrieren könnt, wechseln wir nicht ständig
das Thema. Wir arbeiten den ganzen Kurs über mit denselben Datensätzen.

**Block A – die Aare.** Für die PHP-Grundlagen brauchen wir Zahlen, die man
versteht, ohne sie zu erklären: die Wassertemperatur der Aare in Brienz, Thun
und Bern. Diese Werte tippt ihr von Hand als PHP-Array ab. Wir benötigen keine Datenquelle.

**Ab Block B – zwei Themen durch den ganzen ETL+U-Prozess.** Sobald wir Daten
wirklich einlesen, begleiten uns zwei Datensätze bis zur fertigen Grafik:

- 🌡️ **Hitzesommer** – die täglichen Höchsttemperaturen von Bern, Zürich und
  Chur seit 1940, von der Open-Meteo-API. Das ist unser roter Faden: aufgeräumte
  Zahlen, mit denen jeder Schritt sauber aufgeht.
- 🦈 **Shark Attacks** – das Global Shark Attack File als CSV mit rund 25'000
  Zeilen. Das ist unser Realitätscheck: echte Daten sind unordentlich, lückenhaft
  und uneinheitlich geschrieben.

Beide Datensätze durchlaufen dieselbe Kette. Pro Block ändert sich damit nur die
Technik, nicht das Thema:

Der Hitzesommer-Strang ist Pflichtprogramm und wird gemeinsam entwickelt. Der
Shark-Strang zeigt dieselben Schritte an schwierigeren Daten; ein Teil davon
steht als Zusatzmaterial zum Nachschauen bereit.

Für die Sensorbox im Kursraum gilt dasselbe Prinzip: Sie ist einfach eine
weitere Datenquelle, die wir wie eine API auslesen.

**Euer Projekt** läuft parallel mit. Ihr sucht euer eigenes Thema und euren
eigenen Datensatz und geht dieselbe Kette – nur eben mit euren Daten.
