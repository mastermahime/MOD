(() => {
  const processImage = (img) => {
    if (!img || img.dataset.iconFixBound === '1') return;
    img.dataset.iconFixBound = '1';

    const originalSrc = img.getAttribute('src') || '';
    if (/strategic-sword\.(png|svg)/.test(originalSrc) && !originalSrc.includes('strategic-sword.png?v=visible8')) {
      img.src = originalSrc.replace(/strategic-sword\.(?:png|svg)(?:\?[^#]*)?/, 'strategic-sword.png?v=visible8');
    }
    if (/infernal-twinblades\.png/.test(originalSrc) && !originalSrc.includes('infernal-twinblades.png?v=infernal1')) {
      img.src = originalSrc.replace(/infernal-twinblades\.png(?:\?[^#]*)?/, 'infernal-twinblades.png?v=infernal1');
    }
    if (/riven-twinblades\.(?:png|svg)/.test(originalSrc) && !originalSrc.includes('riven-twinblades.png?v=riven7')) {
      img.src = originalSrc.replace(/riven-twinblades\.(?:png|svg)(?:\?[^#]*)?/, 'riven-twinblades.png?v=riven7');
    }
    if (/inkwell-fan\.(?:png|svg)/.test(originalSrc) && !originalSrc.includes('inkwell-fan.svg?v=fanfix1')) {
      img.src = originalSrc.replace(/inkwell-fan\.(?:png|svg)(?:\?[^#]*)?/, 'inkwell-fan.svg?v=fanfix1');
    }
    if (/panacea-fan\.(?:png|svg)/.test(originalSrc) && !originalSrc.includes('panacea-fan.svg?v=fanfix1')) {
      img.src = originalSrc.replace(/panacea-fan\.(?:png|svg)(?:\?[^#]*)?/, 'panacea-fan.svg?v=fanfix1');
    }

    const frame = img.closest('.wiki-icon-frame, .weapon-guide-icon, .weapon-path-icon');
    if (!frame) return;

    const applyLoadedState = () => {
      if (!img.naturalWidth) return;
      frame.classList.add('has-real-icon');
      frame.querySelectorAll('.icon-fallback, .weapon-guide-fallback, .martial-path-fallback').forEach(el => el.remove());
    };

    const applyErrorState = () => {
      frame.classList.remove('has-real-icon');
      img.remove();
    };

    img.addEventListener('load', applyLoadedState, { once: true });
    img.addEventListener('error', applyErrorState, { once: true });
    if (img.complete) {
      if (img.naturalWidth) applyLoadedState();
      else applyErrorState();
    }
  };

  const scan = (root = document) => {
    root.querySelectorAll?.('.wiki-icon-frame img, .weapon-guide-icon img, .weapon-path-icon img').forEach(processImage);
  };

  const start = () => {
    scan();
    const observer = new MutationObserver(records => {
      records.forEach(record => record.addedNodes.forEach(node => {
        if (node.nodeType !== 1) return;
        if (node.matches?.('.wiki-icon-frame img, .weapon-guide-icon img, .weapon-path-icon img')) processImage(node);
        scan(node);
      }));
    });
    observer.observe(document.documentElement, { childList: true, subtree: true });
  };

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();