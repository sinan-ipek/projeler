(()=>{"use strict";
const $=id=>document.getElementById(id),extra=$("simpleExtra");
const tr={tr:["Tahta","Analiz","Kaydet","Yükle","Rakip Motor Gücü","Alınan Taşlar","Yeni Oyun","Geri Al","Tahtayı Döndür","Hamleler","Kopyala","İndir","Yenile","Beyazın aldıkları","Siyahın aldıkları","Bu sayfada satranç oynarsın. Analiz hamleleri gösterir. Kaydet ve Yükle oyunları saklar ve açar."],de:["Brett","Analyse","Speichern","Laden","Gegnerstärke","Geschlagene Figuren","Neues Spiel","Zurück","Brett drehen","Züge","Kopieren","Download","Aktualisieren","Weiß schlägt","Schwarz schlägt","Hier spielst du Schach. Analyse zeigt die Züge. Speichern und Laden verwalten Partien."],en:["Board","Analysis","Save","Load","Opponent strength","Captured pieces","New game","Undo","Flip board","Moves","Copy","Download","Refresh","White captured","Black captured","Play chess here. Analysis shows moves. Save and Load store and open games."]};
let lang=localStorage.getItem("projeler_lang")||"tr";if(!tr[lang])lang="tr";
const names=["simpleBoard","simpleAnalysis","simpleSave","simpleLoad","simplePower","simpleTaken"];
const t=n=>tr[lang][n],show=html=>{extra.innerHTML=html;extra.classList.add("open");},close=()=>extra.classList.remove("open");
function sync(){names.forEach((id,i)=>$(id).textContent=t(i));$("simpleLang").value=lang;}
$("simpleLang").onchange=e=>{lang=e.target.value;localStorage.setItem("projeler_lang",lang);sync();};
$("simpleHelp").onclick=()=>alert(t(15));
$("simpleBoard").onclick=()=>{close();$("board").scrollIntoView({behavior:"smooth",block:"center"});};
$("simpleAnalysis").onclick=async()=>{
 const api=window.ChessReview,engine=window.ChessStockfish,moves=api?.moves()||[],positions=api?.positions()||[];
 if(!moves.length){show("<b>"+t(9)+"</b><p>"+(lang==="tr"?"Önce birkaç hamle yap.":lang==="de"?"Spiele zuerst einige Züge.":"Play some moves first.")+"</p>");return;}
 const run=String(Date.now());extra.dataset.analysisRun=run;
 const local=lang==="tr";
 show("<b>Stockfish 19 · "+t(9)+"</b><p id='reviewProgress' aria-live='polite'>Motor yükleniyor...</p><div id='reviewBoard' style='width:min(360px,100%);margin:12px 0'></div><div id='reviewResults' style='display:grid;gap:8px'></div>");
 const progress=$("reviewProgress"),results=$("reviewResults"),board=$("reviewBoard");
 function draw(fen,highlight=""){
  const rows=fen.split(" ")[0].split("/"),map={K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙",k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"};
  let html="<div style='display:grid;grid-template-columns:repeat(8,1fr);border:1px solid #aaa'>";
  rows.forEach((row,r)=>{let c=0;for(const ch of row){if(/[1-8]/.test(ch)){for(let z=0;z<Number(ch);z++){html+=square(r,c++,"",highlight);}}else{html+=square(r,c++,ch,highlight);}}});
  board.innerHTML=html+"</div>";
  function square(r,c,p,hl){const id="abcdefgh"[c]+(8-r),white=p&&p===p.toUpperCase(),dark=(r+c)%2===1;return "<div data-square='"+id+"' style='aspect-ratio:1;display:grid;place-items:center;font-size:clamp(18px,5vw,34px);background:"+(hl.includes(id)?"#f4d66d":dark?"#a7a7a7":"#eee")+";color:"+(white?"#fff":"#111")+";"+(white?"-webkit-text-stroke:1px #111;":"")+"'>"+(map[p]||"")+"</div>";}
 }
 draw(positions[0]);
 let data=[];
 try{await engine.init();}catch(e){progress.textContent="Stockfish yüklenemedi: "+e.message+". Motor dosyaları GitHub'a yüklenmiş olmalı.";return;}
 for(let i=0;i<moves.length;i++){
  if(extra.dataset.analysisRun!==run)return;
  progress.textContent=(i+1)+" / "+moves.length+" · Stockfish...";
  let before,after;
  try{before=await engine.analyze(positions[i],12);after=await engine.analyze(positions[i+1],12);}
  catch(e){progress.textContent="Analiz durdu: "+e.message;return;}
  const played=moves[i].uci,best=before.best,loss=before.cp!==null&&after.cp!==null?Math.max(0,before.cp+after.cp):null;
  const equal=best===played;
  let label=equal?(local?"En iyi hamle":lang==="de"?"Bester Zug":"Best move"):(loss===null?"—":loss<45?(local?"İyi hamle":lang==="de"?"Guter Zug":"Good move"):loss<110?(local?"Küçük hata":lang==="de"?"Ungenau":"Inaccuracy"):loss<250?(local?"Hata":lang==="de"?"Fehler":"Mistake"):(local?"Büyük hata":lang==="de"?"Grober Fehler":"Blunder"));
  const parts=positions[i].split(" ")[0].split("/"),pieceMap={};parts.forEach((row,r)=>{let c=0;for(const ch of row){if(/[1-8]/.test(ch))c+=Number(ch);else pieceMap["abcdefgh"[c++]+(8-r)]=ch;}});
  const moved=pieceMap[played.slice(0,2)]?.toLowerCase(),to=played.slice(2,4),from=played.slice(0,2);
  const pawnCapture=moved==="p"&&from[0]!==to[0];
  const capture=!!pieceMap[to]||pawnCapture;
  const hints=[];
  if(equal)hints.push(local?"Motorun ilk tercihiydi.":lang==="de"?"Das ist die erste Wahl der Engine.":"This is the engine's first choice.");
  else if(loss!==null&&loss<45)hints.push(local?"Değerlendirme farkı küçük. Bu hamle de oynanabilir.":lang==="de"?"Der Unterschied ist klein.":"The evaluation difference is small.");
  else if(loss!==null&&loss>=110)hints.push(local?"Motor bu hamleden sonra daha kötü bir konum hesaplıyor.":lang==="de"?"Die Engine bewertet die Stellung nach dem Zug schlechter.":"The engine evaluates the position worse after this move.");
  if(moved==="p"&&!capture&&["d","e"].includes(to[0])&&["4","5"].includes(to[1]))hints.push(local?"Piyon merkezde yer kazanıyor.":lang==="de"?"Der Bauer gewinnt Raum im Zentrum.":"The pawn gains space in the center.");
  if(["n","b"].includes(moved)&&["1","8"].includes(from[1]))hints.push(local?"Bir taşını oyuna geliştiriyorsun.":lang==="de"?"Du entwickelst eine Figur.":"You develop a piece.");
  if(capture)hints.push(local?"Bu hamlede bir taş alınıyor.":lang==="de"?"Dieser Zug schlägt eine Figur.":"This move captures a piece.");
  if(after.mate!==null)hints.push(local?"Motor mat tehdidi veya zorunlu mat dizisi görüyor.":lang==="de"?"Die Engine sieht eine Mattfolge.":"The engine sees a mating sequence.");
  if(!equal&&best&&best!=="(none)")hints.push((local?"Motorun önerisi: ":lang==="de"?"Vorschlag: ":"Suggestion: ")+best+".");
  const score=loss===null?"":(" · "+Math.round(loss)+" cp");
  const div=document.createElement("div");div.style.cssText="padding:10px;border:1px solid #ddd;border-radius:9px;background:#fafafa";
  const title=document.createElement("strong");title.textContent=moves[i].number+(moves[i].color==="w"?". ":"... ")+moves[i].san+" — "+label+score;div.appendChild(title);
  const desc=document.createElement("p");desc.style.margin="7px 0";desc.textContent=hints.join(" ");div.appendChild(desc);
  if(before.pv?.length){const pv=document.createElement("small");pv.textContent=(local?"Motor devamı: ":lang==="de"?"Engine-Folge: ":"Engine line: ")+before.pv.slice(0,5).join(" ");div.appendChild(pv);}
  const btn=document.createElement("button");btn.textContent=local?"Tahtada göster":lang==="de"?"Auf Brett zeigen":"Show on board";
  btn.style.cssText="display:block;margin-top:9px;padding:7px 10px";
  const pos=positions[i],next=positions[i+1],move=played;
  btn.onclick=()=>{draw(pos,move);setTimeout(()=>{draw(next,move);board.scrollIntoView({behavior:"smooth",block:"nearest"});},650);};
  div.appendChild(btn);results.appendChild(div);data.push({move:played,best,loss});
  if(i===moves.length-1)draw(positions[i+1]);
 }
 progress.textContent=local?"Stockfish analizi tamamlandı.":lang==="de"?"Stockfish-Analyse fertig.":"Stockfish analysis complete.";
};
$("simpleSave").onclick=()=>$("btnSaveGame").click();
$("simpleLoad").onclick=()=>{show("<div id='sGames'></div><button id='sRefresh'>"+t(12)+"</button>");const original=$("gamesList"),target=$("sGames");function update(){target.innerHTML=original.innerHTML;}update();const observer=new MutationObserver(update);observer.observe(original,{childList:true,subtree:true});target.onclick=e=>{const btn=e.target.closest("button");if(!btn)return;const all=[...target.querySelectorAll("button")],idx=all.indexOf(btn),src=original.querySelectorAll("button")[idx];src?.click();};$("sRefresh").onclick=()=>$("btnRefreshGames").click();$("btnRefreshGames").click();setTimeout(()=>observer.disconnect(),120000);};
$("simplePower").onclick=()=>{show("<label>"+t(4)+": <input id='sSkill' type='range' min='0' max='20' value='"+$("skill").value+"'> <span id='sValue'>"+$("skill").value+"</span>/20</label><p><button id='sNew'>"+t(6)+"</button> <button id='sUndo'>"+t(7)+"</button> <button id='sFlip'>"+t(8)+"</button></p>");$("sSkill").oninput=e=>{$("skill").value=e.target.value;$("skillVal").textContent=e.target.value;$("sValue").textContent=e.target.value;};$("sNew").onclick=()=>$("btnNew").click();$("sUndo").onclick=()=>$("btnUndo").click();$("sFlip").onclick=()=>$("btnFlip").click();};
$("simpleTaken").onclick=()=>show("<div>"+t(13)+": "+$("capByWhite").innerHTML+"</div><div>"+t(14)+": "+$("capByBlack").innerHTML+"</div>");
sync();
})();