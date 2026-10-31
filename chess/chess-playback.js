(()=>{"use strict";
const board=document.getElementById("board"),api=window.ChessReview,moves=document.getElementById("moves");
if(!board||!api||!moves)return;
const wrap=board.closest(".boardWrap"),column=board.closest(".boardColumn")||wrap.parentElement;
if(!wrap||!column)return;
const tr={
tr:{start:"İlk konum",back:"Önceki hamle",play:"Oynat",pause:"Duraklat",next:"Sonraki hamle",end:"Son konum",live:"Canlıya Dön",moves:"hamle"},
de:{start:"Anfang",back:"Zurück",play:"Abspielen",pause:"Pause",next:"Weiter",end:"Ende",live:"Live",moves:"Züge"},
en:{start:"First position",back:"Previous move",play:"Play",pause:"Pause",next:"Next move",end:"Last position",live:"Go Live",moves:"moves"}};
const lang=()=>tr[document.getElementById("simpleLang")?.value]||tr.tr;
const controls=document.getElementById("chessPlaybackControls")||document.createElement("div");controls.className="chess-playback-controls";
controls.innerHTML='<button type="button" data-act="first" aria-label="İlk konum" title="İlk konum">⏮</button><button type="button" data-act="prev" aria-label="Önceki hamle" title="Önceki hamle">◀</button><button type="button" data-act="play" aria-label="Oynat" title="Oynat">▶</button><button type="button" data-act="next" aria-label="Sonraki hamle" title="Sonraki hamle">▶|</button><button type="button" data-act="last" aria-label="Son konum" title="Son konum">⏭</button><span class="playback-count" aria-live="polite"></span><button type="button" class="playback-live" data-act="live">Canlıya Dön</button>';
if(!controls.isConnected)wrap.insertAdjacentElement("afterend",controls);
const buttons=Object.fromEntries([...controls.querySelectorAll("button")].map(b=>[b.dataset.act,b]));
const count=controls.querySelector(".playback-count");
let index=-1,layer=null,timer=null,known="",isPlaying=false;
const positions=()=>api.positions();
function stop(){isPlaying=false;if(timer!==null){clearInterval(timer);timer=null;}}
function removeLayer(){layer?.remove();layer=null;}
function currentOrientation(){const first=board.querySelector(".sq");return first?.dataset.sq==="a8"?"w":"b";}
function renderPosition(fen){
 if(!layer){layer=document.createElement("div");layer.className="chess-playback-layer";board.appendChild(layer);}
 const pieces={},rows=fen.split(" ")[0].split("/");
 rows.forEach((row,r)=>{let c=0;for(const ch of row){if(/[1-8]/.test(ch))c+=Number(ch);else pieces["abcdefgh"[c++]+(8-r)]=ch;}});
 const whiteBottom=currentOrientation()==="w";let html="";
 for(let r=0;r<8;r++)for(let c=0;c<8;c++){
  const f=whiteBottom?c:7-c,rank=whiteBottom?7-r:r,id="abcdefgh"[f]+(rank+1);
  const light=(f+rank)%2===1,p=pieces[id];
    const pieceHTML=p&&window.ChessPieceSVG?'<span class="piece '+(p===p.toUpperCase()?"w":"b")+'">'+window.ChessPieceSVG(p)+'</span>':"";
  html+='<div class="playback-square" style="background:'+(light?"var(--sq-light,#eee)":"var(--sq-dark,#aaa)")+'">'+pieceHTML+"</div>";
 }
 layer.innerHTML=html;
}
function refresh(){
 const all=positions(),last=all.length-1;
 if(index>last)index=last;
 if(index<0){removeLayer();index=-1;}else renderPosition(all[index]);
 const live=index<0;
 count.textContent=(live?last:index)+" / "+last;
 buttons.first.disabled=last===0||index===0;
 buttons.prev.disabled=last===0||index===0;
 buttons.next.disabled=last===0||(index>=last);
 buttons.last.disabled=last===0||(index>=last);
 buttons.live.disabled=true;
 buttons.live.hidden=true;
 buttons.play.disabled=last===0;
 buttons.play.textContent=isPlaying?"⏸":"▶";
 const names=lang();
 for(const [act,key] of [["first","start"],["prev","back"],["next","next"],["last","end"],["live","live"]]){buttons[act].title=names[key];buttons[act].setAttribute("aria-label",names[key]);}
 buttons.play.title=isPlaying?names.pause:names.play;
 buttons.play.setAttribute("aria-label",buttons.play.title);
 buttons.live.textContent=names.live;
}
function seek(n){const last=positions().length-1;if(n>=last){goLive();return;}index=Math.max(0,n);refresh();}
function goLive(){stop();index=-1;refresh();}
function tick(){const last=positions().length-1;if(index>=last-1){goLive();return;}seek(index+1);}
controls.addEventListener("click",e=>{
 const act=e.target.closest("button")?.dataset.act;if(!act)return;
 if(act==="live"){goLive();return;}
 if(act==="play"){
  if(isPlaying){stop();refresh();return;}
  const last=positions().length-1;if(last===0)return;
  if(index<0||index>=last){index=0;refresh();}
  isPlaying=true;timer=setInterval(tick,900);refresh();return;
 }
 stop();const last=positions().length-1;
 if(act==="first")seek(0);
 if(act==="prev")seek((index<0?last:index)-1);
 if(act==="next")seek((index<0?last:index)+1);
 if(act==="last")goLive();
});
let pending=false;
const observer=new MutationObserver(()=>{if(pending)return;pending=true;queueMicrotask(()=>{pending=false;const key=api.moves().map(m=>m.uci).join(",");if(key!==known){known=key;const last=positions().length-1;if(index>last)index=last;refresh();}});});
observer.observe(moves,{childList:true,subtree:true,characterData:true});
document.getElementById("btnFlip")?.addEventListener("click",()=>setTimeout(refresh,30));
document.getElementById("simpleLang")?.addEventListener("change",refresh);
window.addEventListener("keydown",e=>{if(e.target instanceof HTMLElement&&/INPUT|TEXTAREA|SELECT/.test(e.target.tagName))return;if(e.key==="ArrowLeft"){stop();seek((index<0?positions().length-1:index)-1);}if(e.key==="ArrowRight"){stop();seek((index<0?positions().length-1:index)+1);}});
known=api.moves().map(m=>m.uci).join(",");refresh();
})();