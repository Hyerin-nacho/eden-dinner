/* 카메라 창 꾸미기: 주사선·모서리·잡음·손 뼈대·상태 칩 (인식 자체는 CAMHUB가 한다. 여기서는 그리기만) */
(()=>{ try{
  if(typeof CAMHUB==="undefined") return;
  /* 잡음 무늬를 한 번 만들어 둔다 */
  { const c=document.createElement("canvas"); c.width=c.height=128; const g=c.getContext("2d"), d=g.createImageData(128,128);
    for(let i=0;i<d.data.length;i+=4){ const v=Math.random()*255|0; d.data[i]=d.data[i+1]=d.data[i+2]=v; d.data[i+3]=Math.random()<.5?255:120; }
    g.putImageData(d,0,0); document.documentElement.style.setProperty("--camNoise",`url(${c.toDataURL("image/png")})`); }
  const boxes=[document.getElementById("proCam"),document.querySelector(".excam"),document.getElementById("scrCam")].filter(Boolean);
  const parts=boxes.map(b=>{ b.classList.add("camfx");
    b.insertAdjacentHTML("beforeend",'<i class="cam-bar"></i><i class="cam-scan"></i><i class="cam-noise"></i><canvas class="cam-hand"></canvas><i class="cam-cn c-tl"></i><i class="cam-cn c-tr"></i><i class="cam-cn c-bl"></i><i class="cam-cn c-br"></i><span class="cam-id">CAM 01</span><span class="cam-chip">NO HAND</span>');
    return {b,cv:b.querySelector("canvas.cam-hand"),chip:b.querySelector(".cam-chip")}; });
  const shown=b=>b.classList.contains("on")&&b.offsetParent!==null;
  const kick=b=>{ b.classList.remove("boot"); void b.offsetWidth; b.classList.add("boot"); setTimeout(()=>b.classList.remove("boot"),1400); };
  /* 켜지는 순간(영상이 실제로 들어온 순간)에 치지직 */
  let prev="off", downs=false;
  CAMHUB.onState(st=>{ const live=st==="cam"||st==="hands"||st==="nohands", was=prev==="cam"||prev==="hands"||prev==="nohands";
    parts.forEach(({b,chip})=>{ b.classList.toggle("live",live); if(!live){ chip.className="cam-chip"; chip.textContent="NO HAND"; } });
    if(live&&!was) parts.forEach(({b})=>{ if(shown(b)) kick(b); });
    prev=st; if(!live) draw(null); });
  /* 창이 화면에 나타나는 순간에도(이미 카메라가 켜져 있을 때) 한 번 */
  parts.forEach(({b})=>{ b._wasOn=b.classList.contains("on"); try{ new MutationObserver(()=>{ const on=b.classList.contains("on"); if(on&&!b._wasOn&&b.classList.contains("live")) kick(b); b._wasOn=on; }).observe(b,{attributes:true,attributeFilter:["class"]}); }catch(e){} });
  /* 손 뼈대 */
  const BONES=[[0,1],[1,2],[2,3],[3,4],[0,5],[5,6],[6,7],[7,8],[5,9],[9,10],[10,11],[11,12],[9,13],[13,14],[14,15],[15,16],[13,17],[17,18],[18,19],[19,20],[0,17]], TIPS=[4,8,12,16,20];
  function draw(lm){ let pinch=false;
    if(lm){ try{ const r=CAMHUB.pinchRatio(lm); downs=downs?r<.62:r<.44; pinch=downs; }catch(e){} } else downs=false;
    parts.forEach(({b,cv,chip})=>{ if(!shown(b)) return;
      const w=cv.clientWidth, h=cv.clientHeight, dpr=Math.min(2,window.devicePixelRatio||1); if(!w||!h) return;
      if(cv.width!==Math.round(w*dpr)||cv.height!==Math.round(h*dpr)){ cv.width=Math.round(w*dpr); cv.height=Math.round(h*dpr); }
      const g=cv.getContext("2d"); g.setTransform(dpr,0,0,dpr,0,0); g.clearRect(0,0,w,h);
      chip.className="cam-chip"+(lm?(pinch?" grab":" hand"):""); chip.textContent=lm?(pinch?"GRAB":"HAND"):"NO HAND";
      if(!lm) return;
      const P=lm.map(q=>[(1-q.x)*w,q.y*h]);   // 화면이 좌우로 뒤집혀 보이므로 x를 뒤집는다
      const col=pinch?"rgba(255,120,104,.95)":"rgba(255,222,160,.95)";
      g.lineCap="round"; g.lineJoin="round"; g.shadowColor=pinch?"rgba(224,86,74,.9)":"rgba(255,200,120,.85)"; g.shadowBlur=6;
      g.strokeStyle=col; g.lineWidth=Math.max(1.2,w/150); g.beginPath(); BONES.forEach(([a,c])=>{ g.moveTo(P[a][0],P[a][1]); g.lineTo(P[c][0],P[c][1]); }); g.stroke();
      g.fillStyle="#fff6e2"; P.forEach(([x,y],i)=>{ g.beginPath(); g.arc(x,y,TIPS.includes(i)?Math.max(2.2,w/85):Math.max(1.3,w/150),0,6.283); g.fill(); });
      /* 엄지·검지 사이: 집기 판정을 눈으로 보이게 */
      g.setLineDash(pinch?[]:[3,3]); g.strokeStyle=pinch?"#ff7868":"rgba(255,255,255,.6)"; g.lineWidth=pinch?Math.max(2,w/90):1; g.beginPath(); g.moveTo(P[4][0],P[4][1]); g.lineTo(P[8][0],P[8][1]); g.stroke(); g.setLineDash([]);
      /* 손을 감싸는 꺾쇠 */
      let x0=1e9,y0=1e9,x1=-1e9,y1=-1e9; P.forEach(([x,y])=>{ x0=Math.min(x0,x); y0=Math.min(y0,y); x1=Math.max(x1,x); y1=Math.max(y1,y); }); const m=Math.max(4,w*.03), L=Math.max(5,w*.05); x0-=m; y0-=m; x1+=m; y1+=m;
      g.shadowBlur=0; g.strokeStyle=col; g.lineWidth=1.2; g.beginPath();
      [[x0,y0,1,1],[x1,y0,-1,1],[x0,y1,1,-1],[x1,y1,-1,-1]].forEach(([x,y,sx,sy])=>{ g.moveTo(x+sx*L,y); g.lineTo(x,y); g.lineTo(x,y+sy*L); }); g.stroke(); }); }
  CAMHUB.tap=draw;
}catch(e){ console.warn("camfx",e); } })();
