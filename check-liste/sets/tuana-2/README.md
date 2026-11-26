# Tuana 2 — Vor-Abiturprüfung 2026

**Sürüm:** Check Liste v1.26.0

**Açılış:** https://sinan-ipek.github.io/projeler/check-liste/lesson.html?set=tuana-2

## Kaynak ve kapsam

Kullanıcının paylaştığı **10 fotoğraf** kaynak alınmıştır. Bunlar Vor-Abiturprüfung 2026 Mathematik Grundkurs, Teil A / Teil B sayfaları ve A/B sınavlarında kullanılan operatör açıklamalarını içerir.

**63 bağımsız çalışma kartı:**
- **Teil B (hesap makinesi kullanılabilir): 22 matematik alt maddesi.** B1, B3, B4. B1 fonksiyon incelemesinin kendi başlıkları ayrı kartlar olarak düzenlenmiştir. Fotoğraflarda B2 yoktur; uydurulmamıştır.
- **Teil A (hesap makinesi kullanılamaz): 20 matematik alt maddesi.** Pflicht 1–3 ve Wahlpflicht 1–6. Zorunlu görevlerin tümü ve seçmelilerden 2 tanesi sınavda cevaplanacaktır; çalışmada tamamı sunulur.
- **Operatör sözlüğü: 21 kart.** Teil B'den 14, Teil A'dan 7 ek/ayrı ifade. Her biri Almanca–Türkçe anlam testidir.

## v1.23.0 · Tam çeviri ve yeni yerleşim

**42 matematik kartının** Almancası ve Türkçesi satır satır yeniden eşleştirildi. B1a dahil bütün formüller, sayısal veriler ve soru koşulları her iki dilde aynı bilgiyi aktarıyor. **21 operatör kartında** Almanca kaynak açıklamaları ile tam Türkçe karşılıkları doğru yanıt sonrasında gösterilir. Kelime testinin dört seçeneği Türkçedir.

Çoktan seçmeli yanıtlar **sol sütunun en altında**, ayrı kaydırılabilir bir paneldedir. Soru menüsü bunun üzerinde bağımsız kaydırılır. Çizim tahtası tam yüksekliğini korur. Eski öğrencilerin ekranı ve kaydedilmiş çözümleri değiştirilmemiştir.

## v1.26.0 · Sadeleştirilmiş görünüm

Sorunun altındaki küçük sınav kuralları açıklaması, Yanıt düğmesinin altında görünen yardımcı metin ve çizim tahtasının altındaki uzun kalem/seçim talimatları görünümden kaldırıldı. **Hesap makinesi kullanılabilir/kullanılamaz notları**, sorunun kendi **Tamamlandı** kutusu ve sol alttaki gri **sürüm numarası** korundu. Çizim, PDF, çözüm penceresi ve kayıt anahtarları değiştirilmedi.

## v1.25.0 · Yanıt düğmesi sorunun sonunda

Yanıt düğmesi artık **sol sütundaki ayrı bir çerçevede değil**, sorunun metni ve varsa şekli bittikten sonra aynı soru kartında yer alıyor. Soruyla birlikte kaydırıldığı için sürekli görünmüyor. Önceki ayrı yanıt bölümündeki ikinci **Tamamlandı** kutusu gösterilmiyor. Sorunun kendi Tamamlandı kutusu ve ilerleme kaydı korunuyor; ayrı çözüm penceresi aynı şekilde açılıyor.

## v1.24.0 · Yanıt düğmesi ve ayrı çözüm penceresi

Tuana 2'de **çoktan seçmeli seçenekler kaldırıldı**. Her kartta sol sütunun en altında yalnızca **Yanıt** düğmesi bulunur. Öğrenci kendi çözümünü yaptıktan sonra düğmeye basar; soru kimliğiyle açılan `check-liste/answer.html` penceresinde adım adım Türkçe açıklama ve kaynak soru metinleri gösterilir. `sets/tuana-2/solutions.js` içinde **42 matematik sorusunun** açıklamalı işlem yolu, **21 operatör için** kaynak açıklama ve uygulama örneği yer alır.

Yanıt penceresi açıldıktan sonra Tamamlandı kutusu etkinleşir, öğrenci kendisi işaretler. Eski kayıtlar ve çizimler korunur. Çizim tahtasının yüksekliği değiştirilmez. Bazı tarayıcılar yeni pencereyi ayrı sekmede açabilir.

## Önceki sistem: çoktan seçmeli davranış (v1.23.0 öncesi)

Her kartta tam 4 seçenek vardır. Önce beyaz tahtada çözüm yapılır. Yanlış şıkta doğru cevap gösterilmez, **Tamamlandı** kutusu kapalıdır. Doğru seçenek kilidi açar; öğrenci kutuyu işaretlediğinde ilerleme kaydedilir. Öğrencinin seçimi de yerel depoda saklanır. Operatörlerde Almanca kaynak açıklama ve Türkçesi yalnızca doğru yanıt seçildikten sonra görüntülenir.

**Önemli pedagojik sınır:** Grafik çizimi, ispat, türev incelemesi ve çok adımlı model kurma gibi görevlerde seçenekler tam çözümün yerine geçmez; ilgili temel koşul, grafik niteliği veya sonuçla öz denetim sağlar. Doğru şık, ayrıntılı matematiksel gerekçenin otomatik olarak doğrulandığı anlamına gelmez.

## Şekiller

B3 misket yolu, B3 tünel/üçgen, B4 fonksiyon grafiği, Wahlpflicht 5 olasılık ağacı ve Wahlpflicht 6 puan dizisi; fotoğraflardaki gerekli alanlar esas alınarak **beyaz arka planlı temiz SVG olarak yeniden çizilmiştir**. Fotoğrafların kendisi yayımlanmamıştır. B3 profilinde ve B4 kartında amaç verilen biçimi incelemektir; vektör görseller birebir optik kopya değildir.

## Sınav notları

- **Teil A:** Ohne Hilfsmittel. Fotoğrafa göre hesap makinesi kullanılmıyor. Süre en fazla 90 dakika. Pflicht 1–3 zorunlu, 6 Wahlpflicht içinden 2 seçilir. Çizim araçları ve Almanca yazım sözlüğü ile ilgili sınav yönergesini kontrol edin.
- **Teil B:** Mit Hilfsmittel. WTR (wissenschaftlicher Taschenrechner), mathematische Formelsammlung ve Wörterbuch zur deutschen Rechtschreibung izinlidir. Fotoğrafta en az 155 dakika belirtiliyor.
- Her kartın altında kendi bölümüne uygun **Not: hesap makinesi kullanabilirsiniz / kullanamazsınız** uyarısı vardır.

## Kod düzeni

- `sets/tuana-2/data.js`: 63 kart + 5 temiz şema + seçenekler + doğru anahtarlar
- `check-liste/lesson.html`: ortak soru, resim, çözüm tahtası, MCQ ve Tamamlandı alanı
- `check-liste/app.js`: ortak not/MCQ geri bildirimi, doğru-yanıt kilidi ve `answers` kayıtları
- `check-liste/pdf-export.js`: ortak PDF, hesap makinesi notları ve seçilen yanıt bilgisi
- `check-liste/lesson-loader.js`: `?set=tuana-2` ile veri paketini açar

**Öğrenci kayıt kimliği:** `tuana-2-vorabitur-2026`. Diğer öğrencilerin kaydedilmiş ilerlemeleri değiştirilmez.
