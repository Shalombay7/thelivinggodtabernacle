import { getSourceArchiveEntry, type SourceArchiveEntry } from "@/features/ministry/archive-data";
import { ministryNavigation } from "@/features/ministry/content";
import { AudioArchive } from "@/components/ministry/audio-archive";
import { SmartLink } from "@/components/home/smart-link";

export function SourceContentPage({ entry }: { entry: SourceArchiveEntry }) {
  const parts = entry.appPath.split("/").filter(Boolean).slice(0, -1);
  let parentHref = "/resources";
  while (parts.length) {
    const candidate = `/${parts.join("/")}`;
    if (getSourceArchiveEntry(candidate)) {
      parentHref = candidate;
      break;
    }
    parts.pop();
  }
  if (entry.appPath.startsWith("/questions/") || entry.appPath.startsWith("/posts/")) parentHref = "/questions";

  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="professional-panel mb-6 px-4 py-3 sm:px-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <SmartLink href="/" className="flex items-center gap-3">
              <span className="brand-mark" aria-hidden="true">TLG</span>
              <span>
                <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">The Living God Tabernacle</span>
                <span className="block text-sm text-[var(--color-muted)]">Scripture, worship, and ministry resources</span>
              </span>
            </SmartLink>
            <nav aria-label="Primary" className="flex flex-wrap gap-1 text-sm font-medium text-[var(--color-muted)]">
              {ministryNavigation.map((item) => <SmartLink key={item.href} href={item.href} className="nav-link">{item.label}</SmartLink>)}
            </nav>
          </div>
        </header>

        <nav aria-label="Breadcrumb" className="mb-4 text-sm text-[var(--color-muted-soft)]">
          <SmartLink href={parentHref} className="interactive-link">Back to {parentHref === "/resources" ? "resources" : parentHref.split("/").filter(Boolean).at(-1)?.replaceAll("-", " ")}</SmartLink>
        </nav>

        <article className="professional-panel overflow-hidden">
          <header className="border-b border-[rgba(31,90,67,0.08)] px-6 py-8 sm:px-9 sm:py-10">
            <p className="eyebrow">{entry.type === "post" ? "Ministry article" : "Ministry archive"}</p>
            <h1 className="mt-3 max-w-5xl font-[family-name:var(--font-heading)] text-4xl leading-tight text-[var(--color-primary)] sm:text-5xl">{entry.title}</h1>
            {entry.date && <p className="mt-3 text-sm text-[var(--color-muted-soft)]">{new Date(entry.date).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</p>}
          </header>
          <div className="archive-content px-6 py-7 sm:px-9 sm:py-9" dangerouslySetInnerHTML={{ __html: entry.content }} />
          {entry.audioTracks?.length ? <div className="px-6 pb-8 sm:px-9"><AudioArchive tracks={entry.audioTracks} /></div> : null}
        </article>
        <footer className="py-7 text-center text-xs text-[var(--color-muted-soft)]">The Living God Tabernacle · Ministry archive</footer>
      </div>
    </main>
  );
}

export function SourceContentSection({ entry }: { entry: SourceArchiveEntry }) {
  return (
    <section className="professional-panel mt-6 overflow-hidden">
      <div className="archive-content px-6 py-7 sm:px-9 sm:py-9" dangerouslySetInnerHTML={{ __html: entry.content }} />
      {entry.audioTracks?.length ? <div className="px-6 pb-8 sm:px-9"><AudioArchive tracks={entry.audioTracks} /></div> : null}
    </section>
  );
}
