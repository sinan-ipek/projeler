(()=>{"use strict";
const api=window.ChessReview,engine=window.ChessStockfish,extra=document.getElementById("simpleExtra"),movesEl=document.getElementById("moves");
if(!api||!engine||!extra||!movesEl)return;
const lang=()=>document.getElementById("simpleLang")?.value||"tr";
const words={
tr:{title:"Satranç Öğretmeni",wait:"İlk hamleyi bekliyorum.",thinking:"Konumu inceliyorum…",error:"Stockfish başlatılamadı",retry:"Yeniden dene",score:"Stockfish puanı",best:"Stockfish önerisi",threat:"Dikkat",reason:"Neden?",line:"Olası devamı göster",noReason:"Bu önerinin basit ve doğrulanabilir bir gerekçesini bulamadım.",check:"Şahın tehdit altında. Önce şahı kurtarmalısın.",checkOther:"Rakibin şahı tehdit altında.",capture:"Rakibin son hamlesi bir taş aldı.",attack:"Rakibin son hamlesi {piece} taşına saldırıyor.",loose:"{piece} taşın saldırı altında ve korunmuyor.",bestCapture:"Önerilen hamleyle {piece} taşını alabilirsin.",bestCheck:"Önerilen hamle şah çekiyor.",bestSafe:"Önerilen hamle tehdit altındaki {piece} taşını kurtarıyor.",better:"Motorun önerisi oynanan hamleden daha güçlü.",equal:"Bu hamle motorun ilk tercihidir.",good:"İyi hamle",inacc:"Küçük hata",mistake:"Hata",blunder:"Büyük hata",bestMove:"En iyi hamle",uncertain:"Motor değerlendirmesi",advWhite:"Beyaz avantajlı",advBlack:"Siyah avantajlı",balanced:"Konum dengeli",mate:"Zorunlu mat hesabı",pawn:"piyon",knight:"at",bishop:"fil",rook:"kale",queen:"vezir",king:"şah",you:"senin",opponent:"rakibin",move:"Hamle",unknown:"Bu konumda kesin bir basit tehdit tespit edemedim."},
de:{title:"Schachlehrer",wait:"Ich warte auf den ersten Zug.",thinking:"Ich untersuche die Stellung…",error:"Stockfish konnte nicht starten",retry:"Erneut versuchen",score:"Stockfish-Wertung",best:"Stockfish empfiehlt",threat:"Achtung",reason:"Warum?",line:"Variante zeigen",noReason:"Ich finde keine einfache, überprüfbare Erklärung für diesen Zug.",check:"Dein König steht im Schach.",checkOther:"Der gegnerische König steht im Schach.",capture:"Der Gegner hat eine Figur geschlagen.",attack:"Der letzte Zug greift deinen {piece} an.",loose:"Dein {piece} ist angegriffen und ungedeckt.",bestCapture:"Dieser Zug schlägt den gegnerischen {piece}.",bestCheck:"Dieser Zug gibt Schach.",bestSafe:"Dieser Zug rettet deinen {piece}.",better:"Die Engine bewertet die Alternative besser.",equal:"Das ist die erste Wahl der Engine.",good:"Guter Zug",inacc:"Ungenauigkeit",mistake:"Fehler",blunder:"Grober Fehler",bestMove:"Bester Zug",uncertain:"Engine-Bewertung",advWhite:"Weiß steht besser",advBlack:"Schwarz steht besser",balanced:"Ausgeglichene Stellung",mate:"Mattberechnung",pawn:"Bauer",knight:"Springer",bishop:"Läufer",rook:"Turm",queen:"Dame",king:"König",move:"Zug",unknown:"Keine unmittelbare einfache Drohung erkannt."},
en:{title:"Chess Teacher",wait:"Waiting for the first move.",thinking:"Checking the position…",error:"Stockfish could not start",retry:"Retry",score:"Stockfish score",best:"Stockfish suggests",threat:"Watch out",reason:"Why?",line:"Show continuation",noReason:"I cannot verify a simple reason for this recommendation.",check:"Your king is in check. You must respond.",checkOther:"The opponent's king is in check.",capture:"The opponent just captured a piece.",attack:"The last move attacks your {piece}.",loose:"Your {piece} is attacked and undefended.",bestCapture:"This move captures the opponent's {piece}.",bestCheck:"This move gives check.",bestSafe:"This move saves your {piece}.",better:"The engine prefers the alternative.",equal:"This is the engine's top choice.",good:"Good move",inacc:"Inaccuracy",mistake:"Mistake",blunder:"Blunder",bestMove:"Best move",uncertain:"Engine evaluation",advWhite:"White is better",advBlack:"Black is better",balanced:"Balanced position",mate:"Forced mate calculation",pawn:"pawn",knight:"knight",bishop:"bishop",rook:"rook",queen:"queen",king:"king",move:"Move",unknown:"No simple immediate threat found."}};
const T=()=>words[lang()]||words.tr;
const files="abcdefgh";
function parse(fen){const b={};fen.split(" ")[0].split("/").forEach((row,r)=>{let f=0;for(const ch of row){if(/[1-8]/.test(ch))f+=+ch;else b[files[f++]+(8-r)]=ch;}});return b;}
function side(p){return p===p.toUpperCase()?"w":"b";}
function kind(p){return ({p:"pawn",n:"knight",b:"bishop",r:"rook",q:"queen",k:"king"})[p.toLowerCase()];}
function attacks(b,from,to){const p=b[from];if(!p||from===to)return false;const dx=files.indexOf(to[0])-files.indexOf(from[0]),dy=+to[1]-+from[1],ax=Math.abs(dx),ay=Math.abs(dy),k=p.toLowerCase();
if(k==="p")return ax===1&&dy===(side(p)==="w"?1:-1);
if(k==="n")return ax===1&&ay===2||ax===2&&ay===1;
if(k==="k")return Math.max(ax,ay)===1;
if(k==="b"&&ax!==ay||k==="r"&&dx!==0&&dy!==0||k==="q"&&!(ax===ay||dx===0||dy===0))return false;
if(!["b","r","q"].includes(k))return false;
const sx=Math.sign(dx),sy=Math.sign(dy);let x=files.indexOf(from[0])+sx,y=+from[1]+sy;
while(files[x]+y!==to){if(b[files[x]+y])return false;x+=sx;y+=sy;if(x<0||x>7||y<1||y>8)return false;}return true;}
function attackers(b,sq,team){return Object.keys(b).filter(from=>side(b[from])===team&&attacks(b,from,sq));}
function findKing(b,team){return Object.keys(b).find(sq=>b[sq]===(team==="w"?"K":"k"));}
function safeText(k,p){return T()[k].replace("{piece}",T()[kind(p)]||"");}
function renderBoard(fen,marks=[]){const root=document.getElementById("reviewBoard");if(!root)return;const b=parse(fen),map={K:"♔",Q:"♕",R:"♖",B:"♗",N:"♘",P:"♙",k:"♚",q:"♛",r:"♜",b:"♝",n:"♞",p:"♟"};let html="<div style='display:grid;grid-template-columns:repeat(8,minmax(0,1fr));border:1px solid #aaa;border-radius:3px;overflow:hidden'>";
for(let r=8;r>=1;r--)for(let c=0;c<8;c++){const sq=files[c]+r,p=b[sq],mark=marks.find(m=>m.sq===sq),light=(c+r)%2===0;html+="<div title='"+sq+"' style='aspect-ratio:1;position:relative;display:grid;place-items:center;background:"+(mark?(mark.type==="danger"?"#e9a29a":"#e9cf73"):light?"var(--review-light,#eee)":"var(--review-dark,#aaa)")+"'>"+(p?(window.ChessPieceSVG?window.ChessPieceSVG(p):map[p]):"")+(mark?"<span style='position:absolute;inset:2px;border:2px solid "+(mark.type==="danger"?"#b53a30":"#28824b")+";border-radius:50%;pointer-events:none'></span>":"")+"</div>";}
root.innerHTML=html+"</div>";}
function panel(){extra.classList.add("open");extra.innerHTML="<div style='font-weight:700;font-size:17px;margin-bottom:6px' id='teacherTitle'></div><div id='teacherStatus' style='font-size:13px;color:#666;margin-bottom:10px'></div><div class='live-review-layout'><div id='reviewBoard'></div><div id='liveDetail' style='font-size:14px;line-height:1.6'></div></div>";document.getElementById("teacherTitle").textContent=T().title;}
function para(parent,title,text){const div=document.createElement("div");div.style.cssText="margin:0 0 12px";const strong=document.createElement("strong");strong.textContent=title;const p=document.createElement("div");p.textContent=text;div.append(strong,p);parent.append(div);}
function label(fen,uci){if(!uci||uci==="(none)")return "—";const p=parse(fen)[uci.slice(0,2)];const symbols={tr:{k:"Ş",q:"V",r:"K",b:"F",n:"A",p:""},de:{k:"K",q:"D",r:"T",b:"L",n:"S",p:""},en:{k:"K",q:"Q",r:"R",b:"B",n:"N",p:""}};if(p?.toLowerCase()==="k"&&Math.abs(files.indexOf(uci[2])-files.indexOf(uci[0]))===2)return uci[2]==="g"?"O-O":"O-O-O";return (symbols[lang()]||symbols.tr)[p?.toLowerCase()] + uci.slice(2,4)+(uci[4]?"="+uci[4].toUpperCase():"");}
function scoreText(info,fen){if(info.mate!==null)return T().mate+" ("+Math.abs(info.mate)+")";if(info.cp===null)return "—";const cp=info.cp*(fen.split(" ")[1]==="w"?1:-1);return (cp>0?"+":"")+(cp/100).toFixed(2)+" · "+(cp>60?T().advWhite:cp< -60?T().advBlack:T().balanced);}
function facts(before,after,move,player){const b=parse(after),old=parse(before),opp=player==="w"?"b":"w",last=move?.uci||"",out=[],marks=[];
const king=findKing(b,player),other=findKing(b,opp);
if(king&&attackers(b,king,opp).length){out.push(T().check);marks.push({sq:king,type:"danger"});}
else if(other&&attackers(b,other,player).length){out.push(T().checkOther);marks.push({sq:other,type:"danger"});}
if(last&&old[last.slice(2,4)]&&side(old[last.slice(2,4)])===player){out.push(T().capture);marks.push({sq:last.slice(2,4),type:"danger"});}
const targets=Object.keys(b).filter(sq=>side(b[sq])===player&&kind(b[sq])!=="king"&&attackers(b,sq,opp).length);
targets.sort((a,z)=>({q:9,r:5,b:3,n:3,p:1})[b[z].toLowerCase()]-({q:9,r:5,b:3,n:3,p:1})[b[a].toLowerCase()]);
for(const sq of targets.slice(0,2)){const defended=attackers(b,sq,player).length>0;if(!defended){out.push(safeText("loose",b[sq]));marks.push({sq,type:"danger"});}else if(last&&attacks(b,last.slice(2,4),sq)&&side(b[last.slice(2,4)])===opp){out.push(safeText("attack",b[sq]));marks.push({sq,type:"danger"});}}
return {out:[...new Set(out)].slice(0,2),marks};}
function explainBest(fen,uci,player){if(!uci)return null;const b=parse(fen),from=uci.slice(0,2),to=uci.slice(2,4),piece=b[from];if(!piece)return null;
const target=b[to],afterFen=api.nextFen(fen,uci),a=afterFen?parse(afterFen):null;
if(target&&side(target)!==player)return safeText("bestCapture",target);
if(a){const king=findKing(a,player==="w"?"b":"w");if(king&&attackers(a,king,player).length)return T().bestCheck;}
if(attackers(b,from,player==="w"?"b":"w").length&&a&&!attackers(a,to,player==="w"?"b":"w").length)return safeText("bestSafe",piece);
return null;}
let lastKey=null,busy=false,pending=false,request=0,shown=null,open=true;
function linePlayback(fen,pv){const seq=[fen];for(const uci of pv.slice(0,6)){const next=api.nextFen(seq.at(-1),uci);if(!next)break;seq.push(next);}if(seq.length<2)return;const token=++request;let i=0;const tick=()=>{if(token!==request)return;renderBoard(seq[i],i? [{sq:pv[i-1].slice(0,2),type:"hint"},{sq:pv[i-1].slice(2,4),type:"hint"}]:[]);if(++i<seq.length)setTimeout(tick,800);};tick();}
async function analyze(){
 if(busy){pending=true;return;}
 const moves=api.moves(),positions=api.positions(),i=moves.length-1,key=moves.map(x=>x.uci).join(","),player=document.getElementById("playerSide")?.value||"w";
 const fen=positions[i+1],turn=fen.split(" ")[1],cacheKey=key+"|"+player+"|"+lang();
 if(cacheKey===lastKey)return;
 lastKey=cacheKey;const token=++request;panel();
 const status=document.getElementById("teacherStatus"),detail=document.getElementById("liveDetail");
 const lastMove=i>=0?moves[i]:null;
 const found=i>=0?facts(positions[i],fen,lastMove,player):{out:[],marks:[]};
 renderBoard(fen,found.marks);
 if(i<0){status.textContent=T().wait;return;}
 if(found.out.length)para(detail,T().threat,found.out.join(" "));
 else if(turn===player)para(detail,T().threat,T().unknown);
 if(turn!==player){status.textContent=lang()==="tr"?"Rakibin hamlesi bekleniyor.":lang()==="de"?"Warte auf den gegnerischen Zug.":"Waiting for the opponent.";return;}
 status.textContent=T().thinking;busy=true;
 try{
  await engine.init();
  const current=await engine.analyze(fen,12);
  if(token!==request||api.moves().map(x=>x.uci).join(",")!==key)return;
  status.textContent=lang()==="tr"?"Sıra sende · "+T().title:lang()==="de"?"Du bist am Zug":"Your turn";
  para(detail,T().score,scoreText(current,fen));
  const suggestion=current.best&&current.best!=="(none)"?current.best:null;
  if(suggestion){
   para(detail,T().best,label(fen,suggestion)+" ("+suggestion.slice(0,2)+" → "+suggestion.slice(2,4)+")");
   para(detail,T().reason,explainBest(fen,suggestion,player)||T().noReason);
   const btn=document.createElement("button");btn.textContent=T().line;
   btn.style.cssText="padding:7px 12px;border:1px solid #aaa;background:#fff;border-radius:7px;cursor:pointer;margin-top:4px";
   btn.onclick=()=>linePlayback(fen,current.pv?.length?current.pv:[suggestion]);
   detail.append(btn);
   renderBoard(fen,[...found.marks,{sq:suggestion.slice(0,2),type:"hint"},{sq:suggestion.slice(2,4),type:"hint"}]);
  }else para(detail,T().best,T().noReason);
 }catch(e){
  if(token===request){status.textContent=T().error+": "+e.message;const btn=document.createElement("button");btn.textContent=T().retry;btn.onclick=()=>{lastKey=null;analyze();};detail.append(btn);lastKey=null;}
 }finally{busy=false;if(pending){pending=false;setTimeout(analyze,20);}}
}
const observer=new MutationObserver(()=>{if(!open)return;const key=api.moves().map(x=>x.uci).join(",");if(key+"|"+(document.getElementById("playerSide")?.value||"w")+"|"+lang()!==lastKey)analyze();});observer.observe(movesEl,{childList:true,characterData:true,subtree:true});
document.getElementById("simpleAnalysis")?.addEventListener("click",()=>{open=true;lastKey=null;analyze();});
document.getElementById("playerSide")?.addEventListener("change",()=>{lastKey=null;analyze();});
document.getElementById("simpleLang")?.addEventListener("change",()=>{if(open){lastKey=null;analyze();}});
for(const id of ["simpleBoard","simpleSave","simpleLoad","simplePower"])document.getElementById(id)?.addEventListener("click",()=>{open=false;request++;});
analyze();
})();