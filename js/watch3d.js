/* 회중시계 3D: 받은 모델로 그림을 대신한다. 드래그·손 인식으로 돌린 각도를 그대로 받아 그린다. 모델을 못 읽으면 원래 그림을 쓴다 */
(()=>{ const relic=document.getElementById("proRelic"); if(!relic) return; let st=null, ready=false, ry=0, rx=0;
  const mount=()=>{ if(st||!window.THREE||!THREE.GLTFLoader) return; const wrap=document.createElement("div"); wrap.className="r3d"; relic.appendChild(wrap);
    const R=new THREE.WebGLRenderer({antialias:true,alpha:true}); R.outputEncoding=THREE.sRGBEncoding; R.physicallyCorrectLights=true; R.toneMapping=THREE.ACESFilmicToneMapping; R.setPixelRatio(Math.min(devicePixelRatio,1.5)); wrap.appendChild(R.domElement);
    const S=new THREE.Scene(), C=new THREE.PerspectiveCamera(28,1,.01,20); C.position.set(0,0,3.1); C.lookAt(0,0,0);
    try{ S.environment=exEnv(R); }catch(e){}
    S.add(new THREE.HemisphereLight(0xffe7c4,0x1a1208,.7)); const key=new THREE.PointLight(0xffd6a0,26,8,1.6); key.position.set(1.2,1.4,2); S.add(key); const rim=new THREE.PointLight(0xa8c4b0,6,8,1.6); rim.position.set(-1.6,.6,-1.2); S.add(rim);
    const P=new THREE.Group(); S.add(P); st={R,S,C,P,wrap};
    new THREE.GLTFLoader().load("watch3d.json",g=>{ const m=g.scene, b=new THREE.Box3().setFromObject(m), c=b.getCenter(new THREE.Vector3()), sz=b.getSize(new THREE.Vector3()); m.position.sub(c); const k=1.25/sz.y; m.scale.setScalar(k); m.position.multiplyScalar(k); P.add(m); ready=true; relic.classList.add("has3d"); },undefined,()=>{ wrap.remove(); st=null; });
    const loop=()=>{ if(!st) return; const w=wrap.clientWidth,h=wrap.clientHeight; if(w&&h&&R.domElement.width!==Math.round(w*R.getPixelRatio())){ R.setSize(w,h,false); C.aspect=w/h; C.updateProjectionMatrix(); }
      if(ready&&relic.offsetParent){ P.rotation.set(rx*Math.PI/180,ry*Math.PI/180,0); R.render(S,C); } requestAnimationFrame(loop); }; loop(); };
  window.__relic3d=(y,x)=>{ ry=y; rx=x; if(!st) mount(); return ready; };
})();
