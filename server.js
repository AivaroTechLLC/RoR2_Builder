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

// ── Serialized wiki fetch queue (avoids 429 rate limits) ───────────────────
const _iconQueue = []; // { key, item, resolve, reject }
let _queueRunning = false;
const DELAY_MS = 500; // pause between wiki requests
const MAX_RETRIES = 4;

async function _processQueue() {
  if (_queueRunning) return;
  _queueRunning = true;

  while (_iconQueue.length > 0) {
    const { key, item, resolve, reject } = _iconQueue.shift();
    const localPath = path.join(ICON_DIR, key + '.png');

    // Another queued request may have cached it while we waited
    if (fs.existsSync(localPath)) {
      resolve(localPath);
      continue;
    }

    let lastErr;
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
      try {
        if (attempt > 1)
          await new Promise((r) => setTimeout(r, attempt * 1500));
        const url = WIKI_BASE + encodeURIComponent(item.file);
        const wikiRes = await fetch(url, {
          redirect: 'follow',
          timeout: 15000,
          headers: {
            'User-Agent': 'RoR2BuildReference/1.0 (local app; icon cache)',
            Accept: 'image/png,image/*,*/*',
          },
        });
        if (wikiRes.status === 429) {
          console.warn(
            `[icon-proxy] 429 on ${key}, retry ${attempt}/${MAX_RETRIES}…`,
          );
          lastErr = new Error('429 rate limited');
          continue;
        }
        if (!wikiRes.ok) throw new Error(`Wiki returned ${wikiRes.status}`);
        const buf = await wikiRes.buffer();
        if (!fs.existsSync(ICON_DIR))
          fs.mkdirSync(ICON_DIR, { recursive: true });
        fs.writeFileSync(localPath, buf);
        console.log(`[icon-proxy] Cached ${key} (${buf.length} bytes)`);
        resolve(localPath);
        lastErr = null;
        break;
      } catch (err) {
        lastErr = err;
      }
    }
    if (lastErr) {
      console.warn(
        `[icon-proxy] Failed ${key} after ${MAX_RETRIES} attempts: ${lastErr.message}`,
      );
      reject(lastErr);
    }

    // Delay before next wiki request
    await new Promise((r) => setTimeout(r, DELAY_MS));
  }

  _queueRunning = false;
}

function enqueueIconFetch(key, item) {
  return new Promise((resolve, reject) => {
    _iconQueue.push({ key, item, resolve, reject });
    _processQueue();
  });
}

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

  // Queue the wiki fetch (serialized to avoid 429)
  try {
    const cached = await enqueueIconFetch(key, item);
    res.set('Cache-Control', 'public, max-age=604800');
    res.sendFile(cached);
  } catch (err) {
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
