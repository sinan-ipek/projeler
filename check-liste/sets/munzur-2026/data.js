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
// MUNZUR_MORE_QUESTIONS
const pictures=Object.fromEntries(Object.entries(IMAGES).map(([k,v])=>[k,svgData(v)]));
for(const q of Q){if(q.figureKind){q.figureImage=pictures[q.figureKind];delete q.figureKind}}
window.CHECKLIST_PACK={id:'munzur-2026',title:'Munzur · Zuordnungen & Prozentrechnung · S. 50–51, 91–93',questions:Q};
})();