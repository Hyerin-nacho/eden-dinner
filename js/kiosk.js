/* 전시용: 맨 마지막 화면(엔딩)에서 3분 동안 아무 조작이 없으면 조용히 처음 화면으로 돌아간다. 예고·카운트다운 없음.
   끄려면 주소에 ?kiosk=0, 시간을 바꾸려면 ?idle=초 (예: ?idle=300) */
(()=>{ try{
  const q=new URLSearchParams(location.search); if(q.get("kiosk")==="0") return;
  const LIMIT=Math.max(5,+q.get("idle")||180)*1000; let last=performance.now(), was=false;
  const poke=()=>{ last=performance.now(); };
  ["pointerdown","pointermove","keydown","wheel","touchstart"].forEach(ev=>addEventListener(ev,poke,{passive:true,capture:true}));
  setInterval(()=>{ try{ const end=(typeof mode!=="undefined"&&mode==="end"), now=performance.now();
    if(!end||document.hidden){ last=now; was=end; return; } if(!was){ last=now; was=true; }
    const playing=[...document.querySelectorAll("video")].some(v=>!v.paused&&!v.ended&&!v.loop&&v.currentTime>0&&v.offsetParent!==null); if(playing){ last=now; return; }
    if(now-last>=LIMIT) location.replace(location.pathname);
  }catch(e){} },1000);
}catch(e){} })();
