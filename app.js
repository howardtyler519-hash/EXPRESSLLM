const API = "http://localhost:5000";

async function loadConfigs() {
  const res = await fetch(`${API}/configs`);
  const configs = await res.json();
  const select = document.getElementById("config-select");
  configs.forEach(c => {
    const opt = document.createElement("option");
    opt.value = c;
    opt.textContent = c;
    select.appendChild(opt);
  });
}

function addMessage(text, role) {
  const window = document.getElementById("chat-window");
  const div = document.createElement("div");
  div.className = `message ${role}`;
  div.textContent = text;
  window.appendChild(div);
  window.scrollTop = window.scrollHeight;
}

async function sendMessage() {
  const input = document.getElementById("user-input");
  const config = document.getElementById("config-select").value;
  const message = input.value.trim();
  if (!message) return;

  addMessage(message, "user");
  input.value = "";

  const res = await fetch(`${API}/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, config })
  });
  const data = await res.json();
  addMessage(data.reply, "assistant");
}

document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("user-input").addEventListener("keydown", e => {
  if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
});

loadConfigs();