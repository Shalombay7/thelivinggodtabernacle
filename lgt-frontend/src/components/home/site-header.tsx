import { navigationItems } from "@/features/home/content";
import type { ChurchInfo } from "@/features/home/types";
import { getAbsoluteUrl } from "@/features/home/data";
import { SmartLink } from "@/components/home/smart-link";

interface SiteHeaderProps {
  serviceName: string;
  churchInfo: ChurchInfo;
}

export function SiteHeader({ serviceName, churchInfo }: SiteHeaderProps) {
  return (
    <header className="glass-panel sticky top-4 z-20 mb-8 rounded-[2rem] px-4 py-3 md:px-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="mt-1 flex h-11 w-11 items-center justify-center rounded-2xl bg-[linear-gradient(135deg,rgba(195,148,58,0.18),rgba(31,90,67,0.12))] text-[var(--color-primary)] shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]">
            <span aria-hidden="true" className="serif-display text-xl">
              ✦
            </span>
          </div>
          <div>
            <p className="font-[family-name:var(--font-heading)] text-lg tracking-[0.18em] text-[var(--color-accent)] uppercase">
              {serviceName}
            </p>
            <p className="text-sm text-[var(--color-muted)]">
              Christ-centered worship, discipleship, and belonging.
            </p>
          </div>
        </div>

        <nav
          aria-label="Primary"
          className="flex flex-wrap items-center gap-2 text-sm font-medium text-[var(--color-muted)]"
        >
          {navigationItems.map((item) => (
            <SmartLink
              key={item.href}
              href={item.href}
              className="interactive-link rounded-full px-3 py-2 hover:bg-white/50"
            >
              {item.label}
            </SmartLink>
          ))}
          <SmartLink
            href={getAbsoluteUrl(churchInfo.socialLinks.youtube)}
            className="button-primary"
            aria-label="Watch live on YouTube"
          >
            Watch Live
          </SmartLink>
        </nav>
      </div>
    </header>
  );
}
