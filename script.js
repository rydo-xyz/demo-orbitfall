/* Orbitfall DEMO — menu, reveal, parallax, trailer mock, year */
(function () {
  var year = new Date().getFullYear();
  document.querySelectorAll("[data-year]").forEach(function (el) { el.textContent = year; });

  var header = document.querySelector(".site-header");
  var toggle = document.querySelector(".nav-toggle");
  var nav = document.querySelector("#primary-nav");
  function setOpen(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    nav.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }
  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.querySelectorAll("a").forEach(function (a) {
      a.addEventListener("click", function () { setOpen(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") setOpen(false);
    });
  }

  var onScroll = function () {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 8);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var reveals = document.querySelectorAll(".reveal");
  if (reduce || !("IntersectionObserver" in window)) {
    reveals.forEach(function (el) { el.classList.add("is-in"); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    reveals.forEach(function (el) { io.observe(el); });
  }
})();

/* Parallax-ish layers (disabled under reduced motion) */
(function () {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  var layers = document.querySelectorAll("[data-parallax]");
  if (!layers.length) return;
  var ticking = false;
  function update() {
    var y = window.scrollY;
    layers.forEach(function (el) {
      var speed = parseFloat(el.getAttribute("data-parallax")) || 0.15;
      el.style.transform = "translate3d(0," + (y * speed) + "px,0)";
    });
    ticking = false;
  }
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
})();

/* Fake trailer play — toast only, no media */
(function () {
  var btn = document.querySelector("[data-trailer-play]");
  var toast = document.querySelector("[data-trailer-toast]");
  if (!btn || !toast) return;
  var timer;
  btn.addEventListener("click", function () {
    toast.hidden = false;
    clearTimeout(timer);
    timer = setTimeout(function () { toast.hidden = true; }, 3200);
  });
})();
