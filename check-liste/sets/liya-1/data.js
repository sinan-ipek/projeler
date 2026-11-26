/* Liya 1 · v1.33.0 · Aufgabe 3–6 · 2 user-provided worksheet photos.
 * The decorative mason/excavator photos and answer-paper grid are not mathematical diagrams.
 * Page 1/2 labels below identify photo order, not textbook page numbers.
 */
(function(){
'use strict';
const questions=[];
function add(page,n,sub,de,tr,solution){
 const number=String(n)+(sub||'');
 questions.push({id:'liya1-'+number,page,exercise:n,number,
  german:'Aufgabe '+n+'\n'+(sub?sub+') ':'')+de,
  turkish:'Soru '+n+'\n'+(sub?sub+') ':'')+tr,
  solution:solution.map((t,i)=>String(i+1)+'. '+t).join('\n')});
}
add(1,3,'a',
'22 Arbeitern wird bei täglich 8-stündiger Arbeitszeit ein Wochenlohn von insgesamt 14.960,00 € ausgezahlt. Berechne, wie viel Wochenlohn 18 Arbeiter bei gleichem Stundenlohn insgesamt erhalten, wenn sie täglich 7 Stunden arbeiten.',
'Günde 8 saat çalışan 22 işçiye toplam 14.960,00 € haftalık ücret ödeniyor. Aynı saatlik ücretle günde 7 saat çalışan 18 işçinin toplam ne kadar haftalık ücret alacağını hesapla.',
['Çalışılan hafta içindeki gün sayısının iki durumda da aynı olduğunu varsayalım. Ücret işçi sayısıyla ve günlük çalışma süresiyle doğru orantılıdır.',
 'Yeni ücret = 14.960 · (18/22) · (7/8).',
 'Önce 14.960/(22·8)=85; sonra 85 · 18 · 7 = 10.710.',
 'Sonuç: Yeni toplam haftalık ücret 10.710 € olur.']);
add(1,3,'b',
'Drei Maurer benötigen zum Verklinkern eines Hauses insgesamt 450 kg Steine. Gib nun an, wie viel kg Steine fünf Maurer zum Verklinkern desselben Hauses benötigen.',
'Üç duvar ustası bir evin tuğla kaplaması için toplam 450 kg taş/tuğla kullanıyor. Aynı evin tuğla kaplamasını beş duvar ustası yaparsa toplam kaç kilogram taş/tuğla gerektiğini belirt.',
['Aynı evin aynı yüzeyi kaplanacak: iş miktarı değişmiyor.',
 'Usta sayısı artarsa çalışma süresi değişebilir, ancak gerekli malzeme miktarı değişmez.',
 'Sonuç: Beş usta da toplam 450 kg taş/tuğla kullanır.']);
const contextDE='Zwei Bagger benötigen zum Ausbaggern einer Hafeneinfahrt 14 Monate.\n';
const contextTR='İki ekskavatör (kepçe), bir liman girişinin kazılmasını 14 ayda tamamlıyor.\n';
add(2,4,'a',
contextDE+'Berechne mithilfe einer Tabelle, wie viele Bagger eingesetzt werden müssen, damit die Arbeit in 4 Monaten erledigt ist.',
contextTR+'İşin 4 ayda tamamlanması için kaç ekskavatör kullanılması gerektiğini bir tablo yardımıyla hesapla.',
['Toplam iş miktarı = 2 ekskavatör · 14 ay = 28 ekskavatör-ay.',
 'Tablo: 2 ekskavatör → 14 ay; 1 ekskavatör → 28 ay; 7 ekskavatör → 4 ay.',
 'Gerekli ekskavatör sayısı = 28/4 = 7.',
 'Sonuç: 7 ekskavatör gerekir.']);
add(2,4,'b',
contextDE+'Berechne mithilfe einer Tabelle, in welchem Zeitraum die Arbeit erledigt sein könnte, wenn man 8 Bagger einsetzen würde.',
contextTR+'Sekiz ekskavatör kullanılırsa işin ne kadar sürede bitebileceğini bir tablo yardımıyla hesapla.',
['Toplam iş = 2 · 14 = 28 ekskavatör-ay.',
 'Tablo: 2 ekskavatör → 14 ay; 1 ekskavatör → 28 ay; 8 ekskavatör → 28/8 ay.',
 'Süre = 28/8 = 3,5 ay.',
 'Sonuç: Sekiz ekskavatörle çalışma 3,5 ay sürer.']);
add(2,4,'c',
contextDE+'Von den beiden Baggern fällt einer nach 7 Monaten wegen eines Defektes aus. Gib an, wie lange der andere Bagger nun für die restliche Arbeit benötigt.',
contextTR+'İki ekskavatörden biri 7 ay sonra bir arıza nedeniyle çalışamaz hâle geliyor. Diğer ekskavatörün kalan işi tamamlamak için bundan sonra ne kadar süreye ihtiyaç duyacağını belirt.',
['İşin tamamı 2 · 14 = 28 ekskavatör-ay.',
 'İlk 7 ayda yapılan iş = 2 · 7 = 14 ekskavatör-ay.',
 'Kalan iş = 28 − 14 = 14 ekskavatör-ay.',
 'Tek ekskavatör için ek süre = 14/1 = 14 ay.',
 'Sonuç: Diğer ekskavatör 14 ay daha çalışır. Başlangıçtan itibaren toplam 7+14=21 ay geçer.']);
add(2,5,'',
'Eine Baufirma hat für den Abtransport von 600 m³ Erde insgesamt 18 Stunden lang 4 Lkw eingesetzt. Auf dem Nachbargrundstück müssen 850 m³ abtransportiert werden, es stehen aber nur 3 Lkw zur Verfügung. Fertige eine geeignete Tabelle an und berechne die dafür benötigte Arbeitszeit.',
'Bir inşaat firması 600 m³ toprağın taşınması için 4 kamyonu toplam 18 saat çalıştırdı. Komşu arsada 850 m³ toprağın taşınması gerekiyor, ancak yalnızca 3 kamyon mevcut. Uygun bir tablo hazırla ve bunun için gerekli çalışma süresini hesapla.',
['Kamyonların aynı kapasitede ve aynı hızda çalıştığını varsayalım.',
 '600 m³ için 4 · 18 = 72 kamyon-saat gerekir.',
 '850 m³ için 72 · 850/600 = 102 kamyon-saat gerekir.',
 '3 kamyonla çalışma süresi = 102/3 = 34 saat.',
 'Kontrol tablosu: 600 m³ | 4 kamyon | 18 saat; 850 m³ | 3 kamyon | 34 saat.',
 'Sonuç: İş 34 saat sürer.']);
add(2,6,'',
'Ein Futtervorrat für sechs Kühe reicht für 30 Tage. Nach 14 Tagen kommen zwei weitere Kühe hinzu. Berechne, wie lange das Futter nun voraussichtlich reichen wird.',
'Altı inek için bulunan yem stoku 30 gün yetiyor. 14 gün sonra iki inek daha geliyor. Yemin bundan sonra tahminen kaç gün daha yeteceğini hesapla.',
['Başlangıç yem stoku = 6 · 30 = 180 inek-gün.',
 'İlk 14 günde tüketilen = 6 · 14 = 84 inek-gün.',
 'Kalan = 180 − 84 = 96 inek-gün.',
 'Yeni inek sayısı = 6 + 2 = 8.',
 'Kalan süre = 96/8 = 12 gün.',
 'Sonuç: İki yeni inek geldikten sonra yem 12 gün daha yeter; başlangıçtan itibaren toplam 14+12=26 gün.']);
if(questions.length!==7||new Set(questions.map(q=>q.id)).size!==7)throw Error('Seven unique cards required');
window.CHECKLIST_PACK={id:'liya-1-proportion-2026',title:'Liya 1 · Zuordnungen · Aufgaben 3–6',questions};
})();