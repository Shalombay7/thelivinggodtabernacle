import type { Metadata } from "next";
import { DashboardPage } from "@/components/dashboard/dashboard-page";

export const metadata: Metadata = {
  title: "Media Dashboard | The Living God Tabernacle",
  description:
    "Preview the media workspace for The Living God Tabernacle, with local file selection and sample audience insights.",
};

export default function Page() {
  return <DashboardPage />;
}
