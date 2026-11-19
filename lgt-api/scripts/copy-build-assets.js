const fs = require('fs');
const path = require('path');

const projectRoot = path.resolve(__dirname, '..');

const assets = [
  ['src/views', 'dist/views'],
  ['src/public', 'dist/public'],
];

for (const [from, to] of assets) {
  const source = path.join(projectRoot, from);
  const destination = path.join(projectRoot, to);

  if (!fs.existsSync(source)) {
    continue;
  }

  fs.rmSync(destination, { force: true, recursive: true });
  fs.mkdirSync(path.dirname(destination), { recursive: true });
  fs.cpSync(source, destination, { recursive: true });
  console.log(`Copied ${from} to ${to}`);
}

const packagedFrontend = path.join(projectRoot, 'src', 'public', 'next-site');
if (!fs.existsSync(path.join(packagedFrontend, 'index.html'))) {
  throw new Error(
    `Packaged frontend export is missing at ${packagedFrontend}. Build and sync it before deploying.`,
  );
}

if (!fs.existsSync(path.join(packagedFrontend, 'sw.js'))) {
  throw new Error(`Packaged PWA service worker is missing at ${packagedFrontend}`);
}

console.log(`Using packaged frontend export from ${packagedFrontend}`);
