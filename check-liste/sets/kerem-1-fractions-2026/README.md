# Kerem 1 — Mit Brüchen rechnen

**Sürüm:** v1.36.0  
**Canlı bağlantı:** https://sinan-ipek.github.io/projeler/check-liste/kerem-1/

## v1.36.0 — Çözümler

Altı sayfanın tüm sorularında adım adım açıklamalı çözüm mevcuttur. Şekle bağlı sorularda boyalı parçalar kaynak fotoğraflarla tekrar karşılaştırıldı; 63. sayfadaki çizili/renkli kesirler, 71. sayfadaki dikdörtgenler ve üçgenler düzeltildi. Kart oluşturma sorularında bir bütün sonucunu veren örnekler açıklandı. **169/169 çözüm veya açıklama** test edildi.

## Kaynak

26 Kasım 2026'da kullanıcı tarafından gönderilen altı kitap fotoğrafı (sayfa **62, 63, 64, 68, 70, 71**). Sayfa numaraları kaynak kitapta yazdığı gibi korunmuştur. Kaynaktaki Almanca ifadelerle çalışılır; Türkçe anlamları da her soru kartında yer alır.

| Sayfa | Konu | Kart |
|---|---|---:|
| 62 | Gleichnamige Brüche addieren und subtrahieren | 15 |
| 63 | Eş paydalı kesirler, tam sayılı kesirler, iki sütun alıştırmaları | 52 |
| 64 | Ungleichnamige Brüche addieren und subtrahieren | 11 |
| 68 | Anteile von Größen | 20 |
| 70 | Brüche mit natürlichen Zahlen multiplizieren — keşfetme ve örnekler | 15 |
| 71 | Aynı konunun iki sütunlu alıştırmaları | 56 |
| **Toplam** | | **169** |

Paketin içinde **21 çözümlü örnek**, **8 kural/hatırlatma**, **13 sözlük kartı** ve **127 alıştırma / keşfetme alt maddesi** vardır.

### Öğrenme düzeni

Artık **169 kartın tamamında** `Çözüm` düğmesi bulunur. **127 alıştırma/keşfetme sorusu** işlem basamaklarıyla çözülür, **21 Beispiel** adım adım açıklanır; **8 kural** ve **13 sözlük** kartının açıklamaları da aynı pencerede açılır. Soru metinleri çözüm penceresinde tekrar edilmez. Çözümler `data.js` içinde soru kimliklerine bağlanmıştır; mevcut öğrenci çizimleri ve Tamamlandı kayıtları korunur. Formüller KaTeX ile matematiksel dizgidedir; standart beş çizim rengi, Solid/Dashed çizgi stili ve PDF çıktısı ortak sistemden gelir.

Resim gerektiren sorulara **beyaz zeminli SVG şemaları** konmuştur. Özgün kitap fotoğrafları ve sayfa arka planları yayımlanmamıştır. Bazı şemalar hesaplamayı göstermek içindir; sanat veya fotoğraf kopyası değildir.

**Veri kaynağı:** `check-liste/sets/kerem-1-fractions-2026/data.js`

**Paket kimliği:** `kerem-1-fractions-2026`

GitHub'da daha önce bulunan `check-liste/sets/kerem-1/data.js` adlı eski **Test 72/parabol** dosyası silinmedi veya üzerine yazılmadı. Yeni kesir çalışması kendi veri paketini kullanır.
