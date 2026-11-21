# Aras 1 — Ortak Check Liste

**v1.3.1** · 34 Almanca–Türkçe zaman alıştırması (sayfa 35).

Artık Aras'ın ayrı bir HTML arayüzü, çizim motoru veya PDF motoru yoktur. v1.3.1 ile ortak çizim motorunda mürekkep hafif yumuşatılır, 2× çözünürlük kullanılır ve PDF aynı eğriyi üretir.

- **Ders:** `../check-liste/lesson.html?set=aras-1`
- **Soru verisi:** `data.js` (34 madde, 4 analog saat, 2 zaman çizelgesi)
- **Tek ortak arayüz:** `../check-liste/lesson.html`
- **Tek ortak çizim motoru:** `../check-liste/app.js`
- **Tek ortak PDF motoru:** `../check-liste/pdf-export.js`
- **Ders yükleyicisi:** `../check-liste/lesson-loader.js`

`aras/index.html` eski adresler için yönlendirme sayfası olarak korunmuştur; eski profil ve soru bağlantılarını yeni sayfaya aktarır. `aras/pdf-export.js` ise önbellekten eski HTML yüklenmesi olasılığına karşı ortak PDF dosyasını yükleyen küçük bir uyumluluk dosyasıdır.

**Öğrenci kayıtları korunur:** soru kimlikleri ve `aras-zaman-2026` paket kimliği değişmemiştir. Çizimler ve tamamlanma bilgileri her soru için tarayıcıda saklanır.

Çalışma: 14 birim dönüşümü, 6 zaman işlemi, 2 zaman çizelgesi, 4 saat okuma, 4 tekrar ve 4 geçen süre sorusu. Saat resimleri ders kitabından bire bir kesilmiş değil; fotoğrafa göre yeniden çizilmiş vektör görsellerdir.
