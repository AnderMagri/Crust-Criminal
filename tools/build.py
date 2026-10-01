# Wraps the game source (index.html in the workspace: body only) in the page head for deployment.
import sys
B='/home/claude/pie-heist/'
src=open(B+(sys.argv[1] if len(sys.argv)>1 else 'index.html')).read()
out=open(B+'tools/head.html').read()+src.rstrip('\n')+'\n\n</body>\n</html>\n'
open(sys.argv[2] if len(sys.argv)>2 else B+'dist.html','w').write(out);print(len(out))
