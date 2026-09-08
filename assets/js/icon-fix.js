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
  const PARTNER_SELECTOR = '.weapon-guide-meta .weapon-guide-link:not([href*="../martial-paths/"])';
  const ICON_VERSION = 'icons-shared4';

  /* One canonical asset per weapon. Every weapon index card, weapon page,
     Martial Path card and Default Partner slot is normalized through this
     registry so changing an icon no longer leaves older copies elsewhere. */
  const ICONS = {
    'nameless-sword': {
      file: 'nameless-sword-user.svg',
      aliases: ['nameless-sword.png', 'nameless-sword.svg', 'nameless-sword-user.svg']
    },
    'nameless-spear': {
      file: 'nameless-spear.png',
      aliases: ['nameless-spear.png', 'nameless-spear.svg', 'nameless-spear-white.png', 'nameless-spear-clean.svg']
    },
    'strategic-sword': {
      file: 'strategic-sword-clean.svg',
      aliases: ['strategic-sword.png', 'strategic-sword.svg', 'strategic-sword-clean.svg']
    },
    'heavenquaker-spear': {
      file: 'heavenquaker-spear.png',
      aliases: ['heavenquaker-spear.png', 'heavenquaker-spear.svg']
    },
    'vernal-umbrella': {
      file: 'vernal-umbrella.svg',
      aliases: ['vernal-umbrella.png', 'vernal-umbrella.svg']
    },
    'inkwell-fan': {
      file: 'inkwell-fan.svg',
      aliases: ['inkwell-fan.png', 'inkwell-fan.svg']
    },
    'panacea-fan': {
      file: 'panacea-fan.svg',
      aliases: ['panacea-fan.png', 'panacea-fan.svg']
    },
    'soulshade-umbrella': {
      file: 'soulshade-umbrella.png',
      aliases: ['soulshade-umbrella.png', 'soulshade-umbrella.svg']
    },
    'infernal-twinblades': {
      file: 'infernal-twinblades.png',
      aliases: ['infernal-twinblades.png', 'infernal-twinblades.svg']
    },
    'mortal-rope-dart': {
      file: 'mortal-rope-dart.svg',
      aliases: ['mortal-rope-dart.png', 'mortal-rope-dart.svg']
    },
    'stormbreaker-spear': {
      file: 'stormbreaker-spear-clean.svg',
      aliases: ['stormbreaker-spear.png', 'stormbreaker-spear.svg', 'stormbreaker-spear-clean.svg']
    },
    'thundercry-blade': {
      file: 'thundercry-blade.png',
      aliases: ['thundercry-blade.png', 'thundercry-blade.svg']
    },
    'everspring-umbrella': {
      file: 'everspring-umbrella.png',
      aliases: ['everspring-umbrella.png', 'everspring-umbrella.svg']
    },
    'unfettered-rope-dart': {
      file: 'unfettered-rope-dart.png',
      aliases: ['unfettered-rope-dart.png', 'unfettered-rope-dart.svg']
    },
    'snowparting-blade': {
      file: 'snowparting-blade.png',
      aliases: ['snowparting-blade.png', 'snowparting-blade.svg']
    },
    'phalanxbane-blade': {
      file: 'phalanxbane-blade.png',
      aliases: ['phalanxbane-blade.png', 'phalanxbane-blade.svg']
    },
    'heavenwill-gauntlets': {
      file: 'heavenwill-gauntlets.svg',
      aliases: ['heavenwill-gauntlets.png', 'heavenwill-gauntlets.svg']
    },
    'skygrasp-rope-dart': {
      file: 'skygrasp-rope-dart.svg',
      aliases: ['skygrasp-rope-dart.png', 'skygrasp-rope-dart.svg']
    },
    'skystrike-gauntlets': {
      file: 'skystrike-gauntlets-flame.svg',
      aliases: ['skystrike-gauntlets.png', 'skystrike-gauntlets.svg', 'skystrike-gauntlets-flame.svg']
    },
    'riven-twinblades': {
      file: 'riven-twinblades.png',
      aliases: ['riven-twinblades.png', 'riven-twinblades.svg', 'riven-twinblades-fixed.png']
    }
  };

  const aliasToSlug = new Map();
  Object.entries(ICONS).forEach(([slug, meta]) => {
    meta.aliases.forEach(alias => aliasToSlug.set(alias, slug));
  });

  /* Expose the same registry to future page scripts instead of duplicating
     weapon-to-file maps in CSS or JavaScript. */
  window.WWMWeaponIcons = Object.freeze(
    Object.fromEntries(Object.entries(ICONS).map(([slug, meta]) => [slug, meta.file]))
  );

  const stripQuery = value => (value || '').split(/[?#]/, 1)[0];
  const basename = value => stripQuery(value).split('/').pop() || '';
  const dirname = value => {
    const clean = stripQuery(value);
    const slash = clean.lastIndexOf('/');
    return slash >= 0 ? clean.slice(0, slash + 1) : '';
  };

  const slugFromSource = src => aliasToSlug.get(basename(src)) || null;

  const slugFromHref = href => {
    const name = basename(href).replace(/\.html$/i, '');
    return Object.prototype.hasOwnProperty.call(ICONS, name) ? name : null;
  };

  const canonicalSource = (slug, currentSrc = '') => {
    const meta = ICONS[slug];
    if (!meta) return null;
    const prefix = dirname(currentSrc);
    if (prefix) return `${prefix}${meta.file}?v=${ICON_VERSION}`;
    const root = document.body?.dataset.root || '../../';
    return `${root}assets/icons/martial-arts/${meta.file}?v=${ICON_VERSION}`;
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

  const markLoaded = img => {
    const frame = img.closest(FRAME_SELECTOR) || img.closest('.shared-weapon-icon');
    if (!frame || !img.naturalWidth) return;
    img.style.display = '';
    frame.classList.add('has-real-icon');
    frame.querySelectorAll('.icon-fallback,.weapon-guide-fallback,.martial-path-fallback').forEach(el => el.remove());
  };

  const removeBroken = img => {
    const frame = img.closest(FRAME_SELECTOR) || img.closest('.shared-weapon-icon');
    frame?.classList.remove('has-real-icon');
    img.remove();
  };

  const processImage = (img, explicitSlug = null) => {
    if (!img) return;

    const frame = img.closest(FRAME_SELECTOR) || img.closest('.shared-weapon-icon');
    if (!frame) return;

    img.removeAttribute('onerror');
    img.style.display = '';

    const current = img.getAttribute('src') || '';
    const slug = explicitSlug || img.dataset.weaponSlug || slugFromSource(current);
    if (slug && ICONS[slug]) {
      img.dataset.weaponSlug = slug;
      const canonical = canonicalSource(slug, current);
      if (canonical && canonical !== current) img.setAttribute('src', canonical);
    }

    if (img.dataset.iconFixBound !== '1') {
      img.dataset.iconFixBound = '1';
      img.addEventListener('load', () => markLoaded(img));
      img.addEventListener('error', () => removeBroken(img), { once: true });
    }

    if (img.complete) img.naturalWidth ? markLoaded(img) : removeBroken(img);
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
    img.dataset.weaponSlug = slug;
    const canonical = canonicalSource(slug);
    if (canonical && img.getAttribute('src') !== canonical) img.setAttribute('src', canonical);
    processImage(img, slug);
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
    const queueCleanup = () => {
      if (cleanupQueued) return;
      cleanupQueued = true;
      queueMicrotask(() => {
        cleanupQueued = false;
        removeDuplicateEnhancements();
        document.querySelectorAll(PARTNER_SELECTOR).forEach(ensurePartnerIcon);
      });
    };

    const observer = new MutationObserver(records => {
      for (const record of records) {
        record.addedNodes.forEach(processNode);
      }
      queueCleanup();
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
