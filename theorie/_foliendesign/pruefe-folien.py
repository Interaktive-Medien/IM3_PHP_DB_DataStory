#!/usr/bin/env python3
"""Prueft einen Foliensatz gegen GESTALTUNGSREGELN.md.

Aufruf:
    python3 theorie/_foliendesign/pruefe-folien.py theorie/A_PHP_Basics/index.html

Geprueft wird, was sich automatisch pruefen laesst:
  1. Absaetze mit mehr als einem Satz          (Regel 1)
  2. Aufzaehlungspunkte mit mehr als einem Satz (Regel 2)
  3. Blocknamen des Kurses auf der Folie        (Regel 3)
  4. Sprechernotizen (<aside class="notes">)   (Regel 9)

Exit-Code 1, wenn etwas gefunden wurde.
"""

import re
import sys
from pathlib import Path

SATZENDE = re.compile(r"[.!?](?=\s+[A-ZÄÖÜ]|\s*$)")
BLOCKNAME = re.compile(r"\bBlock\s+[A-F]\b")


def text_of(html_fragment: str) -> str:
    """HTML-Tags entfernen und Leerraum normalisieren."""
    return re.sub(r"\s+", " ", re.sub(r"<[^>]+>", "", html_fragment)).strip()


def pruefe(pfad: Path) -> list[str]:
    html = pfad.read_text(encoding="utf-8")
    treffer: list[str] = []

    # Jede <section> ist eine Folie; Reihenfolge = Foliennummer.
    for nummer, block in enumerate(re.split(r'<section id="', html)[1:], start=1):
        folien_id = block.split('"')[0]
        ort = f"Folie {nummer:>2} [{folien_id}]"

        if '<aside class="notes"' in block:
            treffer.append(f"{ort} Regel 9: Sprechernotiz vorhanden")
        sichtbar = block

        for tag, regel in (("p", "Regel 1"), ("li", "Regel 2")):
            for m in re.finditer(rf"<{tag}\b[^>]*>(.*?)</{tag}>", sichtbar, re.S):
                inhalt = m.group(1)
                # Verschachtelte Listen gehoeren zum aeusseren li, nicht mitzaehlen.
                inhalt = re.sub(r"<ul\b.*?</ul>", "", inhalt, flags=re.S)
                txt = text_of(inhalt)
                if len(SATZENDE.findall(txt)) > 1:
                    treffer.append(f"{ort} {regel}: mehr als ein Satz\n    {txt}")

        for m in BLOCKNAME.finditer(text_of(sichtbar)):
            treffer.append(f"{ort} Regel 3: Blockname auf der Folie: {m.group(0)}")

    return treffer


def main() -> int:
    if len(sys.argv) != 2:
        print(__doc__)
        return 2

    pfad = Path(sys.argv[1])
    if not pfad.is_file():
        print(f"Datei nicht gefunden: {pfad}")
        return 2

    treffer = pruefe(pfad)
    if not treffer:
        print(f"OK - {pfad} haelt die pruefbaren Gestaltungsregeln ein.")
        return 0

    print(f"{len(treffer)} Stelle(n) in {pfad}:\n")
    for t in treffer:
        print(t)
    print("\nSiehe theorie/_foliendesign/GESTALTUNGSREGELN.md")
    return 1


if __name__ == "__main__":
    sys.exit(main())
