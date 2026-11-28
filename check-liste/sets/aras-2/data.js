/* Aras 2 · v1.40.0 · Symmetrie / Seiten 74–75.
 * Quelle: Nutzerfoto. 24 Aufgaben-Karten; Skizzen als neue SVG-Zeichnungen.
 * Bei der komplexen Mosaikvorlage zu Aufgabe 11 ist die SVG nur schematisch.
 */
(function(){
'use strict';
const Q=[],F={},U=s=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
const T=(x,y,t,size=18)=>'<text x="'+x+'" y="'+y+'" font-family="Arial" font-size="'+size+'" fill="#344b3b">'+t+'</text>';
const L=(x,y,a,b,color='#657a6b',width=2)=>'<path d="M'+x+' '+y+'L'+a+' '+b+'" stroke="'+color+'" stroke-width="'+width+'" fill="none"/>';
const P=(points,fill)=>'<polygon points="'+points+'" fill="'+fill+'" stroke="#506958" stroke-width="2"/>';
const wrap=(body)=>U('<svg xmlns="http://www.w3.org/2000/svg" width="860" height="450" viewBox="0 0 860 450"><rect width="860" height="450" fill="white"/>'+body+'</svg>');
function grid(x,y,nx,ny,step=20){
 let s='';for(let i=0;i<=nx;i++)s+=L(x+i*step,y,x+i*step,y+ny*step,'#dfe8e0',1);
 for(let j=0;j<=ny;j++)s+=L(x,y+j*step,x+nx*step,y+j*step,'#dfe8e0',1);return s;
}
// Fig. 1 — six dice-like dot patterns in green squares.
{
 const dots=[[[3,3]],[[3,1],[3,5]],[[1,3],[3,3],[5,3]],
 [[0,6],[2,4],[3,3],[4,2],[6,0]],[[3,0],[1,3],[3,3],[5,3],[3,6]],
 [[1,1],[5,1],[2,3],[4,3],[1,5],[5,5]]];
 let s=T(25,35,'Fig. 1 · Symmetrieachsen von Würfelbildern',22);
 for(let k=0;k<6;k++){
  const x=24+k*140,y=90,step=18;
  s+='<rect x="'+x+'" y="'+y+'" width="122" height="122" fill="#e4efd8" stroke="#8ca38b"/>'+grid(x,y,6,6,20)+T(x+4,y+21,'('+(k+1)+')',15);
  for(const [a,b] of dots[k])s+='<circle cx="'+(x+8+a*17.5)+'" cy="'+(y+8+b*17.5)+'" r="4.8" fill="#40544b"/>';
 }
 F.dice=wrap(s);
}
// Fig. for 9 — coordinate board with colored obstacles, approximate reconstruction.
{
 const X=x=>70+x*25,Y=y=>396-y*39;
 let s=T(28,30,'Koordinatenfeld · Start → Ziel',22);
 for(let x=0;x<=28;x++)s+=L(X(x),Y(0),X(x),Y(7),'#d9e4dc',1);
 for(let y=0;y<=7;y++)s+=L(X(0),Y(y),X(28),Y(y),'#d9e4dc',1);
 for(let x=0;x<=28;x+=2)s+=T(X(x)-6,Y(0)+23,String(x),14);
 for(let y=0;y<=6;y+=2)s+=T(42,Y(y)+6,String(y),14);
 const point=(pairs,color)=>P(pairs.map(p=>X(p[0])+','+Y(p[1])).join(' '),color);
 s+=point([[1.5,2.5],[3.5,2.5],[3.5,5],[1.5,5]],'#94c8e4');
 s+=point([[4,.3],[6,2],[8,2],[6,.3]],'#f5d276');
 s+=point([[5.5,5.5],[8.6,5.5],[7,3.5]],'#b1d28c');
 s+=point([[10,2],[11,6],[12,2]],'#f0bb7e');
 s+=point([[14.2,5.5],[17,5.5],[14.2,4.1]],'#b8d394');
 s+='<circle cx="'+X(16)+'" cy="'+Y(2)+'" r="44" fill="#f5d47b" stroke="#516656" stroke-width="2"/>';
 s+=point([[19.8,1.8],[23.3,1.8],[23.3,2.5],[19.8,2.5]],'#9cccdd');
 s+=point([[20,4],[18.5,6.9],[22,6.9]],'#edbd82');
 s+=point([[24.4,3],[27,4.9],[27,1.8]],'#f5d47b');
 s+=T(4,Y(3)+5,'Start',15)+T(X(28)+8,Y(3)+5,'Ziel',15);
 F.path=wrap(s);
}
// Fig. 2 — two line pieces g, h.
{
 let s=T(32,32,'Fig. 2 · Gerade g und h',22)+grid(95,70,33,17,20);
 s+=L(155,86,755,276,'#536657',3)+L(165,116,250,408,'#536657',3);
 s+=T(758,288,'g',22)+T(255,410,'h',22);
 F.lines=wrap(s);
}
// Aufgabe 11 — abstract mosaic diagram; reference photo needed for exact erroneous cells.
{
 let s=T(22,31,'Aufgabe 11 · Punktspiegelung um Z (schematische Darstellung)',20)+grid(20,60,41,19,20);
 for(const cx of [225,640]){
  s+=P([cx+',90',(cx+145)+',235',cx+',380',(cx-145)+',235'].join(' '),'#f4d781');
  for(let k=-4;k<=4;k++){const span=145-29*Math.abs(k),y=235+29*k;
   if(span>=0)s+=L(cx-span,y,cx+span,y,'#729bad',1.5);
  }
  for(let k=-4;k<=4;k++){const span=145-29*Math.abs(k),x=cx+29*k;
   if(span>=0)s+=L(x,235-span,x,235+span,'#729bad',1.5);
  }
  for(const [dx,dy] of [[-44,-62],[43,-89],[-91,5],[60,45],[-25,75]]){
   s+=P([(cx+dx)+','+(235+dy),(cx+dx+26)+','+(235+dy),(cx+dx+26)+','+(235+dy+26)].join(' '),'#a5cfe3');
  }
 }
 s+='<circle cx="432" cy="235" r="4" fill="#bb5555"/>'+T(438,230,'Z',20);
 F.mosaic=wrap(s);
}
// Aufgabe 14a and 14b — original partial figures and axes (simplified grids).
for(const variant of ['a','b']){
 let s=T(20,30,'Aufgabe 14'+variant+' · Achsenspiegelung g / h',22)+grid(28,56,39,19,20);
 if(variant==='a'){
  s+=L(230,55,230,438,'#44564c',3)+L(285,440,651,69,'#44564c',3);
  s+=T(240,76,'g',20)+T(661,76,'h',20);
  s+=P('230,153 310,153 310,172 230,172','#95c8e0');
  s+=P('230,231 276,188 315,231 315,258 276,222 230,259','#95c8e0');
 }else{
  s+=L(518,56,518,438,'#44564c',3)+L(353,438,742,56,'#44564c',3);
  s+=T(528,76,'g',20)+T(748,76,'h',20);
  s+=P('438,152 519,152 519,213 499,213 499,174 459,174 459,213 438,213','#95c8e0');
 }
 F['mirror'+variant]=wrap(s);
}
function add(page,n,part,german,turkish,fig){
 const q={id:'aras2-p'+page+'-q'+n+(part?'-'+part:''),page,exercise:String(n),
  number:String(n)+(part?' '+part:''),german,turkish,kind:'exercise',star:false,plus:false};
 if(fig)q.figureImage=F[fig];Q.push(q);
}
add(74,6,'a','Zeichne die Gerade g durch A(0|3) und B(3|0) in einem Koordinatensystem.','Koordinat sisteminde A(0|3) ile B(3|0) üzerinden geçen g doğrusunu çiz.');
add(74,6,'b','Ein Punkt C hat y=5. Wähle x so, dass die Gerade h durch A und C senkrecht auf g steht.','C noktasının y koordinatı 5. A ve C’den geçen h doğrusu g’ye dik olsun. C’nin x koordinatını seç.');
add(74,6,'c','Bestimme den Abstand des Punktes C von der Geraden g.','C noktasının g doğrusuna uzaklığını bul.');
add(74,6,'d','Zeichne durch C eine Parallele p zur Geraden g.','C noktasından g’ye paralel bir p doğrusu çiz.');
add(74,7,'','Ordne die Würfelbilder nach der Anzahl ihrer Symmetrieachsen. Zeichne für die Zahlen 1 bis 6 Würfelbilder mit 1, 2 oder 4 Symmetrieachsen.','Zar yüzlerini simetri ekseni sayılarına göre sırala. 1–6 için 1, 2 veya 4 simetri ekseni olan zar yüzleri oluştur.','dice');
const q8='Wer bin ich? Welche besondere geometrische Figur ist gemeint?\n',t8='Ben kimim? Hangi özel geometrik şekil?\n';
add(74,8,'a',q8+'Drei Ecken, drei Seiten und eine Symmetrieachse.',t8+'Üç köşe, üç kenar ve bir simetri ekseni.');
add(74,8,'b',q8+'Drei Ecken, drei Seiten und drei Symmetrieachsen.',t8+'Üç köşe, üç kenar ve üç simetri ekseni.');
add(74,8,'c',q8+'Ein Viereck, dessen gegenüberliegende Seiten jeweils parallel sind.',t8+'Karşılıklı kenarları birbirine paralel olan bir dörtgen.');
add(74,8,'d',q8+'Alle benachbarten Seiten stehen senkrecht aufeinander.',t8+'Bütün komşu kenarlar birbirine diktir.');
add(74,8,'e',q8+'Die Diagonalen stehen senkrecht aufeinander und sind gleich lang.',t8+'Köşegenleri birbirine dik ve uzunlukları eşittir.');
add(74,9,'','Suche einen Streckenzug vom Start zum Ziel. Außer Start und Ziel darf er den Spielfeldrand oder die Figuren nicht berühren. Alle Streckenendpunkte brauchen ganzzahlige Koordinaten. Finde einen Weg mit möglichst wenigen Punkten und gib ihre Koordinaten an.','Başlangıçtan hedefe bir yol bul. Başlangıç ve bitiş dışında yol, oyun alanının kenarına veya şekillere dokunmasın. Doğru parçalarının uçları tam sayı koordinatlı olsun. En az noktayı kullan ve koordinatları yaz.','path');
add(74,10,'a','Übertrage die Geradenstücke g und h aus Fig. 2. Zeichne eine Symmetrieachse s, sodass die Figur bezüglich s achsensymmetrisch ist.','Şekil 2’deki g ve h doğru parçalarını aktar. Şeklin s eksenine göre eksen simetrili olacağı bir s simetri ekseni çiz.','lines');
add(74,10,'b','Wähle einen Punkt Z auf s und ergänze die Figur so, dass sie punktsymmetrisch zu Z ist.','s üzerinde bir Z noktası seç. Şekli Z merkezine göre nokta simetrili olacak biçimde tamamla.','lines');
add(75,11,'','Claudia wollte die linke Figur am Punkt Z spiegeln. In der rechten Figur sind drei Quadrate falsch gefärbt. Benenne sie und führe die Punktspiegelung korrekt durch. Für die genaue Farbanordnung gilt die Buchvorlage.','Claudia soldaki şekli Z merkezine göre yansıtmak istemiş. Sağdaki şeklin üç karesinin rengi yanlış. Bunları belirle ve doğru nokta simetrisini çiz. Renklerin kesin konumu için gönderilen kitap görselini esas al.','mosaic');
add(75,12,'','Paula meint: Drei verschiedene Geraden ergeben genau drei Schnittpunkte, vier verschiedene Geraden genau vier. Stimmt das? Experimentiere und erkläre.','Paula, üç farklı doğrunun tam üç, dört farklı doğrunun tam dört kesişim noktası oluşturduğunu söylüyor. Doğru mu? Deneyerek açıkla.');
const g13='Welche besonderen Vierecke kann man durch einen einzigen geraden Schnitt gewinnen? Begründe mit Skizzen.\n',t13='Tek bir düz kesimle hangi özel dörtgenler elde edilebilir? Eskizle gerekçelendir.\n';
add(75,13,'a',g13+'Schneide ein Stück von einem regelmäßigen Sechseck ab.',t13+'Düzgün altıgenden bir parça kes.');
add(75,13,'b',g13+'Untersuche ein gleichseitiges Dreieck, ein Quadrat und ein Fünfeck mit fünf gleich langen Seiten.',t13+'Eşkenar üçgeni, kareyi ve beş kenarı eşit olan beşgeni incele.');
add(75,13,'c','Stelle deine Ergebnisse übersichtlich im Heft dar.','Sonuçlarını defterinde düzenli şekilde göster.');
add(75,14,'a','Übertrage die Figur a) ins Heft und ergänze sie so, dass Symmetrie an den Achsen g und h entsteht.','a) şeklini defterine aktar ve g ile h simetri eksenlerine göre tamamla.','mirrora');
add(75,14,'b','Übertrage die Figur b) ins Heft und ergänze sie so, dass Symmetrie an den Achsen g und h entsteht.','b) şeklini defterine aktar ve g ile h simetri eksenlerine göre tamamla.','mirrorb');
const g15='Gilt immer, nie oder nur unter bestimmten Bedingungen? Begründe.\n',t15='Her zaman mı, hiçbir zaman mı, yoksa belirli koşullarda mı doğru? Gerekçelendir.\n';
add(75,15,'a',g15+'Ein Dreieck kann nicht gleichseitig und rechtwinklig sein.',t15+'Bir üçgen hem eşkenar hem de dik açılı olamaz.');
add(75,15,'b',g15+'Spiegelt man ein Viereck an einer seiner Seiten, erhält man wieder ein Viereck.',t15+'Bir dörtgen kenarlarından birine göre yansıtılırsa yine bir dörtgen elde edilir.');
add(75,15,'c',g15+'Spiegelt man ein gleichseitiges Dreieck an einer seiner Seiten, erhält man eine Raute.',t15+'Bir eşkenar üçgeni kenarlarından birine göre yansıtınca eşkenar dörtgen elde edilir.');
add(75,15,'d',g15+'Zu zwei parallelen Geraden g und h gibt es eine Gerade a mit gleichem Abstand zu g und h.',t15+'İki paralel g ve h doğrusuna eşit uzaklıkta bir a doğrusu vardır.');
if(Q.length!==24||new Set(Q.map(q=>q.id)).size!==24)throw Error('Expected 24 unique questions');
if(Q.filter(q=>q.figureImage).length!==7)throw Error('Expected 7 redraw cards');
if(Q.some(q=>!q.german||!q.turkish))throw Error('Question text incomplete');
window.CHECKLIST_PACK={
 id:'aras-2-symmetrie-pages74-75-2026',
 title:'Aras 2 · Symmetrie · Wiederholen – Vertiefen – Vernetzen · S. 74–75',
 hideSolutions:true,
 questions:Q,
 info:{source:'Kullanıcının gönderdiği 74–75. sayfa fotoğrafı',
 note:'Çizimler fotoğraftaki şekillerin sadeleştirilmiş yeniden çizimleridir. Özellikle 11. sorunun renkleri için orijinal görseli kullanın.'}
};
})();