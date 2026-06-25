"use strict";

console.log("AI.JS LOADED");

// ======================================================
// ===== INTERVIEW VOICE MODE ARCHITECTURE ===============
// ======================================================

window.isInterviewMode = false;
window.currentInterviewType = null;

function stopAllSpeech() {
  if ("speechSynthesis" in window) {
    window.speechSynthesis.cancel();
  }
}

window.stopAllSpeech = stopAllSpeech;

// ======================================================
// ===== PORTFOLIO KNOWLEDGE BASE ========================
// ======================================================

const portfolioKnowledgeBase = {
  profile: {
    name: "Sagar K",
    role: "Digital Marketing Executive",
    experience: "6+ Months",
    location: "Bengaluru",
    careerGoal: "AI-Powered Digital Marketing Executive",
    summary:
      "Sagar K is a Digital Marketing Executive specializing in SEO, Meta Ads, Google Ads, analytics, website optimization, content creation, and AI-powered digital marketing workflows.",
    email: "sagar@example.com",
    phone: "+91 98765 43210",
    resume: "assets/resume/resume.pdf"
  },

  skills: {
    digitalMarketing: [
      "SEO",
      "Local SEO",
      "Technical SEO",
      "On-page SEO",
      "Keyword Research",
      "Meta Ads",
      "Google Ads",
      "Content Marketing",
      "Social Media Marketing"
    ],

    webDevelopment: [
      "HTML",
      "CSS",
      "JavaScript",
      "Bootstrap",
      "WordPress",
      "OpenCart"
    ],

    tools: [
      "Google Search Console",
      "Google Analytics",
      "Ahrefs",
      "Rank Math",
      "Canva",
      "Firebase",
      "GitHub"
    ]
  },

  projects: [
    {
      title: "FINORA",
      description:
        "FINORA is a personal finance management web application that helps users track income, expenses, budgets, financial summaries, and reports.",
      features: [
        "Expense Tracking",
        "Budget Management",
        "Financial Reports",
        "Dashboard Analytics",
        "User Friendly Interface"
      ]
    },
    {
      title: "SEO Generator",
      description:
        "SEO Generator is a tool for generating SEO titles, meta descriptions, keyword ideas, and content suggestions."
    },
    {
      title: "Abra Zylo",
      description:
        "Abra Zylo is a business website project focused on branding, lead generation, modern web design, and SEO-friendly structure."
    },
    {
      title: "Abra Logistics",
      description:
        "Abra Logistics is a logistics-focused digital marketing and website optimization project."
    },
    {
      title: "Abra Travels",
      description:
        "Abra Travels is a travel and tourism website project."
    },
    {
      title: "Abra Design & Build",
      description:
        "Abra Design & Build is a design and construction-focused business website project."
    }
  ],

  experience: [
    {
      company: "ABRA Group",
      role: "Digital Marketing Executive",
      period: "6+ Months",
      responsibilities: [
        "SEO",
        "Meta Ads",
        "Google Ads",
        "Website Management",
        "Content Creation",
        "Technical SEO"
      ]
    }
  ],

  certifications: [
    "SEO Certification",
    "Google Ads Certification",
    "Google Analytics Certification",
    "Web Development Certification"
  ],

  contact: {
    email: "sagar@example.com",
    phone: "+91 98765 43210",
    linkedin: "https://linkedin.com",
    github: "https://github.com"
  }
};

// ======================================================
// ===== AI CONFIGURATION ================================
// ======================================================

const aiConfig = {
  groqEndpoint: "https://api.groq.com/openai/v1/chat/completions",
  model: "llama-3.1-8b-instant",
  retryCount: 1,

  // Normal Sagar AI must be text-only.
  // Voice output is allowed only when window.isInterviewMode === true.
  speakerEnabled: false,

  recognition: null,
  isListening: false,
  isGenerating: false,
  typingSpeedMin: 15,
  typingSpeedMax: 25
};

// ======================================================
// ===== INITIALIZE AI ASSISTANT =========================
// ======================================================

