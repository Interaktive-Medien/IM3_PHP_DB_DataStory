<?php

/**
 * Code-Along 09: Hitzesommer transformieren – Startcode
 *
 * Frage:
 * Wie hat sich die Anzahl Hitzetage pro meteorologischem Sommer in Bern,
 * Chur und Zürich seit 1940 verändert?
 *
 * Unsere Entscheide:
 * - Sommer = Juni, Juli, August
 * - Hitzetag = Tagesmaximum >= 30 °C
 * - eine Ergebniszeile = eine Stadt in einem Sommer
 */

$rawLocations = include __DIR__ . '/extract.php';

$summerMonths = [6, 7, 8];
$byCityAndYear = [];

foreach ($rawLocations as $location) {
    $city = $location['city'];
    $dates = $location['source']['daily']['time'];
    $temperatures = $location['source']['daily']['temperature_2m_max'];

    for ($i = 0; $i < count($dates); $i++) {
        $date = $dates[$i];
        $year = (int)substr($date, 0, 4);
        $month = (int)substr($date, 5, 2);

        if (!in_array($month, $summerMonths)) {
            continue;
        }

        $key = $city . '-' . $year;

        if (!isset($byCityAndYear[$key])) {
            $byCityAndYear[$key] = [
                'city' => $city,
                'year' => $year,
                'hot_days' => 0,
            ];
        }

        if ($temperatures[$i] >= 30) {
            $byCityAndYear[$key]['hot_days']++;
        }
    }
}

header('Content-Type: application/json; charset=utf-8');
echo json_encode(array_values($byCityAndYear), JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
