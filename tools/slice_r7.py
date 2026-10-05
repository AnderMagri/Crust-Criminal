# Round 7: dungeon / ice / gummy / boss / noir / frankenstein / kart. Atlases: w-sprites (chars), w-props, tiles-w/-n/-k.
import sys;sys.path.insert(0,'tools')
from slice import build
from PIL import Image
S='assets/art/sprites-src';OUT='assets/art'
def q(a):return ('ref',a,0)
def tiles8(src,out,insets=None):
    im=Image.open(src).convert('RGB');W,H=im.size;cw,ch=W/4,H/2;strip=Image.new('RGB',(64*8,64))
    for i in range(8):
        c,r=i%4,i//4;f=.012
        box=(int(c*cw+cw*f),int(r*ch+ch*f),int((c+1)*cw-cw*f),int((r+1)*ch-ch*f))
        strip.paste(im.crop(box).resize((64,64),Image.LANCZOS),(i*64,0))
    strip.save(out,quality=88)
def chars4(pfx,keys):return [pfx+k for k in keys]
sheets=[]
def ch(file,names,ref,h):sheets.append((S+'/'+file,4,3,names,('ref',ref,h),True))
ch('dungeon-chars-v1.png',['dg_sk_f','dg_sk_s','dg_sk_b','dg_sk_a','dg_gb_f','dg_gb_s','dg_gb_b','dg_gb_a','dg_og_f','dg_og_s','dg_og_d','dg_og_a'],'dg_sk_f',29)
# sizes: keep each family consistent using separate refs
sheets.clear()
def fam(file,rows,h):
    for r,(names,ref,hh) in enumerate(rows):
        n=['']*12
        for i,x in enumerate(names):n[r*4+i]=x
        sheets.append((S+'/'+file,4,3,n,('ref',ref,hh),True))
fam('dungeon-chars-v1.png',[(['dg_sk_f','dg_sk_s','dg_sk_b','dg_sk_a'],'dg_sk_f',30),(['dg_gb_f','dg_gb_s','dg_gb_b','dg_gb_a'],'dg_gb_f',27),(['dg_og_f','dg_og_s','dg_og_d','dg_og_a'],'dg_og_f',34)],0)
for pre,f in (('ic','ice'),('gm','gummy')):
    fam(f+'-chars-v1.png',[([pre+'_pg_f',pre+'_pg_s',pre+'_pg_b',pre+'_pg_a'],pre+'_pg_f',28),([pre+'_pb_f',pre+'_pb_s',pre+'_pb_r',pre+'_pb_d'],pre+'_pb_f',31),([pre+'_fg_f',pre+'_fg_s',pre+'_fg_b',pre+'_fg_a'],pre+'_fg_f',28)],0)
fam('noir-chars-v1.png',[(['nr_gs_f','nr_gs_s','nr_gs_b','nr_gs_a'],'nr_gs_f',30),(['nr_cp_f','nr_cp_s','nr_cp_b','nr_cp_a'],'nr_cp_f',31),(['nr_bs_f','nr_bs_s','nr_bs_d','nr_bs_a'],'nr_bs_f',30)],0)
fam('frank-chars-v1.png',[(['fk_m_f','fk_m_a','fk_m_j','fk_m_r'],'fk_m_f',30),(['fk_d_f','fk_d_a','fk_d_j','fk_d_r'],'fk_d_f',27),(['fk_m_g','fk_m_d','fk_d_c','fk_d_x'],'fk_m_g',30)],0)
sheets.append((S+'/boss-v1.png',4,3,['bs_idle','bs_alert','bs_side','bs_back','bs_raise','bs_smash','bs_charge','bs_hit','bs_dizzy','bs_rage','bs_throw','bs_flag'],('ref','bs_idle',36),True))
sheets.append((S+'/ice-raccoon-v1.png',4,2,['ir_f','ir_s','ir_b','ir_cold','ir_pf','ir_ps','ir_pw','ir_x'],('ref','ir_f',24),True))
walk=['iw_'+d+str(i) for d in 'fsb' for i in range(4)]
sheets.append((S+'/ice-raccoon-walk-v1.png',4,3,walk,('ref','iw_f0',24),True))
sheets.append((S+'/kart-vehicles-v1.png',4,3,['kc_n','kc_b','kc_x','kc_s','kv_chef','kv_peng','kv_skel','kv_gob','kv_bear','kv_gang','kv_frank','kv_ufo'],('ref','kc_n',22),True))
build(sheets,OUT+'/w-sprites.webp',OUT+'/w-sprites.json')
def P(file,cols,rows,items):  # items name->(axis,units)
    return (S+'/'+file,cols,rows,list(items.keys()),('each',items),False)
