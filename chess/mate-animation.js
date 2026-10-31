(()=>{"use strict";
const board=document.getElementById("board"),status=document.getElementById("statusBox");
if(!board||!status)return;
// Map dark strokes to deep red and light fills to pale red, preserving the piece drawing.
const ns="http://www.w3.org/2000/svg";const defsSvg=document.createElementNS(ns,"svg");defsSvg.setAttribute("width","0");defsSvg.setAttribute("height","0");defsSvg.setAttribute("aria-hidden","true");defsSvg.style.cssText="position:absolute;width:0;height:0;overflow:hidden";defsSvg.innerHTML='<defs><filter id="chessKingRedFilter" color-interpolation-filters="sRGB"><feColorMatrix type="matrix" values="0.72 0 0 0 0.24  0 0.91 0 0 0.025  0 0 0.91 0 0.025  0 0 0 1 0"/></filter></defs>';document.body.appendChild(defsSvg);
let active=false,kingSquare=null,bubble=null,run=0,originalImage=null;
function clear(){run++;if(originalImage){originalImage.img.src=originalImage.src;originalImage=null;}active=false;kingSquare?.classList.remove("chess-mated-square");kingSquare=null;bubble?.remove();bubble=null;}
function isMate(){return /ŞAH MAT|CHECKMATE|SCHACHMATT/i.test(status.textContent||"");}
function findKing(side){
 return [...board.querySelectorAll(".sq")].find(sq=>{
  const piece=sq.querySelector(".piece."+side);if(!piece)return false;
  const img=piece.querySelector("img");if(img&&/[\\/]([wb])K\.svg(?:[?#]|$)/i.test(img.getAttribute("src")||""))return true;
  return piece.textContent?.trim()===(side==="w"?"♔":"♚");
 })||null;
}
function placeBubble(){
 if(!kingSquare||!bubble)return;
 const a=kingSquare.getBoundingClientRect(),b=board.getBoundingClientRect();
 const x=a.left-b.left+a.width/2,y=a.top-b.top;
 bubble.style.left=Math.max(35,Math.min(b.width-35,x))+"px";
 bubble.style.top=Math.max(4,y-9)+"px";
}
function check(){
 if(!isMate()){if(active)clear();return;}
 if(active)return;
 active=true;const ticket=++run;
 // Allow the final move animation to settle before the king falls.
 setTimeout(()=>{
  if(ticket!==run||!isMate())return;
  const winnerWhite=/Beyaz kazandı|White won|Weiß gewinnt/i.test(status.textContent||"");
  kingSquare=findKing(winnerWhite?"b":"w");
  if(!kingSquare)return;
  // Use the light-filled king artwork while fallen: dark outlines become red, interiors stay pale.\n  const img=kingSquare.querySelector(".piece img");\n  if(img&&/bK\\.svg/i.test(img.getAttribute("src")||"")){const src=img.getAttribute("src");originalImage={img,src};img.src=src.replace(/bK\\.svg/i,"wK.svg");}\n  kingSquare.classList.add("chess-mated-square");
  bubble=document.createElement("div");bubble.className="chess-mate-bubble";bubble.textContent="Mat!";
  bubble.setAttribute("role","status");bubble.setAttribute("aria-label","Mat!");
  board.appendChild(bubble);placeBubble();
 },950);
}
new MutationObserver(check).observe(status,{childList:true,characterData:true,subtree:true});
new MutationObserver(()=>{if(active&&!isMate())clear();}).observe(board,{childList:true,subtree:true});
window.addEventListener("resize",placeBubble);
check();
})();