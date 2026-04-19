const pwdInput = document.getElementById('password');
    const hwSelect = document.getElementById('hardware');
    const timeDisplay = document.getElementById('time-display');
    const meterFill = document.getElementById('meter-fill');
    const breachCard = document.getElementById('breach-card');
    const breachText = document.getElementById('breach-text');
    const scanningText = document.getElementById('scanning-text');
    const charCount = document.getElementById('char-count');
    const strengthLabel = document.getElementById('strength-label');
    const statLength = document.getElementById('stat-length');
    const statPool = document.getElementById('stat-pool');
    const statEntropy = document.getElementById('stat-entropy');

    let debounceTimer;
    let isVisible = false;

    function toggleVisibility() {
      isVisible = !isVisible;
      pwdInput.type = isVisible ? 'text' : 'password';
      document.getElementById('visText').textContent = isVisible ? 'Hide' : 'Show';
      document.getElementById('visIcon').textContent = isVisible ? '🙈' : '👁';
    }

    function getStrengthLabel(score) {
      if (score < 25) return { text: 'Very Weak', color: '#FF7A7A', bg: 'rgba(255,122,122,0.1)' };
      if (score < 50) return { text: 'Weak', color: '#FF9F6B', bg: 'rgba(255,159,107,0.1)' };
      if (score < 70) return { text: 'Moderate', color: '#E6A800', bg: 'rgba(255,209,102,0.1)' };
      if (score < 88) return { text: 'Strong', color: '#6BBF59', bg: 'rgba(107,191,89,0.1)' };
      return { text: 'Very Strong', color: '#6BBF59', bg: 'rgba(107,191,89,0.12)' };
    }

    async function updateLogic() {
      const val = pwdInput.value;
      const speed = parseFloat(hwSelect.value);

      charCount.textContent = val ? `${val.length} chars` : '';

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
        scanningText.textContent = 'Checking breach databases...';
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
        breachText.innerHTML = `This password appeared in <strong>${breachCount.toLocaleString()}</strong> known data breaches.`;
        breachCard.style.display = 'block';
        meterFill.style.width = '100%';
        meterFill.style.background = '#FF7A7A';
        timeDisplay.textContent = 'Instant (Compromised)';
        timeDisplay.style.color = '#FF7A7A';
        strengthLabel.textContent = 'Compromised';
        strengthLabel.style.color = '#FF7A7A';
        strengthLabel.style.background = 'rgba(255,122,122,0.1)';
      } else {
        breachCard.style.display = 'none';
        let timeStr;
        if (seconds < 1) timeStr = 'Instantaneous';
        else if (seconds < 60) timeStr = Math.floor(seconds) + ' Seconds';
        else if (seconds < 3600) timeStr = Math.floor(seconds/60) + ' Minutes';
        else if (seconds < 86400) timeStr = Math.floor(seconds/3600) + ' Hours';
        else if (seconds < 31536000) timeStr = Math.floor(seconds/86400) + ' Days';
        else if (seconds < 1e12) timeStr = Math.floor(seconds/31536000).toLocaleString() + ' Years';
        else if (seconds < 1e15) timeStr = (seconds/31536000/1e6).toFixed(1) + ' Million Years';
        else timeStr = 'Eons';

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
      }
    }

    function resetUI() {
      timeDisplay.textContent = 'Not yet';
      timeDisplay.style.color = '#6BBF59';
      meterFill.style.width = '0%';
      breachCard.style.display = 'none';
      scanningText.textContent = '';
      strengthLabel.textContent = 'Waiting';
      strengthLabel.style.color = '#8B7355';
      strengthLabel.style.background = 'rgba(139,195,74,0.06)';
      statLength.textContent = '0';
      statPool.textContent = '0';
      statEntropy.textContent = '0';
      charCount.textContent = '';
    }

    pwdInput.addEventListener('input', updateLogic);
    hwSelect.addEventListener('change', updateLogic);
