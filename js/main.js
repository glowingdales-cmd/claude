(function () {
  'use strict';

  var prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* -------------------------------------------------------------
     Mobile nav toggle
     ------------------------------------------------------------- */
  var navToggle = document.getElementById('navToggle');
  var navMobile = document.getElementById('navMobile');

  if (navToggle && navMobile) {
    navToggle.addEventListener('click', function () {
      var isOpen = navMobile.classList.toggle('is-open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navMobile.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navMobile.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* -------------------------------------------------------------
     Pricing billing toggle (monthly / yearly)
     ------------------------------------------------------------- */
  var billMonthly = document.getElementById('billMonthly');
  var billYearly = document.getElementById('billYearly');
  var priceEls = document.querySelectorAll('[data-price-monthly]');

  function setBilling(mode) {
    var isYearly = mode === 'yearly';
    billMonthly.classList.toggle('is-active', !isYearly);
    billYearly.classList.toggle('is-active', isYearly);
    billMonthly.setAttribute('aria-pressed', String(!isYearly));
    billYearly.setAttribute('aria-pressed', String(isYearly));

    priceEls.forEach(function (el) {
      var value = isYearly ? el.getAttribute('data-price-yearly') : el.getAttribute('data-price-monthly');
      el.textContent = value + '€';
    });
  }

  if (billMonthly && billYearly) {
    billMonthly.addEventListener('click', function () { setBilling('monthly'); });
    billYearly.addEventListener('click', function () { setBilling('yearly'); });
  }

  /* -------------------------------------------------------------
     Scroll reveal (progressive enhancement, skipped if reduced motion)
     ------------------------------------------------------------- */
  var revealEls = document.querySelectorAll('[data-reveal]');

  if (!prefersReducedMotion && 'IntersectionObserver' in window && revealEls.length) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });

    revealEls.forEach(function (el) { observer.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('is-visible'); });
  }
})();
