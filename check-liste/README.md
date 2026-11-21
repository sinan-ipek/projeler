# Check Liste — Matematik

Bu klasör 5. sınıf seviyesinde Almanca–Türkçe **41 soruluk** çalışma listesini barındırır.

- `index.html`: Soru/çeviri ekranı, çizim alanı, PDF indirme düğmesi
- `app.js`: Soru gezintisi, tamamlandı bilgisi, kalem, seçim, çoklu seçim, silgi ve akıllı şekil tanıma
- `pdf-export.js`: Bütün sorular ve çözüm çizimleriyle PDF üretme ve indirme
- `sets/matematik-5-2026/data.js`: Almanca ve Türkçe 41 soru

Çizimler ve tamamlanma durumu liste kimliği, profil ve soru kimliği altında cihazın tarayıcısında saklanır. Liste kimliği değiştirilirken tek bir uygun eski kayıt bulunursa veriler yeni anahtarlara kopyalanır.

Daire tanıma kapalı ve yaklaşık tam dönüşlü çizimlerde sıkı çembersellik denetimine tabidir. **Yay**, üç noktadan bulunan çemberin bir parçasıdır; Bézier değildir. Tanıma yalnızca çizdikten sonra 0,65 saniye kalemi/fareyi basılı bekleyince çalışır.

**Not:** Daha önce hazırlanmış kırpılmış kitap görselleri GitHub sürümüne henüz eklenmediği için bunlar uygulamanın PDF çıktısında da bulunmaz.
