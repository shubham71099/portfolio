/* ========================================================
   PORTFOLIO — MODERN SCRIPT
   ======================================================== */

// ---- DOM References ----
const header = document.querySelector("header");
const progressBar = document.querySelector(".progress-bar");
const progressContainer = document.querySelector(".progress-container");
const scrollTopBtn = document.getElementById("scroll-top");

// ========== LOADER ==========
(function initLoader() {
  const loader = document.getElementById("loader");
  const topHeader = document.getElementById("top-header");

  document.addEventListener("DOMContentLoaded", function () {
    setTimeout(function () {
      loader.classList.add("hide");
      topHeader.style.display = "flex";
      progressContainer.style.display = "block";
    }, 2000);

    // Remove loader from DOM after transition
    setTimeout(function () {
      loader.style.display = "none";
    }, 2600);
  });
})();

// ========== TYPED.JS ==========
var typing = new Typed(".typing-text", {
  strings: [
    "  ",
    " Full Stack Developer",
    " Competitive Programmer",
    " Tech Enthusiast",
  ],
  typeSpeed: 50,
  backSpeed: 30,
  loop: true,
});

// ========== VISITOR COUNTER ==========
async function getAndShowVisitors() {
  try {
    const visitorsCountAPIEndpoint =
      "https://email-p1piz6qm.b4a.run/api/visitCount";
    const res = await axios.post(
      visitorsCountAPIEndpoint,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
      }
    );
    const visitorsCount = res.data.visitCount;
    if (res.data.success) {
      const visitorsCountDiv = document.querySelector(".visitors-display");
      visitorsCountDiv.innerHTML = `Total Visitors: <b>${visitorsCount}</b>`;
      visitorsCountDiv.style.display = "block";
    }
  } catch (error) {
    console.log("Visitor counter error:", error);
  }
}
getAndShowVisitors();

// ========== SCROLL — STICKY NAV, PROGRESS BAR, SCROLL-TOP ==========
function updateProgressBar() {
  const scrollPos =
    document.documentElement.scrollTop || document.body.scrollTop;
  const windowHeight =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;
  const progress = (scrollPos / windowHeight) * 100;
  progressBar.style.width = `${progress}%`;
}

window.addEventListener("scroll", function () {
  // Sticky header
  header.classList.toggle("sticky", window.scrollY > 100);

  // Progress bar
  updateProgressBar();

  // Scroll-to-top button
  if (scrollTopBtn) {
    scrollTopBtn.classList.toggle("show", window.scrollY > 500);
  }
});

// ========== MOBILE MENU ==========
const menu = document.querySelector("#menu-icon");
const navlist = document.querySelector("#navlist");
const navOverlay = document.getElementById("nav-overlay");

function openMenu() {
  menu.classList.add("bx-x");
  navlist.classList.add("open");
  if (navOverlay) navOverlay.classList.add("show");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  menu.classList.remove("bx-x");
  navlist.classList.remove("open");
  if (navOverlay) navOverlay.classList.remove("show");
  document.body.style.overflow = "";
}

menu.addEventListener("click", function () {
  if (navlist.classList.contains("open")) {
    closeMenu();
  } else {
    openMenu();
  }
});

if (navOverlay) {
  navOverlay.addEventListener("click", closeMenu);
}

// Close menu on nav link click
navlist.querySelectorAll("a").forEach(function (link) {
  link.addEventListener("click", closeMenu);
});

// Close on scroll (desktop behaviour)
window.addEventListener("scroll", function () {
  if (navlist.classList.contains("open")) {
    closeMenu();
  }
});

// ========== SMOOTH SCROLL WITH OFFSET ==========
document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
  anchor.addEventListener("click", function (e) {
    const targetId = this.getAttribute("href");
    if (targetId === "#") return;
    const targetEl = document.querySelector(targetId);
    if (targetEl) {
      e.preventDefault();
      const offset = 80;
      const y =
        targetEl.getBoundingClientRect().top + window.pageYOffset - offset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });
});

// ========== ACTIVE NAV LINK ON SCROLL ==========
const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".navlist a[data-section]");

const sectionObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute("id");
        navLinks.forEach(function (link) {
          link.classList.remove("active-link");
          if (link.getAttribute("data-section") === id) {
            link.classList.add("active-link");
          }
        });
      }
    });
  },
  {
    rootMargin: "-40% 0px -55% 0px",
  }
);

