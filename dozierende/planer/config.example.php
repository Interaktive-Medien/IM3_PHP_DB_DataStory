<?php
/**
 * Vorlage für die Zugangsdaten des Planers.
 *
 * So legst du deine eigene Fassung an – in diesem Ordner:
 *
 *     cp config.example.php config.php
 *
 * config.php steht in .gitignore und landet nie auf GitHub. PhpStorm lädt sie
 * trotzdem per FTP auf den Server, denn dort wird sie gebraucht. Diese Vorlage
 * ohne Werte bleibt im Repository, damit alle wissen, welche Angaben nötig sind.
 */

// --- Zugangsdaten -----------------------------------------------------------
//
// Die Datenbank läuft auf dem Webserver bei Hostpoint. Datenbank und Benutzer
// legst du im Control Panel von Hostpoint an, dort stehen auch alle Werte.
//
// Hostpoint setzt den Namen deines Kontos vor Host, Datenbank und Benutzer.
// Heisst dein Konto «konto», sieht das so aus:
//
//   Host       konto.mysql.db.hostpoint.ch
//   Datenbank  konto_im3
//   Benutzer   konto_im3
//
// Fehlt dieser Vorsatz, meldet PDO «Access denied» oder «Unknown database».

$host     = '';
$dbname   = '';
$username = '';
$password = '';

// --- Planer: Passwort für den Bearbeiten-Modus ------------------------------
//
// Ohne Passwort ist der Planer nur lesbar. Wer dieses Passwort kennt, kann
// Einträge verschieben, abhaken, bearbeiten und löschen.

$planerPasswort = '';

// --- DSN: die Adresse der Datenbank -----------------------------------------
//
// DSN heisst Data Source Name. Er sagt PDO, welche Datenbank wo liegt.
// charset=utf8mb4 sorgt dafür, dass Umlaute richtig ankommen.
// Einen Port braucht es bei Hostpoint nicht.

$dsn = "mysql:host=$host;dbname=$dbname;charset=utf8mb4";

// --- Optionen für PDO -------------------------------------------------------

$options = [
    // Fehler brechen laut ab, statt still zu scheitern.
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,

    // Zeilen kommen als assoziative Arrays zurück.
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,

    // Platzhalter werden von der Datenbank selbst eingesetzt, nicht von PHP.
    PDO::ATTR_EMULATE_PREPARES   => false,
];
