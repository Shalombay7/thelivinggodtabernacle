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
