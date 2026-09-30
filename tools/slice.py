# Slice grid sprite sheets (transparent PNG) into trimmed sprites and pack them into one atlas.
# Output: <atlas>.webp + JSON {name:[x,y,w,h,anchorX,anchorY,pixelsPerWorldUnit]}; anchor = bottom (feet).
# Each sheet: (file, cols, rows, [names], sizing) where sizing is either ('ref', name, worldHeight) — one scale
# for the whole sheet so animation frames stay consistent — or ('each', {name:('h'|'w', worldUnits)}).
import json,sys
import numpy as np
import scipy.ndimage as ndi
from PIL import Image
PPU=4
def cells(path,cols,rows,names):
    im=Image.open(path).convert('RGBA');W,H=im.size;cw,ch=W/cols,H/rows;out={}
    for i,n in enumerate(names):
        if not n:continue
        c,r=i%cols,i//cols;cell=im.crop((int(c*cw)+4,int(r*ch)+4,int((c+1)*cw)-4,int((r+1)*ch)-4))
        # keep only the biggest blob in the cell (plus anything touching it), so bits of neighbours are dropped
        A=np.array(cell.getchannel('A'))>24;lab,k=ndi.label(ndi.binary_dilation(A,iterations=5))
        if k>1:
            big=1+int(np.argmax(ndi.sum(A,lab,range(1,k+1))));mask=(lab==big)&A
            cell=cell.copy();arr=np.array(cell);arr[...,3]=np.where(mask,arr[...,3],0);cell=Image.fromarray(arr)
        a=cell.getchannel('A').point(lambda v:255 if v>24 else 0);out[n]=cell.crop(a.getbbox())
    return out
def feet_x(sp):
    a=sp.getchannel('A');w,h=sp.size;xs=[x for y in range(int(h*.9),h) for x in range(w) if a.getpixel((x,y))>100]
    xs.sort();return xs[len(xs)//2] if xs else w/2
def build(sheets,out_img,out_json):
    sprites={}
    for path,cols,rows,names,sizing,chars in sheets:
        sp=cells(path,cols,rows,names)
        for n,s in sp.items():
            if sizing[0]=='ref':k=sizing[2]*PPU/sp[sizing[1]].size[1]
            else:
                ax,v=sizing[1][n];k=v*PPU/(s.size[1] if ax=='h' else s.size[0])
            s2=s.resize((max(1,round(s.size[0]*k)),max(1,round(s.size[1]*k))),Image.LANCZOS)
            sprites[n]=(s2,feet_x(s2) if chars else s2.size[0]/2)
    W=1024;x=y=sh=0;rects={}
    for n,(s,ax) in sorted(sprites.items(),key=lambda t:-t[1][0].size[1]):
        w,h=s.size
        if x+w+2>W:x=0;y+=sh+2;sh=0
        rects[n]=(x,y,w,h,round(ax),h);x+=w+2;sh=max(sh,h)
    atlas=Image.new('RGBA',(W,y+sh))
    for n,(s,ax) in sprites.items():atlas.paste(s,rects[n][:2])
    atlas.save(out_img,quality=90,method=6)
    json.dump({n:list(r)+[PPU] for n,r in rects.items()},open(out_json,'w'),separators=(',',':'))
    print(out_img,atlas.size,len(rects))
if __name__=='__main__':
    S,OUT=sys.argv[1],sys.argv[2]
    walk=[f'{d}{i}' for d in 'sfb' for i in range(4)]
    build([(S+'/raccoon-sheet-v2.png',4,2,['c_f','c_s','c_b','c_t','c_pf','c_ps','c_pb','c_x'],('ref','c_f',24),True),
           (S+'/raccoon-walk-v1.png',4,3,['cw_'+n for n in walk],('ref','cw_f0',24),True),
           (S+'/enemies-sheet-v1.png',4,3,['k_f','k_s','k_b','k_a','s_f','s_s','s_b','s_a','p_f','p_s','d_f','d_s'],('ref','k_f',31),True)],
          OUT+'/sprites.webp',OUT+'/sprites.json')
    build([(S+'/street-props-v1.png',4,3,['home','bin','bush','tree','fence','lamp','hydrant','planter','car0','car1','car2','car3'],
            ('each',{'home':('h',30),'bin':('h',20),'bush':('h',18),'tree':('h',44),'fence':('w',17),'lamp':('h',42),'hydrant':('h',13),'planter':('w',15),
                     'car0':('w',36),'car1':('w',36),'car2':('w',36),'car3':('w',36)}),False),
           (S+'/kitchen-props-v1.png',4,3,['','','','','pot','plates','board','cake','bowl','pie','donut','onigiri'],
            ('each',{'pot':('w',9),'plates':('w',8),'board':('w',10.5),'cake':('w',9),'bowl':('w',8.5),'pie':('w',13),'donut':('w',9),'onigiri':('w',7.5)}),False),
           # front-facing fixtures: drawn stretched into their exact tile rectangles in game
           (S+'/kitchen-fixtures-v1.png',4,2,['stove','fridge','shelf','sink','winOpen','winClosed','doorC','doorO'],
            ('each',{n:('w',18) for n in ['stove','fridge','shelf','sink','winOpen','winClosed','doorC','doorO']}),False),
           (S+'/snacks-v1.png',4,2,['sn_candy','sn_cookie','sn_choc','sn_donut','sn_fries','sn_burger','sn_gold','sn_onigiri'],
            ('each',{n:('w',12) for n in ['sn_candy','sn_cookie','sn_choc','sn_donut','sn_fries','sn_burger','sn_gold','sn_onigiri']}),False)],
          OUT+'/props.webp',OUT+'/props.json')
