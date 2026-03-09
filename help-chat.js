(function () {
  'use strict';

  // ============================================================
  // CONFIG — swap these out when you wire up the real backend
  // ============================================================
  var CONFIG = {
    apiEndpoint: 'http://localhost:5000/chat',
    knowledgeConfig: 'help-kb',          // passed as `config` to your backend
    assistantName: 'EXPRESS Help',
    accentColor: '#8F5A39',
    accentLight: '#c49a6c',
    bgPanel: '#0d0d0d',
    bgMsg: '#1a1208',
    textMuted: '#9a8878',
    MOCK: true,  // set to false once your backend knowledge base is ready
  };

  // ============================================================
  // MOCK KNOWLEDGE BASE
  // ============================================================
  var MOCK_KB = [
    {
      keywords: ['build', 'template', 'builder'],
      answer: 'The Template Builder lets you pick a layout type, assemble components, customize add-ons, and apply your content. Find it under the Build tab — select Template Builder from the mode strip at the top of the left panel.'
    },
    {
      keywords: ['generate', 'ai', 'create', 'article'],
      answer: 'Generate mode takes your raw content, asks you what type of article you are making, then uses AI to edit it to brand standards and structure it into the right template automatically.'
    },
    {
      keywords: ['upload', 'file', 'pdf', 'docx', 'word'],
      answer: 'You can upload .txt, .md, .docx, or .pdf files in both Generate mode and the Template Builder edit phase. Look for the upload zone above the content input area.'
    },
    {
      keywords: ['edit', 'chat', 'apply', 'content'],
      answer: 'Once you have selected your template components, click "Add Content" to enter the edit phase. Paste or upload your content, choose a style (Professional, Editorial, Concise, etc.), and hit Apply. The AI edits it to brand standards and drops it into your template live.'
    },
    {
      keywords: ['brand', 'voice', 'style', 'standards'],
      answer: 'EXPRESS applies brand voice standards automatically: clear and active language, no jargon, concise structure. You can also choose a style tone — Professional, Editorial, Concise, Persuasive, or Conversational — when applying content.'
    },
    {
      keywords: ['component', 'add', 'remove', 'drag', 'reorder'],
      answer: 'In the Template Builder review step you can add as many components as you like, including duplicates. Use the drag handle on the left of each component to reorder, and the × button to remove one.'
    },
    {
      keywords: ['addon', 'customize', 'toggle', 'options'],
      answer: 'Click the Customize button on any component to expand its add-on panel. Toggle options like eyebrow labels, subtitles, drop caps, step numbers, and more. The preview on the right updates instantly.'
    },
    {
      keywords: ['preview', 'code', 'html', 'copy'],
      answer: 'The right panel shows a live preview of your template. Switch to the HTML Code tab to see and copy the generated code. Use the Copy Code button to grab it.'
    },
    {
      keywords: ['paste', 'html'],
      answer: 'Paste HTML mode lets you paste any raw HTML and preview it instantly on the right. Good for checking existing code or previewing externally generated markup.'
    },
    {
      keywords: ['help', 'support', 'contact'],
      answer: 'You can reach the support team via the Contact page. For documentation and FAQs, visit the Help page from the main navigation.'
    },
  ];

  function mockAnswer(query) {
    var q = query.toLowerCase();
    var best = null, bestScore = 0;
    MOCK_KB.forEach(function (entry) {
      var score = entry.keywords.reduce(function (acc, kw) {
        return acc + (q.indexOf(kw) !== -1 ? 1 : 0);
      }, 0);
      if (score > bestScore) { bestScore = score; best = entry; }
    });
    if (best && bestScore > 0) return best.answer;
    return "I don't have a specific answer for that in my knowledge base yet. Try checking the Help page, or contact the support team directly.";
  }

  // ============================================================
  // INJECT STYLES
  // ============================================================
  var style = document.createElement('style');
  style.textContent = [
    '#hc-btn{position:fixed;bottom:24px;right:24px;width:52px;height:52px;border-radius:50%;background:' + CONFIG.accentColor + ';border:none;cursor:pointer;box-shadow:0 4px 20px rgba(0,0,0,.4);display:flex;align-items:center;justify-content:center;z-index:9998;transition:transform .2s,box-shadow .2s;}',
    '#hc-btn:hover{transform:scale(1.08);box-shadow:0 6px 28px rgba(0,0,0,.5);}',
    '#hc-btn svg{width:24px;height:24px;fill:#fff;}',
    '#hc-badge{position:absolute;top:-3px;right:-3px;width:16px;height:16px;background:#ef4444;border-radius:50%;font-size:9px;color:#fff;display:none;align-items:center;justify-content:center;font-family:sans-serif;font-weight:700;}',
    '#hc-badge.visible{display:flex;}',

    '#hc-panel{position:fixed;bottom:88px;right:24px;width:340px;height:480px;background:' + CONFIG.bgPanel + ';border:1px solid #2a1f1a;border-radius:12px;box-shadow:0 8px 40px rgba(0,0,0,.6);display:flex;flex-direction:column;z-index:9999;transform:translateY(20px) scale(.96);opacity:0;pointer-events:none;transition:transform .25s ease,opacity .25s ease;}',
    '#hc-panel.open{transform:translateY(0) scale(1);opacity:1;pointer-events:all;}',

    '#hc-header{display:flex;align-items:center;justify-content:space-between;padding:14px 16px;border-bottom:1px solid #1c1c1c;flex-shrink:0;border-radius:12px 12px 0 0;background:#111;}',
    '#hc-header-left{display:flex;align-items:center;gap:10px;}',
    '#hc-avatar{width:28px;height:28px;border-radius:50%;background:' + CONFIG.accentColor + ';display:flex;align-items:center;justify-content:center;font-size:12px;font-weight:700;color:#fff;font-family:sans-serif;}',
    '#hc-title{font-size:13px;font-weight:600;color:#fff;font-family:"Open Sans",sans-serif;}',
    '#hc-status{font-size:10px;color:#4ade80;font-family:"Open Sans",sans-serif;letter-spacing:.5px;}',
    '#hc-close{background:none;border:none;color:' + CONFIG.textMuted + ';font-size:20px;cursor:pointer;line-height:1;padding:2px 4px;transition:color .2s;font-family:sans-serif;}',
    '#hc-close:hover{color:#fff;}',

    '#hc-messages{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:10px;}',
    '#hc-messages::-webkit-scrollbar{width:3px;}',
    '#hc-messages::-webkit-scrollbar-thumb{background:#2a1f1a;border-radius:3px;}',

    '.hc-msg{max-width:85%;padding:9px 13px;border-radius:8px;font-size:12px;line-height:1.6;font-family:"Open Sans",sans-serif;}',
    '.hc-msg.assistant{background:#1a1208;border:1px solid #2a1f1a;color:#d4c4b4;align-self:flex-start;border-radius:4px 8px 8px 8px;}',
    '.hc-msg.user{background:' + CONFIG.accentColor + ';color:#fff;align-self:flex-end;border-radius:8px 4px 8px 8px;}',
    '.hc-msg.thinking{background:#111;border:1px solid #1c1c1c;color:' + CONFIG.textMuted + ';align-self:flex-start;font-style:italic;display:flex;align-items:center;gap:8px;}',

    '.hc-dots{display:flex;gap:4px;}',
    '.hc-dots span{width:5px;height:5px;border-radius:50%;background:' + CONFIG.textMuted + ';animation:hc-bounce .9s infinite;}',
    '.hc-dots span:nth-child(2){animation-delay:.15s;}',
    '.hc-dots span:nth-child(3){animation-delay:.3s;}',
    '@keyframes hc-bounce{0%,80%,100%{transform:translateY(0);}40%{transform:translateY(-5px);}}',

    '#hc-suggestions{display:flex;flex-wrap:wrap;gap:6px;padding:0 14px 10px;flex-shrink:0;}',
    '.hc-chip{padding:5px 11px;background:transparent;border:1px solid #2a1f1a;border-radius:20px;font-size:11px;color:' + CONFIG.accentLight + ';cursor:pointer;font-family:"Open Sans",sans-serif;transition:all .2s;white-space:nowrap;}',
    '.hc-chip:hover{border-color:' + CONFIG.accentColor + ';background:#1a1208;color:#fff;}',

    '#hc-input-row{display:flex;gap:8px;padding:10px 14px;border-top:1px solid #1c1c1c;flex-shrink:0;background:#0a0a0a;border-radius:0 0 12px 12px;}',
    '#hc-input{flex:1;background:#1a1208;color:#fff;border:1px solid #2a1f1a;border-radius:6px;padding:8px 11px;font-family:"Open Sans",sans-serif;font-size:12px;resize:none;outline:none;line-height:1.4;}',
    '#hc-input:focus{border-color:' + CONFIG.accentColor + ';}',
    '#hc-input::placeholder{color:#4a3828;}',
    '#hc-send{padding:8px 14px;background:' + CONFIG.accentColor + ';color:#fff;border:none;border-radius:6px;font-size:12px;cursor:pointer;font-family:"Open Sans",sans-serif;transition:background .2s;flex-shrink:0;}',
    '#hc-send:hover{background:' + CONFIG.accentLight + ';color:#000;}',
    '#hc-send:disabled{background:#2a1f1a;color:' + CONFIG.textMuted + ';cursor:not-allowed;}',
  ].join('\n');
  document.head.appendChild(style);

  // ============================================================
  // BUILD DOM
  // ============================================================
  var btn = document.createElement('button');
  btn.id = 'hc-btn';
  btn.setAttribute('aria-label', 'Help chat');
  btn.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12 2C6.48 2 2 6.48 2 12c0 1.85.5 3.58 1.37 5.07L2 22l4.93-1.37A9.94 9.94 0 0 0 12 22c5.52 0 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2c0-3.25 3-3 3-5 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 2.5-3 2.75-3 5z"/></svg>';
  var badge = document.createElement('div');
  badge.id = 'hc-badge';
  badge.textContent = '1';
  btn.appendChild(badge);

  var panel = document.createElement('div');
  panel.id = 'hc-panel';
  panel.innerHTML = [
    '<div id="hc-header">',
    '  <div id="hc-header-left">',
    '    <div id="hc-avatar">?</div>',
    '    <div><div id="hc-title">' + CONFIG.assistantName + '</div><div id="hc-status">Online</div></div>',
    '  </div>',
    '  <button id="hc-close" aria-label="Close">&#215;</button>',
    '</div>',
    '<div id="hc-messages"></div>',
    '<div id="hc-suggestions">',
    '  <button class="hc-chip" onclick="hcSendChip(this)">How do I use Build?</button>',
    '  <button class="hc-chip" onclick="hcSendChip(this)">Upload a file</button>',
    '  <button class="hc-chip" onclick="hcSendChip(this)">Brand voice standards</button>',
    '  <button class="hc-chip" onclick="hcSendChip(this)">Copy HTML output</button>',
    '</div>',
    '<div id="hc-input-row">',
    '  <textarea id="hc-input" rows="1" placeholder="Ask anything..."></textarea>',
    '  <button id="hc-send" onclick="hcSend()">Send</button>',
    '</div>',
  ].join('');

  document.body.appendChild(btn);
  document.body.appendChild(panel);

  // ============================================================
  // STATE + HELPERS
  // ============================================================
  var isOpen = false;
  var messages = [];

  function openPanel() {
    isOpen = true;
    panel.classList.add('open');
    badge.classList.remove('visible');
    if (messages.length === 0) addMsg('Hi! I\'m the EXPRESS help assistant. Ask me anything about the platform — how to use Build, Template Builder, Generate mode, brand standards, and more.', 'assistant');
    document.getElementById('hc-input').focus();
  }

  function closePanel() {
    isOpen = false;
    panel.classList.remove('open');
  }

  function addMsg(text, role) {
    var msgEl = document.createElement('div');
    msgEl.className = 'hc-msg ' + role;
    if (role === 'thinking') {
      msgEl.innerHTML = '<div class="hc-dots"><span></span><span></span><span></span></div>';
    } else {
      msgEl.textContent = text;
    }
    var container = document.getElementById('hc-messages');
    container.appendChild(msgEl);
    container.scrollTop = container.scrollHeight;
    messages.push({role: role, text: text});
    return msgEl;
  }

  async function hcSend() {
    var input = document.getElementById('hc-input');
    var sendBtn = document.getElementById('hc-send');
    var query = input.value.trim();
    if (!query) return;

    // hide suggestions after first message
    document.getElementById('hc-suggestions').style.display = 'none';

    input.value = '';
    addMsg(query, 'user');

    var thinking = addMsg('', 'thinking');
    sendBtn.disabled = true;

    var reply = '';

    if (CONFIG.MOCK) {
      // Simulate a short delay
      await new Promise(function(res){ setTimeout(res, 700 + Math.random() * 600); });
      reply = mockAnswer(query);
    } else {
      try {
        var res = await fetch(CONFIG.apiEndpoint, {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({message: query, config: CONFIG.knowledgeConfig})
        });
        var data = await res.json();
        reply = data.reply || "Sorry, I didn't get a response. Please try again.";
      } catch (e) {
        reply = "Couldn't reach the help server. Please check your connection and try again.";
      }
    }

    thinking.remove();
    addMsg(reply, 'assistant');
    sendBtn.disabled = false;
    document.getElementById('hc-input').focus();
  }

  // exposed globally so inline onclick works
  window.hcSendChip = function(chipEl) {
    var input = document.getElementById('hc-input');
    input.value = chipEl.textContent;
    hcSend();
  };

  // ============================================================
  // EVENT LISTENERS
  // ============================================================
  btn.addEventListener('click', function () {
    isOpen ? closePanel() : openPanel();
  });

  document.getElementById('hc-close').addEventListener('click', closePanel);

  document.getElementById('hc-input').addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); hcSend(); }
  });

  // auto-grow textarea
  document.getElementById('hc-input').addEventListener('input', function () {
    this.style.height = 'auto';
    this.style.height = Math.min(this.scrollHeight, 80) + 'px';
  });

  // Show badge on load after a short delay (draws attention)
  setTimeout(function () {
    if (!isOpen) badge.classList.add('visible');
  }, 2000);

})();
