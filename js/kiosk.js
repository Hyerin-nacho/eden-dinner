/* 전시용: 아무 조작이 3분 이상 없으면 조용히 처음 화면으로 돌아간다(어느 단계에서든). 예고·카운트다운 없음.
   - 마우스·키보드·터치, 그리고 손 카메라에서 손이 실제로 움직이는 것도 "조작"으로 본다(손을 가만히 들고만 있으면 조작 아님).
   - 영상(프롤로그·단서 영상·엔딩 영상)이 재생되는 동안은 세지 않는다. 맨 처음 타이틀 화면에서는 돌아갈 곳이 없어 세지 않는다.
   끄려면 주소에 ?kiosk=0, 시간을 바꾸려면 ?idle=초 (예: ?idle=300) */
(()=>{ try{
  const q=new URLSearchParams(location.search); if(q.get("kiosk")==="0") return;
  const LIMIT=Math.max(5,+q.get("idle")||180)*1000; let last=performance.now();
  const poke=()=>{ last=performance.now(); };
  ["pointerdown","pointermove","keydown","wheel","touchstart"].forEach(ev=>addEventListener(ev,poke,{passive:true,capture:true}));
  /* 손 카메라: 손끝(검지·손목)이 눈에 띄게 움직였을 때만 조작으로 인정 */
  let hx=null,hy=null;
  const hook=()=>{ try{ if(typeof CAMHUB==="undefined"||!CAMHUB.sub) return false;
    CAMHUB.sub(lm=>{ if(!lm){ hx=null; return; } const a=lm[8]||lm[0]; if(!a) return;
      if(hx!==null&&(Math.abs(a.x-hx)>.03||Math.abs(a.y-hy)>.03)){ poke(); hx=a.x; hy=a.y; } else if(hx===null){ hx=a.x; hy=a.y; } });
    return true; }catch(e){ return false; } };
  let tries=0; const iv0=setInterval(()=>{ if(hook()||++tries>20) clearInterval(iv0); },500);
  setInterval(()=>{ try{ const now=performance.now(); if(document.hidden){ last=now; return; }
    const m=(typeof mode!=="undefined")?mode:"", pro=document.getElementById("pro");
    if(m==="title"&&(!pro||pro.hidden)){ last=now; return; }   // 처음 타이틀 화면
    const playing=[...document.querySelectorAll("video")].some(v=>!v.paused&&!v.ended&&!v.loop&&v.currentTime>0&&v.offsetParent!==null); if(playing){ last=now; return; }
    if(now-last>=LIMIT) location.replace(location.pathname);
  }catch(e){} },1000);
}catch(e){} })();
