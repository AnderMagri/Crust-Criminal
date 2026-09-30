// ================= KAWAII OVERRIDES =================
// Japanese-cute pass: chibi characters drawn 1.25x bigger, soft brown outlines, candy pastels,
// a calm cream/baby-blue floor and pink-topped counters so obstacles read instantly.
const CK=1.25;
const KB='#5b3f3c',KG='#9d97a3',KGD='#7c7682',KGL='#fbefd8',KM='#4f4856',KPINK='#f7a9b8',KBLUSH='rgba(247,140,160,.75)';
function kStroke(w){ctx.lineWidth=w;ctx.strokeStyle=KB;ctx.lineJoin='round';ctx.lineCap='round'}
function kE(x,y,rx,ry,fill,w=.9){ctx.beginPath();ctx.ellipse(x,y,Math.max(.1,rx),Math.max(.1,ry),0,0,TAU);if(fill){ctx.fillStyle=fill;ctx.fill()}if(w){kStroke(w);ctx.stroke()}}
function kRR(x,y,w,h,r,fill,lw=.9){ctx.beginPath();ctx.roundRect(x,y,w,h,r);if(fill){ctx.fillStyle=fill;ctx.fill()}if(lw){kStroke(lw);ctx.stroke()}}
function kEye(x,y,r,look){kE(x,y,r*.9,r,'#3a2522',0);kE(x-r*.32+look*.3,y-r*.38,r*.36,r*.36,'#fff',0);kE(x+r*.35+look*.3,y+r*.35,r*.17,r*.17,'#fff',0)}
function kBlush(x,y,r=1.6){ctx.fillStyle=KBLUSH;ctx.beginPath();ctx.ellipse(x,y,r,r*.6,0,0,TAU);ctx.fill()}
function kShadow(x,y,r){ctx.fillStyle='rgba(91,63,60,.16)';ctx.beginPath();ctx.ellipse(x,y,r,r*.32,0,0,TAU);ctx.fill()}
function scaled(o,fn){ctx.save();ctx.translate(o.x,o.y);ctx.scale(CK,CK);ctx.translate(-o.x,-o.y);fn(o);ctx.restore()}
function sparkle(x,y,r,col){ctx.fillStyle=col||'#fff6c8';ctx.beginPath();ctx.moveTo(x,y-r);ctx.quadraticCurveTo(x,y,x+r,y);ctx.quadraticCurveTo(x,y,x,y+r);ctx.quadraticCurveTo(x,y,x-r,y);ctx.quadraticCurveTo(x,y,x,y-r);ctx.fill()}

// ---------- pie: golden, glossy, cherries on top ----------
function drawPieToon(x,y){
  kE(x,y+2.4,8,2.5,'#e4e1ec',.8);
  ctx.beginPath();ctx.ellipse(x,y+1,7.2,3.9,0,Math.PI,0);ctx.lineTo(x+7.2,y+1.8);ctx.ellipse(x,y+1.8,7.2,1.7,0,0,Math.PI);ctx.closePath();
  ctx.fillStyle='#f6c26f';ctx.fill();kStroke(.8);ctx.stroke();
  ctx.strokeStyle='#e0913f';ctx.lineWidth=.7;for(let k=-2;k<=2;k++){ctx.beginPath();ctx.moveTo(x+k*2.6-1,y-2.3);ctx.lineTo(x+k*2.6+1,y+2.4);ctx.stroke()}
  kE(x-2.2,y-1.6,1.6,.6,'rgba(255,255,255,.55)',0);
  kE(x+.6,y-3.4,1.2,1.1,'#e8475a',.5);kE(x+2.6,y-3.1,1.2,1.1,'#e8475a',.5);ctx.strokeStyle='#5f9a5a';ctx.lineWidth=.5;ctx.beginPath();ctx.moveTo(x+.8,y-4.3);ctx.quadraticCurveTo(x+1.8,y-6.2,x+2.6,y-4.2);ctx.stroke();
  const ph=(now*.7)%1;ctx.strokeStyle=`rgba(255,255,255,${.7*(1-ph)})`;ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(x-2,y-3-ph*6);ctx.quadraticCurveTo(x+.5,y-5-ph*6,x-1.5,y-8-ph*6);ctx.stroke();
}
function drawPie(cx,cy){drawPieToon(cx,cy)}

