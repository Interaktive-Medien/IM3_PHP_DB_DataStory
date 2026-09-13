<?php
/**
 * Code-Along 14: Hitzesommer ausliefern (Unload) – Lösung
 *
 * Für Dozierende: Die Kommentare erklären, was jeder Block tut und warum er so
 * geschrieben ist. Die Nummern verweisen auf die TODOs im Startcode
 * ../unload.php, damit im Unterricht klar ist, welcher Block gerade dran ist.
 *
 * Datenfluss dieser Datei:
 *
 *   Anfrage aus dem Browser        GET /unload.php?city=Bern
 *     -> SELECT mit JOIN           zwei Tabellen werden eine flache Liste
 *       -> PHP-Array               $rows aus fetchAll()
 *         -> Datenvertrag          Namen und Typen festgelegt
 *           -> JSON-Antwort        genau das, was das Frontend erwartet
 *
 * Anders als load.php ist diese Datei kein Werkzeug für uns, sondern eine
 * öffentliche Schnittstelle für andere: Sie wird bei jedem Seitenaufruf des
 * Frontends erneut ausgeführt.
 */

// ---------------------------------------------------------------------------
// TODO 1: Die Antwort als JSON ankündigen
// ---------------------------------------------------------------------------
//
// Der Header sagt dem Browser, wie er den Text lesen soll. Ohne ihn hält er
// die Antwort für HTML: Im Netzwerk-Tab steht dann text/html, und Firefox
// zeigt die hübsche JSON-Ansicht nicht an.
//
// charset=utf-8 ist der Grund, warum «Zürich» auch Zürich bleibt.
//
// Wichtig ist die Position: Der Header muss vor jeder Ausgabe stehen. Ein
// einziges echo davor – oder ein Leerzeichen vor dem <?php – löst die Meldung
// «headers already sent» aus.

header('Content-Type: application/json; charset=utf-8');

// ---------------------------------------------------------------------------
// TODO 2 (Teil 1): Zugangsdaten laden
// ---------------------------------------------------------------------------
//
// Dieselbe config.php wie in Block D. Von hier aus sind es vier Ordner nach
// oben – einer mehr als in der Fassung daneben, weil diese Datei zusätzlich in
// solution/ liegt.

require __DIR__ . '/../../../../config.php';

// ---------------------------------------------------------------------------
// TODO 5: Die Typen festlegen
// ---------------------------------------------------------------------------
//
// Diese Funktion steht oben, benutzt wird sie weiter unten. Sie nimmt eine
// Zeile aus der Datenbank und gibt einen Datensatz nach Datenvertrag zurück.
//
// Warum es sie überhaupt braucht: Der Datenbanktyp ist nicht automatisch der
// JSON-Typ. max_temperature_c ist in der Tabelle ein DECIMAL, und DECIMAL
// kommt bei PDO als Text zurück. Ohne diese Funktion stünde im JSON
// "max_temperature_c": "36.3" statt 36.3 – mit Anführungszeichen, also ein
// String. Chart.js rechnet damit oft trotzdem, der Datenvertrag ist aber
// gebrochen, und irgendwann rechnet etwas anderes damit nicht mehr.
//
// Der Umweg über eine eigene Funktion hat einen zweiten Zweck: Hier steht an
// einer Stelle, welche Felder die Antwort hat. Wer den Vertrag ändern will,
// ändert diese Funktion – und sonst nichts.

function normalizeSummer(array $row): array
{
    return [
        'city' => $row['city'],
        'year' => (int) $row['year'],
        'measurement_days' => (int) $row['measurement_days'],
        'hot_days' => (int) $row['hot_days'],

        // Ein fehlender Messwert bleibt null und wird nicht zu 0.0.
        // null heisst «wir wissen es nicht», 0.0 wäre eine Messung.
        'max_temperature_c' => $row['max_temperature_c'] === null
            ? null
            : (float) $row['max_temperature_c'],
    ];
}

