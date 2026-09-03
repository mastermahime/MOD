(() => {
  const root = document.body.dataset.root || './';
  const nav = [
    ['Home','index.html'],['Equipment','categories/equipment.html'],['Combat','categories/combat.html'],['Builds','categories/builds.html'],['World','categories/world.html']
  ];
  const side = [
    ['GETTING STARTED',[['Beginner Guide','guides/getting-started/beginner-guide.html'],['Progression','guides/getting-started/progression.html']]],
    ['EQUIPMENT',[['Equipment Overview','categories/equipment.html'],['Weapons','database/weapons/index.html'],['Armor Sets','database/armor/index.html'],['Gear Progression','guides/equipment/gear-progression.html']]],
    ['COMBAT',[['Combat Overview','categories/combat.html'],['Inner Ways','database/inner-ways/index.html'],['Mystic Skills','database/mystic-skills/index.html'],['Builds','categories/builds.html']]],
    ['JIANGHU',[['Guilds','guides/social/guilds.html'],['Sects','categories/world.html#sects'],['Regions','categories/world.html#regions']]]
  ];
  const current = location.pathname;
  const link = (label,path,cls='') => `<a class="${cls}" href="${root}${path}">${label}</a>`;
  document.getElementById('site-header').innerHTML = `<header class="topbar"><button class="menu-btn" id="menuBtn" aria-label="Menu">☰</button><a class="brand" href="${root}index.html"><div class="brand-mark">剑</div><span>JIANGHU ARCHIVE</span></a><nav class="topnav">${nav.map(n=>link(n[0],n[1])).join('')}</nav><div class="search-wrap"><span class="search-icon">⌕</span><input id="search" class="search" placeholder="Search guides..." autocomplete="off"><div id="searchResults" class="search-results"></div></div></header>`;
  document.getElementById('site-sidebar').innerHTML = side.map(group => `<div class="side-title">${group[0]}</div>${group[1].map(item=>`<a class="side-link" href="${root}${item[1]}"><span class="side-dot"></span>${item[0]}</a>`).join('')}`).join('');
  document.getElementById('site-rightbar').innerHTML = `<div class="widget"><h3>Popular Guides</h3><div class="widget-body">${link('Gear Progression','guides/equipment/gear-progression.html','widget-link')}${link('All Inner Ways','database/inner-ways/index.html','widget-link')}${link('Mystic Skills','database/mystic-skills/index.html','widget-link')}${link('Guild Benefits','guides/social/guilds.html','widget-link')}</div></div><div class="widget"><h3>Editing Structure</h3><div class="widget-body"><a class="widget-link" href="${root}templates/article-template.html">Article Template</a><a class="widget-link" href="${root}templates/database-template.html">Database Template</a></div></div>`;

  const overlay = document.getElementById('overlay');
  const sidebar = document.getElementById('site-sidebar');
  const closeMenu = () => { sidebar.classList.remove('open'); overlay.classList.remove('show'); };
  document.getElementById('menuBtn').addEventListener('click',()=>{sidebar.classList.toggle('open');overlay.classList.toggle('show')});
  overlay.addEventListener('click',closeMenu);

  const pages = window.WIKI_SEARCH || [];
  const search = document.getElementById('search');
  const results = document.getElementById('searchResults');
  search.addEventListener('input',()=>{
    const q = search.value.trim().toLowerCase();
    if(!q){results.classList.remove('show');results.innerHTML='';return;}
    const matches = pages.filter(p => `${p.title} ${p.type} ${p.desc}`.toLowerCase().includes(q)).slice(0,10);
    results.innerHTML = matches.length ? matches.map(p=>`<a class="search-item" href="${root}${p.path}"><b>${p.title}</b><span>${p.type} · ${p.desc}</span></a>`).join('') : '<div class="search-item"><span>No results found</span></div>';
    results.classList.add('show');
  });
  document.addEventListener('click',e=>{if(!e.target.closest('.search-wrap')) results.classList.remove('show')});
})();