// ---------- the raccoon (chibi: head as big as the body) ----------
function kRaccoon(p){
  const gy=p.y,x=p.x,d=p.dir,mv=Math.hypot(p.vx,p.vy)>8||!!p.jump,ph=p.anim*1.3,s=d==='left'?-1:d==='right'?1:0,back=d==='up';
  const z=p.z||0,bob=mv?Math.abs(Math.sin(ph))*1.1:Math.sin(now*2.4)*.3,by=gy-z-bob,tired=p.energy!==undefined&&p.energy<18&&!p.rush;
  kShadow(x,gy,7.5-z*.2);
  const fl=s||(back?0:.9);
  const tail=()=>{const tx=x-fl*4,ty=by-4.5,w=Math.sin(now*5+ph)*1.4;
    ctx.beginPath();ctx.moveTo(tx,ty);ctx.bezierCurveTo(tx-fl*7,ty,tx-fl*8+w,ty-7,tx-fl*4+w,ty-11);
    kStroke(6.4);ctx.stroke();ctx.strokeStyle=KG;ctx.lineWidth=4.8;ctx.stroke();ctx.lineCap='butt';ctx.setLineDash([2.4,2.4]);ctx.strokeStyle=KM;ctx.stroke();ctx.setLineDash([]);ctx.lineCap='round';
    kE(tx-fl*4+w,ty-11.2,2.2,2,KM,.8)};
  if(!back)tail();
  for(const side of[-1,1]){const lift=mv?Math.max(0,Math.sin(ph+(side>0?Math.PI:0)))*1.6:0,sw=mv&&s?Math.sin(ph+(side>0?Math.PI:0))*1.8*s:0;
    kE(x+side*2.9+sw,gy-1.3-lift-z,2.3,1.7,KGD,.8)}
  kE(x,by-6.5,5.8,5.4,KG,.9);if(!back)kE(x+s*1.2,by-5.8,3.6,3.6,KGL,0);
  if(p.carry){kE(x-5.4,by-12,1.7,2.6,KG,.8);kE(x+5.4,by-12,1.7,2.6,KG,.8)}
  else{const a=mv?Math.sin(ph)*1.2:0;kE(x-5.6,by-7+a,1.7,2.2,KG,.8);kE(x+5.6,by-7-a,1.7,2.2,KG,.8)}
  const hx=x+s*1.2,hy=by-16.5;
  for(const side of[-1,1]){kE(hx+side*6.2-s*.6,hy-6.2,2.7,2.7,KG,.9);if(!back)kE(hx+side*6.2-s*.6,hy-6,1.4,1.4,KPINK,0)}
  kE(hx,hy,9.2,8,KG,1);
  if(back){kE(hx,hy+1.5,6,4,'rgba(124,118,130,.35)',0);tail()}
  else{
    const fx=hx+s*2.2,ex=s?3.1:3.5;
    kE(fx-ex,hy-3,2.2,1,KGL,0);kE(fx+ex,hy-3,2.2,1,KGL,0);
    ctx.beginPath();ctx.ellipse(fx,hy+.4,7.4,2.9,0,0,TAU);ctx.fillStyle=KM;ctx.fill();
    if(tired){kStroke(.8);for(const e of[-1,1]){ctx.beginPath();ctx.arc(fx+e*ex,hy,1.5,Math.PI*.15,Math.PI*.85);ctx.stroke()}
      ctx.fillStyle='#9fd4f5';ctx.beginPath();ctx.moveTo(hx+8,hy-8);ctx.quadraticCurveTo(hx+10,hy-4,hx+8,hy-3.4);ctx.quadraticCurveTo(hx+6,hy-4,hx+8,hy-8);ctx.fill()}
    else{kEye(fx-ex,hy+.2,2.3,s);kEye(fx+ex,hy+.2,2.3,s)}
    kE(fx,hy+3.6,3,2,KGL,0);kE(fx,hy+2.6,.95,.65,'#3a2522',0);
    kStroke(.6);ctx.beginPath();ctx.arc(fx-.75,hy+3.4,.75,.2,Math.PI-.2);ctx.arc(fx+.75,hy+3.4,.75,.2,Math.PI-.2);ctx.stroke();
    kBlush(fx-6.2,hy+3.2);kBlush(fx+6.2,hy+3.2);
  }
  if(p.carry){kE(x-6.8,by-25.5,1.7,3.2,KG,.8);kE(x+6.8,by-25.5,1.7,3.2,KG,.8);drawPieToon(x,by-31);
    if(Math.sin(now*5)>.4)sparkle(x+9,by-34,1.6)}
  p._img=null;
}
function drawRaccoon(p){scaled(p,kRaccoon)}

