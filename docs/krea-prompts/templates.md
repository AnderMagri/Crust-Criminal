# Copy-paste image prompt templates

Fill the `<...>` parts, pass the listed references in `image_urls`, then follow the recipe in README.md.
Settings for all: `openai/gpt-image-2.5-flare`, `4:3`, `2K`, `background: transparent`.

## STYLE (start every prompt with this)
```
Game sprite sheet on a fully transparent background, matching the exact kawaii art style of the reference images (thick dark-brown outlines, soft cel shading, pastel colors, tiny white highlights, slightly top-down 3/4 view).
```

## GRID sentence (change the numbers; must match the slice.py grid)
```
A clean <C> columns x <R> rows grid of <K> separate <objects>, each centered in its own cell with generous empty transparent space between them, no overlapping, no text, no labels, no shadows on the background:
```

## 1. Props / snacks / decor sheet
References: one existing sheet of the same world + `kawaii-gameplay-mockup.png`.
```
<STYLE> <GRID, objects = "<WORLD>-themed props">
Row 1: (1) a cute <thing> - <shape, colors, one detail>, (2) ..., (3) ..., (4) ...
Row 2: (5) ..., (6) ..., (7) ..., (8) ...
Do not include <things from other worlds, e.g. pots, plants, plates>.
```

## 2. Empty + occupied hiding spot pairs
References: `hiding-spots-v1.png` + raccoon sheet of the world.
```
<STYLE> <GRID, 3 x 2, objects>
Row 1: (1) <hiding spot A> (empty), (2) <hiding spot B> (empty), (3) <hiding spot C> (empty).
Row 2: (4) the SAME <A> but with the chubby grey raccoon peeking out, only ears, mask and eyes visible, (5) the SAME <B> with the raccoon peeking, (6) the SAME <C> with the raccoon peeking.
```
(On the moon the raccoon wears a "round glass space helmet" — say "only helmet, ears, mask and eyes visible".)

## 3. Character poses (walk / actions)
References: raccoon sheet + enemies sheet.
```
<STYLE> A clean 4 columns x 3 rows grid of 12 separate poses of the SAME <character description>, same size and same colors in every cell. Row 1: front view, 4 walk frames. Row 2: side view, 4 walk frames. Row 3: back view, 4 walk frames.
```

## 4. Expression / head portraits (UI)
References: `raccoon-actions-v1.png` + `hiding-spots-v1.png`.
```
Game UI sprite sheet on a fully transparent background, matching the exact kawaii art style and the exact chubby grey raccoon character from the reference images (thick dark-brown outlines, soft cel shading, tiny white highlights, same grey fur, same dark mask, same white muzzle, same round ears). Only the raccoon HEAD, front view, centered in each cell, same size in every cell, no body, no helmet. <GRID 3 x 2, head portraits> <mood sentence>
Row 1: (1) ... (2) ... (3) ...
Row 2: (4) ... (5) ... (6) ...
```
Exact working example: `raccoon-sneak-v1` in images.md.

## 5. Enemy reaction pairs
```
<STYLE> <GRID 4 x 3, 12 poses> The <enemy list>, each shown twice: (a) jump-scared, arms up, wide eyes, (b) running away. Same outfits and colors as the reference enemies sheet.
```

## Checklist after rendering
1. Save the exact prompt under "Exact prompts" in images.md (sheet name, model, refs).
2. Download on the Mac with curl (cloud cannot reach Krea URLs), copy PNG to `assets/art/sprites-src/<name>-vN.png`.
3. Add it to `tools/slice.py`, run, wire names, bump `sw.js` VERSION.
