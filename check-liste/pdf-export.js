(function(){
'use strict';

// Client-only PDF export: no uploaded drawings, external services, or CDN dependency.
const button=document.getElementById('shareSolutions');
const status=document.getElementById('exportStatus');
const shareButton=document.getElementById('sharePdfFile');
if(!button||!status||!window.CHECKLIST_PACK)return;

const pack=window.CHECKLIST_PACK;
const questions=pack.questions||[];
const params=new URLSearchParams(location.search);
const profile=params.get('profile')||'default';
const W=1240,H=1754, M=82, MAXY=1650, WIDTH=W-2*M;
const PAGE_W=595.28,PAGE_H=841.89;
const FONT='Arial, "Noto Sans", "DejaVu Sans", system-ui, sans-serif';
let canvas=null,ctx=null,y=0,currentQuestion=null,currentIndex=0;
let pictures=[];
let fileToShare=null;
const textEncoder=new TextEncoder();

function setStatus(s){status.textContent=s}
function safeTitle(s){
 return String(s||'Check-Liste').normalize('NFD').replace(/[\u0300-\u036f]/g,'')
 .replace(/[^a-zA-Z0-9-]+/g,'-').replace(/^-|-$/g,'').slice(0,56)||'Check-Liste';
}
function savedObjects(q){
 const k=['dotem-checkliste-v2',pack.id||'cetin-2026',profile,'board:'+q.id].join(':');
 try{
  const v=JSON.parse(localStorage.getItem(k)||'{}');
  return Array.isArray(v.objects)?v.objects:[];
 }catch(_){return[]}
}
function startPage(q,index,continued){
 if(canvas)finishPage();
 canvas=document.createElement('canvas');canvas.width=W;canvas.height=H;
 ctx=canvas.getContext('2d',{alpha:false});
 if(!ctx)throw new Error('PDF için çizim alanı açılamadı');
 ctx.fillStyle='#fff';ctx.fillRect(0,0,W,H);
 ctx.fillStyle='#3e6b50';ctx.fillRect(0,0,W,12);
 ctx.fillStyle='#426751';ctx.font='bold 29px '+FONT;
 ctx.fillText('Check Liste  /  '+(pack.title||'Matematik'),M,75,WIDTH);
 ctx.strokeStyle='#dce7df';ctx.lineWidth=2;ctx.beginPath();ctx.moveTo(M,103);ctx.lineTo(W-M,103);ctx.stroke();
 ctx.fillStyle='#344f3d';ctx.font='bold 34px '+FONT;
 const label='Sayfa '+q.page+'   ·   Soru '+q.number+(continued?'  (devam)':'');
 ctx.fillText(label,M,157,WIDTH);
 ctx.fillStyle='#718278';ctx.font='20px '+FONT;
 ctx.fillText('Soru '+(index+1)+' / '+questions.length+'  ·  '+new Date().toLocaleDateString('tr-TR'),M,H-52);
 ctx.fillText('Check Liste · DoTEM',W-M-255,H-52);
 y=200;
 currentQuestion=q;currentIndex=index;
}
function finishPage(){
 if(!canvas)return;
 let data;
 try{data=canvas.toDataURL('image/jpeg',0.88)}
 catch(e){throw new Error('PDF sayfası resim olarak hazırlanamadı: '+e.message)}
 const b64=data.slice(data.indexOf(',')+1),bin=atob(b64);
 const jpg=new Uint8Array(bin.length);
 for(let i=0;i<bin.length;i++)jpg[i]=bin.charCodeAt(i);
 pictures.push(jpg);
 canvas.width=1;canvas.height=1;canvas=null;ctx=null;
}
function room(height){
 if(y+height>MAXY)startPage(currentQuestion,currentIndex,true);
}
function heading(title){
 room(71);
 y+=17;
 ctx.font='bold 22px '+FONT;ctx.fillStyle='#426751';ctx.fillText(title,M,y);
 y+=25;
}
function wrapText(paragraph,font){
 ctx.font=font;
 const all=[];
 for(const raw of String(paragraph||'').split('\n')){
  if(!raw.trim()){all.push('');continue}
  const words=raw.split(/\s+/);
  let line='';
  for(const word of words){
   const next=line?line+' '+word:word;
   if(line&&ctx.measureText(next).width>WIDTH){all.push(line);line=word}
   else line=next;
  }
  all.push(line);
 }
 return all;
}
function paragraph(text,color){
 const font='24px '+FONT,lineHeight=35,lines=wrapText(text,font);
 ctx.font=font;
 for(const line of lines){
  room(lineHeight);
  ctx.fillStyle=color||'#26342b';ctx.font=font;
  if(line)ctx.fillText(line,M,y,WIDTH);
  y+=lineHeight;
 }
 y+=15;
}
function imageLoad(src){
 return new Promise(resolve=>{
  if(!src)return resolve(null);
  const im=new Image();
  let settled=false;
  const done=v=>{if(!settled){settled=true;clearTimeout(timeout);resolve(v)}};
  const timeout=setTimeout(()=>done(null),7000);
  if(/^https?:\/\//i.test(src))im.crossOrigin='anonymous';
  im.onload=()=>done(im);im.onerror=()=>done(null);
  im.src=src;
 });
}
async function drawExerciseImage(q){
 const src=q.figureImage||q.sourceImage||q.image;
 if(!src)return;
 const image=await imageLoad(src);
 if(!image){heading('SORU GÖRSELİ');paragraph('Soru görseli yüklenemedi.','#a04736');return}
 const h=Math.min(590,Math.round(image.naturalHeight*WIDTH/image.naturalWidth));
 room(h+100);heading('SORU GÖRSELİ');
 ctx.fillStyle='#f7f9f6';ctx.fillRect(M,y,WIDTH,h+12);
 ctx.drawImage(image,M+(WIDTH-image.naturalWidth*Math.min(WIDTH/image.naturalWidth,h/image.naturalHeight))/2,
  y+6,image.naturalWidth*Math.min(WIDTH/image.naturalWidth,h/image.naturalHeight),
  image.naturalHeight*Math.min(WIDTH/image.naturalWidth,h/image.naturalHeight));
 y+=h+25;
}
function drawSolutionBoard(objects){
 room(510);
 heading('ÇÖZÜM ALANI');
 let height=Math.min(760,MAXY-y-17);
 if(height<430){startPage(currentQuestion,currentIndex,true);heading('ÇÖZÜM ALANI');height=Math.min(760,MAXY-y-17)}
 const left=M,top=y,width=WIDTH;
 ctx.fillStyle='#fff';ctx.fillRect(left,top,width,height);
 ctx.strokeStyle='#d4e1d7';ctx.lineWidth=2;ctx.strokeRect(left,top,width,height);
 const paths=objects.filter(o=>Array.isArray(o.pts)&&o.pts.length>0);
 if(!paths.length){
  ctx.font='22px '+FONT;ctx.fillStyle='#9aaba0';
  ctx.fillText('Bu soru için henüz çözüm çizimi kaydedilmemiş.',left+30,top+55);
  y+=height+20;return;
 }
 let minX=Infinity,minY=Infinity,maxX=-Infinity,maxY=-Infinity;
 for(const o of paths)for(const p of o.pts){
  if(!Number.isFinite(p.x)||!Number.isFinite(p.y))continue;
  minX=Math.min(minX,p.x);minY=Math.min(minY,p.y);
  maxX=Math.max(maxX,p.x);maxY=Math.max(maxY,p.y);
 }
 if(!Number.isFinite(minX)){y+=height+20;return}
 const bw=Math.max(10,maxX-minX),bh=Math.max(10,maxY-minY);
 const scale=Math.min((width-72)/bw,(height-80)/bh,3.25);
 const ox=left+(width-bw*scale)/2-minX*scale;
 const oy=top+(height-bh*scale)/2-minY*scale;
 ctx.save();
 ctx.beginPath();ctx.rect(left+3,top+3,width-6,height-6);ctx.clip();
 ctx.lineJoin='round';ctx.lineCap='round';ctx.strokeStyle='#17231e';
 ctx.lineWidth=Math.max(2,Math.min(6,2.25*scale));
 for(const o of paths){
  ctx.beginPath();let drawn=0;
  for(const p of o.pts){
   if(!Number.isFinite(p.x)||!Number.isFinite(p.y))continue;
   const x=ox+p.x*scale,py=oy+p.y*scale;
   if(!drawn)ctx.moveTo(x,py);else ctx.lineTo(x,py);
   drawn++;
  }
  if(drawn===1){const p=o.pts[0];ctx.arc(ox+p.x*scale,oy+p.y*scale,ctx.lineWidth/2,0,Math.PI*2);ctx.fillStyle='#17231e';ctx.fill()}
  else if(drawn>1)ctx.stroke();
 }
 ctx.restore();y+=height+20;
}
async function renderAll(){
 pictures=[];canvas=null;ctx=null;
 for(let i=0;i<questions.length;i++){
  const q=questions[i];
  startPage(q,i,false);
  heading('DEUTSCH · ALMANCA');paragraph(q.german,'#273b30');
  heading('TÜRKÇE · ÇEVİRİ');paragraph(q.turkish,'#355a42');
  await drawExerciseImage(q);
  drawSolutionBoard(savedObjects(q));
  finishPage();
  setStatus('PDF hazırlanıyor: '+(i+1)+' / '+questions.length+' soru');
  if(i%2===1)await new Promise(resolve=>setTimeout(resolve,0));
 }
 return makePdf(pictures);
}
function makePdf(jpgs){
 const chunks=[];let offset=0;const positions=[];
 function push(data){const bytes=typeof data==='string'?textEncoder.encode(data):data;chunks.push(bytes);offset+=bytes.length}
 function object(n,body){positions[n]=offset;push(n+' 0 obj\n');push(body);push('\nendobj\n')}
 const pageRefs=jpgs.map((_,i)=>(3+i*3)+' 0 R').join(' ');
 const max=2+jpgs.length*3;
 push('%PDF-1.4\n%PDF image pages\n');
 object(1,'<< /Type /Catalog /Pages 2 0 R >>');
 object(2,'<< /Type /Pages /Count '+jpgs.length+' /Kids [ '+pageRefs+' ] >>');
 for(let i=0;i<jpgs.length;i++){
  const id=3+i*3,img=id+1,stream=id+2,jpg=jpgs[i];
  object(id,'<< /Type /Page /Parent 2 0 R /MediaBox [0 0 '+PAGE_W+' '+PAGE_H+'] /Resources << /XObject << /Im0 '+img+' 0 R >> >> /Contents '+stream+' 0 R >>');
  positions[img]=offset;push(img+' 0 obj\n');
  push('<< /Type /XObject /Subtype /Image /Width '+W+' /Height '+H+' /ColorSpace /DeviceRGB /BitsPerComponent 8 /Filter /DCTDecode /Length '+jpg.length+' >>\nstream\n');
  push(jpg);push('\nendstream\nendobj\n');
  const draw='q\n'+PAGE_W+' 0 0 '+PAGE_H+' 0 0 cm\n/Im0 Do\nQ\n';
  object(stream,'<< /Length '+textEncoder.encode(draw).length+' >>\nstream\n'+draw+'endstream');
 }
 const xref=offset;
 push('xref\n0 '+(max+1)+'\n0000000000 65535 f \n');
 for(let i=1;i<=max;i++)push(String(positions[i]).padStart(10,'0')+' 00000 n \n');
 push('trailer\n<< /Size '+(max+1)+' /Root 1 0 R >>\nstartxref\n'+xref+'\n%%EOF\n');
 return new Blob(chunks,{type:'application/pdf'});
}
function downloadPdf(blob,name){
 const url=URL.createObjectURL(blob);
 const a=document.createElement('a');a.href=url;a.download=name;
 document.body.appendChild(a);a.click();a.remove();
 setTimeout(()=>URL.revokeObjectURL(url),90000);
}
let busy=false;
button.addEventListener('click',async()=>{
 if(busy)return;busy=true;button.disabled=true;fileToShare=null;shareButton.hidden=true;
 try{
  if(!questions.length)throw new Error('Bu listede soru bulunamadı');
  setStatus('Tüm sorular ve çizimler PDF olarak hazırlanıyor…');
  const blob=await renderAll();
  const name='Check-Liste-'+safeTitle(pack.title||pack.id)+'-Cozumler-'+new Date().toISOString().slice(0,10)+'.pdf';
  fileToShare=typeof File==='function'?new File([blob],name,{type:'application/pdf'}):null;
  downloadPdf(blob,name);
  const canShare=!!(fileToShare&&navigator.canShare&&navigator.canShare({files:[fileToShare]})&&navigator.share);
  shareButton.hidden=!canShare;
  setStatus(questions.length+' sorunun çözümleri '+pictures.length+' sayfalık PDF olarak indirildi.'+(canShare?' İstersen “Dosyayı paylaş”a bas.':''));
 }catch(err){
  console.error('PDF dışa aktarma hatası:',err);
  setStatus('PDF oluşturulamadı: '+(err?.message||String(err)));
 }finally{busy=false;button.disabled=false;pictures=[];canvas=null;ctx=null}
});
shareButton.addEventListener('click',async()=>{
 if(!fileToShare||!navigator.share)return;
 try{await navigator.share({files:[fileToShare],title:'Check Liste çözümleri',text:'Tüm sorular ve çözüm çizimleri'})}
 catch(e){if(e?.name!=='AbortError')setStatus('Paylaşım açılamadı: '+(e?.message||String(e)))}
});
})();