sections.forEach(function (sec) {
  sectionObserver.observe(sec);
});

// ========== SCROLL REVEAL (IntersectionObserver) ==========
const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
  function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        // Don't unobserve — allows re-reveal if needed (remove line below to make one-shot)
        // revealObserver.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.12,
    rootMargin: "0px 0px -60px 0px",
  }
);

revealElements.forEach(function (el) {
  revealObserver.observe(el);
});

// ========== THEME TOGGLE ==========
const themeToggle = document.getElementById("theme-toggle");
const themeIcon = themeToggle ? themeToggle.querySelector("i") : null;

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem("portfolio-theme", theme);
  if (themeIcon) {
    themeIcon.className = theme === "light" ? "bx bx-sun" : "bx bx-moon";
  }
}

// Initialize theme from localStorage
(function () {
  const savedTheme = localStorage.getItem("portfolio-theme") || "dark";
  setTheme(savedTheme);
})();

if (themeToggle) {
  themeToggle.addEventListener("click", function () {
    const current =
      document.documentElement.getAttribute("data-theme") || "dark";
    setTheme(current === "dark" ? "light" : "dark");
  });
}

// ========== CONTACT FORM ==========
function validateEmail(email) {
  const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
  return emailRegex.test(email);
}

function validateMobile(mobile) {
  var mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobile);
}

// Toast notification
function showToast(message, type) {
  // Remove any existing toast
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = `toast ${type}`;
  toast.textContent = message;
  document.body.appendChild(toast);

  // Trigger show
  requestAnimationFrame(function () {
    toast.classList.add("show");
  });

  // Auto-hide
  setTimeout(function () {
    toast.classList.remove("show");
    setTimeout(function () {
      toast.remove();
    }, 400);
  }, 3500);
}

async function sendEmail() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const mobile = document.getElementById("mobile").value;
  const message = document.getElementById("message").value;
  const contactForm = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");

  if (!name || !email || !mobile || !message) {
    showToast("Please enter all details", "error");
    return;
  }

  if (!validateEmail(email)) {
    showToast("Please enter a valid email address", "error");
    return;
  }

  if (!validateMobile(mobile)) {
    showToast("Please enter a 10-digit mobile number", "error");
    return;
  }

  const endpoint = "https://api.web3forms.com/submit";

  const body = {
    access_key: "c5ea2de1-7ed9-4f9d-a0f3-b2be9cc32055",
    subject: `New message on portfolio from ${name}`,
    from_name: "Contact Form",
    botcheck: "",
    name: name,
    email: email,
    mobile: mobile,
    message: message,
  };

  try {
    submitBtn.innerHTML = "Sending...";
    submitBtn.classList.add("loading");

    await axios.post(endpoint, body, {
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },
    });

    submitBtn.classList.remove("loading");
    submitBtn.innerHTML = "Send Message";
    contactForm.reset();
    showToast("Message sent successfully! I will contact you shortly.", "success");
  } catch (error) {
    submitBtn.classList.remove("loading");
    submitBtn.innerHTML = "Send Message";
    contactForm.reset();
    showToast("Something went wrong. Please try again!", "error");
  }
}

function upperCase() {
  const x = document.getElementById("name");
  x.value = x.value.toUpperCase();
}

function lowerCase() {
  const x = document.getElementById("email");
  x.value = x.value.toLowerCase();
}

