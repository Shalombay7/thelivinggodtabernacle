import { randomUUID } from 'crypto';
import { existsSync } from 'fs';
import { mkdir, readFile, rename, unlink, writeFile } from 'fs/promises';
import { join } from 'path';

export type MediaKind = 'audio' | 'video' | 'image';
export type MediaAsset = {
  id: string;
  title: string;
  kind: MediaKind;
  mimeType: string;
  size: number;
  url: string;
  createdAt: string;
};
export type MediaPlaylist = {
  id: string;
  slug: string;
  title: string;
  year: number | null;
  description: string;
  mediaIds: string[];
  replaceExisting: boolean;
  createdAt: string;
  updatedAt: string;
};
type MediaLibraryData = { media: MediaAsset[]; playlists: MediaPlaylist[] };

export const mediaDirectory = join(__dirname, '..', '..', 'uploads', 'media');
const dataDirectory = join(__dirname, '..', '..', 'uploads');
const dataFile = join(dataDirectory, 'media-library.json');

const starterPlaylist: MediaPlaylist = {
  id: 'starter-audio-2025',
  slug: 'audio-sermon-2025',
  title: 'Audio Sermon 2025',
  year: 2025,
  description: 'Starter playlist for the 2025 audio sermon archive. Add or replace recordings from the admin dashboard.',
  mediaIds: [],
  replaceExisting: false,
  createdAt: '2025-01-01T00:00:00.000Z',
  updatedAt: new Date().toISOString(),
};

export async function ensureMediaDirectories() {
  await mkdir(mediaDirectory, { recursive: true });
}

async function readLibrary(): Promise<MediaLibraryData> {
  await mkdir(dataDirectory, { recursive: true });
  if (!existsSync(dataFile)) return { media: [], playlists: [{ ...starterPlaylist, updatedAt: new Date().toISOString() }] };
  try {
    const parsed = JSON.parse(await readFile(dataFile, 'utf8')) as MediaLibraryData;
    if (!parsed.playlists.some((playlist) => playlist.slug === starterPlaylist.slug)) parsed.playlists.unshift(starterPlaylist);
    const playlists = Array.isArray(parsed.playlists) ? parsed.playlists.map((playlist) => ({ ...playlist, replaceExisting: playlist.replaceExisting === true })) : [starterPlaylist];
    return { media: Array.isArray(parsed.media) ? parsed.media : [], playlists };
  } catch {
    return { media: [], playlists: [starterPlaylist] };
  }
}

async function writeLibrary(data: MediaLibraryData) {
  await mkdir(dataDirectory, { recursive: true });
  const temporaryFile = `${dataFile}.${randomUUID()}.tmp`;
  await writeFile(temporaryFile, JSON.stringify(data, null, 2), 'utf8');
  await rename(temporaryFile, dataFile);
}

export async function listMedia() {
  return (await readLibrary()).media;
}

export async function listPlaylists() {
  const data = await readLibrary();
  if (!existsSync(dataFile)) await writeLibrary(data);
  return data.playlists;
}

export async function findPlaylist(slug: string) {
  const data = await readLibrary();
  return data.playlists.find((playlist) => playlist.slug === slug) ?? null;
}

export async function getPlaylistAssets(playlist: MediaPlaylist) {
  const data = await readLibrary();
  const byId = new Map(data.media.map((asset) => [asset.id, asset]));
  return playlist.mediaIds.map((id) => byId.get(id)).filter((asset): asset is MediaAsset => Boolean(asset));
}

export async function saveMediaAsset(asset: MediaAsset) {
  const data = await readLibrary();
  data.media.unshift(asset);
  await writeLibrary(data);
  return asset;
}

export async function savePlaylist(input: { id?: string; title: string; year: number | null; description: string; mediaIds: string[]; replaceExisting: boolean }) {
  const data = await readLibrary();
  const title = input.title.trim();
  const slug = input.id === starterPlaylist.id ? starterPlaylist.slug : title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  if (!slug) throw new Error('Enter a playlist title.');
  const duplicate = data.playlists.find((playlist) => playlist.slug === slug && playlist.id !== input.id);
  if (duplicate) throw new Error('A playlist with that title already exists.');
  const knownIds = new Set(data.media.map((asset) => asset.id));
  const mediaIds = [...new Set(input.mediaIds)].filter((id) => knownIds.has(id));
  const existing = data.playlists.find((playlist) => playlist.id === input.id);
  const saved: MediaPlaylist = {
    id: existing?.id ?? randomUUID(), slug: existing?.slug ?? slug, title,
    year: input.year, description: input.description.trim(), mediaIds, replaceExisting: input.replaceExisting,
    createdAt: existing?.createdAt ?? new Date().toISOString(), updatedAt: new Date().toISOString(),
  };
  if (existing) data.playlists = data.playlists.map((playlist) => playlist.id === existing.id ? saved : playlist);
  else data.playlists.unshift(saved);
  await writeLibrary(data);
  return saved;
}

export async function deleteMediaAsset(id: string) {
  const data = await readLibrary();
  const removed = data.media.find((asset) => asset.id === id);
  data.media = data.media.filter((asset) => asset.id !== id);
  data.playlists = data.playlists.map((playlist) => ({ ...playlist, mediaIds: playlist.mediaIds.filter((mediaId) => mediaId !== id) }));
  await writeLibrary(data);
  if (removed) {
    const filename = removed.url.split('/').at(-1);
    if (filename && /^[a-f0-9-]+\.[a-z0-9]+$/i.test(filename)) {
      try { await unlink(join(mediaDirectory, filename)); } catch { /* Keep the library update even if the file is already missing. */ }
    }
  }
}

export async function deletePlaylist(id: string) {
  if (id === starterPlaylist.id) throw new Error('The 2025 starter playlist cannot be deleted.');
  const data = await readLibrary();
  data.playlists = data.playlists.filter((playlist) => playlist.id !== id);
  await writeLibrary(data);
}
