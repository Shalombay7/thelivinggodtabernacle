const fs = require('fs');
const path = require('path');
const { execFileSync } = require('child_process');

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

const repositoryRoot = path.resolve(projectRoot, '..');
const frontendRoot = path.join(repositoryRoot, 'lgt-frontend');
const frontendExport = path.join(frontendRoot, 'out');
const frontendDestination = path.join(projectRoot, 'dist', 'public', 'next-site');
const nextBinary = [
  path.join(repositoryRoot, 'node_modules', 'next', 'dist', 'bin', 'next'),
  path.join(frontendRoot, 'node_modules', 'next', 'dist', 'bin', 'next'),
].find((candidate) => fs.existsSync(candidate));

if (fs.existsSync(frontendRoot)) {
  if (!nextBinary) {
    throw new Error(
      'Next.js is not installed. Run npm install --include=dev from the lgt-frontend directory before building.',
    );
  }

  execFileSync(process.execPath, [nextBinary, 'build', '--webpack'], {
    cwd: frontendRoot,
    stdio: 'inherit',
  });

  if (!fs.existsSync(frontendExport)) {
    throw new Error(`Next.js export was not created at ${frontendExport}`);
  }

  fs.rmSync(frontendDestination, { force: true, recursive: true });
  fs.mkdirSync(path.dirname(frontendDestination), { recursive: true });
  fs.cpSync(frontendExport, frontendDestination, { recursive: true });
  console.log(`Copied frontend export to ${frontendDestination}`);
} else {
  console.warn('Frontend workspace was not found; skipping its static export.');
}
