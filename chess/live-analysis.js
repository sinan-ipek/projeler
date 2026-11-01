/* explain.js v1.0 – Satranç Öğretmeni için açıklama üretici (tr/en/de).
   Bağımlılık: window.ChessReview.nextFen(fen, uci) (index.html içinde zaten var).
   Not: Takas hesabı (SEE) çivileme ve yasal hamle ayrıntılarını yok sayar; ifadeler bu yüzden temkinli tutuldu. */
(()=>{"use strict";
const root=typeof window!=="undefined"?window:globalThis;
const F="abcdefgh",VAL={p:1,n:3,b:3,r:5,q:9,k:99};
const side=p=>p===p.toUpperCase()?"w":"b",opp=s=>s==="w"?"b":"w",kd=p=>p.toLowerCase(),val=p=>VAL[kd(p)];
let nextFenFn=(fen,uci)=>root.ChessReview?root.ChessReview.nextFen(fen,uci):null;
const cap=(s,l)=>s.charAt(0).toLocaleUpperCase(l)+s.slice(1);
const trPiece=(x,form)=>{const n={piyon:["piyonu","piyonuna","piyonun"],at:["atı","atına","atın"],fil:["fili","filine","filin"],kale:["kalesini","kalesine","kalen"],vezir:["veziri","vezirine","vezirin"],şah:["şahı","şahına","şahın"]};return (n[String(x).toLocaleLowerCase("tr")]||[])[form]||x;};

const L={
tr:{names:{p:"piyon",n:"at",b:"fil",r:"kale",q:"vezir",k:"şah"},
 mate:n=>`Zorunlu mat var: ${n} hamlede mat verebilirsin.`,
 mateDef:n=>`Rakibin ${n} hamlede mat tehdidi var; bu hamle en iyi savunma.`,
 check:"Şah çekiyor ve rakibi cevap vermeye zorluyor.",
 capFree:x=>`Rakibin korumasız ${trPiece(x,0)} bedavaya alıyor.`,
 capWin:(x,n)=>`Rakibin ${trPiece(x,0)} alıyor; rakip geri alsa bile net +${n} puan kazanırsın.`,
 capTrade:x=>`Rakibin ${x} taşıyla eşit takas yapıyor.`,
 save:x=>`Tehdit altındaki ${trPiece(x,0)} kurtarıyor.`,
 fork:(a,b)=>`Çatal: aynı anda rakibin ${trPiece(a,1)} ve ${trPiece(b,1)} saldırıyor.`,
 threat:x=>`Rakibin ${trPiece(x,1)} saldırı tehdidi oluşturuyor.`,
 pvWin:(d,n)=>`Önerilen devam, ${Math.ceil(n/2)} hamle içinde yaklaşık ${d} puanlık materyal kazandırıyor.`,
 promo:"Piyonu terfi ettiriyor.",
 castle:"Şahı güvene alıyor ve kaleyi oyuna sokuyor.",
 develop:x=>`${cap(trPiece(x,0),"tr")} oyuna sokuyor (gelişim).`,
 center:"Merkezi kontrol ediyor.",
 hang:(x,sq)=>`${cap(x,"tr")} (${sq}) saldırı altında ve korunmuyor.`,
 hangShort:(x,sq,n)=>`${cap(x,"tr")} (${sq}) saldırı altında ve korumalar yetmiyor (takasta yaklaşık ${n} puan kaybedersin).`},
en:{names:{p:"pawn",n:"knight",b:"bishop",r:"rook",q:"queen",k:"king"},
 mate:n=>`Forced mate: you can checkmate in ${n}.`,
 mateDef:n=>`The opponent threatens mate in ${n}; this is the best defence.`,
 check:"Gives check and forces a reply.",
 capFree:x=>`Wins the undefended ${x} for free.`,
 capWin:(x,n)=>`Captures the ${x}; even after a recapture you come out ${n} points ahead.`,
 capTrade:x=>`Trades evenly for the ${x}.`,
 save:x=>`Saves your attacked ${x}.`,
 fork:(a,b)=>`Fork: attacks the ${a} and the ${b} at once.`,
 threat:x=>`Creates a threat against the ${x}.`,
 pvWin:(d,n)=>`The main line wins about ${d} points of material within ${Math.ceil(n/2)} moves.`,
 promo:"Promotes the pawn.",
 castle:"Gets the king safe and activates the rook.",
 develop:x=>`Develops the ${x}.`,
 center:"Fights for the centre.",
 hang:(x,sq)=>`${x} (${sq}) is attacked and undefended.`,
 hangShort:(x,sq,n)=>`${x} (${sq}) is attacked and the defence is not enough (you lose about ${n} points in the exchange).`},
de:{names:{p:"Bauer",n:"Springer",b:"Läufer",r:"Turm",q:"Dame",k:"König"},
 mate:n=>`Erzwungenes Matt in ${n}.`,
 mateDef:n=>`Der Gegner droht Matt in ${n}; das ist die beste Verteidigung.`,
 check:"Gibt Schach und zwingt den Gegner zu antworten.",
 capFree:x=>`Schlägt kostenlos: ungedeckter ${x} des Gegners.`,
 capWin:(x,n)=>`Schlägt ${x} des Gegners; auch nach dem Rückschlag stehst du ${n} Punkte besser.`,
 capTrade:x=>`Tauscht gleichwertig gegen ${x} des Gegners.`,
 save:x=>`Rettet die bedrohte Figur: ${x}.`,
 fork:(a,b)=>`Gabel: greift ${a} und ${b} gleichzeitig an.`,
 threat:x=>`Droht, ${x} des Gegners zu gewinnen.`,
 pvWin:(d,n)=>`Die Hauptvariante gewinnt in ${Math.ceil(n/2)} Zügen etwa ${d} Punkte Material.`,
 promo:"Wandelt den Bauern um.",
 castle:"Bringt den König in Sicherheit und aktiviert den Turm.",
 develop:x=>`Entwickelt eine Figur: ${x}.`,
 center:"Kontrolliert das Zentrum.",
 hang:(x,sq)=>`${x} (${sq}) ist angegriffen und ungedeckt.`,
 hangShort:(x,sq,n)=>`${x} (${sq}) ist angegriffen und die Deckung reicht nicht (Verlust etwa ${n} Punkte).`}
};

function parseFen(fen){const [pp,turn]=fen.split(" "),b={};pp.split("/").forEach((row,r)=>{let f=0;for(const ch of row){if(/[1-8]/.test(ch))f+=+ch;else b[F[f++]+(8-r)]=ch;}});return {b,turn};}
function attacks(b,from,to){const p=b[from];if(!p||from===to)return false;
 const dx=F.indexOf(to[0])-F.indexOf(from[0]),dy=+to[1]-+from[1],ax=Math.abs(dx),ay=Math.abs(dy),k=kd(p);
 if(k==="p")return ax===1&&dy===(side(p)==="w"?1:-1);
 if(k==="n")return (ax===1&&ay===2)||(ax===2&&ay===1);
 if(k==="k")return Math.max(ax,ay)===1;
 const diag=ax===ay,line=dx===0||dy===0;
 if((k==="b"&&!diag)||(k==="r"&&!line)||(k==="q"&&!(diag||line)))return false;
 const sx=Math.sign(dx),sy=Math.sign(dy);let x=F.indexOf(from[0])+sx,y=+from[1]+sy;
 while(x>=0&&x<8&&y>=1&&y<=8){const sq=F[x]+y;if(sq===to)return true;if(b[sq])return false;x+=sx;y+=sy;}
 return false;}
const attackers=(b,sq,team)=>Object.keys(b).filter(s=>side(b[s])===team&&attacks(b,s,sq));

// Static Exchange Evaluation: 'from' karesindeki taş 'to' karesinde takas başlatırsa net kazanç (piyon=1, at/fil=3, kale=5, vezir=9)
function see(b0,from,to){
 const b={...b0},gain=[b[to]?val(b[to]):0];let turn=opp(side(b[from])),d=0;
 b[to]=b[from];delete b[from];
 for(;;){
  const atk=attackers(b,to,turn).sort((x,y)=>val(b[x])-val(b[y]));
  if(!atk.length)break;
  const a=atk[0];
  if(kd(b[a])==="k"&&attackers(b,to,opp(turn)).length)break;
  d++;gain[d]=val(b[to])-gain[d-1];
  b[to]=b[a];delete b[a];turn=opp(turn);
 }
 for(let i=d;i>=1;i--)gain[i-1]=-Math.max(-gain[i-1],gain[i]);
 return gain[0]||0;}
// 'sq' karesindeki taşı rakip takasla kazanabilir mi? Kazanç puanını döndürür (0 = tehlike yok).
function loss(b,sq){const p=b[sq];if(!p||kd(p)==="k")return 0;let best=0;
 for(const a of attackers(b,sq,opp(side(p))))best=Math.max(best,see(b,a,sq));return best;}
const material=(b,t)=>Object.values(b).reduce((s,p)=>side(p)===t&&kd(p)!=="k"?s+val(p):s,0);

function bestMoveReasons(fen,info,lang){
 try{
  const uci=info&&info.best;if(!uci)return [];
  const {b,turn:me}=parseFen(fen),enemy=opp(me),t=L[lang]||L.tr,nm=p=>t.names[kd(p)],R=[];
  const nf=nextFenFn(fen,uci);if(!nf)return [];
  const A=parseFen(nf).b,from=uci.slice(0,2),to=uci.slice(2,4),piece=b[from];if(!piece)return [];
  if(info.mate>0)R.push([100,t.mate(info.mate)]);else if(info.mate<0)R.push([95,t.mateDef(-info.mate)]);
  if(uci[4])R.push([90,t.promo]);
  // taş alma
  let target=b[to],capReason=false;
  if(!target&&kd(piece)==="p"&&from[0]!==to[0])target=me==="w"?"p":"P"; // en passant
  if(target&&side(target)===enemy){
   const net=val(target)-loss(A,to);
   if(!attackers(A,to,enemy).length){R.push([80,t.capFree(nm(target))]);capReason=true;}
   else if(net>0){R.push([78,t.capWin(nm(target),net)]);capReason=true;}
   else if(net===0){R.push([60,t.capTrade(nm(target))]);capReason=true;}
  }
  // şah
  const ek=Object.keys(A).find(s=>A[s]===(enemy==="w"?"K":"k"));
  if(ek&&attackers(A,ek,me).length)R.push([70,t.check]);
  // tehdit altındaki kendi taşını kurtarma
  let save=null;
  for(const sq of Object.keys(b)){if(side(b[sq])!==me||kd(b[sq])==="k")continue;
   const l0=loss(b,sq);if(l0<=0)continue;
   const now=sq===from?loss(A,to):loss(A,sq);
   if(now<l0&&(!save||l0>save.l))save={l:l0,p:b[sq]};}
  if(save)R.push([75,t.save(nm(save.p))]);
  // yeni tehdit / çatal
  const gain=(B,sq)=>{let g=0;for(const a of attackers(B,sq,me))g=Math.max(g,see(B,a,sq));return g;};
  const foes=B=>Object.keys(B).filter(s=>side(B[s])===enemy&&kd(B[s])!=="k");
  const before={};for(const s of foes(b))before[s]=gain(b,s);
  const fresh=foes(A).map(s=>({s,g:gain(A,s)})).filter(x=>x.g>0&&!(before[x.s]>0)).sort((x,y)=>y.g-x.g);
  const byMoved=fresh.filter(x=>attacks(A,to,x.s));
  if(byMoved.length>=2)R.push([85,t.fork(nm(A[byMoved[0].s]),nm(A[byMoved[1].s]))]);
  else if(fresh.length)R.push([65,t.threat(nm(A[fresh[0].s]))]);
  // varyant boyunca materyal kazancı (çift yarım hamlede; takas ortasında kalmamak için)
  if(!capReason){
   const pv=info.pv&&info.pv.length?info.pv:[uci],mat=fx=>{const B=parseFen(fx).b;return material(B,me)-material(B,enemy);};
   const base=mat(fen);let f=fen,ply=0,last=null;
   for(let i=0;i<Math.min(pv.length,6);i++){const n2=nextFenFn(f,pv[i]);if(!n2)break;f=n2;ply++;if(ply%2===0)last={ply,d:mat(f)-base};}
   if(last&&last.d>=1)R.push([50,t.pvWin(last.d,last.ply)]);
  }
  // pozisyonel nedenler
  const full=+fen.split(" ")[5]||1;
  if(kd(piece)==="k"&&Math.abs(F.indexOf(to[0])-F.indexOf(from[0]))===2)R.push([40,t.castle]);
  else if((kd(piece)==="n"||kd(piece)==="b")&&from[1]===(me==="w"?"1":"8")&&to[1]!==from[1]&&full<=12)R.push([30,t.develop(nm(piece))]);
  else if(kd(piece)==="p"&&["d4","e4","d5","e5"].includes(to)&&full<=10)R.push([25,t.center]);
  R.sort((x,y)=>y[0]-x[0]);
  return [...new Set(R.map(x=>x[1]))].slice(0,2);
 }catch(e){return [];}
}

// Oyuncunun tehdit altındaki taşları: [{sq,text}]
function threats(fen,player,lang){
 try{
  const {b}=parseFen(fen),t=L[lang]||L.tr,out=[];
  for(const sq of Object.keys(b)){const p=b[sq];if(side(p)!==player||kd(p)==="k")continue;const l=loss(b,sq);if(l>0)out.push({sq,l,p});}
  out.sort((x,y)=>y.l-x.l||val(y.p)-val(x.p));
  return out.slice(0,2).map(o=>{const n=cap(t.names[kd(o.p)],lang);
   return {sq:o.sq,text:attackers(b,o.sq,player).length?t.hangShort(n,o.sq,o.l):t.hang(n,o.sq)};});
 }catch(e){return [];}
}

const api={bestMoveReasons,threats,see,loss,parseFen,trPiece,setNextFen(fn){nextFenFn=fn;}};
root.ChessExplain=api;
if(typeof module!=="undefined"&&module.exports)module.exports=api;
})();
(()=>{"use strict";
const api=window.ChessReview,engine=window.ChessStockfish,extra=document.getElementById("simpleExtra"),movesEl=document.getElementById("moves");
if(!api||!engine||!extra||!movesEl)return;
const lang=()=>document.getElementById("simpleLang")?.value||"tr";
const words={
tr:{title:"Satranç Öğretmeni",wait:"İlk hamleyi bekliyorum.",thinking:"Konumu inceliyorum…",error:"Stockfish başlatılamadı",retry:"Yeniden dene",score:"Stockfish puanı",best:"Stockfish önerisi",threat:"Dikkat",reason:"Neden?",line:"Olası devamı göster",noReason:"Bu önerinin basit ve doğrulanabilir bir gerekçesini bulamadım.",check:"Şahın tehdit altında. Önce şahı kurtarmalısın.",checkOther:"Rakibin şahı tehdit altında.",capture:"Rakibin son hamlesi bir taş aldı.",attack:"Rakibin son hamlesi {piece} saldırıyor.",loose:"{piece} saldırı altında ve korunmuyor.",bestCapture:"Önerilen hamleyle {piece} alabilirsin.",bestCheck:"Önerilen hamle şah çekiyor.",bestSafe:"Önerilen hamle tehdit altındaki {piece} kurtarıyor.",better:"Motorun önerisi oynanan hamleden daha güçlü.",equal:"Bu hamle motorun ilk tercihidir.",good:"İyi hamle",inacc:"Küçük hata",mistake:"Hata",blunder:"Büyük hata",bestMove:"En iyi hamle",uncertain:"Motor değerlendirmesi",advWhite:"Beyaz avantajlı",advBlack:"Siyah avantajlı",balanced:"Konum dengeli",mate:"Zorunlu mat hesabı",pawn:"piyon",knight:"at",bishop:"fil",rook:"kale",queen:"vezir",king:"şah",you:"senin",opponent:"rakibin",move:"Hamle",unknown:"Bu konumda kesin bir basit tehdit tespit edemedim."},
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
function safeText(k,p){const word=T()[kind(p)]||"";const forms={attack:1,loose:2,bestCapture:0,bestSafe:0};return T()[k].replace("{piece}",lang()==="tr"&&forms[k]!==undefined?window.ChessExplain?.trPiece?.(word,forms[k])||word:word);}
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
// v1.9: takas hesabına (SEE) dayalı tehdit tespiti
if(window.ChessExplain){for(const th of window.ChessExplain.threats(after,player,lang())){out.push(th.text);marks.push({sq:th.sq,type:"danger"});}}
else{
const targets=Object.keys(b).filter(sq=>side(b[sq])===player&&kind(b[sq])!=="king"&&attackers(b,sq,opp).length);
targets.sort((a,z)=>({q:9,r:5,b:3,n:3,p:1})[b[z].toLowerCase()]-({q:9,r:5,b:3,n:3,p:1})[b[a].toLowerCase()]);
for(const sq of targets.slice(0,2)){const defended=attackers(b,sq,player).length>0;if(!defended){out.push(safeText("loose",b[sq]));marks.push({sq,type:"danger"});}else if(last&&attacks(b,last.slice(2,4),sq)&&side(b[last.slice(2,4)])===opp){out.push(safeText("attack",b[sq]));marks.push({sq,type:"danger"});}}
}
return {out:[...new Set(out)].slice(0,3),marks};}
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
   // v1.9: SEE tabanlı açıklama; hiçbir şey bulunamazsa eski kurallara, o da olmazsa dürüst mesaja düşer
   const why=window.ChessExplain?window.ChessExplain.bestMoveReasons(fen,{best:suggestion,pv:current.pv,mate:current.mate},lang()):[];
   para(detail,T().reason,why.join(" ")||explainBest(fen,suggestion,player)||T().noReason);
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