# Check liste — çoklu soru çalışma platformu

Bu klasör, yeni öğrenciler ve yeni kitap/checklist'ler eklendikçe aynı arayüz ve aynı beyaz tahta motorunu yeniden kullanmak için hazırlanmıştır.

## Hedef yapı

```text
check-liste/
  index.html                      # Ortak uygulama
  style.css                       # Arayüz
  engine.js                       # Soru gezinme + beyaz tahta
  catalog.js                      # Paketler listesi
  sets/
    cetin-2026/
      data.js                     # 41 sorunun metin ve görselleri
    yeni-ogrenci-2027/
      data.js
```

Her pakette `id`, `title`, `questions` bulunur. Her soruda `id`, `page`, `number`, `german`, `turkish`, isteğe bağlı `star`, `plus`, `sourceImage`, `figureImage` alanları vardır.

## Yeni liste ekleme

1. `sets/<benzersiz-kod>/data.js` oluştur.
2. `catalog.js` dosyasına paket kimliğini ve veri yolunu ekle.
3. Uygulama URL'sini `?set=<benzersiz-kod>` olarak kullan. Aynı listeye ayrı öğrencilerin girmesi için `?profile=<ogrenci-kodu>` kullanılabilir.

`localStorage` anahtarları `checklist-id + profile-id + question-id` ile ayrılır; başka soru listesi mevcut tamamlanma veya çözüm çizimlerini silmez.

**Yükleme durumu:** Bu repo klasöründe mimari taslak bulunmaktadır. Tam çalışır çoklu-checklist paketi (kesilmiş kitap görselleri dahil), sohbetten verilen `check-liste-multi.zip` arşivindedir. Arşivdeki dosyalar bu klasöre yüklenmeden `index.html` GitHub Pages üzerinde çalışır kabul edilmemelidir.

## Uzun vadeli iyileştirmeler

- Büyük base64 görselleri ilgili paket içinde `assets/` dosyalarına ayırmak
- Tamamlandı ve çizimleri JSON dışa/içe aktarmak
- Farklı cihazlar arasında senkronizasyon için oturum açılan veri saklama hizmeti eklemek
- Beyaz Tahta motorunu tek bağımsız kütüphane olarak paylaşmak
