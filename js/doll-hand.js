/* 의자 밑 인형: 손으로 한다 — ① 카메라 쪽으로 손을 쭉 뻗으면 '의자 밑으로 손 뻗기' ② 엄지·검지로 집으면 '인형 집어 들기'.
   (그 다음 인형을 돌려 등의 스피커를 집는 단계는 위쪽 3D 살펴보기 손 조작이 맡는다) */
(()=>{
 const pf=CAMHUB.pinchFilter(); let base=null, hold=0, pn=0;
 const q=s=>document.querySelector(s);
 const when=()=>mode==="closeup"&&CU&&CU.s.id==="doll"&&!found.has("doll")&&!DV&&!$("book").classList.contains("open");
 const hint=t=>{ window.__excamHint&&window.__excamHint(t); };
 const bar=(el,p)=>{ if(el) el.style.setProperty("--p",p.toFixed(3)); };
 CAMHUB.sub(lm=>{
   const rb=q("#cuLayer .reach"), hb=q("#cuLayer .hot")||q("#cuLayer .doll-lift button");
   if(!lm){ base=null; hold=0; pn=0; pf(null); bar(rb,0); hint("손바닥을 보여 주세요"); return; }
   if(rb){   // 손 뻗기: 손이 카메라에 가까워져 커 보이면 진행
     const sz=Math.hypot(lm[0].x-lm[9].x,lm[0].y-lm[9].y); if(base===null||sz<base) base=Math.max(sz,.05);
     const p=Math.max(0,Math.min(1,(sz/base-1)/.3)); bar(rb,p); hint("✋ 카메라 쪽으로 손을 쭉 뻗어라");
     if(p>=1){ if(++hold>1){ hold=0; base=null; rb.click(); } } else hold=0; return; }
   base=null; hold=0;
   if(hb){ const pinch=pf(lm); hint(pinch?"✊ 집는 중…":"✊ 엄지·검지로 집어라"); if(pinch){ if(++pn>=3){ pn=0; pf(null); hb.click(); } } else pn=0; } },when);
})();
