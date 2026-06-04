/* NÓDULO PWA service worker — app shell cache para funcionar offline */
const CACHE = "nodulo-v1";
const ASSETS = [
  "./index.html",
  "./manifest.webmanifest",
  "./icon-192.png",
  "./icon-512.png"
];

// instala e guarda o app shell
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting()));
});

// limpa caches antigos ao ativar
self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

// estratégia: cache primeiro p/ os arquivos do app; rede p/ o resto (fontes, etc.)
self.addEventListener("fetch", (e) => {
  const url = new URL(e.request.url);
  // navegação (abrir o app) -> serve o index do cache, com fallback à rede
  if (e.request.mode === "navigate") {
    e.respondWith(
      caches.match("./index.html").then((r) => r || fetch(e.request))
    );
    return;
  }
  // mesmo domínio -> cache-first
  if (url.origin === location.origin) {
    e.respondWith(
      caches.match(e.request).then((r) => r || fetch(e.request).then((resp) => {
        const copy = resp.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(()=>{});
        return resp;
      }).catch(() => caches.match("./index.html")))
    );
    return;
  }
  // externo (Google Fonts etc.) -> tenta rede, cai pro cache se já tiver
  e.respondWith(
    fetch(e.request).then((resp) => {
      const copy = resp.clone();
      caches.open(CACHE).then((c) => c.put(e.request, copy)).catch(()=>{});
      return resp;
    }).catch(() => caches.match(e.request))
  );
});
