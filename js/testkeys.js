/* ---------- 테스트용: S 키로 영상 건너뛰기 ----------
   프롤로그 영상·진실 장면 영상·증거 손 영상은 바로 다음으로, 탑승 드래그 장면은 끝까지 감은 뒤 넘어간다.
   전시·제출 때는 아래 값을 false 로 바꾸면 키가 꺼진다. */
const TEST_SKIP=true;
 function skipCurrentVideo(){
   if(window.__heroSkip&&window.__heroSkip()) return true;
    for(const id of ["titleTrainV","proVid","evClipV"]){ const v=document.getElementById(id);
     if(v&&typeof v.onended==="function"&&!v.paused){ v.onended(); return true; } }
   return false;
 }
 function closeSbDetail(){ $("sbDetail").hidden=true; }
 $("sbDetailX").onclick=closeSbDetail;
 $("sbDetail").addEventListener("click",e=>{ if(e.target===$("sbDetail")) closeSbDetail(); });
 document.getElementById("proVideoSkip").onclick=skipCurrentVideo;
 const evSkip=document.createElement("button"); evSkip.type="button"; evSkip.className="ev-video-skip"; evSkip.textContent="영상 넘기기 ›"; evSkip.onclick=skipCurrentVideo; document.getElementById("evClip").appendChild(evSkip);
addEventListener("keydown",e=>{
  if(!TEST_SKIP||e.repeat||e.key.toLowerCase()!=="s"||/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) return;
   if(skipCurrentVideo()) e.preventDefault();
});
document.querySelectorAll(".evclip .sk").forEach(el=>{ if(!TEST_SKIP) el.remove(); });
