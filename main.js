(() => {
  const motionStyles = document.createElement("link");
  motionStyles.rel = "stylesheet";
  motionStyles.href = "/scroll-effects.css";
  document.head.appendChild(motionStyles);

  const menuButton = document.querySelector(".menu-button");
  const navLinks = document.querySelector(".nav-links");
  if (menuButton && navLinks) {
    menuButton.addEventListener("click", () => {
      const open = navLinks.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(open));
    });
    navLinks.querySelectorAll("a").forEach((link) => link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuButton.setAttribute("aria-expanded", "false");
    }));
  }

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  if (reduceMotion.matches) return;

  const selectors = [
    ".section-heading",
    ".two-col > *",
    ".audience-card",
    ".stacked-list article",
    ".summit-layout > *",
    ".founder-card",
    ".signup-strip .narrow",
    ".feature-card",
    ".portfolio-card",
    ".event-card",
    ".news-card",
    ".form-shell",
    ".prose > *",
    ".side-card"
  ];
  const revealables = [...new Set(selectors.flatMap((selector) => [...document.querySelectorAll(selector)]))];
  revealables.forEach((element, index) => {
    element.classList.add("motion-reveal");
    element.style.setProperty("--motion-delay", `${Math.min((index % 4) * 85, 255)}ms`);
  });

  const reveal = (element) => element.classList.add("is-visible");
  if (!("IntersectionObserver" in window)) {
    revealables.forEach(reveal);
  } else {
    const observer = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        reveal(entry.target);
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -48px" });
    revealables.forEach((element) => observer.observe(element));
  }

  const media = [...document.querySelectorAll(".photo-frame img,.event-card img")];
  media.forEach((image) => image.classList.add("motion-media"));
  if ("IntersectionObserver" in window) {
    const imageObserver = new IntersectionObserver((entries, instance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        instance.unobserve(entry.target);
      });
    }, { threshold: 0.1 });
    media.forEach((image) => imageObserver.observe(image));
  } else {
    media.forEach(reveal);
  }

  const header = document.querySelector(".site-header");
  let ticking = false;
  const updateScrollEffects = () => {
    if (header) header.classList.toggle("is-scrolled", window.scrollY > 18);
    media.forEach((image) => {
      const rect = image.getBoundingClientRect();
      const progress = (window.innerHeight * 0.58 - rect.top) / window.innerHeight;
      const shift = Math.max(-12, Math.min(12, progress * 14));
      image.style.setProperty("--media-shift", `${shift.toFixed(2)}px`);
    });
    ticking = false;
  };
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(updateScrollEffects);
  };
  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  requestUpdate();
})();
