# Audio prompts

All clips are processed with a small script (trim silence, loudness-match, soft limit) — see "Processing" at the bottom — before going into `assets/voices`, `assets/sfx` or `assets/music`.

## Voice actors (ElevenLabs, `eleven_v4`)

| Character | Voice | `voice_id` |
|---|---|---|
| Cook A | Bill | `pqHfZKP75CvOlQylNhV4` |
| Cook B | Brian | `nPczCjzI2devNBz1zQrb` |
| Sous chef | Callum | `N2lVS1w4EtoT3dr4eOWO` |
| Cop | Chris | `iP95p4xoKVk53GoZ742B` |
| Ranger (all lines + scream) | Roger | `CwhRBWXzGAHq8TQ4Fs17` |
| Camper (all lines + scream) | Will | `bIHbv24MWmeRgasZH58o` |

Prompt style: one emotion tag in square brackets, then the line exactly as in the game text, e.g. `[shouting] HEY! Drop the pie, bandit!`, `[nervous] Is that a bear? [relieved] ...Nope, a stump.`, `[wailing] MY BLUEBERRY PIE!`. Tags used: shouting, angry, stern, grumbling, satisfied, proud, shrugs, gasps, panicked, scared whisper, wailing, sulking, disgusted, terrified scream.

## Raccoon (Seed Audio, prompt only)

The raccoon has no human voice actor; it is a "critter" voice. Seed Audio tends to give a deep man's voice, so say *high-pitched* explicitly.
```
A small chubby cartoon raccoon critter with a slightly high-pitched, raspy, nasal cartoon voice (not a deep man voice), mischievous and comedic, close to the mic, dry studio recording, no music, no sound effects, says: "<line>"
```
First-take version (lower voice — only OK for a gruffer line): `A chubby cartoon raccoon with a low, slightly raspy, mischievous comedic voice, close to the mic, dry studio recording, no music, no sound effects`.
Check: reference median F0 is about 250 Hz; re-record anything much lower.

## Bear (Seed Audio)
```
A big fluffy cartoon bear, very deep slow dopey voice, says happily: 'Pie for bear.' Comedic animated-movie bear, dry studio recording, no music, no sound effects.
```
Roar: `A big fluffy cartoon bear lets out a huge, funny, rumbling ROAR: 'GRRRAAAWR!' Comedic animated-movie bear, deep and loud but not scary, dry studio recording, no music, no background noise, about 1.5 seconds.`

## Music (ElevenLabs `music-v2.5`, instrumental)

Always end with: `Seamless loop with steady energy from start to end, no intro fade, no ending, no vocals.` Post-process with a 1.5 s crossfade tail->head so it loops.

- **Forest** (mellow — Ander asked for "calm adventure in the woods"): `Calm adventure in the woods. Very mellow, cozy cartoon video game background music for a cute forest level: soft fingerpicked acoustic guitar, gentle wooden flute melody, warm upright bass, light marimba and kalimba, soft shaker, airy pads. Peaceful, curious, whimsical, slightly sneaky, 88 BPM, relaxed.` (72 s)
- **Moon** (needs strong space elements): `Cute sneaky cartoon heist music in outer space on the moon. Strong space elements: wobbly theremin lead, retro sci-fi synth bleeps and bloops, laser 'pew' zaps, twinkling star chimes, spacey reverb, warm analog synth arpeggios, celesta, sputnik-style beeps, a funky plucky bass and soft brushed drums. Kawaii, mischievous, floaty retro-futuristic 1960s space-age vibe, 104 BPM.` (64 s)
- City: the original three tracks (title / main / pause) came from earlier rounds.

## Ambience and SFX (Seed Audio, "Sound effect only:" prefix)
- bird: `Sound effect only: a single small songbird sings a short cheerful chirp-chirp-tweet call in a quiet forest, close and clear, no music, no speech, no other background noise, about 1.5 seconds.`
- bird 2 (robin warble), owl (`hoo-hoo` twice), woodpecker (rapid taps), cuckoo (`cuck-oo` twice) — same pattern.
- moon bleep: `Sound effect only: a cute retro sci-fi computer bleep-bloop sequence, like a 1960s space station console chirping, short and playful, no music, no speech, about 1.5 seconds.`
- airlock: `Sound effect only: a soft airy space-station hiss of an airlock venting, followed by a gentle radar ping, retro sci-fi, no music, no speech, about 2 seconds.`
In game they play at random every 5-14 s (forest) / 9-21 s (moon), panned left/right, quiet.

## Processing (what `proc.py` did)
- Voices: trim silence (threshold .012), speech RMS -> -16 dB, tanh soft limiter, mp3 96k mono.
- SFX / ambience: trim, peak-normalise to -3 dB, mp3.
- Music: stereo 128k, mean level about -19 dB (matches the main theme), 1.5 s crossfaded loop.
