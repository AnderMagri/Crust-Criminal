#!/bin/bash
# round 6 (Oct 5): dungeon + ice + boss sheets -> assets/_raw/r6
cd "$(dirname "$0")/.." && mkdir -p assets/_raw/r6
B=https://app-uploads.krea.ai/a1939a2b-9ee7-497e-b970-d13a815875cf
curl -sSfo assets/_raw/r6/dungeon-chars-v1.png  $B/30de2d89-2e9a-49c4-a343-0abb21de61a9-image.png
curl -sSfo assets/_raw/r6/dungeon-props-v1.png  $B/75902ec7-83b8-4254-bbb9-19f063f45cb2-image.png
curl -sSfo assets/_raw/r6/dungeon-hide-v1.png   $B/4468d974-8fc5-4af1-a7a6-c933b73983f8-image.png
curl -sSfo assets/_raw/r6/dungeon-snacks-v1.png $B/948a9b56-b146-4c7f-98bf-4ee88af869c6-image.png
curl -sSfo assets/_raw/r6/ice-chars-v1.png      $B/eed13155-ebb6-435a-8ec9-a802ca479a48-image.png
curl -sSfo assets/_raw/r6/ice-props-v1.png      $B/bee6530b-da98-4f34-893c-d342365fe354-image.png
curl -sSfo assets/_raw/r6/ice-hide-v1.png       $B/b0061348-c6a0-4ae3-a005-d209608ed0ac-image.png
curl -sSfo assets/_raw/r6/ice-snacks-v1.png     $B/43f1acbc-93e4-45d4-b1bb-2c6cad2e1d8c-image.png
curl -sSfo assets/_raw/r6/boss-v1.png           $B/c799ebf0-aa70-4d9b-9826-59521eadd6cd-image.png
curl -sSfo assets/_raw/r6/boss-items-v1.png     $B/5d91b0ae-33f2-4bdf-9bd8-7ae4ae6b6396-image.png
curl -sSfo assets/_raw/r6/world-tiles-v1.png     $B/3daab45f-3fa3-4a56-92bb-0ecc855a016f-image.png
curl -sSfo assets/_raw/r6/ice-raccoon-v1.png     $B/e1ef94d9-06cc-4e13-af48-6eee3966af22-image.png
curl -sSfo assets/_raw/r6/gummy-props-v1.png     $B/a022b0db-8855-4580-b00e-8fa130e6f471-image.png
curl -sSfo assets/_raw/r6/gummy-chars-v1.png     $B/6476e303-709a-41d7-be0a-ee49afbeab0a-image.png
curl -sSfo assets/_raw/r6/ice-raccoon-walk-v1.png $B/be1a8972-42f1-4479-a264-32e2d7927d93-image.png
echo done; ls -la assets/_raw/r6
