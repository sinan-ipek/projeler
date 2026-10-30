/* Stockfish 19 UCI adapter — browser Worker, single threaded. */
window.ChessStockfish = (() => {
 let worker=null, ready=null, pending=null, failed=false;
 const url="stockfish/stockfish-19-lite-single.js";
 function init(){
  if(failed)return Promise.reject(new Error("Stockfish unavailable"));
  if(ready)return ready;
  ready=new Promise((resolve,reject)=>{
   const timer=setTimeout(()=>{failed=true;worker?.terminate();worker=null;reject(new Error("Stockfish timeout"));},18000);
   try{
    worker=new Worker(url);
    worker.onerror=()=>{clearTimeout(timer);failed=true;worker?.terminate();worker=null;reject(new Error("Stockfish load failed"));};
    worker.onmessage=e=>{
     const line=String(e.data);
     if(line.includes("uciok"))worker.postMessage("isready");
     if(line.includes("readyok")){clearTimeout(timer);resolve(true);}
     if(!pending)return;
     if(line.startsWith("info ")&&line.includes(" score ")&&line.includes(" pv ")){
      const cp=line.match(/ score cp (-?\d+)/),mate=line.match(/ score mate (-?\d+)/),pv=line.match(/ pv (.+)$/);
      pending.info={cp:cp?Number(cp[1]):null,mate:mate?Number(mate[1]):null,pv:pv?pv[1].trim().split(" "):[]};
     }
     if(line.startsWith("bestmove ")){
      const task=pending;pending=null;
      task.resolve({best:line.split(" ")[1],...task.info});
     }
    };
    worker.postMessage("uci");
   }catch(e){clearTimeout(timer);failed=true;reject(e);}
  });
  return ready;
 }
 async function analyze(fen,depth=11){
  await init();
  if(pending)throw Error("Stockfish busy");
  return new Promise((resolve,reject)=>{
   pending={resolve,reject,info:{cp:null,mate:null,pv:[]}};
   worker.postMessage("position fen "+fen);
   worker.postMessage("go depth "+depth);
  });
 }
 function reset(){if(pending){pending.reject(Error("Cancelled"));pending=null;}worker?.terminate();worker=null;ready=null;failed=false;}
 return {analyze,init,reset};
})();