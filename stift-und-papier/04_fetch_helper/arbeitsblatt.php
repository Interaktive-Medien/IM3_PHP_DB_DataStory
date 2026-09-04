<?php
/**
 * ARBEITSBLATT – Den fetch-Helfer entschlüsseln
 *
 * Zum Ausdrucken. Kein Editor, kein Browser, keine KI. Nur Stift und Papier.
 *
 * Ihr habt `fetchJson($url)` im Code-Along benutzt, ohne ihn zu verstehen.
 * Das holt ihr jetzt nach: Schreibt unter JEDE Codezeile in eigenen Worten,
 * was dort passiert. Ein Satz pro Zeile genügt.
 *
 * Namen:  ____________________  ____________________  ____________________
 */


// =============================================================================
// WORTSPEICHER
// =============================================================================
//
// Diese Begriffe dürft ihr benutzen. Es sind mehr, als ihr braucht.
//
//   Anfrage (Request)      Antwort (Response)      Server        URL
//   Text (String)          Array                   Parameter     Rückgabewert
//   Sekunden               abbrechen               JSON-Text     Datentyp
//   speichern              direkt ausgeben         umwandeln     vorbereiten
//
// Wenn ihr eine Zeile nicht sicher versteht: schreibt eure beste VERMUTUNG
// hin und macht ein Fragezeichen daneben. Vermutungen sind erwünscht.


// =============================================================================
// TEIL 1 – Der Helfer, Zeile für Zeile (15')
// =============================================================================
//
// Jeder Schreibblock gehört zur Codezeile DARÜBER.

function fetchJson(string $url): array {

    // (1) Was macht diese Zeile? Was geht rein, was kommt raus?
    //     ___________________________________________________________________
    //     ___________________________________________________________________

    $ch = curl_init($url);

    // (2) ___________________________________________________________________
    //     ___________________________________________________________________

    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

    // (3) ___________________________________________________________________
    //     ___________________________________________________________________

    curl_setopt($ch, CURLOPT_TIMEOUT, 10);

    // (4) ___________________________________________________________________
    //     ___________________________________________________________________

    $response = curl_exec($ch);

    // (5) Hier passiert der eigentliche Weg ins Internet. Beschreibt ihn.
    //     ___________________________________________________________________
    //     ___________________________________________________________________

    return json_decode($response, true);

    // (6) Zwei Dinge passieren gleichzeitig. Welche?
    //     ___________________________________________________________________
    //     ___________________________________________________________________

}


// =============================================================================
// TEIL 2 – Was steckt in den Variablen? (10')
// =============================================================================
//
// Tragt ein, WAS in der Variablen liegt – nicht den Code, sondern die Sache.
// Beispiel für eine Antwort: «ein Text mit vielen geschweiften Klammern».
//
//   $url        enthält  ______________________________________________
//
//   $ch         enthält  ______________________________________________
//
//   $response   enthält  ______________________________________________
//
//   Rückgabe    enthält  ______________________________________________
//
//
// Zeichnet den Weg der Daten und beschriftet die vier Pfeile:
//
//        $url  ──►  $ch  ──►  $response  ──►  Rückgabewert
//                │        │             │
//                │        │             └── ________________________
//                │        └── ______________________________________
//                └── _____________________________________________
//
//
// Die entscheidende Frage: An welcher Stelle hört der Text auf, Text zu sein,
// und wird zu etwas, das PHP mit [ ] durchsuchen kann?
//
//     ___________________________________________________________________


// =============================================================================
// TEIL 3 – Der Helfer im Einsatz (5')
// =============================================================================
//
// So habt ihr ihn im Code-Along benutzt:

$url = 'https://api.open-meteo.com/v1/forecast'
     . '?latitude=46.948&longitude=7.447'
     . '&hourly=temperature_2m&forecast_days=1&timezone=Europe/Zurich';

$data = fetchJson($url);

$zeiten = $data['hourly']['time'];
$temps  = $data['hourly']['temperature_2m'];

// (a) Wie viele Zeilen Code braucht ihr, um Daten aus dem Internet zu holen?
//
//     ___________________________________________________________________
//
// (b) Der ganze cURL-Teil steckt in einer Funktion. Welchen Vorteil hat das,
//     wenn ihr im Projekt drei verschiedene APIs abfragen wollt?
//
//     ___________________________________________________________________
//     ___________________________________________________________________
//
// (c) In welchem Schritt der Kette Extract → Transform → Load → Unload
//     steht dieser Helfer? Kreist ein und begründet in einem Satz.
//
//     ___________________________________________________________________


// =============================================================================
// TEIL 4 – Nachdenkfragen (10')
// =============================================================================
//
// (d) In Zeile (6) steht `json_decode($response, true)`. Was passiert wohl,
//     wenn man das `true` weglässt? Warum steht es also da?
//
//     ___________________________________________________________________
//     ___________________________________________________________________
//
// (e) Der Timeout steht auf 10. Was passiert nach 10 Sekunden ohne Antwort?
//     Und warum steht dort überhaupt eine Grenze?
//
//     ___________________________________________________________________
//     ___________________________________________________________________
//
// (f) Die Funktion verspricht mit `: array`, dass sie ein Array zurückgibt.
//     Nennt eine Situation, in der sie dieses Versprechen nicht halten kann.
//
//     ___________________________________________________________________
//     ___________________________________________________________________
//
// (g) `$_GET` und cURL werden oft verwechselt. Beide haben mit einer URL zu
//     tun. Wer schickt bei welchem von beiden die Anfrage an wen?
//
//     $_GET:  ___________________________________________________________
//
//     cURL:   ___________________________________________________________


// =============================================================================
// TEIL 5 – Nur wenn ihr früh fertig seid
// =============================================================================
//
// (h) Schreibt den Helfer als Kochrezept in vier Sätzen auf die Rückseite.
//     Beginnt jeden Satz mit einem Verb, ohne ein einziges PHP-Wort.
//
// (i) Der Helfer prüft nirgends, ob etwas schiefgegangen ist. Wo würdet ihr
//     eine Prüfung einbauen, und was müsste sie prüfen? Markiert die Stelle
//     oben mit einem Pfeil.
