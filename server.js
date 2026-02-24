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

  // Auto-fetch latest patches + icons on startup
  scraper
    .refresh(false)
    .then(() => {
      console.log('[startup] Patch data and icons are up to date.');
    })
    .catch((err) => {
      console.warn('[startup] Background refresh failed:', err.message);
    });
});
