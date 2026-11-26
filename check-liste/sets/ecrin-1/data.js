/* Ecrin 1 · v1.37.0 · Zuordnungen mit Formeln · Seiten 55–56.
 * 27 Karten aus zwei vom Nutzer bereitgestellten Buchseiten.
 * Aufgaben in eigenen Worten formuliert; Diagramme neu als SVG gezeichnet.
 * Keine Buchfotos werden öffentlich gespeichert.
 */
(function(){
'use strict';
const Q=[];
function svgGraph(title, lines, xmin, xmax, ymin, ymax){
 const W=740,H=410,L=72,R=657,T=48,B=348;
 const X=x=>L+(x-xmin)*(R-L)/(xmax-xmin);
 const Y=y=>B-(y-ymin)*(B-T)/(ymax-ymin);
 const f=n=>Number(n).toFixed(2);
 let s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+W+' '+H+'" width="'+W+'" height="'+H+'"><rect width="100%" height="100%" fill="white"/>';
 s+='<text x="'+L+'" y="27" font-size="19" font-family="Arial" fill="#274437">'+title+'</text>';
 for(let x=Math.ceil(xmin);x<=xmax;x++){
  s+='<path d="M'+f(X(x))+' '+T+' V'+B+'" stroke="#e5ebe6" stroke-width="1"/>';
  s+='<text x="'+f(X(x))+'" y="'+(B+26)+'" text-anchor="middle" font-size="15" fill="#384d3e" font-family="Arial">'+x+'</text>';
 }
 for(let y=Math.ceil(ymin);y<=ymax;y++){
  s+='<path d="M'+L+' '+f(Y(y))+' H'+R+'" stroke="#e5ebe6" stroke-width="1"/>';
  s+='<text x="'+(L-12)+'" y="'+f(Y(y)+5)+'" text-anchor="end" font-size="15" fill="#384d3e" font-family="Arial">'+y+'</text>';
 }
 s+='<path d="M'+L+' '+B+'H'+(R+8)+' M'+L+' '+B+'V'+(T-8)+'" stroke="#32493b" stroke-width="2.3" fill="none"/>';
 s+='<text x="'+(R+17)+'" y="'+(B+5)+'" font-size="18" font-family="Arial">x</text><text x="'+(L-6)+'" y="'+(T-20)+'" font-size="18" font-family="Arial">y</text>';
 for(const l of lines){
  let d='';
  for(let i=0;i<=150;i++){
   const x=xmin+(xmax-xmin)*i/150,y=l.f(x);
   d+=(i?'L':'M')+f(X(x))+' '+f(Y(y));
  }
  s+='<path d="'+d+'" stroke="'+l.color+'" stroke-width="3.5" fill="none"/>';
  const lx=l.labelX===undefined?xmax:l.labelX;
  const ly=l.f(lx)+(l.labelOffset||0);
  s+='<text x="'+f(X(lx)+7)+'" y="'+f(Y(ly)-8)+'" font-family="Arial" font-size="17" font-weight="bold" fill="'+l.color+'">'+l.label+'</text>';
 }
 s+='</svg>';
 return 'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
}
const IMG={
 fall:svgGraph('Freier Fall: s = 4,905 · t²',[
  {label:'s(t)',labelX:1.82,f:x=>4.905*x*x,color:'#b34d4a'}],0,2,0,20),
 q1:svgGraph('y = x + 2  und  y = 20 − 2x',[
  {label:'x + 2',labelX:8.8,f:x=>x+2,color:'#287aa4'},
  {label:'20 − 2x',labelX:8.8,f:x=>20-2*x,color:'#c56842'}],0,10,0,20),
 q2:svgGraph('Vier Zuordnungen: g1, g2, g3, g4',[
  {label:'g1',labelX:4.75,f:x=>x+1,color:'#308052'},
  {label:'g2',labelX:4.65,labelOffset:.55,f:x=>(10-x)/2,color:'#b04c53'},
  {label:'g3',labelX:4.65,labelOffset:-.35,f:x=>x/2,color:'#347db8'},
  {label:'g4',labelX:4.75,f:x=>5-x,color:'#4e4e4e'}],0,5,0,6),
 q5:svgGraph('y = 3x + 1  und  y = x : 2 + 5',[
  {label:'3x + 1',labelX:2.8,f:x=>3*x+1,color:'#287aa4'},
  {label:'x : 2 + 5',labelX:3.2,f:x=>x/2+5,color:'#bd6546'}],0,5,0,16)
};
function add(page,ex,part,de,tr,sol,fig){
 const id='ecrin1-'+page+'-'+String(ex).replace(/\s+/g,'-')+'-'+String(part||'').replace(/\s+/g,'-');
 const number=(ex==='Beispiel 2'?'Beispiel 2':String(ex))+(part?' '+part:'');
 const q={id,page,exercise:String(ex),number,german:de,turkish:tr,solution:sol,star:false,plus:false,kind:ex==='Beispiel 2'?'beispiel':'exercise'};
 if(fig)q.figureImage=IMG[fig];
 Q.push(q);
}
// Seite 55: Beispiel 2, der Fall vom Zehn-Meter-Brett.
add(55,'Beispiel 2','a',
 'Beim freien Fall gilt s = 4,905 · t² (Meter, Sekunden). Berechne s für t = 0; 0,1; 0,2; …; 2,0 s. Runde auf eine Dezimalstelle.',
 'Serbest düşüşte s = 4,905 · t² (metre, saniye). t = 0; 0,1; 0,2; …; 2,0 saniye için tablo oluştur. Bir ondalık basamağa yuvarla.',
 '1. Her zaman değeri için t² hesaplanır.\n2. Bulunan değer 4,905 ile çarpılır.\n3. Örnek: t=0,5 için s=4,905·0,5²=1,22625≈1,2 m.\n4. t=1,0 için s≈4,9 m; t=1,5 için s≈11,0 m; t=2,0 için s≈19,6 m.\nTablo: t=0;0,1;0,2;0,3;0,4;0,5;0,6;0,7;0,8;0,9;1;1,1;1,2;1,3;1,4;1,5;1,6;1,7;1,8;1,9;2.\ns(m)≈0;0;0,2;0,4;0,8;1,2;1,8;2,4;3,1;4,0;4,9;5,9;7,1;8,3;9,6;11,0;12,6;14,2;15,9;17,7;19,6.');
add(55,'Beispiel 2','b',
 'Trage die Werte aus a) in ein Koordinatensystem ein und zeichne den Fallstrecken-Graphen.',
 'a şıkkındaki değerlerle zaman–yol grafiğini çiz.',
 '1. Yatay eksene zamanı t (s), düşey eksene yolu s (m) yaz.\n2. Noktaları (0|0), (1|4,905), (1,5|11,036), (2|19,62) olarak işaretle.\n3. Noktaları düz çizgiyle değil, yukarı doğru kıvrılan düzgün bir eğriyle birleştir.\nSonuç: s=4,905·t² parabolik bir eğridir.','fall');
add(55,'Beispiel 2','c',
 'Schätze aus der Formel oder dem Graphen, wann 10 m Fallstrecke erreicht sind.',
 '10 metrelik düşüş yoluna yaklaşık kaç saniyede ulaşılır?',
 '1. 10=4,905·t² eşitliğini yaz.\n2. t²=10/4,905≈2,0387.\n3. t≈√2,0387≈1,428.\nSonuç: Yaklaşık 1,43 saniye (1,4 ile 1,5 saniye arasında).','fall');
// Seite 55: Aufgabe 1.
add(55,1,'a (1)',
 'Ergänze die Wertetabelle zu y = x + 2 für x = 0; 1; 2; 3; 4; 5.',
 'y = x + 2 kuralı için x = 0; 1; 2; 3; 4; 5 değerlerinin tablosunu doldur.',
 '1. Formül: y=x+2.\n2. Her x değerine 2 ekle.\nx: 0 | 1 | 2 | 3 | 4 | 5\ny: 2 | 3 | 4 | 5 | 6 | 7.');
add(55,1,'a (2)',
 'Ergänze die Wertetabelle zu y = 20 − 2x für x = 0; 1; 2; 5; 8; 10.',
 'y = 20 − 2x için x = 0; 1; 2; 5; 8; 10 değerlerinde tabloyu doldur.',
 '1. Her x değerini 2 ile çarp.\n2. Sonucu 20’den çıkar.\nx: 0 | 1 | 2 | 5 | 8 | 10\ny: 20 | 18 | 16 | 10 | 4 | 0.');
add(55,1,'b',
 'Zeichne beide Zuordnungen y=x+2 und y=20−2x in dasselbe Koordinatensystem.',
 'İki formülün grafiğini aynı koordinat sisteminde çiz.',
 '1. İlk doğru için (0|2), (1|3), (5|7) noktalarını işaretle.\n2. İkinci doğru için (0|20), (5|10), (10|0) noktalarını işaretle.\n3. Her gruptaki noktaları kendi doğrusu ile birleştir.\nİki grafik de doğrudur; birinci artar, ikinci azalır.','q1');
add(55,1,'c',
 'Lies für x=2,5 die ungefähren y-Werte an beiden Geraden ab. Kontrolliere mit den Formeln.',
 'x=2,5 için her iki doğrudan y değerini oku ve formülle doğrula.',
 '1. İlk formül: y=2,5+2=4,5.\n2. İkinci formül: y=20−2·2,5=20−5=15.\nSonuç: Birinci doğru 4,5; ikinci doğru 15.','q1');
// Seite 55: Aufgabe 2.
const assoc=[
 ['A','y=5−x','3','g4','x=0,1,2,3,4,5 için y=5,4,3,2,1,0.'],
 ['B','y=x:2','1','g3','x=0,1,2,3,4,5 için y=0;0,5;1;1,5;2;2,5.'],
 ['C','y=(10−x):2','4','g2','x=0,1,2,3,4,5 için y=5;4,5;4;3,5;3;2,5.'],
 ['D','y=x+1','2','g1','x=0,1,2,3,4,5 için y=1,2,3,4,5,6.']
];
for(const [letter,formula,table,line,values] of assoc){
 add(55,2,letter,
  'Finde zur Formel '+letter+': '+formula+' die passende gelbe Wertetabelle (1–4) und den Graphen (g1–g4).',
  letter+' formülünü ('+formula+') uygun sarı tablo (1–4) ve grafikle (g1–g4) eşleştir.',
  '1. x=0 ve x=5 için formülden y hesapla.\n2. Tablo değerleri ile karşılaştır.\n3. Aynı başlangıç noktası ve eğime sahip grafiği seç.\n'+values+'\nSonuç: Tablo '+table+', grafik '+line+'.','q2');
}
// Seite 56: Aufgabe 3.
const formulas=[
 ['A','y=2x−1','4','x ikiyle çarpılır, ardından 1 çıkarılır.','Verdopple x, dann ziehe 1 ab.'],
 ['B','y=(x+1)²','5','Önce x’e 1 eklenir, sonra karesi alınır.','Addiere 1 zu x, quadriere dann.'],
 ['C','y=x²+1','1','Önce x’in karesi alınır, sonra 1 eklenir.','Quadriere x, addiere dann 1.'],
 ['D','y=x:2−1','6','Önce x ikiye bölünür, sonra 1 çıkarılır.','Halbiere x, ziehe dann 1 ab.'],
 ['E','y=(x−1):2','3','Önce x’ten 1 çıkarılır, sonra sonuç ikiye bölünür.','Ziehe 1 von x ab, halbiere das Ergebnis.'],
 ['F','y=2·(x+1)','2','Önce x’e 1 eklenir, sonra sonuç ikiyle çarpılır.','Addiere 1 zu x, verdopple das Ergebnis.']
];
for(const [letter,formula,match,explain,deexplain] of formulas){
 add(56,3,letter,
  'Ordne Formel '+letter+' ('+formula+') der passenden Beschreibung 1–6 zu.\n'+
  '1: x²+1  ·  2: 2·(x+1)  ·  3: (x−1):2\n4: 2x−1  ·  5: (x+1)²  ·  6: x:2−1',
  letter+' formülünü ('+formula+') 1–6 numaralı işlem açıklamalarından doğru olanıyla eşleştir.\n'+
  '1: x²+1  ·  2: 2·(x+1)  ·  3: (x−1):2\n4: 2x−1  ·  5: (x+1)²  ·  6: x:2−1',
  '1. İşlemlerin uygulanma sırasına bak.\n2. '+explain+'\n3. Almancası: '+deexplain+'\nSonuç: '+letter+' → '+match+'.');
}
add(56,4,'',
 'Wandle Geschwindigkeitsbegrenzungen 5, 10, 15, …, 70 mph in km/h um. Verwende y=1,6·x und erstelle die Wertetabelle.',
 '5, 10, 15, …, 70 mph hız sınırlarını y=1,6·x kuralıyla km/saate çevir ve tablo yap.',
 '1. Her mph değerini 1,6 ile çarp.\n2. Örnek: 25 mph→25·1,6=40 km/h.\nmph: 5 | 10 | 15 | 20 | 25 | 30 | 35 | 40 | 45 | 50 | 55 | 60 | 65 | 70\nkm/h: 8 | 16 | 24 | 32 | 40 | 48 | 56 | 64 | 72 | 80 | 88 | 96 | 104 | 112.');
add(56,5,'a (1)',
 'Ergänze y=3x+1 für x=0,5; 1; 1,5; 2; 2,5; 3.',
 'y=3x+1 için x=0,5; 1; 1,5; 2; 2,5; 3 tablosunu tamamla.',
 '1. x ile 3’ü çarp ve 1 ekle.\n2. x=0,5 için y=3·0,5+1=2,5.\nx: 0,5 | 1 | 1,5 | 2 | 2,5 | 3\ny: 2,5 | 4 | 5,5 | 7 | 8,5 | 10.');
add(56,5,'a (2)',
 'Ergänze y=x:2+5 für x=0; 1; 2; 3; 4; 5.',
 'y=x:2+5 için x=0; 1; 2; 3; 4; 5 tablosunu tamamla.',
 '1. Her x değerini 2’ye böl, ardından 5 ekle.\n2. x=3 için y=3:2+5=6,5.\nx: 0 | 1 | 2 | 3 | 4 | 5\ny: 5 | 5,5 | 6 | 6,5 | 7 | 7,5.');
add(56,5,'b',
 'Zeichne die Graphen von y=3x+1 und y=x:2+5 gemeinsam. Verbinde die eingetragenen Punkte geeignet.',
 'y=3x+1 ve y=x:2+5 doğrularını aynı koordinat sisteminde çiz ve noktaları uygun biçimde birleştir.',
 '1. y=3x+1 için (0,5|2,5), (1|4), (2|7), (3|10) noktalarını yerleştir.\n2. y=x:2+5 için (0|5), (1|5,5), (3|6,5), (5|7,5) noktalarını yerleştir.\n3. Her ikisi doğrusal olduğundan noktaları düz çizgilerle birleştir.\nKontrol: Kesişim x=1,6 ve y=5,8 civarındadır.','q5');
add(56,6,'',
 'Kais Tabellenkalkulation zeigt x=1,2,3,4,5,6 und y=1,4,9,16,25,36. Welche Formel in B2 kann nach rechts kopiert worden sein?\nA: =2*B1-1    B: x^2    C: =B1*B1',
 'Kai’nin elektronik tablosunda x=1,2,3,4,5,6 ve y=1,4,9,16,25,36 bulunuyor. B2’ye hangi formül yazılıp sağa kopyalanmış olabilir?\nA: =2*B1-1    B: x^2    C: =B1*B1',
 '1. Tabloya bak: y=x² olmalı (1,4,9,16,25,36).\n2. A formülü x=2 için 3 verir, 4 vermez.\n3. B seçeneğinde hücre adresi yerine x yazılmıştır.\n4. C: =B1*B1, B1 hücresinin karesini alır. Sağa kopyalanınca =C1*C1 olur.\nSonuç: C.');
add(56,7,'a',
 'Die Familie hat m=1950−200x Gramm Müsli. Berechne die Restmenge nach 1, 2, 3, 4, 5, 6 und 7 Tagen.',
 'Ailede kalan müsli miktarı m=1950−200x gramdır. 1–7 günün sonunda kalan miktarları hesapla.',
 '1. x gün sayısını yerine yaz.\n2. Örnek: x=1 için m=1950−200=1750 g.\nGün: 1 | 2 | 3 | 4 | 5 | 6 | 7\nGram: 1750 | 1550 | 1350 | 1150 | 950 | 750 | 550.');
add(56,7,'b',
 'Erkläre im Kontext von m=1950−200x die Zahlen 1950 und 200.',
 'm=1950−200x formülündeki 1950 ve 200 neyi anlatıyor?',
 '1. x=0 gününde m=1950 gramdır; bu başlangıç miktarıdır.\n2. Her geçen gün 200 gram tüketilir.\nSonuç: 1950 g başlangıç stoğu, 200 g günlük tüketim.');
add(56,7,'c',
 'Begründe, warum die Anzahl der Tage x nicht beliebig sein kann.',
 'Gün sayısı x neden her sayı olamaz? Açıkla.',
 '1. Geçen gün sayısı negatif olamaz.\n2. Kalan miktar negatif olamaz: 1950−200x≥0.\n3. Buradan x≤9,75 çıkar.\n4. Tamamlanmış tam günleri sayıyorsak x=0,1,2,…,9 uygundur; 10. gün içinde stok biter.\nSonuç: Gün sayısı ve eldeki stok gerçek duruma uygun olmalıdır.');
add(56,8,'a',
 'Eine Tasche kostet 59,90 €. Lilly hat 26 € und spart jede weitere Woche 4,20 €. Welche Formel passt?\nA: (26+4,20)·x   B: 26·x+4,20   C: 4,20·x+26   D: 26+4,20+x',
 'Çanta 59,90 €. Lilly’nin 26 € birikimi var; her hafta 4,20 € daha biriktiriyor. Doğru formülü seç.\nA: (26+4,20)·x   B: 26·x+4,20   C: 4,20·x+26   D: 26+4,20+x',
 '1. Başlangıç parası 26 € olarak sabittir.\n2. x hafta boyunca her hafta 4,20 € eklenir: 4,20·x.\n3. Toplam para 26+4,20x olur.\nSonuç: C.');
add(56,8,'b',
 'Erstelle eine Wertetabelle und bestimme, nach wie vielen Wochen Lilly die Tasche für 59,90 € kaufen kann.',
 'Değer tablosuyla Lilly’nin 59,90 € değerindeki çantayı kaç hafta sonra alabileceğini bul.',
 '1. Birikim y=26+4,20x.\n2. x=0,1,2,3,4,5,6,7,8,9 için:\n€: 26,00 | 30,20 | 34,40 | 38,60 | 42,80 | 47,00 | 51,20 | 55,40 | 59,60 | 63,80.\n3. 8 hafta sonunda 59,60 € olur; 59,90 € için 0,30 € eksik.\n4. 9 hafta sonunda 63,80 € olur.\nSonuç: 9 hafta.');
if(Q.length!==27)throw Error('Ecrin 1 kart sayısı yanlış: '+Q.length);
if(new Set(Q.map(q=>q.id)).size!==Q.length)throw Error('Tekrarlanan kart kimliği');
if(Q.some(q=>!q.german||!q.turkish||!q.solution))throw Error('Eksik soru/çeviri/çözüm');
window.CHECKLIST_PACK={
 id:'ecrin-1-zuordnungen-2026',
 title:'Ecrin 1 · Zuordnungen mit Formeln · Seiten 55–56',
 onlySolvedAnswers:true,
 questions:Q
};
})();