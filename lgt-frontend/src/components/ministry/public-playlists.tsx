"use client";

import { useEffect, useState } from "react";
import { AudioArchive } from "@/components/ministry/audio-archive";
import type { ArchiveTrack } from "@/features/ministry/archive-data";

type Asset = { id: string; title: string; kind: "audio" | "video" | "image"; mimeType: string; size: number; url: string };
type Playlist = { id: string; slug: string; title: string; year: number | null; description: string; replaceExisting: boolean; media: Asset[] };

function MediaCard({ asset }: { asset: Asset }) {
  return <article key={asset.id} className="rounded-xl border border-[rgba(54,85,143,0.12)] bg-white p-4 shadow-sm">
    <h3 className="mb-3 text-sm font-semibold text-[var(--color-primary)]">{asset.title}</h3>
    {asset.kind === "audio" ? <audio controls preload="none" className="w-full" src={asset.url}>Your browser does not support audio playback.</audio>
      : asset.kind === "video" ? <video controls preload="metadata" className="aspect-video w-full rounded-lg bg-black" src={asset.url}>Your browser does not support video playback.</video>
        : <a href={asset.url} target="_blank" rel="noreferrer" className="block"><img src={asset.url} alt={asset.title} className="max-h-80 w-full rounded-lg object-contain" /></a>}
  </article>;
}

export function UploadedPlaylistMedia({ slug, fallbackTracks }: { slug: string; fallbackTracks: ArchiveTrack[] }) {
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  useEffect(() => {
    fetch(`/api/media/playlists/${encodeURIComponent(slug)}`, { cache: "no-store" })
      .then((response) => response.ok ? response.json() : null)
      .then((data) => setPlaylist(data as Playlist | null))
      .catch(() => setPlaylist(null));
  }, [slug]);
  const keepArchiveSamples = !playlist?.replaceExisting;
  return <div>
    {keepArchiveSamples && fallbackTracks.length > 0 && <AudioArchive tracks={fallbackTracks} />}
    {playlist?.media.length ? <section className="mt-6" aria-labelledby="uploaded-sermon-media"><h2 id="uploaded-sermon-media" className="mb-4 font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)]">{playlist.title} · Uploaded media</h2><div className="grid gap-4">{playlist.media.map((asset) => <MediaCard key={asset.id} asset={asset} />)}</div></section> : null}
    {playlist?.replaceExisting && playlist.media.length === 0 && <p className="mt-5 rounded-lg bg-white p-4 text-sm text-[var(--color-muted)]">The sample list has been replaced. Uploaded recordings will appear here when added to this playlist.</p>}
  </div>;
}

export function PublicPlaylistLibrary() {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    fetch("/api/media/playlists", { cache: "no-store" })
      .then((response) => response.ok ? response.json() : [])
      .then((data) => setPlaylists(data as Playlist[]))
      .catch(() => setPlaylists([]))
      .finally(() => setLoaded(true));
  }, []);
  return <main id="main-content" className="min-h-screen bg-[var(--color-surface)] px-5 py-10 text-[var(--color-ink)] sm:px-8">
    <div className="mx-auto max-w-5xl">
      <a href="/sermons/" className="interactive-link text-sm">← Back to sermons</a>
      <p className="eyebrow mt-7">Sermon archive</p>
      <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl text-[var(--color-primary)] sm:text-5xl">Audio and media playlists</h1>
      <p className="mt-3 max-w-2xl text-sm leading-6 text-[var(--color-muted)]">Browse recordings and ministry media added by the church team.</p>
      <div className="mt-8 space-y-8">
        {playlists.map((playlist) => <section key={playlist.id} id={playlist.slug} className="professional-panel p-5 sm:p-7">
          <h2 className="font-[family-name:var(--font-heading)] text-2xl text-[var(--color-primary)]">{playlist.title}{playlist.year ? ` · ${playlist.year}` : ""}</h2>
          {playlist.description && <p className="mt-2 text-sm leading-6 text-[var(--color-muted)]">{playlist.description}</p>}
          {playlist.slug === "audio-sermon-2025" && <a href="/sermons/audio-sermon-2025/" className="interactive-link mt-3 inline-block text-sm">Browse the full 2025 archive →</a>}
          {playlist.media.length ? <div className="mt-5 grid gap-4">{playlist.media.map((asset) => <MediaCard key={asset.id} asset={asset} />)}</div> : <p className="mt-4 rounded-lg bg-white/70 p-4 text-sm text-[var(--color-muted)]">No newly uploaded media in this playlist yet.</p>}
        </section>)}
        {loaded && playlists.length === 0 && <p className="rounded-xl border border-[rgba(54,85,143,0.12)] bg-white p-6 text-sm text-[var(--color-muted)]">Playlists are temporarily unavailable. Please try again later.</p>}
      </div>
    </div>
  </main>;
}
