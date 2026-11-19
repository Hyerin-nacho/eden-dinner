/* 성능: 해상도·픽셀비율 상한 + 프레임이 떨어지면 자동으로 화질을 한 단계씩 낮춘다 */
(function(){
  try{
    if(!window.THREE) return;
    var REND=[], dpr=window.devicePixelRatio||1, big=Math.max(1,Math.max(innerWidth,innerHeight)/1920);
    window.__PRC=Math.min(1.5, dpr)/Math.min(1.6,big>1?big:1);   // 큰 모니터일수록 비율을 낮춰 픽셀 수를 비슷하게
    window.__PRC=Math.max(.7,Math.min(1.5,window.__PRC));
    /* three r128의 setPixelRatio는 prototype이 아니라 렌더러 인스턴스마다 생기는 함수라서, prototype을 고쳐서는 상한이 적용되지 않았다 → 렌더러를 만들 때 인스턴스의 함수를 감싼다 */
    var handOn=false, lowSticky=false;
    function capNow(){ return handOn?Math.min(window.__PRC,1):window.__PRC; }
    var _W=THREE.WebGLRenderer;
    if(!_W.__q){
      var W=function(prm){ var r=new _W(prm), sp=r.setPixelRatio; r.__sp=sp; r.__want=1; REND.push(r);
        r.setPixelRatio=function(v){ r.__want=v; return sp.call(r,Math.min(v,capNow())); }; return r; };
      W.prototype=_W.prototype; for(var k in _W){ try{ W[k]=_W[k]; }catch(e){} } W.__q=1; THREE.WebGLRenderer=W;
    }
    function applyPR(){ REND.forEach(function(R){ try{ R.__sp.call(R,Math.min(R.__want||1,capNow())); }catch(e){} }); }
    /* 손 카메라가 켜져 있는 동안(=3D를 손으로 돌리는 중)에는 3D를 한 단계 가볍게: 흐림 끔 + 해상도 1배 이하. 카메라가 꺼지면 원래대로 */
    window.__QHAND=function(on){ handOn=!!on; window.__NOBOKEH=handOn||lowSticky; applyPR(); };
    /* 합성기(EffectComposer)는 자기 해상도를 따로 가져서 렌더러 비율을 낮춰도 그대로였다 → 렌더 때마다 렌더러 비율에 맞춘다. 흐림 패스는 필요할 때만 끈다 */
    (function(){ var CP=THREE.EffectComposer&&THREE.EffectComposer.prototype; if(!CP||CP.__q) return; CP.__q=1; var _cr=CP.render;
      CP.render=function(dt){ try{
          var pr=this.renderer.getPixelRatio(); if(this.__pr!==pr){ this.__pr=pr; this.setPixelRatio(pr); }
          if(THREE.BokehPass){ var off=!!window.__NOBOKEH; for(var i=0;i<this.passes.length;i++){ var q=this.passes[i]; if(q instanceof THREE.BokehPass){ if(off&&q.enabled){ q.enabled=false; q.__qoff=1; } else if(!off&&q.__qoff){ q.enabled=true; q.__qoff=0; } } } }
        }catch(e){}
        return _cr.call(this,dt); }; })();
    /* 3D 살펴보기의 흐림(BokehPass)·합성기는 setPixelRatio를 낮춰도 해상도가 그대로라서, 화질 하향 때 흐림 패스를 끈다 */
    function noBokeh(){ lowSticky=true; window.__NOBOKEH=true; }
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
          applyPR();
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
      if((c.effectiveType&&c.effectiveType!=="4g")||(c.downlink&&c.downlink<5)) return;   // 와이파이가 느리면 인트로 영상에 양보
      if(typeof mode!=="undefined"&&mode==="title") go();
    }catch(e){} },2500);
  }catch(e){}
})();

/* 화질이 낮아지면 카메라 창의 주사선·잡음 애니메이션도 끈다 (손 인식과 3D에 자원을 양보) */
(function(){ try{ var st=document.createElement("style"); st.textContent="html.lowfx .cam-noise,html.lowfx .cam-scan,html.lowfx .cam-bar{display:none!important}"; document.head.appendChild(st); }catch(e){} })();
