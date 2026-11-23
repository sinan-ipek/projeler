# Lambacher Schweizer 7 — Check Liste

**Sürüm v1.20.0** · Klett · Nordrhein-Westfalen · 23 Kasım 2026

## Güncel durum

- **Fotoğraf toplama tamamlandı:** İçindekiler s.2–3 ve basılı s.4–295 (**292 ardışık sayfa**) mevcut. Son basılı sayfa 295; numarasız matematiksel terim tablosu ve arka kapak da görüldü.
- **Takip kartı:** 2900 önceki + **180 yeni** = **3080**. Bunların 80'i yeni sayfa-görsel kartı, 94'ü üst düzey numaralı soru/etkinlik kartı ve 6'sı konu kartıdır. Bu sayı 3080 ayrı matematik sorusu demek değildir.
- **Özel görsel:** 620 önceki + **80 yeni** = **700**. Arşiv: `Lambacher_Schweizer_7_tum_gorseller_s4-295.zip`.
- **Teknik kapsama:** 4–295 sayfaları aralıksız kaydedildi; kart kimliği tekrarı yok. ZIP'te 700 özel JPG/PNG bulunur.
- **Telif:** Kitabın fotoğraf/kırpımları herkese açık GitHub'a yüklenmez; tarayıcıya özel ZIP arşivinden içe aktarılır.
- **Sonraki sayfa grubu yoktur.**

## Son aralık: 216–295

| Sayfa | Bölüm |
|---|---|
| 216–217 | Der richtige Blick auf das Baumdiagramm: Aufgaben 1–12 |
| 218–221 | Wiederholen–Vertiefen–Vernetzen: Aufgaben 1–17 |
| 222 | Rückblick: Wahrscheinlichkeiten |
| 223 | Test: Runde 1 und Runde 2 |
| 224 | Exkursion: Glücksrad in der schiefen Ebene |
| 225 | Exkursion: Das Gesetz der großen Zahlen |
| 226–227 | Exkursion: Schokoladentest |
| 228–229 | Exkursion EXTRA: Nachgehakt und neu durchdacht |
| 230–237 | Grundwissen: Brüche, Dezimalzahlen, Terme, Geometrie, Daten |
| 238–292 | Lösungen: Çözümler |
| 293–294 | Register: Kavram dizini |
| 295 | Text- und Bildquellenverzeichnis |

## Kalite sınırı

Bu kayıt bir **fotoğraf ve öğrenme takibi envanteridir**. Bazı küçük matematiksel ifadeler, harfli alt maddeler ve sayısal değerler kitapla karakter karakter doğrulanmadı. Özellikle 238–292 çözüm sayfaları, tek tek çözümler yerine sayfa indeksleriyle kaydedildi. Yeni 80 görsel, dar birer şekil kırpımı değil, sayfa odaklı özel kesitlerdir. Çalışılan soru için basılı kitap kaynak kabul edilir.

[Denetim geçmişi](QA.md) · [Uygulama](../../lesson.html?set=lambacher-7)

## Menü filtresi (v1.17.1)

Kullanıcının isteğine göre **yalnızca soru, alıştırma, etkinlik veya çözümlü örnek içeren 207 sayfa** Check Liste açılır sayfa menüsünde bulunur. **85 sayfa** (sadece açıklama/başlık, konu özeti, çözümler, dizin veya kaynakça) gizlenmiştir. Menüde **2955 görünür kart** bulunur. 228–229 sayfalarındaki tartışma etkinlikleri korunur. Bu bir görünürlük filtresidir; bütün 3080 veri kartı, 700 görsel, fotoğraf envanteri ve tarayıcıdaki kayıtlar yerinde kalır. Filtre PDF paylaşımında da geçerlidir.

## Yerel kitap yükleme — v1.18.0

Menüdeki ders adı **7. sınıf**. Kart tıklanınca `Çalışmayı aç` / `Yükle` seçilebilir. `Yükle` bilgisayardan tek bir PDF seçtirir ve bunu yalnızca aynı tarayıcıda `check-liste-local-books-v1` IndexedDB deposuna kaydeder. Ardından ana menüde `Kitabı görüntüle` ve ders ekranında `Kitabımı aç` kullanılabilir. Hiçbir PDF GitHub'a veya bir sunucuya aktarılmaz. Kitap verisi, önbelleğin/tarayıcı depolamasının silinmesiyle kaybolabilir. Görsellerin özgün sorularla otomatik eşlemesi ve PDF'den soru çıkarımı henüz yapılmamıştır.


## ZIP paketi — v1.19.0

**Dosya adı:** `7_sinif_Check_Liste_Paketi_v1.19.0.zip`. **Boyut:** yaklaşık 28 MB. Paket `manifest.json`, `README.txt`, yalnızca çevrimiçi ders sayfasına yönlendiren bir `index.html` ve `images/` dizininde 700 özel görsel içerir. Paketin içinde telifli özgün soru metinleri veya tek başına tam çalışabilen çevrimdışı Check Liste motoru bulunmaz.

**Kullanım:** Online Check Liste → **7. sınıf → Yükle** → ZIP'i seç. Uygulama ZIP'i istemci tarafında okur ve görselleri tarayıcı IndexedDB'sine alıp **çalışmayı otomatik açar**. Özel arşivin dosyaları GitHub'a yüklenmez. Dosyalar başka bir bilgisayara kendiliğinden aktarılmaz ve tarayıcı verileri temizlenirse kaybolabilir.

**Denetim:** ZIP 703 giriş içerir: 700 görsel + 3 yardımcı dosya. ZIP biçimi STORE (sıkıştırılmamış); görüntüler zaten JPG/PNG olarak sıkıştırılmıştır. Görsel adları, public repo data.js dosyasındaki 700 farklı `privateImageFile` referansıyla birebir eşleşir (FNV1a isim hash: 1079539722); ZIP CRC testi başarılı. Node ile ZIP okuma ve 700 IndexedDB dosya kaydı simülasyonu başarılı.

## Tam yerel çalışma ZIP'i — v1.20.0

Çalışma açılırken artık her defasında GitHub'daki ders verisi yüklenmez. İçeriğin görünmesi için `7. sınıf → Yükle` ile ZIP seçmek gerekir. Tam paket `study.json` (3080 kart), `images/` (700 dosya), `manifest-v2.json` ve tanıtım dosyalarından oluşur. Yüklenen içerik ve görseller sadece tarayıcı IndexedDB'sine yazılır ve çalışma başlar.

**v1.19 → v1.20 geçişi:** Eski sadece-görseller ZIP'ini seçince, uygulama bugün mevcut olan GitHub `data.js` dosyasını yalnızca bir kez alır, çalışma kartlarını görsellerle birleştirerek yeni tam ZIP'in bilgisayara indirilmesini başlatır. İndirilen tam ZIP sonraki yüklemelerde hiçbir ders verisi indirmeden çalışır. Tam ZIP bu aşamadan önce ChatGPT içinde oluşturulmuş değildir; dosya kullanıcının tarayıcısında üretilir. Arayüz/çizim motoru GitHub Pages üzerinden sunulur. Mevcut GitHub `data.js` dosyası ve Git geçmişi henüz kaldırılmamıştır.
