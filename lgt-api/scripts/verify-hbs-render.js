const fs = require('fs');
const path = require('path');
const hbs = require('hbs');

const projectRoot = path.resolve(__dirname, '..');
const viewsDir = path.join(projectRoot, 'dist', 'views');
const partialsDir = path.join(viewsDir, 'partials');
const indexTemplate = path.join(viewsDir, 'index.hbs');

if (!fs.existsSync(indexTemplate)) {
  throw new Error(`Missing homepage template: ${indexTemplate}`);
}

if (!fs.existsSync(partialsDir)) {
  throw new Error(`Missing partials directory: ${partialsDir}`);
}

for (const partialFile of fs.readdirSync(partialsDir)) {
  if (partialFile.endsWith('.hbs')) {
    hbs.registerPartial(
      path.basename(partialFile, '.hbs'),
      fs.readFileSync(path.join(partialsDir, partialFile), 'utf8'),
    );
  }
}

const template = hbs.handlebars.compile(fs.readFileSync(indexTemplate, 'utf8'));

template({
  appModules: [],
  beliefs: [],
  churchInfo: {},
  footerLinks: [],
  gatheringCards: [],
  hero: { stats: [] },
  message: { scripture: { lines: [] } },
  meta: {},
  navigation: [],
  prayer: { actions: [] },
  recentQuestions: [],
  resources: [],
});

console.log('dist/views/index.hbs renders with registered partials');
