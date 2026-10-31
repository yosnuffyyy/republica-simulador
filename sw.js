/* Service worker: guarda o jogo no aparelho para abrir sem internet.
   Páginas (index.html) usam rede primeiro, para você sempre receber a versão mais nova; sem internet, usa a cópia guardada. */
const V = 'republica-v14';
const FILES = ['./', 'index.html', 'manifest.webmanifest', 'icons/icon-180.png', 'icons/icon-192.png', 'icons/icon-512.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(V).then(c => c.addAll(FILES)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(ks => Promise.all(ks.filter(k => k !== V).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  // áudio precisa de requisições parciais (Range): deixa passar direto para a rede
  if (/\.(mp3|ogg|m4a|wav|aac|opus)$/i.test(url.pathname) || req.headers.has('range')) return;
  const isPage = req.mode === 'navigate' || /(^|\/)(index\.html)?$/.test(url.pathname) || /\.html$/.test(url.pathname);
  if (isPage) {
    e.respondWith(
      fetch(req).then(res => { const copy = res.clone(); caches.open(V).then(c => c.put('index.html', copy)).catch(() => {}); return res; })
        .catch(() => caches.match('index.html'))
    );
    return;
  }
  e.respondWith(
    caches.match(req, { ignoreSearch: true }).then(hit => hit || fetch(req).then(res => {
      const copy = res.clone();
      caches.open(V).then(c => c.put(req, copy)).catch(() => {});
      return res;
    }))
  );
});
