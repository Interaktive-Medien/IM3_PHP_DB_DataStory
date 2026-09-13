<?php
// Legt die Tabellen an und füllt sie aus seed.json.
//
//   php install.php          nur wenn die Tabellen noch leer sind
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
    exit("Die Tabellen enthalten schon Daten. Neu befüllen mit: php install.php --reset\n");
}

$seed = json_decode(file_get_contents(__DIR__ . '/seed.json'), true, 512, JSON_THROW_ON_ERROR);

$tag = $pdo->prepare('INSERT INTO planer_tage (standort, datum, notiz) VALUES (?, ?, ?)');
$eintrag = $pdo->prepare('INSERT INTO planer_eintraege
    (standort, block, zusatz, ablauf_pos, emoji, titel, link, dauer)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)');

$pdo->beginTransaction();
foreach (array_keys(STANDORTE) as $standort) {
    foreach ($seed['tage'][$standort] as $t) {
        $tag->execute([$standort, $t['datum'], $t['notiz']]);
    }
    foreach ($seed['items'] as $pos => $e) {
        $eintrag->execute([$standort, $e['block'], $e['zusatz'], $pos, $e['emoji'], $e['titel'], $e['link'], $e['dauer']]);
    }
    printf("%s: %d Kurstage, %d Einträge\n", STANDORTE[$standort], count($seed['tage'][$standort]), count($seed['items']));
}
$pdo->commit();
