# Aras · Zaman Hesaplama (Almanca / Türkçe)

**Sürüm: v1.1.0** — Sayfa 35, 6 ana alıştırma, 34 bağımsız soru.

## Ortak şablon

Aras artık bağımsız bir çizim motoru kopyası taşımaz. İki uygulama **aynı güncel** `../check-liste/app.js` dosyasını kullanır. Böylece nokta, kalem, seçim ve geometri davranışları bir kez değiştirilir ve iki uygulamada birden güncellenir.

- `aras/index.html`: Aras sayfası, araç çubuğu, Home / Dil / Help ve **v1.1.0** sürüm notu
- `aras/data.js`: 34 Almanca–Türkçe soru ve yeniden çizilmiş 4 analog saat / 2 zaman çizelgesi görseli
- `../check-liste/app.js`: **ortak** çizim motoru, kontrol listesi ve her soruya özel kayıt
- `aras/pdf-export.js`: bütün sorular ve çözüm alanlarını PDF olarak kaydetme

## Güncelleme: v1.1.0

- Kalem ile **tek tıklama = nokta**, fareyle sürükleme = normal çizim
- Nokta bir nesne olarak saklanır, seçilir, silinir ve PDF'ye eklenir
- İki uygulama artık tek çizim motoru kullanır, eski `aras/app.js` kopyası kaldırılmıştır
- Her sorunun çizimleri ve ilerlemesi tarayıcıda, `aras-zaman-2026` liste kimliği altında ayrı saklanır

## Fotoğraftaki sorular

1. 14 birim dönüştürme maddesi
2. 6 saat/dakika/saniye toplama-çıkarma maddesi
3. İki zaman çizelgesi (her biri üç boşluk)
4. Dört analog saat sorusu
5. Dört `Teste dich!` maddesi
6. Dört saat hesaplama maddesi

Saat ve zaman çizelgesi görselleri fotoğrafı temel alan **yeniden çizimlerdir**. Bire bir kırpılmış kitap görüntüsü değildir. Otomatik cevap verilmez.

Çözümler `localStorage` içinde yalnızca kullanılan tarayıcıda saklanır. Aynı cihazdan **Paylaş** ile PDF indirilebilir.
