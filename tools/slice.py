# Slice grid sprite sheets (transparent PNG) into trimmed sprites and pack them into one atlas.
# Output: assets/art/sprites.webp + sprites.json  {name:[x,y,w,h,ax,ay,worldH]}
import json,sys
from PIL import Image
PPU=4  # atlas pixels per world unit
def cells(path,cols,rows,names):
    im=Image.open(path).convert('RGBA');W,H=im.size;cw,ch=W/cols,H/rows;out={}
    for i,n in enumerate(names):
        if not n:continue
        c,r=i%cols,i//cols;cell=im.crop((int(c*cw)+4,int(r*ch)+4,int((c+1)*cw)-4,int((r+1)*ch)-4))
        a=cell.getchannel('A').point(lambda v:255 if v>24 else 0);out[n]=cell.crop(a.getbbox())
    return out
def anchor_x(sp):
    a=sp.getchannel('A');w,h=sp.size;xs=[]
    for y in range(int(h*.9),h):
        for x in range(w):
            if a.getpixel((x,y))>100:xs.append(x)
    xs.sort();return xs[len(xs)//2] if xs else w/2
def build(groups,out_img,out_json):
    sprites={}
    for path,cols,rows,names,ref,refH in groups:
        sp=cells(path,cols,rows,names);k=refH*PPU/sp[ref].size[1]
        for n,s in sp.items():
            s2=s.resize((max(1,round(s.size[0]*k)),max(1,round(s.size[1]*k))),Image.LANCZOS)
            sprites[n]=(s2,anchor_x(s2))
    # shelf pack
    W=1024;x=y=sh=0;rects={}
    for n,(s,ax) in sorted(sprites.items(),key=lambda t:-t[1][0].size[1]):
        w,h=s.size
        if x+w+2>W:x=0;y+=sh+2;sh=0
        rects[n]=(x,y,w,h,round(ax),h);x+=w+2;sh=max(sh,h)
    atlas=Image.new('RGBA',(W,y+sh))
    for n,(s,ax) in sprites.items():atlas.paste(s,rects[n][:2])
    atlas.save(out_img,quality=90,method=6)
    json.dump({n:list(r)+[PPU] for n,r in rects.items()},open(out_json,'w'),separators=(',',':'))
    print(atlas.size,len(rects))
if __name__=='__main__':
    S=sys.argv[1]
    build([(S+'/raccoon-sheet-v2.png',4,2,['c_f','c_s','c_b','c_t','c_pf','c_ps','c_pb','c_x'],'c_f',24),
           (S+'/enemies-sheet-v1.png',4,3,['k_f','k_s','k_b','k_a','s_f','s_s','s_b','s_a','p_f','p_s','d_f','d_s'],'k_f',31)],
          sys.argv[2],sys.argv[3])
