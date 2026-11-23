/* Check Liste ZIP importer v1.19.0.
   Reads a locally selected STORE-only ZIP; never uploads the archive or executes its HTML/JS.
   The bundle is validated and images are saved only to the browser's IndexedDB. */
(function(){
 'use strict';
 const COURSE_ID='lambacher-schweizer-7-nrw';
 const DB_NAME='check-liste-private-figures-v1';
 const MAX_ARCHIVE_BYTES=160*1024*1024;
 const MAX_IMAGE_BYTES=16*1024*1024;
 const MAX_IMAGE_TOTAL=120*1024*1024;
 const bytesToString=u=>new TextDecoder('utf-8',{fatal:true}).decode(u);
 const fail=message=>{throw new Error(message);};
 function openLocalDatabase(){
  return new Promise((resolve,reject)=>{
   if(!('indexedDB' in window))return reject(new Error('Tarayıcı yerel depolamayı desteklemiyor.'));
   const req=indexedDB.open(DB_NAME,1);
   req.onupgradeneeded=()=>{
    if(!req.result.objectStoreNames.contains('files'))req.result.createObjectStore('files');
   };
   req.onsuccess=()=>resolve(req.result);
   req.onerror=()=>reject(req.error||new Error('Görsel deposu açılamadı.'));
  });
 }
 function parseArchive(buffer){
  const view=new DataView(buffer),u8=new Uint8Array(buffer);
  const u16=o=>view.getUint16(o,true),u32=o=>view.getUint32(o,true);
  const limit=buffer.byteLength;
  let end=-1;
  for(let off=limit-22;off>=Math.max(0,limit-22-65535);off--){
   if(u32(off)===0x06054b50 && off+22+u16(off+20)===limit){end=off;break;}
  }
  if(end<0)fail('ZIP dosyasının son kaydı bulunamadı.');
  const fileCount=u16(end+10),centralSize=u32(end+12),centralOffset=u32(end+16);
  if(u16(end+8)!==fileCount||u16(end+4)!==0||u16(end+6)!==0)
   fail('Çok parçalı ZIP paketleri desteklenmiyor.');
  if(fileCount>1100||centralSize===0||centralOffset+centralSize>end)
   fail('ZIP paketinin içeriği beklenen biçimde değil.');
  let p=centralOffset,totalSize=0;
  const entries=new Map();
  for(let i=0;i<fileCount;i++){
   if(p+46>limit||u32(p)!==0x02014b50)fail('ZIP dosyasının dizini okunamadı.');
   const flags=u16(p+8),method=u16(p+10),compressed=u32(p+20),plain=u32(p+24);
   const nameSize=u16(p+28),extra=u16(p+30),comment=u16(p+32),localOffset=u32(p+42);
   const nameStart=p+46,recordEnd=nameStart+nameSize+extra+comment;
   if(recordEnd>limit)fail('ZIP dizini eksik.');
   const name=bytesToString(u8.subarray(nameStart,nameStart+nameSize));
   if(entries.has(name))fail('ZIP içinde yinelenen dosya adı var: '+name);
   if(flags&1)fail('Şifreli ZIP desteklenmiyor.');
   if(method!==0||plain!==compressed)fail('Lütfen uygulama için hazırlanmış ZIP paketini seç.');
   if(localOffset+30>limit||u32(localOffset)!==0x04034b50)fail('ZIP dosya başlığı bozuk.');
   const start=localOffset+30+u16(localOffset+26)+u16(localOffset+28);
   if(start+compressed>limit)fail('ZIP içinde eksik dosya var.');
   if(name.startsWith('images/')){
    totalSize+=plain;
    if(plain>MAX_IMAGE_BYTES||totalSize>MAX_IMAGE_TOTAL)fail('ZIP görselleri beklenenden büyük.');
   }
   entries.set(name,{name,offset:start,length:plain});
   p=recordEnd;
  }
  if(p!==centralOffset+centralSize)fail('ZIP dizini tutarsız.');
  const manifest=entries.get('manifest.json');
  if(!manifest||manifest.length>16384)fail('Bu dosya 7. sınıf Check Liste paketi değil.');
  let meta;
  try{meta=JSON.parse(bytesToString(u8.subarray(manifest.offset,manifest.offset+manifest.length)));}
  catch{fail('Paket tanımı okunamadı.');}
  if(meta.format!=='check-liste-local-course-1'||meta.packId!==COURSE_ID||meta.mediaCount!==700)
   fail('Bu ZIP, 7. sınıf için hazırlanmış doğru paket değil.');
  const images=[];
  for(const [name,entry] of entries){
   if(!name.startsWith('images/'))continue;
   const filename=name.slice(7);
   if(!/^[a-zA-Z0-9_.-]+\.(?:png|jpe?g|webp)$/i.test(filename))
    fail('Paket içinde geçersiz görsel adı var.');
   if(!entry.length)fail('Boş görsel dosyası: '+filename);
   const head=u8.subarray(entry.offset,entry.offset+Math.min(entry.length,12));
   const png=/\.png$/i.test(filename),jpg=/\.jpe?g$/i.test(filename),webp=/\.webp$/i.test(filename);
   const good=(png&&head[0]===0x89&&head[1]===0x50&&head[2]===0x4e&&head[3]===0x47)||
     (jpg&&head[0]===0xff&&head[1]===0xd8)||
     (webp&&head[0]===0x52&&head[1]===0x49&&head[2]===0x46&&head[3]===0x46);
   if(!good)fail('Paket içindeki görsel biçimi geçersiz: '+filename);
   images.push({filename,...entry});
  }
  if(images.length!==700)fail('Görsel sayısı uyuşmuyor: '+images.length+' / 700.');
  return images;
 }
 async function importFile(file,onProgress){
  if(!file||!/\.zip$/i.test(file.name||''))fail('Bir .zip paket dosyası seç.');
  if(file.size<100||file.size>MAX_ARCHIVE_BYTES)fail('ZIP dosyasının boyutu beklenen aralıkta değil.');
  onProgress?.('ZIP paketi kontrol ediliyor…');
  const bytes=await file.arrayBuffer();
  const images=parseArchive(bytes);
  onProgress?.(images.length+' görsel tarayıcıya kaydediliyor…');
  const database=await openLocalDatabase();
  try{
   await new Promise((resolve,reject)=>{
    const tx=database.transaction('files','readwrite');
    const store=tx.objectStore('files');
    for(const f of images){
     const ext=f.filename.split('.').pop().toLowerCase();
     const type=ext==='png'?'image/png':ext==='webp'?'image/webp':'image/jpeg';
     store.put(new Blob([bytes.slice(f.offset,f.offset+f.length)],{type}),COURSE_ID+':'+f.filename);
    }
    tx.oncomplete=()=>resolve();
    tx.onerror=()=>reject(tx.error||new Error('Görseller kaydedilemedi.'));
    tx.onabort=()=>reject(tx.error||new Error('Yeterli tarayıcı depolama alanı bulunamadı.'));
   });
  }finally{database.close();}
  onProgress?.(images.length+' görsel kaydedildi. Çalışma açılıyor…');
  return images.length;
 }
 window.CheckListeZipImport=Object.freeze({importFile});
})();