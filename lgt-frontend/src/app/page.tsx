import { HomePage } from "@/components/home/home-page";
import { getLgtData } from "@/features/home/data";
import { getSourceHomepageEntry } from "@/features/ministry/archive-data";

export default async function Home() {
  const { data, usingFallback } = await getLgtData();

  return <HomePage data={data} usingFallback={usingFallback} sourceArchive={getSourceHomepageEntry()} />;
}
