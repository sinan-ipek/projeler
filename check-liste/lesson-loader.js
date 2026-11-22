/* Check Liste v1.6.1 — Tek ortak ders yükleyicisi.
   Yalnızca ders veri kaynağı değişir: aynı HTML, çizim motoru ve PDF oluşturucu. */
(function(){
 'use strict';
 const params=new URLSearchParams(location.search);
 const id=params.get('set')||'cetin-1';
 const sources=Object.freeze({
  'cetin-1':{data:'./sets/matematik-5-2026/data.js',pack:'matematik-5-2026',name:'Çetin 1'},
  'aras-1':{data:'../aras/data.js',pack:'aras-zaman-2026',name:'Aras 1'},
  'munzur':{data:'./sets/munzur-2026/data.js',pack:'munzur-2026',name:'Munzur'},
  'lambacher-7':{data:'./sets/lambacher-schweizer-7/data.js',pack:'lambacher-schweizer-7-nrw',name:'Lambacher Schweizer 7'}
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
 async function start(){
  try{
   await load(selected.data+'?v=1.6.1');
   if(!window.CHECKLIST_PACK||
      window.CHECKLIST_PACK.id!==selected.pack||
      !Array.isArray(window.CHECKLIST_PACK.questions))
    throw new Error('Ders verileri doğrulanamadı.');
   await load('./app.js?v=1.3.1');
   await load('./pdf-export.js?v=1.3.1');
  }catch(err){
   console.error('Check Liste yükleme hatası:',err);
   if(status)status.textContent='Ders açılamadı: '+(err.message||String(err));
  }
 }
 start();
})();