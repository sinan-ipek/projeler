/* Çınar 1 · v1.39.0 · Seite 30 · Aufgaben 19–26 und Wortliste.
 * Quelle: vom Nutzer bereitgestelltes Foto der Buchseite.
 * 29 Teilaufgaben + 11 Wortkarten; Fragen zweisprachig, Antworten Türkisch.
 * Die Skizze zu Aufgabe 20 ist neu als SVG gezeichnet, kein Buchfoto.
 */
(function(){
'use strict';
const Q=[];
const uri=svg=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(svg);
function quadrilateral(){
 const W=860,H=436,O={x:433,y:318},u=49;
 const X=x=>O.x+x*u,Y=y=>O.y-y*u;
 const vertices={A:[-4,2],B:[6,0],C:[4,2],D:[6,4]};
 let svg='<svg xmlns="http://www.w3.org/2000/svg" width="'+W+'" height="'+H+'" viewBox="0 0 '+W+' '+H+'"><rect width="'+W+'" height="'+H+'" fill="#fff"/>';
 for(let x=-7;x<=7;x++)svg+='<path d="M'+X(x)+' '+Y(-1)+'V'+Y(5)+'" stroke="'+(x===0?'#536358':'#dbe3dc')+'" stroke-width="'+(x===0?2.1:1)+'"/>';
 for(let y=-1;y<=5;y++)svg+='<path d="M'+X(-7)+' '+Y(y)+'H'+X(7)+'" stroke="'+(y===0?'#536358':'#dbe3dc')+'" stroke-width="'+(y===0?2.1:1)+'"/>';
 svg+='<path d="M'+X(7)+' '+Y(0)+'l-11 -5 0 10Z M'+X(0)+' '+Y(5)+'l-5 11 10 0Z" fill="#536358"/>';
 for(let x=-6;x<=6;x+=2)svg+='<text x="'+(X(x)-7)+'" y="'+(Y(0)+23)+'" font-family="Arial" font-size="17" fill="#4c5d50">'+x+'</text>';
 for(let y=2;y<=4;y+=2)svg+='<text x="'+(X(0)+10)+'" y="'+(Y(y)-5)+'" font-family="Arial" font-size="17" fill="#4c5d50">'+y+'</text>';
 const sequence=['A','B','C','D'].map(k=>vertices[k].map((v,i)=>(i?Y(v):X(v))).join(',')).join(' ');
 svg+='<polygon points="'+sequence+'" fill="#f7d65c" fill-opacity=".86" stroke="#475e4e" stroke-width="3"/>';
 for(const [name,[x,y]] of Object.entries(vertices)){
  const dx=name==='A'?-22:12,dy=name==='B'?4:name==='D'?-11:-8;
  svg+='<text x="'+(X(x)+dx)+'" y="'+(Y(y)+dy)+'" font-family="Arial" font-size="22" fill="#253e2d">'+name+'</text>';
 }
 svg+='<text x="'+(X(7)+15)+'" y="'+(Y(0)+6)+'" font-family="Arial" font-size="20">x</text><text x="'+(X(0)+13)+'" y="'+(Y(5)-9)+'" font-family="Arial" font-size="20">y</text>';
 svg+='<text x="32" y="412" font-family="Arial" font-size="17" fill="#587062">A(−4|2) · B(6|0) · C(4|2) · D(6|4)</text></svg>';
 return uri(svg);
}
const DIAGRAM20=quadrilateral();
function add(n,part,german,turkish,solution,figure){
 const token=String(part||'').toLowerCase().replace(/[^a-z0-9]/g,'');
 const q={
  id:'cinar1-p30-q'+n+(token?'-'+token:''),
  page:30,exercise:String(n),number:String(n)+(part||''),
  german,turkish,solution,kind:'exercise',star:false,plus:false
 };
 if(figure)q.figureImage=figure;
 Q.push(q);
}
// 19 · Finde den Fehler! − Fehler erkennen, erklären und richtig rechnen.
const wrong=(expr)=>'Finde den Fehler und korrigiere das Ergebnis:\n'+expr;
const yanlis=(expr)=>'Hatanın nedenini bul ve doğru sonucu hesapla:\n'+expr;
add(19,'a',wrong('−0,8 · (−0,2) = 0,4'),yanlis('−0,8 · (−0,2) = 0,4'),
 'İki negatif sayının çarpımı pozitiftir. Ondalık basamaklar yanlış hesaplanmış.\nDoğrusu: (−0,8)·(−0,2)=0,16.');
add(19,'b',wrong('−8 : (−0,8) = −10'),yanlis('−8 : (−0,8) = −10'),
 'Negatif sayı negatif sayıya bölünürse sonuç pozitiftir.\nDoğrusu: (−8):(−0,8)=10.');
add(19,'c',wrong('(−0,3)² = −0,6'),yanlis('(−0,3)² = −0,6'),
 'Karesini almak sayıyı kendisiyle çarpmaktır, ikiyle çarpmak değildir.\nDoğrusu: (−0,3)²=0,09.');
add(19,'d',wrong('−(3/5)² = 3/5'),yanlis('−(3/5)² = 3/5'),
 'Kuvvetin önündeki eksi işareti korunur. Pay ve paydanın ikisi de kareye alınır.\nDoğrusu: −(3/5)²=−9/25.');
add(19,'e',wrong('−2 1/2 · (−2 1/3) = −4 1/6'),yanlis('−2 1/2 · (−2 1/3) = −4 1/6'),
 'İki negatifin çarpımı pozitiftir. Tam sayılı kesirleri bileşik kesre çevir.\n(−5/2)·(−7/3)=35/6=5 5/6.');
add(19,'f',wrong('−3,5 : (−0,2) = −3,5 · (1/2) = −1,75'),yanlis('−3,5 : (−0,2) = −3,5 · (1/2) = −1,75'),
 'Bölerken bölenin tersini kullan: −0,2=−1/5 olduğundan tersi −5’tir.\n(−3,5):(−0,2)=(−3,5)·(−5)=17,5.');
// 20 · Vier Eckpunkte, geometrische Transformationen.
const axes='Verändere das Viereck ABCD wie angegeben und zeichne die neuen Punkte. Maßstab: 2 Einheiten = 1 cm.\n';
const eksen='ABCD dörtgeninin köşe koordinatlarını belirtilen şekilde değiştir ve yeni şekli çiz. Ölçek: 2 birim = 1 cm.\n';
add(20,'a',axes+'Multipliziere nur die x-Koordinaten mit −1.',eksen+'Yalnızca x koordinatlarını −1 ile çarp.',
 'x değerlerinin işaretini değiştir, y sabit kalır. Y eksenine göre yansıma.\nA′(4|2), B′(−6|0), C′(−4|2), D′(−6|4).',DIAGRAM20);
add(20,'b',axes+'Multipliziere nur die y-Koordinaten mit −2.',eksen+'Yalnızca y koordinatlarını −2 ile çarp.',
 'x değerleri değişmez. y değerleri hem yön değiştirir hem iki katına çıkar.\nA′(−4|−4), B′(6|0), C′(4|−4), D′(6|−8).',DIAGRAM20);
add(20,'c',axes+'Multipliziere beide Koordinaten mit −3.',eksen+'Her noktanın iki koordinatını da −3 ile çarp.',
 'Her x ve y değeri −3 ile çarpılır: orijine göre ters yön ve 3 kat büyütme.\nA′(12|−6), B′(−18|0), C′(−12|−6), D′(−18|−12).',DIAGRAM20);
// 21 · Im Kopf rechnen.
add(21,'a','Berechne im Kopf:\n(−0,3)³','Zihinden hesapla:\n(−0,3)³',
 'Negatif sayının tek kuvveti negatiftir.\n(−0,3)³=−0,027.');
add(21,'b','Berechne im Kopf:\n8/5 · (−25/8)','Zihinden hesapla:\n8/5 · (−25/8)',
 '8’ler sadeleşir: −25/5=−5.');
add(21,'c','Berechne im Kopf:\n−1,2 · 0,5','Zihinden hesapla:\n−1,2 · 0,5',
 'Yarısı alınır: −1,2·0,5=−0,6.');
add(21,'d','Berechne im Kopf:\n−1/3 : (−1/9)','Zihinden hesapla:\n−1/3 : (−1/9)',
 '(−1/3)·(−9)=3.');
// 22 · Überschlag und geschicktes Rechnen.
const estimate='Überschlage zuerst. Berechne danach geschickt:\n';
const estimateDe='Überschlage zuerst und berechne dann geschickt:\n';
add(22,'a',estimateDe+'−5/9 · 0,88 · 9/4',estimate+'−5/9 · 0,88 · 9/4',
 '9’lar sadeleşir: −(5·0,88)/4=−4,4/4=−1,1.');
add(22,'b',estimateDe+'2,8 · 3/2 : (−3,2)',estimate+'2,8 · 3/2 : (−3,2)',
 '2,8·1,5=4,2. 4,2:(−3,2)=−1,3125.');
add(22,'c',estimateDe+'−2,7 · (−4,5) : (−9/10)',estimate+'−2,7 · (−4,5) : (−9/10)',
 '(−2,7)·(−4,5)=12,15. 12,15:(−0,9)=−13,5.');
add(22,'d',estimateDe+'−8/5 · (−0,77) · (−5/7)',estimate+'−8/5 · (−0,77) · (−5/7)',
 'Üç negatif çarpan sonucu negatif yapar.\n8/5·77/100·5/7=88/100.\nSonuç: −0,88.');
// 23 · Immer, nie oder manchmal — Zahlen ungleich 0.
const verdictDe='Gilt immer, nie oder nur manchmal? Begründe (alle Zahlen sind ungleich 0):\n';
const verdictTr='Her zaman mı, hiçbir zaman mı, yoksa bazen mi doğru? Nedenini açıkla (sayılar sıfır değil):\n';
add(23,'a',verdictDe+'Bei einem Produkt mit mehr negativen als positiven Faktoren ist das Ergebnis negativ.',verdictTr+'Bir çarpımda negatif çarpan sayısı pozitif çarpan sayısından fazlaysa sonuç negatiftir.',
 'BAZEN. Sonucun işareti negatif çarpanların sayısının tek/çift olmasına bağlıdır.\n(−2)·(−3)=6 ama (−2)·(−3)·(−4)=−24.');
add(23,'b',verdictDe+'Der Quotient ist kleiner als der Dividend.',verdictTr+'Bölme işleminin sonucu bölünenden küçüktür.',
 'BAZEN. 10:2=5 (küçük), ama 10:0,5=20 (büyük).');
add(23,'c',verdictDe+'Das Produkt zweier ganzer Zahlen liegt rechts vom größeren Faktor.',verdictTr+'İki tam sayının çarpımı sayı doğrusunda büyük olan çarpanın sağındadır.',
 'BAZEN. 2·3=6, 3’ün sağındadır. Ama 1·3=3, 3 ile aynıdır. (−2)·3=−6 ise 3’ün solundadır.');
add(23,'d',verdictDe+'Wenn das Produkt einem Faktor entspricht, wurde mit 1 multipliziert.',verdictTr+'Çarpım çarpanlardan birine eşitse diğer çarpan 1’dir.',
 'HER ZAMAN (sıfır olmayan sayılarda). a·b=a ve a≠0 ise iki tarafı a’ya böl: b=1.');
add(23,'e',verdictDe+'Eine Divisionsaufgabe kann als Multiplikationsaufgabe geschrieben werden.',verdictTr+'Bölme işlemi çarpma biçiminde yazılabilir.',
 'HER ZAMAN (bölen sıfır değilse). Bölenin çarpmaya göre tersiyle çarpılır.\nÖrnek: 8:4=8·(1/4)=2.');
// 24 · Betrag und unbekannte Zahl.
const absDe='Welche Zahl kann im Kästchen stehen? Prüfe deine Lösung:\n';
const absTr='Kutudaki sayı ne olabilir? Yerine koyup kontrol et:\n';
add(24,'a',absDe+'|□ : (−3/7)| = 1,5',absTr+'|□ : (−3/7)| = 1,5',
 'Mutlak değerde iki işaret de mümkündür.\n|□|=1,5·(3/7)=9/14.\nKutudaki sayı: +9/14 veya −9/14.');
add(24,'b',absDe+'|□ · (−9)| = |−3/4|',absTr+'|□ · (−9)| = |−3/4|',
 '9·|□|=3/4 ⇒ |□|=1/12.\nKutudaki sayı: +1/12 veya −1/12.');
add(24,'c',absDe+'|□ : (−0,4)| = |−5/4|',absTr+'|□ : (−0,4)| = |−5/4|',
 '|□|/0,4=1,25 ⇒ |□|=0,5.\nKutudaki sayı: +0,5 veya −0,5.');
// 25 · Gleichungen überprüfen und begründen.
const eqDe='Prüfe die behauptete Gleichheit mit Beispielen und begründe:\n';
const eqTr='Verilen eşitlikleri örneklerle denetle ve neden doğru/yanlış olduğunu açıkla:\n';
add(25,'A',eqDe+'−a/b = (−a)/b = a/(−b) = (−a)/(−b)  (b ≠ 0)',eqTr+'−a/b = (−a)/b = a/(−b) = (−a)/(−b)  (b ≠ 0)',
 'İlk üç ifade eşittir: hepsi −a/b. Fakat (−a)/(−b)=a/b olur.\nÖrnek a=2, b=3: −2/3 ≠ +2/3.\nSon eşitlik genel olarak YANLIŞTIR.');
add(25,'B',eqDe+'(−1)² = (−1)⁴ = (−1)⁸',eqTr+'(−1)² = (−1)⁴ = (−1)⁸',
 'DOĞRU. (−1)’in bütün çift kuvvetleri +1’dir.');
add(25,'C',eqDe+'−a · b = (−1)³ · a · b = (−1)³ · (−a) · (−b)',eqTr+'−a · b = (−1)³ · a · b = (−1)³ · (−a) · (−b)',
 'DOĞRU. (−1)³=−1, (−a)·(−b)=ab.\nÜç ifade de −ab değerine eşittir.');
// 26 · Volumen.
add(26,'','Nikolas Zimmer hat eine Grundfläche von 14,36 m² und ist 312 cm hoch. Berechne das Raumvolumen.',
 'Nikola’nın odasının taban alanı 14,36 m², yüksekliği 312 cm. Odanın hacmini hesapla.',
 '312 cm=3,12 m.\nHacim = taban alanı · yükseklik = 14,36·3,12 = 44,8032 m³.\nSonuç: Yaklaşık 44,8 m³.');
// Buchrand-Wortliste: immer NACH der letzten Matheaufgabe.
const words=[
 ['multiplizieren mit','ile çarpmak'],
 ['dividieren durch','-e / -a bölmek'],
 ['der Kehrwert','tersi, çarpmaya göre tersi'],
 ['das Vorzeichen','işaret (+ / −)'],
 ['der Faktor','çarpan'],
 ['das Produkt','çarpım'],
 ['der Quotient','bölüm'],
 ['die Nachkommastelle','ondalık basamak, virgülden sonraki basamak'],
 ['die Potenz','kuvvet, üslü ifade'],
 ['der Exponent','üs'],
 ['die Basis','taban']
];
words.forEach(([term,meaning],i)=>{
 Q.push({
  id:'cinar1-p30-wort-'+String(i+1).padStart(2,'0'),
  page:30,exercise:'Wortliste',number:term,
  german:term,turkish:'?',solution:meaning,
  kind:'vocabulary',star:false,plus:false
 });
});
const expectedMathematics=29,expectedWords=11;
if(Q.length!==expectedMathematics+expectedWords)throw Error('Kart sayısı uyuşmuyor: '+Q.length);
if(Q.filter(q=>q.kind==='vocabulary').length!==expectedWords)throw Error('Wortliste eksik');
if(new Set(Q.map(q=>q.id)).size!==Q.length)throw Error('Tekrarlanan soru kimliği');
if(Q.some(q=>!q.german||!q.turkish||!q.solution))throw Error('Eksik soru, çeviri veya çözüm');
if(Q.filter(q=>q.figureImage).length!==3)throw Error('Koordinat diyagramları eksik');
window.CHECKLIST_PACK={
 id:'cinar-1-page30-2026',
 title:'Çınar 1 · Mathematik · Seite 30 · Aufgaben 19–26 + Wortliste',
 onlySolvedAnswers:true,
 questions:Q
};
})();