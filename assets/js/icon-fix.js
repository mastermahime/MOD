(() => {
  const FRAME_SELECTORS = [
    '.wiki-icon-frame',
    '.weapon-guide-icon',
    '.weapon-path-icon',
    '.skill-path-icon',
    '.martial-path-icon'
  ];
  const FRAME_SELECTOR = FRAME_SELECTORS.join(', ');
  const IMG_SELECTOR = FRAME_SELECTORS.map(selector => `${selector} img`).join(', ');

  const ICONS = [
    ['strategic-sword', 'strategic-sword.png?v=icons-universal3'],
    ['infernal-twinblades', 'infernal-twinblades.png?v=icons-universal3'],
    ['riven-twinblades', 'riven-twinblades.png?v=icons-universal3'],
    ['inkwell-fan', 'inkwell-fan.svg?v=icons-universal3'],
    ['panacea-fan', 'panacea-fan.svg?v=icons-universal3'],
    ['vernal-umbrella', 'vernal-umbrella.svg?v=icons-universal3'],
    ['soulshade-umbrella', 'soulshade-umbrella.png?v=icons-universal3'],
    ['everspring-umbrella', 'everspring-umbrella.png?v=icons-universal3'],
    ['mortal-rope-dart', 'mortal-rope-dart.svg?v=icons-universal3'],
    ['unfettered-rope-dart', 'unfettered-rope-dart.png?v=icons-universal3'],
    ['skygrasp-rope-dart', 'skygrasp-rope-dart.svg?v=icons-universal3'],
    ['heavenwill-gauntlets', 'heavenwill-gauntlets.svg?v=icons-universal3'],
    ['skystrike-gauntlets', 'skystrike-gauntlets-flame.svg?v=icons-universal3'],
    ['thundercry-blade', 'thundercry-blade.png?v=icons-universal3'],
    ['phalanxbane-blade', 'phalanxbane-blade.png?v=icons-universal3'],
    ['nameless-spear', 'nameless-spear.png?v=icons-universal3'],
    ['heavenquaker-spear', 'heavenquaker-spear.png?v=icons-universal3'],
    ['stormbreaker-spear', 'stormbreaker-spear-clean.svg?v=icons-universal3'],
    ['nameless-sword', 'nameless-sword.png?v=icons-universal3'],
    ['snowparting-blade', 'snowparting-blade.png?v=icons-universal3']
  ];

  const escapeRegex = value => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

  const exactMainPattern = (slug) => {
    if (slug === 'skystrike-gauntlets') return /skystrike-gauntlets(?:-flame)?\.(?:png|svg)(?:\?[^#]*)?/;
    if (slug === 'stormbreaker-spear') return /stormbreaker-spear(?:-clean)?\.(?:png|svg)(?:\?[^#]*)?/;
    if (slug === 'nameless-spear') return /nameless-spear(?:-clean)?\.(?:png|svg)(?:\?[^#]*)?/;
    return new RegExp(`${escapeRegex(slug)}\\.(?:png|svg)(?:\\?[^#]*)?`);
  };

  const normalizeSource = (src) => {
    if (!src) return src;
    for (const [slug, replacement] of ICONS) {
      const pattern = exactMainPattern(slug);
      if (pattern.test(src)) return src.replace(pattern, replacement);
    }
    return src;
  };

  const fallbackSource = (src) => {
    if (!src) return null;
    for (const [slug, replacement] of ICONS) {
      if (!src.includes(slug)) continue;
      const filePattern = new RegExp(`${escapeRegex(slug)}[^/]*\\.(?:png|svg)(?:\\?[^#]*)?`);
      if (filePattern.test(src)) return src.replace(filePattern, replacement);
    }
    return null;
  };

  const removeDuplicateEnhancements = () => {
    const keepFirst = selector => {
      const nodes = Array.from(document.querySelectorAll(selector));
      nodes.slice(1).forEach(node => node.remove());
    };

    keepFirst('.weapon-guide-quick');
    keepFirst('#weapon-builds');

    const guideStyles = Array.from(document.querySelectorAll('link[rel="stylesheet"][href*="weapon-guides.css"]'));
    guideStyles.slice(1).forEach(link => link.remove());
  };

  const processImage = (img) => {
    if (!img || img.dataset.iconFixBound === '1') return;
    img.dataset.iconFixBound = '1';

    const frame = img.closest(FRAME_SELECTOR);
    if (!frame) return;

    /* Inline onerror handlers on older pages hide the image before a fallback
       can be substituted. The global fixer owns error handling now. */
    img.removeAttribute('onerror');
    img.style.display = '';

    const current = img.getAttribute('src') || '';
    const normalized = normalizeSource(current);
    if (normalized && normalized !== current) img.setAttribute('src', normalized);

    const loaded = () => {
      if (!img.naturalWidth) return;
      img.style.display = '';
      frame.classList.add('has-real-icon');
      frame.querySelectorAll('.icon-fallback,.weapon-guide-fallback,.martial-path-fallback').forEach(el => el.remove());
    };

    const removeBroken = () => {
      frame.classList.remove('has-real-icon');
      img.remove();
    };

    const failed = () => {
      if (img.dataset.iconFallbackTried !== '1') {
        const fallback = fallbackSource(img.getAttribute('src') || current);
        if (fallback && fallback !== img.getAttribute('src')) {
          img.dataset.iconFallbackTried = '1';
          img.style.display = '';
          img.addEventListener('error', removeBroken, { once: true });
          img.setAttribute('src', fallback);
          return;
        }
      }
      removeBroken();
    };

    img.addEventListener('load', loaded);
    img.addEventListener('error', failed, { once: true });
    if (img.complete) img.naturalWidth ? loaded() : failed();
  };

  const scan = (root = document) => root.querySelectorAll?.(IMG_SELECTOR).forEach(processImage);

  const start = () => {
    removeDuplicateEnhancements();
    scan();

    let cleanupQueued = false;
    const queueCleanup = () => {
      if (cleanupQueued) return;
      cleanupQueued = true;
      queueMicrotask(() => {
        cleanupQueued = false;
        removeDuplicateEnhancements();
      });
    };

    const observer = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches?.(IMG_SELECTOR)) processImage(node);
          scan(node);
        }
      }
      queueCleanup();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
