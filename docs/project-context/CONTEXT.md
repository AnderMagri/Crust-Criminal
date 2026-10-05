# Crust Criminal — project context (read this first)

A kawaii mobile-browser stealth game: a chubby raccoon steals a pie from a restaurant kitchen and runs home through the street. Built by Ander (Lighthouse Creative Lab) with Claude. Live at https://andermagri.github.io/Crust-Criminal/ (GitHub Pages, repo `AnderMagri/Crust-Criminal`). Installable PWA.

## How the game plays
- Top-down, 16 px tiles, single canvas, one `index.html` (no build tool, no framework). Touch joystick (drag anywhere) + jump button; keyboard WASD/arrows + Space.
- Two scenes per run: **kitchen** (maze of counters, 5 cooks with vision cones; grab the pie from a counter, escape through the back door) then **street** (roads with cars, parks, dogs, a cop; reach home = the trash can).
- Three worlds, picked on the title screen (City / Forest / Moon; saved in `localStorage` key `pieheist-world`):
  - **City** — kitchen + street.
  - **Forest** — campsite maze (logs, tents, campfires), rangers + a camper + bears; the "street" is a river with floating logs to hop across; blueberry pie.
  - **Moon** — moon base (boulder-wall corridors, aliens + a commander), then a crater field with rovers; the raccoon wears a glass helmet, low gravity (bigger, slower jumps), home is a rocket-shaped trash can with smoke; galaxy pie.