// ---------------------------------------------------------------------------
// TODO 7 (Teil 1): Den Filter aus der URL lesen
// ---------------------------------------------------------------------------
//
// $_GET ist ein Array mit allem, was in der URL hinter dem ? steht.
// Aus /unload.php?city=Bern wird $_GET['city'] === 'Bern'.
//
// Richtung nicht verwechseln: In Block B hat fetchJson() eine fremde API
// angefragt – das ging von uns weg. $_GET ist die Gegenrichtung: Jemand fragt
// uns etwas.
//
// ?? '' setzt einen leeren String, wenn der Parameter fehlt. Ohne das gäbe es
// eine Warnung, sobald jemand /unload.php ohne Filter aufruft – also immer.
// trim() entfernt Leerzeichen, die beim Kopieren einer URL mitkommen.

$city = trim($_GET['city'] ?? '');

// ---------------------------------------------------------------------------
// TODO 8: Fehler abfangen
// ---------------------------------------------------------------------------
//
// Ab hier kann etwas schiefgehen, das nicht an uns liegt: Die Datenbank
// antwortet nicht, eine Tabelle wurde umbenannt, das Passwort ist falsch.
//
// Ohne try/catch schickt PHP dann eine HTML-Fehlerseite – an ein Frontend, das
// JSON erwartet. Das Frontend meldet daraufhin einen Parse-Fehler, und alle
// suchen an der falschen Stelle.
//
// Throwable fängt beides: Fehler (Error) und Ausnahmen (Exception).

