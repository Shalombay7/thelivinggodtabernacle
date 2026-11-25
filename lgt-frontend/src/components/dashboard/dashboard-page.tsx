"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import {
  contentPerformance,
  dashboardMetrics,
  trafficSources,
  type MediaItem,
} from "@/features/dashboard/content";
import { SmartLink } from "@/components/home/smart-link";

type MediaKind = "audio" | "video" | "image";
type UploadItem = { id: string; name: string; type: MediaKind; size: string; file: File };
type StoredMedia = { id: string; title: string; kind: MediaKind; mimeType: string; size: number; url: string; createdAt: string };
type Playlist = { id: string; slug: string; title: string; year: number | null; description: string; mediaIds: string[]; replaceExisting: boolean; createdAt: string; updatedAt: string };
const MAX_FILE_SIZE = 1024 * 1024 * 1024;

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024 * 1024) return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  if (bytes >= 1024 * 1024) return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function statusClass(status: MediaItem["status"]) {
  if (status === "Published") return "bg-emerald-50 text-emerald-800";
  if (status === "Review") return "bg-amber-50 text-amber-800";
  return "bg-stone-100 text-stone-600";
}

export function DashboardPage() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const [uploadError, setUploadError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [query, setQuery] = useState("");
  const [mediaFilter, setMediaFilter] = useState("All media");
  const [period, setPeriod] = useState("Last 30 days");
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const [storedMedia, setStoredMedia] = useState<StoredMedia[]>([]);
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [activePlaylistId, setActivePlaylistId] = useState("");
  const [playlistTitle, setPlaylistTitle] = useState("Audio Sermon 2025");
  const [playlistYear, setPlaylistYear] = useState("2025");
  const [playlistDescription, setPlaylistDescription] = useState("Starter playlist for the 2025 audio sermon archive.");
  const [playlistMediaIds, setPlaylistMediaIds] = useState<string[]>([]);
  const [replaceExisting, setReplaceExisting] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState("");
  const [workspaceError, setWorkspaceError] = useState("");
  const [savingPlaylist, setSavingPlaylist] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem("lgt-dashboard-theme") === "dark") {
        setTheme("dark");
      }
    } catch {
      // Keep the dashboard usable when browser storage is unavailable.
    }
  }, []);

  useEffect(() => {
    async function loadWorkspace() {
      try {
        const [mediaResponse, playlistsResponse] = await Promise.all([
          fetch("/api/admin/media", { credentials: "same-origin", cache: "no-store" }),
          fetch("/api/admin/playlists", { credentials: "same-origin", cache: "no-store" }),
        ]);
        if (!mediaResponse.ok || !playlistsResponse.ok) throw new Error("Admin media storage could not be reached. Refresh the dashboard and sign in again if prompted.");
        const [mediaData, playlistData] = await Promise.all([mediaResponse.json(), playlistsResponse.json()]) as [StoredMedia[], Playlist[]];
        setStoredMedia(mediaData);
        setPlaylists(playlistData);
        const starter = playlistData.find((item) => item.slug === "audio-sermon-2025") ?? playlistData[0];
        if (starter) selectPlaylist(starter, false);
      } catch (error) {
        setWorkspaceError(error instanceof Error ? error.message : "Unable to load the media workspace.");
      }
    }
    void loadWorkspace();
  }, []);

  function selectPlaylist(playlist: Playlist, clearError = true) {
    setActivePlaylistId(playlist.id);
    setPlaylistTitle(playlist.title);
    setPlaylistYear(playlist.year?.toString() ?? "");
    setPlaylistDescription(playlist.description);
    setPlaylistMediaIds(playlist.mediaIds);
    setReplaceExisting(playlist.replaceExisting === true);
    if (clearError) setWorkspaceError("");
  }

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      window.localStorage.setItem("lgt-dashboard-theme", nextTheme);
    } catch {
      // The selected theme remains active for this page session.
    }
  }

  const visibleMedia = useMemo(() => storedMedia.filter((item) => {
    const matchesQuery = `${item.title} ${item.kind} ${item.mimeType}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (mediaFilter === "All media" || item.kind === mediaFilter.toLowerCase());
  }), [query, mediaFilter, storedMedia]);

  function addFiles(list: FileList | File[]) {
    const files = Array.from(list);
    const kindOf = (file: File): MediaKind | null => file.type.startsWith("audio/") ? "audio" : file.type.startsWith("video/") ? "video" : file.type.startsWith("image/") ? "image" : null;
    const rejected = files.filter((file) => !kindOf(file));
    const tooLarge = files.filter((file) => file.size > MAX_FILE_SIZE);
    const accepted = files.filter((file) =>
      kindOf(file) !== null && file.size <= MAX_FILE_SIZE,
    );
    setUploads((current) => {
      const existing = new Set(current.map((item) => `${item.name}:${item.file.size}:${item.file.lastModified}`));
      return [...accepted.filter((file) => !existing.has(`${file.name}:${file.size}:${file.lastModified}`)).map((file) => ({
        id: `${file.name}:${file.size}:${file.lastModified}`,
        name: file.name,
        type: kindOf(file)!,
        size: formatSize(file.size),
        file,
      })), ...current];
    });
    setUploadError([
      rejected.length ? `${rejected.length} unsupported file${rejected.length === 1 ? "" : "s"} skipped.` : "",
      tooLarge.length ? `${tooLarge.length} file${tooLarge.length === 1 ? " is" : "s are"} over the 1 GB limit.` : "",
    ].filter(Boolean).join(" "));
  }

  async function uploadFiles() {
    setUploading(true);
    setWorkspaceError("");
    const newlyUploaded: StoredMedia[] = [];
    try {
      for (let index = 0; index < uploads.length; index += 1) {
        const item = uploads[index];
        setUploadProgress(`Uploading ${index + 1} of ${uploads.length}: ${item.name}`);
        const form = new FormData();
        form.append("title", item.name.replace(/\.[^.]+$/, ""));
        form.append("file", item.file);
        const response = await fetch("/api/admin/media", { method: "POST", body: form, credentials: "same-origin" });
        const result = await response.json().catch(() => ({}));
        if (!response.ok) throw new Error(result.message || `Could not upload ${item.name}.`);
        newlyUploaded.push(result as StoredMedia);
      }
      setStoredMedia((current) => [...newlyUploaded, ...current]);
      setPlaylistMediaIds((current) => [...new Set([...newlyUploaded.map((item) => item.id), ...current])]);
      setUploads([]);
      setUploadProgress("");
    } catch (error) {
      setWorkspaceError(error instanceof Error ? error.message : "Upload failed. Try again.");
    } finally {
      setUploading(false);
    }
  }

  async function savePlaylistForm() {
    setSavingPlaylist(true);
    setWorkspaceError("");
    try {
      const endpoint = activePlaylistId ? `/api/admin/playlists/${encodeURIComponent(activePlaylistId)}` : "/api/admin/playlists";
      const response = await fetch(endpoint, {
        method: "POST", credentials: "same-origin", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title: playlistTitle, year: playlistYear || null, description: playlistDescription, mediaIds: playlistMediaIds, replaceExisting }),
      });
      const result = await response.json().catch(() => ({}));
      if (!response.ok) throw new Error(result.message || "Unable to save playlist.");
      const saved = result as Playlist;
      setPlaylists((current) => [saved, ...current.filter((playlist) => playlist.id !== saved.id)]);
      selectPlaylist(saved);
    } catch (error) {
      setWorkspaceError(error instanceof Error ? error.message : "Unable to save playlist.");
    } finally {
      setSavingPlaylist(false);
    }
  }

  function startNewPlaylist() {
    setActivePlaylistId("");
    setPlaylistTitle("");
    setPlaylistYear("");
    setPlaylistDescription("");
    setPlaylistMediaIds([]);
    setReplaceExisting(false);
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  }

  const queueSize = uploads.reduce((total, item) => total + item.file.size, 0);

  return (
    <main id="main-content" data-dashboard-theme={theme} className="dashboard-root min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto w-full max-w-[1440px] px-4 py-5 sm:px-7 lg:px-10">
        <header className="mb-8 flex flex-col gap-5 border-b border-emerald-950/10 pb-5 md:flex-row md:items-center md:justify-between">
          <SmartLink href="/" className="flex items-center gap-3">
            <span className="brand-mark" aria-hidden="true">TLG</span>
            <span>
              <span className="block text-sm font-bold uppercase tracking-[0.13em] text-emerald-950">The Living God Tabernacle</span>
              <span className="mt-0.5 block text-xs text-stone-500">Ministry media workspace</span>
            </span>
          </SmartLink>
          <nav aria-label="Main navigation" className="flex flex-wrap gap-1 text-sm font-medium text-stone-600">
            <SmartLink href="/" className="nav-link">Site</SmartLink>
            <SmartLink href="/resources" className="nav-link">Resources</SmartLink>
            <SmartLink href="/sermons" className="nav-link">Sermons</SmartLink>
            <SmartLink href="/prayer" className="nav-link">Prayer</SmartLink>
            <button
              type="button"
              onClick={toggleTheme}
              aria-pressed={theme === "dark"}
              aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
              className="inline-flex items-center gap-2 rounded-lg border border-stone-200 bg-white px-3 py-2 text-xs font-semibold text-stone-700 shadow-sm transition hover:border-emerald-300"
            >
              <span aria-hidden="true">{theme === "dark" ? "☀" : "☾"}</span>
              {theme === "dark" ? "Light mode" : "Dark mode"}
            </button>
          </nav>
        </header>

        <div className="mb-7 flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#a87923]">Ministry overview</p>
            <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl leading-tight text-emerald-950 sm:text-5xl">Media &amp; audience</h1>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-stone-600">Organize ministry media and get a clearer picture of how visitors engage with your content.</p>
          </div>
          <div className="flex flex-wrap gap-2">
            <label className="sr-only" htmlFor="period-filter">Report period</label>
            <select id="period-filter" value={period} onChange={(event) => setPeriod(event.target.value)} className="rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-700 shadow-sm focus:border-emerald-700">
              <option>Last 7 days</option><option>Last 30 days</option><option>Last 90 days</option>
            </select>
            <button type="button" onClick={() => inputRef.current?.click()} className="button-primary px-4 py-2.5 text-sm">＋ Add media</button>
          </div>
        </div>

        <div className="mb-5 flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-amber-950" role="note">
          <span aria-hidden="true" className="mt-0.5">ⓘ</span>
          <p><strong>Analytics preview.</strong> Traffic and performance figures are sample data. Uploaded media and playlists are saved to the ministry media library and can be published in the sermon archive.</p>
        </div>

        <section aria-label="Performance summary" className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          {dashboardMetrics.map((metric, index) => (
            <article key={metric.label} className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium text-stone-600">{metric.label}</p>
                <span className="grid h-9 w-9 place-items-center rounded-lg bg-emerald-50 text-emerald-800" aria-hidden="true">{["↗", "▷", "♡", "◷"][index]}</span>
              </div>
              <p className="mt-4 text-3xl font-semibold tracking-tight text-emerald-950">{metric.value}</p>
              <p className={`mt-2 text-xs font-semibold ${metric.tone === "watch" ? "text-amber-700" : "text-emerald-700"}`}>{metric.change}</p>
            </article>
          ))}
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
          <article className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87923]">Audience trend · {period.toLowerCase()}</p><h2 className="mt-2 text-lg font-semibold text-emerald-950">Visitor activity</h2></div>
              <span className="rounded-full bg-stone-100 px-3 py-1 text-xs font-medium text-stone-600">Sample report</span>
            </div>
            <div className="mt-7 flex h-44 items-end gap-2 border-b border-stone-200 px-1 sm:gap-3" role="img" aria-label="Illustrative visitor activity chart">
              {[34, 49, 39, 61, 48, 72, 57, 68, 84, 62, 77, 93, 71, 82, 64, 96, 76, 88, 67, 79, 100, 74, 89, 68, 80, 94, 71, 85].map((height, index) => (
                <div key={index} className="group relative flex h-full flex-1 items-end"><div style={{ height: `${height}%` }} className={`w-full rounded-t-sm ${index > 23 ? "bg-amber-500" : "bg-emerald-700/75"} transition-colors group-hover:bg-emerald-900`} /></div>
              ))}
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-stone-400"><span>30 days ago</span><span>Today</span></div>
          </article>

          <article className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87923]">Discovery</p><h2 className="mt-2 text-lg font-semibold text-emerald-950">Traffic sources</h2>
            <div className="mt-6 space-y-5">
              {trafficSources.map((source) => (
                <div key={source.label}>
                  <div className="mb-2 flex justify-between gap-3 text-sm"><span className="font-medium text-stone-700">{source.label}</span><span className="text-stone-500">{source.value} <span className="text-stone-400">({source.percent}%)</span></span></div>
                  <div className="h-2 overflow-hidden rounded-full bg-stone-100"><div className="h-full rounded-full bg-emerald-700" style={{ width: `${source.percent}%` }} /></div>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[0.85fr_1.15fr]">
          <article className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87923]">Upload studio</p><h2 className="mt-2 text-lg font-semibold text-emerald-950">Add audio, video, or images</h2><p className="mt-1 text-sm text-stone-500">Up to 1 GB per file</p></div><span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">{uploads.length} selected</span></div>
            <label onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop} className={`mt-5 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-5 py-6 text-center transition ${dragging ? "border-emerald-700 bg-emerald-50" : "border-stone-300 bg-stone-50/70 hover:border-emerald-700 hover:bg-emerald-50/50"}`}>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl text-emerald-800 shadow-sm" aria-hidden="true">↑</span>
              <span className="mt-3 text-sm font-semibold text-emerald-950">Drop media here or <span className="text-emerald-700 underline underline-offset-2">browse files</span></span>
              <span className="mt-1 text-xs text-stone-500">Audio, video, and images · multiple files supported</span>
              <input ref={inputRef} className="sr-only" type="file" accept="audio/*,video/*,image/jpeg,image/png,image/gif,image/webp,image/avif" multiple onChange={(event) => { if (event.currentTarget.files) addFiles(event.currentTarget.files); event.currentTarget.value = ""; }} />
            </label>
            {uploadError && <p role="status" className="mt-3 text-sm text-amber-800">{uploadError}</p>}
            {uploads.length > 0 && <div className="mt-4 space-y-2" aria-live="polite">
              <div className="flex items-center justify-between text-xs text-stone-500"><span>Selected for review</span><span>{formatSize(queueSize)} total</span></div>
              {uploads.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-lg border border-stone-200 px-3 py-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-stone-100 text-sm text-emerald-800" aria-hidden="true">{item.type === "video" ? "▷" : item.type === "image" ? "▧" : "♫"}</span>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-stone-800">{item.name}</p><p className="text-xs capitalize text-stone-500">{item.type} · {item.size}</p></div>
                <button type="button" onClick={() => setUploads((items) => items.filter((upload) => upload.id !== item.id))} aria-label={`Remove ${item.name}`} className="rounded-md px-2 py-1 text-xs font-medium text-stone-500 hover:bg-stone-100 hover:text-stone-900">Remove</button>
              </div>)}
              {uploadProgress && <p role="status" className="pt-1 text-xs text-emerald-800">{uploadProgress}</p>}
              <button type="button" disabled={uploading} onClick={() => void uploadFiles()} className="button-primary mt-2 w-full px-4 py-2.5 text-sm disabled:cursor-wait disabled:opacity-60">{uploading ? "Uploading…" : "Upload selected files"}</button>
            </div>}
            {workspaceError && <p role="alert" className="mt-3 rounded-lg bg-amber-50 p-3 text-sm text-amber-900">{workspaceError}</p>}
          </article>

          <article className="min-w-0 rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87923]">Content library</p><h2 className="mt-2 text-lg font-semibold text-emerald-950">Recent media</h2></div>
              <div className="flex flex-col gap-2 sm:flex-row"><label className="sr-only" htmlFor="media-search">Search media</label><input id="media-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search media…" className="min-w-0 rounded-lg border border-stone-200 px-3 py-2 text-sm placeholder:text-stone-400 sm:w-44" /><label className="sr-only" htmlFor="media-filter">Filter media type</label><select id="media-filter" value={mediaFilter} onChange={(event) => setMediaFilter(event.target.value)} className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm"><option>All media</option><option value="Audio">Audio</option><option value="Video">Video</option><option value="Image">Image</option></select></div>
            </div>
            <div className="mt-5 overflow-x-auto"><div className="min-w-[520px]"><div className="grid grid-cols-[minmax(0,1fr)_5rem_6rem_4rem] gap-3 border-b border-stone-100 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400"><span>Title</span><span>Type</span><span>Status</span><span className="text-right">Plays</span></div>
              {visibleMedia.length ? visibleMedia.map((item) => <div key={item.id} className="grid grid-cols-[minmax(0,1fr)_5rem_6rem_4rem] items-center gap-3 border-b border-stone-100 py-3.5 last:border-0"><div className="min-w-0"><p className="truncate text-sm font-semibold text-emerald-950">{item.title}</p><p className="mt-0.5 truncate text-xs text-stone-500">Uploaded {new Date(item.createdAt).toLocaleDateString()}</p></div><span className="text-xs capitalize text-stone-600">{item.kind}</span><span><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${statusClass("Published")}`}>Published</span></span><span className="text-right text-xs font-medium text-stone-600">—</span></div>) : <p className="py-8 text-center text-sm text-stone-500">No uploaded media matches this search.</p>}
            </div></div>
          </article>
        </section>

        <section className="mt-5 grid gap-5 xl:grid-cols-[0.75fr_1.25fr]">
          <article className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex items-start justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87923]">Playlist editor</p><h2 className="mt-2 text-lg font-semibold text-emerald-950">Organize the sermon archive</h2></div><button type="button" onClick={startNewPlaylist} className="rounded-lg border border-stone-200 px-3 py-2 text-xs font-semibold text-stone-700 hover:bg-stone-50">New playlist</button></div>
            <label className="mt-5 block text-xs font-semibold text-stone-600" htmlFor="playlist-existing">Choose playlist</label>
            <select id="playlist-existing" value={activePlaylistId} onChange={(event) => { const playlist = playlists.find((item) => item.id === event.target.value); if (playlist) selectPlaylist(playlist); else startNewPlaylist(); }} className="mt-1 w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm">
              <option value="">New playlist</option>{playlists.map((playlist) => <option key={playlist.id} value={playlist.id}>{playlist.title}{playlist.year ? ` · ${playlist.year}` : ""}</option>)}
            </select>
            <label className="mt-4 block text-xs font-semibold text-stone-600" htmlFor="playlist-title">Playlist title</label>
            <input id="playlist-title" value={playlistTitle} onChange={(event) => setPlaylistTitle(event.target.value)} className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm" placeholder="e.g. Sunday Audio Sermons" />
            <label className="mt-4 block text-xs font-semibold text-stone-600" htmlFor="playlist-year">Year (optional)</label>
            <input id="playlist-year" type="number" min="1900" max="2200" value={playlistYear} onChange={(event) => setPlaylistYear(event.target.value)} className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm" placeholder="2025" />
            <label className="mt-4 block text-xs font-semibold text-stone-600" htmlFor="playlist-description">Description</label>
            <textarea id="playlist-description" value={playlistDescription} onChange={(event) => setPlaylistDescription(event.target.value)} rows={3} className="mt-1 w-full rounded-lg border border-stone-200 px-3 py-2.5 text-sm" placeholder="A short introduction for listeners" />
            <button type="button" disabled={savingPlaylist || !playlistTitle.trim()} onClick={() => void savePlaylistForm()} className="button-primary mt-4 w-full px-4 py-2.5 text-sm disabled:opacity-50">{savingPlaylist ? "Saving…" : activePlaylistId ? "Save playlist" : "Create playlist"}</button>
            <p className="mt-3 text-xs leading-5 text-stone-500">The 2025 starter playlist connects to the Audio Sermon 2025 archive page. Other playlists appear in the Sermons playlist library.</p>
            {playlists.find((item) => item.id === activePlaylistId)?.slug === "audio-sermon-2025" && <label className="mt-4 flex items-start gap-2 rounded-lg bg-amber-50 p-3 text-xs leading-5 text-amber-950"><input type="checkbox" checked={replaceExisting} onChange={(event) => setReplaceExisting(event.target.checked)} className="mt-0.5 h-4 w-4 accent-emerald-800" /><span><strong>Replace the archive sample list.</strong> Show only the uploaded files selected here on the 2025 page instead of its current sample recordings.</span></label>}
          </article>

          <article className="rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87923]">Playlist contents</p><h2 className="mt-2 text-lg font-semibold text-emerald-950">Choose uploaded media</h2><p className="mt-1 text-sm text-stone-500">New uploads are selected for this playlist automatically. You can also select existing audio, videos, and images.</p></div>
            <div className="mt-5 max-h-[28rem] space-y-2 overflow-y-auto pr-1">
              {storedMedia.length ? storedMedia.map((item) => <label key={item.id} className="flex cursor-pointer items-center gap-3 rounded-lg border border-stone-100 p-3 hover:bg-stone-50"><input type="checkbox" checked={playlistMediaIds.includes(item.id)} onChange={(event) => setPlaylistMediaIds((current) => event.target.checked ? [...current, item.id] : current.filter((id) => id !== item.id))} className="h-4 w-4 accent-emerald-800" /><span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-emerald-50 text-emerald-800" aria-hidden="true">{item.kind === "audio" ? "♫" : item.kind === "video" ? "▷" : "▧"}</span><span className="min-w-0 flex-1"><span className="block truncate text-sm font-semibold text-emerald-950">{item.title}</span><span className="block text-xs capitalize text-stone-500">{item.kind} · {formatSize(item.size)}</span></span></label>) : <p className="rounded-lg bg-stone-50 p-5 text-center text-sm text-stone-500">Upload media first. It will appear here for playlist selection.</p>}
            </div>
          </article>
        </section>

        <section className="mt-5 rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
          <div className="flex flex-wrap items-end justify-between gap-3"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87923]">Most visited</p><h2 className="mt-2 text-lg font-semibold text-emerald-950">Popular pages</h2></div><span className="text-xs text-stone-500">Sample data · {period.toLowerCase()}</span></div>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">{contentPerformance.map((item, index) => <article key={item.page} className="rounded-lg border border-stone-100 bg-stone-50/70 p-4"><p className="text-xs font-semibold text-stone-400">0{index + 1} · {item.page}</p><h3 className="mt-2 truncate text-sm font-semibold text-emerald-950">{item.title}</h3><div className="mt-4 flex items-end justify-between"><div><p className="text-[10px] uppercase tracking-wider text-stone-400">Visitors</p><p className="mt-1 text-lg font-semibold text-emerald-900">{item.visitors}</p></div><div className="text-right"><p className="text-[10px] uppercase tracking-wider text-stone-400">Engagement</p><p className="mt-1 text-sm font-semibold text-stone-700">{item.engagement}</p></div></div></article>)}</div>
        </section>
        <footer className="py-6 text-center text-xs text-stone-400">The Living God Tabernacle · Media workspace</footer>
      </div>
    </main>
  );
}
