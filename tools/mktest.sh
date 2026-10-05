#!/bin/bash
# test copy of the game with the window.__api hooks used by the Playwright checks (never deployed)
cd "$(dirname "$0")/.." && python3 - <<'PY'
s=open('index.html').read();api=open('tools/api.txt').read().rstrip('\n')
i=s.index("fit();newRun();setVoice(voiceOn)")
open('dist-test.html','w').write(s[:i]+api+"\n"+s[i:])
PY
