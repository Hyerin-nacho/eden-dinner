/* 타이틀 소리: 열리는 순간 열차가 '슝' 지나가는 소리 → 객차 덜컹거림이 이어서 깔림 → '시작하기'에 올리면 표 종이 소리.
   모두 실제 녹음(sfx/carriage·rumble·rustle)에서 잘라 만든 파일. 시작하기를 누르면 덜컹거림은 천천히 빠진다 */
(()=>{ try{
  const sc=document.querySelector('.pro .ps[data-s="start"]'), btn=document.getElementById("proStart"), pro=document.getElementById("pro");
  if(!sc||!btn) return;
  const mk=(src,vol,loop)=>{ const a=new Audio(src); a.preload="auto"; a.volume=vol; a.loop=!!loop; return a; };
  const whoosh=mk("sfx/title_in.mp3",.8), loop=mk("sfx/title_loop.mp3?v=2",0,true), hov=mk("sfx/title_hover.mp3",.5);
  let started=false, leaving=false, fadeT=0;
  const fadeTo=(a,to,ms)=>{ clearInterval(fadeT); const from=a.volume, t0=performance.now();
    fadeT=setInterval(()=>{ const k=Math.min(1,(performance.now()-t0)/ms); a.volume=Math.max(0,Math.min(1,from+(to-from)*k)); if(k>=1){ clearInterval(fadeT); if(to===0) a.pause(); } },40); };
  const onTitle=()=>typeof mode!=="undefined"&&mode==="title"&&!(pro&&pro.hidden);
  const begin=()=>{ if(started) return true; if(typeof soundOn!=="undefined"&&!soundOn) return false;
    started=true; try{ whoosh.currentTime=0; }catch(e){}
    const p=whoosh.play(); loop.volume=0; loop.play().catch(()=>{});
    setTimeout(()=>{ if(!leaving) fadeTo(loop,.6,1500); },650);   // 열차가 지나간 뒤 객차 덜컹거림이 이어진다
    return p; };
  /* 시작하기에 마우스를 올리면 표 종이 소리 */
  btn.addEventListener("pointerenter",()=>{ if(!started||leaving||btn.disabled) return; try{ const c=hov.cloneNode(); c.volume=.45; c.play().catch(()=>{}); }catch(e){} });
  /* 시작하기를 누르면 덜컹거림이 천천히 빠지고 콜드 오픈의 열차 소리로 넘어간다 */
  btn.addEventListener("click",()=>{ leaving=true; if(!started) return; fadeTo(loop,0,1600); },true);
  /* 다른 화면으로 넘어가면 꺼 둔다 */
  setInterval(()=>{ if(started&&!leaving&&!onTitle()){ leaving=true; fadeTo(loop,0,600); } },700);
  const init=()=>{ if(!onTitle()) return;
    sc.classList.add("tt-wait");
    const go=()=>{ sc.classList.remove("tt-wait"); };
    const p=/[?&]gate=1/.test(location.search)?Promise.reject():begin();   // ?gate=1 : 소리가 막힌 브라우저처럼 입장 화면을 시험
    if(p&&p.then){ p.then(go).catch(()=>{   // 소리가 막혀 있다 → 눌러서 입장
      started=false; try{ loop.pause(); }catch(e){}
      const g=document.createElement("div"); g.className="tt-gate"; g.setAttribute("role","button"); g.tabIndex=0;
      g.innerHTML="<b>CLICK TO BOARD</b><small>소리를 켜고 화면을 눌러 주세요</small>"; sc.appendChild(g);
      const enter=()=>{ g.removeEventListener("pointerdown",enter); removeEventListener("keydown",key,true); begin(); go(); g.classList.add("out"); setTimeout(()=>g.remove(),600); };
      const key=e=>{ if(e.key==="Enter"||e.key===" "){ e.preventDefault(); e.stopPropagation(); enter(); } };
      g.addEventListener("pointerdown",enter); addEventListener("keydown",key,true); try{ g.focus({preventScroll:true}); }catch(e){}
    }); } else go();
  };
  if(document.readyState==="complete") setTimeout(init,60); else addEventListener("load",()=>setTimeout(init,60),{once:true});
}catch(e){ console.warn("title sound",e); } })();
