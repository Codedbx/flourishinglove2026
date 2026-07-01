/* ============================================================
   Flourish & Godwin — interactions
   seal · nav · countdown · reveal-on-scroll
   ============================================================ */
(function () {
  "use strict";
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- 0 · The Seal ---------- */
  var seal = document.getElementById("seal");
  var sealBtn = document.getElementById("sealOpen");

  function openSeal() {
    if (!seal || seal.classList.contains("is-open")) return;
    seal.classList.add("is-open");
    document.body.classList.remove("locked");
    try { sessionStorage.setItem("fg-seal", "1"); } catch (e) {}
    // envelope choreography: wax breaks → flap opens → card rises → page reveals (~3.35s)
    window.setTimeout(function () { if (seal) seal.style.display = "none"; }, 3500);
  }

  if (seal) {
    var seen = false;
    try { seen = sessionStorage.getItem("fg-seal") === "1"; } catch (e) {}
    if (seen || reduce) {
      // skip the ceremony if already seen this session (or reduced motion)
      seal.style.display = "none";
      if (reduce && !seen) {} // reduced-motion users still get a real page, just no lock
    } else {
      document.body.classList.add("locked");
      sealBtn && sealBtn.addEventListener("click", openSeal);
      seal.addEventListener("click", openSeal);
      // logo "draws" itself, then fills — stagger each path
      var logo = document.getElementById("sealLogo");
      if (logo) {
        var lp = logo.querySelectorAll("path");
        for (var k = 0; k < lp.length; k++) lp[k].style.setProperty("--i", k);
        requestAnimationFrame(function () { logo.classList.add("draw"); });
      }
      // safety: never trap the guest — auto-open once the logo has assembled
      window.setTimeout(openSeal, 7000);
    }
  }

  /* ---------- NAV: solidify + hide on scroll ---------- */
  var nav = document.getElementById("nav");
  var lastY = window.scrollY;
  function onScroll() {
    var y = window.scrollY;
    if (nav) {
      // solid (with menu links) once past the hero; transparent (logo + RSVP only) at top
      nav.classList.toggle("solid", y > window.innerHeight * 0.85);
      if (y <= 4) {
        nav.classList.remove("hidden");   // at the very top → show logo + RSVP
      } else if (y > lastY) {
        nav.classList.add("hidden");      // scrolling down → hide the whole nav
      } else {
        nav.classList.remove("hidden");   // scrolling up → reveal it
      }
    }
    lastY = y;
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- 4 · Countdown ---------- */
  var TARGET = new Date("2026-08-01T10:00:00+01:00").getTime(); // WAT
  var grid = document.getElementById("countdown-grid");
  var cells = grid ? {
    days: grid.querySelector('[data-unit="days"]'),
    hours: grid.querySelector('[data-unit="hours"]'),
    minutes: grid.querySelector('[data-unit="minutes"]'),
    seconds: grid.querySelector('[data-unit="seconds"]')
  } : null;
  function pad(n) { return (n < 10 ? "0" : "") + n; }
  function tick() {
    if (!cells) return;
    var diff = TARGET - Date.now();
    if (diff <= 0) {
      cells.days.textContent = cells.hours.textContent =
      cells.minutes.textContent = cells.seconds.textContent = "00";
      var d = document.querySelector(".count__date");
      if (d) d.textContent = "Today, we say “I do.”";
      return;
    }
    var s = Math.floor(diff / 1000);
    cells.days.textContent = Math.floor(s / 86400);
    cells.hours.textContent = pad(Math.floor((s % 86400) / 3600));
    cells.minutes.textContent = pad(Math.floor((s % 3600) / 60));
    cells.seconds.textContent = pad(s % 60);
  }
  if (cells) { tick(); window.setInterval(tick, 1000); }

  /* ---------- reveal-on-scroll (staggered, varied) ---------- */
  var items = Array.prototype.slice.call(document.querySelectorAll("[data-reveal]"));
  if (reduce || !("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        var el = entry.target;
        // stagger by position among its siblings + a touch of variance (anti-uniform)
        var sibs = Array.prototype.slice.call(el.parentNode.children).filter(function (c) {
          return c.hasAttribute("data-reveal");
        });
        var i = Math.max(0, sibs.indexOf(el));
        el.style.transitionDelay = (i * 90 + Math.random() * 60) + "ms";
        el.classList.add("in");
        io.unobserve(el);
      });
    }, { threshold: 0.16, rootMargin: "0px 0px -8% 0px" });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---------- roses blossom into view ---------- */
  var roses = Array.prototype.slice.call(document.querySelectorAll(".rose"));
  if (reduce || !("IntersectionObserver" in window)) {
    roses.forEach(function (r) { r.classList.add("bloom"); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        e.target.classList.add("bloom");
        ro.unobserve(e.target);
      });
    }, { threshold: 0.2 });
    roses.forEach(function (r) { ro.observe(r); });
  }
})();
