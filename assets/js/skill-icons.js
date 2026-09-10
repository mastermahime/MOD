(() => {
  const ROOT = document.body?.dataset.root || '../../';
  const icons = {
    'addledmind': 'AddledMind.png',
    'allunderjustice': 'AllUnderJustice.png',
    'bladeboundthread': 'BladeboundThread.png',
    'burnandbury': 'BurnandBury.png',
    'calamitysgreed': 'CalamitysGreed.png',
    'cloudbursthealing': 'CloudburstHealing.png',
    'cyclonewaltz': 'CycloneWaltz.png',
    'dauntingstrike': 'DauntingStrike.png',
    'echoesofathousandplants': 'EchoesofAThousandPlants.png',
    'emeraldbarrier': 'EmeraldBarrier.png',
    'fleetingtrace': 'FleetingTrace.png',
    'floatinggrace': 'FloatingGrace.png',
    'generalsbane': 'GeneralsBane.png',
    'heavenwilldeclared': 'HeavenwillDeclared.png',
    'herosblood': 'HerosBlood.png',
    'innerbalancestrikeiii': 'InnerBalanceStrikeIII.png',
    'innertrackslash': 'InnerTrackSlash.png',
    'legioncrusher': 'LegionCrusher.png',
    'legionsummoner': 'LegionSummoner.png',
    'morningdrizzle': 'MorningDrizzle.png',
    'nightwicktipsylay': 'Nightwick-Tipsylay.png',
    'peakfall': 'Peakfall.png',
    'peaksspringlesssilence': 'PeaksSpringlessSilence.png',
    'predatorsshield': 'PredatorsShield.png',
    'qiankunslock': 'QiankunsLock.png',
    'reveldrift': 'Reveldrift.png',
    'rodentrampage': 'RodentRampage.png',
    'scarletspin': 'ScarletSpin.png',
    'shadowstep': 'ShadowStep.png',
    'skygrasped': 'SkyGrasped.png',
    'snaringlash': 'SnaringLash.png',
    'sobersorrow': 'SoberSorrow.png',
    'soulburning': 'SoulBurning.png',
    'soulsweep': 'SoulSweep.png',
    'springsorrow': 'SpringSorrow.png',
    'stormroar': 'StormRoar.png',
    'sunrushgale': 'SunrushGale.png',
    'sweepall': 'SweepAll.png',
    'thundershock': 'ThunderShock.png',
    'unfadingflower': 'UnfadingFlower.png',
  };
  const normalize = s => (s || '').toLowerCase().replace(/&amp;/g, '&').replace(/[^a-z0-9]+/g, '');
  const resolve = label => {
    const n = normalize(label);
    if (icons[n]) return icons[n];
    for (const [key, file] of Object.entries(icons)) {
      if (n === key || n.includes(key) || key.includes(n)) return file;
    }
    return null;
  };
  const apply = card => {
    if (!card || !card.matches?.('.skill-path-card')) return;
    const title = card.querySelector('strong')?.textContent || '';
    const file = resolve(title);
    if (!file) return;
    let holder = card.querySelector('.skill-path-icon');
    if (!holder) {
      holder = document.createElement('div');
      holder.className = 'skill-path-icon';
      card.prepend(holder);
    }
    let img = holder.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      img.alt = `${title} icon`;
      holder.appendChild(img);
    }
    img.src = `${ROOT}assets/icons/martial-skills/${file}?v=skills-white-20260910`;
    img.style.display = '';
    img.onerror = () => { img.style.display = 'none'; };
    holder.querySelectorAll('.martial-path-fallback').forEach(e => e.remove());
  };
  const scan = root => root.querySelectorAll?.('.skill-path-card').forEach(apply);
  const start = () => {
    scan(document);
    new MutationObserver(records => records.forEach(r => r.addedNodes.forEach(n => {
      if (n.nodeType === 1) { apply(n); scan(n); }
    }))).observe(document.documentElement, { childList: true, subtree: true });
  };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start, { once: true });
  else start();
})();
