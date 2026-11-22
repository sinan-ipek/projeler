/* Munzur Check Liste · v1.4.0 · sayfa 50–51, 91–93
 * Ödev önceliği: s.50/4, s.51/7, s.51/8.
 * Öğretim verileri kullanıcı tarafından sağlanan dört fotoğraf ve ödev ekranından hazırlanmıştır.
 * Küçük grafiklerin yeniden çizimleri yaklaşık/şematiktir; kitapta verilen grafiği esas alın.
 */
(function(){
'use strict';
const Q=[],IMAGES={};
function add(page,exercise,part,de,tr,opts={}){
 const id=page+'-'+exercise+(part||'');
 const question={
  id:'munzur-'+id,page,exercise:page+'-'+exercise,
  number:exercise+part,
  german:de, turkish:tr,star:!!opts.homework,plus:false,
  homework:!!opts.homework
 };
 if(opts.figure)question.figureKind=opts.figure;
 Q.push(question);
}
const mkSvg=body=>'<svg xmlns="http://www.w3.org/2000/svg" width="720" height="380" viewBox="0 0 720 380"><rect width="720" height="380" fill="#fff"/>'+body+'</svg>';
const txt=(x,y,t,size=17,fill='#293e34')=>'<text x="'+x+'" y="'+y+'" font-family="Arial,sans-serif" font-size="'+size+'" fill="'+fill+'">'+String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;')+'</text>';
function graph(title,points,{xMax=10,yMax=30,xLabel='Zeit (min)',yLabel='Wert',yTicks=5,xTicks=5}={}){
 const x0=95,y0=316,w=550,h=235;
 let b=txt(40,34,title,22)+txt(90,65,yLabel,15)+txt(560,362,xLabel,15);
 for(let i=0;i<=xTicks;i++){
  const x=x0+i*w/xTicks;
  b+='<line x1="'+x+'" y1="'+y0+'" x2="'+x+'" y2="'+(y0-h)+'" stroke="#dce8de"/>';
  b+=txt(x-8,340,Math.round(xMax*i/xTicks),12);
 }
 for(let j=0;j<=yTicks;j++){
  const y=y0-j*h/yTicks;
  b+='<line x1="'+x0+'" y1="'+y+'" x2="'+(x0+w)+'" y2="'+y+'" stroke="#dce8de"/>';
  b+=txt(55,y+4,Math.round(yMax*j/yTicks),12);
 }
 b+='<path d="M'+x0+' '+(y0-h)+'V'+y0+'H'+(x0+w)+'" fill="none" stroke="#33483d" stroke-width="2"/>';
 if(points.length){
  const d=points.map((p,i)=>(i?'L':'M')+(x0+w*p[0]/xMax).toFixed(1)+' '+(y0-h*p[1]/yMax).toFixed(1)).join(' ');
  b+='<path d="'+d+'" fill="none" stroke="#bb6658" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>';
 }
 b+=txt(95,375,'Şematik çizim: Sayısal değerler için kitap görseline bakın.',12,'#86958a');
 return mkSvg(b);
}
function table(title,columns,rows){
 const w=670,cell=w/columns.length,h=52,x0=25,y0=90;
 let b=txt(x0,43,title,22);
 for(let i=0;i<rows.length;i++){
  for(let j=0;j<columns.length;j++){
   const x=x0+j*cell,y=y0+i*h;
   b+='<rect x="'+x+'" y="'+y+'" width="'+cell+'" height="'+h+'" fill="'+(i%2?'#f2f7ef':'#e2eee4')+'" stroke="#a5b7a6"/>';
   b+=txt(x+7,y+31,rows[i][j],Math.min(16,Math.max(11,160/columns.length)));
  }
 }
 return mkSvg(b);
}
const svgData=s=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
const snow=[[0,16],[4,27],[6,27],[8,27],[10,27],[11,25],[14,37],[15,33],[17,26],[20,26],[24,26]];
IMAGES.snow=graph('Schneehöhe auf dem Berg',snow,{xMax:24,yMax:50,xLabel:'Uhrzeit (h)',yLabel:'Schneehöhe (cm)',yTicks:5,xTicks:6});
IMAGES.cyclist=graph('Kims Fahrradfahrt',[[0,0],[2,12],[5,14],[12,15],[16,9],[21,22],[26,22],[30,20],[36,24],[38,26],[39,12],[43,9]],{xMax:45,yMax:30,xLabel:'Minuten seit dem Start',yLabel:'Geschwindigkeit (km/h)',yTicks:6,xTicks:9});
IMAGES.balloon=graph('Ballonfahrt — Höhe über Zeit',[[0,0],[12,700],[20,850],[40,850],[50,840],[65,510],[78,470],[90,430],[100,200],[110,200],[120,150]],{xMax:120,yMax:1000,xLabel:'Zeit (min)',yLabel:'Höhe (m)',yTicks:5,xTicks:6});
IMAGES.gasoline=graph('Benzinmenge auf der Fahrt',[[0,50],[20,48],[100,43],[200,37],[300,29],[400,23],[450,19]],{xMax:600,yMax:60,xLabel:'Zurückgelegte Strecke (km)',yLabel:'Benzin (l)',yTicks:6,xTicks:6});
IMAGES.subway=table('U-Bahn: Zeit und Geschwindigkeit (Buch S. 50)',Array(9).fill(''),[
 ['Zeit (s)','0','5','10','15','20','25','30','…'],
 ['Tempo','0','5','20','45','40','18','37','…']
]);
IMAGES.marvin=table('Marvins Punkte nach zehn Runden',Array(11).fill(''),[
 ['Runde','1','2','3','4','5','6','7','8','9','10'],
 ['Punkte','3','2','4','6','5','9','11','12','5','3']
]);
function snailSVG(){
 const series=[
  {name:'A',pts:[[0,0],[2,12],[4,12],[6,18],[8,24],[10,30]]},
  {name:'B',pts:[[0,0],[2,9],[4,18],[5,16],[8,30],[10,30]]},
  {name:'C',pts:[[0,0],[2,4],[4,10],[6,18],[8,30],[10,30]]},
  {name:'D',pts:[[0,0],[2,6],[4,12],[6,18],[8,24],[10,30]]}
 ];
 let s='<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 450" width="800" height="450"><rect width="800" height="450" fill="#fff"/>'+txt(20,28,'Schneckenrennen · vier Graphen (schematisch)',22);
 for(let i=0;i<series.length;i++){
  const z=series[i],x0=20+(i%2)*395,y0=55+Math.floor(i/2)*190;
  s+='<rect x="'+x0+'" y="'+y0+'" width="370" height="172" rx="9" fill="#fafcf9" stroke="#b9cbbd"/>'+txt(x0+9,y0+25,'Graph '+z.name,19);
  for(let g=0;g<=5;g++){
   const x=x0+37+g*58,y=y0+146-g*22;
   s+='<line x1="'+x+'" y1="'+(y0+40)+'" x2="'+x+'" y2="'+(y0+146)+'" stroke="#e4eae4"/>';
   s+='<line x1="'+(x0+37)+'" y1="'+y+'" x2="'+(x0+328)+'" y2="'+y+'" stroke="#e4eae4"/>';
  }
  const d=z.pts.map((p,j)=>(j?'L':'M')+(x0+37+p[0]*29.1)+' '+(y0+146-p[1]*3.5)).join(' ');
  s+='<path d="'+d+'" fill="none" stroke="#ba6355" stroke-width="3.3" stroke-linecap="round" stroke-linejoin="round"/>';
  s+=txt(x0+42,y0+163,'0',12)+txt(x0+305,y0+163,'10 min',12)+txt(x0+7,y0+51,'30 cm',12);
 }
 s+=txt(18,440,'Grafikler fotoğrafa göre yeniden çizilmiştir; eşleştirmede kitap görselini esas alın.',12,'#768b7c')+'</svg>';
 return s;
}
IMAGES.snails=snailSVG();
IMAGES.goal=table('Zeit (s) → Höhe (m)',Array(6).fill(''),[
 ['Zeit (s)','0','0,5','1','1,5','2'],
 ['Höhe (m)','□','□','□','□','□']
]);
// === ÖDEV ÖNCELİĞİ (Schulplaner: Mathebuch S.50 Nr.4, S.51 Nr.7–8) ===
const hw4='Der Graph der Zuordnung verläuft durch den Punkt (2 | 4). Erläutere, welche Bedeutung dies im Sachzusammenhang hat.';
const tr4='Bir eşleştirme grafiği (2 | 4) noktasından geçiyor. Bu noktanın gerçek durumdaki anlamını açıkla.';
[
 ['a','Gewicht der Bananen (in kg) → Preis (in €)','Muzların ağırlığı (kg) → fiyatı (€)'],
 ['b','Zeit (in min) → zurückgelegte Strecke (in m)','Zaman (dakika) → gidilen yol (metre)'],
 ['c','Anzahl der Flaschen → Gewicht (in kg)','Şişe sayısı → ağırlık (kg)'],
 ['d','Zeit (in s) → heruntergeladene Datenmenge (in MB)','Zaman (saniye) → indirilen veri miktarı (MB)']
].forEach(([part,de,tr])=>add(50,4,part,hw4+'\n'+part+') '+de,tr4+'\n'+part+') '+tr,{homework:true}));
const intro7='Die Schnecken Waldi, Kurt, Thea und Rosi treten beim 30-cm-Rennen gegeneinander an.';
const tr7='Waldi, Kurt, Thea ve Rosi adlı salyangozlar 30 cm yarışında karşılaşıyor.';
add(51,7,'a',intro7+'\na) Ordne jeder Schnecke mithilfe der Kärtchen ihre Startnummer und ihren Graphen zu.\nDie Startnummern 1–4 haben Zeit-/Entfernungstabellen und die Graphen A–D.',tr7+'\na) Açıklama kartlarını, 1–4 başlangıç numaralarını ve A–D grafiklerini eşleştir.',{homework:true,figure:'snails'});
add(51,7,'b',intro7+'\nb) Gib die Reihenfolge an, in der die Schnecken ins Ziel kommen.',tr7+'\nb) Salyangozların bitiş çizgisine ulaşma sırasını yaz.',{homework:true,figure:'snails'});
add(51,8,'', 'Während einer Ballonfahrt wurde laufend die Höhe gemessen. Unten ist der Graph der Zuordnung Zeit seit dem Start (in min) → Höhe des Ballons (in m) abgebildet.\nBeschreibe den Verlauf der Ballonfahrt in Worten. Die Begriffe aus der Wortliste können helfen:\nsteigen um; bleiben auf; sinken um; innerhalb von ... Minuten; maximale Höhe; konstant; gleichmäßig.',
'Bir balon yolculuğunda yükseklik sürekli ölçülüyor. Grafik, başlangıçtan beri geçen zamanı (dakika) ve balonun yüksekliğini (metre) gösteriyor.\nGrafiğin değişimini kelimelerle anlat: yükselmek, aynı yükseklikte kalmak, alçalmak, ... dakika içinde, en yüksek nokta, sabit, düzenli.',{homework:true,figure:'balloon'});
// === DİĞER SORULAR: S.50–51 ===
const s2='Die folgende Tabelle gibt die Geschwindigkeiten einer U-Bahn auf ihrer Fahrt zwischen zwei Haltestellen an.';
add(50,2,'a',s2+'\na) Zeichne den Graphen der Zuordnung Zeit (in s) → Geschwindigkeit (in km/h). Wähle auf den Achsen ein Kästchen für 5 s bzw. für 5 km/h. Die vollständigen Tabellenwerte stehen im Buch.', 'Tablo, metro treninin iki durak arasındaki hızını veriyor.\na) Zaman (saniye) → hız (km/sa) grafiğini çiz. Eksenlerde bir kare 5 saniye ve 5 km/sa olsun. Tam tablo için kitabı kullan.',{figure:'subway'});
add(50,2,'b',s2+'\nb) Begründe, warum es sinnvoll ist, die Punkte des Graphen durch eine geeignete Linie zu verbinden.','b) Grafikteki noktaları uygun bir çizgiyle birleştirmenin neden mantıklı olduğunu açıkla.',{figure:'subway'});
const s3='Auf einem Berg wurden zu verschiedenen Uhrzeiten die Schneehöhen gemessen. In Fig. 1 ist der Graph der Zuordnung Uhrzeit (in h) → Schneehöhe (in cm) abgebildet.';
add(50,3,'a',s3+'\na) Übertrage die in Fig. 1 markierten Wertepaare in eine Wertetabelle.','Bir dağda farklı saatlerde kar yüksekliği ölçülmüştür.\na) Grafikte işaretlenmiş zaman–kar yüksekliği çiftlerini bir değer tablosuna aktar.',{figure:'snow'});
add(50,3,'b',s3+'\nb) Gib mithilfe des Graphen einen Schätzwert für die Schneehöhe um 11 Uhr nachts an.','b) Grafikten yararlanarak saat 23.00’teki kar yüksekliğini yaklaşık olarak bul.',{figure:'snow'});
add(50,3,'c',s3+'\nc) Gib anhand des Graphen ungefähre Zeiträume an, in denen es vermutlich geschneit hat.','c) Hangi saat aralıklarında kar yağmış olabileceğini grafiğe bakarak belirt.',{figure:'snow'});
const s5='Die folgende Wertetabelle gibt Marvins Punktzahl im Laufe eines Würfelspiels mit zehn Spielrunden an.';
add(50,5,'a',s5+'\na) Zeichne einen Graphen der Zuordnung Anzahl der Runden → Marvins Punktzahl.','Marvin’in 10 turluk zar oyununda topladığı puanlar tabloda gösterilmiştir.\na) Oynanan tur sayısı → Marvin’in puanı grafiğini çiz.',{figure:'marvin'});
add(50,5,'b',s5+'\nb) Begründe, warum es nicht sinnvoll ist, die eingezeichneten Punkte durch eine Linie zu verbinden.','b) Bu grafikte noktaları çizgiyle birleştirmenin neden uygun olmadığını açıkla.',{figure:'marvin'});
const s6='Kim hat während einer Fahrradtour ihre Geschwindigkeit mit dem Smartphone aufgezeichnet. Rechts ist der Graph der Zuordnung Zeit seit dem Start (in min) → Geschwindigkeit (in km/h) abgebildet.';
add(50,6,'a',s6+'\na) Lies aus dem Graphen ab, wie schnell Kim 20 Minuten nach dem Start ungefähr war.','Kim’in bisiklet turunda hızı kaydedilmiş.\na) Başlangıçtan 20 dakika sonra yaklaşık hızını grafikten oku.',{figure:'cyclist'});
add(50,6,'b',s6+'\nb) Gib mithilfe des Graphen Kims ungefähre Höchstgeschwindigkeit an.','b) Grafiğe göre Kim’in ulaştığı yaklaşık en yüksek hızı yaz.',{figure:'cyclist'});
const s9='Familie Fischer fährt mit dem Auto an die Nordsee. Rechts ist der Graph der Zuordnung zurückgelegte Strecke (in km) → Benzinmenge im Tank (in l) abgebildet.';
add(51,9,'a',s9+'\na) Lies am Graphen ab, wie viel Benzin nach 100 km ungefähr noch im Tank war.','Fischer ailesinin yolculuğunda grafikte gidilen yol ve depoda kalan benzin gösteriliyor.\na) 100 km sonra depoda yaklaşık kaç litre benzin kaldığını oku.',{figure:'gasoline'});
add(51,9,'b',s9+'\nb) Gib an, nach welcher ungefähren Fahrstrecke noch 30 l Benzin im Tank sind.','b) Depoda 30 litre benzin kaldığında yaklaşık kaç kilometre gidildiğini bul.',{figure:'gasoline'});
add(51,9,'c',s9+'\nc) Begründe, warum der Graph fällt.','c) Grafiğin neden aşağı doğru indiğini açıkla.',{figure:'gasoline'});
// === S.91 · Prozentwerte berechnen ===
IMAGES.percentCards=table('Zuordnung: gelbe Karten → blaue Karten',Array(4).fill(''),[
 ['Gelb 1','20 % von 25','Blau I','3 Schüler'],
 ['Gelb 2','30 % von 30','Blau S','5 Schüler'],
 ['Gelb 3','10 % von 30','Blau E','11 Schüler'],
 ['Gelb 4','25 % von 28','Blau P','9 Schüler'],
 ['Gelb 5','50 % von 26','Blau T','7 Schüler']
]);
const m1='Ordne jeder gelben Karte eine passende blaue Karte zu. Wenn du alle Karten richtig zugeordnet hast, erhältst du ein Lösungswort.\nGelb: (1) 20 % von 25 Schülern; (2) 30 % von 30 Schülern; (3) 10 % von 30 Schülern; (4) 25 % von 28 Schülern; (5) 50 % von 26 Schülern; (6) 55 % von 20 Schülern.\nBlau: I=3 Schüler, S=5 Schüler, E=11 Schüler, P=9 Schüler, T=7 Schüler, Z=13 Schüler.';
add(91,1,'',m1,'Her sarı yüzde kartını uygun mavi sayı kartıyla eşleştir ve ortaya çıkan sözcüğü bul.\nSarı kartlar: 25’in %20’si; 30’un %30’u; 30’un %10’u; 28’in %25’i; 26’nın %50’si; 20’nin %55’i.\nMavi kartlar: I=3, S=5, E=11, P=9, T=7, Z=13 öğrenci.',{figure:'percentCards'});
const d2='Übertrage die Tabelle in dein Heft, ergänze die fehlenden Werte und beschrifte die Pfeile, die den Rechenweg darstellen.';
add(91,2,'a',d2+'\na) 100 % = 400 kg. Gesucht: 1 % und 7 %.','Tabloyu deftere geçir. Eksik değerleri doldur ve hesap adımlarını okların üzerine yaz.\na) %100 = 400 kg. %1 ve %7 kaç kg?',{figure:'percent2a'});
add(91,2,'b',d2+'\nb) 100 % = 220 dm. Gesucht: 1 % und 3 %.','b) %100 = 220 dm. %1 ve %3 kaç dm?',{figure:'percent2b'});
const d3='Als Zwischengröße muss nicht immer 1 % gewählt werden. Übertrage die Tabellen in dein Heft, ergänze die Werte und beschrifte die Pfeile, die den Rechenweg darstellen.';
add(91,3,'a',d3+'\na) 100 % = 250 m². Gesucht: 10 % und 30 %.','Ara hesaplama basamağında her zaman %1 kullanmak gerekmez. Tabloyu tamamla.\na) %100 = 250 m². %10 ve %30’u bul.',{figure:'percent3a'});
add(91,3,'b',d3+'\nb) 100 % = 350 l. Gesucht: 20 % und 60 %.','b) %100 = 350 litre. %20 ve %60’ı bul.',{figure:'percent3b'});
const d4='Berechne schriftlich mit einem Dreisatz.';
for(const [part,de,tr] of [
 ['a','37 % von 500 €','500 €’nun %37’si'],
 ['b','8 % von 250 kg','250 kg’ın %8’i'],
 ['c','9 % von 150 m','150 metrenin %9’u'],
 ['d','45 % von 300 h','300 saatin %45’i']
])add(91,4,part,d4+'\n'+part+') '+de,'Orantı / üçlü kural (Dreisatz) kullanarak yazılı hesapla.\n'+part+') '+tr);
const d5='Notiere den Prozentsatz als gekürzten Bruch. Berechne damit den Prozentwert.';
for(const [part,de,tr] of [
 ['a','10 % von 75 €','75 €’nun %10’u'],
 ['b','25 % von 280 €','280 €’nun %25’i'],
 ['c','50 % von 620 km','620 km’nin %50’si'],
 ['d','20 % von 80 m','80 m’nin %20’si'],
 ['e','75 % von 240 kg','240 kg’ın %75’i'],
 ['f','40 % von 360 kg','360 kg’ın %40’ı'],
 ['g','60 % von 80 cm','80 cm’nin %60’ı'],
 ['h','90 % von 40 km','40 km’nin %90’ı']
])add(91,5,part,d5+'\n'+part+') '+de,'Yüzde oranını sadeleştirilmiş kesir olarak yaz ve sonucu kesir yardımıyla bul.\n'+part+') '+tr);
const d6='Ein Elektrogeschäft hat die Preise stark reduziert. Überschlage zuerst, wie viel die Geräte nach der Preissenkung kosten. Berechne dann mit dem Taschenrechner.';
add(91,6,'a',d6+'\na) Der Preis eines 889,99 € teuren Fernsehers wird um 50 % reduziert.','Elektronik mağazasında indirim yapılıyor. Önce tahmin et, sonra hesapla.\na) 889,99 €’luk televizyona %50 indirim uygulanıyor.');
add(91,6,'b',d6+'\nb) Ein Drucker hat bisher 68,99 € gekostet. Der Preis wird um 30 % reduziert.','b) 68,99 €’luk yazıcıya %30 indirim uygulanıyor.');
add(91,6,'c',d6+'\nc) Ein Laptop hat bisher 619,99 € gekostet. Der Preis wird um 70 % reduziert.','c) 619,99 €’luk dizüstü bilgisayara %70 indirim uygulanıyor.');
add(91,7,'a','Teste dich! Berechne 15 % von 80 €.','Kendini dene! 80 €’nun %15’ini hesapla.');
add(91,7,'b','Teste dich! In der Klasse 7 d sind 25 Schüler. Davon sind 20 % Linkshänder. Berechne, wie viele Personen das sind.','7d sınıfında 25 öğrenci var. Bunların %20’si solak. Kaç öğrenci solaktır?');
add(91,8,'','Ein Taschenrechner kostete bisher 29,59 €. Der Händler reduziert den Preis um 30 %. Überschlage zunächst und berechne dann den neuen Preis des Taschenrechners.','Bir hesap makinesi 29,59 € idi. Satıcı %30 indirim yapıyor. Önce yaklaşık sonucu tahmin et, sonra yeni fiyatı hesapla.');
IMAGES.percent2a=table('Prozenttabelle A',Array(2).fill(''),[['100 %','400 kg'],['1 %','?'],['7 %','?']]);
IMAGES.percent2b=table('Prozenttabelle B',Array(2).fill(''),[['100 %','220 dm'],['1 %','?'],['3 %','?']]);
IMAGES.percent3a=table('Prozenttabelle A',Array(2).fill(''),[['100 %','250 m²'],['10 %','?'],['30 %','?']]);
IMAGES.percent3b=table('Prozenttabelle B',Array(2).fill(''),[['100 %','350 l'],['20 %','?'],['60 %','?']]);
// === S.92 · Prozente und Preisänderungen ===
const d9='Überschlage. Berechne dann mit dem Taschenrechner und vergleiche die Ergebnisse.';
for(const [part,de,tr] of [
 ['a','9,2 % von 300 €','300 €’nun %9,2’si'],
 ['b','19,7 % von 90 kg','90 kg’ın %19,7’si'],
 ['c','5 % von 12,5 cm','12,5 cm’nin %5’i'],
 ['d','92 % von 18 cm','18 cm’nin %92’si'],
 ['e','112 % von 250 l','250 litrenin %112’si'],
 ['f','115 % von 258 €','258 €’nun %115’i'],
 ['g','22,8 % von 40,5 ha','40,5 hektarın %22,8’i'],
 ['h','40,2 % von 3,5 m³','3,5 metreküpün %40,2’si']
])add(92,9,part,d9+'\n'+part+') '+de,'Önce yaklaşık değer tahmini yap, sonra hesap makinesiyle hesaplayıp karşılaştır.\n'+part+') '+tr);
const d10='a) Gib an, welches Bild zu welcher Information gehört. Begründe deine Zuordnung und berechne dann den Preis nach der Preissenkung.';
add(92,10,'a',d10+'\nDie Abbildungen A und B zeigen unterschiedliche Prozentdarstellungen. Nutze die beiden Preis- und Rabattbalken im Buch.', 'a) A ve B görsellerini ilgili fiyat/indirim bilgileriyle eşleştir; nedenini açıklayıp indirimli fiyatı hesapla. **Küçük fiyat/indirim etiketlerinin kesin değerleri için kitaptaki görsele bak.**',{figure:'discountBars'});
add(92,10,'b1','Erstelle zu den folgenden Informationen Skizzen wie in Teilaufgabe a). Berechne dann den Preis nach der Preissenkung.\n(1) Eine Tischtennisplatte hat bisher 300 Euro gekostet. Der Preis wird um 30 % reduziert.','a şıkkındaki gibi bir fiyat/indirim şeması çiz ve yeni fiyatı bul.\n(1) Masa tenisi masası 300 € idi. %30 indirim yapılıyor.');
add(92,10,'b2','Erstelle zu den folgenden Informationen Skizzen wie in Teilaufgabe a). Berechne dann den Preis nach der Preissenkung.\n(2) Eine Matratze hat bisher 300 Euro gekostet. Der Preis wird um 70 % gesenkt.','a şıkkındaki gibi bir fiyat/indirim şeması çiz ve yeni fiyatı bul.\n(2) Yatak 300 € idi. %70 indirim yapılıyor.');
const d11='Berechne den neuen Preis sowohl mit einem Dreisatz als auch mit der Formel. Welchen Rechenweg findest du einfacher? Begründe.';
for(const [part,de,tr] of [
 ['a','Ein Bilderrahmen hat bisher 15 € gekostet. Der Preis wird um 40 % reduziert.','Çerçeve eskiden 15 € idi. %40 indirim.'],
 ['b','Eine Tasche hat bisher 60 € gekostet. Der Preis wird um 15 % reduziert.','Çanta eskiden 60 € idi. %15 indirim.'],
 ['c','Ein Poster hat bisher 4 € gekostet. Der Preis wird um 30 % reduziert.','Poster eskiden 4 € idi. %30 indirim.'],
 ['d','Eine Lampe hat bisher 30 € gekostet. Der Preis wird um 35 % reduziert.','Lamba eskiden 30 € idi. %35 indirim.']
])add(92,11,part,d11+'\n'+part+') '+de,'Yeni fiyatı hem orantı (Dreisatz) hem formülle hesapla. Hangi yöntemi daha kolay buluyorsun? Neden?\n'+part+') '+tr);
add(92,12,'a','Ein Fahrrad kostet 350 €. Ein neues Modell der gleichen Firma kommt auf den Markt. Es ist um 25 % teurer als das bisherige Modell. Berechne den Preis des neuen Modells.','Bisikletin eski modeli 350 €. Yeni model %25 daha pahalı. Yeni fiyatı hesapla.');
add(92,12,'b','Die Miete von Familie Meckermann beträgt 800 € im Monat. Sie soll nun um 10 % erhöht werden. Berechne, wie hoch die Miete nach der Erhöhung sein wird.','Bir ailenin aylık kirası 800 €. Kira %10 artıyor. Yeni kirayı bul.');
add(92,12,'c','Vor 10 Jahren wohnten in einem Dorf 800 Menschen. Die Einwohnerzahl ist seitdem um 30 % gestiegen. Berechne, wie viele Menschen jetzt in dem Dorf leben.','Bir köyde 10 yıl önce 800 kişi yaşıyordu. Nüfus %30 arttı. Şimdi kaç kişi var?');
add(92,13,'','Einige Schülerinnen und Schüler haben die dargestellte Aufgabe mit dem Taschenrechner bearbeitet. Auf den Bildern (1) bis (5) ist abgebildet, was sie in den Taschenrechner eingegeben haben. Das Endergebnis fehlt jedoch. Gib an, welche Lösungswege richtig sind. Begründe.\nAufgabe: Die Klasse 7a plant einen Ausflug in den Zoo. Der Eintritt kostet 12 € pro Kind. Wegen einer Sonderaktion für Schulklassen ist der Eintritt um 35 % billiger. Berechne, was nun jedes Kind zahlen muss.','Öğrenciler hesap makinesiyle beş farklı hesap yolu kullanmıştır. Doğru olanları belirleyip nedenini açıkla.\n7a sınıfı hayvanat bahçesine gidiyor. Giriş çocuk başına 12 €. Okul grupları için %35 indirim var. Çocuk başına yeni ücreti bul. **(1)–(5) tuşlama görüntüleri küçük ve net okunamadığı için fotoğraftan kesin aktarılmamıştır; kitapla karşılaştır.**');
const d14='Finde den Fehler! Erkläre jeweils, was falsch gemacht wurde, und korrigiere im Heft. Verwende Fachbegriffe.';
add(92,14,'a',d14+'\na) In einer Rechnung zu einem alten Preis und einer Reduzierung wurden der Prozentwert und der neue Preis verwechselt. Prüfe die Rechnung im Buch.','Hataları bul, matematik terimleriyle açıkla ve doğru işlemi yap.\na) Eski fiyat, indirim miktarı ve yeni fiyat karıştırılmış. Kitaptaki çözümü incele.');
add(92,14,'b',d14+'\nb) Eine Prozentrechnung enthält einen fehlerhaften Ansatz mit Prozentsatz p und Grundwert G. Prüfe die Rechnung im Buch.','b) Yüzde oranı p ile temel değer G yanlış kullanılmış. Kitaptaki işlemi inceleyip düzelt.');
add(92,14,'c',d14+'\nc) Ein Preis wurde zuerst um 50 % reduziert und dann nochmals um 30 % reduziert. In der fehlerhaften Lösung werden die beiden Prozentsätze einfach addiert.','c) Fiyat önce %50, sonra kalan fiyat üzerinden %30 azaltılıyor. Yanlış çözümde yüzdeler doğrudan toplanıyor. Hatayı açıkla.');
IMAGES.discountBars=table('Preisänderung: Grundpreis, Rabatt, neuer Preis',Array(3).fill(''),[
 ['Darstellung A','Grundpreis','Rabatt'],
 ['Darstellung B','Neuer Preis','Restprozentsatz']
]);
// === S.93 · Mehrwertsteuer, Prozentänderungen und Formeln ===
const d15='Wahr oder falsch? Entscheide, ob die folgenden Aussagen wahr oder falsch sind. Begründe.';
add(93,15,'a',d15+'\na) Wenn man einen Preis um 200 % erhöht, dann kostet das Produkt doppelt so viel wie vorher.','Doğru mu yanlış mı? Neden?\na) Fiyat %200 artırılırsa ürün eskisinin iki katı olur.');
add(93,15,'b',d15+'\nb) Wenn man einen Preis um 100 % senkt, dann kostet das Produkt halb so viel wie vorher.','b) Fiyat %100 düşürülürse ürün eskisinin yarısı kadar olur.');
add(93,15,'c',d15+'\nc) Wenn man einen Preis um 50 % erhöht und danach den neuen Preis um 50 % senkt, dann kostet das Produkt genauso viel wie vorher.','c) Fiyat önce %50 artırılıp sonra yeni fiyat %50 azaltılırsa başlangıç fiyatına dönülür.');
const d16='Mehrwertsteuer: In Deutschland ist auf viele Produkte der reguläre Mehrwertsteuersatz von 19 % anzuwenden. Bei manchen Produkten gilt ein ermäßigter Satz von 7 %. Preis ohne Mehrwertsteuer = Nettopreis; Preis einschließlich Mehrwertsteuer = Bruttopreis.';
add(93,16,'a',d16+'\na) Ein Handwerker teilt seinem Kunden mit, dass eine Reparatur ohne Mehrwertsteuer 150 € kostet. Berechne, wie hoch die Rechnung inklusive Mehrwertsteuer sein wird.','KDV: Pek çok üründe %19, bazı ürünlerde %7 vergi bulunur. Vergisiz fiyat net, vergili fiyat brüttür.\na) Tamirin vergisiz ücreti 150 €. %19 KDV ile faturayı hesapla.');
add(93,16,'b',d16+'\nb) Ein Automechaniker teilt seinem Kunden mit, dass eine Reparatur 220 € kosten wird. Auf der Rechnung steht dann, dass der Kunde 261,80 € zahlen soll. Erläutere, wie der Preis von 261,80 € zustande kommt.','b) Tamirci fiyatı 220 € olarak bildiriyor. Fatura 261,80 € geliyor. Bu tutarın nasıl oluştuğunu açıkla.');
add(93,16,'c',d16+'\nc) Informiere dich über die Mehrwertsteuer. Für welche Produkte gilt der Mehrwertsteuersatz von 7 %? Für welche Produkte gilt der Mehrwertsteuersatz von 19 %?','c) Almanya’daki KDV oranlarını araştır: hangi ürünlerde %7, hangilerinde %19 uygulanıyor? (Vergi oranları zamanla değişebileceğinden güncel kaynaktan kontrol et.)');
add(93,17,'a','Teste dich! Der Preis einer 145 € teuren Uhr wird um 30 % gesenkt. Der neue Preis wird dann nochmals um 20 % reduziert. Berechne den Preis nach der erneuten Reduzierung.','Kendini dene! 145 €’luk saate önce %30 indirim, sonra indirimli fiyata %20 indirim uygulanıyor. Son fiyatı bul.');
add(93,17,'b','Mahmut behauptet: Wenn der Preis erst um 30 % und dann um 20 % gesenkt wird, dann kostet die Uhr nur noch halb so viel. Erkläre, warum diese Überlegung falsch ist.','Mahmut, %30 ve ardından %20 indirimin toplamda %50 indirim olduğunu söylüyor. Neden yanlış olduğunu açıkla.');
add(93,18,'a','Im Jahr 2007 wurde die Mehrwertsteuer für die meisten Waren von 16 % auf 19 % erhöht.\na) Ein Rasenmäher hat im Jahr 2007 ohne Mehrwertsteuer 259,99 € gekostet. Berechne, um wie viel Euro der Bruttopreis durch die Mehrwertsteuererhöhung gestiegen ist.','2007’de çoğu ürün için KDV %16’dan %19’a yükseldi.\na) Vergisiz fiyatı 259,99 € olan çim biçme makinesinin brüt fiyatı kaç € arttı?');
add(93,18,'b','Paul behauptet: Wenn die Mehrwertsteuer von 16 % auf 19 % gestiegen ist, dann wurden die Preise um 3 % teurer. Überprüfe, ob Paul recht hat.','b) Paul, KDV %16’dan %19’a çıkınca ürün fiyatlarının da %3 arttığını söylüyor. Doğru mu?');
const d19='Emma behauptet: Wenn man einen Preis um 20 % (also 1/5) senkt, dann ist der alte Preis 25 % (also 1/4) höher als der neue Preis. Wenn man einen Preis um 1/5 reduziert, dann ist der alte Preis 1/4 höher als der neue Preis. Da steckt doch ein System dahinter!';
add(93,19,'a',d19+'\na) Überprüfe Emmas Aussage anhand verschiedener Zahlenbeispiele.','Emma, bir fiyat %20 azalınca eski fiyatın yeni fiyattan %25 fazla olacağını söylüyor.\na) Farklı sayısal örneklerle kontrol et.');
add(93,19,'b',d19+'\nb) Beschreibe, was du herausgefunden hast. Erkläre, wie man mit der Bruchrechnung begründen kann, warum das System so funktioniert.','b) Bulduğun düzeni açıkla. Kesir hesabıyla neden böyle olduğunu göster.');
add(93,20,'','Teste dein Grundwissen! Zuordnungen mit Formeln beschreiben.\nEin Fußballtorwart macht einen weiten Abstoß. Die Höhe h des Balls kann in den ersten zwei Sekunden mit der Formel h(t) = 10 · t − 5 · t² bestimmt werden (Zeit t in s; Höhe h in m).\nÜbertrage die Tabelle in dein Heft und fülle sie aus. Zeichne dann den Graphen.\nZeit (in s): 0 | 0,5 | 1 | 1,5 | 2.\nHöhe (in m): □ | □ | □ | □ | □.','Temel bilgilerini dene! Bir kalecinin topa vuruşundan sonraki ilk 2 saniyede topun yüksekliği h(t)=10t−5t² formülüyle bulunuyor (t saniye, h metre).\nTabloyu tamamla ve grafiğini çiz.\nZaman (s): 0 | 0,5 | 1 | 1,5 | 2.\nYükseklik (m): □ | □ | □ | □ | □.',{figure:'goal'});

const pictures=Object.fromEntries(Object.entries(IMAGES).map(([k,v])=>[k,svgData(v)]));
for(const q of Q){if(q.figureKind){q.figureImage=pictures[q.figureKind];delete q.figureKind}}
window.CHECKLIST_PACK={id:'munzur-2026',title:'Munzur · Zuordnungen & Prozentrechnung · S. 50–51, 91–93',questions:Q};
})();