# Check Liste — Ortak ders sistemi

**Sürüm v1.29.0 · HTML arayüzü, çizim motoru ve PDF çıktısı artık ortak kaynaklardan çalışır.

## Tuana 2 (v1.29.0)

Vor-Abiturprüfung 2026 Grundkurs için **63 kart** (42 matematik alt maddesi ve 21 operatör). Her soru için **Çözüm** düğmesi açıklamalı çözümü ayrı pencerede açar. Açılan pencerede sorunun Almanca/Türkçe metni ve görseli yeniden gösterilmez. Matematik sorularının Almancası ve Türkçesi birlikte yer alır. Hesap makinesi izin notları ve öğrencinin kendi Tamamlandı işareti korunur. Veri: `sets/tuana-2/data.js`; çözümler: `sets/tuana-2/solutions.js`. Bağlantı: `lesson.html?set=tuana-2`.

### v1.23.0 düzenlemesi

Tuana 2'de 63 kartın Almanca–Türkçe karşılıkları yeniden incelendi. 42 matematik soru metni ve 21 operatör açıklaması eşlendi; yanıt paneli sol sütunun en altına alındı. Ortak çizim alanı tam yüksekliğine geri döndü. Soru kimlikleri ve ilerleme kayıtları korundu.

### v1.24.0 düzenlemesi

Tuana 2'nin 63 kartında seçenekler kaldırıldı; sol sütunun en altına **Yanıt** düğmesi eklendi. Ayrı çözüm penceresinde 42 matematik sorusunun açıklamalı çözümü, 21 operatörün tam anlamı ve örneği veriliyor. `sets/tuana-2/solutions.js` ve `answer.html` eklendi. Tamamlandı kutusu yanıt penceresi açıldığında etkinleşir. Eski öğrencilerin çalışmaları değişmedi.

### v1.25.0 düzenlemesi

Tuana 2 Yanıt düğmesi sol sütundan kaldırılıp **sorunun ve şeklin altına, doğal sayfa akışına** taşındı. Ayrı çerçeve ve yanıttaki ikinci Tamamlandı kutusu yok; dersin asıl tamamlanma kaydı korunuyor. Sayfa kaydırıldığında düğme de kayar.

### v1.26.0 düzenlemesi

Küçük yardımcı açıklamalar kaldırıldı: sınavın genel Teil A/B açıklaması, Yanıt düğmesi altındaki durum mesajları ve çizim tahtasının altındaki uzun kullanım yönergeleri. Hesap makinesi izin notu, sorunun Tamamlandı kutusu ve sol alt köşedeki gri sürüm yazısı korunur.

### v1.27.0 ortak çizim ve yanıt sistemi

**Beş çizim rengi:** Siyah, kırmızı, mavi, yeşil, gri. **İki stil:** Solid (düz), Dashed (kesikli). Seçilen özellik her çizgi üzerinde korunur, önceki kayıtlar varsayılan siyah/düz olarak okunur ve PDF çıktısına aktarılır. Tüm ortak derslerde Yanıt düğmesi vardır. Tuana 2 için hazır açıklamalı çözümler ayrı pencerede açılır; başka derslerde çözüm henüz eklenmemişse dürüstçe bildirilir. Küçük açıklamalar kaldırıldı veya okunabilir metin boyutuna yükseltildi; sol alttaki gri sürüm yazısı küçüktür.

### v1.28.0 düzenlemesi

Bütün Check Liste soru kartlarındaki düğmenin adı **Çözüm** (Almanca: Lösung, İngilizce: Solution) oldu. Tuana 2 ve ortak çözüm pencerelerinde soru metinleri ve soru şekilleri tekrar gösterilmiyor: yalnızca açıklamalı çözüm, sonuç veya henüz hazır çözüm bulunmadığını belirten mesaj yer alıyor. Çizimler, tamamlanma kayıtları, renkler ve çizgi stilleri korunmuştur.

### v1.29.0 — Gerçek LaTeX matematik görünümü

