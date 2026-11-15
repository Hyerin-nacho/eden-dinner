/* 모바일: '클릭' 문구 → '터치', 사건 개요 접기·펼치기 */
(()=>{ try{
  if(!window.__MOBILE) return;
  const fix=t=>t.replace(/클릭해서/g,"눌러서").replace(/클릭하세요/g,"터치하세요").replace(/클릭/g,"터치");
  const walk=n=>{ if(n.nodeType===3){ if(n.nodeValue.includes("클릭")) n.nodeValue=fix(n.nodeValue); return; }
    if(n.nodeType!==1||n.tagName==="SCRIPT"||n.tagName==="STYLE") return; for(const c of n.childNodes) walk(c); };
  walk(document.body);
  try{ new MutationObserver(ms=>{ for(const m of ms){ if(m.type==="characterData") walk(m.target); else m.addedNodes.forEach(walk); } }).observe(document.body,{subtree:true,childList:true,characterData:true}); }catch(e){}
  const br=document.querySelector(".hud .brief");
  if(br){ br.setAttribute("role","button"); br.tabIndex=0;
    const tg=e=>{ e.stopPropagation(); e.preventDefault(); br.classList.toggle("open"); };
    br.addEventListener("pointerdown",e=>e.stopPropagation()); br.addEventListener("click",tg); }
}catch(e){ console.warn("mobile more",e); } })();
