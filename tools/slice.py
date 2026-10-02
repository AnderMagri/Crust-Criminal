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

def forest(S,OUT):
    # Forest world: separate atlases so the city loads nothing extra.
    C=S+'/forest-chars-v1.png'
    build([(C,4,3,['b_f','b_s','b_b','b_c','b_x','b_r','','','','','',''],('ref','b_f',30),True),
           (C,4,3,['','','','','','','r_f','r_s','r_b','r_a','m_f','m_s'],('ref','r_f',31),True)],
          OUT+'/forest-sprites.webp',OUT+'/forest-sprites.json')
    build([(S+'/forest-props-v1.png',4,3,['f_pine','f_oak','f_bush','f_stump','f_rock','f_fire','f_tent','f_table','f_honey','f_mush','f_grass','f_den'],
            ('each',{'f_pine':('h',44),'f_oak':('h',40),'f_bush':('w',17),'f_stump':('w',15),'f_rock':('w',17),'f_fire':('w',16),'f_tent':('w',18),
                     'f_table':('w',18),'f_honey':('w',8),'f_mush':('w',9),'f_grass':('w',16),'f_den':('h',30)}),False)],
          OUT+'/forest-props.webp',OUT+'/forest-props.json',PPU=8)

def extras(S,OUT,rocket='moon-rocket-home-v2.png'):
    # Round 3: hiding spots, raccoon actions, scared enemies, moon world. Separate atlases (x-sprites / x-props).
    walk=['mw_'+d+str(i) for d in 'fsb' for i in range(4)]
    walk[4]=''   # that side-row frame came out front-facing; the game reuses a neighbour instead
    build([(S+'/raccoon-actions-v1.png',4,2,['ra_sn0','ra_sn1','ra_boo','ra_duck','ra_pop','ra_wet','ra_laugh','ra_start'],('ref','ra_boo',25),True),
           (S+'/scared-enemies-v1.png',4,3,['sc_kj','sc_kr','sc_sj','sc_sr','sc_pj','sc_pr','sc_dj','sc_dr','sc_rj','sc_rr','sc_mj','sc_mr'],('ref','sc_kr',31),True),
           (S+'/moon-raccoon-v1.png',4,2,['mc_f','mc_s','mc_b','mc_float','mc_pf','mc_ps','mc_t','mc_x'],('ref','mc_f',29),True),
           (S+'/moon-raccoon-walk-v1.png',4,3,walk,('ref','mw_f0',29),True),
           (S+'/moon-aliens-v1.png',4,3,['al_f','al_s','al_b','al_a','ac_f','ac_s','ac_b','ac_a','ap_f','ap_s','ad_f','al_j'],('ref','al_f',27),True)],
          OUT+'/x-sprites.webp',OUT+'/x-sprites.json')
    build([(S+'/hiding-spots-v1.png',4,3,['h_box','h_box_p','h_basket','h_basket_p','h_table','h_table_p','h_bags','h_bags_p','h_log','h_log_p','h_bush','h_bush_p'],
            ('each',{'h_box':('w',15),'h_box_p':('w',15),'h_basket':('w',15.5),'h_basket_p':('w',15.5),'h_table':('w',17),'h_table_p':('w',17),
                     'h_bags':('w',17),'h_bags_p':('w',17),'h_log':('w',17),'h_log_p':('w',17),'h_bush':('w',17),'h_bush_p':('w',17)}),False),
           (S+'/forest-props-v2.png',4,2,['f_bpie','fs_berry','fs_fish','fs_acorn','fs_honey','fs_smore','f_lantern','f_sign'],
            ('each',{'f_bpie':('w',13),'fs_berry':('w',12),'fs_fish':('h',13),'fs_acorn':('w',11),'fs_honey':('w',12),'fs_smore':('w',12),'f_lantern':('h',34),'f_sign':('h',22)}),False),
           (S+'/moon-props-v1.png',4,3,['m_rock','m_crater','m_crates','m_dish','m_rover0','m_rover1','','m_crystal','m_cactus','m_console','m_dome','m_flag'],
            ('each',{'m_rock':('w',16),'m_crater':('w',18),'m_crates':('w',16),'m_dish':('h',22),'m_rover0':('w',36),'m_rover1':('w',36),'m_crystal':('w',16),
                     'm_cactus':('w',15),'m_console':('w',16),'m_dome':('w',20),'m_flag':('h',22)}),False),
           (S+'/'+rocket,1,1,['m_rocket'],('each',{'m_rocket':('h',36)}),False),
           (S+'/moon-snacks-v1.png',4,2,['m_pie','ms_donut','ms_cheese','ms_star','ms_cookie','ms_icecream','ms_tube','ms_jelly'],
            ('each',{'m_pie':('w',13),'ms_donut':('w',13),'ms_cheese':('w',12),'ms_star':('w',11),'ms_cookie':('w',11),'ms_icecream':('w',12),'ms_tube':('h',13),'ms_jelly':('w',11)}),False),
           (S+'/forest-walls-v1.png',4,2,['wl_s','wl_m','wl_sv','wl_mv','wl_tb','wl_tbv','wl_rk','wl_rkp'],
            ('each',{'wl_s':('w',15),'wl_m':('w',30),'wl_sv':('w',9.5),'wl_mv':('w',13),'wl_tb':('w',31),'wl_tbv':('w',24),'wl_rk':('w',17),'wl_rkp':('w',30)}),False),
           (S+'/moon-hide-v1.png',3,2,['m_jar1','m_jar2','h_rocks','h_rocks_p','h_pod','h_pod_p'],
            ('each',{'m_jar1':('w',9),'m_jar2':('w',9),'h_rocks':('w',17),'h_rocks_p':('w',17),'h_pod':('w',17),'h_pod_p':('w',17)}),False)],
          OUT+'/x-props.webp',OUT+'/x-props.json',PPU=8)
