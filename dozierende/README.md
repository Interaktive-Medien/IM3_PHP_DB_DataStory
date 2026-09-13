# 🧑🏽‍🏫 Hinweise für Dozierende

Diese Datei enthält weiterführede Infos für Dozierende. Sie ergänzt den Ablauf und geht auf ein paar Eigenheiten des Kurses ein.

## 📌 Offene Todos

- Folien Kickoff mit Admin ergänzen
- Unterlagen zu CRON
- Code Along 09 --> Jan zeigt Sensorboxen

## 🥵 Beispielprojekt Hitzesommer

**Das Beispielprojekt läuft ohne Datenbank.** Fehlt die `config.php` oder läuft
PHP nicht, kann das Beispielprojekt trotzdem gezeigt werden. Dazu nur die html Datei lokal im Browser öffnen.

Wer die ganze Kette dennoch vorführen will, richtet die Datenbank nach
`beispielprojekt/hitzesommer/README.md` ein.

Für alles andere gilt, was auch im `README.md` für die Studierenden steht:

- Bis und mit Block C läuft alles mit PHP – Übungen, Code-Alongs – über
  `php -S localhost:8000`, nie über das Browser-Symbol von PhpStorm.
- Ab Block D liegt alles auf dem Webserver bei Hostpoint. PhpStorm lädt jede
  gespeicherte Datei per FTP hoch, geöffnet wird über die eigene Domain.
- Die Folien in `theorie/` sind reine HTML-Dateien: Browser-Symbol von
  PhpStorm, PHP-Server oder direkt über den Dateipfad – alle drei Wege
  funktionieren.

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
