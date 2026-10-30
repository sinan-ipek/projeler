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
 const api=window.ChessReview,moves=api?.moves()||[];
 if(!moves.length){show("<b>"+t(9)+"</b><p>"+(lang==="tr"?"Analiz için önce birkaç hamle yap.":lang==="de"?"Spiele zuerst einige Züge.":"Play some moves first.")+"</p>");return;}
 const run=Date.now();extra.dataset.analysisRun=String(run);
 show("<b>"+t(9)+"</b><p id='reviewProgress'></p><div id='reviewResults' style='display:grid;gap:8px'></div><p style='font-size:12px;color:#777'>"+(lang==="tr"?"Tahmini analiz: yerel motor, Stockfish değil.":lang==="de"?"Ungefähre Analyse: lokale Engine, kein Stockfish.":"Approximate analysis: local engine, not Stockfish.")+"</p>");
 const progress=$("reviewProgress"),results=$("reviewResults");
 for(let i=0;i<moves.length;i++){
  if(extra.dataset.analysisRun!==String(run))return;
  progress.textContent=(i+1)+" / "+moves.length;
  await new Promise(resolve=>setTimeout(resolve,20));
  let item;try{item=api.analyze(i);}catch(e){progress.textContent=String(e);return;}
  if(!item)continue;
  const ok=item.best===item.played;
  const note=ok?(lang==="tr"?"Önerilen hamle.":lang==="de"?"Empfohlener Zug.":"Suggested move."):(lang==="tr"?"Alternatif: ":lang==="de"?"Alternative: ":"Alternative: ")+item.best;
  const div=document.createElement("div");div.style.cssText="padding:9px;border:1px solid #ddd;border-radius:8px;background:#fafafa";
  div.textContent=item.san+" · "+note+(ok?"":(" · ≈"+item.loss+" cp"));
  results.appendChild(div);
 }
 progress.textContent=lang==="tr"?"Analiz tamamlandı.":lang==="de"?"Analyse fertig.":"Analysis complete.";
};
$("simpleSave").onclick=()=>$("btnSaveGame").click();
$("simpleLoad").onclick=()=>{show("<div id='sGames'></div><button id='sRefresh'>"+t(12)+"</button>");const original=$("gamesList"),target=$("sGames");function update(){target.innerHTML=original.innerHTML;}update();const observer=new MutationObserver(update);observer.observe(original,{childList:true,subtree:true});target.onclick=e=>{const btn=e.target.closest("button");if(!btn)return;const all=[...target.querySelectorAll("button")],idx=all.indexOf(btn),src=original.querySelectorAll("button")[idx];src?.click();};$("sRefresh").onclick=()=>$("btnRefreshGames").click();$("btnRefreshGames").click();setTimeout(()=>observer.disconnect(),120000);};
$("simplePower").onclick=()=>{show("<label>"+t(4)+": <input id='sSkill' type='range' min='0' max='20' value='"+$("skill").value+"'> <span id='sValue'>"+$("skill").value+"</span>/20</label><p><button id='sNew'>"+t(6)+"</button> <button id='sUndo'>"+t(7)+"</button> <button id='sFlip'>"+t(8)+"</button></p>");$("sSkill").oninput=e=>{$("skill").value=e.target.value;$("skillVal").textContent=e.target.value;$("sValue").textContent=e.target.value;};$("sNew").onclick=()=>$("btnNew").click();$("sUndo").onclick=()=>$("btnUndo").click();$("sFlip").onclick=()=>$("btnFlip").click();};
$("simpleTaken").onclick=()=>show("<div>"+t(13)+": "+$("capByWhite").innerHTML+"</div><div>"+t(14)+": "+$("capByBlack").innerHTML+"</div>");
sync();
})();