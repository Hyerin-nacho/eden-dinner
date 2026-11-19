/* 살펴보기 중 웹캠 손 조작 (공용 카메라 허브)
   - 카메라는 손이 필요한 순간에만 켜진다: 단서를 찾는 3D 살펴보기, 조각상 들기, 의자 밑 인형.
     단서를 찾거나 화면을 벗어나면 잠시 뒤 자동으로 꺼지고, 방 둘러보기·수첩·심문에서는 켜지지 않는다.
   - 손을 좌우로 움직이면 돌아가고, 빛나는 표시가 뜨면 엄지·검지로 '집으면' 단서가 기록된다. 집으려고 손을 오므리는 동안은 물건이 멈춘다. */
(()=>{
 const I=$("insp"), box=document.createElement("div"); box.className="excam";
 box.innerHTML='<video playsinline muted autoplay></video><div class="off">카메라 연결 중…</div><div class="xtag">● REC</div><div class="xhtag"></div><i class="hcur"></i>';
 I.parentElement.appendChild(box);
 const v=box.querySelector("video"), off=box.querySelector(".off"), htag=box.querySelector(".xhtag"), cur=box.querySelector(".hcur");
 let base=null, pinchN=0; const pf=CAMHUB.pinchFilter();
 CAMHUB.bind(v);
 const bookOpen=()=>$("book").classList.contains("open");
 const examOpen=()=>I.classList.contains("exam")&&I.classList.contains("open")&&mode==="inspect";
 const needExam=()=>examOpen()&&((EX&&!EX.done)||(S3&&!S3.done));
 const needDoll=()=>mode==="closeup"&&CU&&CU.s.id==="doll"&&!found.has("doll");
 const needed=()=>!bookOpen()&&(needExam()||needDoll()||!!DV);
 const active=()=>needExam()||!!DV;                       // 이 스크립트가 직접 다루는 장면 (3D 살펴보기·인형)
 window.__excamHint=t=>{ htag.textContent=t; };
 CAMHUB.onState(st=>{ off.style.display=(st==="cam"||st==="hands"||st==="nohands")?"none":"flex"; off.textContent=st==="nocam"?"NO CAMERA":"카메라 연결 중…";
   box.classList.toggle("nocam",st==="nocam"); if(st==="nocam") htag.textContent="마우스로 끌어서 돌려 보세요"; else if(st==="nohands") htag.textContent="손 인식 불가 · 마우스로 돌려 보세요"; });
 const zoomTo=(o,sz)=>{ if(!base.sz){ base.sz=sz; base.z=o.zoom||1; } o.zoom=(o.zoom||1)+(Math.max(o===S3?.3:.22,Math.min(1.5,base.z*Math.pow(base.sz/sz,2.2)))-(o.zoom||1))*.25; };   // 손을 카메라에 가까이 대면 다가간다
 /* 손 떨림 제거(1€ 필터 방식): 천천히 움직일 땐 강하게, 빨리 움직일 땐 약하게 걸러 → 떨림은 없애고 반응은 유지 */
 const oneEuro=(minCut,beta)=>{ let x=null,dx=0,t=0; const a=(c,dt)=>{ const r=2*Math.PI*c*dt; return r/(r+1); };
   return (v,now)=>{ if(v===null){ x=null; return null; } if(x===null){ x=v; dx=0; t=now; return v; } const dt=Math.max(.001,(now-t)/1000); t=now;
     const d=(v-x)/dt; dx+=a(1,dt)*(d-dx); x+=a(minCut+beta*Math.abs(dx),dt)*(v-x); return x; }; };
 const fX=oneEuro(1.2,9), fY=oneEuro(1.2,9), fS=oneEuro(.8,4);
 function onRes(lm){
   if(!lm||!active()){ fX(null); fY(null); fS(null); cur.style.display="none"; base=null; pinchN=0; pf(null); if(S3) S3.hand=false; htag.textContent=active()?"손바닥을 보여 주세요":""; return; }
   const tnow=performance.now(), hx=fX(1-lm[9].x,tnow), hy=fY(lm[9].y,tnow); cur.style.display="block"; cur.style.left=hx*100+"%"; cur.style.top=hy*100+"%";
   const pinch=pf(lm), closing=CAMHUB.ratio<.75, sz=fS(Math.hypot(lm[0].x-lm[9].x,lm[0].y-lm[9].y),tnow);
   cur.classList.toggle("pinch",pinch);
   if(DV&&DV.wrap.classList.contains("chair")){   // 의자 밑 인형: 손을 아래로 내리면 그만큼 끌려 나온다
     if(DV.done){ base=null; return; }
     if(!base||base.chair!==1) base={hy,chair:1};
     const dy=hy-base.hy; base.hy=hy;
     if(dy>.002){ DV.p=Math.min(1,DV.p+dy*2.8); DV.mv=1; const n=performance.now(); if(n-(DV.sl||0)>900){ DV.sl=n; try{ SFX("slide",.3); }catch(e){} } }
     if(DV.p>.25) DV.auto=1;
     htag.textContent="✋ 손을 아래로 내려 인형을 끌어내기"; return; }
   const X=EX||DV;
   if(X){ if(X.drag||X.done){ base=null; return; } const CF=EX?EXAM[EX.s.id]:DV.cf;
     const sp=X.wrap.querySelector(".exspot.on");
     if(sp&&closing){   // 빛나는 단서가 보이는 상태에서 손을 오므리면: 물건을 멈추고 집기 판정
       base=null; htag.textContent=pinch?"✊ 집는 중…":"✊ 엄지·검지로 집어서 기록";
       if(pinch){ if(++pinchN>=3){ pinchN=0; pf(null); sp.click(); } } else pinchN=0; return; }
     pinchN=0;
     if(CAMHUB.ratio<.5){ base=null; htag.textContent="✊ 쥐면 멈춤 · 손을 펴면 이어서 돌리기"; return; }   // 클러치: 주먹을 쥐고 손을 옮긴 뒤 펴면, 물건은 그대로 두고 이어서 돌릴 수 있다
     if(!base||base.ty===undefined) base={hx,hy,ty:X.yaw,tp:X.pitch};
     { let dx=hx-base.hx, dy=hy-base.hy; base.hx=hx; base.hy=hy; const sp2=Math.hypot(dx,dy);
       if(sp2<.0015){ dx=0; dy=0; }                                  // 미세 떨림은 무시
       const g=6+Math.min(8,sp2*260);                                // 천천히 움직이면 정밀하게(6), 빠르게 움직이면 크게(최대 14) 돈다
       base.ty+=dx*g; base.tp=Math.max(CF.pitch[0],Math.min(CF.pitch[1],base.tp+dy*g*.4)); }
     X.yaw+=(base.ty-X.yaw)*.55; X.pitch+=(base.tp-X.pitch)*.55; zoomTo(X,sz);
     htag.textContent=sp?"✊ 엄지·검지로 집어서 기록":"✋ 움직여 돌리기 · 가까이 대면 확대"; }
   else if(S3){ if(S3.drag){ base=null; return; } if(!base||base.yaw===undefined) base={hx,hy,yaw:S3.yaw,py:hy}; S3.hand=true;
     S3.yaw+=(base.yaw+(hx-base.hx)*9-S3.yaw)*.35; zoomTo(S3,sz); htag.textContent=pinch?"✊ 집은 채 위로 들어 올리기":"✋ 손을 위로 올려 들기 · 집으면 더 빨리 · 좌우로 돌리기";
     if(!S3.done){ const up=Math.max(0,base.py-hy); base.py=hy;   // 손이 올라간 만큼 쌓인다 (손을 내렸다 다시 올려도 이어진다)
       S3.liftT=Math.max(0,Math.min(1,(S3.liftT||0)+up*(pinch?10:7)-.0025)); const bar=S3.wrap.querySelector(".v3bar i"); if(bar) bar.style.width=S3.liftT*100+"%"; if(S3.liftT>=1) S3.step(0); } }
 }
 CAMHUB.sub(onRes,active);
 CAMHUB.onState(st=>{ try{ window.__QHAND&&window.__QHAND(st==="hands"); }catch(e){} });   // 손 카메라가 켜진 동안 3D를 가볍게(quality.js)
 /* 카메라 켜기/끄기: 손이 필요한 순간에만 */
 let shown=false, idle=0, wasNeed=false;
 const sync=()=>{ const proOn=!$("pro").hidden;
   if(proOn){ if(shown){ shown=false; box.classList.remove("on"); } return; }   // 프롤로그 중엔 프롤로그의 웹캠 창이 맡는다
   const n=needed();
   if(n){ idle=0; if(!wasNeed&&!CAMHUB.on&&!CAMHUB.blocked) CAMHUB.start(true); }
   else if(CAMHUB.on){ if(!idle) idle=performance.now(); else if(performance.now()-idle>1500){ CAMHUB.stop(true); idle=0; } }
   wasNeed=n;
   const show=n&&(CAMHUB.on||CAMHUB.state==="connecting"||CAMHUB.state==="nocam");
   if(show!==shown){ shown=show; box.classList.toggle("on",show); base=null; } };
 window.__excam=sync; new MutationObserver(sync).observe(I,{attributes:true,attributeFilter:["class"]}); setInterval(sync,300);
 (function pre(){ if(mode==="title"||mode==="intro"){ setTimeout(pre,1500); return; } if(window.THREE&&THREE.GLTFLoader){ m3dLoad(M3D.statue.file,()=>{}); m3dLoad("bottle.json",()=>{}); m3dLoad("chair3d.glb",()=>{}); m3dLoad("rug3d.glb",()=>{}); ["pill","clock","rumble","slide","thud"].forEach(n=>{ try{ new Audio("sfx/"+n+".mp3").preload="auto"; }catch(e){} }); m3dLoad("doll3d.glb",()=>{}); m3dLoad("table3d.json",()=>{}); m3dLoad("bedside3d.glb",()=>{}); ["pro/exam_bg.jpg","wall_panel.jpg","bedside3d_lace.jpg"].forEach(u=>{ try{ new Image().src=u; }catch(e){} }); } else setTimeout(pre,800); })();   // 동상 모델 미리 받아 두기
})();
