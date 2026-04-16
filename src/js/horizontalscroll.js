

(function () {
  "use strict";

  if (typeof gsap === "undefined" || typeof ScrollTrigger === "undefined") {
    console.warn("[HorizontalScroll] GSAP or ScrollTrigger not found. Make sure GSAP scripts are loaded BEFORE this file.");
    return;
  }

  gsap.registerPlugin(ScrollTrigger);

  // ── DOM ────────────────────────────────────────────────────
  const section = document.getElementById("care-stages");
  const stickyWrap = section && section.querySelector(".care-stages__sticky-wrap");
  const track = document.getElementById("careTrack");
  const dotsWrap = document.getElementById("careDots");
  const outer = stickyWrap && stickyWrap.querySelector(".care-stages__track-outer");

  if (!section || !stickyWrap || !track || !outer) {
    console.warn("[HorizontalScroll] Required elements not found.");
    return;
  }

  // ── Config ─────────────────────────────────────────────────
  const GAP = 50;
  const SCROLL_PER_STEP = 0.6;

  // ── Responsive cards visible ───────────────────────────────
  function getCardsVisible() {
    if (window.innerWidth <= 768) return 1;
    if (window.innerWidth <= 1024) return 2.5;
    return 3.5;
  }

  function getMaxStep() {
    return Math.max(0, totalCards - getCardsVisible());
  }

  const cards = Array.from(track.querySelectorAll(".care-card"));
  const totalCards = cards.length;

  let currentStep = 0;
  let st = null;
  let resizeTimer = null;

  // ── Size cards ─────────────────────────────────────────────
  function sizeCards() {
    const cardsVisible = getCardsVisible();
    const outerW = outer.clientWidth;
    const totalGap = GAP * (cardsVisible - 1);
    const cardW = (outerW - totalGap) / cardsVisible;

    cards.forEach(function (card) {
      card.style.width = cardW + "px";
      card.style.flex = "0 0 " + cardW + "px";
    });
  }

  // ── Helpers ────────────────────────────────────────────────
  function getStepWidth() {
    return cards.length ? cards[0].offsetWidth + GAP : 0;
  }

  function getMaxOffset() {
    return getMaxStep() * getStepWidth();
  }

  function updateDots(step) {
    if (!dotsWrap) return;
    const dots = dotsWrap.querySelectorAll(".dot");
    dots.forEach(function (dot, i) {
      dot.classList.toggle("is-active", i === step);
    });
  }

  function buildDots() {
    if (!dotsWrap) return;
    const maxStep = getMaxStep();
    dotsWrap.innerHTML = "";

    for (let i = 0; i <= maxStep; i++) {
      const dot = document.createElement("span");
      dot.className = "dot" + (i === 0 ? " is-active" : "");
      dot.dataset.step = i;

      dot.addEventListener("click", function () {
        if (!st) return;
        const progress = maxStep === 0 ? 0 : i / maxStep;
        const y = st.start + (st.end - st.start) * progress;
        gsap.to(window, {
          scrollTo: y,
          duration: 0.8,
          ease: "power2.out"
        });
      });

      dotsWrap.appendChild(dot);
    }
  }

  // ── Section height ─────────────────────────────────────────
  function setSectionHeight() {
    const maxStep = getMaxStep();
    var scrollDistance = maxStep * SCROLL_PER_STEP * window.innerHeight;
    var contentHeight = stickyWrap.offsetHeight;
    section.style.height = (contentHeight + scrollDistance) + "px";
  }

  // ── Init ScrollTrigger ─────────────────────────────────────
  function initScrollTrigger() {
    const maxStep = getMaxStep();
    if (st) st.kill();

    gsap.killTweensOf(track);
    gsap.set(track, { x: 0 });

    const maxOffset = getMaxOffset();
    const scrollDistance = Math.max(window.innerHeight, maxStep * SCROLL_PER_STEP * window.innerHeight);

    st = gsap.to(track, {
      x: -maxOffset,
      ease: "none",
      overwrite: true,
      scrollTrigger: {
        trigger: section,
        pin: stickyWrap,
        pinSpacing: false,
        start: window.innerWidth <= 768 ? "top 20%" : "top 10%", 
        end: "+=" + scrollDistance,
        scrub: 1.2,
        invalidateOnRefresh: true,
        snap: maxStep > 0 ? {
          snapTo: 1 / maxStep,
          duration: { min: 0.25, max: 0.55 },
          ease: "power1.inOut"
        } : false,
        onUpdate: function (self) {
          const step = maxStep > 0 ? Math.round(self.progress * maxStep) : 0;
          if (step !== currentStep) {
            currentStep = step;
            updateDots(step);
          }
        }
      }
    }).scrollTrigger;
  }

  // ── Touch swipe support ────────────────────────────────────
  let touchX = 0;
  let touchY = 0;

  section.addEventListener("touchstart", function (e) {
    touchX = e.touches[0].clientX;
    touchY = e.touches[0].clientY;
  }, { passive: true });

  section.addEventListener("touchend", function (e) {
    if (!st || !st.isActive) return;

    const dx = touchX - e.changedTouches[0].clientX;
    const dy = Math.abs(touchY - e.changedTouches[0].clientY);

    if (Math.abs(dx) > 44 && Math.abs(dx) > dy) {
      const dir = dx > 0 ? 1 : -1;
      const nextStep = Math.max(0, Math.min(getMaxStep(), currentStep + dir));
      const progress = getMaxStep() === 0 ? 0 : nextStep / getMaxStep();
      const y = st.start + (st.end - st.start) * progress;

      gsap.to(window, {
        scrollTo: y,
        duration: 0.7,
        ease: "power2.out"
      });
    }
  }, { passive: true });

  // ── Keyboard support ───────────────────────────────────────
  document.addEventListener("keydown", function (e) {
    if (!st || !st.isActive) return;

    if (
      e.key === "ArrowRight" ||
      e.key === "ArrowDown" ||
      e.key === "ArrowLeft" ||
      e.key === "ArrowUp"
    ) {
      e.preventDefault();

      const dir = (e.key === "ArrowRight" || e.key === "ArrowDown") ? 1 : -1;
      const nextStep = Math.max(0, Math.min(getMaxStep(), currentStep + dir));
      const progress = getMaxStep() === 0 ? 0 : nextStep / getMaxStep();
      const y = st.start + (st.end - st.start) * progress;

      gsap.to(window, {
        scrollTo: y,
        duration: 0.7,
        ease: "power2.out"
      });
    }
  });

  // ── Init ───────────────────────────────────────────────────
  function init() {
    sizeCards();
    buildDots();
    setSectionHeight();
    updateDots(0);
    initScrollTrigger();
    ScrollTrigger.refresh();
  }

  window.addEventListener("resize", function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function () {
      currentStep = 0;
      init();
    }, 200);
  });

  if (document.readyState === "complete") {
    init();
  } else {
    window.addEventListener("load", init);
  }
})();