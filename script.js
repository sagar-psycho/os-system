"use strict";

/*
  Portfolio OS
  Main JavaScript file
  Controls:
  - Lock/Login flow
  - Desktop icons
  - Start menu
  - Taskbar
  - Draggable desktop windows
  - Widgets
  - AI Lab and Sagar AI window rendering
  - Admin-only Firestore dashboard
  - Recruiter contact collection popup
*/

// ======================================================
// ===== ADMIN CONFIGURATION =============================
// ======================================================

const ADMIN_NAME = "kothakula sagar";
const ADMIN_PASSWORD = "Sagar@2002";

let contactPopupTimer = null;
let contactPopupAttempts = 0;

// ======================================================
// ===== EDIT PROFILE DATA HERE =========================
// ======================================================

const portfolioData = {
  profile: {
    name: "Sagar K",
    role: "Digital Marketing Executive",
    location: "Bengaluru",
    experience: "6+ Months",
    email: "sagar@example.com",
    phone: "+91 98765 43210",
    whatsapp: "https://wa.me/919876543210",
    profileImage: "assets/images/profile.png",
    resume: "assets/resume/resume.pdf",
    summary:
      "I am a Digital Marketing Executive focused on SEO, paid ads, website optimization, analytics, and AI-powered marketing workflows. I enjoy building modern websites, improving search visibility, and creating practical automation tools for business growth."
  },

  education: [
    {
      title: "School",
      institution: "Don Bosco High School, Punganur",
      year: "2018",
      description: "Completed schooling with interest in technology, communication, and business."
    },
    {
      title: "Intermediate",
      institution: "Your Higher Secondary Institution",
      year: "2020",
      description: "Built strong fundamentals in analytical thinking and computer usage."
    },
    {
      title: "Graduation",
      institution: "Your College Name",
      year: "2023",
      description: "Graduated with practical exposure to business, marketing, and digital tools."
    }
  ],

  skills: [
    {
      category: "Digital Marketing",
      items: [
        { name: "SEO", level: 90 },
        { name: "Local SEO", level: 85 },
        { name: "Meta Ads", level: 80 },
        { name: "Google Ads", level: 75 }
      ]
    },
    {
      category: "Development",
      items: [
        { name: "HTML", level: 88 },
        { name: "CSS", level: 84 },
        { name: "JavaScript", level: 76 },
        { name: "Bootstrap", level: 82 }
      ]
    },
    {
      category: "Tools",
      items: [
        { name: "Google Search Console", level: 86 },
        { name: "Analytics", level: 78 },
        { name: "Ahrefs", level: 72 },
        { name: "Canva", level: 88 },
        { name: "WordPress", level: 80 },
        { name: "OpenCart", level: 74 }
      ]
    }
  ],

  projects: [
    {
      id: "abra-zylo",
      title: "Abra Zylo",
      category: "Development",
      image: "assets/images/projects/Abra Zylo.png",
      description: "A modern business website concept for digital presence and lead generation.",
      techStack: ["HTML", "CSS", "JavaScript", "SEO"],
      github: "https://github.com",
      live: "#",
      overview:
        "Abra Zylo is a professional web project focused on brand presentation, service discovery, and conversion-friendly layouts.",
      features: ["Responsive design", "SEO-friendly structure", "Lead-focused sections", "Modern UI"],
      challenges: "Creating a clean layout that balances brand trust with conversion elements.",
      results: "Improved presentation quality and made the website easier for visitors to understand."
    },
    {
      id: "abra-logistics",
      title: "Abra Logistics",
      category: "Marketing",
      image: "assets/images/projects/Abra Logistics.png",
      description: "A logistics-focused digital marketing and website optimization project.",
      techStack: ["SEO", "Local SEO", "WordPress", "Analytics"],
      github: "https://github.com",
      live: "#",
      overview:
        "A project focused on improving logistics service visibility, search performance, and customer inquiry flow.",
      features: ["Local SEO", "Service pages", "Analytics tracking", "Inquiry optimization"],
      challenges: "Optimizing service pages for local search and clear logistics communication.",
      results: "Better structure for search visibility and customer understanding."
    },
    {
      id: "finora",
      title: "FINORA",
      category: "Development",
      image: "assets/images/projects/finora.png",
      description: "A personal finance web app for expense tracking, budget planning, and reports.",
      techStack: ["HTML", "CSS", "JavaScript", "Firebase"],
      github: "https://github.com",
      live: "#",
      overview:
        "FINORA helps users manage income, expenses, budgets, and financial summaries through a clean dashboard.",
      features: ["Expense tracking", "Budget reports", "Dashboard cards", "Financial statement view"],
      challenges: "Building a simple and understandable finance flow for everyday users.",
      results: "Created a practical finance dashboard experience."
    },
    {
      id: "seo-generator",
      title: "SEO Generator Tool",
      category: "Automation",
      image: "assets/images/projects/seo-generator.png",
      description: "A tool concept for generating SEO titles, descriptions, and keyword ideas.",
      techStack: ["JavaScript", "SEO", "Automation"],
      github: "https://github.com",
      live: "#",
      overview:
        "This tool supports digital marketers by quickly generating SEO-friendly content ideas.",
      features: ["Meta title generation", "Meta description ideas", "Keyword suggestions", "Copy-friendly output"],
      challenges: "Keeping generated content useful, readable, and SEO-focused.",
      results: "Reduced repetitive SEO writing time."
    },
    {
      id: "abra-global-shipping",
      title: "Abra Global Shipping",
      category: "SEO",
      image: "assets/images/projects/Abra Logistics.png",
      description: "SEO and digital marketing structure for shipping and logistics services.",
      techStack: ["SEO", "Content", "Analytics", "Local SEO"],
      github: "https://github.com",
      live: "#",
      overview:
        "A digital visibility project for global shipping service pages and lead generation.",
      features: ["Service SEO", "Keyword mapping", "Content structure", "Conversion sections"],
      challenges: "Explaining complex shipping services in a simple website structure.",
      results: "Improved website clarity and SEO readiness."
    }
  ],

  certificates: [
    {
      title: "SEO Certification",
      issuer: "Digital Marketing Institute",
      image: "assets/images/certificates/seo-certificate.jpg",
      year: "2024"
    },
    {
      title: "Google Ads Certification",
      issuer: "Google Skillshop",
      image: "assets/images/certificates/google-ads.jpg",
      year: "2024"
    },
    {
      title: "Analytics Certification",
      issuer: "Google",
      image: "assets/images/certificates/analytics.jpg",
      year: "2024"
    },
    {
      title: "Web Development Basics",
      issuer: "Online Learning",
      image: "assets/images/certificates/web-dev.jpg",
      year: "2024"
    }
  ],

  experience: [
    {
      company: "ABRA Group",
      role: "Digital Marketing Executive",
      period: "6+ Months",
      sections: [
        {
          title: "SEO",
          points: ["On-page SEO", "Keyword research", "Technical SEO checks", "Search Console monitoring"]
        },
        {
          title: "Paid Ads",
          points: ["Meta Ads campaign support", "Google Ads setup support", "Performance tracking"]
        },
        {
          title: "Web Platforms",
          points: ["WordPress updates", "OpenCart product/content updates", "Landing page improvement"]
        },
        {
          title: "Marketing Tools",
          points: ["Merchant Center support", "Analytics reporting", "Canva creatives"]
        }
      ]
    }
  ],

  achievements: [
    { label: "Certifications", value: 25, suffix: "+" },
    { label: "Websites", value: 10, suffix: "+" },
    { label: "Campaigns", value: 15, suffix: "+" },
    { label: "SEO Tasks", value: 50, suffix: "+" }
  ],

  socialLinks: {
    linkedin: "https://linkedin.com",
    github: "https://github.com",
    instagram: "https://instagram.com",
    whatsapp: "https://wa.me/919876543210",
    email: "mailto:sagar@example.com"
  }
};

