-- Tabelle für den Verbindungstest.
--
-- phpMyAdmin öffnest du über das Control Panel von Hostpoint. Dort zwei Wege,
-- beide führen zum selben Ergebnis:
--   a) diesen Text in den Reiter «SQL» einfügen und ausführen;
--   b) dieselben Spalten im Reiter «Struktur» zusammenklicken.
--
-- Das ist eine Wegwerf-Tabelle zum Üben. Das richtige Datenmodell für das
-- Projekt kommt im nächsten Code-Along.

CREATE TABLE measurements (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  location      VARCHAR(80) NOT NULL,
  temperature_c DECIMAL(4,1) NOT NULL,
  measured_at   DATETIME NOT NULL
);
