/* Miraç 1 · Check Liste veri paketi · v1.21.0
   Kullanıcının gönderdiği matematik kitabı fotoğrafı, sayfa 20.
   Sorular çözümsüzdür; anlaşılmayan 5f son terimi tahmin edilmemiştir.
 */
(function(){
'use strict';
const questions=[],IMAGES={};
function add(no,letter,de,tr,figure){
 const code=String(no)+(letter||'');
 const item={
  id:'mirac-p20-'+code,page:20,exercise:no,number:code,
  german:de,turkish:tr,star:false,plus:false
 };
 if(figure)item.figureKind=figure;
 questions.push(item);
}
const svgData=s=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
const encode=t=>String(t).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const text=(x,y,s,size=20)=>'<text x="'+x+'" y="'+y+'" font-family="Arial, sans-serif" font-size="'+size+'" fill="#26362d">'+encode(s)+'</text>';
function sectionSegments(x,y,width,labels){
 const sum=labels.reduce((z,v)=>z+v.weight,0);
 let g='',pos=x;
 for(const l of labels){
  const cw=width*l.weight/sum;
  g+='<line x1="'+pos+'" y1="'+y+'" x2="'+(pos+cw)+'" y2="'+y+'" stroke="#293f32" stroke-width="4"/>';
  g+='<line x1="'+pos+'" y1="'+(y-10)+'" x2="'+pos+'" y2="'+(y+10)+'" stroke="#293f32" stroke-width="2"/>';
  g+=text(pos+cw/2-16,y-20,l.label,22);
  pos+=cw;
 }
 g+='<line x1="'+(x+width)+'" y1="'+(y-10)+'" x2="'+(x+width)+'" y2="'+(y+10)+'" stroke="#293f32" stroke-width="2"/>';
 return g;
}
function lengthDiagram(letter,top,bottom){
 let s='<svg xmlns="http://www.w3.org/2000/svg" width="740" height="340" viewBox="0 0 740 340"><rect width="740" height="340" fill="#fff"/>';
 s+=text(40,36,'Aufgabe 9'+letter+' — Beide Wege sind gleich lang.',23);
 s+=text(42,80,'Weg 1',18)+sectionSegments(125,128,530,top);
 s+=text(42,225,'Weg 2',18)+sectionSegments(125,271,530,bottom);
 s+=text(40,325,'Finde x, indem du die beiden Längen gleichsetzt.',17);
 return s+'</svg>';
}
IMAGES.pathA=lengthDiagram('a',
 [{label:'x',weight:2},{label:'4 cm',weight:1},{label:'x',weight:2}],
 [{label:'3 cm',weight:1},{label:'x',weight:2},{label:'5 cm',weight:1}]);
IMAGES.pathB=lengthDiagram('b',
 [{label:'x',weight:2},{label:'x',weight:2},{label:'x',weight:2},{label:'5 cm',weight:1}],
 [{label:'x',weight:2},{label:'14 cm',weight:4},{label:'x',weight:2}]);
function blackboard(){
 let s='<svg xmlns="http://www.w3.org/2000/svg" width="1100" height="395" viewBox="0 0 1100 395"><rect width="1100" height="395" fill="#fff"/>';
 const boards=[
  {name:'Sinan',a:['3x + 5 = 9x + 23    | −3x','5 = 6x + 23         | −23','…']},
  {name:'Lena',a:['7x − 12 = 8x − 3     | +12','7x = 8x + 9           | −8x','−x = 9']},
  {name:'Julius',a:['5x + 14 = 9x − 6    | −14','7x = 9x − 20          | −9x','…']}
 ];
 boards.forEach((b,i)=>{
  const x=15+i*365;
  s+='<rect x="'+x+'" y="55" width="345" height="260" rx="8" fill="#40564e" stroke="#203e2f" stroke-width="6"/>';
  s+=text(x+18,41,b.name,23);
  b.a.forEach((row,j)=>{
   s+='<text x="'+(x+18)+'" y="'+(110+j*59)+'" font-family="monospace" font-size="19" fill="#fffaf0">'+encode(row)+'</text>';
  });
 });
 s+=text(27,360,'Übertrage die Lösungsversuche und führe die Rechnung selbst zu Ende.',18);
 return s+'</svg>';
}
IMAGES.blackboards=blackboard();
function balloons(){
 let s='<svg xmlns="http://www.w3.org/2000/svg" width="800" height="300" viewBox="0 0 800 300"><rect width="800" height="300" fill="#fff"/>';
 s+=text(22,35,'Lösungsballons · Bestimme, welcher zu welcher Gleichung passt.',20);
 const opts=['4','−7','−8','5','2','−3','1','−5'];
 opts.forEach((item,i)=>{
  const cx=85+(i%8)*90,cy=126+(i%2)*23;
  s+='<ellipse cx="'+cx+'" cy="'+cy+'" rx="29" ry="39" fill="#e7f0e6" stroke="#638875" stroke-width="2"/>';
  s+=text(cx-(item.length>1?17:8),cy+8,item,23);
  s+='<path d="M'+(cx-3)+' '+(cy+38)+'L'+cx+' '+(cy+44)+'L'+(cx+3)+' '+(cy+38)+'" fill="#aecab4" stroke="#638875"/>';
  s+='<path d="M'+cx+' '+(cy+44)+'Q'+(cx+12)+' 245 '+(cx+30)+' 280" fill="none" stroke="#879d89" stroke-width="1.6"/>';
 });
 s+=text(22,292,'Die Ballons sind Antwortoptionen; die Zuordnung wird nicht verraten.',16);
 return s+'</svg>';
}
IMAGES.balloons=balloons();

const header5='Fasse zuerst zusammen und löse dann die Gleichung. Mache zur Kontrolle die Probe.';
const tr5='Önce benzer terimleri birleştir. Sonra denklemi çöz. Sonucunu yerine koyarak kontrol et.';
const ex5={
 a:'x + 4x − 6 = 2x + 15',
 b:'6y − 4y = 23 + 7',
 c:'5 + 2z + 9z = 7z + 41',
 d:'−8 − 4x − 7 = −7x + 3',
 e:'20 + 2z − 11 = 5z + 14 − 8z',
 f:'6x − 11 − 3x = −7x + [rechter Bildrand unleserlich]',
 g:'7z − 13 − 5z = 17',
 h:'5y − 21 + 6y = 13 − 4y + 11',
 i:'9y − 3 − 4y = 22'
};
for(const [l,eq] of Object.entries(ex5)){
 const warning=l==='f'?
 '\nDie letzte Zahl rechts ist auf dem Foto abgeschnitten. Bitte die vollständige Gleichung im Buch überprüfen.':'';
 const twarning=l==='f'?
 '\nFotoğrafın sağ kenarı kesildiği için son sayı okunamıyor. Kitaptan kontrol ederek tamamla.':'';
 add(5,l,header5+'\n'+l+') '+eq+warning,tr5+'\n'+l+') '+eq+twarning);
}
const header6='Partnerarbeit: Sinan, Lena und Julius sind bei ihren Gleichungen steckengeblieben. Übertragt ihre Lösungsversuche in euer Heft und führt sie zu Ende.';
const tr6='Eşli çalışma: Sinan, Lena ve Julius denklemlerinin çözümünde takılmışlar. Tahtadaki işlemleri defterine geçir ve tamamla.';
[
 ['a','Sinan: 3x + 5 = 9x + 23  | −3x\n5 = 6x + 23  | −23','Sinan’ın yarım bıraktığı çözümü devam ettir.'],
 ['b','Lena: 7x − 12 = 8x − 3  | +12\n7x = 8x + 9  | −8x\n−x = 9','Lena’nın yarım bıraktığı çözümü devam ettir.'],
 ['c','Julius: 5x + 14 = 9x − 6  | −14\nTahtada sonraki satır: 7x = 9x − 20  | −9x','Julius’un işlemini kontrol et; hata varsa düzelt ve çöz.']
].forEach(([l,de,tr])=>add(6,l,header6+'\n'+l+') '+de,tr6+'\n'+l+') '+tr,'blackboards'));

const header7='Löse die Gleichung.';
const tr7='Denklemi çöz.';
const ex7={
 a:'13 − 4z = −2z + 9', b:'5x + 11 = −24 − 2x',
 c:'52 − 4y − 31 = 54 + 7y',d:'2x + 7 = 5x − 8',
 e:'6y + 14 = 4y − 2',f:'19 − 7z = 12z + 3 − 17z'
};
for(const [l,eq]of Object.entries(ex7))add(7,l,header7+'\n'+l+') '+eq,tr7+'\n'+l+') '+eq);
const ex8={
 a:'−8y − 41 = 39 + 12y',b:'11z + 7 = 13z − 21',
 c:'15x + 16 − 13x = −5x − 33',d:'9 + 2z = 7z + 49',
 e:'14 − 2x = 7x − 40',f:'3y − 18 = −4 + 15y − 50'
};
for(const [l,eq]of Object.entries(ex8))add(8,l,header7+'\n'+l+') '+eq,tr7+'\n'+l+') '+eq);
add(9,'a','Die Wege sind gleich lang. Wie lang ist x?\na) Oberer Weg: x + 4 cm + x. Unterer Weg: 3 cm + x + 5 cm.',
 'Yolların uzunlukları eşit. x kaç santimetredir?\na) Üst yol: x + 4 cm + x. Alt yol: 3 cm + x + 5 cm.','pathA');
add(9,'b','Die Wege sind gleich lang. Wie lang ist x?\nb) Oberer Weg: x + x + x + 5 cm. Unterer Weg: x + 14 cm + x.',
 'Yolların uzunlukları eşit. x kaç santimetredir?\nb) Üst yol: x + x + x + 5 cm. Alt yol: x + 14 cm + x.','pathB');

const header10='Fasse zuerst auf beiden Gleichungsseiten so weit wie möglich zusammen.';
const tr10='Denklemin her iki tarafındaki benzer terimleri mümkün olduğunca birleştir ve çöz.';
const ex10={
 a:'6x + 8 + 3x + 5 = 64 + 4x − 6',
 b:'4y + 9 + 3y = 8 + 5y + 19',
 c:'4z + 8 − z + 3 = 2z + 23',
 d:'14 + 3x + 5x − 2 = 49 + 5x − 10'
};
for(const [l,eq] of Object.entries(ex10))add(10,l,header10+'\n'+l+') '+eq,tr10+'\n'+l+') '+eq);
const header11='Vereinfache die Gleichung zunächst durch Ordnen und Zusammenfassen, löse sie dann. Auf den Luftballons findest du alle richtigen Lösungen.';
const tr11='Önce terimleri düzenleyip birleştirerek denklemi sadeleştir, sonra çöz. Çözüm seçenekleri balonlarda yer alıyor.';
const ex11={
 a:'5x + 8x − 7 − 4x + 5 − 3x − 7 = 8 − 2x + 11x − 20 − 5x − 3',
 b:'17 − 6x − 11 + 4x − 2 + 4x − 12 = 2x + 8 + 11x − 6 − 5x − 3x + 5',
 c:'5 − 13x − 9 + 17x − 6 − 7x + 1 = 3 − 7x + 5x − 18 + 6 − 6x + 20',
 d:'−2x − 7 + 9x − 14 + 20 − 4x + 6 = 14x − 9 − 7 − 12x + 9x + 8 − 7x + 21',
 e:'5 − 2x + 3 − 4x + 7 − 8x + 13 = 4x − 8 + 7x − 48 − 3x − 26'
};
for(const [l,eq]of Object.entries(ex11))add(11,l,header11+'\n'+l+') '+eq,tr11+'\n'+l+') '+eq,'balloons');
const header12='Löse die Gleichung mit Brüchen.';
const tr12='Kesirli denklemi çöz.';
const ex12={
 a:'1 − (1/2)x = (1/4)x',
 b:'x − 1/3 = (1/2)x + 1/9',
 c:'(1/2)x + 3/4 = −(2/5)x − 1/4',
 d:'(1/5)x + 12 = 8',
 e:'2 − (1/3)x = (1/2)x − 3',
 f:'(2/3)x + 1/4 = (5/6)x − 1/2'
};
for(const [l,eq]of Object.entries(ex12))add(12,l,header12+'\n'+l+') '+eq,tr12+'\n'+l+') '+eq);
const header13='Ordne und fasse die Terme zusammen. Löse dann die Gleichung.';
const tr13='Terimleri düzenleyip benzerlerini topla; sonra denklemi çöz.';
const ex13={
 a:'19 − 5y − 4y + 68 + 47,2 + 11y − 43,5 = 17y − 22,8 + 17 − 8y − 35 + 14y − 19y + 13,5',
 b:'6,9 − 10z + 4,3 + 14z − z − 9,4 = −7,5z − 1,3 + 9,5z − 3 + 6z − 0,3',
 c:'(2/3)a + 2,9 − (1/2)a + 5,3 + (1/6)a = (1/3)a − 4,2 − (1/6)a − 1,6'
};
for(const [l,eq]of Object.entries(ex13))add(13,l,header13+'\n'+l+') '+eq,tr13+'\n'+l+') '+eq);
for(const q of questions)if(q.figureKind){q.figureImage=svgData(IMAGES[q.figureKind]);delete q.figureKind;}
window.CHECKLIST_PACK={
 id:'mirac-denklemler-2026',
 title:'Miraç 1 · Gleichungen / Denklemler · Seite 20',
 questions
};
})();