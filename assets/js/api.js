function copyCode(btn, text) {
  const original = btn.textContent;

  function onCopySuccess() {
    btn.textContent = 'Copied';
    setTimeout(() => {
      btn.textContent = original;
    }, 2000);
  }

  function fallbackCopy(value) {
    const ta = document.createElement('textarea');
    ta.value = value;
    ta.style.position = 'fixed';
    ta.style.left = '-9999px';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    try {
      document.execCommand('copy');
      onCopySuccess();
    } catch (e) {
      // Ignore clipboard failures after the fallback attempt.
    }
    document.body.removeChild(ta);
  }

  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard.writeText(text).then(onCopySuccess).catch(() => {
      fallbackCopy(text);
    });
  } else {
    fallbackCopy(text);
  }
}
