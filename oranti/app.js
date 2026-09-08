function drawStage3(){
const {ctx,w,h} = fitCanvas(stage3); clearCtx(ctx,w,h);
const cx=w*.52, baseY=h*.8; const sx=Math.min(w/17,22), sy=sx*.32, sz=Math.min(h/10,25);
g3 = {cx,baseY,sx,sy,sz};
const visible = pts3.filter(insideSolid); const step = Math.max(1, Math.ceil(visible.length/460));
if(state.solid === 'sphere'){
const R = state.r*sx*1.26, cy = baseY - state.r*sz; g3.sphereCenter = {x:cx,y:cy}; g3.rHandle={x:cx+R,y:cy};
ctx.fillStyle='rgba(234,88,12,.06)'; ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.fill();
ctx.strokeStyle = COLORS.vol; ctx.lineWidth = 2.5; ctx.beginPath(); ctx.arc(cx,cy,R,0,Math.PI*2); ctx.stroke();
ctx.globalAlpha = .3; ctx.beginPath(); ctx.ellipse(cx,cy,R,R*.34,0,0,Math.PI*2); ctx.stroke(); ctx.globalAlpha = 1;
for(let i=0;i<visible.length;i+=step){ const p=visible[i]; const q=project3D(p.x,p.y,p.z,cx,baseY,sx*.95,sy,sz); ctx.beginPath(); ctx.arc(q.x,q.y,1.45,0,Math.PI*2); ctx.fillStyle=COLORS.vol; ctx.globalAlpha=.62; ctx.fill(); }
ctx.globalAlpha=1; ctx.strokeStyle=COLORS.line; ctx.lineWidth=2.2; ctx.beginPath(); ctx.moveTo(cx,cy); ctx.lineTo(cx+R,cy); ctx.stroke(); handle(ctx,cx+R,cy,8,COLORS.line);
$('hint3').textContent = 'Mavi tutamaç: yarıçap r';
} else if(state.solid === 'prism'){
const ax=state.a3*sx*.72, by=state.b3*sx*.38, topY=baseY-state.h3*sz, left=cx-ax/2, right=cx+ax/2, d=by;
g3 = {...g3, aHandle:{x:right,y:baseY}, bHandle:{x:cx,y:baseY+d}, hHandle:{x:left,y:topY}};
ctx.fillStyle='rgba(234,88,12,.06)'; ctx.beginPath(); ctx.rect(left,topY,right-left,baseY-topY); ctx.fill();
ctx.strokeStyle=COLORS.vol; ctx.lineWidth=2.4; ctx.strokeRect(left,topY,right-left,baseY-topY);
ctx.beginPath(); ctx.moveTo(left+d,topY-d*.35); ctx.lineTo(right+d,topY-d*.35); ctx.lineTo(right+d,baseY-d*.35); ctx.lineTo(left+d,baseY-d*.35); ctx.closePath(); ctx.stroke();
ctx.beginPath(); ctx.moveTo(left,topY); ctx.lineTo(left+d,topY-d*.35); ctx.moveTo(right,topY); ctx.lineTo(right+d,topY-d*.35); ctx.moveTo(right,baseY); ctx.lineTo(right+d,baseY-d*.35); ctx.moveTo(left,baseY); ctx.lineTo(left+d,baseY-d*.35); ctx.stroke();
for(let i=0;i<visible.length;i+=step){ const p=visible[i]; const q=project3D(p.x,p.y,p.z,cx,baseY,sx*.72,sy*.84,sz); ctx.beginPath(); ctx.arc(q.x,q.y,1.45,0,Math.PI*2); ctx.fillStyle=COLORS.vol; ctx.globalAlpha=.62; ctx.fill(); }
ctx.globalAlpha=1; ctx.strokeStyle=COLORS.line; ctx.beginPath(); ctx.moveTo(cx,baseY); ctx.lineTo(right,baseY); ctx.stroke(); handle(ctx,right,baseY,8,COLORS.line); ctx.strokeStyle=COLORS.pink; ctx.beginPath(); ctx.moveTo(cx,baseY); ctx.lineTo(cx,baseY+d); ctx.stroke(); handle(ctx,cx,baseY+d,8,COLORS.pink); ctx.strokeStyle=COLORS.cyan; ctx.beginPath(); ctx.moveTo(left,baseY); ctx.lineTo(left,topY); ctx.stroke(); handle(ctx,left,topY,8,COLORS.cyan);
$('hint3').textContent = 'Mavi: a · Pembe: b · Turkuaz: yükseklik h';
} else {
const topY=baseY-state.h3*sz, rx=state.r*sx*1.38, ry=state.r*sx*.44; g3 = {...g3, rHandle:{x:cx+rx,y:baseY}, hHandle:{x:cx,y:topY}};
ctx.fillStyle='rgba(234,88,12,.06)'; ctx.strokeStyle=COLORS.vol; ctx.lineWidth=2.4;
if(state.solid === 'cone'){
ctx.beginPath(); ctx.moveTo(cx,topY); ctx.lineTo(cx-rx,baseY); ctx.ellipse(cx,baseY,rx,ry,0,Math.PI,0); ctx.closePath(); ctx.fill(); ctx.stroke(); ellipse(ctx,cx,baseY,rx,ry,COLORS.vol,2.2);
} else {
ctx.beginPath(); ctx.moveTo(cx-rx,baseY); ctx.lineTo(cx-rx,topY); ctx.ellipse(cx,topY,rx,ry,0,Math.PI,0); ctx.lineTo(cx+rx,baseY); ctx.ellipse(cx,baseY,rx,ry,0,0,Math.PI); ctx.closePath(); ctx.fill();
ctx.beginPath(); ctx.moveTo(cx-rx,baseY); ctx.lineTo(cx-rx,topY); ctx.moveTo(cx+rx,baseY); ctx.lineTo(cx+rx,topY); ctx.stroke(); ellipse(ctx,cx,topY,rx,ry,COLORS.vol,2.4); ellipse(ctx,cx,baseY,rx,ry,COLORS.vol,2.4);
}
for(let i=0;i<visible.length;i+=step){ const p=visible[i]; const q=project3D(p.x,p.y,p.z,cx,baseY,sx*.98,sy,sz); ctx.beginPath(); ctx.arc(q.x,q.y,1.5,0,Math.PI*2); ctx.fillStyle=COLORS.vol; ctx.globalAlpha=.64; ctx.fill(); }
ctx.globalAlpha=1; ctx.strokeStyle=COLORS.line; ctx.lineWidth=2.1; ctx.beginPath(); ctx.moveTo(cx,baseY); ctx.lineTo(cx+rx,baseY); ctx.stroke(); handle(ctx,cx+rx,baseY,8,COLORS.line); ctx.strokeStyle=COLORS.cyan; ctx.beginPath(); ctx.moveTo(cx,baseY); ctx.lineTo(cx,topY); ctx.stroke(); handle(ctx,cx,topY,8,COLORS.cyan);
$('hint3').textContent = state.solid === 'cone' ? 'Mavi: yarıçap r · Turkuaz: yükseklik h' : 'Mavi: yarıçap r · Turkuaz: yükseklik h';
}
const V = volume3(), S = count3(); $('s3').textContent = S;
let desc = '';
if(state.solid === 'sphere') desc = `r = <b>${state.r.toFixed(2)}</b>`;
if(state.solid === 'cylinder') desc = `r = <b>${state.r.toFixed(2)}</b>, h = <b>${state.h3.toFixed(2)}</b>`;
if(state.solid === 'cone') desc = `r = <b>${state.r.toFixed(2)}</b>, h = <b>${state.h3.toFixed(2)}</b>`;
if(state.solid === 'prism') desc = `a = <b>${state.a3.toFixed(2)}</b>, b = <b>${state.b3.toFixed(2)}</b>, h = <b>${state.h3.toFixed(2)}</b>`;
$('stats3').innerHTML = `${solidName()} · ${desc} &nbsp; · &nbsp; V = <b>${V.toFixed(2)}</b> &nbsp; · &nbsp; S/V = <b>${(S/V).toFixed(1)}</b>`;
}
function drawChart(canvas,hist,xMax,yMax,labelX,color,theorySlope){
const {ctx,w,h}=fitCanvas(canvas); clearCtx(ctx,w,h);
const ml=50,mr=18,mt=18,mb=34,W=w-ml-mr,H=h-mt-mb;
ctx.strokeStyle = COLORS.grid; ctx.lineWidth = 1;
for(let i=0;i<=5;i++){ const x=ml+W*i/5; ctx.beginPath(); ctx.moveTo(x,mt); ctx.lineTo(x,mt+H); ctx.stroke(); }
for(let i=0;i<=4;i++){ const y=mt+H*i/4; ctx.beginPath(); ctx.moveTo(ml,y); ctx.lineTo(ml+W,y); ctx.stroke(); }
ctx.fillStyle = COLORS.muted; ctx.font='12px Arial'; ctx.textAlign='right';
for(let i=0;i<=4;i++){ const val=yMax*(4-i)/4; const y=mt+H*i/4; ctx.fillText(Math.round(val),ml-8,y+4); }
ctx.textAlign='center';
for(let i=0;i<=5;i++){ const val=xMax*i/5; const x=ml+W*i/5; ctx.fillText(val>=10?val.toFixed(0):val.toFixed(1),x,mt+H+20); }
ctx.fillStyle = COLORS.text; ctx.fillText(labelX, ml+W/2, h-8); ctx.save(); ctx.translate(16,mt+H/2); ctx.rotate(-Math.PI/2); ctx.fillText('S',0,0); ctx.restore();
if(showTheory){
const endX=Math.min(xMax, yMax/Math.max(1e-9,theorySlope));
ctx.save(); ctx.setLineDash([6,5]); ctx.strokeStyle='#8fcf9d'; ctx.lineWidth=2; ctx.beginPath(); ctx.moveTo(ml,mt+H); ctx.lineTo(ml+W*(endX/xMax), mt+H-H*((theorySlope*endX)/yMax)); ctx.stroke(); ctx.restore();
}
if(hist.length>1){ ctx.strokeStyle=color; ctx.globalAlpha=.3; ctx.lineWidth=1.4; ctx.beginPath(); hist.forEach((p,i)=>{ const x=ml+W*clamp(p.x/xMax,0,1), y=mt+H-H*clamp(p.s/yMax,0,1); if(i===0)ctx.moveTo(x,y); else ctx.lineTo(x,y); }); ctx.stroke(); ctx.globalAlpha=1; }
hist.forEach((p,i)=>{ const x=ml+W*clamp(p.x/xMax,0,1), y=mt+H-H*clamp(p.s/yMax,0,1); ctx.beginPath(); ctx.arc(x,y,i===hist.length-1?4.3:2.3,0,Math.PI*2); ctx.fillStyle=i===hist.length-1?COLORS.black:color; ctx.globalAlpha=i===hist.length-1?1:.68; ctx.fill(); }); ctx.globalAlpha=1;
const k=regression(hist), R=r2(hist); ctx.fillStyle=COLORS.muted; ctx.font='12px Arial'; ctx.textAlign='left'; ctx.fillText(`uyum: S ≈ ${k.toFixed(2)}·${labelX}${Number.isFinite(R)?`   R²=${R.toFixed(3)}`:''}`, ml+6, mt+13);
}
function drawAll(){
drawStage1(); drawStage2(); drawStage3();
drawChart(chart1,hist1,CFG.line.maxD,CFG.line.reservoir*1.03,'d',COLORS.line,CFG.line.reservoir/CFG.line.maxD);
drawChart(chart2,hist2,areaMaxMeasure(),Math.max(20, areaDensity()*areaMaxMeasure()*1.18),'A',COLORS.area,areaDensity());
drawChart(chart3,hist3,volumeMax(),Math.max(20, volumeDensity()*volumeMax()*1.18),'V',COLORS.vol,volumeDensity());
}
stage1.addEventListener('pointerdown',e=>{ const p=pointerPos(e,stage1); if(near(p,{x:g1.xEnd,y:g1.y},22)){ drag='line'; stage1.setPointerCapture(e.pointerId); }});
stage1.addEventListener('pointermove',e=>{ if(drag!=='line') return; const p=pointerPos(e,stage1); state.d = clamp((p.x-g1.left)/(g1.right-g1.left)*CFG.line.maxD, .35, CFG.line.maxD); pushAll(); drawAll(); });
stage2.addEventListener('pointerdown',e=>{
const p=pointerPos(e,stage2);
if(state.areaShape==='rectangle' && near(p,g2.rectHandle,22)) drag='rect';
else if(state.areaShape==='square' && near(p,g2.squareHandle,22)) drag='square';
else if(state.areaShape==='triangle' && near(p,g2.triA,22)) drag='triA';
else if(state.areaShape==='triangle' && near(p,g2.triB,22)) drag='triB';
else if(state.areaShape==='triangle' && near(p,g2.triC,22)) drag='triC';
else if(state.areaShape==='circle' && near(p,g2.circle && {x:g2.circle.cx+g2.circle.R,y:g2.circle.cy},22)) drag='circle';
if(drag) stage2.setPointerCapture(e.pointerId);
});
stage2.addEventListener('pointermove',e=>{
if(!drag || !['rect','square','triA','triB','triC','circle'].includes(drag)) return;
const p=pointerPos(e,stage2);
if(drag==='rect'){
const wx=clamp((p.x-g2.worldX0)/g2.scale,.4,CFG.area.maxW);
const wy=clamp((g2.worldY0-p.y)/g2.scale,.4,CFG.area.maxH);
state.rectW=wx; state.rectH=wy;
} else if(drag==='square'){
const wx=clamp((p.x-g2.worldX0)/g2.scale,.4,CFG.area.maxSquare);
const wy=clamp((g2.worldY0-p.y)/g2.scale,.4,CFG.area.maxSquare);
state.squareS=clamp(Math.min(wx,wy),.4,CFG.area.maxSquare);
} else if(drag==='triA' || drag==='triB' || drag==='triC'){
const candidate={
x:clamp((p.x-g2.worldX0)/g2.scale,.15,CFG.area.maxW-.15),
y:clamp((g2.worldY0-p.y)/g2.scale,.15,CFG.area.maxH-.15)
};
const A=drag==='triA'?candidate:state.triA;
const B=drag==='triB'?candidate:state.triB;
const C=drag==='triC'?candidate:state.triC;
// Tam çökmesini engelle; bunun dışında köşeler serbest.
if(triangleArea(A,B,C)>.35){
if(drag==='triA') state.triA=candidate;
if(drag==='triB') state.triB=candidate;
if(drag==='triC') state.triC=candidate;
}
} else if(drag==='circle'){
const dx=p.x-g2.circle.cx, dy=p.y-g2.circle.cy;
const rp=Math.sqrt(dx*dx+dy*dy);
state.circR=clamp(rp/g2.circle.maxRPx*CFG.area.maxR,.35,CFG.area.maxR);
}
pushAll(); drawAll();
});
stage3.addEventListener('pointerdown',e=>{
const p=pointerPos(e,stage3);
if(state.solid==='prism'){
if(near(p,g3.aHandle,24)) drag='a3'; else if(near(p,g3.bHandle,24)) drag='b3'; else if(near(p,g3.hHandle,24)) drag='h3';
} else if(state.solid==='sphere'){
if(near(p,g3.rHandle,24)) drag='r';
} else {
if(near(p,g3.rHandle,24)) drag='r'; else if(near(p,g3.hHandle,24)) drag='h3';
}
if(drag) stage3.setPointerCapture(e.pointerId);
});
stage3.addEventListener('pointermove',e=>{
if(!drag || !['r','h3','a3','b3'].includes(drag)) return;
const p=pointerPos(e,stage3);
if(drag==='r'){
if(state.solid==='sphere') state.r = clamp((p.x-g3.sphereCenter.x)/(g3.sx*1.26), .35, CFG.vol.maxR);
else state.r = clamp((p.x-g3.cx)/(g3.sx*1.38), .35, CFG.vol.maxR);
} else if(drag==='h3') state.h3 = clamp((g3.baseY-p.y)/g3.sz, .45, CFG.vol.maxH);
else if(drag==='a3') state.a3 = clamp((2*Math.abs(p.x-g3.cx))/(g3.sx*.72), .5, CFG.vol.maxA);
else if(drag==='b3') state.b3 = clamp(Math.max(0,p.y-g3.baseY)/(g3.sx*.38), .5, CFG.vol.maxB);
pushAll(); drawAll();
});
[stage1,stage2,stage3].forEach(c=>{ c.addEventListener('pointerup',()=>{ drag=null; pushAll(true); drawAll(); }); c.addEventListener('pointercancel',()=>drag=null); });
$('clearBtn').addEventListener('click',()=>{ clearHistoryAll(); drawAll(); });
$('reseedBtn').addEventListener('click',reseed);
$('theoryToggle').addEventListener('change',e=>{ showTheory = e.target.checked; drawAll(); });
$('areaSelect').addEventListener('change',e=>{ state.areaShape = e.target.value; clearHistory2(); drawAll(); });
$('solidSelect').addEventListener('change',e=>{ state.solid = e.target.value; clearHistory3(); drawAll(); });
window.addEventListener('resize',drawAll);
$('areaSelect').value = state.areaShape; $('solidSelect').value = state.solid;
reseed();