Ortak `check-liste/math-render.js` dosyası ve sabit sürümlü **KaTeX v0.19.1** kullanılır. Bütün Check Liste soru kartlarının Almanca/Türkçe metinlerinde üstlü ifadeler (`x²`, `a^t`), kesirler (`1/3`), kökler (`√161`), fonksiyonlar, eşitlikler, koordinatlar ve olasılık sembolleri **gerçek TeX tipografisi** ile gösterilir. Aynı dizgi `answer.html` ve `answer-generic.html` açıklamalı çözüm pencerelerinde de kullanılır. Metinler güvenli `textContent` tabanlı render ile işlenir; doğru olmayan sonuçlar ya da yeni çözüm verisi üretilmez. İnternet bağlantısı olmayan veya KaTeX'in engellendiği durumda özgün düz metin görünür. Bu değişiklik mevcut soru kimliklerini ve çizim/ilerleme kayıtlarını değiştirmez.

## Miraç 1 (v1.21.0)

Sayfa 20 için **44 denklem alt sorusu** eklendi. Ortak Check Liste çalışma motorunu kullanır ve diğer öğrencilerden bağımsız ilerleme kaydeder. Doğrudan bağlantı: `lesson.html?set=mirac-1`. Veri: `sets/mirac-denklemler-2026/data.js`. Fotoğrafın sağ kenarında **5f denkleminin son sayısı kesiktir**; uygulamada açıkça belirtilmiştir.

## Lambacher Schweizer 7 (v1.17.1)

**Denetim:** `sets/lambacher-schweizer-7/QA.md`. 4–295 ardışık; s.216–295 için 80 yeni sayfa kesiti eklendi (toplam 700). Kullanıcıya ait ZIP tarayıcıya içe aktarılır. Tam soru metinleri ve simgeler için metin düzeyi kontrolü sürüyor.

- **Bağlantı:** `lesson.html?set=lambacher-7`
- **Veri kaynağı:** `sets/lambacher-schweizer-7/data.js`
- **İlk fotoğraf grubu:** İçindekiler s.2–3; ders sayfaları s.4–295
- **3080 takip kartı**; bölüm girişleri ve sayfa/soru numaraları, Almanca–Türkçe konu özetleri
- **Önemli:** Tam telifli metinler ve sayfa fotoğrafları **açık GitHub deposunda paylaşılmaz**; soruyu kitaptan okuyup çözmek gerekir
- **Altı bölüm:** s.4, 44, 80, 120, 162 ve 196'da başlar. Ekler s.228'den itibaren.
- **Fotoğraflar tamamlandı:** Son basılı sayfa s.295
- **Kayıt anahtarı:** `lambacher-schweizer-7-nrw`; önceki çalışmalardan bağımsız

## Munzur — yeni çalışma paketi (v1.4.0)

- **Bağlantı:** `lesson.html?set=munzur`
- **Veri kaynağı:** `sets/munzur-2026/data.js`
- **Kayıt anahtarı:** `munzur-2026`; diğer öğrencilerin kayıtlarından bağımsız
- **Toplam:** 87 soru/alt madde; Almanca metinler ve Türkçe çeviriler
- **Öncelik:** Okul ödevi `Mathebuch S. 50 Nr. 4` ve `S. 51 Nr. 7, 8`. Bu maddeler ilk sıradadır ve ★ ile işaretlenir.
- **Diğer sayfalar:** s.50–52 (Zuordnungen) ve s.91–93 (Prozentrechnung, Preisänderungen, Mehrwertsteuer)
- **Sayfa 52 (v1.4.1):** 10. soru (araba ve 3 hız grafiği), 11a–b (Tim/Jana okul yolu), 12a–c (iki kabın tam sıcaklık verisi), 13a–d (bisiklet yarışı: doğru/yanlış). Toplam **10 yeni alt madde**; grafikler fotoğrafa göre yeniden çizildi.
- **Çizimler:** Sayısal grafik, tablo ve yarış soruları için yeniden oluşturulmuş **şematik SVG** görseller. Çok küçük/hassas kitap çizimleri bire bir kopya değildir; özgün kaynak fotoğrafla karşılaştırılmalıdır. 92/13'ün beş hesap makinesi ekranındaki küçük tuşlamalar kesin okunamadığı için uydurulmamıştır.

