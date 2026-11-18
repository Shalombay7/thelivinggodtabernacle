import archiveJson from "./archive-content.json";

export type ArchiveTrack = {
  title: string;
  url: string;
};

export type SourceArchiveEntry = {
  id: number;
  type: "page" | "post";
  sourcePath: string;
  slug: string;
  appPath: string;
  title: string;
  excerpt: string;
  content: string;
  date: string | null;
  audioTracks?: ArchiveTrack[];
};

export const sourceArchive = archiveJson as SourceArchiveEntry[];

const sourceArchiveByPath = new Map(
  sourceArchive.map((entry) => [entry.appPath.replace(/\/+$/, "") || "/", entry]),
);

export function getSourceArchiveEntry(path: string) {
  return sourceArchiveByPath.get(path.replace(/\/+$/, "") || "/");
}

export function getSourceHomepageEntry() {
  return getSourceArchiveEntry("/");
}