try {
    // -----------------------------------------------------------------------
    // TODO 2 (Teil 2): Verbindung aufbauen
    // -----------------------------------------------------------------------
    //
    // Wortgleich wie beim Laden. Dieselbe Datenbank, nur lesen wir diesmal.

    $pdo = new PDO($dsn, $username, $password, $options);

    // -----------------------------------------------------------------------
    // TODO 3: Die Abfrage schreiben
    // -----------------------------------------------------------------------
    //
    // Drei Entscheidungen stecken in diesem SELECT:
    //
    // 1. Nur die fünf Felder des Datenvertrags. SELECT * wäre kürzer, würde
    //    aber id und city_id mitliefern – Innereien der Datenbank, die das
    //    Frontend nichts angehen. Und beim nächsten ALTER TABLE ändert sich
    //    die Antwort, ohne dass jemand den Endpunkt angefasst hat.
    //
    // 2. AS city gibt der Spalte direkt den Namen aus dem Datenvertrag. In der
    //    Tabelle heisst sie name, im JSON heisst sie city. Das Umbenennen
    //    einmal in SQL erledigen ist kürzer als später in PHP.
    //
    // 3. ORDER BY macht die Reihenfolge verlässlich. Ohne ORDER BY darf die
    //    Datenbank liefern, wie es ihr passt – meistens sieht das sortiert
    //    aus, garantiert ist es nicht. Ein Chart mit springenden Jahreszahlen
    //    ist ein hässlicher Fehler, den niemand im Code sucht.
    //
    // Der JOIN ist der Kern: cities.id = heat_summers.city_id. Die Datenbank
    // sucht zu jeder Sommerzeile die Stadt mit derselben Nummer. Aus zwei
    // Tabellen wird so eine flache Liste – genau die Form, die das Frontend
    // braucht. AS hs und AS c sind nur Abkürzungen für die Tabellennamen.

    $sql = 'SELECT c.name AS city,
                   hs.year,
                   hs.measurement_days,
                   hs.hot_days,
                   hs.max_temperature_c
            FROM heat_summers AS hs
            JOIN cities AS c ON c.id = hs.city_id';

    // -----------------------------------------------------------------------
    // TODO 7 (Teil 2): Den Filter anhängen
    // -----------------------------------------------------------------------
    //
    // Der Filter ist optional, also wird die Abfrage in zwei Fällen gebraucht.
    // Statt zwei ganze SELECTs nebeneinander zu schreiben, ergänzen wir das
    // WHERE nur, wenn wirklich ein Wert da ist.
    //
    // $params sammelt die Werte dazu. Ohne Filter bleibt es eine leere Liste,
    // und execute([]) verhält sich wie execute() ohne Argument.
    //
    // :city ist ein Platzhalter, kein Wert. Der Wert reist getrennt vom
    // SQL-Text – dieselbe Trennung wie beim INSERT in Block D. Wer ihn
    // stattdessen in den Text schreibt ("WHERE c.name = '$city'"), hat schon
    // bei einem Namen wie O'Brien kaputtes SQL. Genau diese Lücke ist auch die
    // bekannteste Sicherheitslücke im Web.
    //
    // ORDER BY kommt zum Schluss, weil es in SQL hinter WHERE stehen muss.

    $params = [];

    if ($city !== '') {
        $sql .= ' WHERE c.name = :city';
        $params['city'] = $city;
    }

    $sql .= ' ORDER BY hs.year, c.name';

    // -----------------------------------------------------------------------
    // TODO 4: Abfrage ausführen und Zeilen holen
    // -----------------------------------------------------------------------
    //
    // Dasselbe Muster wie beim Schreiben: prepare() bekommt den Bauplan,
    // execute() die Werte.
    //
    // fetchAll() holt alle Zeilen auf einmal als Liste assoziativer Arrays.
    // Die Schlüssel sind die Namen aus dem SELECT – deshalb heisst der erste
    // Schlüssel city und nicht name.
    //
    // Bei 258 Zeilen ist fetchAll() genau richtig. Bei Millionen Zeilen würde
    // man Zeile für Zeile lesen; so weit kommt in diesem Kurs kein Projekt.
    //
    // Findet die Abfrage nichts, ist $rows eine leere Liste – und kein Fehler.
    // Aus [] wird am Ende die JSON-Antwort [], mit der das Frontend dieselbe
    // Listenlogik weiterverwenden kann.

    $statement = $pdo->prepare($sql);
    $statement->execute($params);

    $rows = $statement->fetchAll();

    // -----------------------------------------------------------------------
    // TODO 5 (Anwendung): Jede Zeile in die vereinbarte Form bringen
    // -----------------------------------------------------------------------
    //
    // array_map ruft normalizeSummer() für jede Zeile auf und sammelt die
    // Ergebnisse in einer neuen Liste. Eine foreach-Schleife täte dasselbe;
    // array_map sagt kürzer, dass jede Zeile gleich behandelt wird.
    //
    // Eine leere Liste bleibt dabei leer.

    $data = array_map('normalizeSummer', $rows);

    // -----------------------------------------------------------------------
    // TODO 6: Als JSON antworten
    // -----------------------------------------------------------------------
    //
    // json_encode macht aus dem PHP-Array Text nach den Regeln von JSON.
    // echo schickt diesen Text an den Browser. Das ist die ganze Antwort –
    // kein HTML, kein var_dump, kein «Fertig» daneben. Jedes zusätzliche
    // Zeichen macht die Antwort ungültig.
    //
    // JSON_THROW_ON_ERROR: Schlägt das Kodieren fehl, fliegt eine Ausnahme und
    // der catch-Block unten greift. Ohne diese Option gäbe json_encode
    // stillschweigend false zurück, und der Browser bekäme eine leere Seite.
    //
    // JSON_UNESCAPED_UNICODE: hält Umlaute lesbar. Ohne die Option steht dort
    // "Zürich" – gültiges JSON, aber im Netzwerk-Tab unlesbar.
    //
    // Zum Debuggen nicht echo benutzen, sondern error_log() – das schreibt ins
    // Server-Log und lässt die Antwort in Ruhe.

    echo json_encode($data, JSON_THROW_ON_ERROR | JSON_UNESCAPED_UNICODE);
} catch (Throwable $error) {
    // -----------------------------------------------------------------------
    // TODO 8 (Teil 2): Die Fehlerantwort
    // -----------------------------------------------------------------------
    //
    // Drei Dinge passieren hier, und jedes hat einen eigenen Adressaten:
    //
    // 1. http_response_code(500) sagt der Maschine: Das war nichts. Ohne diese
    //    Zeile meldet der Server 200 OK und behauptet, alles sei in Ordnung.
    //
    // 2. error_log() schreibt die echte Meldung dorthin, wo wir sie brauchen:
    //    ins Error-Log des Webservers, nicht in den Browser.
    //
    // 3. Die Antwort an die Öffentlichkeit bleibt kurz und höflich. Tabellen-
    //    namen, Pfade oder Passwörter gehören nicht in eine Antwort, die jede
    //    Person im Netz abrufen kann.
    //
    // Die Antwort ist auch im Fehlerfall JSON. Das Frontend muss nicht raten,
    // ob es diesmal HTML bekommen hat.

    http_response_code(500);
    error_log('unload.php: ' . $error->getMessage());

    echo json_encode([
        'error' => 'Daten konnten nicht geladen werden.',
    ]);
}
