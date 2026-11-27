/* Tuana 2 · v1.24.0: Vor-Abiturprüfung 2026, Teil A/B, Operatoren.
   10 photographs supplied by the user. Figures reconstructed on white SVG.
   Correct choice stored as an ID; not rendered as a spoiler.
*/
(function(){
'use strict';
const questions=[],diagrams={};
const text=(x,y,s,size=16)=>'<text x="'+x+'" y="'+y+'" font-family="Arial" font-size="'+size+'" fill="#253c30">'+s+'</text>';
const begin=(w,h)=>'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+w+' '+h+'" width="'+w+'" height="'+h+'"><rect width="'+w+'" height="'+h+'" fill="#fff"/>';
const asImage=s=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
function grid(w,h){let a='';for(let x=48;x<w-30;x+=30)a+='<path d="M'+x+' 40V'+(h-35)+'" stroke="#e2e8e3"/>';for(let y=40;y<h-30;y+=30)a+='<path d="M48 '+y+'H'+(w-30)+'" stroke="#e2e8e3"/>';return a}
let img=begin(640,320)+grid(640,320)+text(30,28,'B3 · Murmelbahnprofil (aus Foto neu gezeichnet)',20);
img+='<path d="M55 55V265H612" stroke="#54675b" stroke-width="2" fill="none"/><path d="M55 56 C95 151 139 219 207 223 C262 225 310 188 364 188 C437 188 468 196 502 255" stroke="#405c4b" stroke-width="4" fill="none"/>'+text(54,49,'A')+text(218,244,'B')+text(516,273,'C')+text(60,300,'1 LE = 10 cm',16)+'</svg>';
diagrams.b3=asImage(img);
img=begin(680,360)+grid(680,360)+text(24,26,'B3 · Tunnelprofil, weiß und bereinigt',19);
const tx=x=>325+x*88,ty=y=>220-y*90,f=x=>-.2*x*x*x-.1*x*x+2*x;
img+='<path d="M20 220H655 M325 48V328" stroke="#506d5c" stroke-width="2" fill="none"/>';
let d='';for(let x=-2.5;x<3.35;x+=.04)d+=(d?'L':'M')+tx(x).toFixed(1)+' '+ty(f(x)).toFixed(1);
img+='<path d="'+d+'" fill="none" stroke="#3e5c4d" stroke-width="4"/>';
const ax=tx(2.2),ay=ty(f(2.2));
img+='<path d="M325 220 L'+ax+' 220 L'+ax+' '+ay+' Z" fill="#a3c2ad55" stroke="#577a67" stroke-width="2"/>'+text(335,336,'f(x)=−0,2x³−0,1x²+2x; 1 LE = 2 cm',16)+'</svg>';
diagrams.tunnel=asImage(img);
img=begin(660,355)+grid(660,355)+text(24,27,'B4 · Steckbriefskizze, neu gezeichnet',19);
img+='<path d="M152 48 C166 127 177 220 229 237 C297 256 343 77 397 71 C443 67 458 197 470 252" fill="none" stroke="#334b3a" stroke-width="4"/>';
img+=text(25,284,'y-Achse: −3,5  ·  Nullstelle x=−1',18)+text(25,316,'Wendestelle x=−2  ·  Extremstelle x=0',18)+'</svg>';
diagrams.b4=asImage(img);
img=begin(660,275)+text(20,25,'Wahlpflichtaufgabe 5 · Baumdiagramm',20);
img+='<path d="M54 130L250 75 M54 130L250 205 M267 75L487 38 M267 75L487 105 M267 205L487 171 M267 205L487 239" fill="none" stroke="#55725c" stroke-width="2.5"/>';
img+=text(260,78,'A',19)+text(260,211,'Ā',19)+text(496,45,'B',19)+text(496,112,'B̄',19)+text(496,178,'B',19)+text(496,246,'B̄',19);
img+=text(146,87,'1/4',17)+text(370,165,'1/3',17)+text(35,262,'P(A∩B)=1/20. Fehlende Werte selbst ergänzen.',17)+'</svg>';
diagrams.tree=asImage(img);
const vals=[3,4,2,1,4,5,0,2,0,3,1,2,0,5,1,4,4,3,2,2,3];
img=begin(850,135)+text(15,27,'Wahlpflichtaufgabe 6 · Ergebnisse von 21 Schülerinnen und Schülern',17);
vals.forEach((n,i)=>{const x=20+i*39;img+='<circle cx="'+x+'" cy="79" r="17" fill="'+['#d3f3ed','#f9e9b8','#e9d3d7','#ccedde','#e9dfeb','#f6ddb6'][n]+'" stroke="#94a99b"/>'+text(x-6,85,n,20)});
diagrams.scores=asImage(img+'</svg>');
function add(part,ref,de,tr,correct,distractors,options={}){
 const id='tuana2-'+part.toLowerCase()+'-'+ref.toLowerCase().replace(/[^a-z0-9]/g,'-');
 const raw=[correct,...distractors];
 if(raw.length!==4&&raw.length!==5)throw Error('Invalid choice count '+id);
 if(new Set(raw).size!==raw.length)throw Error('Repeated options '+id);
 let seed=0;for(const ch of id)seed=(seed*31+ch.charCodeAt(0))>>>0;
 const choices=raw.map((label,index)=>({value:String(index),label})).sort((a,b)=>((Number(a.value)+seed)%raw.length)-((Number(b.value)+seed)%raw.length));
 const q={id,page:options.page||('Teil '+part),exercise:options.exercise||ref,number:options.number||ref,section:part,
   german:de,turkish:tr,kind:options.kind||'exam',
   choices,correctAnswer:'0',
   calculatorAllowed:part==='B',
   calculatorNote:part==='B'?'Not: hesap makinesi kullanabilirsiniz.':'Not: hesap makinesi kullanamazsınız.',
   explanation:options.explanation||'',notes:options.notes||'',star:false};
 if(options.figure)q.figureImage=diagrams[options.figure];
 questions.push(q);
}
const ex=(part,group,label,de,tr,answer,wrong,extras={})=>add(part,group+'-'+label,de,tr,answer,wrong,{...extras,page:'Teil '+part+' · '+group,exercise:group,number:group+' '+label});
// Teil B. Taschenrechner, Formelsammlung und Rechtschreibwörterbuch erlaubt.
const u='In einem Vorgarten wachsen anfangs 1,5 m² Unkraut. Nach 10 Tagen sind es 2 m². Das Wachstum ist exponentiell.';
const ut='Bahçede başlangıçta 1,5 m², 10 gün sonra 2 m² yabani ot var. Üstel artış kabul ediliyor.';
ex('B','B1','a',u+'\na) Geben Sie f(t)=c·a^t und f(t)=c·e^(kt) an.',ut+'\na) Üstel fonksiyonu iki biçimde kur.','f(t)=1,5·(4/3)^(t/10)',['f(t)=1,5·(4/3)^t','f(t)=2·(1,5)^t','f(t)=1,5·(3/4)^(t/10)'],{explanation:'k=ln(4/3)/10, c=1,5.'});
ex('B','B1','b',u+'\nb) Bestimmen Sie die Fläche nach 14 Tagen.',ut+'\nb) 14 gün sonra alan kaçtır?','etwa 2,24 m²',['etwa 1,98 m²','etwa 3 m²','etwa 1,50 m²']);
ex('B','B1','c',u+'\nc) Berechnen Sie den Zeitpunkt, an dem 3 m² bewachsen sind.',ut+'\nc) 3 m² alan oluşacağı günü bul.','etwa 24,1 Tage',['etwa 20 Tage','etwa 15 Tage','etwa 30 Tage']);
ex('B','B1','d',u+'\nd) Bestimmen und interpretieren Sie die Verdopplungszeit.',ut+'\nd) İkiye katlanma süresini ve anlamını bul.','etwa 24,1 Tage; danach ist die Fläche doppelt so groß.',['10 Tage','14 Tage','20 Tage']);
const h='Die Höhe einer Unkrautart wird durch g(x)=(x−0,5)·e^(−x) für 0≤x≤4 beschrieben.';
const ht='Bir yabani otun boyu g(x)=(x−0,5)·e^(−x) fonksiyonuyla veriliyor; 0≤x≤4.';
const bs=[
 ['a1','Nullstelle bestimmen.','Kökü hesapla.','x=0,5',['x=−0,5','x=1','x=1,5']],
 ['a2','Hoch- oder Tiefpunkt bestimmen.','Ekstremum noktası ve türünü bul.','Hochpunkt bei x=1,5',['Tiefpunkt bei x=1,5','Hochpunkt bei x=0,5','Tiefpunkt bei x=2,5']],
 ['a3','Wendestelle bestimmen.','Büküm yerini bul.','x=2,5',['x=0,5','x=1,5','x=3,5']],
 ['a4','Krümmungsverhalten untersuchen.','Eğrilik yönünü incele.','bis 2,5 konkav, danach konvex.',['überall konkav','bis 2,5 konvex, danach konkav','überall konvex']],
 ['a5','Definitionsbereich angeben.','Tanım aralığını yaz.','0≤x≤4',['−4≤x≤4','x≥4','nur x=0']],
 ['a6','Randwerte g(0) und g(4) berechnen.','Uç değerleri hesapla.','g(0)=−0,5 und g(4)=3,5e^(−4)',['g(0)=0 und g(4)=4','g(0)=0,5 und g(4)=3,5','g(0)=−1 und g(4)=4e⁴']],
 ['a7','Monotonie bestimmen.','Artış/azalış aralıklarını bul.','bis x=1,5 steigend, danach fallend.',['überall steigend','überall fallend','bis x=1,5 fallend, danach steigend']],
 ['a8','Wertebereich für 0≤x≤4 angeben.','Değer kümesini belirle.','[−0,5; e^(−1,5)]',['[0;1]','[−0,5;0]','[0; e^(−1,5)]']],
 ['a9','Grenzwert bei x→∞ bestimmen.','x sonsuza giderken limiti bul.','0',['∞','−∞','1']],
 ['a10','Graphen für 0≤x≤4 skizzieren.','0–4 aralığında grafiği çiz.','Nullstelle 0,5; Hochpunkt bei 1,5; danach fallend.',['Minimum bei 1,5','überall linear','keine Nullstelle']]
];
for(const [l,de,tr,a,other]of bs)ex('B','B1','2'+l,h+'\n'+de,ht+'\n'+tr,a,other);
ex('B','B1','2b',h+'\nBestimmen Sie die Wendetangente.',ht+'\nBüküm teğetini bul.','t(x)=e^(−2,5)·(4,5−x)',['t(x)=e^(−2,5)·(4,5+x)','t(x)=e^(−1,5)·(1,5−x)','t(x)=2,5x−0,5']);
const b3='Eine Kugel fährt auf einer modularen Murmelbahn. 1 LE=10 cm. Start A: 30 cm Höhe; nach 20 cm Entfernung liegt der tiefste Punkt B. Eine ganzrationale Funktion dritten Grades beschreibt 0≤x≤6.';
const b3tr='Oyuncak misket yolu: 1 birim=10 cm. Başlangıç A: 30 cm; 20 cm sonra en alçak B noktası. Yol 0≤x≤6 için kübik fonksiyondur.';
ex('B','B3','a',b3+'\nBestimmen Sie eine passende Funktionsgleichung.',b3tr+'\nFonksiyonun denklemini bul.','f(x)=−x³/9+x²−8x/3+3',['f(x)=x³/9−x²+8x/3+3','f(x)=−x³+x²−8x/3+3','f(x)=−x³/9+x²+8x/3+3'],{figure:'b3'});
ex('B','B3','b',b3+'\nErmitteln Sie den höchsten Punkt des Hügels und die Entfernung von A.',b3tr+'\nEn yüksek tepeyi ve A’ya uzaklığı bul.','Hochpunkt x=4; f(4)=11/9; Abstand 40 cm.',['Hochpunkt x=2; f(2)=7/9.','Hochpunkt x=6; f(6)=−1.','Hochpunkt x=3; f(3)=1.'],{figure:'b3'});
ex('B','B3','c',b3+'\nDie Flugbahn ist eine Parabel, knüpft in C tangential an und erreicht bei x=19/3 die maximale Höhe. Bestimmen Sie die Funktion.',b3tr+'\nC’de teğetsel başlayan ve x=19/3 noktasında en yüksek olan parabolü bul.','g(C)=f(C), g′(C)=f′(C), g′(19/3)=0',['nur g(C)=f(C)','g′(C)=0','g(0)=0 genügt'],{figure:'b3',notes:'Şıklar çözümün koşullarını denetler; parabol denklemini beyaz tahtada kendin oluştur.'});
const tunnel='Tunnelprofil: f(x)=−0,2x³−0,1x²+2x, 1 LE=2 cm. Der Tunnelquerschnitt soll ein Dreieck sein.';
const tunnelTr='Tünel profili: f(x)=−0,2x³−0,1x²+2x; 1 birim=2 cm. Kesit üçgen olacak.';
ex('B','B3','d1',tunnel+'\nc) Stellen Sie eine Zielfunktion für die Dreiecksfläche mit Definitionsbereich auf.',tunnelTr+'\nAlan amaç fonksiyonunu ve tanım aralığını kur.','A(x)=½xf(x), 0≤x≤(√161−1)/4',['A(x)=x+f(x)','A(x)=x²+f(x)²','A(x)=½f(x)'],{figure:'tunnel'});
ex('B','B3','d2',tunnel+'\nd) Bestimmen Sie den maximalen Flächeninhalt.',tunnelTr+'\nMaksimum kesit alanını bul.','ungefähr 8,02 cm²',['ungefähr 2,01 cm²','ungefähr 4,01 cm²','ungefähr 16,04 cm²'],{figure:'tunnel'});
const b4='Steckbrief einer ganzrationalen Funktion dritten Grades: y-Achse bei −3,5; Nullstelle x=−1; Wendestelle x=−2; Extremstelle x=0.';
const b4tr='Bir kübik fonksiyon: y ekseni kesişimi −3,5; kök −1; büküm yeri −2; ekstremum yeri 0.';
ex('B','B4','a',b4+'\nStellen Sie ein lineares Gleichungssystem auf und lösen Sie mit Gauß.',b4tr+'\nDenklem sistemi kurup Gauss ile çöz.','f(x)=0,7x³+4,2x²−3,5',['f(x)=−0,7x³−4,2x²−3,5','f(x)=0,7x³−4,2x²+3,5','f(x)=−0,7x³+4,2x²−3,5'],{figure:'b4'});
ex('B','B4','b',b4+'\nUntersuchen Sie die Extremstellen und begründen Sie, warum die Skizze nicht passt.',b4tr+'\nEkstremumları incele, eskiz neden uymuyor?','Bei x=0 hat die berechnete Funktion ein Minimum; die Skizze zeigt dort ein Maximum.',['Beide haben dort ein Maximum.','Die Funktion hat keine Extremstellen.','Kubische Funktionen besitzen keinen Wendepunkt.'],{figure:'b4'});
// Teil A: kein Taschenrechner
const f1='f(x)=ax²+bx+c geht durch A(−1|4), B(1|1), C(3|0).';
ex('A','Pflicht 1','a',f1+'\nBestimmen Sie f.','Parabol verilen üç noktadan geçiyor. Denklemini bul.','f(x)=¼x²−(3/2)x+9/4',['f(x)=x²−3x+2','f(x)=¼x²+(3/2)x+9/4','f(x)=½x²−3x+1']);
ex('A','Pflicht 1','b',f1+'\nGeben Sie die Nullstellen an.','Parabolün köklerini yaz.','x=3 (doppelte Nullstelle)',['x=−1 und 3','x=1 und 3','keine Nullstelle']);
const f2='x−2y−3z=−3; y+5z=4; 2y+az=4.';
ex('A','Pflicht 2','a','Gegeben: '+f2+'\nLösen Sie für a=6.','Parametreli sistemde a=6 için çöz.','(x,y,z)=(−2,−1,1)',['(−2,1,−1)','(1,−2,1)','(2,−1,1)']);
ex('A','Pflicht 2','b','Gegeben: '+f2+'\nBegründen Sie, dass für a=10 keine Lösung besteht.','a=10 için neden çözüm olmadığını göster.','2y+10z kann nicht gleichzeitig 8 und 4 sein.',['Alle Gleichungen sind identisch.','Es gibt genau eine Lösung.','z=0 macht das System konsistent.']);
const balls='Eine Urne enthält vier rote und zwei blaue Kugeln. Zwei Kugeln werden ohne Zurücklegen gezogen.';
ex('A','Pflicht 3','a',balls+'\nZeichnen Sie ein Baumdiagramm und geben Sie Pfadwahrscheinlichkeiten an.','Torba: 4 kırmızı, 2 mavi. Geri koymadan 2 top çek. Olasılık ağacı çiz.','P(RR)=2/5, P(RB)=4/15, P(BR)=4/15, P(BB)=1/15',['4/9, 2/9, 2/9, 1/9','alle vier gleich 1/4','1/5, 1/5, 1/5, 2/5']);
ex('A','Pflicht 3','b1',balls+'\nBestimmen Sie P(eine rote und eine blaue Kugel).','Bir kırmızı bir mavi olasılığı?','8/15',['2/15','4/15','2/5']);
ex('A','Pflicht 3','b2',balls+'\nBestimmen Sie P(zwei gleichfarbige Kugeln).','İki topun aynı renk olması olasılığı?','7/15',['8/15','1/3','2/5']);
const wf1='f(x)=(1/5)x⁴−(2/5)x²−(1/2)x+1.';
ex('A','Wahl 1','a',wf1+'\nBestimmen Sie f′ und f″.','Birinci ve ikinci türevleri bul.','f′=4/5·x³−4/5·x−1/2, f″=12/5·x²−4/5',['f′=x³−x−1/2, f″=3x²−1','f′=4/5·x³−2/5·x','f′=x²−2/5']);
ex('A','Wahl 1','b',wf1+'\nSkizzieren Sie f, f′ und f″.', 'f, f′ ve f″ grafiklerini aynı düzlemde çiz.','f Grad 4, f′ Grad 3, f″ Grad 2.',['alle sind linear','f″ ist Grad 4','f′ ist Grad 2']);
const wf2='f(x)=x³−12x+16.';
ex('A','Wahl 2','a',wf2+'\nZeigen Sie, dass −2 und 2 Extremstellen sind.','−2 ve 2’nin ekstremum yeri olduğunu kanıtla.','f′=3x²−12, f′(±2)=0',['f′=x²−12','f″(±2)=0','f ist konstant']);
ex('A','Wahl 2','b',wf2+'\nBegründen Sie, dass die x-Achse den Graphen in genau einem Punkt berührt.','Grafiğin x eksenine tek noktada teğet olduğunu göster.','f=(x−2)²(x+4), doppelte Nullstelle x=2.',['f besitzt keine Nullstelle.','x=−4 ist doppelt.','f=(x+2)²(x−4)']);
const wf3='A(2|3|0), B(−3|2|1), C(3|−1|2).';
ex('A','Wahl 3','a',wf3+'\nZeichnen Sie die Punkte, verbinden Sie sie und benennen Sie die Figur.','Noktaları 3B çizip birleştir, şekli adlandır.','ein Dreieck',['ein Quadrat','eine Kugel','ein Quader']);
ex('A','Wahl 3','b',wf3+'\nErgänzen Sie einen Punkt zu einem Parallelogramm.','Paralelkenarı tamamlamak için dördüncü noktayı bul.','D=A+C−B=(8|0|1)',['D=(−4|6|−1)','D=(2|−1|3)','D=(−8|0|−1)'],{notes:'Birden fazla doğru paralelkenar mümkündür. Şık belirli bir köşe sıralamasını denetler.'});
ex('A','Wahl 4','a','Rechteck: A(3|−1|0), B(3|3|0), C(3|3|3), D(3|−1|3).\nBestimmen Sie den Mittelpunkt.','Dikdörtgenin orta noktasını bul.','M=(3|1|1,5)',['M=(3|2|3)','M=(0|1|1,5)','M=(3|−1|3)']);
const wf5='Gegeben: P(A∩B)=1/20, P(A)=1/4, P(B|¬A)=1/3. Ergänzen Sie das Baumdiagramm.';
ex('A','Wahl 5','a',wf5+'\nErgänzen Sie fehlende Äste und Pfadwahrscheinlichkeiten.','Ağaçtaki eksik dalları ve yol olasılıklarını tamamla.','P(B|A)=1/5 und P(¬A)=3/4',['P(B|A)=1/20','P(B|A)=1/4','P(¬A)=1/4'],{figure:'tree'});
ex('A','Wahl 5','b1',wf5+'\nBestimmen Sie P(B).','P(B) hesapla.','3/10',['1/20','1/5','1/3'],{figure:'tree'});
ex('A','Wahl 5','b2',wf5+'\nBestimmen Sie P(B|¬A).','A değilken B olasılığını bul.','1/3',['1/20','1/4','3/4'],{figure:'tree'});
ex('A','Wahl 5','b3',wf5+'\nBestimmen Sie P(¬B).','B değil olasılığı kaç?','7/10',['1/3','1/4','3/10'],{figure:'tree'});
const wf6='Im Berlin-Quiz erzielten 21 Schüler diese Punktzahlen: '+vals.join(', ')+'.';
ex('A','Wahl 6','a',wf6+'\nErstellen Sie eine Häufigkeitstabelle (absolut und relativ).','Mutlak/bağıl frekans tablosu yap.','0 Punkte: 3-mal, relativer Anteil 3/21',['0 Punkte: 1-mal','alle Punkte: genau 3-mal','relativer Nenner: 5'],{figure:'scores'});
ex('A','Wahl 6','b',wf6+'\nBerechnen und interpretieren Sie das arithmetische Mittel.','Ortalamayı bul ve yorumla.','51/21 ≈ 2,43 Punkte',['51/5=10,2','21/51≈0,41','3,00 Punkte'],{figure:'scores'});
// Operator meanings: the source explanation appears only AFTER the right choice.
const ops=[
 ['B','Bestimmen Sie','Zusammenhänge beziehungsweise Lösungswege aufzeigen, Vorgehen darstellen und Ergebnisse formulieren.','Çözüm yolunu göstermek ve sonucu belirtmek.','Vorgehen und Ergebnis darstellen.'],
 ['B','Ermitteln Sie','Zusammenhänge beziehungsweise Lösungswege aufzeigen, Vorgehen darstellen und Ergebnisse formulieren.','Sonuca adım adım ulaşmak.','Ein Ergebnis nachvollziehbar erarbeiten.'],
 ['B','Diskutieren Sie','Eine vollständige Funktionsuntersuchung ist rechnerisch darzustellen.','Tam fonksiyon incelemesini hesaplarla yapmak.','Eine vollständige Funktionsuntersuchung durchführen.'],
 ['B','Untersuchen Sie','Das Verfahren kann frei gewählt werden; das Vorgehen ist darzustellen.','Yöntem seçerek inceleme yapmak ve yolu göstermek.','Rechnerisch oder grafisch untersuchen und den Weg zeigen.'],
 ['B','Zeigen Sie','Aussagen durch logisches Schließen bestätigen; Vorgehen darstellen.','Mantıksal çıkarımlarla kanıtlamak.','Eine Aussage logisch nachweisen.'],
 ['B','Prüfen Sie','Eine Aussage logisch überprüfen; Vorgehen darstellen.','Doğruluğu sınamak ve gerekçelendirmek.','Die Gültigkeit einer Aussage kontrollieren.'],
 ['B','Entscheiden Sie','Zwischen Möglichkeiten mit logischer Begründung entscheiden.','Gerekçeli seçim yapmak.','Begründet zwischen Möglichkeiten wählen.'],
 ['B','Bewerten Sie','Aussagen oder Sachverhalte logisch beurteilen; Vorgehen darstellen.','Ölçütlere göre gerekçeli değerlendirme yapmak.','Eine Aussage nachvollziehbar beurteilen.'],
 ['B','Begründen Sie','Aussagen durch logisches Schließen bestätigen.','Sonucun neden doğru olduğunu açıklamak.','Eine Behauptung logisch begründen.'],
 ['B','Berechnen Sie','Die Berechnung ist ausgehend von einem Ansatz darzustellen.','Başlangıç işleminden sonuca hesap yapmak.','Einen Rechenansatz mit Schritten zeigen.'],
 ['B','Erstellen Sie','Die zeichnerische beziehungsweise inhaltliche Darstellung ist möglichst genau anzufertigen.','İstenen gösterimi doğru oluşturmak.','Eine genaue Darstellung anfertigen.'],
 ['B','Zeichnen Sie','Eine Zeichnung oder Skizze möglichst genau anfertigen.','Şekli dikkatlice çizmek.','Eine möglichst genaue Zeichnung anfertigen.'],
 ['B','Geben Sie an','Für die Nennung ist keine Begründung notwendig.','Yalnızca sonucu bildirmek.','Das Ergebnis ohne Begründung nennen.'],
 ['B','Stellen Sie auf','Siehe „Erstellen Sie“.','Model veya denklemi kurmak.','Ein Modell oder eine Gleichung aufstellen.'],
 ['A','Lösen Sie','Sinnvolles Anwenden der Rechenfähigkeiten.','Uygun işlemlerle problemi çözmek.','Eine Aufgabe rechnerisch lösen.'],
 ['A','Begründen Sie (rechnerisch)','Siehe „Zeigen Sie“.','Hesapla gerekçelendirmek.','Eine Aussage mit Rechenschritten begründen.'],
 ['A','Stellen Sie dar','Siehe „Bestimmen Sie“.','Çözüm yolunu ve sonucu sunmak.','Das Vorgehen geordnet darstellen.'],
 ['A','Skizzieren Sie','Die Skizze muss die wesentlichen Merkmale wiedergeben.','Temel özellikleri gösteren kabaca çizim yapmak.','Die wesentlichen Merkmale in einer Skizze zeigen.'],
 ['A','Übertragen Sie','Siehe „Zeichnen Sie“.','Verileni kendi sayfana geçirmek.','Die Vorlage in die eigene Arbeit übernehmen.'],
 ['A','Ergänzen Sie','Siehe „Geben Sie an“.','Eksikleri tamamlamak.','Fehlende Angaben hinzufügen.'],
 ['A','Benennen Sie','Siehe „Geben Sie an“.','Doğru isimle adlandırmak.','Den passenden Namen angeben.']
];
const wrongMeaning=['Nur eine Zahl ohne Rechenweg nennen.','Einen Graphen möglichst exakt zeichnen.','Alle Angaben ohne Prüfung übernehmen.','Nur die Anfangswerte abschreiben.','Die Aufgabe ohne Begründung überspringen.'];
ops.forEach(([part,term,definition,tr,correct],i)=>{
 const wrong=wrongMeaning.filter(x=>x!==correct).slice(0,3);
 add(part,'Operator-'+String(i+1).padStart(2,'0'),'Was bedeutet „'+term+'“ in einer Mathematikprüfung?','Matematik sınavında „'+term+'“ ne yapmanı ister?',correct,wrong,{
  page:part==='A'?'Operatoren · Teil A':'Operatoren · Teil B',exercise:'Operatoren',
  number:term,kind:'operator',explanation:'Deutsch: '+definition+'\nTürkçe: '+tr,
  notes:'Anlamı doğru seçmeden açıklama gösterilmez.'
 });
});

/* v1.23.0 · Satır satır Almanca–Türkçe eşleme denetimi.
   Bu sözlük önceki kart kimliklerini, cevapları ve ilerleme kayıtlarını korur.
   Almanca ve Türkçe metinler aynı verileri, aynı koşulları ve aynı talepleri içerir.
   B1 inceleme sorusunun genel talimatı, kontrol maddelerine bölünmüştür. */
const bilateral=new Map();
const contexts={
 B1:[
 'In einem Vorgarten sind 1,5 m² Unkraut. Der Gärtner geht von einer exponentiellen Ausbreitung aus. Denn 10 Tage später sind es bereits 2 m².',
 'Bir ön bahçede 1,5 m² yabani ot bulunmaktadır. Bahçıvan bunların üstel biçimde yayıldığını varsaymaktadır. Çünkü 10 gün sonra yabani otlarla kaplı alan 2 m² olmuştur.'
 ],
 B1H:[
 'Da jedes Unkraut eine andere Wachstumshöhe hat, hat sich der Gärtner nun die folgende Funktion f(x)=(x−0,5)·e^(−x) zur Höhe einer Unkrautart überlegt.',
 'Her yabani otun büyüme yüksekliği farklı olduğundan bahçıvan, bir yabani ot türünün yüksekliği için f(x)=(x−0,5)·e^(−x) fonksiyonunu düşünmüştür.'
 ],
 B3:[
 'Auf einer Messe für Kinderspielzeug wird eine modulare Murmelbahn präsentiert. In einem Bauteil durchläuft die Kugel eine Tal-Berg-Fahrt. Wählt man als eine Längeneinheit 10 cm, kann die Profillinie des Bauteils im Längsschnitt mit einem Graphen einer ganzrationalen Funktion dritten Grades für 0≤x≤6 beschrieben werden. Die Kugel startet im Punkt A in einer Höhe von 30 cm und rollt zunächst bergab. Nach einer horizontalen Entfernung von 20 cm erreicht sie den Punkt B, den tiefsten Punkt des Tals. Von dort geht es leicht bergauf über einen Hügel. Im Punkt C(3|1) ist der Anstieg des Hügels am stärksten.',
 'Bir çocuk oyuncağı fuarında modüler bir misket yolu tanıtılmaktadır. Misket, bir parçada önce vadiye inip sonra tepeye çıkar. Uzunluk birimi olarak 10 cm seçilirse parçanın boyuna kesitteki profili, 0≤x≤6 için üçüncü dereceden bir polinom fonksiyonun grafiğiyle tanımlanabilir. Misket A noktasında 30 cm yükseklikten başlar ve önce aşağı yuvarlanır. Yatayda 20 cm yol aldıktan sonra vadinin en alçak noktası olan B noktasına ulaşır. Oradan hafifçe yokuş yukarı çıkıp bir tepenin üzerinden geçer. C(3|1) noktasında tepenin eğimi en büyüktür.'
 ],
 B3T:[
 'Nun soll das Bauteil der Murmelbahn optimiert werden, indem ein Tunnel durch das Bauteil führt. Dafür wird nur noch der Hügel des Bauteils betrachtet. Zur Vereinfachung wird dieser Hügel mit der Funktion f(x)=−0,2x³−0,1x²+2x dargestellt. Hinweis: Diese Funktion hat keinerlei Zusammenhang mit Teilaufgabe a). Um die Herstellung des Bauteils zu vereinfachen, soll der Tunnel die Form eines Dreiecks annehmen.',
 'Şimdi misket yolu parçasının içinden bir tünel geçirilerek parça iyileştirilmek isteniyor. Bunun için yalnızca parçanın tepesi inceleniyor. Basitleştirme amacıyla bu tepe f(x)=−0,2x³−0,1x²+2x fonksiyonuyla gösteriliyor. Not: Bu fonksiyonun a alt maddesiyle hiçbir bağlantısı yoktur. Parçanın üretimini kolaylaştırmak için tünelin üçgen biçiminde olması isteniyor.'
 ],
 B4:[
 'Der Steckbrief beschreibt den Graphen einer ganzrationalen Funktion f dritten Grades. Angaben: Der Graph schneidet die y-Achse bei y=−3,5; Nullstelle x=−1; Wendestelle x=−2; Extremstelle bei x=0.',
 'Özellik listesi, üçüncü dereceden bir polinom fonksiyonu f’nin grafiğini tanımlıyor. Veriler: Grafik y eksenini y=−3,5 değerinde kesiyor; kök x=−1; büküm noktası x=−2; ekstremum yeri x=0.'
 ],
 P1:[
 'Der Graph einer quadratischen Funktion f mit f(x)=ax²+bx+c verläuft durch die Punkte A(−1|4), B(1|1) und C(3|0).',
 'f(x)=ax²+bx+c biçimindeki ikinci dereceden f fonksiyonunun grafiği A(−1|4), B(1|1) ve C(3|0) noktalarından geçmektedir.'
 ],
 P2:[
 'Gegeben ist ein lineares Gleichungssystem mit Parameter a:\nx−2y−3z=−3\ny+5z=4\n2y+a·z=4.',
 'a parametreli bir doğrusal denklem sistemi verilmiştir:\nx−2y−3z=−3\ny+5z=4\n2y+a·z=4.'
 ],
 P3:[
 'Eine Urne enthält vier rote und zwei blaue Kugeln. Es werden zwei Kugeln ohne Zurücklegen entnommen.',
 'Bir torbada dört kırmızı ve iki mavi top bulunmaktadır. Geri koymadan iki top çekiliyor.'
 ],
 W1:[
 'Gegeben ist die Funktion f mit f(x)=(1/5)x⁴−(2/5)x²−(1/2)x+1.',
 'f(x)=(1/5)x⁴−(2/5)x²−(1/2)x+1 fonksiyonu verilmiştir.'
 ],
 W2:[
 'Gegeben ist die in ℝ definierte Funktion f mit f(x)=x³−12x+16.',
 'Gerçek sayılar kümesinde (ℝ) tanımlı f(x)=x³−12x+16 fonksiyonu verilmiştir.'
 ],
 W3:[
 'Zeichnen Sie ein kartesisches Koordinatensystem. Gegeben sind die Punkte A(2|3|0), B(−3|2|1) und C(3|−1|2).',
 'Bir Kartezyen koordinat sistemi çiziniz. A(2|3|0), B(−3|2|1) ve C(3|−1|2) noktaları verilmiştir.'
 ],
 W4:[
 'Gegeben sind die Eckpunkte eines Rechtecks mit A(3|−1|0), B(3|3|0), C(3|3|3) und D(3|−1|3).',
 'Bir dikdörtgenin köşe noktaları A(3|−1|0), B(3|3|0), C(3|3|3) ve D(3|−1|3) olarak verilmiştir.'
 ],
 W5:[
 'Für zwei Ereignisse A und B ist die Wahrscheinlichkeit, dass beide eintreten, mit P(A∩B)=1/20 gegeben. Im nebenstehenden Baumdiagramm stehen außerdem P(A)=1/4 und P(B|¬A)=1/3.',
 'A ve B adlı iki olayın ikisinin birden gerçekleşme olasılığı P(A∩B)=1/20 olarak verilmiştir. Yandaki ağaç diyagramında ayrıca P(A)=1/4 ve P(B|¬A)=1/3 bulunuyor.'
 ],
 W6:[
 'Eine Klasse mit 21 Schülerinnen und Schülern erzielte in einem Berlin-Test mit fünf Fragen zu Daten und Fakten über Berlin folgende Punktzahlen:\n'+vals.join(', ')+'.',
 '21 öğrencilik bir sınıf, Berlin hakkındaki veri ve olgularla ilgili beş soruluk bir Berlin testinde şu puanları aldı:\n'+vals.join(', ')+'.'
 ]
};
function bilingual(id,ctx,de,tr){
 const pref=contexts[ctx]||['',''];
 if(!pref[0]||!pref[1])throw Error('Bilingual context missing '+ctx);
 if(bilateral.has(id))throw Error('Repeated translation '+id);
 bilateral.set(id,[pref[0]+'\n'+de,pref[1]+'\n'+tr]);
}
bilingual('tuana2-b-b1-a','B1',
 'a) Stellen Sie die Ausbreitung des Unkrauts mit einer Funktionsgleichung der Form f(t)=c·a^t dar. Formulieren Sie die entstandene Funktionsgleichung in die Form f(t)=c·e^(k·t) um.',
 'a) Yabani otların yayılmasını f(t)=c·a^t biçimindeki bir fonksiyon denklemiyle gösteriniz. Elde edilen fonksiyon denklemini f(t)=c·e^(k·t) biçimine dönüştürünüz.');
bilingual('tuana2-b-b1-b','B1',
 'b) Bestimmen Sie die Größe der von Unkraut bewachsenen Fläche nach 14 Tagen.',
 'b) 14 gün sonra yabani otlarla kaplı alanın büyüklüğünü belirleyiniz.');
bilingual('tuana2-b-b1-c','B1',
 'c) Berechnen Sie, nach wie vielen Tagen 3 m² von Unkraut bewachsen sein werden.',
 'c) Kaç gün sonra 3 m² alanın yabani otlarla kaplanacağını hesaplayınız.');
bilingual('tuana2-b-b1-d','B1',
 'd) Bestimmen Sie die Verdopplungszeit und deuten Sie diese im Sachzusammenhang.',
 'd) İkiye katlanma süresini belirleyiniz ve bunun verilen durumdaki anlamını açıklayınız.');
const aTasks=[
 ['2a1','Bestimmen Sie die Nullstelle der Funktion.','Fonksiyonun kökünü belirleyiniz.'],
 ['2a2','Bestimmen Sie die Extremstellen und entscheiden Sie, ob Hochpunkte oder Tiefpunkte vorliegen.','Ekstremum yerlerini belirleyiniz ve bunların maksimum mu minimum mu olduğuna karar veriniz.'],
 ['2a3','Bestimmen Sie die Wendepunkte der Funktion.','Fonksiyonun büküm noktalarını belirleyiniz.'],
 ['2a4','Untersuchen Sie das Krümmungsverhalten der Funktion.','Fonksiyonun eğrilik davranışını inceleyiniz.'],
 ['2a5','Bestimmen Sie den Definitionsbereich der Funktion.','Fonksiyonun tanım kümesini belirleyiniz.'],
 ['2a6','Bestimmen Sie die Randextrema im vorgegebenen Definitionsbereich. Berechnen Sie dazu f(0) und f(4). Diese entsprechen der Einpflanztiefe des Samens f(0) und der Pflanzenhöhe nach vier Tagen f(4).','Verilen tanım aralığının uç noktalarındaki ekstremum değerleri belirleyiniz. Bunun için f(0) ve f(4) değerlerini hesaplayınız. Bunlar sırasıyla tohumun dikilme derinliği f(0) ve dört gün sonraki bitki yüksekliği f(4) anlamına gelmektedir.'],
 ['2a7','Untersuchen Sie die Monotonie der Funktion.','Fonksiyonun artma ve azalma davranışını inceleyiniz.'],
 ['2a8','Bestimmen Sie den Wertebereich für 0≤x≤4.','0≤x≤4 aralığındaki değer kümesini belirleyiniz.'],
 ['2a9','Bestimmen Sie den Grenzwert für x→∞.','x→∞ iken limit değerini belirleyiniz.'],
 ['2a10','Skizzieren Sie den Graphen für 0≤x≤4.','0≤x≤4 aralığında grafiğin taslağını çiziniz.']
];
for(const [n,de,tr] of aTasks)bilingual('tuana2-b-b1-'+n,'B1H',
 'a) Diskutieren Sie diese Funktion. Untersuchungspunkt: '+de,
 'a) Bu fonksiyonu ayrıntılı inceleyiniz. İncelenecek konu: '+tr);
bilingual('tuana2-b-b1-2b','B1H',
 'b) Bestimmen Sie die Tangente t durch den Wendepunkt, die sogenannte Wendetangente.',
 'b) Büküm noktasından geçen ve büküm teğeti olarak adlandırılan t teğetini belirleyiniz.');
bilingual('tuana2-b-b3-a','B3',
 'a) Bestimmen Sie eine passende Funktionsgleichung.',
 'a) Uygun bir fonksiyon denklemi belirleyiniz.');
bilingual('tuana2-b-b3-b','B3',
 'b) Ermitteln Sie den höchsten Punkt des Hügels. Geben Sie die horizontale Entfernung dieses Punktes zum Punkt A an.',
 'b) Tepenin en yüksek noktasını bulunuz. Bu noktanın A noktasına olan yatay uzaklığını belirtiniz.');
bilingual('tuana2-b-b3-c','B3',
 'Das Bauteil wird am Ende einer Bahn auf den Boden gestellt. Die Kugel kommt mit einer bestimmten Geschwindigkeit im Punkt A an. Ist diese Geschwindigkeit zu hoch, verlässt sie im Punkt C die Bahn und geht tangential in eine parabelförmige Flugbahn über.\nc) Die Flugbahn soll mit einer quadratischen Funktion beschrieben werden. Ihr Graph verläuft durch Punkt C mit der gleichen Steigung wie der Graph von f (knickfrei) und erreicht an der Stelle x=19/3 die maximale Höhe. Bestimmen Sie eine passende Funktionsgleichung für die Flugbahn.',
 'Parça yolun sonuna, zeminin üzerine yerleştiriliyor. Misket A noktasına belirli bir hızla geliyor. Bu hız çok yüksekse misket C noktasında yolu terk ederek teğet doğrultusunda parabol biçiminde bir uçuş yoluna geçiyor.\nc) Uçuş yolu ikinci dereceden bir fonksiyonla tanımlanmalıdır. Grafiği C noktasından f grafiğiyle aynı eğimde (kırılma olmadan) geçmeli ve x=19/3 konumunda en yüksek değerine ulaşmalıdır. Uçuş yolu için uygun bir fonksiyon denklemi belirleyiniz.');
bilingual('tuana2-b-b3-d1','B3T',
 'c) Stellen Sie eine Zielfunktion für den Flächeninhalt des Dreiecks auf und geben Sie einen sinnvollen Definitionsbereich an.',
 'c) Üçgenin alanı için bir amaç fonksiyonu oluşturunuz ve anlamlı bir tanım aralığı belirtiniz.');
bilingual('tuana2-b-b3-d2','B3T',
 'd) Ermitteln Sie den maximalen Flächeninhalt, damit eine Kugel durch den Tunnel rollen kann. Eine LE entspricht 2 cm.',
 'd) Bir misketin tünelden yuvarlanarak geçebilmesi için en büyük alanı hesaplayınız. Bir uzunluk birimi (LE), 2 cm’ye karşılık gelmektedir.');
bilingual('tuana2-b-b4-a','B4',
 'a) Stellen Sie anhand der Stichpunkte ein lineares Gleichungssystem auf und bestimmen Sie mithilfe des Gauß-Verfahrens eine passende Funktionsgleichung.',
 'a) Verilen maddelerden yararlanarak doğrusal bir denklem sistemi kurunuz ve Gauss yöntemi yardımıyla uygun bir fonksiyon denklemi belirleyiniz.');
bilingual('tuana2-b-b4-b','B4',
 'b) Untersuchen Sie die Extremstellen von f und begründen Sie, warum die Skizze auf dem Steckbrief nicht zur Lösung passt.',
 'b) f fonksiyonunun ekstremum yerlerini inceleyiniz ve özellik listesindeki çizimin neden çözüme uymadığını gerekçelendiriniz.');
bilingual('tuana2-a-pflicht-1-a','P1',
 'a) Bestimmen Sie die Funktionsgleichung.',
 'a) Fonksiyon denklemini belirleyiniz.');
bilingual('tuana2-a-pflicht-1-b','P1',
 'b) Geben Sie die Nullstellen dieser Funktion an.',
 'b) Bu fonksiyonun köklerini belirtiniz.');
bilingual('tuana2-a-pflicht-2-a','P2',
 'a) Lösen Sie das Gleichungssystem für a=6.',
 'a) a=6 için denklem sistemini çözünüz.');
bilingual('tuana2-a-pflicht-2-b','P2',
 'b) Begründen Sie, dass das Gleichungssystem für a=10 keine Lösung hat.',
 'b) a=10 için denklem sisteminin neden çözümü olmadığını gerekçelendiriniz.');
bilingual('tuana2-a-pflicht-3-a','P3',
 'a) Zeichnen Sie ein passendes Baumdiagramm und geben Sie die Pfadwahrscheinlichkeiten an.',
 'a) Uygun bir ağaç diyagramı çiziniz ve yol olasılıklarını belirtiniz.');
bilingual('tuana2-a-pflicht-3-b1','P3',
 'b) Bestimmen Sie die Wahrscheinlichkeit, dass 1. eine rote und eine blaue Kugel gezogen werden.',
 'b) 1. Bir kırmızı ve bir mavi top çekilme olasılığını belirleyiniz.');
bilingual('tuana2-a-pflicht-3-b2','P3',
 'b) Bestimmen Sie die Wahrscheinlichkeit, dass 2. zwei gleichfarbige Kugeln gezogen werden.',
 'b) 2. Aynı renkte iki top çekilme olasılığını belirleyiniz.');
bilingual('tuana2-a-wahl-1-a','W1',
 'a) Bestimmen Sie die erste und die zweite Ableitung (f′ und f″) der Funktion f(x).',
 'a) f(x) fonksiyonunun birinci ve ikinci türevlerini (f′ ve f″) belirleyiniz.');
bilingual('tuana2-a-wahl-1-b','W1',
 'b) Zeichnen Sie ein Koordinatensystem und skizzieren Sie die Graphen der Funktionen f(x), f′(x) und f″(x).',
 'b) Bir koordinat sistemi çiziniz ve f(x), f′(x) ve f″(x) fonksiyonlarının grafiklerini taslak olarak çiziniz.');
bilingual('tuana2-a-wahl-2-a','W2',
 'a) Zeigen Sie, dass −2 und 2 die Extremstellen von f sind.',
 'a) −2 ve 2’nin f fonksiyonunun ekstremum yerleri olduğunu gösteriniz.');
bilingual('tuana2-a-wahl-2-b','W2',
 'b) Begründen Sie, dass die x-Achse den Graphen von f in genau einem Punkt berührt.',
 'b) x ekseninin f grafiğine tam olarak bir noktada teğet olduğunu gerekçelendiriniz.');
bilingual('tuana2-a-wahl-3-a','W3',
 'Zeichnen Sie die drei Punkte ein. Verbinden Sie anschließend die Punkte und benennen Sie die entstehende Figur.',
 'Üç noktayı koordinat sistemine yerleştiriniz. Ardından noktaları birleştiriniz ve oluşan şeklin adını belirtiniz.');
bilingual('tuana2-a-wahl-3-b','W3',
 'Ergänzen Sie einen weiteren Punkt zu einem Parallelogramm und bestimmen Sie dessen Koordinaten.',
 'Bir paralelkenar oluşturmak için bir nokta daha ekleyiniz ve bu noktanın koordinatlarını belirleyiniz.');
bilingual('tuana2-a-wahl-4-a','W4',
 'Bestimmen Sie den Mittelpunkt des Rechtecks.',
 'Dikdörtgenin orta noktasını belirleyiniz.');
bilingual('tuana2-a-wahl-5-a','W5',
 'a) Übertragen Sie das nebenstehende Baumdiagramm und ergänzen Sie die fehlenden Wahrscheinlichkeiten sowie die Pfadwahrscheinlichkeiten.',
 'a) Yandaki ağaç diyagramını kopyalayınız ve eksik olasılıklarla yol olasılıklarını tamamlayınız.');
bilingual('tuana2-a-wahl-5-b1','W5',
 'b) Bestimmen Sie die Wahrscheinlichkeit dafür, dass (1) B eintritt.',
 'b) (1) B olayının gerçekleşme olasılığını belirleyiniz.');
bilingual('tuana2-a-wahl-5-b2','W5',
 'b) Bestimmen Sie die Wahrscheinlichkeit dafür, dass (2) B eintritt, nachdem ¬A eingetreten ist.',
 'b) (2) A olayının gerçekleşmemiş olması koşuluyla B olayının gerçekleşme olasılığını belirleyiniz.');
bilingual('tuana2-a-wahl-5-b3','W5',
 'b) Bestimmen Sie die Wahrscheinlichkeit dafür, dass (3) ¬B eintritt.',
 'b) (3) B olayının gerçekleşmeme olasılığını belirleyiniz.');
bilingual('tuana2-a-wahl-6-a','W6',
 'a) Erstellen Sie eine Tabelle mit den absoluten und relativen Häufigkeiten.',
 'a) Mutlak ve bağıl frekansların yer aldığı bir tablo hazırlayınız.');
bilingual('tuana2-a-wahl-6-b','W6',
 'b) Berechnen Sie das arithmetische Mittel und interpretieren Sie dieses im Sachzusammenhang.',
 'b) Aritmetik ortalamayı hesaplayınız ve bunu verilen durumla ilişkili olarak yorumlayınız.');
const mathQuestions=questions.filter(q=>q.kind!=='operator');
if(mathQuestions.length!==42||bilateral.size!==42)throw Error('Incomplete bilingual audit: '+bilateral.size+'/'+mathQuestions.length);
for(const q of mathQuestions){
 const pair=bilateral.get(q.id);
 if(!pair)throw Error('Unaudited mathematical card '+q.id);
 q.german=pair[0];q.turkish=pair[1];
}


/* v1.23.0 · Operatoren: Alman kaynak açıklamaları tam, Türkçe karşılıkları eksiksiz.
   Her operatörün dört yanıt seçeneği Türkçedir; açıklama doğru seçime kadar gizlidir. */
const opFull={
 path:['Zusammenhänge bzw. Lösungswege aufzeigen, das Vorgehen darstellen und die Ergebnisse formulieren.','Bağlantıları veya çözüm yollarını göstermek, izlenen yöntemi ortaya koymak ve sonuçları ifade etmek.'],
 discuss:['Eine vollständige Funktionsuntersuchung ist rechnerisch darzustellen.','Eksiksiz bir fonksiyon incelemesi hesap yoluyla gösterilmelidir.'],
 examine:['Die Art des Vorgehens kann – sofern nicht durch einen Zusatz anders angegeben – frei gewählt werden (z. B. Anwenden rechnerischer oder grafischer Verfahren). Das Vorgehen ist darzustellen.','Bir ek yönergede aksi belirtilmedikçe, izlenecek yöntem serbestçe seçilebilir (örneğin hesaplama veya grafik yöntemlerini kullanmak). İzlenen yöntem gösterilmelidir.'],
 justify:['Aussagen oder Sachverhalte sind durch logisches Schließen zu bestätigen. Die Art des Vorgehens kann – sofern nicht durch einen Zusatz anders angegeben – frei gewählt werden (z. B. Anwenden rechnerischer oder grafischer Verfahren). Das Vorgehen ist darzustellen.','İfadeler veya durumlar mantıksal çıkarımlarla doğrulanmalıdır. Bir ek yönergede aksi belirtilmedikçe, yöntem serbestçe seçilebilir (örneğin hesaplama veya grafik yöntemlerini kullanmak). İzlenen yöntem gösterilmelidir.'],
 calculate:['Die Berechnung ist ausgehend von einem Ansatz darzustellen.','Hesaplama, bir başlangıç yaklaşımından hareketle gösterilmelidir.'],
 draw:['Die grafische und inhaltliche Darstellung einer Zeichnung/Skizze/Übersicht ist möglichst genau anzufertigen.','Bir çizimin, taslağın veya genel görünümün grafiksel ve içeriksel sunumu olabildiğince doğru hazırlanmalıdır.'],
 give:['Für die Angabe bzw. Nennung ist keine Begründung notwendig.','Bilgiyi belirtmek veya adını söylemek için gerekçe gerekli değildir.'],
 create:['Siehe „Erstellen Sie“.','Bkz. „Erstellen Sie“ (Oluşturunuz).'],
 solve:['Sinnvolles Anwenden der Rechenfähigkeiten.','Hesaplama becerilerini uygun biçimde kullanmak.'],
 show:['Siehe „Zeigen Sie“.','Bkz. „Zeigen Sie“ (Gösteriniz).'],
 determine:['Siehe „Bestimmen Sie“.','Bkz. „Bestimmen Sie“ (Belirleyiniz).'],
 sketch:['Die Skizze ist so anzufertigen, dass sie das im betrachteten Zusammenhang Wesentliche grafisch beschreibt.','Taslak çizim, incelenen durumdaki temel özellikleri grafiksel olarak gösterecek biçimde hazırlanmalıdır.'],
 transfer:['Siehe „Zeichnen Sie“.','Bkz. „Zeichnen Sie“ (Çiziniz).'],
 name:['Siehe „Geben Sie an“.','Bkz. „Geben Sie an“ (Belirtiniz).']
};
const opKeys=[
 ['path','Çözüm yolunu, yöntemi ve sonucu göstermek.'],
 ['path','İlişkileri ve sonucu izlenen yöntemle belirlemek.'],
 ['discuss','Fonksiyonun tamamını hesaplarla incelemek.'],
 ['examine','Yöntemi seçerek inceleme yapmak ve yolu göstermek.'],
 ['justify','Bir iddianın doğruluğunu mantıksal olarak göstermek.'],
 ['justify','Bir ifadenin doğruluğunu mantıksal olarak sınamak.'],
 ['justify','Gerekçeli bir karar vermek.'],
 ['justify','Bir durumu gerekçeleriyle değerlendirmek.'],
 ['justify','Sonucun neden doğru olduğunu mantıksal gerekçeyle açıklamak.'],
 ['calculate','Başlangıç işleminden itibaren hesaplama yapmak.'],
 ['draw','İstenen çizimi veya gösterimi doğru oluşturmak.'],
 ['draw','Bir şekli olabildiğince doğru çizmek.'],
 ['give','Sonucu gerekçe yazmadan belirtmek.'],
 ['create','İstenen denklemi ya da gösterimi kurmak.'],
 ['solve','Uygun işlemlerle matematik problemini çözmek.'],
 ['show','Bir ifadeyi hesap yoluyla gerekçelendirmek.'],
 ['determine','Yöntemini ve sonucunu düzenli biçimde ortaya koymak.'],
 ['sketch','Temel özellikleri gösteren bir taslak çizmek.'],
 ['transfer','Verilen şekli veya tabloyu kendi sayfana geçirmek.'],
 ['name','Eksik bilgileri tamamlamak.'],
 ['name','İstenen nesnenin adını belirtmek.']
];
const falseMeanings=[
 'Gereken işlemler olmadan rastgele bir sayı tahmin etmek.',
 'Yalnızca grafiğin renklerini değiştirmek.',
 'Verileri hiçbir kontrol yapmadan olduğu gibi kabul etmek.'
];
/* v1.38.5: Operatörlerde Almanca sadece ifade, Türkçe sadece '?' gösterilir. */
const operatorTurkish={
 'Bestimmen Sie':'Belirleyin, bulun.',
 'Ermitteln Sie':'Bulun, tespit edin.',
 'Diskutieren Sie':'Ayrıntılı inceleyin, tartışın.',
 'Untersuchen Sie':'İnceleyin, araştırın.',
 'Zeigen Sie':'Gösterin, kanıtlayın.',
 'Prüfen Sie':'Kontrol edin, doğruluğunu sınayın.',
 'Entscheiden Sie':'Karar verin, seçin.',
 'Bewerten Sie':'Değerlendirin, yorumlayın.',
 'Begründen Sie':'Gerekçelendirin, nedenini açıklayın.',
 'Berechnen Sie':'Hesaplayın.',
 'Erstellen Sie':'Oluşturun, hazırlayın.',
 'Zeichnen Sie':'Çizin.',
 'Geben Sie an':'Belirtin, yazın.',
 'Stellen Sie auf':'Kurun, oluşturun.',
 'Lösen Sie':'Çözün.',
 'Begründen Sie (rechnerisch)':'İşlemle gerekçelendirin, hesapla kanıtlayın.',
 'Stellen Sie dar':'Gösterin, açıklayın.',
 'Skizzieren Sie':'Taslak çizin, kabaca çizin.',
 'Übertragen Sie':'Aktarın, olduğu gibi geçirin.',
 'Ergänzen Sie':'Tamamlayın, eksikleri doldurun.',
 'Benennen Sie':'Adlandırın, ismini yazın.'
};
const operatorQuestions=questions.filter(q=>q.kind==='operator');
if(operatorQuestions.length!==opKeys.length)throw Error('Operator kartları tam değil.');
operatorQuestions.forEach((q,i)=>{
 const [,meaning]=opKeys[i];
 const shortMeaning=operatorTurkish[q.number];
 if(!shortMeaning)throw Error('Türkçe operatör karşılığı eksik: '+q.number);
 q.german=String(q.number);
 q.turkish='?';
 q.explanation=shortMeaning;
 // Sözlük sorularında hesap makinesi ve sınav açıklaması gösterme.
 q.calculatorNote='';
 delete q.calculatorAllowed;
 q.notes='';
 for(const option of q.choices)option.label=option.value==='0'?meaning:falseMeanings[Number(option.value)-1];
});

// v1.23.0: Aynı fonksiyon harfi tüm kartta ve cevap şıklarında korunur.
const boundaryCard=questions.find(q=>q.id==='tuana2-b-b1-2a6');
if(!boundaryCard)throw Error('Boundary question missing');
for(const opt of boundaryCard.choices)opt.label=opt.label.replace(/g\(/g,'f(');

// v1.24.0: Soru kartında çoktan seçmeli seçenekler artık yok.
for(const q of questions)if(!q.choices.some(c=>c.value===q.correctAnswer))throw Error('Missing key '+q.id);
for(const q of questions){
 q.answerMode='worked-solution';
 delete q.choices;
 delete q.correctAnswer;
}
window.CHECKLIST_PACK={
 id:'tuana-2-vorabitur-2026',
 title:'Tuana 2 · Vor-Abiturprüfung 2026 · Mathematik Grundkurs',
 questions,
 info:{
  teilA:'Teil A: 3 Pflichtaufgaben (alle bearbeiten), aus 6 Wahlpflichtaufgaben 2 wählen. Ohne Taschenrechner. Maximal 90 Minuten.',
  teilB:'Teil B: Taschenrechner (WTR), Formelsammlung und Wörterbuch zugelassen. Mindestens 155 Minuten.',
  note:'Zuerst eigenständig lösen, dann die Schaltfläche Yanıt wählen: ausführliche Lösung in eigenem Fenster. Fortschritt bleibt lokal gespeichert.'
 }
};
})();