# Material für die Posten

Ein Ordner pro Posten. In jedem Ordner liegt dasselbe Set:

| Datei | Wofür |
| ----- | ----- |
| `posten.html` | Das Blatt, das am Posten hängt: Nummer, Titel, Bild, QR-Code, Auftrag. |
| `bild.png` oder anderes Bildformat | Screenshot oder Bild der Story, im Blatt eingebunden. |
| `qr.svg` | QR-Code auf die Story, im Blatt eingebunden. |
| `README.md` | Was am Posten steht und woher das Material stammt. |

## Drucken

Alle Blätter sind A4 hoch. Im Browser öffnen, `Cmd+P`, A4, Ränder «Standard»,
**Hintergrundgrafiken einschalten**. Ein Blatt pro Posten genügt.

Der Druckstil kommt aus [`../../arbeitsblatt.css`](../../arbeitsblatt.css) und
[`posten.css`](posten.css). Beide werden verlinkt, nicht kopiert.

## Einen Posten ergänzen oder austauschen

1. Bild in den Ordner legen, als `bild.png`.
2. QR-Code erzeugen:
   ```bash
   npx qrcode -o qr.svg -t svg -e M "https://beispiel.ch"
   ```
3. In `posten.html` Titel, Teaser, Bildnachweis und Kurz-URL anpassen.
4. Bei einem Posten mit Platzhalter zusätzlich den Block
   `<div class="platzhalter">` durch das Bild ersetzen, und falls nötig
   `<div class="qr-leer">` durch das QR-Bild:
   ```html
   <div class="bild"><img src="bild.png" alt="…"></div>
   <img src="qr.svg" alt="QR-Code zu …">
   ```
5. Posten in der Tabelle im
   [Ablauf](../Ablauf/01_data_story_galerie_ablauf.md) nachführen.

## Reserveposten

Weitere fertige Posten liegen in [`_speicher/`](_speicher) bereit, zum
Austauschen, wenn eine Website verschwindet oder ein Thema doppelt vorkommt.

## Bildrechte

Alle Bilder sind Screenshots fremder Arbeiten und dienen nur dem Unterricht.
Der Bildnachweis steht auf jedem Blatt und bleibt dort stehen.
