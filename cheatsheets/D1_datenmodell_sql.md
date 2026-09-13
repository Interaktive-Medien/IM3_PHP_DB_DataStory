# Datenmodell und SQL

> Block D · Theorie `D_load`, Code-Alongs `11_datenbank_testen`,
> `12_hitzesommer_laden`

Eine Datenbank ist eine Sammlung von Tabellen. Eine Tabelle ist eine Liste mit
festen Spalten, und jede Spalte hat einen festen Datentyp. Das ist der
Unterschied zu einer Datei: Die Datenbank prüft mit, ob die Daten zur Struktur
passen, und sie findet einzelne Zeilen, ohne alles zu lesen.

Im Kurs arbeiten wir mit **MariaDB**, einer nahen Verwandten von MySQL, auf dem
Webserver von Hostpoint. Bedient wird sie mit **phpMyAdmin** aus dem Control
Panel.

## Das Datenmodell planen

Vier Fragen, bevor eine Zeile SQL entsteht:

1. Was bedeutet **eine Zeile**? Das ist die Untersuchungseinheit aus dem
   Transform – beim Hitzesommer: eine Stadt in einem Sommer.
2. Welche Spalten braucht es? Genau die Felder des Datenvertrags.
3. Welchen Datentyp hat jede Spalte?
4. Reicht eine Tabelle, oder braucht es zwei?

### Eine oder zwei Tabellen

Die Frage wird zweimal beantwortet:

| Grund für eine zweite Tabelle | Beispiel |
| --- | --- |
| Ein Wert **wiederholt** sich | «Bern» stünde 86-mal in `heat_summers` |
| Die Zeilen haben eine andere **Form** | Ranglisten haben einen Platz, Länder einen Ländercode |

Wiederholt sich nichts und passen alle Zeilen in dieselben Spalten, genügt eine
Tabelle. Beides folgt aus den Daten, keines ist eine Regel.

## Datentypen

| Typ | Wofür | Beispiel |
| --- | --- | --- |
| `INT` | ganze Zahlen, IDs | `id` |
| `SMALLINT` | ganze Zahlen bis 32767 | `year`, `hot_days` |
| `DECIMAL(4,1)` | Kommazahl, hier vier Ziffern, eine davon nach dem Komma | `36.3` |
| `VARCHAR(80)` | Text bis 80 Zeichen | `name`, `category` |
| `CHAR(3)` | Text mit fester Länge | `iso3` |
| `DATE`, `DATETIME` | Datum, Datum mit Uhrzeit | `2026-08-14 15:42:07` |

`DECIMAL` statt `FLOAT`, wenn gerundet gerechnet wird. `NULL` erlauben nur
dort, wo «wir wissen es nicht» ein möglicher Zustand ist – sonst `NOT NULL`.

## Schlüssel

```sql
CREATE TABLE cities (
  id   INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE
);

CREATE TABLE heat_summers (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  city_id           INT NOT NULL,
  year              SMALLINT NOT NULL,
  measurement_days  SMALLINT NOT NULL,
  hot_days          SMALLINT NOT NULL,
  max_temperature_c DECIMAL(4,1),
  FOREIGN KEY (city_id) REFERENCES cities(id)
);
```

| Begriff | Bedeutung |
| --- | --- |
| `PRIMARY KEY` | die eindeutige Nummer einer Zeile |
| `AUTO_INCREMENT` | die Datenbank vergibt sie selbst |
| `FOREIGN KEY` | verweist auf die `id` einer anderen Tabelle |
| `UNIQUE` | dieser Wert darf nur einmal vorkommen |
| `NOT NULL` | dieses Feld muss einen Wert haben |

Der Fremdschlüssel ist mehr als eine Notiz: Die Datenbank lässt keine
Sommerzeile mit einer Stadt zu, die es nicht gibt.

`UNIQUE` über mehrere Spalten macht ein Duplikat unmöglich statt nur
unerwünscht:

```sql
UNIQUE (dimension, category)
```

## Die vier SQL-Befehle

```sql
SELECT city_id, year, hot_days FROM heat_summers WHERE year >= 2000;
INSERT INTO cities (name) VALUES ('Bern');
UPDATE cities SET name = 'Zürich' WHERE id = 3;
DELETE FROM heat_summers;
```

Mehr braucht es im Kurs nicht. Geschrieben wird meistens aus PHP heraus
(siehe [D2](D2_pdo_load.md)), gelesen zum Prüfen direkt in phpMyAdmin.

### SELECT im Detail

```sql
SELECT c.name AS city,
       hs.year,
       hs.hot_days
FROM heat_summers AS hs
JOIN cities AS c ON c.id = hs.city_id
WHERE c.name = 'Bern'
ORDER BY hs.year
LIMIT 10;
```

| Teil | Bedeutung |
| --- | --- |
| `SELECT` | welche Spalten |
| `AS` | benennt eine Spalte oder Tabelle um |
| `FROM` | aus welcher Tabelle |
| `JOIN ... ON` | zwei Tabellen über ihre Schlüssel verbinden |
| `WHERE` | welche Zeilen |
| `ORDER BY` | Reihenfolge – ohne diese Zeile ist sie nicht garantiert |
| `LIMIT` | wie viele Zeilen |

Zählen und gruppieren:

```sql
SELECT country, COUNT(*) AS incidents
FROM shark_countries
GROUP BY country
ORDER BY incidents DESC;
```

## Tabellen anlegen

Die Struktur wird **einmal von Hand** angelegt, in phpMyAdmin:

- Reiter «SQL»: den Text aus `schema.sql` einfügen und ausführen, oder
- Reiter «Struktur»: dieselben Spalten zusammenklicken.

Gefüllt wird sie danach nur noch von `load.php`. Wer das Modell ändert, ändert
`schema.sql` mit – sonst kann niemand die Datenbank neu aufbauen.

## Häufige Fehler

| Meldung | Ursache |
| --- | --- |
| `You have an error in your SQL syntax` bei `rank` | reserviertes Wort. Auch `order`, `group`, `key`, `condition`, `interval` – anders benennen, z. B. `rank_position` |
| `Cannot add or update a child row` | Der Fremdschlüssel zeigt auf eine `id`, die es nicht gibt |
| `Duplicate entry` | Eine `UNIQUE`-Regel greift – meistens zu Recht |
| `Data too long for column` | `VARCHAR` zu kurz gewählt |
| Umlaute erscheinen als `Ã¼` | Die Datenbank ist nicht auf `utf8mb4` gestellt |

## Verwandte Cheatsheets

- [D2 PDO und Load](D2_pdo_load.md) – dieselben Befehle aus PHP heraus
- [E1 Unload](E1_unload.md) – aus `SELECT` wird ein JSON-Endpunkt
