/* Guardado del catálogo en el teléfono.
   Página y datos: se sirve lo guardado al instante y se revalida en segundo plano (si cambió, se avisa a la página).
   Fotos: lo guardado manda; la dirección lleva ?v= con la versión de la ficha, así una foto cambiada baja de nuevo. */
var C = "cat-v1", IMG = "cat-img-v1", MAX_IMG = 1500;
var changed = {};   // lo que cambio mientras la pagina aun no escuchaba: se le avisa cuando saluda (mensaje "prime")

self.addEventListener("install", function () { self.skipWaiting(); });
self.addEventListener("activate", function (e) { e.waitUntil(self.clients.claim()); });

function key(url) { var u = new URL(url); u.search = ""; u.hash = ""; return u.href; }

function revalidate(k) {
  return caches.open(C).then(function (c) {
    return c.match(k).then(function (old) {
      return fetch(k, { cache: "no-cache" }).then(function (res) {
        if (!res.ok || res.redirected) return res;
        var a = old && old.headers.get("etag"), b = res.headers.get("etag");
        return c.put(k, res.clone()).then(function () {
          if (old && (!a || a !== b)) {
            changed[k] = 1;
            return self.clients.matchAll({ includeUncontrolled: true }).then(function (cl) {
              cl.forEach(function (x) { x.postMessage({ t: "upd", url: k }); });
              return res;
            });
          }
          return res;
        });
      });
    });
  });
}

function swr(e) {
  var k = key(e.request.url);
  var net = revalidate(k);
  e.waitUntil(net.catch(function () {}));
  return caches.open(C).then(function (c) { return c.match(k); }).then(function (hit) { return hit || net; });
}

function image(req) {
  return caches.open(IMG).then(function (c) {
    return c.match(req).then(function (hit) {
      if (hit) return hit;
      return fetch(req).then(function (res) {
        if (res.ok) {
          var copy = res.clone();
          c.delete(key(req.url), { ignoreSearch: true }).then(function () { return c.put(req, copy); }).catch(function () {});
        }
        return res;
      });
    });
  });
}

self.addEventListener("fetch", function (e) {
  var r = e.request;
  if (r.method !== "GET") return;
  var u = new URL(r.url);
  if (u.origin !== location.origin || u.href.indexOf(self.registration.scope) !== 0) return;
  if (/\/sw\.js$/.test(u.pathname)) return;
  if (/\.(webp|png|jpe?g|gif|ico)$/i.test(u.pathname)) e.respondWith(image(r));
  else e.respondWith(swr(e));
});

self.addEventListener("message", function (e) {
  var d = e.data || {};
  if (d.t !== "prime") return;
  (d.urls || []).forEach(function (u) {
    var k = key(u);
    if (changed[k]) { delete changed[k]; if (e.source) e.source.postMessage({ t: "upd", url: k }); }
  });
  e.waitUntil(caches.open(C).then(function (c) {
    return Promise.all((d.urls || []).map(function (u) {
      var k = key(u);
      return c.match(k).then(function (hit) {
        if (hit) return;
        return fetch(k).then(function (res) { if (res.ok && !res.redirected) return c.put(k, res); });
      });
    }));
  }).then(function () {
    return caches.open(IMG).then(function (c) {
      return c.keys().then(function (ks) {
        if (ks.length <= MAX_IMG) return;
        return Promise.all(ks.slice(0, ks.length - MAX_IMG + 300).map(function (k) { return c.delete(k); }));
      });
    });
  }).catch(function () {}));
});