- **Energy** drains while moving, refills by eating snacks (sugar rush when full). Jump over small obstacles / knock items off counters.
- **Hiding spots** (box, basket, table, bags, log, bush; moon: rocks, crashed pod): walk next to one and the raccoon hops in automatically; enemies can't see him; move to pop out. Screen vignette + the energy pill turns purple "HIDDEN" with an animated sneaky raccoon face.
- **BOO!**: sneak up behind a calm enemy and jump — they scream, drop a snack and run; nearby enemies investigate. Bears charge instead.
- Cars brake and honk at the raccoon about half the time.
- Audio: recorded voices (per-character), recorded music per world, SFX, random ambience (forest birds, moon bleeps). Two voice lanes (one speaker may overlap another's tail).

## Repo layout
```
index.html            the whole game (HTML + CSS + JS, ~3000 lines, IIFE)
sw.js                 service worker (cache VERSION must be bumped on every release: cc-vNN)
manifest.webmanifest  PWA manifest
assets/art/           sprites.webp props.webp tiles.webp (city), forest-*.webp, x-*.webp (+ .json atlases), sneak-*.webp, splash, logo
assets/art/sprites-src/   the raw Krea sheets (inputs to tools/slice.py)
assets/voices|sfx|music/  mp3s (processed)
assets/fonts/         Titan One (titles) + Figtree (text), self-hosted woff2
assets/_raw/          raw Krea downloads (git-ignored)
tools/                slice.py (sheets -> atlases), fetch-*.sh (Krea URLs), build.py + head.html (see below)
docs/krea-prompts/    how every asset was generated (read before generating anything)
docs/project-context/ this file
docs/next-up.md       older plan for hiding/BOO (now implemented)
```

## Source structure inside index.html (important)
- Everything is inside one IIFE. **Later `function` declarations override earlier ones** — much of the game is layered: base city code, then the "forest" module, then the "extras" (round 3+) module, all injected between `// ===== FOREST BEGIN =====` / `// ===== EXTRAS BEGIN =====` markers, right before `// ---------- loop ----------`.
- The extras/forest modules were authored as separate files (`extras.js`, `forest.js`, with `__XSPR__`, `__XPROP__`, `__FSPR__`, `__FPROP__` placeholders for the atlas JSON) in a cloud workspace and injected. **In this repo only the injected result exists** — edit `index.html` directly (search for the function names below).
- World switch: `S.world` is `undefined` (city) / `'forest'` / `'moon'`; `S.kind` is `'kitchen'` / `'street'`. `W3(city, forest, moon)` picks text per world. Tile characters: `C` counter/wall, `.` floor, `K` hiding spot, `w` water, `G` tall grass, `P` pie, `D` door, `Q` window/gate.
- Scenes are generated: `genKitchen`, `genStreet`, `genRiver`, `genCamp` (forest), `genMoonBase`, `genMoonField`. Sprites drawn by `drawSpr`/`drawPropImg` from atlases (`SPR`, `PROP`, entries `[x,y,w,h,ax,ay,ppu]`).
- Key functions: `updatePlayer`, `hideTick` (auto-snap hiding), `tryBoo`/`booTarget`/`scaredTick`, `updateStreet` (cars brake + honk), `say`/`playClip`/`laneMode` (voices), `musicTick`/`wantTrack` (per-world music), `fit` (layout), `drawMoonTile`/`drawPanel`/`moonBg` (moon look), `sneakTick` (hidden-pill face).
- Voice mapping: `COON_VO` maps raccoon line text -> `raccoon-<name>.mp3`; `ENEMY_VO[vo][text]` -> filename (vo keys: cookA, cookB, sous, cop, ranger, camper, alien, cmdr, bear). A line with no recording falls back to synthesized babble.

## Build / release workflow
1. Edit `index.html`. Test with Playwright against a local server (`python3 -m http.server`).
2. **Bump `VERSION` in `sw.js`** and add any new asset to its `ASSETS` list. The SW is network-first for the page, cache-first for assets; the page auto-reloads on update.
3. Commit, push from GitHub Desktop; Pages deploys in about a minute.
4. Players with an old copy may need to clear it once (service worker).
(The page `<head>` — viewport, manifest, icons — lives in the committed `index.html` itself. If you ever rebuild from a body-only source, prepend `tools/head.html`: `python3 tools/build.py <src> <out>`.)

## HUD
One solid bar at the **bottom** of the screen (the game canvas sits above it): clock pill, energy pill (heart + bar; when hidden: purple heart, "HIDDEN", sneaky raccoon face), voices / music / pause buttons. `#hideVig` is the hiding vignette. Quit button in the menu and on the title screen.

## Decisions Ander made (keep consistent)
- Movement is free (no forced centering on the grid) — "snappy".
- No "Find the pie" text in the HUD; stable clock width.
- Titan One for titles, Figtree for text; title screen has the City / Forest / Moon picker under the logo.
- Difficulty is deliberately gentle: kitchen 5 cooks, street max 2 dogs + 1 cop, K9 only 20% of runs, forest 1 ranger on the banks.
- Moon should feel like a **lunar surface**, not a kitchen in space: crater floors, boulder-wall corridors (more open than the kitchen maze), no pots/plants/teapots; cookie jars are alien-shaped.
- Forest quotes are bear puns; moon quotes are space jokes ("one small hop for a raccoon..."). Forest music is mellow; moon music has clear space elements.
- Hiding should snap (auto hop-in); vignette while hidden is approved ("perfect").
- Krea clean-up: only assets used in the game are kept, in the Krea folder "Crust Criminal"; Ander deletes unused ones by hand (the assistant should not delete from Krea).

## Open ideas / not done
- Ranger/bear/camper recorded lines cover most but not all text; remaining lines use babble.
- Forest: dedicated berry-bush hiding art; more ambience.
- Moon: floor decals, footprints, scared-commander poses, a proper EXIT look for the open airlock (still the kitchen doorway art).
- Title key art for Forest and Moon.
- Score / best-time per world exists (`bestKey`); no leaderboard.
- Capacitor wrapper for app stores (Quit already tries `exitApp`).

## Who / where
Ander — freelance product designer, studio Lighthouse Creative Lab. Mac repo path: `~/Documents/GitHub/Crust-Criminal`. Work happens in Claude (Cowork): assets are generated through the Krea MCP, files committed to the Mac with the device bridge; push is done by Ander in GitHub Desktop.

## Placement rules (no overlapping objects)
- Hiding spots (`placeHides` in extras.js): a hide sprite is ~20 px tall and reaches into the tile above, so the tile above it (and the one above that, and the two upper diagonals) must be open floor — no counter/jar, table, tree, boulder, building, door, window, pie, water, lamp or another hide. Falls back to looser levels only if fewer than 3 spots fit. Verified on 10 city, 10 forest, 5 moon levels (0 violations).
- When adding any new placed object, give it the same kind of rule and test it by generating many levels.
- Exit safe area: no hiding spot within 4 tiles (any direction) of the exit — the kitchen/moon-base door (`S.door`) or the trash-can/rocket home (`S.home`). Music loops are mixed at TRACK_VOL ≈ 1 (was 1.5) — lower again in index.html if still too loud.
- Audio mix: music bus level `MUSV` = .3 and it is ducked to 45% while any voice clip plays (`duckMusic` in `playClip`). The old chase tempo-nudge (playbackRate 1.06) was removed — it made the music seem to speed up and slow down.
- Title screen: the pixel canvas raccoon (`#titleArt`) is hidden unless splash.jpg fails; no enemy chatter on the title (only the raccoon's one opening line).
- Pause menu: tapping outside the card resumes; "Quit game" exists only on the title screen ("Quit to title" stays in pause).
- Forest: tall-grass hiding tiles (`G`) were removed — logs and bushes are the hiding spots. Knocking over a honey jar spills honey (`honeySpill`, forest.js): any bear within ~190 px drops what it is doing (even a chase), walks to the puddle, eats for ~6.5 s and then forgets the raccoon.
- Caught / heist-complete cards show a 'Quit to title' button next to the tap-to-retry action (intro cards don't).
- Forest camp walls are a mix of fallen logs and mossy boulders (`drawLog` / `drawForestRock` in forest.js; `wallIsLog` picks the material per 2x2 block). Logs are drawn as cylinders (side view for horizontal, vertical cylinder with a ring end facing the viewer); rocks are one lumpy boulder per tile in vertical runs.
- Logs have a beginning and an end: in genCamp any tree / tent / fire pit that sits in line with (or between) wall pieces is turned into wall, so nothing stands in the middle of a log. Log end rings are drawn between the ring centres so no outline pokes past the corners.

- Forest camp walls are now image pieces (round 5, `forest-walls-v1`): small logs, medium logs (single images), picnic tables and boulders, cut from each wall run in `genCamp` (`s.pieces`, `s.pieceAt`). Procedural log drawing (`drawLogProc`) is only a fallback.

## Round 6: lives, hearts, warning, power-ups, stars (gameplay.js)
- Source: `gameplay.js` is injected by `tools/inject.py` (FOREST > EXTRAS > GAMEPLAY markers in the workspace index.html); small hooks live in index.html (`loadScene` -> `gpScene`, `newRun` -> `gpRun`, `caught`, `toAlert`, `eatSnack`, `win`, `onAction`, `render`).
- Lives: each part (kitchen / street) starts with 2 hearts (`LV.lives`, max 3). Caught = lose a heart, respawn at the part start (`gpLoseLife`), enemies reset, 2.8 s of safety (`LV.inv`, `grace`). Out of hearts = Busted card: kitchen restarts the heist, street retries the street (pie kept, hearts back to 2, clock keeps running).
- One hidden secret heart per part (`S.heart`, `gpScene`): placed on a tucked-away floor tile (next to a wall or hiding spot), away from start / pie / exits / spawns, never on road/water/hiding tiles. Only a faint sparkle shows from ~110 px, the heart itself fades in under ~50 px. +1 heart (or +30 energy if full).
- Hearts HUD is drawn in the canvas top-left (`gpHud`), small, so the bottom bar stays unchanged.
- Chase warning: alert wind-up is now 0.75 s (was 0.45), red screen-edge pulse (`LV.warn`), off-screen pointer arrow also for alerting enemies. If you break line of sight / hide before the wind-up ends, the enemy only searches instead of chasing.
- Snack power-ups: donut = Sugar Rush (existing), cookie = Sneaky Paws 7 s (enemy view x0.6, no munch noise), burger = Full Belly 12 s (energy drains at 40%). Label shows in the energy pill.
- Stars (`gpStars`, per world, best saved in `pieheist-stars-<world>`): 1 = pie home, 2 = spotted at most 2 times, 3 = under par time (`PAR` = city 130 s, forest 150 s, moon 170 s; tune after real playtests). Win card shows them plus hearts found.
