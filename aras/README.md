# Aras · Zaman Hesaplama (Almanca / Türkçe)

**Sürüm: v1.0.0** — Ders kitabı sayfa 35'teki 6 ana alıştırmanın **34 alt maddesi** için bağımsız Check Liste.

## Kapsam
- Görev 1: 14 alt madde (s, min, h, d dönüşümleri)
- Görev 2: 6 alt madde (karma birimli toplama/çıkarma)
- Görev 3: 2 zaman çizelgesi; her biri üç boşluk içerir
- Görev 4: 4 analog saat sorusu (fotoğraftan yeniden oluşturulmuş vektör saatler)
- Görev 5: 4 alt madde (Teste dich! zaman birimi dönüşümleri)
- Görev 6: 4 alt madde (13:15'ten sonraki saat)

Görseller fotoğraftaki saat kollarının yaklaşık konumlarından vektör olarak yeniden çizilmiştir; orijinal fotoğrafın bire bir kırpılmış kopyası değildir. Almanca soruların yanında Türkçe çevirileri bulunur; çözümler bilerek hazır verilmemiştir.

## Dosyalar
- `index.html`: Uygulama ekranı, sorular, Home/Dil/Help, v1.0.0 alt bilgi, PDF Paylaş
- `data.js`: 34 soru, tercümeleri ve saat/zaman çizelgesi SVG'leri
- `app.js`: Kalem, Seçim, Silgi, çoklu seçim, geometri tanıma, Shift oranlı ölçekleme, sağ tuşla zorunlu tanıma ve tamamlanma takibi
- `pdf-export.js`: tüm soruları, ilgili görselleri ve tarayıcıdaki çözüm çizimlerini PDF olarak indirme

## Veri saklama
Her öğrenci/çalışma listesi ayrı tutulur: `dotem-checkliste-v2:aras-zaman-2026:<profil>:board:<soru>`. Veriler kullanılan tarayıcıda localStorage içinde saklanır. PDF oluşturmak için çözümlerin yazıldığı aynı tarayıcıyı kullanın.

İlerleme sol panelden izlenir. Sorular cevap ya da otomatik çözüm göstermez; öğrenci beyaz tahtada çözer.
