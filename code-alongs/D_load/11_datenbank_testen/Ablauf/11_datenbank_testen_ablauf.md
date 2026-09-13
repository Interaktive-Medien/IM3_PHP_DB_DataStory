# Ablauf `11_datenbank_testen`

> **Ziel:** Jede Person hat eine funktionierende Datenbankverbindung und hat
> einmal selbst Zeilen geschrieben und wieder gelesen.
>
> Der Code selbst dauert rund 30 Minuten. Im Ablauf steht eine Stunde, weil
> erfahrungsgemäss die halbe Zeit in Zugängen, Upload und Tippfehlern steckt.

## Warum dieser Schritt zuerst

Beim Laden der Hitzesommer-Daten gehen erfahrungsgemäss zwei Dinge gleichzeitig
schief: die Verbindung und die Logik. Hier wird nur die Verbindung geprüft.
Wenn diese Seite Zeilen ausgibt, ist alles Nachfolgende reine Programmierung.

## Vorbereitung (10')

Ab hier läuft alles auf dem Webserver bei Hostpoint. FTP-Upload in PhpStorm,
Datenbank und phpMyAdmin stehen aus dem Tooling-Teil davor bereits – hier geht
es nur noch um diesen Ordner. Gemeinsam durchgehen, jede Person mit dem eigenen
Zugang:

1. Prüfen, dass PhpStorm beim Speichern hochlädt: eine Datei speichern und im
   Fenster «File Transfer» nachsehen, ob sie auf dem Server angekommen ist.
2. Im **Hauptordner** des Kurses `config.template.php` zu `config.php` kopieren:
   ```bash
   cp config.template.php config.php
   ```
   Diese Datei gibt es genau einmal für alle Code-Alongs und Übungen.
3. Host, Datenbank, Benutzer und Passwort aus dem Control Panel von Hostpoint
   eintragen. Alle drei Namen beginnen mit dem Kontonamen.
4. Prüfen, dass `config.php` nicht im Git landet:
   ```bash
   git status
   ```
   Die Datei darf dort **nicht** auftauchen. Auf den Server lädt PhpStorm sie
   trotzdem hoch – dort wird sie gebraucht.
5. Tabelle anlegen: phpMyAdmin über das Control Panel öffnen und `schema.sql`
   im Reiter «SQL» ausführen – oder dieselben Spalten im Reiter «Struktur»
   zusammenklicken.
6. `index.php` speichern und über die eigene Domain öffnen:
   `https://eure-domain.ch/code-alongs/D_load/11_datenbank_testen/`

> **Der Kontoname gehört überall davor:** Hostpoint setzt ihn vor Host,
> Datenbank und Benutzer. Fehlt er, kommt `Access denied` oder
> `Unknown database`. Das ist der häufigste Fehler an dieser Stelle.
>
> **In der Adressleiste steht die eigene Domain:** Wer `localhost` oder
> `file://` sieht, testet nicht den Stand auf dem Server.

## Schritte im Code (15')

`index.php` enthält sechs TODO-Marken. Der Reihe nach:

1. `header('Content-Type: text/plain; charset=utf-8')` – die Ausgabe ist eine
   Kontrollansicht, keine Webseite.
2. `require __DIR__ . '/../../../config.php';` – drei Ordner nach oben in den
   Hauptordner. Das `..` kennen sie aus CSS.
3. Verbindung im `try`-Block aufbauen und `Verbindung steht.` ausgeben. Den
   `catch`-Block bewusst gemeinsam schreiben und einmal absichtlich ein falsches
   Passwort eintragen, um die Meldung zu sehen.
4. Einen Messwert mit `prepare()` und `execute()` schreiben. Der Zeitpunkt kommt
   aus `date('Y-m-d H:i:s')`.
5. Drei weitere Werte in einer `foreach`-Schleife schreiben – `prepare()` steht
   vor der Schleife, `execute()` darin.
6. Mit `query()` und `fetchAll()` alles wieder auslesen und Zeile für Zeile
   ausgeben.

## Kontrolle (5')

- Die Seite über die eigene Domain öffnen: Es erscheinen vier Zeilen mit Ort,
  Temperatur und Zeitpunkt.
- Dieselbe Tabelle in phpMyAdmin öffnen: dort stehen dieselben vier Zeilen.
  Dieser Doppelblick ist der eigentliche Test – die Daten sind wirklich in der
  Datenbank und nicht nur in der Ausgabe.
- **Die Seite ein zweites Mal aufrufen.** Jetzt sind es acht Zeilen. Diese
  Beobachtung stehen lassen und nicht sofort lösen – sie ist der Aufhänger für
  das Thema «zweimal laden» im nächsten Code-Along.
- Aufräumen, wer will: `DELETE FROM measurements;` in phpMyAdmin.

## Gesprächspunkte

- **Zwei Fehlerquellen trennen:** Erst die Verbindung, dann die Logik. Wer diese
  Reihenfolge einhält, spart sich im Projekt viel Sucherei.
- **`config.php` gibt es genau einmal:** Sie liegt im Hauptordner und gilt für
  alle Übungen. Zugangsdaten in jedem Ordner zu pflegen wäre mühsam und würde
  die Wahrscheinlichkeit erhöhen, dass eine Fassung doch im Repository landet.
- **`config.php` gehört niemandem sonst:** Die Datei steht in `.gitignore`, im
  Repository liegt nur die Vorlage.
- **Fehlermeldungen lesen:** `Access denied` heisst Zugangsdaten,
  `Unknown database` heisst Datenbankname, `Unknown column` heisst Tippfehler in
  der Tabelle. Alle drei einmal absichtlich provozieren.
- **`getaddrinfo … failed`** heisst nicht, dass das Internet weg ist: Der Host
  in `config.php` ist falsch geschrieben. Die Meldung führt in die Irre,
  deshalb hier einmal benennen.
- **Das Muster bleibt:** `prepare()` einmal, `execute()` oft – im nächsten
  Schritt mit 258 statt vier Zeilen.
- **`measurements` ist eine Wegwerf-Tabelle:** Das richtige Datenmodell kommt
  im nächsten Code-Along.
