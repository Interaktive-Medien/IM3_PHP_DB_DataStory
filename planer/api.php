<?php
// JSON-Schnittstelle des Planers.
//
// GET  api.php?standort=bern   Zustand eines Standorts lesen (ohne Login)
// POST api.php                 {"aktion": "...", "standort": "bern", ...}
//                              ändern, nur im Bearbeiten-Modus

require __DIR__ . '/lib.php';

session_name('im3planer');
session_set_cookie_params([
    'httponly' => true,
    'samesite' => 'Strict',
    'secure'   => !empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off',
]);
session_start();

header('Content-Type: application/json; charset=utf-8');
header('Cache-Control: no-store');

function antwort(array $daten, int $status = 200): never
{
    http_response_code($status);
    echo json_encode($daten, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
    exit;
}

function fehler(string $meldung, int $status = 400): never
{
    antwort(['fehler' => $meldung], $status);
}

function darfBearbeiten(): bool
{
    return !empty($_SESSION['bearbeiten']);
}

function zustand(string $standort): array
{
    $pdo = db();

    $tage = $pdo->prepare('SELECT id, datum, notiz FROM planer_tage WHERE standort = ? ORDER BY datum, id');
    $tage->execute([$standort]);

    $eintraege = $pdo->prepare('SELECT id, typ, block, zusatz, ablauf_pos, emoji, titel, link, dauer, notiz,
            tag_id, tag_pos, erledigt
        FROM planer_eintraege WHERE standort = ? ORDER BY ablauf_pos, id');
    $eintraege->execute([$standort]);

    return [
        'standorte'  => STANDORTE,
        'standort'   => $standort,
        'bearbeiten' => darfBearbeiten(),
        'tage'       => $tage->fetchAll(),
        'eintraege'  => $eintraege->fetchAll(),
    ];
}

// --- Eingaben prüfen --------------------------------------------------------

function text(array $in, string $feld, int $max, bool $pflicht = false): ?string
{
    $wert = $in[$feld] ?? null;
    if ($wert !== null && !is_string($wert)) {
        fehler("Feld «{$feld}» ist ungültig");
    }
    $wert = trim((string) $wert);
    if ($wert === '') {
        if ($pflicht) {
            fehler("Feld «{$feld}» darf nicht leer sein");
        }
        return null;
    }
    if (mb_strlen($wert) > $max) {
        fehler("Feld «{$feld}» ist zu lang");
    }
    return $wert;
}

function zahl(mixed $wert): ?int
{
    if ($wert === null || $wert === '') {
        return null;
    }
    if (is_int($wert) && $wert >= 0) {
        return $wert;
    }
    if (is_string($wert) && ctype_digit($wert)) {
        return (int) $wert;
    }
    fehler('Ungültige Zahl');
}

function eintragLaden(PDO $pdo, string $standort, mixed $id): array
{
    $st = $pdo->prepare('SELECT * FROM planer_eintraege WHERE id = ? AND standort = ? FOR UPDATE');
    $st->execute([zahl($id), $standort]);
    return $st->fetch() ?: fehler('Eintrag nicht gefunden', 404);
}

function tagLaden(PDO $pdo, string $standort, mixed $id): array
{
    $st = $pdo->prepare('SELECT * FROM planer_tage WHERE id = ? AND standort = ?');
    $st->execute([zahl($id), $standort]);
    return $st->fetch() ?: fehler('Kurstag nicht gefunden', 404);
}

// --- Aktionen ---------------------------------------------------------------

// Legt Einträge in der angegebenen Reihenfolge auf einen Kurstag.
// «neu:pause» und «neu:mittag» erzeugen dabei einen neuen Pausenblock.
function platzieren(PDO $pdo, string $standort, array $in): void
{
    $tag = tagLaden($pdo, $standort, $in['tag_id'] ?? null);
    $reihenfolge = $in['reihenfolge'] ?? null;
    if (!is_array($reihenfolge) || count($reihenfolge) > 200) {
        fehler('Ungültige Reihenfolge');
    }

    $vorlagen = [
        'neu:pause'  => ['pause', '☕', 'Pause', 15],
        'neu:mittag' => ['mittag', '🍽️', 'Mittag', 60],
    ];
    $neu = $pdo->prepare('INSERT INTO planer_eintraege (standort, typ, emoji, titel, dauer, tag_id, tag_pos)
        VALUES (?, ?, ?, ?, ?, ?, ?)');
    $verschieben = $pdo->prepare('UPDATE planer_eintraege SET tag_id = ?, tag_pos = ? WHERE id = ? AND standort = ?');

    foreach (array_values($reihenfolge) as $pos => $wert) {
        if (is_string($wert) && isset($vorlagen[$wert])) {
            $neu->execute([$standort, ...$vorlagen[$wert], $tag['id'], $pos]);
        } else {
            $verschieben->execute([$tag['id'], $pos, zahl($wert), $standort]);
        }
    }
}

// Zieht einen Eintrag zurück in den Ablauf. Pausen verschwinden dabei.
function zurueck(PDO $pdo, string $standort, array $in): void
{
    $eintrag = eintragLaden($pdo, $standort, $in['id'] ?? null);
    if ($eintrag['typ'] !== 'eintrag') {
        $pdo->prepare('DELETE FROM planer_eintraege WHERE id = ?')->execute([$eintrag['id']]);
        return;
    }
    $pdo->prepare('UPDATE planer_eintraege SET tag_id = NULL, tag_pos = 0, erledigt = 0 WHERE id = ?')
        ->execute([$eintrag['id']]);
}

function abhaken(PDO $pdo, string $standort, array $in): void
{
    $eintrag = eintragLaden($pdo, $standort, $in['id'] ?? null);
    if ($eintrag['tag_id'] === null) {
        fehler('Nur eingeplante Einträge lassen sich abhaken');
    }
    $pdo->prepare('UPDATE planer_eintraege SET erledigt = ? WHERE id = ?')
        ->execute([empty($in['erledigt']) ? 0 : 1, $eintrag['id']]);
}

// Neue Position am Ende eines Blocks. Nachfolgende Einträge rücken nach.
function platzImBlock(PDO $pdo, string $standort, string $block, ?int $ohneId): int
{
    $st = $pdo->prepare("SELECT MAX(ablauf_pos) FROM planer_eintraege
        WHERE standort = ? AND typ = 'eintrag' AND block = ? AND id <> ?");
    $st->execute([$standort, $block, $ohneId ?? 0]);
    $max = $st->fetchColumn();

    if ($max === null) {
        $st = $pdo->prepare('SELECT COALESCE(MAX(ablauf_pos), -1) + 1 FROM planer_eintraege WHERE standort = ?');
        $st->execute([$standort]);
        return (int) $st->fetchColumn();
    }

    $pdo->prepare('UPDATE planer_eintraege SET ablauf_pos = ablauf_pos + 1 WHERE standort = ? AND ablauf_pos > ?')
        ->execute([$standort, $max]);
    return (int) $max + 1;
}

function eintragSpeichern(PDO $pdo, string $standort, array $in): void
{
    $id = zahl($in['id'] ?? null);
    $alt = $id ? eintragLaden($pdo, $standort, $id) : null;
    $typ = $alt['typ'] ?? 'eintrag';
    $istEintrag = $typ === 'eintrag';

    $titel = text($in, 'titel', 255, true);
    $emoji = text($in, 'emoji', 16) ?? '';
    $block = $istEintrag ? (text($in, 'block', 100) ?? '') : '';
    $zusatz = $istEintrag && !empty($in['zusatz']) ? 1 : 0;
    $link = $istEintrag ? text($in, 'link', 500) : null;
    if ($link !== null && !preg_match('~^https?://~i', $link)) {
        fehler('Der Link muss mit http:// oder https:// beginnen');
    }
    $dauer = zahl($in['dauer'] ?? null);
    if ($dauer !== null && $dauer > 999) {
        fehler('Die Dauer ist zu gross');
    }
    $notiz = text($in, 'notiz', 5000);
    $tagId = zahl($in['tag_id'] ?? null);
    if ($tagId !== null) {
        tagLaden($pdo, $standort, $tagId);
    }

    if ($alt && !$istEintrag && $tagId === null) {
        $pdo->prepare('DELETE FROM planer_eintraege WHERE id = ?')->execute([$id]);
        return;
    }

    $erledigt = $tagId !== null && !empty($in['erledigt']) ? 1 : 0;

    if (!$istEintrag) {
        $ablaufPos = 0;
    } elseif ($alt && $alt['block'] === $block) {
        $ablaufPos = (int) $alt['ablauf_pos'];
    } else {
        $ablaufPos = platzImBlock($pdo, $standort, $block, $id);
    }

    if ($tagId === null) {
        $tagPos = 0;
    } elseif ($alt && (int) $alt['tag_id'] === $tagId) {
        $tagPos = (int) $alt['tag_pos'];
    } else {
        $st = $pdo->prepare('SELECT COALESCE(MAX(tag_pos), -1) + 1 FROM planer_eintraege WHERE standort = ? AND tag_id = ?');
        $st->execute([$standort, $tagId]);
        $tagPos = (int) $st->fetchColumn();
    }

    $werte = [$block, $zusatz, $ablaufPos, $emoji, $titel, $link, $dauer, $notiz, $tagId, $tagPos, $erledigt];

    if ($alt) {
        $pdo->prepare('UPDATE planer_eintraege SET block = ?, zusatz = ?, ablauf_pos = ?, emoji = ?, titel = ?,
                link = ?, dauer = ?, notiz = ?, tag_id = ?, tag_pos = ?, erledigt = ?
            WHERE id = ? AND standort = ?')
            ->execute([...$werte, $id, $standort]);
    } else {
        $pdo->prepare('INSERT INTO planer_eintraege (block, zusatz, ablauf_pos, emoji, titel, link, dauer, notiz,
                tag_id, tag_pos, erledigt, standort)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)')
            ->execute([...$werte, $standort]);
    }
}

function eintragLoeschen(PDO $pdo, string $standort, array $in): void
{
    $eintrag = eintragLaden($pdo, $standort, $in['id'] ?? null);
    $pdo->prepare('DELETE FROM planer_eintraege WHERE id = ?')->execute([$eintrag['id']]);
}

function tagSpeichern(PDO $pdo, string $standort, array $in): void
{
    $id = zahl($in['id'] ?? null);
    $datum = text($in, 'datum', 10, true);
    $geprueft = DateTime::createFromFormat('!Y-m-d', $datum);
    if (!$geprueft || $geprueft->format('Y-m-d') !== $datum) {
        fehler('Ungültiges Datum');
    }
    $notiz = text($in, 'notiz', 2000);

    if ($id) {
        tagLaden($pdo, $standort, $id);
        $pdo->prepare('UPDATE planer_tage SET datum = ?, notiz = ? WHERE id = ?')->execute([$datum, $notiz, $id]);
    } else {
        $pdo->prepare('INSERT INTO planer_tage (standort, datum, notiz) VALUES (?, ?, ?)')
            ->execute([$standort, $datum, $notiz]);
    }
}

// Beim Löschen eines Kurstags wandern seine Einträge zurück in den Ablauf.
function tagLoeschen(PDO $pdo, string $standort, array $in): void
{
    $tag = tagLaden($pdo, $standort, $in['id'] ?? null);
    $pdo->prepare("DELETE FROM planer_eintraege WHERE tag_id = ? AND typ <> 'eintrag'")->execute([$tag['id']]);
    $pdo->prepare('UPDATE planer_eintraege SET tag_id = NULL, tag_pos = 0, erledigt = 0 WHERE tag_id = ?')
        ->execute([$tag['id']]);
    $pdo->prepare('DELETE FROM planer_tage WHERE id = ?')->execute([$tag['id']]);
}

// --- Ablauf der Anfrage -----------------------------------------------------

try {
    if ($_SERVER['REQUEST_METHOD'] === 'GET') {
        $standort = $_GET['standort'] ?? '';
        antwort(zustand(isset(STANDORTE[$standort]) ? $standort : array_key_first(STANDORTE)));
    }

    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        fehler('Methode nicht erlaubt', 405);
    }
    if (!str_starts_with($_SERVER['CONTENT_TYPE'] ?? '', 'application/json')) {
        fehler('JSON erwartet', 415);
    }

    $in = json_decode(file_get_contents('php://input'), true);
    if (!is_array($in)) {
        fehler('Ungültiges JSON');
    }
    $standort = $in['standort'] ?? '';
    if (!isset(STANDORTE[$standort])) {
        fehler('Unbekannter Standort');
    }
    $aktion = $in['aktion'] ?? '';

    if ($aktion === 'login') {
        if (!is_string($in['passwort'] ?? null) || !hash_equals($planerPasswort, $in['passwort'])) {
            sleep(1);
            fehler('Falsches Passwort', 401);
        }
        session_regenerate_id(true);
        $_SESSION['bearbeiten'] = true;
        antwort(zustand($standort));
    }

    if ($aktion === 'logout') {
        $_SESSION = [];
        session_destroy();
        antwort(zustand($standort));
    }

    if (!darfBearbeiten()) {
        fehler('Bitte zuerst den Bearbeiten-Modus öffnen', 403);
    }

    $aktionen = [
        'platzieren'        => 'platzieren',
        'zurueck'           => 'zurueck',
        'abhaken'           => 'abhaken',
        'eintrag_speichern' => 'eintragSpeichern',
        'eintrag_loeschen'  => 'eintragLoeschen',
        'tag_speichern'     => 'tagSpeichern',
        'tag_loeschen'      => 'tagLoeschen',
    ];
    if (!isset($aktionen[$aktion])) {
        fehler('Unbekannte Aktion');
    }

    $pdo = db();
    $pdo->beginTransaction();
    $aktionen[$aktion]($pdo, $standort, $in);
    $pdo->commit();

    antwort(zustand($standort));
} catch (Throwable $e) {
    if (isset($pdo) && $pdo->inTransaction()) {
        $pdo->rollBack();
    }
    error_log('IM3 Planer: ' . $e->getMessage());
    fehler('Serverfehler: ' . $e->getMessage(), 500);
}
