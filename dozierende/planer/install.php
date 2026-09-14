<?php
// Legt die Tabellen an und füllt sie aus seed.json.
//
//   php install.php          fehlende Spalten ergänzen, befüllen nur wenn leer
//   php install.php --reset  alles löschen und neu befüllen

if (PHP_SAPI !== 'cli') {
    http_response_code(403);
    exit("Nur im Terminal: php install.php\n");
}

require __DIR__ . '/lib.php';

$pdo = db();

if (in_array('--reset', $argv, true)) {
    $pdo->exec('DROP TABLE IF EXISTS planer_eintraege');
    $pdo->exec('DROP TABLE IF EXISTS planer_tage');
    echo "Tabellen gelöscht.\n";
}

createTables($pdo);

if ((int) $pdo->query('SELECT COUNT(*) FROM planer_eintraege')->fetchColumn() > 0) {
    exit("Tabellen sind auf dem neuesten Stand, Daten bleiben erhalten.\nNeu befüllen mit: php install.php --reset\n");
}

$seed = json_decode(file_get_contents(__DIR__ . '/seed.json'), true, 512, JSON_THROW_ON_ERROR);

$tag = $pdo->prepare('INSERT INTO planer_tage (standort, datum, datum2, notiz, dozierende) VALUES (?, ?, ?, ?, ?)');
$eintrag = $pdo->prepare('INSERT INTO planer_eintraege
    (standort, block, zusatz, ablauf_pos, emoji, titel, link, dauer)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)');
$termin = $pdo->prepare("INSERT INTO planer_eintraege (standort, typ, emoji, titel, dauer, tag_id, tag_pos)
    VALUES (?, 'termin', ?, ?, ?, ?, 0)");

$pdo->beginTransaction();
foreach (array_keys(STANDORTE) as $standort) {
    $tagIds = [];
    foreach ($seed['tage'][$standort] as $t) {
        $dozierende = array_filter(DOZIERENDE, fn(string $name): bool => in_array($name, $t['dozierende'] ?? [], true));
        $tag->execute([$standort, $t['datum'], $t['datum2'] ?? null, $t['notiz'], implode(',', $dozierende)]);
        $tagIds[$t['datum']] = (int) $pdo->lastInsertId();
    }

    foreach ($seed['items'] as $pos => $e) {
        $eintrag->execute([$standort, $e['block'], $e['zusatz'], $pos, $e['emoji'], $e['titel'], $e['link'], $e['dauer']]);
    }

    $termine = 0;
    foreach ($seed['termine'] as $t) {
        if (!in_array($standort, $t['standorte'], true)) {
            continue;
        }
        if (!isset($tagIds[$t['datum']])) {
            fwrite(STDERR, "Warnung: {$t['titel']} – kein Kurstag am {$t['datum']} in {$standort}\n");
            continue;
        }
        $termin->execute([$standort, $t['emoji'], $t['titel'], $t['dauer'], $tagIds[$t['datum']]]);
        $termine++;
    }

    printf("%s: %d Kurstage, %d Einträge, %d Pflichttermine\n", STANDORTE[$standort], count($seed['tage'][$standort]), count($seed['items']), $termine);
}
$pdo->commit();
