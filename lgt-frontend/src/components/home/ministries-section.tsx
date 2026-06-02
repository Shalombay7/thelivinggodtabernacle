import { featureLabels } from "@/features/home/content";
import type { MinistryModule } from "@/features/home/types";
import { SectionHeading } from "@/components/home/section-heading";

interface MinistriesSectionProps {
  modules: MinistryModule[];
}

function getModuleIcon(id: string) {
  switch (id) {
    case "altar":
      return "✦";
    case "explorers":
      return "☀";
    case "regen":
      return "➜";
    case "fellowship":
      return "♡";
    case "prayer":
      return "⌁";
    case "events":
      return "◫";
    case "media":
      return "▶";
    case "ministries":
      return "◆";
    default:
      return "•";
  }
}

export function MinistriesSection({ modules }: MinistriesSectionProps) {
  return (
    <section id="ministries" aria-labelledby="ministries-title" className="section-card-soft mt-8 rounded-[2.25rem] p-7 sm:p-9">
      <SectionHeading
        eyebrow="Ministry Spaces"
        title="Designed for the whole church family."
        description="Each space is presented as a meaningful invitation into discipleship, care, and shared spiritual life."
        align="between"
        titleId="ministries-title"
      />

      <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-3" role="list" aria-labelledby="ministries-title">
        {modules.map((module) => (
          <article
            key={module.id}
            role="listitem"
            className={`floating-card rounded-[1.75rem] border p-5 ${
              module.active
                ? "border-[rgba(31,90,67,0.12)] bg-[linear-gradient(180deg,rgba(255,251,244,0.96),rgba(248,239,225,0.94))] shadow-[0_18px_45px_rgba(12,33,25,0.08)]"
                : "border-[rgba(17,71,52,0.08)] bg-[rgba(242,238,228,0.72)] opacity-75"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(31,90,67,0.1),rgba(195,148,58,0.14))] text-2xl text-[var(--color-primary)]"
                >
                  {getModuleIcon(module.id)}
                </span>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-accent)]">
                    {featureLabels[module.id] || "Church life"}
                  </p>
                  <h3 className="mt-1 font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)]">
                    {module.name}
                  </h3>
                </div>
              </div>
              <span
                className={`rounded-full px-3 py-1 text-xs font-semibold ${
                  module.active
                    ? "bg-[rgba(17,71,52,0.1)] text-[var(--color-primary)]"
                    : "bg-[rgba(122,98,62,0.12)] text-[var(--color-muted)]"
                }`}
              >
                {module.active ? "Available" : "Coming soon"}
              </span>
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
              For {module.audience.toLowerCase()}, with a clearer sense of purpose and belonging.
            </p>
            <div className="mt-5 h-px bg-[linear-gradient(90deg,rgba(31,90,67,0.16),transparent)]" />
            <p className="mt-4 text-sm text-[var(--color-muted-soft)]">
              Crafted to feel pastoral, intentional, and spiritually nourishing.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
