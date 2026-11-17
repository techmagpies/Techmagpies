/* TechMagpies — shared behaviour
   1. icon set (inline SVG, no network)
   2. navbar + footer injected from one place
   3. login state, mentor modal, small helpers
   Usage:  <body data-page="home" data-base="" data-nav="light">
           <script src="assets/js/tm.js"></script>  (placed right after <body>) */
(function () {
  'use strict';

  var EMAIL = 'connect@techmagpies.com';
  var PHONE = '9182107413';

  /* ---------- 1. ICONS (24px grid, 1.8 stroke) ---------- */
  var I = {
    'arrow-right': '<path d="M5 12h14M13 6l6 6-6 6"/>',
    'arrow-up-right': '<path d="M7 17L17 7M8 7h9v9"/>',
    'home': '<path d="M3 10.500L12 3l9 7.500M5.500 9v11h13V9M9 20v-6h6v6"/>',
    'briefcase': '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 012-2h4a2 2 0 012 2v2M3 12h18M10 12v2h4v-2"/>',
    'info': '<circle cx="12" cy="12" r="9"/><path d="M12 11v5M12 8h.01"/>',
    'check': '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    'plus': '<path d="M12 5v14M5 12h14"/>',
    'minus': '<path d="M5 12h14"/>',
    'menu': '<path d="M4 7h16M4 12h16M4 17h16"/>',
    'x': '<path d="M6 6l12 12M18 6L6 18"/>',
    'search': '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    'code': '<path d="M8 8l-4 4 4 4M16 8l4 4-4 4M13.5 5l-3 14"/>',
    'terminal': '<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M7 9l3 3-3 3M12.5 15H17"/>',
    'cpu': '<rect x="7" y="7" width="10" height="10" rx="1.5"/><rect x="10" y="10" width="4" height="4" rx=".6"/><path d="M9 3v4M15 3v4M9 17v4M15 17v4M3 9h4M3 15h4M17 9h4M17 15h4"/>',
    'spark': '<path d="M11 3l1.9 5.6L18.5 10.5l-5.6 1.9L11 18l-1.9-5.6L3.5 10.5l5.6-1.9z"/><path d="M19 15l.8 2.2L22 18l-2.2.8L19 21l-.8-2.2L16 18l2.2-.8z"/>',
    'globe': '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3.2 3.4 3.2 14.6 0 18M12 3c-3.2 3.4-3.2 14.6 0 18"/>',
    'pen': '<path d="M4 20l1-4L16.5 4.5a2.1 2.1 0 013 3L8 19z"/><path d="M14 7l3 3"/>',
    'share': '<circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="6" r="2.5"/><circle cx="18" cy="18" r="2.5"/><path d="M8.2 10.8l7.6-3.6M8.2 13.2l7.6 3.6"/>',
    'image': '<rect x="3" y="4" width="18" height="16" rx="2.5"/><circle cx="9" cy="10" r="1.8"/><path d="M4 18l5-5 4 4 3-3 4 4"/>',
    'file': '<path d="M6 3h8l5 5v13H6z"/><path d="M14 3v5h5M9 13h6M9 17h6"/>',
    'clipboard': '<rect x="5" y="4" width="14" height="17" rx="2.5"/><path d="M9 4h6v3H9zM9 14l2 2 4-4"/>',
    'bulb': '<path d="M9 18h6M10 21h4M12 3a6 6 0 00-3.5 10.9c.6.5 1 1.3 1 2.1h5c0-.8.4-1.6 1-2.1A6 6 0 0012 3z"/>',
    'rocket': '<path d="M14 4c4 0 6 2 6 6-2 4-5 6-8 7l-5-5c1-3 3-6 7-8z"/><circle cx="15" cy="9" r="1.5"/><path d="M7 14c-2 .5-3 2-3.5 5.5C7 19 8.500 18 9 16.500M9 15l-2-2"/>',
    'clock': '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    'users': '<circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14c2.500 0 4.500 2 4.500 4.500"/>',
    'shield': '<path d="M12 3l8 3v6c0 4.500-3.200 8-8 9-4.800-1-8-4.500-8-9V6z"/><path d="M9 12l2 2 4-4"/>',
    'target': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.2"/>',
    'trend': '<path d="M3 17l6-6 4 4 8-8M15 7h6v6"/>',
    'layers': '<path d="M12 3l9 5-9 5-9-5z"/><path d="M3 12.500l9 5 9-5M3 17l9 5 9-5"/>',
    'database': '<ellipse cx="12" cy="6" rx="8" ry="3"/><path d="M4 6v12c0 1.700 3.600 3 8 3s8-1.300 8-3V6M4 12c0 1.700 3.600 3 8 3s8-1.300 8-3"/>',
    'cloud': '<path d="M7 18a4.500 4.500 0 01-.5-9 6 6 0 0111.500 1.500A3.800 3.800 0 0117 18z"/>',
    'lock': '<rect x="5" y="11" width="14" height="10" rx="2.500"/><path d="M8 11V8a4 4 0 018 0v3"/>',
    'signal': '<path d="M2.500 9a15 15 0 0119 0M5.500 12.500a10.500 10.500 0 0113 0M9 16a5 5 0 016 0"/><circle cx="12" cy="19.500" r=".9"/>',
    'bolt': '<path d="M13 2L4 14h7l-1 8 9-12h-7z"/>',
    'sun': '<circle cx="12" cy="12" r="4"/><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.900 4.900L7 7M17 17l2.100 2.100M4.900 19.100L7 17M17 7l2.100-2.100"/>',
    'server': '<rect x="3" y="4" width="18" height="7" rx="2"/><rect x="3" y="13" width="18" height="7" rx="2"/><path d="M7 7.500h.01M7 16.500h.01"/>',
    'mobile': '<rect x="7" y="2.500" width="10" height="19" rx="2.500"/><path d="M11 18.500h2"/>',
    'branch': '<circle cx="6" cy="5" r="2"/><circle cx="6" cy="19" r="2"/><circle cx="18" cy="8" r="2"/><path d="M6 7v10M18 10c0 4-4 5-10 6.500"/>',
    'play': '<path d="M7 5l12 7-12 7z"/>',
    'calendar': '<rect x="3" y="5" width="18" height="16" rx="2.500"/><path d="M3 10h18M8 3v4M16 3v4"/>',
    'mail': '<rect x="3" y="5" width="18" height="14" rx="2.500"/><path d="M3 7l9 6.500L21 7"/>',
    'phone': '<path d="M5 4h4l2 5-2.500 1.500a11 11 0 005 5L15 13l5 2v4a2 2 0 01-2 2A15 15 0 013 6a2 2 0 012-2z"/>',
    'pin': '<path d="M12 21s7-6.200 7-11a7 7 0 10-14 0c0 4.800 7 11 7 11z"/><circle cx="12" cy="10" r="2.500"/>',
    'award': '<circle cx="12" cy="9" r="6"/><path d="M8.500 14L7 22l5-3 5 3-1.500-8"/>',
    'book': '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2z"/><path d="M4 19V5M8 7h7"/>',
    'message': '<path d="M4 5h16v11H9l-5 4z"/>',
    'grid': '<rect x="3" y="3" width="7" height="7" rx="1.500"/><rect x="14" y="3" width="7" height="7" rx="1.500"/><rect x="3" y="14" width="7" height="7" rx="1.500"/><rect x="14" y="14" width="7" height="7" rx="1.500"/>',
    'list': '<path d="M8 6h13M8 12h13M8 18h13M3.500 6h.01M3.500 12h.01M3.500 18h.01"/>',
    'chevron-down': '<path d="M6 9l6 6 6-6"/>',
    'compass': '<circle cx="12" cy="12" r="9"/><path d="M15.500 8.500l-2 5-5 2 2-5z"/>',
    'box': '<path d="M12 3l8 4.500v9L12 21l-8-4.500v-9z"/><path d="M4 7.500l8 4.500 8-4.500M12 12v9"/>',
    'robot': '<rect x="5" y="8" width="14" height="11" rx="3"/><path d="M12 4v4M9 13.500h.01M15 13.500h.01M9.500 16.500h5M3 13v3M21 13v3"/><circle cx="12" cy="3.500" r="1"/>',
    'atom': '<ellipse cx="12" cy="12" rx="10" ry="4"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)"/><ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)"/><circle cx="12" cy="12" r="1.500"/>',
    'radar': '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="4.500"/><path d="M12 12l6-6"/>',
    'wave': '<path d="M2 12c1.500-6 3-6 4.500 0s3 6 4.500 0 3-6 4.500 0 3 6 4.500 0"/>',
    'gear': '<circle cx="12" cy="12" r="8.500" stroke-width="3" stroke-dasharray="2.600 2.600"/><circle cx="12" cy="12" r="5.500"/><circle cx="12" cy="12" r="1.800"/>',
    'eye': '<path d="M2 12s3.500-7 10-7 10 7 10 7-3.500 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/>',
    'flask': '<path d="M9 3h6M10 3v6l-5.500 10a1.500 1.500 0 001.300 2.200h12.400a1.500 1.500 0 001.300-2.200L14 9V3M7.500 15h9"/>',
    'chart': '<path d="M3 21h18M6 21V11M12 21V4M18 21v-7"/>',
    'network': '<circle cx="12" cy="5" r="2.500"/><circle cx="5" cy="19" r="2.500"/><circle cx="19" cy="19" r="2.500"/><path d="M12 7.500v4M12 11.500L6.500 17M12 11.500l5.500 5.500"/>',
    'orbit': '<circle cx="12" cy="12" r="2.200"/><ellipse cx="12" cy="12" rx="10" ry="4.500" transform="rotate(-30 12 12)"/><circle cx="19.500" cy="7.500" r="1.200"/>',
    'car': '<path d="M5 16l1.500-5a2 2 0 011.900-1.400h7.200a2 2 0 011.900 1.400L19 16M3 16h18v3H3z"/><circle cx="7.500" cy="19" r="1.300"/><circle cx="16.500" cy="19" r="1.300"/>',
    'circuit': '<path d="M2 12h5l2-4 3 8 2-4h8"/>',
    'send': '<path d="M21 3L3 10.500l7 3 3 7z"/><path d="M21 3l-11 10.500"/>',
    'brackets': '<path d="M8 4H6a1 1 0 00-1 1v14a1 1 0 001 1h2M16 4h2a1 1 0 011 1v14a1 1 0 01-1 1h-2"/>',
    'figma': '<rect x="4" y="3" width="8" height="6" rx="3"/><rect x="12" y="3" width="8" height="6" rx="3"/><rect x="4" y="9" width="8" height="6" rx="3"/><circle cx="16" cy="12" r="3"/><path d="M4 18a3 3 0 013-3h5v3a3 3 0 01-6 0z"/>',
    'github': '<path d="M9 19c-4 1.300-4-2-6-2.500M15 21v-3.200a2.800 2.800 0 00-.8-2.200c2.700-.3 5.500-1.300 5.500-6a4.600 4.600 0 00-1.300-3.200 4.300 4.300 0 00-.1-3.200s-1-.3-3.300 1.300a11.400 11.400 0 00-6 0C6.700 2.900 5.700 3.200 5.700 3.200a4.300 4.300 0 00-.1 3.200A4.600 4.600 0 004.300 9.600c0 4.600 2.800 5.700 5.500 6a2.800 2.800 0 00-.8 2.200V21"/>',
    'linkedin': '<rect x="3" y="3" width="18" height="18" rx="3.500"/><path d="M8 10.500V16M8 7.500h.01M12 16v-5.500M12 12.500c0-1.500 1-2.200 2.200-2.200 1.500 0 2.300 1 2.300 2.500V16"/>',
    'instagram': '<rect x="3" y="3" width="18" height="18" rx="5.500"/><circle cx="12" cy="12" r="4"/><path d="M17.500 6.500h.01"/>',
    'x-social': '<path d="M4 4l16 16M20 4L4 20"/>',
    'facebook': '<path d="M14 8h3V4h-3a4 4 0 00-4 4v3H7v4h3v6h4v-6h3l1-4h-4V8.500A.5.5 0 0114 8z"/>',
    'youtube': '<rect x="2.500" y="6" width="19" height="12" rx="4"/><path d="M10 9.500v5l4.500-2.500z"/>',
    'dot': '<circle cx="12" cy="12" r="3"/>'
  };
  // path strings above were written with decimals like 4.500; browsers parse them fine.

  function svg(name, size, cls) {
    var body = I[name] || I['dot'];
    return '<svg class="ic' + (cls ? ' ' + cls : '') + '" width="' + (size || 20) + '" height="' + (size || 20) +
      '" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false">' + body + '</svg>';
  }

  function hydrate(root) {
    (root || document).querySelectorAll('[data-i]').forEach(function (el) {
      if (el.__done) return;
      el.__done = true;
      var s = el.getAttribute('data-s');
      el.insertAdjacentHTML('afterbegin', svg(el.getAttribute('data-i'), s ? +s : 20));
    });
  }

  /* ---------- 2. NAV + FOOTER ---------- */
  var body = document.body;
  var base = body.getAttribute('data-base') || '';
  var page = body.getAttribute('data-page') || '';
  var navTheme = body.getAttribute('data-nav') || 'light';

  var links = [
    ['home', 'Home', base + 'index.html', 'home'],
    ['courses', 'Courses', base + 'courses.html', 'book'],
    ['services', 'Services', base + 'services.html', 'briefcase'],
    ['community', 'Community', base + 'community.html', 'users'],
    ['about', 'About', base + 'about.html', 'info']
  ];
  var logoSrc = base + 'assets/img/' + (navTheme === 'dark' ? 'techmagpies-logo-light.png' : 'techmagpies-logo-transparent.png');

  function navHTML() {
    function linkItems(mobile) {
      return links.map(function (l) {
        var active = l[0] === page ? ' class="is-active" aria-current="page"' : '';
        return '<a href="' + l[2] + '"' + active + (mobile ? '><span class="nav__mobile-icon">' + svg(l[3], 20) + '</span><span>' + l[1] + '</span></a>' : '>' + l[1] + '</a>');
      }).join('');
    }
    var items = linkItems(false);
    var mobileItems = linkItems(true);
    return '' +
      '<header class="nav nav--' + navTheme + '" id="tmNav">' +
      '<div class="nav__bar tmc">' +
      '<div class="nav__brand"><a class="nav__logo" href="' + base + 'index.html" aria-label="TechMagpies home"><img src="' + logoSrc + '" alt="TechMagpies" width="115" height="66"></a><span class="nav__tagline">Beyond Learning. Beyond Innovation.</span></div>' +
      '<nav class="nav__links" aria-label="Primary">' + items + '</nav>' +
      '<div class="nav__cta">' +
      '<span id="userName" class="nav__user"></span>' +
      '<a href="' + base + 'auth.html" class="tmb tmb--sm tmb--primary" id="loginBtn">Login</a>' +
      '</div></div><nav class="nav__mobile" aria-label="Mobile primary">' + mobileItems + '</nav></header>';
  }

  function footHTML() {
    var tracks = [['CSE', 'cse'], ['AI / ML', 'aiml'], ['ECE', 'ece'], ['EEE', 'eee'], ['Dev tools', 'tools']];
    return '' +
      '<footer class="foot" id="tmFoot"><div class="tmc">' +
      '<div class="foot__top">' +
      '<div class="foot__brand">' +
      '<img src="' + base + 'assets/img/techmagpies-logo-light.png" alt="TechMagpies" width="210" height="121" loading="lazy">' +
      '<p>Structured roadmaps, live classes and real project work for students who want to be hired for what they can build.</p>' +
      '<a class="foot__mail" href="mailto:' + EMAIL + '">' + svg('mail', 18) + EMAIL + '</a>' +
      '</div>' +
      '<div class="foot__col"><h4>Explore</h4><ul>' +
      '<li><a href="' + base + 'index.html">Home</a></li>' +
      '<li><a href="' + base + 'courses.html">Courses</a></li>' +
      '<li><a href="' + base + 'services.html">Services</a></li>' +
      '<li><a href="' + base + 'community.html">Community</a></li>' +
      '<li><a href="' + base + 'about.html">About</a></li>' +
      '<li class="foot__login"><a href="' + base + 'auth.html">Login</a></li></ul></div>' +
      '<div class="foot__col"><h4>Tracks</h4><ul>' + tracks.map(function (t) {
        return '<li><a href="' + base + 'courses.html#' + t[1] + '">' + t[0] + '</a></li>';
      }).join('') + '</ul></div>' +
      '<div class="foot__col"><h4>Contact</h4><ul class="foot__contact">' +
      '<li>' + svg('mail', 16) + '<a href="mailto:' + EMAIL + '">' + EMAIL + '</a></li>' +
      '<li>' + svg('phone', 16) + '<a href="tel:' + PHONE + '">' + PHONE + '</a></li>' +
      '<li>' + svg('pin', 16) + '<span>Proddatur</span></li></ul>' +
      '<div class="foot__social">' +
      '<a href="https://www.linkedin.com/company/techmagpies/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">' + svg('linkedin', 18) + '</a>' +
      '<a href="https://www.instagram.com/techmagpies_official/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">' + svg('instagram', 18) + '</a></div></div>' +
      '</div>' +
      '<div class="foot__bottom"><span>© 2026 TechMagpies. All rights reserved.</span><span>Built for students who build.</span></div>' +
      '</div></footer>';
  }

  // inject (script sits right after <body> so nav appears with first paint)
  var navMount = document.getElementById('tm-nav');
  if (navMount) navMount.outerHTML = navHTML();
  else body.insertAdjacentHTML('afterbegin', navHTML());
  function mountFooter() {
    var footMount = document.getElementById('tm-footer');
    if (footMount) { footMount.outerHTML = footHTML(); hydrate(); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', mountFooter);
  else mountFooter();

  /* ---------- nav behaviour ---------- */
  var nav = document.getElementById('tmNav');

  var lastY = 0;
  function onScroll() {
    var y = window.scrollY || 0;
    nav.classList.toggle('is-stuck', y > 8);
    lastY = y;
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------- login state (same storage key as before) ---------- */
  try {
    var user = JSON.parse(localStorage.getItem('loggedInUser'));
    var btn = document.getElementById('loginBtn');
    if (user && user.name && btn) {
      btn.textContent = 'Hi, ' + user.name.split(' ')[0];
      btn.setAttribute('href', '#');
      btn.setAttribute('title', 'Click to log out');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        if (confirm('Do you want to log out?')) { localStorage.removeItem('loggedInUser'); window.location.reload(); }
      });
    }
  } catch (err) { /* storage blocked: stay logged out */ }

  /* ---------- 3. MENTOR MODAL (opens from [data-mentor]) ---------- */
  var modal;
  function buildModal() {
    var wrap = document.createElement('div');
    wrap.className = 'modal';
    wrap.id = 'mentorModal';
    wrap.hidden = true;
    wrap.innerHTML = '' +
      '<div class="modal__scrim" data-close></div>' +
      '<div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="mmTitle">' +
      '<button class="modal__x" data-close aria-label="Close">' + svg('x', 20) + '</button>' +
      '<div class="modal__form" id="mmForm">' +
      '<h3 id="mmTitle">Book a mentor session</h3>' +
      '<p class="modal__lead">Tell us where you are. A mentor replies by email within one working day.</p>' +
      '<form novalidate>' +
      '<div class="fld"><label for="mmName">Your name</label><input id="mmName" name="name" autocomplete="name" required></div>' +
      '<div class="fld"><label for="mmMail">Email</label><input id="mmMail" name="email" type="email" autocomplete="email" required></div>' +
      '<div class="fld"><label for="mmTrack">What do you want help with?</label><select id="mmTrack" name="track">' +
      '<option>Choosing a career path</option><option>CSE / software roadmap</option><option>AI / ML roadmap</option><option>ECE / EEE roadmap</option><option>Resume and interview prep</option><option>Something else</option></select></div>' +
      '<div class="fld"><label for="mmMsg">Anything we should know? <em>(optional)</em></label><textarea id="mmMsg" name="msg" rows="3"></textarea></div>' +
      '<p class="fld__err" id="mmErr" role="alert" hidden></p>' +
      '<button class="tmb tmb--primary tmb--block" type="submit">Send request</button>' +
      '</form></div>' +
      '<div class="modal__done" id="mmDone" hidden>' +
      '<span class="modal__tick">' + svg('check', 28) + '</span>' +
      '<h3>Your email is ready</h3>' +
      '<p>Your mail app opened with the request addressed to <b>' + EMAIL + '</b>. Press send there and we will take it from here.</p>' +
      '<button class="tmb tmb--ghost" data-close>Close</button></div>' +
      '</div>';
    document.body.appendChild(wrap);
    wrap.addEventListener('click', function (e) { if (e.target.hasAttribute('data-close') || e.target.closest('[data-close]')) closeModal(); });
    wrap.querySelector('form').addEventListener('submit', function (e) {
      e.preventDefault();
      var f = e.target, n = f.name.value.trim(), m = f.email.value.trim(), err = document.getElementById('mmErr');
      if (!n) { err.textContent = 'Enter your name so we know who to reply to.'; err.hidden = false; f.name.focus(); return; }
      if (!/^\S+@\S+\.\S+$/.test(m)) { err.textContent = 'Enter a valid email address, for example name@example.com.'; err.hidden = false; f.email.focus(); return; }
      err.hidden = true;
      var subject = 'Mentor session request — ' + n;
      var text = 'Name: ' + n + '\nEmail: ' + m + '\nTopic: ' + f.track.value + '\n\n' + (f.msg.value.trim() || '(no extra notes)');
      window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(text);
      document.getElementById('mmForm').hidden = true;
      document.getElementById('mmDone').hidden = false;
    });
    return wrap;
  }
  var lastFocus;
  function openModal() {
    if (!modal) modal = buildModal();
    lastFocus = document.activeElement;
    document.getElementById('mmForm').hidden = false;
    document.getElementById('mmDone').hidden = true;
    modal.hidden = false;
    document.documentElement.classList.add('no-scroll');
    requestAnimationFrame(function () { modal.classList.add('is-open'); });
    setTimeout(function () { var f = document.getElementById('mmName'); if (f) f.focus(); }, 60);
  }
  function closeModal() {
    if (!modal) return;
    modal.classList.remove('is-open');
    document.documentElement.classList.remove('no-scroll');
    setTimeout(function () { modal.hidden = true; }, 220);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  document.addEventListener('click', function (e) {
    var t = e.target.closest('[data-mentor]');
    if (t) { e.preventDefault(); openModal(); }
  });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal && !modal.hidden) closeModal(); });
  window.openForm = openModal;   // keeps the old inline handler name working
  window.closeForm = closeModal;

  /* ---------- helpers ---------- */
  window.TM = { svg: svg, hydrate: hydrate, email: EMAIL, icons: I };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', function () { hydrate(); });
  else hydrate();
})();
