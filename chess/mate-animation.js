(()=>{"use strict";
const board=document.getElementById("board"),status=document.getElementById("statusBox");
if(!board||!status)return;
const wrap=board.closest(".boardWrap");if(!wrap)return;
let shown=false,overlay=null,marked=null;
function clear(){shown=false;if(overlay){overlay.remove();overlay=null;}if(marked){marked.classList.remove("chess-mated-square");marked=null;}}
function lang(){return document.getElementById("simpleLang")?.value||"tr";}
function check(){
 const text=status.textContent||"";
 const mate=/ŞAH MAT|CHECKMATE|SCHACHMATT/i.test(text);
 if(!mate){if(shown)clear();return;}
 if(shown)return;
 shown=true;
 // Wait until the final moving-piece animation has finished.
 setTimeout(()=>{
  if(!shown||!/ŞAH MAT|CHECKMATE|SCHACHMATT/i.test(status.textContent||""))return;
  const winnerWhite=/Beyaz kazandı|White won|Weiß gewinnt/i.test(text);
  const loser=winnerWhite?"b":"w";
  // Identify the mated king by its accessible SVG artwork image.
  const squares=[...board.querySelectorAll(".sq")];
  marked=squares.find(sq=>{const img=sq.querySelector(".piece."+loser+" img");return img&&/\/([wb])K\.svg(?:$|\?)/i.test(img.getAttribute("src")||"");})||null;
  if(!marked){const pieces=[...board.querySelectorAll(".sq .piece."+loser)];const king=pieces.find(p=>p.querySelector("svg")&&p.parentElement?.dataset.sq);if(king)marked=king.closest(".sq");}
  marked?.classList.add("chess-mated-square");
  overlay=document.createElement("div");overlay.className="chess-mate-overlay";overlay.setAttribute("aria-live","polite");
  const title=document.createElement("div");title.className="chess-mate-title";
  const t=lang();const name=t==="de"?"SCHACHMATT":t==="en"?"CHECKMATE":"ŞAH MAT!";
  const winner=t==="de"?(winnerWhite?"Weiß gewinnt":"Schwarz gewinnt"):t==="en"?(winnerWhite?"White wins":"Black wins"):(winnerWhite?"Beyaz kazandı":"Siyah kazandı");
  title.append(document.createTextNode(name));const sub=document.createElement("small");sub.textContent=winner;title.append(sub);overlay.append(title);wrap.append(overlay);
  // Leave the board fully visible after the announcement.
  setTimeout(()=>{if(overlay){overlay.style.transition="opacity 1.2s ease";overlay.style.opacity="0";setTimeout(()=>{overlay?.remove();overlay=null;},1250);}},3400);
 },900);
}
new MutationObserver(check).observe(status,{childList:true,characterData:true,subtree:true});
new MutationObserver(()=>{if(shown&&!/ŞAH MAT|CHECKMATE|SCHACHMATT/i.test(status.textContent||""))clear();}).observe(board,{childList:true,subtree:true});
check();
})();