import { highlights } from "@/features/home/content";
import type { ApiResponse } from "@/features/home/types";
import { getAbsoluteUrl } from "@/features/home/data";
import { SmartLink } from "@/components/home/smart-link";

interface HeroSectionProps {
  data: ApiResponse;
}

export function HeroSection({ data }: HeroSectionProps) {
  const activeModules = data.modules.filter((module) => module.active).length;

  return (
    <section aria-labelledby="hero-title" className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-start">
      <div className="glass-panel relative overflow-hidden rounded-[2rem] p-7 sm:p-10">
        <div className="pointer-events-none absolute inset-x-10 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(195,148,58,0.45),transparent)]" />
        <div className="hero-kicker mb-5">A House of Worship and Hope</div>
        <h1
          id="hero-title"
          className="max-w-4xl font-[family-name:var(--font-heading)] text-5xl leading-[0.98] text-[var(--color-primary)] sm:text-6xl xl:text-7xl"
        >
          Come into a warmer, prayerful church experience shaped for belonging and renewal.
        </h1>
        <p className="mt-6 max-w-3xl text-lg leading-8 text-[var(--color-muted)] sm:text-xl">
          {data.vision} Every detail is meant to feel reassuring, spiritually uplifting, and deeply
          human for families, children, and every believer looking for a place to rest, grow, and
          worship together.
        </p>

        <div className="mt-8 flex flex-wrap gap-4">
          <SmartLink
            href={getAbsoluteUrl(data.churchInfo.socialLinks.youtube)}
            className="button-primary px-6 py-3"
            aria-label="Join the live broadcast on YouTube"
          >
            Join the Broadcast
          </SmartLink>
          <SmartLink href="#connect" className="button-secondary px-6 py-3">
            Plan Your Visit
          </SmartLink>
        </div>

        <div className="mt-8 grid gap-4 border-t border-[rgba(31,90,67,0.08)] pt-6 sm:grid-cols-3">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-soft)]">
              Gathering Rhythm
            </p>
            <p className="mt-2 text-base font-semibold text-[var(--color-primary)]">
              {data.churchInfo.serviceTime}
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-soft)]">
              Active Ministry Spaces
            </p>
            <p className="mt-2 text-base font-semibold text-[var(--color-primary)]">
              {activeModules} pathways serving the church family
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--color-muted-soft)]">
              Pastoral Tone
            </p>
            <p className="mt-2 text-base font-semibold text-[var(--color-primary)]">
              Grace-filled, Scripture-rooted, community-led
            </p>
          </div>
        </div>

        <div className="mt-10 grid gap-4 md:grid-cols-3">
          {highlights.map((highlight) => (
            <article
              key={highlight.title}
              className="section-card-soft floating-card rounded-[1.7rem] p-5"
            >
              <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)]">
                {highlight.title}
              </h2>
              <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">{highlight.text}</p>
            </article>
          ))}
        </div>
      </div>

      <aside aria-label="Service details and leadership welcome" className="grid gap-5">
        <div className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(160deg,#214f3d,#16372b_52%,#10261d)] p-7 text-white shadow-[0_28px_70px_rgba(17,71,52,0.28)]">
          <div className="pointer-events-none absolute -right-12 top-0 h-36 w-36 rounded-full bg-[rgba(255,255,255,0.09)] blur-3xl" />
          <div className="pointer-events-none absolute left-6 top-0 h-px w-32 bg-[linear-gradient(90deg,rgba(255,255,255,0.55),transparent)]" />
          <p className="text-sm uppercase tracking-[0.22em] text-white/75">Service Times</p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl">Worship with us</h2>
          <p className="mt-4 text-base leading-7 text-white/85">{data.churchInfo.serviceTime}</p>
          <p className="mt-3 text-sm leading-6 text-white/72">{data.churchInfo.address}</p>
          <div className="divider-glow mt-6" />
          <p className="mt-5 text-sm leading-7 text-white/76">
            Enter a gathering shaped by prayer, music, faithful teaching, and a sincere welcome.
          </p>
          <SmartLink href="#connect" className="mt-6 inline-flex rounded-full bg-white px-5 py-3 text-sm font-semibold text-[var(--color-primary)] transition hover:bg-[var(--color-surface-strong)]">
            Contact the Church
          </SmartLink>
        </div>

        <div className="section-card-warm rounded-[2rem] p-7">
          <p className="eyebrow">Pastor&apos;s Welcome</p>
          <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl text-[var(--color-primary)]">
            {data.leadership.pastor}
          </h2>
          <p className="mt-4 text-base leading-8 text-[var(--color-muted)]">{data.leadership.message}</p>
          <p className="mt-5 text-sm leading-7 text-[var(--color-muted-soft)]">
            We want every visitor to feel seen, safe, and encouraged from the moment they arrive.
          </p>
        </div>
      </aside>
    </section>
  );
}
