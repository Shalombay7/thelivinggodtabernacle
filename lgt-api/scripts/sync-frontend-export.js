const fs = require('fs');
const path = require('path');

const repositoryRoot = path.resolve(__dirname, '..', '..');
const frontendExport = path.join(repositoryRoot, 'lgt-frontend', 'out');
const packagedFrontend = path.join(__dirname, '..', 'src', 'next-site');

for (const requiredFile of ['index.html', 'sw.js']) {
  if (!fs.existsSync(path.join(frontendExport, requiredFile))) {
    throw new Error(`Frontend export is missing ${requiredFile}: ${frontendExport}`);
  }
}

fs.rmSync(packagedFrontend, { force: true, recursive: true });
fs.mkdirSync(path.dirname(packagedFrontend), { recursive: true });
fs.cpSync(frontendExport, packagedFrontend, { recursive: true });

console.log(`Copied the static frontend export to ${packagedFrontend}`);
