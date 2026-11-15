/* 손글씨(증거 쪽지·붉은 펜 메모)를 누르면 종이째로 크게 보여 준다. 아무 데나 누르거나 ESC로 닫힘 */
(function(){ let box=null;
  const close=()=>{ if(!box) return; const b=box; box=null; b.classList.remove("on"); setTimeout(()=>b.remove(),250); };
  document.addEventListener("click",e=>{ if(box) return; const el=e.target.closest(".b-body .note,.b-body .hand,.page .slip,.page .hand:not(.big)"); if(!el||el.closest(".lensbox")) return;
    e.preventDefault(); e.stopPropagation(); box=document.createElement("div"); box.className="hwz"; const pp=document.createElement("div"); pp.className="hwz-p"; const c=el.cloneNode(true); c.classList.remove("faint"); pp.appendChild(c); box.appendChild(pp);
    box.insertAdjacentHTML("beforeend","<small>CLICK · ESC 닫기</small>"); box.onclick=close; document.body.appendChild(box); requestAnimationFrame(()=>box&&box.classList.add("on")); try{ paper(); }catch(_){} },true);
  document.addEventListener("keydown",e=>{ if(box&&(e.key==="Escape"||e.key==="Esc")){ e.preventDefault(); e.stopImmediatePropagation(); close(); } },true);
})();
