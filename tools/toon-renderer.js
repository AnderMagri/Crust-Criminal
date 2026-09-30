// ================= TOON RENDERER =================
// 1930s rubber-hose characters + 1950s pastel sets: ink outlines, flat pastels, paper grain.
// These declarations replace the pixel-art drawing functions above (later declarations win).
const INK='#2b2530';
const TP={cream:'#fbf3e1',paper:'#fffaf0',mint:'#bfe6d4',mintD:'#94cfb8',butter:'#f7e3a1',blue:'#c9ddf2',pink:'#f7cfc9',salmon:'#f0a99e',
  lav:'#dcd2f0',navy:'#3a3f66',navyD:'#2a2e4f',navyL:'#565c8a',grey:'#a7acbb',greyD:'#7f8496',greyL:'#eceaf1',mask:'#3b3548',cherry:'#d9434e',gold:'#f7d774'};
if(!CanvasRenderingContext2D.prototype.roundRect)CanvasRenderingContext2D.prototype.roundRect=function(x,y,w,h,r){r=Math.min(r,w/2,h/2);this.moveTo(x+r,y);this.arcTo(x+w,y,x+w,y+h,r);this.arcTo(x+w,y+h,x,y+h,r);this.arcTo(x,y+h,x,y,r);this.arcTo(x,y,x+w,y,r);this.closePath()};
function tSt(w){ctx.lineWidth=w;ctx.strokeStyle=INK;ctx.lineJoin='round';ctx.lineCap='round'}
function tE(x,y,rx,ry,fill,w=1){ctx.beginPath();ctx.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,TAU);if(fill){ctx.fillStyle=fill;ctx.fill()}if(w){tSt(w);ctx.stroke()}}
function tRR(x,y,w,h,r,fill,lw=1){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill()}if(lw){tSt(lw);ctx.stroke()}}
function hose(x0,y0,cx,cy,x1,y1,col,w){ctx.beginPath();ctx.moveTo(x0,y0);ctx.quadraticCurveTo(cx,cy,x1,y1);tSt(w+1.5);ctx.stroke();ctx.strokeStyle=col;ctx.lineWidth=w;ctx.stroke()}
function glove(x,y,r=2){tE(x,y,r,r*.9,'#ffffff',.9);ctx.beginPath();ctx.moveTo(x-r*.3,y-r*.2);ctx.lineTo(x-r*.3,y+r*.35);tSt(.5);ctx.stroke()}
function pieEye(x,y,rx,ry,lx,ly){tE(x,y,rx,ry,'#fff',.8);const px=x+lx*rx*.3,py=y+ly*ry*.25;
  ctx.beginPath();ctx.ellipse(px,py,rx*.56,ry*.74,0,0,TAU);ctx.fillStyle=INK;ctx.fill();
  ctx.beginPath();ctx.moveTo(px,py);ctx.arc(px,py,rx*.62,-2.0,-1.25);ctx.closePath();ctx.fillStyle='#fff';ctx.fill()}
function pastel(hex,a=.45){const n=parseInt(hex.slice(1),16),r=n>>16,g=n>>8&255,b=n&255,m=v=>Math.round(v+(255-v)*a);return'#'+[m(r),m(g),m(b)].map(v=>v.toString(16).padStart(2,'0')).join('')}
function shadow(x,y,r){if(NOSH)return;ctx.fillStyle='rgba(43,37,48,.16)';ctx.beginPath();ctx.ellipse(x,y,r+1,2.6,0,0,TAU);ctx.fill()}

