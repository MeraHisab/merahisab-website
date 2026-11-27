
/* MeraHisab Service Worker | Final Master 2.0.0 */
'use strict';
const VERSION = '2.0.0';
const PREFIX = 'merahisab-pwa-';
const STATIC = PREFIX + 'static-' + VERSION;
const PAGES = PREFIX + 'pages-' + VERSION;
const ACTIVE = [STATIC, PAGES];
const ORIGIN = self.location.origin;
const OFFLINE = '/offline.html';
const MAX_BYTES = 5 * 1024 * 1024;
const LANGUAGE = ['/language.css','/language.js','/language-content.js','/language-integration.js'];
const CORE = [OFFLINE,'/upgrade.css','/upgrade.js'];
const PUBLIC = new Set(['/','/index.html','/merahisab.html','/royal-khata.html','/downloads.html','/compare.html','/tools.html','/privacy.html','/about.html','/404.html',OFFLINE]);
const ASSETS = new Set(['/upgrade.css','/upgrade.js','/security.js','/pwa.css','/pwa.js','/manifest.json','/merahisab-dashboard.png',...LANGUAGE,'/icons/icon-192.png','/icons/icon-512.png','/icons/maskable-192.png','/icons/maskable-512.png','/icons/shortcut-merahisab.png','/icons/shortcut-royal-khata.png','/icons/shortcut-tools.png','/icons/shortcut-downloads.png']);
const OPTIONAL = [...PUBLIC,...ASSETS].filter(p=>!CORE.includes(p));
const urlFor = p=>new URL(p,ORIGIN).href;
const group = p=>PUBLIC.has(p)?PAGES:STATIC;
let queue = Promise.resolve();
function serial(fn){const job=queue.then(fn,fn);queue=job.catch(()=>{});return job;}
function approved(request){
  if(request.method!=='GET'||request.headers.has('authorization')||request.headers.has('range')||request.cache==='no-store'||/no-store/i.test(request.headers.get('cache-control')||''))return null;
  const u=new URL(request.url);
  if(u.origin!==ORIGIN||u.search||u.hash||u.username||u.password)return null;
  if(request.mode==='navigate')return PUBLIC.has(u.pathname)?u.pathname:null;
  return ASSETS.has(u.pathname)?u.pathname:null;
}
function validType(path,value){
  const mime=(value||'').split(';')[0].trim().toLowerCase();
  if(PUBLIC.has(path))return mime==='text/html';
  if(path.endsWith('.css'))return mime==='text/css';
  if(path.endsWith('.js'))return ['text/javascript','application/javascript','application/x-javascript'].includes(mime);
  if(path.endsWith('.json'))return ['application/json','application/manifest+json','text/json'].includes(mime);
  if(path.endsWith('.png'))return mime==='image/png';
  return false;
}
async function withinLimit(response){
  const length=response.headers.get('content-length');
  if(length!==null&&(!/^\d+$/.test(length)||Number(length)>MAX_BYTES))return false;
  if(!response.body)return false;
  const reader=response.clone().body.getReader();
  let size=0,timer;
  try{
    return await Promise.race([(async()=>{while(true){const {done,value}=await reader.read();if(done)return size>0;size+=value.byteLength;if(size>MAX_BYTES)return false;}})(),new Promise(resolve=>{timer=setTimeout(()=>resolve(false),8000);})]);
  }catch{return false;}finally{clearTimeout(timer);reader.cancel().catch(()=>{});}
}
async function cacheable(path,response){
  if(!response||response.status!==200||response.redirected||response.type==='opaque'||response.type==='opaqueredirect')return false;
  if(response.url&&response.url!==urlFor(path))return false;
  if(/(?:^|,)\s*(?:private|no-store|no-cache|must-revalidate)(?:\s*[=,]|\s*$)/i.test(response.headers.get('cache-control')||''))return false;
  if(response.headers.has('content-range')||response.headers.has('set-cookie')||response.headers.get('vary')?.trim()==='*')return false;
  return validType(path,response.headers.get('content-type'))&&await withinLimit(response);
}
async function read(path){try{return await (await caches.open(group(path))).match(urlFor(path));}catch{return undefined;}}
async function write(path,response){
  if(!await cacheable(path,response))return false;
  await (await caches.open(group(path))).put(urlFor(path),response.clone());
  return true;
}
async function fetchTimed(input,options={},ms=8000){
  const controller=new AbortController();const timer=setTimeout(()=>controller.abort(),ms);
  try{return await fetch(input,{...options,signal:controller.signal});}finally{clearTimeout(timer);}
}
async function populate(path){
  try{const r=await fetchTimed(urlFor(path),{cache:'reload',credentials:'omit',redirect:'error'});return await write(path,r);}catch{return false;}
}
async function populateList(paths){
  const failed=[];
  for(let i=0;i<paths.length;i+=6){const batch=paths.slice(i,i+6);const results=await Promise.all(batch.map(populate));batch.forEach((p,j)=>{if(!results[j])failed.push(p);});}
  return failed;
}
self.addEventListener('install',event=>{
  event.waitUntil(serial(async()=>{
    const failed=await populateList(CORE);
    if(failed.length)throw new Error('Essential offline resources unavailable');
    await populateList(OPTIONAL);
  }));
});
self.addEventListener('activate',event=>{
  event.waitUntil(serial(async()=>{
    for(const name of await caches.keys()){
      if(/^merahisab-pwa-(?:static|pages)-[0-9A-Za-z._-]+$/.test(name)&&!ACTIVE.includes(name))await caches.delete(name);
    }
    await self.clients.claim();
  }));
});
async function offlineResponse(path){
  const cached=await read(path);if(cached)return cached;
  const fallback=await read(OFFLINE);if(fallback)return fallback;
  return new Response('MeraHisab is offline. Reconnect and reload.',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8','Cache-Control':'no-store'}});
}
async function navigate(request,path){
  try{
    const response=await fetchTimed(request);
    if(response.status>=500){const cached=await read(path);return cached||response;}
    if(response.status===200)try{await serial(()=>write(path,response));}catch{}
    return response;
  }catch{return offlineResponse(path);}
}
async function staticResource(request,path){
  const cached=await read(path);if(cached)return cached;
  const response=await fetchTimed(request);
  try{await serial(()=>write(path,response));}catch{}
  return response;
}
self.addEventListener('fetch',event=>{
  const path=approved(event.request);if(!path)return;
  event.respondWith(event.request.mode==='navigate'?navigate(event.request,path):staticResource(event.request,path));
});
async function languageStatus(){
  const resources=await Promise.all(LANGUAGE.map(async path=>({path,cached:!!await read(path)})));
  const cachedResources=resources.filter(r=>r.cached).length;
  return {languages:['en','hi'],totalResources:LANGUAGE.length,cachedResources,offlineReady:cachedResources===LANGUAGE.length,resources};
}
async function cacheStatus(){
  const result=[];
  for(const name of ACTIVE){if(await caches.has(name)){const c=await caches.open(name);result.push({name,entries:(await c.keys()).length});}}
  return {version:VERSION,caches:result,totalEntries:result.reduce((n,c)=>n+c.entries,0),language:await languageStatus()};
}
async function clearOptional(){
  for(const name of ACTIVE){if(!await caches.has(name))continue;const cache=await caches.open(name);for(const key of await cache.keys()){
    const path=new URL(key.url).pathname;
    if(!CORE.includes(path))await cache.delete(key);
  }}
}
function trusted(source){try{return !!source&&typeof source.url==='string'&&new URL(source.url).origin===ORIGIN;}catch{return false;}}
function reply(event,message){try{const target=event.ports?.[0]||event.source;target?.postMessage(message);}catch{}}
self.addEventListener('message',event=>{
  if(!trusted(event.source)||typeof event.data?.type!=='string')return;
  event.waitUntil((async()=>{
    try{
      const command=event.data.type;
      if(command==='SKIP_WAITING'){await self.skipWaiting();reply(event,{type:'UPDATE_ACTIVATION_REQUESTED',success:true,version:VERSION});return;}
      if(command==='GET_VERSION'){reply(event,{type:'SW_VERSION',success:true,version:VERSION});return;}
      const response=await serial(async()=>{
        switch(command){
          case 'GET_CACHE_STATUS':return {type:'CACHE_STATUS',success:true,data:await cacheStatus()};
          case 'GET_LANGUAGE_CACHE_STATUS':return {type:'LANGUAGE_CACHE_STATUS',success:true,data:await languageStatus()};
          case 'REFRESH_LANGUAGE_CACHE':{const failedResources=await populateList(LANGUAGE);return {type:'LANGUAGE_CACHE_REFRESHED',success:failedResources.length===0,failedResources,data:await languageStatus()};}
          case 'CLEAR_PWA_CACHE':await clearOptional();return {type:'CACHE_CLEARED',success:true,corePreserved:true};
          case 'REFRESH_OFFLINE_CACHE':{const coreFailed=await populateList(CORE);if(coreFailed.length)throw new Error('Core refresh failed');const failedResources=await populateList(OPTIONAL);return {type:'OFFLINE_CACHE_REFRESHED',success:true,partial:failedResources.length>0,failedResources,data:await cacheStatus()};}
          default:return {type:'UNKNOWN_COMMAND',success:false};
        }
      });
      reply(event,response);
    }catch{reply(event,{type:'SW_OPERATION_ERROR',success:false,message:'The requested operation could not be completed.'});}
  })());
});