// ---------- chefs / sous chef / police: little egg people ----------
function kCook(c){
  const x=c.x,gy=c.y,d=dirOf(c.fa),s=d==='left'?-1:d==='right'?1:0,back=d==='up',mv=c.moving,ph=c.anim*1.2;
  const bob=mv?Math.abs(Math.sin(ph))*1:0,y=gy-bob,cop=c.style==='cop',sous=c.style==='sous',angry=c.state==='chase'||c.state==='alert',W=c.fat?1.4:0;
  const SKIN=cop?'#f3d2bf':'#fbd9c6',COAT=cop?'#9cc0f2':sous?'#d9ccf2':'#ffffff';
  kShadow(x,gy,6.8+W);
  for(const side of[-1,1]){const lift=mv?Math.max(0,Math.sin(ph+(side>0?Math.PI:0)))*1.4:0;kE(x+side*2.6,gy-1.2-lift,2.1,1.5,cop?'#3f4a78':'#6b5a66',.8)}
  // egg body with coat on the lower half
  ctx.save();ctx.beginPath();ctx.ellipse(x,y-10.5,6.6+W,9.4,0,0,TAU);ctx.fillStyle=SKIN;ctx.fill();ctx.clip();
  ctx.fillStyle=COAT;ctx.fillRect(x-9-W,y-9.5,18+W*2,10);ctx.restore();
  kE(x,y-10.5,6.6+W,9.4,null,1);kStroke(.7);ctx.beginPath();ctx.moveTo(x-6.2-W,y-9.5);ctx.quadraticCurveTo(x,y-8,x+6.2+W,y-9.5);ctx.stroke();
  if(!back){if(cop){kE(x+2.4,y-6,1,1.1,'#ffd66b',.5);ctx.fillStyle='#3f4a78';ctx.fillRect(x-.4,y-8.8,.8,4)}
    else{kE(x-1.4,y-5.8,.55,.55,'#e8a0b2',0);kE(x-1.4,y-3.6,.55,.55,'#e8a0b2',0);kE(x+1.4,y-5.8,.55,.55,'#e8a0b2',0);kE(x+1.4,y-3.6,.55,.55,'#e8a0b2',0);
      if(sous){ctx.fillStyle='#b99be6';ctx.beginPath();ctx.moveTo(x-3,y-9.4);ctx.lineTo(x+3,y-9.4);ctx.lineTo(x,y-6.6);ctx.closePath();ctx.fill()}}}
  // nub arms: wave up when they spot you
  const ay=angry?-15:-8,ax=angry?7.4:7;
  kE(x-ax-W,y+ay,1.6,2,SKIN,.8);kE(x+ax+W,y+ay,1.6,2,SKIN,.8);
  // face
  const fx=x+s*2,hy=y-13.5;
  if(!back){
    if(angry){kStroke(.8);ctx.beginPath();ctx.moveTo(fx-3.4,hy-2.4);ctx.lineTo(fx-1.2,hy-1.6);ctx.moveTo(fx+3.4,hy-2.4);ctx.lineTo(fx+1.2,hy-1.6);ctx.stroke();
      kE(fx,hy+2.6,1.1,1.2,'#8a3b45',.6)}
    else{kStroke(.6);ctx.beginPath();ctx.arc(fx,hy+2,.9,.3,Math.PI-.3);ctx.stroke()}
    kE(fx-2.2,hy,.9,1.2,'#3a2522',0);kE(fx+2.2,hy,.9,1.2,'#3a2522',0);kE(fx-2.4,hy-.4,.3,.3,'#fff',0);kE(fx+2,hy-.4,.3,.3,'#fff',0);
    kBlush(fx-4,hy+1.6,1.3);kBlush(fx+4,hy+1.6,1.3);
    if(c.stache!==false&&!cop){ctx.fillStyle='#6b4a42';ctx.beginPath();ctx.ellipse(fx-1,hy+1.3,1.2,.55,.3,0,TAU);ctx.ellipse(fx+1,hy+1.3,1.2,.55,-.3,0,TAU);ctx.fill()}
    if(angry&&Math.sin(now*8)>0){ctx.fillStyle='#9fd4f5';ctx.beginPath();ctx.ellipse(x+7,y-19,.9,1.3,0,0,TAU);ctx.fill()}
  }
  // hats
  const top=y-19.4;
  if(cop){kRR(x-5.4,top-2.6,10.8,4,2,'#3f4a78',.9);kE(x+s*2.2,top+1.4,5.4,1.1,'#2f3862',.7);if(!back)kE(x,top-.7,1,1,'#ffd66b',.5)}
  else{const t=sous?3:0;kRR(x-4.4,top-1.4,8.8,3,1.2,'#fff',.9);
    kE(x-3,top-3.6-t*.4,3,3+t*.3,'#fff',.9);kE(x+3,top-3.6-t*.4,3,3+t*.3,'#fff',.9);kE(x,top-5.6-t,3.6,3.6+t*.3,'#fff',.9);ctx.fillStyle='#fff';ctx.fillRect(x-4,top-2.4,8,2.6);
    if(sous){ctx.fillStyle='#b99be6';ctx.fillRect(x-4.2,top-.6,8.4,.9)}}
}
function drawCook(c){scaled(c,kCook)}

