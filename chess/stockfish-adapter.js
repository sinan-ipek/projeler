/* Stockfish 19 single-threaded WASM UCI client. GPL-3.0 engine loaded separately. */
window.ChessStockfish=(()=>{
 let worker=null,ready=null,task=null,failed=false;
 const path="stockfish/stockfish-19-lite-single.js";
 function init(){
  if(ready)return ready;
  if(failed)return Promise.reject(Error("Motor yüklenemedi."));
  ready=new Promise((resolve,reject)=>{
   let ok=false;
   const timeout=setTimeout(()=>{if(!ok){failed=true;worker?.terminate();worker=null;reject(Error("Stockfish zaman aşımı."));}},25000);
   try{
    worker=new Worker(path);
    worker.onerror=()=>{if(!ok){clearTimeout(timeout);failed=true;reject(Error("Stockfish dosyaları bulunamadı veya açılamadı."));}};
    worker.onmessage=e=>{
     const lines=String(e.data).split(/\r?\n/);
     for(const line of lines){
      if(line==="uciok"){worker.postMessage("isready");continue;}
      if(line==="readyok"){ok=true;clearTimeout(timeout);resolve();continue;}
      if(!task)continue;
      if(line.startsWith("info ")&&line.includes(" score ")&&line.includes(" pv ")){
       const cp=line.match(/ score cp (-?\d+)/),mate=line.match(/ score mate (-?\d+)/),pv=line.match(/ pv (.*)$/);
       task.info={cp:cp?Number(cp[1]):null,mate:mate?Number(mate[1]):null,pv:pv?pv[1].trim().split(/\s+/):[]};
      }
      if(line.startsWith("bestmove ")){
       const t=task;task=null;clearTimeout(t.timeout);t.resolve({...t.info,best:line.split(" ")[1]});
      }
     }
    };
    worker.postMessage("uci");
   }catch(e){clearTimeout(timeout);failed=true;reject(e);}
  }).catch(e=>{ready=null;throw e;});
  return ready;
 }
 async function analyze(fen,depth=12){
  await init();
  if(task)throw Error("Motor meşgul.");
  return new Promise((resolve,reject)=>{
   const timeout=setTimeout(()=>{const t=task;task=null;worker?.postMessage("stop");reject(Error("Analiz süresi aşıldı."));},22000);
   task={resolve,reject,timeout,info:{cp:null,mate:null,pv:[]}};
   worker.postMessage("position fen "+fen);
   worker.postMessage("go depth "+depth);
  });
 }
 function reset(){if(task){clearTimeout(task.timeout);task.reject(Error("İptal edildi."));task=null;}worker?.terminate();worker=null;ready=null;failed=false;}
 return {init,analyze,reset};
})();