function initAiAssistant() {
  const chatArea = document.querySelector("#aiChatArea");
  const input = document.querySelector("#aiChatInput");
  const sendBtn = document.querySelector("#aiSendBtn");
  const voiceBtn = document.querySelector("#aiVoiceBtn");
  const speakerBtn = document.querySelector("#aiSpeakerBtn");
  const stopSpeechBtn = document.querySelector("#aiStopSpeechBtn");

  if (!chatArea || !input || !sendBtn) return;

  if (!chatArea.dataset.ready) {
    appendAiMessage(
      "assistant",
      "Hello! I'm Sagar AI. Ask me about Sagar's skills, projects, experience, resume, certifications, contact details, FINORA, or SEO experience."
    );

    chatArea.dataset.ready = "true";
  }

  sendBtn.onclick = sendAiMessage;

  input.onkeydown = event => {
    if (event.key === "Enter" && !input.disabled && !aiConfig.isGenerating) {
      sendAiMessage();
    }
  };

  document.querySelectorAll("[data-ai-prompt]").forEach(button => {
    button.onclick = () => {
      if (aiConfig.isGenerating) return;

      input.value = button.dataset.aiPrompt;
      sendAiMessage();
    };
  });

  if (voiceBtn) {
    voiceBtn.onclick = () => {
      if (!aiConfig.isGenerating) {
        toggleVoiceInput();
      }
    };
  }

  if (speakerBtn) {
    speakerBtn.textContent = aiConfig.speakerEnabled
      ? "🔊 Speaker On"
      : "🔇 Speaker Off";

    speakerBtn.onclick = () => {
      aiConfig.speakerEnabled = !aiConfig.speakerEnabled;

      speakerBtn.textContent = aiConfig.speakerEnabled
        ? "🔊 Speaker On"
        : "🔇 Speaker Off";

      if (!window.isInterviewMode && aiConfig.speakerEnabled) {
        appendAiMessage(
          "assistant",
          "Voice output is available only in Online Interview mode. Normal Sagar AI is text-only."
        );

        aiConfig.speakerEnabled = false;
        speakerBtn.textContent = "🔇 Speaker Off";
      }
    };
  }

  if (stopSpeechBtn) {
    stopSpeechBtn.onclick = stopAllSpeech;
  }
}

// ======================================================
// ===== CHAT HANDLING ==================================
// ======================================================

async function sendAiMessage() {
  const input = document.querySelector("#aiChatInput");
  const message = input.value.trim();

  if (!message || aiConfig.isGenerating) return;

  appendAiMessage("user", message);
  input.value = "";

  disableAiControls(true);
  showThinkingIndicator();

  try {
    await simulateThinkingDelay();

    const answer = await getAiAnswer(message);

    removeThinkingIndicator();

    const finalText = await typeAiMessage(answer);
    if (typeof window.saveAiChatHistory === "function") {
  window.saveAiChatHistory({
    question: message,
    answer: finalText,
    source: "Sagar AI"
  });
}

    if (window.isInterviewMode && aiConfig.speakerEnabled) {
      speakAiResponse(finalText);
    }
  } catch (error) {
    console.error(error);

    removeThinkingIndicator();

    await typeAiMessage(
      "Sorry, I could not process that right now. Please try again."
    );
  } finally {
    disableAiControls(false);
  }
}

function appendAiMessage(role, text) {
  const chatArea = document.querySelector("#aiChatArea");
  if (!chatArea) return;

  const message = document.createElement("div");
  message.className = `ai-message ${role} ai-message-enter`;
  message.innerHTML = formatAiText(text);

  chatArea.appendChild(message);
  scrollAiChatToBottom();
}

function showThinkingIndicator() {
  const chatArea = document.querySelector("#aiChatArea");
  if (!chatArea) return;

  removeThinkingIndicator();

  const bubble = document.createElement("div");

  bubble.id = "aiThinkingIndicator";
  bubble.className = "ai-message assistant ai-thinking ai-message-enter";
  bubble.innerHTML = `<span>🤖 Sagar AI is thinking</span><span class="thinking-dots">.</span>`;

  chatArea.appendChild(bubble);
  scrollAiChatToBottom();

  let dots = 1;

  const intervalId = setInterval(() => {
    const dotElement = bubble.querySelector(".thinking-dots");
    if (!dotElement) return;

    dots += 1;

    if (dots > 3) {
      dots = 1;
    }

    dotElement.textContent = ".".repeat(dots);
  }, 500);

  bubble.dataset.intervalId = String(intervalId);
}

