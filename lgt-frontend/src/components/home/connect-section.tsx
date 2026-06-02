import type { ChurchInfo } from "@/features/home/types";
import { getAbsoluteUrl } from "@/features/home/data";
import { SectionHeading } from "@/components/home/section-heading";
import { SmartLink } from "@/components/home/smart-link";

interface ConnectSectionProps {
  churchInfo: ChurchInfo;
}

const connectionCards = [
  { key: "facebook", eyebrow: "Community", title: "Facebook Fellowship" },
  { key: "instagram", eyebrow: "Stories", title: "Instagram Moments" },
  { key: "youtube", eyebrow: "Messages", title: "Watch and Listen" },
] as const;

export function ConnectSection({ churchInfo }: ConnectSectionProps) {
  return (
    <section id="connect" aria-labelledby="connect-title" className="mt-8 grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
      <article className="relative overflow-hidden rounded-[2rem] bg-[linear-gradient(145deg,#224f3d,#174132_54%,#10271e)] p-7 text-white shadow-[0_30px_80px_rgba(17,71,52,0.28)] sm:p-8">
        <div className="pointer-events-none absolute right-[-2rem] top-[-2rem] h-40 w-40 rounded-full bg-[rgba(255,255,255,0.08)] blur-3xl" />
        <SectionHeading
          eyebrow="Connect"
          title="Let us help you take the next step."
          titleId="connect-title"
          theme="dark"
        />
        <p className="mt-4 max-w-2xl text-sm leading-7 text-white/78">
          Reach the church through familiar spaces that still feel pastoral, calm, and grounded in
          ministry rather than noise.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {connectionCards.map((card) => (
            <SmartLink
              key={card.key}
              href={getAbsoluteUrl(churchInfo.socialLinks[card.key])}
              className="floating-card rounded-[1.5rem] border border-white/15 bg-white/8 p-4 hover:bg-white/12"
            >
              <p className="text-xs uppercase tracking-[0.2em] text-white/60">{card.eyebrow}</p>
              <p className="mt-2 text-lg font-semibold">{card.title}</p>
            </SmartLink>
          ))}
          <SmartLink
            href={getAbsoluteUrl(churchInfo.givingUrl)}
            className="floating-card rounded-[1.5rem] border border-white/15 bg-white/8 p-4 hover:bg-white/12"
          >
            <p className="text-xs uppercase tracking-[0.2em] text-white/60">Stewardship</p>
            <p className="mt-2 text-lg font-semibold">Support the Ministry</p>
          </SmartLink>
        </div>
      </article>

      <article className="section-card-warm rounded-[2rem] p-7 sm:p-8">
        <SectionHeading eyebrow="Reach Out" title="We would love to hear from you." />
        <address className="mt-6 space-y-4 text-sm leading-7 text-[var(--color-muted)] not-italic">
          <p>
            <span className="font-semibold text-[var(--color-primary)]">Email:</span>{" "}
            <SmartLink
              href={`mailto:${churchInfo.contactEmail}`}
              className="interactive-link text-[var(--color-muted)]"
            >
              {churchInfo.contactEmail}
            </SmartLink>
          </p>
          <p>
            <span className="font-semibold text-[var(--color-primary)]">Address:</span>{" "}
            {churchInfo.address}
          </p>
          <p>
            <span className="font-semibold text-[var(--color-primary)]">Gathering Times:</span>{" "}
            {churchInfo.serviceTime}
          </p>
        </address>
        <div className="divider-glow mt-6" />
        <p className="mt-5 text-sm leading-7 text-[var(--color-muted-soft)]">
          If you are visiting for the first time, we want your first step to feel easy, clear, and
          genuinely cared for.
        </p>
      </article>
    </section>
  );
}
