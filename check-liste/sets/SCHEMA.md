# Checklist veri paketi

Her `sets/<paket-kimligi>/data.js` dosyası:

```js
window.CHECKLIST_PACK = {
  id: "ornek-2027",
  title: "Örnek · 2027",
  questions: [
    {
      id: "32-9", page: 32, number: 9,
      german: "Berechne...",
      turkish: "Hesapla...",
      star: false, plus: false,
      sourceImage: "assets/32-9.webp", // isteğe bağlı
      figureImage: "assets/32-9-figure.webp" // isteğe bağlı
    }
  ]
};
```

**Önemli:** Her soru id'si bir liste içinde benzersiz ve kalıcı olmalıdır. Paket kimliğini değiştirmek eski tamamlanma/çizim kayıtlarından ayrı yeni bir liste oluşturur.
