// ================= SPRITE CHARACTERS =================
// Hand-drawn kawaii sprites (from the approved mockup) packed in assets/art/sprites.webp.
// Each entry: [x,y,w,h,anchorX,anchorY,pixelsPerWorldUnit]; anchor = between the feet.
const SPR={"s_s":[0,0,76,136,38,136,4],"s_a":[78,0,90,136,41,136,4],"s_f":[170,0,82,134,41,134,4],"s_b":[254,0,80,134,40,134,4],"k_a":[336,0,91,130,40,130,4],"k_s":[429,0,78,129,42,129,4],"k_b":[509,0,77,126,39,126,4],"k_f":[588,0,77,124,38,124,4],"p_s":[667,0,78,117,40,117,4],"c_pb":[747,0,85,114,38,114,4],"c_pf":[834,0,87,113,39,113,4],"p_f":[923,0,94,113,46,113,4],"c_ps":[0,138,99,112,62,112,4],"cw_s3":[101,138,79,101,41,101,4],"cw_s1":[182,138,85,100,52,100,4],"cw_s2":[269,138,86,100,42,100,4],"c_s":[357,138,92,99,58,99,4],"cw_s0":[451,138,84,99,42,99,4],"c_b":[537,138,85,97,40,97,4],"c_t":[624,138,87,97,41,97,4],"c_x":[713,138,87,97,39,97,4],"c_f":[802,138,92,96,44,96,4],"cw_f0":[896,138,83,96,37,96,4],"cw_f2":[0,252,84,96,38,96,4],"cw_f3":[86,252,84,96,39,96,4],"cw_b0":[172,252,79,96,37,96,4],"cw_b2":[253,252,80,96,35,96,4],"cw_f1":[335,252,83,95,39,95,4],"cw_b1":[420,252,80,95,39,95,4],"cw_b3":[502,252,80,95,39,95,4],"d_s":[584,252,103,95,30,95,4],"d_f":[689,252,94,94,47,94,4]};
const SPR_IMG=new Image();let sprReady=false;SPR_IMG.onload=()=>{sprReady=true};SPR_IMG.src='assets/art/sprites.webp';
function drawSpr(n,x,y,flip,k=1,rot=0,sq=1){const d=SPR[n];if(!d)return;const u=d[6],w=d[2]/u*k,h=d[3]/u*k,ax=d[4]/u*k,ay=d[5]/u*k;
  ctx.save();ctx.translate(x,y);if(rot)ctx.rotate(rot);ctx.scale(flip?-1/sq:1/sq,sq);ctx.drawImage(SPR_IMG,d[0],d[1],d[2],d[3],-ax,-ay,w,h);ctx.restore()}
function walkFx(mv,ph){return mv?{bob:Math.abs(Math.sin(ph))*1.4,rot:Math.sin(ph)*.07,sq:1+Math.abs(Math.cos(ph))*.04}:{bob:0,rot:0,sq:1+Math.sin(now*2.4)*.018}}
function drawRaccoon(p){
  if(!sprReady){scaled(p,kRaccoon);return}
  const d=p.dir,mv=Math.hypot(p.vx,p.vy)>8||!!p.jump,z=p.z||0,ph=p.anim*1.3;
  kShadow(p.x,p.y,6.5-z*.15);
  const tired=p.energy<18&&!p.rush&&!mv&&!p.carry,caught=state==='caught',side=d==='left'||d==='right',flip=d==='left';
  const fr=Math.floor(ph/(Math.PI/2))&3,key=d==='up'?'b':side?'s':'f';
  let n;
  if(caught)n='c_x';else if(tired)n='c_t';
  else if(mv)n='cw_'+key+fr;else n=d==='up'?'c_b':side?'c_s':'c_f';
  const bob=mv?(fr&1?1.2:0):Math.sin(now*2.4)*.25,sq=mv?1:1+Math.sin(now*2.4)*.015,y=p.y-z-bob;
  drawSpr(n,p.x,y,flip,1,0,sq);
  if(p.carry){
    // the pie rides on his head and wobbles when he runs
    const h=SPR[n][3]/SPR[n][6],hx=p.x+(side?(flip?-2.4:2.4):0),wob=mv?Math.sin(ph*2)*.16:Math.sin(now*2)*.04,lift=mv?Math.abs(Math.sin(ph))*1.2:0,pa=pieFx?now-pieFx.t0:9,pop=pa<.6?1+Math.sin(pa/.6*Math.PI)*.7:1,up=pa<.6?Math.sin(pa/.6*Math.PI)*10:0;
    ctx.save();ctx.translate(hx,y-h+3.2-lift-up);ctx.rotate(wob);drawPropImg('pie',0,0,false,.82*pop);ctx.restore();
    if(Math.sin(now*5)>.4)sparkle(hx+(flip?-8:8),y-h-6,1.6)}
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
