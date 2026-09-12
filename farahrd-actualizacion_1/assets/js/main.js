/* Farah — interacciones (menú móvil, reveal, header, lightbox, FAQ, stats, back-to-top) */
(function () {
  'use strict';
  var reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Menú móvil ---------- */
  var toggle = document.querySelector('.nav-toggle');
  var nav = document.getElementById('nav-principal');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    nav.addEventListener('click', function (e) {
      if (e.target.tagName === 'A') {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
      }
    });
  }

  /* ---------- Header inteligente (shrink al bajar) ---------- */
  var header = document.querySelector('.site-header');
  var toTop = document.querySelector('.to-top');
  function onScroll() {
    var y = window.pageYOffset;
    if (header) header.classList.toggle('is-shrunk', y > 40);
    if (toTop) toTop.classList.toggle('is-visible', y > 600);
  }
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
  if (toTop) toTop.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduce ? 'auto' : 'smooth' });
  });

  /* ---------- Scroll reveal ---------- */
  var revealEls = document.querySelectorAll('.reveal, .reveal-group');
  if ('IntersectionObserver' in window && !reduce) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-in'); });
  }

  /* ---------- Contadores (stats) ---------- */
  var nums = document.querySelectorAll('[data-count]');
  if (nums.length && 'IntersectionObserver' in window && !reduce) {
    var cio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var el = en.target, target = parseFloat(el.getAttribute('data-count')),
            suffix = el.getAttribute('data-suffix') || '', dur = 1400, start = null;
        function step(ts) {
          if (!start) start = ts;
          var p = Math.min((ts - start) / dur, 1);
          var val = Math.floor((0.5 - Math.cos(Math.PI * p) / 2) * target);
          el.textContent = val.toLocaleString('es-DO') + suffix;
          if (p < 1) requestAnimationFrame(step);
          else el.textContent = target.toLocaleString('es-DO') + suffix;
        }
        requestAnimationFrame(step);
        cio.unobserve(el);
      });
    }, { threshold: 0.5 });
    nums.forEach(function (el) { cio.observe(el); });
  }

  /* ---------- Lightbox de galería ---------- */
  var lb = document.getElementById('lightbox');
  if (lb) {
    var lbImg = lb.querySelector('img');
    var triggers = Array.prototype.slice.call(document.querySelectorAll('[data-lightbox]'));
    var idx = 0;
    function show(i) {
      idx = (i + triggers.length) % triggers.length;
      var src = triggers[idx].getAttribute('data-lightbox');
      var alt = triggers[idx].getAttribute('data-alt') || '';
      lbImg.setAttribute('src', src); lbImg.setAttribute('alt', alt);
    }
    function open(i) { show(i); lb.classList.add('is-open'); document.body.style.overflow = 'hidden'; }
    function close() { lb.classList.remove('is-open'); document.body.style.overflow = ''; }
    triggers.forEach(function (t, i) {
      t.addEventListener('click', function () { open(i); });
    });
    lb.addEventListener('click', function (e) {
      if (e.target === lb || e.target.hasAttribute('data-close')) close();
      if (e.target.hasAttribute('data-prev')) show(idx - 1);
      if (e.target.hasAttribute('data-next')) show(idx + 1);
    });
    document.addEventListener('keydown', function (e) {
      if (!lb.classList.contains('is-open')) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowLeft') show(idx - 1);
      if (e.key === 'ArrowRight') show(idx + 1);
    });
  }

  /* ---------- Resaltar sección activa en páginas de menú ---------- */
  var menuNavLinks = document.querySelectorAll('.menu-nav a');
  if (menuNavLinks.length && 'IntersectionObserver' in window) {
    var byId = {}, targets = [];
    menuNavLinks.forEach(function (link) {
      var id = link.getAttribute('href').replace('#', '');
      var s = document.getElementById(id);
      if (s) { byId[id] = link; targets.push(s); }
    });
    var mio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) {
          menuNavLinks.forEach(function (l) { l.classList.remove('is-active'); });
          if (byId[en.target.id]) byId[en.target.id].classList.add('is-active');
        }
      });
    }, { rootMargin: '-45% 0px -50% 0px', threshold: 0 });
    targets.forEach(function (t) { mio.observe(t); });
  }

  /* ---------- Año dinámico ---------- */
  var anio = document.getElementById('anio');
  if (anio) anio.textContent = new Date().getFullYear();
})();
