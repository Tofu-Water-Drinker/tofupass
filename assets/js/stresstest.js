const stressLocale = window.tofupassStressLocale || {};
    const stressText = Object.assign({
      show: 'Show',
      hide: 'Hide',
      chars: 'chars',
      waiting: 'Waiting',
      notYet: 'Not yet',
      checkingBreaches: 'Running privacy-preserving breach check...',
      breached: 'This password appears in <strong>{count}</strong> known breach records.',
      instantCompromised: 'Instant (Compromised)',
      compromised: 'Compromised',
      instantaneous: 'Instantaneous',
      seconds: 'Seconds',
      minutes: 'Minutes',
      hours: 'Hours',
      days: 'Days',
      years: 'Years',
      millionYears: 'Million Years',
      eons: 'Eons',
      veryWeak: 'Very Weak',
      weak: 'Weak',
      moderate: 'Moderate',
      strong: 'Strong',
      veryStrong: 'Very Strong',
      passwordVisible: 'Password visible.',
      passwordHidden: 'Password hidden.',
      resultsSummary: 'Strength: {strength}. Estimated crack time: {time}. Characters: {length}. Pool size: {pool}. Entropy: {entropy} bits.',
      breachedSummary: 'Compromised password. Found in {count} known breach records.',
      emptySummary: 'Enter a password to see the estimate.'
    }, stressLocale.text || {});

