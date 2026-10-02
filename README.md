# Crust Criminal

A portrait, pixel-art stealth game for phones. A chubby raccoon sneaks into a restaurant
kitchen through a window, steals a cherry pie, escapes out the back door and crosses the
street to get home to its trash can.

## Play

Open `index.html` in a browser (phone held upright works best).

- Drag anywhere to move, tap to jump over counters, fences, hedges and bins
- Keyboard: arrows / WASD to move, Space to jump, M voices, N music, R restart

## What's in the game

- **Kitchen:** random maze of counters, ovens, fridges and shelves. Five cooks with
  different speeds plus a faster sous chef who whistles for the whole kitchen.
  Jumping a counter with pots or plates on it knocks them off and draws attention
  (orange jump arrows warn you).
- **Energy:** a snack bar drains as you move (faster with the pie) and each jump costs a bite. Low energy slows you and stops vaulting. Eat candy, cookies, chocolate, fries and burgers along the way; munching is loud, so cooks may come looking. A rare golden donut gives a sugar rush.
- **Street:** random roads, parks and fence blocks. Cars, dogs, two police officers,
  sometimes a police dog (faster than you), and a cook who chases you out the door.
- **Audio:** recorded music (one theme per world, plus title and pause themes), recorded
  voices per character and recorded sound effects, all played through Web Audio. Anything
  that has no recording, or fails to load, falls back to synthesized music, effects and
  gibberish "babble" with speech bubbles.
- **Worlds:** City, Forest and Moon, picked on the title screen. Hiding spots and a
  sneak-up "BOO!" work in all three.

## Assets

Generated with Krea (images) and ElevenLabs / Seed Audio via Krea (music, voices).
Run `tools/fetch-assets.sh` to download them into `assets/`:

- `assets/art/title-3d.jpg` – 3D cartoon key art for the title screen (current choice)
- `assets/art/title-pixel-*.png` – earlier pixel-art title explorations
- `assets/music/main-theme.mp3` – produced orchestral caper theme for title/menus
- `assets/voices/raccoon-*.mp3` – the raccoon's recorded lines, played in-game (falls back to babble if missing)
- `assets/voices/*-sample.mp3` – voice casting samples for the chef and the cop

## More

`docs/project-context/CONTEXT.md` describes how the game is put together, the release steps
(bump `VERSION` in `sw.js`) and the design decisions made so far.