function removeThinkingIndicator() {
  const bubble = document.querySelector("#aiThinkingIndicator");

  if (!bubble) return;

  const intervalId = Number(bubble.dataset.intervalId);

  if (intervalId) {
    clearInterval(intervalId);
  }

  bubble.remove();
}

async function simulateThinkingDelay() {
  const delay = Math.floor(Math.random() * 1000) + 1000;

  return new Promise(resolve => {
    setTimeout(resolve, delay);
  });
}

async function typeAiMessage(text) {
  const chatArea = document.querySelector("#aiChatArea");

  if (!chatArea) return text;

  const bubble = document.createElement("div");

  bubble.className = "ai-message assistant ai-message-enter";

  chatArea.appendChild(bubble);

  let currentText = "";

  for (let i = 0; i < text.length; i++) {
    currentText += text[i];

    bubble.innerHTML =
      formatAiText(currentText) + `<span class="typing-cursor">|</span>`;

    scrollAiChatToBottom();

    await new Promise(resolve => {
      setTimeout(resolve, getRandomTypingSpeed());
    });
  }

  bubble.innerHTML = formatAiText(text);
  scrollAiChatToBottom();

  return text;
}

function getRandomTypingSpeed() {
  return (
    Math.floor(
      Math.random() *
        (aiConfig.typingSpeedMax - aiConfig.typingSpeedMin + 1)
    ) + aiConfig.typingSpeedMin
  );
}

function disableAiControls(disabled) {
  const input = document.querySelector("#aiChatInput");
  const sendBtn = document.querySelector("#aiSendBtn");
  const voiceBtn = document.querySelector("#aiVoiceBtn");

  aiConfig.isGenerating = disabled;

  if (input) input.disabled = disabled;

  if (sendBtn) {
    sendBtn.disabled = disabled;
    sendBtn.textContent = disabled ? "Thinking..." : "Send";
  }

  if (voiceBtn) {
    voiceBtn.disabled = disabled;
  }
}

function scrollAiChatToBottom() {
  const chatArea = document.querySelector("#aiChatArea");

  if (!chatArea) return;

  chatArea.scrollTop = chatArea.scrollHeight;
}

function formatAiText(text) {
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\n/g, "<br>")
    .replace(/•/g, "&bull;");
}

// ======================================================
// ===== INTENT DETECTION ================================
// ======================================================

function normalizeQuestion(question) {
  return String(question)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s&]/g, "")
    .replace(/\s+/g, " ");
}

function matchesIntent(question, keywords) {
  return keywords.some(keyword => {
    const normalizedKeyword = normalizeQuestion(keyword);

    return question === normalizedKeyword || question.includes(normalizedKeyword);
  });
}

function formatList(items) {
  if (!items || !items.length) return "• Not available";

  return `• ${items.join("\n• ")}`;
}

function getProjectByTitle(title) {
  return portfolioKnowledgeBase.projects.find(project =>
    project.title.toLowerCase().includes(title.toLowerCase())
  );
}

// ======================================================
// ===== ANSWER ENGINE ==================================
// ======================================================

async function getAiAnswer(question) {
  const apiKey = getGroqApiKey();

  if (apiKey) {
    const groqAnswer = await askGroq(question, apiKey);

    if (groqAnswer && !groqAnswer.includes("I didn't understand that")) {
      return groqAnswer;
    }
  }

  return getLocalKnowledgeAnswer(question);
}

