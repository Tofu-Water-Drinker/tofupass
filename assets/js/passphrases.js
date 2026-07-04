(function () {
  const locale = window.tofupassPassphraseLocale || {};
  const text = Object.assign({
    words: 'words',
    clickToCopy: 'Click passphrase to copy',
    copied: 'Copied to clipboard',
    passphraseGenerated: 'New passphrase generated.',
    passphraseCopied: 'Passphrase copied.',
    copyFailed: 'Copy failed. Select the passphrase and copy it manually.',
    unavailable: 'Word list unavailable'
  }, locale.text || {});
  const state = {
    count: 4,
    separator: '-',
    casing: 'lower',
  };
  let currentPassphrase = '';
  let wordPool = [];

  function announceStatus(message) {
    const status = document.getElementById('passphraseStatus');
    if (!status) return;
    status.textContent = '';
    window.setTimeout(() => {
      status.textContent = message;
    }, 20);
  }

  function getSecureRandomInt(max) {
    if (!Number.isInteger(max) || max <= 0) {
      throw new Error('max must be a positive integer');
    }

    const buffer = new Uint32Array(1);
    const limit = Math.floor(0x100000000 / max) * max;

    do {
      window.crypto.getRandomValues(buffer);
    } while (buffer[0] >= limit);

    return buffer[0] % max;
  }

  function titleCase(word) {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }

  function getWordPool() {
    const adjectiveList = Array.isArray(window.adjectives) ? window.adjectives : (typeof adjectives !== 'undefined' ? adjectives : []);
    const nounList = Array.isArray(window.nouns) ? window.nouns : (typeof nouns !== 'undefined' ? nouns : []);
    return [...new Set([...adjectiveList, ...nounList].filter(Boolean))];
  }

  function formatWord(word) {
    return state.casing === 'title' ? titleCase(word) : word.toLowerCase();
  }

  function setPressed(groupSelector, selector, value) {
    document.querySelectorAll(groupSelector).forEach((button) => {
      button.setAttribute('aria-pressed', String(button.getAttribute(selector) === value));
    });
  }

  function syncControls() {
    setPressed('[data-count]', 'data-count', String(state.count));
    setPressed('[data-separator]', 'data-separator', state.separator);
    setPressed('[data-case]', 'data-case', state.casing);

    const badge = document.getElementById('passphraseCountBadge');
    if (badge) badge.textContent = `${state.count} ${text.words}`;
  }

  function renderPassphrase(passphrase) {
    const display = document.getElementById('passphraseDisplay');
    const panel = document.getElementById('passphrasePanel');
    const hint = document.getElementById('passphraseHint');
    if (!display || !panel || !hint) return;

    display.classList.remove('passphrase-refresh');
    void display.offsetWidth;
    display.textContent = passphrase;
    display.classList.add('passphrase-refresh');
    panel.classList.remove('copied');
    hint.textContent = text.clickToCopy;
  }

  function generatePassphrase(shouldAnnounce = true) {
    if (!wordPool.length) {
      renderPassphrase(text.unavailable);
      return;
    }

    const words = [];
    for (let i = 0; i < state.count; i += 1) {
      words.push(formatWord(wordPool[getSecureRandomInt(wordPool.length)]));
    }

    currentPassphrase = words.join(state.separator);
    renderPassphrase(currentPassphrase);
    if (shouldAnnounce) announceStatus(text.passphraseGenerated);
  }

  function onCopySuccess() {
    const panel = document.getElementById('passphrasePanel');
    const hint = document.getElementById('passphraseHint');
    if (!panel || !hint) return;

    panel.classList.add('copied');
    hint.textContent = text.copied;
    announceStatus(text.passphraseCopied);
    setTimeout(() => {
      panel.classList.remove('copied');
      hint.textContent = text.clickToCopy;
    }, 1800);
  }

  function onCopyFailure() {
    announceStatus(text.copyFailed);
  }

  function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      if (document.execCommand('copy')) {
        onCopySuccess();
      } else {
        onCopyFailure();
      }
    } catch (e) {
      onCopyFailure();
    }
    document.body.removeChild(ta);
  }

  function copyPassphrase() {
    if (!currentPassphrase) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(currentPassphrase).then(onCopySuccess).catch(() => {
        fallbackCopy(currentPassphrase);
      });
    } else {
      fallbackCopy(currentPassphrase);
    }
  }

  window.addEventListener('DOMContentLoaded', () => {
    wordPool = getWordPool();
    syncControls();
    generatePassphrase(false);

    const generateButton = document.getElementById('passphraseGenerate');
    const copyButton = document.getElementById('passphraseCopy');
    const panel = document.getElementById('passphrasePanel');

    if (generateButton) generateButton.addEventListener('click', generatePassphrase);
    if (copyButton) copyButton.addEventListener('click', copyPassphrase);
    if (panel) panel.addEventListener('click', copyPassphrase);

    document.querySelectorAll('[data-count]').forEach((button) => {
      button.addEventListener('click', () => {
        state.count = Number(button.getAttribute('data-count'));
        syncControls();
        generatePassphrase();
      });
    });

    document.querySelectorAll('[data-separator]').forEach((button) => {
      button.addEventListener('click', () => {
        state.separator = button.getAttribute('data-separator');
        syncControls();
        generatePassphrase();
      });
    });

    document.querySelectorAll('[data-case]').forEach((button) => {
      button.addEventListener('click', () => {
        state.casing = button.getAttribute('data-case');
        syncControls();
        generatePassphrase();
      });
    });
  });
})();
