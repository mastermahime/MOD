# Jianghu Archive

A modular GitHub Pages wiki for Where Winds Meet.

## Folder structure

```text
MOD/
├── index.html                 # Homepage
├── categories/                # Fextralife-style hub pages
│   ├── equipment.html
│   ├── combat.html
│   ├── builds.html
│   └── world.html
├── guides/                    # Long-form guide articles
│   ├── getting-started/
│   ├── equipment/
│   ├── social/
│   ├── builds/                # Add build pages here
│   └── world/                 # Add region/sect pages here
├── database/                  # Item/system databases
│   ├── weapons/
│   ├── armor/
│   ├── inner-ways/
│   └── mystic-skills/
├── assets/
│   ├── css/wiki.css           # ONE shared design file
│   └── js/wiki.js             # ONE shared header/sidebar/search script
├── data/search-index.js       # Search entries
└── templates/
    ├── article-template.html
    └── database-template.html
```

## How this works

The site shell is shared. Header, navigation, sidebars, mobile menu and search are controlled by `assets/js/wiki.js`. The design is controlled by `assets/css/wiki.css`. Individual pages contain mostly their own article content.

This means you can edit `database/armor/jadeclasp.html` without editing the homepage, navigation or CSS.

## Add a new normal guide

1. Copy `templates/article-template.html`.
2. Put the copy in the correct folder, for example `guides/equipment/divine-craft.html`.
3. Change the title, description and article content.
4. Because that example is two folders deep, set the page to `data-root="../../"` and use `../../assets/...` paths.
5. Add the page to `data/search-index.js`.
6. Link it from the relevant page in `categories/`.

## Add a new database entry

For armor sets, copy the database template into `database/armor/`, for example:

`database/armor/jadeclasp.html`

Then add a link to it in `database/armor/index.html` and add it to `data/search-index.js`.

Use the same pattern for weapons, Inner Ways and Mystic Skills.

## Folder depth rule

The `data-root` value tells the shared script how to get back to the site root:

- Root page: `data-root="./"`
- One folder deep: `data-root="../"`
- Two folders deep: `data-root="../../"`
- Three folders deep: `data-root="../../../"`

The CSS and JavaScript imports must use the same depth.

## Most common edits

- Change colors/design: `assets/css/wiki.css`
- Change navigation/sidebar: `assets/js/wiki.js`
- Change search results: `data/search-index.js`
- Change homepage: `index.html`
- Change one guide: edit only that guide's HTML file

## Publishing

GitHub Pages should publish from `main` and `/ (root)`. Once changes are merged into `main`, the website updates automatically.