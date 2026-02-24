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
  // Icons are now fetched on-demand via the /api/icon/:key proxy.
  // This function only runs a quick count for status reporting.
  ensureDir(ICON_DIR);
  const keys = Object.keys(items);
  let cached = 0,
    missing = 0;

  for (const key of keys) {
    const localPath = path.join(ICON_DIR, key + '.png');
    if (fs.existsSync(localPath)) cached++;
    else missing++;
  }

  console.log(
    `[icons] ${cached} cached locally, ${missing} will load on-demand via proxy`,
  );
  return { cached, skipped: cached, failed: 0 };
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
