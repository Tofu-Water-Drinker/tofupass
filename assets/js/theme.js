(function () {
  const html = document.documentElement;
  const STORAGE_KEY = 'theme';

  function isDark() {
    return html.classList.contains('dark');
  }

  function updateToggleIcons() {
    document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
      btn.setAttribute('aria-label', isDark() ? 'Switch to light mode' : 'Switch to dark mode');
    });
  }

  function setTheme(dark) {
    html.classList.toggle('dark', dark);
    updateToggleIcons();
  }

  // Toggle handler
  document.querySelectorAll('[data-theme-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var next = !isDark();
      setTheme(next);
      localStorage.setItem(STORAGE_KEY, next ? 'dark' : 'light');
    });
  });

  // Listen for OS preference changes (only when no manual override)
  var mq = window.matchMedia('(prefers-color-scheme: dark)');
  mq.addEventListener('change', function (e) {
    if (!localStorage.getItem(STORAGE_KEY)) {
      setTheme(e.matches);
    }
  });

  // Initial icon sync (class is already applied by inline head script)
  updateToggleIcons();
})();
