/* Check Liste v1.20.0 · Import a local grade-7 ZIP containing both study cards and images.
   A previous images-only v1.19 ZIP is supported once as a migration: the current
   study inventory is fetched then, saved locally, and a complete ZIP is generated
   in the browser. Later imports of the complete ZIP require no study-data fetch. */
(function(){
 'use strict';
 const ID='lambacher-schweizer-7-nrw', STORE='files', DB='check-liste-private-figures-v1';
 const STUDY_KEY=ID+':__study__.json', MAX_ZIP=160*1024*1024;
 const decoder=new TextDecoder('utf-8',{fatal:true}), encoder=new TextEncoder();
 const fail=message=>{throw new Error(message);};
 function openDB(){
  return new Promise((resolve,reject)=>{
   if(!('indexedDB' in window))return reject(new Error('Tarayıcı yerel depolamayı desteklemiyor.'));
   const r=indexedDB.open(DB,1);
   r.onupgradeneeded=()=>{if(!r.result.objectStoreNames.contains(STORE))r.result.createObjectStore(STORE);};
   r.onsuccess=()=>resolve(r.result);
   r.onerror=()=>reject(r.error||new Error('Yerel depo açılamadı.'));
  });
 }
 function parseZip(buffer){
  const bytes=new Uint8Array(buffer),v=new DataView(buffer),len=bytes.length;
  const r16=p=>v.getUint16(p,true),r32=p=>v.getUint32(p,true);
  let end=-1;
  for(let p=len-22;p>=Math.max(0,len-65557);p--){
   if(r32(p)===0x06054b50 && p+22+r16(p+20)===len){end=p;break;}
  }
  if(end<0)fail('Geçerli ZIP son kaydı bulunamadı.');
  const n=r16(end+10),size=r32(end+12),off=r32(end+16);
  if(n<1||n>1100||r16(end+8)!==n||r16(end+4)||r16(end+6)||off+size>end)
   fail('ZIP dizini geçersiz veya desteklenmiyor.');
  const entries=new Map();let pos=off,total=0;
  for(let i=0;i<n;i++){
   if(pos+46>len||r32(pos)!==0x02014b50)fail('ZIP dizini okunamadı.');
   const method=r16(pos+10),flags=r16(pos+8),compressed=r32(pos+20),plain=r32(pos+24);
   const nameLength=r16(pos+28),extra=r16(pos+30),comment=r16(pos+32),local=r32(pos+42);
   const next=pos+46+nameLength+extra+comment;
   if(next>len||local+30>len||r32(local)!==0x04034b50)fail('ZIP kaydı bozuk.');
   if(method!==0||plain!==compressed||flags&1)fail('STORE biçimindeki 7. sınıf ZIP paketini seç.');
   const name=decoder.decode(bytes.subarray(pos+46,pos+46+nameLength));
   const body=local+30+r16(local+26)+r16(local+28);
   if(body+plain>len||entries.has(name))fail('ZIP içinde geçersiz dosya kaydı.');
   if(name.startsWith('images/')){
    total+=plain;if(plain>16*1024*1024||total>120*1024*1024)fail('Görseller çok büyük.');
   }
   entries.set(name,{name,start:body,length:plain});
   pos=next;
  }
  if(pos!==off+size)fail('ZIP merkezi dizini eksik.');
  const read=name=>{const e=entries.get(name);return e?bytes.subarray(e.start,e.start+e.length):null;};
  const manifest=read('manifest.json');if(!manifest||manifest.length>16384)fail('Bu, 7. sınıf ZIP paketi değil.');
  let m;
  try{m=JSON.parse(decoder.decode(manifest));}catch{fail('ZIP paket tanımı bozuk.');}
  if(m.format!=='check-liste-local-course-1'||m.packId!==ID||m.mediaCount!==700)
   fail('Bu ZIP, beklenen 7. sınıf paketi değil.');
  const images=[];
  for(const [name,e] of entries){
   if(!name.startsWith('images/'))continue;
   const filename=name.slice(7);
   if(!/^[a-zA-Z0-9_.-]+\.(?:png|jpe?g|webp)$/i.test(filename))fail('Geçersiz görsel dosyası adı.');
   const head=read(name),x=head[0],y=head[1],ext=filename.split('.').pop().toLowerCase();
   if(!head.length||ext==='png'&&!(x===137&&y===80)||
     (ext==='jpg'||ext==='jpeg')&&!(x===255&&y===216)||
     ext==='webp'&&!(x===82&&y===73))fail('Görsel bozuk: '+filename);
   images.push({filename,entry:e});
  }
  if(images.length!==700)fail('Görsel sayısı uyuşmuyor: '+images.length+'/700.');
  return {buffer,bytes,entries,images,read,centralOffset:off,centralSize:size,count:n};
 }
 function validateStudy(study,images){
  if(!study||study.id!==ID||!Array.isArray(study.questions)||study.questions.length!==3080)
   fail('ZIP içinde beklenen çalışma kartları bulunamadı.');
  const ids=new Set(),refs=new Set();
  for(const q of study.questions){
   if(!q||typeof q.id!=='string'||!Number.isInteger(q.page)||typeof q.german!=='string'||
      typeof q.turkish!=='string'||ids.has(q.id))fail('Çalışma kartlarında hata var.');
   ids.add(q.id);
   if(q.privateImageFile)refs.add(q.privateImageFile);
  }
  const filenames=new Set(images.map(x=>x.filename));
  if(refs.size!==700||refs.size!==filenames.size||[...refs].some(n=>!filenames.has(n)))
   fail('Çalışmanın görsel isimleri ile ZIP içeriği uyuşmuyor.');
  return study;
 }
 async function migrateOldImagesOnly(zip,progress){
  progress?.('Önceki pakete çalışma kartları ekleniyor…');
  // Only a trusted same-origin JS resource is loaded. Uploaded ZIP code is never executed.
  if(!window.CHECKLIST_PACK){
   await new Promise((resolve,reject)=>{
    const script=document.createElement('script');
    script.src='./sets/lambacher-schweizer-7/data.js?v=1.19.0';
    script.onload=resolve;script.onerror=()=>reject(new Error('Eski çalışma verisi alınamadı. İnterneti kontrol et.'));
    document.head.appendChild(script);
   });
  }
  const study=JSON.parse(JSON.stringify(window.CHECKLIST_PACK));
  study.version='1.20.0';
  validateStudy(study,zip.images);
  return study;
 }
 function crc32(data){
  let c=0xffffffff;
  for(const b of data){c^=b;for(let i=0;i<8;i++)c=(c&1)?(0xedb88320^(c>>>1)):(c>>>1);}
  return (c^0xffffffff)>>>0;
 }
 function makeFullZip(zip,study){
  const files=[
   ['study.json',encoder.encode(JSON.stringify(study))],
   ['manifest-v2.json',encoder.encode(JSON.stringify({
      format:'check-liste-local-course-2',packId:ID,version:'1.20.0',
      questionCount:3080,mediaCount:700,studyEntry:'study.json'
   }))],
   ['README-TAM-PAKET.txt',encoder.encode(
      '7. SINIF · CHECK LISTE · TAM ÇALIŞMA PAKETİ v1.20.0\n' +
      'Bu ZIP, 3080 çalışma takip kartını ve 700 özel görseli birlikte içerir.\n' +
      'Kullanım: https://sinan-ipek.github.io/projeler/check-liste/ → 7. sınıf → Yükle.\n' +
      'ZIP açılmadan tarayıcıda okunur; uygulama kabuğu GitHub Pages üzerinden çalışır.\n' +
      'Özgün kitap soru metinlerinin tamamı bu envanterde bulunmaz.\n'
   )]
  ];
  const records=[],centrals=[];let offset=zip.bytes.length;
  const put16=(v,a,o,n)=>{a[o]=n&255;a[o+1]=(n>>>8)&255;};
  const put32=(v,a,o,n)=>{a[o]=n&255;a[o+1]=(n>>>8)&255;a[o+2]=(n>>>16)&255;a[o+3]=(n>>>24)&255;};
  for(const [name,data] of files){
   const nm=encoder.encode(name),crc=crc32(data);
   const local=new Uint8Array(30+nm.length);
   put32(0,local,0,0x04034b50);put16(0,local,4,20);put16(0,local,6,2048);
   put32(0,local,14,crc);put32(0,local,18,data.length);put32(0,local,22,data.length);
   put16(0,local,26,nm.length);local.set(nm,30);
   const cent=new Uint8Array(46+nm.length);
   put32(0,cent,0,0x02014b50);put16(0,cent,4,20);put16(0,cent,6,20);put16(0,cent,8,2048);
   put32(0,cent,16,crc);put32(0,cent,20,data.length);put32(0,cent,24,data.length);
   put16(0,cent,28,nm.length);put32(0,cent,42,offset);cent.set(nm,46);
   records.push(local,data);centrals.push(cent);offset+=local.length+data.length;
  }
  const newCentralOffset=offset,oldCentral=zip.bytes.subarray(zip.centralOffset,zip.centralOffset+zip.centralSize);
  const centralSize=zip.centralSize+centrals.reduce((n,p)=>n+p.length,0);
  const eocd=new Uint8Array(22),count=zip.count+files.length;
  put32(0,eocd,0,0x06054b50);put16(0,eocd,8,count);put16(0,eocd,10,count);
  put32(0,eocd,12,centralSize);put32(0,eocd,16,newCentralOffset);
  const blob=new Blob([zip.bytes,...records,oldCentral,...centrals,eocd],{type:'application/zip'});
  if(blob.size>MAX_ZIP)fail('Birleştirilmiş paket çok büyük.');
  return blob;
 }
 async function importFile(file,progress){
  if(!file||!/\.zip$/i.test(file.name||'')||file.size<100||file.size>MAX_ZIP)
   fail('Geçerli bir 7. sınıf ZIP dosyası seç.');
  progress?.('ZIP kontrol ediliyor…');
  const zip=parseZip(await file.arrayBuffer());
  const studyFile=zip.read('study.json');
  let study,fullZip=null;
  if(studyFile){
   if(studyFile.length>6*1024*1024)fail('Çalışma veri dosyası çok büyük.');
   try{study=validateStudy(JSON.parse(decoder.decode(studyFile)),zip.images);}
   catch(err){fail('Çalışma verisi geçersiz: '+(err.message||err));}
  }else{
   study=await migrateOldImagesOnly(zip,progress);
   progress?.('Çalışma ve görseller tek bir ZIP dosyasında birleştiriliyor…');
   fullZip=makeFullZip(zip,study);
  }
  progress?.('3080 çalışma kartı ve 700 görsel yerel olarak kaydediliyor…');
  const db=await openDB();
  try{
   await new Promise((resolve,reject)=>{
    const tx=db.transaction(STORE,'readwrite'),store=tx.objectStore(STORE);
    for(const img of zip.images){
     const ext=img.filename.split('.').pop().toLowerCase();
     const type=ext==='png'?'image/png':ext==='webp'?'image/webp':'image/jpeg';
     store.put(new Blob([zip.bytes.subarray(img.entry.start,img.entry.start+img.entry.length)],{type}),ID+':'+img.filename);
    }
    store.put(new Blob([JSON.stringify(study)],{type:'application/json'}),STUDY_KEY);
    tx.oncomplete=()=>resolve();
    tx.onerror=()=>reject(tx.error||new Error('Tarayıcı kayıt hatası.'));
    tx.onabort=()=>reject(tx.error||new Error('Tarayıcıda yeterli depolama alanı olmayabilir.'));
   });
  }finally{db.close();}
  progress?.('3080 kart ve 700 görsel hazır.');
  return {questions:3080,images:700,fullZip};
 }
 async function hasStudy(){
  const db=await openDB();
  try{
   return await new Promise((resolve,reject)=>{
    const r=db.transaction(STORE,'readonly').objectStore(STORE).get(STUDY_KEY);
    r.onsuccess=()=>resolve(!!r.result);
    r.onerror=()=>reject(r.error||new Error('Kayıt denetlenemedi.'));
   });
  }finally{db.close();}
 }
 window.CheckListeZipImport=Object.freeze({importFile,hasStudy});
})();
