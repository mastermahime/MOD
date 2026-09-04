(() => {
  const root = document.body.dataset.root || '../../';
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = `${root}assets/css/weapon-guides.css?v=1`;
  document.head.appendChild(css);

  const mysticSlug = {
    'Tai Chi':'tai-chi','Cloud Steps':'cloud-steps','Meridian Touch':'meridian-touch','Guardian Palm':'guardian-palm',
    'Golden Body':'golden-body',"Dragon's Breath":'dragons-breath','World to Sword':'world-to-sword','Cyclone Spin':'cyclone-spin'
  };

  const paths = {
    'bellstrike-splendor':{
      name:'Bellstrike - Splendor',role:'Flexible Melee DPS',weapons:[['Nameless Sword','nameless-sword'],['Nameless Spear','nameless-spear']],
      inner:[['Battle Anthem','battle-anthem'],["Mountain's Might",'mountains-might'],['Sandswirl Tail','sandswirl-tail'],['Sword Morph','sword-morph'],['Wildfire Spark','wildfire-spark']],
      pvp:'A pressure-focused version that uses the Sword for quick engagement and the Spear to control spacing, punish disengages and keep opponents inside your preferred range.',
      solo:'A forgiving all-purpose setup for story, exploration and bosses. Swap between Sword flexibility and Spear reach instead of forcing one weapon into every situation.',
      gear:'Prioritize reliable Physical Attack and Affinity value with enough defense to stay aggressive. Consistency is more useful here than a narrow condition you rarely trigger.',
      pvpMystics:['Tai Chi','Cloud Steps','Meridian Touch','Guardian Palm'],soloMystics:["Dragon's Breath",'Cloud Steps','Tai Chi','Golden Body'],
      pvpRotation:['Open with the weapon that gives you safer contact.','Use mobility to keep pressure instead of overcommitting to long strings.','Swap to Spear when the target creates distance.','Return to Sword when you can safely stay close.'],
      soloRotation:['Start with Sword for flexible pressure.','Swap to Spear for reach, groups or safer boss windows.','Use Mystic Skills to cover control and mobility gaps.','Reset rather than forcing damage through unsafe enemy strings.']
    },
    'bellstrike-umbra':{
      name:'Bellstrike - Umbra',role:'Bleed / Wound Pressure',weapons:[['Strategic Sword','strategic-sword'],['Heavenquaker Spear','heavenquaker-spear']],
      inner:[['Adaptive Steel','adaptive-steel'],['Insightful Strike','insightful-strike'],['Sword Horizon','sword-horizon'],["Wolfchaser's Art",'wolfchasers-art']],
      pvp:'Build pressure first, then convert it into a stronger payoff. Strategic Sword handles setup while Heavenquaker Spear gives reach and lets you keep wounded targets under pressure.',
      solo:'A sustained-damage setup for bosses and open-world elites. Keep your wound or bleed loop active and avoid swapping so often that your setup falls off.',
      gear:'Favor sustained offensive stats, penetration and survivability. This path performs best when you can keep its damage-over-time pressure active long enough to cash it out.',
      pvpMystics:['Tai Chi','Cloud Steps','Meridian Touch','Guardian Palm'],soloMystics:["Dragon's Breath",'Cloud Steps','Tai Chi','Golden Body'],
      pvpRotation:['Apply pressure with Strategic Sword.','Use Spear reach to stop easy disengages.','Keep your setup active before committing to the payoff window.','Back off briefly if continuing the string would lose more than it gains.'],
      soloRotation:['Establish your damage-over-time setup.','Maintain it instead of constantly resetting the rotation.','Use Spear when reach is safer than staying directly on the target.','Commit to the payoff after your setup is established.']
    },
    'silkbind-jade':{
      name:'Silkbind - Jade',role:'Ranged Control / DPS',weapons:[['Vernal Umbrella','vernal-umbrella'],['Inkwell Fan','inkwell-fan']],
      inner:[['Blossom Barrage','blossom-barrage'],['Flying Gourds','flying-gourds'],['Light and Shadow Alike','light-and-shadow-alike'],['Star Reacher','star-reacher'],['Thunderous Bloom','thunderous-bloom']],
      pvp:'Stay difficult to approach. The Umbrella handles mobile ranged pressure while the Fan helps control space and punish opponents who chase predictably.',
      solo:'A safe ranged setup that clears general content without needing to stay in melee. Use whichever weapon better matches the enemy distance and movement pattern.',
      gear:'Prioritize ranged damage, Affinity and enough mobility or defense to preserve spacing. Your damage drops quickly if you spend the fight being forced into bad positions.',
      pvpMystics:['Tai Chi','Cloud Steps','Meridian Touch','Guardian Palm'],soloMystics:["Dragon's Breath",'Cloud Steps','Tai Chi','Golden Body'],
      pvpRotation:['Create space before starting long animations.','Use Fan control to discourage direct approaches.','Swap to Umbrella while repositioning and maintaining pressure.','Use mobility tools before the opponent reaches your preferred range.'],
      soloRotation:['Open from range.','Use control before enemies surround you.','Swap weapons when one kit is on cooldown or the range changes.','Keep moving while maintaining damage.']
    },
    'silkbind-deluge':{
      name:'Silkbind - Deluge',role:'Healing / Support',weapons:[['Panacea Fan','panacea-fan'],['Soulshade Umbrella','soulshade-umbrella']],
      inner:[['Esoteric Revival','esoteric-revival'],['Mending Loom','mending-loom'],['Restoring Blossom','restoring-blossom'],['Royal Remedy','royal-remedy']],
      pvp:'A survival-first support build for keeping teammates alive under burst pressure. Panacea Fan handles direct recovery while Soulshade Umbrella maintains support between major heals.',
      solo:'A safer solo version that keeps the path’s healing identity while leaving more room for personal damage and exploration utility.',
      gear:'Favor healing output, survivability and reliable support uptime. Staying alive and preserving your major recovery tools matters more than chasing personal DPS.',
      pvpMystics:['World to Sword','Cyclone Spin','Cloud Steps','Guardian Palm'],soloMystics:['World to Sword','Cloud Steps','Tai Chi','Golden Body'],
      pvpRotation:['Keep sustained support active before damage spikes.','Use Panacea Fan for direct emergency recovery.','Return to Soulshade Umbrella while large heals recover.','Save mobility for surviving dives or reaching an ally who needs immediate help.'],
      soloRotation:['Use Umbrella support while moving through general enemies.','Switch to Fan whenever your health drops or a difficult enemy creates pressure.','Use Mystic Skills to add control or damage without sacrificing your safety.','Reset with healing before starting another dangerous pull.']
    },
    'bamboocut-wind':{
      name:'Bamboocut - Wind',role:'Fast Melee / Chase',weapons:[['Infernal Twinblades','infernal-twinblades'],['Mortal Rope Dart','mortal-rope-dart']],
      inner:[['Breaking Point','breaking-point'],['Echoes of Oblivion','echoes-of-oblivion'],['Riptide Reflex','riptide-reflex'],['Vendetta','vendetta']],
      pvp:'A chase-heavy build that uses Rope Dart to create contact and Twinblades to stay on top of a target once an opening appears.',
      solo:'A high-tempo solo setup for players who want fast clears and constant movement. Rope Dart solves range and grouping problems while Twinblades provide sustained melee pressure.',
      gear:'Favor offensive stats that reward constant contact, then add enough defense to survive the close-range commitment this path requires.',
      pvpMystics:['Tai Chi','Cloud Steps','Meridian Touch','Guardian Palm'],soloMystics:["Dragon's Breath",'Cloud Steps','Tai Chi','Golden Body'],
      pvpRotation:['Use Rope Dart to start contact or interrupt escape.','Swap into Twinblades when you have a real opening.','Do not spend every mobility tool at once.','Re-establish with Rope Dart if the target escapes your melee range.'],
      soloRotation:['Group or approach with Rope Dart.','Use Twinblades for the main damage window.','Swap back when distance or enemy movement makes melee inefficient.','Keep one defensive or mobility option available for dangerous attacks.']
    },
    'stonesplit-might':{
      name:'Stonesplit - Might',role:'Tank / Frontline',weapons:[['Stormbreaker Spear','stormbreaker-spear'],['Thundercry Blade','thundercry-blade']],
      inner:[['Art of Resistance','art-of-resistance'],['Exquisite Scenery','exquisite-scenery'],['Rock Solid','rock-solid']],
      pvp:'A frontline control build that values surviving focused pressure and holding space. Spear offers safer reach while Thundercry Blade handles committed defensive trades.',
      solo:'A durable solo setup for bosses and difficult exploration content. Damage is slower than dedicated DPS paths, but mistakes are much less punishing.',
      gear:'Prioritize HP, Physical Defense and damage reduction before adding offense. This path gains value by staying present through enemy pressure rather than racing for short burst windows.',
      pvpMystics:['Guardian Palm','Tai Chi','Cloud Steps','Golden Body'],soloMystics:['Guardian Palm','Golden Body','Cloud Steps',"Dragon's Breath"],
      pvpRotation:['Take space with Spear without overextending.','Use Thundercry Blade when you expect to trade into incoming pressure.','Preserve defensive tools for the enemy burst window.','Return to Spear when you need reach or safer control.'],
      soloRotation:['Use Spear for normal pressure and positioning.','Swap to Thundercry Blade for dangerous enemy strings or heavy trade windows.','Use defensive Mystic Skills before your HP becomes critical.','Win through steady uptime rather than risky burst attempts.']
    },
    'bamboocut-dust':{
      name:'Bamboocut - Dust',role:'Swap Setup / Burst',weapons:[['Everspring Umbrella','everspring-umbrella'],['Unfettered Rope Dart','unfettered-rope-dart']],
      inner:[['Light Anew','light-anew'],['Phantom Rally','phantom-rally'],['Song of Tang','song-of-tang'],['Towline Sweep','towline-sweep']],
      pvp:'Use Everspring Umbrella to create the opening, then move into Unfettered Rope Dart for the payoff. The build is strongest when swaps are deliberate instead of random.',
      solo:'A flexible setup-and-burst build for groups and bosses. Umbrella handles range and setup; Rope Dart cashes out when the target is controlled or exposed.',
      gear:'Favor stats that improve your burst window and enough mobility to move cleanly between setup and payoff ranges.',
      pvpMystics:['Tai Chi','Cloud Steps','Meridian Touch','Guardian Palm'],soloMystics:["Dragon's Breath",'Cloud Steps','Tai Chi','Golden Body'],
      pvpRotation:['Create pressure with Everspring Umbrella.','Wait for a real opening instead of swapping immediately.','Enter with Rope Dart for the burst window.','Return to Umbrella if the target escapes or your payoff window ends.'],
      soloRotation:['Set up groups or bosses with Umbrella.','Swap to Rope Dart once enemies are positioned well.','Finish the burst sequence, then reset range.','Repeat instead of remaining in the wrong weapon after its job is done.']
    },
    'stonesplit-strength':{
      name:'Stonesplit - Strength',role:'Parry Setup / Heavy Payoff',weapons:[['Snowparting Blade','snowparting-blade'],['Phalanxbane Blade','phalanxbane-blade']],
      inner:[['Frost-Clad Night','frost-clad-night'],['Steadfast Devotion','steadfast-devotion'],['Throat-Piercing Art','throat-piercing-art'],['Wildfire Surge','wildfire-surge']],
      pvp:'Snowparting Blade creates momentum through timing and deflection, then Phalanxbane Blade turns that advantage into heavier committed damage.',
      solo:'A boss-friendly setup for players comfortable with parry timing. Build momentum on safer interactions and spend it only when the enemy gives you a real heavy-attack window.',
      gear:'Prioritize heavy damage and survivability while keeping enough defense to survive missed parry attempts. Consistent timing matters more than pure paper DPS.',
      pvpMystics:['Tai Chi','Cloud Steps','Meridian Touch','Guardian Palm'],soloMystics:["Dragon's Breath",'Cloud Steps','Tai Chi','Golden Body'],
      pvpRotation:['Use Snowparting Blade to test timing and build momentum.','Do not swap to the heavy weapon without a payoff window.','Use Phalanxbane Blade when the opponent is committed or vulnerable.','Return to Snowparting after the heavy sequence ends.'],
      soloRotation:['Build momentum through safe deflections and light pressure.','Wait for the boss recovery window.','Spend with Phalanxbane Blade.','Reset into Snowparting instead of forcing another heavy sequence.']
    },
    'bamboocut-kite':{
      name:'Bamboocut - Kite',role:'Control Into Close Burst',weapons:[['Heavenwill Gauntlets','heavenwill-gauntlets'],['Skygrasp Rope Dart','skygrasp-rope-dart']],
      inner:[['Celestial Vigor','celestial-vigor'],['Empirical Edge','empirical-edge'],['Sky Gripped','sky-gripped'],['Soaring High','soaring-high']],
      pvp:'Skygrasp Rope Dart controls the engagement and Heavenwill Gauntlets convert that setup into close-range burst. Perfect Dodge timing also works naturally with the path’s current gear options.',
      solo:'A strong boss and exploration setup that solves Gauntlets’ short range with Rope Dart setup before committing to the burst window.',
      gear:'Etherwrath is the natural offensive option for sustained trigger pressure, while Honorbound is a strong defensive choice when you consistently Perfect Dodge.',
      pvpMystics:['Tai Chi','Cloud Steps','Meridian Touch','Guardian Palm'],soloMystics:["Dragon's Breath",'Cloud Steps','Tai Chi','Golden Body'],
      pvpRotation:['Start with Skygrasp to control distance.','Force or wait for an opening.','Swap to Heavenwill Gauntlets for the close burst.','Exit before the target can freely punish your short range.'],
      soloRotation:['Use Skygrasp for approach and setup.','Enter Gauntlets when the boss is vulnerable.','Perfect Dodge dangerous strings rather than greed damage.','Return to Rope Dart when the target moves out of your ideal range.']
    },
    'bamboocut-draught':{
      name:'Bamboocut - Draught',role:'Drunken-State DPS',weapons:[['Skystrike Gauntlets','skystrike-gauntlets'],['Riven Twinblades','riven-twinblades']],
      inner:[['Eonpour','eonpour'],['Skyspeak','skyspeak'],['Mistwing','mistwing'],['Volutefit','volutefit']],
      pvp:'Build the shared Draught resource without exposing yourself for too long, then use the deeper Inebriate state for your strongest pressure window.',
      solo:'A dedicated resource-loop setup for bosses and open world. Use Gauntlets to build the state and Twinblades to capitalize when the payoff is ready.',
      gear:'Tiltrim is the natural offensive set for Special Enhancement windows. Brimflow is the defensive alternative when you expect to trade damage during the empowered state.',
      pvpMystics:['Tai Chi','Cloud Steps','Meridian Touch','Guardian Palm'],soloMystics:["Dragon's Breath",'Cloud Steps','Tai Chi','Golden Body'],
      pvpRotation:['Build the shared resource without overcommitting.','Enter the Inebriate payoff only when you can stay on target.','Use Twinblades for the deeper pressure window.','Reset the state loop when the opponent escapes.'],
      soloRotation:['Build the shared state with Skystrike Gauntlets.','Swap once the payoff state is ready.','Use Riven Twinblades during the empowered window.','Return to Gauntlets and rebuild rather than staying in the wrong phase.']
    }
  };

  const weapons = {
    'nameless-sword':['Nameless Sword','bellstrike-splendor','Nameless Spear','nameless-spear'],
    'nameless-spear':['Nameless Spear','bellstrike-splendor','Nameless Sword','nameless-sword'],
    'strategic-sword':['Strategic Sword','bellstrike-umbra','Heavenquaker Spear','heavenquaker-spear'],
    'heavenquaker-spear':['Heavenquaker Spear','bellstrike-umbra','Strategic Sword','strategic-sword'],
    'vernal-umbrella':['Vernal Umbrella','silkbind-jade','Inkwell Fan','inkwell-fan'],
    'inkwell-fan':['Inkwell Fan','silkbind-jade','Vernal Umbrella','vernal-umbrella'],
    'panacea-fan':['Panacea Fan','silkbind-deluge','Soulshade Umbrella','soulshade-umbrella'],
    'soulshade-umbrella':['Soulshade Umbrella','silkbind-deluge','Panacea Fan','panacea-fan'],
    'infernal-twinblades':['Infernal Twinblades','bamboocut-wind','Mortal Rope Dart','mortal-rope-dart'],
    'mortal-rope-dart':['Mortal Rope Dart','bamboocut-wind','Infernal Twinblades','infernal-twinblades'],
    'stormbreaker-spear':['Stormbreaker Spear','stonesplit-might','Thundercry Blade','thundercry-blade'],
    'thundercry-blade':['Thundercry Blade','stonesplit-might','Stormbreaker Spear','stormbreaker-spear'],
    'everspring-umbrella':['Everspring Umbrella','bamboocut-dust','Unfettered Rope Dart','unfettered-rope-dart'],
    'unfettered-rope-dart':['Unfettered Rope Dart','bamboocut-dust','Everspring Umbrella','everspring-umbrella'],
    'snowparting-blade':['Snowparting Blade','stonesplit-strength','Phalanxbane Blade','phalanxbane-blade'],
    'phalanxbane-blade':['Phalanxbane Blade','stonesplit-strength','Snowparting Blade','snowparting-blade'],
    'heavenwill-gauntlets':['Heavenwill Gauntlets','bamboocut-kite','Skygrasp Rope Dart','skygrasp-rope-dart'],
    'skygrasp-rope-dart':['Skygrasp Rope Dart','bamboocut-kite','Heavenwill Gauntlets','heavenwill-gauntlets'],
    'skystrike-gauntlets':['Skystrike Gauntlets','bamboocut-draught','Riven Twinblades','riven-twinblades'],
    'riven-twinblades':['Riven Twinblades','bamboocut-draught','Skystrike Gauntlets','skystrike-gauntlets']
  };

  const baseName = () => (location.pathname.split('/').pop() || '').replace('.html','');
  const a = (href,text) => `<a href="${href}">${text}</a>`;
  const innerLinks = p => p.inner.map(x=>a(`${root}database/inner-ways/${x[1]}.html`,x[0])).join('');
  const mysticLinks = list => list.map(n=>a(`${root}database/mystic-skills/${mysticSlug[n]}.html`,n)).join('');

  function enhanceWeaponPage(){
    const slug=baseName(), w=weapons[slug]; if(!w) return;
    const [name,pathSlug,partnerName,partnerSlug]=w, p=paths[pathSlug];
    const label=document.querySelector('.article-label'); if(label) label.textContent='Weapon Guide · Martial Art';
    document.querySelectorAll('.wiki-table tr').forEach(tr=>{
      const th=tr.querySelector('th'),td=tr.querySelector('td'); if(!th||!td) return;
      const key=th.textContent.trim().toLowerCase();
      if(key==='martial path'||key==='path') td.innerHTML=a(`../martial-paths/${pathSlug}.html`,p.name);
    });
    const content=document.querySelector('.article-content'); if(!content) return;
    const table=content.querySelector('.wiki-table');
    const quick=document.createElement('div'); quick.className='weapon-guide-quick';
    const initials=name.split(/\s+/).map(x=>x[0]).join('').slice(0,2).toUpperCase();
    quick.innerHTML=`<div class="weapon-guide-icon"><span class="weapon-guide-fallback">${initials}</span><img src="${root}assets/icons/martial-arts/${slug}.png" alt="" onerror="this.style.display='none'"></div><div class="weapon-guide-meta"><a class="weapon-guide-link" href="../martial-paths/${pathSlug}.html"><small>Default Martial Path</small><strong>${p.name}</strong></a><a class="weapon-guide-link" href="${partnerSlug}.html"><small>Default Partner</small><strong>${partnerName}</strong></a></div>`;
    if(table) table.insertAdjacentElement('afterend',quick); else content.prepend(quick);
    if(!document.getElementById('weapon-builds')){
      const section=document.createElement('section'); section.id='weapon-builds';
      section.innerHTML=`<h2>Builds Using ${name}</h2><div class="weapon-build-grid"><a class="weapon-build-card" href="${root}guides/builds/${pathSlug}.html"><span class="build-badge">Default</span><strong>${p.name} Core Build</strong><p>${p.weapons[0][0]} + ${p.weapons[1][0]}. The standard build for this Martial Path.</p></a><a class="weapon-build-card" href="${root}guides/builds/variant.html?path=${pathSlug}&mode=pvp"><span class="build-badge">PvP</span><strong>${p.name} PvP</strong><p>Pressure, survivability and player-versus-player priorities for this weapon pair.</p></a><a class="weapon-build-card" href="${root}guides/builds/variant.html?path=${pathSlug}&mode=solo"><span class="build-badge">Solo</span><strong>${p.name} Solo / Open World</strong><p>A safer all-purpose version for quests, exploration, bosses and general play.</p></a></div>`;
      content.appendChild(section);
    }
  }

  function enhanceWeaponsIndex(){
    document.querySelectorAll('.wiki-icon-card').forEach(card=>{
      const href=card.getAttribute('href')||'',slug=(href.split('/').pop()||'').replace('.html',''),w=weapons[slug]; if(!w) return;
      const p=paths[w[1]], old=card.querySelector('.weapon-index-path'); if(old) return;
      const path=document.createElement('small'); path.className='weapon-index-path'; path.textContent=p.name;
      const guide=document.createElement('small'); guide.className='weapon-index-guide'; guide.textContent='Weapon Guide';
      card.append(path,guide);
    });
    const desc=document.querySelector('.article-desc'); if(desc) desc.textContent='Weapon families and Martial Arts. Open any weapon for its full guide, default Martial Path and linked builds.';
  }

  function enhanceDefaultBuild(){
    const slug=baseName(), p=paths[slug]; if(!p) return;
    const content=document.querySelector('.article-content'); if(!content||document.getElementById('build-guide-extra')) return;
    const extra=document.createElement('section'); extra.id='build-guide-extra';
    extra.innerHTML=`<h2>Default Martial Path</h2><div class="build-guide-summary"><strong>${a(`${root}database/martial-paths/${slug}.html`,p.name)}</strong><br>${p.role} · ${a(`${root}database/martial-arts/${p.weapons[0][1]}.html`,p.weapons[0][0])} + ${a(`${root}database/martial-arts/${p.weapons[1][1]}.html`,p.weapons[1][0])}</div><h2>Core Inner Ways</h2><div class="build-pill-list">${innerLinks(p)}</div><h2>Other Versions</h2><div class="weapon-build-grid"><a class="weapon-build-card" href="variant.html?path=${slug}&mode=pvp"><span class="build-badge">PvP</span><strong>${p.name} PvP</strong><p>Player-versus-player tuning for the same core weapon pair.</p></a><a class="weapon-build-card" href="variant.html?path=${slug}&mode=solo"><span class="build-badge">Solo</span><strong>${p.name} Solo / Open World</strong><p>A more forgiving setup for general content and bosses.</p></a></div>`;
    content.appendChild(extra);
  }

  function renderVariant(){
    const rootHost=document.getElementById('variant-build-root'); if(!rootHost) return;
    const q=new URLSearchParams(location.search), slug=q.get('path'), mode=q.get('mode')==='solo'?'solo':'pvp', p=paths[slug];
    if(!p){rootHost.innerHTML='<p>Build not found.</p>';return;}
    const isPvp=mode==='pvp', title=`${p.name} ${isPvp?'PvP':'Solo / Open World'} Build`, desc=isPvp?p.pvp:p.solo, priorities=isPvp?['Pressure and control','Survive enemy burst','Keep both weapons useful throughout the fight']:['Reliable damage','Self-sufficiency','Comfortable boss and exploration uptime'], rotation=isPvp?p.pvpRotation:p.soloRotation, mystics=isPvp?p.pvpMystics:p.soloMystics;
    document.title=`${title} — Jianghu Archive`;
    const label=document.querySelector('.article-label'); if(label) label.textContent=isPvp?'PvP Build':'Solo / Open World Build';
    const h1=document.querySelector('.article-title'); if(h1) h1.textContent=title;
    const headDesc=document.querySelector('.article-desc'); if(headDesc) headDesc.textContent=`${p.weapons[0][0]} + ${p.weapons[1][0]} · ${p.role}`;
    const crumbs=document.querySelector('.breadcrumbs'); if(crumbs) crumbs.innerHTML=`<a href="${root}index.html">Home</a> / <a href="index.html">Builds</a> / ${p.name} / ${isPvp?'PvP':'Solo'}`;
    rootHost.innerHTML=`<div class="build-guide-summary"><strong>${p.name}</strong><br>${desc}</div><div class="build-guide-columns"><div class="build-guide-panel"><h3>Weapons</h3><div class="build-pill-list">${a(`${root}database/martial-arts/${p.weapons[0][1]}.html`,p.weapons[0][0])}${a(`${root}database/martial-arts/${p.weapons[1][1]}.html`,p.weapons[1][0])}</div></div><div class="build-guide-panel"><h3>Martial Path</h3><div class="build-pill-list">${a(`${root}database/martial-paths/${slug}.html`,p.name)}</div></div></div><h2>Build Priorities</h2><div class="build-guide-panel"><ul>${priorities.map(x=>`<li>${x}</li>`).join('')}</ul></div><h2>Recommended Inner Ways</h2><div class="build-pill-list">${innerLinks(p)}</div><h2>Gear Focus</h2><p>${p.gear}</p><h2>Suggested Mystic Skills</h2><div class="build-pill-list">${mysticLinks(mystics)}</div><h2>How to Play</h2><div class="build-rotation"><ol>${rotation.map(x=>`<li>${x}</li>`).join('')}</ol></div><h2>Build Versions</h2><div class="weapon-build-grid"><a class="weapon-build-card" href="${slug}.html"><span class="build-badge">Default</span><strong>${p.name} Core Build</strong><p>The standard Martial Path setup.</p></a><a class="weapon-build-card" href="variant.html?path=${slug}&mode=${isPvp?'solo':'pvp'}"><span class="build-badge">${isPvp?'Solo':'PvP'}</span><strong>${p.name} ${isPvp?'Solo / Open World':'PvP'}</strong><p>Switch to the other maintained version of this build.</p></a></div>`;
  }

  function init(){
    const path=location.pathname;
    if(path.includes('/database/martial-arts/') && !path.endsWith('/index.html')) enhanceWeaponPage();
    if(path.endsWith('/database/weapons/index.html')) enhanceWeaponsIndex();
    if(path.includes('/guides/builds/') && !path.endsWith('/index.html') && !path.endsWith('/variant.html')) enhanceDefaultBuild();
    if(path.endsWith('/guides/builds/variant.html')) renderVariant();
  }
  if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init); else init();
})();