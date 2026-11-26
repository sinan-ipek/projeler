(function(){
'use strict';
const $=id=>document.getElementById(id), pack=window.CHECKLIST_PACK;
if(!pack||!Array.isArray(pack.questions)){document.getElementById('menu').textContent='Soru verileri bulunamadı.';return}
const qs=pack.questions, checkId=pack.id||'check-liste-default', profile=new URLSearchParams(location.search).get('profile')||'default';
/* Sidebar formatting is only for actual four-choice quizzes; Tuana 2 uses a natural inline answer button at the end of each question. */
document.body.classList.toggle('has-graded-quiz',qs.some(q=>Array.isArray(q.choices)&&q.choices.length>=4));
let current=Math.max(0,qs.findIndex(q=>'#'+q.id===decodeURIComponent(location.hash))), done={},answers={},viewedAnswers={};
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
try{answers=JSON.parse(localStorage.getItem(key('answers'))||'{}')||{}}catch{}
try{viewedAnswers=JSON.parse(localStorage.getItem(key('viewed-answers'))||'{}')||{}}catch{}
const pages=[...new Set(qs.map(q=>q.page))];
pages.forEach(p=>{let o=document.createElement('option');o.value=p;o.textContent='Sayfa '+p;$('pageSelect').append(o)});
const saveDone=()=>{try{localStorage.setItem(key('done'),JSON.stringify(done))}catch{}};
const saveAnswers=()=>{try{localStorage.setItem(key('answers'),JSON.stringify(answers))}catch{}};
const saveViewedAnswers=()=>{try{localStorage.setItem(key('viewed-answers'),JSON.stringify(viewedAnswers))}catch{}};

/* Özel kitap kırpımları: Her dosya yalnızca kullanıcının tarayıcısındaki IndexedDB'de tutulur.
   GitHub'a veya herhangi bir sunucuya gönderilmez. */
const privateInput=$('privateImagesInput'), privateButton=$('importPrivateImages'), privateHint=$('privateImagesHint');
let privateDbPromise=null, privateUrl=null, privateImageSequence=0;
function privateDb(){
 if(privateDbPromise)return privateDbPromise;
 privateDbPromise=new Promise((resolve,reject)=>{
  if(!('indexedDB' in window)){reject(new Error('Tarayıcı yerel görsel saklamayı desteklemiyor'));return}
  const request=indexedDB.open('check-liste-private-figures-v1',1);
  request.onupgradeneeded=()=>{if(!request.result.objectStoreNames.contains('files'))request.result.createObjectStore('files')};
  request.onsuccess=()=>resolve(request.result);
  request.onerror=()=>reject(request.error||new Error('Görsel veritabanı açılamadı'));
 });
 return privateDbPromise;
}
async function privateImage(name){
 const db=await privateDb();
 return new Promise((resolve,reject)=>{
  const r=db.transaction('files','readonly').objectStore('files').get(checkId+':'+name);
  r.onsuccess=()=>resolve(r.result||null);
  r.onerror=()=>reject(r.error);
 });
}
async function displayPrivateImage(name,serial){
 const status=$('privateImageStatus');
 try{
  const blob=await privateImage(name);
  if(serial!==privateImageSequence)return;
  if(!blob){if(status){status.hidden=false;status.textContent='Özel görsel henüz yüklenmedi: '+name+(pack.id==='lambacher-schweizer-7-nrw'?'. Ana sayfa → 7. sınıf → Yükle bölümünden ZIP paketini seç.':'. Soldaki “Görselleri içe aktar” düğmesini kullan.')}return}
  privateUrl=URL.createObjectURL(blob);
  $('figure').src=privateUrl;$('figure').hidden=false;
  if(status){status.hidden=false;status.textContent='Özel görsel, bu cihazda saklanıyor: '+name}
 }catch(err){
  if(serial!==privateImageSequence)return;
  if(status){status.hidden=false;status.textContent='Özel görsel açılamadı: '+(err.message||err)}
 }
}
if(privateButton&&privateInput){
 const hasAssets=qs.some(q=>q.privateImageFile);
 const isGrade7=pack.id==='lambacher-schweizer-7-nrw';
 privateButton.hidden=!hasAssets||isGrade7;
 if(privateHint){privateHint.hidden=!hasAssets||isGrade7;privateHint.textContent='ZIP arşivini açıp PNG/JPG dosyalarını seç. Görseller yalnızca bu tarayıcıda saklanır.'}
 privateButton.addEventListener('click',()=>privateInput.click());
 privateInput.addEventListener('change',async()=>{
  const files=[...privateInput.files].filter(f=>/^image\/(png|jpeg|webp)$/.test(f.type)&&f.size<12000000);
  if(!files.length){if(privateHint)privateHint.textContent='PNG/JPG dosyası seçilmedi.';return}
  privateButton.disabled=true;
  if(privateHint)privateHint.textContent=files.length+' görsel içe aktarılıyor…';
  try{
   const db=await privateDb();
   await new Promise((resolve,reject)=>{
    const tx=db.transaction('files','readwrite'),store=tx.objectStore('files');
    for(const file of files)store.put(file,checkId+':'+file.name);
    tx.oncomplete=resolve;
    tx.onerror=()=>reject(tx.error||new Error('Kayıt hatası'));
    tx.onabort=()=>reject(tx.error||new Error('Kayıt iptal edildi'));
   });
   if(privateHint)privateHint.textContent=files.length+' görsel bu tarayıcıya kaydedildi. Başka cihazda tekrar içe aktarılmalıdır.';
   open(current);
  }catch(err){
   if(privateHint)privateHint.textContent='Görseller kaydedilemedi: '+(err.message||err);
  }finally{privateButton.disabled=false;privateInput.value=''}
 });
}

function questionLabel(q){
 if(q.kind==='beispiel')return 'Örnek '+String(q.number).replace(/^Beispiel\s*/,'');
 if(q.kind==='figure')return 'Ek görsel';
 return /^\d/.test(String(q.number))?'Soru '+q.number:String(q.number);
}
function drawMenu(){
 const pg=$('pageSelect').value;
 const s=$('search').value.trim().toLocaleLowerCase('tr');
 let lastPage=null, visible=0;
 $('menu').replaceChildren();
 for(let i=0;i<qs.length;i++){
  const q=qs[i];
  if(pg!=='all'&&String(q.page)!==pg)continue;
  if(s&&!([q.id,q.german,q.turkish,questionLabel(q)].join(' ').toLocaleLowerCase('tr').includes(s)))continue;
  // Sayfa, açılır menüde seçiliyse ikinci bir başlık basma.
  if(pg==='all'&&q.page!==lastPage){
   const heading=document.createElement('div');
   heading.className='group';heading.textContent='Sayfa '+q.page;
   $('menu').append(heading);lastPage=q.page;
  }
  const b=document.createElement('button');
  b.type='button';b.className='item'+(done[q.id]?' done':'')+(i===current?' active':'');
  b.textContent=(done[q.id]?'✓ ':'')+questionLabel(q)+(q.star?' ★':'')+(q.plus?' +':'');
  b.onclick=()=>open(i);$('menu').append(b);visible++;
 }
 if(!visible){
  const message=document.createElement('p');
  message.className='small';message.textContent='Uygun soru bulunamadı.';
  $('menu').append(message);
 }
 const n=qs.filter(q=>done[q.id]).length;
 $('progressText').textContent=n+' / '+qs.length+' tamamlandı';
 $('progressBar').style.width=100*n/qs.length+'%';
}
/* Optional graded multiple choice is active only when a question has choices.
   Existing student packs without choices retain their normal done checkbox. */
function completionUnlocked(q){
 if(q.answerMode==='worked-solution')return !!viewedAnswers[q.id]||!!done[q.id];
 return !Array.isArray(q.choices)||q.choices.length===0||answers[q.id]===q.correctAnswer;
}
function applyCompletionLock(q){
 const unlocked=completionUnlocked(q);
 $('done').disabled=!unlocked;
 const mirrored=$('quizDone');
 if(mirrored){mirrored.disabled=!unlocked;mirrored.checked=!!done[q.id]}
 $('done').checked=!!done[q.id];
}
function renderQuiz(q){
 const note=$('calculatorNote');
 if(note){
  note.hidden=!q.calculatorNote;
  note.textContent=q.calculatorNote||'';
  if(q.calculatorAllowed!==undefined)note.dataset.allowed=q.calculatorAllowed?'yes':'no';
 }
 const panel=$('quizPanel'), options=$('quizChoices'), message=$('quizFeedback'), detail=$('quizExplanation');
 if(!panel||!options)return;
 const solutionMode=q.answerMode==='worked-solution';
 const hasQuiz=!solutionMode&&Array.isArray(q.choices)&&q.choices.length>=4;
 panel.hidden=!hasQuiz;
 const action=$('answerAction'),heading=$('quizHeading'),inline=$('answerInline');
 // A pack may hide all solutions or show the button only on cards with a worked example.
 const unavailable=!!pack.hideSolutions||!!(pack.onlySolvedAnswers&&!q.solution);
 if(inline)inline.hidden=unavailable;
 if(action)action.hidden=unavailable;
 if(heading)heading.textContent=solutionMode?'Açıklamalı çözüm':'Yanıtını seç · 4 seçenek';
 options.hidden=!hasQuiz;
 if(message)message.hidden=!hasQuiz;
 if(detail)detail.hidden=!hasQuiz;
 if(solutionMode){
  options.replaceChildren();
  if(message)message.textContent='';
  applyCompletionLock(q);
  return;
 }
 if(!hasQuiz){options.replaceChildren();if(detail)detail.hidden=true;applyCompletionLock(q);return}
 options.replaceChildren();
 q.choices.forEach((choice,index)=>{
  const lab=document.createElement('label');lab.className='quiz-option';
  const input=document.createElement('input');
  input.type='radio';input.name='checkliste-answer-'+q.id;
  input.value=choice.value;input.checked=answers[q.id]===choice.value;
  const span=document.createElement('span');
  span.textContent=String.fromCharCode(65+index)+') '+choice.label;
  lab.append(input,span);options.append(lab);
  input.addEventListener('change',()=>{
   answers[q.id]=choice.value;saveAnswers();
   if(!completionUnlocked(q)&&done[q.id]){
    done[q.id]=false;saveDone();drawMenu();
   }
   renderQuiz(q);
  });
 });
 const selected=answers[q.id],isCorrect=selected===q.correctAnswer;
 message.textContent=!selected?'Önce kendi çözümünü yap, sonra bir yanıt seç.':
  isCorrect?'Doğru! Tamamlandı kutusu artık kullanılabilir.':'Yanlış yanıt. Çözümünü kontrol edip tekrar dene.';
 message.className='quiz-feedback'+(selected?(isCorrect?' correct':' incorrect'):'');
 if(detail){
  detail.hidden=!isCorrect||!q.explanation;
  detail.textContent=isCorrect?(q.explanation||''):'';
 }
 const notes=$('quizExtraNotes');
 if(notes){notes.hidden=!q.notes;notes.textContent=q.notes||''}
 applyCompletionLock(q);
}
if($('answerAction')){
 $('answerAction').addEventListener('click',()=>{
  const q=qs[current];
  if(pack.hideSolutions||(pack.onlySolvedAnswers&&!q.solution))return;
  const isTuana=pack.id==='tuana-2-vorabitur-2026';
  const destination=new URL(isTuana?'./answer.html':'./answer-generic.html',location.href);
  destination.searchParams.set('set',new URLSearchParams(location.search).get('set')||'cetin-1');
  destination.searchParams.set('id',q.id);
  // Browsers may open an independent tab instead of a floating window.
  const separate=window.open(destination.href,'checkliste-answer-'+q.id,'popup=yes,width=900,height=820,scrollbars=yes,resizable=yes');
  if(!separate){window.alert('Çözüm penceresi engellendi. Açılır pencerelere izin verin.');return}
  try{separate.focus()}catch{}
  if(q.answerMode==='worked-solution'){
   viewedAnswers[q.id]=true;
   saveViewedAnswers();
   applyCompletionLock(q);
  }
 });
}
if($('quizDone')){
 $('quizDone').addEventListener('change',e=>{
  const q=qs[current];if(!completionUnlocked(q)){e.target.checked=false;return}
  done[q.id]=e.target.checked;$('done').checked=e.target.checked;saveDone();drawMenu();
 });
}
window.openChecklistQuestion=(i)=>open(i);
function open(i){
 if(i<0||i>=qs.length)return;
 current=i;let q=qs[i];$('qid').textContent='Sayfa '+q.page+' · '+questionLabel(q)+(q.star?' ★':'')+(q.plus?' +':'');$('qtitle').textContent='';
 if(window.CheckMath){
  window.CheckMath.render($('german'),q.german);
  window.CheckMath.render($('turkish'),q.turkish);
 }else{
  $('german').textContent=q.german;$('turkish').textContent=q.turkish;
 }
 $('done').checked=!!done[q.id];
 renderQuiz(q);
 $('prev').disabled=i===0;$('next').disabled=i===qs.length-1;
 const src=q.figureImage||q.sourceImage||q.image||'';
 const serial=++privateImageSequence;
 if(privateUrl){URL.revokeObjectURL(privateUrl);privateUrl=null}
 $('figure').classList.remove('zoom');$('figure').hidden=false;
 const imgStatus=$('privateImageStatus');
 if(imgStatus){imgStatus.hidden=true;imgStatus.textContent=''}
 if(src){$('pictures').hidden=false;$('figure').src=src}
 else if(q.privateImageFile){
  $('pictures').hidden=false;$('figure').hidden=true;$('figure').removeAttribute('src');
  displayPrivateImage(q.privateImageFile,serial);
 }else{$('pictures').hidden=true;$('figure').removeAttribute('src')}
 history.replaceState(null,'','#'+q.id);drawMenu();if(window.loadBoard)window.loadBoard();
}
$('done').onchange=e=>{const q=qs[current];if(!completionUnlocked(q)){e.target.checked=false;return}done[q.id]=e.target.checked;if($('quizDone'))$('quizDone').checked=e.target.checked;saveDone();drawMenu()};
$('prev').onclick=()=>open(current-1);$('next').onclick=()=>open(current+1);
$('pageSelect').onchange=()=>{const p=$('pageSelect').value;if(p!=='all'){let i=qs.findIndex(q=>String(q.page)===p);if(i>=0)open(i)}else drawMenu()};
$('search').oninput=drawMenu; // Büyütme ortak çerçevedeki ışık kutusu ile yönetilir.
const area=$('boardArea'),canvas=$('board'),ctx=canvas.getContext('2d');
let objects=[],selected=[],tool='pen',drag=null,holding=null,preview=null,holdTimer=null,pan={x:0,y:0},activePointers=new Map(),raf=0,inkWidth=2.25;
const INK_COLORS=['#111111','#d62d35','#2364c9','#228044','#8a9297'];
let activeInkColor=INK_COLORS[0],activeInkStyle='solid';
try{
 const brush=JSON.parse(localStorage.getItem(key('brush'))||'{}');
 if(INK_COLORS.includes(brush.color))activeInkColor=brush.color;
 if(['solid','dashed'].includes(brush.style))activeInkStyle=brush.style;
}catch{}
function brushSnapshot(){return{color:activeInkColor,strokeStyle:activeInkStyle}}
function saveBrush(){try{localStorage.setItem(key('brush'),JSON.stringify({color:activeInkColor,style:activeInkStyle}))}catch{}}
function syncBrushControls(){
 for(const b of document.querySelectorAll('[data-ink-color]')){
  const on=b.dataset.inkColor===activeInkColor;
  b.classList.toggle('selected',on);b.setAttribute('aria-pressed',String(on));
 }
 for(const b of document.querySelectorAll('[data-stroke-style]')){
  const on=b.dataset.strokeStyle===activeInkStyle;
  b.classList.toggle('selected',on);b.setAttribute('aria-pressed',String(on));
 }
}
for(const b of document.querySelectorAll('[data-ink-color]')){
 b.addEventListener('click',()=>{
  if(!INK_COLORS.includes(b.dataset.inkColor))return;
  activeInkColor=b.dataset.inkColor;saveBrush();syncBrushControls();
 });
}
for(const b of document.querySelectorAll('[data-stroke-style]')){
 b.addEventListener('click',()=>{
  if(!['solid','dashed'].includes(b.dataset.strokeStyle))return;
  activeInkStyle=b.dataset.strokeStyle;saveBrush();syncBrushControls();
 });
}
syncBrushControls();
const RIGHT_FORCE_MS=700,RIGHT_MOVE_TOLERANCE=6;
let rightForceTimer=null,latestInkIndex=-1;
function cancelRightForce(){if(rightForceTimer!==null){clearTimeout(rightForceTimer);rightForceTimer=null}}
function boardKey(){return key('board:'+qs[current].id)}
function saveBoard(){try{localStorage.setItem(boardKey(),JSON.stringify({objects,pan}))}catch{}}
window.loadBoard=function(){cancelRightForce();latestInkIndex=-1;holding=null;preview=null;shapeLock=null;drag=null;selected=[];clearTimeout(holdTimer);try{let v=JSON.parse(localStorage.getItem(boardKey())||'{}');objects=Array.isArray(v.objects)?v.objects:[];pan=v.pan||{x:0,y:0}}catch{objects=[];pan={x:0,y:0}}repaint()};
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
// Forced recognition uses relative geometric fit scores, not the strict
// confidence thresholds used for ordinary left-button handwriting.
function nearestShape(ps){
 const valid=(ps||[]).filter(p=>Number.isFinite(p.x)&&Number.isFinite(p.y));
 if(valid.length<2)return null;
 const first=valid[0],last=valid[valid.length-1];
 const box=bounds({pts:valid}),diag=Math.hypot(box.w,box.h);
 const endDist=length(first,last);
 if(diag<4)return{kind:'line',pts:[first,{x:last.x+.01,y:last.y+.01}]};
 // Ordinary recognition remains the first choice when it is confident.
 const certain=recognizer(valid);
 if(certain)return certain;
 let totalLength=0;
 for(let i=1;i<valid.length;i++)totalLength+=length(valid[i-1],valid[i]);
 const avg=fn=>valid.reduce((sum,p)=>sum+fn(p),0)/valid.length;
 const candidates=[];
 function offer(kind,pts,cost){
  if(pts&&Number.isFinite(cost))candidates.push({kind,pts,cost});
 }
 offer('line',[first,last],
  avg(p=>segdist(p,first,last))/diag*5+
  Math.max(0,totalLength/Math.max(1,endDist)-1.1)*.38);
 const corners=[
  {x:box.x,y:box.y},{x:box.x+box.w,y:box.y},
  {x:box.x+box.w,y:box.y+box.h},{x:box.x,y:box.y+box.h}
 ];
 const aspect=Math.min(box.w,box.h)/Math.max(box.w,box.h);
 const edgeError=avg(p=>Math.min(
  Math.abs(p.x-box.x),Math.abs(p.x-box.x-box.w),
  Math.abs(p.y-box.y),Math.abs(p.y-box.y-box.h)))/diag;
 const cornerMiss=corners.reduce((sum,c)=>sum+
  Math.min(...valid.map(p=>length(p,c))),0)/4/diag;
 if(aspect>.1)offer('rectangle',[...corners,{...corners[0]}],
  edgeError*6+cornerMiss*2.7+Math.min(1.5,endDist/diag)*1.1+
  (totalLength<1.5*(box.w+box.h)?1:0));
 const center={x:box.x+box.w/2,y:box.y+box.h/2};
 const radius=(box.w+box.h)/4;
 const radialError=Math.sqrt(avg(p=>(length(p,center)-radius)**2))/radius;
 const circleTurn=circleSweep(valid,center);
 if(aspect>.20)offer('circle',
  circlePoints({x:center.x-radius,y:center.y-radius,w:2*radius,h:2*radius}),
  radialError*2.5+(1-aspect)*1.1+
  Math.min(2,endDist/diag)*1.7+
  Math.abs(Math.abs(circleTurn.total)-2*Math.PI)/Math.PI*.6+
  circleTurn.backwards/Math.max(.1,circleTurn.absolute));
 // Approximate triangle corners via the most separated pair and the
 // point furthest from their connecting chord.
 const step=Math.max(1,Math.floor(valid.length/80));
 const sample=valid.filter((_,i)=>i%step===0);
 if(sample[sample.length-1]!==last)sample.push(last);
 let pair=[first,last],longest=0;
 for(let i=0;i<sample.length;i++){
  for(let j=i+1;j<sample.length;j++){
   const d=length(sample[i],sample[j]);
   if(d>longest){longest=d;pair=[sample[i],sample[j]]}
  }
 }
 let third=null,far=0;
 for(const p of sample){
  const d=segdist(p,pair[0],pair[1]);
  if(d>far){third=p;far=d}
 }
 if(third&&far>diag*.10){
  const tri=[pair[0],third,pair[1]];
  const err=avg(p=>Math.min(...[0,1,2].map(i=>
   segdist(p,tri[i],tri[(i+1)%3]))))/diag;
  offer('triangle',[...tri,{...tri[0]}],
   err*5+Math.min(1.5,endDist/diag)*1.1);
 }
 // Generate only true circular arcs, sampled from one fitted circumcircle.
 if(endDist>diag*.10){
  let pivot=null,sag=0;
  for(const p of valid){
   const d=segdist(p,first,last);
   if(d>sag){sag=d;pivot=p}
  }
  if(pivot&&sag>diag*.04){
   const fit=circumcircle(first,pivot,last);
   if(fit&&fit.r>4&&fit.r<diag*20){
    const turn=circleSweep(valid,fit);
    const abs=Math.abs(turn.total);
    if(abs>.25&&abs<6.1&&turn.backwards<turn.absolute*.35){
     const start=Math.atan2(first.y-fit.y,first.x-fit.x);
     const count=Math.max(24,Math.ceil(abs*26));
     const points=Array.from({length:count+1},(_,i)=>{
      const angle=start+turn.total*i/count;
      return{x:fit.x+fit.r*Math.cos(angle),y:fit.y+fit.r*Math.sin(angle)};
     });
     const rmse=Math.sqrt(avg(p=>(length(p,fit)-fit.r)**2))/fit.r;
     offer('arc',points,
      rmse*4+turn.backwards/Math.max(.1,turn.absolute)*2+
      Math.max(0,abs-5.4)*.3);
    }
   }
  }
 }
 candidates.sort((a,b)=>a.cost-b.cost);
 return candidates[0]?
  {kind:candidates[0].kind,pts:candidates[0].pts}:
  {kind:'line',pts:[first,last]};
}
function resize(){
 // Supersample at least 2 device pixels per CSS pixel to reduce stair-step
 // edges, especially on standard-density monitors. Cap the cost at 3x.
 const r=area.getBoundingClientRect();
 const d=Math.min(3,Math.max(2,window.devicePixelRatio||1));
 canvas.width=Math.round(r.width*d);canvas.height=Math.round(r.height*d);
 canvas.style.width=r.width+'px';canvas.style.height=r.height+'px';
 ctx.setTransform(d,0,0,d,0,0);repaint();
}
function lineObj(o,highlight=false){
 const p=o.pts||[];if(!p.length)return;
 ctx.lineWidth=inkWidth;ctx.lineJoin='round';ctx.lineCap='round';
 const color=highlight?'#278bd2':(INK_COLORS.includes(o.color)?o.color:'#111111');
 const dash=highlight?[9,6]:(o.strokeStyle==='dashed'?[10,7]:[]);
 // A single click creates an actual dot object, with no pointer motion.
 if(p.length===1){
  ctx.beginPath();ctx.arc(p[0].x,p[0].y,Math.max(2.4,inkWidth*1.1),0,Math.PI*2);
  ctx.fillStyle=color;ctx.fill();return;
 }
 ctx.beginPath();ctx.moveTo(p[0].x,p[0].y);
 if(o.kind==='ink'&&p.length>2){
  // Gentle quadratic smoothing: control points remain unchanged for shape
  // recognition, selecting, erasing, saving and exporting.
  const mid=(a,b)=>({x:(a.x+b.x)/2,y:(a.y+b.y)/2});
  const firstMid=mid(p[0],p[1]);
  ctx.lineTo(firstMid.x,firstMid.y);
  for(let i=1;i<p.length-1;i++){
   const next=mid(p[i],p[i+1]);
   ctx.quadraticCurveTo(p[i].x,p[i].y,next.x,next.y);
  }
  ctx.lineTo(p[p.length-1].x,p[p.length-1].y);
 }else{
  // Lines, rectangles, triangles and other geometric shapes stay precise.
  p.slice(1).forEach(t=>ctx.lineTo(t.x,t.y));
 }
 ctx.strokeStyle=color;ctx.setLineDash(dash);
 ctx.stroke();ctx.setLineDash([]);
}
function bboxAll(){if(!selected.length)return null;let p=selected.flatMap(i=>objects[i]?.pts||[]);return bounds({pts:p})}
function handles(r){let x=r.x,y=r.y,w=r.w,h=r.h;return[{kind:'tl',x,y},{kind:'tr',x:x+w,y},{kind:'br',x:x+w,y:y+h},{kind:'bl',x,y:y+h},{kind:'rot',x:x+w/2,y:y-33}]}
function repaint(){if(!canvas.width||!canvas.height)return;const d=canvas.width/Math.max(1,canvas.clientWidth);ctx.setTransform(d,0,0,d,0,0);ctx.clearRect(0,0,canvas.clientWidth,canvas.clientHeight);ctx.save();ctx.translate(pan.x,pan.y);
 objects.forEach((o,i)=>{if(drag?.kind==='forced'&&i===drag.target)return;lineObj(o,selected.includes(i))});if(holding)lineObj(preview||{pts:holding.pts,color:holding.color,strokeStyle:holding.strokeStyle},!!preview);if(drag?.kind==='forced')lineObj(drag.preview,true);
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
function hit(p){
 for(let i=objects.length-1;i>=0;i--){
  const pts=objects[i].pts||[];
  if(pts.length===1&&length(p,pts[0])<11)return i;
  for(let j=1;j<pts.length;j++)if(segdist(p,pts[j-1],pts[j])<11)return i;
 }
 return -1;
}
function hitHandle(p){const b=bboxAll();if(!b)return null;return handles(b).find(h=>length(h,p)<13)||null}
function duplicateSelected(){const arr=selected.map(i=>structuredClone(objects[i]));let start=objects.length;objects.push(...arr);selected=arr.map((_,i)=>start+i)}
function applyMove(ix,dy){selected.forEach(i=>objects[i].pts.forEach(p=>{p.x+=ix;p.y+=dy}))}
function rotateSelected(angle){const b=bboxAll(),c={x:b.x+b.w/2,y:b.y+b.h/2};let cos=Math.cos(angle),sin=Math.sin(angle);selected.forEach(i=>objects[i].pts.forEach(p=>{let x=p.x-c.x,y=p.y-c.y;p.x=c.x+x*cos-y*sin;p.y=c.y+x*sin+y*cos}))}
// Resize against the original geometry for stable Shift toggling.
function beginHandleDrag(handle,p){
 if(handle.kind==='rot')return{kind:'handle',handle,prev:{...p},last:{...p}};
 const box=bboxAll();if(!box)return null;
 const opposite={
  x:handle.kind.includes('l')?box.x+box.w:box.x,
  y:handle.kind.includes('t')?box.y+box.h:box.y
 };
 return{
  kind:'handle',handle,start:{...p},last:{...p},opposite,
  originalCorner:{x:handle.x,y:handle.y},
  originalObjects:selected.map(i=>({
   index:i,kind:objects[i].kind,
   pts:objects[i].pts.map(pt=>({...pt}))
  }))
 };
}
function stretchSelected(drag,now,keepAspect=false){
 if(!drag)return;
 if(drag.handle.kind==='rot'){
  const box=bboxAll();if(!box)return;
  const center={x:box.x+box.w/2,y:box.y+box.h/2};
  const angle=Math.atan2(now.y-center.y,now.x-center.x)-Math.atan2(drag.prev.y-center.y,drag.prev.x-center.x);
  rotateSelected(angle);drag.prev={...now};drag.last={...now};return;
 }
 const anchor=drag.opposite,corner=drag.originalCorner;
 if(!anchor||!corner)return;
 // Compensate the initial pointer/handle offset to prevent jumps.
 const requested={x:corner.x+now.x-drag.start.x,y:corner.y+now.y-drag.start.y};
 const width=corner.x-anchor.x,height=corner.y-anchor.y;
 let sx=(requested.x-anchor.x)/(width||1),sy=(requested.y-anchor.y)/(height||1);
 if(keepAspect){
  // Shift: all selected paths scale by the same factor on both axes.
  const factor=Math.abs(sx-1)>=Math.abs(sy-1)?sx:sy;
  sx=sy=Math.max(.05,factor);
 }else{
  // Default: horizontal and vertical factors are independent.
  sx=Math.max(.05,sx);sy=Math.max(.05,sy);
 }
 for(const source of drag.originalObjects){
  const obj=objects[source.index];if(!obj)continue;
  obj.pts=source.pts.map(pt=>({
   x:anchor.x+(pt.x-anchor.x)*sx,
   y:anchor.y+(pt.y-anchor.y)*sy
  }));
  // Nonuniform scaling turns circles into ellipses. Keep the full editable
  // sampled path; PDF export and object hit-testing already use these points.
  obj.kind=source.kind;
  if(Math.abs(sx-sy)>1e-5){
   if(source.kind==='circle')obj.kind='ellipse';
   if(source.kind==='arc')obj.kind='elliptic-arc';
  }
 }
 drag.last={...now};
}
function eraser(p){let id=hit(p);if(id>=0){objects.splice(id,1);if(id===latestInkIndex)latestInkIndex=-1;else if(id<latestInkIndex)latestInkIndex--;selected=[];saveBoard();repaint()}}
function clearPending(){clearTimeout(holdTimer);holdTimer=null}
// During the held-press preview, one geometrical control point follows the cursor.
// The fixed geometry is captured when the 650 ms recognition fires; only release commits it.
let shapeLock=null;
function nearestVertex(v,p){let index=0,best=Infinity;v.forEach((q,i)=>{const d=length(q,p);if(d<best){best=d;index=i}});return index}
function makeShapeLock(shape,p){
 const base=structuredClone(shape);
 if(shape.kind==='line'){
  return{kind:'line',A:{...shape.pts[0]},cursor:{...p}};
 }
 if(shape.kind==='rectangle'){
  const corners=shape.pts.slice(0,4);
  const i=nearestVertex(corners,p);
  // Order A-B-C-D so D is the corner under the mouse; B stays fixed.
  const oriented=[corners[(i+1)%4],corners[(i+2)%4],corners[(i+3)%4],corners[i]].map(q=>({...q}));
  const a=oriented[0],b=oriented[1];
  return{kind:'rectangle',A:a,B:b,orientation:Math.abs(a.x-b.x)<Math.abs(a.y-b.y)?'vertical':'horizontal',cursor:{...p}};
 }
 if(shape.kind==='triangle'){
  const vertices=shape.pts.slice(0,3);
  const i=nearestVertex(vertices,p);
  return{kind:'triangle',A:{...vertices[(i+1)%3]},B:{...vertices[(i+2)%3]},cursor:{...p}};
 }
 if(shape.kind==='circle'){
  const b=bounds(shape),center={x:b.x+b.w/2,y:b.y+b.h/2};
  return{kind:'circle',center,cursor:{...p}};
 }
 if(shape.kind==='arc'){
  const pts=shape.pts;
  const A={...pts[0]},mid={...pts[Math.floor(pts.length/2)]};
  const circle=circumcircle(A,mid,pts[pts.length-1]);
  const sweep=circle?circleSweep(pts,circle).total:Math.PI;
  return{kind:'arc',A,mid,turn:sweep<0?-1:1,base, cursor:{...p}};
 }
 return null;
}
function lockedShape(lock,p){
 const P={...p};
 if(lock.kind==='line')return{kind:'line',pts:[{...lock.A},P]};
 if(lock.kind==='triangle')return{kind:'triangle',pts:[{...lock.A},{...lock.B},P,{...lock.A}]};
 if(lock.kind==='rectangle'){
  const B={...lock.B},A=lock.orientation==='vertical'?
   {x:B.x,y:P.y}:{x:P.x,y:B.y};
  const C=lock.orientation==='vertical'?
   {x:P.x,y:B.y}:{x:B.x,y:P.y};
  return{kind:'rectangle',pts:[A,B,C,P,{...A}]};
 }
 if(lock.kind==='circle'){
  const r=Math.max(8,length(lock.center,P));
  return{kind:'circle',pts:circlePoints({x:lock.center.x-r,y:lock.center.y-r,w:2*r,h:2*r})};
 }
 if(lock.kind==='arc'){
  // A, an original guide point, and the moving endpoint lie on one true circle.
  // Re-fitting the circle gives an arc ending exactly at P, never a Bezier approximation.
  const fit=circumcircle(lock.A,lock.mid,P);
  if(!fit||!Number.isFinite(fit.r)||fit.r<4||fit.r>100000)
   return lock.base;
  const start=Math.atan2(lock.A.y-fit.y,lock.A.x-fit.x);
  const end=Math.atan2(P.y-fit.y,P.x-fit.x);
  const twoPi=2*Math.PI;
  let sweep=lock.turn>0?((end-start)%twoPi+twoPi)%twoPi:
   -(((start-end)%twoPi+twoPi)%twoPi);
  if(Math.abs(sweep)>Math.PI*1.99)sweep=Math.sign(sweep)*Math.PI*1.99;
  if(Math.abs(sweep)<.01)return lock.base;
  const n=Math.max(24,Math.ceil(Math.abs(sweep)*26));
  const pts=Array.from({length:n+1},(_,i)=>{
   const angle=start+sweep*i/n;
   return{x:fit.x+fit.r*Math.cos(angle),y:fit.y+fit.r*Math.sin(angle)};
  });
  return{kind:'arc',pts};
 }
 return lock.base;
}
function armHold(){
 clearPending();
 if(!holding||preview)return;
 holdTimer=setTimeout(()=>{
  holdTimer=null;
  if(!holding||preview)return;
  const recognized=recognizer(holding.pts);
  if(!recognized)return;
  const mouse=holding.pts[holding.pts.length-1];
  shapeLock=makeShapeLock(recognized,mouse);
  preview={...(shapeLock?lockedShape(shapeLock,mouse):recognized),color:holding.color,strokeStyle:holding.strokeStyle};
  repaint();
 },650);
}
function previewResize(p){
 if(!preview||!holding||!shapeLock)return;
 shapeLock.cursor={...p};
 preview={...lockedShape(shapeLock,p),color:holding.color,strokeStyle:holding.strokeStyle};
 holding.pts[holding.pts.length-1]={...p};
}
function eligibleInkIndex(p){
 const touching=hit(p);
 if(touching>=0&&objects[touching]?.kind==='ink')return touching;
 if(latestInkIndex>=0&&objects[latestInkIndex]?.kind==='ink')return latestInkIndex;
 return -1;
}
function armRightForce(down){
 cancelRightForce();
 rightForceTimer=setTimeout(()=>{
  rightForceTimer=null;
  if(drag!==down||down.kind!=='right-pending'||tool!=='pen')return;
  const ink=objects[down.target];
  if(!ink||ink.kind!=='ink')return;
  const candidate=nearestShape(ink.pts);
  if(!candidate)return;
  const endpoint=candidate.pts[candidate.pts.length-1];
  // Start exactly at the best-fit geometry; moving the pointer afterwards
  // edits the control point relative to the right-press starting position.
  const lock=makeShapeLock(candidate,endpoint);
  drag={kind:'forced',target:down.target,preview:{...candidate,color:ink.color,strokeStyle:ink.strokeStyle},
   lock,origin:{...down.startWorld},
   endpoint:{...endpoint},pointerId:down.pointerId};
  repaint();
 },RIGHT_FORCE_MS);
}
function finish(e,cancel=false){
 cancelRightForce();
 if(!drag&&!holding)return;
 if(drag){
  if(drag.kind==='right-pending'){drag=null;repaint();return}
  if(drag.kind==='forced'){
   if(!cancel&&objects[drag.target]){
    // On release, the chosen best-fit geometry replaces the same saved stroke.
    objects[drag.target]={...drag.preview,color:objects[drag.target].color||'#111111',strokeStyle:objects[drag.target].strokeStyle||'solid'};
    latestInkIndex=-1;
    saveBoard();
   }
   drag=null;repaint();return;
  }
  if(drag.kind==='marquee'){
   if(cancel||!drag.moved)selected=drag.base.slice();
   drag=null;repaint();return;
  }
  drag=null;saveBoard();
 }else if(holding){
  clearPending();
  if(!cancel&&preview&&e&&shapeLock)previewResize(point(e));
  if(!cancel&&holding.pts.length){
   const item=preview||(holding.pts.length===1?
    {kind:'dot',pts:[{...holding.pts[0]}]}:
    {kind:'ink',pts:holding.pts});
   objects.push({...item,color:holding.color,strokeStyle:holding.strokeStyle});
   latestInkIndex=item.kind==='ink'?objects.length-1:-1;
   saveBoard();
  }
  holding=null;preview=null;shapeLock=null;
 }
 area.classList.remove('pan');repaint();
}
area.addEventListener('contextmenu',e=>e.preventDefault());
area.addEventListener('pointerdown',e=>{
 if(e.button!==0&&e.button!==2)return;e.preventDefault();canvas.setPointerCapture(e.pointerId);
 activePointers.set(e.pointerId,eventScreen(e));let p=point(e);
 if(e.button===2){
  const target=tool==='pen'&&!holding?eligibleInkIndex(p):-1;
  if(target>=0){
   drag={kind:'right-pending',target,
    startScreen:eventScreen(e),startWorld:{...p},pointerId:e.pointerId};
   armRightForce(drag);
  }else{
   drag={kind:'pan',last:eventScreen(e)};
   area.classList.add('pan');
  }
  return;
 }
 if(tool==='eraser'){eraser(p);drag={kind:'erase'};return}
 // Selecting and transforming existing ink is only possible in explicit selection mode.
 // Pen mode NEVER hit-tests strokes, so handwriting may overlap earlier strokes.
 if(tool==='select'){
  const h=hitHandle(p);if(h){drag=beginHandleDrag(h,p);return}
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
 selected=[];holding={pts:[p],...brushSnapshot()};preview=null;shapeLock=null;drag=null;repaint();
});
area.addEventListener('pointermove',e=>{
 let cur=eventScreen(e);if(activePointers.has(e.pointerId))activePointers.set(e.pointerId,cur);
 if(!canvas.hasPointerCapture(e.pointerId))return;
 const p=point(e);
 if(drag?.kind==='right-pending'){
  if(length(cur,drag.startScreen)>RIGHT_MOVE_TOLERANCE){
   cancelRightForce();
   const start=drag.startScreen;
   drag={kind:'pan',last:start};
   area.classList.add('pan');
   pan.x+=cur.x-start.x;pan.y+=cur.y-start.y;
   drag.last=cur;repaint();
  }
  return;
 }
 if(drag?.kind==='forced'){
  const p=point(e),origin=drag.origin,endpoint=drag.endpoint;
  const control={x:endpoint.x+p.x-origin.x,y:endpoint.y+p.y-origin.y};
  drag.preview=drag.lock?{...lockedShape(drag.lock,control),color:objects[drag.target]?.color,strokeStyle:objects[drag.target]?.strokeStyle}:drag.preview;
  repaint();return;
 }
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
 if(drag?.kind==='handle'){stretchSelected(drag,p,e.shiftKey);repaint();return}
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
 if(drag||holding)finish(null,true);
 tool=v;selected=[];
 for(const [id,kind] of [['pen','pen'],['selectTool','select'],['eraser','eraser']]){
  const on=v===kind;$(id).classList.toggle('on',on);$(id).setAttribute('aria-pressed',String(on));
 }
 area.classList.toggle('eraser',v==='eraser');
 area.classList.toggle('pen',v==='pen');
 area.classList.toggle('select',v==='select');
 repaint();
}
$('clear').onclick=()=>{clearPending();cancelRightForce();latestInkIndex=-1;objects=[];selected=[];holding=null;preview=null;shapeLock=null;drag=null;pan={x:0,y:0};saveBoard();repaint()};
// Shift affects a held resize immediately, even without a pointer movement.
document.addEventListener('keydown',e=>{
 if(e.key==='Shift'&&drag?.kind==='handle'&&drag.handle.kind!=='rot'){
  stretchSelected(drag,drag.last||drag.start,true);repaint();
 }
});
document.addEventListener('keyup',e=>{
 if(e.key==='Shift'&&drag?.kind==='handle'&&drag.handle.kind!=='rot'){
  stretchSelected(drag,drag.last||drag.start,false);repaint();
 }
});
document.addEventListener('keydown',e=>{if(['INPUT','SELECT','TEXTAREA'].includes(document.activeElement?.tagName))return;if((e.key==='Delete'||e.key==='Backspace')&&selected.length){objects=objects.filter((_,i)=>!selected.includes(i));selected=[];saveBoard();repaint()}else if(e.key==='Escape'){e.preventDefault();setTool(tool==='pen'?'select':'pen')}else if(e.key==='ArrowRight'){open(current+1)}else if(e.key==='ArrowLeft'){open(current-1)}});
new ResizeObserver(resize).observe(area);
open(current);
})();