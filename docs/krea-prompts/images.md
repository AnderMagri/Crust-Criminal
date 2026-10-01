# Image sheets

Layout = columns x rows, names listed row by row (left to right). Source PNGs live in `assets/art/sprites-src/`; sizes (`w`/`h` = target tile width / height in game pixels) come from `tools/slice.py`.

## Inventory

| Source PNG | Grid | Contents (in order) | Atlas |
|---|---|---|---|
| `forest-chars-v1` | 4x3 | bear (front, side, back, charge, stunned, roar); ranger (front, side, back, alert); camper (front, side) | forest-sprites |
| `forest-props-v1` | 4x3 | pine, oak, bush, stump, rock, campfire, tent, picnic table, honey pot, mushrooms, tall grass, den | forest-props |
| `forest-props-v2` | 4x2 | blueberry pie, berry, fish, acorn, honeycomb, s'more, lantern post, signpost | x-props |
| `hiding-spots-v1` | 4x3 | box, basket, tablecloth table, trash bags, log, bush — each empty + with raccoon peeking | x-props |
| `raccoon-actions-v1` | 4x2 | sneak (2), BOO arms-up, duck, pop out, soggy, laughing, start pose | x-sprites |
| `scared-enemies-v1` | 4x3 | cook / sous / cop / dog / ranger / camper: jump-scared + running away | x-sprites |
| `moon-raccoon-v1` | 4x2 | helmet raccoon: front, side, back, floating, peek front/side, tiptoe, extra | x-sprites |
| `moon-raccoon-walk-v1` | 4x3 | helmet raccoon walk cycle: front / side / back x 4 frames | x-sprites |
| `moon-aliens-v1` | 4x3 | alien (front, side, back, alarm), commander (4 poses), blob (front, side), drone, alien jump | x-sprites |
| `moon-props-v1` | 4x3 | rock, crater, crates, dish, rover (2 frames), crystal, cactus-plant, console, dome, flag | x-props |
| `moon-rocket-home-v2` | 1x1 | rocket-shaped trash can (the home), sitting on the ground, no fire | x-props |
| `moon-snacks-v1` | 4x2 | galaxy pie, Saturn donut, moon cheese, star candy, crater cookie, ice-cream sandwich, space-food tube, alien jelly | x-props |
| `raccoon-sneak-v1` | 3x2 | raccoon HEAD only, sneaky half-closed eyes: look left, center, right; blink; one-eye peek; "shh" up-right. Cut into `assets/art/sneak-0..5.webp` (same canvas, 104 px high) for the HIDDEN pill | (loose webp) |
| `moon-hide-v1` | 3x2 | alien cookie jar (green), alien cookie jar (purple, three eyes), moon-rock pile empty / peeking, crashed pod empty / peeking | x-props |

Older sheets (city/kitchen/street): `kitchen-props-v1`, `kitchen-fixtures-v1`, `snacks-v1`, `counter-items-v2`, `floor-tiles-v1` and the raccoon / enemies / props sheets feeding `sprites.webp` / `props.webp` / `tiles.webp`.
The prompts for the first three rounds were typed straight into Krea and not saved verbatim — the layouts above and the recipe in README.md reproduce them closely. From round 4 on, every prompt is stored below.

## Exact prompts (round 4)

References used for both: `snacks-v1.png` + `forest-props-v2.png` (snacks), `hiding-spots-v1.png` + `moon-raccoon-v1.png` + `moon-props-v1.png` (hide sheet).

