(() => {
  'use strict';

  const SUPABASE_URL = 'https://wtgvrjacvmduodnaskjg.supabase.co';
  const SUPABASE_KEY = 'sb_publishable_bEsvEKhBm0aJVAYvQBgeaA_tN4cnSxj';

  const APP_NAMES = {
    '3b-ay':'3B Ay',
    'Whiteboard':'Beyaz Tahta (eski sürüm)',
    'alan':'Alan',
    'ay-gokyuzu':'Ay Gökyüzü',
    'beyaz-tahta':'Beyaz Tahta',
    'chess':'Satranç',
    'common_paranthesis':'Ortak Parantez',
    'completing_the_square':'Tam Kareye Tamamlama',
    'disliler':'Dişliler',
    'donum-noktasi':'Dönüm Noktası',
    'egim':'Eğim',
    'geogebra':'GeoGebra',
    'german_articels':'Artikeller',
    'isaretli-carpma':'İşaretli Çarpma',
    'isaretli-toplama':'İşaretli Toplama',
    'kesir-ondalik-sayi-dogrusu':'Kesir ve Ondalık Sayı Doğrusu',
    'multiply_by_10':'10 ile Çarpma',
    'neg_powers_of_2':"2'nin Negatif Kuvvetleri",
    'oranti':'Orantı',
    'ozel-ucgenler':'Özel Üçgenler',
    'pulfrish_effect':'Pulfrich Etkisi',
    'rotating_a_cube':'Küp Döndürme',
    'rounding':'Yuvarlama',
    'rubik-kup':'Rubik Küp',
    'simplification':'Rasyonel İfadeler',
    'simplification_of_rational_expressions':'Rasyonel İfadeler',
    'translating_units':'Birim Dönüştürme',
    'trigonometry':'Trigonometri',
    'turev':'Türev',
    'unit_circle':'Birim Çember',
    'zihinden-3e-bolme':"Zihinden 3'e Bölme"
  };

  const BI = {
    "Öğren":"Lernen",
    "Kullanım":"Bedienung",
    "Kapat":"Schließen",
    "Doku":"Textur",
    "Model":"Modell",
    "AUTO":"Automatisch",
    "Daireleri sil":"Kreise löschen",
    "NASA LRO 8K + LDEM yükleniyor…":"NASA LRO 8K + LDEM wird geladen…",
    "Krater çemberi oluşturmak istediğiniz bölgeye çift tıklayın. Çemberi taşıyabilir ve çemberin çevresinden tutarak yarıçapını değiştirebilirsiniz. Kraterleri saymak göründüğünden çok daha zor ve eğlenceli bir uğraştır. Kolay gelsin!":"Doppelklicken Sie auf den Bereich, in dem Sie einen Kraterkreis erstellen möchten. Sie können den Kreis verschieben und seinen Radius am Rand verändern. Krater zu zählen ist schwieriger und spannender, als es aussieht. Viel Erfolg!",
    "Beyaz Tahta":"Whiteboard",
    "Tek dosya • Pan/Zoom • Undo/Redo • Export":"Eine Datei • Verschieben/Zoom • Rückgängig/Wiederholen • Export",
    "Kalem":"Stift",
    "Silgi":"Radierer",
    "Çizgi":"Linie",
    "Dikdörtgen":"Rechteck",
    "Elips":"Ellipse",
    "Seç":"Auswählen",
    "Not":"Notiz",
    "El":"Hand",
    "Renk":"Farbe",
    "Kalınlık":"Dicke",
    "Geri Al":"Rückgängig",
    "İleri":"Wiederholen",
    "PNG Dışa Aktar":"PNG exportieren",
    "Resim":"Bild",
    "Kaydet":"Speichern",
    "Yükle":"Laden",
    "Temizle":"Leeren",
    "Yakınlaştırma":"Zoom",
    "Basılı tut: El (pan)":"Gedrückt halten: Hand (verschieben)",
    "Sil (seçili)":"Auswahl löschen",
    "Dışa aktar / içe aktar.":"Exportieren / importieren.",
    "Uygula":"Anwenden",
    "Alan":"Fläche",
    "Bir şeklin alanı, şeklin içine sığan birim karelerin toplamıdır.":"Die Fläche einer Form ist die Summe der Einheitsquadrate, die in die Form passen.",
    "Büyük kare = 1":"Großes Quadrat = 1",
    "Orta kare = 1/4":"Mittleres Quadrat = 1/4",
    "Küçük kare = 1/16":"Kleines Quadrat = 1/16",
    "Alanı bulmak için karelerin değerlerini toplarız.":"Um die Fläche zu bestimmen, addieren wir die Werte der Quadrate.",
    "Kare":"Quadrat",
    "Paralelkenar":"Parallelogramm",
    "Eşkenar dörtgen":"Raute",
    "Yamuk":"Trapez",
    "Dik Üçgen":"Rechtwinkliges Dreieck",
    "Üçgen":"Dreieck",
    "Daire":"Kreis",
    "Beşgen":"Fünfeck",
    "Altıgen":"Sechseck",
    "Çokgen":"Vieleck",
    "Serbest":"Freihand",
    "Say":"Zählen",
    "Sıfırla":"Zurücksetzen",
    "Çalışma alanına tıklayın.":"Klicken Sie auf die Arbeitsfläche.",
    "Ay Gökyüzü Simülasyonu":"Mondhimmel-Simulation",
    "Yıl":"Jahr",
    "Ay":"Monat",
    "Eylül":"September",
    "Gün":"Tag",
    "Almanya":"Deutschland",
    "Türkiye":"Türkei",
    "Seçilen konumdan gökyüzü":"Himmel vom gewählten Standort",
    "Gözlem Konumu":"Beobachtungsort",
    "Kırmızı noktayı sürükle · Küreyi çevir · Tekerlek: zoom":"Roten Punkt ziehen · Kugel drehen · Mausrad: Zoom",
    "Enlem:":"Breitengrad:",
    "Boylam:":"Längengrad:",
    "Ay · Dünya · Tarih":"Mond · Erde · Datum",
    "Gökyüzü konumu yaklaşık":"Himmelsposition ungefähr",
    "yerel güneş saati 22:00 için hesaplanır.":"wird für 22:00 Uhr lokale Sonnenzeit berechnet.",
    "Aç":"Öffnen",
    "Paylaş":"Teilen",
    "Parabol":"Parabel",
    "Hazır":"Bereit",
    "Hazır.":"Bereit.",
    "En öne getir":"Ganz nach vorne",
    "En arkaya gönder":"Ganz nach hinten",
    "Kilitle":"Sperren",
    "Yatayda yansıt":"Horizontal spiegeln",
    "Dikeyde yansıt":"Vertikal spiegeln",
    "Grupla":"Gruppieren",
    "Sil":"Löschen",
    "Ortak tahtaya geri yükle":"Gemeinsames Whiteboard wiederherstellen",
    "Bu dosya mevcut ortak tahtanın yerini alacak ve değişiklik tüm bağlı cihazlara yansıyacak. Mevcut çalışma ayrıca kaydedilmediyse geri alınamayabilir.":"Diese Datei ersetzt das aktuelle gemeinsame Whiteboard. Die Änderung wird auf allen verbundenen Geräten sichtbar. Wenn die aktuelle Arbeit nicht separat gespeichert wurde, kann sie möglicherweise nicht wiederhergestellt werden.",
    "İptal":"Abbrechen",
    "Ortak tahtaya yükle":"Auf gemeinsames Whiteboard laden",
    "Sinan İpek'e mesaj":"Nachricht an Sinan İpek",
    "Görüşünüzü, önerinizi veya fark ettiğiniz bir sorunu yazabilirsiniz.":"Sie können Ihre Meinung, einen Vorschlag oder ein Problem schreiben.",
    "Gönder":"Senden",
    "Satranç":"Schach",
    "Satranç Tahtası (Offline) – Koç":"Schachbrett (offline) – Trainer",
    "Tahtayı Döndür":"Brett drehen",
    "Yeni Oyun":"Neues Spiel",
    "Motoru Durdur":"Engine stoppen",
    "Beyaz Kontrol":"Weiß prüfen",
    "Siyah Kontrol":"Schwarz prüfen",
    "Beyazın Aldıkları:":"Von Weiß geschlagen:",
    "Siyahın Aldıkları:":"Von Schwarz geschlagen:",
    "Koç: Kapalı":"Trainer: Aus",
    "Koç Analizi":"Traineranalyse",
    "Oyunu Kaydet":"Spiel speichern",
    "Koç Süresi (ms/hamle):":"Trainerzeit (ms/Zug):",
    "Koçu açınca, her":"Wenn der Trainer aktiv ist, wird nach jedem",
    "senin hamlenden sonra":"deiner Züge",
    "değerlendirme yapılır ve hatalar raporlanır.":"die Stellung bewertet und Fehler werden gemeldet.",
    "Ayarlar, Kayıtlar, Raporlar":"Einstellungen, Speicherstände, Berichte",
    "Motor":"Engine",
    "Tarafın:":"Deine Seite:",
    "Beyaz":"Weiß",
    "Siyah":"Schwarz",
    "Motor Gücü:":"Engine-Stärke:",
    "Motor Düşünme Süresi (ms/hamle):":"Engine-Bedenkzeit (ms/Zug):",
    "Ayarları Uygula":"Einstellungen anwenden",
    "Motor Hamlesi":"Engine-Zug",
    "Ses: Aç":"Ton: An",
    "Koç analizi ayrı bir süre ayarıyla çalışır (ms/hamle).":"Die Traineranalyse verwendet eine eigene Zeiteinstellung (ms/Zug).",
    "Hamleler":"Züge",
    "PGN Kopyala":"PGN kopieren",
    "PGN İndir":"PGN herunterladen",
    "FEN Getir":"FEN holen",
    "FEN Yükle":"FEN laden",
    "PGN Getir":"PGN holen",
    "PGN Yükle":"PGN laden",
    "FEN/PGN yüklemek oyunu değiştirir. Koç raporu sıfırlanır.":"Das Laden von FEN/PGN verändert das Spiel. Der Trainerbericht wird zurückgesetzt.",
    "Kayıtlı Oyunlar":"Gespeicherte Spiele",
    "Listeyi Yenile":"Liste aktualisieren",
    "Tüm Kayıtları Dışa Aktar":"Alle Speicherstände exportieren",
    "Kayıt İçe Al":"Speicherstand importieren",
    "Tüm Kayıtları Sil":"Alle Speicherstände löschen",
    "Henüz kayıt yok.":"Noch keine Speicherstände.",
    "Kayıtlar sadece bu tarayıcı/cihazda saklanır (IndexedDB).":"Speicherstände werden nur in diesem Browser/Gerät gespeichert (IndexedDB).",
    "Koç mantığı: “senin hamlenden önceki pozisyonda en iyi hamle” ile “senin hamlen” arasındaki değerlendirme farkına bakar.":"Der Trainer vergleicht die Bewertung des besten Zuges vor deinem Zug mit deinem tatsächlich gespielten Zug.",
    "Terfi Seç":"Umwandlung wählen",
    "Piyon son sıraya ulaştı. Hangi taşa terfi edilsin?":"Der Bauer hat die letzte Reihe erreicht. In welche Figur soll er umgewandelt werden?",
    "Vezir":"Dame",
    "Kale":"Turm",
    "Fil":"Läufer",
    "At":"Springer",
    "İpucu: Genelde vezir seçilir.":"Tipp: Meistens wird die Dame gewählt.",
    "Ortak Paranteze Alma":"Ausklammern",
    "Ortak Parantez":"Ausklammern",
    "Basit":"Einfach",
    "Gelişmiş":"Fortgeschritten",
    "Yeni Örnek":"Neues Beispiel",
    "Toparla":"Zusammenfassen",
    "İşlem tamamlandı.":"Vorgang abgeschlossen.",
    "Tam Kareye Tamamlama":"Quadratische Ergänzung",
    "Formül":"Formel",
    "Dişliler":"Zahnräder",
    "Dişlilerde diş sayısı ile dönme açısı":"Zahnzahl und Drehwinkel bei Zahnrädern",
    "1. dişlinin diş sayısı":"Zahnzahl des 1. Zahnrads",
    "2. dişlinin diş sayısı":"Zahnzahl des 2. Zahnrads",
    "Otomatik dönme hızı":"Automatische Drehgeschwindigkeit",
    "yavaş":"langsam",
    "hızlı":"schnell",
    "1. beyaz çizginin başlangıcı":"Start der 1. weißen Linie",
    "2. beyaz çizginin başlangıcı":"Start der 2. weißen Linie",
    "Başlangıç çizgilerini sıfırla":"Startlinien zurücksetzen",
    "Yönü değiştir":"Richtung ändern",
    "20° evolvent diş profili":"20°-Evolventen-Zahnprofil",
    "Beyaz çizgi: bağımsız başlangıç konumu":"Weiße Linie: unabhängige Startposition",
    "Tur sayısı":"Umdrehungszahl",
    "12 diş":"12 Zähne",
    "24 diş":"24 Zähne",
    "1. dişlinin açısı":"Winkel des 1. Zahnrads",
    "2. dişlinin açısı":"Winkel des 2. Zahnrads",
    "|θ₁| / |θ₂| oranı":"Verhältnis |θ₁| / |θ₂|",
    "Temastan geçen diş sayısı":"Anzahl der Kontaktzähne",
    "Ters orantı bağıntısı":"Umgekehrt proportionale Beziehung",
    "Dönüm Noktası":"Wendepunkt",
    "Özel fonksiyon":"Eigene Funktion",
    "Çiz":"Zeichnen",
    "y ölçeği":"y-Skalierung",
    "Ters yön":"Umgekehrte Richtung",
    "Bulunduğu yerde":"An derselben Stelle",
    "Sol kıvrım":"Linkskrümmung",
    "Küçük ok, tanjanta dik durur ve kıvrım yönünü gösterir.":"Der kleine Pfeil steht senkrecht zur Tangente und zeigt die Krümmungsrichtung.",
    "Noktayı eğri üzerinde istediğin gibi sürükleyebilirsin.":"Du kannst den Punkt frei auf der Kurve ziehen.",
    "Dörtgen Projektör":"Viereck-Projektor",
    "Araç":"Werkzeug",
    "Serbest Çiz":"Freihand zeichnen",
    "Doğru":"Gerade",
    "Çember":"Kreis",
    "Çizim Ayarları":"Zeicheneinstellungen",
    "Çizgi kalınlığı":"Linienstärke",
    "Silgi yarıçapı":"Radiererradius",
    "Grid":"Raster",
    "Grid aralığı":"Rasterabstand",
    "Dikdörtgene":"Zum Rechteck",
    "Resim yükle":"Bild laden",
    "Resim ölçeği":"Bildskalierung",
    "Resmi ortala":"Bild zentrieren",
    "Resmi kaldır":"Bild entfernen",
    "İşlemler":"Aktionen",
    "Son nesneyi geri al":"Letztes Objekt rückgängig",
    "Tümünü sil":"Alles löschen",
    "İpucu":"Tipp",
    "Kaynak dörtgen":"Ausgangsviereck",
    "Projeksiyon dörtgeni":"Projektionsviereck",
    "Eğim":"Steigung",
    "Eğim açısı":"Steigungswinkel",
    "GeoGebra Projelerim":"Meine GeoGebra-Projekte",
    "köşegen sayacı":"Diagonalen-Zähler",
    "dalgalardan ses üretimi":"Klangerzeugung aus Wellen",
    "ses üretme":"Klang erzeugen",
    "ay kraterlerinden ay yüzeyi profili çıkarma":"Mondoberflächenprofil aus Mondkratern erstellen",
    "Parabol Yardımı İle Çarpma İşlemi":"Multiplikation mit Hilfe einer Parabel",
    "Artikel Diyagramı":"Artikel-Diagramm",
    "dişil":"weiblich",
    "çoğul":"Plural",
    "Artikeller":"Artikel",
    "10 ile Çarpma":"Mit 10 multiplizieren",
    "2'nin Negatif Kuvvetleri":"Negative Potenzen von 2",
    "Küp Döndürme":"Würfel drehen",
    "Yuvarlama":"Runden",
    "Rasyonel İfadeler":"Rationale Ausdrücke",
    "Birim Dönüştürme":"Einheiten umrechnen",
    "Trigonometri":"Trigonometrie",
    "Birim Çember":"Einheitskreis",
    "Özel Üçgenler":"Besondere Dreiecke",
    "Orantı":"Proportionalität",
    "Rubik Küp":"Rubik-Würfel",
    "Zihinden 3'e Bölme":"Durch 3 im Kopf teilen",
    "Ay Gökyüzü":"Mondhimmel",
    "3B Ay":"3D-Mond",
    "Kesir ve Ondalık Sayı Doğrusu":"Bruch- und Dezimalzahlengerade",
    "İşaretli Toplama":"Addition mit Vorzeichen",
    "İşaretli Çarpma":"Multiplikation mit Vorzeichen",
    "Türev":"Ableitung",
    "Bulutlarla Toplama":"Addition mit Wolken",
    "Zıt işaretli eş birimler birbirini yok eder.":"Gleich große Einheiten mit entgegengesetzten Vorzeichen heben sich auf.",
    "Orta":"Mittel",
    "Yeni işlem":"Neue Aufgabe",
    "Noktaları sil":"Punkte löschen",
    "Kesir":"Bruch",
    "Tam sayılı":"Gemischte Zahl",
    "Ondalık sayı":"Dezimalzahl",
    "İki tamsayı arası 4 parçaya bölünmüş.":"Der Abstand zwischen zwei ganzen Zahlen ist in 4 Teile unterteilt.",
    "Orijin":"Ursprung",
    "Virgül ve Sıfır Silme Animasyonu":"Animation zum Entfernen von Komma und Null",
    "10 ile Çarp":"Mit 10 multiplizieren",
    "10'a Böl":"Durch 10 teilen",
    "Kesirleri 2’ye Böl – Animasyon Düzeltildi":"Brüche durch 2 teilen – Animation korrigiert",
    "2’ye böl":"Durch 2 teilen",
    "Bu arayüzde rastgele noktaların sayısı":"In dieser Oberfläche steht die Anzahl zufälliger Punkte",
    "ile uzunluk":"und Länge",
    "ve hacim":"und Volumen",
    "arasındaki ilişkiyi etkileşimli olarak gözleyebilirsin. Mavi tutamaçları sürükle; alttaki grafikler geçmiş ölçümleri kaydeder.":"Du kannst die Beziehung interaktiv beobachten. Ziehe die blauen Griffe; die Diagramme unten speichern frühere Messungen.",
    "teorik doğru":"theoretische Gerade",
    "Grafikleri temizle":"Diagramme leeren",
    "Yeni noktalar":"Neue Punkte",
    "1B — Doğru parçası":"1D — Strecke",
    "nokta sayısı S":"Punktzahl S",
    "Sağ uçtaki mavi tutamacı sürükle → uzunluk d":"Blauen Griff rechts ziehen → Länge d",
    "2B — Alan":"2D — Fläche",
    "Tutamakları sürükleyerek alanı değiştir":"Fläche durch Ziehen der Griffe ändern",
    "3B — Hacim":"3D — Volumen",
    "Silindir":"Zylinder",
    "Küre":"Kugel",
    "Dikdörtgen prizma":"Quader",
    "Koni":"Kegel",
    "Tutamakları sürükleyerek hacmi değiştir":"Volumen durch Ziehen der Griffe ändern",
    "Yansıt":"Spiegeln",
    "Seçilen kenar":"Ausgewählte Seite",
    "Örnek: 12, 2√2, 2/√3":"Beispiel: 12, 2√2, 2/√3",
    "Pulfrich – İki Nokta, Ayrı Yollar":"Pulfrich – Zwei Punkte, getrennte Wege",
    "Nokta A Hızı (px/sn)":"Geschwindigkeit Punkt A (px/s)",
    "Nokta B Hızı (px/sn)":"Geschwindigkeit Punkt B (px/s)",
    "Yol Ayrımı (px)":"Bahnabstand (px)",
    "3D Küp Döndürme":"3D-Würfel drehen",
    "Adım açısı s :":"Schrittwinkel s:",
    "Başlat":"Starten",
    "Durdur":"Stoppen",
    "Yukarı / Aşağı":"Hoch / Runter",
    "Yukarı":"Hoch",
    "Aşağı":"Runter",
    "Sağa / Sola":"Rechts / Links",
    "Sağa":"Rechts",
    "Sola":"Links",
    "İleri / Geri":"Vor / Zurück",
    "Geri":"Zurück",
    "Sayı Yuvarlama Animasyonu":"Animation zum Runden von Zahlen",
    "Sayıları Yuvarlama Animasyonu":"Animation zum Runden von Zahlen",
    "Virgül (,) veya nokta (.) ile ondalık sayı yazabilirsin.":"Du kannst Dezimalzahlen mit Komma (,) oder Punkt (.) schreiben.",
    "0–9 arasında hangi sayıya daha yakın?":"Welcher Zahl zwischen 0 und 9 ist sie näher?",
    "Yuvarlamayı Başlat":"Runden starten",
    "Yeniden Başlat":"Neu starten",
    "Rasyonel İfadelerin Sadeleştirilmesi":"Vereinfachung rationaler Ausdrücke",
    "Örnek 1":"Beispiel 1",
    "Örnek 2":"Beispiel 2",
    "Örnek 3":"Beispiel 3",
    "Örnek 4":"Beispiel 4",
    "Ölçü Birimi Dönüştürücü":"Einheitenumrechner",
    "Ölçü Dönüştürücü":"Einheitenumrechner",
    "Değer girin, sürükleyip bırakın ve sonucu izleyin!":"Wert eingeben, ziehen und ablegen und das Ergebnis beobachten!",
    "Uzunluk Birimleri":"Längeneinheiten",
    "Alan Birimleri":"Flächeneinheiten",
    "Hacim Birimleri":"Volumeneinheiten",
    "sinüs":"Sinus",
    "kosinüs":"Kosinus",
    "büyüteç":"Lupe",
    "değerleri göster":"Werte anzeigen",
    "Açı: –°":"Winkel: –°",
    "Sinüs: –":"Sinus: –",
    "Kosinüs: –":"Kosinus: –",
    "Türev Adım Adım v24":"Ableitung Schritt für Schritt v24",
    "Snap: Kapalı":"Einrasten: Aus",
    "Birim: Derece":"Einheit: Grad",
    "Sayıyı uygun parçalara ayır ve zihinden böl.":"Teile die Zahl in passende Teile und rechne im Kopf.",
    "İşlemdeki 165'e tıkla.":"Klicke auf die 165 in der Aufgabe.",
    "Yeni Soru":"Neue Aufgabe",
    "165 Örneği":"Beispiel 165",
    "Ana Sayfa":"Startseite"
  };

  const REPLACE = {
    "Whiteboard":"Beyaz Tahta",
    "Undo":"Geri Al",
    "Redo":"İleri",
    "Export PNG":"PNG Dışa Aktar",
    "Mouse Wheel":"Fare Tekerleği",
    "Space":"Boşluk",
    "Captured taşlar hamle geçmişinden hesaplanır (undo/PGN/FEN uyumlu).":"Alınan taşlar hamle geçmişinden hesaplanır (geri al/PGN/FEN uyumlu).",
    "Home":"Ana Sayfa",
    "← Home":"Ana Sayfa",
    "⌂ Home":"Ana Sayfa",
    "← Ana sayfa":"Ana Sayfa",
    "← Startseite":"Ana Sayfa"
  };

  const DYN = [
    [/^(\d+) nesne seçili$/, m => m[1] + ' Objekte ausgewählt'],
    [/^(\d+) nesne silindi$/, m => m[1] + ' Objekte gelöscht'],
    [/^(\d+) nesne kilitlendi$/, m => m[1] + ' Objekte gesperrt'],
    [/^(\d+) nesnenin kilidi açıldı$/, m => m[1] + ' Objekte entsperrt'],
    [/^(\d+) nesne gruplandı$/, m => m[1] + ' Objekte gruppiert'],
    [/^(\d+) nesne en öne getirildi$/, m => m[1] + ' Objekte ganz nach vorne gebracht'],
    [/^(\d+) nesne en arkaya gönderildi$/, m => m[1] + ' Objekte ganz nach hinten verschoben'],
    [/^Nesne silindi$/, () => 'Objekt gelöscht'],
    [/^Nesne kilitlendi$/, () => 'Objekt gesperrt'],
    [/^Nesnenin kilidi açıldı$/, () => 'Objekt entsperrt'],
    [/^Grup açıldı$/, () => 'Gruppe aufgelöst'],
    [/^Seçim kaldırıldı$/, () => 'Auswahl aufgehoben'],
    [/^Nesne dolduruldu$/, () => 'Objekt gefüllt'],
    [/^Mesajınız gönderildi — teşekkürler$/, () => 'Ihre Nachricht wurde gesendet – danke'],
    [/^Mesaj gönderilemedi$/, () => 'Nachricht konnte nicht gesendet werden']
  ];

  const css = `
  .si-home-btn{
    width:38px!important;height:36px!important;min-width:38px!important;max-width:38px!important;
    flex:0 0 38px!important;padding:0!important;border:1px solid #d9dde5!important;border-radius:10px!important;
    background:#fff!important;color:#1f2430!important;display:inline-flex!important;align-items:center!important;
    justify-content:center!important;box-sizing:border-box!important;cursor:pointer!important;text-decoration:none!important;
    box-shadow:none!important;line-height:1!important
  }
  .si-home-btn:hover{background:#f3f5f8!important}
  .si-home-btn svg{width:21px!important;height:21px!important;display:block!important}
  .si-home-fixed{position:fixed!important;left:12px;top:12px;z-index:9990!important}
  .si-bi::after{
    content:attr(data-si-de);display:block;color:#8b8f97;font-size:10px;font-weight:400;
    line-height:1.05;margin-top:2px;letter-spacing:0;white-space:normal
  }
  button.si-bi::after,a.si-bi::after{font-size:9px;margin-top:1px}
  .si-creator{
    position:fixed;right:16px;bottom:12px;z-index:9988;border:0!important;background:transparent!important;
    color:#999!important;font:400 13px/1.2 system-ui,-apple-system,"Segoe UI",Arial,sans-serif!important;
    padding:2px 3px!important;margin:0!important;width:auto!important;height:auto!important;min-width:0!important;
    box-shadow:none!important;border-radius:4px!important;cursor:pointer!important;opacity:.84;transition:color .16s ease,opacity .16s ease
  }
  .si-creator:hover,.si-creator:focus-visible{color:#111!important;opacity:1;outline:none}
  .si-feedback-layer{
    position:fixed;inset:0;z-index:10050;display:none;align-items:center;justify-content:center;
    padding:18px;background:rgba(17,24,39,.18)
  }
  .si-feedback-layer.open{display:flex}
  .si-feedback-card{
    width:min(420px,calc(100vw - 36px));background:#fff;color:#222;border:1px solid #dfe3e8;
    border-radius:14px;box-shadow:0 18px 55px rgba(0,0,0,.18);padding:16px;
    font-family:system-ui,-apple-system,"Segoe UI",Arial,sans-serif
  }
  .si-feedback-title{font-size:16px;font-weight:650;margin-bottom:3px}
  .si-feedback-title::after,.si-feedback-sub::after{display:block;color:#8b8f97;font-weight:400}
  .si-feedback-title::after{content:"Nachricht an Sinan İpek";font-size:10px;margin-top:2px}
  .si-feedback-sub{font-size:12px;line-height:1.35;color:#59616d;margin:8px 0 10px}
  .si-feedback-sub::after{content:"Schreiben Sie Ihre Meinung, einen Vorschlag oder ein Problem.";font-size:10px;margin-top:2px}
  .si-feedback-text{
    width:100%;min-height:120px;resize:vertical;border:1px solid #cfd5dc;border-radius:9px;
    padding:10px 11px;outline:none;font:14px/1.45 system-ui,-apple-system,"Segoe UI",Arial,sans-serif;color:#222;background:#fff
  }
  .si-feedback-text:focus{border-color:#8da6c8;box-shadow:0 0 0 3px rgba(83,119,166,.10)}
  .si-feedback-status{min-height:18px;margin-top:8px;font-size:12px;line-height:1.35;color:#6b7280}
  .si-feedback-status.error{color:#b42318}.si-feedback-status.success{color:#18794e}
  .si-feedback-actions{display:flex;align-items:center;gap:8px;margin-top:6px}
  .si-feedback-count{margin-right:auto;font-size:11px;color:#8a919b}
  .si-feedback-actions button{height:36px!important;padding:0 12px!important;border-radius:8px!important}
  .si-feedback-send{background:#20242a!important;border-color:#20242a!important;color:#fff!important}
  @media(pointer:coarse){.si-creator{right:12px;bottom:10px;font-size:12px!important}}
  `;

  function addStyle(){
    if(document.getElementById('si-global-style')) return;
    const s=document.createElement('style');
    s.id='si-global-style';
    s.textContent=css;
    document.head.appendChild(s);
  }

  function norm(s){return String(s||'').replace(/\s+/g,' ').trim()}

  function germanFor(tr){
    if(BI[tr]) return BI[tr];
    for(const [rx,fn] of DYN){const m=tr.match(rx); if(m) return fn(m)}
    return '';
  }

  function existingGermanSibling(el,de){
    const n=el && el.nextElementSibling;
    const p=el && el.previousElementSibling;
    return !!((n && norm(n.textContent)===de) || (p && norm(p.textContent)===de));
  }

  function processElement(el){
    if(!el || el.nodeType!==1) return;
    if(el.closest('.si-feedback-layer') || el.classList.contains('si-creator') || el.classList.contains('si-home-btn')) return;
    if(/^(SCRIPT|STYLE|TEXTAREA|OPTION|SVG|PATH|CANVAS)$/.test(el.tagName)) return;

    let t=norm(el.textContent);
    if(!t || t.length>650) return;

    if(REPLACE[t] && el.children.length===0){
      el.textContent=REPLACE[t];
      t=REPLACE[t];
    }

    const de=germanFor(t);
    if(de){
      if(existingGermanSibling(el,de)) {
        el.classList.remove('si-bi');
        el.removeAttribute('data-si-de');
      } else {
        el.dataset.siDe=de;
        el.classList.add('si-bi');
      }
    }else{
      el.classList.remove('si-bi');
      el.removeAttribute('data-si-de');
    }
  }

  function translateTree(root=document.body){
    if(!root) return;
    const all=[root,...root.querySelectorAll('*')];
    for(const el of all) processElement(el);
    const title=norm(document.title);
    if(REPLACE[title]) document.title=REPLACE[title];
  }

  const homeSvg='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.5 11.2 12 4l8.5 7.2" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/><path d="M5.5 10.5V20h13v-9.5M9.2 20v-5.8h5.6V20" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></svg>';

  function isHomeLike(el){
    const t=norm(el.textContent).toLowerCase();
    const href=(el.getAttribute && el.getAttribute('href'))||'';
    return ['home','← home','⌂ home','ana sayfa','← ana sayfa','← startseite'].includes(t) ||
      /(^|\/)projeler\/?$/.test(href) || href==='../index.html' || href==='/projeler/' || href==='/projeler/index.html';
  }

  function setupHome(){
    const candidates=[...document.querySelectorAll('a,button')].filter(isHomeLike);
    let home=candidates.shift();

    for(const extra of candidates){
      if(extra!==home) extra.style.display='none';
    }

    if(!home){
      home=document.createElement('a');
      home.href='/projeler/';
      const host=document.querySelector('#toolbar,.toolbar,.topbar,.controls,header,nav');
      if(host && host!==document.body){
        host.insertBefore(home,host.firstChild);
      }else{
        home.classList.add('si-home-fixed');
        document.body.appendChild(home);
      }
    }

    if(home.tagName==='A') home.setAttribute('href','/projeler/');
    else home.onclick=()=>{location.href='/projeler/'};

    home.innerHTML=homeSvg;
    home.classList.add('si-home-btn');
    home.classList.remove('si-bi');
    home.removeAttribute('data-si-de');
    home.title='Ana Sayfa · Startseite';
    home.setAttribute('aria-label','Ana Sayfa · Startseite');
  }

  function appName(){
    const parts=location.pathname.split('/').filter(Boolean);
    const key=parts.length>1 ? parts[parts.length-2] : '';
    return APP_NAMES[key] || norm(document.title) || key || 'Öğren';
  }

  function setupFeedback(){
    // Beyaz Tahta kendi mesaj kutusuna sahipse yalnız kaynak bilgisini eklemek için işaretle.
    const existing=document.getElementById('creatorSignature');
    if(existing){
      existing.dataset.siApp=appName();
      return;
    }
    if(document.querySelector('.si-creator')) return;

    const btn=document.createElement('button');
    btn.type='button';
    btn.className='si-creator';
    btn.textContent='Sinan İpek';
    btn.title="Sinan İpek'e mesaj gönder";
    btn.setAttribute('aria-label',"Sinan İpek'e mesaj gönder");
    document.body.appendChild(btn);

    const layer=document.createElement('div');
    layer.className='si-feedback-layer';
    layer.innerHTML=`
      <div class="si-feedback-card" role="dialog" aria-modal="true" aria-label="Sinan İpek'e mesaj">
        <div class="si-feedback-title">Sinan İpek'e mesaj</div>
        <div class="si-feedback-sub">Görüşünüzü, önerinizi veya fark ettiğiniz bir sorunu yazabilirsiniz.</div>
        <textarea class="si-feedback-text" maxlength="1500" placeholder="Mesajınızı yazın..."></textarea>
        <div class="si-feedback-status" aria-live="polite"></div>
        <div class="si-feedback-actions">
          <span class="si-feedback-count">0 / 1500</span>
          <button type="button" class="si-feedback-cancel">İptal</button>
          <button type="button" class="si-feedback-send">Gönder</button>
        </div>
      </div>`;
    document.body.appendChild(layer);

    const ta=layer.querySelector('.si-feedback-text');
    const count=layer.querySelector('.si-feedback-count');
    const status=layer.querySelector('.si-feedback-status');
    const cancel=layer.querySelector('.si-feedback-cancel');
    const send=layer.querySelector('.si-feedback-send');

    function open(){
      layer.classList.add('open');ta.value='';count.textContent='0 / 1500';status.textContent='';status.className='si-feedback-status';
      send.disabled=false;send.textContent='Gönder';setTimeout(()=>ta.focus(),0)
    }
    function close(){layer.classList.remove('open')}
    btn.addEventListener('click',open);
    cancel.addEventListener('click',close);
    layer.addEventListener('pointerdown',e=>{if(e.target===layer) close()});
    ta.addEventListener('input',()=>count.textContent=ta.value.length+' / 1500');
    ta.addEventListener('keydown',e=>{if(e.key==='Escape'){e.preventDefault();close()}else if((e.ctrlKey||e.metaKey)&&e.key==='Enter'){e.preventDefault();send.click()}});

    send.addEventListener('click',async()=>{
      const message=ta.value.trim();
      if(!message){status.className='si-feedback-status error';status.textContent='Lütfen önce bir mesaj yazın.';ta.focus();return}
      send.disabled=true;send.textContent='Gönderiliyor…';status.className='si-feedback-status';status.textContent='Mesaj gönderiliyor…';
      const source='['+appName()+' | '+location.pathname+'] ';
      try{
        const r=await fetch(SUPABASE_URL+'/rest/v1/feedback_messages',{
          method:'POST',
          headers:{'apikey':SUPABASE_KEY,'Authorization':'Bearer '+SUPABASE_KEY,'Content-Type':'application/json','Prefer':'return=minimal'},
          body:JSON.stringify({message:source+message})
        });
        if(!r.ok) throw new Error('HTTP '+r.status);
        status.className='si-feedback-status success';status.textContent='Mesajınız gönderildi. Teşekkürler.';
        setTimeout(close,700);
      }catch(err){
        console.error('Mesaj gönderilemedi:',err);
        status.className='si-feedback-status error';status.textContent='Mesaj gönderilemedi. Lütfen tekrar deneyin.';
        send.disabled=false;send.textContent='Gönder';
      }
    });
  }

  function patchExistingWhiteboardFeedback(){
    // Bu işaret, mevcut Beyaz Tahta kodunun kaynak adını kayda eklemesine yardımcı olur.
    const sig=document.getElementById('creatorSignature');
    if(sig) sig.dataset.siApp=appName();
  }

  function init(){
    addStyle();
    setupHome();
    setupFeedback();
    patchExistingWhiteboardFeedback();
    translateTree();

    let queued=false;
    const obs=new MutationObserver(()=>{
      if(queued) return;
      queued=true;
      requestAnimationFrame(()=>{queued=false;translateTree()});
    });
    obs.observe(document.body,{subtree:true,childList:true,characterData:true});
  }

  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
  else init();
})();