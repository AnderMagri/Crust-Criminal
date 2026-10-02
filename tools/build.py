# Wraps a body-only game source in the page head (tools/head.html) for deployment.
# The committed index.html already contains its head, so this is only needed when rebuilding from a body-only source.
# usage: python3 tools/build.py <body-only source> [output, default dist.html]   (paths are relative to the repo root)
import os,sys
B=os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
p=lambda f:f if os.path.isabs(f) else os.path.join(B,f)
src=open(p(sys.argv[1] if len(sys.argv)>1 else 'index.html')).read()
if src.lstrip().lower().startswith('<!doctype'):sys.exit('That file already has its <head>; nothing to build.')
out=open(p('tools/head.html')).read()+src.rstrip('\n')+'\n\n</body>\n</html>\n'
open(p(sys.argv[2] if len(sys.argv)>2 else 'dist.html'),'w').write(out);print(len(out))
