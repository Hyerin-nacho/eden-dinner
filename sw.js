/* 오르페우스 오프라인·저속망 대비 캐시 (서비스 워커)
   - 한 번 받은 영상·소리·3D·이미지·폰트·라이브러리는 이 PC 브라우저에 저장하고, 다음부터는 인터넷 없이 바로 꺼내 쓴다.
   - 코드(html/js/css)는 네트워크를 2.5초만 기다리고 늦으면 저장본을 쓴다 → 와이파이가 나빠도 멈추지 않는다.
   - 파일을 바꿔 올렸는데 저장본이 낡아 보이면 아래 VER 숫자를 올린다(전부 새로 받는다). */
const VER="v5", CACHE="orpheus-"+VER;
const HOSTS=["cdn.jsdelivr.net","cdnjs.cloudflare.com","fonts.googleapis.com","fonts.gstatic.com"];
const CODE=/\.(?:html|js|css)(?:\?|$)|\/$/;
self.addEventListener("install",e=>{ self.skipWaiting(); });
self.addEventListener("activate",e=>{ e.waitUntil((async()=>{ for(const k of await caches.keys()){ if(k.startsWith("orpheus-")&&k!==CACHE) await caches.delete(k); } await self.clients.claim(); })()); });
async function ranged(req,res){   /* 영상·소리는 Range 요청으로 오므로, 저장본에서 잘라 206으로 돌려준다 */
  const m=/bytes=(\d*)-(\d*)/.exec(req.headers.get("range")||""); if(!m||!res||res.status!==200) return res;
  const buf=await res.arrayBuffer(), n=buf.byteLength; let s=m[1]===""?Math.max(0,n-parseInt(m[2],10)):parseInt(m[1],10), e=m[1]===""||m[2]===""?n-1:Math.min(n-1,parseInt(m[2],10));
  if(s>e||s>=n) return new Response(null,{status:416,headers:{"Content-Range":"bytes */"+n}});
  return new Response(buf.slice(s,e+1),{status:206,headers:{"Content-Type":res.headers.get("Content-Type")||"application/octet-stream","Content-Range":`bytes ${s}-${e}/${n}`,"Content-Length":String(e-s+1),"Accept-Ranges":"bytes"}}); }
async function put(req,res){ try{ if(res&&(res.status===200||res.type==="opaque")&&!req.headers.get("range")){ const c=await caches.open(CACHE); await c.put(req,res.clone()); } }catch(e){} return res; }
self.addEventListener("fetch",ev=>{
  const req=ev.request; if(req.method!=="GET") return; const u=new URL(req.url);
  if(u.origin!==location.origin&&!HOSTS.includes(u.hostname)) return;
  if(u.pathname.endsWith("/sw.js")) return;
  ev.respondWith((async()=>{
    const c=await caches.open(CACHE), hit=await c.match(req,{ignoreVary:true});
    const code=u.origin===location.origin&&(req.mode==="navigate"||CODE.test(u.pathname+u.search));
    if(code){   /* 코드: 네트워크 먼저(2.5초), 늦거나 실패하면 저장본 */
      try{ const net=fetch(req).then(r=>put(req,r)); net.catch(()=>{}); if(!hit) return await net;
        return await Promise.race([net,new Promise((_,rej)=>setTimeout(()=>rej(0),2500))]); }
      catch(e){ if(hit) return hit; try{ return await fetch(req); }catch(e2){ return Response.error(); } } }
    if(hit) return await ranged(req,hit);   /* 영상·소리·3D·이미지·폰트·라이브러리: 저장본 먼저 */
    try{ const r=await fetch(req); if(req.headers.get("range")) return r; return await put(req,r); }catch(e){ return Response.error(); }
  })()); });
