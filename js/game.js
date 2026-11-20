/* 영상 인트로를 쓰려면 같은 폴더에 올린 mp4 경로를 넣으세요. 비어 있으면 카메라 연출로 대체됩니다. */
const INTRO_VIDEO = "sv/door.mp4";   // "문을 연다" → 손잡이를 잡고 VIP실 문을 여는 영상

const SPOTS = [
 {id:"glass",x:63.3,y:75.3,tier:1,mini:"tilt",loc:"바닥 · 러그 옆",title:"깨진 와인잔",short:"와인잔",
  text:"윗부분이 깨져 나간 와인잔. 바닥에 하얀 가루가 엉겨 붙어 있다. 남은 와인에서 쓴 아몬드 냄새가 난다.",ev:"와인잔의 하얀 가루",th:"와인에 뭔가 섞였다. 독이다."},
 {id:"plates",x:39,y:62,tier:1,loc:"식탁",title:"두 사람분의 식기",short:"식탁",left:true,
  text:"로크의 접시는 비었다. 맞은편 접시에는 포크 자국만 남았고, 의자도 뒤로 빠져 있다. 누군가 이 자리에 앉아 있었다.",ev:"두 사람분의 식기",th:"로크는 혼자가 아니었다."},
 {id:"card",x:30.2,y:55,tier:1,loc:"식탁 · 꽃병 옆",title:"룸서비스 전표",short:"전표",left:true,
  note:"VIP실 룸서비스<br>21:00 · 와인 1병 (대표 전용)<br>담당: E. 보로딘",ev:"룸서비스 전표 (21:00, 담당 E.B.)",th:"9시에 와인을 가져온 건 엘레나다."},
 {id:"bedside",x:50.5,y:26,tier:2,loc:"침대 옆 협탁",title:"복용량이 적힌 약병",short:"협탁",left:true,
  text:"흩어진 서류 밑에 갈색 약병이 있다. 수면제 라벨 위에 손글씨로 복용량이 적혀 있다. 그런데 알약은 거의 그대로 차 있다.",note:"취침 전 2정 — E.B.<br><span style=\"opacity:.75\">남은 약 28/30</span>",ev:"약병의 손글씨 (E.B.)",th:"E.B. 엘레나 보로딘의 이니셜이다."},
 {id:"victim",x:63.5,y:31,tier:2,mini:"watch",loc:"침대",title:"로크의 회중시계",short:"피해자",
  text:"밴더빌트 로크의 조끼 주머니. 회중시계가 21시 47분에서 멈춰 있다. 쓰러질 때 부딪힌 흔적이 있다.",ev:"21:47에 멈춘 회중시계",th:"오픈식은 8시. 두 시간도 안 돼 죽었다."},
 {id:"window",x:7,y:50,tier:2,loc:"창가",title:"잠긴 창문",short:"창문",
  text:"창밖 풍경이 빛줄기처럼 흘러간다. 걸쇠는 안쪽에서 굳게 잠겨 있다. 달리는 열차에서 이 창으로 드나든 사람은 없다.",ev:"잠긴 창문 · 내부자 소행",th:"범인은 아직 이 열차 안에 있다."},
 {id:"sofa",x:84,y:74,tier:2,loc:"소파",title:"쿠션의 하얀 개털",short:"소파",left:true,
  text:"소파 쿠션에 하얀 개털이 잔뜩 묻어 있다. 쿠션에 눌린 자국은 이미 식어 있다. 한참 전에 떠났다.",ev:"소파의 개털 (무관)",herring:true,th:"마가렛의 벨라다. 8시 반쯤 왔다가, 9시 전에 떠났다."},
 {id:"statue",x:83.6,y:45,tier:3,loc:"사이드 테이블",title:"천사 조각상",short:"조각상",left:true,
  text:"테이블 전체에 먼지가 쌓였는데, 조각상 둘레만 깨끗하다. 누군가 최근에 들었다 놓았다.",action:"받침대 들어 보기",
  after:"받침대 속 빈 공간에 장식이 새겨진 작은 초록 병이 숨겨져 있다. 비어 있고, 안쪽에 하얀 가루가 남아 있다. 병 바닥의 문양… 어디서 봤더라. 내 초대장의 밀랍 도장과 같다.",ev:"조각상 속의 초록 병",th:"발견자였다면서, 이걸 숨길 시간은 있었군."},
 {id:"shawl",x:46,y:44,tier:2,mini:"crumple",loc:"뒤쪽 의자",title:"의자에 걸린 숄",short:"숄",sus:"margaret",
  text:"뒤쪽 의자 등받이에 보라색 캐시미어 숄이 걸려 있다. 향수 냄새가 짙다. 주머니에 구겨진 쪽지가 들어 있다.",
  note:"남편이 죽던 날, 당신은 서류를 바꿔치기했죠.<br>에덴라인은 내 것이에요. 오늘 밤 안에 돌려받겠어요. — M.C.",ev:"마가렛의 숄과 협박 쪽지",th:"오픈식 ‘전에’ 들렀다더니, 숄은 왜 여기 있지? 로크와 다툰 게 분명하다."},
 {id:"doll",x:19,y:80,tier:3,mini:"rec",loc:"앞쪽 의자 밑",title:"의자 밑의 인형",short:"인형",sus:"evelyn",
  text:"앞쪽 의자 밑에 레이스 드레스를 입은 작은 인형이 떨어져 있다. 눈동자 안쪽에서 빨간 불빛이 깜빡인다. 녹음기가 아니다. 스스로 듣고 기억하는 AI 인형이다.",action:"녹음 재생하기",
  after:"지직거리는 잡음 사이로 목소리가 들린다.",note:"[21:41] …대표님, 한 잔 더 드세요.<br>[21:44] (잔 부딪히는 소리)<br>[21:46] …엘레나, 너 뭘……",ev:"에블린의 인형 녹음 (21:41~21:46)",th:"9시부터 식당칸에 있었다던 에블린이, 자기 ‘아이’를 이 방에 두고 갔다. 그리고 이 목소리는…"},
 {id:"crow",x:60,y:55,tier:2,loc:"침대 발치",title:"카드로 접은 까마귀",short:"카드 까마귀",sus:"magician",
  text:"침대 발치 러그 위에 트럼프 카드를 접어 만든 작은 까마귀가 놓여 있다. 날개에 잉크로 글씨가 적혀 있다.",
  note:"오늘 밤, 당신의 마지막 쇼를 위하여.<br>— C-3에서 살아남은 자",ev:"마술사의 카드 까마귀",th:"C-3… 5년 전? 이 방엔 온 적 없다더니, 침대 발치까지 들어왔다."},
 {id:"portrait",x:72.8,y:13,tier:0,loc:"벽 · 타원 초상화",title:"로크의 초상화",short:"초상화",left:true,
  text:"에덴라인 창업 30주년 기념 초상. 밴더빌트 로크가 그림 속에서 내려다보고 있다.",th:"오늘 단상 위에서 웃던 얼굴이다."},
 {id:"train",x:56.8,y:13.5,tier:0,loc:"벽 · 액자",title:"오르페우스 설계도",short:"설계도",
  text:"오르페우스 익스프레스의 설계도 액자. 아래에 작은 명판이 붙어 있다.",note:"ORPHEUS EXPRESS R.R.<br>설계·정비 — 에덴라인 정비부",th:"Ada도 이 열차를 고쳤었다."},
 {id:"elena",x:74,y:60,npc:true,tier:0,loc:"VIP실",title:"엘레나 보로딘",short:"엘레나 보로딘"}
];
/* 조사 지점 줄이기: 여기 적은 것은 방에서 빠진다 (내용은 위에 그대로 남겨 두었으니, 다시 넣으려면 목록에서 지우면 됨) */
const CUT_SPOTS=["window","sofa","portrait","train","plates","shawl","crow","victim","books","glass","card"];   // 남은 증거: 와인잔·조각상·인형(직접 만지기) + 전표·약병(클릭 확인)
for(let i=SPOTS.length-1;i>=0;i--) if(CUT_SPOTS.includes(SPOTS[i].id)) SPOTS.splice(i,1);
const ICON={
 search:'<circle cx="10.5" cy="10.5" r="6"/><path d="M15 15l5.5 5.5"/>',
 glass:'<path d="M7 3h10c0 5-2 8-5 8s-5-3-5-8z"/><path d="M12 11v8M8 21h8"/>',
 plate:'<circle cx="12" cy="13" r="7"/><circle cx="12" cy="13" r="3.5"/><path d="M3 4v5M5 4v5M4 9v12M20 4c-2 1-2 5 0 6v11"/>',
 note:'<path d="M6 3h9l4 4v14H6z"/><path d="M15 3v4h4M9 11h7M9 15h7M9 19h4"/>',
 bottle:'<path d="M10 2h4v4l2 3v12H8V9l2-3z"/><path d="M8 13h8"/>',
 watch:'<circle cx="12" cy="13" r="7"/><path d="M12 13V9.5M12 13l2.5 1.5M10 3h4M12 3v3"/>',
 book:'<path d="M4 5c3-1 6-1 8 1 2-2 5-2 8-1v14c-3-1-6-1-8 1-2-2-5-2-8-1z"/><path d="M12 6v14"/>',
 cuff:'<rect x="5" y="8" width="14" height="8" rx="4"/><circle cx="12" cy="12" r="1.5"/>',
 window:'<rect x="5" y="3" width="14" height="18"/><path d="M12 3v18M5 12h14"/>',
 frame:'<rect x="4" y="4" width="16" height="16"/><path d="M4 16l5-5 4 4 2-2 5 5"/><circle cx="15" cy="9" r="1.5"/>',
 drawer:'<rect x="4" y="5" width="16" height="14"/><path d="M4 12h16M10 8.5h4M10 15.5h4"/>',
 safe:'<rect x="4" y="4" width="16" height="16"/><circle cx="12" cy="12" r="3.5"/><path d="M12 8.5v1.5M20 8h1M20 16h1"/>',
 talk:'<path d="M4 5h16v11H9l-5 4z"/><path d="M8 9.5h8M8 12.5h5"/>',
 cloth:'<path d="M6 3h12l2 6-4 2v10H8V11L4 9z"/>',
 doll:'<circle cx="12" cy="6" r="3"/><path d="M12 9v4M7 21l2-8h6l2 8zM8 12l-3 3M16 12l3 3"/>',
 crow:'<rect x="5" y="3" width="11" height="15" rx="1" transform="rotate(-8 10 10)"/><path d="M10 8l2 2-2 2-2-2z"/>',
 ask:'<circle cx="12" cy="12" r="9"/><path d="M9.5 9.5a2.5 2.5 0 014.6 1.2c0 1.8-2.1 2-2.1 3.8"/><circle cx="12" cy="17.5" r=".6" fill="currentColor"/>'
};
const ICONS={glass:"glass",plates:"plate",card:"note",bedside:"bottle",victim:"watch",books:"book",sofa:"search",window:"window",train:"frame",statue:"drawer",portrait:"frame",elena:"talk",shawl:"cloth",doll:"doll",crow:"crow"};
const svg=k=>`<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICON[k]}</svg>`;
const EVID = SPOTS.filter(s=>s.ev);
const $ = id => document.getElementById(id);

/* ---------- 카메라 허브: 웹캠 1개 + 손 인식 1개를 모든 장면이 함께 쓴다 ---------- */
const CAMHUB=(()=>{
  const v=document.createElement("video"); v.playsInline=true; v.muted=true; v.autoplay=true;
  let stream=null, hands=null, starting=null, loopOn=false, busy=false, state="off", openGate; const gate=new Promise(r=>{ openGate=r; });
  const subs=new Set(), stSubs=new Set(), binds=new Set();
  const loadJS=src=>new Promise((ok,no)=>{ const t=document.createElement("script"); t.src=src; t.crossOrigin="anonymous"; t.onload=ok; t.onerror=()=>no(new Error("hands_script")); document.head.appendChild(t); });
  const set=st=>{ state=st; H.state=st; stSubs.forEach(f=>{ try{ f(st); }catch(e){} }); };
  const attach=el=>{ if(el.srcObject!==stream){ el.srcObject=stream; if(stream) el.play().catch(()=>{}); } };
  const want=()=>document.visibilityState==="visible"&&[...subs].some(x=>!x.when||x.when());
  let lastSend=0, gap=33, cost=14;
  const tick=async()=>{ if(!hands||!stream){ loopOn=false; return; }
    /* 인식 주기를 기기 속도에 맞춘다: 한 번 인식에 걸린 시간의 약 2.4배 간격(40~100ms)으로 돌려, 느린 기기에서 3D 화면이 버벅이지 않게 */
    const now=performance.now(); if(want()&&v.readyState>=2&&!busy&&now-lastSend>=gap){ lastSend=now; busy=true; try{ await hands.send({image:v}); }catch(e){} busy=false; const d=performance.now()-now; cost+=(d-cost)*.2; gap=Math.max(33,Math.min(100,cost*2.4)); H.cost=cost; H.gap=gap; }
    if(want()) requestAnimationFrame(tick); else setTimeout(tick,300); };
  const H={ state:"off", blocked:false, err:null, ratio:1, video:v,
    get on(){ return !!stream; }, get handsReady(){ return state==="hands"; },
    onState(f){ stSubs.add(f); f(state); },
    sub(fn,when){ const x={fn,when}; subs.add(x); return ()=>subs.delete(x); },
    bind(el){ binds.add(el); attach(el); },
    /* 엄지-검지 끝 거리를 손 크기(손목~중지뿌리)로 나눈 값: 손이 멀든 가깝든 같은 기준으로 집기를 판정 */
    pinchRatio(lm){ const d=Math.hypot((lm[4].x-lm[8].x)*4/3,lm[4].y-lm[8].y), p=Math.hypot((lm[0].x-lm[9].x)*4/3,lm[0].y-lm[9].y)||.1; return d/p; },
    pinchFilter(){ let down=false; return lm=>{ if(!lm){ down=false; H.ratio=1; return false; } const r=H.pinchRatio(lm); H.ratio=r; down=down?r<.62:r<.44; return down; }; },
    emit(lm){ subs.forEach(x=>{ if(!x.when||x.when()){ try{ x.fn(lm); }catch(e){ console.warn(e); } } }); try{ H.tap&&H.tap(lm); }catch(e){} },   // 테스트·시뮬레이션용
    allowHands(){ openGate(); },   // 손 인식 모델 내려받기를 허용 (프롤로그에서는 인트로 영상이 끝난 뒤)
    start(now){ if(window.__MOBILE){ H.blocked=true; H.err=new Error("mobile"); set("nocam"); return Promise.resolve(false); }   // 모바일: 카메라를 켜지 않고 끌기(터치)로만 진행
      if(now) openGate(); H.blocked=false; if(stream&&state!=="off") return Promise.resolve(true); if(starting) return starting;
      starting=(async()=>{ try{ set("connecting");
        try{ if(!window.isSecureContext||!navigator.mediaDevices?.getUserMedia) throw new Error("insecure");
          let to, expired=false; const tp=new Promise((_,rej)=>{ to=setTimeout(()=>{ expired=true; rej(new Error("timeout")); },12000); });
          const rq=navigator.mediaDevices.getUserMedia({video:{width:{ideal:480},height:{ideal:360},frameRate:{ideal:30}},audio:false}).then(m=>{ if(expired){ m.getTracks().forEach(t=>t.stop()); throw new Error("timeout"); } return m; });
          try{ stream=await Promise.race([rq,tp]); } finally{ clearTimeout(to); }
          if(H.blocked){ stream.getTracks().forEach(t=>t.stop()); stream=null; set("off"); return false; }
          v.srcObject=stream; await v.play(); binds.forEach(attach); window.__cameraOptIn=true; set("cam");
        }catch(e){ H.err=e; stream=null; window.__cameraOptIn=false; set("nocam"); return false; }
        await gate;
        try{ if(!window.Hands) await loadJS("https://cdn.jsdelivr.net/npm/@mediapipe/hands/hands.min.js");
          if(!hands){ hands=new Hands({locateFile:f=>`https://cdn.jsdelivr.net/npm/@mediapipe/hands/${f}`});
            hands.setOptions({maxNumHands:1,modelComplexity:0,minDetectionConfidence:.45,minTrackingConfidence:.35});
            /* 손이 한두 프레임 놓쳐져도(빠르게 움직이거나 손가락이 겹칠 때) 0.28초까지는 직전 자세를 유지해 커서·회전이 튀지 않게 한다 */
            let lastLm=null, lostAt=0;
            hands.onResults(res=>{ let lm=(res.multiHandLandmarks||[])[0]||null; const tn=performance.now();
              if(lm){ lastLm=lm; lostAt=0; } else if(lastLm){ if(!lostAt) lostAt=tn; if(tn-lostAt<280) lm=lastLm; else lastLm=null; }
              subs.forEach(x=>{ if(!x.when||x.when()){ try{ x.fn(lm); }catch(e){ console.warn(e); } } }); try{ H.tap&&H.tap(lm); }catch(e){} }); }   // tap: 카메라 창에 손 뼈대를 그리는 표시용(인식 실행 여부에는 관여하지 않음)
          if(!stream) return false; set("hands"); if(!loopOn){ loopOn=true; tick(); }
        }catch(e){ H.err=e; set("nohands"); }
        return true;
      } finally{ starting=null; } })();
      return starting; },
    stop(soft){ if(!soft) H.blocked=true; try{ stream&&stream.getTracks().forEach(t=>t.stop()); }catch(e){} stream=null; v.srcObject=null;
      binds.forEach(el=>{ try{ el.pause(); el.srcObject=null; }catch(e){} }); window.__cameraOptIn=false; set("off"); }
  };
  return H; })();
const stage=$("stage"), world=$("world");
$("sBoard").style.setProperty("--suspect-room",`url(${IMG})`);
$("curtain").style.backgroundImage = $("lSoft").style.backgroundImage = $("lSharp").style.backgroundImage = `url(${IMG})`;
stage.addEventListener("scroll",()=>{ if(stage.scrollLeft||stage.scrollTop){ stage.scrollLeft=0; stage.scrollTop=0; } });
const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
/* 물건 윤곽 (사진 기준 %, 클릭·강조용) */
const POLY={
 statue:[[81,36],[85,38],[86,44],[85.5,49],[87.5,52],[87,56],[80.5,56],[80.5,52],[82,49],[82,44]],
 glass:[[60.5,72.5],[65,73],[65.5,77.5],[60.5,77.5]],
 plates:[[25,56],[31,53],[41,54],[46,59],[42,67],[29,68],[24.5,63]],
 card:[[28.3,50.5],[31.3,50.5],[31.3,57.5],[28.3,57.5]],
 bedside:[[45.5,21],[55,21],[55,29.5],[46,29.5]],
 victim:[[58.5,26],[67.5,26],[69,36],[61,38],[58.5,32]],
 books:[[32.5,7],[42.5,7],[42.5,28.5],[32.5,28.5]],
 sofa:[[72.5,66],[88,65],[91,70],[95,78],[100,82],[100,100],[71.5,100],[72,80]],
 window:[[0,8],[11,4],[12,69],[0,78]],
 train:[[53.8,8.8],[60,8.8],[60,17.5],[53.8,17.5]],
 portrait:[[70,6.5],[75.3,6.5],[75.3,18],[70,18]],
 shawl:[[42,40],[48.5,39],[50,45],[49.5,61],[43,60]],
 doll:[[13,77],[24,75],[27,90],[15,93]],
 crow:[[57.5,52],[62.5,52],[62.5,58],[57.5,58]]
};
/* 입체감 레이어 (가까운 것일수록 k가 큼) */
const CUTS=[
 {poly:[[0,0],[10,0],[13,25],[16.5,64],[12,65],[5,56],[2,40],[0,22]],k:1.1},
 {poly:POLY.sofa,k:1.3},
 {poly:[[12,71],[20,70],[24,79],[29,86],[30.5,100],[13.5,100],[11.5,86]],k:1.25},
 {poly:[[23.5,55],[30,51.5],[40,52.5],[48.5,58],[50.5,68],[48.5,86],[43,100],[25.5,100],[23.5,80]],k:.7},
 {poly:[[22.5,41],[27,39.5],[31.5,44],[30.5,50],[29.5,58],[25.5,58],[24,50]],k:.7},
 {poly:[[42,39],[48.5,38],[50.5,45],[49.5,62],[43,60]],k:.55},
 {poly:[[76.5,51],[80,50],[82,35.5],[85.5,39],[87.5,45],[89.5,57],[88.5,64],[86.5,67],[79,66],[77.5,58]],k:.6}
];
const pip=(p,P)=>{ let c=false; for(let i=0,j=P.length-1;i<P.length;j=i++){ const [xi,yi]=P[i],[xj,yj]=P[j]; if(((yi>p.y)!==(yj>p.y))&&(p.x<(xj-xi)*(p.y-yi)/(yj-yi)+xi)) c=!c; } return c; };
const maskURL=P=>`url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'><filter id='f'><feGaussianBlur stdDeviation='.35'/></filter><polygon filter='url(#f)' fill='white' points='${P.map(p=>p.join(",")).join(" ")}'/></svg>`)}")`;
(()=>{ const box=document.getElementById("cuts");
  CUTS.forEach(c=>{ const d=document.createElement("div"); d.className="cutl"; d.style.backgroundImage=`url(${IMG})`; d.style.webkitMaskImage=d.style.maskImage=maskURL(c.poly);
    c.cx=c.poly.reduce((a,p)=>a+p[0],0)/c.poly.length; c.cy=c.poly.reduce((a,p)=>a+p[1],0)/c.poly.length; c.el=d; c.f=-1; box.appendChild(d); });
  const svgNS="http://www.w3.org/2000/svg", O=document.getElementById("outl");
  Object.entries(POLY).forEach(([id,P])=>{ const pg=document.createElementNS(svgNS,"polygon"); pg.setAttribute("points",P.map(p=>p.join(",")).join(" ")); pg.id="ol-"+id; O.appendChild(pg); });
})();

let found=new Set(), opened=new Set(), mode="title", activeSpot=null;

/* ---------- markers ---------- */
SPOTS.forEach(s=>{
  const b=document.createElement("button");
  b.className="hs"+(s.left?" left":""); b.id="hs-"+s.id;
  b.style.left=s.x+"%"; b.style.top=s.y+"%";
  b.innerHTML=`<span class="ic"></span><span class="nm"></span>`;
  b.setAttribute("aria-label",s.npc?s.title+"와 대화하기":s.title+" 조사하기");
  b.onclick=e=>{e.stopPropagation(); if(mode==="explore") inspect(s);};
  b.onfocus=()=>{ if(mode==="explore"){ tgt.fx=clamp(s.x,15,85); tgt.fy=clamp(s.y,20,80);} };
  if(s.npc) b.style.display="none";   // 엘레나 심문은 상단 "심문" 탭으로만
  world.appendChild(b);
});
const HIDN={books:"책장"};   // 아직 안 연 곳의 이름 — 책장은 "수상한 곳" 대신 "책장"으로
function labelFor(s){
  if(found.has(s.id)) return ["조사 완료", s.title];
  if(!s.ev && opened.has(s.id)) return ["확인함", s.title];
  if(s.tier===3 && !opened.has(s.id)) return [HIDN[s.id]||"수상한 곳", "무언가 이상하다"];
  return ["조사", s.title];
}
function refreshMarkers(){
  SPOTS.forEach(s=>{
    const b=$("hs-"+s.id), [k,t]=labelFor(s), hidden=s.tier===3&&!opened.has(s.id);
    b.querySelector(".ic").innerHTML=svg(hidden?"ask":ICONS[s.id]); b.querySelector(".nm").textContent=hidden?(HIDN[s.id]||"수상한 곳"):s.short||s.title;
    b.classList.toggle("done", !s.npc && (found.has(s.id)||(!s.ev&&opened.has(s.id))));
  });
}

/* ---------- camera ---------- */
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const cam={fx:50,fy:48,s:1.12}, tgt={fx:50,fy:48,s:1.12};
let ease=.04, ptr={x:.5,y:.5,in:false}, focusPt={x:50,y:50}, nearId=null, jolt=0;
let _fs=-1,_fx=-1,_fy=-1;
function talkOpen(){ try{ return !talkEl.hidden; }catch(e){ return false; } }
function frame(t){
  if(document.hidden||mode==="talk"||mode==="end"||talkOpen()||(mode==="title"&&$("pro")&&!$("pro").hidden)){ setTimeout(()=>requestAnimationFrame(frame),160); return; }   // 프롤로그 영상 중엔 방 화면을 그리지 않는다
  cam.fx+=(tgt.fx-cam.fx)*ease; cam.fy+=(tgt.fy-cam.fy)*ease; cam.s+=(tgt.s-cam.s)*ease;
  const W=stage.clientWidth, H=stage.clientHeight, s=cam.s;
  let tx=W/2-cam.fx/100*W*s, ty=H/2-cam.fy/100*H*s;
  tx=clamp(tx,W-W*s,0); ty=clamp(ty,H-H*s,0);
  if(jolt>.01 && !reduce){ tx=clamp(tx+(Math.random()-.5)*jolt*7,W-W*s,0); ty=clamp(ty+(Math.random()-.5)*jolt*5,H-H*s,0); jolt*=.9; }
  const rot = 0;   // 가만히 있어도 계속 흔들리던 카메라 흔들림 제거(그리기 비용 절감)
  world.style.transform=`translate(${tx}px,${ty}px) scale(${s}) rotate(${rot}deg)`;
  if(Math.abs(s-_fs)>.002){ _fs=s; world.style.setProperty("--s",s.toFixed(3)); }
  // 초점: 탐색 중엔 커서가 보는 곳, 그 외엔 화면 중심
  if(mode==="explore" && ptr.in && !touchMode){ focusPt.x=(ptr.x*W-tx)/(W*s)*100; focusPt.y=(ptr.y*H-ty)/(H*s)*100; }
  else { focusPt.x=(W/2-tx)/(W*s)*100; focusPt.y=(H/2-ty)/(H*s)*100; }
  const sh=$("lSharp").style;
  if(Math.abs(focusPt.x-_fx)>1.2||Math.abs(focusPt.y-_fy)>1.2){   /* 마스크를 다시 그리는 비용이 커서 1.2%(눈에 안 띄는 간격)마다만 갱신 */ _fx=focusPt.x; _fy=focusPt.y; sh.setProperty("--fx",focusPt.x+"%"); sh.setProperty("--fy",focusPt.y+"%"); }
  sh.setProperty("--mr",(mode==="inspect"?12:mode==="explore"?16:22)/s*1.3+"%");
  // 입체감: 시선이 움직이면 가까운 물건이 더 많이 움직임
  const par=reduce?0:(cam.fx-50)/35, parY=reduce?0:(cam.fy-50)/30;
  CUTS.forEach(c=>{ c.el.style.transform=`translate(${(-par*c.k*.9).toFixed(3)}%,${(-parY*c.k*.35).toFixed(3)}%)`;
    const d=Math.hypot(c.cx-focusPt.x,(c.cy-focusPt.y)*.6), mr=(mode==="inspect"?12:16)/s*1.3*1.2, f=Math.max(0,Math.min(1,(d-mr*.4)/mr));
    if(Math.abs(f-c.f)>.04){ c.f=f; c.el.style.filter=`blur(${(2.6*f).toFixed(2)}px) brightness(${(1-.28*f).toFixed(3)}) saturate(${(1-.15*f).toFixed(3)})`; } });
  if(mode==="explore"){
    let best=null,bd=1e9;
    for(const [pid,P] of Object.entries(POLY)){ if(pid!=="elena" && pip(focusPt,P)){ const f=SPOTS.find(x=>x.id===pid); if(f){ best=f; bd=0; break; } } }
    if(bd>0)
    SPOTS.forEach(sp=>{ if(sp.npc) return; const dx=sp.x-focusPt.x, dy=(sp.y-focusPt.y)*.56, d=Math.hypot(dx,dy); if(d<bd){bd=d;best=sp;}});
    const id = bd<9 ? best.id : null;
    if(id!==nearId){ if(nearId){ $("hs-"+nearId).classList.remove("near"); $("ol-"+nearId)?.classList.remove("on"); } if(id){ $("hs-"+id).classList.add("near"); const ol=$("ol-"+id); if(ol){ ol.classList.add("on"); ol.classList.toggle("done",found.has(id)); } } nearId=id; setPrompt(); }
    $("reticle").classList.toggle("on", !!id);
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
/* ---------- ambient loop ---------- */
(function(){
  // 램프 깜빡임: 부드러운 흔들림 + 가끔 짧게 떨림
  const lamps=[0,1,2].map(i=>({g:$("g"+i),sh:$("s"+i),v:1,t:1,next:0,on:true,p:1,base:[.85,.75,.7][i]}));
  window.LAMPS=lamps;
  const dim=$("dim");
  // 먼지
  const cv=$("dust"), cx=cv.getContext("2d"); let P=[];
  function size(){ const r=world.getBoundingClientRect(); const w=stage.clientWidth, h=stage.clientHeight; cv.width=w*Math.min(devicePixelRatio,2); cv.height=h*Math.min(devicePixelRatio,2); }
  size(); addEventListener("resize",size);
  const LAMPS=[[.275,.45,.22],[.535,.2,.12],[.9,.16,.1],[.08,.4,.2]];
  for(let i=0;i<110;i++) P.push(spawn(true));
  function spawn(any){ const L=LAMPS[Math.random()*LAMPS.length|0];
    return {x:L[0]+(Math.random()-.5)*L[2]*2, y:any?L[1]+(Math.random()-.5)*L[2]*2.2:L[1]-L[2]*1.1, r:.4+Math.random()*1.3,
      vx:(Math.random()-.5)*.00004, vy:.000015+Math.random()*.00004, a:0, life:0, max:6000+Math.random()*9000, lamp:L}; }
  let last=performance.now();
  function tick(t){
    if(document.hidden||mode==="talk"||mode==="end"||talkOpen()||(mode==="title"&&$("pro")&&!$("pro").hidden)){ last=t; setTimeout(()=>requestAnimationFrame(tick),160); return; }
    const dt=Math.min(50,t-last); last=t;
    let tot=0;
    lamps.forEach((L,i)=>{
      if(t>L.next){ L.t = Math.random()<.08 ? .45+Math.random()*.25 : .85+Math.random()*.15; L.next=t+(L.t<.7?60+Math.random()*90:180+Math.random()*700); }
      L.v+=(L.t-L.v)*(L.t<.7?.5:.06);
      L.p+=((L.on?1:0)-L.p)*.12; const o=L.base*L.v*L.p; L.g.style.opacity=o; L.sh.style.opacity=o*.9; tot+=L.v*L.p;
    });
    dim.style.opacity=Math.min(.62,(1-tot/3)*.52).toFixed(3);
    const near = (mode==="explore"&&ptr.in&&!touchMode) ? Math.max(0,1-Math.abs(focusPt.x-9)/12)*Math.max(0,1-Math.abs(focusPt.y-40)/40) : 0;
    const pv=Math.hypot(ptr.x-(tick.px??ptr.x),ptr.y-(tick.py??ptr.y)); tick.px=ptr.x; tick.py=ptr.y;
    tick.gust=Math.min(3,(tick.gust||0)*.96+near*pv*60+jolt*.4);
    if(!reduce) $("curtain").style.transform=`skewX(${(Math.sin(t/1400)*.6+Math.sin(t/390)*tick.gust*.9).toFixed(3)}deg) translateX(${(Math.sin(t/1700)*.15+Math.sin(t/300)*tick.gust*.25).toFixed(3)}%)`;
    if(!reduce){
      const W=cv.width,H=cv.height; cx.clearRect(0,0,W,H);
      P.forEach((p,i)=>{
        p.life+=dt; p.x+=p.vx*dt+Math.sin((t+i*300)/2200)*.00002*dt; p.y+=p.vy*dt;
        if(mode==="explore"&&ptr.in&&!touchMode){ const dx=p.x-focusPt.x/100, dy=(p.y-focusPt.y/100)*.56, dd=Math.hypot(dx,dy); if(dd<.05&&dd>0){ const f=(.05-dd)/.05*.0009*dt; p.x+=dx/dd*f; p.y+=dy/dd*f/.56; p.vx+=dx/dd*.000002*dt; } }
        p.vx*=.999;
        const f=p.life/p.max; p.a = f<.2?f/.2:f>.8?(1-f)/.2:1;
        const d=Math.hypot(p.x-p.lamp[0],(p.y-p.lamp[1])*.6)/p.lamp[2]; const lit=Math.max(0,1-d);
        cx.globalAlpha=p.a*(.15+lit*.75)*(lamps[0].v)*(.35+.65*lamps[0].p);
        cx.fillStyle="#ffe2b0"; cx.beginPath(); cx.arc(p.x*W,p.y*H,p.r*(W/1200),0,7); cx.fill();
        if(f>=1) P[i]=spawn(false);
      });
    }
    requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
})();
function setPrompt(){
  const p=$("prompt");
  if(mode!=="explore"||!nearId){ p.classList.remove("show"); return; }
  const s=SPOTS.find(x=>x.id===nearId), hidden=s.tier===3&&!opened.has(s.id);
  $("promptT").textContent = s.npc ? "엘레나 보로딘 심문하기" : found.has(s.id)||(!s.ev&&opened.has(s.id)) ? (s.short||s.title)+" 다시 보기" : hidden ? (HIDN[s.id]||"수상한 곳")+" 살펴보기" : (s.short||s.title)+" 조사하기";
  p.classList.add("show");
}
/* 둘러보기 입력 */
let touchMode=false, drag=null;
stage.addEventListener("pointermove",e=>{
  const r=stage.getBoundingClientRect();
  if(e.pointerType!=="mouse"){ touchMode=true;
    if(drag && mode==="explore"){ tgt.fx=clamp(drag.fx-(e.clientX-drag.x)/r.width*70,15,85); tgt.fy=clamp(drag.fy-(e.clientY-drag.y)/r.height*60,20,80); }
    return; }
  touchMode=false;
  ptr.x=(e.clientX-r.left)/r.width; ptr.y=(e.clientY-r.top)/r.height; ptr.in=true;
  const rt=$("reticle"); rt.style.left=(e.clientX-r.left)+"px"; rt.style.top=(e.clientY-r.top)+"px";
  if(mode==="explore"){ tgt.fx=15+ptr.x*70; tgt.fy=20+ptr.y*60; }
});
stage.addEventListener("pointerleave",()=>{ptr.in=false});
stage.addEventListener("pointerdown",e=>{ if(e.pointerType!=="mouse") drag={x:e.clientX,y:e.clientY,fx:tgt.fx,fy:tgt.fy}; });
addEventListener("pointerup",()=>drag=null);
stage.addEventListener("click",e=>{ if(e.target.closest("button,.panel,.ov,.talk,.hud,input")) return; if(mode==="explore" && nearId && !touchMode) inspect(SPOTS.find(s=>s.id===nearId)); });

/* ---------- 속마음 자막 / 알림 ---------- */
/* 대사·생각은 문장 단위로 줄을 바꿔 보여 준다 (문장 중간에서 어색하게 끊기지 않게) */
function sentBr(t){ const esc=String(t??"").replace(/[&<>]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;"}[c])); if(esc.includes("\n")) return esc.split("\n").map(x=>`<span class="ln">${x}</span>`).join("<br>");   // 줄바꿈을 직접 적은 문장은 그 자리에서만 바꿈
  return esc.replace(/([.?!…]+["”’)]?)\s+(?=\S)/g,"$1<br>").replace(/<br>([^<]{1,6}…)<br>/g," $1<br>"); }
let thT; function think(t,ms=3200){ const el=$("thought"); el.innerHTML=sentBr(t); el.classList.toggle("show",!!t); clearTimeout(thT); if(t) thT=setTimeout(()=>el.classList.remove("show"),ms); }
let nT; function notify(t){ $("notifyT").textContent=t; const n=$("notify"); n.classList.add("show"); clearTimeout(nT); nT=setTimeout(()=>n.classList.remove("show"),2400); }

/* ---------- 사운드 (WebAudio 합성) ---------- */
let ac=null, soundOn=true, clockTimer=null, sfxBus=null, sfxLevel=null;
function audio(){ if(!ac){ try{
  ac=new (window.AudioContext||window.webkitAudioContext)();
  const limiter=ac.createDynamicsCompressor(); limiter.threshold.value=-18; limiter.knee.value=12; limiter.ratio.value=4; limiter.attack.value=.003; limiter.release.value=.18;
  sfxLevel=ac.createGain(); sfxLevel.gain.value=.6; limiter.connect(sfxLevel); sfxLevel.connect(ac.destination); sfxBus=limiter;
}catch(e){} } return ac; }
function noiseBuf(){ const b=ac.createBuffer(1,ac.sampleRate*.4,ac.sampleRate), d=b.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1; return b; }
const SFXF={}; function SFX(n,v){ try{ if(!soundOn) return; let a=SFXF[n]; if(!a){ a=SFXF[n]=new Audio("sfx/"+n+".mp3"); a.preload="auto"; } const c=a.cloneNode(); c.volume=Math.min(1,v||.6); c.play().catch(()=>{}); }catch(e){} }
['flip','door','gasp','tick','horn','squeak','hit','steps','tear','tear2','rustle','lock','cup'].forEach(n=>{ try{ const a=new Audio("sfx/"+n+".mp3"); a.preload="auto"; SFXF[n]=a; }catch(e){} });
function creak(){ if(!soundOn) return; SFX("door",.6); return; if(!audio()) return; const t=ac.currentTime;
  const o=ac.createOscillator(), f=ac.createBiquadFilter(), g=ac.createGain(), l=ac.createOscillator(), lg=ac.createGain();
  o.type="sawtooth"; o.frequency.setValueAtTime(70,t); o.frequency.linearRampToValueAtTime(115,t+.9); o.frequency.linearRampToValueAtTime(82,t+2);
  l.frequency.value=23; lg.gain.value=18; l.connect(lg); lg.connect(o.frequency);
  f.type="bandpass"; f.frequency.value=950; f.Q.value=9;
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(.16,t+.25); g.gain.linearRampToValueAtTime(.09,t+1.4); g.gain.linearRampToValueAtTime(0,t+2.1);
  o.connect(f); f.connect(g); g.connect(sfxBus||ac.destination); o.start(t); l.start(t); o.stop(t+2.2); l.stop(t+2.2); }
/* 실제 녹음 효과음(짧은 간격 중복 방지 + 아주 약한 높낮이 변화로 같은 소리가 기계처럼 반복되지 않게) */
const RSFX_T={}; function RSFX(n,v,gap){ try{ if(!soundOn) return; const now=performance.now(); if(now-(RSFX_T[n]||0)<(gap||60)) return; RSFX_T[n]=now;
  let a=SFXF[n]; if(!a){ a=SFXF[n]=new Audio("sfx/"+n+".mp3"); a.preload="auto"; } const c=a.cloneNode(); c.volume=Math.max(0,Math.min(1,v||.5)); try{ c.preservesPitch=false; c.playbackRate=.94+Math.random()*.12; }catch(e){} c.play().catch(()=>{}); }catch(e){} }
/* 렉 줄이기: 화면에 안 보이는 반복 영상은 디코딩을 멈춘다 (타이틀 뒤 열차 영상은 조사 시작 후, 방 배경은 엔딩에서) */
setInterval(()=>{ try{ const tv=document.getElementById("titleTrainV"); if(tv&&!tv.paused&&["explore","inspect","closeup","talk","find","scrub","manip","board","end"].includes(mode)) tv.pause();
  if(mode==="end") document.querySelectorAll("video.vloop").forEach(v=>{ if(!v.paused) v.pause(); }); }catch(e){}
  /* 3D 증거 화면이 열려 있는 동안엔 뒤에 깔린 방 영상을 멈춘다(흐림 효과를 매 프레임 다시 계산하지 않게). 닫으면 다시 재생 */
  try{ const ov=!!(EX||DV||S3); document.querySelectorAll("video.vloop").forEach(v=>{ if(ov){ if(!v.paused){ v.pause(); v.__ovp=1; } } else if(v.__ovp&&mode!=="end"){ v.__ovp=0; v.play().catch(()=>{}); } }); }catch(e){} },700);
/* 조사·심문 중 이따금 들리는 객차 소리(실제 녹음): 나무 삐걱, 먼 기적 */
(function carriageLife(){ setTimeout(()=>{ try{ if(soundOn&&["explore","inspect","closeup","talk","find","scrub","manip"].includes(mode)){ const L=[["woodcreak",.15],["squeak",.09],["horn",.06],["woodcreak",.11]], p=L[Math.floor(Math.random()*L.length)]; RSFX(p[0],p[1],4000); } }catch(e){} carriageLife(); },14000+Math.random()*16000); })();
/* hit(): 예전에는 합성 잡음이었다 → 높이에 따라 실제 녹음으로 바꿔 재생 (낮음=둔탁한 쿵, 900=단서 발견 타자기 키, 가운데=종이, 높음=시계 똑딱) */
function hit(freq,vol,dur,type="lowpass"){ if(!soundOn) return; { const v=Math.max(.06,Math.min(.8,vol*1.7));
    if(freq<400) return RSFX("thud",v,90);
    if(freq===900) return RSFX(Math.random()<.5?"key":"key2",Math.min(.7,v+.12),60);
    if(freq<1300) return RSFX("flip",v,90);
    if(freq===3000) return RSFX("tick",.05,240);
    return RSFX("tick",Math.max(.05,v*.8),70); }
  if(!audio()) return; const t=ac.currentTime, s=ac.createBufferSource(), f=ac.createBiquadFilter(), g=ac.createGain();
  s.buffer=noiseBuf(); f.type=type; f.frequency.value=freq; g.gain.setValueAtTime(vol,t); g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  s.connect(f); f.connect(g); g.connect(sfxBus||ac.destination); s.start(t); s.stop(t+dur+.05); }
function steps(n=2){ SFX("steps",.35); }
const AMB={}; function ambStop(){ Object.values(AMB).forEach(a=>{ try{ a.pause(); }catch(e){} }); }
function startClock(){ if(!soundOn) return; [["rumble",.30],["clock",.10],["carriage",.14]].forEach(([n,v])=>{ let a=AMB[n]; if(!a){ a=AMB[n]=new Audio("sfx/"+n+".mp3"); a.loop=true; } a.volume=v; a.play().catch(()=>{}); }); }   // 조사 중 은은한 시계 소리 + 낮은 열차 진동음
let watchTimer=0, watchStopTimer=0;
function stopWatchTick(){ clearInterval(watchTimer); clearTimeout(watchStopTimer); watchTimer=0; }
function startWatchTick(){ stopWatchTick(); if(!soundOn||!audio()) return; let n=0;
  const pulse=()=>{ hit(n++%2?1600:2500,.11,.045,"bandpass"); };
  pulse(); watchTimer=setInterval(pulse,480); watchStopTimer=setTimeout(stopWatchTick,3800);
}
function paper(){ SFX("rustle",.3); }
$("soundBtn").onclick=e=>{ soundOn=!soundOn; $("soundT").textContent=soundOn?"소리":"음소거"; $("soundBtn").setAttribute("aria-pressed",soundOn); if(soundOn){audio(); ac&&ac.resume(); startClock();} else ambStop(); if(sfxLevel) sfxLevel.gain.setTargetAtTime(soundOn ? .6 : 0,ac.currentTime,.02); document.querySelectorAll("#proVid,#evClipV,#tkVid,#tkReact,#sbVidV,.cuv,.stage>video").forEach(v=>v.muted=!soundOn); };

/* ---------- 인트로 (영상 기반 카메라 연출) ---------- */
let introId=0; const wait=ms=>new Promise(r=>setTimeout(r,ms));
$("enterBtn").onclick=async()=>{
  audio(); ac&&ac.resume();
  $("title").classList.add("gone"); $("skipBtn").hidden=false;
  mode="intro"; const my=++introId;
  if(INTRO_VIDEO){ return playVideo(my); }
  creak(); $("door").classList.add("open");
  ease=.018; tgt.fx=50; tgt.fy=50; tgt.s=1.25;
  await wait(1500); if(my!==introId) return; steps(2);
  const shots=[
    [38,60,1.8,2800,"식기가 두 벌이다. 로크는 혼자가 아니었다."],
    [63,73,2.1,2600,"깨진 와인잔. 아직 마르지 않았다."],
    [82,52,1.6,2000,""],
    [63,32,2.2,3200,"밴더빌트 로크. Ada를 가둔 남자가… 먼저 죽었다."]
  ];
  for(const [fx,fy,s,ms,t] of shots){ tgt.fx=fx; tgt.fy=fy; tgt.s=s; if(t) think(t,ms-200); await wait(ms); if(my!==introId) return; }
  enterExplore();
};
async function playVideo(my){
  const v=document.createElement("video"); v.src=INTRO_VIDEO; v.playsInline=true; v.volume=.65;
  Object.assign(v.style,{position:"absolute",inset:0,width:"100%",height:"100%",objectFit:"cover",zIndex:8,transition:"opacity .8s"});
  stage.appendChild(v); $("door").classList.add("open");
  v.onended=()=>{ if(my===introId) enterExplore(); v.style.opacity=0; setTimeout(()=>v.remove(),900); };
  $("skipBtn").addEventListener("click",()=>{v.pause(); v.style.opacity=0; setTimeout(()=>v.remove(),900);},{once:true});
  try{ await v.play(); }catch(e){ try{ v.muted=true; await v.play(); }catch(_){ enterExplore(); v.remove(); } }
}
function enterExplore(){
  introId++; $("door").classList.add("open"); $("title").classList.add("gone"); $("skipBtn").hidden=true;
  mode="explore"; stage.classList.add("explore"); stage.classList.remove("inspect");
  ease=.05; tgt.s=1.4; tgt.fx=50; tgt.fy=50;
  think("누가 먼저 손을 썼는지 알아내야 한다.",2800); if(soundOn) startClock();
}
$("skipBtn").onclick=enterExplore;

/* ---------- 종이 · 사진 도우미 ---------- */
const TIER=["관찰","현장","정밀","숨김"];
const SHORT={glass:"와인잔",plates:"식기",card:"와인 전표",bedside:"약병",victim:"회중시계",window:"잠긴 창문",sofa:"개털",books:"정비 기록",statue:"초록 병",shawl:"숄과 쪽지",doll:"인형 녹음",crow:"카드 까마귀"};
const SCRIBBLE={glass:"독!",plates:"누가 앉았나?",card:"9시 = E.B.",bedside:"E.B. 필체",victim:"21:47 사망",window:"내부자다",sofa:"9시 전에 떠남",books:"Ada…",statue:"숨겼다",shawl:"8:30 다툼",doll:"기억하는 인형",crow:"C-3 생존자?",portrait:"로크",train:"Ada의 열차"};
const INK=`<svg class="inkspl" viewBox="0 0 400 300" preserveAspectRatio="none" aria-hidden="true" fill="#0d0b09"><path d="M18 212 L318 104 L306 142 L30 246Z" opacity=".8"/><path d="M60 118 L380 40 L372 66 L70 150Z" opacity=".6"/><path d="M2 150 L240 70 L236 90 L8 176Z" opacity=".7"/><path d="M120 280 L396 170 L384 200 L126 300Z" opacity=".75"/><path d="M40 60 L200 20 L196 34 L44 76Z" opacity=".45"/></svg>`;
const CIRCLE=`<svg class="circle" viewBox="0 0 120 90" aria-hidden="true"><path d="M20 50 C 10 20, 90 5, 108 38 C 120 70, 40 88, 22 62 C 16 52, 30 40, 44 36" stroke="#b8352b" stroke-width="3" fill="none" stroke-linecap="round"/></svg>`;
const LOCK=`<svg class="lock" viewBox="0 0 24 24" aria-hidden="true"><rect x="5" y="11" width="14" height="10" rx="1.5"/><path d="M8 11V8a4 4 0 018 0v3"/></svg>`;
function tornClip(el,ax=1,ay=1.4,n=36,sides="trbl"){
  const P=[], r=()=>Math.random(), jx=s=>sides.includes(s)?r()*ax:0, jy=s=>sides.includes(s)?r()*ay:0, m=Math.max(4,Math.round(n*.6)), f=v=>v.toFixed(2)+"%";
  for(let i=0;i<=n;i++) P.push(f(i/n*100)+" "+f(jy("t")));
  for(let i=1;i<m;i++) P.push(f(100-jx("r"))+" "+f(i/m*100));
  for(let i=n;i>=0;i--) P.push(f(i/n*100)+" "+f(100-jy("b")));
  for(let i=m-1;i>0;i--) P.push(f(jx("l"))+" "+f(i/m*100));
  el.style.clipPath=`polygon(${P.join(",")})`;
}
/* 증거 확대 이미지 (ev/<id>.jpg) — 없으면 방 사진을 잘라 씀 */
const EVIMG={};
["doll"].forEach(id=>{ const im=new Image(); im.onload=()=>{ EVIMG[id]=im.src; }; im.src="ev/"+id+".jpg"; });
function crop(el,s,Z,r){ el.dataset.ev=s.id; if(EVIMG[s.id]){ el.style.backgroundImage=`url(${EVIMG[s.id]})`; el.style.backgroundSize="contain"; el.style.backgroundPosition="center"; return; } const a=.5625;
  const px=clamp((s.x/100*Z-.5)/(Z-1),0,1)*100, py=clamp((s.y/100*Z*a-r/2)/(Z*a-r),0,1)*100;
  el.style.backgroundImage=`url(${IMG})`; el.style.backgroundSize=`${Z*100}% auto`; el.style.backgroundPosition=`${px.toFixed(1)}% ${py.toFixed(1)}%`; }
function sizeUnit(){ stage.style.setProperty("--u",(stage.clientWidth/100)+"px"); }
sizeUnit(); addEventListener("resize",sizeUnit);
document.querySelectorAll("[data-torn]").forEach(el=>{ const [ax,ay,n,sd]=el.dataset.torn.split(","); tornClip(el,+ax,+ay,+n,sd||"trbl"); });

/* ---------- 조사 (증거 게시판) ---------- */
let freshId=null, lastFound=null;
/* ---------- 클로즈업: 조사하면 그 장면으로 들어간다 ---------- */
const CUVID={doll:"ev/doll.mp4"};   // 클로즈업 배경을 영상으로 (인형: 빨간 눈 깜빡임)
const CLOSE={
  doll:{reach:"의자 밑으로 손 뻗기",pre:"의자 밑, 어둠 속에 뭔가 있다.",seen:"레이스 인형… 한쪽 눈이 빨갛게 깜빡인다.",
        hots:[{x:48,y:66,label:"붉은 눈 들여다보기",act:"rec"}]}
};
let CU=null;
function cuThink(t,ms=3200){ const el=$("cuTh"); el.innerHTML=sentBr(t); el.classList.add("on"); clearTimeout(el._t); el._t=setTimeout(()=>el.classList.remove("on"),ms); }
function openCloseup(s){
  const cf=CLOSE[s.id]; activeSpot=s; mode="closeup"; CU={s,cf};
  $("prompt").classList.remove("show"); stage.classList.remove("explore"); closeBook();
  ease=.08; tgt.s=3; tgt.fx=s.x; tgt.fy=s.y; steps(1);
  $("cuLoc").textContent=s.loc; $("cuTitle").textContent=s.title;
  const ph=$("cuPh"), L=$("cuLayer"); L.innerHTML="";
  const seen=opened.has(s.id)||found.has(s.id);
  ph.querySelector("video.cuv")?.remove();
  const show=()=>{ ph.style.backgroundImage=`url(${EVIMG[s.id]})`; ph.classList.remove("cudim","pre"); $("cu").classList.add("open");
    if(s.id==="doll"&&window.THREE&&THREE.GLTFLoader){ ph.style.backgroundImage="none"; (window.__dollOut?dollPick:dollChair)(); setTimeout(()=>cuThink(found.has(s.id)?s.th:cf.seen,3400),600); return; }
    if(CUVID[s.id]){ const v=document.createElement("video"); v.className="cuv"; v.src=CUVID[s.id]; v.loop=true; v.playsInline=true; v.muted=!soundOn; v.volume=.6; ph.appendChild(v); v.play().catch(()=>{ v.muted=true; v.play().catch(()=>{}); }); }
    setTimeout(()=>cuThink(found.has(s.id)?s.th:cf.seen,3400),600); drawHots(); };
  if(cf.reach && !seen && s.id==="doll" && window.THREE && THREE.GLTFLoader){
    // 3D 장면에서 직접 손을 뻗어 끌어내므로, 버튼 단계 없이 짧게 다가갔다(줌) 딱 끊고 바로 들어간다
    ease=.2; opened.add(s.id); refreshMarkers();
    setTimeout(()=>{ hit(300,.18,.12); $("cuFlash").classList.add("on"); ph.style.backgroundSize="cover"; ph.style.backgroundPosition="center";
      setTimeout(()=>{ $("cuFlash").classList.remove("on"); show(); },180); },320);
    return;
  }
  if(cf.reach && !seen){
    // 1단계: 방 사진을 그 자리로 확대해서 보여 주고, 손을 뻗을지 묻는다
    ph.style.backgroundImage=`url(${IMG})`; ph.style.backgroundSize="320% auto"; ph.style.backgroundPosition=`${Math.max(0,Math.min(100,(s.x/100*3.2-.5)/2.2*100))}% ${Math.max(0,Math.min(100,(s.y/100*3.2-.5)/2.2*100))}%`; ph.classList.add("pre");
    setTimeout(()=>{ $("cu").classList.add("open"); cuThink(cf.pre,3000); },450);
    const b=document.createElement("button"); b.className="reach"; b.innerHTML=`${cf.reach} <span class="key">F</span>`; L.appendChild(b);
    const go=()=>{ b.remove(); hit(300,.3,.25); paper(); $("cuFlash").classList.add("on"); opened.add(s.id); refreshMarkers();
      setTimeout(()=>{ ph.classList.remove("pre"); ph.style.backgroundSize="cover"; ph.style.backgroundPosition="center"; ph.style.transition="none"; ph.style.transform="scale(1.12)"; void ph.offsetWidth; ph.style.transition=""; ph.style.transform="";
        $("cuFlash").classList.remove("on"); show(); },450); };
    b.onclick=go; CU.f=go;
  } else { ph.style.backgroundSize="cover"; ph.style.backgroundPosition="center"; setTimeout(show,300); }
}
function drawHots(){
  const {s,cf}=CU, L=$("cuLayer");
  (cf.hots||[]).forEach(h=>{ const b=document.createElement("button"); b.className="hot"; b.style.left=h.x+"%"; b.style.top=h.y+"%"; b.innerHTML=`<span>${h.label}</span>`; b.setAttribute("aria-label",h.label);
    const run=()=>{ b.remove(); if(h.act==="rec"){ hit(320,.19,.13,"lowpass"); dollPlayback(); } }; b.onclick=run; CU.f=run; L.appendChild(b); });
  if(!(cf.hots||[]).length) CU.f=null;
}
/* 인형 기억 재생 — 붉은 눈을 누르면 카메라가 눈 속으로 들어가고, 인형이 기억한 그 밤이 재생된다.
   타임코드가 21:41 → 21:47 로 흐르고, 대사는 자막으로. 21:47에 둔탁한 소리가 쿵, 화면이 덜컹하고 암전 */
function dollThud(){ if(soundOn){ SFX("hit",.75); return; } try{ if(!soundOn||!audio()) return; const t=ac.currentTime, out=sfxBus||ac.destination;
    const o=ac.createOscillator(), g=ac.createGain(); o.type="sine"; o.frequency.setValueAtTime(78,t); o.frequency.exponentialRampToValueAtTime(32,t+.5);
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(1,t+.008); g.gain.exponentialRampToValueAtTime(.001,t+.9); o.connect(g); g.connect(out); o.start(t); o.stop(t+1);
    const n=ac.createBuffer(1,ac.sampleRate*.4,ac.sampleRate), d=n.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,3);
    const ns=ac.createBufferSource(), lp=ac.createBiquadFilter(), ng=ac.createGain(); ns.buffer=n; lp.type="lowpass"; lp.frequency.value=420; ng.gain.value=.8; ns.connect(lp); lp.connect(ng); ng.connect(out); ns.start(t);
  }catch(e){} }
function glassClink(){ if(soundOn){ SFX("cup",.5); return; } try{ if(!soundOn||!audio()) return; const t0=ac.currentTime+.01, out=sfxBus||ac.destination;
    [[0,1],[.045,.55]].forEach(([dt,v])=>{ const t=t0+dt;                        // 두 잔이 '챙' 하고 거의 동시에
      [[2637,.5],[2649,.4],[4180,.22],[6050,.12],[7310,.06]].forEach(([f,a])=>{ const o=ac.createOscillator(), g=ac.createGain(); o.type="sine"; o.frequency.value=f*(1+(Math.random()-.5)*.004);
        g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(a*v*.22,t+.003); g.gain.exponentialRampToValueAtTime(.0001,t+(f<3000?1.8:.7)); o.connect(g); g.connect(out); o.start(t); o.stop(t+1.9); });
      const n=ac.createBuffer(1,ac.sampleRate*.02,ac.sampleRate), d=n.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2);   // 부딪히는 순간 '딱'
      const ns=ac.createBufferSource(), hp=ac.createBiquadFilter(), ng=ac.createGain(); ns.buffer=n; hp.type="highpass"; hp.frequency.value=3000; ng.gain.value=.25*v; ns.connect(hp); hp.connect(ng); ng.connect(out); ns.start(t); });
  }catch(e){} }
function dollPlayback(){ const s=CU.s, L=$("cuLayer"), ph=$("cuPh"); L.querySelector(".dpb")?.remove(); window.__recA?.pause();
  const SUB=[[.35,"21:41","“…대표님, 한 잔 더 드세요.”",0],[3.0,"21:44","(잔이 부딪히는 소리)",0],[3.5,"21:46","“…엘레나, 너 뭘……”",1],[5.7,"21:47","",1]];
  const o=document.createElement("div"); o.className="dpb";
  o.innerHTML=`<div class="dpb-top"><i></i>VOICE RECORDER<span>음성 녹음기</span></div><div class="dpb-sub"></div><div class="dpb-rec"><div class="rh"><b>PLAYBACK</b><span>재생</span><em class="st">● PLAYING · 재생 중</em></div><div class="rf"><b>REC_0224.wav</b><span class="rt">00:00 / 00:06</span></div><div class="bars">${Array.from({length:48},(_,i)=>`<u style="--h:${16+Math.round(Math.abs(Math.sin(i*1.7)*Math.cos(i*.6))*74)}%;--d:${(i%7)*.09}s"></u>`).join("")}</div><div class="pg"><i></i></div><div class="rl"><span>INTERNAL RECORDER · 인형 내장 녹음기</span></div></div>`;
  L.appendChild(o); if(DV) o.classList.add("on3d"); else ph.classList.add("eyezoom"); $("cu").classList.add("pb"); $("cuTh").classList.remove("on"); requestAnimationFrame(()=>o.classList.add("on"));
  const sub=o.querySelector(".dpb-sub"), at=(ms,f)=>setTimeout(()=>{ if(o.isConnected) f(); },ms);
  at(900,()=>{ try{ if(soundOn){ if(!window.__recA){ window.__recA=new Audio("ev/doll_rec.mp3"); window.__recA.volume=.95; } window.__recA.currentTime=0; window.__recA.play().catch(()=>{}); } }catch(e){} });
  at(900+3000,()=>{ if(!soundOn) return; if(!window.__recA||window.__recA.paused) glassClink(); });   // 21:44 잔 소리 — 녹음(doll_rec)에 이미 들어 있으니 녹음이 안 나올 때만
  SUB.forEach(([t,c,txt,red])=>at(900+t*1000,()=>{ if(txt){ sub.innerHTML=txt; sub.classList.toggle("red",!!red); sub.classList.remove("in"); void sub.offsetWidth; sub.classList.add("in"); } else sub.classList.remove("in"); }));
  at(900+5900,()=>{ if(!window.__recA||window.__recA.paused) dollThud(); o.classList.add("hit"); if(!DV) ph.classList.add("jolt"); else { DV.wrap.classList.remove("shk"); void DV.wrap.offsetWidth; DV.wrap.classList.add("shk"); } });   // 둔탁한 소리
  { const rt=o.querySelector(".rt"), pgi=o.querySelector(".pg i"), t0=Date.now(); const iv=setInterval(()=>{ if(!o.isConnected){ clearInterval(iv); return; } const el=Math.max(0,Math.min(6.2,(Date.now()-t0-900)/1000)); rt.textContent="00:0"+Math.floor(el)+" / 00:06";  pgi.style.width=(el/6.2*100)+"%"; if(el>=6.2){ o.classList.add("done"); o.querySelector(".st").textContent="■ END OF RECORDING · 녹음 끝"; clearInterval(iv); } },100); }
  at(900+6150,()=>o.classList.add("done"));
  at(900+7400,()=>{ o.classList.remove("on"); ph.classList.remove("eyezoom","jolt"); $("cu").classList.remove("pb");
    setTimeout(()=>{ o.remove(); dollClose(); if(!found.has(s.id)){ miniDone.add(s.id); collect(s); } closeCloseup(); setTimeout(()=>inspectBoard(s),120); },900); });   // 끝나면 다른 증거처럼 증거 확인 화면으로
}
/* (이전 방식: 인형을 3D로 돌려 스피커를 찾던 단계 — 지금은 쓰지 않음) */
let DV=null;
function dollClose(){ if(!DV) return; cancelAnimationFrame(DV.raf); DV.wrap.remove(); try{ DV.R.dispose(); DV.R.forceContextLoss(); }catch(e){} DV=null; window.__excam&&window.__excam(false); }
function dollLift(){
  const L=$("cuLayer"); $("cuPh").classList.add("cudim");
  const wrap=document.createElement("div"); wrap.className="doll-lift";
  wrap.innerHTML='<img src="ev/doll.jpg" alt="레이스 인형"><p>의자 밑에서 인형을 집어 들었다.<br>한쪽 눈이 붉게 깜빡인다.</p><button type="button">등의 작은 스피커 확인 ›</button>';
  L.appendChild(wrap);
  wrap.querySelector("button").onclick=()=>{ wrap.remove(); recPanel(); };
}
function woodFloor(){ const c=document.createElement("canvas"); c.width=c.height=512; const g=c.getContext("2d"); const pl=16, ph=512/pl;
  for(let i=0;i<pl;i++){ const y=i*ph, l=11+Math.random()*7; g.fillStyle=`hsl(${22+Math.random()*6},${38+Math.random()*10}%,${l}%)`; g.fillRect(0,y,512,ph);
    for(let k=0;k<46;k++){ g.strokeStyle=`rgba(${Math.random()<.5?'20,10,4':'70,40,18'},${.08+Math.random()*.14})`; g.lineWidth=.5+Math.random()*1.4; const yy=y+Math.random()*ph; g.beginPath(); g.moveTo(0,yy); for(let x=0;x<=512;x+=64) g.lineTo(x,yy+(Math.random()-.5)*4); g.stroke(); }
    g.fillStyle="rgba(0,0,0,.3)"; g.fillRect(0,y,512,1.5); const sx=(i*173)%512; g.fillRect(sx,y,2,ph); }
  const t=new THREE.CanvasTexture(c); t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(4,4); t.anisotropy=4; t.encoding=THREE.sRGBEncoding; return t; }
function roomTex(kind){ const c=document.createElement("canvas"); c.width=c.height=512; const g=c.getContext("2d");
  if(kind==="wall"){ g.fillStyle="#1d3526"; g.fillRect(0,0,512,512);
    for(let y=0;y<4;y++) for(let x=0;x<4;x++){ const cx=x*128+(y%2?64:0)+32, cy=y*128+64; g.save(); g.translate(cx,cy); g.fillStyle="rgba(70,120,85,.28)"; g.beginPath(); g.ellipse(0,0,15,44,0,0,7); g.fill(); g.beginPath(); g.ellipse(0,0,36,14,0,0,7); g.fill(); g.fillStyle="rgba(10,25,15,.35)"; g.beginPath(); g.ellipse(0,0,7,24,0,0,7); g.fill(); g.restore(); }
    const gr=g.createLinearGradient(0,0,0,512); gr.addColorStop(0,"rgba(0,0,0,.2)"); gr.addColorStop(1,"rgba(0,0,0,0)"); g.fillStyle=gr; g.fillRect(0,0,512,512); }
  else { g.fillStyle="#4a1418"; g.fillRect(0,0,512,512); g.strokeStyle="#c9a35a"; g.lineWidth=5; g.strokeRect(22,22,468,468); g.lineWidth=2; g.strokeRect(40,40,432,432); g.strokeStyle="rgba(201,163,90,.55)"; g.lineWidth=1.5;
    for(let i=0;i<9;i++) for(let j=0;j<9;j++){ g.beginPath(); g.ellipse(70+i*46,70+j*46,13,13,0,0,7); g.stroke(); if((i+j)%2===0){ g.fillStyle="rgba(201,163,90,.22)"; g.beginPath(); g.ellipse(70+i*46,70+j*46,6,6,0,0,7); g.fill(); } }
    for(let k=0;k<3500;k++){ g.fillStyle=`rgba(${Math.random()<.5?'0,0,0':'120,60,50'},.08)`; g.fillRect(Math.random()*512,Math.random()*512,2,2); } }
  const t=new THREE.CanvasTexture(c); t.encoding=THREE.sRGBEncoding; t.anisotropy=4; if(kind==="wall"){ t.wrapS=t.wrapT=THREE.RepeatWrapping; t.repeat.set(3,2); } return t; }
function dollRoom(S){   // 의자·러그만 남김 (벽·바닥·램프 갓은 없음). 빛만 그대로 두어 러그 결과 의자 그림자가 산다
  m3dLoad("rug3d.glb",g=>{ const m=g.scene.clone(), bb=new THREE.Box3().setFromObject(m), c=bb.getCenter(new THREE.Vector3()), sz=bb.getSize(new THREE.Vector3()); m.position.set(-c.x,-bb.min.y,-c.z); const gp=new THREE.Group(); gp.add(m); gp.scale.setScalar(1.9/sz.x); gp.position.set(.1,.001,.1); m.traverse(o=>{ if(o.isMesh){ o.receiveShadow=true; if(o.material){ o.material.side=THREE.FrontSide; if(o.material.map) o.material.map.anisotropy=8; o.material.color&&o.material.color.multiplyScalar(.7); } } }); S.add(gp); });
  const lamp=new THREE.PointLight(0xffb36b,1.1,4.5,1.8); lamp.position.set(1.5,.85,-.2); S.add(lamp);     // 화면 밖 탁자 램프의 따뜻한 빛
  const win=new THREE.PointLight(0x6f94b5,1.4,6,1.6); win.position.set(-2.2,1.5,.9); S.add(win);           // 창가의 차가운 빛
  return lamp; }
/* 천사 조각상과 같은 배경(따뜻한 어두운 회색 + 위쪽 스포트 + 비네트)을 더 어둡게 — 후처리 합성이 불투명이라 씬 배경 텍스처로 그린다 */
function darkBackdrop(){ const c=document.createElement("canvas"); c.width=1024; c.height=576; const g=c.getContext("2d"), W=c.width, H=c.height;
  let q=g.createLinearGradient(0,0,0,H); q.addColorStop(0,"#1b1a18"); q.addColorStop(.52,"#141311"); q.addColorStop(1,"#0b0a09"); g.fillStyle=q; g.fillRect(0,0,W,H);
  const el=(cx,cy,rx,ry,stops)=>{ g.save(); g.translate(cx,cy); g.scale(rx,ry); const r=g.createRadialGradient(0,0,0,0,0,1); stops.forEach(([o,c])=>r.addColorStop(o,c)); g.fillStyle=r; g.fillRect(-1,-1,2,2); g.restore(); };
  el(W*.5,H*.26,W*.26,H*.62,[[0,"rgba(255,236,206,.10)"],[.55,"rgba(255,236,206,.03)"],[1,"rgba(255,236,206,0)"]]);
  el(W*.5,H*.45,W*.85,H*.85,[[0,"rgba(0,0,0,0)"],[.5,"rgba(0,0,0,0)"],[1,"rgba(0,0,0,.75)"]]);
  const t=new THREE.CanvasTexture(c); t.encoding=THREE.sRGBEncoding; return t; }
function dollChair(){ if(DV) return; const L=$("cuLayer"), s=CU.s; $("cuPh").classList.add("cudim");
  const wrap=document.createElement("div"); wrap.className="v3d dollv chair"; L.appendChild(wrap); v3bg(wrap);
  const R=new THREE.WebGLRenderer({antialias:true,alpha:true}); R.outputEncoding=THREE.sRGBEncoding; R.physicallyCorrectLights=true; R.toneMapping=THREE.ACESFilmicToneMapping; R.setPixelRatio(Math.min(devicePixelRatio,2)); R.shadowMap.enabled=true; R.shadowMap.type=THREE.PCFSoftShadowMap; wrap.appendChild(R.domElement);
  const S=new THREE.Scene(), C=new THREE.PerspectiveCamera(30,16/9,.01,50); S.environment=exEnv(R);
  let comp=null; if(THREE.EffectComposer&&THREE.BokehPass&&THREE.ShaderPass){ try{ R.toneMapping=THREE.NoToneMapping; R.setPixelRatio(Math.min(devicePixelRatio,1.5)); comp=new THREE.EffectComposer(R); comp.addPass(new THREE.RenderPass(S,C)); comp.addPass(new THREE.BokehPass(S,C,{focus:1.0,aperture:.0006,maxblur:.012}));
      comp.addPass(new THREE.ShaderPass({uniforms:{tDiffuse:{value:null},ex:{value:1.0}},vertexShader:"varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}",fragmentShader:"uniform sampler2D tDiffuse;uniform float ex;varying vec2 vUv;void main(){vec3 c=texture2D(tDiffuse,vUv).rgb*ex;c=clamp((c*(2.51*c+.03))/(c*(2.43*c+.59)+.14),0.,1.);gl_FragColor=vec4(pow(c,vec3(1./2.2)),1.);}"})); }catch(e){ comp=null; R.toneMapping=THREE.ACESFilmicToneMapping; } }
  S.add(new THREE.HemisphereLight(0xffe7c4,0x16241a,.16)); const key=new THREE.SpotLight(0xffd2a0,28,14,.5,.9,1.4); key.position.set(.3,3.4,.45); key.target.position.set(0,.3,.1);   /* 거의 머리 위에서 내려와 좌석 그림자가 의자 밑을 덮음 */ S.add(key,key.target); key.castShadow=true; key.shadow.mapSize.set(2048,2048); key.shadow.bias=-.0004; key.shadow.radius=6; key.shadow.normalBias=.01; R.toneMappingExposure=1.15;
  const rim=new THREE.PointLight(0x9ec4ae,.35,8,1.6); rim.position.set(-1.4,1.3,-1.2); S.add(rim);
  const fl=new THREE.Mesh(new THREE.PlaneGeometry(14,14),new THREE.ShadowMaterial({opacity:.55})); fl.rotation.x=-Math.PI/2; fl.receiveShadow=true; S.add(fl); S.background=darkBackdrop();
  /* 의자 밑 장면에도 인형 살펴보기와 같은 3D 방을 뒤에 깐다: 방을 그리는 캔버스(roomBack)를 이 장면의 배경 텍스처로 써서, 초점 흐림·색 보정을 같이 받게 한다 */
  roomBack(wrap,"doll",()=>DV&&DV.C);
  { const rc=wrap.querySelector("canvas.v3room"); if(rc){ const bt=new THREE.CanvasTexture(rc); bt.encoding=THREE.sRGBEncoding; bt.minFilter=bt.magFilter=THREE.LinearFilter; bt.generateMipmaps=false;
      let n=0; (function up(){ if(!wrap.isConnected){ try{ bt.dispose(); }catch(e){} return; } if(rc.width>8){ bt.needsUpdate=true; if(++n===3) S.background=bt; } requestAnimationFrame(up); })(); } } S.fog=new THREE.FogExp2(0x0e0d0c,.3); const roomLamp=dollRoom(S);
  const NP=90, pg=new THREE.BufferGeometry(), pa=new Float32Array(NP*3), pv=[]; for(let i=0;i<NP;i++){ pa[i*3]=(Math.random()-.5)*1.6; pa[i*3+1]=Math.random()*1.8; pa[i*3+2]=(Math.random()-.5)*1.4; pv.push(.01+Math.random()*.02); }
  pg.setAttribute("position",new THREE.BufferAttribute(pa,3)); const dc=document.createElement("canvas"); dc.width=dc.height=32; { const g3=dc.getContext("2d"), q3=g3.createRadialGradient(16,16,0,16,16,16); q3.addColorStop(0,"rgba(255,230,190,1)"); q3.addColorStop(1,"rgba(255,230,190,0)"); g3.fillStyle=q3; g3.fillRect(0,0,32,32); }
  const dust=new THREE.Points(pg,new THREE.PointsMaterial({map:new THREE.CanvasTexture(dc),size:.018,transparent:true,opacity:.5,depthWrite:false,blending:THREE.AdditiveBlending}));   // 흰 먼지 입자는 쓰지 않음
  const hint=document.createElement("div"); hint.className="v3hint"; hint.innerHTML="<small>의자 밑 어둠 속에서 붉은 빛이 깜빡인다.</small><b>손을 뻗어 아래로 끌어 꺼내 보자. (클릭만 해도 됩니다)</b>"; wrap.appendChild(hint);
  const bar=document.createElement("div"); bar.className="v3bar"; bar.innerHTML="<i></i>"; wrap.appendChild(bar);
  const x=document.createElement("button"); x.className="dollx"; x.innerHTML="물러나기"; x.onclick=()=>{ dollClose(); closeCloseup(); }; wrap.appendChild(x);
  const dollG=new THREE.Group(); S.add(dollG);
  { const sc=document.createElement("canvas"); sc.width=sc.height=128; const g4=sc.getContext("2d"), r4=g4.createRadialGradient(64,64,0,64,64,64); r4.addColorStop(0,"rgba(0,0,0,.92)"); r4.addColorStop(.55,"rgba(0,0,0,.6)"); r4.addColorStop(1,"rgba(0,0,0,0)"); g4.fillStyle=r4; g4.fillRect(0,0,128,128);
    const pool=new THREE.Mesh(new THREE.PlaneGeometry(1.15,.95),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(sc),transparent:true,depthWrite:false,fog:false})); pool.rotation.x=-Math.PI/2; pool.position.set(0,.004,-.08); pool.renderOrder=1; S.add(pool); }   // 의자 밑 짙은 그늘
  const gc=document.createElement("canvas"); gc.width=gc.height=64; { const g2=gc.getContext("2d"), q=g2.createRadialGradient(32,32,0,32,32,32); q.addColorStop(0,"rgba(255,90,60,1)"); q.addColorStop(.25,"rgba(255,40,20,.55)"); q.addColorStop(1,"rgba(255,20,10,0)"); g2.fillStyle=q; g2.fillRect(0,0,64,64); }
  const glint=new THREE.Sprite(new THREE.SpriteMaterial({map:new THREE.CanvasTexture(gc),blending:THREE.AdditiveBlending,transparent:true,depthWrite:false,depthTest:true})); glint.scale.setScalar(.018); glint.position.set(.012,.135,.05); dollG.add(glint);
  const eyeL=new THREE.PointLight(0xff3a20,0,.14,2); eyeL.position.set(.012,.135,.08); dollG.add(eyeL);
  const reveal=new THREE.PointLight(0xffd9a8,0,3,1.8); reveal.position.set(.1,.4,1.4); S.add(reveal);
  DV={s,R,S,C,wrap,obj:dollG,raf:0,yaw:0,pitch:0,zoom:1,drag:null,face:0,done:false,cf:{pitch:[-.5,.5]},p:0,pt:0};
  m3dLoad("chair3d.glb",g=>{ if(!DV||DV.wrap!==wrap) return; const m=g.scene.clone(), b=new THREE.Box3().setFromObject(m), sz=b.getSize(new THREE.Vector3()), c=b.getCenter(new THREE.Vector3());
    m.position.set(-c.x,-b.min.y,-c.z); const k=1/sz.y; const gp=new THREE.Group(); gp.add(m); gp.scale.setScalar(k); gp.rotation.y=Math.PI*.1; m.traverse(o=>{ if(o.isMesh){ o.castShadow=true; o.receiveShadow=true; if(o.material){ o.material=o.material.clone(); o.material.envMapIntensity=.35; } } }); S.add(gp); });
  m3dLoad("doll3d.glb",g=>{ if(!DV||DV.wrap!==wrap) return; dollMatte(g.scene); const m=g.scene.clone(), b=new THREE.Box3().setFromObject(m), sz=b.getSize(new THREE.Vector3()), c=b.getCenter(new THREE.Vector3());
    m.position.set(-c.x,-c.y,-c.z); const k=.3/sz.y; const gp=new THREE.Group(); gp.add(m); gp.scale.setScalar(k); m.traverse(o=>{ if(o.isMesh){ o.receiveShadow=true; o.castShadow=true; if(o.material){ o.material=o.material.clone(); o.material.envMapIntensity=.08; } } }); dollG.add(gp); DV.ready=true;
    try{ dollG.updateMatrixWorld(true); const rc=new THREE.Raycaster(), o0=dollG.localToWorld(new THREE.Vector3(.0106,.1063,1)), d0=new THREE.Vector3(0,0,-1).transformDirection(dollG.matrixWorld); rc.set(o0,d0);
      const h0=rc.intersectObject(gp,true)[0]; if(h0){ const lp=dollG.worldToLocal(h0.point.clone()); glint.position.copy(lp).add(new THREE.Vector3(0,0,.004)); eyeL.position.copy(lp).add(new THREE.Vector3(0,0,.03)); } }catch(e){} });   // 붉은 불빛을 눈 표면에 붙인다   // 그림자가 못 막는 환경광을 줄여 의자 밑에선 어둠에 묻힘
  const el=R.domElement; let ly=0;
  el.onpointerdown=e=>{ if(!DV||DV.done) return; DV.drag=true; ly=e.clientY; DV.y0=ly; DV.mv=0; wrap.classList.add("grab"); try{ el.setPointerCapture(e.pointerId); }catch(_){} };
  el.onpointermove=e=>{ if(!DV||!DV.drag||DV.done) return; const r=el.getBoundingClientRect(); const dy=(e.clientY-ly)/Math.max(90,r.height*.18); if(Math.abs(e.clientY-(DV.y0||ly))>6) DV.mv=1; ly=e.clientY; DV.p=Math.max(0,Math.min(1,DV.p+dy)); { const n=performance.now(); if(dy>.004&&n-(DV.sl||0)>900){ DV.sl=n; SFX("slide",Math.min(.5,.18+dy*5)); } } };
  el.onpointerup=()=>{ if(!DV) return; DV.drag=false; wrap.classList.remove("grab"); if(!DV.mv) DV.p=Math.min(1,DV.p+.34); if(DV.p>.25) DV.auto=1; };   // 짧게 눌러도 조금씩, 어느 정도 당기면 알아서 끝까지
  const sm=t=>t*t*(3-2*t);
  const loop=t=>{ if(!DV||DV.wrap!==wrap) return; if(mode!=="closeup"){ dollClose(); return; }
    const w=wrap.clientWidth,h=wrap.clientHeight; if(w&&h&&R.domElement.width!==Math.round(w*R.getPixelRatio())){ R.setSize(w,h,false); C.aspect=w/h; C.updateProjectionMatrix(); if(comp) comp.setSize(w,h); }
    const dt=Math.min(.05,(t-(DV.pt||t))/1000); DV.pt=t;
    if(DV.auto&&!DV.drag&&!DV.done) DV.p=Math.min(1,DV.p+dt*.45);   // 놓아도 되돌아가지 않고 끝까지 나온다
    /* 손을 바로 따라오지 않고 바닥 마찰만큼 살짝 늦게 끌려온다. 의자 밖으로 나온 뒤(60%~)에야 일으켜 들어 올림 */
    const pv=DV.vp||0; DV.vp=pv+(DV.p-pv)*(1-Math.pow(.0004,dt)); const vel=dt?(DV.vp-pv)/dt:0;
    const p=DV.vp, u=sm(Math.max(0,Math.min(1,(p-.6)/.4))), drag=Math.max(-1,Math.min(1,vel*2.2));
    dollG.position.set(Math.sin(p*9)*.006*(1-u),.06+u*.1+Math.abs(drag)*.004*(1-u),-.18+p*.42);
    dollG.rotation.set(-Math.PI/2*(1-u)+drag*.06*(1-u),Math.sin(p*7)*.05*(1-u),drag*.05);
    bar.querySelector("i").style.width=(p*100)+"%";
    { const ph=(t%1800)/1800, on=ph<.32?Math.sin(ph/.32*Math.PI):0, tw=on*on;   // 작은 LED: 1.8초마다 한 번, 부드럽게 켜졌다 꺼짐
      glint.material.opacity=(1-u*.6)*(.08+tw*.85); glint.scale.setScalar(.005+tw*.003); eyeL.intensity=tw*.012;   /* 눈동자 크기에 맞춰 작게, 붉은 번짐도 눈 주변에만 */ reveal.intensity=p*3; }
    C.position.set(.1+Math.sin(t/2600)*.01,.15+u*.03,1.0+u*.1); C.lookAt(0,.15+u*.05,-.02); roomLamp.intensity=1.1+Math.sin(t/430)*.08+Math.sin(t/170)*.04;
    if(p>=.985&&DV.p>=1&&!DV.done&&DV.ready){ DV.done=true; hint.innerHTML="<b>인형을 꺼냈다.</b>"; SFX("thud",.45); SFX("rustle",.45); window.__dollOut=1; setTimeout(()=>{ if(!DV||DV.wrap!==wrap) return; dollClose(); dollPick(); },1100); }
    { const a=pg.attributes.position; for(let i=0;i<NP;i++){ let y=a.getY(i)-pv[i]*dt; if(y<0) y=1.8; a.setY(i,y); a.setX(i,a.getX(i)+Math.sin(t/1700+i)*.0004); } a.needsUpdate=true; } if(!document.hidden){ wrap.__rd&&wrap.__rd(); if(comp) comp.render(); else R.render(S,C);
      if(DV.done&&!DV.shot&&p>.97){ DV.shot=1; try{ EVIMG.doll=R.domElement.toDataURL("image/jpeg",.9); }catch(e){} } }   // 꺼내서 의자 앞에 세운 장면을 그대로 증거 사진으로
    DV.raf=requestAnimationFrame(loop); };
  DV.raf=requestAnimationFrame(loop);
}
/* 인형 모델은 금속성·광택 값이 높아 젖은 플라스틱처럼 번들거린다 → 천·도자기 느낌의 무광으로 */
function dollMatte(sc){ sc.traverse(o=>{ if(o.isMesh&&o.material) [].concat(o.material).forEach(m=>{ if(m._matte) return; m._matte=1; m.metalnessMap=null; m.roughnessMap=null; m.metalness=.04; m.roughness=.66; m.envMapIntensity=.55; m.needsUpdate=true; }); }); }
function dollPick(){ if(DV) return; const L=$("cuLayer"), s=CU.s; $("cuPh").classList.add("cudim");
  const wrap=document.createElement("div"); wrap.className="v3d dollv"; L.appendChild(wrap); v3bg(wrap,"doll");
  const R=new THREE.WebGLRenderer({antialias:true,alpha:true}); R.outputEncoding=THREE.sRGBEncoding; R.physicallyCorrectLights=true; R.toneMapping=THREE.ACESFilmicToneMapping; R.toneMappingExposure=1.1; R.setPixelRatio(Math.min(devicePixelRatio,2)); wrap.appendChild(R.domElement);
  const S=new THREE.Scene(), C=new THREE.PerspectiveCamera(30,16/9,.01,50); S.environment=exEnv(R);
  S.add(new THREE.HemisphereLight(0xffe7c4,0x16241a,.8)); const key=new THREE.PointLight(0xffc98a,22,8,1.6); key.position.set(1.1,1.4,1.6); S.add(key); const rim=new THREE.PointLight(0x9ec4ae,6,8,1.6); rim.position.set(-1.3,1.1,-1.4); S.add(rim);
  const hint=document.createElement("div"); hint.className="v3hint"; hint.innerHTML="<small>레이스 드레스를 입은 인형. 한쪽 눈 안쪽에서 빨간 불빛이 깜빡인다.</small><b>인형을 돌려서 살펴보자.</b>"; wrap.appendChild(hint);
  const spot=document.createElement("button"); spot.className="exspot"; spot.innerHTML="<span>등의 작은 스피커</span>"; wrap.appendChild(spot);
  const x=document.createElement("button"); x.className="dollx"; x.innerHTML="내려놓기"; x.onclick=()=>{ dollClose(); closeCloseup(); }; wrap.appendChild(x);
  const obj=new THREE.Group(); S.add(obj);
  DV={s,R,S,C,wrap,obj,raf:0,yaw:.35,pitch:0,zoom:1,drag:null,face:0,done:false,cf:{pitch:[-.5,.5]}};
  const eye=new THREE.PointLight(0xff2a1a,0,.07,2); const eyeDot=new THREE.Mesh(new THREE.SphereGeometry(.0052,16,16),new THREE.MeshBasicMaterial({color:0xff2a14,transparent:true,blending:THREE.AdditiveBlending,depthWrite:false})); eyeDot.scale.z=.45;   // 눈동자 크기, 얼굴에서 튀어나오지 않게 납작하게
  const spk=new THREE.Group(); let spkP=null;
  m3dLoad("doll3d.glb",g=>{ if(!DV) return; dollMatte(g.scene); const m=g.scene.clone(), b=new THREE.Box3().setFromObject(m), sz=b.getSize(new THREE.Vector3()), c=b.getCenter(new THREE.Vector3());
    m.position.set(-c.x,-c.y,-c.z); const k=.9/sz.y; const p=new THREE.Group(); p.add(m); p.scale.setScalar(k); obj.add(p); p.updateMatrixWorld(true);
    const rc=new THREE.Raycaster(), hitAt=(x,y,z,dz)=>{ rc.set(new THREE.Vector3(x,y,z),new THREE.Vector3(0,0,dz)); const r=rc.intersectObject(p,true)[0]; return r&&r.point; };
    const H=.45, ey=.319, ex=.0317;   // 오른쪽 눈(화면 기준) — 모델을 정면에서 재 본 눈동자 중심
    const ep=hitAt(ex,ey,2,-1)||new THREE.Vector3(ex,ey,.07); eyeDot.position.copy(ep).add(new THREE.Vector3(0,0,.001)); eye.position.copy(ep).add(new THREE.Vector3(0,0,.018)); obj.add(eyeDot,eye);
    let bp=null, yy=H*.22; for(let ix=-2;ix<=2;ix++) for(let iy=-2;iy<=2;iy++){ const h=hitAt(ix*.012,yy+iy*.012,-2,1); if(h&&(!bp||h.z<bp.z)) bp=h; }   // 등 쪽 가장 바깥 면을 찾아 그 밖에 붙인다
    bp=bp?new THREE.Vector3(0,yy,bp.z):new THREE.Vector3(0,.1,-.08); spkP=bp.clone().add(new THREE.Vector3(0,0,-.014));
    const brass=new THREE.MeshStandardMaterial({color:0xb08a45,metalness:.9,roughness:.35});
    const plate=new THREE.Mesh(new THREE.CylinderGeometry(.026,.026,.008,32),brass); plate.rotation.x=Math.PI/2; plate.position.z=.004; spk.add(plate);
    for(let i=-2;i<=2;i++){ const sl=new THREE.Mesh(new THREE.BoxGeometry(.036-Math.abs(i)*.006,.003,.004),new THREE.MeshStandardMaterial({color:0x1a120a})); sl.position.set(0,i*.008,-.002); spk.add(sl); }
    const led=new THREE.Mesh(new THREE.SphereGeometry(.004,10,10),new THREE.MeshBasicMaterial({color:0xff3322})); led.position.set(.019,-.018,-.002); spk.add(led);
    spk.position.copy(spkP); obj.add(spk); });
  setTimeout(()=>{ if(DV&&DV.wrap===wrap&&!spkP){ dollClose(); dollLift(); } },2500);
  const el=R.domElement;
  el.onpointerdown=e=>{ if(DV.done) return;   /* 단서를 찾은 뒤(녹음이 나오는 동안)에는 인형을 고정 */ DV.drag={x:e.clientX,y:e.clientY,yaw:DV.yaw,pitch:DV.pitch}; wrap.classList.add("grab"); try{ el.setPointerCapture(e.pointerId); }catch(_){} };
  el.onpointermove=e=>{ if(!DV||!DV.drag) return; const r=el.getBoundingClientRect(); DV.yaw=DV.drag.yaw+(e.clientX-DV.drag.x)/Math.min(r.width,640)*7.5; DV.pitch=Math.max(-.5,Math.min(.5,DV.drag.pitch+(e.clientY-DV.drag.y)/Math.min(r.height,420)*2.6)); };
  el.onpointerup=()=>{ if(!DV) return; DV.drag=null; wrap.classList.remove("grab"); };
  el.onwheel=e=>{ e.preventDefault(); if(DV.done) return; DV.zoom=Math.max(.3,Math.min(1.5,DV.zoom*(e.deltaY>0?1.08:.92))); };
  spot.onclick=e=>{ e.stopPropagation(); if(DV.done) return; DV.done=true; DV.zin=true; spot.classList.remove("on"); wrap.classList.add("exhit"); hint.innerHTML="";
    const fb=document.createElement("div"); fb.className="exfound"; fb.innerHTML="<small>단서 발견</small><b>등의 작은 스피커</b>"; wrap.appendChild(fb); hit(900,.25,.3); paper();
    setTimeout(()=>{ if(DV&&DV.wrap===wrap) dollPlayback(); },2000); };
  const wp=new THREE.Vector3(), wn=new THREE.Vector3(), tc=new THREE.Vector3(), q=new THREE.Quaternion();
  const loop=t=>{ if(!DV) return; if(mode!=="closeup"){ dollClose(); return; }
    const w=wrap.clientWidth,h=wrap.clientHeight; if(w&&h&&R.domElement.width!==Math.round(w*R.getPixelRatio())){ R.setSize(w,h,false); C.aspect=w/h; C.updateProjectionMatrix(); }
    const dtv=Math.min(.05,(t-(DV.pt2||t))/1000); DV.pt2=t; if(DV.ry===undefined){ DV.ry=DV.yaw; DV.rp=DV.pitch; } const fk=1-Math.pow(.00002,dtv); DV.ry+=(DV.yaw-DV.ry)*fk; DV.rp+=(DV.pitch-DV.rp)*fk;   // 약병처럼 손을 살짝 늦게 따라옴
    obj.rotation.set(DV.rp,DV.ry+(DV.drag||DV.done?0:Math.sin(t/900)*.04),0); const d=2.7*DV.zoom; C.position.set(0,.05*d,d); C.lookAt(0,0,0); obj.updateMatrixWorld(true);
    if(DV.zin){ DV.sz=Math.min(1,(DV.sz||0)+(1-(DV.sz||0))*.07+.002); const e=DV.sz*DV.sz*(3-2*DV.sz); if(spkP){ const sp2=spkP.clone(); obj.localToWorld(sp2); const nn=new THREE.Vector3(0,0,-1).applyQuaternion(obj.getWorldQuaternion(new THREE.Quaternion())); const tp=sp2.clone().add(nn.multiplyScalar(.38)); C.position.lerp(tp,e); C.lookAt(new THREE.Vector3(0,0,0).lerp(sp2,e)); } }
    const blink=(Math.sin(t/260)>.2)?1:.15; eye.intensity=blink*.012; eyeDot.material.opacity=blink*.6;   /* 붉은 빛이 눈두덩·뺨까지 번지지 않게 약하게, 눈 주변에만 */
    if(spkP){ wp.copy(spkP); obj.localToWorld(wp); obj.getWorldQuaternion(q); wn.set(0,0,-1).applyQuaternion(q); tc.copy(C.position).sub(wp).normalize();
      const dt=Math.min(.1,(t-(DV.lt||t))/1000); DV.lt=t; DV.face=wn.dot(tc)>.55?Math.min(1,DV.face+dt*4):Math.max(0,DV.face-dt*6);
      if(!DV.done&&DV.face>=1){ const sp=wp.clone().project(C); spot.style.left=((sp.x+1)/2*100)+"%"; spot.style.top=((1-sp.y)/2*100)+"%"; if(!spot.classList.contains("on")){ spot.classList.add("on"); hit(1800,.05,.08,"bandpass"); } }
      else if(spot.classList.contains("on")&&DV.face<.5) spot.classList.remove("on"); }
    if(!document.hidden){ wrap.__rd&&wrap.__rd(); R.render(S,C); } DV.raf=requestAnimationFrame(loop); };
  DV.raf=requestAnimationFrame(loop); roomBack(wrap,"doll",()=>DV&&DV.C); window.__excam&&window.__excam(true); }
function recPanel(){
  const {s}=CU, L=$("cuLayer"); $("cuPh").classList.add("cudim");
  const p=document.createElement("div"); p.className="panel2"; L.appendChild(p);
  const add=(tag,cls,html)=>{const e=document.createElement(tag); if(cls)e.className=cls; e.innerHTML=html; p.appendChild(e); return e;};
  const first=!found.has(s.id); renderMini(s,p,add,!first); CU.f=()=>MINIF&&MINIF();
  if(first) setTimeout(()=>{ if(mode==="closeup"&&MINIF) MINIF(); },700);   // 처음엔 재생 버튼을 누르지 않아도 자동으로 재생
   // 녹음은 사용자가 재생 버튼을 눌렀을 때 시작한다.
}
function closeCloseup(){
  dollClose();
  $("cuPh").querySelector("video.cuv")?.remove();
  $("cu").classList.remove("open"); $("cuLayer").innerHTML=""; CU=null; activeSpot=null;
  mode="explore"; stage.classList.add("explore"); ease=.1; tgt.s=1.4; setPrompt(); checkDone();
}
$("cuClose").onclick=closeCloseup; $("cuBook").onclick=()=>{ closeCloseup(); openBook(); };
/* ---------- 책장: 이상하게 꽂힌 책을 찾아 클릭 / 손으로 집으면 꺼내는 영상 ---------- */
const FIND={
  books:{img:"ev/books_first.jpg",box:[33.5,31,43.5,64],k:"책장",t:"이상하게 꽂힌 책을 찾아라",what:"수상한 책",miss:"아니다. <b>다른 책들과 다르게 꽂힌</b> 한 권이 있다."},
  window:{img:"ev/window_still.jpg",box:[38,30,59,80],k:"창문",t:"걸쇠를 열어보자",what:"창문 걸쇠",miss:"아니다. <b>황동 걸쇠</b>를 직접 돌려 보자."},
  sofa:{img:"ev/sofa_first.jpg",box:[33,42,65,74],k:"소파",t:"쿠션에 뭔가 묻어 있다",what:"하얀 털",miss:"아니다. 쿠션 위를 <b>더 자세히</b> 보자."}};   // 정답 영역 [x1,y1,x2,y2] (%)
let FND=null, fndStream=null, fndHands=null, fndOn=false;
function openFind(s){ const f=FIND[s.id], el=$("fnd"); FND={s,f}; el.style.backgroundImage=`url(${f.img})`; el.classList.add("on"); mode="find"; $("prompt").classList.remove("show");
  $("fndK").textContent=f.k; $("fndT").textContent=f.t;
  el.querySelectorAll(".glint").forEach(g=>g.remove()); const g=document.createElement("i"); g.className="glint"; const [x1,y1,x2,y2]=f.box;
  Object.assign(g.style,{left:x1+"%",top:y1+"%",width:(x2-x1)+"%",height:(y2-y1)+"%"}); el.appendChild(g); setTimeout(()=>g.classList.add("on"),1200);
  $("fndHint").innerHTML=`${f.what}을(를) <b>클릭</b>하거나, 카메라 앞에서 <b>손가락으로 집어라</b>`; }
function closeFind(){ $("fnd").classList.remove("on"); fndCamStop(); if(mode==="find"){ mode="explore"; setPrompt(); } FND=null; }
function fndHit(px,py){ if(!FND) return false; const [x1,y1,x2,y2]=FND.f.box; return px>=x1&&px<=x2&&py>=y1&&py<=y2; }
function fndFound(){ if(!FND) return; const s=FND.s; try{ if(soundOn&&audio()) hit(900,.25,.3); }catch(e){} closeFind(); playEvClip(s); }
function fndMiss(px,py){ const m=document.createElement("i"); m.className="miss"; m.style.left=px+"%"; m.style.top=py+"%"; $("fnd").appendChild(m); setTimeout(()=>m.remove(),650);
  try{ if(soundOn&&audio()) hit(220,.15,.12); }catch(e){} $("fndHint").innerHTML=FND?FND.f.miss:""; $("fnd").querySelector(".glint")?.classList.add("on","strong"); }
$("fnd").addEventListener("click",e=>{ if(e.target.closest("button")) return; const r=$("fnd").getBoundingClientRect(); const px=(e.clientX-r.left)/r.width*100, py=(e.clientY-r.top)/r.height*100; fndHit(px,py)?fndFound():fndMiss(px,py); });
$("fndX").onclick=e=>{ e.stopPropagation(); closeFind(); };
addEventListener("keydown",e=>{ if(mode==="find"&&e.key==="Escape"){ e.stopImmediatePropagation(); closeFind(); } },true);
function fndCamStop(){ fndOn=false; $("fndCam").classList.remove("on"); $("fndCur").style.display="none"; }
{ const fpf=CAMHUB.pinchFilter(); let hold=0;
  CAMHUB.sub(lm=>{ const cur=$("fndCur"); if(!lm||!FND){ cur.style.display="none"; hold=0; fpf(null); return; }
    const th=lm[4], ix=lm[8], px=(1-(th.x+ix.x)/2)*100, py=((th.y+ix.y)/2)*100, pinch=fpf(lm);
    cur.style.display="block"; cur.style.left=px+"%"; cur.style.top=py+"%"; cur.classList.toggle("pinch",pinch);
    if(pinch && fndHit(px,py)){ if(++hold>2) fndFound(); } else hold=0; },()=>fndOn&&!!FND); }
$("fndCamBtn").onclick=async e=>{ e.stopPropagation(); const hint=$("fndHint"); hint.innerHTML="카메라 연결 중…";
  const ok=await CAMHUB.start(true);
  if(!ok){ hint.innerHTML="카메라를 쓸 수 없다 — <b>클릭</b>해서 찾아라"; return; }
  CAMHUB.bind($("fndCamV")); $("fndCam").classList.add("on");
  if(!CAMHUB.handsReady){ hint.innerHTML="손 인식을 불러오지 못했다 — 수상한 책을 <b>클릭</b>하라"; return; }
  hint.innerHTML=`손을 ${FND?FND.f.what:"그것"} 위로 옮기고 <b>엄지와 검지로 집어라</b>`; fndOn=true; };
/* 증거마다 처음 조사할 때 한 번 — 손으로 훑어보는 짧은 영상 */
const EVCLIP={};
let evSeen=new Set();
function playEvClip(s){ const w=$("evClip"), v=$("evClipV"); evSeen.add(s.id); mode="clip"; $("prompt").classList.remove("show"); $("prompt").classList.remove("show");
  let done=false; const end=()=>{ if(done) return; done=true; v.pause(); w.classList.remove("on"); v.onended=v.onerror=w.onclick=null; mode="explore"; inspect(s); };
  w.classList.add("on"); v.src=EVCLIP[s.id]; v.currentTime=0; v.muted=!soundOn; v.volume=.65; v.onended=end; v.onerror=end;
  v.play().catch(()=>{ v.muted=true; v.play().catch(end); }); setTimeout(()=>{ if(!done&&v.currentTime<.1) end(); },9000); }
function inspectBoard(s){
  activeSpot=s; $("prompt").classList.remove("show"); mode="inspect"; stage.classList.remove("explore"); stage.classList.add("inspect");
  closeBook(false); ease=.07; tgt.s=2.4; tgt.fx=s.x; tgt.fy=s.y; steps(1);
  renderInspect(s); renderSide(); $("insp").classList.add("open"); setTimeout(()=>$("iClose").focus({preventScroll:true}),50);
}
function inspect(s){
  if(s.npc){ openTalk(); return; }
  if(FIND[s.id] && !evSeen.has(s.id) && !found.has(s.id) && mode==="explore"){ openFind(s); return; }
  if(EVCLIP[s.id] && !evSeen.has(s.id) && !found.has(s.id) && mode==="explore"){ playEvClip(s); return; }
  if(SCRUB_ON.includes(s.id) && !opened.has(s.id) && !found.has(s.id) && !dusted.has(s.id)){ openScrub(s); return; }
  if(s.manip && !opened.has(s.id)){ startManip(s); return; }
  if(CLOSE[s.id] && EVIMG[s.id]){ openCloseup(s); return; }
  activeSpot=s; $("prompt").classList.remove("show"); mode="inspect"; stage.classList.remove("explore"); stage.classList.add("inspect");
  closeBook(false);
  ease=.07; tgt.s=2.4; tgt.fx=s.x; tgt.fy=s.y;
  steps(1);
  renderInspect(s); renderSide();
  $("insp").classList.add("open");
  setTimeout(()=>$("iClose").focus({preventScroll:true}),50);
}
/* ---------- 돌려 보고 찾아내기 : 증거를 직접 돌려야 단서가 드러난다 ----------
   전표는 뒤집어야 뒷면 서명이, 약병은 돌려야 라벨 뒤 손글씨가, 와인잔은 기울여야 바닥의 가루가 보인다.
   단서가 있는 면이 화면 쪽을 향하면 빛나는 표시가 뜨고, 그걸 눌러야 증거로 기록된다. */
const EXAM={
  card:{pre:"꽃병 옆에 룸서비스 전표가 끼워져 있다. 앞면엔 주문 내역뿐이다.",hint:"끌어서 전표를 뒤집어 보자.",
        label:"뒷면의 서명",build:()=>exSlip(),cam:[0,.05,1.9],spot:{p:[-.06,-.2,-.004],n:[0,0,-1]},pitch:[-.5,.5],yaw:.25},
  bedside:{pre:"협탁의 서류 밑에 갈색 약병이 숨겨져 있다. 라벨엔 ‘수면제’라고만 인쇄돼 있다.",hint:"끌어서 병을 돌려 라벨 뒤쪽을 보자.",
        label:"라벨 뒤 손글씨",build:()=>exBottle(),cam:[0,.07,.84],spot:{p:[0,-.03,-.106],n:[0,0,-1]},pitch:[-.4,.4],yaw:.06},
  glass:{pre:"러그 옆에 깨진 와인잔이 떨어져 있다. 남은 와인에서 쓴 냄새가 난다.",hint:"아래로 끌어 잔을 기울여 안을 들여다보자.",
        label:"잔 바닥의 하얀 가루",build:()=>exGlass(),cam:[0,.18,2.0],spot:{p:[0,.1,0],n:[0,1,0]},pitch:[-.2,1.25],yaw:0}
};
let EX=null;
/* 영상 속 객실처럼: 따뜻한 벽등과 마호가니 벽이 비치는 반사 환경 */
function exEnv(R){ const c=document.createElement("canvas"); c.width=1024; c.height=512; const g=c.getContext("2d");
  const gr=g.createLinearGradient(0,0,0,512); gr.addColorStop(0,"#1a120c"); gr.addColorStop(.45,"#3b2516"); gr.addColorStop(.6,"#24170e"); gr.addColorStop(1,"#0b0705"); g.fillStyle=gr; g.fillRect(0,0,1024,512);
  for(let i=0;i<8;i++){ g.fillStyle=i%2?`rgba(${60+i%3*10},40,18,.5)`:"rgba(34,66,44,.55)"; g.fillRect(i*128+8,150,110,200); }   // 초록 벽지와 나무 기둥이 번갈아 비침
  g.fillStyle="rgba(46,72,52,.45)"; g.fillRect(390,120,150,190);
  [[120,170,70],[640,160,60],[880,180,50],[330,60,40]].forEach(([x,y,r])=>{ const q=g.createRadialGradient(x,y,0,x,y,r); q.addColorStop(0,"rgba(255,226,170,1)"); q.addColorStop(.35,"rgba(255,190,110,.7)"); q.addColorStop(1,"rgba(255,160,80,0)"); g.fillStyle=q; g.fillRect(x-r,y-r,2*r,2*r); });
  const t=new THREE.CanvasTexture(c); t.mapping=THREE.EquirectangularReflectionMapping; t.encoding=THREE.sRGBEncoding;
  const pm=new THREE.PMREMGenerator(R), e=pm.fromEquirectangular(t).texture; pm.dispose(); t.dispose(); return e; }
function exTex(w,h,draw){ const c=document.createElement("canvas"); c.width=w; c.height=h; const x=c.getContext("2d"); draw(x,w,h);
  const t=new THREE.CanvasTexture(c); t.encoding=THREE.sRGBEncoding; t.anisotropy=4;
  if(document.fonts&&document.fonts.load) Promise.all(['40px "Nanum Pen Script"','700 40px "Nanum Myeongjo"','italic 25px "Nanum Myeongjo"','600 21px "IBM Plex Mono"','19px "IBM Plex Mono"'].map(f=>document.fonts.load(f))).then(()=>{ x.clearRect(0,0,w,h); draw(x,w,h); t.needsUpdate=true; }).catch(()=>{});
  return t; }
const exPaper=(x,w,h,tone)=>{ x.fillStyle=tone; x.fillRect(0,0,w,h); for(let i=0;i<900;i++){ x.fillStyle=`rgba(90,60,30,${Math.random()*.05})`; x.fillRect(Math.random()*w,Math.random()*h,2,2); }
  const g=x.createRadialGradient(w/2,h/2,w*.2,w/2,h/2,w*.8); g.addColorStop(0,"rgba(0,0,0,0)"); g.addColorStop(1,"rgba(90,60,25,.3)"); x.fillStyle=g; x.fillRect(0,0,w,h); };
function exSlip(){ const G=new THREE.Group(), W=.62, H=.9;
  const front=exTex(512,744,(x,w,h)=>{ exPaper(x,w,h,"#efe6cf"); x.fillStyle="#2a211a"; x.textAlign="center";
    x.font='700 40px "Nanum Myeongjo",serif'; x.fillText("EDENLINE",w/2,90); x.font='26px "Nanum Myeongjo",serif'; x.fillText("ORPHEUS EXPRESS · VIP실",w/2,132);
    x.strokeStyle="rgba(42,33,26,.5)"; x.beginPath(); x.moveTo(50,160); x.lineTo(w-50,160); x.stroke();
    x.textAlign="left"; x.font='30px "Nanum Myeongjo",serif'; [["룸서비스",""],["시각","21:00"],["품목","와인 1병"],["","(대표 전용)"],["객실","VIP"]].forEach(([a,b],i)=>{ x.fillText(a,60,230+i*62); x.textAlign="right"; x.fillText(b,w-60,230+i*62); x.textAlign="left"; });
    x.strokeStyle="rgba(42,33,26,.35)"; x.setLineDash([6,6]); x.beginPath(); x.moveTo(50,560); x.lineTo(w-50,560); x.stroke(); x.setLineDash([]);
    x.font='22px "IBM Plex Mono",monospace'; x.fillStyle="rgba(42,33,26,.6)"; x.fillText("No. 0047-V",60,610); x.fillText("※ 담당 승무원 서명은 뒷면",60,650); });
  const back=exTex(512,744,(x,w,h)=>{ exPaper(x,w,h,"#e9dfc6"); x.strokeStyle="rgba(120,70,40,.25)"; x.lineWidth=10; x.beginPath(); x.arc(150,180,90,0,6.2); x.stroke();
    x.fillStyle="rgba(42,33,26,.55)"; x.font='24px "Nanum Myeongjo",serif'; x.fillText("담당 승무원 확인",70,470);
    x.fillStyle="#1d1712"; x.font='64px "Nanum Pen Script",cursive'; x.save(); x.translate(300,560); x.rotate(-.08); x.fillText("E. 보로딘",-150,0); x.restore();
    x.strokeStyle="#1d1712"; x.lineWidth=3; x.beginPath(); x.moveTo(140,600); x.bezierCurveTo(250,570,330,640,440,590); x.stroke(); });
  const mf=new THREE.MeshStandardMaterial({map:front,roughness:.9}), mb=new THREE.MeshStandardMaterial({map:back,roughness:.9});
  const pf=new THREE.Mesh(new THREE.PlaneGeometry(W,H,8,8),mf), pb=new THREE.Mesh(new THREE.PlaneGeometry(W,H,8,8),mb); pb.rotation.y=Math.PI; pf.position.z=.002; pb.position.z=-.002;
  [pf,pb].forEach(m=>{ const p=m.geometry.attributes.position; for(let i=0;i<p.count;i++) p.setZ(i,Math.sin(p.getX(i)*4)*.012); m.geometry.computeVertexNormals(); });
  G.add(pf,pb); return G; }
/* 약병 v2 — 1920년대 약국 갈색 유리병(보스턴 라운드)
   · 유리에 두께가 있다: 바깥면→입구 립→안쪽면까지 한 번에 깎은 단면이라 가장자리·바닥이 더 두껍고 진하게 보인다
   · 갈색 유리는 정면은 비쳐 보이고, 비스듬한 가장자리일수록 어둡고 불투명해진다(프레넬)
   · 라벨은 병에 감긴 누런 종이: 가장자리가 해지고, 얼룩·여우 반점이 있다 */
function exBottle(){ const G=new THREE.Group(), r=.1;
  const prof=[ // 바깥면 (바닥 → 어깨 → 목 → 립)
    [0,-.259],[.07,-.26],[.09,-.257],[.098,-.249],[.1,-.236],[.1,.098],[.0985,.118],[.093,.141],[.082,.163],[.066,.181],[.049,.193],[.035,.201],[.0305,.209],[.0305,.247],
    [.0345,.249],[.0375,.254],[.0378,.268],[.0352,.275],[.03,.277],
    // 안쪽면 (입구 → 목 → 어깨 → 몸통 → 두꺼운 바닥, 가운데가 살짝 솟은 펀트)
    [.0245,.276],[.0235,.25],[.0245,.207],[.036,.196],[.054,.184],[.071,.166],[.083,.145],[.0915,.12],[.094,.098],[.094,-.222],[.089,-.234],[.07,-.239],[.03,-.236],[0,-.232]
  ].map(([a,b])=>new THREE.Vector2(a,b));
  const glass=new THREE.MeshPhysicalMaterial({color:0x0c0501,roughness:.035,metalness:0,clearcoat:1,clearcoatRoughness:.03,reflectivity:.6,
    transparent:true,opacity:.6,side:THREE.DoubleSide,depthWrite:false,envMapIntensity:3.2});
  /* 유리는 거의 확산광이 없다: 반사(하이라이트) + 정면에서 비쳐 나오는 짙은 호박색 + 가장자리는 두꺼워 어둡고 불투명 */
  glass.onBeforeCompile=sh=>{ sh.fragmentShader=sh.fragmentShader.replace("gl_FragColor = vec4( outgoingLight, diffuseColor.a );",
    "{ float fr=pow(1.0-abs(dot(normalize(normal),normalize(vViewPosition))),1.6); vec3 spc=reflectedLight.directSpecular+reflectedLight.indirectSpecular; vec3 dif=max(outgoingLight-spc,0.0);"+
    " vec3 amb=vec3(0.34,0.085,0.01)*pow(1.0-fr,1.4)*(gl_FrontFacing?0.55:0.0); outgoingLight=dif*mix(1.0,0.3,fr)+spc+amb; diffuseColor.a=mix(diffuseColor.a,0.97,pow(fr,0.8)); }\ngl_FragColor = vec4( outgoingLight, diffuseColor.a );"); };
  const body=new THREE.Mesh(new THREE.LatheGeometry(prof,180),glass); body.renderOrder=2; G.add(body);
  /* 유리만 따로 비추는 반사 환경: 어두운 방 + 세로로 긴 창빛 두 줄 + 램프 → 유리 특유의 날카로운 세로 하이라이트 */
  body.onBeforeRender=R=>{ simPills(); if(glass.userData.env) return; const c=document.createElement("canvas"); c.width=1024; c.height=512; const g=c.getContext("2d");
    g.fillStyle="#120b07"; g.fillRect(0,0,1024,512); const fl=g.createLinearGradient(0,300,0,512); fl.addColorStop(0,"rgba(60,36,20,0)"); fl.addColorStop(1,"rgba(60,36,20,.8)"); g.fillStyle=fl; g.fillRect(0,300,1024,212);
    [[300,26,1],[352,10,.7],[690,40,.85]].forEach(([x,w,a])=>{ const q=g.createLinearGradient(x-w,0,x+w,0); q.addColorStop(0,"rgba(255,236,205,0)"); q.addColorStop(.5,`rgba(255,240,215,${a})`); q.addColorStop(1,"rgba(255,236,205,0)"); g.fillStyle=q; g.fillRect(x-w,70,w*2,300); });
    [[520,150,50],[160,120,34],[860,170,30]].forEach(([x,y,r])=>{ const q=g.createRadialGradient(x,y,0,x,y,r); q.addColorStop(0,"rgba(255,214,150,1)"); q.addColorStop(1,"rgba(255,170,90,0)"); g.fillStyle=q; g.fillRect(x-r,y-r,2*r,2*r); });
    const t=new THREE.CanvasTexture(c); t.mapping=THREE.EquirectangularReflectionMapping; t.encoding=THREE.sRGBEncoding;
    const pm=new THREE.PMREMGenerator(R); glass.envMap=glass.userData.env=pm.fromEquirectangular(t).texture; pm.dispose(); t.dispose(); glass.needsUpdate=true; };
  G.add(exDirtSkin(new THREE.LatheGeometry(prof.slice(0,19),96),exDirt({prints:[.2,.6],nPrints:3}),1.004));
  // 바닥에 남은 알약: 가운데 금이 그어진 둥근 정제, 서로 기대어 쌓여 있다
  const pt=exTex(128,128,(x,w,h)=>{ x.fillStyle="#efe9dd"; x.fillRect(0,0,w,h); for(let i=0;i<400;i++){ x.fillStyle=`rgba(150,140,120,${Math.random()*.12})`; x.fillRect(Math.random()*w,Math.random()*h,2,2); }
    x.strokeStyle="rgba(120,110,95,.55)"; x.lineWidth=5; x.beginPath(); x.moveTo(w*.12,h/2); x.lineTo(w*.88,h/2); x.stroke(); });
  /* 정제: 가장자리가 둥글고 양면이 살짝 볼록한 알약. 가운데 홈(분할선)은 범프로 파였고, 하얀 분필 가루 같은 질감 */
  const pm=new THREE.MeshStandardMaterial({color:0xf1ece0,map:pt,bumpMap:pt,bumpScale:-1.6,roughness:.7,metalness:0});
  const pg=new THREE.LatheGeometry([[0,-.0057],[.008,-.0055],[.0135,-.0049],[.0165,-.0042],[.0182,-.003],[.0189,-.0015],[.019,0],[.0189,.0015],[.0182,.003],[.0165,.0042],[.0135,.0049],[.008,.0055],[0,.0057]].map(([a,b])=>new THREE.Vector2(a,b)),40);
  { const ps=pg.attributes.position, uv=pg.attributes.uv; for(let i=0;i<ps.count;i++) uv.setXY(i,ps.getX(i)/.038+.5,ps.getZ(i)/.038+.5); uv.needsUpdate=true; }
  /* 알약 물리: 병의 기울기를 병 기준 중력으로 바꿔 알약이 바닥·벽을 따라 미끄러지고 서로 밀어낸다.
     빨리 돌리면 흔들려 달그락거리고, 벽·바닥에 세게 부딪히면 유리에 닿는 '딸깍' 소리가 난다 */
  const PILLS=[], PR=.019, IN=.0915, Y=new THREE.Vector3(0,1,0);
  for(let i=0;i<13;i++){ const a=Math.random()*6.28, d=Math.sqrt(Math.random())*.058, p=new THREE.Mesh(pg,pm);
    p.position.set(Math.cos(a)*d,-.226+(i>6?.012:0)+(i>11?.012:0)+Math.random()*.004,Math.sin(a)*d); p.quaternion.setFromEuler(new THREE.Euler((Math.random()-.5)*.3,Math.random()*6,(Math.random()-.5)*.3));
    p.userData={v:new THREE.Vector3(),c:0,sa:Math.random()*6}; G.add(p); PILLS.push(p); }
  const gL=new THREE.Vector3(), qW=new THREE.Quaternion(), qPrev=new THREE.Quaternion(), up=new THREE.Vector3(), tq=new THREE.Quaternion(), sq=new THREE.Quaternion(), tmp=new THREE.Vector3();
  let plt=0, pFirst=true, clinkT=0, pillT=0;
  /* 유리병 속 알약 소리: 녹음 루프 대신, 부딪힐 때마다 아주 짧은 '딸깍'(3ms 마찰음 + 유리 울림)을 세기만큼 1~3번 흩어 낸다 */
  const clink=sp=>{ const n=performance.now(); if(n-clinkT<38) return; clinkT=n; pillT=n;
    return;   /* 알약 소리 제거 */
    try{ if(!soundOn||!audio()) return; const out=sfxBus||ac.destination, t0=ac.currentTime+.002, k=Math.min(1,sp*1.6), cnt=1+(sp>.25?1:0)+(sp>.6?1:0);
      if(!clink.nb){ const b=ac.createBuffer(1,Math.round(ac.sampleRate*.006),ac.sampleRate), d=b.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,4); clink.nb=b; }
      for(let j=0;j<cnt;j++){ const t=t0+j*(.009+Math.random()*.02), v=(.05+k*.16)*(j?.55:1)*(.75+Math.random()*.5);
        const ns=ac.createBufferSource(), hp=ac.createBiquadFilter(), ng=ac.createGain(); ns.buffer=clink.nb; ns.playbackRate.value=.8+Math.random()*.5; hp.type="highpass"; hp.frequency.value=1800;
        ng.gain.value=v; ns.connect(hp); hp.connect(ng); ng.connect(out); ns.start(t);                       // 알약 모서리가 닿는 '딱'
        const o=ac.createOscillator(), og=ac.createGain(); o.type="sine"; o.frequency.value=2900+Math.random()*1500;
        og.gain.setValueAtTime(0,t); og.gain.linearRampToValueAtTime(v*.22,t+.0015); og.gain.exponentialRampToValueAtTime(.0001,t+.03+Math.random()*.03);
        o.connect(og); og.connect(out); o.start(t); o.stop(t+.07); }                                        // 유리가 살짝 '팅' 울림
    }catch(e){} };
  const simPills=()=>{ const now=performance.now(), dt=Math.min(.033,(now-(plt||now))/1000); plt=now; if(dt<.001) return;
    G.updateWorldMatrix(true,false); G.getWorldQuaternion(qW);
    const ang=pFirst?0:2*Math.acos(Math.min(1,Math.abs(qW.dot(qPrev))))/dt; qPrev.copy(qW); pFirst=false;   // 병이 얼마나 빨리 돌고 있나
    gL.set(0,-8,0).applyQuaternion(sq.copy(qW).invert());                                             // 병 안에서 본 중력 방향
    const shake=Math.min(1.6,Math.max(0,ang-.6)*.35);
    for(const p of PILLS){ const v=p.userData.v; v.addScaledVector(gL,dt);
      if(shake>0) v.add(tmp.set(Math.random()-.5,Math.random()*.6,Math.random()-.5).multiplyScalar(shake*dt*9));
      v.multiplyScalar(Math.pow(.18,dt)); p.position.addScaledVector(v,dt); }
    for(let it=0;it<3;it++){
      for(let i=0;i<PILLS.length;i++) for(let j=i+1;j<PILLS.length;j++){ const A=PILLS[i].position, B=PILLS[j].position; tmp.subVectors(B,A); const d=tmp.length(), m=PR*1.55;   // 납작한 정제라 조금 겹쳐 쌓임
        if(d<m&&d>1e-6){ tmp.multiplyScalar((m-d)/d*.5); A.sub(tmp); B.add(tmp); const va=PILLS[i].userData.v, vb=PILLS[j].userData.v; tmp.copy(va).sub(vb).multiplyScalar(.15); va.sub(tmp); vb.add(tmp); } }
      for(const p of PILLS){ const P=p.position, v=p.userData.v, rr=Math.hypot(P.x,P.z)||1e-6;
        const lim=(P.y>.09?Math.max(.03,IN-(P.y-.09)/.1*.065):IN)-PR;                      // 어깨 위로 갈수록 좁아짐
        if(rr>lim){ const vn=(v.x*P.x+v.z*P.z)/rr; if(vn>0){ if(vn>.14&&it===0) clink(vn); v.x-=1.35*vn*P.x/rr; v.z-=1.35*vn*P.z/rr; v.y*=.8; } P.x*=lim/rr; P.z*=lim/rr; p.userData.c=1; }
        const fl=-.2355+.0035*Math.max(0,1-rr/.07)+.0045;                                    // 바닥(가운데가 살짝 솟음) + 정제 두께 절반
        if(P.y<fl){ if(v.y<-.14&&it===0) clink(-v.y); P.y=fl; v.y*=-.22; v.x*=.86; v.z*=.86; p.userData.c=2; }
        if(P.y>.2){ P.y=.2; if(v.y>0) v.y*=-.3; } } }
    for(const p of PILLS){ const P=p.position, v=p.userData.v, spd=v.length();                 // 닿은 면에 납작하게 눕고, 굴러가면 빙글 돈다
      if(p.userData.c===1) up.set(P.x,0,P.z).normalize(); else up.copy(Y);
      p.userData.c=0; p.userData.sa+=spd*dt*28;
      tq.setFromUnitVectors(Y,up).multiply(sq.setFromAxisAngle(Y,p.userData.sa));
      p.quaternion.slerp(tq,Math.min(1,dt*(spd>.05?7:3))); } };
  // 코르크 마개: 입구에 박혀 위로 살짝 튀어나옴. 알갱이 무늬 + 윗면 나이테 + 손때
  const ckSide=exTex(256,128,(x,w,h)=>{ x.fillStyle="#8a6038"; x.fillRect(0,0,w,h);
    for(let i=0;i<1600;i++){ const l=Math.random(); x.fillStyle=l<.5?`rgba(${50+Math.random()*30|0},${30+Math.random()*20|0},14,${.3+Math.random()*.5})`:`rgba(${170+Math.random()*40|0},${130+Math.random()*30|0},80,${.2+Math.random()*.4})`; x.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*3,1+Math.random()*2); }
    const g=x.createLinearGradient(0,0,0,h); g.addColorStop(0,"rgba(30,18,8,.35)"); g.addColorStop(.25,"rgba(30,18,8,0)"); g.addColorStop(1,"rgba(30,18,8,.25)"); x.fillStyle=g; x.fillRect(0,0,w,h); });
  const ckTop=exTex(128,128,(x,w,h)=>{ x.fillStyle="#9a7046"; x.fillRect(0,0,w,h); for(let i=0;i<700;i++){ x.fillStyle=`rgba(${55+Math.random()*30|0},${35+Math.random()*20|0},15,${Math.random()*.6})`; x.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*2,1+Math.random()*2); }
    x.strokeStyle="rgba(60,38,18,.35)"; for(let k=1;k<5;k++){ x.lineWidth=1+Math.random(); x.beginPath(); x.arc(w/2,h/2,k*12+Math.random()*4,0,7); x.stroke(); }
    const g=x.createRadialGradient(w/2,h/2,w*.2,w/2,h/2,w*.5); g.addColorStop(0,"rgba(0,0,0,0)"); g.addColorStop(1,"rgba(40,22,10,.5)"); x.fillStyle=g; x.fillRect(0,0,w,h); });
  const cmS=new THREE.MeshStandardMaterial({map:ckSide,roughness:.97}), cmT=new THREE.MeshStandardMaterial({map:ckTop,roughness:.97});
  const cork=new THREE.Mesh(new THREE.CylinderGeometry(.0275,.0238,.064,40),[cmS,cmT,cmT]); cork.position.y=.268; cork.rotation.z=.04; G.add(cork);
  // 라벨: 투명 배경 위에 가장자리가 해진 종이를 그리고(alphaTest), 병 몸통에 감는다
  const ragged=(x,w,h,tone,pad)=>{ x.clearRect(0,0,w,h); x.save(); x.beginPath(); const j=()=>Math.random()*pad;
    for(let X=0;X<=w;X+=8) x.lineTo(X,j()); for(let Y=0;Y<=h;Y+=8) x.lineTo(w-j(),Y); for(let X=w;X>=0;X-=8) x.lineTo(X,h-j()); for(let Y=h;Y>=0;Y-=8) x.lineTo(j(),Y); x.closePath(); x.clip();
    x.fillStyle=tone; x.fillRect(0,0,w,h);
    for(let i=0;i<1400;i++){ x.fillStyle=`rgba(90,60,28,${Math.random()*.06})`; x.fillRect(Math.random()*w,Math.random()*h,2,2); }
    for(let i=0;i<10;i++){ const cx=Math.random()*w, cy=Math.random()*h, rr=3+Math.random()*9; x.fillStyle=`rgba(130,80,35,${.12+Math.random()*.18})`; x.beginPath(); x.arc(cx,cy,rr,0,7); x.fill(); }   // 여우 반점
    for(let i=0;i<3;i++){ const cx=Math.random()*w, cy=Math.random()*h, rr=30+Math.random()*60, q=x.createRadialGradient(cx,cy,rr*.6,cx,cy,rr); q.addColorStop(0,"rgba(150,105,50,.05)"); q.addColorStop(.92,"rgba(120,80,35,.22)"); q.addColorStop(1,"rgba(120,80,35,0)"); x.fillStyle=q; x.fillRect(cx-rr,cy-rr,rr*2,rr*2); }   // 물 얼룩 테두리
    const e=x.createLinearGradient(0,0,w,0); e.addColorStop(0,"rgba(95,60,25,.35)"); e.addColorStop(.06,"rgba(95,60,25,0)"); e.addColorStop(.94,"rgba(95,60,25,0)"); e.addColorStop(1,"rgba(95,60,25,.35)"); x.fillStyle=e; x.fillRect(0,0,w,h);
    const f=x.createLinearGradient(0,0,0,h); f.addColorStop(0,"rgba(95,60,25,.3)"); f.addColorStop(.08,"rgba(95,60,25,0)"); f.addColorStop(.9,"rgba(95,60,25,0)"); f.addColorStop(1,"rgba(95,60,25,.4)"); x.fillStyle=f; x.fillRect(0,0,w,h); };
  const lf=exTex(640,420,(x,w,h)=>{ ragged(x,w,h,"#dccb9f",13);
    x.strokeStyle="#7a2a1c"; x.lineWidth=5; x.strokeRect(22,22,w-44,h-44); x.lineWidth=1.5; x.strokeRect(32,32,w-64,h-64);
    x.fillStyle="#2b1f16"; x.textAlign="center"; x.font='600 21px "IBM Plex Mono",monospace'; x.fillText("EDENLINE  ·  INFIRMARY",w/2,78);
    x.strokeStyle="rgba(43,31,22,.5)"; x.lineWidth=1; x.beginPath(); x.moveTo(90,96); x.lineTo(w-90,96); x.stroke();
    x.font='700 82px "Nanum Myeongjo",serif'; x.fillText("수 면 제",w/2,190);
    x.font='italic 25px "Nanum Myeongjo",serif'; x.fillText("Somnifère — 처방 전용",w/2,236);
    x.fillStyle="#7a2a1c"; x.font='700 20px "IBM Plex Mono",monospace'; x.fillText("— 과용 시 위험 —",w/2,288);
    x.fillStyle="rgba(43,31,22,.72)"; x.font='19px "IBM Plex Mono",monospace'; x.fillText("Rx No. 2081-117   ·   30 TAB.",w/2,338);
    x.globalCompositeOperation="multiply"; x.fillStyle="rgba(200,170,120,.18)"; x.fillRect(0,0,w,h); x.globalCompositeOperation="source-over"; });
  const lb=exTex(512,340,(x,w,h)=>{ ragged(x,w,h,"#e2d4ae",14);
    for(let i=0;i<5;i++){ x.strokeStyle="rgba(90,110,150,.22)"; x.lineWidth=1; x.beginPath(); x.moveTo(24,96+i*48); x.lineTo(w-24,96+i*48); x.stroke(); }   // 줄 공책 종이
    x.fillStyle="rgba(43,31,22,.6)"; x.font='20px "Nanum Myeongjo",serif'; x.textAlign="left"; x.fillText("복용 지시",36,58);
    x.fillStyle="#1a1410"; x.textAlign="center"; x.font='74px "Nanum Pen Script",cursive'; x.save(); x.translate(w/2,170); x.rotate(-.05); x.fillText("취침 전 2정",0,0); x.restore();
    x.font='58px "Nanum Pen Script",cursive'; x.save(); x.translate(w/2+90,262); x.rotate(-.03); x.fillText("— E.B.",0,0); x.restore();
    // 반전 단서: 연필로 적은 남은 알약 수. 30정 중 두 알만 비었다 → 수면제로는 사람이 죽지 않는다(엔딩의 "수면제였어요!"와 이어진다)
    x.fillStyle="rgba(70,66,62,.82)"; x.font='48px "Nanum Pen Script",cursive'; x.save(); x.translate(w/2-105,300); x.rotate(.02); x.fillText("남은 약 28/30",0,0); x.restore();
    x.fillStyle="rgba(26,20,16,.5)"; x.beginPath(); x.arc(w/2-30,182,2.2,0,7); x.fill(); });   // 펜이 멈춘 잉크 점
  const lab=(tex,start,len,hgt,y)=>{ const m=new THREE.Mesh(new THREE.CylinderGeometry(r+.0016,r+.0016,hgt,64,1,true,start,len),
      new THREE.MeshStandardMaterial({map:tex,roughness:.94,alphaTest:.5,side:THREE.DoubleSide})); m.position.y=y; m.renderOrder=3; return m; };
  G.add(lab(lf,-1.28,2.56,(2.56*(r+.0016))*420/640,-.035), lab(lb,Math.PI-1.0,2.0,(2.0*(r+.0016))*340/512,-.03));
  return G; }
/* 더러움 맵: 지문 · 먼지 · 마른 와인 자국 (선반 회전체 UV: u=둘레, v=단면 위치) */
function exDirt(opt={}){ const W=1024,H=512,c=document.createElement("canvas"); c.width=W; c.height=H; const g=c.getContext("2d");
  const band=(v0,v1)=>[v0*H,v1*H];
  // 먼지
  for(let i=0;i<2600;i++){ g.fillStyle=`rgba(${215+Math.random()*30|0},${205+Math.random()*30|0},${185+Math.random()*30|0},${Math.random()*.35})`; const s=Math.random()<.9?1:2; g.fillRect(Math.random()*W,Math.random()*H,s,s); }
  // 뿌연 얼룩
  for(let i=0;i<14;i++){ const x=Math.random()*W, y=Math.random()*H, r=20+Math.random()*60, q=g.createRadialGradient(x,y,0,x,y,r); q.addColorStop(0,"rgba(230,222,205,.16)"); q.addColorStop(1,"rgba(230,222,205,0)"); g.fillStyle=q; g.fillRect(x-r,y-r,2*r,2*r); }
  // 지문
  const [f0,f1]=band(...(opt.prints||[.35,.65]));
  for(let k=0;k<(opt.nPrints||4);k++){ const x=Math.random()*W, y=f0+Math.random()*(f1-f0), rx=18+Math.random()*8, ry=26+Math.random()*10, a=Math.random()*3;
    g.save(); g.translate(x,y); g.rotate(a); g.strokeStyle="rgba(235,228,212,.28)"; g.lineWidth=1.3;
    for(let r=3;r<1;r++); for(let r=1;r<9;r++){ g.beginPath(); g.ellipse(0,0,rx*r/9,ry*r/9,0,Math.random()*.6,Math.PI*2-Math.random()*.8); g.stroke(); } g.restore(); }
  // 마른 와인 자국: 깨진 가장자리에서 흘러내린 줄
  if(opt.wine){ const [w0,w1]=band(...opt.wine);
    for(let k=0;k<9;k++){ const x=Math.random()*W, len=(w1-w0)*(.3+Math.random()*.7), wd=3+Math.random()*7;
      const q=g.createLinearGradient(0,w0,0,w0+len); q.addColorStop(0,"rgba(110,16,26,.55)"); q.addColorStop(1,"rgba(110,16,26,0)"); g.fillStyle=q;
      g.beginPath(); g.moveTo(x-wd/2,w0); g.quadraticCurveTo(x+Math.random()*10-5,w0+len*.6,x,w0+len); g.quadraticCurveTo(x+wd/2+2,w0+len*.5,x+wd/2,w0); g.fill(); }
    g.strokeStyle="rgba(120,18,30,.45)"; g.lineWidth=5; g.beginPath(); for(let x=0;x<=W;x+=16) g.lineTo(x,w1-6+Math.sin(x/40)*4+Math.random()*3); g.stroke(); }
  const t=new THREE.CanvasTexture(c); t.encoding=THREE.sRGBEncoding; t.wrapS=THREE.RepeatWrapping; t.anisotropy=8; return t; }
function exDirtSkin(geo,tex,s=1.004){ const m=new THREE.Mesh(geo,new THREE.MeshStandardMaterial({map:tex,transparent:true,roughness:.9,depthWrite:false,side:THREE.DoubleSide})); m.scale.set(s,1,s); m.renderOrder=4; return m; }
function exGlass(){ const G=new THREE.Group();
  const prof=[[0,-.42],[.2,-.42],[.2,-.41],[.03,-.39],[.018,-.3],[.018,-.04],[.04,0],[.15,.05],[.2,.16],[.21,.3],[.19,.44],[.185,.44],[.2,.3],[.19,.17],[.145,.06],[.04,.012],[0,.012]].map(([a,b])=>new THREE.Vector2(a,b));
  const gm=new THREE.MeshPhysicalMaterial({color:0xffffff,roughness:.02,metalness:0,clearcoat:1,transparent:true,opacity:.13,side:THREE.DoubleSide,depthWrite:false,envMapIntensity:2.2});
  // 떨어져 깨진 잔: 윗부분이 들쭉날쭉하게 깨져 나갔다
  const SEG=96, lg=new THREE.LatheGeometry(prof,SEG), np=prof.length, pa=lg.attributes.position;
  const K=23, jag=[]; { let y=.36; for(let i=0;i<K;i++){ y+= (Math.random()-.5)*.09 + (i>=6&&i<=11? -.035:.02); y=Math.max(.14,Math.min(.43,y)); jag.push(y); } jag[8]=.13; jag[9]=.18; jag[15]=.42; jag[16]=.27; }
  const thr=f=>{ const u=(f/(Math.PI*2))*K, i=Math.floor(u)%K, t=u-Math.floor(u); return jag[i]+(jag[(i+1)%K]-jag[i])*t; };
  const side=(a,b)=>prof.slice(a,b+1), outer=side(6,10), inner=side(11,16).slice().reverse();
  const rAt=(pts,y)=>{ for(let k=0;k<pts.length-1;k++){ const A=pts[k],B=pts[k+1]; if((y-A.y)*(y-B.y)<=0&&A.y!==B.y) return A.x+(B.x-A.x)*(y-A.y)/(B.y-A.y); } return pts[pts.length-1].x; };
  for(let i=0;i<=SEG;i++){ const f=i/SEG*Math.PI*2, T=thr(f);
    for(let j=6;j<=16;j++){ const v=i*np+j, y=pa.getY(v); if(y<=T) continue; const r=rAt(j<=10?outer:inner,T); pa.setXYZ(v,r*Math.sin(f),T,r*Math.cos(f)); } }
  lg.computeVertexNormals(); G.add(new THREE.Mesh(lg,gm));
  G.add(exDirtSkin(lg,exDirt({prints:[.33,.6],nPrints:5,wine:[.69,.9]})));
  // 깨진 단면의 반짝임
  const edge=[]; for(let i=0;i<=SEG;i++){ const f=i/SEG*Math.PI*2, T=thr(f), r=rAt(outer,T); edge.push(new THREE.Vector3(r*Math.sin(f),T,r*Math.cos(f))); }
  G.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(edge),new THREE.LineBasicMaterial({color:0xfff6e6,transparent:true,opacity:.55})));
  // 남은 와인: 가장자리로 갈수록 진해지는 얇은 막
  const wc=document.createElement("canvas"); wc.width=wc.height=256; const wg=wc.getContext("2d");
  const rg=wg.createRadialGradient(128,128,10,128,128,128); rg.addColorStop(0,"rgba(70,8,18,.55)"); rg.addColorStop(.78,"rgba(58,5,14,.8)"); rg.addColorStop(.93,"rgba(40,3,10,.95)"); rg.addColorStop(1,"rgba(40,3,10,0)");
  wg.fillStyle=rg; wg.fillRect(0,0,256,256); const wt=new THREE.CanvasTexture(wc); wt.encoding=THREE.sRGBEncoding;
  // 잔 바닥을 채운 와인 (바닥 곡면을 따라 차오름)
  const vol=new THREE.Mesh(new THREE.LatheGeometry([[0,.014],[.038,.014],[.143,.06],[.149,.0745],[0,.0745]].map(([a,b])=>new THREE.Vector2(a,b)),48),new THREE.MeshPhysicalMaterial({color:0x3a0610,roughness:.1,clearcoat:1,transparent:true,opacity:.86,depthWrite:false}));
  vol.renderOrder=1; G.add(vol);
  const wine=new THREE.Mesh(new THREE.CircleGeometry(.149,48),new THREE.MeshStandardMaterial({map:wt,roughness:.08,metalness:.1,transparent:true,depthWrite:false})); wine.rotation.x=-Math.PI/2; wine.position.y=.075; G.add(wine);
  // 가라앉다 만 하얀 가루: 고운 입자가 한쪽에 몰려 뿌옇게 엉겨 있다
  const pc=document.createElement("canvas"); pc.width=pc.height=512; const pg=pc.getContext("2d");
  const cx=230, cy=280;
  for(let i=0;i<14;i++){ const x=cx+(Math.random()-.5)*150, y=cy+(Math.random()-.5)*120, r=30+Math.random()*60; const g=pg.createRadialGradient(x,y,0,x,y,r); g.addColorStop(0,"rgba(236,226,222,.22)"); g.addColorStop(1,"rgba(236,226,222,0)"); pg.fillStyle=g; pg.beginPath(); pg.arc(x,y,r,0,7); pg.fill(); }
  for(let i=0;i<5200;i++){ const a=Math.random()*6.28, d=Math.pow(Math.random(),1.8)*170; const x=cx+Math.cos(a)*d*1.15, y=cy+Math.sin(a)*d*.85; if(Math.hypot(x-256,y-256)>240) continue;
    const s=Math.random()<.92?.7+Math.random()*1.1:1.6+Math.random()*1.6; pg.fillStyle=`rgba(${238+Math.random()*17|0},${230+Math.random()*20|0},${226+Math.random()*20|0},${.35+Math.random()*.6})`; pg.fillRect(x,y,s,s); }
  const pt=new THREE.CanvasTexture(pc); pt.encoding=THREE.sRGBEncoding; pt.anisotropy=8;
  const pw=new THREE.Mesh(new THREE.CircleGeometry(.14,48),new THREE.MeshStandardMaterial({map:pt,roughness:.85,transparent:true,depthWrite:false})); pw.rotation.x=-Math.PI/2; pw.position.y=.0765; G.add(pw);
  return G; }
/* 3D 증거 화면 배경: 증거 촬영 — 무광 회색 배경지 + 위에서 떨어지는 스포트라이트 */
function v3bg(wrap,where){ const bg=document.createElement("div"); bg.className="v3bg"; bg.innerHTML='<i class="l1"></i><i class="l2"></i><i class="l4"></i><i class="l3"></i>'; wrap.prepend(bg); wrap.dataset.bg="a"; if(where) wrap.dataset.where=where; }   // where: 증거가 놓여 있던 자리(그 자리의 방 모습이 뒤로 흐려져 보임)
/* ===== 조사 화면 뒤 3D 방 세트 =====
   증거 뒤에 사진을 까는 대신, 그 증거가 놓여 있던 자리(협탁 옆 · 조각상 뒤 벽 · 의자 옆)를 실제 3D 물체로 세운다.
   벽 패널(wall_panel.jpg)·나무 바닥·러그·램프·벽등·액자. 앞쪽 증거 카메라를 그대로 따라가서 돌리거나 다가가면 같이 움직이고,
   캔버스를 따로 두어 살짝 흐리게(아웃포커스) 보여 준다. 증거 캔버스의 투명 배경(증거 사진 촬영)은 그대로 유지된다. */
function roomBack(wrap,where,getCam){ if(!window.THREE) return; const host=wrap.querySelector(".v3bg"); if(!host) return;
  let R; try{ R=new THREE.WebGLRenderer({antialias:where==="bedside",alpha:false,powerPreference:"low-power",preserveDrawingBuffer:true});   /* 그린 화면을 다른 장면의 배경으로도 읽어 갈 수 있게 유지 */ }catch(e){ return; }
  R.outputEncoding=THREE.sRGBEncoding; R.physicallyCorrectLights=true; R.toneMapping=THREE.ACESFilmicToneMapping; R.toneMappingExposure=1.05; R.setPixelRatio(1); R.setClearColor(0x060907,1);
  const cv=R.domElement; cv.className="v3room"; host.insertBefore(cv,host.children[1]||null);
  /* 배경(벽 텍스처·책상 모델)이 준비되고 한 번 그려진 뒤에 증거와 배경을 같이 드러낸다. 늦어도 1.6초 뒤에는 그냥 보여 준다 */
  wrap.classList.add("bgwait","has3d"); let need=1+(where==="bedside"?1:0), shown=false, drawn=0; const got=()=>{ need--; }, reveal=()=>{ if(shown) return; shown=true; cv.classList.add("rdy"); wrap.classList.remove("bgwait"); }; setTimeout(reveal,1600);
  const S=new THREE.Scene(), C=new THREE.PerspectiveCamera(32,16/9,.05,80); S.fog=new THREE.FogExp2(0x070b08,.05);
  S.add(new THREE.HemisphereLight(0xffe2b8,0x122018,.55)); try{ S.environment=exEnv(R); }catch(e){}
  const CFG={ bedside:{f:4.5,y:-4.7,wz:-1.05,wh:2.8,wy:-.38,tilt:.44}, statue:{f:2.6,y:-1.93,wz:-.37,wh:2.2}, doll:{f:3,y:-1.2,wz:-1.7,wh:2.8,wy:-.5} }[where]||{f:3,y:-1.5,wz:-1.5,wh:2.8};
  const f=CFG.f, G=new THREE.Group(), PV=new THREE.Group(); G.scale.setScalar(f); G.position.y=CFG.y; PV.add(G); PV.rotation.x=CFG.tilt||0; S.add(PV);   // G 안은 미터 단위
  const std=(c,r,m)=>new THREE.MeshStandardMaterial({color:new THREE.Color(c).convertSRGBToLinear(),roughness:r===undefined?.8:r,metalness:m||0});
  const add=(geo,mat,x,y,z)=>{ const o=new THREE.Mesh(geo,mat); o.position.set(x,y,z); G.add(o); return o; };
  const wood=std(0x2a1710,.55), brass=std(0x9a7638,.4,.8);
  /* 바닥 + 벽 */
  { const ft=woodFloor(); ft.repeat.set(6,6); const fl=add(new THREE.PlaneGeometry(9,9),new THREE.MeshStandardMaterial({map:ft,roughness:.6}),0,0,0); fl.rotation.x=-Math.PI/2;
    const wt=new THREE.TextureLoader().load("wall_panel.jpg",got,undefined,got); wt.encoding=THREE.sRGBEncoding; wt.wrapS=THREE.RepeatWrapping; const pw=CFG.wh*.293; wt.repeat.set(Math.round(8/pw),1); wt.anisotropy=4;
    add(new THREE.PlaneGeometry(8,CFG.wh),new THREE.MeshStandardMaterial({map:wt,roughness:.85}),0,CFG.wh/2+(CFG.wy||0),CFG.wz); }
  /* 빛나는 갓 주변의 번짐 */
  const gc=document.createElement("canvas"); gc.width=gc.height=128; { const g=gc.getContext("2d"), q=g.createRadialGradient(64,64,0,64,64,64); q.addColorStop(0,"rgba(255,214,150,.9)"); q.addColorStop(.3,"rgba(255,170,90,.32)"); q.addColorStop(1,"rgba(255,150,70,0)"); g.fillStyle=q; g.fillRect(0,0,128,128); }
  const gtex=new THREE.CanvasTexture(gc), lamps=[];
  const glow=(x,y,z,sz,I,dist)=>{ const sp=new THREE.Sprite(new THREE.SpriteMaterial({map:gtex,blending:THREE.AdditiveBlending,transparent:true,depthWrite:false,fog:false})); sp.scale.setScalar(sz); sp.position.set(x,y,z); G.add(sp);
    const L=new THREE.PointLight(0xffb468,I*f*f,dist*f,2); L.position.set(x,y,z+.06); G.add(L); lamps.push([L,I*f*f,Math.random()*9]); };
  const shadeM=new THREE.MeshBasicMaterial({color:new THREE.Color(0xe9a55c).convertSRGBToLinear().multiplyScalar(.85),side:THREE.DoubleSide,fog:false});
  const sconce=(x,y,z)=>{ add(new THREE.CylinderGeometry(.035,.035,.012,20),brass,x,y-.1,z+.006).rotation.x=Math.PI/2; const arm=add(new THREE.TorusGeometry(.06,.006,8,16,Math.PI),brass,x,y-.1,z+.07); arm.rotation.set(0,Math.PI/2,Math.PI);
    add(new THREE.CylinderGeometry(.042,.075,.11,20,1,true),shadeM,x,y,z+.13); glow(x,y,z+.14,.75,1.5,3.2); };
  const tlamp=(x,y,z)=>{ add(new THREE.CylinderGeometry(.045,.06,.02,20),brass,x,y+.01,z); add(new THREE.CylinderGeometry(.012,.022,.2,12),brass,x,y+.11,z); add(new THREE.CylinderGeometry(.06,.13,.15,24,1,true),shadeM,x,y+.27,z); glow(x,y+.27,z,.7,.75,3.4); };
  const frame=(x,y,z,w,h)=>{ add(new THREE.BoxGeometry(w,h,.025),std(0x7a5c2c,.45,.6),x,y,z+.014); add(new THREE.PlaneGeometry(w-.05,h-.05),std(0x3b2f22,.9),x,y,z+.028); };
  const rug=(x,z,w)=>m3dLoad("rug3d.glb",g=>{ if(!wrap.isConnected) return; const m=g.scene.clone(), bb=new THREE.Box3().setFromObject(m), c=bb.getCenter(new THREE.Vector3()), sz=bb.getSize(new THREE.Vector3()); m.position.set(-c.x,-bb.min.y,-c.z); const gp=new THREE.Group(); gp.add(m); gp.scale.setScalar(w/sz.x); gp.position.set(x,.002,z); G.add(gp); });
  if(where==="bedside"){   // 협탁을 블렌더 장면 그대로: 물결 모양 상판의 밝은 참나무 탁자 · 깎은 다리 · 레이스 러너 · 신문 두 부 · 빨간 통 · 펜 두 자루 · 스프레이 캔
    const T=new THREE.Group(); T.position.set(.02,0,-.66); T.rotation.y=-.42; G.add(T); const ty=.7;   // ty: 상판 윗면 높이
    const D=new THREE.Group(), PT=new THREE.Group(); T.add(D,PT);   // D: 책상 위 소품, PT: 직접 만든 임시 책상(진짜 모델이 오면 교체)
    const put=(geo,mat,x,y,z)=>{ const o=new THREE.Mesh(geo,mat); o.position.set(x,y,z); D.add(o); return o; }, putT=(geo,mat,x,y,z)=>{ const o=new THREE.Mesh(geo,mat); o.position.set(x,y,z); PT.add(o); return o; };
    const cvs=(w,h,draw)=>{ const c=document.createElement("canvas"); c.width=w; c.height=h; draw(c.getContext("2d"),w,h); const t=new THREE.CanvasTexture(c); t.encoding=THREE.sRGBEncoding; t.anisotropy=4; return t; };
    /* 나무결 */
    const oakT=cvs(1024,1024,(g,w,h)=>{   // 사진의 책상처럼 빛바랜 밝은 참나무: 줄무늬가 아니라 은은한 결 + 넓은 얼룩 + 드문 짙은 결
      g.fillStyle="#94795a"; g.fillRect(0,0,w,h);
      for(let k=0;k<26;k++){ const x=Math.random()*w, y=Math.random()*h, rx=160+Math.random()*320, ry=30+Math.random()*70, q=g.createRadialGradient(0,0,0,0,0,1); const d=Math.random()<.5; q.addColorStop(0,d?"rgba(70,50,32,.3)":"rgba(206,188,156,.24)"); q.addColorStop(1,"rgba(0,0,0,0)");
        g.save(); g.translate(x,y); g.scale(rx,ry); g.fillStyle=q; g.fillRect(-1,-1,2,2); g.restore(); }
      for(let k=0;k<1500;k++){ const y=Math.random()*h, x=Math.random()*w, len=60+Math.random()*320, d=Math.random()<.55; g.strokeStyle=d?`rgba(66,46,28,${.1+Math.random()*.16})`:`rgba(214,196,164,${.07+Math.random()*.12})`; g.lineWidth=.5+Math.random()*1.1;
        g.beginPath(); g.moveTo(x,y); g.bezierCurveTo(x+len*.33,y+(Math.random()-.5)*5,x+len*.66,y+(Math.random()-.5)*5,x+len,y+(Math.random()-.5)*6); g.stroke(); }
      for(let k=0;k<14;k++){ const y=Math.random()*h; g.strokeStyle=`rgba(58,40,24,${.22+Math.random()*.2})`; g.lineWidth=1.2+Math.random()*2; g.beginPath(); g.moveTo(0,y); let yy=y; for(let x=0;x<=w;x+=64){ yy+=(Math.random()-.5)*7; g.lineTo(x,yy); } g.stroke(); }
      for(let k=0;k<9000;k++){ g.fillStyle=`rgba(${Math.random()<.5?"70,54,38":"232,220,198"},${Math.random()*.06})`; g.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*5,1); } });
    oakT.wrapS=oakT.wrapT=THREE.RepeatWrapping;
    const oak=new THREE.MeshStandardMaterial({map:oakT,roughness:.68}), oakD=new THREE.MeshStandardMaterial({map:oakT,roughness:.7,color:new THREE.Color(0xc9b8a2).convertSRGBToLinear()});
    /* 상판: 네 귀가 둥글게 튀어나오고 변이 완만하게 굽은 모양 */
    { const a=.37,b=.27,e=.05,sh=new THREE.Shape(); sh.moveTo(-a+e*1.6,-b+.012);
      sh.quadraticCurveTo(0,-b-.012,a-e*1.6,-b+.012); sh.lineTo(a-e*1.25,-b+.012); sh.absarc(a-e,-b+e,e,-Math.PI/2-.5,.5,false); sh.lineTo(a-.012,-b+e*1.6);
      sh.quadraticCurveTo(a+.01,0,a-.012,b-e*1.6); sh.absarc(a-e,b-e,e,-.5,Math.PI/2+.5,false); sh.lineTo(a-e*1.6,b-.012);
      sh.quadraticCurveTo(0,b+.012,-a+e*1.6,b-.012); sh.absarc(-a+e,b-e,e,Math.PI/2-.5,Math.PI+.5,false); sh.lineTo(-a+.012,b-e*1.6);
      sh.quadraticCurveTo(-a-.01,0,-a+.012,-b+e*1.6); sh.absarc(-a+e,-b+e,e,Math.PI-.5,Math.PI*1.5+.5,false);
      const tg=new THREE.ExtrudeGeometry(sh,{depth:.026,bevelEnabled:true,bevelThickness:.006,bevelSize:.007,bevelSegments:3,curveSegments:14}); tg.rotateX(-Math.PI/2);
      { const uv=tg.attributes.uv, ps=tg.attributes.position; for(let k=0;k<uv.count;k++) uv.setXY(k,ps.getX(k)*1.3+.5,ps.getZ(k)*1.3+.5); }
      putT(tg,oak,0,ty-.032,0); }
    putT(new THREE.BoxGeometry(.6,.075,.42),oakD,0,ty-.078,0);   // 상판 아래 프레임
    /* 깎은 다리(선반 가공) */
    { const pr=[[.0,0],[.02,0],[.026,.02],[.016,.05],[.021,.09],[.03,.13],[.021,.17],[.015,.2],[.024,.215],[.015,.23],[.017,.33],[.03,.38],[.034,.42],[.022,.46],[.016,.48],[.026,.495],[.026,.5],[0,.5]].map(q=>new THREE.Vector2(q[0],q[1])), lg=new THREE.LatheGeometry(pr,14);
      [[-.27,-.18],[.27,-.18],[-.27,.18],[.27,.18]].forEach(([lx,lz])=>{ putT(lg,oakD,lx,0,lz); putT(new THREE.BoxGeometry(.056,.16,.056),oakD,lx,.58,lz); }); }
    /* 진짜 책상: 졸업작품 원본(Table2.obj + 서브스턴스 페인터 텍스처 4세트)을 glb로 묶은 bedside3d.glb.
       책상·레이스 천·신문·펜·빨간 통·스프레이 캔이 모양과 텍스처 모두 원본 그대로다. 아래 직접 만든 소품은 이 파일을 못 읽었을 때만 쓰는 대비용 */
    m3dLoad("bedside3d.glb",g=>{ if(!wrap.isConnected) return; const src=g.scene.clone(true); src.updateMatrixWorld(true); const part={}; src.traverse(o=>{ if(o.isMesh){ o.material=o.material.clone(); o.material.envMapIntensity=.5; if(o.material.map) o.material.map.anisotropy=8; part[o.material.name]=o; } }); const tb=part.TABLE; if(!tb) return;
      const b=new THREE.Box3().setFromObject(tb), k=ty/(b.max.y-b.min.y), M=new THREE.Group(); src.position.set(-(b.min.x+b.max.x)/2,-b.min.y,-(b.min.z+b.max.z)/2); M.add(src); M.scale.setScalar(k);
      if(part.Material){ const am=new THREE.TextureLoader().load("bedside3d_lace.jpg"); am.flipY=false; const mt=part.Material.material; mt.alphaMap=am; mt.transparent=true; mt.alphaTest=.4; mt.side=THREE.DoubleSide; mt.needsUpdate=true; }   // 레이스의 구멍
      /* 스프레이 캔: 내보낸 텍스처엔 라벨이 없어서, 사진처럼 흰 몸통에 빨간 'TITAN PAINT' 라벨을 둘러 붙인다 */
      { const o=part["lambert1.002"]; if(o){ o.material.color.setScalar(1.22); const ps=o.geometry.attributes.position, v=new THREE.Vector3(), mw=o.matrixWorld.clone(); let y0=1e9,yT=-1e9; for(let q=0;q<ps.count;q++){ v.fromBufferAttribute(ps,q).applyMatrix4(mw); if(v.y<y0)y0=v.y; if(v.y>yT)yT=v.y; } const hh=yT-y0; let x0=1e9,x1=-1e9,z0=1e9,z1=-1e9;   /* 책상 기준 좌표(위쪽이 +y)에서 잰다 */
          for(let q=0;q<ps.count;q++){ v.fromBufferAttribute(ps,q).applyMatrix4(mw); if(v.y>y0+hh*.78){ if(v.x<x0)x0=v.x; if(v.x>x1)x1=v.x; if(v.z<z0)z0=v.z; if(v.z>z1)z1=v.z; } }   // 통보다 높은 구간 = 캔 뚜껑(몸통과 지름이 거의 같다)
          if(x1>x0){ const r=(x1-x0+z1-z0)/4*1.13, lab=cvs(1024,256,(g,w,h)=>{ g.fillStyle="#a8221d"; g.fillRect(0,0,w,h); g.fillStyle="#f1ede4"; g.fillRect(0,0,w,10); g.fillRect(0,h-10,w,10); g.textAlign="center";
                for(let n=0;n<2;n++){ const cx=w/4+n*w/2; g.font="900 118px 'Arial Black',Impact,sans-serif"; g.fillText("TITAN",cx,150,w/2-70); g.font="700 44px Arial,sans-serif"; g.fillText("P A I N T",cx,208,w/2-90); }
                for(let n=0;n<260;n++){ g.fillStyle=`rgba(${Math.random()<.5?"70,10,8":"240,230,220"},${Math.random()*.18})`; g.fillRect(Math.random()*w,Math.random()*h,1+Math.random()*7,1); } });
            const lm=new THREE.Mesh(new THREE.CylinderGeometry(r*1.015,r*1.015,hh*.36,36,1,true),new THREE.MeshStandardMaterial({map:lab,roughness:.42,metalness:.1})); lm.position.set((x0+x1)/2,y0+hh*.4,(z0+z1)/2); lm.rotation.y=1.75; src.add(lm); } } }
      T.remove(PT); T.remove(D); T.add(M); got(); });
    /* 레이스 러너: 구멍이 뚫린 꽃무늬, 뒤에서 앞으로 상판을 가로질러 앞 가장자리 아래로 늘어지고 끝은 물결 */
    const laceT=cvs(384,1024,(g,w,h)=>{ g.clearRect(0,0,w,h); const sc=28;
      g.fillStyle="rgba(232,222,224,.5)"; g.fillRect(6,sc,w-12,h-sc*2);                                  // 성긴 망
      g.globalCompositeOperation="destination-out"; for(let y=sc;y<h-sc;y+=9) for(let x=8+((y/9|0)%2)*4.5;x<w-8;x+=9){ g.beginPath(); g.arc(x,y,2.6,0,7); g.fill(); }
      g.globalCompositeOperation="source-over"; g.fillStyle="rgba(240,231,232,1)";
      for(let x=0;x<w;x+=48){ g.beginPath(); g.arc(x+24,sc,24,Math.PI,0); g.fill(); g.beginPath(); g.arc(x+24,h-sc,24,0,Math.PI); g.fill(); }   // 양 끝 물결 단
      g.fillRect(0,sc,10,h-sc*2); g.fillRect(w-10,sc,10,h-sc*2);
      for(let y=90;y<h-60;y+=96) for(let x=48+((y/96|0)%2)*48;x<w-20;x+=96){ g.save(); g.translate(x,y); for(let q=0;q<6;q++){ g.rotate(Math.PI/3); g.beginPath(); g.ellipse(0,19,9,17,0,0,7); g.fill(); } g.beginPath(); g.arc(0,0,8,0,7); g.fill(); g.restore();
        g.strokeStyle="rgba(240,231,232,.95)"; g.lineWidth=4; g.beginPath(); g.arc(x+48,y+48,22,0,7); g.stroke(); }
      g.globalCompositeOperation="destination-out"; for(let x=0;x<w;x+=48){ g.beginPath(); g.arc(x+24,sc-4,7,0,7); g.fill(); g.beginPath(); g.arc(x+24,h-sc+4,7,0,7); g.fill(); } });
    { const W=.3,N=36,L=.78,pos=[],uvs=[],idx=[],zb=-.285,zf=.285; for(let k=0;k<=N;k++){ const q=k/N*L; let y,z; if(q<.06){ z=zb-.004; y=ty-(.06-q); } else if(q<.06+(zf-zb)){ z=zb+(q-.06); y=ty+.003; } else { const d=q-.06-(zf-zb); z=zf+.006+Math.sin(d*9)*.006; y=ty-d; }
        pos.push(-W/2,y,z, W/2,y,z); uvs.push(0,1-k/N, 1,1-k/N); if(k<N){ const o=k*2; idx.push(o,o+2,o+1, o+1,o+2,o+3); } }
      const lg=new THREE.BufferGeometry(); lg.setAttribute("position",new THREE.Float32BufferAttribute(pos,3)); lg.setAttribute("uv",new THREE.Float32BufferAttribute(uvs,2)); lg.setIndex(idx); lg.computeVertexNormals();
      put(lg,new THREE.MeshStandardMaterial({map:laceT,transparent:true,alphaTest:.3,side:THREE.DoubleSide,roughness:1}),.07,0,0); }
    /* 신문: 실제 헤드라인을 인쇄 */
    const paperBase=(g,w,h)=>{ g.fillStyle="#b9b2a0"; g.fillRect(0,0,w,h); for(let k=0;k<900;k++){ g.fillStyle=`rgba(90,80,62,${Math.random()*.06})`; g.fillRect(Math.random()*w,Math.random()*h,3,3); } };
    const cols=(g,x,y,w,h,n)=>{ g.fillStyle="rgba(34,30,26,.6)"; const cw=(w-(n-1)*10)/n; for(let c=0;c<n;c++) for(let r=0;r<h;r+=7) g.fillRect(x+c*(cw+10),y+r,cw*(.82+Math.random()*.18),2.6); };
    const news1=cvs(512,704,(g,w,h)=>{ paperBase(g,w,h); g.fillStyle="#1d1a17"; g.textAlign="center"; g.font="900 78px 'Arial Black',Impact,sans-serif"; g.fillText("ALARM SYSTEM",w/2,92,w-36); g.fillText("DETECTS FAILS",w/2,176,w-36);
      g.fillRect(24,196,w-48,4); g.font="700 20px Georgia,serif"; g.fillText("SECURITY EXPERTS ISSUE WARNING",w/2,228,w-60); g.fillRect(24,240,w-48,2);
      g.beginPath(); g.arc(w/2,330,54,0,7); g.fill(); g.fillStyle="#b9b2a0"; g.beginPath(); g.arc(w/2,330,40,0,7); g.fill(); g.fillStyle="#1d1a17"; g.font="700 13px Georgia,serif"; g.fillText("SECURITY",w/2,326); g.fillText("SYSTEMS",w/2,342);
      cols(g,26,262,150,150,1); cols(g,336,262,150,150,1); cols(g,26,430,w-52,250,4); });
    const news2=cvs(512,704,(g,w,h)=>{ paperBase(g,w,h); g.fillStyle="#1d1a17"; g.textAlign="center"; g.font="700 26px Georgia,serif"; g.fillText("THE EVENING DISPATCH",w/2,40,w-40); g.fillRect(24,52,w-48,3);
      g.font="900 54px 'Arial Black',Impact,sans-serif"; g.fillText("TRAIN ROBBERY",w/2,112,w-40); g.fillText("SUSPECT ARRESTED",w/2,166,w-40); g.fillRect(24,182,w-48,3);
      g.fillStyle="#2b2723"; g.fillRect(30,204,210,250); g.fillStyle="#8d8778"; g.beginPath(); g.ellipse(135,300,46,58,0,0,7); g.fill(); g.fillStyle="#57524a"; g.beginPath(); g.ellipse(135,420,86,56,0,Math.PI,0); g.fill(); g.fillStyle="#3a352f"; g.beginPath(); g.ellipse(135,262,50,26,0,Math.PI,0); g.fill();
      cols(g,262,206,224,246,2); cols(g,30,474,w-60,206,4); });
    const pm=std(0xa49d8c,.92), nm=t=>new THREE.MeshStandardMaterial({map:t,roughness:.9,side:THREE.DoubleSide});
    { const n=put(new THREE.BoxGeometry(.25,.004,.345),[pm,pm,nm(news2),pm,pm,pm],-.04,ty+.008,.085); n.rotation.y=.42; n.userData.keep=1; }   // 아래 신문(초상 사진)
    { const g2=new THREE.PlaneGeometry(.25,.345,1,18); g2.rotateX(-Math.PI/2); const ps=g2.attributes.position; for(let k=0;k<ps.count;k++){ const z=ps.getZ(k), u=(z+.1725)/.345; ps.setY(k,.005+.004*Math.exp(-Math.pow((u-.56)/.13,2))); } g2.computeVertexNormals();
      const n=put(g2,nm(news1),.1,ty+.008,-.03); n.rotation.y=-.1; n.userData.keep=1; }                                                             // 위 신문(가운데가 접혀 살짝 뜸)
    /* 빨간 통 */
    { const red=std(0xa3211d,.35,.35); put(new THREE.CylinderGeometry(.03,.03,.03,24),red,-.09,ty+.02,-.1); put(new THREE.CylinderGeometry(.031,.031,.008,24),std(0x7d1512,.3,.4),-.09,ty+.036,-.1); put(new THREE.CylinderGeometry(.022,.022,.002,20),std(0xc23a30,.4,.3),-.09,ty+.041,-.1); }
    /* 펜 두 자루: 적갈색 몸통 + 금색 띠·촉 */
    { const body=std(0x4c1714,.3,.2), gold=std(0xb8934a,.3,.9); const pen=(x,z,r)=>{ const P=new THREE.Group(); const b=new THREE.Mesh(new THREE.CylinderGeometry(.0058,.0052,.12,10),body); b.rotation.z=Math.PI/2; P.add(b);
        const r1=new THREE.Mesh(new THREE.CylinderGeometry(.0062,.0062,.006,10),gold); r1.rotation.z=Math.PI/2; r1.position.x=.02; P.add(r1); const nb=new THREE.Mesh(new THREE.ConeGeometry(.005,.022,10),gold); nb.rotation.z=-Math.PI/2; nb.position.x=.071; P.add(nb);
        P.position.set(x,ty+.014,z); P.rotation.y=r; D.add(P); }; pen(-.05,.19,.55); pen(.03,.215,.3); }
    /* 스프레이 캔: 흰 몸통 + 빨간 뚜껑 + 라벨 */
    { const lab=cvs(256,128,(g,w,h)=>{ g.fillStyle="#e9e6de"; g.fillRect(0,0,w,h); g.fillStyle="#b3231f"; g.fillRect(0,34,w,58); g.fillStyle="#fff"; g.textAlign="center"; g.font="900 34px 'Arial Black',Impact,sans-serif"; g.fillText("TITAN",64,72); g.fillText("TITAN",192,72); g.font="700 13px Arial"; g.fillText("PAINT",64,87); g.fillText("PAINT",192,87); });
      put(new THREE.CylinderGeometry(.03,.03,.105,24),new THREE.MeshStandardMaterial({map:lab,roughness:.35,metalness:.2}),-.235,ty+.053,-.075); put(new THREE.CylinderGeometry(.027,.029,.034,24),std(0xb3231f,.35,.1),-.235,ty+.122,-.075); put(new THREE.CylinderGeometry(.03,.031,.006,24),std(0xbdb9b0,.3,.8),-.235,ty+.107,-.075); }
    sconce(-.62,1.2,CFG.wz); { const L=new THREE.PointLight(0xffe6c8,1.2*f*f,3.2*f,2); L.position.set(-.2,1.45,-.25); G.add(L); S.fog.density=.014; const dl=new THREE.DirectionalLight(0xfff0dc,1.9); dl.position.set(-1.5,5,3); S.add(dl); S.add(new THREE.HemisphereLight(0xfff4e6,0x3a3830,.75)); /* 원본 재질이 사진처럼 제 색(흰 레이스·흰 캔·밝은 나무)으로 보이도록 밝고 덜 누런 빛 */ }   // 책상 위를 비추는 방 조명
    add(new THREE.BoxGeometry(1.1,1.02,.06),wood,1.25,.51,CFG.wz+.06); add(new THREE.BoxGeometry(1.0,.26,1.3),std(0x2c5238,.95),1.25,.47,-.32); add(new THREE.BoxGeometry(.5,.1,.3),std(0x4a6b4e,.95),1.13,.65,-.78);
    rug(.4,.3,2.2);
  } else if(where==="statue"){   // 조각상 테이블 뒤의 벽 · 벽등 · 초상화 액자
    sconce(.52,1.1,CFG.wz); frame(-.6,1.12,CFG.wz,.3,.38); rug(0,.5,2.2);
  } else {   // 인형: 방금 인형이 나온 의자 · 러그 · 붉은 식탁보의 식탁과 램프
    const underChair=wrap.classList.contains("chair");   // 의자 밑 장면: 앞에 이미 의자와 러그가 있으니 배경에는 또 놓지 않는다
    if(!underChair) rug(0,-.7,2.3);
    if(!underChair) m3dLoad("chair3d.glb",g=>{ if(!wrap.isConnected) return; const m=g.scene.clone(), b=new THREE.Box3().setFromObject(m), sz=b.getSize(new THREE.Vector3()), c=b.getCenter(new THREE.Vector3()); m.position.set(-c.x,-b.min.y,-c.z); const gp=new THREE.Group(); gp.add(m); gp.scale.setScalar(1/sz.y); gp.rotation.y=.55; gp.position.set(-.6,0,-.85); G.add(gp); });
    if(!underChair){ add(new THREE.CylinderGeometry(.5,.56,.74,40),std(0x6a242e,.95),.98,.37,-1.15); add(new THREE.CylinderGeometry(.11,.11,.008,24),std(0xe6dfcf,.4),.82,.746,-.95); }   // 붉은 식탁보의 식탁·접시: 의자 밑 장면에서는 뺀다
    if(!underChair) tlamp(.8,.74,-1.3); sconce(-.22,.92,CFG.wz); frame(.22,.86,CFG.wz,.34,.26);
  }
  const draw=t=>{ const loop=draw;
    loop.n=(loop.n||0)+1;   // 흐리게 보이는 뒷배경이라 절반 해상도 · 한 프레임 걸러 그려 가볍게
    const rs=where==="bedside"?.55:.45, w=Math.round(host.clientWidth*rs),h=Math.round(host.clientHeight*rs); if(w&&h&&(cv.width!==w||cv.height!==h)) R.setSize(w,h,false);
    const c=getCam&&getCam(); if(c){ c.updateMatrixWorld(); C.copy(c); C.near=.05; C.far=80; C.updateProjectionMatrix(); C.updateMatrixWorld(true); }
     /* 앞 증거 카메라가 움직이는 동안(다가가기·돌아보기)은 매 프레임 같이 그려 두 화면이 어긋나 겹쳐 보이지 않게 하고, 카메라가 멈춰 있으면(물체만 돌릴 때) 램프 흔들림용으로 가끔만 그린다 */
     { const me=C.matrixWorld.elements, lm=loop.m||(loop.m=new Array(16).fill(0)); let mv=false; for(let i=0;i<16;i++){ if(Math.abs(me[i]-lm[i])>1e-4){ mv=true; } lm[i]=me[i]; } loop.mv=mv?6:(loop.mv>0?loop.mv-1:0);
       if(!loop.mv && loop.n%12) return; }
    lamps.forEach(l=>{ l[0].intensity=l[1]*(1+Math.sin(t/430+l[2])*.05+Math.sin(t/170+l[2])*.025); });   // 램프 불빛이 아주 살짝 흔들림
    if(!document.hidden){ R.render(S,C); if(need<=0&&!shown&&++drawn>=1) reveal(); } };
  /* 앞 증거를 그리는 같은 프레임 안에서 이 배경도 먼저 그린다(wrap.__rd) → 두 화면이 한 박자씩 어긋나 겹쳐 보이지 않는다. 앞쪽 루프가 아직 안 돌 때만 자체 루프로 그린다 */
  wrap.__rd=()=>{ wrap.__sy=performance.now(); draw(wrap.__sy); };
  const loop=t=>{ if(!wrap.isConnected){ try{ R.dispose(); R.forceContextLoss(); }catch(e){} return; } if(!wrap.__sy||t-wrap.__sy>200) draw(t); requestAnimationFrame(loop); };
  requestAnimationFrame(loop); }
function unmountExam(){ if(!EX) return; cancelAnimationFrame(EX.raf); EX.wrap.remove(); try{ EX.R.dispose(); }catch(e){} EX=null; }
function cropContent(cv){ const W=cv.width,H=cv.height, t=document.createElement("canvas"); t.width=W; t.height=H; const g=t.getContext("2d"); g.drawImage(cv,0,0);
  const d=g.getImageData(0,0,W,H).data; let x0=W,y0=H,x1=0,y1=0;
  for(let y=0;y<H;y+=2) for(let x=0;x<W;x+=2){ if(d[(y*W+x)*4+3]>24){ if(x<x0)x0=x; if(x>x1)x1=x; if(y<y0)y0=y; if(y>y1)y1=y; } }
  if(x1<=x0||y1<=y0) return cv.toDataURL("image/jpeg",.85);
  const px=(x1-x0)*.14, py=(y1-y0)*.1; x0=Math.max(0,x0-px); x1=Math.min(W,x1+px); y0=Math.max(0,y0-py); y1=Math.min(H,y1+py);
  const o=document.createElement("canvas"); o.width=x1-x0; o.height=y1-y0; o.getContext("2d").drawImage(t,x0,y0,o.width,o.height,0,0,o.width,o.height); return o.toDataURL("image/png"); }
function mountExam(s){ const CF=EXAM[s.id]; if(!window.THREE) return;
  if(EX&&EX.s===s){ EX.sync(); return; } unmountExam(); unmountStatue3D();
  const ph=$("iPhoto"), wrap=document.createElement("div"); wrap.className="v3d"; ph.appendChild(wrap); ph.classList.remove("veiled"); v3bg(wrap,s.id);
  const R=new THREE.WebGLRenderer({antialias:true,alpha:true,preserveDrawingBuffer:s.id==="bedside"}); R.outputEncoding=THREE.sRGBEncoding; R.physicallyCorrectLights=true; R.toneMapping=THREE.ACESFilmicToneMapping;
  R.setPixelRatio(Math.min(devicePixelRatio,1.5)); wrap.appendChild(R.domElement);
  const S=new THREE.Scene(), C=new THREE.PerspectiveCamera(32,16/9,.01,50);
  S.environment=exEnv(R); S.add(new THREE.HemisphereLight(0xffe7c4,0x16241a,.7));
  const key=new THREE.PointLight(0xffc98a,24,8,1.6); key.position.set(1.1,1.5,1.6); S.add(key);
  const rim=new THREE.PointLight(0x9ec4ae,7,8,1.6); rim.position.set(-1.4,1.2,-1.4); S.add(rim);
  const obj=CF.build(); S.add(obj);
  const hint=document.createElement("div"); hint.className="v3hint"; wrap.appendChild(hint);
  const spot=document.createElement("button"); spot.className="exspot"; spot.innerHTML=`<span>${CF.label}</span>`; spot.setAttribute("aria-label",CF.label+" 살펴보기"); wrap.appendChild(spot);
  EX={s,R,S,C,wrap,obj,raf:0,yaw:CF.yaw||0,pitch:0,drag:null,face:0,done:found.has(s.id),
      ry:(CF.yaw||0)-.9,rp:.35,vy:0,vp:0,t0:0,lx:0,ly:0,lt:0};   // ry/rp: 실제로 보이는 각도(목표를 무게감 있게 따라감), vy/vp: 놓은 뒤 남는 회전 관성
  EX.sync=()=>{ EX.done=found.has(s.id); hint.innerHTML=EX.done?"":`<small>${CF.pre}</small><b>${CF.hint}</b>`; };
  EX.sync();
  const el=R.domElement;
  /* 손에 쥔 느낌: 끄는 동안엔 각도가 손을 살짝 늦게 따라오고, 휙 던지듯 놓으면 그 속도로 계속 돌다가 서서히 멈춘다 */
  el.onpointerdown=e=>{ EX.drag={x:e.clientX,y:e.clientY,yaw:EX.yaw,pitch:EX.pitch}; EX.vy=EX.vp=0; EX.lx=e.clientX; EX.ly=e.clientY; EX.lm=performance.now(); wrap.classList.add("grab"); try{ el.setPointerCapture(e.pointerId); }catch(_){} };
  el.onpointermove=e=>{ if(!EX||!EX.drag) return; const r=el.getBoundingClientRect(), now=performance.now(), dt=Math.max(8,now-EX.lm);
    const py=EX.yaw, pp=EX.pitch;
    EX.yaw=EX.drag.yaw+(e.clientX-EX.drag.x)/Math.min(r.width,640)*5; EX.pitch=Math.max(CF.pitch[0],Math.min(CF.pitch[1],EX.drag.pitch+(e.clientY-EX.drag.y)/Math.min(r.height,420)*2.6));
    EX.vy=Math.max(-7,Math.min(7,EX.vy*.5+(EX.yaw-py)/dt*1000*.5)); EX.vp=Math.max(-4,Math.min(4,EX.vp*.5+(EX.pitch-pp)/dt*1000*.5)); EX.lm=now; };   // 라디안/초
  el.onpointerup=()=>{ if(!EX) return; if(performance.now()-EX.lm>80){ EX.vy=EX.vp=0; } EX.drag=null; wrap.classList.remove("grab"); };
  el.onwheel=e=>{ e.preventDefault(); EX.zoom=Math.max(.22,Math.min(1.5,(EX.zoom||1)*(e.deltaY>0?1.08:.92))); };
  spot.onclick=e=>{ e.stopPropagation(); if(EX.done) return; EX.done=true; spot.classList.remove("on"); wrap.classList.add("exhit"); hint.innerHTML=""; EX.zoomT=.46; EX.vy=EX.vp=0; EX.zin=true; EX.zs=0;   // 인형처럼 단서 앞으로 카메라가 다가가 크게 보여 줌
    const fb=document.createElement("div"); fb.className="exfound"; fb.innerHTML=`<small>단서 발견</small><b>${CF.label}</b>`; wrap.appendChild(fb);
    hit(900,.25,.3); paper(); setTimeout(()=>{ fb.remove(); if(activeSpot!==s) return; EX.zoomT=1; EX.zin=false; collect(s); renderInspect(s); renderSide(); $("iBody").classList.add("rise"); if(s.th) think(s.th); },3400); };
  const wp=new THREE.Vector3(), wn=new THREE.Vector3(), tc=new THREE.Vector3(), q=new THREE.Quaternion();
  const loop=t=>{ if(!EX||EX.s!==s) return; if(activeSpot!==s||mode!=="inspect"){ unmountExam(); return; }
    try{ const pr=(window.CAMHUB&&CAMHUB.state==="hands")?1:Math.min(devicePixelRatio,1.5); if(R.getPixelRatio()!==pr) R.setPixelRatio(pr); }catch(e){}   // 손 카메라가 켜진 동안은 해상도 1배
    const w=wrap.clientWidth,h=wrap.clientHeight; if(w&&h&&R.domElement.width!==Math.round(w*R.getPixelRatio())){ R.setSize(w,h,false); C.aspect=w/h; C.updateProjectionMatrix(); }
    const dt0=Math.min(.05,(t-(EX.pt||t))/1000); EX.pt=t;
    if(!EX.drag && (Math.abs(EX.vy)>.01||Math.abs(EX.vp)>.01)){                 // 던진 회전이 마찰로 서서히 멈춤
      EX.yaw+=EX.vy*dt0; EX.pitch=Math.max(CF.pitch[0],Math.min(CF.pitch[1],EX.pitch+EX.vp*dt0));
      const fr=Math.pow(.06,dt0); EX.vy*=fr; EX.vp*=fr; if(EX.pitch<=CF.pitch[0]||EX.pitch>=CF.pitch[1]) EX.vp*=-.35; }
    const pry=EX.ry; EX.ry+=(EX.yaw-EX.ry)*(1-Math.pow(.0008,dt0)); EX.rp+=(EX.pitch-EX.rp)*(1-Math.pow(.0008,dt0));   // 무게감 있게 따라감
    const spin=dt0?(EX.ry-pry)/dt0:0;
    if(!EX.t0) EX.t0=t; const it=Math.min(1,(t-EX.t0)/750), ie=1+2.2*Math.pow(it-1,3)+1.2*Math.pow(it-1,2);   // 집어 드는 등장: 아래에서 올라와 살짝 넘쳤다 자리 잡음
    const idle=(EX.drag||EX.zin)?0:Math.sin(t/900)*.04, sway=EX.zin?0:Math.sin(t/1300)*.012;
    obj.position.set(0,(1-ie)*-.28+Math.sin(t/1100)*.006,0); obj.scale.setScalar(.82+.18*ie);
    obj.rotation.set(EX.rp+(1-ie)*.55+sway,EX.ry+idle,Math.max(-.12,Math.min(.12,-spin*.03)));   // 빨리 돌리면 손목이 살짝 기욺
    EX.zoom+=((EX.zoomT||1)-(EX.zoom||1))*(1-Math.pow(.003,dt0)); const cp=CF.cam, k=($("insp").classList.contains("exam")?1.75:1)*(EX.zoom||1); C.position.set(cp[0]*k,cp[1]*k,cp[2]*k); C.lookAt(0,0,0); obj.updateMatrixWorld(true);
    wp.set(...CF.spot.p); obj.localToWorld(wp); obj.getWorldQuaternion(q); wn.set(...CF.spot.n).applyQuaternion(q).normalize();
    if(EX.zin||EX.zs>0){ EX.zs=Math.max(0,Math.min(1,EX.zs+(EX.zin?dt0*1.6:-dt0*2))); const ez=EX.zs*EX.zs*(3-2*EX.zs);
      const tp=wp.clone().addScaledVector(wn,.34); C.position.lerp(tp,ez); C.lookAt(new THREE.Vector3(0,0,0).lerp(wp,ez)); }
    tc.copy(C.position).sub(wp).normalize(); const facing=wn.dot(tc);
    const dt=Math.min(.1,(t-(EX.lt||t))/1000); EX.lt=t;   // 단서 면이 0.25초쯤 화면을 향하고 있으면 표시
    EX.face=facing>.55?Math.min(1,EX.face+dt*4):Math.max(0,EX.face-dt*6);
    if(!EX.done && EX.face>=1){ const sp=wp.clone().project(C); spot.style.left=((sp.x+1)/2*100)+"%"; spot.style.top=((1-sp.y)/2*100)+"%"; if(!spot.classList.contains("on")){ spot.classList.add("on"); hit(1800,.05,.08,"bandpass"); } }
    else if(spot.classList.contains("on")&&EX.face<.5) spot.classList.remove("on");
    wrap.__rd&&wrap.__rd();
    R.render(S,C);
    if(s.id==="bedside"&&!EVIMG.bedside&&w&&h){   // 증거 사진: 라벨 뒤 손글씨 쪽을 가까이서 찍고, 약병만 잘라 크게
      try{ const kp=C.position.clone(), kr=obj.rotation.y; C.position.set(0,.06,.8); C.lookAt(0,0,0); obj.rotation.set(0,Math.PI+.12,0); obj.updateMatrixWorld(true); R.render(S,C);
        EVIMG.bedside=cropContent(R.domElement); C.position.copy(kp); C.lookAt(0,0,0); obj.rotation.set(EX.pitch,kr,0); }catch(e){}
    }
    EX.raf=requestAnimationFrame(loop); };
  EX.raf=requestAnimationFrame(loop); roomBack(wrap,s.id,()=>EX&&EX.C);
}
/* ---------- 3D 조각상 (돌려 보고 들어 올리기) ---------- */
let S3=null;
/* 3D로 살펴볼 수 있는 증거 (블렌더 모델에서 추출) */
const M3D={
  statue:{file:"angel4.json",lift:true,cam:[0,.95,2.0],look:.36},
  victim:{file:"victim.json",cam:[0,.9,1.5],look:.1,hint:"끌어서 돌려 보기 · 가슴 위 손 아래를 살펴보자",tint:(o,m)=>{}},
  plates:{file:"tableset.json",cam:[0,.95,1.7],look:.3,cloth:true,hint:"끌어서 돌려 보기 · 두 접시를 비교해 보자"},
  bedside:{file:"bedside.json",cam:[0,.85,1.7],look:.35,hint:"끌어서 돌려 보기 · 협탁 위 약병",
    tint:(o,m)=>{ const n=o.name||""; m.color.set(/Lamp|lamp/.test(m.name)?0xe8d9b8:0x6a4a30).convertSRGBToLinear(); }}
};
function splitBiggest(mesh,clothColor,restColor){
  const g=mesh.geometry, idx=g.index, pos=g.attributes.position; if(!idx) return;
  const n=pos.count, par=new Int32Array(n); for(let i=0;i<n;i++) par[i]=i;
  const find=x=>{ while(par[x]!==x){ par[x]=par[par[x]]; x=par[x]; } return x; }, uni=(a,b)=>{ a=find(a); b=find(b); if(a!==b) par[a]=b; };
  const key=new Map(); for(let i=0;i<n;i++){ const k=Math.round(pos.getX(i)*4000)+","+Math.round(pos.getY(i)*4000)+","+Math.round(pos.getZ(i)*4000); if(key.has(k)) uni(i,key.get(k)); else key.set(k,i); }
  const I=idx.array; for(let t=0;t<I.length;t+=3){ uni(I[t],I[t+1]); uni(I[t],I[t+2]); }
  const cnt=new Map(); for(let t=0;t<I.length;t+=3){ const r=find(I[t]); cnt.set(r,(cnt.get(r)||0)+1); }
  let big=-1,bn=0; cnt.forEach((v,k)=>{ if(v>bn){bn=v;big=k;} });
  const A=[],B=[]; for(let t=0;t<I.length;t+=3){ (find(I[t])===big?A:B).push(I[t],I[t+1],I[t+2]); }
  const arr=new (I.constructor)(A.length+B.length); arr.set(A,0); arr.set(B,A.length);
  g.setIndex(new THREE.BufferAttribute(arr,1)); g.clearGroups(); g.addGroup(0,A.length,0); g.addGroup(A.length,B.length,1);
  const a=mesh.material.clone(), b=mesh.material.clone(); a.map=null; a.color.set(clothColor).convertSRGBToLinear(); a.roughness=.95; b.map=null; b.color.set(restColor).convertSRGBToLinear(); b.roughness=.35; b.metalness=.1;
  mesh.material=[a,b];
}
function unmountStatue3D(){ if(!S3) return; cancelAnimationFrame(S3.raf); S3.wrap.remove(); S3.R.dispose(); S3=null; }
const M3DC={}; function m3dLoad(f,cb){ if(!M3DC[f]) M3DC[f]=new Promise((ok,no)=>new THREE.GLTFLoader().load(f,g=>{ g.scene.traverse(o=>{ if(o.isMesh&&o.material){ [].concat(o.material).forEach(m=>{ if(m.map) m.map.anisotropy=8; if(m.envMapIntensity!==undefined) m.envMapIntensity=Math.max(m.envMapIntensity,.9); }); } }); ok(g); },undefined,no)); M3DC[f].then(cb).catch(()=>{}); }
function exWoodMat(){ const c=document.createElement("canvas"); c.width=c.height=512; const g=c.getContext("2d"); g.fillStyle="#24140a"; g.fillRect(0,0,512,512);
  for(let i=0;i<150;i++){ const y=Math.random()*512; g.strokeStyle=`rgba(${70+Math.random()*45|0},${36+Math.random()*22|0},16,${.2+Math.random()*.35})`; g.lineWidth=.5+Math.random()*2.5; g.beginPath(); g.moveTo(0,y); for(let x=0;x<=512;x+=32) g.lineTo(x,y+Math.sin(x/90+i)*4+Math.random()*1.5); g.stroke(); }
  const t=new THREE.CanvasTexture(c); t.encoding=THREE.sRGBEncoding; t.anisotropy=4; return new THREE.MeshStandardMaterial({map:t,roughness:.78,metalness:0}); }
/* 먼지 쌓인 테이블 — 조각상 둘레만 동그랗게 깨끗하고, 들었다 놓은 손자국이 남아 있다 */
/* 먼지 쌓인 테이블 v2 — 조각상 둘레만 동그랗게 닦였고, 들었다 놓은 손가락 자국이 남아 있다
   · 고르게 내려앉은 아주 고운 먼지(픽셀 단위) + 저주파 노이즈로 쌓인 양이 들쭉날쭉
   · 굵은 먼지 덩어리 몇 개, 휘어진 섬유 보풀
   · 닦인 자리는 가장자리가 부드럽고, 밀려난 먼지가 테두리에 살짝 쌓임 · 손가락 자국은 번진 줄 */
function exDustPlane(pw=5,pd=1.6,opt={}){ const W=2048,H=Math.max(256,Math.round(W*pd/pw)),u=W/pw,c=document.createElement("canvas"); c.width=W; c.height=H; const g=c.getContext("2d"), cx=W/2, cy=H/2, R=.3*u;
  // 저주파 밀도 맵 (두 옥타브를 부드럽게 키워 겹침)
  const den=document.createElement("canvas"); den.width=W/8|0; den.height=H/8|0; const dg=den.getContext("2d");
  for(const [n,a] of [[10,.7],[34,.35]]){ const sm=document.createElement("canvas"); sm.width=n; sm.height=Math.max(2,Math.round(n*H/W)); const sg=sm.getContext("2d");
    for(let y=0;y<sm.height;y++) for(let x=0;x<n;x++){ const v=Math.random()*255|0; sg.fillStyle=`rgb(${v},${v},${v})`; sg.fillRect(x,y,1,1); }
    dg.globalAlpha=a; dg.imageSmoothingEnabled=true; dg.drawImage(sm,0,0,den.width,den.height); }
  const DD=dg.getImageData(0,0,den.width,den.height).data, dAt=(x,y)=>DD[((Math.min(den.height-1,y/8|0))*den.width+Math.min(den.width-1,x/8|0))*4]/255;
  // 1) 얇은 먼지 막: 밀도에 따라 옅게
  const haze=g.createImageData(W,H), hd=haze.data;
  for(let y=0;y<H;y++) for(let x=0;x<W;x++){ const i=(y*W+x)*4, d=dAt(x,y); hd[i]=178; hd[i+1]=170; hd[i+2]=156; hd[i+3]=(18+d*34)|0; }
  // 2) 고운 먼지 알갱이: 한 픽셀씩, 밀도가 높은 곳에 더 많이
  const n=Math.round(W*H*.22);
  for(let k=0;k<n;k++){ const x=Math.random()*W|0, y=Math.random()*H|0; if(Math.random()>.25+dAt(x,y)*.9) continue;
    const i=(y*W+x)*4, l=200+Math.random()*45|0; hd[i]=l; hd[i+1]=l-6; hd[i+2]=l-18; hd[i+3]=Math.min(255,hd[i+3]+40+Math.random()*90|0); }
  g.putImageData(haze,0,0);
  // 3) 굵은 먼지 덩어리 · 보풀 섬유
  for(let k=0;k<Math.round(W*H/9000);k++){ const x=Math.random()*W, y=Math.random()*H, r=.6+Math.random()*1.6; g.fillStyle=`rgba(${205+Math.random()*30|0},${198+Math.random()*30|0},${184+Math.random()*25|0},${.35+Math.random()*.4})`; g.beginPath(); g.arc(x,y,r,0,7); g.fill(); }
  g.lineCap="round";
  for(let k=0;k<Math.round(W*H/26000);k++){ const x=Math.random()*W, y=Math.random()*H, L=8+Math.random()*26, a=Math.random()*6.28, b=(Math.random()-.5)*2.4;
    g.strokeStyle=`rgba(${215+Math.random()*25|0},${210+Math.random()*25|0},${200+Math.random()*25|0},${.22+Math.random()*.3})`; g.lineWidth=.5+Math.random()*.7;
    g.beginPath(); g.moveTo(x,y); g.quadraticCurveTo(x+Math.cos(a+b)*L*.6,y+Math.sin(a+b)*L*.6,x+Math.cos(a)*L,y+Math.sin(a)*L); g.stroke(); }
  // 4) 밀려난 먼지가 닦인 자리 테두리에 살짝 쌓임
  g.save(); g.filter="blur(6px)"; g.strokeStyle="rgba(196,186,168,.28)"; g.lineWidth=R*.12; g.beginPath(); g.arc(cx,cy,R*1.2,0,7); g.stroke(); g.restore();
  // 5) 닦인 자리: 가장자리가 부드럽고, 천으로 둥글게 훔친 결이 남음
  g.globalCompositeOperation="destination-out";
  const q=g.createRadialGradient(cx,cy,R*.85,cx,cy,R*1.18); q.addColorStop(0,"rgba(0,0,0,1)"); q.addColorStop(1,"rgba(0,0,0,0)"); g.fillStyle=q; g.beginPath(); g.arc(cx,cy,R*1.2,0,7); g.fill();
  for(let k=0;k<22;k++){ const rr=R*(.95+Math.random()*.22), a0=Math.random()*6.28, len=.4+Math.random()*1.4;
    g.strokeStyle=`rgba(0,0,0,${.12+Math.random()*.25})`; g.lineWidth=1+Math.random()*3; g.beginPath(); g.arc(cx,cy,rr,a0,a0+len); g.stroke(); }
  // 6) 들었다 놓은 손가락 자국: 양쪽에 4줄씩, 끝으로 갈수록 옅어지고 살짝 번짐
  g.save(); g.filter="blur(1.6px)";
  for(const a of [-.2,Math.PI-.2]){ for(let f=0;f<4;f++){ const a2=a+f*.12+(Math.random()-.5)*.03, x0=cx+Math.cos(a2)*R*1.08, y0=cy+Math.sin(a2)*R*1.08, len=R*(.16+Math.random()*.14), w=R*(.045+Math.random()*.02);
    const gr=g.createLinearGradient(x0,y0,x0+Math.cos(a2)*len,y0+Math.sin(a2)*len); gr.addColorStop(0,"rgba(0,0,0,.75)"); gr.addColorStop(1,"rgba(0,0,0,0)");
    g.strokeStyle=gr; g.lineWidth=w; g.beginPath(); g.moveTo(x0,y0); g.lineTo(x0+Math.cos(a2)*len,y0+Math.sin(a2)*len); g.stroke(); } }
  g.restore();
  // 7) 테이블 윗면 모양(양끝이 둥근 타원형)대로 끝까지 덮고, 맨 가장자리만 아주 살짝 흐리게.
  //    가장자리 몰딩 쪽엔 먼지가 조금 더 끼어 있다
  if(opt.stadium){ g.globalCompositeOperation="source-over"; const r0=H/2, ins=H*.02;
    const stad=(x,i)=>{ x.beginPath(); x.moveTo(r0,i); x.lineTo(W-r0,i); x.arc(W-r0,H/2,r0-i,-Math.PI/2,Math.PI/2); x.lineTo(r0,H-i); x.arc(r0,H/2,r0-i,Math.PI/2,Math.PI*1.5); x.closePath(); };
    g.globalCompositeOperation="destination-in"; g.save(); g.filter="blur(3px)"; g.fillStyle="#000"; stad(g,ins); g.fill(); g.restore(); g.globalCompositeOperation="source-over"; }
  else if(!opt.raw){ const e=Math.min(W,H)*.08; [[0,0,W,e,0,0,0,e],[0,H-e,W,e,0,H,0,H-e],[0,0,e,H,0,0,e,0],[W-e,0,e,H,W,0,W-e,0]].forEach(([x,y,w,hh,x1,y1,x2,y2])=>{ const l=g.createLinearGradient(x1,y1,x2,y2); l.addColorStop(0,"rgba(0,0,0,1)"); l.addColorStop(1,"rgba(0,0,0,0)"); g.fillStyle=l; g.fillRect(x,y,w,hh); });
  g.globalCompositeOperation="source-over"; }
  const t=new THREE.CanvasTexture(c); t.encoding=THREE.sRGBEncoding; t.anisotropy=8;
  if(opt.raw){ t.encoding=THREE.LinearEncoding; return t; }
  const m=new THREE.Mesh(new THREE.PlaneGeometry(pw,pd),new THREE.MeshStandardMaterial({map:t,transparent:true,roughness:1,metalness:0,depthWrite:false})); m.rotation.x=-Math.PI/2; m.position.y=.002; return m; }
function mountStatue3D(s){ const CF=M3D[s.id];
  if(!window.THREE||!THREE.GLTFLoader) return;
  if(S3&&S3.s===s){ S3.sync(); return; } unmountStatue3D();
  const ph=$("iPhoto"), wrap=document.createElement("div"); wrap.className="v3d"; ph.appendChild(wrap); v3bg(wrap,s.id);
  const R=new THREE.WebGLRenderer({antialias:true,alpha:true}); R.outputEncoding=THREE.sRGBEncoding; R.physicallyCorrectLights=true; R.toneMapping=THREE.ACESFilmicToneMapping;
  R.setPixelRatio(Math.min(devicePixelRatio,1.5)); wrap.appendChild(R.domElement);
  const S=new THREE.Scene(), C=new THREE.PerspectiveCamera(32,16/9,.01,50);
  S.environment=exEnv(R); S.add(new THREE.HemisphereLight(0xffe7c4,0x16241a,.8));
  const key=new THREE.PointLight(0xffc98a,26,8,1.6); key.position.set(1.2,1.6,1.4); S.add(key);
  const rim=new THREE.PointLight(0x9ec4ae,6,8,1.6); rim.position.set(-1.4,1.2,-1.2); S.add(rim);
  const top=CF.lift&&new THREE.Mesh(new THREE.BoxGeometry(5,.06,1.6),exWoodMat()); if(top){ top.position.y=-.03; S.add(top); }
  const dust=new THREE.Mesh(new THREE.RingGeometry(.2,.62,48),new THREE.MeshStandardMaterial({color:0x120a05,roughness:.3,transparent:true,opacity:.35})); dust.rotation.x=-Math.PI/2; dust.position.y=.002; if(CF.lift){ const dp=exDustPlane(); S.add(dp);
    m3dLoad("table3d.json",g=>{ if(!S3||S3.s!==s) return; const m=g.scene.clone(), b=new THREE.Box3().setFromObject(m), sz=b.getSize(new THREE.Vector3()), c=b.getCenter(new THREE.Vector3()), k=2.4/Math.max(sz.x,sz.z);
      m.position.set(-c.x,-b.max.y,-c.z); const p=new THREE.Group(); p.add(m); p.scale.setScalar(k); p.position.y=-.004; p.rotation.y=Math.PI/2; S.add(p); if(top) top.visible=false; S.remove(dp);
      /* 먼지를 판으로 따로 깔지 않고 테이블 표면에 직접 입힌다: 위에서 내려다본 먼지 지도를 테이블에 투영하고,
         위를 향한 면에만 쌓이게 한다 → 울퉁불퉁한 테두리·홈·몰딩 모양 그대로 먼지가 따라간다 (옆면엔 안 쌓임) */
      const bb=new THREE.Box3().setFromObject(p), bw=bb.max.x-bb.min.x, bd=bb.max.z-bb.min.z, dt=exDustPlane(bw,bd,{raw:true});
      p.traverse(o=>{ if(!o.isMesh) return; const mats=[].concat(o.material).map(mt=>{ const m2=mt.clone();
          m2.onBeforeCompile=sh=>{ sh.uniforms.dustMap={value:dt}; sh.uniforms.dustBox={value:new THREE.Vector4(bb.min.x,bb.min.z,bw,bd)};
            sh.vertexShader=sh.vertexShader.replace("#include <common>","#include <common>\nvarying vec3 vDW; varying vec3 vDN;")
              .replace("#include <worldpos_vertex>","#include <worldpos_vertex>\nvDW=(modelMatrix*vec4(transformed,1.0)).xyz; vDN=normalize(mat3(modelMatrix)*objectNormal);");
            sh.fragmentShader=sh.fragmentShader.replace("#include <common>","#include <common>\nuniform sampler2D dustMap; uniform vec4 dustBox; varying vec3 vDW; varying vec3 vDN; float dAmt;")
              .replace("#include <map_fragment>","#include <map_fragment>\n{ vec2 du=(vDW.xz-dustBox.xy)/dustBox.zw; vec4 dd=texture2D(dustMap,vec2(du.x,1.0-du.y)); float up=smoothstep(0.45,0.92,normalize(vDN).y);"+
                " dAmt=clamp(dd.a*up*0.72,0.0,0.5); diffuseColor.rgb=mix(diffuseColor.rgb,pow(dd.rgb,vec3(2.2))*0.68,dAmt); }")
              .replace("#include <roughnessmap_fragment>","#include <roughnessmap_fragment>\nroughnessFactor=mix(roughnessFactor,1.0,dAmt);"); };
          m2.customProgramCacheKey=()=>"dusty"; return m2; });
        o.material=Array.isArray(o.material)?mats:mats[0]; }); }); }   // 받은 사이드 테이블 모델   // 받은 사이드 테이블 모델
  const vial=new THREE.Group(); const gl=new THREE.Mesh(new THREE.CylinderGeometry(.035,.04,.16,24),new THREE.MeshStandardMaterial({color:0xcfe3ea,roughness:.12,metalness:.1,transparent:true,opacity:.7,emissive:0x1a262a}));
  const pw=new THREE.Mesh(new THREE.CylinderGeometry(.033,.038,.035,24),new THREE.MeshStandardMaterial({color:0xffffff,roughness:1})); pw.position.y=-.06;
  const ck=new THREE.Mesh(new THREE.CylinderGeometry(.022,.022,.04,16),new THREE.MeshStandardMaterial({color:0x6b4a2a})); ck.position.y=.1; vial.add(gl,pw,ck); vial.position.set(.05,.08,.02); vial.visible=false; S.add(vial);
  if(CF.lift) m3dLoad("bottle.json",g=>{ if(!S3||S3.s!==s) return; const m=g.scene.clone(), b=new THREE.Box3().setFromObject(m), sz=b.getSize(new THREE.Vector3()), c=b.getCenter(new THREE.Vector3());
    m.position.set(-c.x,-b.min.y,-c.z); const p=new THREE.Group(); p.add(m); p.scale.setScalar(.2/sz.y); p.rotation.y=.5; vial.clear(); vial.add(p); vial.position.set(0,0,0); });   // 받침대 속에 숨겨진 초록 병
  /* 먼지 퍼프: 조각상이 테이블에서 떨어지는 순간·내려앉는 순간 받침 둘레에서 먼지가 피어오른다 */
  const PN=90, pg=new THREE.BufferGeometry(), pp=new Float32Array(PN*3), pv=new Float32Array(PN*3); pg.setAttribute("position",new THREE.BufferAttribute(pp,3));
  const pdc=document.createElement("canvas"); pdc.width=pdc.height=32; { const x=pdc.getContext("2d"), q=x.createRadialGradient(16,16,0,16,16,16); q.addColorStop(0,"rgba(230,220,200,1)"); q.addColorStop(1,"rgba(230,220,200,0)"); x.fillStyle=q; x.fillRect(0,0,32,32); }
  const puff=new THREE.Points(pg,new THREE.PointsMaterial({size:.022,map:new THREE.CanvasTexture(pdc),transparent:true,depthWrite:false,opacity:0,color:0xd8cdb8})); puff.visible=false; S.add(puff);
  const burst=(n,str)=>{ for(let i=0;i<PN;i++){ const a=Math.random()*6.28, r=.1+Math.random()*.1; pp[i*3]=Math.cos(a)*r; pp[i*3+1]=.006+Math.random()*.01; pp[i*3+2]=Math.sin(a)*r;
      const v=(.08+Math.random()*.22)*str; pv[i*3]=Math.cos(a)*v; pv[i*3+1]=(.03+Math.random()*.12)*str; pv[i*3+2]=Math.sin(a)*v; }
    pg.attributes.position.needsUpdate=true; puff.visible=true; puff.userData.age=0; puff.userData.str=str; };
  const hint=document.createElement("div"); hint.className="v3hint"; if(CF.lift) hint.innerHTML=`<small>${s.text}</small><b>좌우로 끌어 돌려 보고, 위로 끌어 들어 올려 보자.</b>`; else hint.textContent=CF.hint||"끌어서 돌려 보기"; wrap.appendChild(hint);
  const bar=document.createElement("div"); bar.className="v3bar"; bar.innerHTML="<i></i>"; if(CF.lift) wrap.appendChild(bar);
  S3={s,R,S,C,wrap,raf:0,zoom:1,model:null,yaw:.6,ry:.6,vy:0,lift:0,lv:0,liftT:0,drag:null,done:opened.has(s.id),pt:0,lm:0,landed:true};
  S3.sync=()=>{ S3.done=!CF.lift||opened.has(s.id); if(S3.done&&CF.lift){ S3.liftT=1; hint.textContent=""; bar.style.display="none"; } };
  S3.sync();
  m3dLoad(CF.file,g=>{ if(!S3||S3.s!==s) return; const m=g.scene.clone();
    m.traverse(o=>{ if(!o.isMesh) return; if(CF.cloth) splitBiggest(o,0x6a2330,0xe6d8bc); else if(CF.tint){ o.material=o.material.clone(); CF.tint(o,o.material); } }); const b=new THREE.Box3().setFromObject(m), sz=b.getSize(new THREE.Vector3()), c=b.getCenter(new THREE.Vector3());
    const k=.9/Math.max(sz.x,sz.y,sz.z); const pivot=new THREE.Group(); m.position.sub(c); pivot.add(m); pivot.scale.setScalar(k);
    const b2=new THREE.Box3().setFromObject(pivot); pivot.position.y=-b2.min.y; S3.model=pivot; S.add(pivot); ph.classList.remove("veiled");
    { const sc=document.createElement("canvas"); sc.width=sc.height=128; const sg=sc.getContext("2d"), q=sg.createRadialGradient(64,64,0,64,64,64);
      q.addColorStop(0,"rgba(0,0,0,.85)"); q.addColorStop(.45,"rgba(0,0,0,.45)"); q.addColorStop(1,"rgba(0,0,0,0)"); sg.fillStyle=q; sg.fillRect(0,0,128,128);
      const fp=Math.max(sz.x,sz.z)*k, sh=new THREE.Mesh(new THREE.PlaneGeometry(1,1),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(sc),transparent:true,depthWrite:false,opacity:.6}));
      sh.rotation.x=-Math.PI/2; sh.position.y=.004; sh.scale.setScalar(fp*1.25); sh.userData.s0=fp*1.25; sh.renderOrder=1; S.add(sh); S3.shadow=sh; } });

  const el=R.domElement;
  el.onpointerdown=e=>{ S3.drag={x:e.clientX,y:e.clientY,yaw:S3.yaw,lift:S3.liftT}; S3.vy=0; S3.lm=performance.now(); wrap.classList.add("grab"); try{el.setPointerCapture(e.pointerId)}catch(_){} };
  el.onpointermove=e=>{ if(!S3.drag) return; const r=el.getBoundingClientRect(), now=performance.now(), dt=Math.max(8,now-S3.lm), py=S3.yaw; S3.yaw=S3.drag.yaw+(e.clientX-S3.drag.x)/r.width*5; S3.vy=S3.vy*.5+(S3.yaw-py)/dt*1000*.5; S3.lm=now; if(!CF.lift) S3.tilt=Math.max(-.6,Math.min(.9,(S3.drag.tilt??(S3.drag.tilt=S3.tilt||0))+(e.clientY-S3.drag.y)/r.height*2));
    if(CF.lift&&!S3.done){ S3.liftT=Math.max(0,Math.min(1,S3.drag.lift-(e.clientY-S3.drag.y)/r.height*2.2)); bar.firstChild.style.width=(S3.liftT*100)+"%";
      if(S3.liftT>=1){ S3.done=true; S3.drag=null; hit(900,.25,.3); paper(); opened.add(s.id); refreshMarkers(); setTimeout(()=>{ if(activeSpot===s){ renderInspect(s); renderSide(); think(s.th); } },500); } } };
  el.onpointerup=()=>{ if(!S3) return; if(performance.now()-S3.lm>80) S3.vy=0; S3.drag=null; wrap.classList.remove("grab"); };
  el.onwheel=e=>{ e.preventDefault(); S3.zoom=Math.max(.3,Math.min(1.5,S3.zoom*(e.deltaY>0?1.08:.92))); };
  S3.step=d=>{ if(S3.done||!CF.lift) return; S3.liftT=Math.min(1,S3.liftT+d); bar.firstChild.style.width=(S3.liftT*100)+"%"; if(S3.liftT>=1){ S3.done=true; hit(900,.25,.3); paper(); opened.add(s.id); refreshMarkers(); setTimeout(()=>{ renderInspect(s); renderSide(); think(s.th); },500);} };
  const loop=t=>{ if(!S3) return; const w=wrap.clientWidth,h=wrap.clientHeight; if(w&&h&&(R.domElement.width!==Math.round(w*R.getPixelRatio()))){ R.setSize(w,h,false); C.aspect=w/h; C.updateProjectionMatrix(); }
    const dt0=Math.min(.05,(t-(S3.pt||t))/1000); S3.pt=t;
    if(!S3.drag&&!S3.done&&!S3.hand) S3.liftT=0;                                   // 손을 놓으면 무게 때문에 떨어진다
    /* 들어 올리기: 무게 있는 용수철. 올릴 땐 묵직하게 늦게 따라오고, 놓으면 중력처럼 가속해 떨어져 '쿵' 하고 살짝 튄다 */
    { const up=S3.liftT>S3.lift, k=up?55:0, c=up?11:0, g=S3.liftT<S3.lift-.001?-9:0;
      S3.lv+=((S3.liftT-S3.lift)*k-S3.lv*c+g)*dt0; S3.lift+=S3.lv*dt0;
      if(S3.lift<0){ if(S3.lv<-.6&&!S3.landed){ try{ hit(110,.14,.16); }catch(e){} S3.landed=true; } S3.lift=0; S3.lv=Math.abs(S3.lv)>.6?-S3.lv*.18:0; }   // 바닥에 닿으면 쿵 + 작게 튐
      if(S3.lift>.03) S3.landed=false;
      if(S3.liftT>=S3.lift&&!up) { S3.lift+=(S3.liftT-S3.lift)*.2; S3.lv*=.6; } }
    if(!S3.drag&&Math.abs(S3.vy)>.01){ S3.yaw+=S3.vy*dt0; S3.vy*=Math.pow(.08,dt0); }   // 던진 회전이 서서히 멈춤
    const pry=S3.ry; S3.ry+=(S3.yaw-S3.ry)*(1-Math.pow(.001,dt0)); const spin=dt0?(S3.ry-pry)/dt0:0;
    /* 손으로 드는 느낌: 처음엔 받침이 테이블에 붙어 버티며 파르르 떨리다가(무게), 떨어지는 순간 먼지가 피고,
       들려 올라가면서 손잡은 쪽으로 살짝 기울고, 공중에선 진자처럼 천천히 흔들린다 */
    const H=S3.lift<.05?S3.lift*.3:S3.lift-.035;                                     // 처음 5%는 거의 안 뜸 (무게)
    if(CF.lift){ if(S3.lift>.05&&!S3.off){ S3.off=true; burst(PN,1); try{ hit(260,.06,.09); hit(1800,.02,.05,"highpass"); }catch(e){} }
      if(S3.lift<.02&&S3.off){ S3.off=false; burst(PN,.7); } }
    const strain=CF.lift&&S3.drag&&S3.liftT>.01&&S3.lift<.06?(Math.random()-.5)*.014:0;   // 들어 올리려 힘줄 때 파르르
    if(S3.model){ S3.model.rotation.y=S3.ry; S3.model.position.y=(S3.model.userData.y0??(S3.model.userData.y0=S3.model.position.y))+Math.max(0,H)*.45;
      const sw=Math.min(1,S3.lift*3);
      S3.model.rotation.x=(S3.tilt||0)-.11*sw+Math.sin(t/640+1)*.018*sw;                // 손잡은 쪽(앞)으로 살짝 기울고 앞뒤로 흔들림
      S3.model.rotation.z=Math.sin(t/520)*.03*sw+Math.max(-.1,Math.min(.1,S3.lv*.05))*sw-Math.max(-.06,Math.min(.06,spin*.02))*sw+strain; }
    if(S3.shadow){ const hh=Math.max(0,H); S3.shadow.material.opacity=.6*(1-Math.min(1,hh*1.4)); S3.shadow.scale.setScalar(S3.shadow.userData.s0*(1+hh*.9)); }   // 들수록 그림자가 옅고 넓게
    if(puff.visible){ const A=puff.userData.age+=dt0; for(let i=0;i<PN;i++){ pp[i*3]+=pv[i*3]*dt0; pp[i*3+1]+=pv[i*3+1]*dt0; pp[i*3+2]+=pv[i*3+2]*dt0; pv[i*3]*=.95; pv[i*3+2]*=.95; pv[i*3+1]=pv[i*3+1]*.95-.004; if(pp[i*3+1]<.004) pp[i*3+1]=.004; }
      pg.attributes.position.needsUpdate=true; puff.material.opacity=.55*puff.userData.str*Math.max(0,1-A/1.8)*Math.min(1,A*8); if(A>1.8) puff.visible=false; }
    vial.visible=CF.lift&&S3.lift>.15; bar.style.opacity=(S3.done||!CF.lift)?0:1;
    const cp=CF.cam, kz=$("insp").classList.contains("exam")?1.45:1;
    /* 들어 올릴수록 카메라가 받침 밑 병 쪽으로 내려가며 다가간다 (조각상은 위로 빠지고 병이 화면 가운데) */
    const rq=CF.lift?Math.max(0,Math.min(1,(S3.lift-.25)/.75)):0, rv=rq*rq*(3-2*rq);
    C.position.set(cp[0],(cp[1]+S3.lift*.15)*(1-rv)+.3*rv,cp[2]*S3.zoom*kz*(1-rv*.62)); C.lookAt(0,(CF.look+S3.lift*.12)*(1-rv)+.1*rv,0); wrap.__rd&&wrap.__rd(); R.render(S,C); S3.raf=requestAnimationFrame(loop); };
  S3.raf=requestAnimationFrame(loop); roomBack(wrap,s.id,()=>S3&&S3.C);
}
function renderInspect(s){
  { const ph=$("iPhoto"); ph.style.transform=""; ph.classList.remove("tilting"); ph.onpointerdown=ph.onpointermove=ph.onpointerup=null; ph.querySelector(".powder")?.remove(); }
  MINIF=null;
  $("iLoc").textContent=s.loc; $("iTitle").textContent=s.title;
  crop($("iPhoto"),s,3.2,.5625);
  $("iPhoto").classList.toggle("veiled", s.tier===3 && !opened.has(s.id));
  const B=$("iBody"); B.innerHTML=""; B.classList.remove("rise");
  { const I=$("insp"), was=I.classList.contains("exam"), ex=!!(window.THREE&&((EXAM[s.id]&&!found.has(s.id))||(M3D[s.id]&&M3D[s.id].lift&&!opened.has(s.id))));
    I.classList.toggle("exam",ex); if(ex&&!was){ try{ hit(220,.07,.12); setTimeout(()=>hit(3100,.03,.04,"bandpass"),90); [140,230,330].forEach(t=>setTimeout(()=>hit(2600+Math.random()*1800,.02,.03,"bandpass"),t+120)); }catch(e){} }   /* 집어 드는 소리: 협탁 스치는 둔한 소리 + 유리 딸깍 + 알약 달그락 */
    if(was&&!ex){ I.classList.add("unexam"); setTimeout(()=>I.classList.remove("unexam"),1000); } }
  const add=(tag,cls,html)=>{const e=document.createElement(tag); if(cls)e.className=cls; e.innerHTML=html; B.appendChild(e); return e;};
  $("iNew").hidden=true;
  if(M3D[s.id]&&!EXAM[s.id]) mountStatue3D(s); else unmountStatue3D();
  if(EXAM[s.id]&&window.THREE){ mountExam(s);   // 돌려서 단서를 찾기 전에는 설명만, 찾은 뒤에 증거 내용이 열린다
    if(!found.has(s.id)){ add("p","txt",EXAM[s.id].pre); add("p","txt after",EXAM[s.id].hint); return; } }
  if(s.text) add("p","txt",s.text);
  if(s.action && !opened.has(s.id) && s.id==='statue' && window.THREE){ add("p","txt after","사진 속 조각상을 위로 끌어 올려 보자. (F 키로도 가능)"); return; }
  if(s.action && !opened.has(s.id)){
    const b=add("button","primary torn-btn",`${s.action} <kbd>F</kbd>`); tornClip(b,1.5,7,14);
    b.onclick=()=>{ opened.add(s.id); paper(); refreshMarkers(); renderInspect(s); renderSide(); };
    return;
  }
  if(s.after) add("p","txt after",s.after);
  if(s.safe && !found.has(s.id)){
    add("div","dial",`<input id="safeCode" inputmode="numeric" maxlength="4" autocomplete="off" placeholder="····" aria-label="금고 다이얼 네 자리"><button class="primary torn-btn" id="safeTry">열기</button>`);
    tornClip($("safeTry"),1.5,7,10);
    const m=add("div","msg","");
    const tryIt=()=>{ if($("safeCode").value.trim()===s.safe){ hit(900,.25,.3); collect(s); renderInspect(s); renderSide(); }
      else { m.textContent="다이얼이 움직이지 않는다. 방 안 어딘가에 네 자리 숫자가 있다."; hit(200,.2,.12); } };
    $("safeTry").onclick=tryIt; $("safeCode").onkeydown=e=>{ e.stopPropagation(); if(e.key==="Enter") tryIt(); };
    setTimeout(()=>$("safeCode").focus({preventScroll:true}),80);
    return;
  }
  if(s.mini && !found.has(s.id) && !miniDone.has(s.id)){ renderMini(s,B,add); return; }
  if(s.mini==="rec"){ renderMini(s,B,add,true); }
  else if(s.note) add("div","note",s.note);
  if(s.ev && !found.has(s.id)) collect(s);
  if(!s.ev && !opened.has(s.id)){ opened.add(s.id); freshId=s.id; refreshMarkers(); }
  const now=freshId===s.id;
  if(s.th) add("p","hand",`“${s.th}”`);
  add("div","stamp2"+(s.herring||!s.ev?" gray":"")+(now?" hit":""),`<span>${!s.ev?"관찰 기록":s.herring?"사건과 무관":"증거 확보"}<small>ORPHEUS R.R.</small></span>`);
  $("iNew").hidden=!(now && s.ev);
}
function collect(s){ found.add(s.id); freshId=s.id; lastFound=s.id; paper(); notify(s.ev); render(); if(found.size>=3) warmTalk(); invDone(s); }
/* 단서 5개를 모두 모으면 잠시 뒤 자동으로 엘레나 심문으로 넘어간다 */
let invAuto=false;
function invDone(s){ if(invAuto||!EVID.every(e=>found.has(e.id))) return; invAuto=true;
  const wait=(s&&s.id==="doll")?5200:1700;   // 인형 녹음은 거의 끝까지 재생, 그 외엔 짧게. F·Enter·스페이스로 바로 넘어갈 수 있다
  let fired=false, T1, T2;
  const run=()=>{ if(fired) return; fired=true; clearTimeout(T1); clearTimeout(T2); removeEventListener("keydown",kd,true);
    try{ if(mode==="inspect") closeInspect(); else if(mode==="closeup") closeCloseup(); }catch(e){} try{ closeBook(); }catch(e){}
    const go=()=>{ if(mode==="explore") openTalk(); else if(mode!=="talk"&&mode!=="end"&&mode!=="board") setTimeout(go,300); }; setTimeout(go,250); };
  const kd=e=>{ const k=(e.key||"").toLowerCase(); if(k==="enter"||k==="f"||k===" "){ e.stopImmediatePropagation(); e.preventDefault(); run(); } };
  T1=setTimeout(()=>{ notify("조사 끝 — 엘레나를 심문한다 (F 바로 가기)"); addEventListener("keydown",kd,true); },Math.max(300,wait-1300));
  T2=setTimeout(run,wait); }
function closeInspect(){
  unmountStatue3D();
  $("insp").classList.remove("open"); activeSpot=null; freshId=null;
  mode="explore"; stage.classList.add("explore"); stage.classList.remove("inspect");
  ease=.1; tgt.s=1.4;
  if(ptr.in && !touchMode){ tgt.fx=15+ptr.x*70; tgt.fy=20+ptr.y*60; }
  setPrompt(); checkDone();
}
$("iClose").onclick=closeInspect;
const HID=SPOTS.filter(s=>s.tier===3);
function renderSide(){
  const R=$("hidList"); R.innerHTML=`<div class="b-rlabel">숨겨진 단서</div>`;
  HID.forEach(s=>{
    const got=found.has(s.id), op=opened.has(s.id);
    const c=document.createElement("button"); c.className="hcard"+(got?" got":op?" half":"");
    c.innerHTML=`<span class="hstrip">${got||op?s.title:"???"}</span><span class="hph"></span>${got||op?"":LOCK}<span class="hsub">${got?"확보함":op?"아직 풀지 못했다":"수상한 곳을 더 살펴보자"}</span>`;
    if(got||op){ crop(c.querySelector(".hph"),s,3,.55); c.onclick=()=>inspect(s); c.setAttribute("aria-label",s.title+" 다시 보기"); }
    else { c.disabled=true; c.setAttribute("aria-label","아직 찾지 못한 숨겨진 단서"); }
    tornClip(c,1.4,2.2,22);
    R.appendChild(c);
  });
  $("bdgN").textContent=found.size; $("bdgH").textContent=HID.filter(s=>found.has(s.id)).length+"/"+HID.length;
}

/* ---------- 수사 수첩 (저널) ---------- */
let jIdx=0;
const JOUR=[...EVID,{id:"_chain",title:"용의자 · 사건 정리"}];
const coreDone=()=>BROKEN.size===3;
function render(){
  const n=`${found.size} / ${EVID.length}`;
  $("bCount").textContent=n; $("bookN").textContent=`${found.size}/${EVID.length}`;
  $("meter").style.width=(found.size/EVID.length*100)+"%"; $("statN").textContent=found.size+"/"+EVID.length;
  const L=$("list"); L.innerHTML="";
  JOUR.forEach((s,i)=>{
    const chain=s.id==="_chain", got=chain?coreDone():found.has(s.id);
    const b=document.createElement("button"); b.className="jtab"+(i===jIdx?" on":"")+(got?" got":"")+(chain?" chain":"");
    b.innerHTML=`<span>${chain?"용의자":got?SHORT[s.id]:"???"}</span><i class="ring"></i>`; b.title=chain?"용의자 · 사건 정리":got?SHORT[s.id]:"미발견";
    if(i===jIdx) b.setAttribute("aria-current","page");
    b.onclick=()=>turnTo(i);
    L.appendChild(b);
  });
  renderPage(); renderSide(); refreshMarkers();
}
let flipping=false;
function rustle(){ SFX("rustle",.4); setTimeout(()=>RSFX("flip",.28,90),520); }   // 실제 종이 소리
function faceOf(pg,cls){ const c=pg.cloneNode(true); c.removeAttribute("id"); c.querySelectorAll("[id]").forEach(n=>n.removeAttribute("id")); if(cls) c.classList.add(...cls.split(" ")); return c; }
function boxOf(el,pg){ Object.assign(el.style,{left:pg.offsetLeft+"px",top:pg.offsetTop+"px",width:pg.offsetWidth+"px",height:pg.offsetHeight+"px"}); }
/* 종이처럼 모서리부터 말려 넘어가는 장 (접힌 선을 기준으로 앞면은 잘라 내고, 뒷면은 그 선에 비쳐 보이게 그린다).
   오른쪽/왼쪽 페이지 바깥 가장자리를 잡고 끌어서 넘길 수도 있다. */
function rustleSweep(dur=.75){ if(!soundOn) return; SFX("rustle",.38); setTimeout(()=>RSFX("flip",.3,90),dur*1000*.9); return;   // 실제 종이 넘기는 소리 (아래는 예전 합성음, 쓰지 않음)
  const t=ac.currentTime;
  const s=ac.createBufferSource(), f=ac.createBiquadFilter(), g=ac.createGain(); s.buffer=noiseBuf(); s.loop=true;
  f.type="bandpass"; f.Q.value=.9; f.frequency.setValueAtTime(900,t); f.frequency.exponentialRampToValueAtTime(4200,t+dur*.55); f.frequency.exponentialRampToValueAtTime(1600,t+dur);
  g.gain.setValueAtTime(.0001,t); g.gain.exponentialRampToValueAtTime(.16,t+dur*.3); g.gain.exponentialRampToValueAtTime(.05,t+dur*.75); g.gain.exponentialRampToValueAtTime(.0001,t+dur);
  s.connect(f); f.connect(g); g.connect(sfxBus||ac.destination); s.start(t); s.stop(t+dur+.05);
  for(let i=0;i<5;i++) setTimeout(()=>hit(2500+Math.random()*2500,.04+Math.random()*.04,.03,"bandpass"),dur*1000*(.15+Math.random()*.6));
  setTimeout(()=>hit(500,.14,.1),dur*1000*.95); }
function clipHalf(poly,M,d,keepPos){ const out=[], side=p=>((p[0]-M[0])*d[0]+(p[1]-M[1])*d[1])*(keepPos?1:-1);
  for(let i=0;i<poly.length;i++){ const A=poly[i], B=poly[(i+1)%poly.length], sa=side(A), sb=side(B);
    if(sa>=0) out.push(A); if((sa>=0)!==(sb>=0)){ const t=sa/(sa-sb); out.push([A[0]+(B[0]-A[0])*t,A[1]+(B[1]-A[1])*t]); } }
  return out; }
const polyCss=P=>P.length<3?"polygon(0 0,0 0,0 0)":`polygon(${P.map(p=>p[0].toFixed(1)+"px "+p[1].toFixed(1)+"px").join(",")})`;
function turnTo(i,dir,grab){
  const ni=(i+JOUR.length)%JOUR.length; if(ni===jIdx||flipping) return;
  dir=dir||(ni>jIdx?1:-1);
  const bk=$("jBook"), L=$("jLeft"), R=$("jRight");
  const simple = reduce || innerWidth<=760 || !$("book").classList.contains("open");
  if(simple){ jIdx=ni; render(); bk.classList.remove("flip"); void bk.offsetWidth; bk.classList.add("flip"); paper(); return; }
  flipping=true; const prev=jIdx;
  const oldL=faceOf(L,""), oldR=faceOf(R,""); jIdx=ni; render(); const newL=faceOf(L,""), newR=faceOf(R,"");
  const fwd=dir>0, src=fwd?R:L, W=src.offsetWidth, H=src.offsetHeight, D=Math.hypot(W,H);
  const box=document.createElement("div"); box.className="curl"+(fwd?"":" mir"); boxOf(box,src);
  const under=fwd?oldL:oldR; under.classList.add("under2"); boxOf(under,fwd?L:R);
  const mkWrap=(pg,mirror,cls)=>{ const w=document.createElement("div"); w.className="cw "+cls; const c=pg.cloneNode(true); c.classList.add("cclone"); if(mirror) c.classList.add("flipx"); Object.assign(c.style,{width:W+"px",height:H+"px"}); w.appendChild(c); const s=document.createElement("i"); s.className="csh"; w.appendChild(s); box.appendChild(w); return [w,s]; };
  const [revW,revS]=(()=>{ const w=document.createElement("div"); w.className="cw rev"; const s=document.createElement("i"); s.className="csh"; w.appendChild(s); box.appendChild(w); return [w,s]; })();
  const [frW,frS]=mkWrap(fwd?oldR:oldL,!fwd,"fr"), [bkW,bkS]=mkWrap(fwd?newL:newR,fwd,"bk");
  box.insertBefore(revW,frW); bk.append(under,box);
  const rect=[[0,0],[W,0],[W,H],[0,H]], C=[W,H];
  const place=(el,M,phi,x0,wid)=>{ Object.assign(el.style,{width:wid+"px",height:(D*4)+"px",transform:`translate(${M[0]}px,${M[1]}px) rotate(${phi}rad) translate(${x0}px,${-D*2}px)`}); };
  const pose=P=>{ // 모서리 C를 P까지 끌어온 상태
    let dx=C[0]-P[0], dy=C[1]-P[1], len=Math.hypot(dx,dy);
    if(len<.5){ frW.style.clipPath=polyCss(rect); bkW.style.clipPath=revW.style.clipPath=polyCss([]); return; }
    const d=[dx/len,dy/len], M=[(C[0]+P[0])/2,(C[1]+P[1])/2], md=M[0]*d[0]+M[1]*d[1], phi=Math.atan2(d[1],d[0]);
    const front=clipHalf(rect,M,d,false), cut=clipHalf(rect,M,d,true);
    frW.style.clipPath=polyCss(front); revW.style.clipPath=polyCss(cut); bkW.style.clipPath=polyCss(cut);
    bkW.style.transform=`matrix(${1-2*d[0]*d[0]},${-2*d[0]*d[1]},${-2*d[0]*d[1]},${1-2*d[1]*d[1]},${2*md*d[0]},${2*md*d[1]})`;
    const S=Math.min(W*.5,len*.6+20), k=Math.min(1,len/(W*.4)), k2=Math.min(1,(2*W-len)/(W*.6));
    place(frS,M,phi,-S,S); frS.style.opacity=(.9*Math.min(k,k2)).toFixed(3);
    place(bkS,M,phi,0,S*1.4); bkS.style.opacity=(Math.min(k,k2)).toFixed(3);
    place(revS,M,phi,0,S*.9); revS.style.opacity=(Math.min(k,k2)).toFixed(3); };
  const clampP=P=>{ let [x,y]=P; const b=[0,H], vb=Math.hypot(x-b[0],y-b[1]); if(vb>W){ x=b[0]+(x-b[0])*W/vb; y=b[1]+(y-b[1])*W/vb; }
    const t=[0,0], vt=Math.hypot(x,y); if(vt>D){ x=x*D/vt; y=y*D/vt; } return [x,y]; };
  let cur=[W,H]; pose(cur);
  const finish=ok=>{ box.remove(); under.remove(); flipping=false; if(!ok){ jIdx=prev; render(); } };
  const ease=x=>x<.5?4*x*x*x:1-Math.pow(-2*x+2,3)/2;
  const animTo=(to,ms,done,lift)=>{ const from=cur.slice(); let t0=null; const fr=t=>{ if(t0===null) t0=t; const x=Math.min(1,(t-t0)/ms), e=ease(x);
      cur=clampP([from[0]+(to[0]-from[0])*e, from[1]+(to[1]-from[1])*e - Math.sin(Math.PI*e)*H*lift]); pose(cur); if(x<1) requestAnimationFrame(fr); else done(); }; requestAnimationFrame(fr); };
  if(!grab){ rustleSweep(.95); animTo([-W,H],950,()=>finish(true),.22); return; }
  // 끌어서 넘기기
  const r0=src.getBoundingClientRect(), loc=e=>{ let x=e.clientX-r0.left, y=e.clientY-r0.top; if(!fwd) x=W-x; return [x,Math.max(0,Math.min(H*1.05,y))]; };
  const g0=loc(grab), off=[W-g0[0],0];
  const mv=e=>{ const q=loc(e); cur=clampP([q[0]+off[0],Math.max(H*.55,q[1])]); pose(cur); };
  const up=()=>{ removeEventListener("pointermove",mv); removeEventListener("pointerup",up); const ok=cur[0]<W*.55;
    if(ok){ rustleSweep(.6); animTo([-W,H],Math.max(260,650*(cur[0]+W)/(2*W)),()=>finish(true),.06); } else animTo([W,H],300,()=>finish(false),0); };
  addEventListener("pointermove",mv); addEventListener("pointerup",up); hit(2600,.06,.12,"bandpass"); }
['jRight','jLeft'].forEach((id,j)=>{ const pg=$(id); pg.addEventListener("pointerdown",e=>{ if(e.button||flipping||e.target.closest("button,a,input")) return; const r=pg.getBoundingClientRect(), x=(e.clientX-r.left)/r.width;
  if(j===0&&x>.7){ e.preventDefault(); turnTo(jIdx+1,1,e); } else if(j===1&&x<.3){ e.preventDefault(); turnTo(jIdx-1,-1,e); } }); });
$("jPrev").onclick=$("cPrev").onclick=()=>turnTo(jIdx-1,-1); $("jNext").onclick=$("cNext").onclick=()=>turnTo(jIdx+1,1);
/* 글씨가 칸 밖으로 넘치면 넘치지 않을 때까지 글씨를 조금씩 줄인다 */
function fitBox(el,test,min=8){ if(!el) return; el.style.fontSize=""; let fs=parseFloat(getComputedStyle(el).fontSize), n=0; while(test()&&fs>min&&n++<60){ fs-=.5; el.style.fontSize=fs+"px"; } }
function fitPages(){ ["jLeft","jRight"].forEach(id=>{ const el=$(id); fitBox(el,()=>el.scrollHeight>el.clientHeight+1); }); }
function renderPage(){ requestAnimationFrame(fitPages);
  const s=JOUR[jIdx], Lp=$("jLeft"), Rp=$("jRight"), no=String(jIdx+1).padStart(2,"0");
  $("jPage").textContent = s.id==="_chain" ? "용의자 · 사건 정리" : `${jIdx+1} / ${EVID.length}`;
  Lp.scrollTop=Rp.scrollTop=0;
  if(s.id==="_chain"){
    const b=BROKEN.size;
    const line=(id,t,txt)=>`<li class="${found.has(id)?"":"no"}"><b>${found.has(id)?t:"??:??"}</b><span>${found.has(id)?txt:"아직 모른다"}</span></li>`;
    Lp.innerHTML=`<p class="hand big">그날 밤의 순서</p><ol class="tl"><li><b>20:00</b><span>오르페우스 오픈식</span></li>${line("card","21:00","엘레나, 대표 전용 와인 서빙")}${line("doll","21:25","에블린, 의자 밑에 AI 인형을 두고 감")}${line("doll","21:41","“대표님, 한 잔 더 드세요.”")}${line("doll","21:47","로크 사망, 시계가 멈춤")}${line("statue","22:30","엘레나, 시신 ‘발견’ 신고")}</ol>`;
    const SUSN={margaret:["마가렛 첼시","72세 · 창업주의 미망인"],evelyn:["에블린 블룸","31세 · AI 인격 설계자"],magician:["???","전직 정비공 · 마술사"],elena:["엘레나 보로딘","27세 · 전담 승무원"]}, extra={margaret:["sofa"]};
    const sus=Object.entries(SUSN).map(([k,[n,r]])=>{
      let pts=SPOTS.filter(x=>(x.sus===k||(extra[k]||[]).includes(x.id))&&found.has(x.id)).map(x=>SCRIBBLE[x.id]);
      if(k==="elena") pts=[...(found.has("card")?["9시 와인 담당"]:[]),...(found.has("bedside")?["약병 필체 E.B."]:[])];
      return `<div class="p"><b>${n}</b><small>${r}</small>${pts.length?pts.map(t=>`<span>${t}</span>`).join(""):`<span class="none">아직 없음</span>`}</div>`;}).join("");
    Rp.innerHTML=`<div class="eyebrow">ORPHEUS R.R. · 용의자</div><h4>${confessed?"사건 정리":"용의자 메모"}</h4>${confessed?`<div class="brk"><p class="txt">엘레나 보로딘이 21시 41분, 로크의 와인에 독을 탔다. 5년 동안 약점을 잡혀 괴롭힘당한 끝이었다.</p></div><div class="stamp2"><span>범인 지목<small>ORPHEUS R.R.</small></span></div>`:`<div class="j-sus">${sus}</div><p class="hand ${b<3?"faint":""}">${b<3?"":"“이제 지목할 때다.”"}</p>`}`;
    return;
  }
  if(!found.has(s.id)){
    Lp.innerHTML=`<div class="polaroid empty"><div class="ph">?</div><div class="cap hand">미확인</div></div>`;
    Rp.innerHTML=`<div class="eyebrow">EVIDENCE ${no} · ${TIER[s.tier]}</div><h4>???</h4><div class="brk"><p class="txt">아직 발견하지 못한 증거다.</p><p class="txt faint">${["","방 안을 둘러보면 눈에 띌 것이다.","가까이 다가가 살펴봐야 보인다.","수상한 곳을 직접 건드려 봐야 한다."][s.tier]}</p></div>`;
    return;
  }
  Lp.innerHTML=`<div class="polaroid"><i class="tape a"></i><i class="tape b"></i><div class="ph" id="jPh"></div><div class="cap hand">${s.loc}</div></div><div class="doodle hand">${SCRIBBLE[s.id]||""}</div>`;
  crop($("jPh"),s,3.4,.88);
  Rp.innerHTML=`<div class="eyebrow">EVIDENCE ${no} · ${TIER[s.tier]}</div><h4>${s.title}</h4><div class="brk">${s.text?`<p class="txt">${s.text}</p>`:""}${s.after?`<p class="txt">${s.after}</p>`:""}${s.note?`<div class="slip">${s.note}</div>`:""}</div>${s.th?`<p class="hand">“${s.th}”</p>`:""}<div class="stamp2${s.herring?" gray":""}"><span>${s.herring?"사건과 무관":"증거 확보"}<small>ORPHEUS R.R.</small></span></div>`;
}
function checkDone(){}
function setTab(b){ $("tabScene").setAttribute("aria-selected",!b); $("tabBook").setAttribute("aria-selected",b); $("tabTalk").setAttribute("aria-selected",false); }
function openBook(){ if(mode==="inspect") closeInspect(); try{ if(mode==="board") closeBoard(); }catch(e){}   /* 용의자 화면이 열려 있으면 닫고 수첩을 연다 */ if(lastFound){ jIdx=EVID.findIndex(e=>e.id===lastFound); lastFound=null; } render(); $("book").classList.add("open"); setTab(true); setTimeout(()=>$("bClose").focus({preventScroll:true}),50); }
function closeBook(){ $("book").classList.remove("open"); setTab(false); }
const toggleBook=()=> $("book").classList.contains("open")?closeBook():openBook();
$("bookBtn").onclick=toggleBook; $("tabBook").onclick=openBook; $("tabScene").onclick=()=>{ closeBook(); try{ if(mode==="board") closeBoard(); }catch(e){} };   /* 현장 탭: 수첩·용의자 화면을 모두 닫고 방으로 */
$("kE").onclick=()=>{ if(mode==="explore"&&nearId) inspect(SPOTS.find(s=>s.id===nearId)); };
$("kEsc").onclick=()=>{ if(mode==="talk") closeTalk(); else if(mode==="inspect") closeInspect(); else closeBook(); };
$("bClose").onclick=closeBook;

/* ---------- 키보드 ---------- */
addEventListener("keydown",e=>{
  if(e.target.tagName==="INPUT") return;
  if(mode==="closeup"){ const k=e.key.toLowerCase(); if(e.key==="Escape") closeCloseup(); else if(k==="f"&&CU&&CU.f){ e.preventDefault(); CU.f(); } else if(k==="n"){ closeCloseup(); openBook(); } return; }
  if(mode==="manip"){ if(e.key==="Escape") endManip(false); if(e.key.toLowerCase()==="f") manipStep(.34); return; }
  if(e.key==="Escape"){ if(mode==="talk") closeTalk(); else if(mode==="inspect") closeInspect(); else closeBook(); }
  if(mode==="talk"||mode==="end") return;
  if($("book").classList.contains("open") && /^Arrow/.test(e.key)){ e.preventDefault(); { const d=(e.key==="ArrowLeft"||e.key==="ArrowUp")?-1:1; turnTo(jIdx+d,d); } return; }
  const k=e.key.toLowerCase();
  if(mode!=="title"&&mode!=="intro"){ if(k==="q"){ closeBook(); try{ if(mode==="board") closeBoard(); }catch(e){} } if(k==="e") openBook(); if(k==="m") $("soundBtn").click(); }
  if(k==="f"){
    if(mode==="explore" && nearId) inspect(SPOTS.find(s=>s.id===nearId));
    else if(mode==="inspect" && activeSpot && activeSpot.action && !opened.has(activeSpot.id)) $("iBody").querySelector(".primary")?.click();
  }
  if(k==="n"){ if(mode!=="title"&&mode!=="intro") toggleBook(); }
});


/* ================= 인터랙션: 램프 · 열차 흔들림 ================= */
const LAMPN=["램프","스탠드","벽 조명"];
document.querySelectorAll(".lampbtn").forEach(b=>{
  b.onclick=e=>{ e.stopPropagation(); if(mode!=="explore") return;
    const i=+b.dataset.lamp, L=LAMPS[i]; L.on=!L.on;
    hit(1900,.22,.04,"highpass"); setTimeout(()=>hit(700,.12,.05),40);
    b.querySelector(".lamptip").textContent=LAMPN[i]+(L.on?" 끄기":" 켜기");
    const off=LAMPS.filter(x=>!x.on).length;
    if(off===3) think("완전히 어둡다. 창밖 불빛만 스쳐 지나간다.",2600);
    else if(!L.on && Math.random()<.5) think("…조용하군. 레일 소리만 들린다.",2000); };
});
function railJoint(){
  if(mode!=="title"){ jolt=1; if(soundOn&&audio()){ hit(140,.5,.22); setTimeout(()=>hit(170,.4,.2),170); }
    LAMPS.forEach(L=>{ L.t=.5; L.next=performance.now()+120; }); }
  setTimeout(railJoint, 7000+Math.random()*7000);
}
setTimeout(railJoint, 6000);

/* ================= 인터랙션: 직접 조작 (들어 올리기 · 꺼내기) ================= */
let MP=null;
const handEl=$("fphand");
function startManip(s){
  const m=s.manip; activeSpot=s; mode="manip"; $("prompt").classList.remove("show");
  stage.classList.remove("explore"); stage.classList.add("manip");
  ease=.07; tgt.s=2.8; tgt.fx=s.x; tgt.fy=s.y+(m.dir[1]<0?-4:3);
  const lay=$("manipLayer"); lay.innerHTML="";
  let mover;
  if(m.rect){
    const [x1,y1,x2,y2]=m.rect;
    const h=document.createElement("div"); h.className="hole";
    if(m.hole){
      Object.assign(h.style,{left:(x1+.6)+"%",top:(y1+(y2-y1)*.72)+"%",width:(x2-x1-1.2)+"%",height:((y2-y1)*.3)+"%"});
      h.innerHTML=`<svg viewBox="0 0 20 40"><rect x="7" y="2" width="6" height="6" fill="#6b5a3e"/><path d="M5 9h10l1 4v24H4V13z" fill="rgba(220,235,240,.35)" stroke="rgba(255,255,255,.6)"/><path d="M5 30h10v6H5z" fill="rgba(255,255,255,.6)"/></svg>`;
    } else Object.assign(h.style,{left:x1+"%",top:y1+"%",width:(x2-x1)+"%",height:(y2-y1)+"%",borderRadius:"1px",background:"rgba(6,4,3,.92)"});
    lay.appendChild(h);
    const w=document.createElement("div"); w.className="cutwrap"; const c=document.createElement("div"); c.className="cut";
    c.style.backgroundImage=`url(${IMG})`; c.style.clipPath=m.poly?`polygon(${m.poly.map(([x,y])=>x+"% "+y+"%").join(",")})`:`inset(${y1}% ${100-x2}% ${100-y2}% ${x1}%)`;
    c.style.transformOrigin=`${(x1+x2)/2}% ${(y1+y2)/2}%`; w.appendChild(c); lay.appendChild(w); mover=c;
  } else {
    const d=document.createElement("div"); d.className="pullobj"; Object.assign(d.style,{left:s.x+"%",top:(s.y-3)+"%"});
    d.innerHTML=`<svg viewBox="0 0 60 80"><circle cx="30" cy="16" r="11" fill="#e9d9c8"/><path d="M19 12c2-9 20-9 22 0-3-4-18-4-22 0z" fill="#3a2418"/><circle cx="26" cy="17" r="1.8" fill="#e33"/><circle cx="34" cy="17" r="1.8" fill="#e33"/><path d="M14 30c6-4 26-4 32 0l8 40H6z" fill="#efe6e0" stroke="#bfae9e"/><path d="M10 48h40M8 58h44" stroke="#d8c8bc"/></svg>`;
    lay.appendChild(d); mover=d;
  }
  MP={s,m,mover,p:0,drag:null};
  $("manipT").textContent=m.verb; $("manipBar").hidden=false; setP(0);
  const r=stage.getBoundingClientRect(); handAt(ptr.in?ptr.x*r.width:r.width*.6, ptr.in?ptr.y*r.height:r.height*.6);
  steps(1);
}
function setP(p){
  MP.p=p; $("manipP").style.setProperty("--p",(p*100)+"%");
  const {m,mover}=MP, k=1-Math.pow(1-Math.min(1,p),2);
  const dx=m.dir[0]*m.dist*k, dy=m.dir[1]*m.dist*k*1.78;
  if(m.rect) mover.style.transform=`translate(${dx}%,${dy}%) scale(${1+((m.scale||1.06)-1)*k}) rotate(${m.dir[1]<0?Math.sin(p*9)*1.2*(1-p):-k*4}deg)`;
  else { mover.style.transform=`translate(calc(-50% + ${dx*12}%),calc(-50% + ${dy*6}%)) scale(${1+k*.5})`; mover.style.opacity=.25+.75*k; }
}
function manipStep(d){ if(!MP) return; setP(Math.min(1,MP.p+d)); hit(260+MP.p*300,.12,.08); if(MP.p>=1) finishManip(); }
function finishManip(){
  if(!MP||MP.done) return; MP.done=true;
  const s=MP.s; hit(900,.25,.3); paper(); opened.add(s.id); refreshMarkers();
  setTimeout(()=>{ endManip(true); inspect(s); },650);
}
function endManip(done){
  $("manipBar").hidden=true; stage.classList.remove("manip","grip");
  if(!done) $("manipLayer").innerHTML=""; else setTimeout(()=>$("manipLayer").innerHTML="",500);
  MP=null; mode="explore"; stage.classList.add("explore"); ease=.1; tgt.s=1.4; setPrompt();
}
function handAt(cx,cy){ handEl.style.transform=`translate(${cx-handEl.clientWidth*.07}px,${cy-handEl.clientHeight*.05}px) rotate(${-8+(MP?MP.p*6:0)}deg)`; }
stage.addEventListener("pointermove",e=>{
  if(mode!=="manip"||!MP) return; const r=stage.getBoundingClientRect(); handAt(e.clientX-r.left,e.clientY-r.top);
  if(MP.drag){ const {m}=MP; const dx=(e.clientX-MP.drag.x)/r.width, dy=(e.clientY-MP.drag.y)/r.height;
    const along=(dx*m.dir[0]+dy*m.dir[1])/Math.hypot(m.dir[0],m.dir[1]); const p=clamp(MP.drag.p+along*3.6,0,1);
    if(Math.floor(p*8)!==Math.floor(MP.p*8)) hit(240+p*260,.08,.06); setP(p); if(p>=1){ MP.drag=null; finishManip(); } } });
stage.addEventListener("pointerdown",e=>{ if(mode!=="manip"||!MP||e.target.closest("button")) return; MP.drag={x:e.clientX,y:e.clientY,p:MP.p}; stage.classList.add("grip"); });
addEventListener("pointerup",()=>{ if(!MP||!MP.drag) return; MP.drag=null; stage.classList.remove("grip");
  if(MP.p<1){ const st=MP.p, t0=performance.now(); const back=t=>{ if(!MP||MP.drag) return; const k=Math.min(1,(t-t0)/260); setP(st*(1-k)); if(k<1) requestAnimationFrame(back); }; requestAnimationFrame(back); } });

/* ================= 인터랙션: 단서 미니 게임 ================= */
const miniDone=new Set(); let MINIF=null;
function dragger(el,onP,onDone,axis="x",span=1){
  let st=null,p=0,done=false;
  const fin=()=>{ if(done) return; done=true; onDone(); };
  el.onpointerdown=e=>{ st={x:e.clientX,y:e.clientY,p}; try{el.setPointerCapture(e.pointerId)}catch(_){} e.preventDefault(); };
  el.onpointermove=e=>{ if(!st||done) return; const r=el.getBoundingClientRect(); const d=axis==="x"?(e.clientX-st.x)/r.width:(e.clientY-st.y)/r.height; p=clamp(st.p+Math.abs(d)/span,0,1); onP(p); if(p>=1){ st=null; fin(); } };
  el.onpointerup=()=>st=null;
  return v=>{ if(done) return; p=clamp(p+(v||.34),0,1); onP(p); if(p>=1) fin(); };
}
function miniFinish(s){ if(miniDone.has(s.id)) return; miniDone.add(s.id); hit(900,.2,.25); setTimeout(()=>{ if(mode==="closeup"){ if(s.ev&&!found.has(s.id)) collect(s); if(s.th) cuThink(s.th,3600); $("cuPh").classList.remove("cudim"); } else if(activeSpot===s) renderInspect(s); },500); }
function renderMini(s,B,add,replay){
  MINIF=null;
  const box=add("div","mini","");
  if(s.mini==="watch"){
    const hA=(9+47/60)/12*Math.PI*2, mA=47/60*Math.PI*2;
    box.innerHTML=`<svg class="watch" id="mWatch" viewBox="0 0 100 110" role="button" aria-label="회중시계 뚜껑 열기"><circle cx="50" cy="8" r="5" fill="none" stroke="#b99443" stroke-width="3"/><rect x="46" y="10" width="8" height="8" fill="#b99443"/>
      <circle cx="50" cy="60" r="40" fill="#b99443"/><circle cx="50" cy="60" r="34" fill="#f3ead6"/>
      ${[...Array(12)].map((_,i)=>{const a=i/12*Math.PI*2;return `<line x1="${50+Math.sin(a)*29}" y1="${60-Math.cos(a)*29}" x2="${50+Math.sin(a)*32}" y2="${60-Math.cos(a)*32}" stroke="#2a211a" stroke-width="1.6"/>`}).join("")}
      <line x1="50" y1="60" x2="${50+Math.sin(hA)*18}" y2="${60-Math.cos(hA)*18}" stroke="#2a211a" stroke-width="3" stroke-linecap="round"/>
      <line x1="50" y1="60" x2="${50+Math.sin(mA)*26}" y2="${60-Math.cos(mA)*26}" stroke="#2a211a" stroke-width="2" stroke-linecap="round"/>
      <path d="M62 44 l-8 10 l6 4 l-9 12" stroke="#8b2a20" stroke-width="1" fill="none" opacity=".8"/><circle cx="50" cy="60" r="2.5" fill="#8b2a20"/>
      <g class="lid"><circle cx="50" cy="60" r="40" fill="#a8843a"/><circle cx="50" cy="60" r="33" fill="none" stroke="#7d6128" stroke-width="2"/><path d="M36 60c6-10 22-10 28 0-6 10-22 10-28 0z" fill="none" stroke="#7d6128"/><text x="50" y="90" font-size="6" text-anchor="middle" fill="#6d5222" font-family="serif">V. LOCKE</text></g></svg>
      <div class="hint">F 또는 클릭해서 뚜껑 열기</div>`;
    const w=box.querySelector("#mWatch"); startWatchTick();
    const go=()=>{ if(w.classList.contains("open")) return; stopWatchTick(); w.classList.add("open"); hit(2200,.2,.05,"highpass"); hit(600,.15,.1); setTimeout(()=>{ think("21시 47분. 유리에 금이 가 있다.",2400); miniFinish(s); },1100); };
    w.onclick=go; MINIF=go; return;
  }
  if(s.mini==="lens"){
    box.innerHTML=`<div class="lensbox" id="mLens"><div class="slip blur">${s.note}</div><div class="slip sharp">${s.note}</div><i class="ring"></i></div><div class="hint">라벨 위로 돋보기를 움직여 손글씨를 읽어라</div>`;
    const L=box.querySelector("#mLens"); let dwell=0, last=0;
    L.addEventListener("pointermove",e=>{ const r=L.getBoundingClientRect(); const x=e.clientX-r.left, y=e.clientY-r.top; L.style.setProperty("--lx",x+"px"); L.style.setProperty("--ly",y+"px");
      const now=performance.now(); if(last && x>r.width*.1 && x<r.width*.9) dwell+=Math.min(60,now-last); last=now;
      if(dwell>900){ think("E.B. 엘레나 보로딘의 필체다.",2400); miniFinish(s); } });
    MINIF=()=>{ L.style.setProperty("--lx","50%"); L.style.setProperty("--ly","50%"); think("E.B. 엘레나 보로딘의 필체다.",2400); miniFinish(s); }; return;
  }
  if(s.mini==="crumple"){
    box.innerHTML=`<div class="crumple" id="mCr"><div class="slip">${s.note}</div></div><div class="hint">좌우로 끌어서 구겨진 쪽지 펴기 (F)</div>`;
    const c=box.querySelector("#mCr"), sl=c.querySelector(".slip");
    const set=p=>{ const k=1-p; sl.style.transform=`rotate(${-8*k}deg) scale(${.55+.45*p},${.4+.6*p}) skewX(${14*k}deg)`; sl.style.filter=`blur(${2.4*k}px)`; if(Math.random()<.3) hit(3000,.05,.04,"highpass"); };
    set(0); MINIF=dragger(c,set,()=>{ set(1); think(s.th,2400); miniFinish(s); },"x",.9); return;
  }
  if(s.mini==="tilt"){
    const ph=$("iPhoto"); ph.classList.add("tilting"); box.innerHTML=`<div class="hint">사진을 좌우로 끌어 잔을 기울여 보기 (F)</div>`;
    let pw=ph.querySelector(".powder"); if(!pw){ pw=document.createElement("span"); pw.className="powder"; pw.textContent="잔 바닥에 하얀 가루…"; ph.appendChild(pw); }
    const set=p=>{ ph.style.transform=`perspective(600px) rotateX(${p*38}deg) rotateZ(${Math.sin(p*6)*3}deg)`; pw.style.opacity=Math.max(0,(p-.5)*2); };
    MINIF=dragger(ph,set,()=>{ setTimeout(()=>{ ph.style.transform=""; pw.style.opacity=0; ph.classList.remove("tilting"); },1200); think(s.th,2400); miniFinish(s); },"x",.8); return;
  }
  if(s.mini==="rec"){
    const LINES=[[0.4,"[21:41] …대표님, 한 잔 더 드세요.",0,2.4],[3.0,"[21:44] (잔 부딪히는 소리)",0,.4],[3.5,"[21:46] …엘레나, 너 뭘……",1,2.0],[5.7,"[21:47] (둔탁한 소리) ……",1,.5]];
    box.classList.add("rec");
    box.innerHTML=`<canvas id="mWave" width="600" height="84"></canvas><div class="lines">${LINES.map(l=>{ const m=l[1].match(/^\[(.+?)\]\s*(.*)$/); return `<div class="${l[2]?"red":""}"><b>${m?m[1]:""}</b><span>${m?m[2]:l[1]}</span></div>`; }).join("")}</div><button class="torn-btn" id="mPlay">▶ 녹음 재생 <kbd>F</kbd></button>`;
    const cv=box.querySelector("#mWave"), g=cv.getContext("2d"), ls=[...box.querySelectorAll(".lines div")];
    if(replay) ls.forEach(d=>d.classList.add("on"));
    let t0=0, raf=0;
    const draw=t=>{ if(!cv.isConnected) return; const el=(t-t0)/1000; g.clearRect(0,0,600,84); g.strokeStyle="#d2ad63"; g.lineWidth=2; g.beginPath();
      const talk=LINES.some(l=>el>l[0]&&el<l[0]+(l[3]||1.1));
      for(let x=0;x<600;x+=2){ const a=(talk?22:4)*Math.abs(Math.sin(x*.07+el*9)*Math.sin(x*.013+el*3))+Math.random()*(talk?6:2); g.lineTo(x,42+((x/2)%2?a:-a)); }
      g.stroke(); g.fillStyle="rgba(255,90,80,.9)"; g.fillRect(Math.min(598,el/6.4*600),0,2,84);
      LINES.forEach((l,i)=>{ if(el>l[0]) ls[i].classList.add("on"); });
      if(talk&&soundOn&&audio()&&Math.random()<.3) hit(900+Math.random()*1600,.04,.05,"bandpass");
      if(el<6.5) raf=requestAnimationFrame(draw);
      else if(!found.has(s.id)){ think("로크가 마지막으로 부른 이름. 엘레나.",2600); miniFinish(s); } };
    const play=()=>{ try{ box.scrollIntoView({block:"nearest",behavior:"smooth"}); }catch(e){} cancelAnimationFrame(raf); if(!replay) ls.forEach(d=>d.classList.remove("on")); t0=performance.now(); raf=requestAnimationFrame(draw); hit(2400,.08,.05,"highpass");
      try{ if(soundOn){ if(!window.__recA){ window.__recA=new Audio("ev/doll_rec.mp3"); window.__recA.volume=.9; } window.__recA.currentTime=0; window.__recA.play().catch(()=>{}); } }catch(e){}   // 녹음 파일(ev/doll_rec.mp3)이 있으면 재생
      if(!found.has(s.id)) setTimeout(()=>{ if(!found.has(s.id)&&mode==="closeup") miniFinish(s); },1200); };
    box.querySelector("#mPlay").onclick=play; MINIF=play; tornClip(box.querySelector("#mPlay"),1.5,7,14); setTimeout(()=>{ try{ box.scrollIntoView({block:"nearest"}); }catch(e){} },80); return;
  }
}
addEventListener("keydown",e=>{ if(mode==="closeup") return; if(mode==="inspect" && e.key.toLowerCase()==="f" && S3 && activeSpot && activeSpot.id==="statue"){ S3.step(.34); return; } if(mode==="inspect" && e.key.toLowerCase()==="f" && activeSpot && activeSpot.mini && MINIF && !(activeSpot.action&&!opened.has(activeSpot.id))){ MINIF(); } });

/* ---------- 심문 ---------- */
const STATE=[
 {q:"9시 이후의 일",st:"9시에 와인을 가져다드리고 바로 나왔어요. 대표님은 혼자 식사 중이셨어요.",
  ask:"정말 바로 나왔나?",
  press:"방해받는 걸 싫어하셨어요.",ans:["plates","doll"],
  hint:"혼자 먹었다면 식기는 한 벌이어야 한다. 아니면… 이 방이 그 밤의 소리를 기억할지도.",where:"의자 밑 인형을",
   brk:[["R","9시 41분에도 당신은 여기서 와인을 따르고 있었어."],["E","……앉으라고 하셨어요. 거절할 수 없었어요."]]},
 {q:"로크의 약",st:"약은 주치의 선생님이 관리하세요. 저는 손댄 적 없어요.",
  ask:"약병 근처에도 간 적 없나?",
  press:"저는 그냥 승무원이에요.",ans:"bedside",
  hint:"협탁의 약병. 라벨 뒤까지 돌려 봤나?",where:"침대 옆 협탁의 약병을",
   brk:[["R","약병의 E.B.는 당신 필체지."],["E","……제가 적었어요. 약도 와인도 제 손을 거쳤으니까요."]]},
 {q:"시신을 발견했을 때",st:"10시 반에 발견했어요. 아무것도 만지지 않고 바로 사람을 불렀어요.",
  ask:"방 안 물건엔 정말 손대지 않았나?",
  press:"무서워서 문간에서 못 움직였어요.",ans:"statue",
  hint:"조각상 둘레만 깨끗하다. 누군가 들었다 놓았다.",where:"먼지 쌓인 조각상을",
   brk:[["R","조각상 받침대 아래에 이 병이 있었어."],["E","……그 병은 제가……"]]}
];
const SUSPECTS=[
 ["margaret","마가렛 첼시","72세 · 에덴라인 창업주의 미망인","마가렛은 8시 반에 찾아와 로크와 다퉜다. 하지만 벨라의 털 자국은 이미 식어 있었고, 그녀는 9시 전에 방을 떠났다. 9시 이후 와인을 따른 사람은 따로 있다."],
 ["evelyn","에블린 블룸","31세 · AI 인격 설계자","에블린은 9시 25분에 인형을 두고 곧장 식당칸으로 돌아갔다. 인형이 기억한 21시 41분, 와인을 따르는 목소리는 그녀가 아니다."],
 ["magician","???","전직 정비공 · 마술사","그는 9시 15분에 까마귀만 두고 나갔다. ‘마지막 쇼’는 로크의 비밀을 폭로하려던 그의 계획이었다. 하지만 독이 든 잔을 따른 손은 그의 것이 아니다."],
 ["elena","엘레나 보로딘","27세 · 전담 승무원",null]
];
const CONFESS=[["R","엘레나 보로딘. 로크를 독살한 건 당신이다."],["E","……"],["E","……제 잘못이긴 해요."],
 ["E","하지만……"]];   // 다 말하지 않고 삼킨다 → 끌려가다 돌아서서 외치는 한마디는 엔딩 영상에서
const USED=new Set(), USEDBY={}, TRIED={}; let BROKEN=new Set(), comp=100, confessed=false, twistHinted=false, seq=null;
const talkEl=$("talk"); talkEl.appendChild($("tkOpts"));   // 선택지는 화면 전체 기준으로 배치
function setObj(a,b){ $("objText").textContent=a; if(b) $("objSub").textContent=b; }
function gauge(){ talkEl.style.setProperty("--p",(BROKEN.size/STATE.length).toFixed(3)); $("tkGauge").style.setProperty("--g",comp+"%"); const M=$("tkMeter"); if(M){ M.style.setProperty("--g",comp+"%"); M.querySelector("em").textContent=comp>70?"침착":comp>40?"흔들림":comp>15?"동요":"무너짐"; M.classList.toggle("low",comp<=40); } }
function say(who,text){
  const punch=who==="R!"; if(punch) who="R";
  const nm=$("tkName"), ln=$("tkLine"); ln.classList.toggle("punch",punch);
  nm.classList.toggle("rock", who!=="E");
  nm.querySelector("b").textContent = who==="E"?"엘레나 보로딘":"Rock";
  nm.querySelector("small").textContent = who==="E"?"전담 승무원 · 최초 발견자":(who==="r"?"속마음":"초대받은 승객");
  ln.classList.toggle("inner", who==="r"); ln.innerHTML = sentBr(who==="r"?`(${text})`:text);
  ln.classList.remove("in"); void ln.offsetWidth; ln.classList.add("in");   // 대사가 한 줄씩 떠오름
}
/* 심문 화면: 왼쪽엔 진술 카드, 아래엔 영화 자막처럼 대사, 증거는 사진 카드로 골라 던진다 */
let curStmt=-1;
function opts(list,m="act"){
  const O=$("tkOpts"); O.innerHTML=""; O.className="tk-opts m-"+m; talkEl.dataset.m=m; O._car=null;
  if(m==="ev"){ evCarousel(O,list); return; }
  list.forEach(o=>{
    if(o.h){ if(!o.h.trim()) return; const h=document.createElement("div"); h.className="opt-h"; h.textContent=o.h; O.appendChild(h); return; }
    const b=document.createElement("button"); b.className="opt"+(o.cls?" "+o.cls:""); b.innerHTML=`<span class="k">${o.k||"›"}</span><span>${o.t}</span>`; b.onclick=o.f;
    O.appendChild(b);
  });
  O.querySelector("button")?.focus({preventScroll:true});
}
/* 증거 고르기: 어두운 화면 위에 사진 카드를 한 줄로 늘어놓고 좌우로 넘겨 가운데 카드를 들이민다 */
 const evidenceRoomImage=new Image(); evidenceRoomImage.src=IMG;
 /* 증거 카드 사진: 약병·초록 병도 인형처럼 게임 속 실제 3D 모델을 같은 어두운 배경에서 찍어 쓴다 */
 const EVTH={}, EVTHP={};
 function evThumb(id){ if(EVTHP[id]) return EVTHP[id]; if(!window.THREE||!THREE.GLTFLoader) return Promise.reject();
   return EVTHP[id]=new Promise((ok,no)=>{ try{
     const W=640,H=400, R=new THREE.WebGLRenderer({antialias:true,preserveDrawingBuffer:true}); R.setSize(W,H,false); R.outputEncoding=THREE.sRGBEncoding; R.physicallyCorrectLights=true; R.toneMapping=THREE.ACESFilmicToneMapping; R.toneMappingExposure=1.05;
     const S=new THREE.Scene(), C=new THREE.PerspectiveCamera(30,W/H,.01,20); S.background=darkBackdrop(); S.environment=exEnv(R);
     S.add(new THREE.HemisphereLight(0xffe7c4,0x16241a,.6)); const key=new THREE.PointLight(0xffc98a,22,8,1.6); key.position.set(1.1,1.5,1.6); S.add(key); const rim=new THREE.PointLight(0x9ec4ae,6,8,1.6); rim.position.set(-1.4,1.2,-1.4); S.add(rim);
     const shadow=(w,y)=>{ const c=document.createElement("canvas"); c.width=c.height=128; const g=c.getContext("2d"), q=g.createRadialGradient(64,64,0,64,64,64); q.addColorStop(0,"rgba(0,0,0,.85)"); q.addColorStop(.5,"rgba(0,0,0,.4)"); q.addColorStop(1,"rgba(0,0,0,0)"); g.fillStyle=q; g.fillRect(0,0,128,128);
       const m=new THREE.Mesh(new THREE.PlaneGeometry(w,w*.6),new THREE.MeshBasicMaterial({map:new THREE.CanvasTexture(c),transparent:true,depthWrite:false})); m.rotation.x=-Math.PI/2; m.position.y=y; S.add(m); };
     const shot=()=>{ R.render(S,C); const u=R.domElement.toDataURL("image/jpeg",.88); try{ R.dispose(); R.forceContextLoss(); }catch(e){} EVTH[id]=u; ok(u); };
     if(id==="bedside"){ const o=exBottle(); o.rotation.y=Math.PI+.35; S.add(o); shadow(.42,-.262); C.position.set(.02,.04,.98); C.lookAt(0,.005,0); setTimeout(shot,0); }   // 라벨 뒤 손글씨가 보이게
     else if(id==="statue"){ m3dLoad("bottle.json",g=>{ const m=g.scene.clone(), b=new THREE.Box3().setFromObject(m), sz=b.getSize(new THREE.Vector3()), c=b.getCenter(new THREE.Vector3());
         m.position.set(-c.x,-b.min.y,-c.z); const p=new THREE.Group(); p.add(m); p.scale.setScalar(.2/sz.y); p.rotation.y=.5; S.add(p); shadow(.2,.001); C.position.set(0,.12,.42); C.lookAt(0,.1,0); setTimeout(shot,0); }); }
     else no(); }catch(e){ no(e); } });
 }
 function evidencePhoto(el,s){
   if(EVTH[s.id]){ el.style.backgroundImage=`url(${EVTH[s.id]})`; el.style.backgroundSize="cover"; el.style.backgroundPosition="center"; return; }
   if(s.id==="bedside"||s.id==="statue"){ evThumb(s.id).then(u=>{ el.style.backgroundImage=`url(${u})`; el.style.backgroundSize="cover"; el.style.backgroundPosition="center"; }).catch(()=>{}); }
   if(s.id==="doll"){ el.style.backgroundImage='url("ev/doll.jpg")'; el.style.backgroundSize="cover"; el.style.backgroundPosition="center 62%"; return; }
   if(EVIMG[s.id]){ el.style.backgroundImage=`url(${EVIMG[s.id]})`; el.style.backgroundSize=s.id==="doll"?"cover":"contain"; el.style.backgroundPosition=s.id==="doll"?"center 62%":"center"; return; }
   const draw=()=>{
     const im=evidenceRoomImage, c=document.createElement("canvas"); c.width=640; c.height=400;
     const sw=im.naturalWidth/2.65, sh=sw/1.6;
     const sx=Math.max(0,Math.min(im.naturalWidth-sw,im.naturalWidth*s.x/100-sw/2));
     const sy=Math.max(0,Math.min(im.naturalHeight-sh,im.naturalHeight*s.y/100-sh/2));
     c.getContext("2d").drawImage(im,sx,sy,sw,sh,0,0,c.width,c.height);
     el.style.backgroundImage=`url(${c.toDataURL("image/jpeg",.86)})`;
     el.style.backgroundSize="contain"; el.style.backgroundPosition="center";
   };
   if(evidenceRoomImage.complete&&evidenceRoomImage.naturalWidth) draw(); else evidenceRoomImage.addEventListener("load",draw,{once:true});
 }
function evCarousel(O,list){
  /* 증거 카드를 한 줄로 고르게 펼쳐 놓고, 누르면 바로 들이민다 (겹치지 않고, 사진이 카드 밖으로 나가지 않는다) */
  const head=list.find(o=>o.h), items=list.filter(o=>o.e), quit=list.find(o=>!o.h&&!o.e);
  const wrap=document.createElement("div"); wrap.className="evp"; O.appendChild(wrap);
  if(!items.length&&quit){ const b=document.createElement("button"); b.className="opt"; b.innerHTML=`<span class="k">–</span><span>${quit.t}</span>`; b.onclick=quit.f; O.appendChild(b); return; }
  if(head){ const h=document.createElement("div"); h.className="evp-h"; h.textContent=head.h; wrap.appendChild(h); }
  const row=document.createElement("div"); row.className="evp-row"; wrap.appendChild(row);
  const cards=items.map((o,i)=>{ const b=document.createElement("button"); b.type="button"; b.className="evc"+(o.e.id==="bedside"?" tall":""); b.style.setProperty("--r",[-1.6,1.1,-.7,1.4,-1.2,.8][i%6]+"deg");
    b.innerHTML=`<span class="k">${o.k}</span><i class="evc-ph"></i><b class="cap">${SHORT[o.e.id]||o.e.title}</b><small>${o.t}</small>`; if(o.hint) b.classList.add("hint"); if(o.used){ b.classList.add("used"); b.insertAdjacentHTML("beforeend",`<em class="evc-tag ok">✓ 사용함</em>`); } else if(o.tried){ b.classList.add("tried"); b.insertAdjacentHTML("beforeend",`<em class="evc-tag no">✕ 아니다</em>`); }
    evidencePhoto(b.querySelector(".evc-ph"),o.e); row.appendChild(b); return b; });
  const C={cur:Math.floor((items.length-1)/2),busy:false};
  const lay=()=>cards.forEach((b,i)=>b.classList.toggle("focus",i===C.cur));
  const go=i=>{ i=Math.max(0,Math.min(cards.length-1,i)); if(i===C.cur) return; C.cur=i; lay(); hit(2600,.05,.06,"bandpass"); };
  const pick=(i=C.cur)=>{ if(C.busy) return; C.busy=true; C.cur=i; lay(); cards.forEach((x,j)=>{ if(j!==i) x.classList.add("dim"); }); cards[i].classList.add("picked"); paper(); setTimeout(()=>items[i].f(),520); };
  cards.forEach((b,i)=>{ b.onclick=()=>pick(i); b.onmouseenter=()=>{ if(!C.busy){ C.cur=i; lay(); } }; });
  const hint=document.createElement("div"); hint.className="evp-hint"; hint.innerHTML=`<b>증거 카드를 눌러</b> 들이민다 <span>· ← → 로 고르고 Enter</span>`; wrap.appendChild(hint);
  if(quit){ const q=document.createElement("button"); q.className="opt quiet"; q.innerHTML=`<span class="k">ESC</span><span>${quit.t}</span>`; q.onclick=quit.f; O.appendChild(q); C.quit=quit.f; }
  O._car={go:d=>go(C.cur+d),pick:()=>pick(),cards,quit:C.quit}; lay();
}
function caseCards(){ const C=$("tkCase"); if(!C) return;
  const cur=STATE[curStmt];
  C.innerHTML=`<div class="tp-pips">${STATE.map((x,i)=>`<i class="${BROKEN.has(i)?"done":i===curStmt?"cur":""}"></i>`).join("")}</div>`+
    `<div class="tp-t">${cur?`<small>진술 ${curStmt+1}</small><b>${cur.q}</b>`:`<small>모순</small><b>${BROKEN.size} / ${STATE.length}</b>`}</div>`; }
function play(lines,done){
  let i=0;
  const step=()=>{ if(i>=lines.length){ done&&done(); return; }
    const [w,t]=lines[i++]; say(w,t);
    if(lines===CONFESS){ if(i===2) react("confess"); else if(i===4) react("doubt"); }   // 말없이 고개를 떨군다 → "제 잘못이긴 해요" → "하지만……"에서 누군가를 곁눈질하고 말을 삼킨다   // 자백: 고개를 떨구고 눈을 감는다 → "제가 낸 게 아니에요"에서 누군가를 곁눈질
    if(w==="E"&&talkEl.classList.contains("press")){ comp=Math.max(45,comp-5); gauge(); const M=$("tkMeter"); M.classList.remove("hitm"); void M.offsetWidth; M.classList.add("hitm"); }
    if(w==="E"&&t.startsWith("……")) { talkEl.classList.remove("shake"); void talkEl.offsetWidth; talkEl.classList.add("shake"); }
    opts([{k:"F",t:i<lines.length?"계속":"확인",f:step}],"next"); };
  step();
}

/* ---------- 엘레나 대기 영상: 같은 영상 두 개를 번갈아 틀며 끝과 처음을 부드럽게 겹쳐 잇는다 (되감기 없음) ---------- */
const ELENA_IDLE="elena-idle.mp4";
const vid=$("tkVid"), vid2=vid.cloneNode(); vid2.id="tkVid2"; vid2.classList.add("idle-off"); vid.after(vid2);
let vRaf=0, vidOK=false, act=vid, oth=vid2, xf=false;
vid.addEventListener("loadeddata",()=>{ vidOK=true; talkEl.classList.add("hasvid"); if(!talkEl.hidden&&mode==="talk") vidStart(); });
vid.addEventListener("error",()=>{ vidOK=false; talkEl.classList.remove("hasvid"); });
function warmTalk(){ ["bedside","statue"].forEach(id=>{ try{ evThumb(id).catch(()=>{}); }catch(e){} }); if(vid.getAttribute("src")) return; vid.src=ELENA_IDLE; vid2.preload="auto"; vid2.src=ELENA_IDLE;
  Object.entries(REACT).forEach(([k,list])=>{ reactOK[k]=[]; list.forEach(src=>{ const v=document.createElement("video"); v.preload="auto"; v.muted=true; v.src=src;
    v.addEventListener("loadeddata",()=>{ if(!reactOK[k].includes(src)) reactOK[k].push(src); }); pre[src]=v; }); }); }
function vidStart(){
  if(!vidOK) return; cancelAnimationFrame(vRaf); xf=false; act=vid; oth=vid2;
  vid2.pause(); vid2.muted=true; vid2.classList.add("idle-off"); vid.classList.remove("idle-off");
  vid.muted=!soundOn; vid.volume=.65; vid.currentTime=0; vid.play().catch(()=>{ vid.muted=true; vid.play().catch(()=>{}); });
  vRaf=requestAnimationFrame(idleTick);
}
function idleSwap(){ if(xf) return; xf=true; const a=act, b=oth;
  b.currentTime=0; b.muted=a.muted; b.volume=.65; b.play().catch(()=>{}); b.classList.remove("idle-off"); a.classList.add("idle-off");   // 0.9초 동안 서로 겹쳐 넘어감
  act=b; oth=a; setTimeout(()=>{ a.pause(); a.muted=true; xf=false; },950); }
function idleTick(){ if(talkEl.hidden) return; const d=act.duration; if(d&&d-act.currentTime<.9) idleSwap(); vRaf=requestAnimationFrame(idleTick); }
[vid,vid2].forEach(v=>v.addEventListener("ended",()=>{ if(v===act&&!talkEl.hidden) idleSwap(); }));
function vidStop(){ cancelAnimationFrame(vRaf); vid.pause(); vid2.pause(); reactStop(); }
/* 반응 클립: 놀람(startle) · 둘러대기(lie). 대기 영상 위로 천천히 섞여 들어왔다가, 끝나기 전에 천천히 빠진다 */
const REACT={startle:["elena-startle.mp4","elena-startle2.mp4"],lie:["elena-lie.mp4","elena-lie2.mp4"],
  confess:["elena-confess.mp4"],doubt:["elena-doubt.mp4"]}, reactOK={}, reactLast={};
const rv=$("tkReact"); const pre={};
function react(k){
  const ok=reactOK[k]||[]; if(!vidOK||!ok.length) return;
  const pool=ok.length>1?ok.filter(x=>x!==reactLast[k]):ok; const src=pool[Math.random()*pool.length|0]; reactLast[k]=src;
  rv.src=src; rv.muted=!soundOn; rv.volume=.65; rv.currentTime=0;
  rv.play().then(()=>{ rv.classList.add("on"); act.muted=true; const my=rv.src;
    const out=()=>{ if(rv.src!==my||!rv.classList.contains("on")) return; rv.classList.remove("on"); act.muted=!soundOn; setTimeout(()=>{ if(!rv.classList.contains("on")) rv.pause(); },700); };
    if(k==="doubt"){ rv._out=()=>{ try{ rv.pause(); }catch(e){} }; return; }   // 마지막 "하지만……": 다가간 화면 그대로 멈춰 있다가 엔딩으로(다시 넓은 화면으로 돌아가지 않는다)
    rv._out=out; setTimeout(out,Math.max(1600,((rv.duration||4)-.75)*1000)); }).catch(()=>{});
}
rv.addEventListener("ended",()=>{ rv._out&&rv._out(); });
function reactStop(){ rv.pause(); rv.classList.remove("on"); }

/* 심문 영상 미리 받기: 타이틀·인트로 영상이 도는 동안에는 받지 않는다(인트로 영상과 회선을 다투지 않게). 방에 들어온 뒤 4초쯤 지나서 시작 */
(function warmLater(){ if(mode==="title"||mode==="intro"){ setTimeout(warmLater,1500); return; } setTimeout(()=>{ try{ warmTalk(); }catch(e){} },4000); })();
function openTalk(){
  if(mode==="inspect") $("insp").classList.remove("open");
  closeBook(); mode="talk"; stage.classList.remove("explore"); $("prompt").classList.remove("show");
  $("tabTalk").setAttribute("aria-selected",true); $("tabScene").setAttribute("aria-selected",false);
  const sp=SPOTS.find(x=>x.id==="elena"); ease=.06; tgt.fx=sp.x; tgt.fy=sp.y; tgt.s=1.8;
  talkEl.hidden=false; gauge(); steps(1); warmTalk(); vidStart(); hbStart();
  if(!talkEl.dataset.met){ talkEl.dataset.met=1; play([["R","최초 발견자, 엘레나. 진술은 세 개. 거짓을 증거로 깨트린다."],["E","……무엇이든 물어보세요."]],menu); }
  else menu();
}
function closeTalk(){
  talkEl.classList.remove("press","jolt","lying"); hbStop(); vidStop(); talkEl.hidden=true; mode="explore"; stage.classList.add("explore"); ease=.1; tgt.s=1.4;
  $("tabTalk").setAttribute("aria-selected",false); $("tabScene").setAttribute("aria-selected",true);
  setPrompt(); checkDone();
}
function menu(){
  curStmt=-1; caseCards();
  if(confessed){ ending(); return; }
  const i=STATE.findIndex((x,k)=>!BROKEN.has(k));
  if(i>=0){ statement(i); return; }
  accuse();
}
/* 진술 하나: 엘레나가 말하고 → [증거를 들이민다 / 더 추궁한다 / 물러난다] */
const WRONG={}, LIED=new Set();
function statement(i,again){
  const s=STATE[i];
  if(BROKEN.has(i)){ menu(); return; }
  curStmt=i; caseCards(); if(!again){ say("E",s.st); if(!LIED.has(i)){ LIED.add(i); react("lie"); } }
  opts([{k:"1",t:"증거를 들이민다",cls:"main",f:()=>present(i)},
        {k:"2",t:"더 추궁한다",f:()=>pressOn(i)},
        {k:"ESC",t:"잠시 물러난다",cls:"quiet",f:closeTalk}],"act");
}
/* 추궁: 책상을 쾅 내리치고, 카메라가 엘레나 얼굴로 확 다가가며 주변이 어두워지고 심문 조명이 내리쬔다.
   같은 진술을 거듭 추궁할수록 더 가까이. 엘레나는 둘러대며 평정이 흔들린다 */
const PRESS={};
function pressOn(i){ const s=STATE[i]; PRESS[i]=Math.min(3,(PRESS[i]||0)+1);
  if(!$("tkPress")){ const d=document.createElement("div"); d.className="tk-press"; d.id="tkPress"; d.setAttribute("aria-hidden","true"); $("tkVid").parentElement.appendChild(d); }
  talkEl.style.setProperty("--pz",PRESS[i]); talkEl.classList.add("press");
  talkEl.classList.remove("jolt"); void talkEl.offsetWidth; talkEl.classList.add("jolt");
  try{ SFX("thud",.8); }catch(e){} hbKick(96);                                   // 책상 내리치는 소리 + 박동이 빨라짐
  setTimeout(()=>play([["R!",s.ask],["E",s.press],["r",s.hint]],()=>{ talkEl.classList.remove("press"); statement(i,true); }),260); }
/* 정답 증거를 들이밀면: 화면이 덜컹, 붉은 '거짓말' 도장이 쾅 */
/* 들킨 진술: 엘레나가 했던 말이 화면에 다시 떠오르고 그 위로 붉은 줄이 쭉 그어진다 */
function lieCut(text){ talkEl.querySelector(".tk-lie")?.remove(); const L=document.createElement("div"); L.className="tk-lie"; L.setAttribute("aria-hidden","true");
  const p=document.createElement("p"); { const t="“"+text+"”", w=t.split(" "); let ls=[t]; if(t.length>16&&w.length>1){ let best=1,bd=1e9; for(let i=1;i<w.length;i++){ const a=w.slice(0,i).join(" ").length, d=Math.abs(a-(t.length-a)); if(d<bd){ bd=d; best=i; } } ls=[w.slice(0,best).join(" "),w.slice(best).join(" ")]; }
    ls.forEach(x=>{ const sp=document.createElement("span"); sp.className="lc"; sp.textContent=x; p.appendChild(sp); }); } L.appendChild(p); talkEl.appendChild(L); talkEl.classList.add("lying");   // 대사 칸·카드는 잠깐 숨기고 문장만
  setTimeout(()=>L.classList.add("on"),20); setTimeout(()=>{ L.classList.add("cut"); try{ SFX("tear",.35); }catch(e){} },380);
  setTimeout(()=>{ L.classList.add("out"); talkEl.classList.remove("lying"); setTimeout(()=>L.remove(),700); },2300); }
/* 증거로 거짓을 깨는 순간: '거짓말' 도장 없이, 카메라가 엘레나 얼굴로 확 튀어 들어가고 화면이 번쩍 — 흠칫 놀라는 느낌 */
function slam(){ talkEl.classList.remove("shake","startle"); void talkEl.offsetWidth; talkEl.classList.add("shake","startle");
  setTimeout(()=>talkEl.classList.remove("startle"),1400); SFX("hit",.3); hbKick(120); }
/* 심문 배경음: 심장 박동 + 낮게 깔리는 긴장음. 추궁하면 빨라지고, 거짓이 깨지면 치솟았다 가라앉는다.
   진술을 하나씩 깰수록 기본 박동이 점점 빨라진다 */
const HB={on:false,bpm:62,target:62,tm:0,drone:null};
function hbBase(){ return 62+BROKEN.size*12; }
function hbThump(t,v){ const out=sfxBus||ac.destination, o=ac.createOscillator(), g=ac.createGain(), lp=ac.createBiquadFilter();
  o.type="sine"; o.frequency.setValueAtTime(64,t); o.frequency.exponentialRampToValueAtTime(34,t+.14); lp.type="lowpass"; lp.frequency.value=140;
  g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(v,t+.012); g.gain.exponentialRampToValueAtTime(.0001,t+.28);
  o.connect(lp); lp.connect(g); g.connect(out); o.start(t); o.stop(t+.32); }
function hbBeat(){ if(!HB.on) return; if(!soundOn||!ac){ HB.tm=setTimeout(hbBeat,600); return; }
  const t=ac.currentTime+.02, k=Math.min(1,(HB.bpm-60)/80), v=.32+k*.3; RSFX("heart",Math.min(.9,v*1.25),200);   // 쿵-쿵 (실제 심장 박동 녹음)
  HB.bpm+=(HB.target-HB.bpm)*.22; HB.target+=(hbBase()-HB.target)*.08;                                    // 치솟았던 박동이 천천히 가라앉음
  if(HB.drone) HB.drone.g.gain.setTargetAtTime(.05+k*.07,ac.currentTime,.6);
  HB.tm=setTimeout(hbBeat,60000/HB.bpm); }
function hbStart(){ if(HB.on) return; HB.on=true; HB.bpm=HB.target=hbBase();
  try{ if(soundOn&&AMB.carriage) AMB.carriage.volume=.26; }catch(e){}   // 심문 중에는 객차 실내음(실제 녹음)을 조금 키운다. 예전 합성 저음은 끔
  try{ if(false&&soundOn&&audio()){ const out=sfxBus||ac.destination, n=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate), d=n.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=Math.random()*2-1;
      const src=ac.createBufferSource(), lp=ac.createBiquadFilter(), o=ac.createOscillator(), og=ac.createGain(), g=ac.createGain(); src.buffer=n; src.loop=true; lp.type="lowpass"; lp.frequency.value=110; lp.Q.value=4;
      o.type="sine"; o.frequency.value=41; og.gain.value=.5; g.gain.setValueAtTime(0,ac.currentTime); g.gain.linearRampToValueAtTime(.05,ac.currentTime+2.5);
      src.connect(lp); lp.connect(g); o.connect(og); og.connect(g); g.connect(out); src.start(); o.start(); HB.drone={src,o,g}; } }catch(e){}
  hbBeat(); }
function hbStop(){ HB.on=false; clearTimeout(HB.tm); try{ if(AMB.carriage) AMB.carriage.volume=.14; }catch(e){} const d=HB.drone; HB.drone=null; if(d&&ac){ try{ d.g.gain.setTargetAtTime(0,ac.currentTime,.4); setTimeout(()=>{ try{ d.src.stop(); d.o.stop(); }catch(e){} },1800); }catch(e){} } }
function hbKick(b){ HB.target=Math.max(HB.target,b); HB.bpm=Math.max(HB.bpm,b*.85); }
function present(i){
  const s=STATE[i], need=[].concat(s.ans), have=EVID.filter(e=>found.has(e.id));
  /* 쉽게: 이 진술을 깰 증거를 아직 못 찾았으면, 어디를 봐야 하는지 알려 주고 현장으로 */
  if(!have.some(e=>need.includes(e.id))){
    say("r",`아직 증거가 없다. ${s.where} 더 살펴보자.`);
    opts([{k:"1",t:"현장으로 돌아가 조사한다",cls:"main",f:closeTalk},{k:"2",t:"조금 더 추궁해 본다",f:()=>pressOn(i)}],"act"); return; }
  const L=[{h:"이 진술을 깰 증거를 골라 들이밀어라"}];
  have.forEach((e,j)=>L.push({k:String(j+1),e,t:e.ev,cls:"ev",used:USED.has(e.id),tried:!!(TRIED[i]&&TRIED[i].has(e.id)),hint:(WRONG[i]||0)>=1&&need.includes(e.id),f:()=>{
    if(need.includes(e.id)){ USED.add(e.id); USEDBY[i]=e.id; slam(); BROKEN.add(i); comp=Math.max(8,comp-31); gauge(); paper(); lieCut(s.st);
      setTimeout(()=>play(STATE[i].brk,()=>{ render(); caseCards(); if(BROKEN.size===3){ $("tabAcc").classList.remove("lock"); $("tabAcc").removeAttribute("aria-disabled"); $("tabAcc").innerHTML="지목"; setObj("범인을 지목하라","용의자 ▸ 지목"); } menu(); }),1800);
    } else { (TRIED[i]=TRIED[i]||new Set()).add(e.id); WRONG[i]=(WRONG[i]||0)+1; comp=Math.min(100,comp+4); gauge(); hit(200,.2,.12);
      play([["r",`이걸로는 못 깬다. ${s.hint}`]],()=>present(i)); }   // 한 번 틀리면 정답 카드가 빛난다
  }}));
  L.push({k:"ESC",t:"다시 듣는다",cls:"quiet",f:()=>statement(i,true)});
  opts(L,"ev");
}
function confess(){ confessed=true; $("objSub").textContent="사건 종결"; play(CONFESS,()=>{ render(); ending(); }); }
function accuse(){
  say("r","지금까지의 증거가 가리키는 사람은 한 명이다.");
  const L=[{h:"범인 지목"}];
  SUSPECTS.forEach(([id,n,r,why])=>L.push({k:"◆",cls:id==="elena"?"hot":"lo",t:`${n} <small style="color:var(--muted)">· ${r}</small>`,f:()=>{
    if(!why) confess();
    else play([["r",why]],accuse);
  }}));
  L.push({k:"ESC",t:"아직 아니다",cls:"quiet",f:closeTalk});
  opts(L,"act");
}
/* 엔딩: 자백이 끝나면 화면이 닫히고 → 'CASE CLOSED' 도장 쾅 → 정적 속 시계 소리 → 21:47이 21:48로 넘어가고
   → 질문이 한 줄씩 → 마지막에야 버튼. 시간은 흘러가는데, 무언가 끝나지 않은 느낌으로 */
function ending(){ hbStop(); const E=$("ending"), V=$("endVid");
  vidStop(); mode="end"; E.parentElement.classList.add("ended"); talkEl.hidden=true; E.hidden=false; ambStop();
  /* 엔딩 컷: 엘레나가 끌려가며 돌아보고 → 세 용의자의 안도 → 록의 깨달음 → 엘레나의 씁쓸한 얼굴 클로즈업. 쿵 소리에서 끝나면 바로 CASE CLOSED */
  /* 엔딩 컷: 끌려가던 엘레나가 돌아서서 급하게 외친다 → 누군가의 손이 독약병을 집어 간다 → 세 용의자 → 록의 깨달음 */
  /* 엘레나의 외침은 두 번으로 나뉜다: 첫 문장 → (약병·주인공 얼굴) → 둘째 문장. 각 문장이 들리는 구간(초)에만 그 문장의 자막 */
  const cap=$("endCap"), CAPS=[[4.5,6.25,"수면제였어요!","It was only a sleeping draught!"],[9.65,10.85,"저는…… 죽이지 않았어요!","I didn't kill him!"]]; let capK=-1;
  V.ontimeupdate=()=>{ if(!cap) return; const t=V.currentTime, k=CAPS.findIndex(c=>t>=c[0]&&t<c[1]);
    if(k!==capK){ capK=k; if(k>=0){ cap.querySelector("b").textContent=CAPS[k][2]; cap.querySelector("i").textContent=CAPS[k][3]; } cap.classList.toggle("on",k>=0); } };
  let went=false; const go=()=>{ if(went) return; went=true; V.onended=V.onerror=V.onclick=V.ontimeupdate=null; cap&&cap.classList.remove("on"); V.pause(); V.hidden=true; endSeq(); };
  V.hidden=false; V.muted=!soundOn; V.volume=.65; V.src="pro/ending_cut.mp4?v=30"; V.onended=go; V.onerror=go; V.onclick=go;
  const p=V.play(); p&&p.catch(go); setTimeout(()=>{ if(!went&&V.currentTime<.1) go(); },6000); }
function endSeq(){ const E=$("ending"), ng=$("endNag"), ck=$("endClock");
  E.className="ending"; ng&&ng.classList.remove("on"); ck.textContent="21:47";
  const at=(ms,f)=>setTimeout(f,ms);
  { const ul=$("endEv"); if(ul){ ul.innerHTML=STATE.map((st,i)=>{ const id=USEDBY[i], e=id&&EVID.find(x=>x.id===id); return e?`<li style="--d:${i*.28}s"><b>${SHORT[e.id]||e.ev}</b></li>`:""; }).join(""); } }
  { const st=$("endStat"); if(st){ try{ const s=Math.max(0,Math.round(performance.now()/1000)), mm=String(Math.floor(s/60)).padStart(2,"0"), ss=String(s%60).padStart(2,"0"), wr=Object.values(WRONG||{}).reduce((a,b)=>a+(b||0),0);
      st.textContent=`플레이 ${mm}:${ss}  ·  깨뜨린 거짓 ${Math.min(3,BROKEN.size)}/3  ·  빗나간 추궁 ${wr}회`; }catch(e){ st.textContent=""; } } }
  try{ if(soundOn){ let a=AMB.endck; if(!a){ a=AMB.endck=new Audio("sfx/clock.mp3"); a.loop=true; } a.volume=.16; a.currentTime=0; a.play().catch(()=>{}); } }catch(e){}   // 정적 속 시계 초침(실제 녹음)
  at(40,()=>E.classList.add("e1"));                                                // 레터박스 닫힘 + 배경 천천히 다가옴
  at(500,()=>{ E.classList.add("e2"); SFX("hit",.5); });   // 도장 쾅
  let tk=0; const tick=setInterval(()=>{ if(mode!=="end"){ clearInterval(tick); return; } void 0; },1000);
  at(1300,()=>E.classList.add("e3"));                                               // 사건 종결 문구
  at(2000,()=>{ ck.classList.add("flip"); setTimeout(()=>ck.textContent="21:48",180); hit(1600,.05,.03,"bandpass"); });   // 시간은 흘러간다
  at(2700,()=>E.classList.add("e4"));                                              // 질문 첫 줄
  at(3900,()=>{ E.classList.add("e5"); RSFX("thud",.42,200); });                                              // 둘째 줄
  at(4800,()=>{ ng&&ng.classList.add("on"); });
  at(5400,()=>{ E.classList.add("e6"); $("againBtn").focus({preventScroll:true}); }); }
$("tkClose").onclick=closeTalk;
$("tabTalk").onclick=openTalk;
$("againBtn").onclick=()=>location.reload();
addEventListener("keydown",e=>{ if(mode!=="talk") return; const k=e.key.toLowerCase();
  const car=$("tkOpts")._car; if(car){ if(e.key==="ArrowLeft"){ e.preventDefault(); car.go(-1); return; } if(e.key==="ArrowRight"){ e.preventDefault(); car.go(1); return; } if(k==="f"||e.key==="Enter"||k===" "){ e.preventDefault(); car.pick(); return; } const n=parseInt(k); if(n>=1&&n<=car.cards.length){ car.cards[n-1].click(); return; } }
  const btns=[...$("tkOpts").querySelectorAll("button")], cards=talkEl.dataset.m==="menu"?[...$("tkCase").querySelectorAll("button")]:[];
  if(k==="f"||k===" "){ if(btns.length===1){ e.preventDefault(); btns[0].click(); } }
  const n=parseInt(k); if(n>=1&&n<=9){ const b=[...cards,...btns].find(x=>x.querySelector(".k")?.textContent===String(n)); b&&b.click(); } });
$("tkLine").addEventListener("click",()=>{ if(talkEl.dataset.m==="next") $("tkOpts").querySelector("button")?.click(); });
render();

/* ---------- 수상한 곳: 먼지를 삭삭 털어내야 조사할 수 있다 ---------- */
const SCRUB_DONE=.5;
const SCRUB_ON=[];   // 책장은 이제 손으로 책 꺼내는 영상으로 대체              // 먼지 털기는 장부 선반만 (조각상·인형은 기존 방식)                       // 이만큼(50%) 닦이면 조사 시작
const SCRUB_TXT={books:"선반 위 먼지를 털어내 보자",statue:"조각상 둘레 먼지를 털어내 보자",doll:"의자 밑 어둠을 헤집어 보자"};
let dusted=new Set(), SCR=null;
function openScrub(s){
  const el=$("scrub"), cv=$("scrCv"); crop($("scrPh"),s,2.6,.5625);
  $("scrT").textContent=SCRUB_TXT[s.id]||"먼지를 털어내 보자"; $("scrK").textContent=HIDN[s.id]||"수상한 곳"; $("scrBar").style.width="0%";
  el.classList.add("on"); mode="scrub"; $("prompt").classList.remove("show");
  const r=cv.getBoundingClientRect(); cv.width=Math.round(r.width/2); cv.height=Math.round(r.height/2);
  const g=cv.getContext("2d");
  // 먼지층: 어두운 바탕 + 잡티
  g.globalCompositeOperation="source-over"; g.fillStyle="rgba(24,20,16,.94)"; g.fillRect(0,0,cv.width,cv.height);
  for(let i=0;i<2600;i++){ g.fillStyle=`rgba(${120+Math.random()*60|0},${105+Math.random()*50|0},${85+Math.random()*40|0},${Math.random()*.25})`; g.fillRect(Math.random()*cv.width,Math.random()*cv.height,1+Math.random()*3,1+Math.random()*3); }
  SCR={s,cv,g,last:null,cnt:0,done:false};
}
function scrubAt(x,y){ if(!SCR||SCR.done) return; const {cv,g}=SCR, R=cv.width*.055;
  g.globalCompositeOperation="destination-out";
  const L=SCR.last||{x,y}, steps=Math.max(1,Math.hypot(x-L.x,y-L.y)/(R*.4));
  for(let k=0;k<=steps;k++){ const px=L.x+(x-L.x)*k/steps, py=L.y+(y-L.y)*k/steps; const gr=g.createRadialGradient(px,py,0,px,py,R); gr.addColorStop(0,"rgba(0,0,0,.55)"); gr.addColorStop(1,"rgba(0,0,0,0)"); g.fillStyle=gr; g.beginPath(); g.arc(px,py,R,0,7); g.fill(); }
  SCR.last={x,y}; if(++SCR.cnt%6===0){ try{ if(soundOn&&audio()) hit(1800+Math.random()*1400,.05,.08,"bandpass"); }catch(e){} scrubCheck(); } }
function scrubCheck(){ const {cv,g}=SCR, d=g.getImageData(0,0,cv.width,cv.height).data; let c=0,n=0; for(let i=3;i<d.length;i+=64){ n++; if(d[i]<90) c++; }
  const p=c/n; $("scrBar").style.width=Math.min(100,p/SCRUB_DONE*100)+"%";
  if(p>=SCRUB_DONE && !SCR.done){ SCR.done=true; const s=SCR.s; dusted.add(s.id); try{ if(soundOn&&audio()) hit(900,.25,.3); }catch(e){}
    $("scrub").style.transition="opacity .5s"; $("scrub").style.opacity=0; setTimeout(()=>{ closeScrub(); mode="explore"; inspect(s); },500); } }
function closeScrub(){ const el=$("scrub"); el.classList.remove("on"); el.style.opacity=""; el.style.transition=""; scrubCamStop(); if(mode==="scrub"){ mode="explore"; setPrompt(); } SCR=null; }
(function(){ const cv=$("scrCv"); let down=false;
  const pos=e=>{ const r=cv.getBoundingClientRect(); return {x:(e.clientX-r.left)/r.width*cv.width, y:(e.clientY-r.top)/r.height*cv.height}; };
  cv.addEventListener("pointerdown",e=>{ down=true; SCR&&(SCR.last=null); const p=pos(e); scrubAt(p.x,p.y); });
  cv.addEventListener("pointermove",e=>{ if(!down) return; const p=pos(e); scrubAt(p.x,p.y); });
  addEventListener("pointerup",()=>{ down=false; if(SCR) SCR.last=null; });
  $("scrX").onclick=closeScrub;
  addEventListener("keydown",e=>{ if(mode==="scrub"&&e.key==="Escape"){ e.stopImmediatePropagation(); closeScrub(); } },true);
})();
/* 카메라 손동작 — 손바닥을 좌우로 삭삭 흔들면 털린다 (공용 카메라 허브) */
let scrOn=false;
function scrLoad(src){ return new Promise((ok,no)=>{ const t=document.createElement("script"); t.src=src; t.crossOrigin="anonymous"; t.onload=ok; t.onerror=no; document.head.appendChild(t); }); }
function scrubCamStop(){ scrOn=false; $("scrCam").classList.remove("on"); $("scrCur").style.display="none"; }
CAMHUB.sub(lm=>{ const cur=$("scrCur"); if(!lm||!SCR){ cur.style.display="none"; if(SCR) SCR.last=null; return; }
  const x=1-lm[9].x, y=lm[9].y; cur.style.display="block"; cur.style.left=(x*100)+"%"; cur.style.top=(y*100)+"%"; scrubAt(x*SCR.cv.width, y*SCR.cv.height); },()=>scrOn&&!!SCR);
$("scrCamBtn").onclick=async()=>{
  const hint=$("scrHint"); hint.innerHTML="카메라 연결 중…"; const ok=await CAMHUB.start(true);
  if(!ok){ hint.innerHTML="카메라를 쓸 수 없다 — 마우스로 <b>삭삭 문질러</b> 털어내라"; return; }
  CAMHUB.bind($("scrCamV")); $("scrCam").classList.add("on");
  if(!CAMHUB.handsReady){ hint.innerHTML="손 인식을 불러오지 못했다 — 마우스로 <b>삭삭 문질러</b> 털어내라"; return; }
  hint.innerHTML="카메라 앞에서 <b>손바닥을 좌우로 삭삭</b> 흔들어라"; scrOn=true;
};

/* ---------- 용의자 보드 : 단서 정리 + 지목 ---------- */
const SB={
  margaret:{vid:"sv/margaret.mp4",img:"sus/margaret.jpg",r:"-1.2deg",clues:[],
    say:["오픈식 전에 잠깐 들렀을 뿐이에요. 벨라를 데리고요.","그 사람이 죽길 바란 적은 있죠. 하지만 독이라니, 천박하게."],mo:"남편이 죽은 뒤 회사는 그녀가 물려받아야 했다. 로크가 서류를 바꿔치기해 에덴라인을 가로챘다."},
  evelyn:{vid:"sv/evelyn.mp4",img:"sus/evelyn.jpg",r:".8deg",clues:["doll"],
    say:["저는 9시부터 식당칸에 있었어요. 차장님께 물어보세요.","그 인형이요? …그 아이는 그냥 인형이 아니에요. 다 듣고, 다 기억하죠."],mo:"AI에게 자아를 심는 연구자. 로크는 그녀의 연구를 사들인 뒤, ‘인간 전용’ 열차에 걸맞지 않다며 폐기를 통보했다."},
  magician:{vid:"sv/magician.mp4",img:"sus/magician.jpg",r:"-.6deg",clues:[],
    say:["까마귀는 오픈식 때 모든 좌석에 하나씩 놓았습니다. 그 방엔 간 적도 없어요.","Ada요? …좋은 동료였죠. 그날 그 문만 잠기지 않았어도."],mo:"5년 전 오르페우스의 정비공이었다. 그날 사고로 얼굴 왼쪽을 잃고, 가면으로 가린다."},
  elena:{img:"sus/elena.jpg",r:"1.1deg",clues:["card","bedside","statue"],mo:"9시에 와인을 가져온 전담 승무원이자, 시신의 최초 발견자.",always:true}
};
const SB_CASE=[["glass","독살"],["card","21:00 엘레나가 와인 서빙"]];
let sbMark={}, sbOut=new Set();
function sbRender(){
  const g=$("sbGrid"); g.innerHTML="";
  SUSPECTS.forEach(([id,n,r,why])=>{
    const d=SB[id]; const got=d.clues.filter(c=>found.has(c)||opened.has(c));
    const c=document.createElement("article"); c.className="sc paper"+(sbOut.has(id)?" out":"")+(confessed&&!why?" caught":""); c.style.setProperty("--r",d.r);
    const mk=sbMark[id];
    const miss=d.clues.filter(cid=>!(found.has(cid)||opened.has(cid))).length;
    let lis=d.clues.filter(cid=>found.has(cid)||opened.has(cid)).map(cid=>{ const s=SPOTS.find(x=>x.id===cid); return `<li><i>◆</i>${s.ev||s.title}</li>`; }).join("")+(miss?`<li class="no"><i>·</i>찾지 못한 단서 ${miss}개</li>`:"");
    if(d.say) lis+=d.say.map(t=>`<li class="say"><i>“</i>진술 · ${t}</li>`).join("");
    if(id==="elena") lis+=`<li class="${BROKEN.size?"ctr":"no"}"><i>${BROKEN.size===3?"✓":"?"}</i>진술 모순 ${BROKEN.size} / ${STATE.length}</li>`;
    const known=d.always||got.length>0;
    const out=sbOut.has(id), done=confessed;
    c.innerHTML=`<div class="ph" style="--pbg:${({margaret:"#5d5d5d",evelyn:"#6a6a6a",magician:"#646464",elena:"#5f5f5f"})[id]||"#606060"}"><i class="pi" style="background-image:url(${d.img})"></i>${d.vid?`<button class="play">라운지 목격</button>`:""}${mk?`<span class="mk ${mk==="sus"?"sus":""}">${mk==="sus"?"의심":"보류"}</span>`:""}</div>
      <div class="nm">${n}</div><div class="rl">${r}</div>
      <button class="history" type="button">행적 정리 보기 ›</button>
      <div class="row"><button data-m="sus" class="${mk==="sus"?"on":""}">의심</button><button data-m="hold" class="${mk==="hold"?"on":""}">보류</button></div>
      <button class="acc" ${out||done?"disabled":""}>${done&&!why?"범인 확정":out?"혐의 없음":done?"—":"이 사람을 지목한다"}</button>
      <div class="st">${!why&&done?"범인":"혐의 없음"}</div>`;
    c.querySelectorAll(".row button").forEach(b=>b.onclick=()=>{ sbMark[id]=sbMark[id]===b.dataset.m?null:b.dataset.m; paper(); sbRender(); });
    c.querySelector(".history").onclick=()=>{
      $("sbDetailName").textContent=n==="???"?"전직 마술사":n;
      $("sbDetailRole").textContent=r;
      $("sbDetailSummary").textContent=out?why:known?d.mo:"아직 이 사람에 대한 단서가 없다.";
      $("sbDetailClues").innerHTML=lis||"<li>확인된 단서가 없다.</li>";
      const vb=$("sbDetailVideo"); vb.hidden=!d.vid; vb.onclick=()=>{ closeSbDetail(); sbPlay(d.vid,n==="???"?"전직 마술사":n,d.say||[]); };
      $("sbDetail").hidden=false; $("sbDetailX").focus({preventScroll:true});
    };
    c.querySelector(".acc").onclick=()=>sbAccuse(id,n,why);
    const pb=c.querySelector(".play"); if(pb) pb.onclick=e=>{ e.stopPropagation(); sbPlay(d.vid, n==="???"?"전직 마술사":n, d.say||[]); };
     g.appendChild(c);
  });
  $("sbCase").innerHTML="<b>사건 개요</b>"+SB_CASE.map(([id,t])=>`<span class="${found.has(id)?"":"no"}">${found.has(id)?t:"???"}</span>`).join("");
}
function sbMsg(html){ $("sbMsgT").innerHTML=html; $("sbMsg").classList.add("on"); $("sbMsgOk").focus({preventScroll:true}); }
$("sbMsgOk").onclick=()=>$("sbMsg").classList.remove("on");
function sbAccuse(id,n,why){ if(accLeft<=0) return; openDeduction(id); }

/* 용의자 라운지 목격 영상 — 진술을 자막으로 */
let sbVT=[];
function sbPlay(src,who,lines){ const w=$("sbVid"), v=$("sbVidV"), c=$("sbVidCap"); sbVT.forEach(clearTimeout); sbVT=[];
  $("sbVidWho").textContent="LOUNGE · "+who; c.classList.remove("show"); w.classList.add("on");
  v.src=src; v.currentTime=0; v.muted=!soundOn; v.volume=.65; v.play().catch(()=>{ v.muted=true; v.play().catch(()=>{}); });
  lines.forEach((t,i)=>{ sbVT.push(setTimeout(()=>{ c.innerHTML=sentBr("“"+t+"”"); c.classList.add("show"); },400+i*2400)); sbVT.push(setTimeout(()=>c.classList.remove("show"),400+i*2400+2200)); });
  v.onended=()=>setTimeout(sbVidClose,600); v.onerror=sbVidClose; }
function sbVidClose(){ const v=$("sbVidV"); v.pause(); sbVT.forEach(clearTimeout); $("sbVid").classList.remove("on"); }
$("sbVidX").onclick=sbVidClose; $("sbVid").onclick=e=>{ if(e.target.id==="sbVid") sbVidClose(); };
/* 처음 용의자 보드를 열 때 — 라운지에서 수첩에 적어 둔 기억 */
let sbSeen=false;
function openBoard(){ if(mode==="title"||mode==="intro"||mode==="end") return; try{ if($("book").classList.contains("open")) closeBook(); }catch(e){}   /* 수첩이 열려 있으면 먼저 닫는다(수첩이 용의자 화면을 덮는 문제 방지) */ lifeRender(); $("sbDed").classList.remove("on"); sbVidClose();
  if(mode==="talk") closeTalk(); if(mode==="inspect") closeInspect(); closeBook();
  mode="board"; sbRender(); $("sBoard").classList.add("open"); $("prompt").classList.remove("show");
  ["tabScene","tabBook","tabTalk","tabAcc"].forEach(t=>$(t).setAttribute("aria-selected",false)); $("tabSus").setAttribute("aria-selected",true);
  setTimeout(()=>$("sbClose").focus({preventScroll:true}),50);
  sbSeen=true; }   // 체험 시간 단축: 처음 열 때 라운지 영상 자동 재생은 뺐다 (카드의 ▶ 버튼으로 볼 수 있음)
 function closeBoard(){ sbVidClose(); $("sbDetail").hidden=true; $("sBoard").classList.remove("open"); $("sbMsg").classList.remove("on"); $("tabSus").setAttribute("aria-selected",false);
  if(mode==="board"){ mode="explore"; $("tabScene").setAttribute("aria-selected",true); setPrompt(); } }
$("sbClose").onclick=closeBoard; $("tabSus").onclick=openBoard;
{ let rt=0; const refit=()=>{ clearTimeout(rt); rt=setTimeout(()=>{ if($("book").classList.contains("open")) fitPages(); if($("sBoard").classList.contains("open")) sbRender(); },120); };
  addEventListener("resize",refit); document.fonts&&document.fonts.ready.then(refit); }
$("tabAcc").onclick=()=>{ if(BROKEN.size===3 && !confessed) openBoard(); };
 addEventListener("keydown",e=>{ if(mode!=="board") return; if(e.key==="Escape"){ e.stopImmediatePropagation(); if($("sbVid").classList.contains("on")) sbVidClose(); else if(!$("sbDetail").hidden) $("sbDetail").hidden=true; else if($("sbMsg").classList.contains("on")) $("sbMsg").classList.remove("on"); else if($("sbDed").classList.contains("on")) $("sbDed").classList.remove("on"); else closeBoard(); } },true);

/* ---------- 추리 완성(빈칸 채우기) + 지목 기회 ---------- */
const ACC_MAX=3; let accLeft=ACC_MAX;
const DED={
  who:{label:"누가",opts:()=>SUSPECTS.map(([id,n])=>({v:id,t:n==="???"?"마술사":n}))},
  how:{label:"무엇으로",ans:"pill",opts:()=>[{v:"pill",t:"약병의 수면제 가루"},{v:"card",t:"마술 카드 트릭"},{v:"window",t:"창문으로 들어온 침입자"},{v:"shawl",t:"숄에 숨긴 독침"}]},
  when:{label:"언제",ans:"2141",opts:()=>[{v:"2100",t:"21:00 첫 와인을 가져왔을 때"},{v:"2141",t:"21:41 한 잔 더 따를 때"},{v:"2147",t:"21:47 로크가 쓰러질 때"},{v:"2230",t:"22:30 턴다운 서비스 때"}]},
  proof:{label:"결정적 증거",ans:["doll","statue"],opts:()=>EVID.filter(e=>found.has(e.id)&&!e.herring).map(e=>({v:e.id,t:e.ev}))}
};
let ded={}, dedAct=null;
function lifeRender(){ $("sbLife").innerHTML="지목 기회 "+Array.from({length:ACC_MAX},(_,i)=>`<i class="${i<accLeft?"":"used"}"></i>`).join(""); }
function dedLine(){
  const b=(k)=>{ const o=DED[k].opts().find(x=>x.v===ded[k]); return `<span class="bl ${o?"":"empty"} ${dedAct===k?"act":""}" data-k="${k}">${o?o.t:DED[k].label}</span>`; };
  $("dedLn").innerHTML=`범인은 ${b("who")}이다.<br>${b("how")}(으)로, ${b("when")} 로크를 독살했다.<br>그 증거는 ${b("proof")}이다.`;
  $("dedLn").querySelectorAll(".bl").forEach(el=>el.onclick=()=>{ dedAct=el.dataset.k; dedLine(); dedChoices(); });
  const full=["who","how","when","proof"].every(k=>ded[k]); $("dedGo").disabled=!full;
  $("dedNote").textContent=full?"틀리면 지목 기회가 하나 줄어든다.":"빈칸을 눌러 채워라.";
}
function dedChoices(){
  const c=$("dedCh"); if(!dedAct){ c.innerHTML=""; return; }
  const os=DED[dedAct].opts();
  c.innerHTML=os.length?"":`<small>아직 모은 증거가 없다.</small>`;
  os.forEach(o=>{ const b=document.createElement("button"); b.textContent=o.t; if(dedAct==="who") b.classList.add(o.v==="elena"?"hl":"lo"); b.onclick=()=>{ ded[dedAct]=o.v; paper();
    const order=["who","how","when","proof"]; dedAct=order.find(k=>!ded[k])||null; dedLine(); dedChoices(); }; c.appendChild(b); });
}
function openDeduction(who){ ded={who,how:"pill"}; dedAct="when"; $("sbDed").classList.add("on"); dedLine(); dedChoices(); }
$("dedBack").onclick=()=>$("sbDed").classList.remove("on");
$("dedGo").onclick=()=>{
  const sus=SUSPECTS.find(s=>s[0]===ded.who), why=sus[3], n=sus[1]==="???"?"마술사":sus[1];
  $("sbDed").classList.remove("on");
  if(why){ return accMiss(`<b style="color:var(--brass)">${n}</b> — 아니다.<br>${why}`, ()=>{ sbOut.add(ded.who); sbMark[ded.who]=null; }); }
  if(BROKEN.size<3){ try{ if(soundOn&&audio()) hit(260,.25,.18); }catch(e){}
    return sbMsg(`추리는 <b style="color:var(--brass)">엘레나 보로딘</b>을 가리킨다.<br>하지만 그녀의 진술이 아직 무너지지 않았다. (모순 ${BROKEN.size}/3)<br><span style="color:#b8a98c;font-size:.9em">이대로 들이밀면 발뺌할 것이다. 심문에서 진술부터 무너뜨려라.</span>`); }
  const ok={how:ded.how===DED.how.ans, when:ded.when===DED.when.ans, proof:DED.proof.ans.includes(ded.proof)};
  const nOk=Object.values(ok).filter(Boolean).length;
  if(nOk<3){ const miss=Object.keys(ok).filter(k=>!ok[k]).map(k=>DED[k].label).join(", ");
    return accMiss(`엘레나가 차갑게 웃는다.<br>“증거도 없이 사람을 몰아세우시네요.”<br><span style="color:#b8a98c;font-size:.9em">범인은 맞았다. 하지만 추리의 근거가 틀렸다. (${nOk}/3 · 다시 볼 것: ${miss})</span>`); }
  closeBoard(); openTalk(); setTimeout(confess,60);
};
function accMiss(html,before){
  accLeft--; try{ if(soundOn&&audio()) hit(160,.4,.3); }catch(e){} before&&before(); sbRender(); lifeRender();
  if(accLeft<=0) return setTimeout(badEnd,300);
  sbMsg(html+`<br><br><span style="color:#d65a5a;font-size:.9em">남은 지목 기회 ${accLeft}</span>`);
}
function badEnd(){ closeBoard(); vidStop&&vidStop(); talkEl.hidden=true; mode="end"; ambStop();
  const d=document.createElement("section"); d.className="badend";
  d.innerHTML=`<div class="case">CASE UNSOLVED · ORPHEUS EXPRESS R.R.</div><h2>열차는 다음 역에 멈췄다</h2>
    <p>세 번의 지목은 모두 빗나갔다. 승객들은 하나둘 플랫폼으로 내렸고, 엘레나 보로딘도 그 사이에 섞여 사라졌다.<br>Ada의 이름은, 이번에도 사고 기록 속에 묻혔다.</p>
    <div class="row" style="display:flex;gap:10px"><button class="enter" id="badAgain">처음으로 돌아가기</button></div>`;
  stage.appendChild(d); $("badAgain").onclick=()=>location.reload(); }

/* ================= 프롤로그 : 초대장 → 회상 → VIP실 =================
   원본 오르페우스(Joljak_S1 → 봉투 → 찢기 → 명부 → 회중시계 → 회상)를 480p로 옮겨 온 부분.
 */
/* 자막은 영어 한 줄 + 한국어 한 줄(줄바꿈 \n은 영어와 한국어 사이에만 둔다) */
const STORY_CAPS=[[.2,"He killed my wife. I boarded this train for revenge.\n그는 내 아내를 죽였다. 나는 복수하려고 이 열차에 올랐다.",null,3000],
  /* 아래 시각(초)은 영상 컷에 맞춘 것: 3.7~5.5 창에 비친 손 · 5.5~7.4 그림자·아내(자막 없음) · 7.5~ 객실의 주인공 · 13 일어남 · 14.1 복도 · 15.4 문 손잡이 */
  [3.75,"“Is anyone there? Please — save me!”\n거기 누구 없어요? 제발 살려주세요.","red",1700],
  [7.6,"The moment I boarded, a scream echoed through the train.\n열차에 오르자, 비명소리가 들렸다.",null,2100],
  [9.9,"That voice, begging for help…\n도움을 청하던 그 목소리…",null,1700],
  [11.8,"…belonged to the one who killed my wife.\n내 아내를 죽인, 바로 그 사람의 것이었다.","red",2200],
  [14.2,"Locke is behind that door.\n로크는 저 문 뒤에 있다.",null,2100]];
const PRO={ intro:"pro/intro_fast.mp4" };
const PRO_ON=true;              // 프롤로그(초대장·회상) 켜기/끄기 — 지금은 VIP실만 보기용으로 꺼 둠
const PRO_TEAR_PX=230;            // 짧은 드래그 한 번으로 찢기 완료
(function(){
  const pro=$("pro"), pv=$("proVid"), cap=$("proCap"), black=$("proBlack");
  if(!pro) return;
  if(!PRO_ON){ pro.hidden=true; $("title").classList.add("gone"); setTimeout(()=>enterExplore(),60); return; }   // 프롤로그 끔 → 바로 방 조사
  /* 테스트: 주소 끝에 #room 을 붙여 열면 프롤로그·문 열기 없이 조사 화면(VIP실)부터 */
  const ROOM_ONLY=false;  // true면 열자마자 VIP실 (조사 화면만 테스트할 때). 지금은 처음부터 전체 진행
  /* 테스트: 주소 끝에 #end 를 붙이면 엔딩 영상부터(영상을 누르면 바로 엔딩 화면), #endscreen 은 영상 없이 엔딩 화면 연출만 */
  if(location.hash==="#end"||location.hash==="#endscreen"){ pro.hidden=true; $("title").classList.add("gone"); const only=location.hash==="#endscreen";
    setTimeout(()=>{ enterExplore(); setTimeout(()=>{ ending(); if(only) setTimeout(()=>{ const v=$("endVid"); v.onclick&&v.onclick(); },150); },900); },60); return; }
  if((ROOM_ONLY&&location.hash!=="#tear")||location.hash==="#room"){ pro.hidden=true; $("title").classList.add("gone"); setTimeout(()=>enterExplore(),60); return; }
  /* ---- 테스트 바로가기 (#test 로 열면 메뉴) ----
     #cold 21:47 오프닝 · #tear 초대장 찢기 · #bottle 약병 · #statue 조각상·먼지 · #doll 의자 밑 인형 · #talk 엘레나 심문 · #ending 엔딩 */
  const TESTS=[["","타이틀 화면","탑승권 버튼 · 불빛·먼지 연출"],["#cold","21:47 오프닝","플립 시계 → 인트로"],["#tear","초대장 찢기","당기는 힘·바스락·종이 낙엽"],["#bottle","약병","실사 갈색병 · 돌리면 알약이 굴러감"],["#statue","조각상 · 테이블 먼지","들어 올리기 무게감 · 먼지"],["#doll","의자 밑 인형","붉은 눈 → 기억 재생 → 21:47 쿵"],["#door","VIP실 문 열기","손잡이를 아래로 끌어 연다"],["#press","추궁","진술 1에서 바로 '더 추궁한다'"],["#talk","엘레나 심문","증거 3개 모두 가진 상태"],["#ending","엔딩","CASE CLOSED → 21:48 → 질문"]];
  const goTest=h=>{ location.hash=h||""; location.reload(); };
  if(location.hash==="#test"){ const m=document.createElement("div"); m.className="testmenu";
    m.innerHTML=`<div class="tm-in"><small>BEYOND THE ORPHEUS · 테스트 바로가기</small><h3>어디부터 볼까요?</h3>${TESTS.map(([h,t,d],i)=>`<button data-h="${h}"><b>${i+1}</b><span>${t}<em>${d}</em></span></button>`).join("")}<p>보던 화면에서 <kbd>\`</kbd> 키를 누르면 이 메뉴로 돌아와요</p></div>`;
    document.body.appendChild(m); m.querySelectorAll("button").forEach(b=>b.onclick=()=>goTest(b.dataset.h)); }
  addEventListener("keydown",e=>{ if(e.key==="`"&&!/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) goTest("#test"); });
  if(location.hash==="#cold"){ setTimeout(()=>$("proStart").click(),400); }
  if(location.hash==="#door"){ setTimeout(()=>{ show(""); finish(); },300); }
  if(location.hash==="#story"){ $("title").classList.add("gone"); addEventListener("pointerdown",()=>dip(()=>clip("pro/story_cut.mp4",STORY_CAPS,finish),180),{once:true}); }   // 테스트: 화면을 한 번 누르면 열차 회상 영상(자막 확인용)
  if(location.hash==="#press"){ pro.hidden=true; $("title").classList.add("gone"); setTimeout(()=>{ enterExplore(); EVID.forEach(e=>found.add(e.id)); warmTalk(); setTimeout(()=>{ talkEl.dataset.met=1; openTalk(); },900); },60); return; }   // 테스트: 심문 진술 1 + 추궁 선택지부터
  if(location.hash==="#talk"||location.hash==="#ending"||location.hash==="#statue"||location.hash==="#doll"){ pro.hidden=true; $("title").classList.add("gone");
    setTimeout(()=>{ enterExplore(); const h=location.hash;
      if(h==="#talk"){ EVID.forEach(e=>found.add(e.id)); warmTalk(); setTimeout(openTalk,900); }
      if(h==="#ending"){ confessed=true; setTimeout(ending,500); }
      if(h==="#statue"){ setTimeout(()=>{ const s=SPOTS.find(x=>x.id==="statue"); if(s) inspect(s); },400); }
      if(h==="#doll"){ opened.add("doll"); setTimeout(()=>{ const s=SPOTS.find(x=>x.id==="doll"); if(s) inspect(s); },700); } },60); return; }
  /* 테스트: 주소 끝에 #bottle 을 붙이면 바로 협탁 약병을 집어 든 화면 (알약 물리 확인용) */
  if(location.hash==="#bottle"){ pro.hidden=true; $("title").classList.add("gone"); setTimeout(()=>{ enterExplore(); setTimeout(()=>{ const s=SPOTS.find(x=>x.id==="bedside"); if(s) inspect(s); },400); },60); return; }
  let done=false, tok=0;
  const scenes=[...pro.querySelectorAll(".ps")];
  const show=name=>{ scenes.forEach(s=>s.classList.toggle("on",s.dataset.s===name)); };
  const dip=(fn,hold=380)=>{ black.classList.add("on"); setTimeout(()=>{ fn(); setTimeout(()=>black.classList.remove("on"),hold); },720); };
  const sfx=(f,v,d,t)=>{ try{ if(soundOn&&audio()) hit(f,v,d,t); }catch(e){} };
  /* 소리 있는 자동재생이 막히면(브라우저 정책) 음소거로라도 재생 */
  function proPlay(v){ v.muted=!soundOn; v.volume=.65; return v.play().catch(e=>{ if(e&&e.name==="NotAllowedError"){ v.muted=true; return v.play(); } throw e; }); }
   function clip(src,caps,onEnd,cutAt,rate,from){
    const my=++tok; show(""); cap.className="vcap"; cap.textContent="";
    pv.style.display="block";
    $("proVideoSkip").hidden=false;
    /* 자막은 타이머가 아니라 영상의 실제 재생 위치를 따라간다(로딩으로 영상이 늦어져도 그림과 어긋나지 않게) */
    let fin=false, wd=0, capI=-1, capRaf=0;
    const capTick=()=>{ if(fin||my!==tok) return; const t=pv.currentTime; let k=-1; for(let i=0;i<caps.length;i++){ if(t>=caps[i][0]&&t<caps[i][0]+(caps[i][3]||3200)/1000) k=i; }
      if(k!==capI){ capI=k; if(k<0) cap.classList.remove("show"); else{ cap.innerHTML=sentBr(caps[k][1]); cap.className="vcap show"+(caps[k][2]?" "+caps[k][2]:""); } }
      capRaf=requestAnimationFrame(capTick); };
    const end=()=>{ if(fin||my!==tok) return; fin=true; clearTimeout(wd); cancelAnimationFrame(capRaf); cap.classList.remove("show"); pv.onended=pv.onerror=pv.onclick=pv.ontimeupdate=null; pv.pause(); $("proVideoSkip").hidden=true; onEnd&&onEnd(); };
    /* 멈춤 감시: 재생 위치가 10초 동안 전혀 안 움직이면(로딩 멈춤) 다음으로 넘어감 */
    const arm=()=>{ clearTimeout(wd); wd=setTimeout(end,10000); };
     pv.onended=end; pv.onerror=end; pv.ontimeupdate=()=>{ arm(); if(cutAt&&pv.currentTime>=cutAt) end(); };
     pv.src=src; pv.load(); try{ pv.currentTime=0; }catch(e){} if(from) pv.addEventListener("loadedmetadata",()=>{ try{ pv.currentTime=from; }catch(e){} },{once:true}); arm();
     pv.playbackRate=rate||1; proPlay(pv).catch(end); if(caps&&caps.length) capRaf=requestAnimationFrame(capTick);
  }
  const hideVid=()=>{ tok++; pv.pause(); pv.onended=pv.onerror=pv.onclick=pv.ontimeupdate=null; pv.style.display="none"; cap.classList.remove("show"); $("proVideoSkip").hidden=true; };
  function lines(box,step,after){
    const ls=[...box.querySelectorAll(".nl")]; ls.forEach(l=>l.classList.remove("show"));
    ls.forEach((l,i)=>setTimeout(()=>{ if(!done) l.classList.add("show"); },500+i*step));
    setTimeout(()=>{ if(!done) after(); },500+ls.length*step);
  }
  const reveal=b=>{ b.style.transition="opacity 1s"; b.style.opacity=1; b.style.pointerEvents="auto"; };

  /* 0-a. 콜드 오픈 — 검은 화면에 열차 소리만 2.8초, 시각 "21:47"이 떠오른 뒤 인트로로 컷 */
  function coldOpen(next){
    SFX("horn",.5);
    const c=$("proCold"); c.classList.add("on"); const tv=$("titleTrainV"); try{ tv.pause(); }catch(e){}
    let stopN=()=>{};
    try{ if(soundOn){ const ra=new Audio("sfx/rumble.mp3"); ra.volume=.55; ra.play().catch(()=>{}); stopN=()=>{ try{ ra.pause(); }catch(e){} }; setTimeout(()=>{ try{ ra.pause(); }catch(e){} },2900); }   // 실제 열차 진동 녹음 (아래는 예전 합성 저음, 쓰지 않음)
      else if(false&&soundOn&&audio()){ const a=ac, len=a.sampleRate*3, buf=a.createBuffer(1,len,a.sampleRate), d=buf.getChannelData(0);
        for(let i=0;i<len;i++) d[i]=Math.random()*2-1;
        const src=a.createBufferSource(); src.buffer=buf; const lp=a.createBiquadFilter(); lp.type="lowpass"; lp.frequency.value=170; const g=a.createGain();
        g.gain.setValueAtTime(0,a.currentTime); g.gain.linearRampToValueAtTime(.7,a.currentTime+.5); g.gain.linearRampToValueAtTime(.0,a.currentTime+2.9);
        src.connect(lp); lp.connect(g); g.connect(sfxBus||a.destination); src.start(); stopN=()=>{ try{ src.stop(); }catch(e){} };
        [.3,.62,1.2,1.52,2.1,2.42,3.0,3.32].forEach(t=>setTimeout(()=>sfx(70,.18,.12),t*1000)); } }catch(e){}
    /* 플립 시계 v2: 공항 출발판처럼 각 자리 판이 '촥촥촥' 넘어가며 돌다가, 앞자리부터 하나씩 21:47에 멈춘다.
       판 하나 = 위·아래 반쪽. 넘어갈 때 윗반쪽이 앞으로 꺾여 내려가고, 새 숫자의 아랫반쪽이 따라 내려와 덮는다 */
    const T=$("coldT"), L=$("coldL"), digs=[...T.querySelectorAll(".fl")], TARGET="2147";
    digs.forEach(f=>{ if(!f.querySelector(".ft")) f.innerHTML='<span class="h t"><b></b></span><span class="h b"><b></b></span><span class="h ft"><b></b></span><span class="h fb"><b></b></span>'; });
    const put=(f,sel,v)=>f.querySelector(sel+" b").textContent=v;
    const flip=(i,from,to,last)=>{ const f=digs[i]; put(f,".t",to); put(f,".b",from); put(f,".ft",from); put(f,".fb",to);
      f.classList.remove("go"); void f.offsetWidth; f.classList.add("go"); setTimeout(()=>put(f,".b",to),70);
      sfx(last?2400:3400+Math.random()*800,last?.05:.022,last?.03:.012,"highpass"); if(last) sfx(150,.07,.05); };
    T.classList.remove("lock"); L.textContent=""; c.classList.remove("jolt");
    const START=[1,9,5,2]; digs.forEach((f,i)=>{ put(f,".t",START[i]); put(f,".b",START[i]); f.classList.remove("go"); });
    digs.forEach((f,i)=>{ const n=7+i*3, tgt=+TARGET[i], step=78, t0=550+i*110;   // 앞자리부터 차례로 멈춤
      const seq=[START[i]]; for(let k=n-1;k>=0;k--) seq.push(((tgt-k)%10+10)%10);
      for(let k=1;k<seq.length;k++) setTimeout(()=>flip(i,seq[k-1],seq[k],k===seq.length-1),t0+k*step); });
    setTimeout(()=>{ T.classList.add("lock"); c.classList.add("jolt"); sfx(1500,.09,.03,"bandpass"); sfx(85,.25,.22); },550+3*110+16*78+120);   // 21:47 철컥 — 묵직하게 멈춤
    const LINE="그날 밤, 오르페우스는 멈추지 않았다."; let k=0;   // 한 글자씩 타자 치듯
    setTimeout(function ty(){ if(k>LINE.length) return; L.textContent=LINE.slice(0,k++); if(k%3===0) sfx(2600,.012,.02,"highpass"); setTimeout(ty,42); },2500);
    setTimeout(()=>{ c.classList.add("out"); setTimeout(()=>{ c.classList.remove("on","out","jolt"); stopN(); },450); next(); },4200);
  }
  /* 0. 시작 버튼 → 콜드 오픈 → 인트로 영상 */
  $("proStart").onclick=()=>{ if($("proStart").disabled) return; $("proStart").disabled=true;
    try{ audio(); ac&&ac.resume(); }catch(e){}
    $("proStart").classList.add("punched"); try{ $("proStart").closest(".title-content").classList.add("leaving"); }catch(e){}   /* 버튼이 눌렸다 빛나며 사라지는 동안 로고·문구도 위로 흐려진다 */ SFX("lock",.6); setTimeout(()=>SFX("flip",.3),140);   // 표를 뜯는 소리
    setTimeout(()=>{
    // 웹캠은 여기서 켜지 않는다: 초대장이 나온 뒤 '카메라로 체험'을 눌러 허락해야 켜진다
    camBox.classList.add("on"); camOff.style.display="flex"; camOff.textContent="CAMERA OFF"; camTag.textContent="";   // 웹캠 자리는 처음부터 보이게(영상 속 로고 가림). 카메라는 허락 뒤에만 켜진다
    { const pre=document.createElement("video"); pre.preload="auto"; pre.muted=true; pre.src=PRO.intro; window.__introPre=pre; }   // 시계 장면 동안 인트로를 미리 받아 둠
    coldOpen(()=>clip(PRO.intro,null,()=>{ show("hand"); CAMHUB.allowHands(); },0,1,.9));   // 영상 앞 0.9초는 거의 검은 화면이라 건너뜀
    },560); };
  /* 1. 영상 마지막 — 손에 든 봉투 */
  const hand=$("proHand"), hz=$("proHit");
  hz.onmouseenter=()=>{ hand.classList.add("hover"); SFX("rustle",.3); }; hz.onmouseleave=()=>hand.classList.remove("hover");
  hz.onclick=()=>dip(()=>{ hideVid(); show("env"); setTimeout(()=>$("proEnv").onclick.call($("proEnv")),250); });   // 봉투를 받으면 바로 검문 창
  /* 2. 봉투 개봉 */
  $("proEnv").onclick=function(){ if(this.classList.contains("opening")) return;
    this.classList.add("opening","noanim"); sfx(900,.25,.12,"bandpass"); try{ paper(); }catch(e){}   // 봉투는 열지 않고 바로 검문 창
    // 봉투가 열리면 그 장면을 흐리게 깔고, 그 위에 생체 검문 창이 바로 뜬다
    setTimeout(()=>{ const sc=this.closest(".ps"), box=document.querySelector(".pro .consent"); if(!sc||!box) return;
       sc.classList.add("behind"); sc.appendChild(box); requestAnimationFrame(()=>requestAnimationFrame(()=>box.classList.add("in"))); },60); };
  /* 3. 찢기 (원본 P3 로직 — 마우스 드래그 버전) */
  const Lp=[[0,0,0],[0,100,100],[6,96,100],[13,100,100],[22,95,100],[30,99,100],[41,94,100],[52,100,100],[63,95,100],[71,99,100],[82,94,100],[91,99,100],[100,96,100],[100,0,0]];
  const Rp=[[0,4,0],[0,100,100],[100,100,100],[100,4,0],[91,0,0],[82,5,0],[71,0,0],[63,4,0],[52,0,0],[41,5,0],[30,1,0],[22,4,0],[13,0,0],[6,3,0]];
  const BAND=28, ASYM=.82+Math.random()*.36, L=$("proL"), R=$("proR");
  const poly=(pts,t)=>{ const fy=-BAND+t*(100+2*BAND); return pts.map(([y,j,f])=>{ const k=Math.max(0,Math.min(1,(fy-y+BAND)/BAND)); return (f+(j-f)*k).toFixed(2)+"% "+y+"%"; }).join(","); };
  /* ---- 찢기 v2 : 캔버스로 진짜 종이처럼 ----
     들쭉날쭉한 찢긴 결 + 겉장이 먼저 찢긴 쪽에 드러나는 하얀 섬유 + 찢어진 끝에서부터 V자로 벌어짐
     + 덜컥덜컥 끊기며 진행 + 찢는 속도만큼 나는 바스락 소리 + 다 찢기면 두 조각이 떨어져 나감 */
  let tear=0, goal=0, torn=false, drag=false, lx=0, open=0, fallT=-1, fallT0=0, tipFlash=0, dirty=true, landed=false;
   const FALL_T=1.5;   // 찢은 조각이 책상에 내려앉는 시간(초) — 종이는 공기를 타고 천천히
  const card=$("proCard"), tcv=document.createElement("canvas"); tcv.className="tearcv"; card.insertBefore(tcv,$("proTCur"));
  const tctx=tcv.getContext("2d"), pimg=new Image(); let pready=false;
  pimg.onload=()=>{ pready=true; dirty=true; }; pimg.src="pro/paperHalf.png";
  /* 찢어지는 선: 큰 굴곡 + 잔떨림. 섬유가 드러나는 쪽은 구간마다 바뀐다(실제 종이처럼) */
  const TN=180, TP=[], TSIDE=[];
  function genPath(){ TP.length=0; TSIDE.length=0;
  { const f1=Math.random()*6.28, f2=Math.random()*6.28, f3=Math.random()*6.28; let walk=0, side=Math.random()<.5?1:-1, run=0;
    for(let i=0;i<=TN;i++){ const y=i/TN; walk=walk*.7+(Math.random()-.5)*.009; if(Math.random()<.05) walk+=(Math.random()-.5)*.022;
      TP.push([.5+.024*Math.sin(y*5.2+f1)+.011*Math.sin(y*14.5+f2)+.005*Math.sin(y*37+f3)+walk, y]);
      if(--run<=0){ side=-side; run=12+(Math.random()*30|0); } TSIDE.push(side); } } }
  genPath();
  let HW=0, HH=0, HD=1, HL=null, HR=null, HF=null, TSC=null, FP=null, HLb=null, HRb=null;
  function buildHalves(W,H,d){ HW=W; HH=H; HD=d;
    const mk=()=>{ const c=document.createElement("canvas"); c.width=Math.round(W*d); c.height=Math.round(H*d); const x=c.getContext("2d"); x.scale(d,d); return [c,x]; };
    const P=TP.map(([px,py])=>[px*W,py*H]), u=W/400;
    const [cf,xf]=mk(); xf.drawImage(pimg,0,0,W,H); HF=cf;
    const half=left=>{ const [c,x]=mk(); x.save(); x.beginPath();
      x.moveTo(left?-2:W+2,-2); P.forEach(p=>x.lineTo(p[0],p[1])); x.lineTo(left?-2:W+2,H+2); x.closePath(); x.clip();
      x.drawImage(pimg,0,0,W,H);
      x.lineJoin="round"; x.beginPath(); P.forEach((p,i)=>i?x.lineTo(p[0],p[1]):x.moveTo(p[0],p[1]));
      x.strokeStyle="rgba(60,38,16,.16)"; x.lineWidth=W*.03; x.stroke();      // 찢긴 쪽 그늘
      x.strokeStyle="rgba(50,32,14,.45)"; x.lineWidth=.8; x.stroke(); x.restore(); // 종이 두께선
      const s=left?1:-1;                                                       // 섬유는 틈 쪽으로 삐져나온다
      for(let i=0;i<TN;i++){ if(TSIDE[i]!==(left?-1:1)) continue;
        const a=P[i], b=P[i+1], w1=(1+Math.random()*2.6)*u, w2=(1+Math.random()*2.6)*u;
        x.fillStyle="rgba(242,236,222,.96)"; x.beginPath(); x.moveTo(a[0],a[1]); x.lineTo(b[0],b[1]); x.lineTo(b[0]+s*w2,b[1]); x.lineTo(a[0]+s*w1,a[1]); x.closePath(); x.fill();
        if(Math.random()<.6){ const len=(1.5+Math.random()*4)*u, ang=(Math.random()-.5)*1.3;
          x.strokeStyle="rgba(240,233,218,.75)"; x.lineWidth=.5; x.beginPath(); x.moveTo(a[0]+s*w1*.8,a[1]); x.lineTo(a[0]+s*(w1+len*Math.cos(ang)),a[1]+len*Math.sin(ang)); x.stroke(); } }
      return c; };
    /* 뒷면: 같은 찢긴 모양에 빈 종이색 + 앞면 글씨가 아주 살짝 비침 */
    const back=src=>{ const [c,x]=mk(); x.setTransform(1,0,0,1,0,0); x.drawImage(src,0,0);
      x.globalCompositeOperation="source-atop"; x.fillStyle="#d6c6a3"; x.fillRect(0,0,c.width,c.height);
      x.globalAlpha=.08; x.drawImage(pimg,0,0,c.width,c.height); x.globalAlpha=1;
      const g=x.createRadialGradient(c.width/2,c.height/2,0,c.width/2,c.height/2,Math.max(c.width,c.height)*.7);
      g.addColorStop(.45,"rgba(90,60,25,0)"); g.addColorStop(1,"rgba(90,60,25,.38)"); x.fillStyle=g; x.fillRect(0,0,c.width,c.height);
      return c; };
    HL=half(true); HR=half(false); HLb=back(HL); HRb=back(HR); }
  function drawTear(now){
    const W=card.clientWidth, H=card.clientHeight; if(!W||!H||!pready) return;
    const d=Math.min(2,window.devicePixelRatio||1);
    if(Math.abs(W-HW)>.5||Math.abs(H-HH)>.5||d!==HD){ buildHalves(W,H,d); tcv.width=Math.round(W*3*d); tcv.height=Math.round(H*1.8*d); }
    const ox=W, oy=H*.4, tipY=tear*H, sp=open*W, SH=2;
    let x=tctx; x.setTransform(1,0,0,1,0,0); x.clearRect(0,0,tcv.width,tcv.height); x.setTransform(d,0,0,d,ox*d,oy*d);
    if(fallT<0 && tipY<H) x.drawImage(HF,0,tipY*d,HF.width,HF.height-tipY*d,0,tipY,W,H-tipY);   // 아직 붙어 있는 아래쪽
    /* 다 찢기면: 두 조각이 팔랑거리며 책상 위로 떨어진다.
       위에서 내려다보는 시점이라 떨어질수록 작아지고, 그림자가 종이에 붙으며, 기울 때마다 폭이 줄고 어두워진다 */
    if(fallT>=0 && !FP) FP=[0,1].map(()=>({a:Math.random()*6.28,b:Math.random()*6.28,d:Math.random()*.15,y:Math.random()*.1,r:Math.random()*.4,end:Math.PI*(Math.random()<.5?2:3)}));
    const fallOf=(dir,P)=>{ const t=Math.min(1,(now-fallT0)/1000/FALL_T), sm=t*t*(3-2*t), dec=Math.pow(1-t,1.3);
      return { t, sc:1-.22*sm,
        fx:dir*W*(.28+P.d)*sm+W*.09*Math.sin(8.2*t+P.a)*dec,          // 좌우로 흔들리며 바깥쪽으로
        fy:H*(.05+P.y)*sm+H*.03*Math.sin(5.6*t+P.b)*dec,
        rot:dir*(.3+P.r)*sm+.4*Math.sin(6.9*t+P.b)*dec,               // 빙글빙글 흔들리다 멈춤
        th:P.end*(1-Math.pow(1-t,1.8))+.35*Math.sin(9*t+P.a)*dec,     // 뒤로 넘어가며 한 바퀴 반~두 바퀴 구름 (뒷면도 보임)
        flip:1-.3*dec*(1-Math.cos(7.9*t+P.a*.3))/2 }; };             // 팔랑: 기울어 폭이 줄었다 펼쳐짐
    if(fallT>=0){ tcv.style.filter="none"; if(!TSC||TSC.width!==tcv.width||TSC.height!==tcv.height){ TSC=document.createElement("canvas"); TSC.width=tcv.width; TSC.height=tcv.height; } } else tcv.style.filter="";
    const strips=(img,dir,F)=>{ const main=x; if(F&&Math.cos(F.th)<0) img=dir<0?HLb:HRb;   // 뒤집힌 동안엔 뒷면
      if(F){ x=TSC.getContext("2d"); x.setTransform(1,0,0,1,0,0); x.clearRect(0,0,TSC.width,TSC.height); x.setTransform(d,0,0,d,ox*d,oy*d); }
      x.save();
      if(F){ const cx=W*(dir<0?.25:.75), cy=H*.5; x.translate(cx+F.fx,cy+F.fy); x.rotate(F.rot); const cy2=Math.cos(F.th); x.scale(F.sc*F.flip*(1-.18*Math.abs(Math.sin(F.th))), F.sc*(Math.abs(cy2)<.04?(cy2<0?-.04:.04):cy2)); x.translate(-cx,-cy); }
      for(let y=0;y<tipY;y+=SH){ const h=Math.min(SH,tipY-y), k=Math.pow(Math.max(0,tipY-y)/H,1.1), dx=dir*sp*k, dy=Math.abs(dx)*.12+dir*Math.abs(dx)*.3;
        x.drawImage(img,0,y*d,img.width,h*d,dx,y+dy,W,h+.6); }
      x.restore();
      if(F){ x.save(); x.setTransform(1,0,0,1,0,0); x.globalCompositeOperation="source-atop"; x.fillStyle=`rgba(20,12,4,${(Math.abs(Math.sin(F.th))*.45+(1-F.flip)*.4+(Math.cos(F.th)<0?.08:0)).toFixed(3)})`; x.fillRect(0,0,TSC.width,TSC.height); x.restore();
        x=main; x.save(); x.setTransform(1,0,0,1,0,0);
        x.shadowColor=`rgba(0,0,0,${(.6-.2*F.t).toFixed(3)})`; x.shadowBlur=(32*(1-F.t)+6)*d; x.shadowOffsetX=(8*(1-F.t)+1)*d*dir; x.shadowOffsetY=(24*(1-F.t)+3)*d;
        x.drawImage(TSC,0,0); x.restore(); } };
    if(fallT>=0){ animPieces(now); return; }   // 떨어지는 동안엔 3D 조각이 대신 움직임
    strips(HL,-1,null); strips(HR,1,null);
    if(fallT<0 && tear>0 && tear<1){ const p=TP[Math.min(TN,Math.round(tear*TN))], px=p[0]*W, r=W*.035;   // 찢어지는 끝: 하얗게 들뜬 자국
      const g=x.createRadialGradient(px,tipY,0,px,tipY,r); g.addColorStop(0,`rgba(250,244,230,${.45+tipFlash*.45})`); g.addColorStop(1,"rgba(250,244,230,0)");
      x.fillStyle=g; x.fillRect(px-r,tipY-r,r*2,r*2); } }
  /* ---- 다 찢긴 뒤: 두 조각을 진짜 3D로 ----
     바깥 가장자리를 축으로 찢긴 쪽이 뒤로 젖혀 넘어가고, 그대로 뒤집히며(뒷면 보임) 좌우로 팔랑거리다
     책상 쪽(화면 안쪽)으로 멀어져 내려앉는다. 앞면/뒷면 중 어느 쪽으로 떨어질지는 매번 무작위 */
  let PCS=[];
  function spawnPieces(){ PCS.forEach(p=>p.el.remove()); PCS=[];
    const W=HW, H=HH, d=HD, sp=open*W, m=.15*W;
    [[-1,HL,HLb],[1,HR,HRb]].forEach(([dir,img,bimg])=>{
      const el=document.createElement("div"); el.className="tpiece"; el.style.transformOrigin=(dir<0?"30.8%":"69.2%")+" 50%";   // 조각 자기 중심을 축으로 팔랑임
      const mkc=src=>{ const c=document.createElement("canvas"); c.width=Math.round(W*1.3*d); c.height=Math.round(H*d); const x=c.getContext("2d");
        for(let y=0;y<H;y+=2){ const h=Math.min(2,H-y), k=Math.pow(Math.max(0,H-y)/H,1.1), dx=dir*sp*k, dy=Math.abs(dx)*.12+dir*Math.abs(dx)*.3;
          x.drawImage(src,0,y*d,src.width,h*d,(dx+m)*d,(y+dy)*d,W*d,(h+.6)*d); } return c; };
      const f=mkc(img), b=mkc(bimg); b.style.display="none"; el.append(f,b); card.insertBefore(el,$("proTCur"));
      PCS.push({el,f,b,dir,a:Math.random()*6.28,bb:Math.random()*6.28,dd:Math.random()*.12,yy:Math.random()*.08,turn:Math.random()<.5?105:285,sw:.85+Math.random()*.5,r:Math.random(),flip:Math.random()<.35,back:false}); }); }
  /* 떨어지는 조각 v2 : 카드처럼 빙글빙글 도는 대신 '종이 낙엽'처럼
     ① 찢긴 순간 손에서 놓인 듯 바깥으로 살짝 벌어지고 ② 공기를 타고 좌우로 미끄러지며(진자) 미끄러지는 쪽으로 기울고
     ③ 흔들림이 점점 잦아들며 책상 쪽으로 내려앉아 납작하게 눕는다. 가끔(35%) 한 번만 뒤집혀 뒷면으로 눕는다 */
  function animPieces(now){ const W=HW, H=HH, t=Math.min(1,(now-fallT0)/1000/FALL_T);
    PCS.forEach(p=>{ const dir=p.dir;
      const pop=1-Math.pow(1-Math.min(1,t/.14),3);                           // ① 툭 벌어짐
      const fall=Math.max(0,Math.min(1,(t-.06)/.94)), fs=1-Math.pow(1-fall,1.7);   // ② 내려앉는 진행 (처음엔 빠르게, 끝엔 사뿐히)
      const damp=Math.pow(1-fall,1.2);                                       // 흔들림이 잦아듦
      const ph=p.a+fall*Math.PI*2*p.sw, sway=Math.sin(ph)*damp, lean=Math.cos(ph)*damp;
      const fx=dir*W*(.05*pop+(.14+p.dd)*fs)+W*.11*sway;                     // 좌우 진자
      const fy=H*(.03+p.yy)*fs+H*.025*Math.abs(sway);                        // 진자 끝에서 살짝 떠오르는 느낌
      const fz=-H*.72*fs;                                                    // 책상 쪽으로 멀어짐
      const flipT=p.flip?Math.max(0,Math.min(1,(fall-.18)/.55)):0, fl=flipT*flipT*(3-2*flipT);
      const rz=dir*(3*pop+(10+p.r*8)*fs)+12*lean;                            // 미끄러지는 쪽으로 기울기
      const ry=-dir*16*pop*(1-fs)+34*lean-dir*180*fl;                        // 진자에 맞춰 젖혀짐 (+ 한 번 뒤집힘)
      const rx=26*Math.sin(ph+1.3)*damp;
      const rad=ry*Math.PI/180, back=Math.cos(rad)*Math.cos(rx*Math.PI/180)<0;
      if(back!==p.back){ p.back=back; p.f.style.display=back?"none":""; p.b.style.display=back?"":"none"; }
      const sh=Math.abs(Math.sin(rad))*.8+Math.abs(Math.sin(rx*Math.PI/180))*.4, lift=1-fs;
      p.el.style.transform=`translate3d(${fx.toFixed(1)}px,${fy.toFixed(1)}px,${fz.toFixed(1)}px) rotateZ(${rz.toFixed(2)}deg) rotateY(${ry.toFixed(2)}deg) rotateX(${rx.toFixed(2)}deg)`;
      p.el.style.filter=`brightness(${(1-.4*Math.min(1,sh)).toFixed(3)}) drop-shadow(0 ${(22*lift+2).toFixed(1)}px ${(28*lift+4).toFixed(1)}px rgba(0,0,0,${(.5-.12*fs).toFixed(2)}))`; }); }
  /* 찢는 소리: 끊김 없이 흐르는 잡음을 찢는 속도에 맞춰 크게/작게 */
  let tsnd=null;
  function tearSndStart(){ try{ if(tsnd||!soundOn||!audio()) return; SFX("tear",.4);
    { const a=new Audio("sfx/tearloop.mp3"); a.loop=true; a.volume=0; try{ a.currentTime=Math.random()*5; }catch(e){} a.play().catch(()=>{}); tsnd={a}; return; }   // 실제 종이 찢는 녹음을 찢는 속도에 맞춰 크게/작게 (아래는 예전 합성음, 쓰지 않음)
    ac.resume&&ac.resume();
    const n=ac.createBuffer(1,ac.sampleRate*2,ac.sampleRate), dd=n.getChannelData(0); let b=0;
    for(let i=0;i<dd.length;i++){ b=b*.55+(Math.random()*2-1)*.45; dd[i]=Math.random()<.025?(Math.random()*2-1):b*.55; }
    const s=ac.createBufferSource(); s.buffer=n; s.loop=true;
    const hp=ac.createBiquadFilter(); hp.type="highpass"; hp.frequency.value=900;
    const pk=ac.createBiquadFilter(); pk.type="peaking"; pk.frequency.value=3200; pk.gain.value=2;
    const g=ac.createGain(); g.gain.value=0; s.connect(hp); hp.connect(pk); pk.connect(g); g.connect(sfxBus||ac.destination); s.start(); tsnd={s,g}; }catch(e){} }
  function tearSnd(v){ if(tsnd) try{ if(tsnd.a){ tsnd.a.volume=Math.max(0,Math.min(1,v*45)); return; } tsnd.g.gain.setTargetAtTime(v,ac.currentTime,.015); }catch(e){} }
  function tearSndStop(){ if(!tsnd) return; const t=tsnd; tsnd=null; if(t.a){ try{ t.a.pause(); }catch(e){} return; } try{ t.g.gain.setTargetAtTime(0,ac.currentTime,.05); }catch(e){} setTimeout(()=>{ try{ t.s.stop(); }catch(e){} },400); }
  /* ---- 찢기 v4 : 당기는 힘 vs 종이 저항 ----
     드래그 '속도'가 당기는 힘(pull). 찢어지는 끝의 저항보다 세게 당겨야 찢어진다.
     첫 찢김은 뻑뻑하고, 중간중간 질긴 섬유 매듭이 있어서 버티다가 '툭' 하고 터진다.
     소리는 쉬익 하는 잡음 대신 섬유가 하나하나 끊기는 '바스락' 알갱이(crackle)로, 찢는 속도만큼 촘촘해진다.
     두 쪽은 손으로 찢을 때처럼 한쪽은 위로, 한쪽은 아래로 어긋나고, 카드는 당기는 쪽으로 살짝 기운다 */
  let pull=0, lastMv=0, pdir=1, tiltV=0, RES=[], RESkey=null, strain=0, snapCD=0;
  function genRes(){ RESkey=TP[0]; RES=[]; for(let i=0;i<=TN;i++) RES.push(.16+Math.random()*.06);
    for(let i=0;i<=8;i++) RES[i]=Math.max(RES[i],.62-i*.05);                       // 첫 찢김: 제일 뻑뻑
    const knots=5+(Math.random()*4|0);
    for(let n=0;n<knots;n++){ const c=14+(Math.random()*(TN-28)|0), w=2+(Math.random()*4|0), h=.22+Math.random()*.3;   // 질긴 섬유 매듭
      for(let j=-w;j<=w;j++){ const i=c+j; if(i>=0&&i<=TN) RES[i]=Math.max(RES[i],.18+h*(1-Math.abs(j)/(w+1))); } } }
  const resAt=t=>RES[Math.min(TN,Math.max(0,Math.round(t*TN)))]||.2;
  function setTear(v){ if(torn) return; goal=Math.max(goal,Math.min(1,v)); if(goal>=.96) goal=1; if(goal>0) tearSndStart(); }
  /* 섬유가 끊기는 소리: 아주 짧은 잡음 알갱이를 무작위 높이·타이밍으로 흩뿌린다 */
  let CRK=null;
  function crackle(n,vol){ return;   /* 합성 잡음 알갱이는 끔: 실제 찢는 녹음(tearloop)이 대신한다 */
    try{ if(!soundOn||!audio()||n<1) return;
    if(!CRK){ CRK=ac.createBuffer(1,Math.round(ac.sampleRate*.02),ac.sampleRate); const d=CRK.getChannelData(0); for(let i=0;i<d.length;i++) d[i]=(Math.random()*2-1)*Math.pow(1-i/d.length,2.5); }
    const t0=ac.currentTime;
    for(let i=0;i<n;i++){ const s=ac.createBufferSource(); s.buffer=CRK; s.playbackRate.value=.6+Math.random()*1.4;
      const f=ac.createBiquadFilter(); f.type="bandpass"; f.frequency.value=1800+Math.random()*4500; f.Q.value=.8+Math.random()*1.5;
      const g=ac.createGain(); g.gain.value=vol*(.3+Math.random()*.9);
      s.connect(f); f.connect(g); g.connect(sfxBus||ac.destination); s.start(t0+Math.random()*.035); } }catch(e){} }
  /* 찢어지는 끝에서 종이 섬유 부스러기가 튄다 */
  function fibers(n,big){ const W=card.clientWidth,H=card.clientHeight, p=TP[Math.min(TN,Math.round(tear*TN))]; if(!p||!W) return; const px=p[0]*W, py=tear*H;
    for(let i=0;i<n;i++){ const f=document.createElement("i"), s=1+Math.random()*(big?2.6:1.6), a=Math.random()*6.28, d=8+Math.random()*(big?44:22);
      Object.assign(f.style,{position:"absolute",left:px+"px",top:py+"px",width:(s*(Math.random()<.5?3.2:1))+"px",height:s+"px",background:"rgba(244,237,222,.95)",borderRadius:"1px",pointerEvents:"none",zIndex:6});
      card.appendChild(f);
      f.animate([{transform:`translate(-50%,-50%) rotate(${a}rad)`,opacity:1},{transform:`translate(calc(-50% + ${(Math.cos(a)*d).toFixed(1)}px),calc(-50% + ${(Math.sin(a)*d*.5+16+Math.random()*34).toFixed(1)}px)) rotate(${(a+Math.random()*5).toFixed(2)}rad)`,opacity:0}],
        {duration:450+Math.random()*550,easing:"cubic-bezier(.2,.7,.4,1)"}).onfinish=()=>f.remove(); } }
  /* 매듭이 터지는 순간: 바스락 뭉치 + 카드가 움찔 + (폰이면) 진동 + 섬유가 튐 */
  function snap(power){ tipFlash=1; dirty=true;
    crackle(6+Math.round(power*8),.035); sfx(240+Math.random()*120,.008+power*.012,.05);
    try{ card.animate([{translate:"0 0"},{translate:`${((Math.random()-.5)*power*6).toFixed(1)}px ${(power*3).toFixed(1)}px`},{translate:"0 0"}],{duration:110+power*70,easing:"ease-out"}); }catch(e){}
    try{ navigator.vibrate&&navigator.vibrate(Math.round(6+power*18)); }catch(e){}
    fibers(2+Math.round(power*7),power>.5); }
  let looping=true;
  function tloop(){
    looping=true; const now=performance.now();
    if(!torn){
      if(RESkey!==TP[0]) genRes();
      if(now-lastMv>60) pull*=.82;  if(!drag) pull*=.7;                    // 손을 멈추거나 놓으면 장력이 빠진다
      const r=resAt(tear);
      if(pull>r && goal<1){ goal=Math.min(1,goal+(pull-r)*.022);
        if(r>.3 && resAt(goal+.01)<r-.04 && now>snapCD){ goal=Math.min(1,goal+.02+pull*.03); snap(Math.min(1,pull)); snapCD=now+90; } }   // 매듭이 터지면 확 찢김
      strain=pull>0?Math.min(1,pull/Math.max(r,.01)):0;
      const before=tear;
      if(goal>tear+.0005 && Math.random()<.92){ tear+=Math.min(goal-tear,.008+Math.random()*Math.random()*.05); tipFlash=Math.max(tipFlash,.6); }
      tipFlash*=.85;
      const v=tear-before;
      const tgt=.22*tear+.05*Math.min(1,pull)*Math.min(1,tear*6+.3);        // 당기는 만큼 벌어지고, 놓으면 살짝 되돌아감
      if(Math.abs(open-tgt)>.0003){ open+=(tgt-open)*(tgt>open?.3:.12); dirty=true; }
      if(v>0){ dirty=true; $("proBar").style.width=tear*100+"%"; tearSnd(Math.min(.018,v*2.2)); crackle(Math.min(6,Math.round(v*260+Math.random())),.03); if(Math.random()<v*40) fibers(1,false); } else tearSnd(0);
      if(drag && strain>.7 && strain<1 && Math.random()<.25){ try{ card.animate([{translate:"0 0"},{translate:`${((Math.random()-.5)*1.4).toFixed(2)}px 0`},{translate:"0 0"}],{duration:60}); }catch(e){} }   // 버티는 동안 미세하게 떨림
      const tilt=drag?pdir*Math.min(1,pull)*1.6*(1-tear*.5):0; tiltV+=(tilt-tiltV)*.15;   // 당기는 쪽으로 카드가 살짝 기욺
      if(Math.abs(tiltV)>.01) card.style.rotate=tiltV.toFixed(2)+"deg"; else if(card.style.rotate) card.style.rotate="";
      if(tipFlash>.02) dirty=true;
      if(tear>=.995){ tear=1; torn=true; dirty=true; tiltV=0; card.style.rotate=""; finishTear(); }
    } else if(fallT>=0) dirty=true;
    if(dirty && onScene("tear")){ drawTear(now); dirty=false; }
    if(fallT>=0 && !landed && now-fallT0>FALL_T*960){ landed=true; sfx(420,.07,.09); setTimeout(()=>sfx(360,.05,.08),90); }   // 책상에 내려앉는 소리
    if(fallT>=0 && now-fallT0>FALL_T*1000+150){ looping=false; return; }
    requestAnimationFrame(tloop); }
  requestAnimationFrame(tloop);
  function finishTear(){ SFX("tear2",.55); tearSndStop();
    setTimeout(()=>{ spawnPieces(); fallT0=performance.now(); fallT=0; dirty=true; },40);
     setTimeout(()=>{ if(tearTest){ resetTear(); return; }
       dip(()=>clip("pro/story_cut.mp4",STORY_CAPS,finish),180);
     },FALL_T*1000+80); }
  card.addEventListener("pointerdown",e=>{ drag=true; lx=e.clientX; lastMv=performance.now(); try{ card.setPointerCapture(e.pointerId); }catch(_){} });
  window.addEventListener("pointermove",e=>{ if(!drag||torn) return; const now=performance.now(), dt=Math.max(8,now-lastMv), dxs=e.clientX-lx, dx=Math.abs(dxs);
    lx=e.clientX; lastMv=now; if(dx>1) pdir=Math.sign(dxs); const sp=dx/dt;                 // 드래그 속도(px/ms) = 당기는 힘
    pull=Math.max(pull*.6,Math.min(1.6,pull*.55+sp*.55)); if(pull>.05) tearSndStart(); });
  window.addEventListener("pointerup",()=>{ drag=false; });
  /* ---- 테스트: 종이 찢기만 반복 ----
     주소 끝에 #tear 를 붙여 열거나, 프롤로그 중 T 키. 다 찢으면 새 초대장이 다시 나온다(찢긴 결도 매번 달라짐) */
  let tearTest=false;
  function resetTear(){ PCS.forEach(p=>p.el.remove()); PCS=[]; genPath(); HW=0; FP=null; landed=false; tear=0; goal=0; torn=false; drag=false; open=0; fallT=-1; tipFlash=0; dirty=true; $("proBar").style.width="0%"; if(!looping) requestAnimationFrame(tloop); }
  function startTearTest(){ tearTest=true; done=false; hideVid(); resetTear(); show("tear");
    $("proTearHint").innerHTML='초대장을 <b>좌우로 드래그</b>해 찢으세요 <span style="opacity:.5">· 찢기 테스트 — 다 찢으면 새 초대장이 나옵니다</span>'; }
  if(location.hash==="#tear") startTearTest();
  addEventListener("keydown",e=>{ if(typeof TEST_SKIP!=="undefined"&&!TEST_SKIP) return;
    if(e.key.toLowerCase()==="t"&&!e.repeat&&!pro.hidden&&!/^(INPUT|TEXTAREA)$/.test(e.target.tagName)) startTearTest(); });
  let handOn=false;

  /* 2-1. 생체 검문 — 웹캠은 시작 버튼을 누르는 순간부터 켜져 있고(영상 오른쪽 아래의 제미나이 로고를 가린다),
     손 인식은 공용 카메라 허브(CAMHUB)가 한다. 실패하거나 거부하면 마우스로 진행 */
  const camBox=$("proCam"), camV=$("proCamV"), camOff=$("proCamOff"), camTag=$("proCamTag"), hTag=$("proHTag");
  let hx=.5, hy=.5;
  const PRO_TEAR_TOL=.42;          // 손 마크가 가운데 선에서 카드 너비의 이 비율 안이면 찢기 진행
   const camFine=document.querySelector(".pro .consent .fine");
   const camError=e=>{
     if(!window.isSecureContext) return "현재 화면이 카메라 사용이 가능한 보안 페이지로 인식되지 않습니다. HTTPS 또는 localhost에서 열어주세요.";
     if(!navigator.mediaDevices?.getUserMedia) return "현재 브라우저가 카메라 기능을 제공하지 않습니다. Chrome 또는 Edge에서 이 주소를 직접 열어주세요.";
     if((document.permissionsPolicy||document.featurePolicy)?.allowsFeature?.("camera")===false) return "이 미리보기 화면에서 카메라가 차단됐습니다. 사이트 주소를 브라우저에서 직접 열어주세요.";
     if(e?.name==="NotAllowedError"||e?.name==="PermissionDeniedError") return "카메라 권한이 거부됐거나 현재 미리보기에서 차단됐습니다. Chrome 또는 Edge 주소창에서 이 주소를 직접 열고 카메라를 허용해주세요.";
     if(e?.name==="NotFoundError") return "연결된 카메라를 찾지 못했습니다. 장치 연결을 확인해주세요.";
     if(e?.name==="NotReadableError") return "다른 앱에서 카메라를 사용 중입니다. 그 앱을 닫고 다시 눌러주세요.";
     if(e?.name==="SecurityError") return "이 미리보기 화면에서 카메라가 차단됐습니다. 브라우저에서 사이트 주소를 직접 열어주세요.";
     if(e?.message==="timeout") return "브라우저가 카메라 요청에 응답하지 않습니다. Chrome 또는 Edge에서 이 주소를 직접 열어주세요.";
     return "카메라 연결에 실패했습니다. 다시 시도하거나 마우스로 계속할 수 있습니다.";
   };
  CAMHUB.bind(camV);
  /* 웹캠 창을 영상(854x480) 화면의 오른쪽 아래 모서리에 붙여, 영상 속 제미나이 로고(우하단)를 항상 가린다 */
  const placeCam=()=>{ const w=pro.clientWidth,h=pro.clientHeight; if(!w||!h) return; const k=Math.min(w/854,h/480), vw=854*k, vh=480*k, ox=(w-vw)/2, oy=(h-vh)/2;
    pro.style.setProperty("--cw",(vw*.17).toFixed(1)+"px"); pro.style.setProperty("--cr",(ox+vw*.006).toFixed(1)+"px"); pro.style.setProperty("--cb",(oy+vh*.012).toFixed(1)+"px"); };
  try{ new ResizeObserver(placeCam).observe(pro); }catch(e){} placeCam();
  const handScene=()=>onScene("tear")||doorWait;
  const setH=t=>{ hTag.textContent=handScene()?t:""; };
  function camOn(){ camBox.classList.add("on"); camTag.textContent="● REC"; }
  function stopCam(){ camBox.classList.remove("on"); }   // 화면에서만 숨긴다. 카메라는 조사 화면에서 계속 쓴다
  CAMHUB.onState(st=>{
    if(st==="connecting"){ camOff.style.display="flex"; camOff.textContent="CONNECTING…"; }
    else if(st==="cam"){ camOff.style.display="none"; setH("손 인식 준비 중…"); }
    else if(st==="hands"){ camOff.style.display="none"; handOn=true; setH("손바닥을 카메라에 보여주세요"); }
    else if(st==="nohands"){ handOn=false; camOff.style.display="none"; setH("손 인식 로딩 실패 · 마우스로 진행"); }
    else if(st==="nocam"){ handOn=false; camOff.style.display="flex"; camOff.textContent="CAMERA OFF"; hTag.textContent=""; }
    else { handOn=false; } });
  function denied(msg){ CAMHUB.stop(); camBox.classList.add("on"); camOff.style.display="flex"; camOff.textContent="CAMERA OFF"; camTag.textContent=""; hTag.textContent="";
    $("proTearHint").innerHTML=msg; dip(()=>show("tear"),200); }
  $("proDeny").onclick=()=>denied('초대장을 <b>좌우로 드래그</b>해 찢으세요');
  let camConnecting=false;
  $("proAllow").onclick=async()=>{
    if(camConnecting) return; camConnecting=true; $("proAllow").disabled=true;
    camFine.textContent="카메라 연결을 확인하는 중…"; camFine.classList.remove("error");
    camOn(); const ok=await CAMHUB.start(true);
    if(!ok){ camOff.style.display="flex"; camOff.textContent="CAMERA OFF";
      camFine.textContent=camError(CAMHUB.err)+` [${CAMHUB.err?.name||CAMHUB.err?.message||"unknown"}]`; camFine.classList.add("error"); camConnecting=false; $("proAllow").disabled=false; return; }
    if(!handOn){ camFine.textContent="손 인식을 불러오지 못했습니다. 마우스로 진행할 수 있습니다."; camFine.classList.add("error"); }
    $("proTearHint").innerHTML=handOn?'손바닥을 보여주고 편지 <b>가운데 선을 따라 아래로</b> 내리세요<br><span style="opacity:.6">마우스로 좌우 드래그해도 됩니다</span>':'손 인식 실패 — 초대장을 <b>좌우로 드래그</b>해 찢으세요';
    camConnecting=false; $("proAllow").disabled=false; dip(()=>show("tear"),200);
  };
  const onScene=n=>{ const e=pro.querySelector('.ps[data-s="'+n+'"]'); return e&&e.classList.contains("on"); };
  CAMHUB.sub(lm=>onHands(lm),()=>!pro.hidden);
  function onHands(lm){
    setH(lm?"✋ 손 감지":"손 미감지 — 손바닥을 보여주세요");
    const tc=$("proTCur");
     if(!lm){ tc.style.display="none"; window.__proDoorPush?.(null); return; }
    const p=lm[9]; hx=1-p.x; hy=p.y; if(window.__proDoorPush) window.__proDoorPush(lm);
    /* 찢기: 손 마크가 가운데 선 근처에서 내려간 만큼 찢어진다 */
    if(onScene("tear")&&!torn){ const r=$("proCard").getBoundingClientRect(); const cx=hx*r.width, cy=hy*r.height;
      tc.style.display="block"; tc.style.left=cx+"px"; tc.style.top=cy+"px";
      const on=Math.abs(cx-r.width/2)<r.width*PRO_TEAR_TOL; tc.classList.toggle("online",on);
      if(on) setTear(Math.max(tear,Math.min(1,cy/r.height)/.55)); } else tc.style.display="none";
  }
  /* 7. VIP실 문 앞 — 영상 마지막 장면에서 "문을 연다" (클릭 / 카메라 앞으로 손 밀기) */
  let doorWait=false, doorBase=null, doorHold=0;
  /* 문 열기: 손잡이를 잡은 첫 장면에서, 아래로 끌어 내리는 만큼 손잡이가 돌고 문이 열린다 (문 여는 영상이 손을 따라감).
     중간에 놓으면 문이 다시 스르륵 닫히고, 끝까지 내리면 '철컥' 걸쇠가 풀리며 문이 활짝 열려 방 안으로 들어간다 */
  const OPEN_T=1.85, DS={p:0,tp:0,drag:false,y0:0,base:0,latch:false,crk:false,raf:0,lt:0};
  function finish(){ if(done) return; done=true; doorWait=true; doorBase=null; doorHold=0;
    $("title").classList.add("gone");
    hideVid(); const pv=$("proVid"); pv.onended=pv.onerror=pv.ontimeupdate=null; pv.src=INTRO_VIDEO; pv.muted=true; pv.style.display="block"; pv.pause(); try{ pv.currentTime=0; }catch(e){}
    Object.assign(DS,{p:0,tp:0,drag:false,latch:false,crk:false});
    const cam=handOn; $("proDoorPm").hidden=!cam; if(cam) camBox.classList.add("on");
    $("proDoorHint").innerHTML=cam?"손을 들어 손잡이를 잡고, <b>아래로 내려</b> 문을 열어라":"손잡이를 잡고 <b>아래로 끌어</b> 문을 열어라";
    pro.classList.add("doorgrab","doorvid"); $("proDoor").classList.add("on"); cancelAnimationFrame(DS.raf); DS.raf=requestAnimationFrame(doorTick); }
  function doorTick(){ if(!doorWait) return; const pv=$("proVid");
    if(!DS.drag&&DS.tp<.97) DS.tp=Math.max(0,DS.tp-.03);                              // 놓으면 문이 다시 닫힘
    DS.p+=(DS.tp-DS.p)*.2; if(Math.abs(DS.tp-DS.p)<.001) DS.p=DS.tp;
    const t=DS.p*OPEN_T; if(!pv.seeking&&Math.abs(pv.currentTime-t)>.02) try{ pv.currentTime=t; }catch(e){}
    $("proDoor").style.opacity=String(Math.max(0,1-DS.p*3));
    if(DS.p>.42&&!DS.latch){ DS.latch=true; SFX("lock",.5); }   // 걸쇠 '철컥'
    if(DS.p<.3) DS.latch=false;
    if(DS.p>.62&&!DS.crk){ DS.crk=true; try{ creak&&creak(); }catch(e){} }
    if(DS.p>.96){ openDoor(); return; }
    DS.raf=requestAnimationFrame(doorTick); }
  pro.addEventListener("pointerdown",e=>{ if(!doorWait||e.target.closest("button")) return; DS.drag=true; DS.y0=e.clientY; DS.base=DS.tp; pro.classList.add("grip"); });
  addEventListener("pointermove",e=>{ if(!DS.drag||!doorWait) return; DS.tp=Math.max(0,Math.min(1,DS.base+(e.clientY-DS.y0)/(pro.clientHeight*.38))); });
  addEventListener("pointerup",()=>{ DS.drag=false; pro.classList.remove("grip"); });
  addEventListener("keydown",e=>{ if(!doorWait) return; if(e.key==="ArrowDown"||e.key===" "||e.key.toLowerCase()==="f"){ e.preventDefault(); DS.drag=true; DS.tp=Math.min(1,DS.tp+.08); clearTimeout(DS.kt); DS.kt=setTimeout(()=>DS.drag=false,260); } });
   function openDoor(){ if(!doorWait) return; doorWait=false; cancelAnimationFrame(DS.raf); $("proDoor").classList.remove("on"); $("proDoor").style.opacity=""; pro.classList.remove("doorgrab","grip"); stopCam();
     if(!DS.crk) try{ creak&&creak(); }catch(e){}
     $("door").classList.add("open");
     const pv=$("proVid"); let fin=false; const end=()=>{ if(fin) return; fin=true; pv.onended=null; hideVid(); pro.classList.remove("doorvid");
       ["door","title"].forEach(id=>{ const el=$(id); el.style.transition="none"; el.classList.add(id==="door"?"open":"gone"); });   // 영상으로 이미 문을 열었으니 옛 '문을 연다' 판은 바로 사라지게
       pro.hidden=true; enterExplore(); };
     pv.onended=end; pv.onerror=end; pv.muted=!soundOn; pv.volume=.65; pv.play().catch(()=>{ pv.muted=true; pv.play().catch(end); }); setTimeout(()=>{ if(!fin&&pv.paused) end(); },7000); }
  $("proDoorBtn").onclick=openDoor;
   /* 카메라: 손을 들어 올린 가장 높은 곳이 '손잡이를 잡은 위치'. 거기서 손을 아래로 내리는 만큼 손잡이가 내려가고 문이 열린다.
      손이 화면에서 사라지면 손잡이를 놓은 것 → 문이 다시 닫힌다 */
   window.__proDoorPush=lm=>{ if(!doorWait) return;
     if(!lm){ DS.hy0=null; if(DS.cam){ DS.cam=false; DS.drag=false; } $("proDoorBar").style.width="0%"; return; }
     const y=lm[9].y; if(DS.hy0==null||y<DS.hy0) DS.hy0=y;
     const p=Math.max(0,Math.min(1,(y-DS.hy0)/.3)); DS.cam=true; DS.drag=true; DS.tp=p; $("proDoorBar").style.width=(p*100)+"%";
     if(p>=1){ if(++doorHold>1) openDoor(); } else doorHold=0; };
})();
