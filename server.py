@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&display=swap');

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

body {
  font-family: 'Tiempos text', sans-serif;
  height: 100vh;
  background-color: #0a0a0a;
  color: #e0d5cc;
}

#app {
  display: flex;
  width: 100%;
  height: 100vh;
}

/* --- Sidebar --- */
#sidebar {
  width: 240px;
  background: #111111;
  border-right: 1px solid #2a1f1a;
  padding: 28px 20px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

#sidebar h1 {
  font-size: 20px;
  font-weight: 600;
  color: #c49a6c;
  letter-spacing: 1px;
}

.subtitle {
  font-size: 12px;
  color: #6b5a4e;
  text-transform: uppercase;
  letter-spacing: 1px;
}

#config-select {
  width: 100%;
  padding: 8px 10px;
  background: #1a1208;
  color: #e0d5cc;
  border: 1px solid #3d2b1f;
  border-radius: 6px;
  font-size: 14px;
  cursor: pointer;
  outline: none;
}

#config-select:hover {
  border-color: #c49a6c;
}

#config-info {
  margin-top: 8px;
  padding: 10px;
  background: #1a1208;
  border-radius: 6px;
  border: 1px solid #2a1f1a;
  font-size: 13px;
  color: #8a7060;
}

#active-config {
  color: #c49a6c;
  font-weight: 500;
}

/* --- Main Chat Area --- */
#main {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: #0d0d0d;
}

#chat-window {
  flex: 1;
  overflow-y: auto;
  padding: 28px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}

#chat-window::-webkit-scrollbar {
  width: 6px;
}

#chat-window::-webkit-scrollbar-track {
  background: #0d0d0d;
}

#chat-window::-webkit-scrollbar-thumb {
  background: #2a1f1a;
  border-radius: 4px;
}

/* --- Messages --- */
.message {
  padding: 12px 16px;
  border-radius: 10px;
  max-width: 72%;
  font-size: 14px;
  line-height: 1.6;
  word-wrap: break-word;
}

.user {
  background: #3d2008;
  color: #f0e0d0;
  border: 1px solid #5a3020;
  align-self: flex-end;
}

.assistant {
  background: #1a1510;
  color: #d0c5bc;
  border: 1px solid #2a2018;
  align-self: flex-start;
}

.thinking {
  color: #6b5a4e;
  font-style: italic;
  font-size: 13px;
  align-self: flex-start;
}

/* --- Input Area --- */
#input-area {
  display: flex;
  padding: 16px 20px;
  gap: 10px;
  border-top: 1px solid #2a1f1a;
  background: #111111;
  align-items: flex-end;
}

#user-input {
  flex: 1;
  padding: 10px 14px;
  background: #1a1208;
  color: #e0d5cc;
  border: 1px solid #3d2b1f;
  border-radius: 8px;
  font-size: 14px;
  font-family: 'Inter', sans-serif;
  resize: none;
  outline: none;
  line-height: 1.5;
}

#user-input:focus {
  border-color: #c49a6c;
}

#user-input::placeholder {
  color: #4a3828;
}

#send-btn {
  padding: 10px 20px;
  background: #6b3a1f;
  color: #f0e0d0;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s;
  font-family: 'Inter', sans-serif;
}

#send-btn:hover {
  background: #c49a6c;
  color: #0a0a0a;
}

#back-btn {
  position: fixed;
  top: 20px;
  left: 20px;
  font-size: 12px;
  letter-spacing: 2px;
  text-transform: uppercase;
  color: #c49a6c;
  text-decoration: none;
  z-index: 100;
  transition: color 0.2s;
}

#back-btn:hover {
  color: #ffffff;
}
