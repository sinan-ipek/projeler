/* Satranç Öğretmeni v1.1-beta — yerel analiz ve somut taktik kontrolü.
   Stockfish dosyaları eklenene kadar mevcut satranç motoru kullanılır.
   Değerlendirme tahminidir; yalnızca doğrulanan olaylar kesin dille anlatılır. */
(()=>{"use strict";
const $=id=>document.getElementById(id);
const tr={
 tr:{title:"Satranç Öğretmeni",analyze:"Oyunu incele",live:"Canlı inceleme",stop:"Durdur",empty:"Önce bir hamle yap.",working:"Hamleler inceleniyor…",done:"İnceleme tamamlandı",best:"Önerilen hamle",good:"Önerilen hamleyi oynadın.",other:"Motor başka bir hamle öneriyor.",uncertain:"Bu farkın kesin nedenini bu analizle belirleyemiyorum.",take:"Rakibin şimdi şu taşı alabilir:",check:"Bu hamle şah çekiyor.",capture:"Bu hamlede bir taş alındı.",promotion:"Piyon son sıraya ulaştı.",level:"Açıklama",local:"Yerel motor (Stockfish henüz eklenmedi)",step:"Tahtada göster",close:"Oyuna dön",help:"Hamlelerini inceler. Hataları ve daha iyi hamleleri gösterir."},
 de:{title:"Schachlehrer",analyze:"Partie prüfen",live:"Live prüfen",stop:"Stopp",empty:"Spiele zuerst einen Zug.",working:"Züge werden geprüft…",done:"Fertig",best:"Vorgeschlagener Zug",good:"Du hast den vorgeschlagenen Zug gespielt.",other:"Der Motor empfiehlt einen anderen Zug.",uncertain:"Der genaue Grund ist nicht sicher.",take:"Der Gegner kann diese Figur schlagen:",check:"Dieser Zug gibt Schach.",capture:"Eine Figur wurde geschlagen.",promotion:"Der Bauer erreicht die letzte Reihe.",level:"Erklärung",local:"Lokale Engine (Stockfish noch nicht installiert)",step:"Auf dem Brett zeigen",close:"Zurück zum Spiel",help:"Prüft deine Züge und zeigt bessere Züge."},
 en:{title:"Chess Teacher",analyze:"Review game",live:"Live review",stop:"Stop",empty:"Play a move first.",working:"Reviewing moves…",done:"Review complete",best:"Suggested move",good:"You played the suggested move.",other:"The engine suggests another move.",uncertain:"The exact reason is not clear.",take:"The opponent can capture this piece:",check:"This move gives check.",capture:"A piece was captured.",promotion:"A pawn reached the last rank.",level:"Explanation",local:"Local engine (Stockfish not installed yet)",step:"Show on board",close:"Return to game",help:"Checks moves and shows better choices."}};
let lang="tr",running=false,live=false,last="",results=[],original=null,reviewIndex=-1,interval=null;
const T=k=>tr[lang][k],escape=s=>String(s??"").replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const panel=$("teacherPanel");if(!panel)return;
panel.innerHTML='<div class="coachHeader"><strong id="teacherHeading"></strong><span id="teacherStatus" class="pill"></span></div><div class="row"><button class="btn primary" id="teacherReview"></button><button class="btn" id="teacherLive"></button><button class="btn" id="teacherStop"></button></div><div class="row"><label><span id="teacherLevelLabel"></span> <select id="teacherLevel"><option value="a1">A1</option><option value="a2">A2</option><option value="b1">B1</option></select></label></div><div id="teacherOutput" class="coachFeed" style="max-height:360px"></div><div id="teacherPreview" style="display:none"><div class="row"><button class="btn" id="teacherBack"></button><button class="btn" id="teacherPrev">◀</button><button class="btn" id="teacherNext">▶</button></div><div id="teacherMiniBoard" style="display:grid;grid-template-columns:repeat(8,1fr);aspect-ratio:1;max-width:400px;margin:0 auto"></div></div>';
const out=$("teacherOutput"),state=$("teacherStatus");
function labels(){ $("teacherHeading").textContent=T("title");$("teacherReview").textContent=T("analyze");$("teacherLive").textContent=T("live")+(live?" ✓":"");$("teacherStop").textContent=T("stop");$("teacherBack").textContent=T("close");$("teacherLevelLabel").textContent=T("level");}
function fenBoard(fen){const board={};const rows=fen.split(" ")[0].split("/");rows.forEach((row,i)=>{let f=0;for(const ch of row){if(/[1-8]/.test(ch))f+=Number(ch);else board["abcdefgh"[f++]+(8-i)]=ch;}});return board;}
const names={tr:{p:"piyon",n:"at",b:"fil",r:"kale",q:"vezir",k:"şah"},de:{p:"Bauer",n:"Springer",b:"Läufer",r:"Turm",q:"Dame",k:"König"},en:{p:"pawn",n:"knight",b:"bishop",r:"rook",q:"queen",k:"king"}};
const glyph={P:"♙",N:"♘",B:"♗",R:"♖",Q:"♕",K:"♔",p:"♟",n:"♞",b:"♝",r:"♜",q:"♛",k:"♚"};
function captureCandidates(fen,fromSide){
 const b=fenBoard(fen),a=[];
 const files="abcdefgh";
 for(const [sq,p] of Object.entries(b)){
  const side=p===p.toUpperCase()?"w":"b";if(side!==fromSide)continue;
  const f=files.indexOf(sq[0]),r=Number(sq[1]),type=p.toLowerCase();
  const attacks=[];
  const add=(df,dr)=>{let nf=f+df,nr=r+dr;if(nf>=0&&nf<8&&nr>=1&&nr<=8)attacks.push(files[nf]+nr);};
  if(type==="p"){add(-1,side==="w"?1:-1);add(1,side==="w"?1:-1);}
  if(type==="n")for(const [df,dr] of [[1,2],[2,1],[-1,2],[-2,1],[1,-2],[2,-1],[-1,-2],[-2,-1]])add(df,dr);
  if(type==="k")for(let df=-1;df<=1;df++)for(let dr=-1;dr<=1;dr++)if(df||dr)add(df,dr);
  if("brq".includes(type)){
   const dirs=[...(type!=="r"?[[1,1],[1,-1],[-1,1],[-1,-1]]:[]),...(type!=="b"?[[1,0],[-1,0],[0,1],[0,-1]]:[])];
   for(const [df,dr] of dirs){let nf=f+df,nr=r+dr;while(nf>=0&&nf<8&&nr>=1&&nr<=8){const dest=files[nf]+nr;attacks.push(dest);if(b[dest])break;nf+=df;nr+=dr;}}
  }
  for(const dest of attacks){const victim=b[dest];if(victim&&(victim===victim.toUpperCase())!==(p===p.toUpperCase()))a.push({from:sq,to:dest,piece:victim});}
 }
 return a;
}
function explain(row){
 const m=row.move, before=fenBoard(row.before),after=fenBoard(row.after),played=m.uci;
 const moved=before[played.slice(0,2)],taken=before[played.slice(2,4)];
 const enemy=m.color==="w"?"b":"w";
 const attacks=captureCandidates(row.after,enemy);
 const movedTarget=played.slice(2,4);
 const direct=attacks.find(a=>a.to===movedTarget&&after[movedTarget]&&after[movedTarget].toLowerCase()!=="k");
 const lost=attacks.filter(a=>after[a.to]&&after[a.to].toLowerCase()!=="k").sort((a,b)=>"pnbrq".indexOf(b.piece.toLowerCase())-"pnbrq".indexOf(a.piece.toLowerCase()))[0];
 const simple=[];
 if(taken)simple.push(T("capture"));
 if(m.san.includes("+"))simple.push(T("check"));
 if(played.length===5)simple.push(T("promotion"));
 if(direct&&moved)simple.push(T("take")+" "+names[lang][moved.toLowerCase()]+" ("+movedTarget+").");
 else if(lost&&$("teacherLevel").value!=="a1")simple.push(T("take")+" "+names[lang][lost.piece.toLowerCase()]+" ("+lost.to+").");
 if(row.best===played)simple.unshift(T("good"));
 else simple.unshift(T("other"));
 if(!taken&&!direct&&!m.san.includes("+")&&row.best!==played)simple.push(T("uncertain"));
 if($("teacherLevel").value==="b1")simple.push(T("best")+": "+row.best+".");
 return simple.join(" ");
}
function draw(fen,highlight=[]){
 const b=fenBoard(fen),el=$("teacherMiniBoard"),turn=window.ChessTeacherBridge?.snapshot()?.orientation||"w";el.innerHTML="";
 const files=turn==="w"?"abcdefgh":"hgfedcba",ranks=turn==="w"?"87654321":"12345678";
 for(const r of ranks)for(const f of files){const sq=f+r,p=b[sq],div=document.createElement("div");div.style.cssText="aspect-ratio:1;display:flex;align-items:center;justify-content:center;font-size:clamp(20px,4vw,37px);color:#111;background:"+ (highlight.includes(sq)?"#eac75c":((files.indexOf(f)+ranks.indexOf(r))%2?"#898989":"#dedede"));div.textContent=glyph[p]||"";el.appendChild(div);}
}
function showPosition(i){const row=results[i];if(!row)return;reviewIndex=i;$("teacherPreview").style.display="block";draw(row.after,[row.move.uci.slice(0,2),row.move.uci.slice(2,4)]);state.textContent=(i+1)+"/"+results.length;}
function render(){out.innerHTML=results.map((row,i)=>'<div class="coachItem"><span class="pill">'+escape(Math.floor(i/2)+1+(i%2?"...":".")+" "+row.move.san)+'</span> <span class="tag '+(row.best===row.move.uci?"good":"warn")+'">'+(row.best===row.move.uci?"✓":"?")+'</span><div class="coachLine">'+escape(explain(row))+'</div><div class="coachMeta">'+escape(T("best")+": "+(row.best||"—"))+'</div><button class="btn small" data-show="'+i+'">'+escape(T("step"))+'</button></div>').join("");out.querySelectorAll("[data-show]").forEach(b=>b.onclick=()=>showPosition(Number(b.dataset.show)));}
async function review(){
 const snap=window.ChessTeacherBridge?.snapshot();if(!snap?.moves?.length){state.textContent=T("empty");return;}
 running=true;results=[];original=snap;state.textContent=T("working");
 for(let i=0;i<snap.moves.length;i++){
  if(!running)break;
  const before=snap.positions[i],after=snap.positions[i+1],move=snap.moves[i];
  let analysis;try{analysis=window.ChessTeacherBridge.analyze(before,120);}catch(e){state.textContent=String(e);break;}
  results.push({before,after,move:{...move,color:before.split(" ")[1]},best:analysis.best});
  render();state.textContent=(i+1)+"/"+snap.moves.length;
  await new Promise(resolve=>setTimeout(resolve,20));
 }
 if(running)state.textContent=T("done");running=false;
}
$("teacherReview").onclick=()=>{running=false;live=false;labels();setTimeout(review,0);};
$("teacherLive").onclick=()=>{live=!live;labels();if(live){last="";tick();}};
$("teacherStop").onclick=()=>{running=false;live=false;labels();state.textContent=T("stop");};
$("teacherLevel").onchange=render;
$("teacherBack").onclick=()=>{$("teacherPreview").style.display="none";reviewIndex=-1;};
$("teacherPrev").onclick=()=>showPosition(Math.max(0,reviewIndex-1));
$("teacherNext").onclick=()=>showPosition(Math.min(results.length-1,reviewIndex+1));
function tick(){if(!live||running)return;const snap=window.ChessTeacherBridge?.snapshot();if(!snap||snap.fen===last||!snap.moves.length)return;last=snap.fen;review();}
interval=setInterval(tick,1500);
$("teacherLang")?.addEventListener("click",()=>{lang=lang==="tr"?"de":lang==="de"?"en":"tr";$("teacherLang").textContent={tr:"Türkçe",de:"Deutsch",en:"English"}[lang]+" ▾";labels();render();});
$("teacherHelp")?.addEventListener("click",()=>alert(T("help")));
labels();state.textContent=T("local");
})();