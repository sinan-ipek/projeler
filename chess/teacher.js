/* Satranç Öğretmeni beta — bağımsız analiz modülü, GPL Stockfish dosyası chess/stockfish/stockfish.js konumunda beklenir. */
(()=>{"use strict";
const tr={tr:["Canlı analiz","Oyunu analiz et","Açıklama","Motor hazır değil. stockfish/stockfish.js dosyasını ekleyin.","Analiz sürüyor…","En iyi hamle","Hamle","Bu hamle daha iyi bir devam sağlıyor.","Bu hamleden sonra rakibin daha güçlü bir devamı var.","Motorun önerdiği devamı tahtada incele.","Çok basit","Biraz ayrıntılı","Satranç dili","Durdur"],de:["Live-Analyse","Partie analysieren","Erklärung","Engine fehlt: stockfish/stockfish.js hinzufügen.","Analyse läuft…","Bester Zug","Zug","Dieser Zug führt zu einer besseren Stellung.","Danach hat der Gegner eine stärkere Fortsetzung.","Prüfe die vorgeschlagene Zugfolge.","Sehr einfach","Etwas ausführlicher","Schachsprache","Stopp"],en:["Live analysis","Analyze game","Explanation","Engine missing: add stockfish/stockfish.js.","Analyzing…","Best move","Move","This move gives a better continuation.","The opponent has a stronger continuation after this move.","Review the suggested sequence on the board.","Very simple","More detail","Chess terms","Stop"]};
let lang="tr",worker=null,ready=false,active=false,queue=[],current=null,lastFen="",latest=null,results=[],level="a1",session=0;
const $=id=>document.getElementById(id), t=i=>tr[lang][i], safe=s=>String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const host=document.querySelector(".sideInfo")||document.querySelector(".wrap");
const panel=document.createElement("section");panel.className="coachBox";panel.id="teacherPanel";panel.innerHTML='<div class="coachHeader"><strong id="teacherTitle">Satranç Öğretmeni · Beta</strong><span id="teacherState" class="pill">—</span></div><div class="row"><button class="btn" id="teacherLive"></button><button class="btn primary" id="teacherReview"></button><button class="btn" id="teacherStop"></button></div><div class="row"><label>Seviye <select id="teacherLevel"><option value="a1">A1</option><option value="a2">A2</option><option value="b1">B1</option></select></label><label>Derinlik <input type="range" min="8" max="18" value="12" id="teacherDepth"><span id="teacherDepthText">12</span></label></div><div id="teacherOutput" class="coachFeed" style="max-height:320px"></div>';
host.appendChild(panel);
const output=$("teacherOutput"),state=$("teacherState");
function status(s){state.textContent=s;}
function refresh(){ $("teacherLive").textContent=t(0)+(active?" ✓":" ○");$("teacherReview").textContent=t(1);$("teacherStop").textContent=t(13);$("teacherDepthText").textContent=$("teacherDepth").value;}
function ensure(){
 if(worker)return true;
 try{
   worker=new Worker("stockfish/stockfish-19-lite-single.js");
   worker.onmessage=e=>onMessage(String(e.data));
   worker.onerror=()=>{ready=false;status(t(3));worker?.terminate();worker=null;};
   worker.postMessage("uci");return true;
 }catch(e){status(t(3));return false;}
}
function onMessage(line){
 if(line.includes("uciok")){worker.postMessage("isready");return;}
 if(line.includes("readyok")){ready=true;status("Stockfish ✓");runNext();return;}
 if(!current)return;
 if(line.startsWith("info ")&&line.includes(" score ")&&line.includes(" pv ")){
   const cp=line.match(/ score cp (-?\d+)/),mate=line.match(/ score mate (-?\d+)/),pv=line.match(/ pv (.+)$/);
   if(pv)current.info={cp:cp?Number(cp[1]):null,mate:mate?Number(mate[1]):null,pv:pv[1].trim().split(" ").slice(0,6)};
 }
 if(line.startsWith("bestmove ")){
   const done=current;current=null;
   if(done.id!==session){runNext();return;}
   const info=done.info||{},best=line.split(" ")[1];
   const score=info.mate!==null&&info.mate!==undefined?"M"+info.mate:info.cp===null?"?":(info.cp/100).toFixed(2);
   results[done.index]={best,score,info,fen:done.fen};
   if(done.kind==="live")showLive(done,best,score,info);
   else showReport();
   runNext();
 }
}
function runNext(){
 if(!ready||current||!queue.length)return;
 current=queue.shift();current.info=null;
 worker.postMessage("position fen "+current.fen);
 worker.postMessage("go depth "+$("teacherDepth").value);
}
function enqueue(items){session++;queue=items.map(x=>({...x,id:session}));current=null;if(worker){worker.terminate();worker=null;ready=false;}if(!ensure())return;status(t(4));runNext();}
function explain(info,played){
 const pv=info.pv||[];
 const intro=played?t(8):t(7);
 if(level==="a1")return intro+" "+t(9);
 if(level==="a2")return intro+" "+t(9)+(pv.length?" "+pv.slice(0,3).join(" → "):"");
 return intro+" PV: "+pv.join(" → ")+".";
}
function showLive(done,best,score,info){
 output.innerHTML='<div class="coachItem"><span class="pill">'+safe(done.label)+'</span><div class="coachLine">'+safe(t(5))+': <b>'+safe(best)+'</b> · '+safe(score)+'</div><div class="coachLine">'+safe(explain(info,false))+'</div></div>';
 status("Stockfish ✓");
}
function showReport(){
 const snap=window.ChessTeacherBridge?.snapshot();if(!snap)return;
 output.innerHTML=results.map((r,i)=>{
  if(!r||i>=snap.moves.length)return "";
  const move=snap.moves[i],match=r.best===move.uci;
  return '<div class="coachItem"><span class="pill">'+safe((Math.floor(i/2)+1)+(i%2?"...":".")+" "+move.san)+'</span><span class="tag '+(match?"good":"warn")+'">'+(match?"✓":"?")+'</span><div class="coachLine">'+safe(t(5))+': <b>'+safe(r.best)+'</b> · '+safe(r.score)+'</div><div class="coachLine">'+safe(explain(r.info,!match))+'</div></div>';
 }).join("")||'<div class="hint">'+safe(t(4))+'</div>';
 status(results.filter(Boolean).length+"/"+snap.moves.length);
}
function live(){if(!active)return;const snap=window.ChessTeacherBridge?.snapshot();if(!snap||snap.fen===lastFen)return;lastFen=snap.fen;enqueue([{fen:snap.fen,index:0,kind:"live",label:t(0)}]);}
$("teacherLive").onclick=()=>{active=!active;lastFen="";refresh();live();};
$("teacherReview").onclick=()=>{const snap=window.ChessTeacherBridge?.snapshot();if(!snap||!snap.moves.length){status("—");return;}active=false;refresh();results=[];enqueue(snap.positions.slice(0,-1).map((fen,index)=>({fen,index,kind:"report",label:snap.moves[index].san})));};
$("teacherStop").onclick=()=>{session++;queue=[];current=null;active=false;worker?.postMessage("stop");refresh();status(t(13));};
$("teacherDepth").oninput=refresh;
$("teacherLevel").onchange=e=>{level=e.target.value;if(results.length)showReport();};
$("teacherHelp")?.addEventListener("click",()=>alert(lang==="tr"?"Motor hamleleri inceler. İyi hamleyi gösterir.":"The engine checks moves and shows better ones."));
$("teacherLang")?.addEventListener("click",()=>{lang=lang==="tr"?"de":lang==="de"?"en":"tr";$("teacherLang").textContent={tr:"Türkçe",de:"Deutsch",en:"English"}[lang]+" ▾";refresh();});
setInterval(live,1000);refresh();status(t(3));
})();