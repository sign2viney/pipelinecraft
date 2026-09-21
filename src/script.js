// ============================================
//  main.js — Viney Prasad DevOps Portfolio
// ============================================

// ── Skills Data ──
// Edit name, icon, pct (0-100), level, and cat to update your skills
const SKILLS = [
  { name: "Docker",          icon: "ti-brand-docker",        pct: 75, level: "Intermediate", cat: "containers" },
  { name: "Kubernetes",      icon: "ti-drone",               pct: 60, level: "Learning",     cat: "containers" },
  { name: "Jenkins",         icon: "ti-settings-automation", pct: 70, level: "Intermediate", cat: "cicd"       },
  { name: "GitHub Actions",  icon: "ti-git-branch",          pct: 75, level: "Intermediate", cat: "cicd"       },
  { name: "AWS",             icon: "ti-cloud",               pct: 65, level: "Intermediate", cat: "cloud"      },
  { name: "Linux",           icon: "ti-terminal-2",          pct: 82, level: "Comfortable",  cat: "scripting"  },
  { name: "Bash",            icon: "ti-terminal",            pct: 72, level: "Intermediate", cat: "scripting"  },
  { name: "Python",          icon: "ti-brand-python",        pct: 65, level: "Intermediate", cat: "scripting"  },
  { name: "Terraform",       icon: "ti-hierarchy",           pct: 60, level: "Learning",     cat: "iac"        },
  { name: "Ansible",         icon: "ti-cpu",                 pct: 55, level: "Learning",     cat: "iac"        },
  { name: "Prometheus",      icon: "ti-chart-line",          pct: 60, level: "Learning",     cat: "monitoring" },
  { name: "Grafana",         icon: "ti-chart-dots-3",        pct: 63, level: "Learning",     cat: "monitoring" },
];

// ── Render Skills ──
function renderSkills(filter) {
  const grid = document.getElementById("skillsGrid");
  if (!grid) return;

  const list = filter === "all"
    ? SKILLS
    : SKILLS.filter(s => s.cat === filter);

  grid.innerHTML = list.map(s => `
    <div class="skill-card reveal">
      <div class="skill-head">
        <i class="ti ${s.icon} skill-icon" aria-hidden="true"></i>
        <span class="skill-name">${s.name}</span>
      </div>
      <div class="bar-track">
        <div class="bar-fill" data-pct="${s.pct}" style="width: 0%"></div>
      </div>
      <div class="skill-foot">
        <span class="skill-level">${s.level}</span>
        <span class="skill-pct">${s.pct}%</span>
      </div>
    </div>
  `).join("");

  // Trigger bar animation after paint
  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      grid.querySelectorAll(".bar-fill").forEach(bar => {
        bar.style.width = bar.dataset.pct + "%";
      });
      // Re-run reveal observer on new cards
      grid.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
    });
  });
}

// ── Filter Buttons ──
function initFilters() {
  document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderSkills(btn.dataset.cat);
    });
  });
}

// ── Scroll Reveal ──
const revealObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

function initReveal() {
  document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));
}

// ── Sticky Navbar Shadow ──
function initNavbar() {
  const navbar = document.getElementById("navbar");
  if (!navbar) return;
  window.addEventListener("scroll", () => {
    navbar.classList.toggle("scrolled", window.scrollY > 20);
  }, { passive: true });
}

// ── Active Nav Link on Scroll ──
function initScrollSpy() {
  const sections = document.querySelectorAll("section[id]");
  const links    = document.querySelectorAll(".nav-link");

  const spy = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        links.forEach(link => {
          link.classList.toggle(
            "active",
            link.getAttribute("href") === "#" + entry.target.id
          );
        });
      }
    });
  }, { rootMargin: "-50% 0px -50% 0px" });

  sections.forEach(s => spy.observe(s));
}

// ── Hamburger Menu ──
function initHamburger() {
  const btn  = document.getElementById("hamburger");
  const menu = document.getElementById("navMenu");
  if (!btn || !menu) return;

  btn.addEventListener("click", () => {
    const open = menu.classList.toggle("open");
    btn.querySelector("i").className = open ? "ti ti-x" : "ti ti-menu-2";
    btn.setAttribute("aria-expanded", open);
  });

  // Close on link click
  menu.querySelectorAll(".nav-link").forEach(link => {
    link.addEventListener("click", () => {
      menu.classList.remove("open");
      btn.querySelector("i").className = "ti ti-menu-2";
      btn.setAttribute("aria-expanded", "false");
    });
  });
}

// ── Smooth Scroll (accounts for fixed navbar height) ──
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", e => {
      const id     = anchor.getAttribute("href");
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      const navH = document.getElementById("navbar")?.offsetHeight || 68;
      const top  = target.getBoundingClientRect().top + window.scrollY - navH - 10;
      window.scrollTo({ top, behavior: "smooth" });
    });
  });
}

// ── Back to Top Button ──
function initBackToTop() {
  const btn = document.getElementById("backToTop");
  if (!btn) return;
  window.addEventListener("scroll", () => {
    btn.classList.toggle("show", window.scrollY > 400);
  }, { passive: true });
}

// ── Contact Form ──
function initContactForm() {
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");
  if (!form) return;

  form.addEventListener("submit", e => {
    e.preventDefault();
    // Replace this block with your actual form submission logic
    // e.g. fetch() to a backend, Formspree, EmailJS, etc.
    const name = form.querySelector("#name").value;
    note.textContent = `Thanks ${name}! I'll get back to you soon.`;
    note.style.color = "#16a34a";
    form.reset();
    setTimeout(() => { note.textContent = ""; }, 5000);
  });
}

// ── Footer Year ──
function setYear() {
  const el = document.getElementById("year");
  if (el) el.textContent = new Date().getFullYear();
}

// ── Add reveal class to static sections ──
function markRevealElements() {
  const targets = [
    ".hero-text",
    ".hero-avatar",
    ".hero-stats",
    ".about-text",
    ".about-cards",
    ".project-card",
    ".about-card",
    ".contact-info",
    ".contact-form",
  ];
  targets.forEach(sel => {
    document.querySelectorAll(sel).forEach((el, i) => {
      el.classList.add("reveal");
      if (i > 0) el.style.transitionDelay = (i * 0.07) + "s";
    });
  });
}

// ── Init All ──
document.addEventListener("DOMContentLoaded", () => {
  setYear();
  markRevealElements();
  renderSkills("all");
  initFilters();
  initReveal();
  initNavbar();
  initScrollSpy();
  initHamburger();
  initSmoothScroll();
  initBackToTop();
  initContactForm();
});
