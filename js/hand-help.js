/* 손 인식이 막힐 때 안내: 카메라가 켜져 있고, 캠 창 위 안내 문구가 10초 넘게 그대로면(=진행이 안 됨)
   "손이 잘 안 잡히면 마우스로 끌어도 돼요"를 덧붙인다. 안내 문구가 바뀌면(다음 단계) 저절로 사라진다 */
(()=>{ try{
  if(typeof CAMHUB==="undefined"||window.__MOBILE) return;
  const WAIT=10000, MSG="손이 잘 안 잡히면 마우스로 끌어도 돼요", ACT=/잡|돌리|돌려|끌|내리|내려|찢|집|기울/;
  const own=el=>{ let s=""; el.childNodes.forEach(n=>{ if(!(n.nodeType===1&&n.classList.contains("hh-help"))) s+=n.textContent; }); return s.trim(); };
  const seen=new Map();
  setInterval(()=>{ try{
    const live=["cam","hands","nohands"].includes(CAMHUB.state);
    document.querySelectorAll(".htag,.xhtag").forEach(el=>{
      const txt=own(el), now=performance.now(), r=seen.get(el);
      if(!r||r.txt!==txt){ seen.set(el,{txt,t:now}); el.querySelectorAll(".hh-help").forEach(x=>x.remove()); return; }
      const visible=el.offsetParent!==null&&ACT.test(txt)&&!/마우스/.test(txt);   // 손으로 무언가 해야 하는 안내일 때만(영상을 볼 때 등은 제외)
      if(live&&visible&&now-r.t>=WAIT&&!el.querySelector(".hh-help")){ const s=document.createElement("span"); s.className="hh-help"; s.textContent=MSG; el.appendChild(s); }
      if(!live||!visible) el.querySelectorAll(".hh-help").forEach(x=>x.remove());
    });
  }catch(e){} },1000);
}catch(e){ console.warn("hand help",e); } })();
