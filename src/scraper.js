// ── Scraper / fetcher ──────────────────────────────────────────────────────
// 1. Fetches latest RoR2 patch notes from Steam Web API
// 2. Downloads + caches item icons locally so the app works offline
const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const items = require('./items');

const STEAM_APP_ID = '632360';
const STEAM_NEWS_URL = `https://api.steampowered.com/ISteamNews/GetNewsForApp/v2/?appid=${STEAM_APP_ID}&count=15&maxlength=600&format=json`;
const WIKI_ICON_BASE = 'https://riskofrain2.wiki.gg/wiki/Special:FilePath/';

const DATA_DIR = path.join(__dirname, '..', 'data');
const CACHE_FILE = path.join(DATA_DIR, 'meta-cache.json');
const ICON_DIR = path.join(__dirname, '..', 'public', 'icons');

// ── helpers ────────────────────────────────────────────────────────────────
function ensureDir(dir) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

function readCache() {
  try {
    return JSON.parse(fs.readFileSync(CACHE_FILE, 'utf-8'));
  } catch {
    return { patches: [], lastChecked: null, iconsCached: false };
  }
}

function writeCache(data) {
  ensureDir(DATA_DIR);
  fs.writeFileSync(CACHE_FILE, JSON.stringify(data, null, 2));
}

// ── Patch notes fetcher ────────────────────────────────────────────────────
async function fetchPatchNotes() {
  try {
    const res = await fetch(STEAM_NEWS_URL);
    const json = await res.json();
    const news = json?.appnews?.newsitems || [];

    // Filter to patch / update posts (skip community events, promos)
    const patches = news
      .filter((n) => {
        const t = (n.title || '').toLowerCase();
        return (
          t.includes('patch') ||
          t.includes('update') ||
          t.includes('hotfix') ||
          t.includes('balance') ||
          t.includes('notes') ||
          t.includes('dlc') ||
          t.includes('survivor') ||
          t.includes('version')
        );
      })
      .map((n) => ({
        title: n.title,
        url: n.url,
        date: new Date(n.date * 1000).toISOString().slice(0, 10),
        summary: (n.contents || '')
          .replace(/{STEAM_CLAN_IMAGE}[^\s]*/g, '')
          .substring(0, 500),
      }));

    // If no filtered results, take the first 5 news items as fallback
    const result = patches.length
      ? patches
      : news.slice(0, 5).map((n) => ({
          title: n.title,
          url: n.url,
          date: new Date(n.date * 1000).toISOString().slice(0, 10),
          summary: (n.contents || '')
            .replace(/{STEAM_CLAN_IMAGE}[^\s]*/g, '')
            .substring(0, 500),
        }));

    return result;
  } catch (err) {
    console.error('[scraper] Failed to fetch patch notes:', err.message);
    return [];
  }
}

// ── Icon cacher ────────────────────────────────────────────────────────────
const delay = (ms) => new Promise((r) => setTimeout(r, ms));

async function cacheIcons(force = false) {
  ensureDir(ICON_DIR);
  const keys = Object.keys(items);
  let cached = 0,
    skipped = 0,
    failed = 0;

  for (const key of keys) {
    const item = items[key];
    const localName = key + '.png';
    const localPath = path.join(ICON_DIR, localName);

    if (!force && fs.existsSync(localPath)) {
      skipped++;
      continue;
    }

    // Throttle requests to avoid wiki rate limits (429)
    if (cached > 0 || failed > 0) await delay(350);

    let attempts = 0;
    while (attempts < 3) {
      attempts++;
      try {
        const url = WIKI_ICON_BASE + encodeURIComponent(item.file);
        const res = await fetch(url, { redirect: 'follow', timeout: 10000 });
        if (res.status === 429) {
          console.warn(`[icons] Rate limited on ${item.name}, waiting ${attempts * 2}s…`);
          await delay(attempts * 2000);
          continue;
        }
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const buf = await res.buffer();
        fs.writeFileSync(localPath, buf);
        cached++;
        break;
      } catch (err) {
        if (attempts >= 3) {
          console.warn(`[icons] Failed: ${item.name} — ${err.message}`);
          failed++;
        } else {
          await delay(attempts * 1000);
        }
      }
    }
  }

  console.log(
    `[icons] Done — cached: ${cached}, skipped: ${skipped}, failed: ${failed}`,
  );
  return { cached, skipped, failed };
}

// ── Combined refresh ───────────────────────────────────────────────────────
async function refresh(forceIcons = false) {
  console.log('[scraper] Checking for latest patches…');
  const patches = await fetchPatchNotes();

  console.log('[scraper] Caching icons…');
  const iconResult = await cacheIcons(forceIcons);

  const cache = {
    patches,
    lastChecked: new Date().toISOString(),
    iconsCached: iconResult.failed === 0,
  };
  writeCache(cache);
  return cache;
}

module.exports = { fetchPatchNotes, cacheIcons, refresh, readCache };
