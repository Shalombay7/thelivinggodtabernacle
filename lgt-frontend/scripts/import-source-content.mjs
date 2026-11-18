import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

const sourceOrigin = "https://thelivinggodtabernacle.org";
const outputPath = resolve("src/features/ministry/archive-content.json");
const fields = "id,slug,link,title,excerpt,content,date,parent";

async function readCollection(type) {
  const response = await fetch(`${sourceOrigin}/wp-json/wp/v2/${type}?per_page=100&_fields=${fields}`);
  if (!response.ok) throw new Error(`Could not read ${type}: HTTP ${response.status}`);
  return response.json();
}

async function readLandingPages() {
  const sitemapResponse = await fetch(`${sourceOrigin}/e-landing-page-sitemap.xml`);
  if (!sitemapResponse.ok) throw new Error(`Could not read landing page sitemap: HTTP ${sitemapResponse.status}`);
  const sitemap = await sitemapResponse.text();
  const urls = [...sitemap.matchAll(/<loc>([^<]+)<\/loc>/gi)].map((match) => match[1]);
  const pages = [];
  for (const [index, url] of urls.entries()) {
    try {
      const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
      if (!response.ok) continue;
      const html = await response.text();
      const pageBody = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/i)?.[1] || html.match(/<body\b[^>]*>([\s\S]*?)<\/body>/i)?.[1] || "";
      const heading = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i)?.[1] || html.match(/<title\b[^>]*>([\s\S]*?)<\/title>/i)?.[1] || "Ministry page";
      const sourcePath = new URL(url).pathname.replace(/\/+$/, "") || "/";
      const slug = sourcePath.split("/").filter(Boolean).at(-1) || `landing-${index + 1}`;
      pages.push({
        id: 100000 + index,
        type: "page",
        sourcePath,
        slug,
        appPath: routeFor(sourcePath, { type: "page", slug }),
        title: decodeEntities(heading.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim()),
        excerpt: "",
        content: cleanContent(pageBody),
        date: null,
        sourceUrl: url,
      });
    } catch {
      // Keep available landing pages; a blocked template page should not stop the import.
    }
  }
  return pages;
}

