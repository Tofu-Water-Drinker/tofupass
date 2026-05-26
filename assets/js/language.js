(function () {
  const storageKey = 'tofupass-language';
  const cookieName = 'tofupass_language';
  const supported = ['en', 'es', 'pt', 'fr', 'de', 'ja', 'zh-cn', 'ar', 'id', 'hi', 'ru'];
  const routeMap = {
    es: {
      '/': '/es/',
      '/passphrases/': '/es/passphrases/',
      '/stresstest/': '/es/stresstest/',
      '/good/': '/es/good/',
      '/api/': '/es/api/',
      '/about/': '/es/about/',
      '/why/': '/es/why/',
      '/privacy/': '/es/privacy/',
      '/miso/': '/es/miso/',
    },
    pt: {
      '/': '/pt/',
      '/passphrases/': '/pt/passphrases/',
      '/stresstest/': '/pt/stresstest/',
      '/good/': '/pt/good/',
      '/api/': '/pt/api/',
      '/about/': '/pt/about/',
      '/why/': '/pt/why/',
      '/privacy/': '/pt/privacy/',
      '/miso/': '/pt/miso/',
    },
    fr: {
      '/': '/fr/', '/passphrases/': '/fr/passphrases/', '/stresstest/': '/fr/stresstest/', '/good/': '/fr/good/', '/api/': '/fr/api/', '/about/': '/fr/about/', '/why/': '/fr/why/', '/privacy/': '/fr/privacy/', '/miso/': '/fr/miso/',
    },
    de: {
      '/': '/de/', '/passphrases/': '/de/passphrases/', '/stresstest/': '/de/stresstest/', '/good/': '/de/good/', '/api/': '/de/api/', '/about/': '/de/about/', '/why/': '/de/why/', '/privacy/': '/de/privacy/', '/miso/': '/de/miso/',
    },
    ja: {
      '/': '/ja/', '/passphrases/': '/ja/passphrases/', '/stresstest/': '/ja/stresstest/', '/good/': '/ja/good/', '/api/': '/ja/api/', '/about/': '/ja/about/', '/why/': '/ja/why/', '/privacy/': '/ja/privacy/', '/miso/': '/ja/miso/',
    },
    'zh-cn': {
      '/': '/zh-cn/', '/passphrases/': '/zh-cn/passphrases/', '/stresstest/': '/zh-cn/stresstest/', '/good/': '/zh-cn/good/', '/api/': '/zh-cn/api/', '/about/': '/zh-cn/about/', '/why/': '/zh-cn/why/', '/privacy/': '/zh-cn/privacy/', '/miso/': '/zh-cn/miso/',
    },
    ar: {
      '/': '/ar/', '/passphrases/': '/ar/passphrases/', '/stresstest/': '/ar/stresstest/', '/good/': '/ar/good/', '/api/': '/ar/api/', '/about/': '/ar/about/', '/why/': '/ar/why/', '/privacy/': '/ar/privacy/', '/miso/': '/ar/miso/',
    },
    id: {
      '/': '/id/', '/passphrases/': '/id/passphrases/', '/stresstest/': '/id/stresstest/', '/good/': '/id/good/', '/api/': '/id/api/', '/about/': '/id/about/', '/why/': '/id/why/', '/privacy/': '/id/privacy/', '/miso/': '/id/miso/',
    },
    hi: {
      '/': '/hi/', '/passphrases/': '/hi/passphrases/', '/stresstest/': '/hi/stresstest/', '/good/': '/hi/good/', '/api/': '/hi/api/', '/about/': '/hi/about/', '/why/': '/hi/why/', '/privacy/': '/hi/privacy/', '/miso/': '/hi/miso/',
    },
    ru: {
      '/': '/ru/', '/passphrases/': '/ru/passphrases/', '/stresstest/': '/ru/stresstest/', '/good/': '/ru/good/', '/api/': '/ru/api/', '/about/': '/ru/about/', '/why/': '/ru/why/', '/privacy/': '/ru/privacy/', '/miso/': '/ru/miso/',
    },
  };
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

  const currentLanguage = getCurrentLanguage();
  const storedLanguage = getStoredLanguage();
  if (storedLanguage && storedLanguage !== currentLanguage && !window.location.hash.includes('no-lang-redirect')) {
    const target = targetPathFor(storedLanguage);
    if (target !== normalizePath(window.location.pathname)) {
      window.location.replace(`${target}${window.location.search}${window.location.hash}`);
      return;
    }
  } else {
    rememberLanguage(currentLanguage);
  }

  window.addEventListener('DOMContentLoaded', () => {
    const select = document.querySelector('[data-language-select]');
    if (!select) return;
    select.value = getCurrentLanguage();
    select.addEventListener('change', () => {
      goToLanguage(select.value);
    });
  });
})();
