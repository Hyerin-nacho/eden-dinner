/* 조사 화면 잔상 제거: 흐린/선명 두 영상이 서로 다른 프레임이면 겹쳐 보인다 → 항상 같은 시점으로 맞춘다 */
(function(){ const a=document.querySelector("#lSoft video"), b=document.querySelector("#lSharp video"); if(!a||!b) return;
  setInterval(()=>{ try{ if(a.readyState<2||b.readyState<2) return; const d=b.currentTime-a.currentTime;
    if(Math.abs(d)>.05&&Math.abs(d)<a.duration-.3){ b.currentTime=a.currentTime+.02; } }catch(e){} },250); })();
