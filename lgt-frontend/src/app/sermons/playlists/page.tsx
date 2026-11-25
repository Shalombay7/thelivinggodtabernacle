import type { Metadata } from "next";
import { PublicPlaylistLibrary } from "@/components/ministry/public-playlists";

export const metadata: Metadata = {
  title: "Sermon and Media Playlists | The Living God Tabernacle",
  description: "Browse sermon recordings and ministry media playlists.",
};

export default function SermonPlaylistsPage() {
  return <PublicPlaylistLibrary />;
}
