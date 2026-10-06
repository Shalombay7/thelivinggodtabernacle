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
    <header className="professional-panel sticky top-4 z-20 mb-8 px-4 py-3 md:px-5">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-start gap-3">
          <div className="brand-mark mt-1" aria-hidden="true">
            TLG
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
              className="nav-link"
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
