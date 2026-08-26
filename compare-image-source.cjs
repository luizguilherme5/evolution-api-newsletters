const crypto = require('node:crypto');
const fs = require('node:fs');
const path = require('node:path');

function walk(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const target = path.join(directory, entry.name);
    return entry.isDirectory() ? walk(target) : [target];
  });
}

function digestFile(file) {
  return crypto.createHash('sha256').update(fs.readFileSync(file)).digest('hex');
}

const sources = new Map();
for (const file of walk('/evolution/dist').filter((entry) => entry.endsWith('.map')).sort()) {
  const map = JSON.parse(fs.readFileSync(file, 'utf8'));
  if (!Array.isArray(map.sources) || !Array.isArray(map.sourcesContent)) continue;

  map.sources.forEach((source, index) => {
    const content = map.sourcesContent[index];
    if (typeof content !== 'string') return;

    const key = source.replaceAll('\\', '/');
    const existing = sources.get(key);
    if (existing !== undefined && existing !== content) {
      throw new Error(`Conflicting sourcesContent for ${key}`);
    }
    sources.set(key, content);
  });
}

const canonical = [...sources]
  .sort(([left], [right]) => left.localeCompare(right))
  .map(([source, content]) => `${source}\0${content}\0`)
  .join('');

console.log(`sources=${sources.size}`);
console.log(`sources_sha256=${crypto.createHash('sha256').update(canonical).digest('hex')}`);
console.log(`package_json_sha256=${digestFile('/evolution/package.json')}`);
console.log(`package_lock_sha256=${digestFile('/evolution/package-lock.json')}`);
console.log(`env_sha256=${digestFile('/evolution/.env')}`);
