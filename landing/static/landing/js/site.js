document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector("[data-nav-toggle]");
  const nav = document.querySelector("[data-nav]");

  if (navToggle && nav) {
    const closeNav = () => {
      navToggle.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-open");
    };

    navToggle.addEventListener("click", () => {
      const isOpen = navToggle.getAttribute("aria-expanded") === "true";
      navToggle.setAttribute("aria-expanded", String(!isOpen));
      nav.classList.toggle("is-open", !isOpen);
    });

    nav.querySelectorAll("a").forEach((link) => link.addEventListener("click", closeNav));
    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") closeNav();
    });
  }

  const header = document.querySelector("[data-header]");
  const updateHeader = () => header?.classList.toggle("is-scrolled", window.scrollY > 18);
  updateHeader();
  window.addEventListener("scroll", updateHeader, { passive: true });

  document.querySelectorAll("[data-nav-link]").forEach((link) => {
    if (!link.hash || link.pathname !== window.location.pathname || !("IntersectionObserver" in window)) return;
    const section = document.querySelector(link.hash);
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => {
      link.classList.toggle("is-active", entry.isIntersecting);
    }, { rootMargin: "-35% 0px -58%", threshold: 0 });
    observer.observe(section);
  });

  document.querySelectorAll("[data-example-tab]").forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.exampleTab;
      document.querySelectorAll("[data-example-tab]").forEach((item) => {
        const active = item === tab;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-selected", String(active));
      });
      document.querySelectorAll("[data-example-panel]").forEach((panel) => {
        const active = panel.dataset.examplePanel === target;
        panel.classList.toggle("is-active", active);
        panel.hidden = !active;
      });
    });
  });

  const video = document.querySelector("[data-demo-video]");
  const videoCover = document.querySelector("[data-video-play]");
  if (video && videoCover) {
    videoCover.addEventListener("click", () => {
      videoCover.hidden = true;
      video.play();
    });
    video.addEventListener("play", () => {
      videoCover.hidden = true;
    });
  }

  document.querySelectorAll("[data-current-year]").forEach((item) => {
    item.textContent = new Date().getFullYear();
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = document.querySelector("[data-hero]");
  const heroVisual = document.querySelector("[data-hero-visual]");
  if (hero && heroVisual && !reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    hero.addEventListener("pointermove", (event) => {
      const bounds = hero.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width - 0.5;
      const y = (event.clientY - bounds.top) / bounds.height - 0.5;
      hero.style.setProperty("--spotlight-x", `${(x + .5) * 100}%`);
      hero.style.setProperty("--spotlight-y", `${(y + .5) * 100}%`);
      heroVisual.style.transform = `translate3d(${x * -12}px, ${y * -12}px, 0)`;
    });
    hero.addEventListener("pointerleave", () => { heroVisual.style.transform = ""; });
  }

  if (!reduceMotion && window.matchMedia("(pointer: fine)").matches) {
    document.querySelectorAll("[data-tilt-card]").forEach((card) => {
      card.addEventListener("pointermove", (event) => {
        const bounds = card.getBoundingClientRect();
        const rotateY = ((event.clientX - bounds.left) / bounds.width - .5) * 5;
        const rotateX = ((event.clientY - bounds.top) / bounds.height - .5) * -5;
        card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
      });
      card.addEventListener("pointerleave", () => { card.style.transform = ""; });
    });
  }
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((item) => observer.observe(item));
  } else {
    document.querySelectorAll(".reveal").forEach((item) => item.classList.add("is-visible"));
  }
});
