/* 성능: 해상도·픽셀비율 상한 + 프레임이 떨어지면 자동으로 화질을 한 단계씩 낮춘다 */
(function(){
  try{
    if(!window.THREE) return;
    var REND=[], dpr=window.devicePixelRatio||1, big=Math.max(1,Math.max(innerWidth,innerHeight)/1920);
    window.__PRC=Math.min(1.5, dpr)/Math.min(1.6,big>1?big:1);   // 큰 모니터일수록 비율을 낮춰 픽셀 수를 비슷하게
    window.__PRC=Math.max(.7,Math.min(1.5,window.__PRC));
    var _spr=THREE.WebGLRenderer.prototype.setPixelRatio;
    THREE.WebGLRenderer.prototype.setPixelRatio=function(v){ if(!this.__reg){ this.__reg=1; REND.push(this); } this.__want=v; return _spr.call(this,Math.min(v,window.__PRC)); };
    var n=0,t0=performance.now(),low=0,bad=0;
    function tick(now){
      n++;
      if(now-t0>1500){
        var fps=n*1000/(now-t0); n=0; t0=now;
        if(!document.hidden && fps>2 && fps<38){ bad++; } else bad=0;
        if(bad>=2 && low<3){
          bad=0; low++; window.__PRC=Math.max(.55,window.__PRC-.25);
          document.documentElement.classList.add("lowfx"); if(low>1) document.documentElement.classList.add("lowfx2");
          REND.forEach(function(R){ try{ _spr.call(R,Math.min(R.__want||1,window.__PRC)); }catch(e){} });
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }catch(e){}
})();