// ======================================================
// ===== STATUS NOTIFICATION DATA ========================
// ======================================================

const statusNotifications = [
  { icon: "📈", label: "Currently Working As", title: "Digital Marketing Executive" },
  { icon: "🔍", label: "Specialization", title: "SEO Specialist" },
  { icon: "💻", label: "Technical Skills", title: "Web Developer" },
  { icon: "🤖", label: "Future Goal", title: "AI-Powered Marketer" }
];

// ======================================================
// ===== APPLICATION STATE ==============================
// ======================================================

const state = {
  zIndex: 50,
  openedWindows: new Map(),
  minimizedWindows: new Set(),
  maximizedWindows: new Set(),
  muted: false,
  currentWallpaper: "assets/images/wallpaper1.png"
};

const desktopApps = [
  { id: "about", title: "About Me", icon: "👤" },
  { id: "education", title: "Education", icon: "🎓" },
  { id: "projects", title: "Projects", icon: "📁" },
  { id: "certificates", title: "Certificates", icon: "📜" },
  { id: "skills", title: "Skills", icon: "💻" },
  { id: "resume", title: "Resume", icon: "📄" },
  { id: "experience", title: "Experience", icon: "🏢" },
  { id: "achievements", title: "Achievements", icon: "🏆" },
  { id: "dashboard", title: "Dashboard", icon: "📊" },
  { id: "contact", title: "Contact", icon: "📧" },
  { id: "ai-lab", title: "AI Lab", icon: "📁" },
  { id: "settings", title: "Settings", icon: "⚙️" }
];

const wallpapers = [
  "assets/images/wallpaper1.png",
  "assets/images/wallpaper2.png",
  "assets/images/wallpaper3.png"
];

let isUnlocking = false;
let touchStartY = 0;
let wheelUnlockStarted = false;

// ======================================================
// ===== DOM HELPERS ====================================
// ======================================================

function $(selector) {
  return document.querySelector(selector);
}

function $all(selector) {
  return document.querySelectorAll(selector);
}

function saveStorage(key, value) {
  localStorage.setItem(`portfolioOS_${key}`, JSON.stringify(value));
}

function getStorage(key, fallback) {
  const value = localStorage.getItem(`portfolioOS_${key}`);

  if (!value) return fallback;

  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function stopSpeechIfAvailable() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }

  if (typeof window.stopAllSpeech === "function") {
    window.stopAllSpeech();
  }
}

function formatName(name) {
  return String(name)
    .trim()
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}

function getRecruiterName() {
  return localStorage.getItem("portfolioOS_recruiterName") || "Guest";
}

function getContactKey() {
  return `portfolioOS_contactSubmitted_${getRecruiterName().toLowerCase()}`;
}

function shutdownPortfolioOS(message = "Session ended.") {
  stopSpeechIfAvailable();

  if (contactPopupTimer) {
    clearInterval(contactPopupTimer);
    contactPopupTimer = null;
  }

  showToast(message);

  setTimeout(() => {
    location.reload();
  }, 1200);
}

// ======================================================
// ===== INITIALIZATION =================================
// ======================================================

document.addEventListener("DOMContentLoaded", initApp);

function initApp() {
  loadSavedPreferences();
  updateProfileUI();
  renderDesktopIcons();
  renderStartMenuApps();
  renderSocialDock();
  updateClock();
  renderCalendar();
  updateVisitorCounter();
  renderNotes();
  bindGlobalEvents();
  startStatusNotifications();

  setInterval(updateClock, 1000);
}

// ======================================================
// ===== LOCK / LOGIN FLOW ===============================
// ======================================================

function openLoginScreen() {
  const lockScreen = $("#lockScreen");
  const loginScreen = $("#loginScreen");

  if (!lockScreen || !loginScreen) return;
  if (lockScreen.classList.contains("hidden")) return;
  if (isUnlocking) return;

  stopSpeechIfAvailable();

  isUnlocking = true;

  lockScreen.classList.add("unlocking");

  setTimeout(() => {
    lockScreen.classList.add("hidden");
    lockScreen.classList.remove("unlocking");

    loginScreen.classList.remove("hidden");
    loginScreen.classList.add("login-visible");

    setTimeout(() => {
      $("#passwordInput")?.focus();
    }, 100);

    isUnlocking = false;
    wheelUnlockStarted = false;
  }, 550);
}

function validateLogin() {
  const passwordInput = $("#passwordInput");
  const recruiterName = passwordInput.value.trim();

  const namePattern = /^[a-zA-Z\s]+$/;

  if (!namePattern.test(recruiterName)) {
    showToast("Please enter a valid name. Numbers are not allowed.");

    passwordInput.classList.remove("shake");
    void passwordInput.offsetWidth;
    passwordInput.classList.add("shake");

    passwordInput.value = "";
    passwordInput.focus();
    return;
  }

  const normalizedName = recruiterName.toLowerCase();
  const isAdmin = normalizedName === ADMIN_NAME;

  localStorage.setItem("portfolioOS_recruiterName", recruiterName);
  localStorage.setItem("portfolioOS_isAdmin", isAdmin ? "true" : "false");

  if (typeof window.saveRecruiterLogin === "function") {
    window.saveRecruiterLogin({
      recruiterName,
      isAdmin
    });
  }

  openDesktopAfterLogin();
}

function openDesktopAfterLogin() {
  $("#loginScreen").classList.add("fade-out");

  setTimeout(() => {
    $("#loginScreen").classList.add("hidden");
    $("#bootScreen").classList.remove("hidden");

    setTimeout(() => {
      $("#bootScreen").classList.add("hidden");
      $("#desktop").classList.remove("hidden");

      const formattedName = formatName(getRecruiterName());

      showToast(
        `Hello ${formattedName} 👋
Welcome to Sagar's Portfolio OS.`
      );

      playNotification();

      if (localStorage.getItem("portfolioOS_isAdmin") === "true") {
        showAdminFolder();
      } else {
        startRecruiterContactPopup();
      }
    }, 1800);
  }, 400);
}

// ======================================================
// ===== PROFILE / CLOCK ================================
// ======================================================

function updateProfileUI() {
  const profile = portfolioData.profile;

  $("#lockProfileImage").src = profile.profileImage;

  if ($("#loginProfileImage")) {
    $("#loginProfileImage").src = profile.profileImage;
  }

  $("#startProfileImage").src = profile.profileImage;
  $("#startProfileName").textContent = profile.name;
  $("#startProfileRole").textContent = profile.role;
}

function updateClock() {
  const now = new Date();

  const time = now.toLocaleTimeString([], {
    hour: "2-digit",
    minute: "2-digit"
  });

  const date = now.toLocaleDateString([], {
    weekday: "short",
    month: "short",
    day: "numeric"
  });

  const fullDate = now.toLocaleDateString([], {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric"
  });

  $("#lockTime").textContent = time;
  $("#lockDate").textContent = fullDate;
  $("#taskClock").textContent = time;
  $("#taskDate").textContent = date;
}

