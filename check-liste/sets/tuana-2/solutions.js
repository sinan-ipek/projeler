/* Tuana 2 · v1.24.0 · 42 Schritt-für-Schritt-Lösungen
 * Explaining the source tasks, without changing question wording or source figures.
 * Content language: Turkish; original German wording available in the question pack.
 */
(function(){
'use strict';
const S={};
function add(id,title,steps,conclusion=''){
 if(S[id])throw Error('Duplicate solution '+id);
 if(!Array.isArray(steps)||steps.length<2)throw Error('Incomplete steps '+id);
 S[id]={title,steps,conclusion};
}
const p='tuana2-';
add(p+'b-b1-a','Üstel büyüme fonksiyonunu kurma',[
 'Başlangıç anında t=0 için alan 1,5 m² olduğundan f(0)=c=1,5 olur.',
 '10 gün sonra 2 m² alan vardır: 2=1,5·a¹⁰. Her iki tarafı 1,5’e böl: a¹⁰=4/3.',
 'Onuncu dereceden kök al: a=(4/3)^(1/10) ≈ 1,02919.',
 'İlk gösterim: f(t)=1,5·[(4/3)^(1/10)]^t = 1,5·(4/3)^(t/10).',
 'a^t=e^(t·ln a) özdeşliğini kullan. k=ln(a)=ln(4/3)/10 ≈ 0,0287682.',
 'İkinci gösterim: f(t)=1,5·e^[(ln(4/3)/10)·t]. t gün cinsindendir.'
],'İki gösterim aynı fonksiyondur.');
add(p+'b-b1-b','14 gün sonraki alan',[
 'Önce a şıkkındaki modeli yaz: f(t)=1,5·(4/3)^(t/10).',
 't=14 koy: f(14)=1,5·(4/3)^(14/10).',
 'Üs değeri 1,4 olduğundan f(14)≈2,244 m².'
],'Yaklaşık 2,24 m².');
add(p+'b-b1-c','3 m² alana ulaşma süresi',[
 '3=1,5·(4/3)^(t/10) eşitliğini kur.',
 'İki tarafı 1,5’e böl: 2=(4/3)^(t/10).',
 'Logaritma al: ln 2=(t/10)·ln(4/3).',
 'Buradan t=10·ln 2/ln(4/3)≈24,09 gün.'
],'Yaklaşık 24,1 gün.');
add(p+'b-b1-d','İkiye katlanma süresi',[
 'İkiye katlanma için f(t+T)=2·f(t) gerekir. Üstel modelde bu oran başlangıç anından bağımsızdır.',
 '(4/3)^(T/10)=2 yaz ve logaritma al.',
 'T=10·ln 2/ln(4/3)≈24,09 gün.',
 'Bu, yabani otlarla kaplı alanın yaklaşık her 24,1 günde bir iki katına çıkması anlamına gelir.'
],'Yaklaşık 24,1 gün; süre sabittir.');
const g='f(x)=(x−0,5)·e^(−x)';
add(p+'b-b1-2a1','Fonksiyonun kökü',[
 g+' eşitliğini kullan.',
 'Bir çarpımın sıfır olması için çarpanlardan biri sıfır olmalıdır.',
 'e^(−x) her gerçek x için pozitiftir; sıfır olamaz.',
 'Dolayısıyla x−0,5=0 ve x=0,5 bulunur.'
],'Kök x=0,5.');
add(p+'b-b1-2a2','Ekstremum ve türü',[
 'Çarpım kuralı: f′(x)=1·e^(−x)+(x−0,5)·(−e^(−x)).',
 'Sadeleştir: f′(x)=(1,5−x)·e^(−x).',
 'f′=0 için e^(−x)>0 olduğundan x=1,5 bulunur.',
 'f″(x)=(x−2,5)·e^(−x) olduğundan f″(1,5)<0; bu nokta yerel maksimumdur.',
 'Yükseklik f(1,5)=e^(−1,5)≈0,2231.'
],'Hochpunkt: H(1,5 | e^(−1,5)).');
add(p+'b-b1-2a3','Büküm noktası',[
 'Birinci türev: f′(x)=(1,5−x)·e^(−x).',
 'İkinci türev: f″(x)=(x−2,5)·e^(−x).',
 'f″(x)=0 ⇒ x−2,5=0 ⇒ x=2,5.',
 'f″ işaret değiştirdiği için burada gerçek bir büküm vardır.',
 'f(2,5)=(2,5−0,5)e^(−2,5)=2e^(−2,5)≈0,1642.'
],'W(2,5 | 2e^(−2,5)).');
add(p+'b-b1-2a4','Eğrilik davranışı',[
 'f″(x)=(x−2,5)e^(−x) bulunur.',
 'Üstel çarpan daima pozitif olduğundan f″ işaretini x−2,5 belirler.',
 'x<2,5 için f″<0: grafik aşağıya doğru kavislidir (rechtsgekrümmt/konkav).',
 'x>2,5 için f″>0: grafik yukarıya doğru kavislidir (linksgekrümmt/konvex).'
],'Eğrilik x=2,5’te değişir.');
add(p+'b-b1-2a5','Tanım kümesi',[
 'x−0,5 tüm gerçek x değerlerinde tanımlıdır.',
 'e^(−x) da tüm gerçek sayılar için tanımlıdır.',
 'Bu nedenle matematiksel tanım kümesi D=ℝ olur.',
 'Sınav ayrıca ekimden sonraki 0≤x≤4 gün aralığını inceliyor. Bu, uygulamada kullanılan aralıktır.'
],'Matematiksel D=ℝ; araştırılan zaman aralığı [0,4].');
add(p+'b-b1-2a6','Sınır değerleri ve yorumu',[
 'Verilen aralık [0,4] olduğundan iki sınır noktası x=0 ve x=4’tür.',
 'f(0)=(0−0,5)e⁰=−0,5. Negatif işaret, başlangıçta tohumun toprak altında olduğu derinliği temsil eder.',
 'f(4)=(4−0,5)e^(−4)=3,5e^(−4)≈0,0641.',
 'Sınır değerlerini iç maksimumla karşılaştır: f(1,5)=e^(−1,5)≈0,2231.',
 'Bu aralıkta en küçük değer −0,5 (x=0), en büyük değer e^(−1,5) (x=1,5) olur.'
],'f(0)=−0,5 ve f(4)≈0,0641.');
add(p+'b-b1-2a7','Artma ve azalma aralıkları',[
 'f′(x)=(1,5−x)e^(−x).',
 'e^(−x)>0 olduğundan f′(x)>0 için x<1,5 gerekir.',
 'f′(1,5)=0; f′(x)<0 için x>1,5 olur.',
 'Bu nedenle [0,1,5] aralığında artar, [1,5,4] aralığında azalır.'
],'Artış: 0–1,5. Azalış: 1,5–4.');
add(p+'b-b1-2a8','[0,4] aralığındaki değer kümesi',[
 'Sürekli fonksiyonda kapalı aralıktaki en küçük ve büyük değerleri kontrol et.',
 'f(0)=−0,5; f(4)=3,5e^(−4)≈0,0641.',
 'İç kritik nokta x=1,5 için f(1,5)=e^(−1,5)≈0,2231.',
 'Dolayısıyla minimum −0,5, maksimum e^(−1,5) olur.'
],'W=[−0,5; e^(−1,5)] ≈ [−0,5; 0,2231].');
add(p+'b-b1-2a9','Sonsuzdaki limit',[
 'f(x)=(x−0,5)e^(−x)=(x−0,5)/e^x.',
 'x→∞ iken pay doğrusal, payda üstel olarak büyür.',
 'Üstel büyüme baskın olduğundan bölüm sıfıra yaklaşır.',
 'İstersen L’Hôpital uygula: lim(x−0,5)/e^x = lim 1/e^x =0.'
],'lim[x→∞] f(x)=0.');
add(p+'b-b1-2a10','Grafiği çizme',[
 'Çizim aralığı 0≤x≤4. Başlangıç noktası (0;−0,5).',
 'x eksenini (0,5;0) noktasında kes.',
 'x=1,5 noktasında maksimum f≈0,2231 vardır.',
 'x=2,5 noktasında büküm yüksekliği yaklaşık 0,1642’dir.',
 'x=4 için f(4)≈0,0641; bu değere doğru azalan, sonra yukarı kavislenen bir eğri çiz.',
 'Eğri noktaların arasından kesintisiz geçmelidir; bükümden sonra x eksenine doğru yaklaşır.'
],'Grafik: kök → maksimum → büküm → azalış.');
add(p+'b-b1-2b','Büküm teğeti (Wendetangente)',[
 'Büküm noktasını bul: xW=2,5 ve yW=2e^(−2,5).',
 'Birinci türev f′(x)=(1,5−x)e^(−x); dolayısıyla eğim m=f′(2,5)=−e^(−2,5).',
 'Nokta-eğim formülü: t(x)=m(x−2,5)+yW.',
 'Yerine koy: t(x)=−e^(−2,5)(x−2,5)+2e^(−2,5).',
 'Ortak çarpanı al: t(x)=e^(−2,5)(4,5−x).'
],'t(x)=e^(−2,5)(4,5−x).');
add(p+'b-b3-a','Misket yolu için kübik fonksiyon',[
 'Genel biçim: f(x)=ax³+bx²+cx+d.',
 'A(0|3) olduğu için f(0)=3 ⇒ d=3.',
 'B(2|f(2)) yerel minimumdur: f′(2)=0. C(3|1) için f(3)=1 ve en büyük eğim C’de olduğundan f″(3)=0.',
 'Türevler: f′=3ax²+2bx+c, f″=6ax+2b.',
 'f″(3)=0 ⇒ 18a+2b=0 ⇒ b=−9a.',
 'f′(2)=0 ⇒ 12a+4b+c=0 ⇒ c=24a.',
 'f(3)=1 ⇒ 27a+9b+3c+3=1. Yerine koyunca 18a=−2 ⇒ a=−1/9.',
 'Bu durumda b=1, c=−8/3, d=3.'
],'f(x)=−x³/9+x²−(8/3)x+3.');
add(p+'b-b3-b','Tepenin en yüksek noktası',[
 'f(x)=−x³/9+x²−8x/3+3.',
 'Türevi: f′(x)=−x²/3+2x−8/3=−(x−2)(x−4)/3.',
 'f′=0 ⇒ x=2 veya x=4.',
 'İkinci türev f″(x)=−2x/3+2. f″(2)>0: vadi. f″(4)<0: tepe.',
 'Tepe yüksekliği: f(4)=−64/9+16−32/3+3=11/9 ≈1,222 uzunluk birimi.',
 '1 LE=10 cm olduğundan tepenin yüksekliği yaklaşık 12,22 cm’dir; A’ya yatay uzaklığı 4·10=40 cm’dir.'
],'Tepe (4|11/9); A’dan yatay uzaklık 40 cm.');
add(p+'b-b3-c','Parabolik uçuş yolunu bulma',[
 'Uçuş yolunu g(x)=ax²+bx+c ile göster.',
 'Misket C(3|1) noktasında yolu terk eder; dolayısıyla g(3)=1.',
 'Yol kırılmadan devam ettiği için g′(3)=f′(3). f′(x)=−x²/3+2x−8/3 ⇒ f′(3)=1/3.',
 'Parabolün en yüksek yeri x=19/3: g′(19/3)=0.',
 'Tepe formu kullan: g(x)=a(x−19/3)²+h. Türev g′(x)=2a(x−19/3).',
 'g′(3)=1/3 ⇒ 2a(−10/3)=1/3 ⇒ a=−1/20.',
 'g(3)=1 ⇒ 1=(−1/20)(100/9)+h ⇒ h=14/9.',
 'İstersen aç: g(x)=−x²/20+(19/30)x−9/20.'
],'g(x)=−(x−19/3)²/20+14/9.');
add(p+'b-b3-d1','Üçgen alan fonksiyonunu kurma',[
 'Bu soru a şıkkındaki profilden bağımsızdır. Verilen tünel fonksiyonu f(x)=−0,2x³−0,1x²+2x.',
 'Şekilde üçgenin tabanı x, yüksekliği f(x) seçilir. Üçgen alanı: A(x)=x·f(x)/2.',
 'A(x)=½x(−0,2x³−0,1x²+2x)=−0,1x⁴−0,05x³+x².',
 'Fiziksel olarak x≥0 ve f(x)≥0 gereklidir.',
 'f(x)=x(−0,2x²−0,1x+2). Pozitif diğer kök: 2x²+x−20=0 ⇒ x=(√161−1)/4≈2,922.',
 'Tanım aralığı 0≤x≤(√161−1)/4 seçilir.'
],'A(x)=−0,1x⁴−0,05x³+x² (LE²).');
add(p+'b-b3-d2','Tünel üçgeninin maksimum alanı',[
 'Önceki şıktan A(x)=−0,1x⁴−0,05x³+x² ve 0≤x≤2,922… elde edilir.',
 'Türev: A′(x)=−0,4x³−0,15x²+2x = x(−0,4x²−0,15x+2).',
 'İç kritik nokta: 8x²+3x−40=0 ⇒ x=(−3+√1289)/16≈2,0564.',
 'Uçlarda A(0)=0 ve A(2,922…)=0; iç noktada alan maksimumdur.',
 'A(2,0564…)≈2,00572 LE².',
 '1 LE=2 cm olduğu için 1 LE²=4 cm². Alanı 4 ile çarp: ≈8,0229 cm².'
],'Maksimum alan yaklaşık 8,02 cm².');
add(p+'b-b4-a','Steckbrief’ten fonksiyonu belirleme',[
 'Genel kübik fonksiyon: f(x)=ax³+bx²+cx+d.',
 'y ekseni kesişimi −3,5 ⇒ f(0)=d=−3,5.',
 'Ekstremum yeri x=0 ⇒ f′(0)=c=0.',
 'Büküm yeri x=−2 ⇒ f″(−2)=0. f″=6ax+2b ⇒ −12a+2b=0 ⇒ b=6a.',
 'Kök x=−1 ⇒ f(−1)=−a+b−3,5=0 ⇒ b−a=3,5.',
 'b=6a koy: 5a=3,5 ⇒ a=0,7 ve b=4,2.',
 'Sonuçta c=0 ve d=−3,5.'
],'f(x)=0,7x³+4,2x²−3,5.');
add(p+'b-b4-b','Ekstremumları inceleyerek çizimi kontrol etme',[
 'Bulduğun fonksiyon: f(x)=0,7x³+4,2x²−3,5.',
 'Türev: f′(x)=2,1x²+8,4x=2,1x(x+4). Kritik yerler x=0 ve x=−4.',
 'İkinci türev f″(x)=4,2x+8,4.',
 'x=−4 için f″(−4)=−8,4<0 ⇒ yerel maksimum; f(−4)=18,9.',
 'x=0 için f″(0)=8,4>0 ⇒ yerel minimum; f(0)=−3,5.',
 'Verilen eskizde x=0 civarındaki ekstremum maksimum olarak tasvir edilmiştir; hesaplanan fonksiyonda ise minimumdur. Bu yüzden çizim verilen koşullarla uyuşmaz.'
],'H(−4|18,9), T(0|−3,5).');
add(p+'a-pflicht-1-a','Üç noktadan parabol denklemi',[
 'f(x)=ax²+bx+c yaz.',
 'A(−1|4) ⇒ a−b+c=4.',
 'B(1|1) ⇒ a+b+c=1.',
 'C(3|0) ⇒ 9a+3b+c=0.',
 'İkinci denklemden birinciyi çıkar: 2b=−3 ⇒ b=−3/2.',
 'Üçüncü ile ikinciyi çıkar: 8a+2b=−1 ⇒ 8a−3=−1 ⇒ a=1/4.',
 'a+b+c=1 ⇒ 1/4−3/2+c=1 ⇒ c=9/4.',
 'Kontrol: f(x)=1/4·(x−3)²; x=−1,1,3 için değerler 4,1,0.'
],'f(x)=x²/4−3x/2+9/4.');
add(p+'a-pflicht-1-b','Parabolün kökleri',[
 'Önceki şıktan f(x)=1/4·(x−3)².',
 'Kök için 0=1/4·(x−3)² yaz.',
 '(x−3)²=0 ⇒ x=3.',
 'Çift katlı köktür: parabol x eksenine x=3 noktasında yalnızca teğet olur.'
],'x=3 (çift kök).');
add(p+'a-pflicht-2-a','Parametreli sistemi a=6 için çözme',[
 'Sistem: x−2y−3z=−3; y+5z=4; 2y+az=4.',
 'a=6 koy: 2y+6z=4.',
 'İkinci eşitliği ikiyle çarp: 2y+10z=8.',
 'Bu eşitlikten üçüncüyü çıkar: 4z=4 ⇒ z=1.',
 'y+5·1=4 ⇒ y=−1.',
 'x−2(−1)−3·1=−3 ⇒ x−1=−3 ⇒ x=−2.'
],'Çözüm (x,y,z)=(−2,−1,1).');
add(p+'a-pflicht-2-b','a=10 için neden çözüm yok?',[
 'İkinci denklem y+5z=4. İkiyle çarp: 2y+10z=8.',
 'Üçüncü denklem a=10 için 2y+10z=4 biçimine dönüşür.',
 'Aynı ifade hem 8’e hem 4’e eşit olamaz.',
 'Dolayısıyla denklem sistemi çelişkilidir (widersprüchlich).'
],'Çözüm kümesi boştur.');
add(p+'a-pflicht-3-a','Geri koymadan çekiliş için olasılık ağacı',[
 'İlk çekilişte P(Kırmızı)=4/6 ve P(Mavi)=2/6.',
 'İlk top kırmızıysa geriye 3 kırmızı ve 2 mavi kalır: ikinci çekilişte 3/5 ve 2/5.',
 'İlk top maviyse geriye 4 kırmızı ve 1 mavi kalır: ikinci çekilişte 4/5 ve 1/5.',
 'Yol olasılıkları dal olasılıklarının çarpımıdır.',
 'KK: 4/6·3/5=2/5. KM: 4/6·2/5=4/15.',
 'MK: 2/6·4/5=4/15. MM: 2/6·1/5=1/15.',
 'Toplam kontrolü: 6/15+4/15+4/15+1/15=15/15=1.'
],'KK=2/5, KM=4/15, MK=4/15, MM=1/15.');
add(p+'a-pflicht-3-b1','Bir kırmızı ve bir mavi top',[
 'İki sıra mümkündür: önce kırmızı sonra mavi (KM), veya önce mavi sonra kırmızı (MK).',
 'KM olasılığı 4/6·2/5=4/15.',
 'MK olasılığı 2/6·4/5=4/15.',
 'Birbirini dışlayan olayları topla: 4/15+4/15=8/15.'
],'P(bir kırmızı, bir mavi)=8/15.');
add(p+'a-pflicht-3-b2','Aynı renk iki top',[
 'İki aynı renk için yalnızca KK veya MM mümkündür.',
 'KK: 4/6·3/5=2/5=6/15.',
 'MM: 2/6·1/5=1/15.',
 'Topla: 6/15+1/15=7/15.'
],'P(aynı renk)=7/15.');
add(p+'a-wahl-1-a','Birinci ve ikinci türev',[
 'Verilen f(x)=(1/5)x⁴−(2/5)x²−(1/2)x+1.',
 'Kuvvet kuralı: d(xⁿ)/dx=n·x^(n−1).',
 'İlk türev: f′(x)=(4/5)x³−(4/5)x−1/2.',
 'Tekrar türev al: f″(x)=(12/5)x²−4/5.',
 'Sabit terimlerin türevi sıfırdır.'
],'f′=4x³/5−4x/5−1/2; f″=12x²/5−4/5.');
add(p+'a-wahl-1-b','f, f′ ve f″ için grafik taslağı',[
 'Önce a şıkkındaki f′=(4/5)x³−(4/5)x−1/2 ve f″=(12/5)x²−4/5 ifadelerini kullan.',
 'f″ yukarı açılan paraboldür; kökleri (12/5)x²−4/5=0 ⇒ x=±1/√3≈±0,577.',
 'f′ kübik grafiktir; f″ köklerinde yerel ekstremumları vardır. f′(0)=−0,5; tek gerçek sıfırı yaklaşık x=1,228’dir.',
 'Bu nedenle f grafiği x≈1,228’e kadar azalır, sonra artar (bir yerel minimum).',
 'f(0)=1 ve f′(0)=−0,5 olduğundan f grafiği (0|1) noktasından negatif eğimle geçer.',
 'f grafiğinde x=−1/√3 ve +1/√3 büküm yerleridir.',
 'Koordinat sisteminde f için dördüncü derece, f′ için üçüncü derece, f″ için ikinci derece grafik çiz; bu ortak özellikleri işaretle.'
],'f″ parabol, f′ kübik, f dördüncü derecedendir.');
add(p+'a-wahl-2-a','−2 ve 2 neden ekstremum yerleri?',[
 'f(x)=x³−12x+16.',
 'f′(x)=3x²−12=3(x²−4)=3(x−2)(x+2).',
 'f′(−2)=0 ve f′(2)=0; her ikisi kritik noktadır.',
 'f″(x)=6x.',
 'f″(−2)=−12<0 ⇒ x=−2 yerel maksimum; f(−2)=32.',
 'f″(2)=12>0 ⇒ x=2 yerel minimum; f(2)=0.'
],'H(−2|32), T(2|0).');
add(p+'a-wahl-2-b','x ekseniyle yalnızca bir teğet noktası',[
 'f(x)=x³−12x+16.',
 'Çarpanlara ayır: f(x)=(x−2)²(x+4).',
 'Kökler x=2 (çift katlı) ve x=−4 (tek katlı).',
 'Çift katlı kökte x eksenine teğettir; x=2’de ayrıca f′(2)=0.',
 'x=−4 noktasında ekseni keser, teğet olmaz.',
 'Dolayısıyla eksene yalnızca bir noktada teğettir.'
],'Teğet noktası (2|0).');
add(p+'a-wahl-3-a','Üç boyutlu noktaları birleştirme',[
 'A(2|3|0), B(−3|2|1), C(3|−1|2) noktalarını x, y, z eksenlerine göre işaretle.',
 'A’dan B’ye, B’den C’ye ve C’den A’ya doğru çizgiler çek.',
 'Üç farklı nokta bir düzlemde bir üçgen meydana getirir; doğrusal olmadıkları için üçgen bozulmaz.',
 'Kontrol: AB=(-5,−1,1) ve AC=(1,−4,2); birbiriyle orantılı değildirler.'
],'Ortaya çıkan şekil bir üçgendir (Dreieck).');
add(p+'a-wahl-3-b','Dördüncü köşeyi bulma',[
 'A-B-C-D sırasıyla bir paralelkenar oluşturmak istediğimizi seçelim.',
 'Paralelkenarda karşı kenar vektörleri eşittir: AD=BC.',
 'BC=C−B=(3−(−3),−1−2,2−1)=(6,−3,1).',
 'D=A+BC=(2,3,0)+(6,−3,1)=(8,0,1).',
 'Kontrol: DC=C−D=(−5,−1,1)=AB.',
 'Not: Üç verilen köşe farklı sıralanırsa farklı geçerli dördüncü köşeler de bulunabilir.'
],'Örnek cevap D(8|0|1).');
add(p+'a-wahl-4-a','Dikdörtgenin orta noktası',[
 'Dikdörtgenin köşegenleri birbirini ortalar.',
 'Karşıt köşeler A(3|−1|0) ve C(3|3|3) seç.',
 'Orta nokta formülünü her koordinata uygula: M=(A+C)/2.',
 'x=(3+3)/2=3; y=(−1+3)/2=1; z=(0+3)/2=1,5.'
],'M=(3|1|1,5).');
add(p+'a-wahl-5-a','Eksik olasılıkları ağaçta tamamlama',[
 'Verilenler: P(A)=1/4, P(A∩B)=1/20, P(B|¬A)=1/3.',
 'Tamamlayıcı dal: P(¬A)=1−1/4=3/4.',
 'P(A∩B)=P(A)·P(B|A) ⇒ P(B|A)=(1/20)/(1/4)=1/5.',
 'Bu dalın tamamlayanı: P(¬B|A)=4/5.',
 'Alt dalda P(B|¬A)=1/3 ve P(¬B|¬A)=2/3.',
 'Yol olasılıkları: P(A∩B)=1/20, P(A∩¬B)=1/5, P(¬A∩B)=1/4, P(¬A∩¬B)=1/2.',
 'Kontrol: 1/20+1/5+1/4+1/2=1.'
],'Bütün dallar ve yollar tamamlanır.');
add(p+'a-wahl-5-b1','P(B) hesaplama',[
 'B olayı A gerçekleşirken de A gerçekleşmezken de ortaya çıkabilir.',
 'Tam olasılık: P(B)=P(A∩B)+P(¬A∩B).',
 'İlk terim 1/20.',
 'İkinci terim P(¬A)·P(B|¬A)=3/4·1/3=1/4.',
 'Topla: 1/20+1/4=6/20=3/10.'
],'P(B)=3/10.');
add(p+'a-wahl-5-b2','A gerçekleşmediğinde B olasılığı',[
 'Soru koşullu olasılığı soruyor: P(B|¬A).',
 'Verilen ağacın alt dalında bu değer doğrudan 1/3 olarak gösterilmiştir.',
 'İstersen kontrol: P(¬A∩B)/P(¬A)=(1/4)/(3/4)=1/3.'
],'P(B|¬A)=1/3.');
add(p+'a-wahl-5-b3','B’nin gerçekleşmeme olasılığı',[
 'B’nin gerçekleşme olasılığı önceki alt maddede 3/10 bulundu.',
 'B ve ¬B birbirinin tamamlayıcısıdır.',
 'P(¬B)=1−P(B)=1−3/10=7/10.'
],'P(¬B)=7/10.');
add(p+'a-wahl-6-a','Mutlak ve bağıl sıklık tablosu',[
 '21 öğrencinin puanlarını 0,1,2,3,4,5 kategorilerine ayır.',
 'Mutlak sıklıklar: 0 puan→3; 1 puan→3; 2 puan→5; 3 puan→4; 4 puan→4; 5 puan→2.',
 'Kontrol: 3+3+5+4+4+2=21.',
 'Bağıl sıklık = ilgili mutlak sıklık / 21.',
 '0→3/21≈%14,29; 1→3/21≈%14,29; 2→5/21≈%23,81.',
 '3→4/21≈%19,05; 4→4/21≈%19,05; 5→2/21≈%9,52.'
],'Tablo iki satır içerir: mutlak sayılar ve /21 oranları.');
add(p+'a-wahl-6-b','Aritmetik ortalama ve yorum',[
 'Aritmetik ortalama = toplam puan / öğrenci sayısı.',
 'Sıklık tablosuna göre toplam: 0·3+1·3+2·5+3·4+4·4+5·2 = 0+3+10+12+16+10 =51.',
 'Öğrenci sayısı 21 olduğundan ortalama 51/21=17/7≈2,43.',
 'Yorum: Beş soruluk sınavda sınıf ortalaması yaklaşık 2,43 puandır.'
],'Aritmetik ortalama ≈2,43 puan.');
// For all 21 operator cards, the source-grounded German/Turkish definition is
// in q.explanation. Provide a concise practical example for every one.
const examples=[
 ['Bestimmen Sie','Bir fonksiyonun köklerini bulurken yöntemi yaz ve kökleri belirt.'],
 ['Ermitteln Sie','Bir noktanın koordinatlarını işlem adımlarını göstererek bul.'],
 ['Diskutieren Sie','Türevi, ekstremumları, bükümleri ve artma–azalma aralıklarını birlikte incele.'],
 ['Untersuchen Sie','Fonksiyonun monotonluğunu türevle veya grafikle incele ve hangi yolu kullandığını göster.'],
 ['Zeigen Sie','İstenen önermeyi matematiksel olarak doğrulayacak bir çıkarım zinciri kur.'],
 ['Prüfen Sie','Verilen noktanın fonksiyon grafiği üzerinde olup olmadığını yerine koyarak denetle.'],
 ['Entscheiden Sie','İki modelden hangisinin veriye uyduğuna karar ver ve gerekçeni yaz.'],
 ['Bewerten Sie','Hesaplanan sonucun verilen problem için makul olup olmadığını açıklayarak değerlendir.'],
 ['Begründen Sie','“Bu nokta maksimumdur” diyorsan türev işaretini veya ikinci türevi kullanarak nedenini açıkla.'],
 ['Berechnen Sie','Alanı bulmak için formülü yaz, değerleri yerine koy ve hesaplamayı göster.'],
 ['Erstellen Sie','Verilerden istenen tabloyu, diyagramı veya denklemi oluştur.'],
 ['Zeichnen Sie','Ölçekli eksenlerde verilen noktaları yerleştir ve grafiği olabildiğince doğru çiz.'],
 ['Geben Sie an','“Kökleri belirtiniz” deniyorsa kök değerlerini söylemen yeterlidir; gerekçe zorunlu değildir.'],
 ['Stellen Sie auf','Bilinmeyenler arasındaki ilişkiyi bir denklem biçiminde kur.'],
 ['Lösen Sie','Verilen denklemde bilinmeyeni uygun hesaplama adımlarıyla bul.'],
 ['Begründen Sie (rechnerisch)','Bir önermenin neden doğru olduğunu sayısal veya cebirsel işlemlerle göster.'],
 ['Stellen Sie dar','Çözüm yolunu anlaşılır sırayla yaz ve sonuca nasıl ulaştığını göster.'],
 ['Skizzieren Sie','Grafiğin köklerini, maksimum/minimumunu ve genel şeklini doğru konumlara yaklaşık çiz.'],
 ['Übertragen Sie','Verilen diyagramı veya tabloyu kendi çalışma alanına geçir.'],
 ['Ergänzen Sie','Tabloda boş bırakılan değerleri uygun biçimde tamamla.'],
 ['Benennen Sie','Bir şeklin veya matematiksel nesnenin adını yaz.']
];
if(Object.keys(S).length!==42||examples.length!==21)throw Error('Unexpected solution inventory');
window.TUANA2_SOLUTIONS={math:S,operatorExamples:examples};
})();