Munzur, Çetin 1 ve Aras 1 ile **aynı `lesson.html`, `app.js` ve `pdf-export.js`** dosyalarını kullanır. Tuana 1 ayrı sunumdur.

## Tek merkezli mimari

```
Öğren ana sayfası
└── Check Liste (check-liste/index.html)
    ├── Çetin 1 → lesson.html?set=cetin-1
    │   └── sets/matematik-5-2026/data.js (41 soru)
    ├── Aras 1  → lesson.html?set=aras-1
    │   └── ../aras/data.js (34 soru, saat görselleri)
    ├── Munzur  → lesson.html?set=munzur
    │   └── sets/munzur-2026/data.js (87 soru)
    ├── Lambacher Schweizer 7 → lesson.html?set=lambacher-7
    │   └── sets/lambacher-schweizer-7/data.js (3080 takip kartı, s.4–295)
    └── Tuana 1 → ../mathe-gk/index.html (ayrı slayt sunumu)
```

Çetin 1, Aras 1 ve Munzur için **yalnızca bir** arayüz, bir çizim motoru ve bir PDF oluşturucu kullanılır:

- `lesson.html` — tek ortak HTML arayüzü; Home / Dil / Help, Paylaş, Kalem, Seçim, Silgi ve sürüm notu
- `lesson-loader.js` — `?set=` parametresinden yalnızca izin verilen soru paketini seçer; sonra aynı `app.js` ile `pdf-export.js` dosyalarını yükler
- `app.js` — **tek çizim/Check Liste motoru**, her soruya özgü çizimler ve ilerleme
- `pdf-export.js` — **tek PDF üretme motoru**, tüm soruları, görselleri ve kaydedilmiş çizimleri PDF yapar
- `sets/matematik-5-2026/data.js` — Çetin 1 soruları
- `../aras/data.js` — Aras 1 soruları

## Eski adresleri ve kayıtları koruma

- Eski `check-liste/cetin-1.html` bağlantısı ortak sayfaya yönlendirilir
- Eski `aras/index.html` bağlantısı ortak sayfaya yönlendirilir
- Yönlendirmeler `profile` gibi URL parametrelerini ve `#soru-id` bölümünü korur
- Daha önce oluşturulmuş `localStorage` anahtarları **değişmez**: `matematik-5-2026` ve `aras-zaman-2026`
- `../aras/pdf-export.js` eski tarayıcı önbellekleri için küçük bir yönlendirme dosyasıdır; ikinci PDF motoru **değildir**

## v1.3.1 — Daha yumuşak mürekkep

- Serbest el çizgilerinde yalnızca ekrandaki yol **hafif kuadratik eğrilerle** yumuşatılır. Geometri nesneleri düz/gerçek biçimlerini korur.
- Normal yoğunluklu ekranlarda çözüm tuvali **en az 2× çözünürlükte** oluşturulur (en fazla 3×).
- PDF çıktısında da aynı serbest çizgi yumuşatması uygulanır.
- Orijinal koordinatlar ve tarayıcıda kayıtlı çizimler değiştirilmez; iyileştirme eski çizimlerde de görünür.

## Güncelleme biçimi

- Çizim, şekil tanıma, nesne seçme, tek tıklama ile nokta oluşturma: **yalnızca `app.js`**
- Sayfa tasarımı ve araçların yerleşimi: **yalnızca `lesson.html`**
- PDF çıktısının düzeni ve oluşturulması: **yalnızca `pdf-export.js`**
- Tek bir öğrencinin soruları: **yalnızca ilgili `data.js`**
- Yeni öğrenci: yeni soru verisi, `lesson-loader.js` izin listesine ve `index.html` ders menüsüne giriş

