<?php
// Gemeinsame Funktionen für api.php und install.php.

require __DIR__ . '/config.php';

const STANDORTE = ['bern' => 'Bern', 'chur' => 'Chur', 'zuerich' => 'Zürich'];

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
        notiz TEXT NULL,
        INDEX (standort, datum)
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");

    // tag_id NULL heisst: offen, steht noch links im Ablauf.
    $pdo->exec("CREATE TABLE IF NOT EXISTS planer_eintraege (
        id INT AUTO_INCREMENT PRIMARY KEY,
        standort VARCHAR(20) NOT NULL,
        typ ENUM('eintrag', 'pause', 'mittag') NOT NULL DEFAULT 'eintrag',
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
        geaendert TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX (standort, tag_id),
        FOREIGN KEY (tag_id) REFERENCES planer_tage(id) ON DELETE SET NULL
    ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci");
}
