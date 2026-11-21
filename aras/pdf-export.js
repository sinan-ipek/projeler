/* v1.3.1 compatibility: older Aras HTML still imports this path.
   The actual PDF generator lives ONLY at ../check-liste/pdf-export.js. */
(function(){
 'use strict';
 const tag=document.createElement('script');
 tag.src='../check-liste/pdf-export.js?v=1.3.1';
 tag.onerror=()=>console.error('Ortak PDF oluşturucu yüklenemedi.');
 document.head.appendChild(tag);
})();