import * as THREE from 'three';

const frame=document.getElementById('boardApp');
const vrBtn=document.getElementById('vrBtn');
const hint=document.getElementById('hint');
const layer=document.getElementById('vrLayer');
const W={frame:null,api:null,active:false,renderer:null,scene:null,rig:null,camera:null,board:null,texture:null,session:null,controllers:[],menu:null,menuTargets:[],menuPage:'tools',menuVisible:true,raycaster:new THREE.Raycaster(),dot:null,drag:false,lastUV:null,move3d:null,models:[],modelSignature:'',xLast:false,lang:'tr',lastTexture:0,lastModels:0,lastStatus:'',clock:new THREE.Clock()};
function info(s){hint.textContent=s;hint.style.display='block';clearTimeout(info.timeout);info.timeout=setTimeout(()=>hint.style.display='none',6000)}
const translations={
tr:{tools:'Araç',forms:'Şekil',more:'Diğer',select:'Seç',pen:'Bézier',eraser:'Silgi',undo:'Geri',redo:'İleri',snap:'Snap',line:'Çizgi',rect:'Dikdörtgen',ellipse:'Elips',triangle:'Üçgen',pentagon:'Beşgen',hexagon:'Altıgen',cube:'Küp',sphere:'Küre',cylinder:'Silindir',cone:'Koni',pyramid:'Piramit',hexprism:'6gen Prizma',me:'Ben',everyone:'Herkes',grid:'3D Grid',lang:'Dil',help:'?',home:'Home',exit:'Çıkış'},
de:{tools:'Werkz.',forms:'Formen',more:'Mehr',select:'Wählen',pen:'Bézier',eraser:'Radierer',undo:'Zurück',redo:'Vor',snap:'Snap',line:'Linie',rect:'Rechteck',ellipse:'Ellipse',triangle:'Dreieck',pentagon:'Fünfeck',hexagon:'Sechseck',cube:'Würfel',sphere:'Kugel',cylinder:'Zylinder',cone:'Kegel',pyramid:'Pyramide',hexprism:'Hexprisma',me:'Ich',everyone:'Alle',grid:'3D Raster',lang:'Sprache',help:'?',home:'Home',exit:'Ende'},
en:{tools:'Tools',forms:'Shapes',more:'More',select:'Select',pen:'Bézier',eraser:'Eraser',undo:'Undo',redo:'Redo',snap:'Snap',line:'Line',rect:'Rectangle',ellipse:'Ellipse',triangle:'Triangle',pentagon:'Pentagon',hexagon:'Hexagon',cube:'Cube',sphere:'Sphere',cylinder:'Cylinder',cone:'Cone',pyramid:'Pyramid',hexprism:'Hex prism',me:'Mine',everyone:'Everyone',grid:'3D Grid',lang:'Language',help:'?',home:'Home',exit:'Exit'}};
function tr(s){return translations[W.lang]?.[s]||s}
const bridgeLines=[
'  window.__WBVR_API__={',
'    canvas:()=>canvas,',
'    redraw:()=>redraw(),',
'    snapshot:()=>({width:canvas.clientWidth,height:canvas.clientHeight,viewX,viewY,viewZoom,',
'      models:objects.map((o,i)=>o?.kind==="shape3d"?{index:i,record:JSON.parse(JSON.stringify(o))}:null).filter(Boolean)}),',
'    geometry:(index)=>{const o=objects[index];return o?.kind==="shape3d"?{geo:shape3DGeometry(o),points:shape3DViewPoints(o)}:null;},',
'    beginModel:(index)=>{const o=objects[index];if(!o||o.locked)return null;',
'      mode="select";selectedIndex=index;selectedIndices=[index];recordObjectStates([index]);redraw();',
'      return {x:Number(o.center?.x)||0,y:Number(o.center?.y)||0,z:Number(o.centerZ)||0};},',
'    moveModel:(index,pos)=>{const o=objects[index];if(!o||o.locked)return;',
'      o.center.x=pos.x;o.center.y=pos.y;o.centerZ=pos.z;markBoardDirty();redraw();}',
'  };'
].join('\n');
function instrument(source){
 const token='  resetDefaultView({redrawNow:false});';
 if(!source.includes(token))throw Error('Beyaz Tahta sürümünde ortak motor bağlantısı bulunamadı.');
 let html=source.replace(token,bridgeLines+'\n'+token);
 html=html.replace('    drawUniversal3DXZGrid();','    if(!window.__WBVR_ACTIVE__)drawUniversal3DXZGrid();');
 html=html.replace('    drawAllShape3DShadows();','    if(!window.__WBVR_ACTIVE__)drawAllShape3DShadows();');
 html=html.replace("else if(o.kind==='shape3d') drawShape3D(o);","else if(o.kind==='shape3d'){if(!window.__WBVR_ACTIVE__)drawShape3D(o);}");
 const base='<base href="'+new URL('../beyaz-tahta/',location.href).href+'">';
 return html.replace('<head>','<head>'+base);
}
async function boot(){
 const response=await fetch('../beyaz-tahta/index.html',{cache:'no-store'});
 if(!response.ok)throw Error('Beyaz Tahta yüklenemedi ('+response.status+')');
 const doc=instrument(await response.text());
 await new Promise((resolve,reject)=>{
  const timer=setTimeout(()=>reject(Error('Beyaz Tahta başlatılamadı')),22000);
  frame.addEventListener('load',()=>{clearTimeout(timer);resolve()},{once:true});
  frame.srcdoc=doc;
 });
 W.frame=frame.contentWindow;W.api=W.frame.__WBVR_API__;
 if(!W.api)throw Error('Ortak nesne motoru bağlanamadı.');
 vrBtn.disabled=false;vrBtn.textContent="VR'ye gir";
}
function dispose(root){
 root?.traverse(o=>{
  o.geometry?.dispose();
  const mats=o.material?Array.isArray(o.material)?o.material:[o.material]:[];
  for(const m of mats){m.map?.dispose();m.dispose();}
 });
}
function label(text,w=.2,h=.083,fill='#eef3f9'){
 const canvas=document.createElement('canvas');canvas.width=512;canvas.height=160;
 const ctx=canvas.getContext('2d');
 ctx.fillStyle=fill;ctx.fillRect(0,0,512,160);
 ctx.font='bold '+(text.length>11?43:text.length>7?55:74)+'px system-ui';
 ctx.fillStyle='#1a304a';ctx.textAlign='center';ctx.textBaseline='middle';
 ctx.fillText(text,256,80,490);
 const tex=new THREE.CanvasTexture(canvas);tex.colorSpace=THREE.SRGBColorSpace;
 const obj=new THREE.Mesh(new THREE.PlaneGeometry(w,h),new THREE.MeshBasicMaterial({map:tex,transparent:true,side:THREE.DoubleSide,depthTest:false,depthWrite:false}));
 obj.renderOrder=15;return obj;
}
function left(){return W.controllers.find(c=>c.hand==='left')}
function right(){return W.controllers.find(c=>c.hand==='right')}
function rebuildMenu(){
 const old=W.menu;if(old){old.parent?.remove(old);dispose(old)}
 W.menuTargets=[];
 const group=new THREE.Group();W.menu=group;
 const bg=new THREE.Mesh(new THREE.PlaneGeometry(.68,.72),new THREE.MeshBasicMaterial({color:'#ffffff',side:THREE.DoubleSide,depthTest:false,depthWrite:false}));
 bg.position.z=-.01;group.add(bg);
 const pages=['tools','forms','more'];
 pages.forEach((name,i)=>{
  const m=label(tr(name),.212,.084,name===W.menuPage?'#ffe07a':'#e9eff5');
  m.position.set(-.225+i*.225,.291,.008);m.userData.action='page:'+name;
  group.add(m);W.menuTargets.push(m);
 });
 let entries;
 if(W.menuPage==='tools')entries=[['select','click:selectBtn'],['pen','click:penBtn'],['eraser','click:eraserBtn'],['undo','click:undoBtn'],['redo','click:redoBtn'],['snap','click:pointSnapBtn']];
 else if(W.menuPage==='forms')entries=[
 ['line','shape:line'],['rect','shape:rect'],['ellipse','shape:ellipse'],
 ['triangle','shape:triangle'],['pentagon','shape:pentagon'],['hexagon','shape:hexagon'],
 ['cube','shape:cube3d'],['sphere','shape:sphere3d'],['cylinder','shape:cylinder3d'],
 ['cone','shape:cone3d'],['pyramid','shape:pyramid3d'],['hexprism','shape:hexprism3d']];
 else entries=[['me','click:scopeMeBtn'],['everyone','click:scopeEveryoneBtn'],['grid','click:grid3DBtn'],
 ['lang','language'],['help','help'],['home','home'],['exit','exit']];
 entries.forEach(([name,action],i)=>{
  const m=label(tr(name),.208,.084);
  m.position.set(-.225+(i%3)*.225,.183-Math.floor(i/3)*.103,.009);
  m.userData.action=action;group.add(m);W.menuTargets.push(m);
 });
 const footer=label('v1.0.0',.15,.033,'#fff');footer.position.set(.21,-.326,.012);group.add(footer);
 const lc=left();if(lc?.controller)lc.controller.add(group);else W.scene.add(group);
 group.position.set(.145,.12,-.40);group.rotation.set(-.28,0,0);group.scale.setScalar(.82);group.visible=W.menuVisible;
}
function invoke(action){
 const doc=W.frame.document;
 if(action.startsWith('page:')){W.menuPage=action.slice(5);rebuildMenu();return}
 if(action.startsWith('click:')){doc.getElementById(action.slice(6))?.click();return}
 if(action.startsWith('shape:')){
  const select=doc.getElementById('shapeType'),add=doc.getElementById('addShape');
  if(!select||!add)return;
  select.value=action.slice(6);select.dispatchEvent(new W.frame.Event('change',{bubbles:true}));add.click();return;
 }
 if(action==='language'){W.lang=W.lang==='tr'?'de':W.lang==='de'?'en':'tr';rebuildMenu();return;}
 if(action==='home'){W.session?.end();location.href='../';return;}
 if(action==='help'){info('Sağ tetik: seç ve sürükle. Bézier noktalarını ve kollarını ışınla taşı. Sol X: menü. Sağ joystick: yürü. Sol joystick: dön.');return;}
 if(action==='exit')W.session?.end();
}
function createRenderer(){
 W.scene=new THREE.Scene();W.scene.background=new THREE.Color('#f9fbfe');
 W.camera=new THREE.PerspectiveCamera(70,innerWidth/innerHeight,.01,240);
 W.rig=new THREE.Group();W.rig.add(W.camera);W.scene.add(W.rig);
 W.scene.add(new THREE.HemisphereLight('#ffffff','#cfdbec',2.5));
 const sun=new THREE.DirectionalLight('#ffffff',2);sun.position.set(3,4,5);W.scene.add(sun);
 const floor=new THREE.Mesh(new THREE.PlaneGeometry(80,80),new THREE.MeshStandardMaterial({color:'#f8fafc',roughness:1}));
 floor.rotation.x=-Math.PI/2;floor.position.y=-.005;W.scene.add(floor);
 const floorGrid=new THREE.GridHelper(80,80,'#dce5ef','#eef2f6');floorGrid.position.y=.002;W.scene.add(floorGrid);
 W.renderer=new THREE.WebGLRenderer({antialias:true,alpha:true,powerPreference:'high-performance'});
 W.renderer.xr.enabled=true;W.renderer.xr.setReferenceSpaceType('local-floor');
 W.renderer.outputColorSpace=THREE.SRGBColorSpace;
 W.renderer.setPixelRatio(Math.min(devicePixelRatio||1,2));W.renderer.setSize(innerWidth,innerHeight);
 layer.appendChild(W.renderer.domElement);
 const s=W.api.snapshot();
 const boardWidth=5.2,boardHeight=boardWidth*s.height/Math.max(1,s.width);
 W.texture=new THREE.CanvasTexture(W.api.canvas());
 W.texture.colorSpace=THREE.SRGBColorSpace;W.texture.minFilter=THREE.LinearFilter;W.texture.magFilter=THREE.LinearFilter;
 W.texture.anisotropy=Math.min(4,W.renderer.capabilities.getMaxAnisotropy());
 W.board=new THREE.Mesh(new THREE.PlaneGeometry(boardWidth,boardHeight),new THREE.MeshBasicMaterial({map:W.texture,side:THREE.DoubleSide,transparent:true,depthWrite:false}));
 W.board.position.set(0,1.6,-2.3);W.board.renderOrder=3;W.scene.add(W.board);
 for(let i=0;i<2;i++){
  const controller=W.renderer.xr.getController(i);
  const source={hand:'',controller,input:null,laser:null};W.controllers.push(source);W.scene.add(controller);
  const laser=new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(),new THREE.Vector3(0,0,-1)]),new THREE.LineBasicMaterial({color:0x4868af,depthTest:false}));
  controller.add(laser);source.laser=laser;
  controller.addEventListener('connected',event=>{source.hand=event.data.handedness|| (i===0?'left':'right');source.input=event.data;if(source.hand==='left')rebuildMenu();});
  controller.addEventListener('disconnected',()=>{source.hand='';source.input=null;});
  controller.addEventListener('selectstart',()=>{if(source.hand==='right')onDown()});
  controller.addEventListener('selectend',()=>{if(source.hand==='right')onUp()});
 }
 W.dot=new THREE.Mesh(new THREE.SphereGeometry(.012,10,8),new THREE.MeshBasicMaterial({color:0xffc92b,depthTest:false}));
 W.dot.renderOrder=20;W.scene.add(W.dot);rebuildMenu();
}
function worldRay(controller){
 controller.updateWorldMatrix(true,false);
 return new THREE.Ray(controller.getWorldPosition(new THREE.Vector3()),new THREE.Vector3(0,0,-1).applyQuaternion(controller.getWorldQuaternion(new THREE.Quaternion())).normalize());
}
function getAim(){
 const rc=right()?.controller;if(!rc)return null;
 const ray=worldRay(rc);W.raycaster.ray.copy(ray);W.raycaster.near=.01;W.raycaster.far=30;
 const menu=W.menu?.visible?W.raycaster.intersectObjects(W.menuTargets,false):[];
 if(menu[0])return {type:'menu',hit:menu[0],ray};
 const board=W.raycaster.intersectObject(W.board,false)[0];
 const models=W.raycaster.intersectObjects(W.models,false);
 if(models[0]&&(!board||models[0].distance<board.distance)&&!W.drag)return {type:'model',hit:models[0],ray};
 if(board){
  const p=W.board.worldToLocal(board.point.clone()),params=W.board.geometry.parameters;
  return {type:'board',hit:board,ray,uv:{u:Math.max(0,Math.min(1,p.x/params.width+.5)),v:Math.max(0,Math.min(1,.5-p.y/params.height))}};
 }
 return {type:'empty',hit:models[0],ray};
}
function pointer(type,uv){
 if(!uv)return;
 const canvas=W.api.canvas(),rect=canvas.getBoundingClientRect();
 const x=rect.left+uv.u*rect.width,y=rect.top+uv.v*rect.height;
 const evt=new W.frame.PointerEvent(type,{bubbles:true,cancelable:true,pointerType:'mouse',pointerId:21,isPrimary:true,
  clientX:x,clientY:y,screenX:x,screenY:y,button:type==='pointermove'?-1:0,buttons:type==='pointerup'?0:1,pressure:type==='pointerup'?0:.5});
 canvas.dispatchEvent(evt);
}
function onDown(){
 const a=getAim();if(!a)return;
 if(a.type==='menu'){invoke(a.hit.object.userData.action);return}
 if(a.type==='board'){W.drag=true;W.lastUV=a.uv;pointer('pointerdown',a.uv);return}
 if(a.type==='model'){
  const index=a.hit.object.userData.modelIndex,start=W.api.beginModel(index);
  if(start){W.editModel={index,start,position:a.hit.point.clone()};W.drag=true}
 }
}
function onUp(){
 if(W.drag&&!W.editModel)pointer('pointerup',W.lastUV);
 W.drag=false;W.lastUV=null;W.editModel=null;
}
function moveModel(ray){
 const edit=W.editModel;if(!edit)return;
 const p=ray.intersectPlane(new THREE.Plane(new THREE.Vector3(0,0,1),-edit.position.z),new THREE.Vector3());
 if(!p)return;
 const s=W.api.snapshot(),scale=W.board.geometry.parameters.width*s.viewZoom/Math.max(1,s.width);
 const dx=(p.x-edit.position.x)/scale,dy=-(p.y-edit.position.y)/scale;
 W.api.moveModel(edit.index,{x:edit.start.x+dx,y:edit.start.y+dy,z:edit.start.z});
}
function updateAim(){
 const a=getAim(),rightC=right();if(!rightC)return;
 rightC.laser.scale.z=Math.min(15,a?.hit?.distance||2.3);
 W.dot.visible=!!a?.hit;
 if(a?.hit)W.dot.position.copy(a.hit.point);
 if(!W.drag)return;
 if(W.editModel){moveModel(worldRay(rightC.controller));return;}
 // Once a drag starts, tracking stays on the drawing plane even when
 // the pointer crosses an object, UI panel, or empty space.
 const ray=worldRay(rightC.controller);
 const plane=new THREE.Plane(new THREE.Vector3(0,0,1),-W.board.position.z);
 const p=ray.intersectPlane(plane,new THREE.Vector3());if(!p)return;
 const local=W.board.worldToLocal(p),geom=W.board.geometry.parameters;
 const uv={u:Math.max(0,Math.min(1,.5+local.x/geom.width)),v:Math.max(0,Math.min(1,.5-local.y/geom.height))};
 W.lastUV=uv;pointer('pointermove',uv);
}
function sticks(input){
 const axes=input?.gamepad?.axes||[];
 const x=axes.length>=4?axes[2]:(axes[0]||0);
 const y=axes.length>=4?axes[3]:(axes[1]||0);
 return [Math.abs(x)>.18?x:0,Math.abs(y)>.18?y:0];
}
function moveViewer(dt){
 const l=left(),r=right();
 const buttons=l?.input?.gamepad?.buttons||[];
 const pushed=!!buttons[4]?.pressed;
 if(pushed&&!W.xLast){W.menuVisible=!W.menuVisible;if(W.menu)W.menu.visible=W.menuVisible;}
 W.xLast=pushed;
 const [lx]=sticks(l?.input),[rx,ry]=sticks(r?.input);
 W.rig.rotation.y-=lx*dt*1.3;
 const q=W.renderer.xr.getCamera(W.camera).quaternion;
 const ahead=new THREE.Vector3(0,0,-1).applyQuaternion(q);ahead.y=0;ahead.normalize();
 const side=new THREE.Vector3().crossVectors(ahead,new THREE.Vector3(0,1,0)).normalize();
 W.rig.position.addScaledVector(ahead,-ry*dt*1.6).addScaledVector(side,rx*dt*1.6);
}
function modelMesh(entry,s){
 const gdata=W.api.geometry(entry.index);if(!gdata)return null;
 const record=entry.record,base=gdata.points||[],faces=gdata.geo.faces||[];
 const meter=W.board.geometry.parameters.width*s.viewZoom/Math.max(1,s.width);
 const pos=[];
 for(const face of faces)for(let i=1;i<face.length-1;i++){
  const a=base[face[0]],b=base[face[i]],c=base[face[i+1]];
  if(!a||!b||!c)continue;
  for(const p of [a,b,c])pos.push(p.x*meter,-p.y*meter,p.z*meter);
 }
 let mesh;
 if(pos.length>=9){
  const geometry=new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute(pos,3));geometry.computeVertexNormals();
  mesh=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color:record.fillColor3D||'#8cb9df',side:THREE.DoubleSide,transparent:true,opacity:.82}));
 }else{
  const sx=Math.max(.02,(record.sizeX||120)*meter),sy=Math.max(.02,(record.sizeY||120)*meter),sz=Math.max(.02,(record.sizeZ||120)*meter);
  let geometry;
  if(record.shape3dType==='sphere')geometry=new THREE.SphereGeometry(.5,24,16);
  else if(record.shape3dType==='cylinder')geometry=new THREE.CylinderGeometry(.5,.5,1,28);
  else if(record.shape3dType==='cone')geometry=new THREE.ConeGeometry(.5,1,28);
  else geometry=new THREE.BoxGeometry(1,1,1);
  mesh=new THREE.Mesh(geometry,new THREE.MeshStandardMaterial({color:record.fillColor3D||'#8cb9df',side:THREE.DoubleSide}));
  mesh.scale.set(sx,sy,sz);
 }
 const x=(Number(record.center?.x)||0)*s.viewZoom+s.viewX;
 const y=(Number(record.center?.y)||0)*s.viewZoom+s.viewY;
 const gw=W.board.geometry.parameters.width,gh=W.board.geometry.parameters.height;
 mesh.position.set((x/s.width-.5)*gw,W.board.position.y+(.5-y/s.height)*gh,W.board.position.z+(Number(record.centerZ)||0)*meter);
 mesh.userData.modelIndex=entry.index;return mesh;
}
function syncModels(now){
 if(now-W.lastModels<200)return;W.lastModels=now;
 const s=W.api.snapshot(),sig=JSON.stringify(s.models)+[s.viewX,s.viewY,s.viewZoom].join(':');
 if(sig===W.modelSignature)return;
 W.modelSignature=sig;
 for(const m of W.models){W.scene.remove(m);dispose(m);}W.models=[];
 for(const entry of s.models)try{
  const mesh=modelMesh(entry,s);
  if(mesh){W.models.push(mesh);W.scene.add(mesh);}
 }catch(e){console.warn('3D nesne dönüştürülemedi',e);}
}
function drawFrame(){
 if(!W.active)return;
 moveViewer(Math.min(.05,W.clock.getDelta()));
 updateAim();
 const now=performance.now();
 if(now-W.lastTexture>80){W.texture.needsUpdate=true;W.lastTexture=now;}
 syncModels(now);
 W.renderer.render(W.scene,W.camera);
}
function cleanup(){
 if(!W.active&&!W.renderer)return;
 if(W.drag)onUp();
 W.active=false;
 if(W.frame?.__WBVR_API__){W.frame.__WBVR_ACTIVE__=false;W.api.redraw();}
 W.renderer?.setAnimationLoop(null);
 if(W.scene)dispose(W.scene);
 W.renderer?.dispose();
 layer.replaceChildren();layer.style.display='none';
 W.renderer=null;W.scene=null;W.session=null;W.models=[];W.controllers=[];
 W.texture=null;W.menu=null;W.board=null;W.drag=false;W.editModel=null;
 W.modelSignature='';W.lastModels=0;W.lastTexture=0;
}
async function enter(){
 if(!W.api||W.active)return;
 if(!navigator.xr?.requestSession){info('Tarayıcı WebXR VR modunu desteklemiyor.');return}
 let session;
 try{
  // Request from direct button click before awaiting anything else.
  const request=navigator.xr.requestSession('immersive-vr',{requiredFeatures:['local-floor']});
  session=await request;
  W.session=session;W.active=true;
  W.frame.__WBVR_ACTIVE__=true;W.api.redraw();
  layer.style.display='block';createRenderer();
  session.addEventListener('end',cleanup,{once:true});
  await W.renderer.xr.setSession(session);
  W.clock.start();
  W.renderer.setAnimationLoop(drawFrame);
 }catch(e){
  info('VR oturumu açılamadı: '+(e?.message||e));
  if(session)try{await session.end()}catch(_){}
  cleanup();
 }
}
vrBtn.addEventListener('click',enter);
window.addEventListener('resize',()=>{if(W.renderer){W.camera.aspect=innerWidth/innerHeight;W.camera.updateProjectionMatrix();W.renderer.setSize(innerWidth,innerHeight);}});
boot().catch(e=>{console.error(e);vrBtn.textContent='Bağlantı hatası';info(e.message)});
