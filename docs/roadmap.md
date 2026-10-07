# Crust Criminal: roadmap (saved Oct 5, 2026)

Status legend: [art] Krea sheets generated, [code] built in the game, [audio] music + voices done.

## Shipped
- City (kitchen + street), Forest (camp + river), Moon (base + crater field).
- Round 6 gameplay: lives (2 per part) + one secret heart per part, chase warning, snack power-ups (cookie = Sneaky Paws, burger = Full Belly, donut = Sugar Rush), star ratings (pie home / spotted at most 2 times / under par time). See `docs/project-context/CONTEXT.md`.

## Worlds (build order)
1. **Dungeon**: skeleton guards, goblins, troll (charges like the bears). Funny quotes. Cursed pumpkin pie. Hide: barrel, treasure chest, coffin. Home: a cosy hole in the wall. [art done] [code] [audio]
2. **Ice**: penguin guards, ice-fisher penguins, polar bears (charge). The first stage is the **gummy-candy** version (gummy props, red gummy penguins, gummy polar bear). Fish bucket works like the honey jar: penguins and bears rush to eat. Raccoon wears scarf + earmuffs here (first costume). [art done] [code] [audio]
3. **Boss: Grand Chef Crumble**: one arena, a big health bar, hit him by throwing pies. Pie pickups spawn around the arena, he winds up and slams, charges, throws dough; 3 phases (furious phase 2 at 60% health, flour clouds at 30%). Uses lives + secret heart. [art done] [code] [audio]
4. **Noir (1920s)**: gangsters with an Italian accent (affectionate parody: pies, cannoli, the family recipe; no ethnic jabs), mob boss Don Cannoli, flatfoot cops. The whole game goes black and white with contrast and film grain; **the red cherry pie stays red**. Music: swing / jazz with mandolin and accordion. [art] [code] [audio]
5. **Frankenstein chase (noir style)**: auto-run chase away from the camera down a lab corridor. Frankenstein's monster and his mad-scientist master chase you. Steer between lanes, jump obstacles, duck lightning. Hearts apply. [art] [code] [audio]
6. **Bonus: Bin Racers**: top-down race (Rock n' Roll Racing / Micro Machines feel), the raccoon drives a rocket-powered trash can on wheels. 8 pie slices ride on the back: every hit knocks one off onto the track (rivals can eat it), pickups on the road bring slices back. Stars from finish position + slices left. Rivals are enemies from each world in their own vehicles (cook in a pot, penguin on a sled, skeleton in a coffin on wheels...). Surf-rock soundtrack. Unlock: finish every world with 3 stars. [art] [code] [audio]

## Costumes
- Accessories drawn on top of the sprites (hat, bandana, shades): about a day of tuning per set.
- Palette recolors (ninja, golden): cheap.
- Full-body costumes: 4 to 6 Krea sheets each. First one done: scarf + earmuffs (ice).
- Unlock idea: one costume per world cleared with 3 stars.

## Engine work needed
- Generic themed world generator (kitchen-layout + street-layout with per-world sprite names, tiles, music, enemies), based on how Moon works.
- Noir filter: grayscale + contrast + grain pass on the final canvas, with an exception mask for the pie and secret hearts.
- Runner mode (Frankenstein) and Racer mode (Bin Racers): two new game modes sharing HUD, lives, stars.
- Boss mode: arena, projectile pies, health bar, phases.

## Balance notes
- `par` times (in the `WORLDS` table) are guesses; adjust from real playtests.
- 0.75 s alert wind-up: watch if dogs become too easy to escape.

## Update, Oct 5 (build v67)
- Bin Racers: code removed, art kept. A different kind of race may be designed later.
- Monster chase: now a boss fight. Hit the mad scientist in his control room with pies while the monster chases you; floor zaps from his experiments. [code done] [audio]
- Boss fight (Chef Crumble): bigger chef, game interface. [code done] [audio]
- Noir: black-and-white filter removed (it hid the coloured snacks; the cars did not suit it either).
- Dungeon: the best of the new worlds, but needs a lot more work. Rolling barrels replaced by saw blades (drawn in code for now). Art to refine when Krea credits are back: saw blade + groove, and a general pass.
- Ice: snowy ground with slippery ice patches instead of the gummy cave. Art to refine later (snow walls currently reuse the snow-drift prop).