const pwdInput = document.getElementById('password');
    const hwSelect = document.getElementById('hardware');
    const timeDisplay = document.getElementById('time-display');
    const meterFill = document.getElementById('meter-fill');
    const breachCard = document.getElementById('breach-card');
    const breachText = document.getElementById('breach-text');
    const scanningText = document.getElementById('scanning-text');
    const charCount = document.getElementById('char-count');
    const strengthLabel = document.getElementById('strength-label');
    const meterTrack = document.querySelector('.meter-track');
    const statLength = document.getElementById('stat-length');
    const statPool = document.getElementById('stat-pool');
    const statEntropy = document.getElementById('stat-entropy');
    const stressStatus = document.getElementById('stressStatus');

    let debounceTimer;
    let announceTimer;
    let isVisible = false;

    function formatText(template, values) {
      return Object.keys(values).reduce((output, key) => {
        return output.replace(`{${key}}`, values[key]);
      }, template);
    }

    function announce(message, delay = 750) {
      if (!stressStatus) return;
      clearTimeout(announceTimer);
      announceTimer = setTimeout(() => {
        stressStatus.textContent = '';
        window.setTimeout(() => {
          stressStatus.textContent = message;
        }, 20);
      }, delay);
    }

    function toggleVisibility() {
      isVisible = !isVisible;
      pwdInput.type = isVisible ? 'text' : 'password';
      document.getElementById('visText').textContent = isVisible ? stressText.hide : stressText.show;
      document.getElementById('visIcon').textContent = isVisible ? '🙈' : '👁';
      const visButton = document.getElementById('visBtn');
      if (visButton) visButton.setAttribute('aria-pressed', String(isVisible));
      announce(isVisible ? stressText.passwordVisible : stressText.passwordHidden, 100);
    }

    function getStrengthLabel(score) {
      if (score < 25) return { text: stressText.veryWeak, color: '#FF7A7A', bg: 'rgba(255,122,122,0.1)' };
      if (score < 50) return { text: stressText.weak, color: '#FF9F6B', bg: 'rgba(255,159,107,0.1)' };
      if (score < 70) return { text: stressText.moderate, color: '#E6A800', bg: 'rgba(255,209,102,0.1)' };
      if (score < 88) return { text: stressText.strong, color: '#6BBF59', bg: 'rgba(107,191,89,0.1)' };
      return { text: stressText.veryStrong, color: '#6BBF59', bg: 'rgba(107,191,89,0.12)' };
    }

    async function updateLogic() {
      const val = pwdInput.value;
      const speed = parseFloat(hwSelect.value);

      charCount.textContent = val ? `${val.length} ${stressText.chars}` : '';

      if (!val) { resetUI(); return; }

      let pool = 0;
      if (/[a-z]/.test(val)) pool += 26;
      if (/[A-Z]/.test(val)) pool += 26;
      if (/[0-9]/.test(val)) pool += 10;
      if (/[^a-zA-Z0-9]/.test(val)) pool += 33;

      const entropy = pool > 0 ? Math.round(val.length * Math.log2(pool)) : 0;
      statLength.textContent = val.length;
      statPool.textContent = pool;
      statEntropy.textContent = entropy;

      let combinations = Math.pow(pool, val.length);
      let theoreticalSeconds = combinations / speed;
      renderResults(theoreticalSeconds, false, 0);

      // Breach check with debounce
      clearTimeout(debounceTimer);
      if (val.length >= 4) {
        scanningText.textContent = stressText.checkingBreaches;
        scanningText.className = 'text-xs text-[#8B7355]/50 mt-2 h-4 scanning';
        debounceTimer = setTimeout(async () => {
          const breachCount = await checkBreach(val);
          scanningText.textContent = '';
          scanningText.className = 'text-xs text-[#8B7355]/30 mt-2 h-4';
          if (breachCount > 0) renderResults(0, true, breachCount);
        }, 600);
      } else {
        scanningText.textContent = '';
      }
    }

    async function checkBreach(password) {
      try {
        const encoder = new TextEncoder();
        const data = encoder.encode(password);
        const hashBuffer = await crypto.subtle.digest('SHA-1', data);
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join('').toUpperCase();
        const prefix = hashHex.substring(0, 5);
        const suffix = hashHex.substring(5);
        const res = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const text = await res.text();
        const match = text.split('\n').find(l => l.startsWith(suffix));
        return match ? parseInt(match.split(':')[1]) : 0;
      } catch(e) { return 0; }
    }

    function renderResults(seconds, isBreached, breachCount) {
      if (isBreached) {
        breachText.innerHTML = stressText.breached.replace('{count}', breachCount.toLocaleString());
        breachCard.style.display = 'block';
        meterFill.style.width = '100%';
        meterFill.style.background = '#FF7A7A';
        timeDisplay.textContent = stressText.instantCompromised;
        timeDisplay.style.color = '#FF7A7A';
        strengthLabel.textContent = stressText.compromised;
        strengthLabel.style.color = '#FF7A7A';
        strengthLabel.style.background = 'rgba(255,122,122,0.1)';
        if (meterTrack) {
          meterTrack.setAttribute('aria-valuenow', '0');
          meterTrack.setAttribute('aria-valuetext', stressText.compromised);
        }
        announce(formatText(stressText.breachedSummary, { count: breachCount.toLocaleString() }));
      } else {
        breachCard.style.display = 'none';
        let timeStr;
        if (seconds < 1) timeStr = stressText.instantaneous;
        else if (seconds < 60) timeStr = Math.floor(seconds) + ' ' + stressText.seconds;
        else if (seconds < 3600) timeStr = Math.floor(seconds/60) + ' ' + stressText.minutes;
        else if (seconds < 86400) timeStr = Math.floor(seconds/3600) + ' ' + stressText.hours;
        else if (seconds < 31536000) timeStr = Math.floor(seconds/86400) + ' ' + stressText.days;
        else if (seconds < 1e12) timeStr = Math.floor(seconds/31536000).toLocaleString() + ' ' + stressText.years;
        else if (seconds < 1e15) timeStr = (seconds/31536000/1e6).toFixed(1) + ' ' + stressText.millionYears;
        else timeStr = stressText.eons;

        timeDisplay.textContent = timeStr;

        const score = Math.min(100, (Math.log10(seconds+1)/14)*100);
        const color = score < 45 ? '#FF7A7A' : score < 75 ? '#E6A800' : '#6BBF59';
        meterFill.style.width = score + '%';
        meterFill.style.background = color;
        timeDisplay.style.color = color;

        const sl = getStrengthLabel(score);
        strengthLabel.textContent = sl.text;
        strengthLabel.style.color = sl.color;
        strengthLabel.style.background = sl.bg;
        if (meterTrack) {
          meterTrack.setAttribute('aria-valuenow', String(Math.round(score)));
          meterTrack.setAttribute('aria-valuetext', sl.text);
        }
        announce(formatText(stressText.resultsSummary, {
          strength: sl.text,
          time: timeStr,
          length: statLength.textContent,
          pool: statPool.textContent,
          entropy: statEntropy.textContent
        }));
      }
    }

    function resetUI() {
      timeDisplay.textContent = stressText.notYet;
      timeDisplay.style.color = '#6BBF59';
      meterFill.style.width = '0%';
      breachCard.style.display = 'none';
      scanningText.textContent = '';
      strengthLabel.textContent = stressText.waiting;
      strengthLabel.style.color = '#8B7355';
      strengthLabel.style.background = 'rgba(139,195,74,0.06)';
      if (meterTrack) {
        meterTrack.setAttribute('aria-valuenow', '0');
        meterTrack.setAttribute('aria-valuetext', stressText.waiting);
      }
      statLength.textContent = '0';
      statPool.textContent = '0';
      statEntropy.textContent = '0';
      charCount.textContent = '';
      announce(stressText.emptySummary);
    }

    function closeTooltip(button) {
      const id = button.getAttribute('aria-controls');
      const content = id ? document.getElementById(id) : null;
      button.setAttribute('aria-expanded', 'false');
      if (content) content.hidden = true;
    }

    function setupTooltips() {
      const buttons = Array.from(document.querySelectorAll('.tooltip-toggle[aria-controls]'));
      buttons.forEach((button) => {
        const content = document.getElementById(button.getAttribute('aria-controls'));
        if (!content) return;

        button.addEventListener('click', () => {
          const isOpen = button.getAttribute('aria-expanded') === 'true';
          buttons.forEach(closeTooltip);
          button.setAttribute('aria-expanded', String(!isOpen));
          content.hidden = isOpen;
        });

        button.addEventListener('keydown', (event) => {
          if (event.key === 'Escape') {
            closeTooltip(button);
            button.focus();
          }
        });
      });

      document.addEventListener('click', (event) => {
        if (event.target.closest('.tooltip-wrap')) return;
        buttons.forEach(closeTooltip);
      });

      document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') buttons.forEach(closeTooltip);
      });
    }

    pwdInput.addEventListener('input', updateLogic);
    hwSelect.addEventListener('change', updateLogic);
    setupTooltips();
