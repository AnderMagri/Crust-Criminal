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
| `forest-walls-v1` | 4x2 | camp wall pieces: small log, medium log, small log upright, medium log upright, picnic table, picnic table rotated, boulder, boulder pair | x-props (`wl_*`) |
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

### forest-walls-v1 (`gpt-image-2.5-flare`, 4:3, 2K, transparent)
References: `forest-props-v1.png` + `forest-props-v2.png`.
```
Game sprite sheet on a fully transparent background, matching the exact kawaii art style of the reference images (thick dark-brown outlines, soft cel shading, pastel colors, tiny white highlights, slightly top-down 3/4 view). A clean 4 columns x 2 rows grid of 8 separate forest camp wall pieces, each centered in its own cell with generous empty transparent space between them, no overlapping, no text, no labels, no shadows on the background, nothing sitting on top of the pieces (no mushrooms, no jars, no food, no animals):
Row 1: (1) a SMALL fallen tree log lying sideways, short and chubby, about as long as it is tall, light brown bark with a few tiny moss patches, a pale cut ring visible on BOTH round ends, complete single object with a clear beginning and end; (2) a MEDIUM fallen tree log lying sideways, about twice as long as the small one, same bark, pale cut rings on BOTH round ends, clear beginning and end, nothing in the middle; (3) a SMALL fallen log lying pointing toward the viewer (long axis running vertically in the picture): the big pale round cut ring faces the viewer at the bottom, the far end rounded at the top, short; (4) a MEDIUM fallen log lying pointing toward the viewer, about twice as long as (3), ring end at the bottom, rounded far end at the top.
Row 2: (5) a wooden picnic table seen from the side with its long axis horizontal, tabletop plus two attached benches, simple warm brown planks, two tiles wide; (6) the same style picnic table rotated so its long axis runs vertically in the picture (seen from the short end, both benches visible left and right of the tabletop, extending away from the viewer); (7) a single chubby grey mossy boulder with a green moss cap, one object; (8) a pair of two small grey boulders touching each other with moss on top, one compact object.
Consistent scale: small log and boulder are roughly one tile, medium log and picnic table roughly two tiles. Cute, chunky, clean silhouettes.
```
How it is used: `genCamp()` (forest.js) cuts every wall run into whole pieces (1 or 2 tiles; horizontal runs first, then vertical) and `drawLog()` draws each piece once from its anchor tile. Sprite widths (world px) are in `tools/slice.py`. Nothing is placed on upright logs / rotated tables (`itemAt`). The old procedural log/rock drawing stays as a fallback while the atlas loads.

## Ideas for next sheets (not made yet)
- Forest: berry-bush hiding spot with peeking raccoon (currently reuses `h_bush`), river log variants, owl / squirrel decor.
- Moon: moon-specific floor decals (rover tracks, footprints), a bigger "base dome" decor, commander scared / dropped-item poses.
- Title screen: moon + forest key art matching the city splash.

## Round 6 (Oct 5): Dungeon, Ice, Gummy ice, Boss (character prompts verbatim; other sheets summarised per cell)
All: `openai/gpt-image-2.5-flare`, 4:3, 2K, transparent (tiles: opaque). Source PNGs downloaded by `tools/fetch-r6.sh` into `assets/_raw/r6/` (not sliced yet).
STYLE sentence (start of every prompt): `Game sprite sheet on a fully transparent background, matching the exact kawaii art style of the reference images (thick dark-brown outlines, soft cel shading, pastel colors, tiny white highlights, slightly top-down 3/4 view).`