**Tuana 1**, şimdilik kendi `mathe-gk/index.html` dosyasını kullanan ayrı ders sunumudur; ortak çizim/Check Liste uygulamasına dönüştürülmemiştir.


**v1.11.0 tarihsel notu:** 96–115: 290 yeni takip kartı (soru ve alt maddeler, Beispiele, konu), 61 özel görsel. Sonraki fotoğraflar: 116–135. Yerel görsel ZIP dosyası: Lambacher_Schweizer_7_tum_gorseller_s4-115.zip.


**v1.12.0 güncellemesi:** s.116–135 için 247 soru/alt madde, test, örnek ve konu kartı ile 2 destek görsel kartı eklendi; toplam 1901 kart. 57 kırpım eklendi, özel ZIP 366 görsel içeriyor. Geçmiş sürüm notları tarihsel kayıttır; güncel kapsam 4–135. Sonraki grup 136–155.


**v1.13.0 (22.11.2026):** 136–155. sayfalarda 112 numaralı görev/konu/örnek kalemi, harfli alt maddelerle birlikte 325 yeni takip kartı. 52 ek özel kırpım, toplam 418 görsel. GitHub veri kaydı önceki 1901 kartı değiştirmeden genişletildi. Sonraki grup s.156–175; yerel ZIP `Lambacher_Schweizer_7_tum_gorseller_s4-155.zip`.


**v1.14.0 (22.11.2026):** 156–175. sayfalarda 99 üst düzey soru/Beispiel/konu başlığı, harfli alt maddeler dahil 210 yeni takip kartı. 63 kırpılmış özel çizim/görsel; toplam 481. Veri, Check Liste menüsü ve yerel figür ZIP'i yenilendi. Sonraki grup s.176–195. Yerel ZIP: `Lambacher_Schweizer_7_tum_gorseller_s4-175.zip`.


**v1.15.0 (23.11.2026):** 176–195. sayfalarda 105 soru, örnek ve konu başlığı (alt maddeler dahil **211 yeni kart**). s.180–183 kongruenz; s.184–187 kongruenzle ispat, s.188–191 pekiştirme, s.192 konu özeti, s.193 iki turlu test, s.194–195 dinamik geometri uygulamaları. 71 yeni özel kırpılmış şekil (toplam **552**). Sıradaki fotoğraf grubu s.196–215. ZIP: `Lambacher_Schweizer_7_tum_gorseller_s4-195.zip`.


**v1.16.0 (23.11.2026):** s.196–215. 253 yeni takip kartı (68 bağımsız özel görsel kaydı dahil), toplam **2900 kart**. 68 yeni özel kırpım; toplam **620 görsel**. 10 fotoğraf / 20 sayfa, eksik veya tekrarlı sayfa yok. Soru formüllerinin karakter karakter eksiksizliği garanti edilmez. Sonraki grup **216–235**. Özel ZIP: `Lambacher_Schweizer_7_tum_gorseller_s4-215.zip`.


**v1.17.0 (23.11.2026):** Basılı sayfalar 216–295 de kapsama alındı. 180 yeni takip kartı (80 sayfa-görsel referansı, 94 numaralı görev/etkinlik üst kartı ve 6 konu başlığı), toplam **3080**. Önceki 620 özel görsel + 80 yeni sayfa kesiti = **700**. Tam kitap fotoğraf kapsaması **4–295**; bundan sonra yeni basılı sayfa istenmeyecek. Matematiksel küçük baskının, bütün alt maddelerin ve şekil-özel kesitlerinin tam doğrulaması ayrı iştir. Kişisel görsel ZIP: `Lambacher_Schweizer_7_tum_gorseller_s4-295.zip`.


