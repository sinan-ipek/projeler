/* Check Liste · Yerel kitap saklama v1.18.0
   PDF yalnızca bu tarayıcının IndexedDB'sine yazılır; GitHub'a veya sunucuya gönderilmez. */
(function(){
 'use strict';
 const DB_NAME='check-liste-local-books-v1', STORE_NAME='books', BOOK_KEY='grade-7';
 let dbPromise=null;
 function db(){
  if(dbPromise)return dbPromise;
  dbPromise=new Promise((resolve,reject)=>{
   if(!('indexedDB' in window)){reject(new Error('Bu tarayıcı yerel kitap kaydetmeyi desteklemiyor.'));return;}
   const request=indexedDB.open(DB_NAME,1);
   request.onupgradeneeded=()=>{
    if(!request.result.objectStoreNames.contains(STORE_NAME)){
     request.result.createObjectStore(STORE_NAME);
    }
   };
   request.onsuccess=()=>resolve(request.result);
   request.onerror=()=>{dbPromise=null;reject(request.error||new Error('Yerel kitap deposu açılamadı.'));};
  });
  return dbPromise;
 }
 async function get(){
  const database=await db();
  return new Promise((resolve,reject)=>{
   const request=database.transaction(STORE_NAME,'readonly').objectStore(STORE_NAME).get(BOOK_KEY);
   request.onsuccess=()=>resolve(request.result||null);
   request.onerror=()=>reject(request.error||new Error('Yerel kitap okunamadı.'));
  });
 }
 async function save(file){
  if(!file||!(file instanceof Blob)||!file.size){
   throw new Error('Lütfen bir PDF dosyası seç.');
  }
  if(!/\.pdf$/i.test(file.name||'') && file.type!=='application/pdf'){
   throw new Error('Kitabı PDF dosyası olarak seçmelisin.');
  }
  // This is a local browser write, not a network upload.
  const database=await db();
  return new Promise((resolve,reject)=>{
   const transaction=database.transaction(STORE_NAME,'readwrite');
   transaction.objectStore(STORE_NAME).put({
    file:file,
    name:file.name||'kitap.pdf',
    bytes:file.size,
    savedAt:Date.now()
   },BOOK_KEY);
   transaction.oncomplete=()=>resolve();
   transaction.onerror=()=>reject(transaction.error||new Error('Yerel kaydetme başarısız.'));
   transaction.onabort=()=>reject(transaction.error||new Error('Depolama alanı dolu veya engellenmiş olabilir.'));
  });
 }
 window.CheckListeLocalBook=Object.freeze({get,save});
})();