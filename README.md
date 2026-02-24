# RoR2 Meta Build Reference

A local web app that gives you an **icon-based visual build cheat sheet** for every Risk of Rain 2 survivor — plus live patch note checking so your builds stay current.

## Quick Start

```bash
npm install
npm start
```

Then open **http://localhost:3000** in your browser (or on a second monitor while playing).

## Features

| Feature | Details |
|---------|---------|
| Visual item tiles | Game icons with color-coded rarity borders — no reading required |
| All 18 official survivors | Commando → Drifter, including all DLC |
| Core / Then Add priority | Know exactly what to grab first |
| Live patch checking | Pulls latest Steam patch notes on startup |
| Check for Updates button | One click to re-fetch patches and icons |
| Local icon cache | Downloads icons once, works offline after that |
| Survivor filter | Click any survivor name to zoom in on their build |
| Expandable patch notes | See what changed without leaving the app |

## Commands

| Command | What it does |
|---------|-------------|
| `npm start` | Launch the app on port 3000 (auto-refreshes patches + icons) |
| `npm run cache-icons` | Force re-download all item icons |

## File Structure

```
├── server.js            # Express server + API
├── public/
│   ├── index.html       # Visual build reference UI
│   └── icons/           # Locally cached item icons (auto-created)
├── src/
│   ├── items.js         # Item database (name, icon file, tier, tag)
│   ├── builds.js        # Survivor build recommendations
│   ├── scraper.js       # Patch note fetcher + icon cacher
│   └── cache-icons.js   # Standalone icon downloader
└── data/
    └── meta-cache.json  # Cached patch data (auto-created)
```

## How it works
1. On `npm start`, the server fetches the latest RoR2 patch notes from Steam's news API
2. It downloads item icons from wiki.gg and caches them in `public/icons/`
3. The frontend loads build data + icons from the local server (fast, no external deps during play)
4. Click "Check for Updates" anytime to re-fetch the latest patches
