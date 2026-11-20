/* 현장 화면 성능: 같은 영상 두 개(흐린 층·선명한 층)를 동시에 재생하지 않는다.
   배경 영상은 5초짜리 거의 정지 화면(변화 화소 0.4%)이라, 흐린 층은 한 프레임에 멈춰 두어 디코딩·블러 필터 갱신 비용을 반으로 줄이고 두 영상이 서로 어긋나 겹쳐 보이는 일도 없앤다. */
(function(){ try{
  const v=document.querySelector("#lSoft video.vloop"); if(!v) return;
  const stop=()=>{ try{ v.pause(); v.currentTime=.8; v.__ovp=0; }catch(e){} };
  v.addEventListener("playing",()=>{ setTimeout(stop,60); },{once:true});
  v.addEventListener("loadeddata",()=>{ setTimeout(stop,120); },{once:true});
  if(v.readyState>=2) stop();
}catch(e){ console.warn("perf-main",e); } })();
