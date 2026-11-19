import { ministryNavigation, type MinistryPage } from "@/features/ministry/content";
import type { SourceArchiveEntry } from "@/features/ministry/archive-data";
import { sourceArchive as allSourceArchive } from "@/features/ministry/archive-data";
import { SourceContentSection } from "@/components/ministry/source-content-page";
import { SmartLink } from "@/components/home/smart-link";

interface MinistryPageProps {
  page: MinistryPage;
  sourceEntry?: SourceArchiveEntry;
}

export function MinistryPage({ page, sourceEntry }: MinistryPageProps) {
  const collectionPrefixes: Record<string, string[]> = {
    sermons: ["/sermons/"],
    teachings: ["/teachings/", "/pure-biblical-teachings/"],
    hymns: ["/hymns/"],
    "pure-biblical-teachings": ["/pure-biblical-teachings/"],
    "water-baptism": ["/water-baptism/"],
  };
  const archiveItems = allSourceArchive.filter((entry) =>
    collectionPrefixes[page.slug]?.some((prefix) => entry.appPath.startsWith(prefix)),
  );

  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="professional-panel sticky top-4 z-20 mb-8 px-4 py-3 sm:px-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <SmartLink href="/" className="flex items-center gap-3">
              <span className="brand-mark" aria-hidden="true">
                TLG
              </span>
              <span>
                <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  The Living God Tabernacle
                </span>
                <span className="block text-sm text-[var(--color-muted)]">
                  God's Spoken Word Evangelism
                </span>
              </span>
            </SmartLink>

            <nav aria-label="Primary" className="flex flex-wrap items-center gap-1 text-sm font-medium text-[var(--color-muted)]">
              {ministryNavigation.map((item) => (
                <SmartLink key={item.href} href={item.href} className="nav-link">
                  {item.label}
                </SmartLink>
              ))}
            </nav>
          </div>
        </header>

        <section className="professional-panel overflow-hidden">
          <div className="grid gap-8 p-6 sm:p-8 lg:grid-cols-[1.1fr_0.9fr] lg:p-10">
            <div>
              <p className="eyebrow">{page.eyebrow}</p>
              <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-heading)] text-5xl leading-none text-[var(--color-primary)] sm:text-6xl">
                {page.title}
              </h1>
              <p className="mt-5 max-w-3xl text-lg leading-8 text-[var(--color-muted)]">
                {page.summary}
              </p>
              <div className="mt-7 flex flex-wrap gap-3">
                {page.primaryAction ? (
                  <SmartLink href={page.primaryAction.href} className="button-primary px-5 py-3">
                    {page.primaryAction.label}
                  </SmartLink>
                ) : null}
                <SmartLink href="/resources" className="button-secondary px-5 py-3">
                  View resource hub
                </SmartLink>
              </div>
            </div>

            <aside className="rounded-lg border border-[rgba(54,85,143,0.12)] bg-[var(--color-surface-strong)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Page Snapshot
              </p>
              <div className="mt-4 grid gap-3">
                {page.highlights.map((item) => (
                  <div key={item} className="rounded-md border border-[rgba(54,85,143,0.1)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-primary)]">
                    {item}
                  </div>
                ))}
              </div>
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_20rem]">
          <div className="grid gap-5">
            {page.sections.map((section) => (
              <article
                key={section.title}
                id={page.slug === "sermons" && section.title === "Archive by Year" ? "archive-years" : undefined}
                className="professional-panel p-6 sm:p-7"
              >
                <h2 className="font-[family-name:var(--font-heading)] text-3xl text-[var(--color-primary)]">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">{section.body}</p>
                {section.items ? (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <li key={item} className="rounded-md border border-[rgba(54,85,143,0.1)] bg-white/70 px-4 py-3 text-sm text-[var(--color-muted)]">
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>

          <aside className="professional-panel h-fit p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
              Related Pages
            </p>
            <div className="mt-4 grid gap-2">
              {page.related.map((item) => (
                <SmartLink key={item.href} href={item.href} className="rounded-md border border-[rgba(54,85,143,0.1)] bg-white/70 px-4 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[rgba(118,84,165,0.24)] hover:bg-white">
                  {item.label}
                </SmartLink>
              ))}
            </div>
          </aside>
        </section>
        {archiveItems.length > 0 ? (
          <section className="professional-panel mt-6 p-5 sm:p-7" aria-labelledby="collection-index-title">
            <p className="eyebrow">Explore the archive</p>
            <h2 id="collection-index-title" className="mt-2 font-[family-name:var(--font-heading)] text-3xl text-[var(--color-primary)]">More in this collection</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {archiveItems.map((entry) => (
                <SmartLink key={entry.appPath} href={entry.appPath} className="rounded-lg border border-[rgba(54,85,143,0.12)] bg-white/75 p-4 transition hover:border-[rgba(118,84,165,0.26)] hover:bg-white">
                  <p className="text-sm font-semibold leading-6 text-[var(--color-primary)]">{entry.title}</p>
                  {entry.audioTracks?.length ? <p className="mt-2 text-xs text-[var(--color-muted-soft)]">{entry.audioTracks.length} recordings</p> : null}
                </SmartLink>
              ))}
            </div>
          </section>
        ) : null}
        {page.slug === "posts" ? (
          <section className="professional-panel mt-6 p-5 sm:p-7" aria-labelledby="post-index-title">
            <h2 id="post-index-title" className="font-[family-name:var(--font-heading)] text-3xl text-[var(--color-primary)]">All articles and questions</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {allSourceArchive.filter((entry) => entry.type === "post").map((entry) => (
                <SmartLink key={entry.appPath} href={entry.appPath} className="rounded-lg border border-[rgba(54,85,143,0.12)] bg-white/75 p-4 transition hover:border-[rgba(118,84,165,0.26)] hover:bg-white">
                  <p className="text-sm font-semibold leading-6 text-[var(--color-primary)]">{entry.title}</p>
                  {entry.date ? <p className="mt-2 text-xs text-[var(--color-muted-soft)]">{new Date(entry.date).toLocaleDateString("en", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</p> : null}
                </SmartLink>
              ))}
            </div>
          </section>
        ) : null}
        {sourceEntry ? <SourceContentSection entry={sourceEntry} /> : null}
      </div>
    </main>
  );
}
