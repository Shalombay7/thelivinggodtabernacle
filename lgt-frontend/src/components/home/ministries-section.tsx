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
    <section id="ministries" aria-labelledby="ministries-title" className="section-card-soft mt-8 rounded-lg p-7 sm:p-9">
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
            className={`floating-card rounded-lg border p-5 ${
              module.active
                ? "border-[rgba(54,85,143,0.14)] bg-[linear-gradient(145deg,rgba(255,255,255,0.98),rgba(238,232,247,0.9))] shadow-[0_18px_45px_rgba(42,55,92,0.08)]"
                : "border-[rgba(54,85,143,0.08)] bg-[rgba(237,240,248,0.72)] opacity-75"
            }`}
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-4">
                <span
                  aria-hidden="true"
                  className="flex h-12 w-12 items-center justify-center rounded-md bg-[linear-gradient(135deg,rgba(54,85,143,0.12),rgba(118,84,165,0.12),rgba(199,151,47,0.14))] text-2xl text-[var(--color-primary)]"
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
                    ? "bg-[rgba(118,84,165,0.12)] text-[var(--color-secondary)]"
                    : "bg-[rgba(122,98,62,0.12)] text-[var(--color-muted)]"
                }`}
              >
                {module.active ? "Available" : "Coming soon"}
              </span>
            </div>
            <p className="mt-5 text-sm leading-7 text-[var(--color-muted)]">
              For {module.audience.toLowerCase()}, with a clearer sense of purpose and belonging.
            </p>
            <div className="mt-5 h-px bg-[linear-gradient(90deg,rgba(54,85,143,0.18),rgba(118,84,165,0.16),transparent)]" />
            <p className="mt-4 text-sm text-[var(--color-muted-soft)]">
              Crafted to feel pastoral, intentional, and spiritually nourishing.
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