**v1.17.1 (23.11.2026) — Soru bulunan sayfalar filtresi:** Kitabın basılı 4–295 sayfalarının tamamı fotoğraf envanterinde korunur; ancak Check Liste menüsü, sayfa seçicisi, ileri/geri geçişi, tamamlanma sayacı ve Paylaş/PDF yalnızca çalışma içeren **207 sayfayı (2955 görünür kart)** kullanır. Örnek, alıştırma veya soru bulunmayan **85 sayfa** menüde gizlenir; bunlara 238–295 çözüm/dizin/kaynakça sayfaları dahildir. 228–229 tartışma ve gerekçelendirme etkinlikleri korundu. Var olan 3080 veri kartının hiçbiri ve tarayıcıdaki tamamlanma/çizim kayıtları silinmedi. Aynı filtre diğer ders paketlerini etkilemez.


**v1.18.0 (23.11.2026):** Kitap kartının görünen adı **7. sınıf** oldu. Kart seçilince `Çalışmayı aç` / `Yükle` seçenekleri açılır; `Yükle` bilgisayardaki PDF dosyasını tarayıcının IndexedDB'sine kaydeder. Dosya sunucuya veya GitHub'a gönderilmez. Yükleme ardından `Kitabı görüntüle` seçeneği belirir; ders içinde de `Kitabımı aç` düğmesi PDF'yi yerel görüntüleyicide açar. Kayıt bu tarayıcıya özeldir; başka cihazda yeniden seçmek gerekir. PDF'den soruları otomatik ayrıştırma/etiketleme veya sayfa numaralarını eşleme bu sürümde yoktur. Diğer dersler, kayıt anahtarları, soru kartları ve resim arşivi değişmez.


**v1.19.0 (23.11.2026) — ZIP ile tek adımda başlama:** Ana menüde **7. sınıf → Yükle** ile `7_sinif_Check_Liste_Paketi_v1.19.0.zip` dosyası seçilir. Sayfa ZIP'i tarayıcı içinde doğrular, `images/` içindeki 700 JPG/PNG görselini (mevcut `check-liste-private-figures-v1` IndexedDB deposuna) yerel olarak aktarır ve otomatik olarak `lesson.html?set=lambacher-7` ekranını açar. ZIP'i elle açmak, JPG/PNG dosyalarını tek tek seçmek, PDF veya HTML yüklemek gerekmez. Yerel dosyalar GitHub'a/başka sunucuya gönderilmez. `index.html` ZIP içinde başlangıç yönlendirmesi olarak bulunur; ders programı ve 3080 envanter kartı ZIP'ten değil GitHub'dan yüklenir, dolayısıyla internet gereklidir. Özgün tam soru metinleri ZIP'te bulunmaz. Kullanıcıya verilen ZIP herkese açık depoya eklenmemiştir. Eski manuel 'Görselleri içe aktar' düğmesi bu ders için gizlidir.


**v1.20.0 (23.11.2026) — Yerel ders içeriği + görseller tek ZIP'te:** 7. sınıf dersi artık `lesson-loader.js` tarafından GitHub `data.js` dosyasından otomatik alınmaz; ZIP yüklenmeden ders boş kalır. Tam paketin `study.json` içeriğindeki **3080 kayıt** (207 görünür çalışma sayfası / 2955 menü kartı) ve `images/` dizinindeki **700 görsel** aynı tarayıcı IndexedDB işleminde kaydedilir; tam ZIP yeniden seçildiğinde dışarıdan çalışma verisi indirilmez. **Eski v1.19 görsel ZIP'ini kullananlar için geçiş:** İlk defa bu ZIP seçilince, mevcut herkese açık `data.js` dosyası *yalnızca bu dönüşüm sırasında* bir kere okunur; uygulama içerik + görselleri tek ZIP olarak tarayıcıda oluşturur ve `7_sinif_Tam_Calisma_Paketi_v1.20.0.zip` adıyla indirmeyi başlatır. Daha sonra ders açılır. **Önemli:** Bu eski veri dosyası geriye dönük geçiş için halen GitHub deposunda ve geçmişinde erişilebilir durumdadır. Yalnızca menüden kaldırmak, önceki Github yayınını hukuken veya teknik olarak silmez. Uygulama kabuğu çevrimiçi GitHub Pages üzerinden açılır; çalışma ve görseller ise tarayıcıya yüklenmiş paketten gelir.
