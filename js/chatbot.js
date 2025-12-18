// ================= CHATBOT (NO BACKEND) =================

const chatToggle   = document.getElementById("chatToggle");
const chatPanel    = document.getElementById("chatPanel");
const chatMessages = document.getElementById("chatMessages");
const chatInput    = document.getElementById("chatInput");
const sendBtn      = document.getElementById("sendBtn");
const closeChat    = document.getElementById("closeChat");

const STORAGE_KEY = "internspark_chat_history";

/* ---------- Predefined Bot Replies ---------- */
const botReplies = [
  { keywords: ["hi","hello","hey"], reply: "👋 Hi! How can I help you with InternSpark internships?" },
  { keywords: ["domain","domains"], reply: "We offer 19 domains including Web Dev, AI/ML, Data Analytics, Cloud & more." },
  { keywords: ["apply","application"], reply: "📝 You can apply using the Apply button. It takes less than 60 seconds." },
  { keywords: ["certificate"], reply: "📜 Yes, interns receive a verified internship & experience certificate." },
  { keywords: ["duration","time"], reply: "⏳ Internship duration ranges from 4 to 8 weeks depending on the program." },
  { keywords: ["stipend","paid"], reply: "InternSpark focuses on skill-building & experience. Some programs may include benefits." },
  { keywords: ["placement"], reply: "🎯 We provide placement assistance and career guidance, not job guarantees." }
];

/* ---------- Helpers ---------- */
function saveHistory() {
  localStorage.setItem(STORAGE_KEY, chatMessages.innerHTML);
}

function loadHistory() {
  const history = localStorage.getItem(STORAGE_KEY);
  if (history) {
    chatMessages.innerHTML = history;
  } else {
    addMessage("Hi! 👋 I’m the InternSpark assistant. Ask me about domains, certificates, or applying.", "bot");
  }
}

function addMessage(text, type) {
  const div = document.createElement("div");
  div.className = `message ${type}`;
  div.textContent = text;
  chatMessages.appendChild(div);
  chatMessages.scrollTop = chatMessages.scrollHeight;
  saveHistory();
}

function getBotReply(userText) {
  const msg = userText.toLowerCase();
  for (let item of botReplies) {
    if (item.keywords.some(k => msg.includes(k))) {
      return item.reply;
    }
  }
  return "🤖 I can help with domains, application process, certificates, and duration.";
}

/* ---------- Events ---------- */
chatToggle.addEventListener("click", () => {
  chatPanel.style.display = chatPanel.style.display === "flex" ? "none" : "flex";
});

closeChat.addEventListener("click", () => {
  chatPanel.style.display = "none";
});

sendBtn.addEventListener("click", sendMessage);

chatInput.addEventListener("keypress", e => {
  if (e.key === "Enter") sendMessage();
});

function sendMessage() {
  const text = chatInput.value.trim();
  if (!text) return;

  addMessage(text, "user");
  chatInput.value = "";

  setTimeout(() => {
    addMessage(getBotReply(text), "bot");
  }, 600);
}

/* ---------- Init ---------- */
loadHistory();