### moon-snacks-v1 (`gpt-image-2.5-flare`, 4:3, 2K, transparent)
```
Game sprite sheet on a fully transparent background, matching the exact kawaii art style of the reference images (thick dark-brown outlines, soft cel shading, pastel colors, tiny white highlights, slightly top-down 3/4 view). A clean 4 columns x 2 rows grid of 8 separate SPACE / MOON themed snacks, each centered in its own cell with generous empty transparent space between them, no overlapping, no text, no labels, no shadows on the background:
Row 1: (1) a cosmic 'galaxy pie' - a round pie with golden lattice crust and glowing purple-blue galaxy filling with tiny stars peeking through, (2) a ringed-planet donut that looks like Saturn - pink frosted donut with a golden ring around it and sprinkles, (3) a wedge of yellow moon cheese with crater holes, (4) a star-shaped candy, glossy yellow with a cute shine.
Row 2: (5) a crater cookie - round grey-beige cookie with little crater dents and chocolate chips, (6) a freeze-dried astronaut ice cream sandwich in a silver foil wrapper half-open, (7) a squeezable space-food tube, silver with a red cap and a little star label, (8) a wobbly green alien jelly dessert with two antennae.
```

### moon-hide-v1 (`gpt-image-2.5-flare`, 4:3, 2K, transparent)
```
Game sprite sheet on a fully transparent background, matching the exact kawaii art style of the reference images (thick dark-brown outlines, soft cel shading, pastel colors, tiny white highlights, slightly top-down 3/4 view). A clean 3 columns x 2 rows grid of 6 separate objects, each centered in its own cell with generous empty transparent space between them, no overlapping, no text, no labels:
Row 1: (1) a cute COOKIE JAR shaped like a chubby green alien head - round glass jar body with chocolate-chip cookies visible inside, the lid is the alien's head top with two bobbly antennae, big shiny alien eyes and a tiny smile on the glass; (2) the same alien cookie jar idea in lavender purple with three eyes and one antenna; (3) a pile of grey lunar moon boulders with craters, forming a little rocky hiding nook (empty).
Row 2: (4) the SAME grey lunar boulder pile, but with the chubby grey raccoon from the reference wearing his round glass space helmet peeking out from behind the rocks, only his helmet, ears, mask and eyes visible; (5) a small crashed silver space capsule pod lying on its side, round porthole, little dents, empty, used as a hiding spot; (6) the SAME crashed space capsule pod with the raccoon in the round glass space helmet peeking out of the open hatch, only helmet, ears, mask and eyes visible.
```

### raccoon-sneak-v1 (`gpt-image-2.5-flare`, 4:3, 2K, transparent)
References: `raccoon-actions-v1.png` + `hiding-spots-v1.png`.
```
Game UI sprite sheet on a fully transparent background, matching the exact kawaii art style and the exact chubby grey raccoon character from the reference images (thick dark-brown outlines, soft cel shading, tiny white highlights, same grey fur, same dark mask, same white muzzle, same round ears). Only the raccoon HEAD, front view, centered in each cell, same size in every cell, no body, no helmet. A clean 3 columns x 2 rows grid of 6 separate head portraits with generous empty transparent space between them, no overlapping, no text, no labels. The raccoon is playing hide-and-seek like a sneaky child: heavy half-closed sleepy sneaky eyelids, eyes only open as thin slits, a tiny mischievous smirk.
Row 1: (1) sneaky half-closed eyes, pupils glancing far to the LEFT; (2) sneaky half-closed eyes, pupils looking straight ahead at the center; (3) sneaky half-closed eyes, pupils glancing far to the RIGHT.
Row 2: (4) eyes fully shut in a blink, same smirk; (5) one eye shut and the other half-open slit peeking to the left, cheeky; (6) eyes almost shut, pupils glancing up-right, tiny worried 'shh' pursed lips.
```
Slicing: crop each cell to its alpha bounding box, paste on one shared canvas (so the face does not jump between frames), resize to 104 px high, save webp. In game: `sneakTick()` in index.html cycles the frames on a 6 s loop.

## Ideas for next sheets (not made yet)
- Forest: berry-bush hiding spot with peeking raccoon (currently reuses `h_bush`), river log variants, owl / squirrel decor.
- Moon: moon-specific floor decals (rover tracks, footprints), a bigger "base dome" decor, commander scared / dropped-item poses.
- Title screen: moon + forest key art matching the city splash.
