/* 성능: 해상도·픽셀비율 상한 + 프레임이 떨어지면 자동으로 화질을 한 단계씩 낮춘다 */
(function(){
  try{
    if(!window.THREE) return;
    var REND=[], dpr=window.devicePixelRatio||1, big=Math.max(1,Math.max(innerWidth,innerHeight)/1920);
    window.__PRC=Math.min(1.5, dpr)/Math.min(1.6,big>1?big:1);   // 큰 모니터일수록 비율을 낮춰 픽셀 수를 비슷하게
    window.__PRC=Math.max(.7,Math.min(1.5,window.__PRC));
    var _spr=THREE.WebGLRenderer.prototype.setPixelRatio;
    THREE.WebGLRenderer.prototype.setPixelRatio=function(v){ if(!this.__reg){ this.__reg=1; REND.push(this); } this.__want=v; return _spr.call(this,Math.min(v,window.__PRC)); };
    /* 3D 살펴보기의 흐림(BokehPass)·합성기는 setPixelRatio를 낮춰도 해상도가 그대로라서, 화질 하향 때 흐림 패스를 끈다 */
    function noBokeh(){
      window.__NOBOKEH=true;
      var CP=THREE.EffectComposer&&THREE.EffectComposer.prototype;
      if(CP&&!CP.__nb){ CP.__nb=1; var _cr=CP.render;
        CP.render=function(dt){ if(window.__NOBOKEH&&THREE.BokehPass){ for(var i=0;i<this.passes.length;i++){ if(this.passes[i] instanceof THREE.BokehPass) this.passes[i].enabled=false; } } return _cr.call(this,dt); }; }
    }
    var n=0,t0=performance.now(),low=0,bad=0;
    /* 전시 PC가 약할 때: 주소 끝에 ?lite=1 을 붙이면 처음부터 낮은 화질(흐림 끔, 해상도 낮춤)로 시작 */
    if(/[?&]lite=1/.test(location.search)){ low=3; window.__PRC=.7; document.documentElement.classList.add("lowfx","lowfx2"); noBokeh(); }
    function tick(now){
      n++;
      if(now-t0>1000){
        var fps=n*1000/(now-t0); n=0; t0=now;
        if(!document.hidden && fps>2 && fps<42){ bad++; } else bad=0;
        if(bad>=2 && low<3){
          bad=0; low++; window.__PRC=Math.max(.55,window.__PRC-.25);
          noBokeh(); document.documentElement.classList.add("lowfx"); if(low>1) document.documentElement.classList.add("lowfx2");
          REND.forEach(function(R){ try{ _spr.call(R,Math.min(R.__want||1,window.__PRC)); }catch(e){} });
        }
      }
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  }catch(e){}
})();

/* 손 인식(MediaPipe) 파일은 카메라를 켠 뒤에야 받기 시작해 첫 사용 때 오래 기다린다 → 타이틀 화면에서 조용히 미리 받아 브라우저 캐시에 둔다 */
(function(){
  try{
    var base="https://cdn.jsdelivr.net/npm/@mediapipe/hands/", done=false;
    var F=["hands.min.js","hands_solution_packed_assets_loader.js","hands_solution_simd_wasm_bin.js","hands_solution_simd_wasm_bin.wasm","hands_solution_packed_assets.data","hand_landmark_lite.tflite","hands.binarypb"];
    function go(){ if(done) return; done=true; F.forEach(function(f){ try{ fetch(base+f,{priority:"low"}).catch(function(){}); }catch(e){} }); }
    setTimeout(function(){ try{
      var c=navigator.connection||{}; if(c.saveData||window.__MOBILE) return;
      if(typeof mode!=="undefined"&&mode==="title") go();
    }catch(e){} },2500);
  }catch(e){}
})();

/* 화질이 낮아지면 카메라 창의 주사선·잡음 애니메이션도 끈다 (손 인식과 3D에 자원을 양보) */
(function(){ try{ var st=document.createElement("style"); st.textContent="html.lowfx .cam-noise,html.lowfx .cam-scan,html.lowfx .cam-bar{display:none!important}"; document.head.appendChild(st); }catch(e){} })();
