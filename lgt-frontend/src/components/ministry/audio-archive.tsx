"use client";

import { useMemo, useState } from "react";
import type { ArchiveTrack } from "@/features/ministry/archive-data";

export function AudioArchive({ tracks }: { tracks: ArchiveTrack[] }) {
  const [query, setQuery] = useState("");
  const [selectedTrack, setSelectedTrack] = useState<ArchiveTrack | null>(tracks[0] ?? null);
  const [visibleCount, setVisibleCount] = useState(30);
  const filteredTracks = useMemo(
    () => tracks.filter((track) => track.title.toLowerCase().includes(query.toLowerCase())),
    [tracks, query],
  );
  const visibleTracks = filteredTracks.slice(0, visibleCount);

  return (
    <section className="mt-7 rounded-xl border border-emerald-950/10 bg-white p-5 shadow-sm sm:p-6" aria-label="Audio archive">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-xs font-bold uppercase tracking-[0.16em] text-[var(--color-accent)]">Listen to the archive</p>
          <h2 className="mt-2 text-xl font-semibold text-emerald-950">{tracks.length} recordings</h2>
        </div>
        <label className="w-full sm:max-w-xs">
          <span className="sr-only">Search recordings</span>
          <input
            type="search"
            value={query}
            onChange={(event) => { setQuery(event.target.value); setVisibleCount(30); }}
            placeholder="Search titles or speakers"
            className="w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm placeholder:text-stone-400"
          />
        </label>
      </div>

      <div className="mt-5 rounded-lg bg-emerald-950 p-4 text-white">
        <p className="mb-2 truncate text-sm font-medium text-white/85" aria-live="polite">
          {selectedTrack?.title ?? "Choose a recording"}
        </p>
        {selectedTrack ? <audio key={selectedTrack.url} controls preload="none" className="w-full" src={selectedTrack.url}>
          Your browser does not support audio playback.
        </audio> : <p className="text-xs text-white/60">Choose a recording below to begin listening.</p>}
      </div>

      <ol className="mt-4 divide-y divide-stone-100">
        {visibleTracks.map((track, index) => (
          <li key={`${track.url}-${index}`}>
            <button
              type="button"
              onClick={() => setSelectedTrack(track)}
              aria-current={selectedTrack?.url === track.url ? "true" : undefined}
              className={`flex w-full items-center gap-3 py-3 text-left text-sm transition ${selectedTrack?.url === track.url ? "text-emerald-900" : "text-stone-700 hover:text-emerald-900"}`}
            >
              <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-stone-100 text-xs font-semibold text-emerald-800" aria-hidden="true">
                {selectedTrack?.url === track.url ? "Ⅱ" : "▶"}
              </span>
              <span className="min-w-0 flex-1">{track.title}</span>
            </button>
          </li>
        ))}
      </ol>
      {visibleTracks.length === 0 && <p className="py-8 text-center text-sm text-stone-500">No recordings match that search.</p>}
      {visibleCount < filteredTracks.length && <button type="button" onClick={() => setVisibleCount((count) => count + 30)} className="button-secondary mt-3 w-full px-4 py-2.5 text-sm">Show more recordings</button>}
      <p className="mt-4 text-xs leading-5 text-stone-400">Audio files are streamed from the ministry media archive.</p>
    </section>
  );
}
