/* 분위기 v2: 오버레이 레이어를 깔고, 랜턴 빛이 마우스를 천천히 따라오게 */
(function(){ const st=document.getElementById("stage"); if(!st) return;
  const ref=st.querySelector(".hud")||null;
  ["warm","flick","fg","lamp","lb t","lb b"].forEach(c=>{ const d=document.createElement("div"); d.className="atm "+c; st.insertBefore(d,ref); });
  let tx=50,ty=55,cx=50,cy=55;
  st.addEventListener("pointermove",e=>{ const r=st.getBoundingClientRect(); tx=(e.clientX-r.left)/r.width*100; ty=(e.clientY-r.top)/r.height*100; });
  (function loop(){ if(document.hidden){ setTimeout(loop,200); return; } if(Math.abs(tx-cx)+Math.abs(ty-cy)>.03){ cx+=(tx-cx)*.07; cy+=(ty-cy)*.07; st.style.setProperty("--lx",cx.toFixed(2)+"%"); st.style.setProperty("--ly",cy.toFixed(2)+"%"); requestAnimationFrame(loop); } else { st.addEventListener("pointermove",loop,{once:true}); } })();
})();
