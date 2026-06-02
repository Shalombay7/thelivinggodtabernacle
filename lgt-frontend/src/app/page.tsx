import { HomePage } from "@/components/home/home-page";
import { getLgtData } from "@/features/home/data";

export default async function Home() {
  const { data, usingFallback } = await getLgtData();

  return <HomePage data={data} usingFallback={usingFallback} />;
}
