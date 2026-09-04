# 🐘 IM3: PHP, Datenbanken & Datenstory

![Static Badge](https://img.shields.io/badge/Sprache-PHP-%23777bb4)
![Static Badge](https://img.shields.io/badge/DB-MySQL-%2300758f)
![Static Badge](https://img.shields.io/badge/Kurs-MMP_IM3-blue)
![Static Badge](https://img.shields.io/badge/Aktualisiert-15.08.2026-coral)
![Static Badge](https://img.shields.io/badge/Status-In_Review-orange)

> Im 3. Semester der Interaktiven Medien lernt ihr, mit PHP echte Daten zu verarbeiten und in einer Data-Story datenjournalistisch aufzubereiten.

#### Quicklinks

- [Ablauf nach Themenblöcken](ablauf.md)
- [Infos für Dozierende](dozierende/README.md)

## 1. Unterrichts-Stoff

In diesem Kurs folgen wir dem Weg der Daten:

```text
Datenquelle → Extract → Transform → Load → Datenbank → Unload → Chart.js
```

Diesen Weg gehen wir in mehreren Themenblöcken. In jedem Block gibt es einen
Theorie-Input, gemeinsame Code-Alongs und Übungen zum selbständigen Lösen.

#### `A` 🐘 PHP Basics

Hier lernt ihr die Grundlagen von PHP: Variablen, Funktionen, Bedingungen,
Arrays und Schleifen. Vieles kennt ihr schon aus JavaScript – die Konzepte sind
dieselben, nur die Schreibweise ist neu.

#### `B` 📥 Extract

Ihr lest Daten aus verschiedenen Quellen ein: aus einer JSON-Datei, von einer
Live-API, aus einem CSV und von einer Sensorbox. Am Ende landet alles als PHP-Array in eurem Code.

#### `C` 🧹 Transform

Rohdaten sind selten so, wie man sie braucht. Ihr lernt, Daten zu säubern, zu
reduzieren und in eine vereinbarte Form zu bringen.

#### `D` 🗄️ Load

Ihr speichert die aufbereiteten Daten in einer MySQL-Datenbank. Dazu gehören die Entwicklung eines einfaches Datenmodells und der Zugriff auf die Datenbank mit PDO.

#### `E` 📤 Unload

Ihr lest die gespeicherten Daten wieder aus der Datenbank und baut daraus euren
eigenen API-Endpunkt. Die Schnittstelle für das Frontend.

#### `F` 📊 Visualisierung

Ihr stellt die Daten mit Chart.js als Grafik dar und erzählt damit eine
Geschichte.

Wie diese Blöcke im Detail aufgebaut sind, seht ihr im [Ablauf](ablauf.md).

## 2. Euer Projekt

In Vierergruppen entwickelt ihr ein kleines datenjournalistisches Projekt. Das
Team teilt sich in zwei Zweierteams:

- 🗄️ **Backend** baut mit PHP und einer Datenbank den Datenweg.
- 🎨 **Frontend** entwickelt Story, Oberfläche und Visualisierung.

Beide Teams vereinbaren früh eine gemeinsame JSON-Schnittstelle (Datenvertrag). So kann das
Frontend zuerst mit Mock-Daten arbeiten und später auf die echten Backend-Daten
wechseln. Wie das am Ende aussehen kann, zeigt das
[Beispielprojekt](beispielprojekt/) – eine fertige Datengeschichte von der
Datengrundlage bis zur Story.

## 3. Technisches Setup

Ihr entwickelt auf eurem eigenen Rechner. Zwei kurze Setups gehören dazu:

- [Lokaler PHP-Server](theorie/00_lokaler_php_server/index.html): richten wir
  ganz am Anfang ein, bevor die PHP-Grundlagen starten.
- [Lokale Datenbank](theorie/00_lokale_db/README.md): kommt vor dem Load-Block dazu,
  sobald ihr Daten speichert.

Auf einen richtigen Webserver kommt euer Projekt erst am Schluss im
Deployment-Teil.

## 4. PHP-Dateien öffnen

Das meiste Material in diesem Repository ist PHP – und PHP läuft nicht per
Doppelklick. Es braucht einen Server, den ihr selbst startet. Das sind
drei Handgriffe, einmal pro Arbeitstag:

1. Öffnet den **Kursordner** im Code-Editor.
2. Öffnet über **Terminal → New Terminal** ein Terminal.
3. Startet den Server mit dem Command:

```bash
php -S localhost:8000
```

Der Server läuft, solange das Terminal offen ist. Eine Übung öffnet ihr im
Browser über ihren Pfad – das ist derselbe Pfad wie im Seitenbaum eures
Editors, einfach mit `localhost:8000` davor.

**Test:** Wenn hier Hallo PHP auf einer weissen Seite steht, funktioniert euer Webserver:

http://localhost:8000/code-alongs/A_PHP_Basics/00_hallo_php/solution/index.php

Beenden könnt ihr den Server mit `Ctrl + C` im Terminal.

> ⚠️ **Der Live Server von VS Code funktioniert dafür nicht.** Er kann HTML,
> CSS und JavaScript, führt aber kein PHP aus – statt der Seite seht ihr den
> Quelltext. In der Adressleiste muss `8000` stehen, nicht `5500`. Das gilt
> auch für HTML-Seiten, die ihre Daten von einer PHP-Datei holen, zum Beispiel
> das Frontend im Beispielprojekt.

Nur die Folien in [theorie](theorie/) sind reine HTML-Dateien. Dort ist alles
erlaubt: der Live Server, derselbe PHP-Server oder ein Doppelklick auf die
`index.html`.

## 5. Methoden

### 5.1 📕 Theorie

Die Folien aus dem Unterricht findet ihr im Ordner [theorie](theorie/), pro
Themenblock ein Ordner.

### 5.2 🧠 Cheatsheets

Zu allen besprochenen Themen gibt es im Ordner [cheatsheets](cheatsheets/) ein
kurzes Nachschlagewerk mit den Grundprinzipien und einfachen Beispielen.

- `A0` 🐘 [PHP Grundlagen](cheatsheets/A0_php_grundlagen.md)
- `A1` 📦 [Variablen](cheatsheets/A1_variablen.md)
- `A2` 🪄 [Funktionen](cheatsheets/A2_funktionen.md)
- `A3` 🎫 [Bedingungen](cheatsheets/A3_bedingungen.md)
- `A4` 📚 [Arrays](cheatsheets/A4_arrays.md)
- `A5` 🔄 [Schleifen](cheatsheets/A5_schleifen.md)
- `B1` 📥 [Extract](cheatsheets/B1_extract.md)
- `B2` 📑 [JSON](cheatsheets/B2_json.md)
- `C1` 🧹 [Transform](cheatsheets/C1_transform.md)
- `D1` 🗂️ [Datenmodell & SQL](cheatsheets/D1_datenmodell_sql.md)
- `D2` 🗄️ [PDO & Load](cheatsheets/D2_pdo_load.md)
- `E1` 📤 [Unload](cheatsheets/E1_unload.md)
- `F1` 📊 [Chart.js](cheatsheets/F1_chartjs.md)
- `F2` 🗺️ [Leaflet](cheatsheets/F2_leaflet.md)

### 5.3 🧑🏽‍🏫 Code-Alongs

Code-Alongs sind Beispiele, die wir gemeinsam im Unterricht entwickeln. Das
Material dazu liegt im Ordner [code-alongs](code-alongs/).

### 5.4 💻 Digitale Übungen

Nebst den Code-Alongs gibt es Übungen, die ihr selbständig lösen könnt – alle
mit Lösung. Ihr findet sie thematisch sortiert im Ordner [uebungen](uebungen/).

### 5.5 📝 Stift und Papier

Manches macht man besser ohne Computer: fertige Data-Storys auseinandernehmen,
den Datenfluss planen oder Code auf Papier entschlüsseln. Das Material für diese
analogen Übungen liegt im Ordner [stift-und-papier](stift-und-papier/).

### 5.6 🌡️ Beispielprojekt

Ein fertiges kleines Projekt von der Datenquelle bis zur Story – zum Anschauen
und zum Abschauen: [beispielprojekt](beispielprojekt/).
