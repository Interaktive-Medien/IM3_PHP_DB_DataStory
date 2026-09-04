# 🧑🏽‍🏫 Hinweise für Dozierende

Dieses Repository enthält alle Unterlagen für den Kurs IM3.

## 📌 Offene Todos

- Folien Kickoff
- Folien Deployment & Tooling (Code-Editor etc.)
- Beispielprojekt mit Sensorbox (könnte man adden zu Hitzesommer & Hai), von A-Z durchspielen. Dazu bräuchte es noch Unterlagen zu CRON.

## 💻 Material im Unterricht zeigen

**Das Beispielprojekt läuft ohne Datenbank.** Fehlt die `config.php` oder läuft
MAMP nicht, liefert `unload.php` kein brauchbares JSON – die Seite lädt dann
`data/heat-summers.json` und schreibt es in den Statustext («aus gespeicherten
Musterdaten – der Endpunkt antwortet nicht»). Alle 258 Sommer und alle drei
Grafiken sind trotzdem da. Zum Zeigen genügt also:

```bash
cd beispielprojekt/hitzesommer
php -S localhost:8000
```

Es braucht keine `config.php`, kein MAMP und keine gefüllten Tabellen. Wer die
ganze Kette vorführen will, richtet die Datenbank nach
`beispielprojekt/hitzesommer/README.md` ein.

Für alles andere gilt, was auch im `README.md` für die Studierenden steht:

- Alles mit PHP – Übungen, Code-Alongs, Beispielprojekt – über
  `php -S localhost:8000`, nie über den Live Server. Den Studierenden ist ein
  Server im Kursordner erklärt (Terminal → New Terminal, kein `cd`); die Übung
  öffnen sie danach über ihren Pfad, etwa
  `localhost:8000/uebungen/A_PHP_Basics/01_messwert/`.
- Die Folien in `theorie/` sind reine HTML-Dateien: Live Server, PHP-Server
  oder direkt über den Dateipfad, alle drei Wege funktionieren.

## 📦 Das Repository

- `README.md` ist der Einstieg für die Studierenden.
- `ablauf.md` zeigt den Kursablauf.
- `theorie/` enthält die Folien.
- `code-alongs/` enthält geführte Beispiele.
- `uebungen/` enthält Aufgaben und Lösungen.
- `stift-und-papier/` enthält Übungen ohne Computer.
- `cheatsheets/` enthält kurze Nachschlagewerke.
- `dozierende/` enthält interne Unterlagen.

## 🤖 Folien mit AI bearbeiten

Die Folien sind mit reveal.js gebaut.

Installiere zuerst den AI-Skill `Reveal.js` in deinem AI-Tool.

Das Paket liegt hier:
`dozierende/AI_skill_revealjs/revealjs-skill.zip`

Die ZIP enthält nur den Skill selbst (`SKILL.md`, `references/`, `scripts/`).

Für Claude Code gehst du so vor:

1. Entpacke die ZIP-Datei.
2. Kopiere den entpackten Ordner nach
   `~/.claude/skills/revealjs-1.0.0` (Ordnername lokal, ausserhalb dieses
   Repositories).
3. Starte eine neue Claude-Code-Session, falls der Skill nicht sofort
   erscheint.

Oder frag einfach Claude, den Skill selber zu installieren 😉

Für Codex gehst du so vor:

1. Entpacke die ZIP-Datei.
2. Kopiere den entpackten Ordner nach `.agents/skills/revealjs` in diesem
   Repository.
3. Starte Codex neu, falls der Skill nicht sofort erscheint.
4. Nenne den Skill im Auftrag mit `$revealjs`.

Bei einem anderen AI-Tool kann die Installation anders sein.

Installiere dort ebenfalls den entpackten Ordner als lokalen Skill.

Bitte die AI vor jeder Änderung, diese Dateien zu lesen:

- `AGENTS.md`
- `theorie/_foliendesign/README.md`
- `theorie/_foliendesign/GESTALTUNGSREGELN.md`
- `theorie/A_PHP_Basics/index.html`

Ein einfacher Auftrag an die AI kann so aussehen:

> Bearbeite die Folien in `theorie/B_extract/index.html`.
> Nutze den Skill `$revealjs`.
> Lies zuerst die Regeln für das Foliendesign.
> Prüfe danach die Folien und kontrolliere sie als Screenshots.

## 🗓️ Unterricht mit AI planen

Im Ordner `dozierende/unterrichtsplanung/` stehen Hinweise zur Didaktik.

Die Datei ist vor allem als Wissen für eine AI gedacht.

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
