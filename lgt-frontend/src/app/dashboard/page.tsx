import type { Metadata } from "next";
import { DashboardPage } from "@/components/dashboard/dashboard-page";

export const metadata: Metadata = {
  title: "Dashboard | The Living God Tabernacle",
  description:
    "Upload audio and video files, manage ministry media, and track site traffic for The Living God Tabernacle.",
};

export default function Page() {
  return <DashboardPage />;
}
