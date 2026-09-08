const $ = id => document.getElementById(id);
const CFG = {
line:{maxD:10,reservoir:760},
area:{maxW:10,maxH:6,maxSquare:6,maxTriW:10,maxTriH:6,maxR:3.1,reservoir:1300},
vol:{maxR:3.2,maxH:7,maxA:5.4,maxB:4.2,reservoir:2400}
};
const COLORS = {
text:'#111827', muted:'#6b7280', grid:'#eef2f7', border:'#e5e7eb', ghost:'#d1d5db',
line:'#2563eb', area:'#16a34a', vol:'#ea580c', cyan:'#0891b2', pink:'#db2777', black:'#111827'
};
const state = {
d:4.2,
areaShape:'rectangle', rectW:6.4, rectH:3.8, squareS:4.4,
triA:{x:1.0,y:1.0}, triB:{x:8.5,y:1.6}, triC:{x:3.8,y:5.2},
circR:2.15,
solid:'cylinder', r:2.1, h3:4.8, a3:3.8, b3:2.8
};
let showTheory = true;
let pts1=[], pts2=[], pts3=[];
let hist1=[], hist2=[], hist3=[];
let drag = null;
let g1={}, g2={}, g3={};
const stage1=$('stage1'), stage2=$('stage2'), stage3=$('stage3');
const chart1=$('chart1'), chart2=$('chart2'), chart3=$('chart3');
function fitCanvas(canvas){
const rect = canvas.getBoundingClientRect();
const dpr = Math.max(1, window.devicePixelRatio || 1);
const W = Math.round(rect.width * dpr);
const H = Math.round(rect.height * dpr);
if(canvas.width !== W || canvas.height !== H){ canvas.width = W; canvas.height = H; }
const ctx = canvas.getContext('2d');
ctx.setTransform(dpr,0,0,dpr,0,0);
return {ctx,w:rect.width,h:rect.height};
}
function rnd32(a){ return function(){ let t = a += 0x6D2B79F5; t = Math.imul(t ^ t >>> 15, t | 1); t ^= t + Math.imul(t ^ t >>> 7, t | 61); return ((t ^ t >>> 14) >>> 0) / 4294967296; }; }
function clamp(v,a,b){ return Math.max(a, Math.min(b, v)); }
function clearCtx(ctx,w,h){ ctx.clearRect(0,0,w,h); }
function pointerPos(e,canvas){ const r = canvas.getBoundingClientRect(); return {x:e.clientX-r.left,y:e.clientY-r.top}; }
function near(p,q,rad=18){ return q && ((p.x-q.x)**2 + (p.y-q.y)**2 <= rad*rad); }
function reseed(){
const r = rnd32((Date.now() >>> 0) ^ 987654321);
pts1 = Array.from({length:CFG.line.reservoir},()=>({x:r()*CFG.line.maxD, j:(r()-.5)*18}));
pts2 = Array.from({length:CFG.area.reservoir},()=>({u:r(), v:r()}));
const maxXY = Math.max(CFG.vol.maxR, CFG.vol.maxA/2, CFG.vol.maxB/2);
pts3 = Array.from({length:CFG.vol.reservoir},()=>({x:(r()*2-1)*maxXY, y:(r()*2-1)*maxXY, z:r()*CFG.vol.maxH}));
clearHistoryAll();
drawAll();
}
function clearHistoryAll(){ hist1=[]; hist2=[]; hist3=[]; pushAll(true); }
function clearHistory2(){ hist2=[]; pushAll(true); }
function clearHistory3(){ hist3=[]; pushAll(true); }
function lineCount(){ return pts1.reduce((n,p)=>n + (p.x <= state.d), 0); }
function triangleArea(A=state.triA,B=state.triB,C=state.triC){
return Math.abs((A.x*(B.y-C.y)+B.x*(C.y-A.y)+C.x*(A.y-B.y))/2);
}
function areaMeasure(){
switch(state.areaShape){
case 'square': return state.squareS * state.squareS;
case 'triangle': return triangleArea();
case 'circle': return Math.PI * state.circR * state.circR;
default: return state.rectW * state.rectH;
}
}
function areaShapeName(){
return {rectangle:'Dikdörtgen', square:'Kare', triangle:'Üçgen', circle:'Daire'}[state.areaShape];
}
function areaDensity(){
if(state.areaShape === 'circle') return CFG.area.reservoir / ((2*CFG.area.maxR) * (2*CFG.area.maxR));
return CFG.area.reservoir / (CFG.area.maxW * CFG.area.maxH);
}
function areaMaxMeasure(){
switch(state.areaShape){
case 'square': return CFG.area.maxSquare * CFG.area.maxSquare;
case 'triangle': return CFG.area.maxTriW * CFG.area.maxTriH / 2;
case 'circle': return Math.PI * CFG.area.maxR * CFG.area.maxR;
default: return CFG.area.maxW * CFG.area.maxH;
}
}
function areaPointValue(p){
if(state.areaShape === 'circle') return {x:(p.u*2-1)*CFG.area.maxR, y:(p.v*2-1)*CFG.area.maxR};
return {x:p.u*CFG.area.maxW, y:p.v*CFG.area.maxH};
}
function pointInTriangle(P,A=state.triA,B=state.triB,C=state.triC){
const cross=(P1,P2,P3)=>(P1.x-P3.x)*(P2.y-P3.y)-(P2.x-P3.x)*(P1.y-P3.y);
const d1=cross(P,A,B), d2=cross(P,B,C), d3=cross(P,C,A);
const hasNeg=(d1<0)||(d2<0)||(d3<0), hasPos=(d1>0)||(d2>0)||(d3>0);
return !(hasNeg && hasPos);
}
function insideArea(pt){
switch(state.areaShape){
case 'square': return pt.x >= 0 && pt.y >= 0 && pt.x <= state.squareS && pt.y <= state.squareS;
case 'triangle': return pointInTriangle(pt);
case 'circle': return pt.x*pt.x + pt.y*pt.y <= state.circR*state.circR;
default: return pt.x >= 0 && pt.y >= 0 && pt.x <= state.rectW && pt.y <= state.rectH;
}
}
function areaCount(){ return pts2.reduce((n,p)=>n + (insideArea(areaPointValue(p)) ? 1 : 0), 0); }
function solidName(){ return {cylinder:'Silindir', sphere:'Küre', prism:'Dikdörtgen prizma', cone:'Koni'}[state.solid]; }
function volume3(){
switch(state.solid){
case 'sphere': return 4*Math.PI*state.r*state.r*state.r/3;
case 'prism': return state.a3*state.b3*state.h3;
case 'cone': return Math.PI*state.r*state.r*state.h3/3;
default: return Math.PI*state.r*state.r*state.h3;
}
}
function volumeMax(){
switch(state.solid){
case 'sphere': return 4*Math.PI*CFG.vol.maxR**3/3;
case 'prism': return CFG.vol.maxA*CFG.vol.maxB*CFG.vol.maxH;
case 'cone': return Math.PI*CFG.vol.maxR**2*CFG.vol.maxH/3;
default: return Math.PI*CFG.vol.maxR**2*CFG.vol.maxH;
}
}
function volumeDensity(){
const maxXY = Math.max(CFG.vol.maxR, CFG.vol.maxA/2, CFG.vol.maxB/2);
return CFG.vol.reservoir / ((2*maxXY)*(2*maxXY)*CFG.vol.maxH);
}
function insideSolid(p){
if(state.solid === 'sphere'){
const dz = p.z - state.r;
return p.x*p.x + p.y*p.y + dz*dz <= state.r*state.r;
}
if(state.solid === 'prism') return Math.abs(p.x) <= state.a3/2 && Math.abs(p.y) <= state.b3/2 && p.z <= state.h3;
if(state.solid === 'cone'){
if(p.z > state.h3) return false;
const rr = state.r*(1-p.z/state.h3);
return p.x*p.x + p.y*p.y <= rr*rr;
}
return p.x*p.x + p.y*p.y <= state.r*state.r && p.z <= state.h3;
}
function count3(){ return pts3.reduce((n,p)=>n + (insideSolid(p) ? 1 : 0), 0); }
function pushAll(force=false){
const p1 = {x:state.d, s:lineCount()};
const p2 = {x:areaMeasure(), s:areaCount()};
const p3 = {x:volume3(), s:count3()};
maybePush(hist1,p1,force); maybePush(hist2,p2,force); maybePush(hist3,p3,force);
}
function maybePush(arr,p,force){
const prev = arr[arr.length-1];
if(force || !prev || Math.abs(prev.x-p.x) > 1e-5 || prev.s !== p.s){ arr.push(p); if(arr.length > 160) arr.shift(); }
}
function regression(arr){
let xx=0,xs=0; for(const p of arr){ xx += p.x*p.x; xs += p.x*p.s; } return xx>0 ? xs/xx : 0;
}
function r2(arr){
if(arr.length < 3) return NaN;
const mean = arr.reduce((a,p)=>a+p.s,0)/arr.length; const k = regression(arr);
let ssTot=0, ssRes=0;
for(const p of arr){ ssTot += (p.s-mean)**2; ssRes += (p.s-k*p.x)**2; }
return ssTot>0 ? 1-ssRes/ssTot : NaN;
}
function handle(ctx,x,y,r,color){
ctx.save(); ctx.fillStyle = color; ctx.shadowBlur = 10; ctx.shadowColor = color;
ctx.beginPath(); ctx.arc(x,y,r,0,Math.PI*2); ctx.fill(); ctx.shadowBlur = 0; ctx.strokeStyle = '#ffffff'; ctx.lineWidth = 2; ctx.stroke(); ctx.restore();
}
function drawStage1(){
const {ctx,w,h} = fitCanvas(stage1); clearCtx(ctx,w,h);
const left=38, right=w-38, y=h*0.5, span=Math.max(20,right-left), xEnd=left + span*(state.d/CFG.line.maxD);
g1 = {left,right,y,xEnd};
ctx.strokeStyle = COLORS.ghost; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(left,y); ctx.lineTo(right,y); ctx.stroke();
for(const p of pts1){
const x = left + span*(p.x/CFG.line.maxD); const inside = p.x <= state.d;
ctx.beginPath(); ctx.arc(x, y + p.j, inside ? 2.1 : 1.25, 0, Math.PI*2); ctx.fillStyle = inside ? COLORS.line : '#d9dde5'; ctx.globalAlpha = inside ? 0.92 : 0.45; ctx.fill();
}
ctx.globalAlpha = 1;
ctx.strokeStyle = COLORS.line; ctx.lineWidth = 4; ctx.beginPath(); ctx.moveTo(left,y); ctx.lineTo(xEnd,y); ctx.stroke();
handle(ctx,left,y,5,COLORS.black); handle(ctx,xEnd,y,8,COLORS.line);
const S = lineCount(); $('s1').textContent = S;
$('stats1').innerHTML = `d = <b>${state.d.toFixed(2)}</b> &nbsp; · &nbsp; yoğunluk ≈ <b>${(S/state.d).toFixed(1)}</b> nokta/birim`;
}
function drawStage2(){
const {ctx,w,h} = fitCanvas(stage2); clearCtx(ctx,w,h);
const padL=40,padR=28,padT=22,padB=32;
const boxW=w-padL-padR, boxH=h-padT-padB, x0=padL, y0=h-padB;
// Kare ve üçgenin ekranda gerçekten kare/serbest üçgen görünmesi için
// x ve y yönlerinde aynı dünya->piksel ölçeğini kullanıyoruz.
const scale=Math.min(boxW/CFG.area.maxW, boxH/CFG.area.maxH);
const worldW=CFG.area.maxW*scale, worldH=CFG.area.maxH*scale;
const worldX0=x0+(boxW-worldW)/2;
const worldY0=y0-(boxH-worldH)/2;
const toPX=(x)=>worldX0+x*scale;
const toPY=(y)=>worldY0-y*scale;
g2 = {x0,y0,boxW,boxH,scale,worldX0,worldY0};
const drawWorldPoints=()=>{
for(const p of pts2){
const pt=areaPointValue(p);
const X=toPX(pt.x), Y=toPY(pt.y), inside=insideArea(pt);
ctx.beginPath(); ctx.arc(X,Y,inside?1.9:1.15,0,Math.PI*2);
ctx.fillStyle=inside?COLORS.area:'#d9dde5';
ctx.globalAlpha=inside?.9:.42; ctx.fill();
}
ctx.globalAlpha=1;
};
if(state.areaShape === 'circle'){
const maxR=CFG.area.maxR;
const cx=x0+boxW/2, cy=y0-boxH/2;
const maxRPx=Math.min(boxW,boxH)/2;
const R=maxRPx*(state.circR/maxR);
g2.circle={cx,cy,R,maxRPx};
// Hayalet maksimum daire YOK: yalnızca gerçek noktalar ve aktif daire.
for(const p of pts2){
const pt=areaPointValue(p);
const X=cx+(pt.x/maxR)*maxRPx, Y=cy-(pt.y/maxR)*maxRPx;
const inside=insideArea(pt);
ctx.beginPath(); ctx.arc(X,Y,inside?1.9:1.15,0,Math.PI*2);
ctx.fillStyle=inside?COLORS.area:'#d9dde5';
ctx.globalAlpha=inside?.9:.42; ctx.fill();
}
ctx.globalAlpha=1;
ctx.fillStyle='rgba(22,163,74,.07)';
ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.fill();
ctx.strokeStyle=COLORS.area; ctx.lineWidth=3;
ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.stroke();
ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+R,cy);
ctx.strokeStyle=COLORS.line; ctx.lineWidth=2.2; ctx.stroke();
handle(ctx,cx+R,cy,8,COLORS.line);
$('hint2').textContent='Mavi tutamaç: yarıçap r';
} else if(state.areaShape === 'triangle'){
// Serbest, başlangıçta çeşitkenar üçgen. Her köşe bağımsız sürüklenebilir.
drawWorldPoints();
const A={x:toPX(state.triA.x),y:toPY(state.triA.y)};
const B={x:toPX(state.triB.x),y:toPY(state.triB.y)};
const C={x:toPX(state.triC.x),y:toPY(state.triC.y)};
g2.triA=A; g2.triB=B; g2.triC=C;
ctx.fillStyle='rgba(22,163,74,.08)';
ctx.beginPath(); ctx.moveTo(A.x,A.y); ctx.lineTo(B.x,B.y); ctx.lineTo(C.x,C.y); ctx.closePath(); ctx.fill();
ctx.strokeStyle=COLORS.area; ctx.lineWidth=3;
ctx.beginPath(); ctx.moveTo(A.x,A.y); ctx.lineTo(B.x,B.y); ctx.lineTo(C.x,C.y); ctx.closePath(); ctx.stroke();
handle(ctx,A.x,A.y,8,COLORS.line);
handle(ctx,B.x,B.y,8,COLORS.line);
handle(ctx,C.x,C.y,8,COLORS.line);
ctx.fillStyle=COLORS.text; ctx.font='12px Arial';
ctx.fillText('A',A.x+10,A.y-8); ctx.fillText('B',B.x+10,B.y-8); ctx.fillText('C',C.x+10,C.y-8);
$('hint2').textContent='A, B ve C köşelerinin her biri serbestçe sürüklenebilir';
} else if(state.areaShape === 'square'){
drawWorldPoints();
const s=state.squareS;
const x1=toPX(s), y1=toPY(s);
const xBase=toPX(0), yBase=toPY(0);
g2.squareHandle={x:x1,y:y1};
// Hayalet dikdörtgen/kare YOK.
ctx.fillStyle='rgba(22,163,74,.08)';
ctx.fillRect(xBase,y1,s*scale,s*scale);
ctx.strokeStyle=COLORS.area; ctx.lineWidth=3;
ctx.strokeRect(xBase,y1,s*scale,s*scale);
handle(ctx,x1,y1,8,COLORS.line);
$('hint2').textContent='Mavi tutamaç: kenar uzunluğu a';
} else {
drawWorldPoints();
const xBase=toPX(0), yBase=toPY(0);
const x1=toPX(state.rectW), y1=toPY(state.rectH);
g2.rectHandle={x:x1,y:y1};
// Dikdörtgende çalışma alanının sınırı yardımcı olarak kalabilir.
ctx.strokeStyle=COLORS.ghost; ctx.lineWidth=1;
ctx.strokeRect(toPX(0),toPY(CFG.area.maxH),CFG.area.maxW*scale,CFG.area.maxH*scale);
ctx.fillStyle='rgba(22,163,74,.08)';
ctx.fillRect(xBase,y1,state.rectW*scale,state.rectH*scale);
ctx.strokeStyle=COLORS.area; ctx.lineWidth=3;
ctx.strokeRect(xBase,y1,state.rectW*scale,state.rectH*scale);
handle(ctx,x1,y1,8,COLORS.line);
$('hint2').textContent='Mavi tutamaç: genişlik ve yükseklik';
}
const A=areaMeasure(), S=areaCount(); $('s2').textContent=S;
let desc='';
if(state.areaShape==='rectangle') desc=`w = <b>${state.rectW.toFixed(2)}</b>, h = <b>${state.rectH.toFixed(2)}</b>`;
if(state.areaShape==='square') desc=`a = <b>${state.squareS.toFixed(2)}</b>`;
if(state.areaShape==='triangle'){
const dist=(P,Q)=>Math.hypot(P.x-Q.x,P.y-Q.y);
const a=dist(state.triB,state.triC), b=dist(state.triC,state.triA), c=dist(state.triA,state.triB);
desc=`kenarlar ≈ <b>${a.toFixed(2)}, ${b.toFixed(2)}, ${c.toFixed(2)}</b>`;
}
if(state.areaShape==='circle') desc=`r = <b>${state.circR.toFixed(2)}</b>`;
$('stats2').innerHTML=`${areaShapeName()} · ${desc} &nbsp; · &nbsp; A = <b>${A.toFixed(2)}</b> &nbsp; · &nbsp; S/A = <b>${(S/A).toFixed(1)}</b>`;
}
function project3D(x,y,z,cx,baseY,sx,sy,sz){ return {x:cx + (x-y)*sx, y:baseY - z*sz + (x+y)*sy}; }
function ellipse(ctx,cx,cy,rx,ry,stroke,lw=2.3){ ctx.beginPath(); ctx.ellipse(cx,cy,Math.abs(rx),Math.abs(ry),0,0,Math.PI*2); ctx.strokeStyle=stroke; ctx.lineWidth=lw; ctx.stroke(); }
