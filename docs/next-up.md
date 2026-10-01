# Crust Criminal — next up (needs Krea credits)

## 1. Hiding spots

Places the raccoon can duck into. While hidden, enemies can't see him unless they bump right into him (same rule the forest tall grass already uses — `sees()` returns false).

**Where**
| World | Hiding spots |
|---|---|
| Kitchen | cardboard box, laundry basket, table with a long tablecloth |
| Street | cardboard box, trash-bag pile, big bush (existing hedge art can stay) |
| Forest | tall grass (done), hollow log, berry bush |

**Rules**
- Walk into a hiding tile and stop → hidden after 0.25 s. Moving out, jumping or eating breaks cover.
- Can't hide while an enemy is already chasing you within 40 px (no "panic-hide" exploit), but you *can* hide to break a chase once out of sight.
- Max 1 raccoon per spot, obviously.

**Animation (so players instantly get it)**
1. Duck-in: squash down 120 ms, little rustle puff (leaves/paper bits), soft "fwip" SFX.
2. Hidden idle: raccoon sprite replaced by the *spot's* "occupied" frame — box/bush with only the mask + eyes peeking, eyes slowly looking left/right. A tiny 💤-style "shh" bubble pops once.
3. Screen cue: the vision cones that would have caught you flash grey as they pass over; a small "HIDDEN" chip under the energy bar.
4. Pop-out: hop up + dust puff, raccoon line ("Peekaboo!").
5. An enemy passing by stops, says "Huh?", sniffs, moves on — sells the tension.

## 2. Scare from behind ("BOO!")

Sneak up on an enemy from behind and tap jump to scare them.

**Rules**
- Works when: enemy is calm (look/patrol), you're within ~14 px, and you're behind them (more than ~110° from where they face).
- Effect: enemy screams, jumps (hit-stop 0.15 s), then runs *away* from you for 2.5 s and drops whatever they carry (cooks drop a snack, cops drop a donut = energy).
- Cost: the scream is loud — everyone within ~130 px comes to look (`noiseAt`). So it's a tool to clear a path, not a free win.
- 4 s cooldown. Bears can't be scared: try it and the bear turns and charges (funny fail state). Dogs get scared but bark, alerting a wider radius.
- Small "!" prompt over the enemy's back when a scare is possible.

## 3. Difficulty (done today, code only)
- Kitchen: 5 cooks (was 6), spaced further apart.
- Street: max 2 dogs + 1 cop, police dog only 20% of runs (was 45%), the cook bursts out after 7 s (was 4 s).
- Forest river: 1 ranger on the banks (was 2).

## 4. Krea generation list (same style refs as before: raccoon sheet + enemies sheet + kawaii mockup)
1. **Hiding props sheet (4×3)**: cardboard box empty / with raccoon peeking, laundry basket empty / peeking, tablecloth table empty / peeking, trash-bag pile empty / peeking, hollow log empty / peeking, berry bush empty / peeking.
2. **Raccoon actions sheet (4×2)**: tiptoe sneak (2 frames), "BOO!" arms-up scare pose, ducking, hidden-eyes-only, popping out, soggy (river), laughing.
3. **Scared enemies sheet (4×3)**: chef jump-scare + running away, sous chef, cop dropping donut, puppy yelp, ranger, camper; front + side each where possible.
4. **Forest props sheet 2** (still pending): blueberry pie, blueberries, fish, acorn, lantern post, signpost.
5. **Voices** (ElevenLabs, same actors): "BOO!" raccoon variants, chef/cop/ranger screams ("AAAH!", "Mother of soufflé!"), raccoon hide/peek lines ("Peekaboo!", "I'm a box now."), ranger + bear lines.
6. **SFX**: rustle in/out, box "fwip", scream sting, river splash.
