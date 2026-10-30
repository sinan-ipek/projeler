(()=>{"use strict";
const api=window.ChessReview,engine=window.ChessStockfish;
const extra=document.getElementById("simpleExtra"),movesEl=document.getElementById("moves");
if(!api||!engine||!extra||!movesEl)return;
let serial=0,busy=false,latestKey="",lastShown="",active=true;
const L=()=>document.getElementById("simpleLang")?.value||"tr";
const labels={
tr:{title:"Anlık Stockfish analizi",wait:"Hamle bekleniyor.",thinking:"Son hamle inceleniyor...",good:"En iyi hamle",fine:"İyi hamle",inacc:"Küçük hata",mistake:"Hata",blunder:"Büyük hata",played:"Yaptığın hamle",best:"Daha iyi hamle",why:"Ne değişti?",actual:"Bu hamleden sonraki olası devam",better:"Önerilen hamleden sonraki olası devam",showActual:"Yaptığım hamleyi göster",showBest:"Daha iyi hamleyi göster",error:"Motor hatası",none:"Motor bu konumda alternatif bulamadı.",note:"Devamlar motor tahminidir; rakibin kesin oynayacağı hamleler değildir."},
de:{title:"Aktuelle Stockfish-Analyse",wait:"Warte auf einen Zug.",thinking:"Letzter Zug wird analysiert...",good:"Bester Zug",fine:"Guter Zug",inacc:"Ungenauigkeit",mistake:"Fehler",blunder:"Grober Fehler",played:"Dein Zug",best:"Besserer Zug",why:"Was hat sich geändert?",actual:"Mögliche Folge nach deinem Zug",better:"Mögliche Folge nach dem besseren Zug",showActual:"Deinen Zug zeigen",showBest:"Besseren Zug zeigen",error:"Engine-Fehler",none:"Keine Alternative gefunden.",note:"Die Varianten sind Prognosen, keine sicheren gegnerischen Züge."},
en:{title:"Live Stockfish analysis",wait:"Waiting for a move.",thinking:"Analyzing latest move...",good:"Best move",fine:"Good move",inacc:"Inaccuracy",mistake:"Mistake",blunder:"Blunder",played:"Your move",best:"Better move",why:"What changed?",actual:"Likely continuation after your move",better:"Likely continuation after better move",showActual:"Show played move",showBest:"Show better move",error:"Engine error",none:"No alternative found.",note:"Lines are engine predictions, not guaranteed opponent moves."}};
const T=()=>labels[L()]||labels.tr;
function showPanel(){
 extra.classList.add("open");
 extra.innerHTML="<div style='font-weight:700;font-size:16px;margin-bottom:8px' id='liveTitle'></div><div id='liveStatus' style='font-size:13px;color:#666;margin-bottom:10px'></div><div id='reviewBoard' style='width:min(300px,100%);margin:8px auto'></div><div id='liveDetail' style='font-size:13px;line-height:1.5'></div>";
 document.getElementById("liveTitle").textContent=T().title;
}
function draw(fen,highlight=""){
 const el=document.getElementById("reviewBoard");if(!el||!fen)return;
 const map={K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙",k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"};
 let out="<div style='display:grid;grid-template-columns:repeat(8,1fr);border:1px solid #bbb'>";
 fen.split(" ")[0].split("/").forEach((row,r)=>{let c=0;for(const ch of row){const n=Number(ch);if(n){for(let j=0;j<n;j++)sq("",r,c++);}else sq(ch,r,c++);}});
 function sq(p,r,c){const id="abcdefgh"[c]+(8-r),light=(r+c)%2===0,white=p&&p===p.toUpperCase();out+="<div style='aspect-ratio:1;display:grid;place-items:center;font-size:clamp(16px,2.1vw,28px);background:"+(highlight.includes(id)?"#d7d7d7":light?"#f5f5f5":"#c5c5c5")+";color:"+(white?"#fff":"#161616")+";"+(white?"-webkit-text-stroke:1px #222;":"")+"'>"+(map[p]||"")+"</div>";}
 el.innerHTML=out+"</div>";
}
function el(tag,text){const e=document.createElement(tag);e.textContent=text;return e;}
function uciText(uci){return uci?uci.slice(0,2)+" → "+uci.slice(2,4)+(uci.length>4?" ="+uci[4].toUpperCase():""):"—";}
function lineText(pv){return pv?.length?pv.slice(0,6).map(uciText).join("  ·  "):"—";}
function playLine(fen,line){
 const steps=[fen];for(const m of line){const next=api.nextFen(steps[steps.length-1],m);if(!next)break;steps.push(next);}
 let n=0;draw(steps[0],line[0]||"");const run=++playLine.id;
 const step=()=>{if(run!==playLine.id||n>=steps.length-1)return;n++;draw(steps[n],line[n-1]);if(n<steps.length-1)setTimeout(step,750);};setTimeout(step,600);
}
playLine.id=0;
function makeRow(parent,label,value){const p=el("p",label+": "+value);p.style.margin="5px 0";parent.appendChild(p);}
async function analyzeLatest(){
 if(busy)return;
 const moves=api.moves(),positions=api.positions(),i=moves.length-1;
 const key=moves.map(m=>m.uci).join(",");
 if(key===lastShown)return;
 if(i<0){latestKey="";lastShown="";showPanel();document.getElementById("liveStatus").textContent=T().wait;draw(positions[0]);return;}
 busy=true;latestKey=key;const ticket=serial;
 showPanel();const status=document.getElementById("liveStatus");status.textContent=T().thinking;draw(positions[i+1],moves[i].uci);
 try{
  await engine.init();
  const before=await engine.analyze(positions[i],12);
  const after=await engine.analyze(positions[i+1],12);
  if(ticket!==serial)return;
  const currentKey=api.moves().map(m=>m.uci).join(",");
  if(currentKey!==key)return;
  const loss=before.cp!==null&&after.cp!==null?Math.max(0,before.cp+after.cp):null;
  const equal=before.best===moves[i].uci;
  const cls=equal?T().good:loss===null?"—":loss<45?T().fine:loss<110?T().inacc:loss<250?T().mistake:T().blunder;
  status.textContent=moves[i].number+(moves[i].color==="w"?". ":"... ")+moves[i].san+" — "+cls+(loss!==null?" (≈"+Math.round(loss)+" cp)":"");
  const detail=document.getElementById("liveDetail");detail.innerHTML="";
  makeRow(detail,T().played,uciText(moves[i].uci));
  makeRow(detail,T().best,before.best?uciText(before.best):T().none);
  const explanation=el("p",equal?(L()==="tr"?"Bu hamle motorun ilk tercihidir.":L()==="de"?"Dieser Zug ist die erste Wahl der Engine.":"This is the engine's first choice."):(loss!==null&&loss<45?(L()==="tr"?"Aradaki fark küçük; hamlen oynanabilir.":L()==="de"?"Der Unterschied ist gering.":"The difference is small."):(L()==="tr"?"Motor, önerilen hamleden sonra daha iyi bir konum hesaplıyor. Aşağıdaki devamları karşılaştır.":L()==="de"?"Die Engine sieht eine bessere Stellung nach der Alternative. Vergleiche die Folgen.":"The engine sees a better position after the alternative. Compare the continuations.")));
  detail.appendChild(el("strong",T().why));detail.appendChild(explanation);
  makeRow(detail,T().actual,lineText(after.pv));
  makeRow(detail,T().better,lineText(before.pv));
  const b1=el("button",T().showActual),b2=el("button",T().showBest);
  for(const b of [b1,b2])b.style.cssText="margin:6px 6px 6px 0;padding:7px 9px;background:#eee;border:1px solid #bbb;border-radius:7px;cursor:pointer";
  b1.onclick=()=>playLine(positions[i],[moves[i].uci,...(after.pv||[])]);
  b2.onclick=()=>playLine(positions[i],before.pv||[]);
  detail.append(b1,b2,el("small",T().note));lastShown=key;
 }catch(e){if(ticket===serial){document.getElementById("liveStatus").textContent=T().error+": "+e.message;lastShown=key;}}
 finally{busy=false;if(api.moves().map(m=>m.uci).join(",")!==key)setTimeout(analyzeLatest,50);}
}
document.getElementById("simpleAnalysis").addEventListener("click",()=>{active=true;serial++;lastShown="";setTimeout(analyzeLatest,0);});
const observer=new MutationObserver(()=>{if(!active)return;const key=api.moves().map(m=>m.uci).join(",");if(key!==latestKey){serial++;if(!busy)setTimeout(analyzeLatest,0);}});
observer.observe(movesEl,{childList:true,characterData:true,subtree:true});
document.getElementById("simpleBoard").addEventListener("click",()=>{active=false;serial++;});
for(const id of ["simpleSave","simpleLoad","simplePower","simpleTaken"])document.getElementById(id)?.addEventListener("click",()=>{active=false;serial++;});
active=true;analyzeLatest();
})();