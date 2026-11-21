(function(){
'use strict';
const $=id=>document.getElementById(id), pack=window.CHECKLIST_PACK;
if(!pack||!Array.isArray(pack.questions)){document.getElementById('menu').textContent='Soru verileri bulunamadı.';return}
const qs=pack.questions, checkId=pack.id||'matematik-5-2026', profile=new URLSearchParams(location.search).get('profile')||'default';
let current=Math.max(0,qs.findIndex(q=>'#'+q.id===decodeURIComponent(location.hash))), done={};
const key=type=>['dotem-checkliste-v2',checkId,profile,type].join(':');
// Preserve local work when a checklist receives a new, anonymous package id.
// Only migrate if exactly one other compatible saved checklist exists on this browser.
(function migrateLegacyWork(){
 try{
  const head='dotem-checkliste-v2:',tail=':'+profile+':';
  const questionIds=new Set(qs.map(q=>q.id)),sources=new Set();
  for(let i=0;i<localStorage.length;i++){
   const storedKey=localStorage.key(i);
   if(!storedKey||!storedKey.startsWith(head))continue;
   const cut=storedKey.indexOf(tail,head.length);if(cut<0)continue;
   const candidate=storedKey.slice(head.length,cut);
   if(!candidate||candidate===checkId)continue;
   const type=storedKey.slice(cut+tail.length);
   if(type.startsWith('board:')&&questionIds.has(type.slice(6)))sources.add(candidate);
   else if(type==='done'){
    try{
     const progress=JSON.parse(localStorage.getItem(storedKey)||'{}');
     if(Object.keys(progress).some(q=>questionIds.has(q)))sources.add(candidate);
    }catch{}
   }
  }
  if(sources.size!==1)return;
  const legacyId=[...sources][0];
  for(const type of ['done',...qs.map(q=>'board:'+q.id)]){
   const dest=key(type),src=head+legacyId+tail+type;
   const value=localStorage.getItem(src);
   if(value!==null&&localStorage.getItem(dest)===null)localStorage.setItem(dest,value);
  }
 }catch(err){console.warn('Önceki çözüm kayıtları taşınamadı',err)}
})();
try{done=JSON.parse(localStorage.getItem(key('done'))||'{}')||{}}catch{}
const pages=[...new Set(qs.map(q=>q.page))];
pages.forEach(p=>{let o=document.createElement('option');o.value=p;o.textContent='Sayfa '+p;$('pageSelect').append(o)});
const saveDone=()=>{try{localStorage.setItem(key('done'),JSON.stringify(done))}catch{}};
function drawMenu(){
 const pg=$('pageSelect').value,s=$('search').value.toLocaleLowerCase('tr');let last='';
 $('menu').replaceChildren();
 for(let i=0;i<qs.length;i++){
  let q=qs[i];if(pg!=='all'&&String(q.page)!==pg)continue;
  if(s&&!([q.id,q.german,q.turkish].join(' ').toLocaleLowerCase('tr').includes(s)))continue;
  if(String(q.page)!==last){let h=document.createElement('div');h.className='group';h.textContent='SAYFA '+q.page;$('menu').append(h);last=String(q.page)}
  let b=document.createElement('button');b.type='button';b.className='item'+(done[q.id]?' done':'')+(i===current?' active':'');b.textContent=(done[q.id]?'✓ ':'')+'Soru '+q.number+(q.star?' ★':'')+(q.plus?' +':'');b.onclick=()=>open(i);$('menu').append(b);
 }
 const n=qs.filter(q=>done[q.id]).length;$('progressText').textContent=n+' / '+qs.length+' tamamlandı';$('progressBar').style.width=100*n/qs.length+'%';
}
window.openChecklistQuestion=(i)=>open(i);
function open(i){
 if(i<0||i>=qs.length)return;
 current=i;let q=qs[i];$('qid').textContent='Sayfa '+q.page+' · Soru '+q.number+(q.star?'  ★':'');$('qtitle').textContent='Soru '+q.number;
 $('german').textContent=q.german;$('turkish').textContent=q.turkish;$('done').checked=!!done[q.id];
 $('prev').disabled=i===0;$('next').disabled=i===qs.length-1;
 const src=q.figureImage||q.sourceImage||q.image||'';
 $('pictures').hidden=!src;if(src){$('figure').src=src;$('figure').classList.remove('zoom')}
 history.replaceState(null,'','#'+q.id);drawMenu();if(window.loadBoard)window.loadBoard();
}
$('done').onchange=e=>{done[qs[current].id]=e.target.checked;saveDone();drawMenu()};
$('prev').onclick=()=>open(current-1);$('next').onclick=()=>open(current+1);
$('pageSelect').onchange=()=>{const p=$('pageSelect').value;if(p!=='all'){let i=qs.findIndex(q=>String(q.page)===p);if(i>=0)open(i)}else drawMenu()};
$('search').oninput=drawMenu;$('figure').onclick=()=>{$('figure').classList.toggle('zoom')};
const area=$('boardArea'),canvas=$('board'),ctx=canvas.getContext('2d');
let objects=[],selected=[],tool='pen',drag=null,holding=null,preview=null,holdTimer=null,pan={x:0,y:0},activePointers=new Map(),raf=0,inkWidth=2.25;
function boardKey(){return key('board:'+qs[current].id)}
function saveBoard(){try{localStorage.setItem(boardKey(),JSON.stringify({objects,pan}))}catch{}}
window.loadBoard=function(){holding=null;preview=null;drag=null;selected=[];clearTimeout(holdTimer);try{let v=JSON.parse(localStorage.getItem(boardKey())||'{}');objects=Array.isArray(v.objects)?v.objects:[];pan=v.pan||{x:0,y:0}}catch{objects=[];pan={x:0,y:0}}repaint()};
function point(e){const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left-pan.x,y:e.clientY-r.top-pan.y}}
function eventScreen(e){const r=canvas.getBoundingClientRect();return {x:e.clientX-r.left,y:e.clientY-r.top}}
function length(a,b){return Math.hypot(a.x-b.x,a.y-b.y)}
function segdist(p,a,b){let dx=b.x-a.x,dy=b.y-a.y,v=dx*dx+dy*dy,t=v?Math.max(0,Math.min(1,((p.x-a.x)*dx+(p.y-a.y)*dy)/v)):0;return length(p,{x:a.x+dx*t,y:a.y+dy*t})}
function bounds(o){const a=o.pts||[];let xs=a.map(p=>p.x),ys=a.map(p=>p.y);if(!a.length)return{x:0,y:0,w:0,h:0};let x=Math.min(...xs),y=Math.min(...ys);return {x,y,w:Math.max(1,Math.max(...xs)-x),h:Math.max(1,Math.max(...ys)-y)}}
function center(o){let r=bounds(o);return{x:r.x+r.w/2,y:r.y+r.h/2}}
function circlePoints(r,n=72){return Array.from({length:n+1},(_,i)=>({x:r.x+r.w/2+r.w/2*Math.cos(2*Math.PI*i/n),y:r.y+r.h/2+r.h/2*Math.sin(2*Math.PI*i/n)}))}
function rectPoints(r){return[{x:r.x,y:r.y},{x:r.x+r.w,y:r.y},{x:r.x+r.w,y:r.y+r.h},{x:r.x,y:r.y+r.h},{x:r.x,y:r.y}]}
function simplify(ps,tolerance){if(ps.length<=2)return ps.slice();let best=0,idx=0;for(let i=1;i<ps.length-1;i++){let d=segdist(ps[i],ps[0],ps.at(-1));if(d>best){best=d;idx=i}}if(best<tolerance)return [ps[0],ps.at(-1)];let a=simplify(ps.slice(0,idx+1),tolerance),b=simplify(ps.slice(idx),tolerance);return a.slice(0,-1).concat(b)}
function circleSweep(ps,c){
 let total=0,absolute=0,prev=Math.atan2(ps[0].y-c.y,ps[0].x-c.x);
 for(let i=1;i<ps.length;i++){
  const cur=Math.atan2(ps[i].y-c.y,ps[i].x-c.x);
  const delta=Math.atan2(Math.sin(cur-prev),Math.cos(cur-prev));
  total+=delta;absolute+=Math.abs(delta);prev=cur;
 }
 return{total,absolute,backwards:(absolute-Math.abs(total))/2};
}
function circumcircle(a,b,c){
 const aa=a.x*a.x+a.y*a.y,bb=b.x*b.x+b.y*b.y,cc=c.x*c.x+c.y*c.y;
 const d=2*(a.x*(b.y-c.y)+b.x*(c.y-a.y)+c.x*(a.y-b.y));
 if(Math.abs(d)<1e-5)return null;
 const x=(aa*(b.y-c.y)+bb*(c.y-a.y)+cc*(a.y-b.y))/d;
 const y=(aa*(c.x-b.x)+bb*(a.x-c.x)+cc*(b.x-a.x))/d;
 return{x,y,r:Math.hypot(a.x-x,a.y-y)};
}
function circularArc(ps,diag){
 const first=ps[0],last=ps[ps.length-1],chord=Math.hypot(last.x-first.x,last.y-first.y);
 if(chord<24)return null;
 // Fit a circle through stroke endpoints and the point furthest from their chord.
 let pivot=null,maxSagitta=0;
 for(let i=Math.floor(ps.length*.12);i<=Math.ceil(ps.length*.88);i++){
  const p=ps[i];
  const distance=Math.abs((p.x-first.x)*(last.y-first.y)-(p.y-first.y)*(last.x-first.x))/chord;
  if(distance>maxSagitta){maxSagitta=distance;pivot=p}
 }
 if(!pivot||maxSagitta<Math.max(8,chord*.075))return null;
 const fit=circumcircle(first,pivot,last);
 if(!fit||!Number.isFinite(fit.r)||fit.r<17||fit.r>diag*15)return null;
 let residual=0;
 for(const p of ps){const d=Math.hypot(p.x-fit.x,p.y-fit.y)-fit.r;residual+=d*d}
 if(Math.sqrt(residual/ps.length)/fit.r>.095)return null;
 const sweep=circleSweep(ps,fit);
 if(Math.abs(sweep.total)<.43||Math.abs(sweep.total)>5.87)return null;
 if(sweep.backwards>sweep.absolute*.13)return null;
 const a0=Math.atan2(first.y-fit.y,first.x-fit.x);
 const samples=Math.max(24,Math.ceil(Math.abs(sweep.total)*25));
 const pts=Array.from({length:samples+1},(_,i)=>{
  const angle=a0+sweep.total*i/samples;
  return{x:fit.x+fit.r*Math.cos(angle),y:fit.y+fit.r*Math.sin(angle)};
 });
 // Every point lies on one circle: a true circular arc, not a Bezier curve.
 return{kind:'arc',pts};
}
function recognizer(ps){
 if(ps.length<6)return null;
 let totalLength=0;
 for(let i=1;i<ps.length;i++)totalLength+=length(ps[i-1],ps[i]);
 if(totalLength<45)return null;
 const box=bounds({pts:ps}),diag=Math.hypot(box.w,box.h);
 const endDistance=length(ps[0],ps[ps.length-1]);
 const lineError=ps.reduce((sum,p)=>sum+segdist(p,ps[0],ps[ps.length-1]),0)/ps.length;
 if(endDistance>Math.max(18,diag*.18)&&lineError<Math.max(8,diag*.055)&&endDistance>32)
  return{kind:'line',pts:[ps[0],ps[ps.length-1]]};
 if(box.w>28&&box.h>28){
  const aspect=Math.min(box.w,box.h)/Math.max(box.w,box.h);
  const center={x:box.x+box.w/2,y:box.y+box.h/2};
  const radius=(box.w+box.h)/4;
  const turn=circleSweep(ps,center);
  let residual=0;
  for(const p of ps){const d=Math.hypot(p.x-center.x,p.y-center.y)-radius;residual+=d*d}
  const deviation=Math.sqrt(residual/ps.length)/radius;
  // A near-circle must be closed, round, and complete about 360 degrees.
  // This rejects rectangles, triangles, ellipses and most handwritten loops.
  const closed=endDistance<Math.max(15,diag*.17);
  if(closed&&aspect>=.78&&deviation<=.112&&
     Math.abs(turn.total)>=5.72&&Math.abs(turn.total)<=6.90&&
     turn.backwards<turn.absolute*.11){
    return{kind:'circle',pts:circlePoints({
      x:center.x-radius,y:center.y-radius,w:radius*2,h:radius*2
    })};
  }
  if(closed){
   const corners=[{x:box.x,y:box.y},{x:box.x+box.w,y:box.y},
    {x:box.x+box.w,y:box.y+box.h},{x:box.x,y:box.y+box.h}];
   const distances=corners.map(c=>Math.min(...ps.map(p=>length(p,c))));
   const edgeError=ps.reduce((sum,p)=>sum+Math.min(
    Math.abs(p.x-box.x),Math.abs(p.x-box.x-box.w),
    Math.abs(p.y-box.y),Math.abs(p.y-box.y-box.h)),0)/ps.length;
   // Corners must actually be visited; a rounded ellipse is not a rectangle.
   if(distances.every(d=>d<Math.min(diag*.14,Math.min(box.w,box.h)*.24))&&
      edgeError<Math.max(9,Math.min(box.w,box.h)*.12))
     return{kind:'rectangle',pts:rectPoints(box)};
   const vertices=simplify(ps,Math.max(12,diag*.15));
   if(vertices.length>=4&&vertices.length<=6){
    const v=vertices.slice(0,-1);
    if(v.length===3)return{kind:'triangle',pts:[...v,v[0]]};
   }
  }
 }
 if(totalLength>diag*1.06&&lineError>Math.max(7,diag*.055))
  return circularArc(ps,diag);
 return null;
}
function resize(){const r=area.getBoundingClientRect(),d=Math.min(window.devicePixelRatio||1,3);canvas.width=Math.round(r.width*d);canvas.height=Math.round(r.height*d);canvas.style.width=r.width+'px';canvas.style.height=r.height+'px';ctx.setTransform(d,0,0,d,0,0);repaint()}
function lineObj(o,highlight=false){let p=o.pts||[];if(!p.length)return;ctx.beginPath();ctx.moveTo(p[0].x,p[0].y);p.slice(1).forEach(t=>ctx.lineTo(t.x,t.y));ctx.lineWidth=inkWidth;ctx.lineJoin='round';ctx.lineCap='round';ctx.strokeStyle=highlight?'#278bd2':'#1a2520';ctx.setLineDash(highlight?[9,6]:[]);ctx.stroke();ctx.setLineDash([])}
function bboxAll(){if(!selected.length)return null;let p=selected.flatMap(i=>objects[i]?.pts||[]);return bounds({pts:p})}
function handles(r){let x=r.x,y=r.y,w=r.w,h=r.h;return[{kind:'tl',x,y},{kind:'tr',x:x+w,y},{kind:'br',x:x+w,y:y+h},{kind:'bl',x,y:y+h},{kind:'rot',x:x+w/2,y:y-33}]}
function repaint(){if(!canvas.width||!canvas.height)return;const d=canvas.width/Math.max(1,canvas.clientWidth);ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);ctx.save();ctx.translate(pan.x,pan.y);
 objects.forEach((o,i)=>lineObj(o,selected.includes(i)));if(holding)lineObj(preview||{pts:holding.pts},!!preview);
 const b=drag?.kind==='marquee'?null:bboxAll();if(b){ctx.strokeStyle='#2988d7';ctx.lineWidth=1.2;ctx.setLineDash([6,4]);ctx.strokeRect(b.x-7,b.y-7,b.w+14,b.h+14);ctx.setLineDash([]);handles(b).forEach(h=>{ctx.beginPath();ctx.arc(h.x,h.y,7,0,2*Math.PI);ctx.fillStyle=h.kind==='rot'?'#fff':'#3095d4';ctx.fill();ctx.strokeStyle='#1684c5';ctx.stroke()})}
 if(drag?.kind==='marquee'&&drag.moved){
  const r=marqueeRect(drag.start,drag.current);
  ctx.fillStyle='rgba(41,136,215,.10)';
  ctx.fillRect(r.x,r.y,r.w,r.h);
  ctx.lineWidth=1.5;ctx.strokeStyle='#2988d7';
  ctx.setLineDash([6,4]);ctx.strokeRect(r.x,r.y,r.w,r.h);ctx.setLineDash([]);
 }
 ctx.restore()}
