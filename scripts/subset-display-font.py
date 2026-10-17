"""
Builds a lighter copy of the display font (Bricolage Grotesque) for the site:
131 KB -> ~63 KB.

  - keeps only the weights and widths the site uses (500-600, 88-100%);
    optical sizing is kept, so small headings still look right
  - keeps Basic Latin plus the punctuation the copy uses (curly quotes,
    dashes, middle dot, bullet, ellipsis...). Anything else falls back to
    the body font, letter by letter.

Run once after changing the font or the character list, then commit the output:

  pip install fonttools brotli
  python scripts/subset-display-font.py
"""
from pathlib import Path

from fontTools import subset
from fontTools.ttLib import TTFont
from fontTools.varLib import instancer

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "node_modules/@fontsource-variable/bricolage-grotesque/files/bricolage-grotesque-latin-standard-normal.woff2"
OUT = ROOT / "src/assets/fonts/bricolage-display.woff2"

AXES = {"wght": (500, 600), "wdth": (88, 100)}
UNICODES = list(range(0x20, 0x7F)) + [
    0xA0, 0xA9, 0xAE, 0xB7, 0xD7, 0xE9,  # nbsp © ® · × é
    0x2013, 0x2014, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2026,  # – — ‘ ’ “ ” • …
]

font = instancer.instantiateVariableFont(TTFont(SRC), AXES)

options = subset.Options()
options.flavor = "woff2"
options.layout_features = ["kern", "liga", "calt", "ccmp", "locl", "mark", "mkmk"]
subsetter = subset.Subsetter(options)
subsetter.populate(unicodes=UNICODES)
subsetter.subset(font)

OUT.parent.mkdir(parents=True, exist_ok=True)
font.save(OUT)
print(f"{SRC.stat().st_size // 1024} KB -> {OUT.stat().st_size // 1024} KB  ({OUT.relative_to(ROOT)})")
