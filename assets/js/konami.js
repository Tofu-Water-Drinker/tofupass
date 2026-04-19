(function () {
  // ↑ ↑ ↓ ↓ ← → ← → B A
  var SEQUENCE = [
    'ArrowUp', 'ArrowUp',
    'ArrowDown', 'ArrowDown',
    'ArrowLeft', 'ArrowRight',
    'ArrowLeft', 'ArrowRight',
    'b', 'a'
  ];

  var progress = 0;

  function isTypingTarget(el) {
    if (!el) return false;
    var tag = (el.tagName || '').toLowerCase();
    if (tag === 'input' || tag === 'textarea' || tag === 'select') return true;
    if (el.isContentEditable) return true;
    return false;
  }

  function normalizeKey(e) {
    // Letter keys: normalize case. Arrow keys: use e.key as-is.
    if (e.key && e.key.length === 1) return e.key.toLowerCase();
    return e.key;
  }

  document.addEventListener('keydown', function (e) {
    // Ignore while the user is typing into an input/textarea/contenteditable
    if (isTypingTarget(e.target)) {
      progress = 0;
      return;
    }

    var key = normalizeKey(e);
    var expected = SEQUENCE[progress];

    if (key === expected) {
      progress++;
      if (progress === SEQUENCE.length) {
        progress = 0;
        // Resolve path relative to site root so it works from subpages
        var root = window.location.pathname.indexOf('/') === 0 ? '/' : './';
        window.location.href = root + 'cheater/';
      }
    } else {
      // Allow restarting the sequence if the mismatched key is the first key
      progress = (key === SEQUENCE[0]) ? 1 : 0;
    }
  });
})();