// A mark is selected only if its actual stroke touches the rectangle.
function marqueeRect(a,b){return{x:Math.min(a.x,b.x),y:Math.min(a.y,b.y),w:Math.abs(a.x-b.x),h:Math.abs(a.y-b.y)}}
function segmentTouchesRect(a,b,r){
 const dx=b.x-a.x,dy=b.y-a.y,p=[-dx,dx,-dy,dy],q=[a.x-r.x,r.x+r.w-a.x,a.y-r.y,r.y+r.h-a.y];
 let t0=0,t1=1;
 for(let i=0;i<4;i++){
  if(Math.abs(p[i])<1e-10){if(q[i]<0)return false;continue}
  const t=q[i]/p[i];
  if(p[i]<0)t0=Math.max(t0,t);else t1=Math.min(t1,t);
  if(t0>t1)return false;
 }
 return true;
}
function strokeTouchesMarquee(o,r){
 const pts=o.pts||[];
 for(let i=0;i<pts.length;i++){
  if(pts[i].x>=r.x&&pts[i].x<=r.x+r.w&&pts[i].y>=r.y&&pts[i].y<=r.y+r.h)return true;
  if(i>0&&segmentTouchesRect(pts[i-1],pts[i],r))return true;
 }
 return false;
}
function hit(p){for(let i=objects.length-1;i>=0;i--){let pts=objects[i].pts;for(let j=1;j<pts.length;j++)if(segdist(p,pts[j-1],pts[j])<11)return i}return-1}
function hitHandle(p){const b=bboxAll();if(!b)return null;return handles(b).find(h=>length(h,p)<13)||null}
function duplicateSelected(){const arr=selected.map(i=>structuredClone(objects[i]));let start=objects.length;objects.push(...arr);selected=arr.map((_,i)=>start+i)}
function applyMove(ix,dy){selected.forEach(i=>objects[i].pts.forEach(p=>{p.x+=ix;p.y+=dy}))}
function rotateSelected(angle){const b=bboxAll(),c={x:b.x+b.w/2,y:b.y+b.h/2};let cos=Math.cos(angle),sin=Math.sin(angle);selected.forEach(i=>objects[i].pts.forEach(p=>{let x=p.x-c.x,y=p.y-c.y;p.x=c.x+x*cos-y*sin;p.y=c.y+x*sin+y*cos}))}
function stretchSelected(handle,prev,now){const b=bboxAll();if(!b)return;let dx=now.x-prev.x,dy=now.y-prev.y;
 if(handle.kind==='rot'){let c={x:b.x+b.w/2,y:b.y+b.h/2};let a=Math.atan2(now.y-c.y,now.x-c.x)-Math.atan2(prev.y-c.y,prev.x-c.x);rotateSelected(a);return}
 let x=handle.kind.includes('l')?b.x:b.x+b.w,y=handle.kind.includes('t')?b.y:b.y+b.h, sx=(x===b.x?b.w-dx:b.w+dx)/b.w,sy=(y===b.y?b.h-dy:b.h+dy)/b.h;
 sx=Math.max(.1,sx);sy=Math.max(.1,sy);let ax=x===b.x?b.x+b.w:b.x,ay=y===b.y?b.y+b.h:b.y;
 selected.forEach(i=>{
  const obj=objects[i];
  // Keep circles and circle arcs round when resizing with corner handles.
  const uniform=(obj.kind==='arc'||obj.kind==='circle')?Math.sqrt(sx*sy):null;
  obj.pts.forEach(p=>{p.x=ax+(p.x-ax)*(uniform??sx);p.y=ay+(p.y-ay)*(uniform??sy)});
 })
}
function eraser(p){let id=hit(p);if(id>=0){objects.splice(id,1);selected=[];saveBoard();repaint()}}
function clearPending(){clearTimeout(holdTimer);holdTimer=null}
function armHold(){clearPending();if(!holding||preview)return;holdTimer=setTimeout(()=>{if(!holding||preview)return;const r=recognizer(holding.pts);if(r){preview=r;holding.anchor={...holding.pts[0]};repaint()}},650)}
function previewResize(p){if(!preview||!holding)return;let r=bounds(preview),a=holding.anchor||holding.pts[0],end=holding.pts.at(-1);let dx=p.x-end.x,dy=p.y-end.y;preview.pts.forEach(v=>{v.x+=dx;v.y+=dy});holding.pts[holding.pts.length-1]={...p}}
function finish(e,cancel=false){if(!drag&&!holding)return;if(drag){if(drag.kind==='marquee'){if(cancel||!drag.moved)selected=drag.base.slice();drag=null;repaint();return}drag=null;saveBoard()}else if(holding){clearPending();if(!cancel&&holding.pts.length>1){objects.push(preview||{kind:'ink',pts:holding.pts});saveBoard()}holding=null;preview=null}area.classList.remove('pan');repaint()}
area.addEventListener('contextmenu',e=>e.preventDefault());
area.addEventListener('pointerdown',e=>{
 if(e.button!==0&&e.button!==2)return;e.preventDefault();canvas.setPointerCapture(e.pointerId);
 activePointers.set(e.pointerId,eventScreen(e));let p=point(e);
 if(e.button===2){drag={kind:'pan',last:eventScreen(e)};area.classList.add('pan');return}
 if(tool==='eraser'){eraser(p);drag={kind:'erase'};return}
 // Selecting and transforming existing ink is only possible in explicit selection mode.
 // Pen mode NEVER hit-tests strokes, so handwriting may overlap earlier strokes.
 if(tool==='select'){
  const h=hitHandle(p);if(h){drag={kind:'handle',handle:h,prev:p};return}
  const found=hit(p);
  if(found>=0){
   if(e.shiftKey){selected=selected.includes(found)?selected.filter(i=>i!==found):[...selected,found];drag=null;repaint();return}
   if(!selected.includes(found))selected=[found];if(e.altKey)duplicateSelected();drag={kind:'move',prev:p};repaint();return
  }
  // Drag from empty space to select multiple strokes; Shift adds to old selection.
  drag={kind:'marquee',start:p,current:p,base:e.shiftKey?selected.slice():[],moved:false};
  selected=drag.base.slice();repaint();return;
 }
 // Pen mode starts a new stroke even directly on top of an existing one.
 selected=[];holding={pts:[p]};preview=null;drag=null;repaint();
});
area.addEventListener('pointermove',e=>{
 let cur=eventScreen(e);if(activePointers.has(e.pointerId))activePointers.set(e.pointerId,cur);
 if(!canvas.hasPointerCapture(e.pointerId))return;
 const p=point(e);
 if(drag?.kind==='pan'){pan.x+=cur.x-drag.last.x;pan.y+=cur.y-drag.last.y;drag.last=cur;repaint();return}
 if(drag?.kind==='erase'){eraser(p);return}
 if(drag?.kind==='marquee'){
  drag.current=p;
  if(length(drag.start,p)>4)drag.moved=true;
  if(drag.moved){
   const r=marqueeRect(drag.start,p),hits=[];
   objects.forEach((o,i)=>{if(strokeTouchesMarquee(o,r))hits.push(i)});
   selected=[...new Set([...drag.base,...hits])];
  }
  repaint();return;
 }
 if(drag?.kind==='move'){let dx=p.x-drag.prev.x,dy=p.y-drag.prev.y;applyMove(dx,dy);drag.prev=p;repaint();return}
 if(drag?.kind==='handle'){stretchSelected(drag.handle,drag.prev,p);drag.prev=p;repaint();return}
 if(!holding)return;
 let last=holding.pts.at(-1);if(length(last,p)<1.5)return;
 if(preview){previewResize(p);repaint();return}
 holding.pts.push(p);armHold();repaint();
});
area.addEventListener('pointerup',e=>{activePointers.delete(e.pointerId);finish(e)});
area.addEventListener('pointercancel',e=>{activePointers.delete(e.pointerId);finish(e,true)});
area.addEventListener('lostpointercapture',e=>{if(drag||holding)finish(e,true)});
$('pen').onclick=()=>setTool('pen');
$('selectTool').onclick=()=>setTool('select');
$('eraser').onclick=()=>setTool('eraser');
function setTool(v){
 if(!['pen','select','eraser'].includes(v))return;
 if(drag||holding)finish(null);
 tool=v;selected=[];
 for(const [id,kind] of [['pen','pen'],['selectTool','select'],['eraser','eraser']]){
  const on=v===kind;$(id).classList.toggle('on',on);$(id).setAttribute('aria-pressed',String(on));
 }
 area.classList.toggle('eraser',v==='eraser');
 area.classList.toggle('pen',v==='pen');
 area.classList.toggle('select',v==='select');
 repaint();
}
$('clear').onclick=()=>{clearPending();objects=[];selected=[];holding=null;preview=null;drag=null;pan={x:0,y:0};saveBoard();repaint()};
document.addEventListener('keydown',e=>{if(['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName))return;if((e.key==='Delete'||e.key==='Backspace')&&selected.length){objects=objects.filter((_,i)=>!selected.includes(i));selected=[];saveBoard();repaint()}else if(e.key==='Escape'){e.preventDefault();setTool(tool==='pen'?'select':'pen')}else if(e.key==='ArrowRight'){open(current+1)}else if(e.key==='ArrowLeft'){open(current-1)}});
new ResizeObserver(resize).observe(area);
open(current);
})();