(function(){
'use strict';
const $=id=>document.getElementById(id), pack=window.CHECKLIST_PACK;
if(!pack||!Array.isArray(pack.questions)){document.getElementById('menu').textContent='Soru verileri bulunamadı.';return}
const qs=pack.questions, checkId=pack.id||'cetin-2026', profile=new URLSearchParams(location.search).get('profile')||'default';
let current=Math.max(0,qs.findIndex(q=>'#'+q.id===decodeURIComponent(location.hash))), done={};
const key=type=>['dotem-checkliste-v2',checkId,profile,type].join(':');
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

window.loadBoard = () => {
  const frame = $('whiteboardFrame');
  if(!frame) return;
  const q = qs[current];
  // Per-question local save slot; switching a question unloads the current iframe
  // and triggers Beyaz Tahta's own beforeunload saveLocalBoard() handler.
  const boardId = [checkId, profile, q.id].join(':');
  if(frame.dataset.boardId === boardId) return;
  frame.dataset.boardId = boardId;
  frame.src = './whiteboard.html?embed=1&board=' + encodeURIComponent(boardId);
};
open(current);
})();