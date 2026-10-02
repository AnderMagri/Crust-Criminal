# Crust Criminal

A kawaii stealth game for phones, played in portrait. A chubby raccoon sneaks into a
kitchen, steals a pie and runs home with it without getting caught.

**Play it:** https://andermagri.github.io/Crust-Criminal/

It installs as an app from the browser ("Add to Home Screen") and works offline after the
first visit.

## How to play

- **Phone:** drag anywhere to move, tap to jump. A second finger also jumps while you steer.
- **Keyboard:** WASD or arrows to move, Space to jump, Esc or P for the pause menu,
  R to restart, M to toggle voices, N to toggle music.

Every run has two parts: grab the pie and find the exit, then cross the outdoors to get home.
Levels are generated fresh each time, and your best time is saved per world.

## What's in the game

- **Three worlds**, picked on the title screen:
  - **City:** a restaurant kitchen (a maze of counters, ovens, fridges and shelves), then a
    street with roads, parks and fences. Home is your trash can.
  - **Forest:** a campsite of logs, tents and campfires with rangers, a camper and bears,
    then a river you cross on floating logs. Home is a hollow log.
  - **Moon:** a moon base of boulder corridors with aliens and their commander, then a
    crater field with rovers. Jumps float in low gravity. Home is a rocket.
- **Enemies with vision cones.** Break line of sight and they lose you. The sous chef, the
  camper and the commander call everyone else when they spot you. Bears charge in a straight
  line and stun themselves if they hit something.
- **Jumping.** Vault over counters, fences, hedges and bins. Knocking pots, jars or plates off
  a counter is loud and draws attention (orange arrows warn you before you jump).
- **Energy.** Moving drains it (faster with the pie) and each vault costs a bite. Low energy
  slows you down. Snacks refill it, but munching is loud. A golden donut gives a sugar rush.
- **Hiding spots.** Walk up to a box, basket, bush, log or pile of rocks and the raccoon hops
  in by himself. Enemies can't see him until he moves.
- **BOO!** Sneak up behind a calm enemy and jump: they scream, drop a snack and run, but the
  scream brings others to look. Don't try it on a bear.
- **Outdoors hazards.** Cars and rovers (some brake and honk), dogs, a police officer,
  sometimes a police dog, and a cook who bursts out the door after you.
- **Audio.** Recorded music for each world, recorded voices for each character, sound effects
  and ambience. A line with no recording is spoken as synthesized "babble".

## Running it locally

The game is a single `index.html` with no build step. Serve the folder with any static web
server (audio does not load from a `file://` page):

```bash
python3 -m http.server 8000
```

Then open http://localhost:8000.

## Project layout

- `index.html` – the whole game (HTML, CSS and JavaScript)
- `sw.js` – service worker for offline play; bump `VERSION` on every release
- `manifest.webmanifest` – install settings
- `assets/art/` – sprite sheets, props, tiles, splash and logo
  (`sprites-src/` holds the original sheets that `tools/slice.py` cuts up)
- `assets/music/`, `assets/voices/`, `assets/sfx/` – audio
- `assets/fonts/` – Titan One and Figtree, self-hosted
- `tools/` – asset scripts
- `docs/` – project notes

Art was generated with Krea; music and voices with ElevenLabs and Seed Audio through Krea.
The prompts are in `docs/krea-prompts/`.

## License

© 2026 Anderson Magri / BlockMagic Studio. All rights reserved.

This repository is public so the game can be played and its making can be seen, but it is
**not open source**. You may not copy, redistribute, modify or reuse the code, artwork,
characters, music, voices or name without written permission. See [LICENSE](LICENSE).

## More

`docs/project-context/CONTEXT.md` explains how the code is organised, the release steps and
the design decisions made so far. Read it before changing the game.