// ======================================================
// ===== STATUS NOTIFICATION =============================
// ======================================================

function startStatusNotifications() {
  let index = 0;

  function updateStatus() {
    const item = statusNotifications[index];

    $("#statusIcon").textContent = item.icon;
    $("#statusLabel").textContent = item.label;
    $("#statusTitle").textContent = item.title;

    index = (index + 1) % statusNotifications.length;
  }

  updateStatus();
  setInterval(updateStatus, 4800);
}

// ======================================================
// ===== ICONS / START MENU ==============================
// ======================================================

function renderDesktopIcons() {
  const container = $("#desktopIcons");
  container.innerHTML = "";

  desktopApps.forEach(app => {
    const button = document.createElement("button");
    button.className = "desktop-icon";
    button.dataset.app = app.id;
    button.innerHTML = `
      <span class="icon-symbol">${app.icon}</span>
      <span>${app.title}</span>
    `;
    container.appendChild(button);
  });
}

function renderStartMenuApps() {
  const container = $("#startApps");
  container.innerHTML = "";

  desktopApps.forEach(app => {
    const button = document.createElement("button");
    button.className = "start-app";
    button.dataset.app = app.id;
    button.innerHTML = `
      <strong>${app.icon}</strong>
      <span>${app.title}</span>
    `;
    container.appendChild(button);
  });
}

function showAdminFolder() {
  if (desktopApps.some(app => app.id === "admin-panel")) return;

  desktopApps.push({
    id: "admin-panel",
    title: "Admin Data",
    icon: "🔒"
  });

  renderDesktopIcons();
  renderStartMenuApps();
}

// ======================================================
// ===== WINDOW SYSTEM ==================================
// ======================================================

function openWindow(appId, customTitle = null, customContent = null) {
  if (state.openedWindows.has(appId)) {
    const existingWindow = state.openedWindows.get(appId);

    existingWindow.style.display = "block";
    state.minimizedWindows.delete(appId);

    focusWindow(appId);
    renderRunningApps();

    if (appId === "sagar-ai") {
      initializeAiAssistantSafely();
    }

    return;
  }

  const app = desktopApps.find(item => item.id === appId);
  const title = customTitle || app?.title || "Window";
  const content = customContent || getWindowContent(appId);

  const windowEl = document.createElement("section");
  windowEl.className = "os-window";
  windowEl.dataset.window = appId;
  windowEl.style.left = `${90 + state.openedWindows.size * 28}px`;
  windowEl.style.top = `${70 + state.openedWindows.size * 24}px`;
  windowEl.style.zIndex = ++state.zIndex;

  windowEl.innerHTML = `
    <div class="window-topbar">
      <span class="window-title">${title}</span>
      <div class="window-controls">
        <button class="window-control window-minimize" data-minimize="${appId}" title="Minimize">–</button>
        <button class="window-control window-maximize" data-maximize="${appId}" title="Maximize">□</button>
        <button class="window-control window-close" data-close="${appId}" title="Close">×</button>
      </div>
    </div>

    <div class="window-content">
      ${content}
    </div>
  `;

  const windowsLayer = $("#windowsLayer");

  if (!windowsLayer) {
    console.error("#windowsLayer not found in index.html");
    showToast("Windows layer missing in HTML");
    return;
  }

  windowsLayer.appendChild(windowEl);
  state.openedWindows.set(appId, windowEl);

  makeWindowDraggable(windowEl);
  renderRunningApps();
  runWindowAfterOpen(appId);
  focusWindow(appId);
}

function closeWindow(appId) {
  const windowEl = state.openedWindows.get(appId);

  if (!windowEl) return;

  stopSpeechIfAvailable();

  windowEl.classList.add("window-closing");

  setTimeout(() => {
    windowEl.remove();
    state.openedWindows.delete(appId);
    state.minimizedWindows.delete(appId);
    state.maximizedWindows.delete(appId);
    renderRunningApps();
  }, 180);
}

function minimizeWindow(appId) {
  const windowEl = state.openedWindows.get(appId);

  if (!windowEl) return;

  stopSpeechIfAvailable();

  windowEl.classList.add("window-minimizing");

  setTimeout(() => {
    windowEl.style.display = "none";
    windowEl.classList.remove("window-minimizing");
    state.minimizedWindows.add(appId);
    renderRunningApps();
  }, 180);
}

function restoreWindow(appId) {
  const windowEl = state.openedWindows.get(appId);

  if (!windowEl) return;

  windowEl.style.display = "block";
  state.minimizedWindows.delete(appId);
  focusWindow(appId);
  renderRunningApps();

  if (appId === "sagar-ai") {
    initializeAiAssistantSafely();
  }
}

function toggleMaximizeWindow(appId) {
  const windowEl = state.openedWindows.get(appId);

  if (!windowEl) return;

  focusWindow(appId);

  if (state.maximizedWindows.has(appId)) {
    windowEl.style.left = windowEl.dataset.prevLeft || "90px";
    windowEl.style.top = windowEl.dataset.prevTop || "70px";
    windowEl.style.width = windowEl.dataset.prevWidth || "";
    windowEl.style.height = windowEl.dataset.prevHeight || "";
    windowEl.style.transform = windowEl.dataset.prevTransform || "";

    windowEl.classList.remove("maximized-window");
    state.maximizedWindows.delete(appId);
    return;
  }

  windowEl.dataset.prevLeft = windowEl.style.left;
  windowEl.dataset.prevTop = windowEl.style.top;
  windowEl.dataset.prevWidth = windowEl.style.width;
  windowEl.dataset.prevHeight = windowEl.style.height;
  windowEl.dataset.prevTransform = windowEl.style.transform;

  windowEl.style.left = "50%";
  windowEl.style.top = "50%";
  windowEl.style.width = "95vw";
  windowEl.style.height = "90vh";
  windowEl.style.transform = "translate(-50%, -50%)";

  windowEl.classList.add("maximized-window");
  state.maximizedWindows.add(appId);
}

function toggleWindowFromTaskbar(appId) {
  const windowEl = state.openedWindows.get(appId);

  if (!windowEl) return;

  if (windowEl.style.display === "none") {
    restoreWindow(appId);
  } else {
    minimizeWindow(appId);
  }
}

function focusWindow(appId) {
  const windowEl = state.openedWindows.get(appId);

  if (!windowEl) return;

  windowEl.style.zIndex = ++state.zIndex;

  $all(".os-window").forEach(win => {
    win.classList.remove("active-window");
  });

  windowEl.classList.add("active-window");
  renderRunningApps();
}

