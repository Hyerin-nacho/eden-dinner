/* 타이틀 v2 : 증기·먼지 파티클 + 마우스 깊이감 */
(function(){
  const sc=document.querySelector('.pro .ps[data-s="start"]'), cv=document.getElementById("ttFx"); if(!sc||!cv) return;
  const g=cv.getContext("2d"), reduce=matchMedia("(prefers-reduced-motion:reduce)").matches;
  let W=0,H=0,D=1; const P=[];
  const fit=()=>{ const r=sc.getBoundingClientRect(); D=Math.min(1.5,devicePixelRatio||1); W=r.width; H=r.height; cv.width=Math.round(W*D); cv.height=Math.round(H*D); };
  const steam=()=>({k:0,x:Math.random()*W,y:H+Math.random()*H*.2,r:(.08+Math.random()*.14)*H,vx:(Math.random()-.5)*.15,vy:-(.12+Math.random()*.22),a:0,life:0,max:900+Math.random()*900});
  const dust=()=>({k:1,x:Math.random()*W,y:Math.random()*H,r:.6+Math.random()*1.6,vx:(Math.random()-.5)*.08,vy:(Math.random()-.5)*.06,ph:Math.random()*6.28,a:.25+Math.random()*.55});
  fit(); for(let i=0;i<9;i++){ const s=steam(); s.y=H*(.55+Math.random()*.5); s.life=Math.random()*s.max; P.push(s); } for(let i=0;i<35;i++) P.push(dust());
  addEventListener("resize",fit);
  sc.addEventListener("pointermove",e=>{ const r=sc.getBoundingClientRect(); sc.style.setProperty("--mx",((e.clientX-r.left)/r.width-.5).toFixed(3)); sc.style.setProperty("--my",((e.clientY-r.top)/r.height-.5).toFixed(3)); });
  let last=performance.now();
  (function tick(now){ requestAnimationFrame(tick);
    const on=sc.classList.contains("on")&&!sc.classList.contains("playing")&&!document.getElementById("pro")?.hidden;
    if(!on||reduce) return; const dt=Math.min(50,now-last); last=now;
    if(Math.abs(sc.getBoundingClientRect().width-W)>1) fit();
    const mx=+getComputedStyle(sc).getPropertyValue("--mx")||0;
    g.setTransform(1,0,0,1,0,0); g.clearRect(0,0,cv.width,cv.height); g.setTransform(D,0,0,D,0,0);
    for(let i=0;i<P.length;i++){ const p=P[i];
      if(p.k===0){ p.life+=dt; p.x+=p.vx*dt*.06; p.y+=p.vy*dt*.06; p.r+=dt*.004;
        const t=p.life/p.max, a=Math.sin(Math.min(1,t)*Math.PI)*.07; if(t>=1){ P[i]=steam(); continue; }
        const q=g.createRadialGradient(p.x,p.y,0,p.x,p.y,p.r); q.addColorStop(0,`rgba(240,214,170,${a})`); q.addColorStop(1,"rgba(240,214,170,0)"); g.fillStyle=q; g.fillRect(p.x-p.r,p.y-p.r,p.r*2,p.r*2); }
      else { p.ph+=dt*.0012; p.x+=(p.vx+Math.sin(p.ph)*.03)*dt*.06-mx*.02; p.y+=(p.vy+Math.cos(p.ph*.7)*.02)*dt*.06;
        if(p.x<-5) p.x=W+5; if(p.x>W+5) p.x=-5; if(p.y<-5) p.y=H+5; if(p.y>H+5) p.y=-5;
        g.fillStyle=`rgba(255,226,170,${(p.a*.45).toFixed(3)})`; g.beginPath(); g.arc(p.x,p.y,p.r,0,6.283); g.fill(); } } })(last);
})();
