import type { ApiResponse } from "@/features/home/types";
import { getAbsoluteUrl } from "@/features/home/data";
import { SmartLink } from "@/components/home/smart-link";

interface SiteFooterProps {
  data: ApiResponse;
}

export function SiteFooter({ data }: SiteFooterProps) {
  return (
    <footer className="section-card-soft mt-8 rounded-[2rem] px-6 py-8 sm:px-8">
      <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="eyebrow">{data.service}</p>
          <p className="mt-3 font-[family-name:var(--font-heading)] text-3xl text-[var(--color-primary)]">
            A church family shaped by worship, tenderness, truth, and steadfast faith.
          </p>
          <p className="mt-3 text-sm leading-7 text-[var(--color-muted)]">
            Designed to feel serene and trustworthy while still staying resilient, accessible, and
            fast when ministry data is unavailable.
          </p>
        </div>

        <nav aria-label="Footer" className="flex flex-wrap gap-3 text-sm font-medium text-[var(--color-primary)]">
          <SmartLink href="#about" className="rounded-full bg-white/85 px-4 py-2 transition hover:bg-white">
            About
          </SmartLink>
          <SmartLink href={getAbsoluteUrl(data.links.docs)} className="rounded-full bg-white/85 px-4 py-2 transition hover:bg-white">
            API Docs
          </SmartLink>
          <SmartLink href={getAbsoluteUrl(data.links.health)} className="rounded-full bg-white/85 px-4 py-2 transition hover:bg-white">
            Health Status
          </SmartLink>
        </nav>
      </div>
    </footer>
  );
}
