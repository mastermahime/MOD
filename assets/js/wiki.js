(() => {
  const root = document.body.dataset.root || './';

  // Force fresh shared styling after redesigns so old cached CSS cannot mix with new HTML.
  document.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
    const href = link.getAttribute('href') || '';
    if (href.includes('wiki.css') && !href.includes('v=fextra4')) link.href = href.split('?')[0] + '?v=fextra4';
  });

  const nav = [
    ['Home','index.html'],
    ['General','guides/getting-started/beginner-guide.html'],
    ['Character','database/inner-ways/index.html'],
    ['Equipment','categories/equipment.html'],
    ['World','categories/world.html'],
    ['Guides','categories/builds.html']
  ];

  const groups = [
    ['START HERE',[
      ['Beginner Guide','guides/getting-started/beginner-guide.html'],
      ['Progression Roadmap','guides/getting-started/progression.html']
    ]],
    ['CHARACTER & COMBAT',[
      ['Martial Arts','database/martial-arts/index.html'],
      ['Inner Ways','database/inner-ways/index.html'],
      ['Mystic Skills','database/mystic-skills/index.html'],
      ['Builds','categories/builds.html']
    ]],
    ['EQUIPMENT',[
      ['Weapons','database/weapons/index.html'],
      ['Armor & Gear Sets','database/armor/index.html'],
      ['Equipment Hub','categories/equipment.html'],
      ['Gear Progression','guides/equipment/gear-progression.html']
    ]],
    ['WORLD & COMMUNITY',[
      ['World & Exploration','categories/world.html'],
      ['Guilds & Social','guides/social/guilds.html'],
      ['Sects','categories/world.html#sects'],
      ['Regions','categories/world.html#regions']
    ]]
  ];

  const headerHost = document.getElementById('site-header');
  if (headerHost) {
    headerHost.className = 'site-header';
    headerHost.innerHTML = `
      <div class="utility-bar">
        <div class="utility-inner">
          <button class="menu-square" id="browseBtn" type="button" aria-label="Browse wiki">☰</button>
          <a class="archive-brand" href="${root}index.html"><span class="archive-mark">风</span><strong>JIANGHU ARCHIVE</strong></a>
          <div class="global-search">
            <span class="search-glyph">⌕</span>
            <input id="search" placeholder="Search the wiki" autocomplete="off" aria-label="Search wiki">
            <button class="search-button" type="button">Search</button>
            <div id="searchResults" class="search-results"></div>
          </div>
          <span class="community-tag">COMMUNITY WIKI</span>
        </div>
      </div>
      <div class="game-nav-shell">
        <div class="game-nav-inner">
          <a class="game-brand" href="${root}index.html"><span class="game-mark">风</span><span class="game-copy"><b>WHERE WINDS MEET</b><small>WIKI</small></span></a>
          <nav class="header-nav">${nav.map(n=>`<a href="${root}${n[1]}">${n[0]} <span>⌄</span></a>`).join('')}</nav>
        </div>
      </div>`;
  }

  const sidebar = document.getElementById('site-sidebar');
  if (sidebar) {
    sidebar.classList.add('sidebar');
    sidebar.innerHTML = `
      <div class="drawer-head"><strong>Wiki Navigation</strong><button class="drawer-close" id="drawerClose" type="button" aria-label="Close menu">×</button></div>
      ${groups.map(group => `<div class="side-title">${group[0]}</div>${group[1].map(item=>`<a class="side-link" href="${root}${item[1]}">${item[0]}</a>`).join('')}`).join('')}`;
  }

  const rightbar = document.getElementById('site-rightbar');
  if (rightbar) rightbar.innerHTML = '';

  const overlay = document.getElementById('overlay');
  const browseBtn = document.getElementById('browseBtn');
  const drawerClose = document.getElementById('drawerClose');
  const closeDrawer = () => {
    if (sidebar) sidebar.classList.remove('open');
    if (overlay) overlay.classList.remove('show');
    document.body.style.overflow = '';
  };
  const openDrawer = () => {
    if (sidebar) sidebar.classList.add('open');
    if (overlay) overlay.classList.add('show');
    document.body.style.overflow = 'hidden';
  };
  if (browseBtn) browseBtn.addEventListener('click', openDrawer);
  if (drawerClose) drawerClose.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);
  if (sidebar) sidebar.querySelectorAll('a').forEach(a => a.addEventListener('click', closeDrawer));

  const pages = window.WIKI_SEARCH || [];
  const runSearch = (value, target) => {
    const q = value.trim().toLowerCase();
    if (!q) { target.classList.remove('show'); target.innerHTML = ''; return; }
    const matches = pages.filter(p => `${p.title} ${p.type} ${p.desc}`.toLowerCase().includes(q)).slice(0,12);
    target.innerHTML = matches.length
      ? matches.map(p=>`<a class="search-item" href="${root}${p.path}"><b>${p.title}</b><span>${p.type} · ${p.desc}</span></a>`).join('')
      : '<div class="search-item"><span>No matching pages yet</span></div>';
    target.classList.add('show');
  };

  const search = document.getElementById('search');
  const results = document.getElementById('searchResults');
  if (search && results) search.addEventListener('input', () => runSearch(search.value, results));

  const heroSearch = document.getElementById('heroSearch');
  const heroResults = document.getElementById('heroSearchResults');
  if (heroSearch && heroResults) heroSearch.addEventListener('input', () => runSearch(heroSearch.value, heroResults));

  document.addEventListener('click', e => {
    if (!e.target.closest('.global-search') && results) results.classList.remove('show');
    if (!e.target.closest('.hero-search') && heroResults) heroResults.classList.remove('show');
  });
})();