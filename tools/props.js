// ================= PROP SPRITES =================
// Kawaii props from the style mockup, packed in assets/art/props.webp (same format as SPR).
const PROP={"tree":[0,0,188,176,94,176,4],"lamp":[190,0,115,168,58,168,4],"home":[307,0,132,120,66,120,4],"car1":[441,0,144,97,72,97,4],"car2":[587,0,144,97,72,97,4],"car0":[733,0,144,96,72,96,4],"car3":[0,178,144,96,72,96,4],"fridge":[146,178,66,94,33,94,4],"bin":[214,178,72,80,36,80,4],"shelf":[288,178,68,76,34,76,4],"bush":[358,178,95,72,48,72,4],"oven":[455,178,68,65,34,65,4],"sink":[525,178,68,57,34,57,4],"hydrant":[595,178,47,52,24,52,4],"pie":[644,178,52,43,26,43,4],"planter":[698,178,60,41,30,41,4],"fence":[760,178,68,38,34,38,4],"bowl":[830,178,34,36,17,36,4],"cake":[866,178,36,32,18,32,4],"donut":[904,178,36,30,18,30,4],"board":[942,178,42,29,21,29,4],"onigiri":[986,178,30,28,15,28,4],"plates":[0,276,32,25,16,25,4],"pot":[34,276,36,24,18,24,4]};
const PROP_IMG=new Image();let propReady=false;PROP_IMG.onload=()=>{propReady=true;if(S)buildBg()};PROP_IMG.src='assets/art/props.webp';
function drawPropImg(n,x,y,flip,k=1){const d=PROP[n];if(!d||!propReady)return false;const u=d[6],w=d[2]/u*k,h=d[3]/u*k,ax=d[4]/u*k,ay=d[5]/u*k;
  if(flip){ctx.save();ctx.translate(x,y);ctx.scale(-1,1);ctx.drawImage(PROP_IMG,d[0],d[1],d[2],d[3],-ax,-ay,w,h);ctx.restore()}
  else ctx.drawImage(PROP_IMG,d[0],d[1],d[2],d[3],x-ax,y-ay,w,h);return true}
// (function declarations are hoisted, so the vector versions can't be kept as fallbacks; props just wait for the atlas)
function drawPie(cx,cy){if(!drawPropImg('pie',cx,cy+4,false,.82))drawPieToon(cx,cy)}
function drawBin(c,r,home){if(!propReady)return;const x=c*TS+8,y=r*TS+14;
  if(home){const near=Math.hypot(player.x-x,player.y-(y-4))<52,b=near?Math.abs(Math.sin(now*6))*2:0;
    ctx.fillStyle='rgba(160,240,190,.35)';ctx.beginPath();ctx.ellipse(x,y,14+Math.sin(now*3)*1.5,5,0,0,TAU);ctx.fill();
    kShadow(x,y,11);drawPropImg('home',x,y-b,false);
    if(Math.sin(now*4)>0){sparkle(x-14,y-26,1.8);sparkle(x+15,y-12,1.4)}}
  else{kShadow(x,y,7);drawPropImg('bin',x,y,hsh(c,r,5)<.5,.9)}}
function drawHedge(c,r){if(!propReady)return;const x=c*TS+8,y=r*TS+15;kShadow(x,y-1,9);drawPropImg('bush',x,y,hsh(c,r,8)<.5,.86)}
function drawTree(c,r){if(!propReady)return;const x=c*TS+8,y=r*TS+15;kShadow(x,y,11);drawPropImg('tree',x,y,hsh(c,r,9)<.5,.84)}
function drawFence(c,r){if(!propReady)return;drawPropImg('fence',c*TS+8,r*TS+13,false,1.02)}
function drawLamp(l){if(!propReady)return;ctx.fillStyle='rgba(255,236,160,.28)';ctx.beginPath();ctx.ellipse(l.x,l.y-1,15,5,0,0,TAU);ctx.fill();kShadow(l.x,l.y,4);drawPropImg('lamp',l.x,l.y+1,false,.9)}
function drawCar(c){if(!propReady)return;const i=Math.abs(Math.round(c.x0!==undefined?c.x0:(c.id||0)))%4;
  if(c.skin===undefined)c.skin=Math.floor(Math.random()*4);kShadow(c.x,c.y,17);drawPropImg('car'+c.skin,c.x,c.y+1,c.dir<0,.95)}
const CITEM=['board','pot','bowl','cake','plates','onigiri'];
function counterItem(c,r,x,y){if(!propReady)return;const h=hsh(c,r,7);if(h>=.48)return;
  drawPropImg(CITEM[Math.floor(h/.08)],x+8,y+3.5,hsh(c,r,11)<.5);
  if(h>=.08&&h<.16&&Math.sin(now*3+c)>.3){const ph=(now*.9+c*.3)%1;ctx.strokeStyle=`rgba(255,255,255,${.7*(1-ph)})`;ctx.lineWidth=.8;ctx.beginPath();ctx.moveTo(x+8,y-3-ph*7);ctx.quadraticCurveTo(x+10,y-5-ph*7,x+8.5,y-7-ph*7);ctx.stroke()}}
function drawOven(c,r){if(!propReady)return;const x=c*TS,y=r*TS;drawCounter(c,r,true);
  if(!isWallK(c,r+1)){drawPropImg('oven',x+8,y+16.4,false);if(hsh(c,r,3)<.5&&Math.sin(now*3+c*2)>.2){const ph=(now*.9+c*.3)%1;ctx.strokeStyle=`rgba(255,255,255,${.7*(1-ph)})`;ctx.lineWidth=.9;ctx.beginPath();ctx.moveTo(x+5,y-1-ph*8);ctx.quadraticCurveTo(x+7,y-3-ph*8,x+5.5,y-5-ph*8);ctx.stroke()}}
  else drawPropImg('pot',x+8,y+3.5)}
function drawFridge(c,r){if(!propReady)return;const x=c*TS,y=r*TS;ctx.fillStyle='rgba(91,63,60,.13)';ctx.fillRect(x+2,y+16,12,3);drawPropImg('fridge',x+8,y+16.5,false,1.02)}
function drawShelf(c,r){if(!propReady)return;const x=c*TS,y=r*TS;ctx.fillStyle='rgba(91,63,60,.13)';ctx.fillRect(x+1,y+16,14,3);drawPropImg('shelf',x+8,y+16.5,false,1.02)}
