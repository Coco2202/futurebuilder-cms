'use strict';

/**
 * Removes stray `@types/<name> 2` directories (macOS / cloud sync duplicate folders).
 * Those folders make TypeScript treat "accepts 2" etc. as implicit type libraries (TS2688).
 */
const fs = require('fs');
const path = require('path');

const atypes = path.join(__dirname, '..', 'node_modules', '@types');
if (!fs.existsSync(atypes)) {
  process.exit(0);
}

for (const name of fs.readdirSync(atypes)) {
  if (/ 2$/.test(name)) {
    fs.rmSync(path.join(atypes, name), { recursive: true, force: true });
  }
}
