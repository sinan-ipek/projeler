# Check Liste · Matematik

**Sürüm: v1.1.0** — 41 Almanca–Türkçe 5. sınıf matematik sorusu.

## Ortak Check Liste şablonu

`check-liste/app.js` **genel çizim ve ilerleme motorudur**. Hem `check-liste/index.html` hem de `aras/index.html` bu **tek dosyayı** yükler. Her sayfa kendi `window.CHECKLIST_PACK` verisini sağlayarak soruları, liste kimliğini ve kayıtları ayrı tutar.

- `index.html`: Check Liste arayüzü, Home / Dil / Help, Paylaş ve sürüm notu
- `app.js`: **ortak** kalem, nokta, seçim, silgi, çoklu seçim, şekil tanıma, geometri dönüşümleri, ilerleme ve soru geçişleri
- `sets/matematik-5-2026/data.js`: 41 Almanca–Türkçe soru
- `pdf-export.js`: tüm soruları ve çözüm çizimlerini PDF olarak kaydetme

## v1.1.0: Tek tıkla nokta

Kalem modunda tek tıklandığında `{kind:'dot',pts:[{x,y}]}` biçiminde **bağımsız nokta nesnesi** oluşturulur. Tıklayıp sürüklemek normal yazı/çizimdir. Noktalar seçilebilir, silinebilir, soru bazında saklanır ve PDF'de de çizilir. Bu davranış **Aras** uygulamasına da otomatik uygulanır; onun ayrı çizim motoru yoktur.

Seçim modunda boş alandan sürükle = çoklu seçim; köşe ölçekleme Shift basılıyken oranlı, basılı değilken bağımsızdır. Kalem modunda çizime müdahale eden otomatik seçim yoktur. Normal ve sağ tuşla zorunlu şekil tanıma korunur.

Tarayıcı kayıtları liste kimliği, profil ve soru kimliği altında ayrılır. Önceki çalışmalar silinmez. Fotoğraflardan kırpılmış bazı kitap görselleri GitHub'daki 41 soruluk pakette bulunmayabilir.
