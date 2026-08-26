const fs = require('node:fs');

const targets = [
  {
    map: '/evolution/dist/api/integrations/channel/whatsapp/whatsapp.baileys.service.js.map',
    source: 'whatsapp.baileys.service.ts',
    markers: ['shouldIgnoreJid', 'sendMedia'],
  },
  {
    map: '/evolution/dist/api/integrations/channel/whatsapp/baileys.controller.js.map',
    source: 'baileys.controller.ts',
    markers: ['sendMedia'],
  },
];

for (const target of targets) {
  const map = JSON.parse(fs.readFileSync(target.map, 'utf8'));
  const index = map.sources.findIndex((source) => source.endsWith(target.source));
  const source = index >= 0 ? map.sourcesContent?.[index] : null;

  console.log(`SOURCE ${target.source}`);
  if (!source) {
    console.log('sourcesContent unavailable');
    continue;
  }

  for (const marker of target.markers) {
    const offset = source.indexOf(marker);
    console.log(`MARKER ${marker} OFFSET ${offset}`);
    if (offset >= 0) console.log(source.slice(Math.max(0, offset - 500), offset + 1400));
  }
}
