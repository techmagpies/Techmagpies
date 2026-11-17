/* Featured courses carousel — shared by index.html and courses.html.
   Mount point: #trackTabs inside .tracks. Image paths are relative to the page. */
(function () {
  'use strict';
  var C = window.TM_COURSES || [];
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); }

  /* ---------- track switcher ---------- */
  (function tracks() {
    var tabs = document.getElementById('trackTabs');
    var viewport = document.getElementById('trackViewport');
    var prev = document.getElementById('trackPrev');
    var next = document.getElementById('trackNext');
    var dots = document.getElementById('trackDots');
    var status = document.getElementById('trackStatus');
    if (!tabs || !viewport || !prev || !next || !dots || !C.length) return;

    var courses = [
      {
        title: 'Prompt Engineering',
        description: 'Learn to write effective prompts, work with AI tools, and build practical AI-powered workflows.',
        topics: 'Prompt design, LLM fundamentals, context engineering, AI tools, and practical projects.',
        href: 'roadmaps/cse/prompt.html',
        image: 'assets/img/courses/prompt-engineering.png'
      },
      {
        title: 'Figma UI/UX Design',
        description: 'Learn to design intuitive digital experiences from wireframes to interactive prototypes.',
        topics: 'UI fundamentals, UX research, wireframing, components, auto layout, prototyping, and design systems.',
        href: 'roadmaps/tools/figma.html',
        image: 'assets/img/courses/figma-ui-ux.png'
      },
      {
        title: 'Data Science',
        description: 'Turn raw data into useful insights through programming, statistics, and visualisation.',
        topics: 'Python, NumPy, Pandas, statistics, data cleaning, visualisation, and introductory machine learning.',
        href: 'roadmaps/aiml/ds-analytics.html',
        image: 'assets/img/courses/data-science.png'
      },
      {
        title: 'JavaScript Development',
        description: 'Build interactive websites and learn the programming fundamentals used in modern web development.',
        topics: 'JavaScript fundamentals, DOM manipulation, events, asynchronous programming, APIs, and practical web projects.',
        href: 'roadmaps/cse/web.html',
        image: 'assets/img/courses/javascript.png'
      },
      {
        title: 'VLSI & Embedded Systems',
        description: 'Explore digital hardware design, embedded programming, and the fundamentals of electronic systems.',
        topics: 'Digital logic, Verilog fundamentals, simulation, microcontrollers, embedded C, sensors, and hardware projects.',
        href: 'roadmaps/ece/vlsi.html',
        image: 'assets/img/courses/vlsi-embedded.png'
      }
    ];

    tabs.innerHTML = courses.map(function (course, index) {
      return '<a class="course-card" role="listitem" href="' + course.href + '" aria-label="Open ' + esc(course.title) + ' roadmap. ' + esc(course.description) + '">' +
        '<span class="course-card__art course-card__art--' + index + '"><img class="course-card__image' + (index > 2 ? ' course-card__image--contain' : '') + '" src="' + course.image + '" alt="" aria-hidden="true" loading="lazy" decoding="async"></span>' +
        '<span class="course-card__content"><span class="course-card__kicker">COURSE 0' + (index + 1) + '</span>' +
        '<span class="course-card__title">' + esc(course.title) + '</span>' +
        '<span class="course-card__description">' + esc(course.description) + '</span>' +
        '<span class="course-card__topics">' + esc(course.topics) + '</span>' +
        '<span class="course-card__arrow" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M5 12h14m-6-6 6 6-6 6"/></svg></span></span></a>';
    }).join('');

    var index = 0;
    var pointerStart = null;
    var suppressClick = false;

    function visibleCards() {
      if (window.innerWidth <= 560) return 1;
      if (window.innerWidth <= 900) return 2;
      return 3;
    }

    function maxIndex() {
      return Math.max(0, courses.length - visibleCards());
    }

    function render() {
      var cards = tabs.children;
      var max = maxIndex();
      index = Math.min(index, max);
      tabs.style.transform = 'translate3d(-' + (cards[index] ? cards[index].offsetLeft : 0) + 'px, 0, 0)';
      prev.disabled = index === 0;
      next.disabled = index === max;
      dots.innerHTML = '';
      for (var page = 0; page <= max; page += 1) {
        var dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'tracks__dot' + (page === index ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Show courses ' + (page + 1) + ' to ' + Math.min(page + visibleCards(), courses.length));
        dot.setAttribute('aria-current', page === index ? 'true' : 'false');
        dot.dataset.index = page;
        dots.appendChild(dot);
      }
      status.textContent = 'Showing courses ' + (index + 1) + ' to ' + Math.min(index + visibleCards(), courses.length) + ' of ' + courses.length;
    }

    prev.addEventListener('click', function () { index = Math.max(0, index - 1); render(); });
    next.addEventListener('click', function () { index = Math.min(maxIndex(), index + 1); render(); });
    dots.addEventListener('click', function (event) {
      var dot = event.target.closest('.tracks__dot');
      if (!dot) return;
      index = Number(dot.dataset.index);
      render();
    });
    window.addEventListener('resize', render);

    viewport.addEventListener('pointerdown', function (event) {
      if (event.pointerType === 'mouse' && event.button !== 0) return;
      pointerStart = { x: event.clientX, y: event.clientY };
    });
    viewport.addEventListener('pointerup', function (event) {
      if (!pointerStart) return;
      var dx = event.clientX - pointerStart.x;
      var dy = event.clientY - pointerStart.y;
      pointerStart = null;
      if (Math.abs(dx) < 45 || Math.abs(dx) < Math.abs(dy)) return;
      suppressClick = true;
      window.setTimeout(function () { suppressClick = false; }, 0);
      index = dx < 0 ? Math.min(maxIndex(), index + 1) : Math.max(0, index - 1);
      render();
    });
    viewport.addEventListener('pointercancel', function () { pointerStart = null; });
    viewport.addEventListener('click', function (event) {
      if (!suppressClick) return;
      event.preventDefault();
      event.stopPropagation();
      suppressClick = false;
    }, true);
    render();
  })();
})();
