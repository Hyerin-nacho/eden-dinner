/* 모바일 판별: 손가락이 주 입력이고(hover 없음) 화면이 작은 기기. 주소 끝에 ?mobile=1 을 붙이면 PC에서도 모바일 동작을 시험할 수 있다 */
(()=>{ try{
  const q=new URLSearchParams(location.search), force=q.get("mobile");
  const touch=matchMedia("(pointer:coarse)").matches&&matchMedia("(hover:none)").matches;
  const small=Math.min(screen.width,screen.height)<=900;
  const MOBILE=force==="1"||(force!=="0"&&touch&&small);
  window.__MOBILE=MOBILE; if(!MOBILE) return;
  document.documentElement.classList.add("mobile");
  /* 문구: '마우스' → '손가락' (화면에 나타나는 글자만 바꾼다) */
  const fix=t=>t.replace(/마우스로 계속/g,"계속").replace(/마우스를\s*/g,"화면을 ").replace(/마우스로/g,"손가락으로").replace(/마우스/g,"손가락");
  const walk=n=>{ if(n.nodeType===3){ if(n.nodeValue.includes("마우스")) n.nodeValue=fix(n.nodeValue); return; }
    if(n.nodeType!==1||n.tagName==="SCRIPT"||n.tagName==="STYLE") return; for(const c of n.childNodes) walk(c); };
  walk(document.body);
  try{ new MutationObserver(ms=>{ for(const m of ms){ if(m.type==="characterData") walk(m.target); else m.addedNodes.forEach(walk); } }).observe(document.body,{subtree:true,childList:true,characterData:true}); }catch(e){}
  const fine=document.querySelector(".pro .consent .fine"); if(fine) fine.innerHTML="모바일에서는 카메라 없이<br>화면을 끌어서 진행합니다.";
  /* 가로 고정을 시도해 본다(지원하는 브라우저·전체화면에서만 된다. 안 되면 안내 화면이 대신한다) */
  const lock=()=>{ try{ screen.orientation&&screen.orientation.lock&&screen.orientation.lock("landscape").catch(()=>{}); }catch(e){} };
  addEventListener("pointerdown",lock,{once:true});
}catch(e){ console.warn("mobile",e); } })();
