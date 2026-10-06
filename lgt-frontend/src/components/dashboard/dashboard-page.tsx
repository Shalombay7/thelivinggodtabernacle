"use client";

import { useMemo, useState } from "react";
import {
  contentPerformance,
  dashboardMetrics,
  mediaLibrary,
  trafficSources,
  type MediaItem,
} from "@/features/dashboard/content";
import { SmartLink } from "@/components/home/smart-link";

type UploadItem = {
  id: string;
  name: string;
  type: "Audio" | "Video";
  size: string;
  status: "Ready" | "Queued";
};

function formatSize(bytes: number) {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / (1024 * 1024 * 1024)).toFixed(1)} GB`;
  }

  if (bytes >= 1024 * 1024) {
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }

  return `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

function getMediaType(file: File): UploadItem["type"] {
  return file.type.startsWith("video") ? "Video" : "Audio";
}

function getStatusClass(status: MediaItem["status"] | UploadItem["status"]) {
  switch (status) {
    case "Published":
    case "Ready":
      return "bg-[rgba(31,90,67,0.1)] text-[var(--color-primary)]";
    case "Review":
    case "Queued":
      return "bg-[rgba(195,148,58,0.14)] text-[#7a5817]";
    default:
      return "bg-[rgba(95,102,94,0.12)] text-[var(--color-muted)]";
  }
}

