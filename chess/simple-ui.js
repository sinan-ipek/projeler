(()=>{"use strict";
const $=id=>document.getElementById(id),extra=$("simpleExtra");
// Keep all controls and their event handlers; relocate the shared detail panel to the right column.
const side=document.querySelector(".playArea .sideInfo");if(side)side.insertBefore(extra,side.firstChild);
const tr={tr:["Tahta","Analiz","Kaydet","Yükle","Rakip Motor Gücü","Alınan Taşlar","Yeni Oyun","Geri Al","Tahtayı Döndür","Hamleler","Kopyala","İndir","Yenile","Beyazın aldıkları","Siyahın aldıkları","Bu sayfada satranç oynarsın. Analiz hamleleri gösterir. Kaydet ve Yükle oyunları saklar ve açar."],de:["Brett","Analyse","Speichern","Laden","Gegnerstärke","Geschlagene Figuren","Neues Spiel","Zurück","Brett drehen","Züge","Kopieren","Download","Aktualisieren","Weiß schlägt","Schwarz schlägt","Hier spielst du Schach. Analyse zeigt die Züge. Speichern und Laden verwalten Partien."],en:["Board","Analysis","Save","Load","Opponent strength","Captured pieces","New game","Undo","Flip board","Moves","Copy","Download","Refresh","White captured","Black captured","Play chess here. Analysis shows moves. Save and Load store and open games."]};
let lang=localStorage.getItem("projeler_lang")||"tr";if(!tr[lang])lang="tr";
const names=["simpleBoard","simpleAnalysis","simpleSave","simpleLoad","simplePower","simpleTaken"];
const t=n=>tr[lang][n],show=html=>{extra.innerHTML=html;extra.classList.add("open");},close=()=>extra.classList.remove("open");
function sync(){names.forEach((id,i)=>$(id).textContent=t(i));$("simpleLang").value=lang;}
$("simpleLang").onchange=e=>{lang=e.target.value;localStorage.setItem("projeler_lang",lang);sync();};
$("simpleHelp").onclick=()=>alert(t(15));
$("simpleBoard").onclick=()=>{close();$("board").scrollIntoView({behavior:"smooth",block:"center"});};
$("simpleSave").onclick=()=>$("btnSaveGame").click();
$("simpleLoad").onclick=()=>{show("<div id='sGames'></div><button id='sRefresh'>"+t(12)+"</button>");const original=$("gamesList"),target=$("sGames");function update(){target.innerHTML=original.innerHTML;}update();const observer=new MutationObserver(update);observer.observe(original,{childList:true,subtree:true});target.onclick=e=>{const btn=e.target.closest("button");if(!btn)return;const all=[...target.querySelectorAll("button")],idx=all.indexOf(btn),src=original.querySelectorAll("button")[idx];src?.click();};$("sRefresh").onclick=()=>$("btnRefreshGames").click();$("btnRefreshGames").click();setTimeout(()=>observer.disconnect(),120000);};
$("simplePower").onclick=()=>{show("<label>"+t(4)+": <input id='sSkill' type='range' min='0' max='20' value='"+$("skill").value+"'> <span id='sValue'>"+$("skill").value+"</span>/20</label><p><button id='sNew'>"+t(6)+"</button> <button id='sUndo'>"+t(7)+"</button> <button id='sFlip'>"+t(8)+"</button></p>");$("sSkill").oninput=e=>{$("skill").value=e.target.value;$("skillVal").textContent=e.target.value;$("sValue").textContent=e.target.value;};$("sNew").onclick=()=>$("btnNew").click();$("sUndo").onclick=()=>$("btnUndo").click();$("sFlip").onclick=()=>$("btnFlip").click();};
$("simpleTaken").onclick=()=>show("<div>"+t(13)+": "+$("capByWhite").innerHTML+"</div><div>"+t(14)+": "+$("capByBlack").innerHTML+"</div>");
sync();
})();