(()=>{"use strict";
const api=window.ChessReview,save=document.getElementById("simpleSave"),load=document.getElementById("simpleLoad");
if(!api||!save||!load)return;
const $=id=>document.getElementById(id);
const lang=()=>$("simpleLang")?.value||"tr";
const dict={
tr:{name:"Oyunun adı (boş bırakırsan tarih kullanılır):",empty:"Henüz kaydedilecek hamle yok.",saved:"Oyun PGN dosyası olarak kaydedildi.",loaded:"Oyun yüklendi. Hamleleri aşağıdaki oklarla izleyebilirsin.",bad:"Bu PGN dosyasındaki hamleler okunamadı. Oyun değiştirilmedi.",file:"PGN dosyası",error:"Dosya işlemi başarısız oldu: ",picker:"Kaydedilmiş PGN dosyasını seç"},
de:{name:"Name der Partie (leer = Datum):",empty:"Noch keine Züge zum Speichern.",saved:"Partie als PGN gespeichert.",loaded:"Partie geladen. Mit den Pfeilen kannst du die Züge ansehen.",bad:"Die Züge in der PGN-Datei konnten nicht gelesen werden.",file:"PGN-Datei",error:"Dateifehler: ",picker:"PGN-Datei auswählen"},
en:{name:"Game name (leave empty for date):",empty:"No moves to save yet.",saved:"Game saved as a PGN file.",loaded:"Game loaded. Use the arrows below to replay the moves.",bad:"Could not read the moves in this PGN file. Game unchanged.",file:"PGN file",error:"File operation failed: ",picker:"Choose a saved PGN file"}};
const T=()=>dict[lang()]||dict.tr;
function notice(msg){const extra=$("simpleExtra");if(extra){extra.classList.add("open");extra.textContent=msg;}}
function pad(n){return String(n).padStart(2,"0");}
function dateName(d){return pad(d.getDate())+"."+pad(d.getMonth()+1)+"."+d.getFullYear()+"."+pad(d.getHours())+pad(d.getMinutes());}
function clean(s){return s.replace(/[\\/:*?"<>|\x00-\x1f]/g,"-").trim().slice(0,90).replace(/\.+$/,"")||"Oyun";}
function headerValue(s){return String(s).replace(/[\\"]/g," ").replace(/[\r\n]/g," ").slice(0,150);}
function makePGN(name,body,d){const date=d.getFullYear()+"."+pad(d.getMonth()+1)+"."+pad(d.getDate());const headers={Event:name,Site:"Chess Teacher",Date:date,Round:"?",White:"White",Black:"Black",Result:"*"};return Object.entries(headers).map(([k,v])=>"["+k+" \""+headerValue(v)+"\"]").join("\n")+"\n\n"+body.trim()+" *\n";}
async function savePGN(){
 const body=api.exportPGN();
 if(!body.trim()){notice(T().empty);return;}
 const d=new Date(),defaultName=dateName(d)+".01";
 const entered=prompt(T().name,defaultName);if(entered===null)return;
 const name=clean(entered.trim()||defaultName),filename=name+".pgn",text=makePGN(name,body,d);
 try{
  if(typeof window.showSaveFilePicker==="function"){
   const handle=await window.showSaveFilePicker({suggestedName:filename,types:[{description:"PGN Chess Game",accept:{"application/x-chess-pgn":[".pgn"]}}]});
   const writable=await handle.createWritable();await writable.write(text);await writable.close();
  }else{
   const blob=new Blob([text],{type:"application/x-chess-pgn;charset=utf-8"}),url=URL.createObjectURL(blob);
   const a=document.createElement("a");a.href=url;a.download=filename;document.body.append(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),10000);
  }
  notice(T().saved+" "+filename);
 }catch(e){if(e?.name!=="AbortError")notice(T().error+e.message);}
}
const input=document.createElement("input");input.type="file";input.accept=".pgn,application/x-chess-pgn,text/plain";input.style.display="none";document.body.append(input);
async function openFile(file){
 if(!file)return;
 try{
  const text=(await file.text()).replace(/^\uFEFF/,"");
  if(!api.importPGN(text)){notice(T().bad);return;}
  window.ChessPlayback?.openStart();
  notice(T().loaded+" "+file.name);
 }catch(e){notice(T().error+e.message);}
}
input.addEventListener("change",()=>{const file=input.files?.[0];input.value="";openFile(file);});
save.onclick=savePGN;
load.onclick=()=>{input.value="";input.click();};
})();