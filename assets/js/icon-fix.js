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
    ['strategic-sword', 'strategic-sword.png?v=icons-universal1'],
    ['infernal-twinblades', 'infernal-twinblades.png?v=icons-universal1'],
    ['riven-twinblades', 'riven-twinblades.png?v=icons-universal1'],
    ['inkwell-fan', 'inkwell-fan.svg?v=icons-universal1'],
    ['panacea-fan', 'panacea-fan.svg?v=icons-universal1'],
    ['vernal-umbrella', 'vernal-umbrella.svg?v=icons-universal1'],
    ['soulshade-umbrella', 'soulshade-umbrella.png?v=icons-universal1'],
    ['everspring-umbrella', 'everspring-umbrella.png?v=icons-universal1'],
    ['mortal-rope-dart', 'mortal-rope-dart.svg?v=icons-universal1'],
    ['unfettered-rope-dart', 'unfettered-rope-dart.png?v=icons-universal1'],
    ['skygrasp-rope-dart', 'skygrasp-rope-dart.svg?v=icons-universal1'],
    ['heavenwill-gauntlets', 'heavenwill-gauntlets.svg?v=icons-universal1'],
    ['skystrike-gauntlets', 'skystrike-gauntlets-flame.svg?v=icons-universal1'],
    ['thundercry-blade', 'thundercry-blade.png?v=icons-universal1'],
    ['phalanxbane-blade', 'phalanxbane-blade.png?v=icons-universal1'],
    ['nameless-spear', 'nameless-spear.png?v=icons-universal1'],
    ['heavenquaker-spear', 'heavenquaker-spear.png?v=icons-universal1'],
    ['stormbreaker-spear', 'stormbreaker-spear-clean.svg?v=icons-universal1'],
    ['nameless-sword', 'nameless-sword.png?v=icons-universal1'],
    ['snowparting-blade', 'snowparting-blade.png?v=icons-universal1']
  ];

  const exactMainPattern = (slug) => {
    if (slug === 'skystrike-gauntlets') return /skystrike-gauntlets(?:-flame)?\.(?:png|svg)(?:\?[^#]*)?/;
    if (slug === 'stormbreaker-spear') return /stormbreaker-spear(?:-clean)?\.(?:png|svg)(?:\?[^#]*)?/;
    if (slug === 'nameless-spear') return /nameless-spear(?:-clean)?\.(?:png|svg)(?:\?[^#]*)?/;
    return new RegExp(`${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\.(?:png|svg)(?:\\?[^#]*)?`);
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
      const filePattern = new RegExp(`${slug.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}[^/]*\\.(?:png|svg)(?:\\?[^#]*)?`);
      if (filePattern.test(src)) return src.replace(filePattern, replacement);
    }
    return null;
  };

  const processImage = (img) => {
    if (!img || img.dataset.iconFixBound === '1') return;
    img.dataset.iconFixBound = '1';

    const frame = img.closest(FRAME_SELECTOR);
    if (!frame) return;

    const current = img.getAttribute('src') || '';
    const normalized = normalizeSource(current);
    if (normalized && normalized !== current) img.setAttribute('src', normalized);

    const loaded = () => {
      if (!img.naturalWidth) return;
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
    scan();
    const observer = new MutationObserver(records => {
      for (const record of records) {
        for (const node of record.addedNodes) {
          if (node.nodeType !== 1) continue;
          if (node.matches?.(IMG_SELECTOR)) processImage(node);
          scan(node);
        }
      }
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