// ---------- puppies ----------
function kDog(e){
  const x=e.x,gy=e.y,d=dirOf(e.fa),s=d==='left'?-1:d==='right'?1:0,back=d==='up',mv=e.moving,ph=e.anim*1.5,k9=e.style==='k9';
  const C=k9?'#a9b4cf':'#f2d0a0',D=k9?'#6c7797':'#b98556',y=gy-(mv?Math.abs(Math.sin(ph))*.9:0);
  kShadow(x,gy,6.5);
  const wag=Math.sin(now*(e.state==='chase'?20:8))*1.8;kE(x-(s||.8)*6+wag*.3,y-7.5,1.4,2.4,C,.8);
  for(const[lx,o]of[[-3.6,0],[-1.2,Math.PI],[1.4,Math.PI],[3.8,0]]){const l=mv?Math.max(0,Math.sin(ph+o))*1.3:0;kE(x+lx,gy-1.1-l,1.3,1.1,C,.7)}
  kE(x,y-5.2,6,3.8,C,.9);if(!back&&!k9)kE(x+s*2,y-4.6,2.4,2,'#fff4e3',0);if(k9)kRR(x-3.6,y-8,7.2,4.2,1.8,'#7f9be0',.7);
  const hx=x+s*4,hy=y-10.6;kE(hx,hy,5.2,4.6,C,.9);
  kE(hx-4.4,hy+.6,1.6,3,D,.8);kE(hx+4.4,hy+.6,1.6,3,D,.8);
  if(!back){kE(hx+s*1.4+1.8,hy-1.2,1.4,1.4,D,0);
    kEye(hx+s*1.2-2,hy-.2,1.3,s);kEye(hx+s*1.2+2,hy-.2,1.3,s);kE(hx+s*1.4,hy+1.8,.9,.6,'#3a2522',0);
    kBlush(hx+s*1.2-3.4,hy+2,1.1);kBlush(hx+s*1.2+3.4,hy+2,1.1);
    if(e.state==='chase'){kE(hx+s*1.4,hy+3.2,.9,1,'#f58fa0',.5)}}
  if(k9){kRR(hx-3.4,hy-6,6.8,2.6,1.3,'#3f4a78',.8);kE(hx+s*1.6,hy-3.5,3.8,.8,'#2f3862',.6);kE(hx,hy-4.8,.7,.7,'#ffd66b',0)}
}
function drawDog(e){scaled(e,kDog)}
function drawK9(e){drawDog(e)}

