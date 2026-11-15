/* 질문 화면: 소리를 풍성하게 (모두 실제 녹음)
   - 열차는 여전히 달린다: 객차 실내음·열차 울림이 낮게 깔린다
   - 도장이 찍힐 때 쿵, 시계가 21:48로 넘어갈 때 판 넘기는 소리
   - 질문이 뜰 때 느린 심장 박동 두 번, 둘째 줄에 먼 객차 삐걱임 */
(()=>{ try{
  const again=document.getElementById("againBtn");
  const bed=[];
  const loopIn=(src,vol,ms)=>{ try{ if(typeof soundOn!=="undefined"&&!soundOn) return; const a=new Audio(src); a.loop=true; a.volume=0; a.play().catch(()=>{}); bed.push(a);
      const t0=performance.now(), iv=setInterval(()=>{ const k=Math.min(1,(performance.now()-t0)/ms); a.volume=vol*k; if(k>=1) clearInterval(iv); },60); }catch(e){} };
  const bedStop=()=>{ bed.splice(0).forEach(a=>{ const v0=a.volume, t0=performance.now(), iv=setInterval(()=>{ const k=Math.min(1,(performance.now()-t0)/500); a.volume=v0*(1-k); if(k>=1){ clearInterval(iv); a.pause(); } },50); }); };
  const fx=(n,v,ms)=>setTimeout(()=>{ try{ if(typeof mode!=="undefined"&&mode!=="end") return; SFX(n,v); }catch(e){} },ms);
  const orig=window.endSeq||endSeq;
  endSeq=function(){
    orig.apply(this,arguments);
    loopIn("sfx/carriage.mp3",.13,2500);       // 열차는 계속 달린다
    loopIn("sfx/rumble.mp3",.22,3000);
    fx("thud",.35,520);                         // 도장 쾅에 무게
    fx("flip",.32,2000);                        // 21:47 → 21:48
    fx("heart",.55,2750); fx("heart",.45,3420); // 질문이 뜰 때 심장 박동
    fx("woodcreak",.12,4200);                   // 둘째 줄: 먼 객차 삐걱임
    fx("heart",.35,6000); fx("heart",.28,6700);
  };
  if(again){ const o=again.onclick; again.onclick=e=>{ bedStop(); o&&o.call(again,e); }; }
}catch(e){ console.warn("ending more",e); } })();
