(function () {
  const storageKey = 'tofupass-language';
  const cookieName = 'tofupass_language';
  const supported = ['en', 'es', 'pt', 'fr', 'de', 'ja', 'zh-cn', 'ar', 'id', 'hi', 'ru'];
  const languageCodes = {
    en: 'EN',
    es: 'ES',
    pt: 'PT',
    fr: 'FR',
    de: 'DE',
    ja: 'JA',
    'zh-cn': 'ZH',
    ar: 'AR',
    id: 'ID',
    hi: 'HI',
    ru: 'RU',
  };
  const languageNames = {
    en: 'English',
    es: 'Spanish',
    pt: 'Portuguese',
    fr: 'French',
    de: 'German',
    ja: 'Japanese',
    'zh-cn': 'Simplified Chinese',
    ar: 'Arabic',
    id: 'Indonesian',
    hi: 'Hindi',
    ru: 'Russian',
  };
  const localizedRoutes = [
    '/',
    '/passphrases/',
    '/stresstest/',
    '/good/',
    '/api/',
    '/about/',
    '/privacy/',
    '/miso/',
    '/why/',
    '/for/',
    '/for/teachers/',
    '/for/helpdesk/',
    '/for/parents/',
    '/for/homelab/',
    '/for/developers/',
    '/teachers/',
    '/helpdesk/',
    '/careers/',
  ];
  const unlocalizedRoutes = [
    '/accessibility/',
  ];
  const routeMap = {};

  supported.filter((language) => language !== 'en').forEach((language) => {
    routeMap[language] = {};
    localizedRoutes.forEach((path) => {
      routeMap[language][path] = `/${language}${path}`;
    });
  });

  const localePrefixes = supported.filter((language) => language !== 'en');

  function normalizePath(path) {
    if (!path) return '/';
    return path.endsWith('/') ? path : `${path}/`;
  }

  function getCurrentLanguage() {
    const path = normalizePath(window.location.pathname);
    const prefix = localePrefixes.find((language) => path.startsWith(`/${language}/`));
    return prefix || 'en';
  }

  function getCookieLanguage() {
    const match = document.cookie.match(new RegExp(`(?:^|; )${cookieName}=([^;]*)`));
    const value = match ? decodeURIComponent(match[1]) : '';
    return supported.includes(value) ? value : '';
  }

  function getStoredLanguage() {
    const cookieLanguage = getCookieLanguage();
    if (cookieLanguage) return cookieLanguage;

    try {
      const value = window.localStorage.getItem(storageKey);
      if (supported.includes(value)) return value;
    } catch (error) {
      // Ignore storage failures; the cookie still covers normal browsing.
    }
    return '';
  }

  function rememberLanguage(language) {
    if (!supported.includes(language)) return;
    try {
      window.localStorage.setItem(storageKey, language);
    } catch (error) {
      // Ignore restricted storage contexts.
    }
    document.cookie = `${cookieName}=${encodeURIComponent(language)}; path=/; max-age=31536000; SameSite=Lax`;
  }

  function toEnglishPath(path) {
    const normalized = normalizePath(path);
    for (const language of localePrefixes) {
      const entry = Object.entries(routeMap[language]).find(([, localizedPath]) => localizedPath === normalized);
      if (entry) return entry[0];
    }
    return normalized;
  }

  function toLocalizedPath(path, language) {
    const englishPath = toEnglishPath(path);
    if (unlocalizedRoutes.includes(englishPath)) return englishPath;
    return routeMap[language][englishPath] || `/${language}/`;
  }

  function targetPathFor(language) {
    const current = normalizePath(window.location.pathname);
    return language === 'en' ? toEnglishPath(current) : toLocalizedPath(current, language);
  }

  function goToLanguage(language) {
    rememberLanguage(language);
    const target = targetPathFor(language);
    const nextUrl = `${target}${window.location.search}${window.location.hash}`;
    if (nextUrl !== `${window.location.pathname}${window.location.search}${window.location.hash}`) {
      window.location.assign(nextUrl);
    }
  }

  // The URL always wins: whatever language page someone opens is the one they
  // see. The saved preference is only applied on the bare homepage, where the
  // visitor hasn't expressed any language intent yet.
  const currentLanguage = getCurrentLanguage();
  const storedLanguage = getStoredLanguage();
  const isRootLanding = normalizePath(window.location.pathname) === '/';
  if (
    isRootLanding &&
    storedLanguage &&
    storedLanguage !== currentLanguage &&
    !window.location.hash.includes('no-lang-redirect')
  ) {
    window.location.replace(`/${storedLanguage}/${window.location.search}${window.location.hash}`);
    return;
  }

  window.addEventListener('DOMContentLoaded', () => {
    const switcher = document.querySelector('[data-language-switcher]');
    const select = document.querySelector('[data-language-select]');
    if (!select) return;
    const button = switcher ? switcher.querySelector('[data-language-button]') : null;
    const menu = switcher ? switcher.querySelector('[data-language-menu]') : null;
    const currentLabel = switcher ? switcher.querySelector('[data-language-current]') : null;
    const options = menu ? Array.from(menu.querySelectorAll('[data-language-option]')) : [];

    function setActiveLanguage(language) {
      select.value = language;
      if (currentLabel) {
        currentLabel.textContent = languageCodes[language] || language.toUpperCase();
      }
      if (button) {
        const baseLabel = button.getAttribute('data-label') || button.getAttribute('aria-label') || 'Language';
        if (!button.getAttribute('data-label')) button.setAttribute('data-label', baseLabel);
        button.setAttribute('aria-label', `${baseLabel}: ${languageNames[language] || language}`);
      }
      options.forEach((option) => {
        const isSelected = option.dataset.languageCode === language;
        option.setAttribute('aria-selected', isSelected ? 'true' : 'false');
        option.setAttribute('aria-current', isSelected ? 'true' : 'false');
        option.setAttribute(
          'aria-label',
          `${languageNames[option.dataset.languageCode] || option.dataset.languageCode}${isSelected ? ', current language' : ''}`
        );
      });
    }

    function closeMenu() {
      if (!switcher || !button || !menu) return;
      switcher.classList.remove('is-open');
      button.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }

    function openMenu() {
      if (!switcher || !button || !menu) return;
      switcher.classList.add('is-open');
      button.setAttribute('aria-expanded', 'true');
      menu.hidden = false;
    }

    function focusOption(language) {
      const option = options.find((item) => item.dataset.languageCode === language) || options[0];
      if (option) option.focus();
    }

    setActiveLanguage(getCurrentLanguage());

    select.addEventListener('change', () => {
      goToLanguage(select.value);
    });

    if (!button || !menu || !options.length) return;

    button.addEventListener('click', () => {
      const isOpen = button.getAttribute('aria-expanded') === 'true';
      if (isOpen) {
        closeMenu();
        return;
      }
      openMenu();
    });

    button.addEventListener('keydown', (event) => {
      if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp' && event.key !== 'Home' && event.key !== 'End') return;
      event.preventDefault();
      openMenu();
      if (event.key === 'Home') {
        options[0].focus();
      } else if (event.key === 'End') {
        options[options.length - 1].focus();
      } else {
        focusOption(getCurrentLanguage());
      }
    });

    options.forEach((option, index) => {
      option.addEventListener('click', () => {
        const language = option.dataset.languageCode;
        if (!supported.includes(language)) return;
        setActiveLanguage(language);
        closeMenu();
        goToLanguage(language);
      });

      option.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
          closeMenu();
          button.focus();
          return;
        }
        if (event.key === 'Home' || event.key === 'End') {
          event.preventDefault();
          options[event.key === 'Home' ? 0 : options.length - 1].focus();
          return;
        }
        if (event.key !== 'ArrowDown' && event.key !== 'ArrowUp') return;
        event.preventDefault();
        const offset = event.key === 'ArrowDown' ? 1 : -1;
        const nextIndex = (index + offset + options.length) % options.length;
        options[nextIndex].focus();
      });
    });

    document.addEventListener('click', (event) => {
      if (!switcher.contains(event.target)) closeMenu();
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') closeMenu();
    });
  });
})();
