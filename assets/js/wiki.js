(() => {
  const root = document.body.dataset.root || './';

  // Cache-bust shared assets and add the expansion layer to every page.
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes('wiki.css')) link.href = href.split('?')[0] + '?v=complete1';
  });
  if (!document.querySelector('link[href*="expansion.css"]')) {
    const extraCss = document.createElement('link');
    extraCss.rel = 'stylesheet';
    extraCss.href = `${root}assets/css/expansion.css?v=complete1`;
    document.head.appendChild(extraCss);
  }

  const nav = [
    ['Home','index.html',[]],
    ['General','guides/getting-started/beginner-guide.html',[
      ['Beginner Guide','guides/getting-started/beginner-guide.html'],['Progression Roadmap','guides/getting-started/progression.html'],['Quests','database/quests/index.html'],['Items','database/items/index.html'],['Professions','database/professions/index.html'],['Updates','updates/index.html']
    ]],
    ['Character','categories/combat.html',[
      ['Martial Arts','database/martial-arts/index.html'],['Inner Ways','database/inner-ways/index.html'],['Mystic Skills','database/mystic-skills/index.html'],['Builds','guides/builds/index.html'],['Companions','database/companions/index.html'],['Sects','database/sects/index.html']
    ]],
    ['Equipment','categories/equipment.html',[
      ['Weapons','database/weapons/index.html'],['Armor & Gear Sets','database/armor/index.html'],['Items & Materials','database/items/index.html'],['Gear Progression','guides/equipment/gear-progression.html']
    ]],
    ['World','categories/world.html',[
      ['Regions','database/regions/index.html'],['Bosses','database/bosses/index.html'],['Exploration','database/exploration/index.html'],['Quests','database/quests/index.html'],['NPCs','database/npcs/index.html'],['Sects','database/sects/index.html']
    ]],
    ['Guides','categories/builds.html',[
      ['Builds by Martial Path','guides/builds/index.html'],['Endgame','guides/endgame/index.html'],['Guilds & Social','guides/social/guilds.html'],['Beginner Guide','guides/getting-started/beginner-guide.html'],['Gear Progression','guides/equipment/gear-progression.html'],['Version 2.1','updates/version-2-1.html']
    ]]
  ];

  const drawerGroups = [
    ['START HERE',[
      ['Beginner Guide','guides/getting-started/beginner-guide.html'],['Progression Roadmap','guides/getting-started/progression.html'],['Version 2.1','updates/version-2-1.html']
    ]],
    ['CHARACTER & COMBAT',[
      ['Martial Arts','database/martial-arts/index.html'],['Inner Ways','database/inner-ways/index.html'],['Mystic Skills','database/mystic-skills/index.html'],['Builds','guides/builds/index.html'],['Bosses','database/bosses/index.html'],['Endgame','guides/endgame/index.html']
    ]],
    ['EQUIPMENT',[
      ['Weapons','database/weapons/index.html'],['Armor & Gear Sets','database/armor/index.html'],['Items & Materials','database/items/index.html'],['Gear Progression','guides/equipment/gear-progression.html']
    ]],
    ['WORLD',[
      ['Regions','database/regions/index.html'],['Exploration','database/exploration/index.html'],['Quests','database/quests/index.html'],['NPCs','database/npcs/index.html'],['Sects','database/sects/index.html'],['Companions','database/companions/index.html']
    ]],
    ['COMMUNITY',[
      ['Guilds & Social','guides/social/guilds.html'],['Guild War','guides/endgame/guild-war.html'],['Perception Forest','guides/endgame/perception-forest.html']
    ]]
  ];

  const navMarkup = nav.map(([label,path,children]) => {
    if (!children.length) return `<div class="nav-menu"><a href="${root}${path}">${label}</a></div>`;
    return `<div class="nav-menu"><a href="${root}${path}">${label} <span>⌄</span></a><div class="nav-dropdown">${children.map(c=>`<a href="${root}${c[1]}">${c[0]}</a>`).join('')}</div></div>`;
  }).join('');

  const headerHost = document.getElementById('site-header');
  if (headerHost) {
    headerHost.className = 'site-header';
    headerHost.innerHTML = `
      <div class="utility-bar"><div class="utility-inner">
        <button class="menu-square" id="browseBtn" type="button" aria-label="Browse wiki">☰</button>
        <a class="archive-brand" href="${root}index.html"><span class="archive-mark">风</span><strong>JIANGHU ARCHIVE</strong></a>
        <div class="global-search"><span class="search-glyph">⌕</span><input id="search" placeholder="Search the wiki" autocomplete="off" aria-label="Search wiki"><button class="search-button" id="searchButton" type="button">Search</button><div id="searchResults" class="search-results"></div></div>
        <span class="community-tag">GLOBAL 2.1 WIKI</span>
      </div></div>
      <div class="game-nav-shell"><div class="game-nav-inner">
        <a class="game-brand" href="${root}index.html"><span class="game-mark">风</span><span class="game-copy"><b>WHERE WINDS MEET</b><small>WIKI</small></span></a>
        <nav class="header-nav">${navMarkup}</nav>
      </div></div>`;
  }

  const sidebar = document.getElementById('site-sidebar');
  if (sidebar) {
    sidebar.classList.add('sidebar');
    sidebar.innerHTML = `<div class="drawer-head"><strong>Wiki Navigation</strong><button class="drawer-close" id="drawerClose" type="button" aria-label="Close menu">×</button></div>${drawerGroups.map(group=>`<div class="side-title">${group[0]}</div>${group[1].map(item=>`<a class="side-link" href="${root}${item[1]}">${item[0]}</a>`).join('')}`).join('')}`;
  }

  const rightbar = document.getElementById('site-rightbar');
  if (rightbar) rightbar.innerHTML = '';

  const extraPages = [
    ['Regions','Database','database/regions/index.html','Qinghe Kaifeng Hexi Liangzhou Qinchuan Imperial Palace Hidden Mountain'],
    ['Qinghe','Region','database/regions/qinghe.html','first region Verdant Wilds Sundara Land Moonveil Mountain'],['Kaifeng','Region','database/regions/kaifeng.html','Universal Furnace city Granary Jadewood'],['Hexi','Region','database/regions/hexi.html','western desert Shifting Sands Jade Gate'],['Liangzhou','Region','database/regions/liangzhou.html','western campaign Raging Tides'],['Qinchuan','Region','database/regions/qinchuan.html','later grassland region'],['Imperial Palace','Region','database/regions/imperial-palace.html','Version 1.7 palace'],['Hidden Mountain','Region','database/regions/hidden-mountain.html','Version 2.0 2.1 Mohist Hill'],
    ['Sects','Database','database/sects/index.html','factions join rules shops reputation'],['Nine Mortal Ways','Sect','database/sects/nine-mortal-ways.html','Mortal Rope Dart deception'],['Well of Heaven','Sect','database/sects/well-of-heaven.html','Thundercry Blade chivalry coop'],['Midnight Blades','Sect','database/sects/midnight-blades.html','Infernal Twinblades PvP karma'],['Silver Needles','Sect','database/sects/silver-needles.html','healer support'],['Velvet Shade','Sect','database/sects/velvet-shade.html','Vernal Umbrella charm'],['Masked Troupe','Sect','database/sects/masked-troupe.html','performance Fairgrounds Han Yanluo'],['Raging Tides','Sect','database/sects/raging-tides.html','Liangzhou western sect'],['Inkbound Order','Sect','database/sects/inkbound-order.html','writing scholarship'],['Hollow Vale','Sect','database/sects/hollow-vale.html','mutual benefit'],['Mohist Hill','Sect','database/sects/mohist-hill.html','Hidden Mountain Mohist'],['Lone Cloud','Sect','database/sects/lone-cloud.html','riddle love streetwise'],
    ['Bosses','Database','database/bosses/index.html','campaign world quest challenge bosses'],
    ['Heartseeker','Campaign Boss','database/bosses/heartseeker.html','Still Shore'],['Qianye','Campaign Boss','database/bosses/qianye.html','Blissful Retreat'],['Ye Wanshan','Campaign Boss','database/bosses/ye-wanshan.html','Bodhi Sea Flaming Meteor'],['The Void King','Campaign Boss','database/bosses/void-king.html','Gleaming Abyss'],['Lucky Seventeen','Campaign Boss','database/bosses/lucky-seventeen.html','Palace of Annals'],['Tian Ying','Campaign Boss','database/bosses/tian-ying.html','Promised Light Yaksha Rush Free Morph'],['Dao Lord','Campaign Boss','database/bosses/dao-lord.html','Unbound Cavern'],['Zheng the Frostwing','Campaign Boss','database/bosses/zheng-frostwing.html','Ever-Normal Granary'],['Murong Yuan','Campaign Boss','database/bosses/murong-yuan.html','Jinming Pool Petalfall Banquet'],['God of Avarice','Campaign Boss','database/bosses/god-of-avarice.html','Furnace of Righteousness'],['River Master','Campaign Boss','database/bosses/river-master.html','Heavenfall'],['Guo Xin','Campaign Boss','database/bosses/guo-xin.html','Whitecrown City'],['Wucan','Campaign Boss','database/bosses/wucan.html','Liangzhou lightning sorcery'],['Town Gate Roar','Campaign Boss','database/bosses/town-gate-roar.html','Dasan Pass'],
    ['Puppeteer - Sheng Wu','World Boss','database/bosses/puppeteer-sheng-wu.html','Qinghe Verdant Wilds'],['Sleeping Daoist','World Boss','database/bosses/sleeping-daoist.html','Qinghe Sundara Land'],['Puppeteer - Curtaincall','World Boss','database/bosses/puppeteer-curtaincall.html','Qinghe Sundara Land island'],['Earth Fiend Deity','World Boss','database/bosses/earth-fiend-deity.html','Qinghe Moonveil Mountain'],['Snake Doctor','World Boss','database/bosses/snake-doctor.html','Qinghe Encircling Lake cave'],['Yi Dao','World Boss','database/bosses/yi-dao.html','Qinghe Moonveil Mountain'],['Wolf Maiden','World Boss','database/bosses/wolf-maiden.html','Kaifeng Granary Desperation Ridge'],['Twin Lions','World Boss','database/bosses/twin-lions.html','Kaifeng Gracetown Heroes Realm'],['Ghost Master','World Boss','database/bosses/ghost-master.html','Kaifeng Mistveil Forest'],['Nameless General','World Boss','database/bosses/nameless-general.html','Kaifeng Martial Temple'],['Feng Ruzhi','World Boss','database/bosses/feng-ruzhi.html','Kaifeng Roaring Sands'],['Drunk Martial Artist','World Boss','database/bosses/drunk-martial-artist.html','Kaifeng Version 1.3'],['Coffin Master','World Boss','database/bosses/coffin-master.html','Qinghe Mercyheart Monastery'],['Wandering Ark','World Boss','database/bosses/wandering-ark.html','Hexi Shifting Sands ghost ship'],['Moongazing Maiden','World Boss','database/bosses/moongazing-maiden.html','Jade-Mirrored Spring Liangzhou'],['Pocketrupt Circus','World Boss','database/bosses/pocketrupt-circus.html','Clear-Dew Terrace Liangzhou'],['Everdeer','World Boss','database/bosses/everdeer.html','Steeds Pass Liangzhou'],
    ['Items','Database','database/items/index.html','currencies materials consumables development'],['Currencies','Items','database/items/currencies.html','Coin Jade Fish Echo Jade'],['Development Items','Items','database/items/development-items.html','Tuning Stone Ebon Iron codex'],['Quest Items','Items','database/items/quest-items.html','Dragon Key Neon Flag'],
    ['Exploration','Database','database/exploration/index.html','Oddities Boundary Stones Wayfarers Outposts activities'],['Oddities','Exploration','database/exploration/oddities.html','collectibles Qi Sheng Bell Demoncalm'],['Boundary Stones','Exploration','database/exploration/boundary-stones.html','fast travel'],['Wayfarers','Exploration','database/exploration/wayfarers.html','reveal map'],['Outposts','Exploration','database/exploration/outposts.html','enemy camps'],['World Activities','Exploration','database/exploration/activities.html','archery fishing wrestling pitch pot'],['Sentient Beings','Exploration','database/exploration/sentient-beings.html','world encounters'],
    ['Quests','Database','database/quests/index.html','main story side quests Jianghu Legacies Wandering Tales'],['Main Story','Quest Guide','database/quests/main-story.html','Heaven Has No Pier Universal Furnace'],['Side Quests','Quest Guide','database/quests/side-quests.html','exploration encounter worldly affairs'],['Jianghu Legacies','Quest Guide','database/quests/jianghu-legacies.html','Mystic Skill unlocks'],['Wandering Tales','Quest Guide','database/quests/wandering-tales.html','world stories'],['NPCs','Database','database/npcs/index.html','AI NPC friendship merchants sect contacts'],['Companions','Database','database/companions/index.html','combat NPC assistance home companions'],['Professions','Database','database/professions/index.html','crafting gathering life skills'],
    ['Builds by Martial Path','Guide','guides/builds/index.html','all ten Martial Paths'],['Bellstrike - Splendor Build','Build','guides/builds/bellstrike-splendor.html','Nameless Sword Spear'],['Bellstrike - Umbra Build','Build','guides/builds/bellstrike-umbra.html','Strategic Sword Heavenquaker'],['Silkbind - Jade Build','Build','guides/builds/silkbind-jade.html','Vernal Umbrella Inkwell Fan'],['Silkbind - Deluge Build','Build','guides/builds/silkbind-deluge.html','Panacea Fan Soulshade Umbrella'],['Bamboocut - Wind Build','Build','guides/builds/bamboocut-wind.html','Infernal Twinblades Mortal Rope Dart'],['Stonesplit - Might Build','Build','guides/builds/stonesplit-might.html','Stormbreaker Spear Thundercry Blade'],['Bamboocut - Dust Build','Build','guides/builds/bamboocut-dust.html','Everspring Umbrella Unfettered Rope Dart'],['Stonesplit - Strength Build','Build','guides/builds/stonesplit-strength.html','Snowparting Phalanxbane'],['Bamboocut - Kite Build','Build','guides/builds/bamboocut-kite.html','Skygrasp Heavenwill'],['Bamboocut - Draught Build','Build','guides/builds/bamboocut-draught.html','Skystrike Riven Version 2.1'],
    ['Endgame','Guide','guides/endgame/index.html','Heroes Realm Sword Trial Arena Guild War'],['Heroes Realm','Endgame','guides/endgame/heroes-realm.html','PvE bosses'],['Sword Trial','Endgame','guides/endgame/sword-trial.html','timed PvE leaderboard'],['Arena','Endgame','guides/endgame/arena.html','PvP 3v3 cross server'],['Guild War','Endgame','guides/endgame/guild-war.html','guild PvP league'],['Path Trials','Endgame','guides/endgame/path-trials.html','Path tutorial challenge'],['Perception Forest','Endgame','guides/endgame/perception-forest.html','battle royale sect severance'],['Version 2.1 Clouded Revelation','Update','updates/version-2-1.html','Hidden Mountain Mohist Hill current update']
  ].map(p=>({title:p[0],type:p[1],path:p[2],desc:p[3]}));

  window.WIKI_SEARCH = window.WIKI_SEARCH || [];
  const known = new Set(window.WIKI_SEARCH.map(p=>p.path));
  extraPages.forEach(p=>{ if(!known.has(p.path)) window.WIKI_SEARCH.push(p); });

  const overlay = document.getElementById('overlay');
  const browseBtn = document.getElementById('browseBtn');
  const drawerClose = document.getElementById('drawerClose');
  const closeDrawer = () => { if(sidebar) sidebar.classList.remove('open'); if(overlay) overlay.classList.remove('show'); document.body.style.overflow=''; };
  const openDrawer = () => { if(sidebar) sidebar.classList.add('open'); if(overlay) overlay.classList.add('show'); document.body.style.overflow='hidden'; };
  if (browseBtn) browseBtn.addEventListener('click',openDrawer);
  if (drawerClose) drawerClose.addEventListener('click',closeDrawer);
  if (overlay) overlay.addEventListener('click',closeDrawer);
  if (sidebar) sidebar.querySelectorAll('a').forEach(a=>a.addEventListener('click',closeDrawer));

  const pages = window.WIKI_SEARCH;
  const runSearch = (value,target) => {
    const q = value.trim().toLowerCase();
    if(!q){target.classList.remove('show');target.innerHTML='';return;}
    const matches = pages.filter(p=>`${p.title} ${p.type} ${p.desc}`.toLowerCase().includes(q)).slice(0,15);
    target.innerHTML = matches.length ? matches.map(p=>`<a class="search-item" href="${root}${p.path}"><b>${p.title}</b><span>${p.type} · ${p.desc}</span></a>`).join('') : '<div class="search-item"><span>No matching pages yet</span></div>';
    target.classList.add('show');
  };
  const search = document.getElementById('search');
  const results = document.getElementById('searchResults');
  const searchButton = document.getElementById('searchButton');
  if(search && results){search.addEventListener('input',()=>runSearch(search.value,results));search.addEventListener('keydown',e=>{if(e.key==='Enter'){runSearch(search.value,results);const first=results.querySelector('a');if(first) location.href=first.href;}});}
  if(searchButton && search && results) searchButton.addEventListener('click',()=>runSearch(search.value,results));
  const heroSearch=document.getElementById('heroSearch'); const heroResults=document.getElementById('heroSearchResults');
  if(heroSearch&&heroResults) heroSearch.addEventListener('input',()=>runSearch(heroSearch.value,heroResults));
  document.addEventListener('click',e=>{if(!e.target.closest('.global-search')&&results)results.classList.remove('show');if(!e.target.closest('.hero-search')&&heroResults)heroResults.classList.remove('show');});
})();