# Krea prompt library — Crust Criminal

How every image and sound in the game was made, so a future session (or a future you) can make *matching* new assets.

Files here:
- `images.md` — sprite-sheet recipe, the sheet inventory (what each PNG in `assets/art/sprites-src/` contains and how it is sliced) and the exact prompts for the most recent sheets.
- `audio.md` — voice actors (ElevenLabs voice IDs), raccoon voice prompts, music prompts, SFX/ambience prompts, processing settings.

## Tools and settings

| What | Krea model | Settings |
|---|---|---|
| Sprite sheets | `openai/gpt-image-2.5-flare` | `aspect_ratio: "4:3"`, `resolution: "2K"` (2368x1760), `background: "transparent"`, `image_urls`: 1-3 style references |
| Character / enemy voices | `elevenlabs/tts` | `model_id: "eleven_v4"`, `voice_id` per character (see audio.md), emotion tags in square brackets |
| Raccoon + bear voices, short SFX / ambience | `bytedance/seed-audio-1.0` | prompt only (max 2048 chars); describe the voice, then say the line |
| Music loops | `elevenlabs/music-v2.5` | `force_instrumental: true`, `music_length_ms` 60000-72000 |

Jobs run async: submit, then poll `get_job` until `completed`; the result is `result.urls[0]`. Image jobs take ~30-60 s, audio 3-25 s.
Krea file URLs (`app-uploads.krea.ai`) are NOT reachable from the cloud sandbox; download them on the Mac (`curl`). `tools/fetch-assets.sh`, `tools/fetch-audio-round*.sh` and `tools/fetch-r4.sh` hold every URL used.

## The recipe that keeps the art consistent

1. **Always pass style references** via `image_urls`: the raccoon character sheet, the enemies sheet, and `kawaii-gameplay-mockup.png` (see `assets/art/style-explorations/`). For a new world also pass one existing sheet of that world (e.g. `moon-props-v1.png` when making more moon props).
2. **One sheet = one grid.** Ask for "a clean N columns x M rows grid of K separate objects, each centered in its own cell with generous empty transparent space between them, no overlapping, no text, no labels". `tools/slice.py` cuts the sheet by that grid, so the grid in the prompt must match the `cells(path, cols, rows, names)` call.
3. **Pair empty + occupied variants** in one sheet (e.g. hiding spot empty / with raccoon peeking) so the two stay pixel-matched. Say "the SAME ... but with ...".
4. **Style sentence** (start every image prompt with it): `Game sprite sheet on a fully transparent background, matching the exact kawaii art style of the reference images (thick dark-brown outlines, soft cel shading, pastel colors, tiny white highlights, slightly top-down 3/4 view).`
5. Describe each cell as `(n) a cute <thing> ...`, row by row (`Row 1: ... Row 2: ...`). Keep each description to one sentence.
6. After download: add the PNG to `assets/art/sprites-src/`, add its names/sizes to `tools/slice.py` (`extras()` or a new function), run it, check the atlas JSON, then wire names in `extras.js`.
7. Anything the raccoon wears on the moon: **round glass space helmet** (the glass dome is part of the sprite).

## Lessons learned

- Transparent background works, but check edges on a light and a dark backdrop before slicing.
- A walk cycle needs its own sheet (`moon-raccoon-walk`): 4 frames x 3 directions (front/side/back). One side frame came out front-facing and is skipped in `slice.py` (`walk[4]=''`).
- Characters read best when the prompt says "chubby", "round", "big shiny eyes", "tiny smile".
- Remove kitchen-flavoured props from non-kitchen worlds explicitly ("no pots, plants, plates") — the model drifts toward the references.
- Always delete nothing in Krea from the assistant side: unused assets are cleaned by hand. The "Crust Criminal" folder in Krea holds only assets used in the game.