// ---------- bubble cars with headlight eyes ----------
function drawCar(c){
  const x=c.x,y=c.y,s=c.dir,col=pastel(c.color,.5);
  kShadow(x,y,17);
  kRR(x-9,y-21,17,11,5,col,1);kRR(x-7,y-19.4,6,5.6,2,'#e5f4ff',.7);kRR(x+.6,y-19.4,6,5.6,2,'#e5f4ff',.7);
  kRR(x-16,y-13,32,9.5,4.8,col,1);kE(x-s*6,y-10,2.6,.8,'rgba(255,255,255,.5)',0);
  kE(x-9,y-3,3.6,3.2,'#6b5a66',.8);kE(x+9,y-3,3.6,3.2,'#6b5a66',.8);kE(x-9,y-3,1.3,1.2,'#eee',0);kE(x+9,y-3,1.3,1.2,'#eee',0);
  const hx=x+s*14;kE(hx,y-9.5,2.2,2.3,'#fff',.8);kE(hx+s*.4,y-9.3,1.1,1.3,'#3a2522',0);kE(hx+s*.1,y-9.9,.4,.4,'#fff',0);
  kBlush(x+s*10,y-6.5,1.4);kE(x-s*15.4,y-9,1,1,'#f58fa0',.5);
}

// ---------- kitchen furniture: pink tops, cream fronts, soft drop shadows ----------
const KTOP='#f7b3c2',KTOPL='#fbd0da',KFRONT='#fff3e2',KFRONTD='#f1ddc5';
function drawCounter(c,r,noItem){
  const x=c*TS,y=r*TS,below=isWallK(c,r+1),above=isWallK(c,r-1),L=isWallK(c-1,r),Rt=isWallK(c+1,r);
  if(!below){ctx.fillStyle='rgba(91,63,60,.13)';ctx.fillRect(x+(L?0:1),y+16,16-(L?0:1)-(Rt?0:1),3)}
  ctx.fillStyle=KTOP;ctx.fillRect(x-.01,y-6,16.02,below?22:12);
  ctx.fillStyle=KTOPL;if(!above)ctx.fillRect(x+(L?0:1.5),y-5,16-(L?0:1.5)-(Rt?0:1.5),1.6);
  kStroke(.9);ctx.beginPath();if(!above){ctx.moveTo(x,y-6);ctx.lineTo(x+16,y-6)}if(!L){ctx.moveTo(x,y-6);ctx.lineTo(x,y+(below?16:6))}if(!Rt){ctx.moveTo(x+16,y-6);ctx.lineTo(x+16,y+(below?16:6))}ctx.stroke();
  if(!below){ctx.fillStyle=KFRONT;ctx.fillRect(x-.01,y+6,16.02,10);ctx.fillStyle=KFRONTD;ctx.fillRect(x,y+14.4,16,1.6);
    kStroke(.9);ctx.beginPath();ctx.moveTo(x,y+6);ctx.lineTo(x+16,y+6);ctx.moveTo(x,y+16);ctx.lineTo(x+16,y+16);if(!L){ctx.moveTo(x,y+6);ctx.lineTo(x,y+16)}if(!Rt){ctx.moveTo(x+16,y+6);ctx.lineTo(x+16,y+16)}ctx.stroke();
    ctx.strokeStyle='rgba(91,63,60,.35)';ctx.lineWidth=.6;ctx.beginPath();ctx.moveTo(x+8,y+7.5);ctx.lineTo(x+8,y+13.5);ctx.stroke();
    kRR(x+5.4,y+9.4,1.6,.9,.45,'#d9b89a',0);kRR(x+9,y+9.4,1.6,.9,.45,'#d9b89a',0)}
  if(!noItem&&!(S.knocked&&S.knocked.has(c+','+r)))counterItem(c,r,x,y);
}
function drawOven(c,r){
  const x=c*TS,y=r*TS,below=isWallK(c,r+1),hot=hsh(c,r,3)<.5;
  if(!below){ctx.fillStyle='rgba(91,63,60,.13)';ctx.fillRect(x+1,y+16,14,3)}
  kRR(x,y-6,16,12,1.5,'#d8cdf0',.9);
  for(const[bx,by]of[[4.5,-2.4],[11.5,-2.4],[4.5,2.4],[11.5,2.4]]){kE(x+bx,y+by,2.4,1.6,'#a99bcc',.6);if(hot&&bx===4.5&&by<0){ctx.strokeStyle=Math.sin(now*14+c)>0?'#ff9aa8':'#ffb86b';ctx.lineWidth=.8;ctx.beginPath();ctx.ellipse(x+bx,y+by,1.7,1,0,0,TAU);ctx.stroke()}}
  if(hot&&Math.sin(now*3+c*2)>.2){const ph=(now*.9+c*.3)%1;ctx.strokeStyle=`rgba(255,255,255,${.7*(1-ph)})`;ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(x+4,y-4-ph*8);ctx.quadraticCurveTo(x+6,y-6-ph*8,x+4.5,y-8-ph*8);ctx.stroke()}
  if(!below){kRR(x,y+6,16,10,1.5,'#e8e0f7',.9);kRR(x+3,y+8.2,10,5.4,2,Math.sin(now*9+c)>0?'#ffc58f':'#ffd3a3',.7);
    kE(x+3.5,y+7.2,.7,.7,'#fff',.4);kE(x+12.5,y+7.2,.7,.7,'#fff',.4)}
}
function drawFridge(c,r){const x=c*TS,y=r*TS;ctx.fillStyle='rgba(91,63,60,.13)';ctx.fillRect(x+2,y+16,12,3);
  kRR(x+1,y-15,14,31,4,'#bfe8da',1);ctx.beginPath();ctx.moveTo(x+1,y-3);ctx.lineTo(x+15,y-3);kStroke(.7);ctx.stroke();
  kRR(x+3,y-12,1.3,5,.6,'#fff',.5);kRR(x+3,y,1.3,7,.6,'#fff',.5);
  kE(x+9.5,y-9,1.1,1.3,'#3a2522',0);kE(x+12,y-9,1.1,1.3,'#3a2522',0);kBlush(x+8.4,y-7,1);kBlush(x+13.2,y-7,1);
  kStroke(.5);ctx.beginPath();ctx.arc(x+10.75,y-7.6,.8,.3,Math.PI-.3);ctx.stroke();kE(x+9,y+5,1.3,1.3,'#ffd66b',.5)}
