const fs = require('node:fs');

const targets = [
  {
    path: '/evolution/dist/api/integrations/channel/whatsapp/whatsapp.baileys.service.js',
    before:
      ',d=(0,N.isJidNewsletter)(c);return l||u||d},syncFullHistory:',
    after:
      ',d=process.env.CONFIG_SESSION_PHONE_READ_NEWSLETTERS!=="true"&&(0,N.isJidNewsletter)(c);return l||u||d},syncFullHistory:',
  },
  {
    path: '/evolution/dist/api/integrations/channel/whatsapp/whatsapp.baileys.service.mjs',
    before: ',d=Ft(c);return l||u||d},syncFullHistory:',
    after:
      ',d=process.env.CONFIG_SESSION_PHONE_READ_NEWSLETTERS!=="true"&&Ft(c);return l||u||d},syncFullHistory:',
  },
];

for (const target of targets) {
  const source = fs.readFileSync(target.path, 'utf8');
  const occurrences = source.split(target.before).length - 1;

  if (occurrences !== 1) {
    throw new Error(
      `Expected exactly one newsletter filter in ${target.path}; found ${occurrences}`,
    );
  }

  const patched = source.replace(target.before, target.after);
  fs.writeFileSync(target.path, patched);

  if (!patched.includes(target.after)) {
    throw new Error(`Newsletter filter was not patched in ${target.path}`);
  }
}

console.log('Newsletter capture filter patched successfully.');
