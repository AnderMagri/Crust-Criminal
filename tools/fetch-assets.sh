#!/usr/bin/env bash
# Downloads the generated art, music and voice samples into assets/.
set -euo pipefail
cd "$(dirname "$0")/.."
mkdir -p assets/art assets/music assets/voices
get(){ curl -fsSL -o "$1" "$2" && echo "saved $1"; }
get assets/art/title-3d.jpg          "https://app-uploads.krea.ai/public/c339a028-217b-4a74-a28d-d93f002bf22b-image.jpeg"
get assets/art/title-pixel-night.png "https://app-uploads.krea.ai/public/c0f2d197-6275-47ee-975c-0cd62e1bb951.png"
get assets/art/title-pixel-orange.png "https://app-uploads.krea.ai/public/73ec3d64-de3d-4bd3-90bf-e661430e2b0e.png"
get assets/music/main-theme.mp3      "https://app-uploads.krea.ai/audio/0b1b48f8-ef93-4985-b212-e9b4909b2453.mp3"
get assets/voices/chef-sample.mp3    "https://app-uploads.krea.ai/audio/f245acdc-896d-4fd2-918a-b37a37a8c80b.mp3"
get assets/voices/cop-sample.mp3     "https://app-uploads.krea.ai/audio/485a98c2-134f-4952-99aa-a8d812ba9ca8.mp3"
# raccoon voice clips used in-game (chubby, low cartoon critter voice)
get assets/voices/raccoon-yoink.mp3     "https://app-uploads.krea.ai/audio/8b2d2f2c-f617-4d98-8d05-37ca5b87a913.mp3"
get assets/voices/raccoon-uhoh.mp3      "https://app-uploads.krea.ai/audio/ba060c25-900b-465a-8fcc-9b80a8cf7880.mp3"
get assets/voices/raccoon-pietime.mp3   "https://app-uploads.krea.ai/audio/f7392b5f-1bae-4954-a90e-6c3c85a81222.mp3"
get assets/voices/raccoon-eep.mp3       "https://app-uploads.krea.ai/audio/2750b8c1-d9b4-4190-98be-3e9b606a6135.mp3"
get assets/voices/raccoon-oopsie.mp3    "https://app-uploads.krea.ai/audio/c05feee5-713a-481f-803d-fdb3f40e4440.mp3"
get assets/voices/raccoon-hometrash.mp3 "https://app-uploads.krea.ai/audio/e5d4ef53-3190-49e3-bbc0-8e6f287507a5.mp3"
get assets/voices/raccoon-hup.mp3       "https://app-uploads.krea.ai/audio/30d19314-de50-4af6-9b9b-de28b21b3f5c.mp3"
get assets/voices/raccoon-oof.mp3       "https://app-uploads.krea.ai/audio/b8c64ab1-db38-4618-9b0b-f273f9be347e.mp3"
# quirky extra raccoon lines
get assets/voices/raccoon-tada.mp3      "https://app-uploads.krea.ai/audio/56d2c2a9-657b-4f5b-9224-5a0744bf6d4b.mp3"
get assets/voices/raccoon-posh.mp3      "https://app-uploads.krea.ai/audio/e3c93950-9705-4a94-b0eb-51cf4afa1728.mp3"
get assets/voices/raccoon-song.mp3      "https://app-uploads.krea.ai/audio/c29a909c-0a20-4a55-bb92-eff6a43f84e8.mp3"
get assets/voices/raccoon-opera.mp3     "https://app-uploads.krea.ai/audio/484c7fc4-1ef5-4c71-b549-3e99616ebedf.mp3"
get assets/voices/raccoon-ninja.mp3     "https://app-uploads.krea.ai/audio/35c614eb-04d1-43a0-bd8f-4ab1c120f6dd.mp3"
get assets/voices/raccoon-faint.mp3     "https://app-uploads.krea.ai/audio/400f4942-8007-45f7-a858-7427e747a191.mp3"
get assets/voices/raccoon-landing.mp3   "https://app-uploads.krea.ai/audio/18307e71-2968-435d-a8ec-ceab6762725a.mp3"
get assets/voices/raccoon-cat.mp3       "https://app-uploads.krea.ai/audio/9f245a73-cf9f-4bd6-baf5-cd0567971f52.mp3"
get assets/voices/raccoon-hum.mp3       "https://app-uploads.krea.ai/audio/38f162a5-8ace-4cd1-83a2-a849d08bbabb.mp3"
get assets/voices/raccoon-tired.mp3     "https://app-uploads.krea.ai/audio/1cbc6108-262a-4870-a0c6-98244eaef156.mp3"
get assets/art/logo.png            "https://app-uploads.krea.ai/a1939a2b-9ee7-497e-b970-d13a815875cf/b428e301-b90b-4437-b975-94e24fb4e7ff-image.png"
