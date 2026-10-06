import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LegacyPage } from "@/components/legacy/legacy-page";
import { getLegacyPage, getLegacySlugs } from "@/features/legacy/content";

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

export function generateStaticParams() {
  return getLegacySlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegacyPage(slug);

  if (!page) {
    return {};
  }

  return {
    title: `${page.title} | The Living God Tabernacle`,
    description: page.summary,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const page = getLegacyPage(slug);

  if (!page) {
    notFound();
  }

  return <LegacyPage page={page} />;
}