function drawShelf(c,r){const x=c*TS,y=r*TS;ctx.fillStyle='rgba(91,63,60,.13)';ctx.fillRect(x+1,y+16,14,3);kRR(x,y-12,16,28,2,'#fff3e2',.9);
  for(const yy of[-5,3,11]){ctx.fillStyle='#f1c9a8';ctx.fillRect(x+1,y+yy,14,1.4)}
  const J=['#f7a9b8','#ffe08a','#bfe8da','#bcd9f5','#d9ccf2'];
  for(let k=0;k<3;k++){kRR(x+1.6+k*4.8,y-11,3.4,5.6,1.3,J[(c+k)%5],.55);kRR(x+1.4+k*4.8,y-3,3.8,5.6,1.5,J[(c+k+2)%5],.55);kRR(x+2+k*4.6,y+5,3,5.6,1.3,J[(c+r+k)%5],.55)}}

// ---------- vision cones: flat soft wedges, colour = mood ----------
function cone(e){
  const col=e.state==='chase'?'rgba(255,120,150,.3)':e.state==='alert'?'rgba(255,255,255,.55)':e.state==='search'?'rgba(190,170,245,.32)':'rgba(255,222,110,.34)';
  const ox=e.x,oy=e.y-3,range=e.view+(pieTaken?10:0),N=20,pts=[];
  for(let i=0;i<=N;i++){const an=e.fa-e.half+2*e.half*i/N,ca=Math.cos(an),sa=Math.sin(an);let d=0;
    while(d<range){d+=3;if(solidAt(Math.floor((ox+ca*d)/TS),Math.floor((oy+sa*d)/TS))){d-=2;break}}pts.push([ox+ca*d,oy+sa*d])}
  e.cone={ox,oy,range,pts};
  ctx.fillStyle=col;ctx.beginPath();ctx.moveTo(ox,oy);for(const p of pts)ctx.lineTo(p[0],p[1]);ctx.closePath();ctx.fill();
}
function bubble(x,y,ch,col){kE(x,y+2,5,5,'#fff',1);ctx.fillStyle=col;ctx.font='700 8px Fredoka,sans-serif';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(ch,x,y+2.6)}

