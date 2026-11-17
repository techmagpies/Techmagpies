(function () {
  'use strict';
  var ALL = (window.TM_COURSES || []).map(function (c, i) {
    var nums = (c.d.match(/\d+/g) || [0]).map(Number);
    c.max = Math.max.apply(null, nums);   // longest duration in months
    c.idx = i;
    return c;
  });
  var tracks = [
    { id: 'all', label: 'All tracks', tr: null, color: '#0b1a3e' },
    { id: 'cse', label: 'CSE', tr: 'CSE', color: '#1f6ff2' },
    { id: 'aiml', label: 'AI / ML', tr: 'AI/ML', color: '#6a4bf0' },
    { id: 'ece', label: 'ECE', tr: 'ECE', color: '#0b9aa0' },
    { id: 'eee', label: 'EEE', tr: 'EEE', color: '#d98a00' },
    { id: 'tools', label: 'Dev tools', tr: 'Tools', color: '#3b4f78' }
  ];
  var lens = [
    { id: 'any', label: 'Any length', test: function () { return true; } },
    { id: 'q', label: 'Up to 2 months', test: function (c) { return c.max <= 2; } },
    { id: 'm', label: '3–4 months', test: function (c) { return c.max >= 3 && c.max <= 4; } },
    { id: 'l', label: '5+ months', test: function (c) { return c.max >= 5; } }
  ];
  var state = { track: 'all', len: 'any', q: '', sort: 'rec', list: window.innerWidth < 560 };

  var el = {
    grid: document.getElementById('grid'), count: document.getElementById('count'), q: document.getElementById('q'),
    clear: document.getElementById('qClear'), sort: document.getElementById('sort'),
    fTrack: document.getElementById('fTrack'), fLen: document.getElementById('fLen'),
    vGrid: document.getElementById('vGrid'), vList: document.getElementById('vList')
  };
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); }
  function norm(s) { return String(s).toLowerCase().replace(/[^a-z0-9+#]+/g, ' ').trim(); }
  function dur(s) { return String(s || '').replace(/Months/g, 'months'); }

  var ORD = { cse: 0, aiml: 1, ece: 2, eee: 3, tools: 4 };
  function order(c) { return ORD[c.b]; }

  function matches(c, ignoreTrack, ignoreLen) {
    if (!ignoreTrack && state.track !== 'all') {
      var t = tracks.filter(function (x) { return x.id === state.track; })[0];
      if (c.tr !== t.tr) return false;
    }
    if (!ignoreLen && !lens.filter(function (l) { return l.id === state.len; })[0].test(c)) return false;
    if (state.q) {
      var hay = norm(c.t + ' ' + c.tr + ' ' + c.b + ' ' + c.s);
      var words = norm(state.q).split(' ');
      for (var i = 0; i < words.length; i++) if (hay.indexOf(words[i]) < 0) return false;
    }
    return true;
  }

  function buildFilters() {
    el.fTrack.innerHTML = tracks.map(function (t) {
      var n = ALL.filter(function (c) { return matches(c, true, false) && (!t.tr || c.tr === t.tr); }).length;
      return '<button type="button" class="fbtn" data-k="track" data-v="' + t.id + '" aria-pressed="' + (state.track === t.id) + '"><i style="--c:' + t.color + '"></i>' + t.label + '<small>' + n + '</small></button>';
    }).join('');
    el.fLen.innerHTML = lens.map(function (l) {
      var n = ALL.filter(function (c) { return matches(c, false, true) && l.test(c); }).length;
      return '<button type="button" class="fbtn" data-k="len" data-v="' + l.id + '" aria-pressed="' + (state.len === l.id) + '"><i style="--c:#7fa6e8"></i>' + l.label + '<small>' + n + '</small></button>';
    }).join('');
  }

  function render() {
    var list = ALL.filter(function (c) { return matches(c); });
    if (state.sort === 'az') list.sort(function (a, b) { return a.t.localeCompare(b.t); });
    else if (state.sort === 'short') list.sort(function (a, b) { return a.max - b.max || a.t.localeCompare(b.t); });
    else if (state.sort === 'long') list.sort(function (a, b) { return b.max - a.max || a.t.localeCompare(b.t); });
    else list.sort(function (a, b) { return order(a) - order(b) || a.idx - b.idx; });

    el.count.innerHTML = list.length + ' roadmap' + (list.length === 1 ? '' : 's') + (state.q ? ' <span>for “' + esc(state.q) + '”</span>' : '');
    el.grid.classList.toggle('is-list', state.list);
    el.clear.hidden = !state.q;

    if (!list.length) {
      el.grid.innerHTML = '<div class="empty"><h3>No roadmaps match' + (state.q ? ' “' + esc(state.q) + '”' : '') + '</h3><p>Try a shorter keyword, or clear the filters to see everything.</p><button class="btn btn--primary" type="button" id="reset">Clear filters</button></div>';
      document.getElementById('reset').onclick = function () { state.track = 'all'; state.len = 'any'; state.q = ''; el.q.value = ''; sync(); };
    } else {
      el.grid.innerHTML = list.map(function (c) {
        return '<article class="cc" data-b="' + c.b + '">' +
          '<div class="cc__top"><span class="cc__ic">' + TM.svg(c.i, 26) + '</span><span class="cc__tag">' + esc(c.tr) + '</span></div>' +
          '<h3>' + esc(c.t) + '</h3>' +
          '<p class="cc__s">' + esc(c.s) + '</p>' +
          '<div class="cc__meta"><span>' + TM.svg('layers', 16) + esc(c.n) + '</span><span>' + TM.svg('clock', 16) + esc(dur(c.d)) + '</span></div>' +
          '<span class="cc__go">Start learning ' + TM.svg('arrow-right', 18) + '</span>' +
          '<a class="cc__link" href="' + c.f + '" aria-label="Open ' + esc(c.t) + ' roadmap"></a></article>';
      }).join('');
    }
    buildFilters();
    el.vGrid.setAttribute('aria-pressed', !state.list);
    el.vList.setAttribute('aria-pressed', state.list);
  }

  function sync() {
    try {
      var h = state.track === 'all' ? '' : '#' + state.track;
      history.replaceState(null, '', location.pathname + (state.q ? '?q=' + encodeURIComponent(state.q) : '') + h);
    } catch (e) { /* file:// or sandbox: ignore */ }
    render();
  }

  /* events */
  document.querySelector('.side').addEventListener('click', function (e) {
    var b = e.target.closest('.fbtn'); if (!b) return;
    state[b.dataset.k] = b.dataset.v; sync();
  });
  el.q.addEventListener('input', function () { state.q = el.q.value.trim(); sync(); });
  el.clear.addEventListener('click', function () { el.q.value = ''; state.q = ''; sync(); el.q.focus(); });
  el.sort.addEventListener('change', function () { state.sort = el.sort.value; render(); });
  el.vGrid.addEventListener('click', function () { state.list = false; render(); });
  el.vList.addEventListener('click', function () { state.list = true; render(); });
  document.addEventListener('keydown', function (e) {
    if (e.key === '/' && !/INPUT|TEXTAREA|SELECT/.test(document.activeElement.tagName)) { e.preventDefault(); el.q.focus(); }
  });
  window.addEventListener('hashchange', function () { readHash(); render(); });

  function readHash() {
    var h = location.hash.replace('#', '');
    if (tracks.some(function (t) { return t.id === h; })) state.track = h;
  }
  try { var qs = new URLSearchParams(location.search).get('q'); if (qs) { state.q = qs; el.q.value = qs; } } catch (e) { }
  readHash();
  render();
})();
