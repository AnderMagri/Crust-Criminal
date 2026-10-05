> Full plan: see `docs/roadmap.md` (Oct 5). This file keeps the notes behind it.

# Crust Criminal: next up (Oct 5 plan)

Done in round 6: lives + secret hearts, chase warning, snack power-ups, star ratings. See `docs/project-context/CONTEXT.md`.

## Queue (agreed order)
1. **Dungeon world**: skeletons and goblins, funny quotes. Hide spots: barrels, coffin lids, treasure chests. Snacks: turkey legs, mushrooms, cheese wheels. Pie = "cursed pumpkin pie". Home = a cosy hole in the wall.
2. **Ice world**: penguins (the patrol cooks) and polar bears (the chargers, like forest bears). Hide spots: snowdrifts, igloo corners, ice blocks. Slippery tiles on the river-equivalent stage. Honey-like bait: fish bucket (penguins and bears rush to eat).
3. **Boss stage**: one big arena, a large health bar, you hit him by throwing pies. Pie pickups spawn around the arena, he charges and sweeps, 3 phases. Uses the lives system (2 hearts + hidden heart).
4. **Costumes**: see below.

## Costumes: how hard?
- Easy (cheap): accessories drawn on top of the existing sprites (hat, bandana, sunglasses, cape). Needs a head anchor per sprite frame (walk x12, actions, hide peeks). A small table of offsets, about a day of tuning. No new Krea sheets for the body.
- Medium: recolors / palette swaps of the whole raccoon (ninja black, golden). Cheap in code, only needs a shader-style tint on the sprite sheet.
- Hard: full body costumes (chef, astronaut, pirate): needs a full set of Krea sheets per costume (walk x3 directions, actions, hide peeks, scared poses) and consistency checks. About 4 to 6 sheets each.
- Suggested unlock: a costume per world completed with 3 stars, or per secret hearts found.

## Balancing notes
- Par times are guesses; collect real completion times and adjust `PAR` in gameplay.js.
- Watch if the 0.75 s alert wind-up makes dogs too easy to escape.

## Art status (Oct 5): all Krea sheets for the next three worlds are generated
15 sheets in `assets/art/sprites-src/`: dungeon-chars/props/hide/snacks-v1, ice-chars/props/hide/snacks-v1, ice-raccoon-v1 + ice-raccoon-walk-v1 (scarf + earmuffs, the first costume), gummy-props-v1 + gummy-chars-v1 (gummy-candy look for the first ice stage), boss-v1 + boss-items-v1 (Grand Chef Crumble, pie ammo, splats, extra-life heart), world-tiles-v1. Prompts and grid layouts are in `docs/krea-prompts/images.md` (Round 6). Next step is slicing them into atlases (`tools/slice.py`) and building the world modules.
- world-tiles-v1 tiles came out tall, not square: centre-crop when slicing.
- gummy-chars-v1 row 1 is a red gummy penguin, not a gummy bear.

## Round 7 status (worlds + bonus modes)
- Built: Dungeon, Ice (gummy-cave first stage, light falling snow dots), Noir (greyscale, pie stays red) worlds on a generic theme layer (tools/src/worlds.js); Boss fight, Monster chase, Bin Racers bonus modes (tools/src/modes.js), launched from title buttons.
- Placeholders still to replace: closed hiding-spot art ('hc_<type>' sprites; the game already uses them when they exist, otherwise shows the empty one), noir closed hide (Krea credits ran out), music loops for dungeon/ice/noir/boss/frank/kart (tracks fall back to the main theme), recorded voices for the new characters (text bubbles + synth blips for now; "Holy pie!" held), sung "Cannoli, cannoli, da pie is-a mine-a!" clip.
- index.html is the single source of truth (worlds + modes are inlined; edit it directly). Atlases come from tools/slice_r7.py; tools/mktest.sh makes dist-test.html with the __api hooks for Playwright checks.
- Image sheets (raw, assets/art/sprites-src): dungeon/ice/gummy/boss/noir/frank/kart chars, props, snacks, hides, tiles (all openai gpt-image-2.5-flare, 4:3 2K, transparent bg except tile sheets).