function getLocalKnowledgeAnswer(question) {
  const q = normalizeQuestion(question);
  const kb = portfolioKnowledgeBase;

  const intents = {
    skills: [
      "skills",
      "skill",
      "show skills",
      "my skills",
      "technical skills",
      "marketing skills",
      "what skills",
      "what skills do you have",
      "what skills does sagar have",
      "tools",
      "software",
      "technologies"
    ],

    projects: [
      "projects",
      "project",
      "show projects",
      "portfolio projects",
      "completed projects",
      "work samples",
      "portfolio work"
    ],

    experience: [
      "experience",
      "work experience",
      "professional experience",
      "job experience",
      "company",
      "current role",
      "responsibilities"
    ],

    about: [
      "about",
      "about me",
      "who is sagar",
      "tell me about sagar",
      "introduce yourself",
      "profile",
      "introduction",
      "career goal"
    ],

    resume: [
      "resume",
      "cv",
      "download resume",
      "show resume"
    ],

    certifications: [
      "certifications",
      "certification",
      "certificates",
      "certificate",
      "show certificates"
    ],

    contact: [
      "contact",
      "contact information",
      "email",
      "phone",
      "hire",
      "reach",
      "linkedin",
      "github",
      "reach sagar",
      "how can i hire sagar"
    ],

    finora: [
      "finora",
      "tell me about finora",
      "explain finora"
    ],

    abraZylo: [
      "abra zylo",
      "what is abra zylo",
      "tell me about abra zylo"
    ],

    abraLogistics: [
      "abra logistics",
      "what is abra logistics",
      "tell me about abra logistics"
    ],

    seoExperience: [
      "seo",
      "seo experience",
      "seo work",
      "seo skills",
      "seo knowledge",
      "technical seo",
      "local seo",
      "search engine optimization"
    ]
  };

  if (matchesIntent(q, intents.skills)) {
    return `
Sagar's Skills:

Digital Marketing:
${formatList(kb.skills.digitalMarketing)}

Web Development:
${formatList(kb.skills.webDevelopment)}

Tools:
${formatList(kb.skills.tools)}
`;
  }

  if (matchesIntent(q, intents.projects)) {
    return `
Sagar's Portfolio Projects:

${formatList(kb.projects.map(project => project.title))}
`;
  }

  if (matchesIntent(q, intents.experience)) {
    const experience = kb.experience[0];

    return `
Professional Experience:

Company:
${experience.company}

Role:
${experience.role}

Period:
${experience.period}

Responsibilities:
${formatList(experience.responsibilities)}
`;
  }

  if (matchesIntent(q, intents.about)) {
    return `
About Sagar:

Name:
${kb.profile.name}

Role:
${kb.profile.role}

Experience:
${kb.profile.experience}

Location:
${kb.profile.location}

Career Goal:
${kb.profile.careerGoal}

Summary:
${kb.profile.summary}
`;
  }

  if (matchesIntent(q, intents.contact)) {
    return `
Contact Information:

Email:
${kb.contact.email}

Phone:
${kb.contact.phone}

LinkedIn:
${kb.contact.linkedin}

GitHub:
${kb.contact.github}
`;
  }

  if (matchesIntent(q, intents.resume)) {
    return `
Resume:

Sagar's resume is available in the Resume window.

Resume Path:
${kb.profile.resume}
`;
  }

  if (matchesIntent(q, intents.certifications)) {
    return `
Sagar's Certifications:

${formatList(kb.certifications)}
`;
  }

  if (matchesIntent(q, intents.finora)) {
    const project = getProjectByTitle("FINORA");

    return `
FINORA:

${project.description}

Features:
${formatList(project.features)}
`;
  }

  if (matchesIntent(q, intents.abraZylo)) {
    const project = getProjectByTitle("Abra Zylo");

    return `
Abra Zylo:

${project.description}
`;
  }

  if (matchesIntent(q, intents.abraLogistics)) {
    const project = getProjectByTitle("Abra Logistics");

    return `
Abra Logistics:

${project.description}
`;
  }

  if (matchesIntent(q, intents.seoExperience)) {
    return `
Sagar's SEO Experience:

• SEO
• Local SEO
• Technical SEO
• On-page SEO
• Keyword Research
• Google Search Console Monitoring
• Content Optimization
• Website SEO Improvements
• Service Page Optimization
• Analytics Tracking

Sagar applies SEO experience in ABRA Group projects and website optimization work.
`;
  }

  return getFallbackMessage();
}

function getFallbackMessage() {
  return `
I didn't understand that.

Try asking about:

• Skills
• Projects
• Experience
• About Me
• Resume
• Certifications
• Contact Information
• FINORA
• SEO Experience
`;
}

// ======================================================
// ===== GROQ API =======================================
// ======================================================

function getGroqApiKey() {
  return window.GROQ_API_KEY || localStorage.getItem("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") || "";
}