| Sheet | Grid | Contents | References |
|---|---|---|---|
| `dungeon-chars-v1` | 4x3 | skeleton guard (front, side, back, alarmed); goblin (front, side, back, alarmed); troll (front, charge, stunned, roar) | forest-chars-v1, moon-aliens-v1 |
| `dungeon-props-v1` | 4x3 | pillar, barrel, crates, wall torch; bookshelf, cauldron, bone pile, candelabra; wall block, door arch (exit), mouse hole + cheese, cobweb + spider | forest-props-v1, moon-props-v1 |
| `dungeon-hide-v1` | 3x2 | barrel, treasure chest, stone coffin: empty (row 1) + raccoon peeking (row 2) | hiding-spots-v1, moon-hide-v1 |
| `dungeon-snacks-v1` | 4x2 | turkey leg, cheese wheel, blue cave mushrooms, cursed pumpkin pie; gold coin cookie, bone biscuit, goblin stew, purple potion jelly | snacks-v1, moon-snacks-v1 |
| `ice-chars-v1` | 4x3 | penguin guard (front, side, back, alarmed); polar bear (front, side, charge, stunned); ice-fisher penguin (front, side, back, alarmed) | forest-chars-v1, scared-enemies-v1 |
| `ice-props-v1` | 4x3 | igloo, ice blocks, snowman, snowy pine; snowdrift, ice crystals, ice hole, sled; snowy boulder, lantern post, fish signpost, bucket of fish | forest-props-v1, moon-props-v1 |
| `ice-hide-v1` | 3x2 | snowdrift hollow, ice-block nook, sled with blanket: empty + raccoon peeking | hiding-spots-v1, moon-hide-v1 |
| `ice-snacks-v1` | 4x2 | silver fish, ice cream cone, hot cocoa, snow cone; frost blueberry pie, candy cane, gingerbread penguin, dumpling | snacks-v1, moon-snacks-v1 |
| `ice-raccoon-v1` | 4x2 | raccoon with red scarf + pink earmuffs: front, side, back, shivering; peek front, peek side, tiptoe, laughing (first costume test) | raccoon-actions-v1, moon-raccoon-v1 |
| `ice-raccoon-walk-v1` | 4x3 | same costume walk cycle front / side / back x 4 | ice-raccoon-v1, moon-raccoon-walk-v1 |
| `gummy-props-v1` | 4x3 | gummy-candy version of the first ice stage: blue block, 2-stack, purple pillar, yellow wall; marshmallow drift, rainbow crystals, jelly water hole, gummy igloo; snowman, lime pine, lantern post, gummy ice nook | ice-props-v1, snacks-v1 |
| `gummy-chars-v1` | 4x3 | red gummy penguin guard (came out as a penguin, not a bear), gummy polar bear (front, side, charge, stunned), orange gummy penguin fisher | ice-chars-v1, snacks-v1 |
| `boss-v1` | 4x3 | Grand Chef Crumble: idle, idle arms up, side walk, back; wind-up, slam, charge, hit by pie; dizzy, furious phase 2, throw dough, defeated | enemies-sheet-v1, scared-enemies-v1 |
| `boss-items-v1` | 4x3 | pie ammo, spinning pie, cream splat, cherry splat; rolling pin, dough ball, flour puff, golden shockwave ring; brick oven, mixing bowl, flour sacks, pink heart (extra-life pickup) | snacks-v1, kitchen-props-v1 |
| `world-tiles-v1` | 4x2 | dungeon: flagstone, mossy flagstone, wall top, wall front; ice: snow, cracked ice, ice wall top, ice wall front. Came out tall (not square): crop the centre square when slicing | floor-tiles-v1 |

Prompt pattern used for the character sheets (dungeon-chars-v1; the ice and gummy ones swap the characters):
```
<STYLE> A clean 4 columns x 3 rows grid of 12 separate DUNGEON enemy poses, each centered in its own cell with generous empty transparent space between them, no overlapping, no text, no labels, no shadows on the background. All characters are chubby, cute and goofy, never scary.
Row 1: a chubby SKELETON guard with a tiny dented iron helmet and a wooden spear, bone-white with soft grey shading, big round eye sockets with little glowing blue dots: (1) front view standing, (2) side view walking facing right, (3) back view, (4) alarmed pose with a big surprised open mouth and one bony finger pointing up.
Row 2: a chubby GREEN GOBLIN with big pointy ears, a brown leather vest, a rusty dagger on his belt and a small loot sack: (5) front view standing, (6) side view walking facing right, (7) back view, (8) alarmed pose with both arms up and wide eyes.
Row 3: a big round, grumpy but cuddly TROLL guard with mossy grey-green skin, a tiny golden crown that is too small for his head, holding a giant wooden club: (9) front view standing, (10) charging fast to the right in side view, leaning forward with dust puffs, (11) dizzy and stunned, sitting down with spiral eyes and little stars circling his head, (12) roaring with a wide open mouth.
Same size and same colors for each character in every cell.
```
Boss prompt core: `...12 separate poses of the SAME giant chubby boss character 'GRAND CHEF CRUMBLE': a huge round baker with a very tall puffy white chef hat, a big curly golden mustache, rosy cheeks, tiny angry eyebrows, a striped apron and an oversized wooden rolling pin... Funny and cute, not scary.` followed by the 12 poses listed in the table.
Gummy modifier added after the STYLE sentence: `but everything is made of translucent GUMMY CANDY: glossy, squishy, jelly-like, semi-transparent, with bright candy colors (cherry red, orange, lemon yellow, lime green, grape purple, ice blue), shiny white highlights and a soft sugar-sparkle.`
Ice raccoon costume line: `The raccoon is dressed for the ICE WORLD: a cozy red knitted scarf with white stripes, pink fluffy earmuffs, and nothing else changed.`
Other sheets follow the grid sentence + `Row 1: (1)... Row 2: ...` recipe in templates.md. The full per-cell lists are in the Contents column above.