export function DashboardPage() {
  const [uploads, setUploads] = useState<UploadItem[]>([]);
  const totalQueuedSize = useMemo(
    () =>
      uploads.length === 0
        ? "0 files"
        : `${uploads.length} file${uploads.length === 1 ? "" : "s"} queued`,
    [uploads.length],
  );

  function handleFiles(files: FileList | null) {
    if (!files) {
      return;
    }

    const accepted = Array.from(files)
      .filter((file) => file.type.startsWith("audio") || file.type.startsWith("video"))
      .map((file) => ({
        id: `${file.name}-${file.lastModified}`,
        name: file.name,
        type: getMediaType(file),
        size: formatSize(file.size),
        status: "Ready" as const,
      }));

    setUploads((current) => [...accepted, ...current]);
  }

  return (
    <main id="main-content" className="min-h-screen bg-[var(--color-surface)] text-[var(--color-ink)]">
      <div className="mx-auto flex min-h-screen w-full max-w-7xl flex-col px-5 py-5 sm:px-8 lg:px-10">
        <header className="professional-panel mb-6 px-4 py-3 sm:px-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <SmartLink href="/" className="flex items-center gap-3">
              <span className="brand-mark" aria-hidden="true">
                TLG
              </span>
              <span>
                <span className="block text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">
                  The Living God Tabernacle
                </span>
                <span className="block text-sm text-[var(--color-muted)]">
                  Media and traffic dashboard
                </span>
              </span>
            </SmartLink>
            <nav aria-label="Dashboard" className="flex flex-wrap gap-1 text-sm font-medium text-[var(--color-muted)]">
              <SmartLink href="/" className="nav-link">
                Site
              </SmartLink>
              <SmartLink href="/resources" className="nav-link">
                Resources
              </SmartLink>
              <SmartLink href="/sermons" className="nav-link">
                Sermons
              </SmartLink>
              <SmartLink href="/prayer" className="nav-link">
                Prayer
              </SmartLink>
            </nav>
          </div>
        </header>

        <section className="professional-panel p-6 sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="eyebrow">Dashboard</p>
              <h1 className="mt-3 font-[family-name:var(--font-heading)] text-5xl leading-none text-[var(--color-primary)] sm:text-6xl">
                Media publishing and ministry traffic.
              </h1>
              <p className="mt-4 max-w-3xl text-base leading-8 text-[var(--color-muted)]">
                Upload sermons, songs, service videos, and teaching media while tracking the pages,
                traffic sources, and engagement that matter to the ministry.
              </p>
            </div>
            <div className="rounded-lg border border-[rgba(31,90,67,0.1)] bg-white/75 px-5 py-4">
              <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-soft)]">
                Upload Queue
              </p>
              <p className="mt-2 text-2xl font-semibold text-[var(--color-primary)]">{totalQueuedSize}</p>
            </div>
          </div>

          <div className="mt-8 grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {dashboardMetrics.map((metric) => (
              <article key={metric.label} className="rounded-lg border border-[rgba(31,90,67,0.08)] bg-white/75 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[var(--color-muted-soft)]">
                  {metric.label}
                </p>
                <p className="mt-3 text-3xl font-semibold text-[var(--color-primary)]">{metric.value}</p>
                <p className={`mt-3 inline-flex rounded-md px-2.5 py-1 text-xs font-semibold ${
                  metric.tone === "good"
                    ? "bg-[rgba(31,90,67,0.1)] text-[var(--color-primary)]"
                    : metric.tone === "watch"
                      ? "bg-[rgba(195,148,58,0.14)] text-[#7a5817]"
                      : "bg-[rgba(95,102,94,0.12)] text-[var(--color-muted)]"
                }`}>
                  {metric.change}
                </p>
              </article>
            ))}
          </div>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
          <article className="professional-panel p-6 sm:p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="eyebrow">Upload Studio</p>
                <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl text-[var(--color-primary)]">
                  Add audio and video files.
                </h2>
              </div>
              <span className="rounded-md bg-[rgba(31,90,67,0.08)] px-3 py-1.5 text-xs font-semibold text-[var(--color-primary)]">
                Audio + Video
              </span>
            </div>

            <label className="mt-6 flex min-h-56 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-[rgba(31,90,67,0.28)] bg-white/75 px-5 py-8 text-center transition hover:border-[var(--color-primary)] hover:bg-white">
              <span className="text-sm font-semibold uppercase tracking-[0.16em] text-[var(--color-accent)]">Select media files</span>
              <span className="mt-3 max-w-md text-sm leading-7 text-[var(--color-muted)]">
                Choose sermon audio, worship songs, service videos, testimonies, or teaching clips.
                Accepted file picker: audio and video.
              </span>
              <span className="button-primary mt-5 inline-flex px-5 py-3">Choose Files</span>
              <input
                className="sr-only"
                type="file"
                accept="audio/*,video/*"
                multiple
                onChange={(event) => handleFiles(event.currentTarget.files)}
              />
            </label>

            <div className="mt-5 grid gap-3">
              {uploads.length === 0 ? (
                <div className="rounded-lg border border-[rgba(31,90,67,0.08)] bg-white/70 px-4 py-4">
                  <p className="font-semibold text-[var(--color-primary)]">
                    No uploaded files selected yet
                  </p>
                  <p className="mt-1 text-xs text-[var(--color-muted-soft)]">
                    Selected audio and video files will appear here before publishing.
                  </p>
                </div>
              ) : (
                uploads.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col gap-3 rounded-lg border border-[rgba(31,90,67,0.08)] bg-white/70 px-4 py-3 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div>
                      <p className="font-semibold text-[var(--color-primary)]">{item.name}</p>
                      <p className="mt-1 text-xs text-[var(--color-muted-soft)]">
                        {item.type} · {item.size}
                      </p>
                    </div>
                    <span className={`w-fit rounded-md px-2.5 py-1 text-xs font-semibold ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </div>
                ))
              )}
            </div>
          </article>

          <article className="professional-panel p-6 sm:p-7">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <p className="eyebrow">Media Library</p>
                <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl text-[var(--color-primary)]">
                  Manage published content.
                </h2>
              </div>
              <button className="button-secondary px-4 py-2" type="button">
                Create Collection
              </button>
            </div>

            <div className="mt-6 overflow-hidden rounded-lg border border-[rgba(31,90,67,0.08)] bg-white/75">
              <div className="grid grid-cols-[1fr_5rem_6rem] gap-3 border-b border-[rgba(31,90,67,0.08)] px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--color-muted-soft)] sm:grid-cols-[1fr_5rem_6rem_5rem]">
                <span>Title</span>
                <span>Type</span>
                <span>Status</span>
                <span className="hidden sm:block">Plays</span>
              </div>
              {mediaLibrary.map((item) => (
                <div key={item.title} className="grid grid-cols-[1fr_5rem_6rem] gap-3 border-b border-[rgba(31,90,67,0.06)] px-4 py-4 text-sm last:border-b-0 sm:grid-cols-[1fr_5rem_6rem_5rem]">
                  <div>
                    <p className="font-semibold text-[var(--color-primary)]">{item.title}</p>
                    <p className="mt-1 text-xs text-[var(--color-muted-soft)]">{item.audience} · {item.source}</p>
                  </div>
                  <span className="text-[var(--color-muted)]">{item.type}</span>
                  <span>
                    <span className={`rounded-md px-2 py-1 text-xs font-semibold ${getStatusClass(item.status)}`}>
                      {item.status}
                    </span>
                  </span>
                  <span className="hidden font-semibold text-[var(--color-muted)] sm:block">{item.plays}</span>
                </div>
              ))}
            </div>
          </article>
        </section>

        <section className="mt-6 grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <article className="professional-panel p-6 sm:p-7">
            <p className="eyebrow">Traffic Sources</p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl text-[var(--color-primary)]">
              Where visitors come from.
            </h2>
            <div className="mt-6 grid gap-4">
              {trafficSources.map((source) => (
                <div key={source.label}>
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <span className="font-semibold text-[var(--color-primary)]">{source.label}</span>
                    <span className="text-[var(--color-muted)]">{source.value}</span>
                  </div>
                  <div className="mt-2 h-2 overflow-hidden rounded-full bg-[rgba(31,90,67,0.09)]">
                    <div className="h-full rounded-full bg-[var(--color-primary)]" style={{ width: `${source.percent}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </article>

          <article className="professional-panel p-6 sm:p-7">
            <p className="eyebrow">Page Performance</p>
            <h2 className="mt-3 font-[family-name:var(--font-heading)] text-3xl text-[var(--color-primary)]">
              Track what people are using.
            </h2>
            <div className="mt-6 grid gap-3">
              {contentPerformance.map((item) => (
                <div key={item.page} className="grid gap-3 rounded-lg border border-[rgba(31,90,67,0.08)] bg-white/75 p-4 sm:grid-cols-[1fr_6rem_6rem] sm:items-center">
                  <div>
                    <p className="font-semibold text-[var(--color-primary)]">{item.title}</p>
                    <p className="mt-1 text-xs text-[var(--color-muted-soft)]">{item.page}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted-soft)]">Visitors</p>
                    <p className="mt-1 font-semibold text-[var(--color-muted)]">{item.visitors}</p>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.14em] text-[var(--color-muted-soft)]">Engage</p>
                    <p className="mt-1 font-semibold text-[var(--color-muted)]">{item.engagement}</p>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>
      </div>
    </main>
  );
}