function decodeEntities(value = "") {
  return value
    .replace(/&#(\d+);/g, (_, code) => String.fromCodePoint(Number(code)))
    .replace(/&#x([\da-f]+);/gi, (_, code) => String.fromCodePoint(Number.parseInt(code, 16)))
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/gi, "&")
    .replace(/&lt;/gi, "<")
    .replace(/&gt;/gi, ">")
    .replace(/&quot;/gi, '"')
    .replace(/&#0*39;/g, "'")
    .replace(/&hellip;/gi, "…")
    .replace(/&ndash;/gi, "–")
    .replace(/&mdash;/gi, "—");
}

function routeFor(pathname, record) {
  const path = pathname.replace(/\/+$/, "") || "/";
  const fixedRoutes = new Map([
    ["/", "/"],
    ["/home", "/"],
    ["/message", "/message"],
    ["/services", "/services"],
    ["/resources", "/resources"],
    ["/sermons", "/sermons"],
    ["/teachings", "/teachings"],
    ["/hymns", "/hymns"],
    ["/videos", "/videos"],
    ["/gallery", "/gallery"],
    ["/questions", "/questions"],
    ["/questions-answers", "/questions"],
    ["/prayer", "/prayer"],
    ["/modules", "/modules"],
    ["/radio", "/radio"],
    ["/pure-biblical-teachings", "/pure-biblical-teachings"],
    ["/dashboard", "/dashboard"],
    ["/about", "/about"],
    ["/contact", "/contact"],
    ["/contact-us", "/contact"],
    ["/malachi-4-5-6", "/message"],
    ["/malachi-4-5-6/audio-sermons-2", "/sermons"],
    ["/malachi-4-5-6/did-you-know", "/teachings"],
    ["/malachi-4-5-6/gallery", "/gallery"],
    ["/malachi-4-5-6/hymns", "/hymns"],
    ["/malachi-4-5-6/prayer-requests-and-testimonies", "/prayer"],
    ["/malachi-4-5-6/some-of-the-mysteries-revealed-by-the-malachi-45-6-rev-107-prophet", "/pure-biblical-teachings"],
    ["/malachi-4-5-6/videos", "/videos"],
    ["/malachi-4-5-6/water-baptism", "/water-baptism"],
  ]);
  if (fixedRoutes.has(path)) return fixedRoutes.get(path);

  const sections = [
    ["/malachi-4-5-6/audio-sermons-2/", "/sermons/"],
    ["/malachi-4-5-6/did-you-know/", "/teachings/"],
    ["/malachi-4-5-6/hymns/", "/hymns/"],
    ["/malachi-4-5-6/some-of-the-mysteries-revealed-by-the-malachi-45-6-rev-107-prophet/", "/pure-biblical-teachings/"],
    ["/malachi-4-5-6/water-baptism/", "/water-baptism/"],
    ["/malachi-4-5-6/", "/message/"],
  ];
  for (const [sourcePrefix, appPrefix] of sections) {
    if (path.startsWith(sourcePrefix)) return `${appPrefix}${path.slice(sourcePrefix.length)}`.replace(/\/+$/, "");
  }

  if (record.type === "post") {
    const isQuestion = /question|q-a|adam-and-eve|book-of-life|body-of-christ|holy-ghost/i.test(record.slug);
    return `/${isQuestion ? "questions" : "posts"}/${record.slug}`;
  }
  return `/archive/${record.slug}`;
}

function cleanContent(html = "") {
  return html
    .replace(/<(script|style|form|noscript)\b[^>]*>[\s\S]*?<\/\1\s*>/gi, "")
    .replace(/<iframe\b([^>]*)>[\s\S]*?<\/iframe\s*>/gi, (frame, attributes) => {
      const src = attributes.match(/\bsrc=["']([^"']+)["']/i)?.[1] || "";
      return /https?:\/\/(www\.)?(youtube\.com|youtube-nocookie\.com|player\.vimeo\.com)\//i.test(src) ? frame : "";
    })
    .replace(/<input\b[^>]*\/?\s*>/gi, "")
    .replace(/\s+on[a-z]+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/(href|src)\s*=\s*(["'])\s*(?:javascript|vbscript):[^"']*\2/gi, "$1=$2#$2");
}

async function readAudioTracks(sourceUrl) {
  let html;
  try {
    const response = await fetch(sourceUrl, { signal: AbortSignal.timeout(15000) });
    if (!response.ok) return [];
    html = await response.text();
  } catch {
    return [];
  }
  const found = new Map();
  for (const match of html.matchAll(/(?:href|src)=["']([^"']+\.(?:mp3|m4a|wav)(?:\?[^"']*)?)["']/gi)) {
    try {
      const url = new URL(decodeEntities(match[1]), sourceOrigin);
      const key = url.href.replace(/[?#].*$/, "");
      const fileName = decodeURIComponent(url.pathname.split("/").pop() || "Audio message");
      const title = fileName
        .replace(/\.(?:mp3|m4a|wav)$/i, "")
        .replace(/^\d{4}[-_.\s]+\d{1,2}[-_.\s]+\d{1,2}[a-z]?[-_.\s]*/i, "")
        .replace(/[_-]+/g, " ")
        .replace(/\s+/g, " ")
        .trim();
      if (url.hostname === new URL(sourceOrigin).hostname) found.set(key, { title: title || fileName, url: key });
    } catch {
      // Ignore malformed media URLs and keep the text archive available.
    }
  }
  return [...found.values()];
}

const [pages, posts, landingPages] = await Promise.all([
  readCollection("pages"),
  readCollection("posts"),
  readLandingPages(),
]);
const records = [
  ...pages.map((page) => ({ ...page, type: "page" })),
  ...posts.map((post) => ({ ...post, type: "post" })),
  ...landingPages.map((page) => ({ ...page, type: "page" })),
].map((record) => {
  const sourceUrl = record.link || record.sourceUrl;
  const sourcePath = new URL(sourceUrl).pathname.replace(/\/+$/, "") || "/";
  return {
    id: record.id,
    type: record.type,
    sourcePath,
    slug: record.slug,
    appPath: routeFor(sourcePath, record),
    title: decodeEntities(record.title?.rendered || record.slug),
    excerpt: cleanContent(record.excerpt?.rendered || ""),
    content: cleanContent(record.content?.rendered || ""),
    date: record.date || null,
    sourceUrl,
  };
});

for (let index = 0; index < records.length; index += 5) {
  const batch = records.slice(index, index + 5);
  const trackLists = await Promise.all(batch.map((record) => readAudioTracks(record.sourceUrl)));
  batch.forEach((record, batchIndex) => {
    if (trackLists[batchIndex].length) record.audioTracks = trackLists[batchIndex];
  });
}

const routeBySourcePath = new Map(records.map((record) => [record.sourcePath, record.appPath]));
const routeBySlug = new Map();
for (const record of records) {
  const existing = routeBySlug.get(record.slug);
  if (!existing || record.appPath.length < existing.length) routeBySlug.set(record.slug, record.appPath);
}
const rewrittenRecords = records.map(({ sourceUrl, ...record }) => ({
  ...record,
  content: record.content.replace(/\bhref=(['"])([^'"]+)\1/gi, (attribute, quote, href) => {
    try {
      if (href.startsWith("#")) return attribute;
      const target = new URL(href, sourceOrigin);
      if (!target.hostname.endsWith("thelivinggodtabernacle.org")) return attribute;
      if (/\.(?:mp3|m4a|wav|mp4|3g2|3gp|mov|m4v|avi|pdf|jpe?g|png|gif|webp|svg|zip)$/i.test(target.pathname)) return attribute;
      const targetPath = target.pathname.replace(/\/+$/, "") || "/";
      const targetSlug = decodeURIComponent(targetPath.split("/").filter(Boolean).at(-1) || "archive");
      const appPath = routeBySourcePath.get(targetPath) || routeBySlug.get(targetSlug) || routeFor(targetPath, { type: "page", slug: targetSlug });
      return `href=${quote}${appPath}${target.search}${target.hash}${quote}`;
    } catch {
      return attribute;
    }
  }),
}));

await mkdir(dirname(outputPath), { recursive: true });
await writeFile(outputPath, `${JSON.stringify(rewrittenRecords, null, 2)}\n`, "utf8");
console.log(`Imported ${pages.length} pages, ${posts.length} posts, and ${landingPages.length} landing pages to ${outputPath}`);
