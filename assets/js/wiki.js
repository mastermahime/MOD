(() => {
  const root = document.body.dataset.root || './';
  const nav = [
    ['Home','index.html'],
    ['Martial Arts','database/martial-arts/index.html'],
    ['Inner Ways','database/inner-ways/index.html'],
    ['Mystic Skills','database/mystic-skills/index.html'],
    ['Equipment','categories/equipment.html'],
    ['Builds','categories/builds.html'],
    ['World','categories/world.html']
  ];

  const groups = [
    ['START HERE',[
      ['Beginner Guide','guides/getting-started/beginner-guide.html'],
      ['Progression Roadmap','guides/getting-started/progression.html']
    ]],
    ['COMBAT DATABASE',[
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
    ['JIANGHU',[
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
      <div class="header-main">
        <button class="browse-btn" id="browseBtn" type="button" aria-label="Browse wiki"><b>☰</b><span>Browse</span></button>
        <a class="brand" href="${root}index.html">
          <div class="brand-seal">风</div>
          <div class="brand-copy"><strong>JIANGHU ARCHIVE</strong><small>WHERE WINDS MEET WIKI</small></div>
        </a>
        <div class="global-search">
          <span class="search-glyph">⌕</span>
          <input id="search" placeholder="Search the archive..." autocomplete="off" aria-label="Search wiki">
          <div id="searchResults" class="search-results"></div>
        </div>
      </div>
      <nav class="header-nav"><div class="header-nav-inner">${nav.map(n=>`<a href="${root}${n[1]}">${n[0]}</a>`).join('')}</div></nav>`;
  }

  const sidebar = document.getElementById('site-sidebar');
  if (sidebar) {
    sidebar.classList.add('sidebar');
    sidebar.innerHTML = `
      <div class="drawer-head"><strong>Browse Wiki</strong><button class="drawer-close" id="drawerClose" type="button" aria-label="Close menu">×</button></div>
      ${groups.map(group => `<div class="side-title">${group[0]}</div>${group[1].map(item=>`<a class="side-link" href="${root}${item[1]}">${item[0]}</a>`).join('')}`).join('')}
    `;
  }

  const rightbar = document.getElementById('site-rightbar');
  if (rightbar) {
    rightbar.classList.add('rightbar');
    rightbar.innerHTML = `
      <div class="widget"><h3>Core Databases</h3><div class="widget-body">
        <a class="widget-link" href="${root}database/martial-arts/index.html">Martial Arts</a>
        <a class="widget-link" href="${root}database/inner-ways/index.html">Inner Ways</a>
        <a class="widget-link" href="${root}database/mystic-skills/index.html">Mystic Skills</a>
        <a class="widget-link" href="${root}database/armor/index.html">Armor & Gear Sets</a>
        <a class="widget-link" href="${root}database/weapons/index.html">Weapons</a>
      </div></div>
      <div class="widget"><h3>Start Here</h3><div class="widget-body">
        <a class="widget-link" href="${root}guides/getting-started/beginner-guide.html">Beginner Guide</a>
        <a class="widget-link" href="${root}guides/equipment/gear-progression.html">Gear Progression</a>
        <a class="widget-link" href="${root}guides/social/guilds.html">Guilds & Social</a>
      </div></div>`;
  }

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
  if (sidebar) sidebar.querySelectorAll('a').forEach(a=>a.addEventListener('click', closeDrawer));

  const pages = window.WIKI_SEARCH || [];
  const runSearch = (value, target) => {
    const q = value.trim().toLowerCase();
    if (!q) { target.classList.remove('show'); target.innerHTML=''; return; }
    const matches = pages.filter(p => `${p.title} ${p.type} ${p.desc}`.toLowerCase().includes(q)).slice(0,12);
    target.innerHTML = matches.length
      ? matches.map(p=>`<a class="search-item" href="${root}${p.path}"><b>${p.title}</b><span>${p.type} · ${p.desc}</span></a>`).join('')
      : '<div class="search-item"><span>No matching pages yet</span></div>';
    target.classList.add('show');
  };

  const search = document.getElementById('search');
  const results = document.getElementById('searchResults');
  if (search && results) search.addEventListener('input',()=>runSearch(search.value,results));

  const heroSearch = document.getElementById('heroSearch');
  const heroResults = document.getElementById('heroSearchResults');
  if (heroSearch && heroResults) heroSearch.addEventListener('input',()=>runSearch(heroSearch.value,heroResults));

  document.addEventListener('click', e => {
    if (!e.target.closest('.global-search') && results) results.classList.remove('show');
    if (!e.target.closest('.hero-search') && heroResults) heroResults.classList.remove('show');
  });
})();