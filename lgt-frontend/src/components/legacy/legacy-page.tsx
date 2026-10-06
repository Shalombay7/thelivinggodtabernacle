import { legacyNavigation, type LegacyPage as LegacyPageContent } from "@/features/legacy/content";
import { SmartLink } from "@/components/home/smart-link";

interface LegacyPageProps {
  page: LegacyPageContent;
}

export function LegacyPage({ page }: LegacyPageProps) {
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
              {legacyNavigation.map((item) => (
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

            <aside className="rounded-lg border border-[rgba(31,90,67,0.1)] bg-[var(--color-surface-strong)] p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                Page Snapshot
              </p>
              <div className="mt-4 grid gap-3">
                {page.highlights.map((item) => (
                  <div key={item} className="rounded-md border border-[rgba(31,90,67,0.08)] bg-white px-4 py-3 text-sm font-semibold text-[var(--color-primary)]">
                    {item}
                  </div>
                ))}
              </div>
              {page.sourceUrl ? (
                <p className="mt-5 text-xs leading-6 text-[var(--color-muted-soft)]">
                  Content migrated from the legacy page at{" "}
                  <SmartLink href={page.sourceUrl} className="interactive-link font-semibold text-[var(--color-primary)]">
                    thelivinggodtabernacle.org
                  </SmartLink>
                  .
                </p>
              ) : null}
            </aside>
          </div>
        </section>

        <section className="mt-6 grid gap-5 lg:grid-cols-[1fr_20rem]">
          <div className="grid gap-5">
            {page.sections.map((section) => (
              <article key={section.title} className="professional-panel p-6 sm:p-7">
                <h2 className="font-[family-name:var(--font-heading)] text-3xl text-[var(--color-primary)]">
                  {section.title}
                </h2>
                <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">{section.body}</p>
                {section.items ? (
                  <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                    {section.items.map((item) => (
                      <li key={item} className="rounded-md border border-[rgba(31,90,67,0.08)] bg-white/70 px-4 py-3 text-sm text-[var(--color-muted)]">
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
                <SmartLink key={item.href} href={item.href} className="rounded-md border border-[rgba(31,90,67,0.08)] bg-white/70 px-4 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:border-[rgba(31,90,67,0.2)] hover:bg-white">
                  {item.label}
                </SmartLink>
              ))}
            </div>
          </aside>
        </section>
      </div>
    </main>
  );
}
