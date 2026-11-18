import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { MinistryPage } from "@/components/ministry/ministry-page";
import { SourceContentPage } from "@/components/ministry/source-content-page";
import { getMinistryPage, getMinistrySlugs } from "@/features/ministry/content";
import { getSourceArchiveEntry, sourceArchive } from "@/features/ministry/archive-data";

interface PageProps {
  params: Promise<{
    slug: string[];
  }>;
}

export function generateStaticParams() {
  const paths = [
    ...getMinistrySlugs().map((slug) => [slug]),
    ...sourceArchive
      .map((entry) => entry.appPath.split("/").filter(Boolean))
      .filter((parts) => parts.length > 0),
  ];
  const uniquePaths = new Map(paths.map((parts) => [parts.join("/"), parts]));
  return [...uniquePaths.values()].map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const route = slug.join("/");
  const page = slug.length === 1 ? getMinistryPage(slug[0]) : undefined;
  const archivePage = getSourceArchiveEntry(`/${route}`);

  if (!page && !archivePage) {
    return {};
  }

  return {
    title: `${page?.title ?? archivePage?.title} | The Living God Tabernacle`,
    description: page?.summary ?? archivePage?.title,
  };
}

export default async function Page({ params }: PageProps) {
  const { slug } = await params;
  const route = slug.join("/");
  const page = slug.length === 1 ? getMinistryPage(slug[0]) : undefined;
  const archivePage = getSourceArchiveEntry(`/${route}`);

  if (page) return <MinistryPage page={page} sourceEntry={archivePage} />;
  if (archivePage) return <SourceContentPage entry={archivePage} />;

  notFound();
}
