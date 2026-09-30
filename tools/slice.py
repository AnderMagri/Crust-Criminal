# Slice grid sprite sheets (transparent PNG) into trimmed sprites and pack them into one atlas.
# Output: <atlas>.webp + JSON {name:[x,y,w,h,anchorX,anchorY,pixelsPerWorldUnit]}; anchor = bottom (feet).
# Each sheet: (file, cols, rows, [names], sizing) where sizing is either ('ref', name, worldHeight) — one scale
# for the whole sheet so animation frames stay consistent — or ('each', {name:('h'|'w', worldUnits)}).
import json,sys
import numpy as np
import scipy.ndimage as ndi
from PIL import Image,ImageFilter
PPU=4
def cells(path,cols,rows,names):
    # Blobs are found on the whole sheet (so art that crosses a grid line is never cut) and each blob
    # goes to the grid cell its centre falls in; small specks (sparkles) join whichever cell they sit in.
    im=Image.open(path).convert('RGBA');W,H=im.size;cw,ch=W/cols,H/rows
    A=np.array(im.getchannel('A'))>24;lab,k=ndi.label(ndi.binary_dilation(A,iterations=4))
    objs=ndi.find_objects(lab);cms=ndi.center_of_mass(A,lab,range(1,k+1));areas=ndi.sum(A,lab,range(1,k+1))
    groups={}
    for i in range(k):
        if areas[i]<40:continue
        cy,cx=cms[i];cell=int(cy//ch)*cols+int(cx//cw);groups.setdefault(cell,[]).append(i+1)
    arr=np.array(im);out={}
    for i,n in enumerate(names):
        if not n or i not in groups:continue
        ids=groups[i];mask=np.isin(lab,ids)&A
        ys,xs=np.where(mask);y0,y1,x0,x1=ys.min(),ys.max()+1,xs.min(),xs.max()+1
        sub=arr[y0:y1,x0:x1].copy();sub[...,3]=np.where(mask[y0:y1,x0:x1],sub[...,3],0)
        out[n]=Image.fromarray(sub)
    return out
def outline(img,px,color=(78,52,48)):
    # Crisp, anti-aliased ink ring hugging the art (distance field, no blur), in the same dark brown as the
    # hand-drawn lines, so small props end up with the same line weight as counters and characters.
    w,h=img.size;big=Image.new('RGBA',(w+2*px+2,h+2*px+2));big.paste(img,(px+1,px+1))
    m=np.array(big.getchannel('A'))>128;lab,k=ndi.label(m)
    if k>1:  # only outline the main shape, not detached sparkles/steam
        ar=ndi.sum(m,lab,range(1,k+1));keep=[i+1 for i in range(k) if ar[i]>=.08*ar.max()];m=np.isin(lab,keep)
    m=ndi.binary_fill_holes(m);d=ndi.distance_transform_edt(~m)
    a=np.clip(px+.5-d,0,1)*255
    ink=Image.new('RGBA',big.size,color+(0,));ink.putalpha(Image.fromarray(a.astype('uint8')));ink.alpha_composite(big);return ink
def feet_x(sp):
    a=sp.getchannel('A');w,h=sp.size;xs=[x for y in range(int(h*.9),h) for x in range(w) if a.getpixel((x,y))>100]
    xs.sort();return xs[len(xs)//2] if xs else w/2
def build(sheets,out_img,out_json,PPU=4):
    sprites={}
    for sh in sheets:
        path,cols,rows,names,sizing,chars=sh[:6];ol=sh[6] if len(sh)>6 else 0
        sp=cells(path,cols,rows,names)
        for n,s in sp.items():
            if sizing[0]=='ref':k=sizing[2]*PPU/sp[sizing[1]].size[1]
            else:
                ax,v=sizing[1][n];k=v*PPU/(s.size[1] if ax=='h' else s.size[0])
            s2=s.resize((max(1,round(s.size[0]*k)),max(1,round(s.size[1]*k))),Image.LANCZOS)
            if ol:s2=outline(s2,ol)
            sprites[n]=(s2,feet_x(s2) if chars else s2.size[0]/2)
    W=1024 if PPU<8 else 2048;x=y=sh=0;rects={}
    for n,(s,ax) in sorted(sprites.items(),key=lambda t:-t[1][0].size[1]):
        w,h=s.size
        if x+w+2>W:x=0;y+=sh+2;sh=0
        rects[n]=(x,y,w,h,round(ax),h);x+=w+2;sh=max(sh,h)
    atlas=Image.new('RGBA',(W,y+sh))
    for n,(s,ax) in sprites.items():atlas.paste(s,rects[n][:2])
    atlas.save(out_img,quality=90,method=6)
    json.dump({n:list(r)+[PPU] for n,r in rects.items()},open(out_json,'w'),separators=(',',':'))
    print(out_img,atlas.size,len(rects))
def tiles(src,out):
    # 4x2 sheet of square floor tiles -> one strip of 64px tiles (16 world units each at PPU 4)
    im=Image.open(src).convert('RGB');W,H=im.size;cw,ch=W/4,H/2;strip=Image.new('RGB',(64*8,64))
    for i in range(8):
        c,r=i%4,i//4;inset=.012 if i not in (6,7) else .07   # asphalt/grass: drop the frame so they tile
        box=(int(c*cw+cw*inset),int(r*ch+ch*inset),int((c+1)*cw-cw*inset),int((r+1)*ch-ch*inset))
        strip.paste(im.crop(box).resize((64,64),Image.LANCZOS),(i*64,0))
    strip.save(out,quality=88)

if __name__=='__main__':
    S,OUT=sys.argv[1],sys.argv[2]
    tiles(S+'/floor-tiles-v1.png',OUT+'/tiles.webp')
    walk=[f'{d}{i}' for d in 'sfb' for i in range(4)]
    build([(S+'/raccoon-sheet-v2.png',4,2,['c_f','c_s','c_b','c_t','c_pf','c_ps','c_pb','c_x'],('ref','c_f',24),True),
           (S+'/raccoon-walk-v1.png',4,3,['cw_'+n for n in walk],('ref','cw_f0',24),True),
           (S+'/enemies-sheet-v1.png',4,3,['k_f','k_s','k_b','k_a','s_f','s_s','s_b','s_a','p_f','p_s','d_f','d_s'],('ref','k_f',31),True)],
          OUT+'/sprites.webp',OUT+'/sprites.json')
    build([(S+'/street-props-v1.png',4,3,['home','bin','bush','tree','fence','lamp','hydrant','planter','car0','car1','car2','car3'],
            ('each',{'home':('h',30),'bin':('h',20),'bush':('h',18),'tree':('h',44),'fence':('w',17),'lamp':('h',42),'hydrant':('h',13),'planter':('w',15),
                     'car0':('w',36),'car1':('w',36),'car2':('w',36),'car3':('w',36)}),False),
           (S+'/kitchen-props-v1.png',4,3,['','','','','','','','','','pie','donut','onigiri'],
            ('each',{'pie':('w',13),'donut':('w',9),'onigiri':('w',7.5)}),False,2),
           # counter items drawn straight-on so they sit flat on the counter tops
           (S+'/counter-items-v2.png',4,2,['board','pot','bowl','cake','plates','jar','plant','teapot'],
            ('each',{'board':('w',11),'pot':('w',9.5),'bowl':('w',9),'cake':('w',9),'plates':('w',8.5),'jar':('w',7),'plant':('w',7.5),'teapot':('w',9.5)}),False,2),
           # front-facing fixtures: drawn stretched into their exact tile rectangles in game
           (S+'/kitchen-fixtures-v1.png',4,2,['stove','fridge','shelf','sink','winOpen','winClosed','doorC','doorO'],
            ('each',{n:('w',18) for n in ['stove','fridge','shelf','sink','winOpen','winClosed','doorC','doorO']}),False,3),
           (S+'/snacks-v1.png',4,2,['sn_candy','sn_cookie','sn_choc','sn_donut','sn_fries','sn_burger','sn_gold','sn_onigiri'],
            ('each',{n:('w',12) for n in ['sn_candy','sn_cookie','sn_choc','sn_donut','sn_fries','sn_burger','sn_gold','sn_onigiri']}),False)],
          OUT+'/props.webp',OUT+'/props.json',PPU=8)
