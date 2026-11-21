# Check Liste · Ders Seçimi

**v1.2.0** — Öğrenciye ve derse göre üç çalışmayı açan giriş ekranı.

## Bağlantılar

| Seçim | Bağlantı | İçerik |
|---|---|---|
| **Çetin 1** | `check-liste/cetin-1.html` | Önceki Check Liste: 41 Almanca–Türkçe matematik sorusu, çizim alanı, tamamlanma ve PDF |
| **Aras 1** | `aras/index.html` | 34 zaman hesaplama sorusu, saat/zaman çizelgesi, çizim alanı ve PDF |
| **Tuana 1** | `mathe-gk/index.html` | Mathe GK Analysis: trigonometri, türev, integral ve grafik sunumu (Check Liste çizim motoruyla karıştırılmamalı) |

Ana `Öğren` ekranında tek **Check Liste** bağlantısı bulunur. Giriş sayfası `check-liste/index.html` üç ayrı öğrenci kartı gösterir. Eski Check Liste çalışması `cetin-1.html` olarak **aynı klasöre** taşındı/kopyalandı; mevcut `matematik-5-2026` kayıt kimliği değişmedi. Önceden kaydedilmiş soru çizimleri tarayıcıda aynı anahtarlarla durur.

## Ortak çizim motoru

`check-liste/app.js` ortak bir çizim motorudur. Çetin 1 ve Aras 1 aynı kodu kullanır. Kalemle tek tıklama **nokta** oluşturur; sürükleme normal çizimdir. Nesne seçimi, çoklu seçim, sağ tuşla şekil tanıma ve ölçekleme korunur.

Tuana 1 mevcut matematik sunumudur; bu sürümde farklı bir Check Liste çözüm alanı eklenmemiştir.

## Dosyalar

- `check-liste/index.html`: Ders seçme sayfası (Home, Dil, Help; v1.2.0)
- `check-liste/cetin-1.html`: 41 soruluk asıl Check Liste uygulaması (v1.2.0)
- `check-liste/app.js`: Çetin 1 ve Aras 1 için ortak çizim motoru
- `check-liste/pdf-export.js`: Çetin 1 PDF çıktısı
- `check-liste/sets/matematik-5-2026/data.js`: Çetin 1 soru verileri
