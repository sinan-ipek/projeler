# Check Liste — Ortak ders sistemi

**Sürüm v1.3.1** · HTML arayüzü, çizim motoru ve PDF çıktısı artık ortak kaynaklardan çalışır.

## Tek merkezli mimari

```
Öğren ana sayfası
└── Check Liste (check-liste/index.html)
    ├── Çetin 1 → lesson.html?set=cetin-1
    │   └── sets/matematik-5-2026/data.js (41 soru)
    ├── Aras 1  → lesson.html?set=aras-1
    │   └── ../aras/data.js (34 soru, saat görselleri)
    └── Tuana 1 → ../mathe-gk/index.html (ayrı slayt sunumu)
```

Çetin 1 ve Aras 1 için **yalnızca bir** arayüz, bir çizim motoru ve bir PDF oluşturucu kullanılır:

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
