/* 전체 소리 크기: 모든 효과음·배경음·영상 소리를 한 번에 줄인다(각 소리끼리의 비율은 그대로). ?vol=0.8 처럼 바꿔 볼 수 있다 */
(()=>{ try{
  const q=parseFloat(new URLSearchParams(location.search).get("vol")); const M=window.MASTER_VOL=isFinite(q)?Math.max(0,Math.min(1,q)):.5;
  const P=HTMLMediaElement.prototype, d=Object.getOwnPropertyDescriptor(P,"volume"), play=P.play;
  Object.defineProperty(P,"volume",{configurable:true,get(){ return this._lv!==undefined?this._lv:d.get.call(this); },
    set(v){ this._lv=v; d.set.call(this,Math.max(0,Math.min(1,v*M))); }});
  P.play=function(){ if(this._lv===undefined) this.volume=1; return play.apply(this,arguments); };
}catch(e){} })();
