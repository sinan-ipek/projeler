/* Kerem 1 · v1.36.0 · fractions · user supplied pages 62, 63, 64, 68, 70, 71.
 * Examples and numbered exercises are separate cards.
 * Illustrations are clean schematic SVG redrawings, not scans.
 */
(function(){
'use strict';
const Q=[],F={};
const xml=x=>String(x).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const svg=b=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 270" width="720" height="270"><rect width="720" height="270" fill="white"/>'+b+'</svg>');
const text=(x,y,t)=>'<text x="'+x+'" y="'+y+'" fill="#345043" font-family="Arial,sans-serif" font-size="21">'+xml(t)+'</text>';
function bar(x,y,n,k,w=260,h=52,col='#e4b97f'){return Array.from({length:n},(_,i)=>'<rect x="'+(x+i*w/n)+'" y="'+y+'" width="'+w/n+'" height="'+h+'" fill="'+(i<k?col:'#fff')+'" stroke="#4a6255" stroke-width="1.8"/>').join('')}
function circle(x,y,n,k,r=60,col='#e7b77e'){
 return Array.from({length:n},(_,i)=>{
 const a=-Math.PI/2+i*2*Math.PI/n,b=a+2*Math.PI/n;
 return '<path d="M'+x+','+y+'L'+(x+r*Math.cos(a)).toFixed(2)+','+(y+r*Math.sin(a)).toFixed(2)+'A'+r+','+r+' 0 0 1 '+(x+r*Math.cos(b)).toFixed(2)+','+(y+r*Math.sin(b)).toFixed(2)+'Z" fill="'+(i<k?col:'#fff')+'" stroke="#4a6255" stroke-width="1.8"/>';
 }).join('');
}
F.pizza62=svg(circle(165,115,4,1,74)+circle(530,115,4,1,74)+text(110,232,'Selina: 1/4')+text(471,232,'Mark: 1/4'));
F.memory62=svg(text(76,46,'8 gleiche Speicherteile')+bar(76,72,8,7,575,69,'#b8deeb')+text(79,190,'3/8 Speicher wird gelöscht'));
F.pizza64=svg(circle(165,115,4,1,74)+circle(530,115,8,5,74)+text(75,229,'Margarita: 1/4')+text(435,229,'Vegetarisch: 5/8'));
F.eighths64=svg(text(55,48,'1/4 = 2/8')+bar(54,71,8,2)+text(348,110,'+')+bar(408,71,8,3)+text(54,190,'3/8  →  2/8 + 3/8'));
F.a63add=svg(bar(54,81,5,3)+text(345,117,'+')+bar(405,81,5,1));
F.a63sub=svg(bar(54,81,4,3)+text(345,117,'−')+bar(405,81,4,1,260,52,'#e89e8a'));
F.b63add=svg(bar(54,81,4,2,260,52,'#d8b7d5')+text(345,117,'+')+bar(405,81,4,1,260,52,'#bd8ec8'));
F.b63sub=svg(bar(54,81,8,6,260,52,'#d8b7d5')+text(345,117,'−')+bar(405,81,8,2,260,52,'#bd8ec8'));
F.b63mix=svg(text(48,30,'2 Ganze und 1/3')+bar(48,47,3,1,185,42,'#b9d8a3')+bar(48,100,3,3,185,42,'#b9d8a3')+bar(48,153,3,3,185,42,'#b9d8a3')+
 text(265,130,'+')+text(339,30,'1 Ganzes und 1/3')+bar(339,47,3,1,185,42,'#b9d8a3')+bar(339,100,3,3,185,42,'#b9d8a3'));
F.b63mixsub=svg(text(30,30,'1 Ganzes + 3/4')+bar(38,55,4,3,235,50,'#b9d8a3')+bar(38,119,4,4,235,50,'#b9d8a3')+text(290,135,'−')+text(346,30,'1 Ganzes + 2/4')+bar(345,55,4,2,235,50,'#eab0a5')+bar(345,119,4,4,235,50,'#eab0a5'));
F.clock68=svg(text(50,40,'1 Stunde = 60 Minuten')+circle(152,133,4,0,74)+text(251,138,'→')+circle(353,133,4,0,74)+text(451,138,'→')+circle(572,133,4,3,74));
F.grams68=svg(text(55,40,'200 g')+bar(60,65,3,0,600,55)+text(55,153,'2/3 von 200 g')+bar(60,173,3,2,600,55));
F.meter68=svg(text(55,41,'1 m = 100 cm')+bar(50,65,5,0,610)+text(55,160,'3/5 von 1 m')+bar(50,178,5,3,610));
F.juice70=svg(text(64,40,'1 Portion: 1/8 l Kirschsaft')+bar(64,72,8,1,178,80,'#d88791')+text(273,124,'+')+bar(330,72,8,1,178,80,'#d88791')+text(530,124,'+')+bar(567,72,8,1,90,80,'#d88791'));
F.pizza70=svg(circle(174,118,5,2,76)+circle(528,118,5,2,76)+text(67,230,'2/5 der ersten Pizza')+text(431,230,'2/5 der zweiten Pizza'));
F.circles71=svg(circle(148,122,10,3,66)+circle(356,122,10,3,66)+circle(563,122,10,3,66)+text(84,235,'3 gleiche Kreise'));
F.rectangles71=svg(bar(88,93,8,3,232,80,'#efc48c')+bar(397,93,8,3,232,80,'#efc48c'));
function triangle(cx){
 const A=[cx,54],B=[cx-78,212],C=[cx+78,212];
 const P=(i,j)=>[A[0]+(i*(B[0]-A[0])+j*(C[0]-A[0]))/3,A[1]+(i*(B[1]-A[1])+j*(C[1]-A[1]))/3];
 const polygon=(pts,fill)=>'<polygon points="'+pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ')+'" fill="'+fill+'" stroke="#526054" stroke-width="1.9"/>';
 let out='';
 for(let i=0;i<3;i++)for(let j=0;i+j<3;j++){
  out+=polygon([P(i,j),P(i+1,j),P(i,j+1)],i===0&&j===0?'#c8a0d7':'#fff');
  if(i+j<2)out+=polygon([P(i+1,j),P(i,j+1),P(i+1,j+1)],i===0&&j===0?'#c8a0d7':'#fff');
 }
 return out;
}
function star(cx,cy=131){
 let out='';
 for(let i=0;i<5;i++){
  const angle=-Math.PI/2+i*2*Math.PI/5;
  const xy=(a,r)=>[cx+r*Math.cos(a),cy+r*Math.sin(a)];
  const pts=[[cx,cy],xy(angle-Math.PI/5,34),xy(angle,82),xy(angle+Math.PI/5,34)];
  out+='<polygon points="'+pts.map(p=>p.map(n=>n.toFixed(1)).join(',')).join(' ')+'" fill="'+(i<3?'#c8a0d7':'#fff')+'" stroke="#526054" stroke-width="2"/>';
 }
 return out;
}
F.triangles71=svg(text(45,31,'Je Dreieck: 9 gleiche Teilflächen')+triangle(145)+triangle(359)+triangle(574));
F.stars71=svg(text(55,32,'Zwei Sterne, je fünf Teilflächen')+star(235)+star(486));
F.apple71=svg(text(55,49,'12 Beutel, je 4/5 kg Äpfel')+bar(54,79,5,4,600,85,'#eec083'));
F.water71=svg(text(55,49,'6 Flaschen, je 3/4 Liter')+bar(54,79,4,3,600,85,'#b9dce7'));
F.paints63=svg(text(42,44,'3 1/4 l')+bar(55,68,4,1,255,65,'#c5dae3')+text(350,109,'+')+text(425,44,'1 3/4 l')+bar(413,68,4,3,255,65,'#f0cb78'));
function add(page,group,n,p,de,tr,opt={}){
 const id=['kerem1',page,group,n,p||''].join('-');
 const number=(group==='Beispiel'?'Beispiel ':group==='Merke'?'Merke ':group==='Vokabel'?'Wort ':group==='Entdecken'?'Entdecken ':group+' ')+n+(p||'');
 const q={id,page,exercise:String(n),number,german:de,turkish:tr,kind:group==='Beispiel'?'beispiel':group==='Vokabel'?'vokabel':group==='Merke'?'regel':'exercise',star:false,plus:false};
 if(opt.figure)q.figureImage=F[opt.figure];
 if(opt.solution)q.solution=opt.solution;
 Q.push(q);
}
function ex(page,gr,n,p,de,tr,fig){add(page,gr,n,p,de,tr,fig?{figure:fig}:{})}
function es(page,n,p,de,tr,solution,fig){add(page,'Beispiel',n,p,de,tr,{solution,figure:fig})}
function note(page,n,de,tr){add(page,'Merke',n,'',de,tr,{solution:tr})}
function voc(page,n,de,tr){add(page,'Vokabel',n,'','Was bedeutet „'+de+'“?','„'+de+'“ ne demektir?',{solution:de+' = '+tr})}
function seq(page,gr,n,inst,translate,arr){
 arr.forEach((item,i)=>{const p=String.fromCharCode(97+i);
 ex(page,gr,n,p,inst+' '+item,translate+' '+item)});
}
// S. 62 · Gleichnamige Brüche addieren und subtrahieren
ex(62,'Entdecken',1,'a','Selina und Mark haben nicht aufgegessen. Die Reste legen Selina und Mark zusammen auf einen Teller. Welcher Anteil der Pizza ist zusammen noch da?','Selina ile Mark pizzalarını bitirmiyor. Kalan dilimleri aynı tabağa koyuyorlar. Toplam ne kadarlık pizza kaldı?','pizza62');
ex(62,'Entdecken',1,'b','Wie kann man das berechnen? Schreibe eine Rechnung auf.','Bu nasıl hesaplanır? Bir işlem yaz.','pizza62');
ex(62,'Entdecken',2,'a','Der Speicher von Oles Computer ist fast voll. Ole löscht drei Achtel des Speichers. Wie viel Speicherplatz hat er jetzt wieder? Erkläre das an der Darstellung.','Ole’nin bilgisayarının belleği neredeyse dolu. Ole belleğin 3/8’ini siliyor. Şimdi bellekte ne kadar boş alan var? Şekil üzerinde açıkla.','memory62');
ex(62,'Entdecken',2,'b','Wie kann man das berechnen? Schreibe eine Rechnung auf.','Bu nasıl hesaplanır? Bir işlem yaz.','memory62');
es(62,'Verstehen','a','Am Kuchenstand sind 3/5 Erdbeer-Kuchen und 1/5 Schoko-Kuchen da. Wie viel ist das zusammen?','Çilekli kekin 3/5’i ve çikolatalı kekin 1/5’i var. Toplam ne kadar?', '3/5+1/5=(3+1)/5=4/5.');
es(62,'Verstehen','b','Frau Brandt verkauft zwei Stücke Erdbeer-Kuchen. Wie viel bleibt von 3/5 übrig?','Bayan Brandt çilekli kekin iki parçasını satıyor. 3/5’inden geriye ne kalır?','3/5−2/5=(3−2)/5=1/5.');
note(62,'Addition','Gleichnamige Brüche addiert man, indem man nur die Zähler addiert. Der gemeinsame Nenner wird nicht verändert.','Eş paydalı kesirler toplanırken paylar toplanır, ortak payda değiştirilmez.');
note(62,'Subtraktion','Gleichnamige Brüche subtrahiert man, indem man nur die Zähler subtrahiert. Der gemeinsame Nenner wird nicht verändert.','Eş paydalı kesirler çıkarılırken paylar çıkarılır, ortak payda değiştirilmez.');
es(62,1,'','3/5 + 1/5','3/5 ile 1/5’i topla.','3/5+1/5=4/5.');
es(62,2,'','3/5 − 2/5','3/5’ten 2/5’i çıkar.','3/5−2/5=1/5.');
es(62,3,'a','3/8 + 1/8. Kürze das Ergebnis so weit wie möglich.','3/8+1/8 işlemini hesapla ve sonucu sadeleştir.','3/8+1/8=4/8=1/2.');
es(62,3,'b','4/6 − 2/6. Kürze das Ergebnis so weit wie möglich.','4/6−2/6 işlemini hesapla ve sonucu sadeleştir.','4/6−2/6=2/6=1/3.');
voc(62,'gleichnamig','gleichnamig','eş paydalı');voc(62,'Addition','die Addition','toplama');voc(62,'Subtraktion','die Subtraktion','çıkarma');
// S.63 left A
ex(63,'A',1,'a','Schreibe die Aufgabe ins Heft und löse sie. Bestimme die Addition aus den blau gefärbten Fünfteln.','Gösterilen mavi beşte birlik parçaları toplama işlemi olarak yaz ve çöz.','a63add');
ex(63,'A',1,'b','Schreibe die Aufgabe ins Heft und löse sie. Bestimme die Subtraktion der gefärbten Viertel.','Gösterilen renkli dörtte birlik parçalardan çıkarma işlemini yaz ve çöz.','a63sub');
seq(63,'A',2,'Berechne. Kürze das Ergebnis bei b) und d).','Hesapla; b ve d şıklarını sadeleştir.', ['1/8 + 5/8','5/14 + 2/14','5/7 − 2/7','7/9 − 1/9']);
seq(63,'A',3,'Addiere und schreibe als Ganzes. Tipp: 4/4=1.','Topla ve sonucu tam sayı olarak yaz. İpucu: 4/4=1.', ['1/5 + 4/5','3/9 + 6/9','8/12 + 4/12','5/4 + 7/4']);
seq(63,'A',4,'Übertrage und ergänze zu einem Ganzen.','Kendi defterine geçir ve tam sayıya tamamla.', ['5/9 + □/□ = 9/9 = 1','3/8 + □/□ = 8/8 = 1','8/11 + □/□ = 11/11 = 1','6/14 + □/□ = 28/14 = 2']);
seq(63,'A',5,'Berechne. Schreibe das Ergebnis als gemischte Zahl.','Hesapla. Sonucu tam sayılı kesir olarak yaz.', ['5/6 + 3/6','5/7 + 6/7','8/9 + 7/9','7/12 + 8/12']);
note(63,'Gemischte Zahlen','Gemischte Zahlen bestehen aus Ganzen und echten Brüchen. Addiere zuerst die Ganzen, dann die Brüche. Bei Subtraktion kann man in unechte Brüche umwandeln.','Tam sayılı kesirler tam ve kesirli kısımdan oluşur. Toplamada tamları ve kesirleri ayrı toplayabilirsin. Çıkarma için bileşik kesre dönüştürebilirsin.');
es(63,'Methode','a','Gemischte Zahlen addieren: 3 1/5 + 1 2/5.','Tam sayılı kesirleri topla: 3 tam 1/5 + 1 tam 2/5.','3 1/5+1 2/5=3+1+(1+2)/5=4 3/5.');
es(63,'Methode','b','Gemischte Zahlen subtrahieren: 4 1/3 − 3 2/3.','Tam sayılı kesirleri çıkar: 4 tam 1/3 − 3 tam 2/3.','4 1/3−3 2/3=13/3−11/3=2/3.');
seq(63,'A',7,'Berechne.','Hesapla.', ['3 1/3 + 4 1/3','5 2/11 + 2 3/11','2 1/5 − 1 2/5','5 1/4 − 4 3/4']);
ex(63,'A',8,'a','Oliver streicht sein Zimmer. Es sind 3 1/4 l und 1 3/4 l Farbe vorhanden. Wie viel l Farbe ist das zusammen?','Oliver odasını boyuyor. 3 tam 1/4 litre ve 1 tam 3/4 litre boya var. Toplam ne kadar boya vardır?','paints63');
ex(63,'A',8,'b','Oliver verbraucht 2 2/4 l Farbe. Wie viel Farbe bleibt noch übrig?','Oliver 2 tam 2/4 litre boya harcıyor. Geriye ne kadar boya kalır?','paints63');
// S.63 right B
ex(63,'B',1,'a','Schreibe die Aufgabe ins Heft und löse sie. Lies die Addition aus den violetten Vierteln ab.','İşlemi defterine yazıp çöz. Mor dörtte birlik parçaların toplama işlemini bul.','b63add');
ex(63,'B',1,'b','Schreibe die Aufgabe ins Heft und löse sie. Lies die Subtraktion aus der durchgestrichenen Abbildung ab.','İşlemi defterine yazıp çöz. Üzeri çizilmiş bölümden çıkarma işlemini bul.','b63sub');
seq(63,'B',2,'Berechne. Kürze das Ergebnis so weit wie möglich.','Hesapla; sonucu mümkün olduğunca sadeleştir.', ['3/12 + 3/12','5/14 + 7/14','7/9 − 1/9','43/48 − 19/48']);
seq(63,'B',3,'Addiere und kürze das Ergebnis. Erkläre dein Ergebnis.','Topla, sonucu sadeleştir ve açıkla.', ['9/12 + 3/12','8/13 + 5/13','5/7 + 9/7','33/25 + 42/25']);
seq(63,'B',4,'Übertrage und ergänze zu Ganzen.','Defterine geçir ve tam sayıya tamamla.', ['6/11 + □ = 1','7/23 + □ = 1','6/4 + □ = 2','7/3 + □ = 3']);
seq(63,'B',5,'Berechne. Schreibe das Ergebnis als gemischte Zahl.','Hesapla ve sonucu tam sayılı kesir olarak yaz.', ['7/11 + 8/11','16/17 + 15/17','32/15 − 9/15','43/24 − 11/24']);
ex(63,'B',6,'a','Schreibe die Aufgabe ins Heft und löse sie. Lies die Addition aus den grünen Dritteln ab.','Defterine yaz ve çöz. Yeşil üçte birlik şeritlerdeki toplama işlemini bul.','b63mix');
ex(63,'B',6,'b','Schreibe die Aufgabe ins Heft und löse sie. Lies die Subtraktion aus den grünen und roten Vierteln ab.','Defterine yaz ve çöz. Yeşil ve kırmızı dörtte birliklerden çıkarma işlemini bul.','b63mixsub');
seq(63,'B',7,'Berechne.','Hesapla.', ['2 1/8 + 8 5/8','12 8/9 + 7 3/9','5 1/6 − 1 5/6','3 4/15 − 1 7/15']);
ex(63,'B',8,'','Kim streicht ihr Zimmer. Sie mischt die gelbe und weiße Farbe und braucht 3 1/2 l Farbe. Wie viel l Farbe bleibt übrig? Die Eimer enthalten 3 1/4 l und 1 3/4 l.','Kim odasını boyuyor. Sarı ve beyaz boyayı karıştırıyor; 3 tam 1/2 litre boya harcıyor. Kovalarda 3 tam 1/4 ve 1 tam 3/4 litre boya var. Ne kadarı kalır?','paints63');
// S.64 unequal denominators
ex(64,'Entdecken',1,'a','Nach der Feier ist noch Pizza übrig. Welcher Anteil der Pizza ist zusammen noch da?','Kutlama sonunda toplam ne kadarlık pizza kalıyor?','pizza64');
ex(64,'Entdecken',1,'b','Lennart isst noch ein Viertel der vegetarischen Pizza. Wie viel vegetarische Pizza ist jetzt noch übrig?','Lennart vejetaryen pizzadan bir çeyrek daha yiyor. Geriye ne kadar kalır?','pizza64');
ex(64,'Entdecken',1,'c','Beschreibt euren Lösungsweg. Was muss man machen, um die Rechnung zu lösen?','Çözüm yolunu açıkla. İşlemi çözmek için ne yapmalıyız?');
es(64,'Verstehen','a','Es ist noch Kuchen da. Wie viel ist das zusammen? 1/4 + 3/8.','Kalan kekler toplam ne kadardır? 1/4 + 3/8.','1/4=2/8; 2/8+3/8=5/8.','eighths64');
es(64,'Verstehen','b','Max isst 2/9 des Kuchens. Wie viel bleibt übrig? 2/3 − 2/9.','Max kekin 2/9’unu yiyor. Geriye ne kadar kalır? 2/3−2/9.','2/3=6/9; 6/9−2/9=4/9.');
note(64,'Ungleichnamig','Vor dem Addieren oder Subtrahieren müssen ungleichnamige Brüche gleichnamig gemacht werden: einen gemeinsamen Nenner finden, erweitern oder kürzen, dann die Zähler addieren oder subtrahieren.','Farklı paydalı kesirlerde önce ortak payda bulunur; kesirler genişletilir veya sadeleştirilir. Sonra paylar toplanır veya çıkarılır.');
es(64,1,'a','1/4 + 3/8. Erweitere zuerst auf Achtel.','1/4 + 3/8. Önce sekizde birlik paydada eşitle.','1/4=(1·2)/(4·2)=2/8; 2/8+3/8=5/8.','eighths64');
es(64,1,'b','12/15 − 1/5. Kürze zuerst 12/15.','12/15 − 1/5. Önce 12/15’i sadeleştir.','12/15=4/5; 4/5−1/5=3/5.');
voc(64,'ungleichnamig','ungleichnamig','farklı paydalı');
voc(64,'Addition','die Addition','toplama');
voc(64,'Subtraktion','die Subtraktion','çıkarma');
// S.68 fractions of quantities
for(const [part,de,tr,fig] of [
 ['a1','Wie viele Minuten sind eine 3/4 Stunde? Erkläre Schritt 1.','3/4 saat kaç dakikadır? Birinci adımı açıkla.','clock68'],
 ['a2','Wie viele Minuten sind eine 3/4 Stunde? Erkläre Schritt 2.','3/4 saat kaç dakikadır? İkinci adımı açıkla.','clock68'],
 ['b1','Wie viel g sind 2/3 von 200 g? Erkläre Schritt 1.','200 gramın 2/3’ü kaç gramdır? Birinci adımı açıkla.','grams68'],
 ['b2','Wie viel g sind 2/3 von 200 g? Erkläre Schritt 2.','200 gramın 2/3’ü kaç gramdır? İkinci adımı açıkla.','grams68'],
 ['c1','Wie viel cm sind 3/5 von 1 m? Erkläre Schritt 1.','Bir metrenin 3/5’i kaç santimetredir? Birinci adımı açıkla.','meter68'],
 ['c2','Wie viel cm sind 3/5 von 1 m? Erkläre Schritt 2.','Bir metrenin 3/5’i kaç santimetredir? İkinci adımı açıkla.','meter68']
 ])ex(68,'Entdecken',1,part,de,tr,fig);
ex(68,'Entdecken',2,'','Bestimmt die Größen. Wie kann man Anteile von Größen berechnen?','Miktarların kesir kadarını belirleyin. Bir büyüklüğün kesir kadarını nasıl hesaplarız?');
ex(68,'A',3,'a','Bestimmt die Größen. 1/4 Stunde.','Büyüklüğü bul. 1/4 saat.');
ex(68,'A',3,'b','Bestimmt die Größen. 7/8 von 240 g.','240 gramın 7/8’ini bul.');
ex(68,'A',3,'c','Bestimmt die Größen. 3/5 von 20 cm.','20 santimetrenin 3/5’ini bul.');
ex(68,'A',3,'d','Bestimmt die Größen. 2/10 von 2 €.','2 avronun 2/10’unu bul.');
ex(68,'A',3,'e','Bestimmt die Größen. 4/9 von 27 m.','27 metrenin 4/9’unu bul.');
note(68,'Nenner und Zähler','Der Nenner eines Bruchs gibt an, in wie viele gleich große Teile das Ganze geteilt wird. Der Zähler gibt an, wie viele Teile genommen werden.','Payda bir bütünün kaç eşit parçaya bölündüğünü; pay ise kaç parçanın alındığını gösterir.');
es(68,1,'','Wie viel sind 2/3 von 60 cm? Teile in Drittel und nimm zwei davon.','60 cm’nin 2/3’ü kaç santimetredir? Üç eşit parçaya ayır, ikisini al.','60 cm : 3=20 cm; 20 cm · 2=40 cm.');
note(68,'Anteile berechnen','Dividiere die Größe durch den Nenner. Multipliziere das Ergebnis mit dem Zähler.','Büyüklüğü önce paydaya böl, sonra çıkan sonucu payla çarp.');
es(68,2,'','Berechne 3/4 von 800 g.','800 gramın 3/4’ünü hesapla.','800 g : 4=200 g; 200 g · 3=600 g.');
es(68,3,'','Berechne 4/5 cm. Rechne zuerst in mm um.','4/5 santimetreyi bul. Önce milimetreye dönüştür.','1 cm=10 mm; 10 mm : 5=2 mm; 2 mm · 4=8 mm.');
voc(68,'Größe','die Größe','büyüklük, miktar');voc(68,'Nenner','der Nenner','payda');voc(68,'Zähler','der Zähler','pay');
// S.70 fraction x natural number
ex(70,'Entdecken',1,'a','Lisa mischt Kirsch-Bananen-Saft. Für eine Portion braucht sie 1/8 l Kirschsaft und füllt mit Bananensaft auf. Wie viel Liter Kirschsaft braucht sie für 3 Portionen? Erkläre, wie Lisa vorgeht.','Lisa vişneli-muzlu meyve suyu yapıyor. Bir porsiyon için 1/8 litre vişne suyu kullanıyor ve üzerini muz suyuyla tamamlıyor. Üç porsiyon için kaç litre vişne suyu gerekir? Nasıl yaptığını açıkla.','juice70');
ex(70,'Entdecken',1,'b','Schreibe einen Rechenterm und das Ergebnis für drei Portionen Kirsch-Bananen-Saft auf.','Üç porsiyon vişneli-muzlu içecek için işlemi ve sonucunu yaz.','juice70');
ex(70,'Entdecken',2,'a','Thomas nimmt 2/5 von 2 Pizzas für seine Freunde mit. Wie viel ist das? Erkläre, was Thomas mit den Pizzas macht.','Thomas arkadaşları için iki pizzanın 2/5’i kadarını götürüyor. Bu ne kadardır? Pizzalara ne yaptığını açıkla.','pizza70');
ex(70,'Entdecken',2,'b','Thomas überlegt: „2/5 von 2 Pizza … Das ist ja das gleiche wie 2 mal 2/5 Pizza.“ Wie meint er das?','Thomas şöyle düşünüyor: “İki pizzanın 2/5’i, iki kez 2/5 pizza almakla aynıdır.” Ne demek istiyor?','pizza70');
es(70,'Verstehen','','Von 4 Kuchen sind jeweils noch 2/9 übrig. Frau Schulze legt die Reste zusammen. Wie viel ist das?','Dört kekin her birinden 2/9 kaldı. Bayan Schulze parçaları bir araya getiriyor. Toplam ne kadar?','4·2/9=2/9+2/9+2/9+2/9=8/9.');
note(70,'Multiplikation','Ein Bruch wird mit einer natürlichen Zahl multipliziert, indem man den Zähler mit der natürlichen Zahl multipliziert. Der Nenner wird nicht verändert.','Bir kesir doğal sayıyla çarpılırken pay, doğal sayıyla çarpılır. Payda değişmez.');
es(70,1,'a','4 · 2/9','4 ile 2/9’u çarp.','4·2/9=(4·2)/9=8/9.');
es(70,1,'b','2 · 3/7','2 ile 3/7’yi çarp.','2·3/7=(2·3)/7=6/7.');
es(70,1,'c','2/11 · 5','2/11 ile 5’i çarp.','2/11·5=(2·5)/11=10/11.');
es(70,2,'a','Manchmal kann man die Brüche vor der Rechnung kürzen. Rechne 8 · 3/28.','Bazen hesaplamadan önce sadeleştirebiliriz. 8·3/28 işlemini yap.','8·3/28=(8·3)/28=(2·3)/7=6/7.');
es(70,2,'b','Ist beim Ergebnis der Zähler größer als der Nenner, kann man es als gemischte Zahl schreiben. Rechne 4 · 2/5.','Sonucun payı paydasından büyükse tam sayılı kesir olarak yazılabilir. 4·2/5 işlemini yap.','4·2/5=8/5=1 3/5.');
voc(70,'Multiplikation','die Multiplikation','çarpma');
voc(70,'natürliche Zahl','die natürliche Zahl','doğal sayı');
voc(70,'Zähler','der Zähler','pay');
voc(70,'Nenner','der Nenner','payda');
// S.71 exercises, two columns A (blue) and B (purple)
ex(71,'A',1,'a','Schreibe die Multiplikation und das Ergebnis ins Heft. Betrachte die drei Kreise mit markierten Zehnteln.','Üç dairedeki işaretli onda birlikleri incele. Çarpma işlemini ve sonucunu defterine yaz.','circles71');
ex(71,'A',1,'b','Schreibe die Multiplikation und das Ergebnis ins Heft. Betrachte die zwei Rechtecke mit markierten Achteln.','İki dikdörtgendeki işaretli sekizde birlikleri incele. Çarpma işlemini ve sonucunu defterine yaz.','rectangles71');
seq(71,'A',2,'Multipliziere. Tipp zu d) bis f): Es ist egal, wo die natürliche Zahl steht.','Çarp. d–f şıkları için ipucu: Doğal sayının hangi sırada yazıldığı önemli değildir.', ['4 · 2/3','2 · 1/7','5 · 2/9','3/11 · 2','2/15 · 3','5/13 · 3']);
seq(71,'A',3,'Multipliziere. Tipp: Kürze, bevor du multiplizierst.','Çarp. İpucu: Çarpmadan önce sadeleştir.', ['5 · 3/20','7 · 5/14','3/8 · 12','4/9 · 3','5/18 · 12','6 · 7/18']);
seq(71,'A',4,'Multipliziere. Schreibe das Ergebnis als gemischte Zahl.','Çarp ve sonucu tam sayılı kesir olarak yaz.', ['7 · 3/4','5 · 2/3','6 · 2/7','7/9 · 8','2/7 · 9','1/2 · 13']);
ex(71,'A',5,'','In einer Flasche sind 3/4 l Wasser. In einem Wasserkasten ist die 6-fache Menge. Wie viel l Wasser sind im Kasten?','Bir şişede 3/4 litre su var. Bir kasada bunun 6 katı var. Kasada kaç litre su bulunur?','water71');
note(71,'Gemischte Zahlen multiplizieren','Rechne zuerst die gemischte Zahl in einen unechten Bruch um. Zum Beispiel: 4 · 1 2/3 = 4 · 5/3 = 20/3.','Önce tam sayılı kesri bileşik kesre dönüştür. Örnek: 4 · 1 tam 2/3 = 4 · 5/3 = 20/3.');
seq(71,'A',7,'Übertrage und ergänze im Heft. Beschreibe dein Vorgehen.','Defterine geçir, boşluğu doldur ve çözüm yolunu açıkla.', ['3/□ · 3 = 9/10','4 · □/13 = 12/13','□ · 2/9 = 2/3','7 · □/□ = 4']);
ex(71,'B',1,'a','Schreibe die Multiplikation und das Ergebnis ins Heft. Betrachte die drei Dreiecke mit markierten Teilflächen.','Üç üçgende işaretli bölgelere göre çarpma işlemini ve sonucunu yaz.','triangles71');
ex(71,'B',1,'b','Schreibe die Multiplikation und das Ergebnis ins Heft. Betrachte die zwei Sterne mit markierten Teilflächen.','İki yıldızın boyalı parçalarını inceleyerek çarpma işlemini ve sonucunu yaz.','stars71');
seq(71,'B',2,'Multipliziere. Tipp: Die Reihenfolge der Faktoren ist egal.','Çarp. İpucu: Çarpanların yerleri değiştirilebilir.', ['2 · 3/11','7 · 3/20','4 · 5/18','3/15 · 4','4/11 · 3','5/6 · 2']);
seq(71,'B',3,'Multipliziere. Tipp: Kürze so weit wie möglich.','Çarp. İpucu: Mümkün olduğunca sadeleştir.', ['5 · 2/20','16 · 7/12','14 · 3/7','7/30 · 4','7/8 · 8','3/10 · 12']);
seq(71,'B',4,'Multipliziere. Schreibe das Ergebnis als gemischte Zahl.','Çarp ve sonucu tam sayılı kesir olarak yaz.', ['3/5 · 8','3/4 · 5','7/12 · 7','5 · 7/9','16 · 2/7','4 · 6/13']);
ex(71,'B',5,'','In eine Kiste passen 12 Beutel mit Äpfeln. In jeden Beutel passen 4/5 kg Äpfel. Wie viele kg Äpfel passen in die Kiste?','Bir kasaya 12 elma torbası sığıyor. Her torba 4/5 kg elma alıyor. Kasaya toplam kaç kilogram elma sığar?','apple71');
seq(71,'B',6,'Multipliziere.','Çarp.', ['2 · 1 1/5','3 · 1 3/7','10 · 2 8/9','2 · 3 3/4','4 1/6 · 5','3 7/9 · 3']);
for(const [part,de,tr] of [
 ['a','Bilde mit den Kärtchen 2, 3, 4, 8 eine Aufgabe aus Bruch · natürliche Zahl mit einem möglichst großen Ergebnis.','2, 3, 4, 8 kartlarından uygun üç tanesini ayrı yerlerde kullanarak kesir × doğal sayı biçiminde olabildiğince büyük sonuç veren işlem kur.'],
 ['b','Bilde mit den Kärtchen 2, 3, 4, 8 eine Aufgabe aus Bruch · natürliche Zahl mit einem möglichst kleinen Ergebnis.','2, 3, 4, 8 kartlarından uygun üç tanesini ayrı yerlerde kullanarak olabildiğince küçük sonuç veren bir kesir × doğal sayı işlemi kur.'],
 ['c','Bilde mit den Kärtchen 2, 3, 4, 8 eine Aufgabe aus Bruch · natürliche Zahl, die eine ganze Zahl ergibt.','2, 3, 4, 8 kartlarından uygun üç tanesini ayrı yerlerde kullanarak sonucu tam sayı olan bir kesir × doğal sayı işlemi kur.']
])ex(71,'B',7,part,de,tr);

// v1.36.0 — Explain arithmetic in independent steps, with simplification.
function sgcd(a,b){a=Math.abs(a);b=Math.abs(b);while(b){let z=a%b;a=b;b=z}return a||1}
function parseFraction(raw){
 const t=raw.trim();let m=t.match(/^(\d+)\s+(\d+)\/(\d+)$/);
 if(m)return {n:(+m[1])*(+m[3])+(+m[2]),d:+m[3],mixed:true};
 m=t.match(/^(\d+)\/(\d+)$/);
 if(m)return {n:+m[1],d:+m[2],mixed:false};
 if(/^\d+$/.test(t))return {n:+t,d:1,mixed:false};
 throw Error('Fraction parse error '+t);
}
function reduced(n,d){
 const g=sgcd(n,d);return d/g===1?String(n/g):(n/g)+'/'+(d/g)
}
function mixed(n,d){
 const g=sgcd(n,d);n/=g;d/=g;
 if(d===1)return String(n);
 return n>d?Math.floor(n/d)+' '+(n%d)+'/'+d:n+'/'+d
}
function explainArithmetic(q){
 const m=q.german.match(/(\d+(?:\s+\d+\/\d+)?|\d+\/\d+)\s*([+−·])\s*(\d+(?:\s+\d+\/\d+)?|\d+\/\d+)\s*$/u);
 if(!m)return null;
 const [,at,op,bt]=m,a=parseFraction(at),b=parseFraction(bt);
 const steps=['1. İşlem: '+at+' '+op+' '+bt+'.'];
 if(a.mixed||b.mixed){
  const conv=[];
  if(a.mixed)conv.push(at+' = '+a.n+'/'+a.d);
  if(b.mixed)conv.push(bt+' = '+b.n+'/'+b.d);
  steps.push('2. Tam sayılı kesri bileşik kesre çevir: '+conv.join('; ')+'.');
 }
 let n,d;
 if(op==='·'){
  n=a.n*b.n;d=a.d*b.d;
  steps.push((a.mixed||b.mixed?'3.':'2.')+' Çarp: ('+a.n+'·'+b.n+')/('+a.d+'·'+b.d+') = '+n+'/'+d+'.');
 }else{
  d=a.d*b.d/sgcd(a.d,b.d);
  const x=a.n*(d/a.d),y=b.n*(d/b.d);n=op==='+'?x+y:x-y;
  steps.push((a.mixed||b.mixed?'3.':'2.')+' Ortak payda '+d+'; payları '+(op==='+'?'topla':'çıkar')+': ('+x+op+y+')/'+d+' = '+n+'/'+d+'.');
 }
 const simp=reduced(n,d),mix=mixed(n,d);
 if(simp!==n+'/'+d)steps.push('Sadeleştir: '+n+'/'+d+' = '+simp+'.');
 if(mix!==simp)steps.push('Tam sayılı kesir biçimi: '+simp+' = '+mix+'.');
 steps.push('Sonuç: '+mix+'.');
 return steps.join('\n');
}
for(const q of Q)if(!q.solution)q.solution=explainArithmetic(q);


// v1.36.0 — Page 62: opening explorations.
{
 const answers={
 '62-Entdecken-1-a':'1. Selina’dan 1/4 pizza ve Mark’tan 1/4 pizza kalır.\n2. 1/4+1/4=2/4.\n3. 2/4=1/2.\nSonuç: Yarım pizza.',
 '62-Entdecken-1-b':'1. İki pizza parçasının paydası dörttür.\n2. 1/4+1/4=(1+1)/4=2/4.\n3. Sadeleştir: 2/4=1/2.\nSonuç: 1/2 pizza.',
 '62-Entdecken-2-a':'1. Başlangıçta 7/8 dolu, 1/8 boş bellek vardır.\n2. 3/8 daha silinir.\n3. Boş alan=1/8+3/8=4/8=1/2.\nSonuç: Belleğin yarısı artık boştur.',
 '62-Entdecken-2-b':'1. Önceden boş alan=1−7/8=1/8.\n2. Silinen alanı ekle: 1/8+3/8=4/8.\n3. 4/8=1/2.\nSonuç: 1/2 boş alan.'
 };
 for(const [suffix,solution] of Object.entries(answers)){
  const q=Q.find(q=>q.id==='kerem1-'+suffix);
  if(!q)throw Error('Unknown source id '+suffix);
  q.solution=solution;
 }
}

// v1.36.0 — Page 63 diagrams, blanks and paint word problems.
{
 const answers={
 '63-A-1-a':'1. İlk şerit 3/5, ikinci şerit 1/5 boyalıdır.\n2. 3/5+1/5=(3+1)/5=4/5.\nSonuç: 4/5.',
 '63-A-1-b':'1. İlk şeritte 3/4, çıkarılan kırmızı parçada 1/4 vardır.\n2. 3/4−1/4=2/4.\n3. 2/4=1/2.\nSonuç: 1/2.',
 '63-A-4-a':'1. Bir bütün 9/9’dur.\n2. Eksik pay=9−5=4.\n3. 5/9+4/9=9/9=1.\nSonuç: 4/9.',
 '63-A-4-b':'1. Bir bütün 8/8’dir.\n2. Eksik pay=8−3=5.\n3. 3/8+5/8=8/8=1.\nSonuç: 5/8.',
 '63-A-4-c':'1. Bir bütün 11/11’dir.\n2. Eksik pay=11−8=3.\n3. 8/11+3/11=11/11=1.\nSonuç: 3/11.',
 '63-A-4-d':'1. Hedef 28/14=2’dir.\n2. Eksik pay=28−6=22.\n3. 6/14+22/14=28/14=2.\nSonuç: 22/14=11/7.',
 '63-A-8-a':'1. Kutularda 3 1/4 litre ve 1 3/4 litre boya vardır.\n2. Tamları topla: 3+1=4.\n3. Kesirleri topla: 1/4+3/4=1.\n4. 4+1=5.\nSonuç: 5 litre boya.',
 '63-A-8-b':'1. Toplam boya=3 1/4+1 3/4=5 litredir.\n2. 2 2/4=2 1/2 litre harcanır.\n3. 5−2 1/2=2 1/2.\nSonuç: 2 1/2 litre boya kalır.',
 '63-B-1-a':'1. Dört bölümden ikisi açık mor, biri koyu mordur.\n2. 2/4+1/4=3/4.\nSonuç: 3/4.',
 '63-B-1-b':'1. Sekiz eş bölümden altısı boyalıdır: 6/8.\n2. Üzeri çizilen iki bölüm çıkarılır: 2/8.\n3. 6/8−2/8=4/8=1/2.\nSonuç: 1/2.',
 '63-B-4-a':'1. 1=11/11.\n2. Eksik pay=11−6=5.\n3. 6/11+5/11=1.\nSonuç: 5/11.',
 '63-B-4-b':'1. 1=23/23.\n2. Eksik pay=23−7=16.\n3. 7/23+16/23=1.\nSonuç: 16/23.',
 '63-B-4-c':'1. 2=8/4.\n2. Eksik pay=8−6=2.\n3. 6/4+2/4=8/4=2.\nSonuç: 2/4=1/2.',
 '63-B-4-d':'1. 3=9/3.\n2. Eksik pay=9−7=2.\n3. 7/3+2/3=9/3=3.\nSonuç: 2/3.',
 '63-B-6-a':'1. Soldaki şeritler 2 tam ve 1/3, sağdakiler 1 tam ve 1/3 gösterir.\n2. 2 1/3+1 1/3=3 2/3.\nSonuç: 3 2/3.',
 '63-B-6-b':'1. Yeşil şeritler 1 3/4, kırmızı şeritler 1 2/4 gösterir.\n2. 1 3/4−1 2/4=1/4.\nSonuç: 1/4.',
 '63-B-8-':'1. Toplam boya=3 1/4+1 3/4=5 litredir.\n2. Kullanılan boya 3 1/2 litredir.\n3. 5−3 1/2=1 1/2.\nSonuç: 1 1/2 litre boya kalır.'
 };
 for(const [suffix,solution] of Object.entries(answers)){
  const q=Q.find(q=>q.id==='kerem1-'+suffix);
  if(!q)throw Error('Unknown source id '+suffix);
  q.solution=solution;
 }
}

// v1.36.0 — Page 64: ungleichnamige Brüche.
{
 const answers={
 '64-Entdecken-1-a':'1. Margarita pizzadan 1/4, vejetaryen pizzadan 5/8 kalmıştır.\n2. Ortak payda 8: 1/4=2/8.\n3. 2/8+5/8=7/8.\nSonuç: 7/8 pizza.',
 '64-Entdecken-1-b':'1. Vejetaryen pizzadan 5/8 kalmıştır.\n2. Lennart 1/4=2/8 pizza daha yer.\n3. 5/8−2/8=3/8.\nSonuç: 3/8 pizza.',
 '64-Entdecken-1-c':'1. Önce paydaları eşitle: 1/4=2/8.\n2. Toplama: 2/8+5/8=7/8.\n3. Çıkarma: 5/8−2/8=3/8.\nSonuç: Farklı paydalı kesirlerde önce ortak payda bulunur, ardından paylar toplanır veya çıkarılır.'
 };
 for(const [suffix,solution] of Object.entries(answers)){
  const q=Q.find(q=>q.id==='kerem1-'+suffix);
  if(!q)throw Error('Unknown source id '+suffix);
  q.solution=solution;
 }
}

// v1.36.0 — Page 68: fractions of lengths, weights and times.
{
 const answers={
 '68-Entdecken-1-a1':'1. Bir saat 60 dakikadır.\n2. Payda 4 olduğu için 60:4=15 dakika.\n3. Birinci adım saati dört çeyreğe bölmektir.\nSonuç: 1/4 saat=15 dakika.',
 '68-Entdecken-1-a2':'1. Bir çeyrek saat 60:4=15 dakikadır.\n2. Pay 3 olduğu için 15·3=45 dakika.\n3. İkinci adım üç çeyreği seçmektir.\nSonuç: 3/4 saat=45 dakika.',
 '68-Entdecken-1-b1':'1. Bütün miktar 200 gramdır.\n2. Üç eşit parçaya böl: 200:3=66 2/3 gram.\nSonuç: 1/3 miktar 66 2/3 gramdır.',
 '68-Entdecken-1-b2':'1. Bir parça 200/3 gramdır.\n2. İki parça al: (200/3)·2=400/3 gram.\n3. 400/3=133 1/3.\nSonuç: 133 1/3 gram (yaklaşık 133,33 g).',
 '68-Entdecken-1-c1':'1. Önce birimi çevir: 1 m=100 cm.\n2. Payda 5 olduğu için 100:5=20 cm.\nSonuç: 1/5 metre 20 cm’dir.',
 '68-Entdecken-1-c2':'1. Beşte birlik parça 100:5=20 cm’dir.\n2. Üç parça al: 20·3=60 cm.\nSonuç: 3/5 metre=60 cm.',
 '68-Entdecken-2-':'1. Önce bütün miktarın hangi birimde verildiğini belirle.\n2. Miktarı kesrin paydasına böl.\n3. Çıkan sonucu kesrin payıyla çarp.\n4. Örnek: 3/5 von 20 cm: 20:5=4, sonra 4·3=12 cm.\nSonuç: (Bütün miktar:payda)·pay.',
 '68-A-3-a':'1. Bir saat 60 dakika eder.\n2. 60:4=15 dakika.\nSonuç: 1/4 saat=15 dakika.',
 '68-A-3-b':'1. 240:8=30 gram.\n2. 30·7=210 gram.\nSonuç: 210 g.',
 '68-A-3-c':'1. 20:5=4 cm.\n2. 4·3=12 cm.\nSonuç: 12 cm.',
 '68-A-3-d':'1. 2 €=200 cent.\n2. 200:10=20 cent.\n3. 20·2=40 cent.\nSonuç: 0,40 €.',
 '68-A-3-e':'1. 27:9=3 metre.\n2. 3·4=12 metre.\nSonuç: 12 m.'
 };
 for(const [suffix,solution] of Object.entries(answers)){
  const q=Q.find(q=>q.id==='kerem1-'+suffix);
  if(!q)throw Error('Unknown source id '+suffix);
  q.solution=solution;
 }
}

// v1.36.0 — Page 70: multiply fractions by natural numbers.
{
 const answers={
 '70-Entdecken-1-a':'1. Her porsiyon 1/8 litre vişne suyu içerir.\n2. Üç porsiyonda üç kez 1/8 alınır.\n3. 1/8+1/8+1/8=3/8.\nSonuç: 3/8 litre vişne suyu.',
 '70-Entdecken-1-b':'1. Aynı kesrin tekrarını çarpma olarak yaz.\n2. 1/8+1/8+1/8=3·1/8.\n3. 3·1/8=3/8.\nSonuç: 3/8 litre.',
 '70-Entdecken-2-a':'1. Thomas iki pizzanın her birinden 2/5’lik bölüm alır.\n2. 2/5+2/5=4/5.\nSonuç: 4/5 pizza.',
 '70-Entdecken-2-b':'1. İki pizzanın 2/5’i, iki kere 2/5 pizza almaktır.\n2. 2·2/5=(2·2)/5=4/5.\nSonuç: 4/5 pizza.'
 };
 for(const [suffix,solution] of Object.entries(answers)){
  const q=Q.find(q=>q.id==='kerem1-'+suffix);
  if(!q)throw Error('Unknown source id '+suffix);
  q.solution=solution;
 }
}

// v1.36.0 — Page 71: drawn fractions, mixed units and number cards.
{
 const answers={
 '71-A-1-a':'1. Üç dairenin her biri 10 eş dilime ayrılmıştır.\n2. Her dairede 3/10 boyalıdır.\n3. Üç daire için 3·3/10=9/10.\nSonuç: 9/10.',
 '71-A-1-b':'1. İki dikdörtgenden her biri 8 eş parçaya ayrılmıştır.\n2. Her birinde 3/8 boyalıdır.\n3. 2·3/8=6/8.\n4. 6/8=3/4.\nSonuç: 3/4.',
 '71-A-5-':'1. Bir şişede 3/4 litre su vardır.\n2. 6 şişede 6·3/4=18/4 litre bulunur.\n3. 18/4=9/2=4 1/2.\nSonuç: 4 1/2 litre.',
 '71-A-7-a':'1. 3/□·3=9/10 eşitliğinde pay 3·3=9 olur.\n2. Paydanın 10 olması gerekir.\n3. 3/10·3=9/10.\nSonuç: Kutudaki sayı 10.',
 '71-A-7-b':'1. 4·□/13=12/13.\n2. Pay için 4·□=12 gereklidir.\n3. 12:4=3.\nSonuç: Kutudaki sayı 3.',
 '71-A-7-c':'1. □·2/9=2/3.\n2. 2/3=6/9 olduğundan □·2=6.\n3. 6:2=3.\nSonuç: Kutudaki sayı 3.',
 '71-A-7-d':'1. 7·□/□=4 olacak şekilde kesri seç.\n2. 4/7 seçersen 7·4/7=28/7=4.\nSonuç: Kesrin payı 4, paydası 7.',
 '71-B-1-a':'1. Üç büyük üçgenin her biri 9 eş parçadan oluşur.\n2. Her üçgende iki küçük parça boyalıdır: 2/9.\n3. 3·2/9=6/9=2/3.\nSonuç: 2/3.',
 '71-B-1-b':'1. İki yıldızın her birinde beş bölümden üçü boyalıdır.\n2. Her yıldız 3/5 gösterir.\n3. 2·3/5=6/5=1 1/5.\nSonuç: 1 1/5.',
 '71-B-5-':'1. Kasada 12 torba vardır ve her torba 4/5 kg elma alır.\n2. 12·4/5=48/5 kilogram.\n3. 48/5=9 3/5.\nSonuç: 9 3/5 kg, yani 9,6 kg.',
 '71-B-7-a':'1. 2, 3, 4 ve 8 kartlarından pay, payda ve çarpan için üç farklı sayı seçilir.\n2. En büyük sonuç için 8’i çarpan, 4’ü pay ve 2’yi payda seç.\n3. 8·4/2=16.\nSonuç: En büyük değer 16.',
 '71-B-7-b':'1. En küçük sonuç için paydayı en büyük sayı olan 8 seç.\n2. Kalanlardan pay ve çarpanı 2 ve 3 olarak belirle.\n3. 2·3/8=6/8=3/4.\nSonuç: En küçük değer 3/4.',
 '71-B-7-c':'1. Bir bütün, yani 1 elde etmek gerekiyor.\n2. 4·2/8=8/8=1.\n3. Alternatif olarak 2·4/8=1 de mümkündür.\nSonuç: Örnek doğru işlem 4·2/8=1.'
 };
 for(const [suffix,solution] of Object.entries(answers)){
  const q=Q.find(q=>q.id==='kerem1-'+suffix);
  if(!q)throw Error('Unknown source id '+suffix);
  q.solution=solution;
 }
}
const noSolution=Q.filter(q=>!q.solution);
if(noSolution.length)throw Error('Missing Kerem 1 solutions: '+noSolution.map(q=>q.id).join(', '));
if(new Set(Q.map(q=>q.id)).size!==Q.length)throw Error('duplicate IDs');
if(Q.some(q=>!q.german||!q.turkish))throw Error('blank text');
window.CHECKLIST_PACK={id:'kerem-1-fractions-2026',title:'Kerem 1 · Mit Brüchen rechnen · Seiten 62, 63, 64, 68, 70, 71',onlySolvedAnswers:true,questions:Q};
})();