// ---------- pie ----------
function drawPieToon(x,y){
  tE(x,y+2.2,8,2.6,'#d7dae3',.9);
  ctx.beginPath();ctx.ellipse(x,y+1,7.2,3.8,0,Math.PI,0);ctx.lineTo(x+7.2,y+1.6);ctx.ellipse(x,y+1.6,7.2,1.7,0,0,Math.PI);ctx.closePath();
  ctx.fillStyle='#f3b660';ctx.fill();tSt(.9);ctx.stroke();
  ctx.strokeStyle='#c97c33';ctx.lineWidth=.8;for(let k=-2;k<=2;k++){ctx.beginPath();ctx.moveTo(x+k*2.6-1,y-2.2);ctx.lineTo(x+k*2.6+1,y+2.4);ctx.stroke()}
  ctx.beginPath();ctx.moveTo(x-6,y);ctx.lineTo(x+6,y);ctx.stroke();
  for(const[a,b]of[[-3,-1],[1.5,-1.6],[3.8,.5],[-.8,1]])tE(x+a,y+b,.9,.8,TP.cherry,0);
  const ph=(now*.7)%1;ctx.strokeStyle=`rgba(255,255,255,${.75*(1-ph)})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x-1,y-3-ph*6);ctx.quadraticCurveTo(x+2.5,y-5-ph*6,x,y-8-ph*6);ctx.stroke();
}
function drawPie(cx,cy){drawPieToon(cx,cy)}

// ---------- the raccoon ----------
function drawRaccoon(p){
  const gy=p.y,x=p.x,d=p.dir,mv=Math.hypot(p.vx,p.vy)>8||!!p.jump,ph=p.anim*1.25,s=d==='left'?-1:d==='right'?1:0,back=d==='up';
  const bob=mv?Math.abs(Math.sin(ph))*1.3:Math.sin(now*2.2)*.35,by=gy-(p.z||0)-bob;
  ctx.fillStyle='rgba(43,37,48,.18)';ctx.beginPath();ctx.ellipse(x,gy,8.5-(p.z||0)*.25,2.8,0,0,TAU);ctx.fill();
  const G=TP.grey,GD=TP.greyD,GL=TP.greyL,M=TP.mask,fl=s||(back?0:.8);
  const tail=()=>{const tx=x-fl*4.5,ty=by-6,w=Math.sin(now*6+ph)*1.8;
    ctx.beginPath();ctx.moveTo(tx,ty);ctx.bezierCurveTo(tx-fl*8,ty-1,tx-fl*9+w,ty-10,tx-fl*3.5+w,ty-15);
    tSt(7);ctx.stroke();ctx.strokeStyle=G;ctx.lineWidth=5.4;ctx.stroke();ctx.setLineDash([2.3,2.5]);ctx.strokeStyle=M;ctx.stroke();ctx.setLineDash([]);
    tE(tx-fl*3.5+w,ty-15.5,2.4,2.2,M,.9)};
  if(!back)tail();
  // rubber-hose legs
  for(const side of[-1,1]){const phase=ph+(side>0?Math.PI:0),sw=mv?Math.sin(phase)*3:0,lift=mv?Math.max(0,Math.sin(phase))*1.8:0;
    const hx=x+side*(s?1.2:2.8),fx=x+side*(s?1:3.2)+(s?s*sw:sw*.25),fy=gy-lift;
    hose(hx,by-5,hx+(s?-s*2:side*1.2),(by-5+fy)/2,fx,fy-1.2,GD,2.4);tE(fx+s*1.5,fy-.7,2.6,1.5,M,.9)}
  // round belly
  tE(x,by-9.5,7.6,7.2,G,1.1);if(!back)tE(x+s*1.4,by-8.6,4.8,5,GL,0);
  // arms
  if(p.carry){hose(x-5,by-13,x-9,by-19,x-6.2,by-25.5,G,2.2);hose(x+5,by-13,x+9,by-19,x+6.2,by-25.5,G,2.2)}
  else{const a=mv?Math.sin(ph)*2.4:0;
    hose(x-5.8,by-12,x-8.5,by-9,x-7.6+(s?0:a),by-5.6,G,2.2);hose(x+5.8,by-12,x+8.5,by-9,x+7.6-(s?0:a),by-5.6,G,2.2);
    glove(x-7.6+(s?0:a),by-5.6);glove(x+7.6-(s?0:a),by-5.6)}
  // big head
  const hx=x+s*1.6,hy=by-19.5;
  tE(hx-5.3-s*.8,hy-5.2,2.3,2.8,G,1);tE(hx+5.3-s*.8,hy-5.2,2.3,2.8,G,1);
  if(!back){tE(hx-5.3-s*.8,hy-5,1,1.4,M,0);tE(hx+5.3-s*.8,hy-5,1,1.4,M,0)}
  tE(hx,hy,7.4,6.6,G,1.1);
  if(back){tE(hx-4.6,hy+.4,1.3,1.7,M,0);tE(hx+4.6,hy+.4,1.3,1.7,M,0);tail()}
  else{
    tE(hx+s*2,hy+3,4.9,2.9,GL,0);tE(hx-3+s*1.5,hy-3.4,2.3,1.1,GL,0);tE(hx+3+s*1.5,hy-3.4,2.3,1.1,GL,0);
    ctx.beginPath();ctx.ellipse(hx+s*1.3,hy-.4,6.8,2.7,0,0,TAU);ctx.fillStyle=M;ctx.fill();
    const ex=s?1.8:2.8;pieEye(hx+s*2.2-ex,hy-.7,1.9,2.4,s,0);pieEye(hx+s*2.2+ex,hy-.7,1.9,2.4,s,0);
    tE(hx+s*3.2,hy+3,2.9,2,'#fff',.8);tE(hx+s*4.4,hy+1.9,1.3,1,INK,0);
    ctx.beginPath();ctx.arc(hx+s*3.2,hy+3.2,1.5,.25,Math.PI-.25);tSt(.8);ctx.stroke();
  }
  if(p.carry){glove(x-6.2,by-26);glove(x+6.2,by-26);drawPieToon(x,by-29.5)}
  p._img=null;
}

// ---------- chefs, sous chef, police ----------
function drawCook(c){
  const x=c.x,gy=c.y,d=dirOf(c.fa),s=d==='left'?-1:d==='right'?1:0,back=d==='up',mv=c.moving,ph=c.anim*1.15;
  const bob=mv?Math.abs(Math.sin(ph))*1.2:0,y=gy-bob,cop=c.style==='cop',sous=c.style==='sous',angry=c.state==='chase'||c.state==='alert';
  const COAT=cop?'#8ea5d6':sous?'#5f6480':'#fdfaf3',PANT=cop?TP.navy:'#5a5d73',SKIN=c.skin?pastel(c.skin,.2):'#f2c9a8',W=c.fat?1.8:0;
  ctx.fillStyle='rgba(43,37,48,.16)';ctx.beginPath();ctx.ellipse(x,gy,8+W,2.8,0,0,TAU);ctx.fill();
  for(const side of[-1,1]){const phase=ph+(side>0?Math.PI:0),sw=mv?Math.sin(phase)*3:0,lift=mv?Math.max(0,Math.sin(phase))*1.6:0;
    const hx=x+side*2.4,fx=x+side*2.6+(s?s*sw:sw*.2),fy=gy-lift;hose(hx,y-7,hx+side,(y-7+fy)/2,fx,fy-1.2,PANT,2.4);tE(fx+s*1.4,fy-.7,2.9,1.5,INK,0)}
  tE(x,y-12,6.6+W,7.8,COAT,1.1);
  if(!back&&!cop&&!sous){tRR(x-4.6-W*.4,y-13,9.2+W*.8,9,2.5,pastel(c.apron||'#c0392b',.5),.9)}
  if(sous&&!back){ctx.beginPath();ctx.moveTo(x-3.4,y-18.5);ctx.lineTo(x+3.4,y-18.5);ctx.lineTo(x+s,y-14.5);ctx.closePath();ctx.fillStyle=TP.cherry;ctx.fill();tSt(.8);ctx.stroke();
    for(const[a,b]of[[-2,-13],[2,-13],[-2,-10],[2,-10]])tE(x+a,y+b,.6,.6,'#fff',0)}
  if(cop){tRR(x-6-W,y-9,12+W*2,2,1,TP.navyD,.7);if(!back){tE(x+2.8,y-14,1.3,1.3,TP.gold,.6)}}
  // arms: reach forward when chasing
  const rx=angry?(s||0)*4:0,ry=angry?-6:0,a=mv&&!angry?Math.sin(ph)*2.2:0;
  hose(x-6,y-15,x-9,y-12,x-8+rx+a,y-8+ry,COAT,2.2);hose(x+6,y-15,x+9,y-12,x+8+rx-a,y-8+ry,COAT,2.2);
  glove(x-8+rx+a,y-8+ry);glove(x+8+rx-a,y-8+ry);
  const hx=x+s*1.2,hy=y-22.5;
  tE(hx,hy,5.4,5.1,SKIN,1.1);
  if(back)tE(hx,hy+.5,4.6,3.8,c.hair||'#3b3548',0);
  else{
    const ex=s?1.4:2;pieEye(hx+s*1.4-ex,hy-1,1.3,1.8,s,angry?.3:0);pieEye(hx+s*1.4+ex,hy-1,1.3,1.8,s,angry?.3:0);
    if(angry){tSt(.9);ctx.beginPath();ctx.moveTo(hx+s*1.4-ex-1.6,hy-4);ctx.lineTo(hx+s*1.4-ex+1,hy-3);ctx.moveTo(hx+s*1.4+ex+1.6,hy-4);ctx.lineTo(hx+s*1.4+ex-1,hy-3);ctx.stroke()}
    tE(hx+s*2.8,hy+1.2,1.8,1.5,'#f09a8f',.8);
    if(c.stache!==false){tSt(1.5);ctx.beginPath();ctx.moveTo(hx+s*2.4,hy+2.8);ctx.quadraticCurveTo(hx+s*2.4-2.5,hy+2.2,hx+s*2.4-3.4,hy+3.6);ctx.moveTo(hx+s*2.4,hy+2.8);ctx.quadraticCurveTo(hx+s*2.4+2.5,hy+2.2,hx+s*2.4+3.4,hy+3.6);ctx.stroke()}
  }
  if(cop){tRR(hx-5.6,hy-7.8,11.2,4.2,2,TP.navy,1);tE(hx+s*2.5,hy-3.6,6.2,1.2,TP.navyD,.8);if(!back)tE(hx,hy-6,1.2,1.2,TP.gold,.5)}
  else{const tall=sous?3.5:0;tRR(hx-4.6,hy-8.5,9.2,3.4,1.2,'#fff',1);
    tE(hx-3,hy-11.5-tall*.5,3.3,3.5+tall*.4,'#fff',1);tE(hx+3,hy-11.5-tall*.5,3.3,3.5+tall*.4,'#fff',1);tE(hx,hy-13.5-tall,3.9,3.9+tall*.3,'#fff',1);
    tRR(hx-4.4,hy-8.3,8.8,3,1,'#fff',0);if(sous){ctx.fillStyle=TP.cherry;ctx.fillRect(hx-4.4,hy-7.2,8.8,1)}}
}

// ---------- dogs ----------
function drawDog(e){
  const x=e.x,gy=e.y,d=dirOf(e.fa),s=d==='left'?-1:d==='right'?1:0,back=d==='up',mv=e.moving,ph=e.anim*1.5,k9=e.style==='k9';
  const C=k9?'#56566b':pastel(e.coat||'#b9772f',.35),D=k9?'#9b6b4f':pastel(e.coat||'#b9772f',.05),y=gy-(mv?Math.abs(Math.sin(ph))*1:0);
  ctx.fillStyle='rgba(43,37,48,.16)';ctx.beginPath();ctx.ellipse(x,gy,8,2.6,0,0,TAU);ctx.fill();
  const wag=Math.sin(now*(e.state==='chase'?22:9))*2.5,tx=x-(s||.8)*6.5;hose(tx,y-7,tx-(s||.8)*2,y-11,tx-(s||.8)*1+wag,y-13,C,1.8);
  for(const[lx,o]of[[-4,0],[-1.5,Math.PI],[2,Math.PI],[4.5,0]]){const sw=mv?Math.sin(ph+o)*1.8:0;hose(x+lx*(s?1:.8),y-5,x+lx,y-2.5,x+lx*(s?1:.8)+sw*(s?s:.3),gy-.8,C,1.8)}
  tE(x,y-7,7.2,4.4,C,1.1);if(k9)tRR(x-4,y-10.5,8,6,2,'#6f86b8',.8);
  const hx=x+s*5.5,hy=y-12;tE(hx,hy,4.3,3.9,C,1.1);
  if(k9){for(const side of[-1,1]){ctx.beginPath();ctx.moveTo(hx+side*2.2,hy-2.5);ctx.lineTo(hx+side*3.4,hy-7);ctx.lineTo(hx+side*.4,hy-3.6);ctx.closePath();ctx.fillStyle=C;ctx.fill();tSt(.9);ctx.stroke()}}
  else{tE(hx-3.6,hy+.6,1.6,3,D,.9);tE(hx+3.6,hy+.6,1.6,3,D,.9)}
  if(!back){tE(hx+s*2,hy+1.6,2.4,1.7,k9?D:'#fff6ea',.8);tE(hx+s*3.4,hy+.8,1,.8,INK,0);pieEye(hx+s*.8-1.3,hy-1.1,1,1.4,s,0);pieEye(hx+s*.8+1.3,hy-1.1,1,1.4,s,0)}
  if(e.state==='chase'&&!back){ctx.beginPath();ctx.arc(hx+s*2,hy+2.6,1.3,0,Math.PI);ctx.fillStyle='#fff';ctx.fill();tSt(.6);ctx.stroke()}
}
function drawK9(e){drawDog(e)}

// ---------- cars ----------
function drawCar(c){
  const x=c.x,y=c.y,s=c.dir,col=pastel(c.color,.42);
  ctx.fillStyle='rgba(43,37,48,.2)';ctx.beginPath();ctx.ellipse(x,y,16,3,0,0,TAU);ctx.fill();
  tRR(x-9,y-21,17,10,4,col,1.1);tRR(x-7,y-19.5,6,6,1.5,'#dff0fb',.7);tRR(x+.5,y-19.5,6,6,1.5,'#dff0fb',.7);
  tRR(x-16,y-13,32,9,4.5,col,1.1);
  tE(x-9,y-3,4.2,3.4,INK,0);tE(x+9,y-3,4.2,3.4,INK,0);tE(x-9,y-3,1.6,1.4,'#eee',0);tE(x+9,y-3,1.6,1.4,'#eee',0);
  ctx.beginPath();ctx.arc(x-9,y-4,5,Math.PI,0);ctx.arc(x+9,y-4,5,Math.PI,0);tSt(1);ctx.stroke();
  tE(x+s*15,y-9,1.8,1.6,'#fff5c0',.8);tE(x-s*15.3,y-9,1.2,1.2,TP.cherry,.6);
}

// ---------- kitchen furniture ----------
function counterItem(c,r,x,y){
  const h=hsh(c,r,7);
  if(h<.12){tRR(x+2,y-3,12,6,1.5,'#e6b884',.8);tE(x+6,y,2.4,1,'#f08a3c',.6);tE(x+10.5,y-.5,1.2,1.6,'#8fcf88',.5)}
  else if(h<.22){tRR(x+3,y-5,10,8,2.5,'#b8bccb',.9);tE(x+8,y-5,5,1.4,'#d4d7e1',.8);tE(x+8,y-6.4,1,.7,INK,0)}
  else if(h<.3){ctx.beginPath();ctx.ellipse(x+8,y-1,5.2,3.6,0,0,Math.PI);ctx.closePath();ctx.fillStyle=TP.pink;ctx.fill();tSt(.9);ctx.stroke();tE(x+8,y-1,5.2,1.3,'#fff3d6',.8)}
  else if(h<.37){tRR(x+4,y-6,8,9,3,'#f3ead3',.9);ctx.fillStyle=TP.cherry;ctx.fillRect(x+5,y-2.5,6,1.4)}
  else if(h<.43){for(let k=0;k<3;k++)tE(x+8,y+1-k*1.8,5,1.5,k%2?'#fff':'#e8ecf5',.7)}
  else if(h<.48){tRR(x+5,y-5,6,8,1.5,'#d9a877',.8);for(const o of[6.5,8,9.5]){ctx.beginPath();ctx.moveTo(x+o,y-5);ctx.lineTo(x+o,y-8);tSt(.8);ctx.stroke()}}
}
function drawCounter(c,r,noItem){
  const x=c*TS,y=r*TS,below=isWallK(c,r+1),above=isWallK(c,r-1),L=isWallK(c-1,r),Rt=isWallK(c+1,r),bot=below?16:6;
  ctx.fillStyle=TP.cream;ctx.fillRect(x-.01,y-6,16.02,below?22:12);
  tSt(1);ctx.beginPath();if(!above){ctx.moveTo(x,y-6);ctx.lineTo(x+16,y-6)}if(!L){ctx.moveTo(x,y-6);ctx.lineTo(x,y+bot)}if(!Rt){ctx.moveTo(x+16,y-6);ctx.lineTo(x+16,y+bot)}ctx.stroke();
  if(!below){ctx.fillStyle=TP.mint;ctx.fillRect(x-.01,y+6,16.02,10);ctx.fillStyle=TP.mintD;ctx.fillRect(x,y+14,16,2);
    tSt(1);ctx.beginPath();ctx.moveTo(x,y+6);ctx.lineTo(x+16,y+6);ctx.moveTo(x,y+16);ctx.lineTo(x+16,y+16);if(!L){ctx.moveTo(x,y+6);ctx.lineTo(x,y+16)}if(!Rt){ctx.moveTo(x+16,y+6);ctx.lineTo(x+16,y+16)}ctx.stroke();
    tRR(x+2.2,y+7.4,11.6,5.6,1.8,null,.7);tE(x+8,y+10.2,.9,.9,TP.gold,.5)}
  if(!noItem&&!(S.knocked&&S.knocked.has(c+','+r)))counterItem(c,r,x,y);
}
function drawOven(c,r){
  const x=c*TS,y=r*TS,below=isWallK(c,r+1),hot=hsh(c,r,3)<.5;
  tRR(x,y-6,16,12,1.5,'#5b6178',1);
  for(const[bx,by]of[[4.5,-2.5],[11.5,-2.5],[4.5,2.5],[11.5,2.5]]){tE(x+bx,y+by,2.6,1.7,'#3d4157',.7);if(hot&&bx===4.5&&by<0){ctx.strokeStyle=Math.sin(now*14+c)>0?'#ff9a4d':'#f06a3c';ctx.lineWidth=.8;ctx.beginPath();ctx.ellipse(x+bx,y+by,1.8,1.1,0,0,TAU);ctx.stroke()}}
  if(hot&&Math.sin(now*3+c*2)>.2){const ph=(now*.9+c*.3)%1;ctx.strokeStyle=`rgba(255,255,255,${.6*(1-ph)})`;ctx.lineWidth=1;ctx.beginPath();ctx.moveTo(x+4,y-4-ph*8);ctx.quadraticCurveTo(x+6,y-6-ph*8,x+4.5,y-8-ph*8);ctx.stroke()}
  if(!below){tRR(x,y+6,16,10,1.5,TP.mint,1);tRR(x+3,y+8.4,10,5.2,1.5,Math.sin(now*9+c)>0?'#f7a35c':'#f5b86e',.8);ctx.fillStyle='#fff3c4';ctx.fillRect(x+4,y+9.2,8,1);
    for(let k=0;k<4;k++)tE(x+3+k*3.3,y+7.2,.7,.7,'#fff',.4)}
}
function drawFridge(c,r){const x=c*TS,y=r*TS;tRR(x+1,y-15,14,31,3.5,TP.butter,1.1);ctx.beginPath();ctx.moveTo(x+1,y-3);ctx.lineTo(x+15,y-3);tSt(.8);ctx.stroke();
  tRR(x+3,y-12,1.4,6,.7,'#d7dae3',.6);tRR(x+3,y,1.4,8,.7,'#d7dae3',.6);tE(x+10,y-9,1.4,1.4,TP.cherry,.5);tE(x+8,y+5,1.2,1.2,'#8fcfe0',.5)}
function drawShelf(c,r){const x=c*TS,y=r*TS;tRR(x,y-12,16,28,1.5,'#e8c093',1);
  for(const yy of[-5,3,11]){ctx.fillStyle='#c9965f';ctx.fillRect(x+1,y+yy,14,1.6)}
  const J=[TP.cherry,TP.gold,'#8fcf88','#8fb8e8',TP.pink];
  for(let k=0;k<3;k++){tRR(x+1.6+k*4.8,y-11,3.4,5.6,1,J[(c+k)%5],.6);tRR(x+1.4+k*4.8,y-3,3.8,5.6,1.2,J[(c+k+2)%5],.6);tRR(x+2+k*4.6,y+5,3,5.6,1,J[(c+r+k)%5],.6)}}
function drawDoorK(){const d=S.door,x=d.c*TS,y=d.r*TS,L=d.side==='L';
  if(!S.doorOpen){tRR(L?x+9:x+1,y-4,6,20,1.5,'#d9a877',1);tE(L?x+13.5:x+2.5,y+7,.8,.8,TP.gold,.5)}
  else{tRR(L?x+8:x,y-4,8,20,1.5,TP.navyD,1);if(Math.sin(now*6)>-.2){ctx.fillStyle='#9be0a8';ctx.font='bold 5px Fredoka,sans-serif';ctx.textAlign='center';ctx.fillText('EXIT',L?x+12:x+4,y-6)}}}
function drawWindowK(){for(let c=0;c<S.cols;c++){if(S.map[S.rows-1][c]!=='Q')continue;const x=c*TS,y=(S.rows-1)*TS;
  if(!S.windowClosed){tRR(x+1,y+1,14,13,2,'#4b5a92',1);tE(x+10,y+5,2,2,'#fff3c4',0);tE(x+10.8,y+4.4,1.6,1.6,'#4b5a92',0);tE(x+4,y+9,.5,.5,'#fff',0)}
  else{tRR(x+1,y+1,14,13,2,TP.salmon,1);ctx.beginPath();ctx.moveTo(x+8,y+1);ctx.lineTo(x+8,y+14);for(let k=0;k<3;k++){ctx.moveTo(x+1,y+4+k*3.5);ctx.lineTo(x+15,y+4+k*3.5)}tSt(.7);ctx.stroke()}}}

// ---------- street props ----------
function drawBin(c,r,home){const x=c*TS+8,y=r*TS;const body=home?'#9fd3a2':'#c3c7d4',near=home&&Math.hypot(player.x-x,player.y-(y+10))<48;const bob=near?Math.sin(now*12)*1.2-1:0;
  ctx.fillStyle='rgba(43,37,48,.16)';ctx.beginPath();ctx.ellipse(x,y+13,6.5,2,0,0,TAU);ctx.fill();
  ctx.beginPath();ctx.moveTo(x-5.5,y-3);ctx.lineTo(x+5.5,y-3);ctx.lineTo(x+4.5,y+13);ctx.lineTo(x-4.5,y+13);ctx.closePath();ctx.fillStyle=body;ctx.fill();tSt(1);ctx.stroke();
  for(const o of[-2,0,2]){ctx.beginPath();ctx.moveTo(x+o,y);ctx.lineTo(x+o*.9,y+11);tSt(.6);ctx.stroke()}
  tE(x,y-4+bob,6.6,2,home?'#b8e6bb':'#dadde6',1);tE(x,y-5.6+bob,1.8,.9,INK,0);
  if(home){ctx.beginPath();ctx.moveTo(x+5,y-4+bob);ctx.lineTo(x+5,y-17+bob);tSt(.9);ctx.stroke();ctx.beginPath();ctx.moveTo(x+5,y-17+bob);ctx.lineTo(x+11,y-15+bob);ctx.lineTo(x+5,y-13+bob);ctx.closePath();ctx.fillStyle='#f3b660';ctx.fill();tSt(.8);ctx.stroke();
    ctx.fillStyle=INK;ctx.font='bold 4px Fredoka,sans-serif';ctx.textAlign='center';ctx.fillText('HOME',x,y+6)}}
function drawHedge(c,r){const x=c*TS,y=r*TS,below=tileCh(c,r+1)==='H';
  for(const[a,b,rr]of[[4,-2,5],[12,-2,5],[8,-5,5.5],[3,5,5],[13,5,5],[8,3,5.5]])if(!(below&&b>3))tE(x+a,y+b,rr,rr*.9,'#9fd3a2',1);
  tE(x+6,y-5,1.6,1.1,'#c8ecc6',0);tE(x+11,y+2,1.4,1,'#c8ecc6',0)}
function drawTree(c,r){const x=c*TS+8,y=r*TS;ctx.fillStyle='rgba(43,37,48,.16)';ctx.beginPath();ctx.ellipse(x,y+14,9,2.4,0,0,TAU);ctx.fill();
  tRR(x-2,y,4,14,1.5,'#c9965f',1);for(const[a,b,rr]of[[-6,-8,6.5],[6,-8,6.5],[0,-14,7.5],[0,-5,7]])tE(x+a,y+b,rr,rr*.92,'#8fcf94',1.1);tE(x-3,y-15,2.4,1.5,'#c8ecc6',0)}
function drawFence(c,r){const x=c*TS,y=r*TS;ctx.fillStyle='#fffaf0';tSt(.9);
  for(let k=0;k<4;k++){const px=x+1+k*4;ctx.beginPath();ctx.moveTo(px,y+12);ctx.lineTo(px,y-4);ctx.lineTo(px+1.5,y-6);ctx.lineTo(px+3,y-4);ctx.lineTo(px+3,y+12);ctx.closePath();ctx.fill();ctx.stroke()}
  tRR(x,y-1,16,2,.8,'#f3e7cf',.7);tRR(x,y+7,16,2,.8,'#f3e7cf',.7)}
function drawLamp(l){const x=l.x,y=l.y;ctx.fillStyle='rgba(255,236,160,.22)';ctx.beginPath();ctx.ellipse(x+6,y-1,16,5,0,0,TAU);ctx.fill();
  ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(x,y-34);ctx.quadraticCurveTo(x,y-38,x+5,y-37);tSt(2.6);ctx.stroke();ctx.strokeStyle=TP.navy;ctx.lineWidth=1.3;ctx.stroke();
  tE(x+6,y-35.5,3,2,TP.navy,1);tE(x+6,y-33.5,2,1.2,'#fff3b8',.6);tE(x,y,2.4,1,TP.navy,.8)}

// ---------- snacks ----------
function drawSnackBody(sn){
  const x=sn.x,y=sn.y+Math.sin(now*3+sn.x)*.8-2.5;
  switch(sn.type){
    case'candy':ctx.beginPath();ctx.moveTo(x-3,y);ctx.lineTo(x-6.5,y-2.6);ctx.lineTo(x-6.5,y+2.6);ctx.closePath();ctx.moveTo(x+3,y);ctx.lineTo(x+6.5,y-2.6);ctx.lineTo(x+6.5,y+2.6);ctx.closePath();ctx.fillStyle='#f5a3b8';ctx.fill();tSt(.8);ctx.stroke();
      tE(x,y,3.4,2.8,'#f7b9c8',.9);ctx.strokeStyle='#fff';ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(x-1.5,y-2.4);ctx.lineTo(x+.5,y+2.4);ctx.stroke();break;
    case'cookie':tE(x,y,4.4,3.9,'#e0a868',1);for(const[a,b]of[[-1.6,-1],[1.4,-1.6],[.6,1.2],[-1.8,1.4]])tE(x+a,y+b,.75,.65,'#6b3d2a',0);
      ctx.beginPath();ctx.arc(x+4,y-2.6,1.4,0,TAU);ctx.fillStyle=TP.paper;ctx.fill();break;
    case'choc':tRR(x-5,y-3,10,6,1.2,'#7a4a36',1);ctx.strokeStyle='#5a3526';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(x-1.7,y-3);ctx.lineTo(x-1.7,y+3);ctx.moveTo(x+1.7,y-3);ctx.lineTo(x+1.7,y+3);ctx.stroke();tRR(x+1.5,y-3.4,4,6.8,1,'#c9d0e0',.8);break;
    case'donut':tE(x,y,5.4,4.2,'#e8b56a',1);tE(x,y-.6,4.4,3.1,'#f7a8c3',0);tE(x,y-.4,1.7,1.2,TP.paper,.8);
      for(const[a,b,cc]of[[-2.5,-1.2,'#8fb8e8'],[2.3,-1.6,'#fff3b8'],[1,1.4,'#8fcf88'],[-1.5,1.2,'#fff']]){ctx.fillStyle=cc;ctx.fillRect(x+a,y+b,1,.6)}
      if(Math.sin(now*6)>.3){ctx.strokeStyle=TP.gold;ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(x+6,y-7);ctx.lineTo(x+6,y-3);ctx.moveTo(x+4,y-5);ctx.lineTo(x+8,y-5);ctx.stroke()}break;
    case'fries':for(let k=0;k<5;k++)tRR(x-3.4+k*1.6,y-7+(k%2),1.3,6,.5,'#f7d774',.5);ctx.beginPath();ctx.moveTo(x-4.5,y-2);ctx.lineTo(x+4.5,y-2);ctx.lineTo(x+3.4,y+4);ctx.lineTo(x-3.4,y+4);ctx.closePath();ctx.fillStyle=TP.cherry;ctx.fill();tSt(.9);ctx.stroke();break;
    case'burger':tE(x,y+1.8,5.2,1.6,'#e8b56a',.8);tRR(x-5.4,y-.8,10.8,1.8,.8,'#8fcf88',.6);tRR(x-5,y-2.2,10,2,.8,'#7a4a36',.7);ctx.beginPath();ctx.ellipse(x,y-2.4,5.2,3.2,0,Math.PI,0);ctx.closePath();ctx.fillStyle='#f0b25a';ctx.fill();tSt(.9);ctx.stroke();
      ctx.beginPath();ctx.arc(x+4.6,y-1,1.8,0,TAU);ctx.fillStyle=TP.paper;ctx.fill();break;
  }
}

// ---------- vision cones: soft flashlight wedges ----------
function cone(e){
  const col=e.state==='chase'?'rgba(240,120,120,.32)':e.state==='alert'?'rgba(255,255,255,.5)':e.state==='search'?'rgba(205,190,245,.35)':'rgba(255,240,170,.4)';
  const ox=e.x,oy=e.y-3,range=e.view+(pieTaken?10:0),N=20,pts=[];
  for(let i=0;i<=N;i++){const an=e.fa-e.half+2*e.half*i/N,ca=Math.cos(an),sa=Math.sin(an);let d=0;
    while(d<range){d+=3;if(solidAt(Math.floor((ox+ca*d)/TS),Math.floor((oy+sa*d)/TS))){d-=2;break}}pts.push([ox+ca*d,oy+sa*d])}
  e.cone={ox,oy,range,pts};
  const g=ctx.createRadialGradient(ox,oy,2,ox,oy,range);g.addColorStop(0,col);g.addColorStop(1,col.replace(/[\d.]+\)$/,'0)'));
  ctx.fillStyle=g;ctx.beginPath();ctx.moveTo(ox,oy);for(const p of pts)ctx.lineTo(p[0],p[1]);ctx.closePath();ctx.fill();
}
function bubble(x,y,ch,col){tE(x,y+3,4.4,4.4,'#fff',1);ctx.fillStyle=col;ctx.font='8px "Luckiest Guy",Fredoka,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(ch,x,y+3.8)}

// ---------- overlay: vignette, paper grain, film flicker (replaces night lighting) ----------
const GRAIN=(()=>{const c=document.createElement('canvas');c.width=c.height=160;const g=c.getContext('2d'),im=g.createImageData(160,160);
  for(let i=0;i<im.data.length;i+=4){const v=110+Math.random()*145;im.data[i]=im.data[i+1]=im.data[i+2]=v;im.data[i+3]=255}g.putImageData(im,0,0);return c})();
let grainPat=null;
function lighting(){
  const K=S.kind==='kitchen';
  if(!K){ctx.fillStyle='rgba(58,63,102,.14)';ctx.fillRect(0,0,VW,VH)}
  const v=ctx.createRadialGradient(VW/2,VH/2,VH*.34,VW/2,VH/2,VH*.82);v.addColorStop(0,'rgba(43,37,48,0)');v.addColorStop(1,'rgba(43,37,48,.3)');ctx.fillStyle=v;ctx.fillRect(0,0,VW,VH);
  ctx.save();ctx.setTransform(1,0,0,1,0,0);if(!grainPat)grainPat=ctx.createPattern(GRAIN,'repeat');
  ctx.globalAlpha=.075;ctx.globalCompositeOperation='multiply';ctx.translate(-Math.random()*160,-Math.random()*160);ctx.fillStyle=grainPat;ctx.fillRect(0,0,cv.width+160,cv.height+160);ctx.restore();
  ctx.fillStyle=`rgba(255,248,228,${Math.random()*.035})`;ctx.fillRect(0,0,VW,VH);
  if(Math.random()<.04){ctx.strokeStyle='rgba(255,255,255,.18)';ctx.lineWidth=.4;const sx=Math.random()*VW;ctx.beginPath();ctx.moveTo(sx,0);ctx.lineTo(sx+Math.random()*4-2,VH);ctx.stroke()}
}
function quantize(){}

// ---------- pastel background tiles ----------
function buildBg(){
  bg=document.createElement('canvas');bg.width=S.cols*TS*RS;bg.height=S.rows*TS*RS;const g=bg.getContext('2d');g.scale(RS,RS);
  const m=ctx;ctx=g;
  const r_=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};
  if(S.kind==='kitchen'){
    const wallAt=(c,r)=>!'.DQ'.includes(tileCh(c,r)),PAL=['#cdeadb','#f7d3cd','#d3e3f4','#f8e8b0'];
    for(let r=0;r<S.rows;r++)for(let c=0;c<S.cols;c++){const x=c*TS,y=r*TS,a=(c+r)&1,base=a?PAL[((c>>1)+(r>>1)*3+((c*7+r*13)%4))%4]:'#fbf0dc';
      r_(x,y,16,16,base);
      const wg=g.createRadialGradient(x+5+hsh(c,r,1)*6,y+5+hsh(c,r,2)*6,1,x+8,y+8,11);wg.addColorStop(0,'rgba(255,255,255,.28)');wg.addColorStop(1,'rgba(120,100,120,.06)');r_(x,y,16,16,wg);
      g.strokeStyle='rgba(160,135,120,.35)';g.lineWidth=.5;g.strokeRect(x+.25,y+.25,15.5,15.5);
      if(r>0&&wallAt(c,r-1))r_(x,y,16,3,'rgba(58,45,70,.14)');
      if(wallAt(c-1,r))r_(x,y,2,16,'rgba(58,45,70,.08)');
      const h=hsh(c,r,99);if(h<.02){tRR(x+4,y+4,8,8,1.5,'#d3d6df',.7);for(let k=0;k<3;k++)r_(x+5.5,y+6+k*2,5,.7,INK)}
    }
    for(let c=0;c<S.cols;c++){const x=c*TS;r_(x,0,16,16,'#bfe3d0');g.strokeStyle='rgba(90,140,120,.5)';g.lineWidth=.5;
      for(let yy=4;yy<14;yy+=4){g.beginPath();g.moveTo(x,yy);g.lineTo(x+16,yy);g.stroke()}g.beginPath();g.moveTo(x+8,3);g.lineTo(x+8,13);g.stroke();
      r_(x,12,16,4,'#f7d3cd');g.strokeStyle=INK;g.lineWidth=.8;g.beginPath();g.moveTo(x,12);g.lineTo(x+16,12);g.moveTo(x,16);g.lineTo(x+16,16);g.stroke();
      if(c===Math.floor(S.cols/2)){tE(x+8,6,3.4,3.4,'#fff',.9);g.beginPath();g.moveTo(x+8,6);g.lineTo(x+8,3.8);g.moveTo(x+8,6);g.lineTo(x+9.6,6.6);g.stroke()}
      if(c%5===2&&c<S.cols-1){g.strokeStyle=INK;g.lineWidth=.9;g.beginPath();g.moveTo(x+1,4);g.lineTo(x+15,4);g.stroke();tE(x+4,8.5,2.2,2.2,'#b8bccb',.8);tE(x+11,8,1.4,2.6,'#e0a868',.7)}}
    r_(0,0,S.cols*TS,3,TP.navy);
    for(let r=1;r<S.rows;r++){r_(0,r*TS,TS,TS,TP.navy);r_(TS-2,r*TS,2,TS,TP.navyL);r_(S.cols*TS-TS,r*TS,TS,TS,TP.navy);r_(S.cols*TS-TS,r*TS,2,TS,TP.navyL)}
    r_(0,(S.rows-1)*TS,S.cols*TS,TS,TP.navy);r_(TS-2,(S.rows-1)*TS,S.cols*TS-2*TS+4,2,TP.navyL);
  }else{
    const M=(c,r)=>(r<0||r>=S.rows||c<0||c>=S.cols)?'W':S.map[r][c],ground=ch=>ch==='r'?'r':'gHX'.includes(ch)?'g':',';
    for(let r=0;r<S.rows;r++)for(let c=0;c<S.cols;c++){const x=c*TS,y=r*TS,u=ground(M(c,r));
      if(u==='r'){r_(x,y,16,16,'#8f95b5');if(hsh(c,r,50)<.03){tE(x+8,y+8,4.4,3,'#7b80a0',.7)}if(ground(M(c,r-1))===',')r_(x,y,16,2,'rgba(43,37,48,.18)')}
      else if(u==='g'){r_(x,y,16,16,'#c6e5b4');if(hsh(c,r,70)<.35){const tx=x+3+hsh(c,r,71)*9,ty=y+4+hsh(c,r,72)*8;g.strokeStyle='#8fc48a';g.lineWidth=.7;g.beginPath();g.moveTo(tx,ty+2);g.lineTo(tx-1,ty);g.moveTo(tx+1,ty+2);g.lineTo(tx+1.5,ty-.5);g.moveTo(tx+2,ty+2);g.lineTo(tx+3,ty);g.stroke()}
        if(hsh(c,r,60)<.06){const fx=x+4+hsh(c,r,61)*8,fy=y+4+hsh(c,r,62)*8;for(let k=0;k<5;k++)tE(fx+Math.cos(k*1.26)*1.3,fy+Math.sin(k*1.26)*1.3,.9,.9,pick([TP.pink,'#fff',TP.butter]),0);tE(fx,fy,.7,.7,TP.gold,0)}}
      else{r_(x,y,16,16,'#ece5d6');g.strokeStyle='rgba(170,150,130,.45)';g.lineWidth=.5;g.strokeRect(x+.25,y+.25,15.5,15.5);
        if(ground(M(c,r+1))==='r'){r_(x,y+12,16,4,'#f6f1e7');g.strokeStyle=INK;g.lineWidth=.8;g.beginPath();g.moveTo(x,y+12);g.lineTo(x+16,y+12);g.moveTo(x,y+16);g.lineTo(x+16,y+16);g.stroke()}
        if(ground(M(c,r-1))==='r'){r_(x,y,16,3,'#f6f1e7');g.strokeStyle=INK;g.lineWidth=.8;g.beginPath();g.moveTo(x,y+3);g.lineTo(x+16,y+3);g.stroke()}}}
    S.lanes.forEach((L,i)=>{if(i%2)return;const y=(L.r+2)*TS;for(let x=2;x<S.cols*TS;x+=12)tRR(x,y-1,6,2,1,'#fff3c4',0);
      const zx=(2+((L.r*5)%10))*TS;for(let k=0;k<5;k++)r_(zx+k*6,L.r*TS+3,4,58,'rgba(255,250,235,.55)')});
    for(let c=0;c<S.cols;c++){const x=c*TS;r_(x,0,16,16,TP.navy);r_(x,TS,16,16,'#e9b7a8');g.strokeStyle='rgba(150,90,80,.45)';g.lineWidth=.5;
      for(let yy=TS+3;yy<2*TS;yy+=3){g.beginPath();g.moveTo(x,yy);g.lineTo(x+16,yy);g.stroke()}
      if(c%4===1&&Math.abs(c-S.doorCol)>1){tRR(x+2.5,TS+2,11,9,1.5,'#fff0b8',.9);g.beginPath();g.moveTo(x+8,TS+2);g.lineTo(x+8,TS+11);g.stroke()}}
    g.strokeStyle=INK;g.lineWidth=1;g.beginPath();g.moveTo(0,TS);g.lineTo(S.cols*TS,TS);g.moveTo(0,2*TS);g.lineTo(S.cols*TS,2*TS);g.stroke();
    const dx=S.doorCol*TS;tRR(dx+2,TS+2,12,14,2,'#d9a877',1);tE(dx+11,TS+10,.8,.8,TP.gold,.5);
    for(let k=0;k<5;k++){g.fillStyle=k&1?'#fffaf0':'#9fd3a2';g.fillRect(dx-2+k*4,TS-2,4,5)}tSt(.8);g.strokeRect(dx-2,TS-2,20,5);
  }
  ctx=m;
}
