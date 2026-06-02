interface StatusBannersProps {
  liveNow: boolean;
  usingFallback: boolean;
}

export function StatusBanners({ liveNow, usingFallback }: StatusBannersProps) {
  return (
    <div className="mb-8 flex flex-col gap-3 lg:flex-row lg:items-center">
      {liveNow ? (
        <div
          className="inline-flex w-fit items-center gap-3 rounded-full border border-[rgba(183,36,36,0.18)] bg-[linear-gradient(180deg,rgba(255,246,246,0.95),rgba(255,235,235,0.86))] px-5 py-2 text-sm font-semibold text-[var(--color-alert)] shadow-sm"
          role="status"
          aria-live="polite"
        >
          <span aria-hidden="true" className="h-2.5 w-2.5 rounded-full bg-current shadow-[0_0_18px_currentColor]" />
          <span>Live now: worship service is in session.</span>
        </div>
      ) : null}

      {usingFallback ? (
        <div
          className="section-card-soft rounded-3xl px-5 py-4 text-sm text-[var(--color-muted)]"
          role="status"
          aria-live="polite"
        >
          Live ministry data is temporarily unavailable, so this page is showing a reliable fallback
          experience instead of failing.
        </div>
      ) : null}
    </div>
  );
}
