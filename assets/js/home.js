    const natoAlphabet = {a:'alpha',b:'bravo',c:'charlie',d:'delta',e:'echo',f:'foxtrot',g:'golf',h:'hotel',i:'india',j:'juliett',k:'kilo',l:'lima',m:'mike',n:'november',o:'oscar',p:'papa',q:'quebec',r:'romeo',s:'sierra',t:'tango',u:'uniform',v:'victor',w:'whiskey',x:'x-ray',y:'yankee',z:'zulu'};
    const kidAlphabet = {a:'apple',b:'bear',c:'cat',d:'dog',e:'elephant',f:'frog',g:'giraffe',h:'hat',i:'igloo',j:'juice',k:'kite',l:'lion',m:'monkey',n:'nest',o:'octopus',p:'penguin',q:'queen',r:'rabbit',s:'sun',t:'turtle',u:'umbrella',v:'van',w:'whale',x:'xylophone',y:'yo-yo',z:'zebra'};
    const symbolNames = {'!':'Exclamation Mark','@':'At Symbol','#':'Hash','$':'Dollar Sign','?':'Question Mark','*':'Asterisk'};
    const numberNames = {'0':'zero','1':'one','2':'two','3':'three','4':'four','5':'five','6':'six','7':'seven','8':'eight','9':'nine'};
    const mascotPhrases = [
      "I knew you'd like that one!",
      "Fresh from the tofu vault.",
      "That one has excellent tofu energy.",
      "A tidy little secret, just for you.",
      "Now that's a handsome password.",
      "Crispy choice. I approve.",
      "Another deliciously secure one.",
      "That password is looking extra firm.",
      "I squished my best for that one.",
      "Strong, cute, and ready to copy.",
      "That one should travel well.",
      "Freshly pressed and nicely secure.",
      "A very respectable little password.",
      "That one has main-character energy.",
      "I gave that one an extra bounce.",
      "Nicely picked. Very elegant.",
      "That password has good posture.",
      "Miso-certified and clipboard-ready.",
      "A cozy password with sharp edges.",
      "That one came out delightfully crunchy.",
      "Beautiful form. Excellent randomness.",
      "That secret is dressed for success.",
      "A fine vintage from the password cellar.",
      "I would trust that one with my soy sauce.",
      "That one looks calm under pressure.",
      "Clipboard delivery complete.",
      "A tasteful blend of charm and entropy.",
      "That one is serving pure confidence.",
      "Soft face, strong password.",
      "Miso made this one with care.",
      "That one feels lucky.",
      "A lovely little wall of security.",
      "That password has excellent manners.",
      "A premium tofu selection.",
      "That one has sparkle and discipline.",
      "Honestly? One of my better squishes.",
      "A nimble secret for a nimble mind.",
      "That password is tidy in all the right ways.",
      "You have good taste in secrets.",
      "That one is snug, secure, and stylish.",
      "A charming choice for the clipboard.",
      "That password has real staying power.",
      "I seasoned that one just right.",
      "Another excellent harvest from the entropy garden.",
      "That one is ready for the big leagues.",
      "A very huggable fortress of a password.",
      "That secret came out extra polished.",
      "A clean copy with excellent vibes.",
      "I feel great about that one."
    ];
    let currentPassword = "";
    let currentLevel = 'firm';
    let phoneticMode = 'military';
    let lastFocusedElement = null;
    let mascotBubbleTimeout = null;
    let angryMascotTimeout = null;
    let generateClickTimestamps = [];
    let mascotMood = 'idle';
    const angryMascotThreshold = 20;
    const angryMascotWindowMs = 2800;
    const angryMascotDurationMs = 2600;
    const angryMascotPhrase = "I'm sorry I'll try to get you a password you actually want.";

    function getSecureRandomInt(max) {
      const buffer = new Uint32Array(1);
      window.crypto.getRandomValues(buffer);
      return buffer[0] % max;
    }
    function generate(firmness) {
      const getRandom = (list) => list[getSecureRandomInt(list.length)];
      const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
      let password = "";
      if (firmness === 'soft') {
        password = `${getRandom(adjectives)}${getRandom(nouns)}${getSecureRandomInt(90)+10}`;
      } else if (firmness === 'firm') {
        const adjective = cap(getRandom(adjectives));
        const noun = cap(getRandom(nouns));
        const number = `${getSecureRandomInt(90)+10}`;
        const special = getRandom(specials);
        const firmParts = [adjective, noun, number];
        const specialIndex = getSecureRandomInt(firmParts.length + 1);
        firmParts.splice(specialIndex, 0, special);
        password = firmParts.join('');
      } else {
        password = [getRandom(adjectives),getRandom(nouns),getRandom(adjectives),getRandom(nouns)].join('-');
      }
      currentPassword = password;
      const passwordDisplay = document.getElementById('passwordDisplay');
      passwordDisplay.classList.remove('password-refresh');
      void passwordDisplay.offsetWidth;
      passwordDisplay.textContent = password;
      passwordDisplay.classList.add('password-refresh');
      const panel = document.getElementById('passwordPanel');
      const hint = document.getElementById('passwordHint');
      panel.classList.remove('copied');
      hint.textContent = 'Click password to copy';
      const drawer = document.getElementById('phoneticDrawer');
      if (drawer && drawer.classList.contains('active')) { syncPasswordEcho(); renderPhoneticGuide(); }
    }
    function generateNewPassword() {
      const button = document.getElementById('generateBtn');
      button.classList.remove('button-pulse');
      void button.offsetWidth;
      button.classList.add('button-pulse');
      trackRapidGenerateClick();
      generate(currentLevel);
    }
    function selectLevel(level) {
      currentLevel = level;
      ['soft','firm','extra'].forEach(l => {
        const c = document.getElementById('card-' + l);
        c.classList.remove('active-soft','active-firm','active-extra');
      });
      document.getElementById('card-' + level).classList.add('active-' + level);
      generate(level);
    }
    function copyPassword() {
      if (!currentPassword) return;

      function onCopySuccess() {
        var panel = document.getElementById('passwordPanel');
        var hint = document.getElementById('passwordHint');
        panel.classList.add('copied');
        hint.textContent = 'Copied to clipboard';
        if (mascotMood !== 'angry' && getSecureRandomInt(10) === 0) celebrateMascot();
        setTimeout(function() {
          hint.textContent = 'Click password to copy';
          panel.classList.remove('copied');
        }, 1800);
      }

      function fallbackCopy(text) {
        var ta = document.createElement('textarea');
        ta.value = text;
        ta.style.position = 'fixed';
        ta.style.left = '-9999px';
        document.body.appendChild(ta);
        ta.focus();
        ta.select();
        try {
          document.execCommand('copy');
          onCopySuccess();
        } catch (e) { /* ignore */ }
        document.body.removeChild(ta);
      }

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(currentPassword).then(onCopySuccess).catch(function() {
          fallbackCopy(currentPassword);
        });
      } else {
        fallbackCopy(currentPassword);
      }
    }
    function setMascotMood(mood) {
      const mascot = document.getElementById('generatorMascot');
      const bubble = document.getElementById('mascotBubble');
      const sparks = document.getElementById('mascotSparks');
      if (!mascot || !bubble) return null;

      mascot.classList.remove('is-happy', 'is-angry');
      bubble.classList.remove('angry');
      if (sparks) sparks.classList.remove('show');

      mascotMood = mood;

      if (mood === 'happy') {
        mascot.classList.add('is-happy');
      } else if (mood === 'angry') {
        mascot.classList.add('is-angry');
        bubble.classList.add('angry');
        if (sparks) sparks.classList.add('show');
      }

      return { mascot, bubble, sparks };
    }
    function showMascotBubble(text, mood = 'happy', duration = 2300) {
      const refs = setMascotMood(mood);
      if (!refs) return;
      const { mascot, bubble } = refs;

      bubble.classList.remove('show');
      if (mascotBubbleTimeout) clearTimeout(mascotBubbleTimeout);
      void mascot.offsetWidth;
      void bubble.offsetWidth;

      bubble.textContent = text;
      bubble.classList.add('show');

      mascotBubbleTimeout = setTimeout(() => {
        bubble.classList.remove('show');
      }, duration);
    }
    function resetMascotMood() {
      if (angryMascotTimeout) {
        clearTimeout(angryMascotTimeout);
        angryMascotTimeout = null;
      }
      setMascotMood('idle');
    }
    function triggerAngryMascot() {
      showMascotBubble(angryMascotPhrase, 'angry', angryMascotDurationMs);
      generateClickTimestamps = [];
      if (angryMascotTimeout) clearTimeout(angryMascotTimeout);
      angryMascotTimeout = setTimeout(() => {
        resetMascotMood();
      }, angryMascotDurationMs);
    }
    function trackRapidGenerateClick() {
      const now = Date.now();
      generateClickTimestamps.push(now);
      generateClickTimestamps = generateClickTimestamps.filter((timestamp) => now - timestamp <= angryMascotWindowMs);

      if (generateClickTimestamps.length >= angryMascotThreshold) {
        triggerAngryMascot();
      }
    }
    function celebrateMascot() {
      const phrase = mascotPhrases[getSecureRandomInt(mascotPhrases.length)];
      showMascotBubble(phrase, 'happy', 2300);
    }
    function setPhoneticMode(mode) {
      phoneticMode = mode;
      document.querySelectorAll('.tab-btn').forEach(button => {
        const isActive = button.id === 'tab' + (mode === 'military' ? 'Military' : 'Kid');
        button.classList.toggle('active', isActive);
        button.setAttribute('aria-selected', String(isActive));
      });
      renderPhoneticGuide();
    }
    function describeCharacter(char) {
      const dict = phoneticMode === 'military' ? natoAlphabet : kidAlphabet;
      const lower = char.toLowerCase();
      const isLetter = /[a-z]/i.test(char);
      const isNumber = /\d/.test(char);
      const isSymbol = Boolean(symbolNames[char]);
      const isUpper = isLetter && char !== lower;
      let word = symbolNames[char] || numberNames[char] || dict[lower] || char;
      if (isUpper) word = word.charAt(0).toUpperCase() + word.slice(1);

      let tone = 'letter';
      let detail = 'Letter';
      let spoken = word;

      if (isUpper) {
        tone = 'uppercase';
        detail = 'Uppercase letter';
        spoken = `capital ${word}`;
      } else if (isNumber) {
        tone = 'number';
        detail = 'Number';
      } else if (isSymbol) {
        tone = 'symbol';
        detail = 'Symbol';
      }

      return { char, word, tone, detail, spoken };
    }
    function renderPhoneticGuide() {
      const list = document.getElementById('phoneticList');
      if (!list) return;
      list.innerHTML = '';
      const details = [...currentPassword].map(describeCharacter);

      if (!details.length) {
        list.innerHTML = '<div class="phonetic-empty">Generate a password to see a readable phonetic spelling.</div>';
        return;
      }

      details.forEach((item) => {
        const row = document.createElement('div');
        row.className = `phonetic-item phonetic-item-${item.tone}`;
        row.innerHTML = `
          <span class="phonetic-char">${item.char}</span>
          <span class="phonetic-arrow" aria-hidden="true">→</span>
          <div class="phonetic-copy">
            <span class="phonetic-word">${item.word}</span>
            <span class="phonetic-meta">${item.detail}</span>
          </div>
        `;
        list.appendChild(row);
      });
    }
    function syncPasswordEcho() {
      const echo = document.getElementById('phoneticPasswordEcho');
      const display = document.getElementById('passwordDisplay');
      if (echo && display) echo.textContent = display.textContent;
    }
    function openPhoneticGuide() {
      lastFocusedElement = document.activeElement;
      syncPasswordEcho();
      renderPhoneticGuide();
      const panel = document.getElementById('passwordPanel');
      if (panel) panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const drawer = document.getElementById('phoneticDrawer');
      const backdrop = document.getElementById('phoneticBackdrop');
      const trigger = document.getElementById('phoneticBtn');
      drawer.classList.add('active');
      if (backdrop) backdrop.classList.add('active');
      drawer.setAttribute('aria-hidden', 'false');
      trigger.setAttribute('aria-expanded', 'true');
      drawer.querySelector('[data-close]').focus();
    }
    function closePhoneticGuide() {
      const drawer = document.getElementById('phoneticDrawer');
      const backdrop = document.getElementById('phoneticBackdrop');
      const trigger = document.getElementById('phoneticBtn');
      drawer.classList.remove('active');
      if (backdrop) backdrop.classList.remove('active');
      drawer.setAttribute('aria-hidden', 'true');
      trigger.setAttribute('aria-expanded', 'false');
      if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') lastFocusedElement.focus();
    }
    function togglePhoneticGuide() {
      const drawer = document.getElementById('phoneticDrawer');
      if (drawer.classList.contains('active')) closePhoneticGuide();
      else openPhoneticGuide();
    }
    window.addEventListener('DOMContentLoaded', () => {
      generate('firm');

      const announcement = document.querySelector('[data-announcement]');
      const announcementClose = document.querySelector('[data-announcement-close]');
      const announcementStorageKey = 'tofupass-announcement-2026-04-18-api-opensource';

      if (announcement && announcementClose) {
        try {
          if (window.localStorage.getItem(announcementStorageKey) === 'dismissed') {
            announcement.hidden = true;
          }
        } catch (error) {
          // Ignore storage access failures and keep the notice visible.
        }

        announcementClose.addEventListener('click', () => {
          announcement.hidden = true;
          try {
            window.localStorage.setItem(announcementStorageKey, 'dismissed');
          } catch (error) {
            // Ignore storage access failures after dismissing visually.
          }
        });
      }
    });
    document.addEventListener('keydown', (e) => {
      const drawer = document.getElementById('phoneticDrawer');
      if (drawer.classList.contains('active') && e.key === 'Escape') closePhoneticGuide();
      if (drawer.classList.contains('active') && e.key === 'Tab') {
        const focusable = [...drawer.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')]
          .filter(el => !el.disabled);
        if (focusable.length) {
          const first = focusable[0];
          const last = focusable[focusable.length - 1];
          if (e.shiftKey && document.activeElement === first) {
            e.preventDefault();
            last.focus();
          } else if (!e.shiftKey && document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
      if (e.key === ' ' && document.activeElement.tagName !== 'INPUT') {
        e.preventDefault(); generate(currentLevel);
      }
    });
    document.addEventListener('click', function(e) {
      const drawer = document.getElementById('phoneticDrawer');
      const trigger = document.getElementById('phoneticBtn');
      if (!drawer.classList.contains('active')) return;
      if (drawer.contains(e.target) || trigger.contains(e.target)) return;
      closePhoneticGuide();
    });
