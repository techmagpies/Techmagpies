/* TechMagpies Community page.
   - renders every section from assets/js/community-data.js
   - hash routes for detail views:  #/project/<id>  #/challenge/<id>  #/team/<id>  #/session/<id>  #/story/<id>
   - there is NO backend: forms build a pre-filled email (same approach as the site's mentor form),
     and the UI says so instead of pretending the request was stored. */
(function () {
  'use strict';
  var D = window.TM_COMMUNITY;
  var TM = window.TM;
  if (!D || !TM) return;

  var EMAIL = TM.email;
  var main = document.getElementById('cMain');
  var detail = document.getElementById('cDetail');

  /* ---------- helpers ---------- */
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]; }); }
  function find(list, id) { return list.filter(function (x) { return x.id === id; })[0]; }
  function ic(name, size) { return TM.svg(name, size || 18); }
  function badge(item) { return item && item.sample ? '<span class="c-badge" title="Demonstration content">Sample</span>' : ''; }
  function tags(list) { return '<ul class="c-tags">' + list.map(function (t) { return '<li>' + esc(t) + '</li>'; }).join('') + '</ul>'; }
  function initials(name) { return name.replace(/sample\s*/i, '').split(/\s+/).map(function (w) { return w[0]; }).join('').slice(0, 2).toUpperCase() || 'S'; }
  function thumb(p, big) {
    var inner = p.photo ? '<img src="' + esc(p.photo) + '" alt="" loading="lazy" onerror="this.remove()">' :
      '<div class="c-win"><i></i><i></i><i></i></div><div class="c-ph">' + ic(p.icon, big ? 64 : 40) + '</div><div class="c-bars"><b></b><b></b></div>';
    return '<div class="c-thumb c-thumb--' + p.tone + (p.fit === 'contain' ? ' c-thumb--contain' : '') + (big ? ' c-thumb--big' : '') + '" aria-hidden="true">' + inner + '</div>';
  }
  var TONES = ['blue', 'purple', 'green', 'orange', 'pink'];

  function at(offsetDays, h, m) { var d = new Date(); d.setDate(d.getDate() + offsetDays); d.setHours(h, m, 0, 0); return d; }
  function nextDow(dow, h, m) {
    var d = new Date(); d.setHours(h, m, 0, 0);
    var diff = (dow - d.getDay() + 7) % 7;
    d.setDate(d.getDate() + diff);
    if (d <= new Date()) d.setDate(d.getDate() + 7);
    return d;
  }
  function fDate(d) { return d.toLocaleDateString('en-IN', { weekday: 'short', day: 'numeric', month: 'short' }); }
  function fTime(d) { return d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit' }); }
  function daysLeft(d) { var n = Math.ceil((d - new Date()) / 864e5); return n <= 1 ? 'Ends today' : n + ' days left'; }

  /* derived dates (computed once so cards and detail views agree) */
  var ch = D.challenge;
  ch.deadline = nextDow(ch.deadlineDow, ch.deadlineHour, ch.deadlineMin);
  D.sessions.forEach(function (s) { s.when = at(s.dayOffset, s.hour, s.min); });

  function ghLink(p) {
    if (p.github) return { href: p.github, label: 'View on GitHub', real: true };
    var topic = String(p.tech[0]).toLowerCase().replace(/[^a-z0-9]+/g, '-');
    return { href: 'https://github.com/topics/' + topic, label: 'Browse ' + p.tech[0] + ' projects on GitHub', real: false };
  }
  function extBtn(href, cls, html) { return '<a class="btn ' + cls + '" href="' + esc(href) + '" target="_blank" rel="noopener noreferrer">' + html + '</a>'; }

  /* ---------- overview sections ---------- */
  var FEATURES = [
    ['layers', 'Student Project Showcase', 'Explore projects built by other students, with code and live demos.', '#projects'],
    ['target', 'Weekly Tech Challenges', 'A new build task every week with clear instructions and a deadline.', '#challenge'],
    ['users', 'Find Your Team', 'Match on skills, pick a role and build something together.', '#teams'],
    ['message', 'Ask a Mentor', 'Join live sessions with working engineers and ask your questions.', '#mentors'],
    ['users', 'Community Members', 'Meet students in the TechMagpies community.', '#achievements']
  ];
  function renderFeatures() {
    document.getElementById('cFeat').innerHTML = FEATURES.map(function (f, i) {
      return '<li><a class="c-fcard c-fcard--' + TONES[i] + '" href="' + f[3] + '"><span class="c-fcard__ic">' + ic(f[0], 24) + '</span><h3>' + esc(f[1]) + '</h3><p>' + esc(f[2]) + '</p><span class="c-fcard__go">Open ' + ic('arrow-right', 16) + '</span></a></li>';
    }).join('');
  }

  function projectCard(p) {
    var g = ghLink(p);
    return '<article class="c-card">' + thumb(p) +
      '<div class="c-card__body"><div class="c-card__meta">' + badge(p) + '<span class="c-by">by ' + esc(p.author) + '</span></div>' +
      '<h3><a href="#/project/' + p.id + '">' + esc(p.title) + '</a></h3><p>' + esc(p.short) + '</p>' + tags(p.tech) +
      '<div class="c-actions"><a class="btn btn--primary btn--sm" href="#/project/' + p.id + '">View details ' + ic('arrow-right', 16) + '</a>' +
      '<a class="c-link" href="' + esc(g.href) + '" target="_blank" rel="noopener noreferrer" aria-label="' + esc(g.label) + ' (opens in a new tab)">' + ic('github', 18) + '<span>GitHub</span></a></div></div></article>';
  }

  function renderChallenge() {
    document.getElementById('cChallenge').innerHTML =
      '<div class="c-chal"><div class="c-chal__main"><span class="c-chal__tag">' + ic('award', 20) + 'Challenge of the Week ' + badge(ch) + '</span>' +
      '<h3>' + esc(ch.title) + '</h3><p>' + esc(ch.short) + '</p>' +
      '<ul class="c-chal__meta"><li>' + ic('calendar', 20) + '<span><small>Deadline</small><b>' + fDate(ch.deadline) + ', ' + fTime(ch.deadline) + '</b></span></li><li>' + ic('chart', 20) + '<span><small>Level</small><b>' + esc(ch.difficulty) + '</b></span></li><li>' + ic('clock', 20) + '<span><small>Time left</small><b>' + daysLeft(ch.deadline) + '</b></span></li></ul>' +
      tags(ch.tech) +
      '<div class="c-actions"><button class="btn c-btn-gold" type="button" data-act="submit-solution">Submit Your Solution ' + ic('arrow-right', 18) + '</button><a class="btn c-btn-line" href="#/challenge/' + ch.id + '">Challenge details</a></div></div>' +
      '<div class="c-chal__art" aria-hidden="true"><div class="c-laptop"><div class="c-laptop__bar"><i></i><i></i><i></i></div><div class="c-laptop__body"><b></b><b></b><b></b></div></div><div class="c-phone"><b></b><b></b></div></div></div>';
  }

  function sessionCard(s) {
    return '<article class="c-row"><div class="c-date"><small>' + s.when.toLocaleDateString('en-IN', { month: 'short' }).toUpperCase() + '</small><b>' + s.when.getDate() + '</b></div>' +
      '<div class="c-row__main"><div class="c-card__meta">' + badge(s) + '<span class="c-level">' + esc(s.topic) + '</span></div><h3><a href="#/session/' + s.id + '">' + esc(s.title) + '</a></h3>' +
      '<p class="c-sub"><b>' + esc(s.mentor) + '</b> · ' + esc(s.role) + '</p><p class="c-sub c-sub--t">' + ic('clock', 14) + fTime(s.when) + ' · ' + esc(s.duration) + '</p></div>' +
      '<div class="c-row__act"><button class="btn c-btn-teal btn--sm" type="button" data-act="register" data-id="' + s.id + '">Register</button><a class="c-link" href="#/session/' + s.id + '"><span>Details</span></a></div></article>';
  }

  function teamCard(t) {
    return '<article class="c-row c-row--team"><span class="c-av c-av--lg c-av--' + TONES[(t.title.length) % 5] + '">' + ic(t.icon, 24) + '</span>' +
      '<div class="c-row__main"><div class="c-card__meta">' + badge(t) + '<span class="c-level">' + t.roles.reduce(function (n, r) { return n + r[1]; }, 0) + ' open roles</span></div>' +
      '<h3><a href="#/team/' + t.id + '">' + esc(t.title) + '</a></h3><p class="c-sub">' + esc(t.short) + '</p>' + tags(t.skills.slice(0, 3)) + '</div>' +
      '<div class="c-row__act"><button class="btn c-btn-line btn--sm" type="button" data-act="join-team" data-id="' + t.id + '">Request to Join</button><a class="c-link" href="#/team/' + t.id + '"><span>View</span></a></div></article>';
  }

  function storyCard(s) {
    var i = D.stories.indexOf(s);
    var vis = s.photo ? '<img src="' + esc(s.photo) + '" alt="' + esc(s.name) + ' profile photograph" loading="lazy" onerror="this.parentNode.classList.add(\'is-empty\');this.remove()">' : '';
    var interests = s.interests && s.interests.length ? '<div class="c-story__interests"><b>Skills &amp; interests</b>' + tags(s.interests) + '</div>' : '';
    var detail = s.location ? '<p class="c-story__detail">' + esc(s.location) + '</p>' : '';
    if (s.education) detail += '<p class="c-story__detail">' + esc(s.education) + '</p>';
    return '<article class="c-story c-story--profile"><div class="c-story__img c-story__img--profile c-story__img--' + TONES[(i + 1) % 5] + (s.photo ? '' : ' is-empty') + '">' + vis + '<span class="c-story__ini">' + esc(initials(s.name)) + '</span></div>' +
      '<div class="c-story__body"><h3 class="c-story__name">' + esc(s.name) + '</h3><p class="c-story__headline">' + esc(s.headline) + '</p>' + detail +
      '<p class="c-story__about">' + esc(s.about) + '</p>' + interests +
      extBtn(s.linkedin, 'c-story__linkedin', 'View LinkedIn Profile &rarr;') + '</div></article>';
  }

  function renderAll() {
    renderFeatures();
    document.getElementById('cProjects').innerHTML = D.projects.map(projectCard).join('');
    renderChallenge();
    document.getElementById('cSessions').innerHTML = D.sessions.map(sessionCard).join('');
    document.getElementById('cTeams').innerHTML = D.teams.map(teamCard).join('');
    document.getElementById('cStories').innerHTML = D.stories.map(storyCard).join('');
    document.getElementById('cRules').innerHTML = D.guidelines.map(function (r) { return '<li><b>' + esc(r[0]) + '</b><span>' + esc(r[1]) + '</span></li>'; }).join('');
  }

  /* ---------- detail views ---------- */
  function back(href, label) { return '<a class="c-back" href="' + href + '">' + ic('arrow-right', 16) + '<span>' + esc(label) + '</span></a>'; }
  function wrap(inner) { return '<section class="c-detail"><div class="container c-detail__in">' + inner + '</div></section>'; }

  var VIEWS = {
    project: function (id) {
      var p = find(D.projects, id); if (!p) return null;
      var g = ghLink(p);
      return { title: p.title, html: wrap(back('#projects', 'Back to projects') +
        '<div class="c-dgrid"><div>' + thumb(p, true) + '</div><div class="c-dmain"><div class="c-card__meta">' + badge(p) + '<span class="c-by">by ' + esc(p.author) + (p.college ? ' · ' + esc(p.college) : '') + '</span></div>' +
        '<h1 tabindex="-1">' + esc(p.title) + '</h1><p class="lead">' + esc(p.short) + '</p>' +
        '<h2>About this project</h2><p>' + esc(p.long) + '</p><h2>Highlights</h2><ul class="c-ticks">' + p.highlights.map(function (h) { return '<li>' + ic('check', 18) + esc(h) + '</li>'; }).join('') + '</ul>' +
        '<h2>Technologies used</h2>' + tags(p.tech) +
        '<div class="c-actions c-actions--lg">' + extBtn(g.href, 'btn--primary', ic('github', 18) + esc(g.label) + ic('arrow-up-right', 16)) +
        (p.demo ? extBtn(p.demo, 'btn--ghost', 'Live demo ' + ic('arrow-up-right', 16)) : '') + '</div>' +
        (g.real ? '' : '<p class="c-fine">Sample project: the button opens GitHub\'s topic page for ' + esc(p.tech[0]) + '. A real project links straight to the student\'s repository' + (p.demo ? '' : ' and, when available, a live demo') + '.</p>') +
        '</div></div>') };
    },
    challenge: function (id) {
      if (id !== ch.id) return null;
      return { title: ch.title, html: wrap(back('#challenge', 'Back to challenges') +
        '<div class="c-dmain c-dmain--solo"><div class="c-card__meta">' + badge(ch) + '<span class="c-level">' + esc(ch.difficulty) + '</span></div>' +
        '<h1 tabindex="-1">' + esc(ch.title) + '</h1><p class="lead">' + esc(ch.description) + '</p>' +
        '<p class="c-deadline">' + ic('clock', 18) + '<span>Deadline: <b>' + fDate(ch.deadline) + ', ' + fTime(ch.deadline) + '</b></span><em>' + daysLeft(ch.deadline) + '</em></p>' +
        '<h2>Technology tags</h2>' + tags(ch.tech) +
        '<h2>Instructions</h2><ol class="c-steps">' + ch.instructions.map(function (x) { return '<li>' + esc(x) + '</li>'; }).join('') + '</ol>' +
        '<h2>How to submit</h2><p>' + esc(ch.submit) + '</p>' +
        '<div class="c-actions c-actions--lg"><button class="btn btn--primary" type="button" data-act="submit-solution">Submit Solution</button></div></div>') };
    },
    team: function (id) {
      var t = find(D.teams, id); if (!t) return null;
      return { title: t.title, html: wrap(back('#teams', 'Back to teams') +
        '<div class="c-dmain c-dmain--solo"><div class="c-card__meta">' + badge(t) + '<span class="c-level">Team opportunity</span></div>' +
        '<h1 tabindex="-1">' + esc(t.title) + '</h1><p class="lead">' + esc(t.short) + '</p>' +
        '<h2>Project description</h2><p>' + esc(t.long) + '</p>' +
        '<h2>Required skills</h2>' + tags(t.skills) +
        '<h2>Team roles</h2><ul class="c-roles">' + t.roles.map(function (r) { return '<li><b>' + esc(r[0]) + '</b><span>' + r[1] + ' open</span></li>'; }).join('') + '</ul>' +
        '<div class="c-actions c-actions--lg"><button class="btn btn--primary" type="button" data-act="join-team" data-id="' + t.id + '">Request to Join</button></div></div>') };
    },
    session: function (id) {
      var s = find(D.sessions, id); if (!s) return null;
      return { title: s.title, html: wrap(back('#mentors', 'Back to sessions') +
        '<div class="c-dmain c-dmain--solo"><div class="c-card__meta">' + badge(s) + '<span class="c-level">' + esc(s.topic) + '</span></div>' +
        '<h1 tabindex="-1">' + esc(s.title) + '</h1>' +
        '<p class="c-person c-person--lg"><span class="c-av">' + ic('users', 20) + '</span><span><b>' + esc(s.mentor) + '</b><em>' + esc(s.role) + '</em></span></p>' +
        '<p class="c-when c-when--lg">' + ic('calendar', 18) + '<span>' + fDate(s.when) + ' · ' + fTime(s.when) + ' (your local time) · ' + esc(s.duration) + '</span></p>' +
        '<h2>About the session</h2><p>' + esc(s.about) + '</p><h2>Agenda</h2><ul class="c-ticks">' + s.agenda.map(function (a) { return '<li>' + ic('check', 18) + esc(a) + '</li>'; }).join('') + '</ul>' +
        '<div class="c-actions c-actions--lg"><button class="btn btn--primary" type="button" data-act="register" data-id="' + s.id + '">Register</button></div></div>') };
    },
    story: function (id) {
      var s = find(D.stories, id); if (!s) return null;
      return { title: s.name, html: wrap(back('#achievements', 'Back to community members') +
        '<div class="c-dmain c-dmain--solo"><p class="c-person c-person--lg"><span class="c-av c-av--g">' + esc(initials(s.name)) + '</span><span><b>' + esc(s.name) + '</b><em>' + esc(s.headline) + '</em></span></p>' +
        '<h1 tabindex="-1">About ' + esc(s.name) + '</h1><p class="lead">' + esc(s.about) + '</p>' +
        extBtn(s.linkedin, 'btn--primary', 'View LinkedIn Profile &rarr;') + '</div>') };
    }
  };

  var baseTitle = document.title;
  function route() {
    var h = location.hash || '';
    var m = h.match(/^#\/(project|challenge|team|session|story)\/([\w-]+)$/);
    var v = m && VIEWS[m[1]](m[2]);
    if (v) {
      detail.innerHTML = v.html;
      detail.hidden = false;
      main.hidden = true;
      document.title = v.title + ' — TechMagpies Community';
      window.scrollTo(0, 0);
      var hd = detail.querySelector('h1'); if (hd) hd.focus({ preventScroll: true });
      return;
    }
    detail.hidden = true; detail.innerHTML = '';
    main.hidden = false;
    document.title = baseTitle;
    var id = h.length > 1 && h.charAt(1) !== '/' ? h.slice(1) : '';
    var target = id && document.getElementById(id);
    if (target) target.scrollIntoView();
    else window.scrollTo(0, 0);
  }

  /* ---------- forms (email hand-off, no backend) ---------- */
  var modal, lastFocus, current;
  function buildModal() {
    var w = document.createElement('div');
    w.className = 'modal'; w.id = 'cModal'; w.hidden = true;
    w.innerHTML = '<div class="modal__scrim" data-close></div>' +
      '<div class="modal__panel" role="dialog" aria-modal="true" aria-labelledby="cmTitle">' +
      '<button class="modal__x" type="button" data-close aria-label="Close">' + ic('x', 20) + '</button>' +
      '<div class="modal__form" id="cmForm"><h3 id="cmTitle"></h3><p class="modal__lead" id="cmLead"></p><form novalidate id="cmFields"></form></div>' +
      '<div class="modal__done" id="cmDone" hidden><span class="modal__tick">' + ic('check', 28) + '</span><h3>Your email is ready</h3>' +
      '<p>Your email app opened with this request addressed to <b>' + esc(EMAIL) + '</b>. It is only sent once you press send there. If nothing opened, email us directly at that address.</p>' +
      '<button class="tmb tmb--ghost" type="button" data-close>Close</button></div></div>';
    document.body.appendChild(w);
    w.addEventListener('click', function (e) { if (e.target.closest('[data-close]')) closeModal(); });
    w.querySelector('form').addEventListener('submit', onSubmit);
    return w;
  }
  function fieldHTML(f) {
    var id = 'cf_' + f.name, req = f.required ? ' required' : '';
    var label = '<label for="' + id + '">' + esc(f.label) + (f.required ? '' : ' <em>(optional)</em>') + '</label>';
    var input;
    if (f.type === 'select') input = '<select id="' + id + '" name="' + f.name + '">' + f.options.map(function (o) { return '<option>' + esc(o) + '</option>'; }).join('') + '</select>';
    else if (f.type === 'textarea') input = '<textarea id="' + id + '" name="' + f.name + '" rows="3"' + req + '></textarea>';
    else input = '<input id="' + id + '" name="' + f.name + '" type="' + (f.type || 'text') + '"' + (f.autocomplete ? ' autocomplete="' + f.autocomplete + '"' : '') + (f.placeholder ? ' placeholder="' + esc(f.placeholder) + '"' : '') + req + '>';
    return '<div class="fld">' + label + input + '</div>';
  }
  function openForm(cfg) {
    if (!modal) modal = buildModal();
    current = cfg; lastFocus = document.activeElement;
    var base = [{ name: 'name', label: 'Your name', required: true, autocomplete: 'name' }, { name: 'email', label: 'Email', type: 'email', required: true, autocomplete: 'email' }];
    document.getElementById('cmTitle').textContent = cfg.title;
    document.getElementById('cmLead').textContent = cfg.lead;
    document.getElementById('cmFields').innerHTML = base.concat(cfg.fields || []).map(fieldHTML).join('') +
      '<p class="fld__err" id="cmErr" role="alert" hidden></p><button class="tmb tmb--primary tmb--block" type="submit">' + esc(cfg.cta) + '</button>' +
      '<p class="c-fine c-fine--form">This opens your email app with the details filled in. Nothing is stored on this website.</p>';
    document.getElementById('cmForm').hidden = false;
    document.getElementById('cmDone').hidden = true;
    modal.hidden = false;
    document.documentElement.classList.add('no-scroll');
    requestAnimationFrame(function () { modal.classList.add('is-open'); });
    setTimeout(function () { var f = document.getElementById('cf_name'); if (f) f.focus(); }, 60);
  }
  function closeModal() {
    if (!modal || modal.hidden) return;
    modal.classList.remove('is-open');
    document.documentElement.classList.remove('no-scroll');
    setTimeout(function () { modal.hidden = true; }, 220);
    if (lastFocus && lastFocus.focus) lastFocus.focus();
  }
  function onSubmit(e) {
    e.preventDefault();
    var f = e.target, err = document.getElementById('cmErr');
    function fail(msg, el) { err.textContent = msg; err.hidden = false; if (el) el.focus(); }
    var fields = [{ name: 'name', label: 'Name', required: true }, { name: 'email', label: 'Email', required: true }].concat(current.fields || []);
    for (var i = 0; i < fields.length; i++) {
      var fd = fields[i], el = f.elements[fd.name], v = el.value.trim();
      if (fd.required && !v) return fail('Please fill in: ' + fd.label.toLowerCase() + '.', el);
      if (fd.name === 'email' && !/^\S+@\S+\.\S+$/.test(v)) return fail('Enter a valid email address, for example name@example.com.', el);
      if (fd.type === 'url' && v && !/^https?:\/\/\S+\.\S+/i.test(v)) return fail('Enter a full link starting with https://', el);
    }
    err.hidden = true;
    var body = fields.map(function (fd) { var v = f.elements[fd.name].value.trim(); return fd.label + ': ' + (v || '(not provided)'); }).join('\n');
    window.location.href = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(current.subject) + '&body=' + encodeURIComponent(body);
    document.getElementById('cmForm').hidden = true;
    document.getElementById('cmDone').hidden = false;
  }
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });

  var FORMS = {
    join: function () { return { title: 'Join the community', lead: 'Tell us a little about you and what you want to build. We will reply with the next steps.', cta: 'Prepare email', subject: 'Community join request',
      fields: [{ name: 'college', label: 'College / university', required: false }, { name: 'interest', label: 'What interests you most?', type: 'select', options: ['Building projects', 'Weekly challenges', 'Finding a team', 'Mentor sessions', 'Everything'] }, { name: 'notes', label: 'Anything else?', type: 'textarea', required: false }] }; },
    project: function () { return { title: 'Share your project', lead: 'Add your project to the showcase. Only share work you built yourself or with your team.', cta: 'Prepare email', subject: 'Community project submission',
      fields: [{ name: 'title', label: 'Project title', required: true }, { name: 'repo', label: 'GitHub repository link', type: 'url', required: true, placeholder: 'https://github.com/you/project' }, { name: 'demo', label: 'Live demo link', type: 'url', required: false }, { name: 'about', label: 'Short description and technologies used', type: 'textarea', required: true }] }; },
    idea: function () { return { title: 'Post your team idea', lead: 'Describe your idea and who you are looking for.', cta: 'Prepare email', subject: 'Community team idea',
      fields: [{ name: 'idea', label: 'Project title or idea', required: true }, { name: 'skills', label: 'Skills you need', required: true }, { name: 'about', label: 'Short description', type: 'textarea', required: true }] }; },
    solution: function () { return { title: 'Submit your solution', lead: ch.title + ' — deadline ' + fDate(ch.deadline) + ', ' + fTime(ch.deadline) + '.', cta: 'Prepare email', subject: 'Weekly challenge solution — ' + ch.title,
      fields: [{ name: 'repo', label: 'GitHub repository link', type: 'url', required: true, placeholder: 'https://github.com/you/solution' }, { name: 'demo', label: 'Live link', type: 'url', required: false }, { name: 'notes', label: 'What did you build?', type: 'textarea', required: false }] }; },
    join_team: function (id) { var t = find(D.teams, id); return { title: 'Request to join', lead: t.title, cta: 'Prepare email', subject: 'Team join request — ' + t.title,
      fields: [{ name: 'role', label: 'Role you want', type: 'select', options: t.roles.map(function (r) { return r[0]; }) }, { name: 'skills', label: 'Your relevant skills', type: 'textarea', required: true }, { name: 'link', label: 'GitHub or LinkedIn link', type: 'url', required: false }] }; },
    register: function (id) { var s = find(D.sessions, id); return { title: 'Register for the session', lead: s.title + ' · ' + fDate(s.when) + ', ' + fTime(s.when) + ' (your local time)', cta: 'Prepare email', subject: 'Mentor session registration — ' + s.title,
      fields: [{ name: 'college', label: 'College / university', required: false }, { name: 'question', label: 'A question for the mentor', type: 'textarea', required: false }] }; }
  };

  document.addEventListener('click', function (e) {
    var j = e.target.closest('[data-join]');
    if (j) { e.preventDefault(); return openForm(FORMS.join()); }
    if (e.target.closest('[data-submit-project]')) { e.preventDefault(); return openForm(FORMS.project()); }
    if (e.target.closest('[data-post-idea]')) { e.preventDefault(); return openForm(FORMS.idea()); }
    var a = e.target.closest('[data-act]');
    if (!a) return;
    e.preventDefault();
    var act = a.getAttribute('data-act'), id = a.getAttribute('data-id');
    if (act === 'submit-solution') openForm(FORMS.solution());
    else if (act === 'join-team') openForm(FORMS.join_team(id));
    else if (act === 'register') openForm(FORMS.register(id));
  });

  /* ---------- go ---------- */
  renderAll();
  TM.hydrate();
  window.addEventListener('hashchange', route);
  route();
})();
