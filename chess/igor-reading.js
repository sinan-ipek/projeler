/* Igor 8: source-conscious reading companion.
   Only original chapter summaries are shipped. The book PDF stays local to the reader.
   Unverified chess answers are NEVER automatically judged correct or incorrect. */
(function(){
"use strict";
const chapters=[
  {id:1,from:1,examplesEnd:7,to:11,title:"I · According to the Rules of Shatranj",summary:{
    tr:"Satranç tarihine Şatranç kurallarıyla başlıyoruz. Vezir ve fil günümüzdeki gibi hareket etmez. Bu bölümde modern tahtada hamle denetimi yapmak doğru değildir.",
    de:"Der Einstieg führt zu den Regeln des Schatrandsch. Dame und Läufer ziehen anders als heute. Deshalb prüfen wir diese Stellungen nicht mit modernen Schachregeln.",
    en:"The journey begins with shatranj. Its queen and bishop moved differently from modern chess pieces, so modern chess rules cannot judge these positions."}},
  {id:2,from:12,examplesEnd:21,to:33,title:"II · From Lucena to Greco",summary:{
    tr:"Erken dönem satranç eserlerinden Lucena ve Greco'ya uzanıyoruz. Fedalar ve doğrudan şah saldırıları bu örneklerin düşünme dünyasını gösterir.",
    de:"Von frühen Schachbüchern geht es zu Lucena und Greco. Opfer und Königsangriffe prägen viele der gezeigten Ideen.",
    en:"From early chess writings to Lucena and Greco, this section explores sacrifices and direct attacks against the king."}},
  {id:3,from:34,examplesEnd:42,to:62,title:"III · From Stamma to Philidor",summary:{
    tr:"Stamma ve Philidor döneminde hesaplama, taşların uyumu ve hamle sırası üzerinde duruyoruz. Önce zorlayıcı hamleleri aramak yararlı olacaktır.",
    de:"Bei Stamma und Philidor stehen Berechnung, Zusammenarbeit der Figuren und die Zugfolge im Mittelpunkt.",
    en:"Stamma and Philidor bring calculation, piece coordination, and move order into focus."}},
  {id:4,from:63,examplesEnd:82,to:134,title:"IV · From Napoleon to Staunton",summary:{
    tr:"19. yüzyılın ilk yarısındaki ustaların konumlarına bakıyoruz. Güçlü bir hamleyi bulmak kadar rakibin savunma olanaklarını görmek de önemli.",
    de:"Wir betrachten Meister der ersten Hälfte des 19. Jahrhunderts und prüfen neben Angriffsideen auch die Verteidigung.",
    en:"We explore early nineteenth-century masters, paying attention to both attacking ideas and defensive resources."}},
  {id:5,from:135,examplesEnd:148,to:204,title:"V · Anderssen and Morphy",summary:{
    tr:"Anderssen ve Morphy'nin saldırı anlayışını inceliyoruz. Gelişim üstünlüğü, açık hatlar ve taş fedalarının nasıl birleştiğine dikkat et.",
    de:"Anderssen und Morphy zeigen, wie Entwicklung, offene Linien und Opfer zusammenspielen.",
    en:"Anderssen and Morphy show how development, open lines, and sacrifices can combine in an attack."}},
  {id:6,from:205,examplesEnd:209,to:257,title:"VI · First Unofficial World Championship Match",summary:{
    tr:"İlk gayriresmî dünya şampiyonluğu karşılaşması dönemine geçiyoruz. Bir kombinasyonu değerlendirirken yalnızca ilk güzel hamleye değil, devamına da bak.",
    de:"Es geht um die Zeit des ersten inoffiziellen Weltmeisterschaftskampfes. Wichtig ist die ganze Zugfolge, nicht nur der erste schöne Zug.",
    en:"We reach the first unofficial world championship match. A combination must be judged by its continuation, not only its first attractive move."}},
  {id:7,from:258,examplesEnd:264,to:316,title:"VII · Zukertort and Chigorin",summary:{
    tr:"Zukertort ve Çigorin döneminde etkin taşların ve inisiyatifin değerini görüyoruz. Fedadan sonra rakibin en güçlü savunmasını düşün.",
    de:"Zukertort und Tschigorin zeigen den Wert aktiver Figuren und der Initiative. Suche nach dem Opfer stets die beste Verteidigung.",
    en:"Zukertort and Chigorin highlight active pieces and initiative. After a sacrifice, look for the opponent's strongest defense."}},
  {id:8,from:317,examplesEnd:332,to:404,title:"VIII · Steinitz - The First World Champion",summary:{
    tr:"İlk resmî dünya şampiyonu Steinitz'e geliyoruz. Konumsal fikirlerin bazen nasıl taktik sonuçlar doğurduğunu incele.",
    de:"Bei Steinitz, dem ersten offiziellen Weltmeister, sehen wir, wie positionelle Ideen taktische Folgen haben können.",
    en:"Steinitz, the first official world champion, helps show how positional ideas can create tactical opportunities."}},
  {id:9,from:405,examplesEnd:426,to:546,title:"IX · Lasker and Pillsbury",summary:{
    tr:"Lasker ve Pillsbury'nin oyunlarında direnç, inisiyatif ve hesaplamanın birlikteliğine odaklanıyoruz. İlk sezgiyi varyantlarla test et.",
    de:"Bei Lasker und Pillsbury treffen Widerstandskraft, Initiative und Berechnung zusammen. Prüfe die erste Idee mit Varianten.",
    en:"Lasker and Pillsbury invite us to combine resilience, initiative, and calculation. Test your first idea against concrete variations."}},
  {id:10,from:547,examplesEnd:560,to:664,title:"X · Matches of the Second World Champion",summary:{
    tr:"İkinci dünya şampiyonunun maçları çevresindeki kombinasyonları izliyoruz. Savunma imkânlarını gözden kaçırmamaya çalış.",
    de:"Wir untersuchen Kombinationen aus den Kämpfen des zweiten Weltmeisters. Beachte stets mögliche Verteidigungen.",
    en:"We examine combinations surrounding the second world champion's matches, always considering the defender's resources."}},
  {id:11,from:665,examplesEnd:678,to:786,title:"XI · Capablanca, Alekhine, Euwe",summary:{
    tr:"Capablanca, Alekhine ve Euwe döneminde sade görünen konumların içindeki taktikleri araştırıyoruz. Kritik kareleri ve taş uyumunu gözle.",
    de:"Bei Capablanca, Aljechin und Euwe suchen wir Taktik auch in scheinbar ruhigen Stellungen. Achte auf Schlüsselfelder und Figurenzusammenspiel.",
    en:"With Capablanca, Alekhine, and Euwe, look for tactics even in quiet-looking positions and study key squares and coordination."}},
  {id:12,from:787,examplesEnd:794,to:870,title:"XII · Botvinnik, Smyslov, Tal",summary:{
    tr:"Botvinnik, Smyslov ve Tal farklı hesaplama ve saldırı yaklaşımları sunuyor. Bir fedanın gerçekten çalışıp çalışmadığını somut hamlelerle sınamalıyız.",
    de:"Botwinnik, Smyslow und Tal zeigen unterschiedliche Wege des Rechnens und Angreifens. Opfer müssen mit konkreten Zügen geprüft werden.",
    en:"Botvinnik, Smyslov, and Tal offer different styles of calculation and attack. Test sacrifices with concrete moves."}},
  {id:13,from:871,examplesEnd:879,to:975,title:"XIII · Petrosian, Spassky, Fischer",summary:{
    tr:"Petrosyan, Spasski ve Fischer döneminde önleyici savunma ile dinamik taktiklerin birlikteliğini gözlemliyoruz.",
    de:"Bei Petrosjan, Spasski und Fischer begegnen sich vorbeugende Verteidigung und dynamische Taktik.",
    en:"Petrosian, Spassky, and Fischer show the relationship between preventive defense and dynamic tactics."}},
  {id:14,from:976,examplesEnd:987,to:1043,title:"XIV · The Great Opposition: Karpov - Kasparov",summary:{
    tr:"Karpov ve Kasparov rekabetiyle modern hesaplama ve uzun varyantları inceliyoruz. Birden fazla savunma dalını karşılaştırmak özellikle önemli.",
    de:"Mit der Rivalität zwischen Karpow und Kasparow betrachten wir moderne Berechnung und lange Varianten mit mehreren Verteidigungen.",
    en:"The Karpov–Kasparov rivalry brings modern calculation and long lines. Comparing multiple defensive branches becomes especially important."}}
];
const copy={
  tr:{heading:"Birlikte okuyalım",chapter:"Bölüm",read:"Oku",solve:"Kendim çözeyim",chapterSummary:"Bölümün özeti",source:"Kaynak",example:"Açıklamalı örnek",challenge:"Bağımsız alıştırma",examples:"örnek",challenges:"alıştırma",goToExercises:"Alıştırmalara geç",goToExamples:"Örnekleri oku",pdf:"Özgün PDF'yi kendi cihazımdan aç",pdfExplanation:"Kitabın özgün metni cihazında kalır; GitHub'a gönderilmez.",choosePdf:"PDF seç",openNew:"Yeni sekmede aç",bookPage:"PDF sayfası",pdfUnavailable:"PDF seçersen bu sayfanın özgün metnini burada okuyabilirsin.",seek:"Sayfaya git",guide:"Okuma rehberi",exampleText:"Bu diyagram yazarın açıklamasının parçası. Önce kitabın metnini oku; ardından konumu incele. İstersen hamleleri tahtada deneyebilirsin.",challengeText:"Konumu bir yarışma oyunu gibi değerlendir: Hangi fikri aradığını önceden söylemiyoruz. Şah çekme, taş alma ve güçlü tehditleri sırayla incele.",explore:"Tahtada dene",stopExplore:"Tahtayı kilitle",reset:"Konumu sıfırla",notReady:"Konum veya hamle sırası henüz doğrulanmadı. Yanlış cevap verilmesini önlemek için otomatik puanlama yok.",shatranj:"Bu tarihî Şatranç konumunda taşlar farklı hareket eder; modern kurallarla hamle yapılmaz.",unknown:"Tahta diyagramı henüz aktarılamadı. Özgün PDF üzerinden okumaya devam edebilirsin.",notVerified:"Kitabın çözüm varyantları henüz bağımsız doğrulanmadı. Hamleni yalnızca yasal olduğu için doğru saymayacağız.",thinking:"Kendi düşüncem (isteğe bağlı)",save:"Notumu kaydet",saved:"Not cihazına kaydedildi.",reflect:"Bunu neden oynadım? Rakibin en güçlü cevabı ne?",check:"Hamlen şah çekiyor. Rakibin bütün yasal cevaplarını da kontrol et.",mate:"Tahtadaki mevcut konum şah mat. Kaynaktaki tüm varyantlarla karşılaştır.",capture:"Hamlen bir taş aldı. Ancak yalnızca taş almak kombinasyonun doğru olduğu anlamına gelmez.",neutral:"Hamle oynandı. Şimdi rakibin en güçlü cevabını düşün.",viewed:"İncelenen diyagram",validation:"Kaynak kontrolü bekleniyor",finish:"Bölümü okudum",done:"Bölüm okundu",page:"sayfa",nextPrompt:"Alıştırmaların çözümü kitapta bulunuyor; doğrulanmayan varyantları otomatik notlandırmıyoruz.",noAuto:"Otomatik doğru/yanlış yok",restore:"Kaldığım yerden devam"},
  de:{heading:"Gemeinsam lesen",chapter:"Kapitel",read:"Lesen",solve:"Selbst lösen",chapterSummary:"Kapitelüberblick",source:"Quelle",example:"Erklärtes Beispiel",challenge:"Selbstständige Aufgabe",examples:"Beispiele",challenges:"Aufgaben",goToExercises:"Zu den Aufgaben",goToExamples:"Beispiele lesen",pdf:"Original-PDF von meinem Gerät öffnen",pdfExplanation:"Die PDF bleibt auf deinem Gerät und wird nicht auf GitHub hochgeladen.",choosePdf:"PDF wählen",openNew:"Im neuen Tab öffnen",bookPage:"PDF-Seite",pdfUnavailable:"Wähle dein PDF, um den Originaltext hier zu lesen.",seek:"Seite öffnen",guide:"Lesehilfe",exampleText:"Dieses Diagramm gehört zur Erklärung des Autors. Lies zuerst den Text und untersuche dann die Stellung.",challengeText:"Suche die beste Idee wie in einer Partie. Wir verraten nicht im Voraus, welches taktische Motiv gesucht wird.",explore:"Am Brett testen",stopExplore:"Brett sperren",reset:"Stellung zurücksetzen",notReady:"Stellung oder Zugrecht nicht verifiziert; keine automatische Bewertung.",shatranj:"Historisches Schatrandsch hat andere Figurenregeln. Moderne Züge sind deaktiviert.",unknown:"Das Diagramm wurde noch nicht übertragen. Lies die Original-PDF weiter.",notVerified:"Die Varianten sind noch nicht geprüft. Ein legaler Zug gilt nicht automatisch als richtig.",thinking:"Mein Gedanke (freiwillig)",save:"Notiz speichern",saved:"Notiz lokal gespeichert.",reflect:"Warum wählte ich den Zug? Was ist die beste Antwort?",check:"Dein Zug gibt Schach. Prüfe alle legalen Antworten.",mate:"Die aktuelle Stellung ist matt. Vergleiche sie mit dem Buch.",capture:"Du hast eine Figur geschlagen. Das beweist die Kombination noch nicht.",neutral:"Zug ausgeführt. Suche jetzt die beste Antwort.",viewed:"Gesehene Diagramme",validation:"Quellenprüfung offen",finish:"Kapitel gelesen",done:"Kapitel gelesen",page:"Seite",nextPrompt:"Die Lösungen stehen im Buch; nicht geprüfte Varianten werden nicht bewertet.",noAuto:"Keine automatische Note",restore:"Weiterlesen"},
  en:{heading:"Read together",chapter:"Chapter",read:"Read",solve:"Solve myself",chapterSummary:"Chapter overview",source:"Source",example:"Annotated example",challenge:"Independent exercise",examples:"examples",challenges:"exercises",goToExercises:"Go to exercises",goToExamples:"Read examples",pdf:"Open my own original PDF",pdfExplanation:"Your PDF stays on your device and is not uploaded to GitHub.",choosePdf:"Choose PDF",openNew:"Open in a new tab",bookPage:"PDF page",pdfUnavailable:"Choose your PDF to read the original page here.",seek:"Go to page",guide:"Reading guide",exampleText:"This diagram belongs to the author's explanation. Read the text first, then inspect the position.",challengeText:"Treat the position as a real game: find the strongest idea without being told its tactical theme.",explore:"Try on board",stopExplore:"Lock board",reset:"Reset position",notReady:"The position or side to move is unverified; automatic grading is disabled.",shatranj:"These historic shatranj positions use different piece rules. Modern moves are disabled.",unknown:"This diagram has not been digitized. You can still read the original page.",notVerified:"The solution variations have not yet been checked. A legal move is not automatically correct.",thinking:"My reasoning (optional)",save:"Save note",saved:"Note saved locally.",reflect:"Why did I choose this? What is the opponent's best reply?",check:"Your move gives check. Consider every legal response.",mate:"The current position is checkmate. Compare with the book's variations.",capture:"You captured a piece, but a capture alone does not prove the combination.",neutral:"Move played. Find the opponent's strongest reply.",viewed:"Diagrams viewed",validation:"Source verification pending",finish:"Mark chapter read",done:"Chapter read",page:"page",nextPrompt:"The book contains the answers. Unverified lines are never graded automatically.",noAuto:"No automatic grading",restore:"Continue reading"}
};
const storeKey="igor8-reader-progress-v1";
const saved=(function(){try{return JSON.parse(localStorage.getItem(storeKey)||"{}")||{};}catch(e){return {};}})();
const state={mode:saved.mode==="solve"?"solve":"read",explore:false,notes:saved.notes&&typeof saved.notes==="object"?saved.notes:{},seen:saved.seen&&typeof saved.seen==="object"?saved.seen:{},done:saved.done&&typeof saved.done==="object"?saved.done:{},pdfUrl:null,chapter:1,currentId:0,scoreMessage:"",panel:null,api:null,lang:"tr",loadedNoteId:0,openChapter:0};
function persist(){try{localStorage.setItem(storeKey,JSON.stringify({mode:state.mode,notes:state.notes,seen:state.seen,done:state.done}));}catch(e){}}
function chapterOf(id){return chapters.find(c=>id>=c.from&&id<=c.to)||chapters[0];}
function meta(id){const c=chapterOf(id);return {chapter:c.id,role:id<=c.examplesEnd?"example":"challenge",chapterTitle:c.title,chapterStart:c.from,firstExercise:c.examplesEnd+1,chapterEnd:c.to,shatranj:c.id===1};}
function t(k){return (copy[state.lang]||copy.tr)[k]||copy.tr[k]||k;}
function el(id){return state.panel?.querySelector("#"+id);}
function setText(id,value){const e=el(id);if(e)e.textContent=value;}
function syncLanguage(){const selected=document.getElementById("simpleLang")?.value;state.lang=copy[selected]?selected:"tr";}
function pdfTarget(page){
  if(!state.pdfUrl)return "";
  const n=Math.max(1,Math.trunc(Number(page)||1));
  return state.pdfUrl+"#page="+n+"&view=FitH";
}
function showPdf(page){
  const frame=el("igor8PdfFrame");
  if(!frame||!state.pdfUrl)return;
  const target=pdfTarget(page);
  if(frame.src!==target)frame.src=target;
  frame.hidden=false;
  const link=el("igor8PdfNew");link.href=target;link.hidden=false;
}
function mount(panel,api){
  if(state.panel)return;
  state.panel=panel;state.api=api;
  const style=document.createElement("style");style.id="igor8ReaderStyle";
  style.textContent=[
    "#igor8Reader[hidden],#igor8PdfFrame[hidden],#igor8PdfNew[hidden]{display:none!important}",
    "#igor8Reader{margin:0 0 9px;padding:12px;border:1px solid #dedbd2;border-radius:12px;background:#fffdf8;box-shadow:0 2px 8px #0000000a;color:#242424}",
    "#igor8Reader *{box-sizing:border-box}",
    ".igor8-title{display:flex;align-items:center;gap:7px;font-weight:750;font-size:15px;margin:0 0 8px}",
    ".igor8-options{display:flex;gap:6px;margin:8px 0;flex-wrap:wrap}",
    ".igor8-options button,.igor8-actions button{border:1px solid #cbc5b6;border-radius:8px;padding:7px 10px;background:white;min-height:34px;font-size:12px;color:#222;cursor:pointer}",
    ".igor8-options button[aria-pressed=true]{background:#fff0b2;border-color:#be930c;font-weight:700}",
    "#igor8Chapter{width:100%;max-width:100%;font:inherit;font-size:12px;padding:7px;border:1px solid #ccc;border-radius:7px;background:white;color:#242424}",
    ".igor8-meta{font-size:12px;color:#585858;margin:8px 0;line-height:1.5}",
    ".igor8-summary{background:#f8f6f1;border-radius:8px;padding:9px 10px;margin:8px 0;font-size:12px;line-height:1.55}",
    ".igor8-summary summary{font-weight:650;cursor:pointer;list-style:auto}",
    ".igor8-content{font-size:13px;line-height:1.6;margin:9px 0}",
    ".igor8-dim{font-size:11px;color:#666;line-height:1.4}",
    ".igor8-actions{display:flex;gap:6px;flex-wrap:wrap;margin:8px 0}",
    ".igor8-pdf{margin-top:9px;border-top:1px solid #eee;padding-top:8px}",
    ".igor8-pdf summary{font-size:12px;font-weight:600;cursor:pointer}",
    ".igor8-pdf-tools{display:flex;align-items:center;gap:6px;flex-wrap:wrap;margin:8px 0}",
    ".igor8-pdf-tools button,.igor8-pdf-tools a{border:1px solid #ccc;padding:6px 8px;border-radius:7px;color:#333;font-size:12px;background:#fff;text-decoration:none;cursor:pointer}",
    ".igor8-pdf-tools input[type=number]{width:56px;padding:6px;border:1px solid #ccc;border-radius:7px}",
    "#igor8PdfFrame{width:100%;height:340px;border:1px solid #ddd;border-radius:6px;background:white}",
    "#igor8Note{width:100%;min-height:60px;max-height:140px;resize:vertical;font:inherit;font-size:13px;line-height:1.45;border:1px solid #ccc;border-radius:8px;padding:8px;background:white;color:#222}",
    "#igor8MoveFeedback{margin:8px 0;color:#365b4d;font-size:12px;line-height:1.5}",
    "#igor8Reader button:focus-visible,#igor8Reader select:focus-visible,#igor8Reader textarea:focus-visible{outline:2px solid #bb8500;outline-offset:2px}",
    "@media(max-width:540px){#igor8Reader{padding:9px}#igor8PdfFrame{height:270px}}"
  ].join("\n");
  document.head.appendChild(style);
  const root=document.createElement("section");
  root.id="igor8Reader";root.hidden=true;
  root.innerHTML=[
    '<p class="igor8-title">📖 <span id="igor8Title"></span></p>',
    '<label for="igor8Chapter" class="igor8-dim" id="igor8ChapterLabel"></label>',
    '<select id="igor8Chapter" aria-label="Chapter"></select>',
    '<div class="igor8-options" role="group" aria-label="Reading mode">',
    '<button id="igor8Read" type="button" aria-pressed="true"></button>',
    '<button id="igor8Solve" type="button" aria-pressed="false"></button></div>',
    '<details class="igor8-summary" id="igor8Summary"><summary id="igor8SummaryLabel"></summary>',
    '<p id="igor8SummaryBody"></p></details>',
    '<p id="igor8Location" class="igor8-meta"></p>',
    '<p id="igor8Guide" class="igor8-content"></p>',
    '<p id="igor8Trust" class="igor8-dim"></p>',
    '<div class="igor8-actions">',
    '<button id="igor8GoChallenges" type="button"></button>',
    '<button id="igor8GoExamples" type="button"></button>',
    '<button id="igor8Explore" type="button"></button>',
    '<button id="igor8Reset" type="button"></button></div>',
    '<p id="igor8MoveFeedback" role="status" aria-live="polite"></p>',
    '<label class="igor8-dim" for="igor8Note" id="igor8NoteLabel"></label>',
    '<textarea id="igor8Note" maxlength="1200"></textarea>',
    '<div class="igor8-actions"><button type="button" id="igor8SaveNote"></button>',
    '<button type="button" id="igor8Done"></button></div>',
    '<p id="igor8Progress" class="igor8-dim"></p>',
    '<details class="igor8-pdf" id="igor8Pdf"><summary id="igor8PdfLabel"></summary>',
    '<p class="igor8-dim" id="igor8PdfHint"></p>',
    '<div class="igor8-pdf-tools">',
    '<input id="igor8File" type="file" accept="application/pdf,.pdf" aria-label="Choose your PDF">',
    '<label for="igor8PdfPage" class="igor8-dim" id="igor8PageLabel"></label>',
    '<input id="igor8PdfPage" type="number" min="1" max="2000" value="13">',
    '<button id="igor8PdfGo" type="button"></button>',
    '<a id="igor8PdfNew" target="_blank" rel="noopener" hidden></a></div>',
    '<p id="igor8PdfEmpty" class="igor8-dim"></p>',
    '<iframe id="igor8PdfFrame" title="Original book PDF" loading="lazy" hidden></iframe>',
    '</details>'
  ].join("");
  panel.insertBefore(root,panel.querySelector("#igorTask"));
  const choose=el("igor8Chapter");
  chapters.forEach(c=>{const option=document.createElement("option");option.value=String(c.id);option.textContent=c.title;choose.appendChild(option);});
  choose.addEventListener("change",()=>{const c=chapters[Number(choose.value)-1];if(c)api.jump(8,state.mode==="solve"?c.examplesEnd+1:c.from);});
  el("igor8Read").addEventListener("click",()=>setMode("read"));
  el("igor8Solve").addEventListener("click",()=>setMode("solve"));
  el("igor8GoChallenges").addEventListener("click",()=>{const c=chapters[state.chapter-1];state.mode="solve";persist();api.jump(8,c.examplesEnd+1);});
  el("igor8GoExamples").addEventListener("click",()=>{const c=chapters[state.chapter-1];state.mode="read";persist();api.jump(8,c.from);});
  el("igor8Explore").addEventListener("click",()=>{state.explore=!state.explore;renderCurrent();});
  el("igor8Reset").addEventListener("click",()=>api.jump(8,state.currentId));
  el("igor8Note").addEventListener("input",e=>{if(!state.currentId)return;state.notes[state.currentId]=e.target.value;persist();});
  el("igor8SaveNote").addEventListener("click",()=>{persist();setText("igor8MoveFeedback",t("saved"));});
  el("igor8Done").addEventListener("click",()=>{state.done[state.chapter]=true;persist();renderCurrent();});
  el("igor8File").addEventListener("change",e=>{
    const file=e.target.files?.[0];
    if(!file||(!/\.pdf$/i.test(file.name)&&file.type!=="application/pdf"))return;
    if(state.pdfUrl)URL.revokeObjectURL(state.pdfUrl);
    state.pdfUrl=URL.createObjectURL(file);
    showPdf(el("igor8PdfPage").value);
    setText("igor8PdfEmpty","");
  });
  el("igor8PdfGo").addEventListener("click",()=>showPdf(el("igor8PdfPage").value));
  el("igor8Pdf").addEventListener("toggle",()=>{if(el("igor8Pdf").open&&state.pdfUrl)showPdf(el("igor8PdfPage").value);});
  document.getElementById("simpleLang")?.addEventListener("change",()=>renderCurrent());
}
function setMode(mode){
  state.mode=mode==="solve"?"solve":"read";
  state.explore=false;state.scoreMessage="";
  persist();
  const m=meta(state.currentId||1);
  if(state.mode==="solve"&&m.role==="example"&&state.api){state.api.jump(8,m.firstExercise);return;}
  if(state.api&&state.currentId){state.api.jump(8,state.currentId);return;}
  renderCurrent();
}
function renderCurrent(){
  if(!state.panel||!state.currentId)return;
  const p=state.api.getProblem();
  render({book:8,p});
}
function render({book,p}){
  if(!state.panel)return;
  const root=el("igor8Reader");
  root.hidden=book!==8;
  if(book!==8)return;
  syncLanguage();
  if(!p){setText("igor8Title",t("heading"));return;}
  const id=Number(p.id),m=meta(id),c=chapters[m.chapter-1];
  state.currentId=id;state.chapter=c.id;
  if(m.role==="example"&&state.mode==="solve"){state.mode="read";persist();}
  if(!state.seen[id]){state.seen[id]=true;persist();}
  if(state.loadedNoteId!==id){el("igor8Note").value=state.notes[id]||"";state.loadedNoteId=id;state.scoreMessage="";state.explore=false;}
  if(state.openChapter!==c.id){el("igor8Summary").open=true;state.openChapter=c.id;}
  el("igor8Chapter").value=String(c.id);
  setText("igor8Title",t("heading"));
  setText("igor8ChapterLabel",t("chapter"));
  setText("igor8Read",t("read"));
  setText("igor8Solve",t("solve"));
  el("igor8Read").setAttribute("aria-pressed",String(state.mode==="read"));
  el("igor8Solve").setAttribute("aria-pressed",String(state.mode==="solve"));
  setText("igor8SummaryLabel",t("chapterSummary"));
  setText("igor8SummaryBody",c.summary[state.lang]||c.summary.tr);
  const nr=m.role==="example"?id-c.from+1:id-c.examplesEnd;
  const count=m.role==="example"?c.examplesEnd-c.from+1:c.to-c.examplesEnd;
  const role=m.role==="example"?t("example"):t("challenge");
  setText("igor8Location",role+" "+nr+"/"+count+" · #"+id+" · "+t("page")+" "+(p.page||"?")+(p.section?" · "+p.section:""));
  setText("igor8Guide",m.role==="example"?t("exampleText"):t("challengeText"));
  setText("igor8Trust",m.shatranj?t("shatranj"):!p.fen?t("unknown"):!p.sideVerified?t("notReady"):t("notVerified"));
  const ex=el("igor8Explore"),reset=el("igor8Reset");
  const canExplore=!!p.fen&&!!p.sideVerified&&!m.shatranj;
  ex.hidden=!canExplore||state.mode==="solve";
  ex.textContent=state.explore?t("stopExplore"):t("explore");
  reset.hidden=!canExplore;
  reset.textContent=t("reset");
  el("igor8GoChallenges").textContent=t("goToExercises");
  el("igor8GoExamples").textContent=t("goToExamples");
  el("igor8GoChallenges").hidden=state.mode==="solve";
  el("igor8GoExamples").hidden=state.mode==="read";
  el("igor8Explore").disabled=!canExplore;
  setText("igor8MoveFeedback",state.scoreMessage);
  setText("igor8NoteLabel",t("thinking"));
  el("igor8Note").placeholder=t("reflect");
  setText("igor8SaveNote",t("save"));
  setText("igor8Done",state.done[c.id]?t("done"):t("finish"));
  const seenCount=Object.keys(state.seen).filter(n=>Number(n)>=c.from&&Number(n)<=c.to).length;
  setText("igor8Progress",t("viewed")+": "+seenCount+"/"+(c.to-c.from+1)+" · "+t("noAuto"));
  setText("igor8PdfLabel",t("pdf"));
  setText("igor8PdfHint",t("pdfExplanation"));
  setText("igor8PageLabel",t("bookPage"));
  setText("igor8PdfGo",t("seek"));
  setText("igor8PdfNew",t("openNew"));
  setText("igor8PdfEmpty",state.pdfUrl?"":t("pdfUnavailable"));
  el("igor8PdfPage").value=String(p.page||1);
  if(state.pdfUrl&&el("igor8Pdf").open)showPdf(p.page||1);
}
function navTarget(direction,book,current){
  if(book!==8)return null;
  let id=current+direction;
  while(id>=1&&id<=1043){
    if(state.mode==="read"||meta(id).role==="challenge")return id;
    id+=direction;
  }
  return null;
}
function canMove(p){
  if(!p||p.book!==8)return true;
  if(!p.fen||!p.sideVerified||p.shatranj)return false;
  return state.mode==="solve"||state.explore;
}
function blockedMessage(p){
  if(!p?.fen)return t("unknown");
  if(p.shatranj)return t("shatranj");
  if(!p.sideVerified)return t("notReady");
  return t("explore");
}
function onMove({check,mate,capture}){
  state.scoreMessage=mate?t("mate"):check?t("check"):capture?t("capture"):t("neutral");
  setText("igor8MoveFeedback",state.scoreMessage);
}
function onExit(){state.explore=false;state.scoreMessage="";}
window.IgorReading={meta,mount,render,navTarget,canMove,blockedMessage,onMove,onExit,setMode,chapters};
})();