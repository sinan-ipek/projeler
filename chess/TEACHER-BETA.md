# Satranç Öğretmeni — beta

Bu geliştirme dalı, mevcut chess/index.html oyununu değiştirmeden Stockfish analiz modülünü eklemek içindir.

## Eksik motor dosyaları

Resmî Stockfish.js 19 Lite Single-threaded dağıtımından aşağıdaki iki dosyayı chess/stockfish/ klasörüne koyun:

- stockfish-19-lite-single.js
- stockfish-19-lite-single.wasm

Kaynak: https://github.com/nmrugg/stockfish.js ve https://www.npmjs.com/package/stockfish

Stockfish GPL-3.0 ile lisanslıdır. Dağıtımda lisans metni ve ilgili kaynak kod bağlantıları korunmalıdır.

## Beta sınırları

- Canlı analiz ve oyun sonu analiz arayüzü bulunmaktadır.
- A1/A2/B1 açıklamaları henüz gerçek taktik nedenleri doğrulamıyor; öğretici taslak metinlerdir.
- Her hamlenin doğruluğu için hamle öncesi en iyi skor ile oynanan hamle sonrası skorun karşılaştırılması henüz tamamlanmadı.
- UCI motor çıktısının güvenilir şekilde sıraya bağlanması ve tarayıcı testleri tamamlanmalıdır.
- Bu sürüm ana dala birleştirilmemelidir.
