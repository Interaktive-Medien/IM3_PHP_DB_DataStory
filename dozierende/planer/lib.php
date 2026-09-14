<?php
// Gemeinsame Funktionen für api.php und install.php.

require __DIR__ . '/config.php';

const STANDORTE = ['chur' => 'Chur', 'bern' => 'Bern', 'zuerich' => 'Zürich'];

// Dozierende, die an Kurstage zugeteilt werden können. Die Reihenfolge gilt auch für die Anzeige.
const DOZIERENDE = ['Wolfgang', 'Jan', 'Nick', 'Nils', 'Jasper', 'Siro', 'Beni'];

function db(): PDO
{
    static $pdo = null;
    global $dsn, $username, $password, $options;
    return $pdo ??= new PDO($dsn, $username, $password, $options);
}

function createTables(PDO $pdo): void
{
    $pdo->exec("CREATE TABLE IF NOT EXISTS planer_tage (
        id INT AUTO_INCREMENT PRIMARY KEY,
        standort VARCHAR(20) NOT NULL,
        datum DATE NOT NULL,
        datum2 DATE NULL,
        notiz TEXT NULL,
        dozierende VARCHAR(255) NOT NULL DEFAULT '',
        INDEX (standort, datum)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // tag_id NULL heisst: offen, steht noch links im Ablauf.
    $pdo->exec("CREATE TABLE IF NOT EXISTS planer_eintraege (
        id INT AUTO_INCREMENT PRIMARY KEY,
        standort VARCHAR(20) NOT NULL,
        typ ENUM('eintrag', 'pause', 'mittag', 'termin') NOT NULL DEFAULT 'eintrag',
        block VARCHAR(100) NOT NULL DEFAULT '',
        zusatz TINYINT(1) NOT NULL DEFAULT 0,
        ablauf_pos INT NOT NULL DEFAULT 0,
        emoji VARCHAR(32) NOT NULL DEFAULT '',
        titel VARCHAR(255) NOT NULL,
        link VARCHAR(500) NULL,
        dauer SMALLINT NULL,
        notiz TEXT NULL,
        tag_id INT NULL,
        tag_pos INT NOT NULL DEFAULT 0,
        erledigt TINYINT(1) NOT NULL DEFAULT 0,
        gestrichen TINYINT(1) NOT NULL DEFAULT 0,
        geaendert TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (standort, tag_id),
        FOREIGN KEY (tag_id) REFERENCES planer_tage(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // Spalten, die nach dem ersten Einrichten dazugekommen sind.
    $pdo->exec('ALTER TABLE planer_eintraege
        ADD COLUMN IF NOT EXISTS gestrichen TINYINT(1) NOT NULL DEFAULT 0 AFTER erledigt');
    $pdo->exec("ALTER TABLE planer_eintraege
        MODIFY typ ENUM('eintrag', 'pause', 'mittag', 'termin') NOT NULL DEFAULT 'eintrag'");
    // Zweites Datum: Halbklassen machen dasselbe an zwei Tagen.
    $pdo->exec('ALTER TABLE planer_tage ADD COLUMN IF NOT EXISTS datum2 DATE NULL AFTER datum');
    // Dozierende vor Ort, kommagetrennt, zum Beispiel «Jan,Nick».
    $pdo->exec("ALTER TABLE planer_tage ADD COLUMN IF NOT EXISTS dozierende VARCHAR(255) NOT NULL DEFAULT '' AFTER notiz");
}
