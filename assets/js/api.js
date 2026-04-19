function copyCode(btn, text) {
      navigator.clipboard.writeText(text).then(() => {
        const orig = btn.textContent;
        btn.textContent = '✓ Copied';
        setTimeout(() => btn.textContent = orig, 2000);
      });
    }
