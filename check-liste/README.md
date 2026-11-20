# Check Liste (Çetin, 2026)

Bu klasörde Çetin'in Almanca–Türkçe **41 soruluk** matematik checklist uygulaması bulunmaktadır.

- `index.html` — Soru/çeviri ekranı ve sağdaki Beyaz Tahta paneli
- `app.js` — Soru listesi, ilerleme, her soru için tahta adresi
- `sets/cetin-2026/data.js` — 41 sorunun Almanca ve Türkçe metinleri
- `whiteboard.html` — `../beyaz-tahta/index.html` sürümünden **doğrudan kopyalanmış orijinal Beyaz Tahta çizim motoru**

## Beyaz Tahta

Orijinal **Beyaz Tahta v19.15-deneme** çizim ve seçim algoritmaları aynen korunmuştur. Check Liste'de yalnızca görünüm sınırlanmıştır: **Seç**, **Ink**, **Silgi**, **Tümünü temizle** görünür. Beyaz Tahta normal kullanıcı hesabıyla **yerel Ben modunda** başlatılır; ortak canlı tahta paylaşılmaz. Her soru için bağımsız kayıt anahtarı kullanılır:

`check-liste:board:<checklistId>:<profileId>:<page-number>`

Dolayısıyla soru değişimi başka sorunun çözümünü silmez. Beyaz Tahta'nın orijinal nesne seçimi, nokta düzenleme, döndürme, şekil tanıma ve ink işlevleri kullanılır.

## Yeni checklist hazırlama

1. Checklist ve kitap fotoğraflarını analiz ederek sayfa–soru eşleştirmelerini doğrula.
2. Almanca metinleri kontrol et, Türkçelerini yaz; şekillerin ilgili kısımlarını kırp.
3. `sets/<benzersiz-id>/data.js` oluştur.
4. Yeni paket seçim ekranına eklenir veya ilgili öğrenci için ayrı giriş sayfası hazırlanır.
5. Ortak Beyaz Tahta motorunu ikinci kez yazma. Gerekirse `whiteboard.html` kopyasını kaynak sürümle güncelle.

**Bilinen eksik:** Bu GitHub sürümünde sohbet içinde hazırlanan bazı orijinal kırpılmış kitap görselleri henüz bulunmuyor. Görsel gerektiren sorular için ilgili `figureImage` veya `sourceImage` alanları ayrıca eklenmelidir.

**Kontrol:** GitHub dosyaları ve JavaScript sözdizimi doğrulandı; canlı GitHub Pages tarayıcı testi henüz yapılamadı.
