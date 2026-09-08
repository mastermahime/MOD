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
  const ICON_VERSION = 'icons-autofit7';
  const AUTO_PADDING = 0.06;
  const TARGET_VISIBLE_OCCUPANCY = 0.72;
  const MIN_AUTO_SCALE = 0.70;
  const MAX_AUTO_SCALE = 1.22;

  /* One canonical asset per weapon. Every weapon index card, weapon page,
     Martial Path card and Default Partner slot is normalized through this
     registry. Manual scale is now only a fallback: normal sizing is calculated
     from the actual visible alpha bounds inside each icon file. */
  const ICONS = {
    'nameless-sword': {
      file: 'nameless-sword-user.svg',
      aliases: ['nameless-sword.png', 'nameless-sword.svg', 'nameless-sword-user.svg'],
      scale: 0.92
    },
    'nameless-spear': {
      file: 'nameless-spear.png',
      aliases: ['nameless-spear.png', 'nameless-spear.svg', 'nameless-spear-white.png', 'nameless-spear-clean.svg'],
      scale: 0.86
    },
    'strategic-sword': {
      file: 'strategic-sword-clean.svg',
      aliases: ['strategic-sword.png', 'strategic-sword.svg', 'strategic-sword-clean.svg'],
      scale: 0.82
    },
    'heavenquaker-spear': {
      file: 'heavenquaker-spear.png',
      aliases: ['heavenquaker-spear.png', 'heavenquaker-spear.svg'],
      scale: 0.84
    },
    'vernal-umbrella': {
      file: 'vernal-umbrella.svg',
      aliases: ['vernal-umbrella.png', 'vernal-umbrella.svg'],
      scale: 0.96
    },
    'inkwell-fan': {
      file: 'inkwell-fan.svg',
      aliases: ['inkwell-fan.png', 'inkwell-fan.svg'],
      scale: 0.95
    },
    'panacea-fan': {
      file: 'panacea-fan.svg',
      aliases: ['panacea-fan.png', 'panacea-fan.svg'],
      scale: 0.95
    },
    'soulshade-umbrella': {
      file: 'soulshade-umbrella.png',
      aliases: ['soulshade-umbrella.png', 'soulshade-umbrella.svg'],
      scale: 0.92
    },
    'infernal-twinblades': {
      file: 'infernal-twinblades.png',
      aliases: ['infernal-twinblades.png', 'infernal-twinblades.svg'],
      scale: 0.90
    },
    'mortal-rope-dart': {
      file: 'mortal-rope-dart.svg',
      aliases: ['mortal-rope-dart.png', 'mortal-rope-dart.svg'],
      scale: 0.96
    },
    'stormbreaker-spear': {
      file: 'stormbreaker-spear-clean.svg',
      aliases: ['stormbreaker-spear.png', 'stormbreaker-spear.svg', 'stormbreaker-spear-clean.svg'],
      scale: 0.95
    },
    'thundercry-blade': {
      file: 'thundercry-blade.png',
      aliases: ['thundercry-blade.png', 'thundercry-blade.svg'],
      scale: 0.90
    },
    'everspring-umbrella': {
      file: 'everspring-umbrella.png',
      aliases: ['everspring-umbrella.png', 'everspring-umbrella.svg'],
      scale: 0.92
    },
    'unfettered-rope-dart': {
      file: 'unfettered-rope-dart.png',
      aliases: ['unfettered-rope-dart.png', 'unfettered-rope-dart.svg'],
      scale: 0.90
    },
    'snowparting-blade': {
      file: 'snowparting-blade.png',
      aliases: ['snowparting-blade.png', 'snowparting-blade.svg'],
      scale: 0.90
    },
    'phalanxbane-blade': {
      file: 'phalanxbane-blade.png',
      aliases: ['phalanxbane-blade.png', 'phalanxbane-blade.svg'],
      scale: 0.89
    },
    'heavenwill-gauntlets': {
      file: 'heavenwill-gauntlets.svg',
      aliases: ['heavenwill-gauntlets.png', 'heavenwill-gauntlets.svg'],
      scale: 0.96
    },
    'skygrasp-rope-dart': {
      file: 'skygrasp-rope-dart.svg',
      aliases: ['skygrasp-rope-dart.png', 'skygrasp-rope-dart.svg'],
      scale: 0.96
    },
    'skystrike-gauntlets': {
      file: 'skystrike-gauntlets-flame.svg',
      aliases: ['skystrike-gauntlets.png', 'skystrike-gauntlets.svg', 'skystrike-gauntlets-flame.svg'],
      scale: 0.95
    },
    'riven-twinblades': {
      file: 'riven-twinblades.png',
      aliases: ['riven-twinblades.png', 'riven-twinblades.svg', 'riven-twinblades-fixed.png'],
      scale: 0.90
    }
  };

  const aliasToSlug = new Map();
  Object.entries(ICONS).forEach(([slug, meta]) => {
    meta.aliases.forEach(alias => aliasToSlug.set(alias, slug));
  });

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

  const clamp = (value, min, max) => Math.max(min, Math.min(max, value));

  const applyFallbackSizing = (frame, img, slug) => {
    const meta = ICONS[slug];
    if (!frame || !img || !meta) return;
    frame.style.setProperty('--weapon-icon-padding', `${AUTO_PADDING * 100}%`);
    img.style.setProperty('transform', `scale(${meta.scale ?? 1})`, 'important');
    img.style.setProperty('transform-origin', 'center center', 'important');
  };

  /* Measure the actual non-transparent artwork, not the file canvas. This is
     what makes a tightly cropped sword and a loose PNG with lots of transparent
     margin appear the same visual size inside equal icon boxes. */
  const autoFitVisibleArtwork = (img, frame) => {
    if (!img || !frame || !img.naturalWidth || !img.naturalHeight) return;
    if (img.dataset.iconAutoFitKey === img.currentSrc) return;

    try {
      const maxSide = 256;
      const ratio = Math.min(1, maxSide / Math.max(img.naturalWidth, img.naturalHeight));
      const width = Math.max(1, Math.round(img.naturalWidth * ratio));
      const height = Math.max(1, Math.round(img.naturalHeight * ratio));
      const canvas = document.createElement('canvas');
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d', { willReadFrequently: true });
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
      const data = ctx.getImageData(0, 0, width, height).data;

      let minX = width, minY = height, maxX = -1, maxY = -1;
      for (let y = 0; y < height; y++) {
        for (let x = 0; x < width; x++) {
          if (data[(y * width + x) * 4 + 3] <= 12) continue;
          if (x < minX) minX = x;
          if (x > maxX) maxX = x;
          if (y < minY) minY = y;
          if (y > maxY) maxY = y;
        }
      }

      if (maxX < minX || maxY < minY) return;
      const visibleWidth = maxX - minX + 1;
      const visibleHeight = maxY - minY + 1;
      const rawOccupancy = Math.max(visibleWidth / width, visibleHeight / height);
      if (!rawOccupancy) return;

      const drawableFraction = 1 - AUTO_PADDING * 2;
      const scale = clamp(
        TARGET_VISIBLE_OCCUPANCY / (rawOccupancy * drawableFraction),
        MIN_AUTO_SCALE,
        MAX_AUTO_SCALE
      );

      frame.style.setProperty('--weapon-icon-padding', `${AUTO_PADDING * 100}%`);
      img.style.setProperty('transform', `scale(${scale.toFixed(4)})`, 'important');
      img.style.setProperty('transform-origin', 'center center', 'important');
      img.dataset.iconAutoFitKey = img.currentSrc;
    } catch (_) {
      /* Some browsers can refuse canvas reads for unusual SVG resources.
         The per-weapon fallback sizing above remains active in that case. */
    }
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
    requestAnimationFrame(() => autoFitVisibleArtwork(img, frame));
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
      applyFallbackSizing(frame, img, slug);
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
    applyFallbackSizing(holder, img, slug);
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
