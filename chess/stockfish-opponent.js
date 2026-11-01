/* Independent Stockfish worker for the opponent. Analysis teacher uses a separate worker. */
window.ChessOpponent=(()=>{
 let worker=null,ready=null,job=null,seq=0;
 const local="stockfish/stockfish-19-lite-single.js";
 const cdn="https://cdn.jsdelivr.net/npm/stockfish@19.0.1/bin/";
 async function createWorker(){
  try{const r=await fetch(local,{method:"HEAD",cache:"no-store"});if(r.ok)return new Worker(local);}catch(e){}
  const r=await fetch(cdn+"stockfish-19-lite-single.js");
  if(!r.ok)throw Error("Stockfish indirilemedi ("+r.status+")");
  const js=(await r.text()).replaceAll("stockfish-19-lite-single.wasm",cdn+"stockfish-19-lite-single.wasm");
  const url=URL.createObjectURL(new Blob([js],{type:"text/javascript"}));
  const w=new Worker(url);setTimeout(()=>URL.revokeObjectURL(url),30000);return w;
 }
 function init(){
  if(ready)return ready;
  const id=seq;
  ready=new Promise(async(resolve,reject)=>{
   let timer=setTimeout(()=>{if(id===seq){worker?.terminate();worker=null;ready=null;reject(Error("Stockfish başlatma zaman aşımı"));}},25000);
   try{
    const w=await createWorker();if(id!==seq){w.terminate();clearTimeout(timer);return;}
    worker=w;
    w.onerror=()=>{if(id===seq){clearTimeout(timer);worker?.terminate();worker=null;ready=null;reject(Error("Stockfish dosyaları yüklenemedi"));}};
    w.onmessage=e=>{
     if(id!==seq)return;
     for(const line of String(e.data).split(/\r?\n/)){
      if(line==="uciok"){w.postMessage("setoption name Threads value 1");w.postMessage("setoption name Hash value 16");w.postMessage("isready");}
      else if(line==="readyok"){clearTimeout(timer);resolve();}
      else if(line.startsWith("bestmove ")&&job){const j=job;job=null;clearTimeout(j.timer);j.resolve(line.split(/\s+/)[1]);}
     }
    };
    w.postMessage("uci");
   }catch(e){clearTimeout(timer);if(id===seq){ready=null;reject(e);}}
  });
  return ready;
 }
 async function move(fen,level=14,thinkMs=800){
  const id=seq;
  await init();
  if(id!==seq)throw Error("İptal edildi");
  if(job)throw Error("Motor meşgul");
  const skill=Math.max(0,Math.min(20,Math.round(Number(level)||0)));
  const ms=Math.max(100,Math.min(5000,Number(thinkMs)||800));
  return new Promise((resolve,reject)=>{
   const timer=setTimeout(()=>{if(id===seq){cancel();reject(Error("Stockfish hamle süresi aşıldı"));}},Math.max(25000,ms+18000));
   job={resolve,reject,timer};
   worker.postMessage("setoption name Skill Level value "+skill);
   worker.postMessage("position fen "+fen);
   worker.postMessage("go movetime "+ms);
  });
 }
 function cancel(){
  seq++;
  if(job){clearTimeout(job.timer);job.reject(Error("İptal edildi"));job=null;}
  worker?.terminate();worker=null;ready=null;
 }
 return {move,cancel};
})();