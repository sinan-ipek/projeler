// Beyaz Tahta — VR Önizleme v0.1.0
// Read-only spatial preview of the existing 2D board and 3D models.
// The ordinary board, its object data, and collaboration system are unchanged.
import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.181.2/build/three.module.js';

const button=document.getElementById('vrPreviewBtn');
const bridge=()=>window.__WHITEBOARD_VR_BRIDGE__;
let active=false;
const tr={
  unsupported:'Bu cihaz veya tarayıcı WebXR VR modunu desteklemiyor.',
  error:'VR önizleme açılamadı: ',
  missing:'Beyaz tahta henüz hazır değil.',
  tip:'VR Önizleme • Sağ çubuk: yürü • Sol çubuk: dön • Çıkış: Quest sistem menüsü'
};
function status(str){const el=document.getElementById('status');if(el)el.textContent=str;}
function createText(str){
 const c=document.createElement('canvas');c.width=1024;c.height=128;
 const ctx=c.getContext('2d');
 ctx.fillStyle='#ffffff';ctx.fillRect(0,0,c.width,c.height);
 ctx.fillStyle='#283242';ctx.font='bold 36px system-ui';ctx.textAlign='center';ctx.textBaseline='middle';ctx.fillText(str,c.width/2,c.height/2,990);
 const texture=new THREE.CanvasTexture(c);texture.colorSpace=THREE.SRGBColorSpace;
 return new THREE.Mesh(new THREE.PlaneGeometry(3.2,.4),new THREE.MeshBasicMaterial({map:texture,transparent:true,side:THREE.DoubleSide}));
}
function safeSize(number,unit,minimum=.025){return Math.max(minimum,Math.min(5,Math.abs(Number(number)||100)*unit));}
function buildShape(record,map,scene){
 const type=record.shape3dType||'box',width=safeSize(record.sizeX,map.unit),height=safeSize(record.sizeY,map.unit),depth=safeSize(record.sizeZ,map.unit);
 let geometry;
 switch(type){
  case 'sphere':geometry=new THREE.SphereGeometry(.5,32,20);break;
  case 'cylinder':geometry=new THREE.CylinderGeometry(.5,.5,1,32);break;
  case 'cone':geometry=new THREE.ConeGeometry(.5,1,32);break;
  case 'pyramid':geometry=new THREE.CylinderGeometry(0,.62,1,4);break;
  case 'hexpyramid':geometry=new THREE.CylinderGeometry(0,.6,1,6);break;
  case 'hexprism':geometry=new THREE.CylinderGeometry(.56,.56,1,6);break;
  case 'line3d':{
   const a=record.lineLocalA||{x:-100,y:0,z:0},b=record.lineLocalB||{x:100,y:0,z:0};
   const p0=new THREE.Vector3((a.x||0)*map.unit,(a.y||0)*map.unit,(a.z||0)*map.unit);
   const p1=new THREE.Vector3((b.x||0)*map.unit,(b.y||0)*map.unit,(b.z||0)*map.unit);
   const span=p1.clone().sub(p0);
   geometry=new THREE.CylinderGeometry(.007,.007,Math.max(.001,span.length()),8);
   geometry.translate(0,0,0);
   const material=new THREE.MeshStandardMaterial({color:record.style?.color||'#333333',roughness:.65});
   const line=new THREE.Mesh(geometry,material);
   line.position.copy(p0).add(p1).multiplyScalar(.5);
   line.quaternion.setFromUnitVectors(new THREE.Vector3(0,1,0),span.normalize());
   const group=new THREE.Group();group.add(line);
   putAtBoard(group,record,map);
   group.position.y+=.16;
   scene.add(group);return;
  }
  default:geometry=new THREE.BoxGeometry(1,1,1);break;
 }
 const opacity=Math.max(.15,Math.min(1,1-(Number(record.fillOpacity)||0)/100));
 const color=record.fillColor3D||record.style?.color||'#72a9df';
 const mat=new THREE.MeshStandardMaterial({color,roughness:.54,metalness:0,transparent:opacity<1,opacity,side:THREE.DoubleSide});
 const obj=new THREE.Mesh(geometry,mat);
 obj.scale.set(width,height,depth);
 const parent=new THREE.Group();parent.add(obj);
 putAtBoard(parent,record,map);
 obj.position.y=height/2;
 if(record.rotationQuat){
  const q=record.rotationQuat;
  if(Array.isArray(q)&&q.length===4)obj.quaternion.set(q[0],q[1],q[2],q[3]);
  else if(Number.isFinite(q.x)&&Number.isFinite(q.y)&&Number.isFinite(q.z)&&Number.isFinite(q.w))obj.quaternion.set(q.x,q.y,q.z,q.w);
 }else{
  obj.rotation.set(Number(record.rotationX)||0,Number(record.rotationY)||0,Number(record.rotationZ)||0);
 }
 obj.castShadow=false;
 scene.add(parent);
}
function putAtBoard(object,record,map){
 const center=record.center||{x:0,y:0};
 const sx=(Number(center.x)||0)*map.zoom+map.offsetX;
 const sy=(Number(center.y)||0)*map.zoom+map.offsetY;
 object.position.set((sx/map.screenWidth-.5)*map.boardWidth,.04,map.boardZ+(sy/map.screenHeight-.5)*map.boardHeight);
}
function makeScene(snapshot){
 const scene=new THREE.Scene();scene.background=new THREE.Color('#f8fbff');
 const camera=new THREE.PerspectiveCamera(72,window.innerWidth/window.innerHeight,.02,350);
 const player=new THREE.Group();scene.add(player);player.add(camera);
 const ambient=new THREE.HemisphereLight(0xffffff,0xc4d2e2,2.2);scene.add(ambient);
 const light=new THREE.DirectionalLight(0xffffff,2.5);light.position.set(3,6,4);scene.add(light);
 const boardWidth=5.2,boardHeight=boardWidth*snapshot.canvas.height/snapshot.canvas.width,boardZ=-2.2;
 const texture=new THREE.CanvasTexture(snapshot.canvas);texture.colorSpace=THREE.SRGBColorSpace;texture.anisotropy=8;
 const board=new THREE.Mesh(new THREE.PlaneGeometry(boardWidth,boardHeight),new THREE.MeshBasicMaterial({map:texture,side:THREE.DoubleSide}));
 board.rotation.x=-Math.PI/2;board.position.set(0,.018,boardZ);scene.add(board);
 const grid=new THREE.GridHelper(60,60,0xd8dee8,0xe9edf3);grid.position.y=-.004;scene.add(grid);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(60,60),new THREE.MeshStandardMaterial({color:0xfafcff,roughness:1}));
 floor.rotation.x=-Math.PI/2;floor.position.y=-.007;scene.add(floor);
 const map={boardWidth,boardHeight,boardZ,screenWidth:snapshot.cssWidth,screenHeight:snapshot.cssHeight,zoom:snapshot.zoom,offsetX:snapshot.offsetX,offsetY:snapshot.offsetY,unit:boardWidth*snapshot.zoom/snapshot.cssWidth};
 for(const o of snapshot.objects){
  if(o?.kind==='shape3d'){
   try{buildShape(o,map,scene);}catch(e){console.warn('3D preview item skipped',e);}
  }
 }
 const hint=createText('Sag joystick: yuru   •   Sol joystick: don   •   Cikis: Quest menu');
 hint.position.set(0,2.15,-2.8);scene.add(hint);
 return {scene,camera,player,texture};
}
function stick(src){
 const gamepad=src?.gamepad;
 if(!gamepad)return [0,0];
 const arr=gamepad.axes||[];
 let x=arr.length>=4?arr[2]:arr[0]||0;
 let y=arr.length>=4?arr[3]:arr[1]||0;
 x=Math.abs(x)>.16?x:0;y=Math.abs(y)>.16?y:0;
 return [x,y];
}
function locomotion(session,view,dt,renderer){
 let left=null,right=null;
 for(const input of session.inputSources){
  if(input.handedness==='left')left=input;
  if(input.handedness==='right')right=input;
 }
 const [lx]=stick(left),[rx,ry]=stick(right);
 // Rotate with left stick and walk relative to headset orientation.
 view.player.rotation.y-=lx*dt*1.3;
 const xrCamera=renderer.xr.getCamera(view.camera);
 const heading=new THREE.Vector3(0,0,-1).applyQuaternion(xrCamera.quaternion);heading.y=0;heading.normalize();
 const lateral=new THREE.Vector3().crossVectors(heading,new THREE.Vector3(0,1,0)).normalize();
 const step=2.0*dt;
 view.player.position.addScaledVector(heading,-ry*step);
 view.player.position.addScaledVector(lateral,rx*step);
}
async function enter(){
 if(active)return;
 const api=bridge();
 if(!api?.snapshot){status(tr.missing);return;}
 if(!navigator.xr?.requestSession){status(tr.unsupported);return;}
 // Request the immersive session during the original user click (user activation).
 const sessionPromise=navigator.xr.requestSession('immersive-vr',{optionalFeatures:['local-floor']});
 active=true;
 let layer=null,renderer=null,session=null,view=null;
 try{
  session=await sessionPromise;
  const data=api.snapshot();
  layer=document.createElement('div');
  Object.assign(layer.style,{position:'fixed',inset:'0',zIndex:'9000',background:'#fff'});
  document.body.appendChild(layer);
  renderer=new THREE.WebGLRenderer({antialias:true,powerPreference:'high-performance'});
  renderer.setPixelRatio(Math.min(window.devicePixelRatio||1,2));
  renderer.setSize(window.innerWidth,window.innerHeight);
  renderer.outputColorSpace=THREE.SRGBColorSpace;
  renderer.xr.enabled=true;renderer.xr.setReferenceSpaceType('local-floor');
  layer.appendChild(renderer.domElement);
  view=makeScene(data);
  const clock=new THREE.Clock();
  let closed=false;
  const cleanup=()=>{
   if(closed)return;closed=true;active=false;
   renderer.setAnimationLoop(null);
   view.texture.dispose();
   view.scene.traverse(o=>{if(o.geometry)o.geometry.dispose();if(o.material){for(const m of(Array.isArray(o.material)?o.material:[o.material])){m.map?.dispose();m.dispose();}}});
   renderer.dispose();layer.remove();status('VR önizlemeden çıkıldı. Beyaz tahta değişmedi.');
  };
  session.addEventListener('end',cleanup,{once:true});
  await renderer.xr.setSession(session);
  renderer.setAnimationLoop(()=>{
   const dt=Math.min(clock.getDelta(),.05);
   locomotion(session,view,dt,renderer);
   renderer.render(view.scene,view.camera);
  });
  status(tr.tip);
 }catch(error){
  active=false;
  if(session?.end && session.visibilityState!=='ended')try{await session.end();}catch(_){}
  renderer?.dispose();layer?.remove();
  console.error('VR preview error',error);status(tr.error+(error?.message||error));
 }
}
button?.addEventListener('click',enter);
