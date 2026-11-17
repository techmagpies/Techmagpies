(function () {
  'use strict';
  var C = window.TM_COURSES || [];
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  function byFile(f) { return C.filter(function (c) { return c.f === 'roadmaps/' + f + '.html'; })[0]; }
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); }

  /* ---------- orbiting topic chips (hero) ---------- */
  (function orbit() {
    var host = document.getElementById('orbit');
    if (!host) return;
    /* ring 0 = outer ellipse, ring 1 = inner ellipse. Edit labels/links here. */
    var TOPICS = [
      { t: 'Machine Learning', f: 'roadmaps/aiml/ml.html', ring: 0, c: '#6a4bf0' },
      { t: 'Web Dev', f: 'roadmaps/cse/web.html', ring: 0, c: '#1f6ff2' },
      { t: 'Cloud', f: 'roadmaps/cse/cloud.html', ring: 0, c: '#0b9aa0' },
      { t: 'VLSI', f: 'roadmaps/ece/vlsi.html', ring: 0, c: '#12a672' },
      { t: 'Power Systems', f: 'roadmaps/eee/power.html', ring: 0, c: '#d98a00' },
      { t: 'Python', f: 'roadmaps/cse/python.html', ring: 0, c: '#1f6ff2' },
      { t: 'GenAI', f: 'roadmaps/aiml/genai.html', ring: 1, c: '#6a4bf0' },
      { t: 'DSA', f: 'roadmaps/cse/cpp.html', ring: 1, c: '#0b1a3e' },
      { t: 'Embedded', f: 'roadmaps/ece/embedded.html', ring: 1, c: '#12a672' },
      { t: 'Docker', f: 'roadmaps/tools/Docker.html', ring: 1, c: '#d6336c' }
    ];
    if (window.innerWidth < 520) TOPICS = TOPICS.filter(function (t) { return ['Machine Learning', 'Web Dev', 'Cloud', 'VLSI', 'Python', 'DSA', 'Embedded', 'Docker'].indexOf(t.t) >= 0; });
    var RINGS = [{ rx: 0.47, ry: 0.327 }, { rx: 0.377, ry: 0.25 }];
    var counts = [0, 0];
    TOPICS.forEach(function (t) { counts[t.ring]++; });
    var seen = [0, 0];
    var chips = TOPICS.map(function (t) {
      var a = document.createElement('a');
      a.className = 'chip3d';
      a.href = t.f;
      a.style.setProperty('--c', t.c);
      a.textContent = t.t;
      a.setAttribute('aria-label', 'Open ' + t.t + ' roadmap');
      host.appendChild(a);
      var base = (seen[t.ring]++ / counts[t.ring]) * Math.PI * 2 + (t.ring ? 0.6 : 0);
      return { el: a, base: base, ring: RINGS[t.ring], dir: t.ring ? -1 : 1 };
    });
    var W = host.clientWidth || 600;
    function measure() { W = host.clientWidth || 600; chips.forEach(function (c) { c.hw = c.el.offsetWidth / 2; }); }
    measure(); window.addEventListener('resize', measure);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(measure);
    var paused = false, offset = 0, last = performance.now();
    function place(angle) {
      chips.forEach(function (c) {
        var a = c.base + angle * c.dir;
        var x = 0.5 + c.ring.rx * Math.cos(a);
        var lim = (c.hw + 4) / W;                      // keep every chip fully inside the stage
        x = Math.min(1 - lim, Math.max(lim, x));
        var y = 0.5 + c.ring.ry * Math.sin(a);
        var depth = (Math.sin(a) + 1) / 2;            // 0 = back (top), 1 = front (bottom)
        var s = 0.9 + depth * 0.14;
        c.el.style.left = (x * 100) + '%';
        c.el.style.top = (y * 100) + '%';
        c.el.style.transform = 'translate(-50%,-50%) scale(' + s.toFixed(3) + ')';
        c.el.style.zIndex = depth > 0.5 ? 6 : 1;
        c.el.style.opacity = (0.72 + depth * 0.28).toFixed(2);
      });
    }
    place(0.35);
    if (reduce) return;
    host.addEventListener('pointerenter', function () { paused = true; });
    host.addEventListener('pointerleave', function () { paused = false; last = performance.now(); });
    host.addEventListener('focusin', function () { paused = true; });
    host.addEventListener('focusout', function () { paused = false; last = performance.now(); });
    function tick(now) {
      if (!paused) { offset += (now - last) * 0.00005; place(0.35 + offset); }
      last = now;
      requestAnimationFrame(tick);
    }
    requestAnimationFrame(tick);
  })();

  /* ---------- live board: dates always look forward ---------- */
  (function board() {
    var host = document.getElementById('board');
    if (!host) return;
    var now = new Date();
    var slots = Array.prototype.slice.call(host.querySelectorAll('.slot'));
    var mon = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    var day = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    slots.forEach(function (s) {
      var d = new Date(now); d.setHours(+s.dataset.hour, +s.dataset.min, 0, 0);
      var add = (+s.dataset.dow - d.getDay() + 7) % 7;
      d.setDate(d.getDate() + add);
      if (d <= now) d.setDate(d.getDate() + 7);
      s._d = d;
      s.querySelector('.slot__date b').textContent = d.getDate();
      s.querySelector('.slot__date span').textContent = day[d.getDay()] + ', ' + mon[d.getMonth()];
      var h = d.getHours(), ap = h >= 12 ? 'PM' : 'AM';
      s.querySelector('.slot__time em').textContent = ((h + 11) % 12 + 1) + (d.getMinutes() ? ':' + ('0' + d.getMinutes()).slice(-2) : '') + ' ' + ap;
    });
    slots.sort(function (a, b) { return a._d - b._d; }).forEach(function (s) { host.appendChild(s); });
    var next = slots[0]; next.classList.add('is-next');
    function cd() {
      var ms = next._d - new Date(), m = Math.max(0, Math.floor(ms / 60000)), dd = Math.floor(m / 1440), hh = Math.floor((m % 1440) / 60), mm = m % 60;
      var txt = dd ? 'in ' + dd + 'd ' + hh + 'h' : hh ? 'in ' + hh + 'h ' + mm + 'm' : 'in ' + mm + 'm';
      next.querySelector('.slot__time em').setAttribute('data-cd', txt);
      var t = document.getElementById('heroLiveText');
      if (t) t.textContent = 'Next live class: ' + next.querySelector('h3').textContent + ' ' + txt;
    }
    cd(); setInterval(cd, 30000);
  })();

  /* ---------- flash cards ---------- */
  (function flashcards() {
    var grid = document.getElementById('flashGrid');
    if (!grid) return;
    var CARDS = [
      { tag: 'Prompt Engineering', icon: 'spark', a: '#6a4bf0', bg: '#ece8ff', href: 'roadmaps/cse/prompt.html',
        q: 'An AI answer comes back vague and off-topic. What do you fix in the prompt first?',
        ans: 'Add context and constraints. State the role, the goal, the audience and the output format, then show one example of what good looks like.',
        pts: ['Role + task + format', 'Give one or two examples', 'Change one thing per iteration'] },
      { tag: 'Figma UI/UX Design', icon: 'figma', a: '#e8542f', bg: '#ffeae3', href: 'roadmaps/tools/figma.html',
        q: 'What does Auto Layout do in Figma?',
        ans: 'It makes a frame resize and re-flow by itself when content, padding or spacing changes, so buttons, cards and lists behave like real flex layouts.',
        pts: ['Set direction, gap and padding', 'Hug, fill or fixed sizing', 'Nest frames to build components'] },
      { tag: 'Data Science', icon: 'chart', a: '#0b9aa0', bg: '#dcf5f4', href: 'roadmaps/aiml/ds-analytics.html',
        q: 'Why do we split data into training and test sets?',
        ans: 'To measure how a model performs on data it has never seen. Scoring on the training data alone hides overfitting.',
        pts: ['Common splits are 80/20 or 70/30', 'Use cross-validation for small data', 'Never tune on the test set'] },
      { tag: 'JavaScript', icon: 'code', a: '#d98a00', bg: '#fff0d1', href: 'roadmaps/cse/web.html',
        q: 'What is the difference between let, const and var?',
        ans: 'let and const are block-scoped, while var is function-scoped and hoisted. const cannot be reassigned, although an object it holds can still change.',
        pts: ['Default to const', 'Use let when a value must change', 'Avoid var in new code'] },
      { tag: 'VLSI & Embedded Systems', icon: 'cpu', a: '#1f6ff2', bg: '#e3edff', href: 'roadmaps/ece/vlsi.html',
        q: 'How is a combinational circuit different from a sequential one?',
        ans: 'A combinational output depends only on the current inputs. A sequential output also depends on stored state, updated on a clock edge by flip-flops.',
        pts: ['Adder = combinational, counter = sequential', 'Verilog: always @(*) vs always @(posedge clk)', 'Firmware runs on top of sequential logic'] }
    ];
    grid.innerHTML = CARDS.map(function (c, i) {
      var id = 'fc' + i;
      return '<div class="fc" role="listitem" style="--a:' + c.a + ';--bg:' + c.bg + '">' +
        '<div class="fc__inner">' +
        '<div class="fc__face fc__front" id="' + id + 'f">' +
          '<div class="fc__top"><span class="fc__ic">' + TM.svg(c.icon, 22) + '</span><span class="fc__tag">' + esc(c.tag) + '</span></div>' +
          '<span class="fc__label">Question</span>' +
          '<h3>' + esc(c.q) + '</h3>' +
          '<button class="fc__flip" type="button" aria-controls="' + id + 'b" aria-expanded="false" aria-label="Reveal the answer: ' + esc(c.tag) + '"><span>Reveal answer</span>' + TM.svg('arrow-right', 18) + '</button>' +
        '</div>' +
        '<div class="fc__face fc__back" id="' + id + 'b" inert aria-hidden="true">' +
          '<div class="fc__top"><span class="fc__tag">' + esc(c.tag) + '</span></div>' +
          '<span class="fc__label">Answer</span>' +
          '<p class="fc__ans">' + esc(c.ans) + '</p>' +
          '<ul class="fc__pts">' + c.pts.map(function (p) { return '<li>' + TM.svg('check', 16) + esc(p) + '</li>'; }).join('') + '</ul>' +
          '<a class="fc__go" href="' + c.href + '">Open roadmap ' + TM.svg('arrow-up-right', 16) + '</a>' +
          '<button class="fc__flip fc__flip--back" type="button" aria-controls="' + id + 'f" aria-label="Flip back to the question: ' + esc(c.tag) + '"><span>Flip back</span></button>' +
        '</div></div></div>';
    }).join('');

    var cards = Array.prototype.slice.call(grid.children);
    var count = document.getElementById('flashCount');
    var allBtn = document.getElementById('flashAll');
    var allText = document.getElementById('flashAllText');

    function setFlip(card, on, focus) {
      var front = card.querySelector('.fc__front'), back = card.querySelector('.fc__back');
      card.classList.toggle('is-flipped', on);
      if (on) { front.setAttribute('inert', ''); back.removeAttribute('inert'); } else { back.setAttribute('inert', ''); front.removeAttribute('inert'); }
      front.setAttribute('aria-hidden', on ? 'true' : 'false');
      back.setAttribute('aria-hidden', on ? 'false' : 'true');
      front.querySelector('.fc__flip').setAttribute('aria-expanded', on ? 'true' : 'false');
      if (focus) (on ? back : front).querySelector('.fc__flip').focus({ preventScroll: true });
    }
    function update() {
      var n = cards.filter(function (c) { return c.classList.contains('is-flipped'); }).length;
      count.textContent = n + ' of ' + cards.length + ' flipped';
      var all = n === cards.length;
      allBtn.setAttribute('aria-pressed', all ? 'true' : 'false');
      allText.textContent = all ? 'Flip all back' : 'Flip all cards';
    }
    grid.addEventListener('click', function (e) {
      var b = e.target.closest('.fc__flip'); if (!b) return;
      var card = b.closest('.fc');
      setFlip(card, !card.classList.contains('is-flipped'), true);
      update();
    });
    allBtn.addEventListener('click', function () {
      var on = allBtn.getAttribute('aria-pressed') !== 'true';
      cards.forEach(function (c, i) { window.setTimeout(function () { setFlip(c, on, false); update(); }, reduce ? 0 : i * 70); });
    });
    update();
  })();

  /* ---------- FAQ ---------- */
  (function faq() {
    var acc = document.getElementById('acc');
    if (!acc) return;
    function set(item, open) {
      item.classList.toggle('is-open', open);
      item.querySelector('.acc__q').setAttribute('aria-expanded', open);
    }
    acc.addEventListener('click', function (e) {
      var q = e.target.closest('.acc__q'); if (!q) return;
      var item = q.closest('.acc__item'), willOpen = !item.classList.contains('is-open');
      Array.prototype.forEach.call(acc.children, function (i) { set(i, false); });
      set(item, willOpen);
    });
    set(acc.children[0], true);
  })();
})();