async function askGroq(question, apiKey) {
  const recruiterName =
    localStorage.getItem("portfolioOS_recruiterName") || "Recruiter";

  const systemPrompt = `
You are Sagar AI Assistant inside Sagar's Portfolio OS.

Your job:
Answer recruiter questions about Sagar K professionally, naturally, and confidently.

IMPORTANT RULES:
1. Use ONLY the portfolio knowledge base below.
2. Do NOT invent facts, companies, education, salary, links, or experience.
3. If the recruiter asks the same question again, rewrite the answer differently while keeping the same meaning.
4. Keep answers recruiter-friendly and concise.
5. Do not sound robotic.
6. Do not say "according to the knowledge base".
7. If the question is unrelated to Sagar, politely suggest asking about skills, projects, experience, resume, certifications, contact information, FINORA, or SEO experience.
8. If asked "Tell me about Sagar", give a natural professional summary, not a fixed repeated template.
9. Address the recruiter naturally when useful. Recruiter name: ${recruiterName}

Portfolio Knowledge Base:
${JSON.stringify(portfolioKnowledgeBase, null, 2)}
`;

  const userPrompt = `
Recruiter question:
${question}

Create a fresh, natural answer. Keep the facts correct.
`;

  for (let attempt = 0; attempt <= aiConfig.retryCount; attempt++) {
    try {
      const response = await fetch(aiConfig.groqEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`
        },
        body: JSON.stringify({
          model: aiConfig.model,
          messages: [
            {
              role: "system",
              content: systemPrompt
            },
            {
              role: "user",
              content: userPrompt
            }
          ],
          temperature: 0.75,
          top_p: 0.9,
          max_tokens: 350
        })
      });

      if (!response.ok) {
        throw new Error("Groq request failed");
      }

      const data = await response.json();

      return (
        data.choices?.[0]?.message?.content?.trim() ||
        getLocalKnowledgeAnswer(question)
      );
    } catch (error) {
      console.warn("Groq error:", error);

      if (attempt === aiConfig.retryCount) {
        return getLocalKnowledgeAnswer(question);
      }
    }
  }

  return getLocalKnowledgeAnswer(question);
}

// ======================================================
// ===== VOICE INPUT ====================================
// ======================================================

function toggleVoiceInput() {
  const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

  if (!SpeechRecognition) {
    appendAiMessage(
      "assistant",
      "Voice recognition is not supported in this browser."
    );
    return;
  }

  const voiceBtn = document.querySelector("#aiVoiceBtn");
  const input = document.querySelector("#aiChatInput");

  if (!aiConfig.recognition) {
    aiConfig.recognition = new SpeechRecognition();

    aiConfig.recognition.lang = "en-IN";
    aiConfig.recognition.continuous = false;
    aiConfig.recognition.interimResults = false;
    aiConfig.recognition.maxAlternatives = 1;

    aiConfig.recognition.onstart = () => {
      aiConfig.isListening = true;

      if (voiceBtn) {
        voiceBtn.textContent = "🎤 Listening...";
      }
    };

    aiConfig.recognition.onresult = event => {
      const transcript = event.results[0][0].transcript;

      if (input) {
        input.value = transcript;
        input.focus();
      }
    };

    aiConfig.recognition.onend = () => {
      aiConfig.isListening = false;

      if (voiceBtn) {
        voiceBtn.textContent = "🎤 Voice Input";
      }
    };

    aiConfig.recognition.onerror = event => {
      aiConfig.isListening = false;

      if (voiceBtn) {
        voiceBtn.textContent = "🎤 Voice Input";
      }

      if (
        event.error === "not-allowed" ||
        event.error === "service-not-allowed"
      ) {
        appendAiMessage("assistant", "Microphone access denied.");
        return;
      }

      console.warn("Voice recognition error:", event.error);
    };
  }

  if (aiConfig.isListening) {
    aiConfig.recognition.stop();
    return;
  }

  try {
    aiConfig.recognition.start();
  } catch (error) {
    console.warn("Voice recognition start error:", error);
  }
}

// ======================================================
// ===== VOICE OUTPUT ===================================
// ======================================================

function speakAiResponse(text) {
  if (!window.isInterviewMode) return;
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();

  const cleanText = String(text).replace(/<[^>]*>?/gm, "");

  const speech = new SpeechSynthesisUtterance(cleanText);

  speech.lang = "en-IN";
  speech.rate = 1;
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
}

// ======================================================
// ===== GLOBAL EXPORTS =================================
// ======================================================

window.initAiAssistant = initAiAssistant;
window.stopAllSpeech = stopAllSpeech;