/* 엔딩 화면 "한마디 남기기": 관람객이 남긴 말을 이 전시 PC(브라우저)에 저장한다.
   - 저장 위치: localStorage "orpheus_gb" (서버로 보내지 않음). 같은 PC·같은 브라우저에서 주소 끝에 ?guestbook=1 을 붙여 열면 목록 확인·내려받기(.txt)·모두 지우기.
   - 이름은 선택, 한마디는 최대 120자. 연타 방지로 한 번 남기면 같은 화면에서는 한 번만. */
(()=>{ try{
  const KEY="orpheus_gb", $=id=>document.getElementById(id);
  const load=()=>{ try{ return JSON.parse(localStorage.getItem(KEY)||"[]"); }catch(e){ return []; } };
  const save=a=>{ try{ localStorage.setItem(KEY,JSON.stringify(a)); return true; }catch(e){ return false; } };
  const esc=s=>String(s).replace(/[&<>"']/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
  const fmt=t=>{ const d=new Date(t), p=n=>String(n).padStart(2,"0"); return `${d.getFullYear()}-${p(d.getMonth()+1)}-${p(d.getDate())} ${p(d.getHours())}:${p(d.getMinutes())}`; };

  /* ----- 관리용 목록: ?guestbook=1 ----- */
  if(new URLSearchParams(location.search).get("guestbook")==="1"){
    addEventListener("DOMContentLoaded",()=>{ const a=load(), w=document.createElement("div"); w.className="gb-admin";
      w.innerHTML=`<div class="gb-box"><h2>한마디 목록 <small>${a.length}개 · 이 컴퓨터에 저장된 것</small></h2><ol>${a.map(x=>`<li><b>${esc(x.n||"익명")}</b> <i>${fmt(x.t)}</i><p>${esc(x.m)}</p></li>`).join("")||"<li><p>아직 없습니다.</p></li>"}</ol>
        <div class="gb-row"><button id="gbDl">내려받기(.txt)</button><button id="gbClr">모두 지우기</button><a href="./">게임으로</a></div></div>`;
      document.body.appendChild(w);
      $("gbDl").onclick=()=>{ const t=a.map(x=>`[${fmt(x.t)}] ${x.n||"익명"}: ${x.m}`).join("\n"), l=document.createElement("a"); l.href=URL.createObjectURL(new Blob(["﻿"+t],{type:"text/plain;charset=utf-8"})); l.download="orpheus_guestbook.txt"; l.click(); };
      $("gbClr").onclick=()=>{ if(confirm("저장된 한마디를 모두 지울까요? 되돌릴 수 없습니다.")){ save([]); location.reload(); } }; });
    return; }

  /* ----- 엔딩 화면의 입력창 ----- */
  const btn=$("noteBtn"), host=$("ending"); if(!btn||!host) return;
  let box=null;
  const close=()=>{ if(box){ box.remove(); box=null; } try{ $("againBtn").focus({preventScroll:true}); }catch(e){} };
  btn.addEventListener("click",()=>{ if(box) return;
    box=document.createElement("div"); box.className="gb-pop"; box.setAttribute("role","dialog"); box.setAttribute("aria-modal","true"); box.setAttribute("aria-label","한마디 남기기");
    box.innerHTML=`<form class="gb-card" autocomplete="off"><h3>한마디 남기기</h3><p>이 사건에 대해, 혹은 오늘 경험에 대해 남기고 싶은 말을 적어 주세요.</p>
      <input id="gbName" maxlength="12" placeholder="이름 (비워도 됩니다)"><textarea id="gbMsg" maxlength="120" rows="4" placeholder="한마디 (120자까지)"></textarea>
      <div class="gb-cnt"><span id="gbN">0</span> / 120</div><div class="gb-row"><button type="submit" id="gbSend" disabled>남기기</button><button type="button" id="gbX">닫기</button></div><div class="gb-thx" id="gbThx" hidden>남겨 주셔서 감사합니다.</div></form>`;
    host.appendChild(box);
    const msg=$("gbMsg"), nm=$("gbName"), send=$("gbSend"), cnt=$("gbN");
    box.addEventListener("keydown",e=>{ e.stopPropagation(); if(e.key==="Escape") close(); });   // 글자 키가 게임 단축키로 새지 않게
    box.addEventListener("keyup",e=>e.stopPropagation());
    msg.addEventListener("input",()=>{ cnt.textContent=msg.value.length; send.disabled=!msg.value.trim(); });
    $("gbX").onclick=close;
    box.querySelector("form").onsubmit=e=>{ e.preventDefault(); const m=msg.value.trim(); if(!m||send.disabled) return; send.disabled=true;
      const a=load(); a.push({t:Date.now(),n:nm.value.trim(),m}); save(a);
      $("gbThx").hidden=false; setTimeout(close,1600); };
    setTimeout(()=>{ try{ msg.focus(); }catch(e){} },50);
  });
}catch(e){ console.warn("guestbook",e); } })();
