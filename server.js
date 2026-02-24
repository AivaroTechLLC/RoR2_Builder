// ── Express server ─────────────────────────────────────────────────────────
const express = require('express');
const path = require('path');
const items = require('./src/items');
const builds = require('./src/builds');
const scraper = require('./src/scraper');

const app = express();
const PORT = process.env.PORT || 3000;

// ── static files ───────────────────────────────────────────────────────────
app.use(express.static(path.join(__dirname, 'public')));

// ── API: build data ────────────────────────────────────────────────────────
app.get('/api/builds', (_req, res) => {
  res.json({ items, survivors: builds });
});

// ── API: cached patch data ─────────────────────────────────────────────────
app.get('/api/patches', (_req, res) => {
  const cache = scraper.readCache();
  res.json(cache);
});

// ── API: icon proxy (fetch from wiki, cache locally, serve to browser) ──────
const fs = require('fs');
const fetch = require('node-fetch');
const ICON_DIR = path.join(__dirname, 'public', 'icons');
const WIKI_BASE = 'https://riskofrain2.wiki.gg/wiki/Special:FilePath/';

app.get('/api/icon/:key', async (req, res) => {
  const key = req.params.key.replace(/[^a-zA-Z0-9_-]/g, '');
  const item = items[key];
  if (!item) return res.status(404).send('Unknown item');

  const localPath = path.join(ICON_DIR, key + '.png');

  // Serve from cache if available
  if (fs.existsSync(localPath)) {
    res.set('Cache-Control', 'public, max-age=604800');
    return res.sendFile(localPath);
  }

  // Fetch from wiki with proper headers, cache, and serve
  try {
    const url = WIKI_BASE + encodeURIComponent(item.file);
    const wikiRes = await fetch(url, {
      redirect: 'follow',
      timeout: 10000,
      headers: {
        'User-Agent': 'RoR2BuildReference/1.0 (local app; icon cache)',
        Accept: 'image/png,image/*,*/*',
      },
    });
    if (!wikiRes.ok) throw new Error(`Wiki returned ${wikiRes.status}`);
    const buf = await wikiRes.buffer();
    if (!fs.existsSync(ICON_DIR)) fs.mkdirSync(ICON_DIR, { recursive: true });
    fs.writeFileSync(localPath, buf);
    res.set('Content-Type', 'image/png');
    res.set('Cache-Control', 'public, max-age=604800');
    res.send(buf);
  } catch (err) {
    console.warn(`[icon-proxy] Failed for ${key}: ${err.message}`);
    res.status(502).send('Icon fetch failed');
  }
});

// ── API: force refresh (re-fetch patches + re-cache icons) ─────────────────
app.post('/api/refresh', async (_req, res) => {
  try {
    const result = await scraper.refresh(false);
    res.json({ ok: true, ...result });
  } catch (err) {
    res.status(500).json({ ok: false, error: err.message });
  }
});

// ── Startup: background refresh ────────────────────────────────────────────
app.listen(PORT, '0.0.0.0', async () => {
  console.log(`\n  ╔══════════════════════════════════════════════════╗`);
  console.log(
    `  ║  RoR2 Build Reference running on port ${String(PORT).padEnd(5)}      ║`,
  );
  console.log(
    `  ║  Open:  http://localhost:${String(PORT).padEnd(5)}                 ║`,
  );
  console.log(`  ╚══════════════════════════════════════════════════╝\n`);

  // Auto-fetch latest patches on startup (icons load on-demand via proxy)
  scraper
    .refresh(false)
    .then(() => {
      console.log('[startup] Patch data is up to date. Icons load on-demand.');
    })
    .catch((err) => {
      console.warn('[startup] Background refresh failed:', err.message);
    });
});