w=lambda n:('w',n);h=lambda n:('h',n)
pr=[]
pr.append(P('dungeon-props-v1.png',4,3,dict(dp_pillar=h(30),dp_barrel=w(14),dp_crates=w(17),dp_torch=h(24),dp_shelf=w(17),dp_cauldron=w(17),dp_bones=w(16),dp_candle=h(26),dp_block=w(16),dp_door=h(30),dp_mouse=w(18),dp_web=w(16))))
pr.append(P('dungeon-snacks-v1.png',4,2,dict(ds_drum=w(12),ds_cheese=w(12),ds_mush=w(12),ds_pie=w(13),ds_coin=w(11),ds_bone=w(12),ds_soup=w(12),ds_potion=w(10))))
pr.append(P('dungeon-hide-v1.png',3,2,{'h_dbar':w(15),'h_dchest':w(17),'h_dcof':w(17),'h_dbar_p':w(15),'h_dchest_p':w(17),'h_dcof_p':w(17)}))
pr.append(P('ice-props-v1.png',4,3,dict(ip_igloo=w(20),ip_cubes=w(16),ip_snowman=h(26),ip_tree=h(42),ip_drift=w(18),ip_crystal=w(15),ip_hole=w(18),ip_sled=w(17),ip_rock=w(16),ip_lamp=h(32),ip_sign=h(24),ip_bucket=w(12))))
pr.append(P('gummy-props-v1.png',4,3,dict(gp_cube=w(16),gp_cubes=w(16),gp_pillar=h(30),gp_slab=w(17),gp_drift=w(18),gp_crystal=w(15),gp_hole=w(18),gp_igloo=w(20),gp_snowman=h(26),gp_tree=h(42),gp_lamp=h(32),gp_cave=w(20))))
pr.append(P('ice-snacks-v1.png',4,2,dict(is_fish=w(12),is_cream=w(11),is_cocoa=w(12),is_shave=w(11),is_pie=w(13),is_cane=h(14),is_ginger=w(11),is_bun=w(12))))
pr.append(P('ice-hide-v1.png',3,2,{'h_iglu':w(18),'h_iblk':w(17),'h_islg':w(17),'h_iglu_p':w(18),'h_iblk_p':w(17),'h_islg_p':w(17)}))
pr.append(P('noir-props-v1.png',4,3,dict(np_lamp=h(40),np_hyd=h(13),np_car=w(36),np_crates=w(17),np_club=w(24),np_phone=h(28),np_kiosk=w(20),np_bin=h(16),np_wall=w(17),np_fire=h(34),np_barber=h(26),np_cafe=w(18))))
pr.append(P('noir-snacks-v1.png',4,2,dict(ns_cannoli=w(12),ns_spag=w(12),ns_coffee=w(11),ns_pizza=w(12),ns_tira=w(11),ns_salami=w(12),ns_olive=h(14),ns_sub=w(13))))
pr.append(P('noir-hide-v1.png',3,2,{'h_ndump':w(17),'h_nviol':w(17),'h_nhat':w(15),'h_ndump_p':w(17),'h_nviol_p':w(17),'h_nhat_p':w(15)}))
pr.append(P('boss-items-v1.png',4,3,dict(bi_pie=w(13),bi_pie2=w(13),bi_splat=w(14),bi_jam=w(14),bi_pin=w(16),bi_dough=w(11),bi_puff=w(14),bi_ring=w(18),bi_oven=w(20),bi_bowl=w(16),bi_flour=w(16),bi_heart=w(11))))
pr.append(P('frank-props-v1.png',4,3,dict(fp_coil=h(28),fp_lab=w(18),fp_crate=w(16),fp_tomb=h(24),fp_zap=w(18),fp_coffin=h(30),fp_candle=h(24),fp_web=w(16),fp_pad=w(16),fp_bat=w(14),fp_books=w(15),fp_gate=w(24))))
pr.append(P('kart-items-v1.png',4,3,dict(ki_slice2=w(13),ki_slice=w(12),ki_pie=w(13),ki_boost=w(16),ki_jam=w(14),ki_ramp=w(18),ki_flag=h(22),ki_cone=h(14),ki_mud=w(16),ki_ice=w(16),ki_tires=w(14),ki_trophy=h(18))))
build(pr,OUT+'/w-props.webp',OUT+'/w-props.json',PPU=8)
tiles8(S+'/world-tiles-v1.png',OUT+'/tiles-w.webp')
tiles8(S+'/noir-tiles-v1.png',OUT+'/tiles-n.webp')
tiles8(S+'/kart-tiles-v1.png',OUT+'/tiles-k.webp')
