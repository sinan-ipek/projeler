(()=>{"use strict";
const palettes=[
 {name:{tr:"Gri",de:"Grau",en:"Gray"},light:"#eeeeee",dark:"#a7a7a7"},
 {name:{tr:"Klasik",de:"Klassisch",en:"Classic"},light:"#f0d9b5",dark:"#b58863"},
 {name:{tr:"Yeşil",de:"Grün",en:"Green"},light:"#eeeed2",dark:"#769656"},
 {name:{tr:"Mavi",de:"Blau",en:"Blue"},light:"#e9eef5",dark:"#809bb8"},
 {name:{tr:"Ceviz",de:"Walnuss",en:"Walnut"},light:"#f4e4c9",dark:"#987654"}
];
const btn=document.getElementById("boardColorBtn");if(!btn)return;
let index=Number(localStorage.getItem("chess_board_palette")||0);if(!Number.isInteger(index)||index<0||index>=palettes.length)index=0;
function apply(){
 const p=palettes[index],lang=document.getElementById("simpleLang")?.value||"tr";
 document.documentElement.style.setProperty("--sq-light",p.light);
 document.documentElement.style.setProperty("--sq-dark",p.dark);
 document.documentElement.style.setProperty("--review-light",p.light);
 document.documentElement.style.setProperty("--review-dark",p.dark);
 const prefix=lang==="de"?"Brettfarbe":lang==="en"?"Board color":"Tahta Rengi";
 btn.textContent=p.name[lang]||p.name.tr;
 btn.title=lang==="de"?"Klicken, um die Brettfarbe zu wechseln":lang==="en"?"Click to change board colors":"Tahta rengini değiştirmek için tıkla";
 localStorage.setItem("chess_board_palette",String(index));
}
btn.addEventListener("click",()=>{index=(index+1)%palettes.length;apply();});
document.getElementById("simpleLang")?.addEventListener("change",apply);
apply();
})();