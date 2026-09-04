# Postenspeicher

Fertige Posten, die im Moment nicht im Rundgang stehen. Jeder Ordner ist
vollständig: Blatt, Bild und QR-Code. Damit lässt sich ein Posten kurzfristig
austauschen, wenn eine Website nicht mehr existiert, ein Thema doppelt
vorkommt oder der Gastreferent ein Beispiel selbst mitbringt.

| Kürzel | Posten | Worum es geht | Warum im Speicher |
| ------ | ------ | ------------- | ----------------- |
| A | [BahnMining](bahnmining) | Ein Jahr lang gesammelte Halte der Deutschen Bahn | Das lange Video braucht einen Laptop und zwei Kopfhörer |
| B | [Lager in Xinjiang](lager_in_xinjiang) | Satellitenbilder von 39 Anlagen, vermessen über zwei Jahre | schweres Thema, braucht Zeit und Einordnung |
| C | [Karten nach dem Beben](karten_nach_dem_beben) | OpenStreetMap-Bearbeitungen nach dem Erdbeben 2023 | starke Alternative, wenn ein Posten ausfällt |
| D | [5000 Speisekarten](5000_speisekarten) | 5000 Speisekarten von 1880 bis 1920 aus der NYPL | doppelt sich thematisch mit Posten 3 (The Pudding) |
| E | [Ein Jahr, Stunde für Stunde](jahr_in_stunden) | Jede Stunde eines Jahres von Hand kategorisiert | ähnelt dem persönlichen Tracking von «My Social Year» |

## Einen Posten einsetzen

1. Ordner nach `posten/` verschieben und mit einer Nummer benennen, zum
   Beispiel `posten/03_karten_nach_dem_beben`. Danach in `posten.html` die
   beiden Stylesheet-Pfade um eine Ebene kürzen:
   `../../../../arbeitsblatt.css` wird zu `../../../arbeitsblatt.css`,
   `../../posten.css` wird zu `../posten.css`.
2. In `posten.html` den Buchstaben im `<div class="nr">` durch die
   Postennummer ersetzen.
3. Titel in [`arbeitsblatt.html`](../../arbeitsblatt.html), in der
   Postentabelle des [README](../../README.md) und in den beiden Tabellen im
   [Ablauf](../../Ablauf/01_data_story_galerie_ablauf.md) nachführen.
4. Den ersetzten Posten hierher zurücklegen.

Umgekehrt gilt: Wer einen Posten herausnimmt, legt ihn hier ab statt ihn zu
löschen – und ergänzt die beiden Pfade wieder um eine Ebene.

## Einen neuen Reserveposten anlegen

Am schnellsten geht es als Kopie eines bestehenden Ordners. Bild als
`bild.png` ablegen, QR-Code erzeugen und Texte anpassen:

```bash
npx qrcode -o qr.svg -t svg -e M "https://beispiel.ch"
```

Details stehen in [`../README.md`](../README.md).
