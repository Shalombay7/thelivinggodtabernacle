import type { ApiResponse } from "@/features/home/types";
import { SectionHeading } from "@/components/home/section-heading";
import { worshipPillars } from "@/features/home/content";

interface AboutSectionProps {
  data: ApiResponse;
}

export function AboutSection({ data }: AboutSectionProps) {
  return (
    <section id="about" aria-labelledby="about-title" className="mt-8 grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
      <article className="section-card-soft rounded-[2rem] p-7 sm:p-8">
        <SectionHeading
          eyebrow="Our Mission"
          title="Built for worship, discipleship, and spiritual family."
          titleId="about-title"
        />
        <p className="mt-5 text-base leading-8 text-[var(--color-muted)]">
          {data.about.mission}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          {worshipPillars.map((pillar) => (
            <div key={pillar.title} className="rounded-[1.5rem] border border-[rgba(31,90,67,0.08)] bg-white/55 p-4">
              <p className="serif-display text-xl text-[var(--color-primary)]">{pillar.title}</p>
              <p className="mt-2 text-sm leading-7 text-[var(--color-muted)]">{pillar.text}</p>
            </div>
          ))}
        </div>
      </article>

      <article className="section-card-warm rounded-[2rem] p-7 sm:p-8">
        <p className="eyebrow">What We Believe</p>
        <blockquote className="mt-4 font-[family-name:var(--font-heading)] text-3xl leading-tight text-[var(--color-primary)]">
          “{data.about.statementOfFaith}”
        </blockquote>
        <p className="mt-6 text-sm leading-7 text-[var(--color-muted)]">
          Our theology is not treated as abstract language. It is meant to shape a lived culture of
          prayer, compassion, holiness, and joyful service.
        </p>
      </article>
    </section>
  );
}
