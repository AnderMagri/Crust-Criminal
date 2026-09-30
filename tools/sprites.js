// ================= SPRITE CHARACTERS =================
// Hand-drawn kawaii sprites (from the approved mockup) packed in assets/art/sprites.webp.
// Each entry: [x,y,w,h,anchorX,anchorY,pixelsPerWorldUnit]; anchor = between the feet.
const SPR={"s_s":[0,0,76,136,38,136,4],"s_a":[78,0,97,136,41,136,4],"s_f":[177,0,82,134,41,134,4],"s_b":[261,0,80,134,40,134,4],"k_a":[343,0,98,130,40,130,4],"k_s":[443,0,78,129,42,129,4],"k_b":[523,0,77,126,39,126,4],"k_f":[602,0,77,124,38,124,4],"p_s":[681,0,78,117,40,117,4],"c_pb":[761,0,85,114,38,114,4],"c_pf":[848,0,87,113,39,113,4],"p_f":[0,138,94,113,46,113,4],"c_ps":[96,138,99,112,62,112,4],"c_x":[197,138,98,102,39,102,4],"c_s":[297,138,92,99,58,99,4],"c_b":[391,138,85,97,40,97,4],"c_t":[478,138,87,97,41,97,4],"c_f":[567,138,92,96,44,96,4],"d_s":[661,138,103,95,30,95,4],"d_f":[766,138,94,94,47,94,4]};
const SPR_IMG=new Image();let sprReady=false;SPR_IMG.onload=()=>{sprReady=true};SPR_IMG.src='assets/art/sprites.webp';
function drawSpr(n,x,y,flip,k=1,rot=0,sq=1){const d=SPR[n];if(!d)return;const u=d[6],w=d[2]/u*k,h=d[3]/u*k,ax=d[4]/u*k,ay=d[5]/u*k;
  ctx.save();ctx.translate(x,y);if(rot)ctx.rotate(rot);ctx.scale(flip?-1/sq:1/sq,sq);ctx.drawImage(SPR_IMG,d[0],d[1],d[2],d[3],-ax,-ay,w,h);ctx.restore()}
function walkFx(mv,ph){return mv?{bob:Math.abs(Math.sin(ph))*1.4,rot:Math.sin(ph)*.07,sq:1+Math.abs(Math.cos(ph))*.04}:{bob:0,rot:0,sq:1+Math.sin(now*2.4)*.018}}
function drawRaccoon(p){
  if(!sprReady){scaled(p,kRaccoon);return}
  const d=p.dir,mv=Math.hypot(p.vx,p.vy)>8||!!p.jump,fx=walkFx(mv,p.anim*1.3),z=p.z||0;
  kShadow(p.x,p.y,6.5-z*.15);
  const tired=p.energy<18&&!p.rush&&!mv&&!p.carry,caught=state==='caught';
  let n,flip=false;
  if(caught)n='c_x';else if(tired)n='c_t';
  else if(d==='up')n=p.carry?'c_pb':'c_b';else if(d==='left'||d==='right'){n=p.carry?'c_ps':'c_s';flip=d==='left'}else n=p.carry?'c_pf':'c_f';
  drawSpr(n,p.x,p.y-z-fx.bob,flip,1,fx.rot,fx.sq);
  if(p.carry&&Math.sin(now*5)>.4)sparkle(p.x+(flip?-9:9),p.y-z-fx.bob-30,1.6);
  p._img=null;
}
function drawCook(c){
  if(!sprReady){scaled(c,kCook);return}
  const d=dirOf(c.fa),mv=c.moving,fx=walkFx(mv,c.anim*1.2),angry=c.state==='chase'||c.state==='alert',st=c.style==='sous'?'s':c.style==='cop'?'p':'k';
  kShadow(c.x,c.y,6.5+(c.fat?1:0));
  let n,flip=false;const side=d==='left'||d==='right';
  if(st==='p')n=side?'p_s':'p_f';
  else if(angry&&d!=='up')n=st+'_a';else if(d==='up')n=st+'_b';else if(side)n=st+'_s';else n=st+'_f';
  if(side||(angry&&d==='left'))flip=d==='left';
  drawSpr(n,c.x,c.y-fx.bob,flip,c.fat?1.08:1,fx.rot,fx.sq*(c.fat?.94:1));
}
function drawDog(e){
  if(!sprReady){scaled(e,kDog);return}
  const d=dirOf(e.fa),mv=e.moving,fx=walkFx(mv,e.anim*1.6),k9=e.style==='k9';
  kShadow(e.x,e.y,5.5);
  drawSpr(k9?'d_s':'d_f',e.x,e.y-fx.bob,k9?d==='left':(d==='left'),.72,fx.rot,fx.sq);
}
