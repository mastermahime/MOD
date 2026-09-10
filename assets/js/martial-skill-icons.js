/* WWM martial skill icon replacement. Uses the supplied crisp white transparent icons. */
(() => {
  const icons = {"Addled Mind":"data:image/png;base64,","All Under Justice":"data:image/png;base64,","Bladebound Thread":"data:image/png;base64,","Burn and Bury":"data:image/png;base64,","Calamity's Greed":"data:image/png;base64,","Cloudburst Healing":"data:image/png;base64,","Cyclone Waltz":"data:image/png;base64,","Daunting Strike":"data:image/png;base64,","Echoes of a Thousand Plants":"data:image/png;base64,","Emerald Barrier":"data:image/png;base64,","Fleeting Trace":"data:image/png;base64,","Floating Grace":"data:image/png;base64,","General's Bane":"data:image/png;base64,","Heavenwill Declared":"data:image/png;base64,","Hero's Blood":"data:image/png;base64,","Inner Balance Strike III":"data:image/png;base64,","Inner Track Slash":"data:image/png;base64,","Legion Crusher":"data:image/png;base64,","Legion Summoner":"data:image/png;base64,","Morning Drizzle":"data:image/png;base64,","Nightwick - Tipsylay":"data:image/png;base64,","Peakfall":"data:image/png;base64,","Peak's Springless Silence":"data:image/png;base64,","Predator's Shield":"data:image/png;base64,","Qiankun's Lock":"data:image/png;base64,","Reveldrift":"data:image/png;base64,","Rodent Rampage":"data:image/png;base64,","Scarlet Spin":"data:image/png;base64,","Shadow Step":"data:image/png;base64,","Sky Grasped":"data:image/png;base64,","Snaring Lash":"data:image/png;base64,","Sober Sorrow":"data:image/png;base64,","Soul Burning":"data:image/png;base64,","Soul Sweep":"data:image/png;base64,","Spring Sorrow":"data:image/png;base64,","Storm Roar":"data:image/png;base64,","Sunrush Gale":"data:image/png;base64,","Sweep All":"data:image/png;base64,","Thunder Shock":"data:image/png;base64,","Unfading Flower":"data:image/png;base64,"};
  const norm = s => (s || '').replace(/\s+/g, ' ').trim().toLowerCase();
  const apply = () => {
    document.querySelectorAll('.skill-path-card').forEach(card => {
      const label = card.querySelector('strong');
      const img = card.querySelector('.skill-path-icon img');
      if (!label || !img) return;
      const src = icons[norm(label.textContent)];
      if (!src || src.length < 30) return;
      img.src = src;
      img.removeAttribute('onerror');
      img.style.display = '';
      img.alt = label.textContent.trim() + ' icon';
      const fallback = card.querySelector('.skill-path-fallback');
      if (fallback) fallback.style.display = 'none';
    });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', apply); else apply();
})();
