# 🧑🏽‍🏫 Hinweise für Dozierende

Diese Datei enthält weiterführende Infos für Dozierende. Sie ergänzt den Ablauf und geht auf ein paar Eigenheiten des Kurses ein.

## 📌 Offene Todos

- Folien Kickoff mit Admin ergänzen
- Code Along 09 --> Jan zeigt Sensorboxen

## 🌿 Branches

- **`main`:** wird zu Semesterbeginn eingefroren, damit die Studierenden nicht verwirrt werden.
- **`next`:** für Änderungen während des Semesters, zum Beispiel Zusatzmaterial oder Korrekturen.

## 🎬 Regieanweisungen

- **Code-Alongs:** `Ablauf/` im Ordner des Code-Alongs.
- **Stift und Papier:** das README der Übung.
- **Lösungen:** `solution/` bzw. `loesung.*` – erst nach der Übung zeigen.

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

Bitte die AI vor jeder Änderung an den Folien, diese Dateien zu lesen:

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