// ========== CUSTOM CURSOR (hero section only, smooth lerp) ==========
(function () {
  const crsr = document.querySelector(".cursor");
  if (!crsr) return;

  // Only enable on devices with fine pointer (non-touch)
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;

  const heroSection = document.querySelector(".home");
  let mouseX = 0, mouseY = 0;
  let cursorX = 0, cursorY = 0;
  const ease = 0.12; // Lower = smoother/slower trail

  // Start hidden
  crsr.classList.add("hidden");

  document.addEventListener("mousemove", function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  function animateCursor() {
    cursorX += (mouseX - cursorX) * ease;
    cursorY += (mouseY - cursorY) * ease;
    crsr.style.left = cursorX + "px";
    crsr.style.top = cursorY + "px";
    requestAnimationFrame(animateCursor);
  }
  animateCursor();

  if (heroSection) {
    heroSection.addEventListener("mouseenter", function () {
      crsr.classList.remove("hidden");
    });

    heroSection.addEventListener("mouseleave", function () {
      crsr.classList.add("hidden");
    });

    // Hide cursor when hovering interactive elements
    const interactiveEls = heroSection.querySelectorAll("a, button, .btn, .hero-socials a");
    interactiveEls.forEach(function (el) {
      el.addEventListener("mouseenter", function () {
        crsr.classList.add("hidden");
      });
      el.addEventListener("mouseleave", function () {
        crsr.classList.remove("hidden");
      });
    });
  }
})();

// ========== HERO CODE RAIN ANIMATION ==========
(function () {
  const heroBg = document.querySelector(".hero-bg");
  if (!heroBg) return;

  // Create container
  const container = document.createElement("div");
  container.className = "code-rain-container";
  heroBg.appendChild(container);

  const codeSnippets = [
    'const app = express();',
    'import React from "react";',
    'function solve(n) {',
    'git push origin main',
    'SELECT * FROM users',
    'npm install --save',
    'public static void main',
    'def binary_search(arr):',
    'docker-compose up -d',
    'return response.json();',
    'while (left <= right)',
    'class API extends Base {',
    'fetch("/api/data")',
    'console.log("Hello");',
    'if (node.left !== null)',
    'map.put(key, value);',
    'arr.sort((a, b) => a - b)',
    'try { await db.connect()',
    'export default App;',
    'router.get("/users")',
    'System.out.println()',
    'kubectl apply -f pod.yaml',
    'const [state, setState]',
    'O(n log n)',
    'async function getData()',
    'border-radius: 50%;',
    'dp[i] = dp[i-1] + dp[i-2]',
    'git commit -m "feat:"',
    'HashMap<K, V> map',
    'useEffect(() => {}, [])',
  ];

  const maxSnippets = 15; // Max concurrent snippets on screen
  let activeCount = 0;

  function spawnSnippet() {
    if (activeCount >= maxSnippets) return;

    const el = document.createElement("span");
    el.className = "code-snippet";
    el.textContent = codeSnippets[Math.floor(Math.random() * codeSnippets.length)];

    // Random position
    el.style.left = Math.random() * 90 + 2 + "%";
    el.style.bottom = "-30px";

    // Random duration (slow float upward)
    const duration = 12 + Math.random() * 18; // 12-30s
    el.style.animationDuration = duration + "s";

    // Random delay
    el.style.animationDelay = Math.random() * 2 + "s";

    // Slight random font size variation
    el.style.fontSize = (11 + Math.random() * 4) + "px";

    container.appendChild(el);
    activeCount++;

    // Remove after animation completes
    setTimeout(function () {
      el.remove();
      activeCount--;
    }, (duration + 3) * 1000);
  }

  // Spawn initial batch
  for (let i = 0; i < 8; i++) {
    setTimeout(function () {
      spawnSnippet();
    }, i * 800);
  }

  // Keep spawning
  setInterval(spawnSnippet, 2500);
})();

// ========== ABOUT SECTION — FLOATING CODE SYMBOLS ==========
(function () {
  const container = document.getElementById("about-code-bg");
  if (!container) return;

  const aboutSection = document.getElementById("about");
  if (!aboutSection) return;

  const symbols = [
    "{ }", "< />", "=>", "( )", "&&", "||", "!=", "===",
    "//", "/**/", "[ ]", "::", "++", "--", "**", "??",
    "func", "let", "var", "if", "else", "for", "return",
    "class", "new", "null", "true", "0x", "#!", ">>",
    "${}", "<>", "/>", "...", ":=", "->", "fn()",
    "int", "void", "@app", "pip", "npm", "git",
  ];

  const colors = [
    "var(--accent)",
    "var(--accent-light)",
    "var(--accent-secondary)",
    "#ff6b9d",
    "#a855f7",
  ];

  let activeCount = 0;
  const MAX_SYMBOLS = 12;
  let isVisible = false;
  let spawnInterval;

  function spawnSymbol() {
    if (!isVisible || activeCount >= MAX_SYMBOLS) return;

    const el = document.createElement("span");
    el.className = "about-code-symbol";
    el.textContent = symbols[Math.floor(Math.random() * symbols.length)];

    // Random position
    el.style.left = (5 + Math.random() * 90) + "%";
    el.style.bottom = "-30px";

    // Random styling
    el.style.color = colors[Math.floor(Math.random() * colors.length)];
    el.style.fontSize = (12 + Math.random() * 18) + "px";
    el.style.fontWeight = Math.random() > 0.5 ? "700" : "400";

    // Random animation duration
    const duration = 8 + Math.random() * 14;
    el.style.animationDuration = duration + "s";
    el.style.animationDelay = (Math.random() * 2) + "s";

    container.appendChild(el);
    activeCount++;

    // Remove after animation
    setTimeout(function () {
      el.remove();
      activeCount--;
    }, (duration + 3) * 1000);
  }

  // Only spawn when about section is visible
  const observer = new IntersectionObserver(function (entries) {
    isVisible = entries[0].isIntersecting;
    if (isVisible && !spawnInterval) {
      // Initial burst
      for (let i = 0; i < 6; i++) {
        setTimeout(spawnSymbol, i * 600);
      }
      spawnInterval = setInterval(spawnSymbol, 2000);
    } else if (!isVisible && spawnInterval) {
      clearInterval(spawnInterval);
      spawnInterval = null;
    }
  }, { threshold: 0.1 });

  observer.observe(aboutSection);
})();

// ========== HERO PARTICLE NETWORK ==========
(function () {
  const canvas = document.getElementById("hero-particles");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const heroSection = document.querySelector(".home");
  if (!heroSection) return;

  let particles = [];
  let animId;
  let w, h;
  const PARTICLE_COUNT = 60;
  const CONNECTION_DIST = 140;
  const MOUSE_RADIUS = 180;
  let mouse = { x: -9999, y: -9999 };

  function resize() {
    const rect = heroSection.getBoundingClientRect();
    w = canvas.width = rect.width;
    h = canvas.height = rect.height;
  }

  function createParticles() {
    particles = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        r: 1.5 + Math.random() * 1.5,
      });
    }
  }

  function draw() {
    ctx.clearRect(0, 0, w, h);

    const isDark = document.documentElement.getAttribute("data-theme") !== "light";
    const particleColor = "rgba(108,99,255,";
    const lineColor = "rgba(108,99,255,";

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < CONNECTION_DIST) {
          const opacity = isDark
            ? (1 - dist / CONNECTION_DIST) * 0.15
            : (1 - dist / CONNECTION_DIST) * 0.1;
          ctx.beginPath();
          ctx.strokeStyle = lineColor + opacity + ")";
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Draw particles & mouse connections
    for (let i = 0; i < particles.length; i++) {
      const p = particles[i];

      // Mouse interaction
      const mdx = p.x - mouse.x;
      const mdy = p.y - mouse.y;
      const mDist = Math.sqrt(mdx * mdx + mdy * mdy);
      if (mDist < MOUSE_RADIUS) {
        const mOpacity = isDark
          ? (1 - mDist / MOUSE_RADIUS) * 0.3
          : (1 - mDist / MOUSE_RADIUS) * 0.2;
        ctx.beginPath();
        ctx.strokeStyle = "rgba(0,212,255," + mOpacity + ")";
        ctx.lineWidth = 0.8;
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.stroke();
      }

      // Draw particle
      ctx.beginPath();
      const pOpacity = isDark ? 0.5 : 0.35;
      ctx.fillStyle = particleColor + pOpacity + ")";
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fill();

      // Move
      p.x += p.vx;
      p.y += p.vy;

      // Bounce
      if (p.x < 0 || p.x > w) p.vx *= -1;
      if (p.y < 0 || p.y > h) p.vy *= -1;
    }

    animId = requestAnimationFrame(draw);
  }

  heroSection.addEventListener("mousemove", function (e) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });

  heroSection.addEventListener("mouseleave", function () {
    mouse.x = -9999;
    mouse.y = -9999;
  });

  const observer = new IntersectionObserver(function (entries) {
    if (entries[0].isIntersecting) {
      if (!animId) draw();
    } else {
      cancelAnimationFrame(animId);
      animId = null;
    }
  }, { threshold: 0.1 });

  observer.observe(heroSection);

  window.addEventListener("resize", function () {
    resize();
    createParticles();
  });

  resize();
  createParticles();
})();
