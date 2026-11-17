(function () {
  'use strict';
  var EMAIL = 'connect@techmagpies.com';
  function esc(s) { return String(s).replace(/[&<>"]/g, function (m) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[m]; }); }

  function illustration(icon) {
    var shapes = {
      support: '<rect x="55" y="20" width="110" height="66" rx="8" fill="#fff" stroke="#2563eb" stroke-width="4"/><path d="M90 98h40M110 86v12" stroke="#2563eb" stroke-width="5" stroke-linecap="round"/><path d="M84 49a26 26 0 0 1 52 0v17h-9V49a17 17 0 0 0-34 0v17h-9z" fill="#bfdbfe" stroke="#2563eb" stroke-width="3"/><rect x="77" y="52" width="15" height="20" rx="6" fill="#2563eb"/><rect x="128" y="52" width="15" height="20" rx="6" fill="#2563eb"/>',
      cloud: '<path d="M71 76h78a20 20 0 0 0 1-40 31 31 0 0 0-59-5 23 23 0 0 0-20 45z" fill="#dbeafe" stroke="#2563eb" stroke-width="4"/><rect x="94" y="53" width="32" height="26" rx="4" fill="#fff" stroke="#2563eb" stroke-width="3"/><path d="M100 61h20M100 68h20" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>',
      network: '<circle cx="110" cy="53" r="15" fill="#2563eb"/><circle cx="61" cy="27" r="11" fill="#bfdbfe" stroke="#2563eb" stroke-width="3"/><circle cx="159" cy="27" r="11" fill="#bfdbfe" stroke="#2563eb" stroke-width="3"/><circle cx="61" cy="80" r="11" fill="#bfdbfe" stroke="#2563eb" stroke-width="3"/><circle cx="159" cy="80" r="11" fill="#bfdbfe" stroke="#2563eb" stroke-width="3"/><path d="m72 33 25 14m26 0 25-14M72 74l25-14m26 0 25 14" stroke="#2563eb" stroke-width="4"/>',
      security: '<path d="m110 15 43 16v25c0 24-17 39-43 50-26-11-43-26-43-50V31z" fill="#dbeafe" stroke="#2563eb" stroke-width="4" stroke-linejoin="round"/><path d="m92 55 12 12 25-27" stroke="#2563eb" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"/>',
      settings: '<circle cx="110" cy="55" r="32" fill="#dbeafe" stroke="#2563eb" stroke-width="4"/><circle cx="110" cy="55" r="11" fill="#fff" stroke="#2563eb" stroke-width="4"/><path d="M110 15v12m0 56v12m40-40h-12m-56 0H70m68-28-9 9m-38 38-9 9m57 0-9-9m-38-38-9-9" stroke="#2563eb" stroke-width="6" stroke-linecap="round"/>',
      backup: '<ellipse cx="110" cy="31" rx="37" ry="14" fill="#bfdbfe" stroke="#2563eb" stroke-width="4"/><path d="M73 31v44c0 8 17 15 37 15s37-7 37-15V31" fill="#dbeafe" stroke="#2563eb" stroke-width="4"/><path d="M73 52c0 8 17 15 37 15s37-7 37-15M110 40v27m-10-9 10 10 10-10" stroke="#2563eb" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>',
      digital: '<rect x="46" y="28" width="48" height="48" rx="10" fill="#dbeafe" stroke="#2563eb" stroke-width="4"/><rect x="126" y="28" width="48" height="48" rx="10" fill="#dbeafe" stroke="#2563eb" stroke-width="4"/><path d="M94 52h32m-10-10 10 10-10 10" stroke="#2563eb" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/><circle cx="70" cy="52" r="8" fill="#2563eb"/><path d="M142 43h16m-16 9h16m-16 9h10" stroke="#2563eb" stroke-width="3" stroke-linecap="round"/>',
      web: '<rect x="42" y="17" width="136" height="78" rx="9" fill="#fff" stroke="#2563eb" stroke-width="4"/><path d="M43 38h134" stroke="#2563eb" stroke-width="4"/><circle cx="56" cy="28" r="3" fill="#2563eb"/><circle cx="68" cy="28" r="3" fill="#93c5fd"/><circle cx="80" cy="28" r="3" fill="#93c5fd"/><path d="m90 55-12 9 12 9m40-18 12 9-12 9m-9-20-9 22" stroke="#2563eb" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>'
    };
    return '<svg viewBox="0 0 220 110" fill="none" aria-hidden="true">' + shapes[icon] + '</svg>';
  }

  var SERVICES = [
    { id: 'support', icon: 'support', name: 'IT Support & Troubleshooting', sum: 'Computer and software issues, system setup, technical troubleshooting, and routine IT assistance.' },
    { id: 'cloud', icon: 'cloud', name: 'Cloud & Hosting Solutions', sum: 'Domain setup, website hosting, deployment, cloud configuration, and business email setup.' },
    { id: 'network', icon: 'network', name: 'Networking Solutions', sum: 'Network setup, Wi-Fi configuration, connectivity troubleshooting, and basic network maintenance.' },
    { id: 'security', icon: 'security', name: 'Cybersecurity Solutions', sum: 'Basic security assessments, access control, endpoint security configuration, and security awareness.' },
    { id: 'settings', icon: 'settings', name: 'Software Installation & Configuration', sum: 'Software setup, system configuration, updates, and application troubleshooting.' },
    { id: 'backup', icon: 'backup', name: 'Data Backup & Recovery', sum: 'Backup planning, file recovery where feasible, data migration, and storage management.' },
    { id: 'digital', icon: 'digital', name: 'Digital Solutions', sum: 'Practical digital solutions that help businesses improve their online presence, streamline processes, and serve their customers more effectively.' },
    { id: 'web', icon: 'web', name: 'Web Development', sum: 'Responsive business websites, landing pages, e-commerce websites, and custom web experiences designed around business needs.' }
  ];

  var PROJECTS = [
    { name: 'Shailus Concepts', cat: 'Gift & E-commerce Website', shot: 'images/scweb1.png', url: 'https://shailusConcepts.com', sum: 'A client gift and e-commerce website.' },
    { name: 'ARTHASHASTRA', cat: 'Business Website', shot: 'images/artha.web2.png', url: 'https://arthashastra.biz/', sum: 'A client business website.' },
    { name: 'SS Avira Design', cat: 'Design & Business Website', shot: 'images/ssweb3.png', url: 'https://ssaviradesign.netlify.app/', sum: 'A client design and business website.' }
  ];

  var STEPS = [
    { icon: 'search', title: 'Discover', desc: "Understand the client's requirements." },
    { icon: 'layers', title: 'Plan', desc: 'Define the solution and project scope.' },
    { icon: 'code', title: 'Develop', desc: 'Build and test the solution.' },
    { icon: 'send', title: 'Deliver', desc: 'Launch the solution and provide agreed support.' }
  ];
  document.getElementById('procSteps').innerHTML = STEPS.map(function (step, i) {
    return '<li><span class="proc__ic">' + TM.svg(step.icon, 24) + '</span><div><small>0' + (i + 1) + '</small><h3>' + step.title + '</h3><p>' + step.desc + '</p></div></li>';
  }).join('');

  var cardsEl = document.getElementById('svcCards');
  var projEl = document.getElementById('projGrid');
  var chips = document.getElementById('chips');
  cardsEl.innerHTML = SERVICES.map(function (service) {
    return '<article class="scard"><div class="scard__vis">' + illustration(service.icon) + '</div>' +
      '<div class="scard__body"><h3>' + esc(service.name) + '</h3><p>' + esc(service.sum) + '</p>' +
      '<a class="scard__cta" href="#contact" data-req="' + service.id + '">Discuss This Service ' + TM.svg('arrow-right', 14) + '</a></div></article>';
  }).join('');

  projEl.innerHTML = PROJECTS.map(function (project) {
    return '<article class="proj"><div class="proj__shot"><img src="' + esc(project.shot) + '" alt="Website preview for ' + esc(project.name) + '" width="640" height="400" loading="lazy" decoding="async"></div>' +
      '<div class="proj__body"><div><h3>' + esc(project.name) + '</h3><span class="proj__cat">' + esc(project.cat) + '</span><p>' + esc(project.sum) + '</p></div>' +
      '<a class="proj__link" href="' + esc(project.url) + '" target="_blank" rel="noopener noreferrer">Visit Website ' + TM.svg('arrow-right', 14) + '</a></div></article>';
  }).join('');

  document.addEventListener('click', function (event) {
    var link = event.target.closest('[data-req]');
    if (link) setChip(link.dataset.req);
  });

  chips.insertAdjacentHTML('beforeend', SERVICES.map(function (service, i) {
    return '<label><input type="radio" name="svc" value="' + esc(service.name) + '" data-id="' + service.id + '"' + (i === 0 ? ' checked' : '') + '><span>' + esc(service.name) + '</span></label>';
  }).join('') + '<label><input type="radio" name="svc" value="Something else" data-id="other"><span>Something else</span></label>');
  function setChip(id) {
    var radio = chips.querySelector('input[data-id="' + id + '"]');
    if (radio) radio.checked = true;
  }

  var form = document.getElementById('svcForm');
  var err = document.getElementById('fErr');
  var done = document.getElementById('done');
  var lastMail = '';
  var lastBody = '';
  function mailto(data) {
    var subject = 'Service request — ' + data.svc + ' — ' + data.name;
    lastBody = 'Service: ' + data.svc + '\nName: ' + data.name + '\nEmail: ' + data.email + '\n\nProject details:\n' + data.msg;
    lastMail = 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(lastBody);
    return lastMail;
  }
  form.addEventListener('submit', function (event) {
    event.preventDefault();
    var data = { svc: (form.svc.value || 'Something else'), name: form.name.value.trim(), email: form.email.value.trim(), msg: form.msg.value.trim() };
    function bad(message, field) { err.textContent = message; err.hidden = false; field.focus(); }
    if (!data.name) return bad('Enter your name so we know who to reply to.', form.name);
    if (!/^\S+@\S+\.\S+$/.test(data.email)) return bad('Enter a valid email address, for example name@example.com.', form.email);
    if (data.msg.length < 10) return bad('Add a few details about your project so we can give a useful answer.', form.msg);
    err.hidden = true;
    window.location.href = mailto(data);
    form.hidden = true;
    done.hidden = false;
    done.scrollIntoView({ block: 'center', behavior: 'smooth' });
  });
  document.getElementById('reopen').addEventListener('click', function () { window.location.href = lastMail; });
  document.getElementById('copy').addEventListener('click', function () {
    var message = document.getElementById('copyMsg');
    function copied() { message.textContent = 'Copied. Paste it into an email to ' + EMAIL + '.'; }
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(lastBody).then(copied, function () { message.textContent = 'Copy is blocked here. Email ' + EMAIL + ' directly.'; });
    } else {
      message.textContent = 'Copy is not supported here. Email ' + EMAIL + ' directly.';
    }
  });

  if (location.hash.indexOf('#svc-') === 0) setChip(location.hash.slice(5));
})();
