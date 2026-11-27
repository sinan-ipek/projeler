/* Check Liste v1.38.5 — Tek ortak ders yükleyicisi.
   Yalnızca ders veri kaynağı değişir: aynı HTML, çizim motoru ve PDF oluşturucu. */
(function(){
 'use strict';
 const params=new URLSearchParams(location.search);
 const id=params.get('set')||'cetin-1';
 const sources=Object.freeze({
  'cetin-1':{data:'./sets/matematik-5-2026/data.js',pack:'matematik-5-2026',name:'Çetin 1'},
  'aras-1':{data:'../aras/data.js',pack:'aras-zaman-2026',name:'Aras 1'},
  'munzur':{data:'./sets/munzur-2026/data.js',pack:'munzur-2026',name:'Munzur'},
  'lambacher-7':{data:'./sets/lambacher-schweizer-7/data.js',pack:'lambacher-schweizer-7-nrw',name:'7. sınıf'},
  'mirac-1':{data:'./sets/mirac-denklemler-2026/data.js',pack:'mirac-denklemler-2026',name:'Miraç 1'},
  'tuana-2':{data:'./sets/tuana-2/data.js',pack:'tuana-2-vorabitur-2026',name:'Tuana 2'},
  'liya-1':{data:'./sets/liya-1/data.js',pack:'liya-1-proportion-2026',name:'Liya 1'},
  'egemen-1':{data:'./sets/egemen-1/data.js',pack:'egemen-1-test72-2026',name:'Egemen 1'},
  'kerem-1':{data:'./sets/kerem-1-fractions-2026/data.js',pack:'kerem-1-fractions-2026',name:'Kerem 1'},
  'ecrin-1':{data:'./sets/ecrin-1/data.js',pack:'ecrin-1-zuordnungen-2026',name:'Ecrin 1'}
 });
 const selected=sources[id];
 const status=document.getElementById('exportStatus');
 if(!selected){
  if(status)status.textContent='Bu ders bulunamadı. Check Liste menüsüne dön.';
  return;
 }
 function load(src){
  return new Promise((resolve,reject)=>{
   const tag=document.createElement('script');
   tag.src=src;tag.async=false;
   tag.onload=()=>resolve();
   tag.onerror=()=>reject(new Error(src+' yüklenemedi'));
   document.head.appendChild(tag);
  });
 }

 // Lambacher Schweizer 7: keep only pages with an example, exercise or question.
 // Keep other lesson packs and saved work (localStorage question IDs) untouched.
 function filterLambacherMenuPages(pack){
  const activityKinds=new Set([
   'exercise','teilaufgabe','unterteilaufgabe','review','test',
   'beispiel','exploration','erkundung','experimentieren',
   'checkin','check-in','grundwissen','wiederholen','aufgabe'
  ]);
  const hasWork=q=>{
   const kind=String(q.kind||'').toLowerCase();
   if(activityKinds.has(kind))return true;
   // Older pages contain numbered exercises without an explicit "kind".
   return !kind && /^(?:\d+|Beispiel(?:\s|$))/i.test(String(q.number||''));
  };
  const eligiblePages=new Set(pack.questions.filter(hasWork).map(q=>q.page));
  // These two Exkursion EXTRA pages have discussion and justification tasks
  // (rather than numbered Aufgaben).
  eligiblePages.add(228);
  eligiblePages.add(229);
  for(const q of pack.questions){
   if((q.page===228||q.page===229)&&q.kind==='thema'){
    q.kind='erkundung';q.number='Etkinlik';q.exercise='Etkinlik';
   }
  }
  const original=pack.questions;
  pack.questions=original.filter(q=>eligiblePages.has(q.page));
  pack.menuPolicy='exercise-example-question-pages';
  pack.bookPhotoPageCount=292;
  pack.menuPageCount=new Set(pack.questions.map(q=>q.page)).size;
 }

 async function loadGrade7FromBrowser(){
  const stored=await new Promise((resolve,reject)=>{
   if(!('indexedDB' in window))return reject(new Error('Tarayıcı yerel depolamayı desteklemiyor.'));
   const r=indexedDB.open('check-liste-private-figures-v1',1);
   r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains('files'))r.result.createObjectStore('files');};
   r.onerror=()=>reject(r.error||new Error('Yerel çalışma deposu açılamadı.'));
   r.onsuccess=()=>{
    const db=r.result;
    const tx=db.transaction('files','readonly');
    const req=tx.objectStore('files').get('lambacher-schweizer-7-nrw:__study__.json');
    req.onsuccess=()=>{resolve(req.result||null);db.close();};
    req.onerror=()=>{reject(req.error||new Error('Yerel çalışma okunamadı.'));db.close();};
   };
  });
  if(!stored){
   const message='7. sınıf çalışması henüz yüklenmedi. Check Liste ana sayfasına dön, 7. sınıf → Yükle bölümünden ZIP paketini seç.';
   const status=document.getElementById('exportStatus');
   if(status)status.textContent=message;
   const list=document.getElementById('menu');
   if(list)list.textContent=message;
   document.getElementById('setTitle').textContent='7. sınıf · ZIP paketi bekleniyor';
   return false;
  }
  let pack;
  try{pack=JSON.parse(await stored.text());}
  catch{throw new Error('Yerel çalışma dosyası bozuk; ZIP paketini yeniden yükle.');}
  if(pack.id!=='lambacher-schweizer-7-nrw'||!Array.isArray(pack.questions)||pack.questions.length!==3080)
   throw new Error('Yerel çalışma paketi beklenen biçimde değil.');
  window.CHECKLIST_PACK=pack;
  return true;
 }
 async function start(){
  try{
   if(id==='lambacher-7'){
    const available=await loadGrade7FromBrowser();
    if(!available)return;
    filterLambacherMenuPages(window.CHECKLIST_PACK);
   }else{
    await load(selected.data+'?v=1.38.5');
    if(!window.CHECKLIST_PACK||
       window.CHECKLIST_PACK.id!==selected.pack||
       !Array.isArray(window.CHECKLIST_PACK.questions))
     throw new Error('Ders verileri doğrulanamadı.');
   }
   await load('./app.js?v=1.38.3');
   await load('./pdf-export.js?v=1.27.0');
  }catch(err){
   console.error('Check Liste yükleme hatası:',err);
   if(status)status.textContent='Ders açılamadı: '+(err.message||String(err));
  }
 }
 start();
})();