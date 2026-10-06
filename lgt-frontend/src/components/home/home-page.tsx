import type { ApiResponse } from "@/features/home/types";
import { AboutSection } from "@/components/home/about-section";
import { ConnectSection } from "@/components/home/connect-section";
import { HeroSection } from "@/components/home/hero-section";
import { MinistriesSection } from "@/components/home/ministries-section";
import { SiteFooter } from "@/components/home/site-footer";
import { SiteHeader } from "@/components/home/site-header";
import { StatusBanners } from "@/components/home/status-banners";

interface HomePageProps {
  data: ApiResponse;
  usingFallback: boolean;
}

export function HomePage({ data, usingFallback }: HomePageProps) {
  return (
    <main id="main-content" className="relative overflow-hidden bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-[38rem] bg-[linear-gradient(180deg,rgba(31,90,67,0.08),transparent)]" />
      <div className="grain-overlay" />

      <div className="page-shell">
        <SiteHeader serviceName={data.service} churchInfo={data.churchInfo} />
        <StatusBanners liveNow={data.about.liveNow} usingFallback={usingFallback} />
        <HeroSection data={data} />
        <AboutSection data={data} />
        <MinistriesSection modules={data.modules} />
        <ConnectSection churchInfo={data.churchInfo} />
        <SiteFooter data={data} />
      </div>
    </main>
  );
}
