/* DIBUJOS DE LAS TEMPORADAS (Leo 21/nov/2026: «le falta más temática»). La página (index.html, `SE`) solo lo pide cuando hay una
   temporada puesta —o cuando el equipo las mira—, así un catálogo sin temporada no carga nada de esto.
   o = OBJETOS planos en una caja de 48×48 (sin contorno; @1 y @2 = colores que elige quien lo usa; una función recibe esos colores).
   k = por temporada:  t  adorno sobre el nombre [objeto, "h" sombrero (se apoya en la esquina de arriba) | "b" insignia (centrada en ella)]
                       g  guirnalda: objetos que cuelgan, en orden (se repiten); gn cuántos por tramo (3) · gs tamaño (20) · gw color del hilo
                       s  dibujo de la portada: [objeto, x, y, tamaño, giro] en un lienzo de 200×150 pegado abajo a la derecha
   «objeto» = "nombre" o "nombre:color1:color2". Temporada nueva = su entrada en `SE` (index.html) + su entrada aquí. */
(function () {
  var star = function (cx, cy, R, r, fill) {
    for (var i = 0, d = ""; i < 10; i++) { var a = (i * 36 - 90) * Math.PI / 180, q = i % 2 ? r : R; d += (i ? "L" : "M") + (cx + q * Math.cos(a)).toFixed(1) + " " + (cy + q * Math.sin(a)).toFixed(1) }
    return '<path fill="' + fill + '" d="' + d + 'z"/>';
  };
  var pct = function (c, x, y, k) {      /* el signo % dentro de una caja de lado k con la esquina en x,y */
    return '<path stroke="' + c + '" stroke-width="' + (k * .17).toFixed(1) + '" stroke-linecap="round" fill="none" d="M' + (x + k * .14) + " " + (y + k * .9) + "L" + (x + k * .86) + " " + (y + k * .1) + '"/>' +
      '<circle fill="' + c + '" cx="' + (x + k * .18) + '" cy="' + (y + k * .2) + '" r="' + (k * .17).toFixed(1) + '"/><circle fill="' + c + '" cx="' + (x + k * .82) + '" cy="' + (y + k * .8) + '" r="' + (k * .17).toFixed(1) + '"/>';
  };
  var HEART = "M24 42S5 30.5 5 17.5A9.8 9.8 0 0 1 24 13.5 9.8 9.8 0 0 1 43 17.5C43 30.5 24 42 24 42z";
  var TREE = "M24 6l9 12h-5l8 10h-6l9 11H9l9-11h-6l8-10h-5z";
  var o = {
    /* ── sombreros y adornos del nombre ── */
    santa: '<path fill="#e11d2e" d="M6 35C8 20 15 7 26 6c9-1 15 6 16 16l-6 2c-1-6-3-9-6-9 4 6 7 13 8 20z"/><path fill="#b3121f" d="M30 15c4 6 7 13 8 20h-9c1-7 1-14 1-20z"/>' +
      '<rect fill="#fff" stroke="#d3d9e2" stroke-width="1" x="3" y="33" width="38" height="10" rx="5"/><circle fill="#fff" stroke="#d3d9e2" stroke-width="1" cx="41" cy="24" r="5.5"/>',
    party: '<path fill="@1" d="M24 5l16 37H8z"/><path fill="@2" d="M19.7 15h8.6l2.6 6H17.1zM14.5 27h19l2.6 6H11.9z"/><circle fill="@2" cx="24" cy="5" r="4.2"/><rect fill="@2" x="6" y="40" width="36" height="5" rx="2.5"/>',
    crown: '<path fill="#f5b301" d="M5 17l9 8 10-15 10 15 9-8-4 24H9z"/><path fill="#d99000" d="M8.2 36h31.6L39 41H9z"/><circle fill="#f5b301" cx="5" cy="16" r="3.2"/><circle fill="#f5b301" cx="24" cy="9" r="3.2"/><circle fill="#f5b301" cx="43" cy="16" r="3.2"/>' +
      '<circle fill="#e11d48" cx="24" cy="30" r="2.8"/><circle fill="#2563eb" cx="15" cy="31" r="2.1"/><circle fill="#2563eb" cx="33" cy="31" r="2.1"/>',
    witch: '<ellipse fill="#3b1d5e" cx="24" cy="38" rx="21" ry="6"/><path fill="#5b2d94" d="M12 37C15 24 20 12 31 5c-1 5 0 8 4 10-3 1-5 3-5 6 2 5 5 11 7 16-8 3-17 3-25 0z"/>' +
      '<path fill="#f97316" d="M13.5 32.5c7 2.5 14 2.5 21 0l1.2 3.7c-8 3-15.5 3-23.4 0z"/><rect fill="#fde047" x="21" y="31.5" width="6" height="5.5" rx="1"/>',
    gradcap: '<path fill="#475569" d="M11 24v10c0 3 6 6 13 6s13-3 13-6V24l-13 6z"/><path fill="#1e293b" d="M24 9l22 10.5L24 30 2 19.5z"/><path fill="none" stroke="#fbbf24" stroke-width="2" d="M24 19.5h16.5V31"/><circle fill="#fbbf24" cx="40.5" cy="33.5" r="3.2"/>',
    bowler: '<path fill="#334155" d="M10 34c0-12 5-22 14-22s14 10 14 22z"/><rect fill="#f59e0b" x="10" y="28.5" width="28" height="5.5"/><rect fill="#334155" x="2" y="33" width="44" height="6.5" rx="3.2"/>',
    straw: '<ellipse fill="#e2a93b" cx="24" cy="35" rx="22" ry="7.5"/><path fill="#f6d27a" d="M11 33c0-11 5-19 13-19s13 8 13 19c-8 3-18 3-26 0z"/><path fill="#e11d48" d="M11.2 29.5c8 3 17.6 3 25.6 0l.2 3.5c-8 3-18 3-26 0z"/>',
    propcap: '<path fill="#ef4444" d="M8 38c0-12 7-20 16-20v20z"/><path fill="#3b82f6" d="M40 38c0-12-7-20-16-20v20z"/><path fill="#facc15" d="M17 38c0-9 3-20 7-20s7 11 7 20z"/><rect fill="#22c55e" x="6" y="36" width="36" height="5.5" rx="2.7"/>' +
      '<rect fill="#64748b" x="23" y="9" width="2" height="9"/><path fill="#f97316" d="M24 9c-6-5-13-4-16 0 5 3 11 3 16 0zM24 9c6 5 13 4 16 0-5-3-11-3-16 0z"/>',
    beanie: '<path fill="#2563eb" d="M9 36c0-13 6-22 15-22s15 9 15 22z"/><path stroke="#60a5fa" stroke-width="2.5" fill="none" d="M16 34V18M24 34V14.5M32 34V18"/><rect fill="#dbeafe" x="6" y="32.5" width="36" height="9.5" rx="4.5"/><circle fill="#dbeafe" cx="24" cy="10" r="6"/>',
    /* ── corazones, flores y hojas ── */
    heart: '<path fill="@1" d="' + HEART + '"/><path stroke="#fff" stroke-opacity=".45" stroke-width="2.6" stroke-linecap="round" fill="none" d="M11.5 17.5a6 6 0 0 1 4.5-5.5"/>',
    heartarrow: '<path stroke="#92400e" stroke-width="2.4" stroke-linecap="round" fill="none" d="M2 40l9-6M3 34l-1 6 6 1"/><path fill="#f43f5e" d="' + HEART + '"/>' +
      '<path stroke="#fff" stroke-opacity=".45" stroke-width="2.6" stroke-linecap="round" fill="none" d="M11.5 17.5a6 6 0 0 1 4.5-5.5"/><path stroke="#92400e" stroke-width="2.4" stroke-linecap="round" fill="none" d="M37 15l7-5"/><path fill="#92400e" d="M47 7l-8.5 1.5 5 6z"/>',
    flower: '<g fill="@1"><circle cx="24" cy="13" r="8.5"/><circle cx="34.5" cy="20.6" r="8.5"/><circle cx="30.5" cy="32.9" r="8.5"/><circle cx="17.5" cy="32.9" r="8.5"/><circle cx="13.5" cy="20.6" r="8.5"/></g><circle fill="#fde047" cx="24" cy="24" r="6"/>',
    tulip: '<path fill="#16a34a" d="M23 26h2v20h-2z"/><path fill="#22c55e" d="M24 44c-8-1-11-7-11-13 6 2 10 6 11 13zM24 44c8-1 11-7 11-13-6 2-10 6-11 13z"/><path fill="@1" d="M13 7l5.5 5L24 3l5.5 9L35 7c2 11-2 21-11 21S11 18 13 7z"/>',
    butterfly: '<path fill="@1" d="M24 22C20 10 6 6 5 16c-1 8 8 11 14 9-6 2-9 8-6 13 4 5 10 0 11-9zM24 22c4-12 18-16 19-6 1 8-8 11-14 9 6 2 9 8 6 13-4 5-10 0-11-9z"/><circle fill="#fff" fill-opacity=".55" cx="13" cy="16" r="3"/><circle fill="#fff" fill-opacity=".55" cx="35" cy="16" r="3"/>' +
      '<rect fill="#3f2a56" x="22.8" y="15" width="2.4" height="22" rx="1.2"/><path stroke="#3f2a56" stroke-width="1.2" fill="none" d="M24 16c-1-4-3-6-5-7M24 16c1-4 3-6 5-7"/>',
    leaf: '<path fill="@1" d="M24 3l5 9 7-4-1 9 9 1-6 7 5 6-9 1-2 6-6.5-4L25 45h-2l-.5-11-6.5 4-2-6-9-1 5-6-6-7 9-1-1-9 7 4z"/>',
    leaf2: '<path fill="@1" d="M24 4c10 6 15 15 15 23 0 9-7 15-15 17C16 42 9 36 9 27 9 19 14 10 24 4z"/><path stroke="#000" stroke-opacity=".18" stroke-width="1.6" fill="none" d="M24 10v32M24 22l7-6M24 30l8-6M24 22l-7-6M24 30l-8-6"/>',
    acorn: '<path fill="#c98a3c" d="M12 22c0 12 5 20 12 22 7-2 12-10 12-22z"/><path fill="#7c4a1e" d="M9 23c0-8 7-12 15-12s15 4 15 12z"/><rect fill="#7c4a1e" x="22.5" y="4" width="3" height="8" rx="1.5"/>',
    mushroom: '<path fill="#f5efe6" d="M18 26h12l2 16c0 3-16 3-16 0z"/><path fill="#dc2626" d="M4 28C4 15 13 6 24 6s20 9 20 22c-13 3-27 3-40 0z"/><circle fill="#fff" cx="15" cy="17" r="3.5"/><circle fill="#fff" cx="27" cy="13" r="3"/><circle fill="#fff" cx="34" cy="21" r="3.5"/><circle fill="#fff" cx="22" cy="23" r="2.5"/>',
    /* ── compras ── */
    tagpct: function (a, b) { return '<path fill="' + a + '" d="M5.5 22L22 5.5h18a2.5 2.5 0 0 1 2.5 2.5v18L26 42.5a2.8 2.8 0 0 1-4 0L5.5 26a2.8 2.8 0 0 1 0-4z"/>' + '<circle fill="' + b + '" cx="35" cy="13" r="2.6"/>' + pct(b, 14.5, 18, 13) },
    bag: function (a, b) { return '<path fill="none" stroke="' + a + '" stroke-width="3" d="M17 18v-5a7 7 0 0 1 14 0v5"/><path fill="' + a + '" d="M8 16h32l3 28H5z"/>' + pct(b, 16, 22, 16) },
    monitor: '<rect fill="#64748b" x="20" y="33" width="8" height="7"/><rect fill="#64748b" x="13" y="40" width="22" height="3.5" rx="1.7"/><rect fill="#64748b" x="4" y="7" width="40" height="27" rx="3"/><rect fill="#0ea5e9" x="7" y="10" width="34" height="21" rx="1.5"/>' + pct("#fff", 17.5, 14, 13),
    cursor: '<path fill="@1" stroke="#fff" stroke-width="2.5" stroke-linejoin="round" d="M10 5l27 20-12 2.5 7 13-6 3-7-13-9 8z"/>',
    /* ── juego ── */
    pxheart: '<path fill="@1" d="M11.5 9h10v5h-10zM26.5 9h10v5h-10zM6.5 14h35v10h-35zM11.5 24h25v5h-25zM16.5 29h15v5h-15zM21.5 34h5v5h-5z"/><path fill="#fff" fill-opacity=".55" d="M11.5 14h5v5h-5z"/>',
    dpad: '<path fill="@1" d="M18 6h12v12h12v12H30v12H18V30H6V18h12z"/><circle fill="#fff" fill-opacity=".5" cx="24" cy="24" r="3.5"/>',
    gamepad: '<path fill="#6d28d9" d="M14 11h20c8 0 13 6 13 14v4c0 5-3 9-7 9-3 0-5-2-7-5l-2-3H17l-2 3c-2 3-4 5-7 5-4 0-7-4-7-9v-4c0-8 5-14 13-14z"/><path fill="#ddd6fe" d="M12 17h4v4h4v4h-4v4h-4v-4H8v-4h4z"/>' +
      '<circle fill="#f43f5e" cx="36" cy="18" r="2.6"/><circle fill="#22c55e" cx="31" cy="23" r="2.6"/><circle fill="#38bdf8" cx="41" cy="23" r="2.6"/><circle fill="#facc15" cx="36" cy="28" r="2.6"/>',
    /* ── fiesta ── */
    star: function (c) { return star(24, 25, 20, 8.5, c) },
    bulb: '<rect fill="#8b9099" x="19.5" y="2" width="9" height="9" rx="1.5"/><path fill="@1" d="M24 10c8 0 13 7 13 15 0 9-7 20-13 20S11 34 11 25c0-8 5-15 13-15z"/><path stroke="#fff" stroke-opacity=".5" stroke-width="2.6" stroke-linecap="round" fill="none" d="M17 24c0-4 2-7 5-8"/>',
    flag: '<path fill="@1" d="M4 2h40L24 44z"/>',
    d: function (ch, a, b) { return '<path fill="' + (a || "#1d4ed8") + '" d="M6 2h36v29L24 44 6 31z"/><text x="24" y="27" text-anchor="middle" font-family="Arial,Helvetica,sans-serif" font-weight="700" font-size="24" fill="' + (b || "#fff") + '">' + ch + "</text>" },
    balloon: '<path stroke="#94a3b8" stroke-width="1.2" fill="none" d="M24 40c-2 2 2 4 0 7"/><path fill="@1" d="M24 3c9 0 15 7 15 16 0 9-7 17-15 19C16 36 9 28 9 19 9 10 15 3 24 3z"/><path fill="@1" d="M21 37h6l-1.5 4.5h-3z"/><path stroke="#fff" stroke-opacity=".5" stroke-width="2.6" stroke-linecap="round" fill="none" d="M15 18c0-4 2-7 5-9"/>',
    kite: '<path stroke="#94a3b8" stroke-width="1.2" fill="none" d="M24 42c-4 2 4 3 0 5"/><path fill="#ef4444" d="M24 3l14 17-14 22z"/><path fill="#facc15" d="M24 3L10 20l14 22z"/><path fill="#3b82f6" d="M24 3l14 17H24z"/><path fill="#22c55e" d="M24 3L10 20h14z"/>',
    burst: '<g stroke="@1" stroke-width="2.8" stroke-linecap="round" fill="none"><path d="M24 16V4M24 32v12M16 24H4M32 24h12M18.3 18.3L9.9 9.9M29.7 29.7l8.4 8.4M29.7 18.3l8.4-8.4M18.3 29.7l-8.4 8.4"/></g><circle fill="@1" cx="24" cy="24" r="3.2"/>',
    flutes: (function () {
      var g = function (x, r) { return '<g transform="rotate(' + r + " " + (x + 6) + ' 24)"><path fill="#fef3c7" d="M' + x + " 7h12l-1.5 14a4.5 4.5 0 0 1-9 0z\"/><path fill=\"#f5b301\" d=\"M" + (x + .7) + " 13h10.6l-.8 8a4.5 4.5 0 0 1-9 0z\"/>" +
        '<rect fill="#cbd5e1" x="' + (x + 5.2) + '" y="25" width="1.6" height="14"/><rect fill="#cbd5e1" x="' + x + '" y="39" width="12" height="2.6" rx="1.3"/></g>' };
      return (g(8, -15) + g(28, 15)) + '<circle fill="#fde68a" cx="24" cy="6" r="1.6"/><circle fill="#fde68a" cx="19.5" cy="2.8" r="1.1"/><circle fill="#fde68a" cx="28.5" cy="2.5" r="1.3"/>';
    })(),
    cake: '<path fill="#fb923c" d="M16.5 5c2 2.5 2 5 0 6-2-1-2-3.5 0-6zM24 3c2 2.5 2 5 0 6-2-1-2-3.5 0-6zM31.5 5c2 2.5 2 5 0 6-2-1-2-3.5 0-6z"/><rect fill="#60a5fa" x="15" y="12" width="3" height="12"/><rect fill="#facc15" x="22.5" y="10" width="3" height="14"/><rect fill="#4ade80" x="30" y="12" width="3" height="12"/>' +
      '<rect fill="#f9a8d4" x="8" y="23" width="32" height="19" rx="3"/><path fill="#fff" d="M8 26a3 3 0 0 1 3-3h26a3 3 0 0 1 3 3v2c-3 4-6 4-8 0-2 4-6 4-8 0-2 4-6 4-8 0-2 4-5 4-8 0z"/><rect fill="#a16207" x="5" y="41" width="38" height="4" rx="2"/>',
    /* ── padres ── */
    tie: '<path fill="@1" d="M18 4h12l-3 9 7 24-10 9-10-9 7-24z"/><path fill="@2" d="M19.8 20l11.2 6-1-3.6-9.2-5zM17.6 28l15 8-1-3.6-13-7z"/><path fill="#000" fill-opacity=".2" d="M18 4h12l-3 9h-6z"/>',
    mustache: '<path fill="#5b3a1e" d="M24 22c-3-5-9-5-12-1-2 3-6 3-9 0 1 8 8 12 14 9 3-1 5-4 7-7 2 3 4 6 7 7 6 3 13-1 14-9-3 3-7 3-9 0-3-4-9-4-12 1z"/>',
    trophy: '<path fill="none" stroke="#f5b301" stroke-width="3" d="M14 10H8c0 7 3 11 8 12M34 10h6c0 7-3 11-8 12"/><path fill="#f5b301" d="M14 6h20v12c0 7-4 12-10 12S14 25 14 18z"/><rect fill="#d99000" x="21" y="29" width="6" height="8"/><rect fill="#7c4a1e" x="13" y="37" width="22" height="6" rx="1.5"/><path fill="#fff" d="M23 11.5l3-1.5v13h-3v-8.8l-1.8 1z"/>',
    /* ── verano ── */
    sun: '<g stroke="#facc15" stroke-width="3.6" stroke-linecap="round" fill="none"><path d="M24 4v6M24 38v6M4 24h6M38 24h6M9.9 9.9l4.2 4.2M33.9 33.9l4.2 4.2M38.1 9.9l-4.2 4.2M14.1 33.9l-4.2 4.2"/></g><circle fill="#facc15" cx="24" cy="24" r="10"/>',
    beachball: '<circle fill="#fff" cx="24" cy="24" r="19"/><path fill="#ef4444" d="M24 5a19 19 0 0 1 16.5 9.5L24 24z"/><path fill="#3b82f6" d="M40.5 33.5A19 19 0 0 1 24 43V24z"/><path fill="#facc15" d="M7.5 33.5a19 19 0 0 1 0-19L24 24z"/><circle fill="#fff" cx="24" cy="24" r="3.2"/><circle fill="none" stroke="#000" stroke-opacity=".14" stroke-width="1" cx="24" cy="24" r="19"/>',
    icecream: '<path fill="#e8a44b" d="M14 25h20L24 46z"/><path stroke="#c98532" stroke-width="1.2" fill="none" d="M17.5 31l9.5 8M21 25l9 7M30.5 31L21 39M27 25l-9 7"/><path fill="#fda4af" d="M12 23a12 12 0 0 1 24 0v3c-2 2-4 2-6 0-2 2-4 2-6 0-2 2-4 2-6 0-2 2-4 2-6 0z"/><circle fill="#fff" fill-opacity=".5" cx="19" cy="15" r="3"/>',
    palm: '<path fill="#a8703a" d="M22 20c3 8 4 17 3 26h-6c1-9 1-17-1-25z"/><g fill="#16a34a"><path d="M23 20C16 12 8 11 2 15c7 0 13 2 21 5z"/><path d="M23 20c-3-9-9-14-16-14 6 3 11 7 16 14z"/><path d="M23 20c1-9 6-15 13-16-5 4-9 9-13 16z"/><path d="M23 20c6-7 14-9 22-5-8 0-14 1-22 5z"/><path d="M23 20c7-2 14 0 19 7-6-4-12-6-19-7z"/><path d="M23 20c-7-1-14 2-18 9 6-5 11-7 18-9z"/></g>' +
      '<circle fill="#7c4a1e" cx="21" cy="21.5" r="2.5"/><circle fill="#7c4a1e" cx="25.5" cy="22.5" r="2.5"/>',
    /* ── clases ── */
    pencil: '<path fill="#fb7185" d="M18 8V5a3 3 0 0 1 3-3h6a3 3 0 0 1 3 3v3z"/><rect fill="#cbd5e1" x="18" y="8" width="12" height="4"/><rect fill="#facc15" x="18" y="12" width="12" height="24"/><rect fill="#eab308" x="26" y="12" width="4" height="24"/><path fill="#f3d9b1" d="M18 36h12l-6 10z"/><path fill="#1f2937" d="M22 42.7h4L24 46z"/>',
    apple: '<path fill="#7c4a1e" d="M23 6h2.5v9H23z"/><path fill="#22c55e" d="M25.5 10c2-5 7-6 11-4-2 5-7 6-11 4z"/><path fill="#ef4444" d="M24 14c-3-3-8-3-12 0-5 4-5 13-1 20 3 6 8 8 13 5 5 3 10 1 13-5 4-7 4-16-1-20-4-3-9-3-12 0z"/><circle fill="#fff" fill-opacity=".45" cx="16" cy="21" r="3"/>',
    books: '<rect fill="#2563eb" x="5" y="33" width="38" height="9" rx="2"/><rect fill="#dbeafe" x="33" y="35" width="8" height="5"/><rect fill="#ef4444" x="8" y="23" width="34" height="9" rx="2"/><rect fill="#fee2e2" x="32" y="25" width="8" height="5"/><rect fill="#22c55e" x="6" y="13" width="32" height="9" rx="2"/><rect fill="#dcfce7" x="28" y="15" width="8" height="5"/>',
    /* ── halloween ── */
    bat: '<path fill="@1" d="M24 14l-3-6-2 7c-2-1-4-1-5 1-3-5-8-7-13-6 2 4 2 8 1 12 3-2 6-2 8 1 1 3 4 4 7 3 2 3 4 6 7 9 3-3 5-6 7-9 3 1 6 0 7-3 2-3 5-3 8-1-1-4-1-8 1-12-5-1-10 1-13 6-1-2-3-2-5-1l-2-7z"/><circle fill="#fde047" cx="21" cy="19.5" r="1.4"/><circle fill="#fde047" cx="27" cy="19.5" r="1.4"/>',
    pumpkin: '<path fill="#16a34a" d="M22 5h5l-1 8h-4z"/><ellipse fill="#f97316" cx="24" cy="28" rx="20" ry="15"/><ellipse fill="#fb923c" cx="24" cy="28" rx="9" ry="15"/><path fill="#431407" d="M12 25l5-6 3 6zM28 25l3-6 5 6zM13 31c3 2 5 0 7 2 2-2 6-2 8 0 2-2 4 0 7-2-2 7-7 9-11 9s-9-2-11-9z"/>',
    ghost: '<path fill="#f8fafc" stroke="#c7cedb" stroke-width="1" d="M8 44V22C8 12 15 5 24 5s16 7 16 17v22l-5.3-4-5.4 4-5.3-4-5.3 4-5.4-4z"/><ellipse fill="#1e1b2e" cx="18.5" cy="21" rx="2.5" ry="3.5"/><ellipse fill="#1e1b2e" cx="29.5" cy="21" rx="2.5" ry="3.5"/><ellipse fill="#1e1b2e" cx="24" cy="29.5" rx="3" ry="3.8"/>',
    /* ── invierno y navidad ── */
    snow: '<g stroke="@1" stroke-width="3.2" stroke-linecap="round" fill="none"><path d="M24 5v38M7.5 14.5l33 19M40.5 14.5l-33 19M19 8l5 4 5-4M19 40l5-4 5 4M12.4 11.8l1.2 6.2-6.3 1M35.6 36.2L34.4 30l6.3-1M35.6 11.8L34.4 18l6.3 1M12.4 36.2l1.2-6.2-6.3-1"/></g>',
    snowman: '<circle fill="#fff" stroke="#c7d2e0" stroke-width="1" cx="24" cy="34" r="11"/><circle fill="#fff" stroke="#c7d2e0" stroke-width="1" cx="24" cy="17" r="8"/><rect fill="#334155" x="18" y="3" width="12" height="7"/><rect fill="#334155" x="15" y="9" width="18" height="2.6" rx="1"/>' +
      '<circle fill="#1f2937" cx="21" cy="15.5" r="1.3"/><circle fill="#1f2937" cx="27" cy="15.5" r="1.3"/><path fill="#f97316" d="M24 17.5l8 2-8 1.5z"/><rect fill="#ef4444" x="16" y="23" width="16" height="3.6" rx="1.8"/><path fill="#ef4444" d="M28 24h4v9h-4z"/><circle fill="#1f2937" cx="23" cy="32" r="1.3"/><circle fill="#1f2937" cx="23" cy="37" r="1.3"/>',
    pine: '<rect fill="#7c4a1e" x="21" y="39" width="6" height="7"/><path fill="#166534" d="' + TREE + '"/><path fill="#fff" d="M24 6l4.5 6c-1.5 1.2-3-.6-4.5.7-1.5-1.3-3 .5-4.5-.7zM18.5 21h11l3.2 4c-2 1.3-3.4-.8-5.2.4-1.8-1.2-3.4.8-5.2-.3-1.6 1-3.2-.6-5 .3zM15 32h18l3.4 4.2c-2.4 1.4-3.8-.9-6 .5-2-1.4-4 .8-6.4-.4-2.2 1.2-4.2-1-6.4.4-2-1.4-3.6.6-6-.5z"/>',
    xtree: '<rect fill="#7c4a1e" x="21" y="39" width="6" height="7"/><path fill="#15803d" d="' + TREE + '"/>' + star(24, 6, 6, 2.6, "#facc15") +
      '<circle fill="#ef4444" cx="21" cy="20" r="2.1"/><circle fill="#facc15" cx="28" cy="25" r="2.1"/><circle fill="#60a5fa" cx="19" cy="31" r="2.1"/><circle fill="#ef4444" cx="30" cy="34" r="2.1"/><circle fill="#facc15" cx="23" cy="36" r="1.9"/>',
    gift: '<path fill="@2" d="M24 14c-3-7-10-9-12-6s3 6 12 6zM24 14c3-7 10-9 12-6s-3 6-12 6z"/><rect fill="@1" x="7" y="20" width="34" height="24" rx="2"/><rect fill="#000" fill-opacity=".14" x="7" y="22" width="34" height="3"/><rect fill="@1" x="5" y="14" width="38" height="8" rx="2"/><rect fill="@2" x="21" y="14" width="6" height="30"/>'
  };
  var MULTI = ["#ef4444", "#f59e0b", "#22c55e", "#3b82f6", "#a855f7"], flags = function (cs) { return cs.concat(cs).map(function (c) { return "flag:" + c }) };
  var yr = (function () { var d = new Date(); return String(d.getFullYear() + (d.getMonth() > 5 ? 1 : 0)) })();      /* el año que entra */
  var k = {
    navidad: { t: ["santa", "h"], g: ["bulb:#ef4444", "bulb:#fbbf24", "bulb:#22c55e", "bulb:#60a5fa", "bulb:#ef4444", "bulb:#fbbf24", "bulb:#22c55e", "bulb:#60a5fa"], gn: 4, gs: 17,
      s: [["xtree", 62, 8, 132, 0], ["gift:#ef4444:#fde047", 12, 86, 62, -5], ["gift:#2563eb:#f8fafc", 152, 98, 48, 6]] },
    finanio: { t: ["party:#1d4ed8:#fcd34d", "h"], g: ["star:#fcd34d"].concat(yr.split("").map(function (c) { return "d:" + c + ":#1d4ed8:#fde68a" }), ["star:#fcd34d"]),
      s: [["burst:#fcd34d", 4, 18, 72, 0], ["burst:#f472b6", 128, 2, 60, 20], ["burst:#60a5fa", 150, 64, 46, 0], ["flutes", 52, 54, 96, 0]] },
    reyes: { t: ["crown", "h"], g: ["crown", "star:#fcd34d", "crown", "star:#c4b5fd", "crown", "star:#fcd34d"],
      s: [["star:#fde68a", 80, 2, 44, 0], ["crown", 6, 76, 70, -10], ["crown", 60, 46, 90, 0], ["crown", 134, 78, 66, 10]] },
    enamorados: { t: ["heart:#f43f5e", "b"], g: ["heart:#f43f5e", "heart:#fb7185", "heartarrow", "heart:#e11d48", "heart:#f472b6", "heartarrow"],
      s: [["heart:#fb7185", 6, 28, 44, -16], ["heart:#f472b6", 158, 12, 36, 14], ["heartarrow", 44, 26, 124, -6]] },
    mujer: { t: ["flower:#c084fc", "b"], g: ["flower:#c084fc", "tulip:#e879f9", "flower:#f472b6", "tulip:#a855f7", "flower:#e879f9", "tulip:#f472b6"],
      s: [["tulip:#c084fc", 22, 44, 104, -14], ["tulip:#f472b6", 122, 44, 104, 14], ["tulip:#e879f9", 66, 24, 124, 0]] },
    primavera: { t: ["butterfly:#f472b6", "b"], g: ["flower:#f472b6", "butterfly:#a78bfa", "flower:#facc15", "leaf2:#4ade80", "flower:#fb923c", "butterfly:#38bdf8"], gw: "#4ade80",
      s: [["flower:#f472b6", 14, 70, 76, 0], ["flower:#facc15", 96, 90, 58, 0], ["leaf2:#4ade80", 150, 76, 50, 24], ["butterfly:#a78bfa", 104, 10, 70, -14]] },
    madres: { t: ["flower:#fb7185", "b"], g: ["flower:#fb7185", "heart:#f43f5e", "tulip:#f472b6", "flower:#f9a8d4", "heart:#e11d48", "tulip:#fb7185"],
      s: [["tulip:#fb7185", 26, 46, 102, -14], ["tulip:#f9a8d4", 112, 46, 102, 14], ["tulip:#f43f5e", 62, 26, 122, 0], ["heart:#f43f5e", 160, 6, 38, 12]] },
    padres: { t: ["bowler", "h"], g: ["tie:#1d4ed8:#93c5fd", "mustache", "tie:#b45309:#fcd34d", "star:#fbbf24", "tie:#0f766e:#5eead4", "mustache"],
      s: [["tie:#1d4ed8:#93c5fd", 8, 52, 86, -12], ["mustache", 142, 92, 56, 0], ["trophy", 58, 26, 120, 0]] },
    verano: { t: ["straw", "h"], g: ["sun", "beachball", "icecream", "sun", "beachball", "icecream"],
      s: [["sun", 126, 2, 72, 0], ["palm", 34, 22, 128, 0], ["beachball", 140, 98, 50, 0]] },
    ninos: { t: ["propcap", "h"], g: flags(MULTI), gn: 5, gs: 17,
      s: [["kite", 4, 56, 82, -18], ["balloon:#ef4444", 66, 2, 88, -9], ["balloon:#3b82f6", 114, 6, 88, 9], ["balloon:#facc15", 90, 30, 88, 0]] },
    clases: { t: ["gradcap", "h"], g: ["pencil", "d:A:#ef4444", "apple", "d:B:#2563eb", "pencil", "d:C:#16a34a"],
      s: [["books", 30, 36, 116, 0], ["apple", 80, 20, 54, 0], ["pencil", 126, 58, 76, 20]] },
    gamer: { t: ["pxheart:#f43f5e", "b"], g: ["pxheart:#f43f5e", "dpad:#a78bfa", "pxheart:#22c55e", "dpad:#38bdf8", "pxheart:#facc15", "dpad:#f472b6"],
      s: [["pxheart:#f43f5e", 8, 22, 42, 0], ["pxheart:#22c55e", 160, 8, 34, 0], ["gamepad", 36, 36, 134, -6]] },
    otono: { t: ["leaf:#ea580c", "b"], g: ["leaf:#ea580c", "acorn", "leaf2:#ca8a04", "leaf:#dc2626", "acorn", "leaf2:#b45309"], gw: "#92623a",
      s: [["leaf:#ea580c", 6, 72, 68, -24], ["acorn", 152, 40, 44, 12], ["leaf:#ca8a04", 148, 92, 54, 28], ["mushroom", 62, 52, 98, 0]] },
    halloween: { t: ["witch", "h"], g: ["bat:#7c3aed", "pumpkin", "ghost", "bat:#7c3aed", "pumpkin", "ghost"],
      s: [["bat:#7c3aed", 136, 4, 60, 10], ["ghost", 6, 34, 74, -8], ["pumpkin", 60, 46, 116, 0]] },
    blackfriday: { t: ["tagpct:#facc15:#111111", "b"], g: ["tagpct:#facc15:#111111", "tagpct:#3f3f46:#facc15", "tagpct:#facc15:#111111", "tagpct:#3f3f46:#facc15", "tagpct:#facc15:#111111", "tagpct:#3f3f46:#facc15"],
      s: [["tagpct:#f5f5f5:#111111", 4, 70, 66, -16], ["bag:#facc15:#111111", 60, 24, 122, 4]] },
    cybermonday: { t: ["cursor:#22d3ee", "b"], g: ["cursor:#22d3ee", "tagpct:#e879f9:#ffffff", "cursor:#818cf8", "tagpct:#22d3ee:#06283d", "cursor:#e879f9", "tagpct:#818cf8:#ffffff"],
      s: [["monitor", 34, 22, 128, 0], ["cursor:#22d3ee", 140, 86, 60, 0]] },
    invierno: { t: ["beanie", "h"], g: ["snow:#60a5fa", "snow:#38bdf8", "snow:#93c5fd", "snow:#60a5fa", "snow:#38bdf8", "snow:#93c5fd"],
      s: [["pine", 6, 58, 88, 0], ["snow:#93c5fd", 160, 8, 38, 0], ["snowman", 70, 20, 128, 0]] },
    aniversario: { t: ["party:#f43f5e:#fde047", "h"], g: flags(MULTI), gn: 5, gs: 17,
      s: [["balloon:#f43f5e", 4, 8, 76, -9], ["balloon:#3b82f6", 122, 2, 76, 9], ["cake", 44, 40, 108, 0]] }
  };
  if (window.__seArt) window.__seArt({ o: o, k: k });
})();
