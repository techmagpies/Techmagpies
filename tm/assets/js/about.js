(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- count-up when the stats scroll into view ---------- */
  (function counters() {
    var els = document.querySelectorAll('[data-count]');
    if (!els.length || reduce || !('IntersectionObserver' in window)) return;
    function run(el) {
      var to = +el.dataset.count, suf = el.dataset.suffix || '', t0 = performance.now(), D = 1400;
      (function step(now) {
        var p = Math.min(1, (now - t0) / D), e = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(to * e) + (p === 1 ? suf : '');
        if (p < 1) requestAnimationFrame(step);
      })(t0);
    }
    var io = new IntersectionObserver(function (en) {
      en.forEach(function (x) { if (x.isIntersecting) { run(x.target); io.unobserve(x.target); } });
    }, { threshold: .6 });
    els.forEach(function (el) { io.observe(el); });
  })();

  /* ---------- logo assembled from particles ---------- */
  var canvas = document.getElementById('stage'), L = window.TM_LOGO;
  if (!canvas || !L) return;
  var ctx = canvas.getContext('2d'), wrap = document.getElementById('stageWrap');
  var DPR = Math.min(window.devicePixelRatio || 1, 2), W = 0, H = 0, P = [], mouse = { x: -999, y: -999, on: false };

  function layout() {
    var r = wrap.getBoundingClientRect(); W = r.width; H = r.height;
    canvas.width = W * DPR; canvas.height = H * DPR; ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    var lw = Math.min(W * .74, H * .86 * L.aspect), lh = lw / L.aspect, ox = (W - lw) / 2, oy = (H - lh) / 2;
    var px = Math.max(2.2, lw / 190);       // particle size scales with the logo
    if (!P.length) {
      P = L.pts.map(function (p) {
        return { c: '#' + p[2], x: Math.random() * W, y: Math.random() * H, vx: 0, vy: 0, tx: 0, ty: 0, d: Math.random() * .35, s: 1 };
      });
    }
    P.forEach(function (q, i) { var p = L.pts[i]; q.tx = ox + p[0] * lw; q.ty = oy + p[1] * lh; q.s = px * (.8 + (i % 5) * .08); });
  }

  var phase = 'gather', t0 = performance.now(), SPAN = { gather: 2200, hold: 5200, scatter: 1500 };
  var starts = [];
  function setPhase(n, now) {
    phase = n; t0 = now;
    if (n === 'scatter') P.forEach(function (q) { q.sx = q.x; q.sy = q.y; var a = Math.random() * 6.283, r = Math.max(W, H) * (.35 + Math.random() * .5); q.ex = W / 2 + Math.cos(a) * r; q.ey = H / 2 + Math.sin(a) * r * .7; });
    if (n === 'gather') P.forEach(function (q) { q.sx = q.x; q.sy = q.y; });
  }
  function ease(t) { return t < .5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2; }

  function draw(now) {
    ctx.clearRect(0, 0, W, H);
    var el = now - t0, span = SPAN[phase], k = Math.min(1, el / span);
    for (var i = 0; i < P.length; i++) {
      var q = P[i];
      if (phase === 'gather') {
        var u = ease(Math.max(0, Math.min(1, (k - q.d) / (1 - q.d))));
        q.x = q.sx + (q.tx - q.sx) * u; q.y = q.sy + (q.ty - q.sy) * u;
      } else if (phase === 'hold') {
        // spring back to target, pushed away by the pointer
        var dx = q.x - mouse.x, dy = q.y - mouse.y, d2 = dx * dx + dy * dy, R = 90;
        if (mouse.on && d2 < R * R) { var d = Math.sqrt(d2) || 1, f = (1 - d / R) * 5.5; q.vx += dx / d * f; q.vy += dy / d * f; }
        q.vx += (q.tx - q.x) * .06; q.vy += (q.ty - q.y) * .06; q.vx *= .82; q.vy *= .82; q.x += q.vx; q.y += q.vy;
      } else {
        var u2 = ease(Math.max(0, Math.min(1, (k - q.d * .5) / (1 - q.d * .5))));
        q.x = q.sx + (q.ex - q.sx) * u2; q.y = q.sy + (q.ey - q.sy) * u2;
      }
      ctx.fillStyle = q.c;
      ctx.fillRect(q.x - q.s / 2, q.y - q.s / 2, q.s, q.s);
    }
    if (k >= 1) {
      if (phase === 'gather') setPhase('hold', now);
      else if (phase === 'hold' && !mouse.on) setPhase('scatter', now);
      else if (phase === 'hold') t0 = now - SPAN.hold + 1500;   // keep holding while someone is playing with it
      else setPhase('gather', now);
    }
    if (running) requestAnimationFrame(draw);
  }

  layout();
  var running = false;
  if (reduce) {
    P.forEach(function (q) { q.x = q.tx; q.y = q.ty; });
    ctx.clearRect(0, 0, W, H); P.forEach(function (q) { ctx.fillStyle = q.c; ctx.fillRect(q.x - q.s / 2, q.y - q.s / 2, q.s, q.s); });
    window.addEventListener('resize', function () { layout(); P.forEach(function (q) { q.x = q.tx; q.y = q.ty; ctx.fillStyle = q.c; ctx.fillRect(q.x - q.s / 2, q.y - q.s / 2, q.s, q.s); }); });
    return;
  }
  setPhase('gather', performance.now());
  function start() { if (!running) { running = true; requestAnimationFrame(draw); } }
  if ('IntersectionObserver' in window) {
    new IntersectionObserver(function (en) { en[0].isIntersecting ? (setPhase(phase === 'hold' ? 'hold' : 'gather', performance.now()), start()) : (running = false); }, { threshold: .15 }).observe(wrap);
  } else start();

  function pos(e) { var r = canvas.getBoundingClientRect(); mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top; mouse.on = true; }
  canvas.addEventListener('pointermove', pos);
  canvas.addEventListener('pointerdown', pos);
  canvas.addEventListener('pointerleave', function () { mouse.on = false; mouse.x = mouse.y = -999; });
  canvas.addEventListener('pointerup', function (e) { if (e.pointerType !== 'mouse') { mouse.on = false; mouse.x = mouse.y = -999; } });
  var rt; window.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(layout, 120); });
})();
