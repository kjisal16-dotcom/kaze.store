const CACHE='kaze-storez-v2';
const APP_SHELL=[
 './','./index.html','./shop.html','./product.html','./cart.html','./checkout.html',
 './wishlist.html','./about.html','./contact.html','./shipping.html','./returns.html',
 './privacy.html','./terms.html','./faq.html','./success.html','./admin.html',
 './style.css','./app.js','./manifest.webmanifest','./offline.html',
 './assets/icons/icon-192.png','./assets/icons/icon-512.png'
];
self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(APP_SHELL)).then(()=>self.skipWaiting())));
self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(keys=>Promise.all(keys.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));
self.addEventListener('fetch',e=>{
 if(e.request.method!=='GET') return;
 e.respondWith(fetch(e.request).then(r=>{
   const copy=r.clone(); caches.open(CACHE).then(c=>c.put(e.request,copy)); return r;
 }).catch(()=>caches.match(e.request).then(r=>r|| (e.request.mode==='navigate'?caches.match('./offline.html'):new Response('',{status:504})))));
});
