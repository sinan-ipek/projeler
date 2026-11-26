/* Kerem 1 · v1.35.0 · Parabol / Parabola · Test 72
 * Source: two user-provided book page photographs, questions 1–16.
 * Graphs are clean, white-background SVG redrawings of the supplied diagrams.
 * No answers, keys, or worked solutions are included at the user's request.
 * The two source photos contain Test 72 questions only; no separate Beispiele / worked examples appear.
 * page 1/2 denotes uploaded photo order (Q1–8 / Q9–16), not a printed page number.
 */
(function(){
'use strict';
const questions=[];
const escape=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
const svgUri=s=>'data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s);
function graph(spec){
 const w=690,h=376,l=66,r=604,top=25,bottom=329;
 const {xmin=-4,xmax=6,ymin=-6,ymax=10,curves=[],dots=[],marks=[],lines=[],text=[]}=spec;
 const X=x=>l+(x-xmin)/(xmax-xmin)*(r-l),Y=y=>bottom-(y-ymin)/(ymax-ymin)*(bottom-top);
 const fx=x=>X(x).toFixed(2),fy=y=>Y(y).toFixed(2);
 let g='<svg xmlns="http://www.w3.org/2000/svg" width="'+w+'" height="'+h+'" viewBox="0 0 '+w+' '+h+'"><rect width="'+w+'" height="'+h+'" fill="#fff"/>';
 g+='<defs><clipPath id="plot"><rect x="'+l+'" y="'+top+'" width="'+(r-l)+'" height="'+(bottom-top)+'"/></clipPath></defs>';
 const ix=Math.max(xmin,Math.min(0,xmax)),iy=Math.max(ymin,Math.min(0,ymax));
 g+='<g stroke="#47564d" stroke-width="2.2" fill="none"><path d="M'+l+' '+fy(iy)+'H'+r+' M'+fx(ix)+' '+top+'V'+bottom+'"/>';
 if(0>=xmin&&0<=xmax)g+='<path d="M'+fx(0)+' '+top+'l-5 12m5-12 5 12"/>';
 if(0>=ymin&&0<=ymax)g+='<path d="M'+r+' '+fy(0)+'l-12 -5m12 5-12 5"/>';
 g+='</g>';
 if(ymin<=0&&ymax>=0)g+='<text x="'+(r+10)+'" y="'+(Y(0)+6)+'" font-size="20" font-family="Arial" fill="#26362e">x</text>';
 if(xmin<=0&&xmax>=0)g+='<text x="'+(X(0)+8)+'" y="19" font-size="20" font-family="Arial" fill="#26362e">y</text>';
 for(const line of lines){
  g+='<path d="M'+fx(line.x1)+' '+fy(line.y1)+'L'+fx(line.x2)+' '+fy(line.y2)+'" stroke="#6a776c" stroke-width="1.7" stroke-dasharray="7 5"/>';
 }
 g+='<g clip-path="url(#plot)" fill="none" stroke-linecap="round">';
 for(const c of curves){
  let d='';
  for(let i=0;i<=500;i++){
   const x=xmin+(xmax-xmin)*i/500,y=c.fn(x);
   if(!Number.isFinite(y)){d='';continue}
   d+=(i?'L':'M')+fx(x)+' '+fy(y);
  }
  g+='<path d="'+d+'" stroke="'+(c.color||'#273d33')+'" stroke-width="'+(c.width||3.5)+'"/>';
 }
 g+='</g>';
 for(const d of dots){
  g+='<circle cx="'+fx(d.x)+'" cy="'+fy(d.y)+'" r="4.5" fill="#314c3a"/>';
 }
 for(const m of marks){
  if(m.tickX!==undefined){g+='<path d="M'+fx(m.tickX)+' '+(fy(0)-5)+'v10" stroke="#526155" stroke-width="1.5"/>'}
  if(m.tickY!==undefined){g+='<path d="M'+(fx(0)-5)+' '+fy(m.tickY)+'h10" stroke="#526155" stroke-width="1.5"/>'}
  g+='<text x="'+fx(m.x)+'" y="'+fy(m.y)+'" font-family="Arial,sans-serif" font-size="'+(m.size||19)+'" fill="#283f33" text-anchor="'+(m.anchor||'middle')+'">'+escape(m.text)+'</text>';
 }
 for(const t of text){g+='<text x="'+t.x+'" y="'+t.y+'" font-family="Arial,sans-serif" font-size="'+(t.size||19)+'" fill="#304537">'+escape(t.label)+'</text>'}
 return svgUri(g+'</svg>');
}
const FIG={};
FIG.g1=graph({xmin:-2.6,xmax:2.6,ymin:-5.5,ymax:6.8,curves:[
 {fn:x=>1.7*x*x},{fn:x=>0.95*x*x},{fn:x=>-0.7*x*x}],
 text:[{x:492,y:59,label:'y = bx²',size:20},{x:515,y:103,label:'y = ax²',size:20},{x:492,y:303,label:'y = cx²',size:20}]});
FIG.g7=graph({xmin:-3,xmax:2.15,ymin:-5,ymax:19.5,curves:[{fn:x=>4.5*(x+1)*(x+1)-2}],
 dots:[{x:-1,y:-2},{x:1,y:16}],lines:[{x1:-1,y1:-2,x2:-1,y2:0},{x1:1,y1:0,x2:1,y2:16},{x1:0,y1:16,x2:1,y2:16}],
 marks:[{x:-1,y:.8,text:'−1'},{x:-.15,y:-2,text:'−2',anchor:'end'},{x:1,y:-1.4,text:'1'},{x:-.14,y:16,text:'16',anchor:'end'}]});
FIG.g8=graph({xmin:-2.2,xmax:3.2,ymin:-4.2,ymax:1.8,curves:[{fn:x=>-0.92*(x-.66)*(x-.66)-.5}]});
FIG.g9=graph({xmin:-1.5,xmax:5.4,ymin:-1.7,ymax:10,curves:[{fn:x=>(x-2)*(x-2)}],dots:[{x:2,y:0}]});
FIG.g10=graph({xmin:-3.4,xmax:3.4,ymin:-1.4,ymax:11.5,curves:[{fn:x=>x*x+4}],marks:[{x:-.23,y:4,text:'4',anchor:'end'}]});
FIG.g11=graph({xmin:-2.3,xmax:6.4,ymin:-14.5,ymax:6.5,curves:[{fn:x=>(x-2)*(x-2)-12}],
 dots:[{x:2,y:-12}],lines:[{x1:2,y1:0,x2:2,y2:-12},{x1:0,y1:-12,x2:2,y2:-12}],
 marks:[{x:2,y:1.4,text:'r'},{x:2.4,y:-13.5,text:'T'},
 {x:-1.464,y:1.3,text:'x₁'},{x:5.464,y:1.3,text:'x₂'},
 {x:-.18,y:-8,text:'−8',anchor:'end'},{x:-.18,y:-12,text:'k',anchor:'end'}]});
FIG.g12=graph({xmin:-1.6,xmax:3.6,ymin:-2.3,ymax:7.4,curves:[{fn:x=>(x-1)*(x-1)-1}],
 dots:[{x:1,y:-1}],lines:[{x1:1,y1:0,x2:1,y2:-1}],
 marks:[{x:1,y:.7,text:'1'},{x:-.18,y:-1,text:'−1',anchor:'end'},{x:1.65,y:-1.6,text:'T(1,−1)'}]});
FIG.g13=graph({xmin:-2.3,xmax:5.3,ymin:-11,ymax:8,curves:[{fn:x=>1.5*(x+1)*(x-4)}],
 marks:[{x:-1,y:1.3,text:'−1'},{x:4,y:1.3,text:'4'},{x:-.18,y:-6,text:'−6',anchor:'end'}]});
FIG.g14=graph({xmin:-2.6,xmax:4.4,ymin:-4.5,ymax:5.5,curves:[{fn:x=>(2/3)*(x+1)*(x-3)}],
 marks:[{x:-1,y:.7,text:'−1'},{x:3,y:.7,text:'3'},{x:-.17,y:-2,text:'−2',anchor:'end'}]});
FIG.g15=graph({xmin:-2.5,xmax:4.6,ymin:-5,ymax:7.5,curves:[{fn:x=>x*x-2*x-3}],
 marks:[{x:3,y:1.2,text:'3'},{x:-.18,y:-3,text:'−3',anchor:'end'}]});
FIG.g16=graph({xmin:-1.8,xmax:5.4,ymin:-3.8,ymax:6.4,
 curves:[{fn:x=>.7*(x-2)*(x-2)-2}],dots:[{x:2,y:-2}],
 lines:[{x1:2,y1:5.5,x2:2,y2:-2}],
 marks:[{x:2.2,y:.9,text:'2',anchor:'start'}]});
function add(n,formula,de,tr,options,figure){
 if(!Array.isArray(options)||options.length!==5)throw Error('5 options required for '+n);
 const answerChoices=options.map((x,i)=>String.fromCharCode(65+i)+') '+x).join('     ');
 const q={
  id:'kerem1-test72-'+String(n).padStart(2,'0'),
  page:n<=8?1:2,exercise:n,number:String(n),
  german:'Test 72 · Parabel\n'+de+'\n'+formula+'\n'+answerChoices,
  turkish:'Test 72 · Parabol\n'+tr+'\n'+formula+'\n'+answerChoices,
  star:false,plus:false
 };
 if(figure)q.figureImage=FIG[figure];
 questions.push(q);
}
add(1,'|c−a| + |a−b| − |b−c| = ?',
 'Bestimme den Wert des Ausdrucks anhand der drei dargestellten Parabeln y=ax², y=bx² und y=cx².',
 'Şekildeki y=ax², y=bx² ve y=cx² parabollerine göre ifadenin değerini bul.',
 ['0','2a','2b','2c','2b+2c'],'g1');
add(2,'f(x) = mx² + 4x − 70,\nmin(f(x)) = −72  ⇒  m = ?',
 'Bestimme m aus dem angegebenen Minimalwert.',
 'Verilen en küçük değerden yararlanarak m’yi bul.',
 ['2','3','4','5','6']);
add(3,'f(x) = mx² − 6mx + 2m + 25,\nmin(f(x)) = −3  ⇒  m = ?',
 'Bestimme m aus dem angegebenen Minimalwert.',
 'Verilen en küçük değerden yararlanarak m’yi bul.',
 ['2','3','4','5','6']);
add(4,'x ∈ [0,5],\nf(x) = x² − 4x − 6  ⇒  max(f(x)) = ?',
 'Bestimme das Maximum der Funktion im Intervall [0,5].',
 'Fonksiyonun [0,5] aralığındaki en büyük değerini bul.',
 ['−6','−1','1','2','6']);
add(5,'f(x) = x² − 8x + 10  ⇒  min(f(x)) = ?',
 'Bestimme den minimalen Funktionswert.',
 'Fonksiyonun en küçük değerini bul.',
 ['−6','−4','−2','0','2']);
add(6,'f : [−3,3] → ℝ,\nf(x) = 3x² − 6x − 5,\nmin(f(x)) + max(f(x)) = ?',
 'Bestimme die Summe aus Minimum und Maximum auf [−3,3].',
 '[−3,3] aralığındaki en küçük ve en büyük fonksiyon değerlerinin toplamını bul.',
 ['22','24','28','30','32']);
add(7,'y = 2x² + 3mx + n − 1  ⇒  m·n = ?',
 'Bestimme das Produkt m·n anhand der markierten Werte im Graphen.',
 'Grafikte işaretli değerlere göre m·n çarpımını bul.',
 ['12','14','18','21','24'],'g7');
add(8,'m ∈ ℤ,\nf(x) = (m+3)x² + 6x − 1  ⇒  max(m) = ?',
 'Der Graph der Parabel liegt vollständig unter der x-Achse. Bestimme den größten möglichen ganzzahligen Wert von m.',
 'Parabolün grafiği bütünüyle x ekseninin altındadır. m’nin alabileceği en büyük tam sayı değerini bul.',
 ['−15','−14','−13','−12','−11'],'g8');
add(9,'y = 3x² − mx + (m − 3)  ⇒  m = ?',
 'Die Parabel berührt die x-Achse wie abgebildet. Bestimme m.',
 'Parabol şekildeki gibi x eksenine teğettir. m değerini bul.',
 ['5','6','7','8','9'],'g9');
add(10,'f(x) = x² + (m − 4)x + 4  ⇒  ? < m < ?',
 'Bestimme anhand des Graphen das passende Intervall für m.',
 'Grafiğe göre m’nin bulunduğu uygun aralığı seç.',
 ['(−∞, 0)','[0, 8]','(8, ∞)','(0, 8]','(0, 8)'],'g10');
add(11,'x₁ = 2 + 2√3,\nx₂ = 2 − 2√3,\nT(r,k)  ⇒  k = ?',
 'Die Nullstellen und der y-Achsenabschnitt −8 sind eingezeichnet. Bestimme die y-Koordinate k des Scheitelpunkts T.',
 'Kökler ve y eksenini kestiği −8 değeri grafikte gösterilmiştir. T tepe noktasının k koordinatını bul.',
 ['−9','−10','−11','−12','−14'],'g11');
add(12,'f(x) = x² − mx + n,\nT(1,−1)  ⇒  m+n = ?',
 'Die Parabel hat den Scheitel T(1,−1). Bestimme m+n.',
 'Parabolün tepe noktası T(1,−1)’dir. m+n değerini bul.',
 ['0','1','2','3','4'],'g12');
add(13,'y = f(x) = ax² + bx + c,\nf(3) = ?',
 'Der Graph schneidet die x-Achse bei −1 und 4 und die y-Achse bei −6. Bestimme f(3).',
 'Grafik x eksenini −1 ve 4’te, y eksenini −6’da kesiyor. f(3) değerini bul.',
 ['−6','−3','0','3','6'],'g13');
add(14,'f(x) = ax² + bx + c,\nf(6) = ?',
 'Der Graph hat die Nullstellen −1 und 3 und den y-Achsenabschnitt −2. Bestimme f(6).',
 'Grafiğin kökleri −1 ve 3, y eksenini kestiği değer −2’dir. f(6) değerini bul.',
 ['12','14','16','18','20'],'g14');
add(15,'f(x) = x² − mx + n,\nm+n = ?',
 'Die Parabel schneidet die x-Achse bei 3 und die y-Achse bei −3. Bestimme m+n.',
 'Parabol x eksenini 3’te, y eksenini −3’te kesiyor. m+n değerini bul.',
 ['−4','−3','−2','−1','0'],'g15');
add(16,'y = x² − 2mx + 4  ⇒  m = ?',
 'Die Symmetrieachse des Graphen liegt bei x=2. Bestimme m.',
 'Grafiğin simetri ekseni x=2 doğrusu üzerindedir. m değerini bul.',
 ['−2','−1','1','2','4'],'g16');
if(questions.length!==16||new Set(questions.map(q=>q.id)).size!==16)throw Error('16 unique questions expected');
if(questions.filter(q=>q.figureImage).length!==11)throw Error('11 diagrams expected');
window.CHECKLIST_PACK={
 id:'kerem-1-test72-2026',
 title:'Kerem 1 · Parabol / Parabola · Test 72',
 hideSolutions:true,
 questions
};
})();