function makeWindowDraggable(windowEl) {
  const topbar = windowEl.querySelector(".window-topbar");

  if (!topbar) return;

  let isDragging = false;
  let startX = 0;
  let startY = 0;
  let startLeft = 0;
  let startTop = 0;

  topbar.addEventListener("dblclick", event => {
    if (event.target.closest(".window-control")) return;
    toggleMaximizeWindow(windowEl.dataset.window);
  });

  topbar.addEventListener("mousedown", event => {
    if (window.innerWidth <= 768) return;
    if (state.maximizedWindows.has(windowEl.dataset.window)) return;
    if (event.target.closest(".window-control")) return;

    isDragging = true;
    startX = event.clientX;
    startY = event.clientY;
    startLeft = windowEl.offsetLeft;
    startTop = windowEl.offsetTop;

    focusWindow(windowEl.dataset.window);
  });

  document.addEventListener("mousemove", event => {
    if (!isDragging) return;

    const nextLeft = startLeft + event.clientX - startX;
    const nextTop = startTop + event.clientY - startY;

    windowEl.style.left = `${Math.max(10, nextLeft)}px`;
    windowEl.style.top = `${Math.max(10, nextTop)}px`;
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

function renderRunningApps() {
  const container = $("#runningApps");

  if (!container) return;

  container.innerHTML = "";

  state.openedWindows.forEach((windowEl, appId) => {
    const app = desktopApps.find(item => item.id === appId);
    const isMinimized = windowEl.style.display === "none";
    const isActive = windowEl.classList.contains("active-window") && !isMinimized;

    const button = document.createElement("button");
    button.className = `running-app ${isActive ? "active-running-app" : ""} ${isMinimized ? "minimized-running-app" : ""}`;
    button.dataset.restore = appId;
    button.textContent = app?.title || appId;

    container.appendChild(button);
  });
}

// ======================================================
// ===== AI WINDOW HELPERS ===============================
// ======================================================

function initializeAiAssistantSafely(attempt = 0) {
  const chatArea = document.querySelector("#aiChatArea");

  if (!chatArea) {
    if (attempt < 10) {
      setTimeout(() => initializeAiAssistantSafely(attempt + 1), 100);
      return;
    }

    console.warn("AI chat area was not found after opening the AI window.");
    return;
  }

  if (typeof window.initAiAssistant === "function") {
    window.initAiAssistant();
    console.log("AI Initialized");
    return;
  }

  if (attempt < 20) {
    setTimeout(() => initializeAiAssistantSafely(attempt + 1), 100);
    return;
  }

  console.warn("initAiAssistant is not available. Confirm ai.js is loaded correctly.");
}

function openSagarAiAssistant() {
  const existing = document.querySelector('[data-window="sagar-ai"]');

  if (existing) {
    existing.style.display = "block";
    state.minimizedWindows.delete("sagar-ai");

    if (state.openedWindows.has("sagar-ai")) {
      focusWindow("sagar-ai");
    }

    initializeAiAssistantSafely();
    return;
  }

  openWindow("sagar-ai", "🤖 Sagar AI Assistant", renderSagarAiWindow());
  initializeAiAssistantSafely();
}

// ======================================================
// ===== WINDOW CONTENT ROUTER ===========================
// ======================================================

function getWindowContent(appId) {
  const views = {
    about: renderAboutWindow,
    education: renderEducationWindow,
    projects: renderProjectsWindow,
    certificates: renderCertificatesWindow,
    skills: renderSkillsWindow,
    resume: renderResumeWindow,
    experience: renderExperienceWindow,
    achievements: renderAchievementsWindow,
    dashboard: renderDashboardWindow,
    contact: renderContactWindow,
    "ai-lab": renderAiLabWindow,
    "sagar-ai": renderSagarAiWindow,
    "admin-panel": renderAdminPanelWindow,
    settings: renderSettingsWindow
  };

  return views[appId] ? views[appId]() : `<p>Content not found.</p>`;
}

// ======================================================
// ===== WINDOW RENDER FUNCTIONS =========================
// ======================================================

function renderAboutWindow() {
  const p = portfolioData.profile;

  return `
    <div class="row g-4 align-items-center">
      <div class="col-md-4 text-center">
        <img class="profile-large" src="${p.profileImage}" alt="${p.name}" loading="lazy">
      </div>

      <div class="col-md-8">
        <h2>${p.name}</h2>
        <h5 class="text-info">${p.role}</h5>
        <p><strong>Location:</strong> ${p.location}</p>
        <p><strong>Experience:</strong> ${p.experience}</p>
        <p>${p.summary}</p>

        <div class="action-row mt-3">
          <a class="glass-btn" href="mailto:${p.email}">Email</a>
          <a class="glass-btn" href="tel:${p.phone}">Call</a>
          <a class="glass-btn" href="${portfolioData.socialLinks.linkedin}" target="_blank">LinkedIn</a>
          <a class="glass-btn" href="${portfolioData.socialLinks.github}" target="_blank">GitHub</a>
          <a class="glass-btn" href="${p.resume}" download>Download Resume</a>
        </div>
      </div>
    </div>
  `;
}

function renderEducationWindow() {
  return `
    <div class="timeline">
      ${portfolioData.education.map(item => `
        <div class="timeline-item">
          <div class="os-card">
            <h4>${item.title}</h4>
            <h5>${item.institution}</h5>
            <p class="text-info">${item.year}</p>
            <p>${item.description}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderSkillsWindow() {
  return `
    ${portfolioData.skills.map(group => `
      <div class="skill-category">
        <h3>${group.category}</h3>

        ${group.items.map(skill => `
          <div class="skill-row">
            <div class="skill-meta">
              <span>${skill.name}</span>
              <strong>${skill.level}%</strong>
            </div>

            <div class="skill-track">
              <div class="skill-fill" data-level="${skill.level}"></div>
            </div>
          </div>
        `).join("")}
      </div>
    `).join("")}
  `;
}

function renderProjectsWindow(filter = "All") {
  const categories = ["All", "SEO", "Marketing", "Development", "Automation"];

  const projects =
    filter === "All"
      ? portfolioData.projects
      : portfolioData.projects.filter(project => project.category === filter);

  return `
    <div class="project-filters">
      ${categories.map(category => `
        <button class="filter-btn ${category === filter ? "active" : ""}" data-project-filter="${category}">
          ${category}
        </button>
      `).join("")}
    </div>

    <div class="row g-3">
      ${projects.map(project => `
        <div class="col-md-6 col-xl-4">
          <div class="os-card">
            <img class="project-img" src="${project.image}" alt="${project.title}" loading="lazy">

            <h4 class="mt-3">${project.title}</h4>
            <p>${project.description}</p>

            <div>
              ${project.techStack.map(tag => `<span class="tag">${tag}</span>`).join("")}
            </div>

            <div class="action-row mt-3">
              <a class="glass-btn" href="${project.github}" target="_blank">GitHub</a>
              <a class="glass-btn" href="${project.live}" target="_blank">Live Demo</a>
              <button class="glass-btn" data-project-detail="${project.id}">Details</button>
            </div>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderProjectDetail(projectId) {
  const project = portfolioData.projects.find(item => item.id === projectId);

  if (!project) {
    return "<p>Project not found.</p>";
  }

  return `
    <div class="row g-4">
      <div class="col-lg-5">
        <img class="project-img" style="height:260px" src="${project.image}" alt="${project.title}" loading="lazy">
      </div>

      <div class="col-lg-7">
        <h2>${project.title}</h2>
        <p>${project.overview}</p>

        <div>
          ${project.techStack.map(tag => `<span class="tag">${tag}</span>`).join("")}
        </div>
      </div>

      <div class="col-md-6">
        <div class="os-card">
          <h4>Features</h4>
          <ul>
            ${project.features.map(feature => `<li>${feature}</li>`).join("")}
          </ul>
        </div>
      </div>

      <div class="col-md-6">
        <div class="os-card">
          <h4>Challenges</h4>
          <p>${project.challenges}</p>

          <h4>Results</h4>
          <p>${project.results}</p>
        </div>
      </div>
    </div>
  `;
}

function renderCertificatesWindow() {
  return `
    <div class="row g-3">
      ${portfolioData.certificates.map(cert => `
        <div class="col-md-6 col-xl-4">
          <div class="os-card">
            <img class="certificate-img" src="${cert.image}" alt="${cert.title}" loading="lazy" data-lightbox="${cert.image}">

            <h4 class="mt-3">${cert.title}</h4>
            <p>${cert.issuer}</p>
            <span class="tag">${cert.year}</span>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderResumeWindow() {
  return `
    <div class="mb-3">
      <a class="glass-btn" href="${portfolioData.profile.resume}" download>Download Resume</a>
    </div>

    <iframe class="resume-frame" src="${portfolioData.profile.resume}" title="Resume PDF"></iframe>
  `;
}

function renderExperienceWindow() {
  return `
    ${portfolioData.experience.map((exp, index) => `
      <div class="os-card mb-3">
        <h3>${exp.company}</h3>
        <h5 class="text-info">${exp.role} · ${exp.period}</h5>
      </div>

      <div class="accordion" id="experienceAccordion${index}">
        ${exp.sections.map((section, sectionIndex) => `
          <div class="accordion-item">
            <h2 class="accordion-header">
              <button
                class="accordion-button ${sectionIndex === 0 ? "" : "collapsed"}"
                type="button"
                data-bs-toggle="collapse"
                data-bs-target="#exp${index}${sectionIndex}"
              >
                ${section.title}
              </button>
            </h2>

            <div
              id="exp${index}${sectionIndex}"
              class="accordion-collapse collapse ${sectionIndex === 0 ? "show" : ""}"
              data-bs-parent="#experienceAccordion${index}"
            >
              <div class="accordion-body">
                <ul>
                  ${section.points.map(point => `<li>${point}</li>`).join("")}
                </ul>
              </div>
            </div>
          </div>
        `).join("")}
      </div>
    `).join("")}
  `;
}

function renderAchievementsWindow() {
  return `
    <div class="row g-3">
      ${portfolioData.achievements.map(item => `
        <div class="col-md-6 col-xl-3">
          <div class="os-card stat-card">
            <div class="stat-number achievement-counter" data-value="${item.value}" data-suffix="${item.suffix}">0</div>
            <p>${item.label}</p>
          </div>
        </div>
      `).join("")}
    </div>
  `;
}

function renderDashboardWindow() {
  const totalSkills = portfolioData.skills.reduce((sum, group) => sum + group.items.length, 0);

  const stats = [
    { label: "Total Projects", value: portfolioData.projects.length },
    { label: "Total Certificates", value: portfolioData.certificates.length },
    { label: "Total Skills", value: totalSkills },
    { label: "Experience", value: 6, suffix: "+ Months" }
  ];

  return `
    <div class="row g-3">
      ${stats.map(stat => `
        <div class="col-md-6 col-xl-3">
          <div class="os-card stat-card">
            <div class="stat-number achievement-counter" data-value="${stat.value}" data-suffix="${stat.suffix || ""}">0</div>
            <p>${stat.label}</p>
          </div>
        </div>
      `).join("")}

      <div class="col-12">
        <div class="os-card">
          <h3>Portfolio Overview</h3>
          <p>This dashboard summarizes Sagar's projects, certificates, skills, and digital marketing experience.</p>

          <div class="skill-track mt-3">
            <div class="skill-fill" data-level="86"></div>
          </div>

          <small>Overall portfolio completion</small>
        </div>
      </div>
    </div>
  `;
}

function renderContactWindow() {
  return `
    <form id="contactForm" class="contact-form">
      <div class="row g-3">
        <div class="col-md-6">
          <label class="form-label">Name</label>
          <input class="form-control" name="name" placeholder="Your name" required>
        </div>

        <div class="col-md-6">
          <label class="form-label">Email</label>
          <input class="form-control" name="email" type="email" placeholder="your@email.com" required>
        </div>

        <div class="col-12">
          <label class="form-label">Subject</label>
          <input class="form-control" name="subject" placeholder="Subject" required>
        </div>

        <div class="col-12">
          <label class="form-label">Message</label>
          <textarea class="form-control" name="message" rows="5" placeholder="Write your message..." required></textarea>
        </div>

        <div class="col-12">
          <button class="primary-btn" type="submit">Send Message</button>
        </div>
      </div>
    </form>
  `;
}

function renderAiLabWindow() {
  return `
    <div class="row g-3">
      <div class="col-md-6">
        <button class="os-card w-100 text-start ai-lab-card" data-open-ai-app="sagar-ai">
          <h3>🤖 Sagar AI</h3>
          <p>Ask questions about Sagar's profile, skills, projects, experience, resume, and certifications.</p>
        </button>
      </div>

      <div class="col-md-6">
        <div class="os-card">
          <h3>🎤 Voice Assistant</h3>
          <p>Coming in next phase.</p>
        </div>
      </div>

      <div class="col-md-6">
        <div class="os-card">
          <h3>📈 Digital Marketing Interview</h3>
          <p>Coming soon.</p>
        </div>
      </div>

      <div class="col-md-6">
        <div class="os-card">
          <h3>💻 Web Development Interview</h3>
          <p>Coming soon.</p>
        </div>
      </div>
    </div>
  `;
}

function renderSagarAiWindow() {
  return `
    <div class="ai-chat-app">
      <div class="ai-intro">
        <h3>🤖 Sagar AI Assistant</h3>
        <p>Hello! I'm Sagar AI.</p>
        <p>I can answer questions about:</p>

        <ul>
          <li>About Me</li>
          <li>Projects</li>
          <li>Skills</li>
          <li>Experience</li>
          <li>Certificates</li>
          <li>Resume</li>
        </ul>

        <div class="ai-suggestions">
          <button class="ai-suggestion" data-ai-prompt="Tell me about Sagar">Tell me about Sagar</button>
          <button class="ai-suggestion" data-ai-prompt="Show Skills">Show Skills</button>
          <button class="ai-suggestion" data-ai-prompt="Show Projects">Show Projects</button>
          <button class="ai-suggestion" data-ai-prompt="Explain FINORA">Explain FINORA</button>
          <button class="ai-suggestion" data-ai-prompt="SEO Experience">SEO Experience</button>
          <button class="ai-suggestion" data-ai-prompt="Download Resume">Download Resume</button>
        </div>
      </div>

      <div id="aiChatArea" class="ai-chat-area"></div>

      <div class="ai-input-row">
        <input id="aiChatInput" type="text" placeholder="Type your message here">
        <button id="aiSendBtn">Send</button>
      </div>

      <div class="ai-tool-row">
        <button id="aiVoiceBtn" class="ai-tool-btn">🎤 Voice Input</button>
        <button id="aiSpeakerBtn" class="ai-tool-btn">🔇 Speaker Off</button>
        <button id="aiStopSpeechBtn" class="ai-tool-btn">⏹ Stop</button>
      </div>
    </div>
  `;
}

function renderAdminPanelWindow() {
  return `
    <div class="os-card">
      <h3>🔒 Admin Access</h3>
      <p>Enter admin password to view recruiter logins, contact submissions, and AI chat records.</p>

      <input
        id="adminPasswordInput"
        class="form-control mb-3"
        type="password"
        placeholder="Admin password"
      >

      <button class="primary-btn" id="adminUnlockBtn">
        Unlock
      </button>

      <div id="adminDataArea" class="mt-4"></div>
    </div>
  `;
}

function renderSettingsWindow() {
  return `
    <div class="settings-group">
      <div class="os-card mb-3">
        <h3>Theme</h3>

        <div class="action-row">
          <button class="glass-btn" data-theme-choice="dark">Dark Theme</button>
          <button class="glass-btn" data-theme-choice="light">Light Theme</button>
        </div>
      </div>

      <div class="os-card mb-3">
        <h3>Background</h3>

        <div class="wallpaper-options">
          ${wallpapers.map((wallpaper, index) => `
            <img class="wallpaper-thumb" src="${wallpaper}" alt="Wallpaper ${index + 1}" loading="lazy" data-wallpaper="${wallpaper}">
          `).join("")}
        </div>

        <div class="mt-3">
          <label class="form-label">Upload Custom Wallpaper</label>
          <input id="customWallpaperInput" class="form-control" type="file" accept="image/*">
        </div>
      </div>
    </div>
  `;
}

// ======================================================
// ===== ADMIN PANEL LOGIC ===============================
// ======================================================

async function unlockAdminPanel() {
  const input = document.querySelector("#adminPasswordInput");
  const area = document.querySelector("#adminDataArea");

  if (!input || !area) return;

  if (input.value !== ADMIN_PASSWORD) {
    showToast("Incorrect admin password");
    input.classList.remove("shake");
    void input.offsetWidth;
    input.classList.add("shake");
    return;
  }

  area.innerHTML = "<p>Loading Firestore data...</p>";

  if (typeof window.getAdminFirestoreSummary !== "function") {
    area.innerHTML = `
      <div class="os-card">
        <p>Firebase admin reader not loaded.</p>
        <small>Please check firebase-ai-history.js script loading.</small>
      </div>
    `;
    return;
  }

  try {
    const data = await window.getAdminFirestoreSummary();

    area.innerHTML = `
      <h4>Firestore Summary</h4>

      <div class="row g-3 mb-3">
        <div class="col-md-4">
          <div class="os-card stat-card">
            <div class="stat-number">${data.logins.length}</div>
            <p>Total Logins</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="os-card stat-card">
            <div class="stat-number">${data.contacts.length}</div>
            <p>Contact Submissions</p>
          </div>
        </div>

        <div class="col-md-4">
          <div class="os-card stat-card">
            <div class="stat-number">${data.chats.length}</div>
            <p>AI Chats</p>
          </div>
        </div>
      </div>

      <hr>

      <h5>Recent Logins</h5>
      ${data.logins.slice(0, 10).map(item => `
        <div class="os-card mb-2">
          <strong>${item.recruiterName || "Unknown"}</strong><br>
          Admin: ${item.isAdmin ? "Yes" : "No"}
        </div>
      `).join("") || "<p>No login records found.</p>"}

      <h5 class="mt-4">Contact Details</h5>
      ${data.contacts.slice(0, 10).map(item => `
        <div class="os-card mb-2">
          <strong>${item.recruiterName || "Unknown"}</strong><br>
          Email: ${item.email || "Not available"}<br>
          Phone: ${item.phone || "Not available"}
        </div>
      `).join("") || "<p>No contact submissions found.</p>"}

      <h5 class="mt-4">Recent AI Chats</h5>
      ${data.chats.slice(0, 10).map(item => `
        <div class="os-card mb-2">
          <strong>${item.recruiterName || "Unknown"}</strong><br>
          <b>Question:</b> ${item.question || "Not available"}<br>
          <b>Answer:</b> ${String(item.answer || "Not available").slice(0, 180)}...
        </div>
      `).join("") || "<p>No AI chat records found.</p>"}
    `;
  } catch (error) {
    console.error(error);
    area.innerHTML = `
      <div class="os-card">
        <p>Unable to load admin data.</p>
        <small>Check Firestore rules and console errors.</small>
      </div>
    `;
  }
}

// ======================================================
// ===== RECRUITER CONTACT POPUP =========================
// ======================================================

function startRecruiterContactPopup() {
  const key = getContactKey();

  if (localStorage.getItem(key) === "true") return;

  contactPopupAttempts = 0;

  setTimeout(() => {
    showRecruiterContactPopup();
  }, 1200);

  contactPopupTimer = setInterval(() => {
    if (localStorage.getItem(key) === "true") {
      clearInterval(contactPopupTimer);
      contactPopupTimer = null;
      return;
    }

    contactPopupAttempts += 1;

    if (contactPopupAttempts >= 3) {
      clearInterval(contactPopupTimer);
      contactPopupTimer = null;
      shutdownPortfolioOS("Contact details required to continue.");
      return;
    }

    showRecruiterContactPopup();
  }, 10000);
}

function showRecruiterContactPopup() {
  if (document.querySelector("#recruiterContactModal")) return;

  const modal = document.createElement("div");
  modal.id = "recruiterContactModal";
  modal.className = "recruiter-contact-overlay";

  modal.innerHTML = `
    <div class="recruiter-contact-card">
      <button class="recruiter-contact-close" id="closeRecruiterContactModal">×</button>

      <div class="recruiter-contact-icon">👋</div>

      <h3>Before You Continue</h3>

      <p>
        Please share your contact details so Sagar can know who visited the portfolio.
      </p>

      <input
        id="recruiterEmailInput"
        class="recruiter-contact-input"
        type="email"
        placeholder="Enter your email ID"
      >

      <input
        id="recruiterPhoneInput"
        class="recruiter-contact-input"
        type="tel"
        placeholder="Enter your 10-digit mobile number"
        maxlength="10"
      >

      <button id="submitRecruiterContactBtn" class="recruiter-contact-submit">
        Submit Details
      </button>

      <small>
        This helps Sagar follow up professionally. Your details are stored securely.
      </small>
    </div>
  `;

  document.body.appendChild(modal);

  setTimeout(() => {
    document.querySelector("#recruiterEmailInput")?.focus();
  }, 100);
}

async function submitRecruiterContactDetails() {
  const emailInput = document.querySelector("#recruiterEmailInput");
  const phoneInput = document.querySelector("#recruiterPhoneInput");
  const modal = document.querySelector("#recruiterContactModal");

  if (!emailInput || !phoneInput || !modal) return;

  const email = emailInput.value.trim();
  const phone = phoneInput.value.trim();

  const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const phoneValid = /^[0-9]{10}$/.test(phone);

  if (!emailValid || !phoneValid) {
    showToast("Please enter valid email and 10-digit mobile number.");
    return;
  }

  const recruiterName = getRecruiterName();
  const key = getContactKey();

  if (typeof window.saveContactSubmission === "function") {
    await window.saveContactSubmission({
      recruiterName,
      email,
      phone
    });
  } else {
    console.warn("saveContactSubmission is not available.");
  }

  localStorage.setItem(key, "true");

  if (contactPopupTimer) {
    clearInterval(contactPopupTimer);
    contactPopupTimer = null;
  }

  modal.remove();

  showToast("Thank you. Contact details submitted.");
}

// ======================================================
// ===== AFTER WINDOW OPEN ===============================
// ======================================================

function runWindowAfterOpen(appId) {
  if (appId === "skills" || appId === "dashboard") {
    setTimeout(animateSkillBars, 100);
  }

  if (appId === "achievements" || appId === "dashboard") {
    setTimeout(animateCounters, 100);
  }

  if (appId === "sagar-ai") {
    initializeAiAssistantSafely();
  }
}

// ======================================================
// ===== ANIMATIONS / HELPERS ============================
// ======================================================

function animateSkillBars() {
  $all(".skill-fill").forEach(bar => {
    bar.style.width = `${bar.dataset.level}%`;
  });
}

function animateCounters() {
  $all(".achievement-counter").forEach(counter => {
    const target = Number(counter.dataset.value);
    const suffix = counter.dataset.suffix || "";

    let current = 0;
    const step = Math.max(1, Math.ceil(target / 40));

    const timer = setInterval(() => {
      current += step;

      if (current >= target) {
        current = target;
        clearInterval(timer);
      }

      counter.textContent = `${current}${suffix}`;
    }, 25);
  });
}

function searchPortfolio(query) {
  const cleanQuery = query.toLowerCase().trim();
  const container = $("#startSearchResults");

  container.innerHTML = "";

  if (!cleanQuery) return;

  const searchItems = [
    ...portfolioData.projects.map(project => ({
      type: "Project",
      title: project.title,
      app: "projects"
    })),
    ...portfolioData.certificates.map(cert => ({
      type: "Certificate",
      title: cert.title,
      app: "certificates"
    })),
    ...portfolioData.experience.map(exp => ({
      type: "Experience",
      title: exp.role,
      app: "experience"
    })),
    ...portfolioData.skills.flatMap(group =>
      group.items.map(skill => ({
        type: "Skill",
        title: skill.name,
        app: "skills"
      }))
    )
  ];

  const results = searchItems.filter(item =>
    item.title.toLowerCase().includes(cleanQuery)
  );

  container.innerHTML = results.length
    ? results.map(item => `
      <div class="search-result" data-app="${item.app}">
        ${item.type}: ${item.title}
      </div>
    `).join("")
    : `<div class="search-result">No result found</div>`;
}

function renderSocialDock() {
  const links = [
    { icon: "in", url: portfolioData.socialLinks.linkedin, label: "LinkedIn" },
    { icon: "GH", url: portfolioData.socialLinks.github, label: "GitHub" },
    { icon: "IG", url: portfolioData.socialLinks.instagram, label: "Instagram" },
    { icon: "WA", url: portfolioData.socialLinks.whatsapp, label: "WhatsApp" },
    { icon: "✉", url: portfolioData.socialLinks.email, label: "Email" }
  ];

  $("#socialDock").innerHTML = links.map(link => `
    <a href="${link.url}" target="_blank" aria-label="${link.label}">${link.icon}</a>
  `).join("");
}

function renderNotes() {
  const notes = getStorage("notes", []);
  const container = $("#notesList");

  container.innerHTML = notes.map((note, index) => `
    <div class="note-item">
      <textarea data-note-index="${index}">${note}</textarea>

      <div class="note-actions">
        <button data-delete-note="${index}">Delete</button>
      </div>
    </div>
  `).join("");
}

function addNote() {
  const notes = getStorage("notes", []);
  notes.push("New note...");
  saveStorage("notes", notes);
  renderNotes();
}

function updateNote(index, value) {
  const notes = getStorage("notes", []);
  notes[index] = value;
  saveStorage("notes", notes);
}

function deleteNote(index) {
  const notes = getStorage("notes", []);
  notes.splice(index, 1);
  saveStorage("notes", notes);
  renderNotes();
}

function renderCalendar() {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth();
  const today = now.getDate();

  $("#calendarMonth").textContent = now.toLocaleDateString([], {
    month: "long",
    year: "numeric"
  });

  const firstDay = new Date(year, month, 1).getDay();
  const totalDays = new Date(year, month + 1, 0).getDate();

  let html = ["S", "M", "T", "W", "T", "F", "S"]
    .map(day => `<div class="calendar-day"><strong>${day}</strong></div>`)
    .join("");

  for (let i = 0; i < firstDay; i++) {
    html += `<div></div>`;
  }

  for (let day = 1; day <= totalDays; day++) {
    html += `<div class="calendar-day ${day === today ? "today" : ""}">${day}</div>`;
  }

  $("#calendarGrid").innerHTML = html;
}

function updateVisitorCounter() {
  const todayKey = new Date().toISOString().slice(0, 10);
  const totalVisits = getStorage("totalVisits", 0) + 1;
  const visitData = getStorage("visitData", { date: todayKey, count: 0 });
  const todayVisits = visitData.date === todayKey ? visitData.count + 1 : 1;

  saveStorage("totalVisits", totalVisits);
  saveStorage("visitData", { date: todayKey, count: todayVisits });

  $("#totalVisits").textContent = totalVisits;
  $("#todayVisits").textContent = todayVisits;
}

function loadSavedPreferences() {
  const theme = getStorage("theme", "dark");
  const wallpaper = getStorage("wallpaper", wallpapers[0]);

  document.documentElement.dataset.theme = theme;
  setWallpaper(wallpaper);
  updateThemeButton(theme);
}

function toggleTheme() {
  const currentTheme = document.documentElement.dataset.theme;
  const nextTheme = currentTheme === "dark" ? "light" : "dark";

  document.documentElement.dataset.theme = nextTheme;
  saveStorage("theme", nextTheme);
  updateThemeButton(nextTheme);

  showToast(`${nextTheme} theme enabled`);
}

function updateThemeButton(theme) {
  $("#quickThemeBtn").textContent = theme === "dark" ? "🌙" : "☀️";
}

function setWallpaper(path) {
  state.currentWallpaper = path;

  $("#desktop").style.backgroundImage =
    `linear-gradient(rgba(2,6,23,0.32), rgba(2,6,23,0.65)), url("${path}")`;

  saveStorage("wallpaper", path);
}

function showToast(message) {
  const toast = document.createElement("div");
  toast.className = "toast-os";
  toast.textContent = message;

  $("#toastContainer").appendChild(toast);

  setTimeout(() => {
    toast.remove();
  }, 3200);
}

function playNotification() {
  if (state.muted) return;

  const sound = $("#notificationSound");

  if (!sound) return;

  sound.currentTime = 0;
  sound.play().catch(() => {});
}

function toggleSound() {
  state.muted = !state.muted;
  $("#soundToggleBtn").textContent = state.muted ? "🔇" : "🔊";
  showToast(state.muted ? "Sound muted" : "Sound enabled");
}

function openLightbox(imagePath) {
  $("#lightboxImage").src = imagePath;
  $("#lightbox").classList.remove("hidden");
}

function closeLightbox() {
  $("#lightbox").classList.add("hidden");
  $("#lightboxImage").src = "";
}

function showContextMenu(event) {
  event.preventDefault();

  const menu = $("#contextMenu");
  menu.style.display = "block";
  menu.style.left = `${event.clientX}px`;
  menu.style.top = `${event.clientY}px`;
}

function hideContextMenu() {
  $("#contextMenu").style.display = "none";
}

async function handleContactForm(form) {
  const formData = new FormData(form);

  const name = formData.get("name").trim();
  const email = formData.get("email").trim();
  const subject = formData.get("subject").trim();
  const message = formData.get("message").trim();

  if (!name || !email || !subject || !message) {
    showToast("Please fill all fields");
    return;
  }

  if (typeof window.saveContactSubmission === "function") {
    await window.saveContactSubmission({
      recruiterName: name,
      email,
      phone: "Submitted via contact form",
      subject,
      message
    });
  }

  showToast("Message submitted successfully");
  playNotification();
  form.reset();
}

// ======================================================
// ===== GLOBAL EVENTS ==================================
// ======================================================

function bindGlobalEvents() {
  const lockScreen = $("#lockScreen");

  function isLockScreenVisible() {
    return lockScreen && !lockScreen.classList.contains("hidden");
  }

  if (lockScreen) {
    lockScreen.addEventListener("dblclick", openLoginScreen);

    window.addEventListener(
      "wheel",
      event => {
        if (!isLockScreenVisible()) return;

        event.preventDefault();

        if (wheelUnlockStarted) return;

        if (Math.abs(event.deltaY) > 10) {
          wheelUnlockStarted = true;
          openLoginScreen();
        }
      },
      { passive: false }
    );

    lockScreen.addEventListener("touchstart", event => {
      touchStartY = event.touches[0].clientY;
    });

    lockScreen.addEventListener("touchmove", event => {
      if (!isLockScreenVisible()) return;

      const currentY = event.touches[0].clientY;
      const swipeDistance = touchStartY - currentY;

      if (swipeDistance > 40 && !wheelUnlockStarted) {
        wheelUnlockStarted = true;
        openLoginScreen();
      }
    });

    lockScreen.addEventListener("click", event => {
      if (event.detail === 2) {
        openLoginScreen();
      }
    });
  }

  $("#loginBtn")?.addEventListener("click", validateLogin);

  $("#passwordInput")?.addEventListener("keydown", event => {
    if (event.key === "Enter") {
      validateLogin();
    }
  });

  $("#hintBtn")?.addEventListener("click", () => {
    $("#hintText")?.classList.remove("hidden");
  });

  $("#startBtn")?.addEventListener("click", () => {
    $("#startMenu")?.classList.toggle("show");
  });

  $("#taskSearchBtn")?.addEventListener("click", () => {
    $("#startMenu")?.classList.add("show");
    $("#startSearch")?.focus();
  });

  const aiButton = document.getElementById("floatingAiBtn");

  if (aiButton) {
    aiButton.addEventListener("click", openSagarAiAssistant);
  }

  $("#quickThemeBtn")?.addEventListener("click", toggleTheme);
  $("#soundToggleBtn")?.addEventListener("click", toggleSound);

  $("#shutdownBtn")?.addEventListener("click", () => {
    shutdownPortfolioOS("Portfolio OS shutting down...");
  });

  $("#addNoteBtn")?.addEventListener("click", addNote);
  $("#closeLightbox")?.addEventListener("click", closeLightbox);

  document.addEventListener("contextmenu", showContextMenu);

  document.addEventListener("click", event => {
    if (event.target.id === "submitRecruiterContactBtn") {
      submitRecruiterContactDetails();
      return;
    }

    if (!event.target.closest("#contextMenu")) {
      hideContextMenu();
    }

    if (!event.target.closest("#startMenu") && !event.target.closest("#startBtn")) {
      $("#startMenu")?.classList.remove("show");
    }
  });

  $("#refreshDesktopBtn")?.addEventListener("click", () => {
    showToast("Desktop refreshed");
  });

  $("#personalizeBtn")?.addEventListener("click", () => {
    openWindow("settings");
  });

  $("#startSearch")?.addEventListener("input", event => {
    searchPortfolio(event.target.value);
  });

  $("#desktopIcons")?.addEventListener("click", event => {
    const icon = event.target.closest(".desktop-icon");

    if (!icon) return;

    $all(".desktop-icon").forEach(item => item.classList.remove("selected"));
    icon.classList.add("selected");
  });

  $("#desktopIcons")?.addEventListener("dblclick", event => {
    const icon = event.target.closest(".desktop-icon");

    if (!icon) return;

    openWindow(icon.dataset.app);
  });

  $("#startApps")?.addEventListener("click", event => {
    const app = event.target.closest("[data-app]");

    if (!app) return;

    openWindow(app.dataset.app);
    $("#startMenu")?.classList.remove("show");
  });

  $("#startSearchResults")?.addEventListener("click", event => {
    const result = event.target.closest("[data-app]");

    if (!result) return;

    openWindow(result.dataset.app);
    $("#startMenu")?.classList.remove("show");
  });

  $("#runningApps")?.addEventListener("click", event => {
    const button = event.target.closest("[data-restore]");

    if (!button) return;

    toggleWindowFromTaskbar(button.dataset.restore);
  });

  $("#windowsLayer")?.addEventListener("mousedown", event => {
    const windowEl = event.target.closest(".os-window");

    if (windowEl) {
      focusWindow(windowEl.dataset.window);
    }
  });

  $("#windowsLayer")?.addEventListener("click", event => {
    const closeBtn = event.target.closest("[data-close]");
    const minimizeBtn = event.target.closest("[data-minimize]");
    const maximizeBtn = event.target.closest("[data-maximize]");
    const projectFilter = event.target.closest("[data-project-filter]");
    const projectDetail = event.target.closest("[data-project-detail]");
    const lightboxImg = event.target.closest("[data-lightbox]");
    const themeChoice = event.target.closest("[data-theme-choice]");
    const wallpaperChoice = event.target.closest("[data-wallpaper]");
    const aiApp = event.target.closest("[data-open-ai-app]");
    const adminUnlockBtn = event.target.closest("#adminUnlockBtn");

    if (closeBtn) {
      closeWindow(closeBtn.dataset.close);
      return;
    }

    if (minimizeBtn) {
      minimizeWindow(minimizeBtn.dataset.minimize);
      return;
    }

    if (maximizeBtn) {
      toggleMaximizeWindow(maximizeBtn.dataset.maximize);
      return;
    }

    if (adminUnlockBtn) {
      unlockAdminPanel();
      return;
    }

    if (projectFilter) {
      const projectWindow = state.openedWindows.get("projects");

      if (projectWindow) {
        projectWindow.querySelector(".window-content").innerHTML =
          renderProjectsWindow(projectFilter.dataset.projectFilter);
      }
    }

    if (projectDetail) {
      const project = portfolioData.projects.find(
        item => item.id === projectDetail.dataset.projectDetail
      );

      if (project) {
        openWindow(`project-${project.id}`, project.title, renderProjectDetail(project.id));
      }
    }

    if (lightboxImg) openLightbox(lightboxImg.dataset.lightbox);

    if (themeChoice) {
      const selectedTheme = themeChoice.dataset.themeChoice;
      document.documentElement.dataset.theme = selectedTheme;
      saveStorage("theme", selectedTheme);
      updateThemeButton(selectedTheme);
      showToast(`${selectedTheme} theme enabled`);
    }

    if (wallpaperChoice) {
      setWallpaper(wallpaperChoice.dataset.wallpaper);
      showToast("Wallpaper updated");
    }

    if (aiApp) {
      openSagarAiAssistant();
    }
  });

  $("#windowsLayer")?.addEventListener("submit", event => {
    if (event.target.id === "contactForm") {
      event.preventDefault();
      handleContactForm(event.target);
    }
  });

  $("#windowsLayer")?.addEventListener("change", event => {
    if (event.target.id === "customWallpaperInput") {
      const file = event.target.files[0];

      if (!file) return;

      const reader = new FileReader();

      reader.onload = () => {
        setWallpaper(reader.result);
        showToast("Custom wallpaper applied");
      };

      reader.readAsDataURL(file);
    }
  });

  $("#notesList")?.addEventListener("input", event => {
    const textarea = event.target.closest("[data-note-index]");

    if (!textarea) return;

    updateNote(Number(textarea.dataset.noteIndex), textarea.value);
  });

  $("#notesList")?.addEventListener("click", event => {
    const deleteBtn = event.target.closest("[data-delete-note]");

    if (!deleteBtn) return;

    deleteNote(Number(deleteBtn.dataset.deleteNote));
  });
}