// ---------- overlay: just a soft warm vignette, no grain ----------
function lighting(){
  const v=ctx.createRadialGradient(VW/2,VH/2,VH*.4,VW/2,VH/2,VH*.85);v.addColorStop(0,'rgba(91,63,60,0)');v.addColorStop(1,'rgba(91,63,60,.14)');ctx.fillStyle=v;ctx.fillRect(0,0,VW,VH);
}

// ---------- pastel floors ----------
function buildBg(){
  bg=document.createElement('canvas');bg.width=S.cols*TS*RS;bg.height=S.rows*TS*RS;const g=bg.getContext('2d');g.scale(RS,RS);
  const m=ctx;ctx=g;const r_=(x,y,w,h,c)=>{g.fillStyle=c;g.fillRect(x,y,w,h)};
  const OUT='#4a4775',OUTL='#6e6aa0';
  if(S.kind==='kitchen'){
    for(let r=0;r<S.rows;r++)for(let c=0;c<S.cols;c++){const x=c*TS,y=r*TS;
      r_(x,y,16,16,((c+r)&1)?'#fff7ea':'#d7ebf8');g.strokeStyle='rgba(180,160,150,.28)';g.lineWidth=.5;g.strokeRect(x+.25,y+.25,15.5,15.5);}
    for(let c=0;c<S.cols;c++){const x=c*TS;for(let k=0;k<4;k++)r_(x+k*4,0,4,13,k&1?'#fde2e8':'#dff3ea');
      r_(x,12,16,4,'#f7b3c2');g.strokeStyle=KB;g.lineWidth=.8;g.beginPath();g.moveTo(x,12);g.lineTo(x+16,12);g.moveTo(x,16);g.lineTo(x+16,16);g.stroke();
      if(c===Math.floor(S.cols/2)){kE(x+8,6,3.4,3.4,'#fff',.8);g.beginPath();g.moveTo(x+8,6);g.lineTo(x+8,3.8);g.moveTo(x+8,6);g.lineTo(x+9.6,6.6);g.stroke()}
      if(c%5===2&&c<S.cols-1){kE(x+8,6.5,3.2,3.2,'#ffe08a',.7);kE(x+7,6,.5,.6,'#3a2522',0);kE(x+9,6,.5,.6,'#3a2522',0)}}
    r_(0,0,S.cols*TS,3,OUT);
    for(let r=1;r<S.rows;r++){r_(0,r*TS,TS,TS,OUT);r_(TS-2,r*TS,2,TS,OUTL);r_(S.cols*TS-TS,r*TS,TS,TS,OUT);r_(S.cols*TS-TS,r*TS,2,TS,OUTL)}
    r_(0,(S.rows-1)*TS,S.cols*TS,TS,OUT);r_(TS-2,(S.rows-1)*TS,S.cols*TS-2*TS+4,2,OUTL);
  }else{
    const M=(c,r)=>(r<0||r>=S.rows||c<0||c>=S.cols)?'W':S.map[r][c],ground=ch=>ch==='r'?'r':'gHX'.includes(ch)?'g':',';
    for(let r=0;r<S.rows;r++)for(let c=0;c<S.cols;c++){const x=c*TS,y=r*TS,u=ground(M(c,r));
      if(u==='r'){r_(x,y,16,16,'#c3bedb');if(ground(M(c,r-1))===',')r_(x,y,16,2,'rgba(91,63,60,.14)')}
      else if(u==='g'){r_(x,y,16,16,'#cdeec4');if(hsh(c,r,60)<.08){const fx=x+4+hsh(c,r,61)*8,fy=y+4+hsh(c,r,62)*8;for(let k=0;k<5;k++)kE(fx+Math.cos(k*1.26)*1.3,fy+Math.sin(k*1.26)*1.3,.9,.9,pick(['#f7a9b8','#fff','#ffe08a']),0);kE(fx,fy,.7,.7,'#ffd66b',0)}}
      else{r_(x,y,16,16,'#fff4e4');g.strokeStyle='rgba(190,165,150,.35)';g.lineWidth=.5;g.strokeRect(x+.25,y+.25,15.5,15.5);
        if(ground(M(c,r+1))==='r'){r_(x,y+12,16,4,'#fde2e8');g.strokeStyle=KB;g.lineWidth=.8;g.beginPath();g.moveTo(x,y+12);g.lineTo(x+16,y+12);g.moveTo(x,y+16);g.lineTo(x+16,y+16);g.stroke()}
        if(ground(M(c,r-1))==='r'){r_(x,y,16,3,'#fde2e8');g.strokeStyle=KB;g.lineWidth=.8;g.beginPath();g.moveTo(x,y+3);g.lineTo(x+16,y+3);g.stroke()}}}
    S.lanes.forEach((L,i)=>{if(i%2)return;const y=(L.r+2)*TS;for(let x=2;x<S.cols*TS;x+=12)kRR(x,y-1,6,2,1,'#fff',0);
      const zx=(2+((L.r*5)%10))*TS;for(let k=0;k<5;k++)r_(zx+k*6,L.r*TS+3,4,58,'rgba(255,255,255,.6)')});
    for(let c=0;c<S.cols;c++){const x=c*TS;r_(x,0,16,16,OUT);r_(x,TS,16,16,'#f9c9d3');g.strokeStyle='rgba(200,120,140,.35)';g.lineWidth=.5;
      for(let xx=x+4;xx<x+16;xx+=4){g.beginPath();g.moveTo(xx,TS);g.lineTo(xx,2*TS);g.stroke()}
      if(c%4===1&&Math.abs(c-S.doorCol)>1){kRR(x+2.5,TS+2,11,9,3,'#fff6c8',.8);g.beginPath();g.moveTo(x+8,TS+2);g.lineTo(x+8,TS+11);g.stroke()}}
    g.strokeStyle=KB;g.lineWidth=.9;g.beginPath();g.moveTo(0,TS);g.lineTo(S.cols*TS,TS);g.moveTo(0,2*TS);g.lineTo(S.cols*TS,2*TS);g.stroke();
    const dx=S.doorCol*TS;kRR(dx+2,TS+2,12,14,3,'#f1c9a8',.9);kE(dx+11,TS+10,.8,.8,'#ffd66b',.5);
    for(let k=0;k<5;k++){g.fillStyle=k&1?'#fff':'#f7a9b8';g.fillRect(dx-2+k*4,TS-2,4,5)}kStroke(.8);g.strokeRect(dx-2,TS-2,20,5);
  }
  ctx=m;
}
