(() => {
  'use strict';

  const ICON_VERSION = 'icons-optical-20260908';
  const FRAME_SELECTORS = [
    '.wiki-icon-frame',
    '.weapon-guide-icon',
    '.weapon-path-icon',
    '.skill-path-icon',
    '.martial-path-icon',
    '.shared-weapon-icon'
  ];
  const FRAME_SELECTOR = FRAME_SELECTORS.join(', ');
  const IMG_SELECTOR = FRAME_SELECTORS.map(selector => `${selector} img`).join(', ');
  const PARTNER_SELECTOR = '.weapon-guide-meta .weapon-guide-link:not([href*="../martial-paths/"])';

  /*
   * Canonical weapon icon registry.
   *
   * opticalScale is intentionally hand-tuned instead of derived from alpha
   * bounds. Different silhouettes carry different visual weight even when
   * their mathematical bounds are identical. opticalX / opticalY are kept in
   * the registry so a source can be optically re-centered without page CSS.
   */
  const ICONS = {
    'nameless-sword': {
      file: 'nameless-sword-user.svg',
      aliases: ['nameless-sword.png', 'nameless-sword.svg', 'nameless-sword-user.svg'],
      opticalScale: 0.78, opticalX: 0, opticalY: 0
    },
    'nameless-spear': {
      file: 'nameless-spear.png',
      aliases: ['nameless-spear.png', 'nameless-spear.svg', 'nameless-spear-white.png', 'nameless-spear-clean.svg'],
      opticalScale: 0.86, opticalX: 0, opticalY: 0
    },
    'strategic-sword': {
      file: 'strategic-sword-clean.svg',
      aliases: ['strategic-sword.png', 'strategic-sword.svg', 'strategic-sword-clean.svg'],
      opticalScale: 0.82, opticalX: 0, opticalY: 0
    },
    'heavenquaker-spear': {
      file: 'heavenquaker-spear.png',
      aliases: ['heavenquaker-spear.png', 'heavenquaker-spear.svg'],
      opticalScale: 0.84, opticalX: 0, opticalY: 0
    },
    'vernal-umbrella': {
      file: 'vernal-umbrella.svg',
      aliases: ['vernal-umbrella.png', 'vernal-umbrella.svg'],
      opticalScale: 0.94, opticalX: 0, opticalY: 0
    },
    'inkwell-fan': {
      file: 'inkwell-fan.svg',
      aliases: ['inkwell-fan.png', 'inkwell-fan.svg'],
      opticalScale: 0.92, opticalX: 0, opticalY: 0
    },
    'panacea-fan': {
      file: 'panacea-fan.svg',
      aliases: ['panacea-fan.png', 'panacea-fan.svg'],
      opticalScale: 0.92, opticalX: 0, opticalY: 0
    },
    'soulshade-umbrella': {
      file: 'soulshade-umbrella.png',
      aliases: ['soulshade-umbrella.png', 'soulshade-umbrella.svg'],
      opticalScale: 0.90, opticalX: 0, opticalY: 0
    },
    'infernal-twinblades': {
      file: 'infernal-twinblades.png',
      aliases: ['infernal-twinblades.png', 'infernal-twinblades.svg'],
      opticalScale: 0.88, opticalX: 0, opticalY: 0
    },
    'mortal-rope-dart': {
      file: 'mortal-rope-dart.svg',
      aliases: ['mortal-rope-dart.png', 'mortal-rope-dart.svg'],
      opticalScale: 0.94, opticalX: 0, opticalY: 0
    },
    'stormbreaker-spear': {
      file: 'stormbreaker-spear-clean.svg',
      aliases: ['stormbreaker-spear.png', 'stormbreaker-spear.svg', 'stormbreaker-spear-clean.svg'],
      opticalScale: 0.92, opticalX: 0, opticalY: 0
    },
    'thundercry-blade': {
      file: 'thundercry-blade.png',
      aliases: ['thundercry-blade.png', 'thundercry-blade.svg'],
      opticalScale: 0.88, opticalX: 0, opticalY: 0
    },
    'everspring-umbrella': {
      file: 'everspring-umbrella.png',
      aliases: ['everspring-umbrella.png', 'everspring-umbrella.svg'],
      opticalScale: 0.90, opticalX: 0, opticalY: 0
    },
    'unfettered-rope-dart': {
      file: 'unfettered-rope-dart.png',
      aliases: ['unfettered-rope-dart.png', 'unfettered-rope-dart.svg'],
      opticalScale: 0.89, opticalX: 0, opticalY: 0
    },
    'snowparting-blade': {
      file: 'snowparting-blade.png',
      aliases: ['snowparting-blade.png', 'snowparting-blade.svg'],
      opticalScale: 0.88, opticalX: 0, opticalY: 0
    },
    'phalanxbane-blade': {
      file: 'phalanxbane-blade.png',
      aliases: ['phalanxbane-blade.png', 'phalanxbane-blade.svg'],
      opticalScale: 0.87, opticalX: 0, opticalY: 0
    },
    'heavenwill-gauntlets': {
      file: 'heavenwill-gauntlets.svg',
      aliases: ['heavenwill-gauntlets.png', 'heavenwill-gauntlets.svg'],
      opticalScale: 0.93, opticalX: 0, opticalY: 0
    },
    'skygrasp-rope-dart': {
      file: 'skygrasp-rope-dart.svg',
      aliases: ['skygrasp-rope-dart.png', 'skygrasp-rope-dart.svg'],
      opticalScale: 0.94, opticalX: 0, opticalY: 0
    },
    'skystrike-gauntlets': {
      file: 'skystrike-gauntlets-flame.svg',
      aliases: ['skystrike-gauntlets.png', 'skystrike-gauntlets.svg', 'skystrike-gauntlets-flame.svg'],
      opticalScale: 0.92, opticalX: 0, opticalY: 0
    },
    'riven-twinblades': {
      file: 'riven-twinblades.png',
      aliases: ['riven-twinblades.png', 'riven-twinblades.svg', 'riven-twinblades-fixed.png'],
      opticalScale: 0.88, opticalX: 0, opticalY: 0
    }
  };

  if (window.__WWMWeaponIconObserver) {
    try { window.__WWMWeaponIconObserver.disconnect(); } catch (_) {}
  }
  if (window.__WWMWeaponIconSystemVersion === ICON_VERSION) return;
  window.__WWMWeaponIconSystemVersion = ICON_VERSION;
  window.WWMWeaponIconVersion = ICON_VERSION;

  const aliasToSlug = new Map();
  Object.entries(ICONS).forEach(([slug, meta]) => {
    aliasToSlug.set(meta.file, slug);
    meta.aliases.forEach(alias => aliasToSlug.set(alias, slug));
  });

  const publicRegistry = Object.freeze(Object.fromEntries(
    Object.entries(ICONS).map(([slug, meta]) => [slug, Object.freeze({
      file: meta.file,
      opticalScale: meta.opticalScale,
      opticalX: meta.opticalX,
      opticalY: meta.opticalY
    })])
  ));
  window.WWMWeaponIconRegistry = publicRegistry;
  /* Backwards-compatible file lookup for existing consumers. */
  window.WWMWeaponIcons = Object.freeze(Object.fromEntries(
    Object.entries(ICONS).map(([slug, meta]) => [slug, meta.file])
  ));

  const stripQuery = value => (value || '').split(/[?#]/, 1)[0];
  const basename = value => stripQuery(value).split('/').pop() || '';
  const dirname = value => {
    const clean = stripQuery(value);
    const slash = clean.lastIndexOf('/');
    return slash >= 0 ? clean.slice(0, slash + 1) : '';
  };
  const slugFromSource = src => aliasToSlug.get(basename(src)) || null;
  const slugFromHref = href => {
    const slug = basename(href).replace(/\.html$/i, '');
    return Object.prototype.hasOwnProperty.call(ICONS, slug) ? slug : null;
  };

  const canonicalSource = (slug, currentSrc = '') => {
    const meta = ICONS[slug];
    if (!meta) return null;
    const currentDir = dirname(currentSrc);
    if (currentDir) return `${currentDir}${meta.file}?v=${ICON_VERSION}`;
    const root = document.body?.dataset.root || '../../';
    return `${root}assets/icons/martial-arts/${meta.file}?v=${ICON_VERSION}`;
  };

  const applyOptics = (frame, img, slug) => {
    const meta = ICONS[slug];
    if (!frame || !img || !meta) return;
    frame.classList.add('shared-weapon-frame');
    frame.dataset.weaponSlug = slug;
    frame.style.setProperty('--weapon-icon-scale', String(meta.opticalScale ?? 1));
    frame.style.setProperty('--weapon-icon-x', `${meta.opticalX ?? 0}%`);
    frame.style.setProperty('--weapon-icon-y', `${meta.opticalY ?? 0}%`);
    img.dataset.weaponSlug = slug;
  };

  const markLoaded = (img, slug) => {
    const frame = img.closest(FRAME_SELECTOR);
    if (!frame || !img.naturalWidth || !slug) return;
    applyOptics(frame, img, slug);
    img.style.display = '';
    frame.classList.add('has-real-icon');
    frame.querySelectorAll('.icon-fallback,.weapon-guide-fallback,.martial-path-fallback').forEach(el => el.remove());
  };

  const removeBroken = img => {
    const frame = img.closest(FRAME_SELECTOR);
    frame?.classList.remove('has-real-icon');
  };

  const processImage = (img, explicitSlug = null) => {
    if (!img) return;
    const frame = img.closest(FRAME_SELECTOR);
    if (!frame) return;

    const current = img.getAttribute('src') || '';
    const slug = explicitSlug || img.dataset.weaponSlug || slugFromSource(current);
    /* Critical: non-weapon skill/path artwork is left completely alone. */
    if (!slug || !ICONS[slug]) return;

    applyOptics(frame, img, slug);
    img.removeAttribute('onerror');
    img.style.display = '';

    const canonical = canonicalSource(slug, current);
    if (canonical && img.getAttribute('src') !== canonical) img.setAttribute('src', canonical);

    if (img.dataset.iconFixBound !== ICON_VERSION) {
      img.dataset.iconFixBound = ICON_VERSION;
      img.addEventListener('load', () => markLoaded(img, slug));
      img.addEventListener('error', () => removeBroken(img));
    }

    if (img.complete && img.naturalWidth) markLoaded(img, slug);
  };

  const ensurePartnerIcon = link => {
    if (!link) return;
    const slug = slugFromHref(link.getAttribute('href') || '');
    if (!slug) return;

    link.classList.add('has-shared-weapon-icon');
    let holder = link.querySelector(':scope > .shared-weapon-icon');
    if (!holder) {
      holder = document.createElement('span');
      holder.className = 'shared-weapon-icon';
      holder.setAttribute('aria-hidden', 'true');
      const img = document.createElement('img');
      img.alt = '';
      img.dataset.weaponSlug = slug;
      holder.appendChild(img);
      link.prepend(holder);
    }

    const img = holder.querySelector('img');
    if (!img) return;
    applyOptics(holder, img, slug);
    processImage(img, slug);
  };

  const removeDuplicateEnhancements = () => {
    const keepFirst = selector => {
      const nodes = Array.from(document.querySelectorAll(selector));
      nodes.slice(1).forEach(node => node.remove());
    };
    keepFirst('.weapon-guide-quick');
    keepFirst('#weapon-builds');
    const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"][href*="weapon-guides.css"]'));
    styles.slice(1).forEach(link => link.remove());
  };

  const scan = (root = document) => {
    root.querySelectorAll?.(IMG_SELECTOR).forEach(img => processImage(img));
    root.querySelectorAll?.(PARTNER_SELECTOR).forEach(ensurePartnerIcon);
  };

  const processNode = node => {
    if (node.nodeType !== 1) return;
    if (node.matches?.(IMG_SELECTOR)) processImage(node);
    if (node.matches?.(PARTNER_SELECTOR)) ensurePartnerIcon(node);
    scan(node);
  };

  const start = () => {
    removeDuplicateEnhancements();
    scan();

    let cleanupQueued = false;
    const observer = new MutationObserver(records => {
      for (const record of records) record.addedNodes.forEach(processNode);
      if (cleanupQueued) return;
      cleanupQueued = true;
      queueMicrotask(() => {
        cleanupQueued = false;
        removeDuplicateEnhancements();
        document.querySelectorAll(PARTNER_SELECTOR).forEach(ensurePartnerIcon);
      });
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
    window.__WWMWeaponIconObserver = observer;
  };

  window.WWMWeaponIconSystem = Object.freeze({
    version: ICON_VERSION,
    registry: publicRegistry,
    sourceFor: canonicalSource,
    normalize: scan
  });

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
