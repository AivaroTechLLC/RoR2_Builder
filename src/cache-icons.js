// ── Standalone icon cache script ───────────────────────────────────────────
// Run: npm run cache-icons
const { cacheIcons } = require('./scraper');
cacheIcons(true).then(() => process.exit(0));
