/* 카메라 창 배경 흐림: 맨 앞에 잡힌 사람만 또렷하게, 뒤는 흐리게
   - 손 인식이 먼저다: 손 인식은 원래 카메라 화면을 그대로 쓰고, 사람 영역 인식은 손 인식이 쉬는 틈에 1초에 몇 번만 돌린다
     (손 인식이 느려지면 흐림 쪽을 더 줄인다 → 돌리기·집기가 밀리지 않게)
   - 그리기는 가볍게: 작은 화면(가로 400)에서, 흐림은 아주 작게 줄였다 키우는 방식(필터 없음), 앞사람 고르기는 새 결과가 올 때만
   - 사람 영역은 MediaPipe Selfie Segmentation(일반 모델). 여러 사람이면 가장 큰(=가장 앞) 덩어리만 남긴다
   - ?blur=0 이면 끈다. 모델을 못 불러오면 원래 화면을 그대로 보여 준다 */
(()=>{ try{
  if(typeof CAMHUB==="undefined"||window.__MOBILE) return;
  if(new URLSearchParams(location.search).get("blur")==="0") return;
  const D=Object.getOwnPropertyDescriptor(HTMLMediaElement.prototype,"srcObject");
  const src=document.createElement("video"); src.muted=true; src.playsInline=true; src.autoplay=true;
  const OW=400;
  const c=document.createElement("canvas"), g=c.getContext("2d"); c.width=OW; c.height=300;          // 내보내는 화면
  const b=document.createElement("canvas"), bg=b.getContext("2d"); b.width=24; b.height=18;          // 흐림용(아주 작게)
  const md=document.createElement("canvas"), mdg=md.getContext("2d"); md.width=96; md.height=72;      // 줄이고 키울 때 거치는 중간 크기(계단 무늬 없이 부드럽게)
  const m=document.createElement("canvas"), mg=m.getContext("2d"); m.width=OW; m.height=300;         // 사람만 오려 낸 화면
  const k=document.createElement("canvas"), kg=k.getContext("2d",{willReadFrequently:true}); k.width=64; k.height=48;   // 앞사람 마스크
  let raw=null, out=null, seg=null, segLoad=null, busy=false, loopOn=false, haveMask=false, lastSeg=0, segFrame=null, blurOff=false, slowSince=0;
  const loadJS=s=>new Promise((ok,no)=>{ const t=document.createElement("script"); t.src=s; t.crossOrigin="anonymous"; t.onload=ok; t.onerror=no; document.head.appendChild(t); });
  const V="0.1.1675465747";
  const loadSeg=()=>segLoad||(segLoad=(async()=>{
    if(!window.SelfieSegmentation) await loadJS(`https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@${V}/selfie_segmentation.js`);
    const s=new SelfieSegmentation({locateFile:f=>`https://cdn.jsdelivr.net/npm/@mediapipe/selfie_segmentation@${V}/${f}`});
    s.setOptions({modelSelection:0, selfieMode:false});
    s.onResults(r=>{ try{ frontMask(r.segmentationMask); haveMask=true; }catch(e){} });
    await s.initialize(); seg=s; })().catch(e=>{ console.warn("cam blur off",e); seg=null; }));
  /* 새 결과가 올 때만: 마스크에서 가장 큰 덩어리(앞사람)만 남긴다 */
  function frontMask(mask){
    const W=64,H=48,n=W*H; kg.globalCompositeOperation="copy"; kg.drawImage(mask,0,0,W,H);
    const d=kg.getImageData(0,0,W,H), px=d.data, lab=new Int32Array(n), on=i=>px[i*4]>100;
    let best=0, bestSize=0, id=0; const st=[];
    for(let i=0;i<n;i++){ if(lab[i]||!on(i)) continue; id++; let size=0; st.push(i); lab[i]=id;
      while(st.length){ const p=st.pop(); size++; const x=p%W, y=(p/W)|0;
        if(x>0&&!lab[p-1]&&on(p-1)){ lab[p-1]=id; st.push(p-1); } if(x<W-1&&!lab[p+1]&&on(p+1)){ lab[p+1]=id; st.push(p+1); }
        if(y>0&&!lab[p-W]&&on(p-W)){ lab[p-W]=id; st.push(p-W); } if(y<H-1&&!lab[p+W]&&on(p+W)){ lab[p+W]=id; st.push(p+W); } }
      if(size>bestSize){ bestSize=size; best=id; } }
    const al=new Uint8ClampedArray(n); for(let i=0;i<n;i++) al[i]=(lab[i]===best&&best>0)?Math.min(255,px[i*4]*1.4):0;
    // 살짝 넓힌다(1칸): 인식이 띄엄띄엄이라 움직일 때 가장자리가 흐려지지 않게
    for(let i=0;i<n;i++){ const x=i%W, y=(i/W)|0; let v=al[i]; if(x>0) v=Math.max(v,al[i-1]); if(x<W-1) v=Math.max(v,al[i+1]); if(y>0) v=Math.max(v,al[i-W]); if(y<H-1) v=Math.max(v,al[i+W]);
      px[i*4]=px[i*4+1]=px[i*4+2]=255; px[i*4+3]=v; }
    kg.putImageData(d,0,0); }
  function paint(){
    const vw=src.videoWidth, vh=src.videoHeight; if(!vw||!vh) return;
    const W=OW, H=Math.round(OW*vh/vw); if(c.height!==H){ c.height=m.height=H; }
    if(blurOff||!seg||!haveMask){ g.globalCompositeOperation="copy"; g.drawImage(src,0,0,W,H); return; }
    // 뒤: 아주 작게 줄였다가 키워서 흐리게, 살짝 어둡게
    mdg.globalCompositeOperation="copy"; mdg.drawImage(src,0,0,md.width,md.height); bg.globalCompositeOperation="copy"; bg.drawImage(md,0,0,b.width,b.height);
    mdg.drawImage(b,0,0,md.width,md.height);
    g.globalCompositeOperation="copy"; g.imageSmoothingEnabled=true; g.imageSmoothingQuality="high"; g.drawImage(md,0,0,W,H);
    g.globalCompositeOperation="source-over"; g.fillStyle="rgba(0,0,0,.18)"; g.fillRect(0,0,W,H);
    // 앞사람: 마스크(부드럽게 키운 것)로 또렷한 화면을 오려 얹는다
    mg.globalCompositeOperation="copy"; mg.imageSmoothingEnabled=true; mg.drawImage(k,0,0,W,H);
    // 손은 항상 또렷하게: 손 인식 위치(가장 최근 것)를 넉넉히 감싸 마스크에 더한다 (빨리 움직이는 손이 흐려지지 않게)
    if(lastLm&&performance.now()-lastLmT<400){ let x0=1,y0=1,x1=0,y1=0; lastLm.forEach(q=>{ x0=Math.min(x0,q.x); y0=Math.min(y0,q.y); x1=Math.max(x1,q.x); y1=Math.max(y1,q.y); });
      const pw=(x1-x0)*.45+.04, ph=(y1-y0)*.45+.04, cx=(x0+x1)/2*W, cy=(y0+y1)/2*H, rx=((x1-x0)/2+pw)*W, ry=((y1-y0)/2+ph)*H;
      mg.globalCompositeOperation="source-over"; const gr=mg.createRadialGradient(cx,cy,0,cx,cy,1); gr.addColorStop(0,"#fff"); gr.addColorStop(.75,"#fff"); gr.addColorStop(1,"rgba(255,255,255,0)");
      mg.save(); mg.translate(cx,cy); mg.scale(rx,ry); mg.translate(-cx,-cy); mg.fillStyle=gr; mg.beginPath(); mg.arc(cx,cy,1,0,6.283); mg.fill(); mg.restore(); }
    mg.globalCompositeOperation="source-in"; mg.drawImage(src,0,0,W,H);
    g.drawImage(m,0,0); }
  function loop(){
    if(!raw||!raw.active){ loopOn=false; return; }
    paint();
    // 사람 영역 인식: 손 인식이 빠를 땐 1초에 약 8번, 느려지면 3~4번
    const now=performance.now(), hc=CAMHUB.cost||14, every=hc>30?300:hc>20?200:125;
    // 느린 기기: 손 인식 한 번에 35ms 넘게 걸리는 상태가 3초 이어지면 흐림을 끄고 원래 화면으로(돌리기·집기가 먼저)
    if(hc>35){ if(!slowSince) slowSince=now; else if(now-slowSince>3000&&!blurOff){ blurOff=true; console.info("cam blur: 느린 기기라 배경 흐림을 껐습니다"); } } else slowSince=0;
    if(!blurOff&&seg&&!busy&&src.readyState>=2&&now-lastSeg>=every){ lastSeg=now; busy=true;
      seg.send({image:src}).catch(()=>{}).finally(()=>{ busy=false; }); }
    setTimeout(loop,40); }
  function processed(s){
    if(!s) return null;
    if(s===raw&&out) return out;
    raw=s; haveMask=false; D.set.call(src,s); src.play().catch(()=>{});
    if(!out) out=c.captureStream(25);
    loadSeg();
    if(!loopOn){ loopOn=true; loop(); }
    return out; }
  const hook=el=>{ if(!el||el.__camBlur) return; el.__camBlur=1; let cur=null;
    Object.defineProperty(el,"srcObject",{configurable:true, get(){ return cur; },
      set(s){ cur=s; D.set.call(el,s?processed(s):null); }}); };
  let lastLm=null, lastLmT=0; const ot=CAMHUB.tap;
  CAMHUB.tap=lm=>{ if(lm){ lastLm=lm; lastLmT=performance.now(); } return ot&&ot(lm); };
  const ob=CAMHUB.bind.bind(CAMHUB);
  CAMHUB.bind=el=>{ hook(el); return ob(el); };
}catch(e){ console.warn("cam blur",e); } })();
