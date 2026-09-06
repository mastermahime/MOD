(() => {
  const FRAME_SELECTOR = [
    '.wiki-icon-frame',
    '.weapon-guide-icon',
    '.weapon-path-icon',
    '.skill-path-icon',
    '.martial-path-icon'
  ].join(', ');
  const IMG_SELECTOR = `${FRAME_SELECTOR} img`;

  const ICONS = [
    [/strategic-sword\.(?:png|svg)(?:\?[^#]*)?/, 'strategic-sword.png?v=icons-universal1'],
    [/infernal-twinblades\.(?:png|svg)(?:\?[^#]*)?/, 'infernal-twinblades.png?v=icons-universal1'],
    [/riven-twinblades\.(?:png|svg)(?:\?[^#]*)?/, 'riven-twinblades.png?v=icons-universal1'],
    [/inkwell-fan\.(?:png|svg)(?:\?[^#]*)?/, 'inkwell-fan.svg?v=icons-universal1'],
    [/panacea-fan\.(?:png|svg)(?:\?[^#]*)?/, 'panacea-fan.svg?v=icons-universal1'],
    [/vernal-umbrella\.(?:png|svg)(?:\?[^#]*)?/, 'vernal-umbrella.svg?v=icons-universal1'],
    [/soulshade-umbrella\.(?:png|svg)(?:\?[^#]*)?/, 'soulshade-umbrella.png?v=icons-universal1'],
    [/everspring-umbrella\.(?:png|svg)(?:\?[^#]*)?/, 'everspring-umbrella.png?v=icons-universal1'],
    [/mortal-rope-dart\.(?:png|svg)(?:\?[^#]*)?/, 'mortal-rope-dart.svg?v=icons-universal1'],
    [/unfettered-rope-dart\.(?:png|svg)(?:\?[^#]*)?/, 'unfettered-rope-dart.png?v=icons-universal1'],
    [/skygrasp-rope-dart\.(?:png|svg)(?:\?[^#]*)?/, 'skygrasp-rope-dart.svg?v=icons-universal1'],
    [/heavenwill-gauntlets\.(?:png|svg)(?:\?[^#]*)?/, 'heavenwill-gauntlets.svg?v=icons-universal1'],
    [/skystrike-gauntlets(?:-flame)?\.(?:png|svg)(?:\?[^#]*)?/, 'skystrike-gauntlets-flame.svg?v=icons-universal1'],
    [/thundercry-blade\.(?:png|svg)(?:\?[^#]*)?/, 'thundercry-blade.png?v=icons-universal1'],
    [/phalanxbane-blade\.(?:png|svg)(?:\?[^#]*)?/, 'phalanxbane-blade.png?v=icons-universal1'],
    [/nameless-spear(?:-clean)?\.(?:png|svg)(?:\?[^#]*)?/, 'nameless-spear.png?v=icons-universal1'],
    [/heavenquaker-spear\.(?:png|svg)(?:\?[^#]*)?/, 'heavenquaker-spear.png?v=icons-universal1'],
    [/stormbreaker-spear(?:-clean)?\.(?:png|svg)(?:\?[^#]*)?/, 'stormbreaker-spear-clean.svg?v=icons-universal1'],
    [/nameless-sword\.(?:png|svg)(?:\?[^#]*)?/, 'nameless-sword.png?v=icons-universal1'],
    [/snowparting-blade\.(?:png|svg)(?:\?[^#]*)?/, 'snowparting-blade.png?v=icons-universal1']
  ];

  const normalizeSource = (src) => {
    if (!src) return src;
    for (const [pattern, replacement] of ICONS) {
      if (pattern.test(src)) return src.replace(pattern, replacement);
    }
    return src;
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
    const failed = () => {
      frame.classList.remove('has-real-icon');
      img.remove();
    };

    img.addEventListener('load', loaded, { once: true });
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
