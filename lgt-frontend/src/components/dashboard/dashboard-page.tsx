"use client";

import { useEffect, useMemo, useRef, useState, type DragEvent } from "react";
import {
  contentPerformance,
  dashboardMetrics,
  mediaLibrary,
  trafficSources,
  type MediaItem,
} from "@/features/dashboard/content";
import { SmartLink } from "@/components/home/smart-link";

type UploadItem = { id: string; name: string; type: "Audio" | "Video"; size: string; file: File };
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

  useEffect(() => {
    try {
      if (window.localStorage.getItem("lgt-dashboard-theme") === "dark") {
        setTheme("dark");
      }
    } catch {
      // Keep the dashboard usable when browser storage is unavailable.
    }
  }, []);

  function toggleTheme() {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    try {
      window.localStorage.setItem("lgt-dashboard-theme", nextTheme);
    } catch {
      // The selected theme remains active for this page session.
    }
  }

  const visibleMedia = useMemo(() => mediaLibrary.filter((item) => {
    const matchesQuery = `${item.title} ${item.type} ${item.audience}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (mediaFilter === "All media" || item.type === mediaFilter);
  }), [query, mediaFilter]);

  function addFiles(list: FileList | File[]) {
    const files = Array.from(list);
    const rejected = files.filter((file) => !file.type.startsWith("audio/") && !file.type.startsWith("video/"));
    const tooLarge = files.filter((file) => file.size > MAX_FILE_SIZE);
    const accepted = files.filter((file) =>
      (file.type.startsWith("audio/") || file.type.startsWith("video/")) && file.size <= MAX_FILE_SIZE,
    );
    setUploads((current) => {
      const existing = new Set(current.map((item) => `${item.name}:${item.file.size}:${item.file.lastModified}`));
      return [...accepted.filter((file) => !existing.has(`${file.name}:${file.size}:${file.lastModified}`)).map((file) => ({
        id: `${file.name}:${file.size}:${file.lastModified}`,
        name: file.name,
        type: file.type.startsWith("video/") ? "Video" as const : "Audio" as const,
        size: formatSize(file.size),
        file,
      })), ...current];
    });
    setUploadError([
      rejected.length ? `${rejected.length} unsupported file${rejected.length === 1 ? "" : "s"} skipped.` : "",
      tooLarge.length ? `${tooLarge.length} file${tooLarge.length === 1 ? " is" : "s are"} over the 1 GB limit.` : "",
    ].filter(Boolean).join(" "));
  }

  function onDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setDragging(false);
    addFiles(event.dataTransfer.files);
  }

  const queueSize = uploads.reduce((total, item) => total + item.file.size, 0);

  return (
    <main id="main-content" data-dashboard-theme={theme} className="dashboard-root min-h-screen bg-[#f6f7f4] text-[#1e3027]">
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
          <p><strong>Preview dashboard.</strong> Analytics and library entries below are sample data. Selected files stay in this browser session; connect media storage and an analytics provider to publish uploads and report live viewer traffic.</p>
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
            <div className="flex items-start justify-between gap-4"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87923]">Upload studio</p><h2 className="mt-2 text-lg font-semibold text-emerald-950">Add audio or video</h2><p className="mt-1 text-sm text-stone-500">Up to 1 GB per file</p></div><span className="rounded-lg bg-emerald-50 px-3 py-2 text-xs font-semibold text-emerald-800">{uploads.length} selected</span></div>
            <label onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={onDrop} className={`mt-5 flex min-h-44 cursor-pointer flex-col items-center justify-center rounded-xl border border-dashed px-5 py-6 text-center transition ${dragging ? "border-emerald-700 bg-emerald-50" : "border-stone-300 bg-stone-50/70 hover:border-emerald-700 hover:bg-emerald-50/50"}`}>
              <span className="grid h-11 w-11 place-items-center rounded-full bg-white text-xl text-emerald-800 shadow-sm" aria-hidden="true">↑</span>
              <span className="mt-3 text-sm font-semibold text-emerald-950">Drop media here or <span className="text-emerald-700 underline underline-offset-2">browse files</span></span>
              <span className="mt-1 text-xs text-stone-500">Audio and video files · multiple files supported</span>
              <input ref={inputRef} className="sr-only" type="file" accept="audio/*,video/*" multiple onChange={(event) => { if (event.currentTarget.files) addFiles(event.currentTarget.files); event.currentTarget.value = ""; }} />
            </label>
            {uploadError && <p role="status" className="mt-3 text-sm text-amber-800">{uploadError}</p>}
            {uploads.length > 0 && <div className="mt-4 space-y-2" aria-live="polite">
              <div className="flex items-center justify-between text-xs text-stone-500"><span>Selected for review</span><span>{formatSize(queueSize)} total</span></div>
              {uploads.map((item) => <div key={item.id} className="flex items-center gap-3 rounded-lg border border-stone-200 px-3 py-2.5">
                <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-stone-100 text-sm text-emerald-800" aria-hidden="true">{item.type === "Video" ? "▷" : "♫"}</span>
                <div className="min-w-0 flex-1"><p className="truncate text-sm font-medium text-stone-800">{item.name}</p><p className="text-xs text-stone-500">{item.type} · {item.size}</p></div>
                <button type="button" onClick={() => setUploads((items) => items.filter((upload) => upload.id !== item.id))} aria-label={`Remove ${item.name}`} className="rounded-md px-2 py-1 text-xs font-medium text-stone-500 hover:bg-stone-100 hover:text-stone-900">Remove</button>
              </div>)}
              <p className="pt-1 text-xs leading-5 text-stone-500">Files are selected locally and are not uploaded or published yet.</p>
            </div>}
          </article>

          <article className="min-w-0 rounded-xl border border-stone-200/80 bg-white p-5 shadow-sm sm:p-6">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between"><div><p className="text-xs font-bold uppercase tracking-[0.16em] text-[#a87923]">Content library</p><h2 className="mt-2 text-lg font-semibold text-emerald-950">Recent media</h2></div>
              <div className="flex flex-col gap-2 sm:flex-row"><label className="sr-only" htmlFor="media-search">Search media</label><input id="media-search" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search media…" className="min-w-0 rounded-lg border border-stone-200 px-3 py-2 text-sm placeholder:text-stone-400 sm:w-44" /><label className="sr-only" htmlFor="media-filter">Filter media type</label><select id="media-filter" value={mediaFilter} onChange={(event) => setMediaFilter(event.target.value)} className="rounded-lg border border-stone-200 bg-white px-3 py-2 text-sm"><option>All media</option><option>Audio</option><option>Video</option></select></div>
            </div>
            <div className="mt-5 overflow-x-auto"><div className="min-w-[520px]"><div className="grid grid-cols-[minmax(0,1fr)_5rem_6rem_4rem] gap-3 border-b border-stone-100 pb-2 text-[10px] font-bold uppercase tracking-[0.14em] text-stone-400"><span>Title</span><span>Type</span><span>Status</span><span className="text-right">Plays</span></div>
              {visibleMedia.length ? visibleMedia.map((item) => <div key={item.title} className="grid grid-cols-[minmax(0,1fr)_5rem_6rem_4rem] items-center gap-3 border-b border-stone-100 py-3.5 last:border-0"><div className="min-w-0"><p className="truncate text-sm font-semibold text-emerald-950">{item.title}</p><p className="mt-0.5 truncate text-xs text-stone-500">{item.audience} · {item.source}</p></div><span className="text-xs text-stone-600">{item.type}</span><span><span className={`rounded-full px-2 py-1 text-[10px] font-semibold ${statusClass(item.status)}`}>{item.status}</span></span><span className="text-right text-xs font-medium text-stone-600">{item.plays}</span></div>) : <p className="py-8 text-center text-sm text-stone-500">No media matches this search.</p>}
            </div></div>
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
