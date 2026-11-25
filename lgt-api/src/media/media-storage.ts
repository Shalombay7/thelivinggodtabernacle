import { mkdir } from 'fs/promises';
import { join } from 'path';

// Runtime media stays outside dist/ so rebuilding the app does not remove uploads.
export const mediaDirectory = join(__dirname, '..', '..', 'uploads', 'media');

export async function ensureMediaDirectories() {
  await mkdir(mediaDirectory, { recursive: true });
}

export function mediaFilePath(storageKey: string) {
  const filename = storageKey.split(/[\\/]/).at(-1);
  if (!filename || filename !== storageKey || !/^[a-f0-9-]+\.[a-z0-9]+$/i.test(filename)) {
    throw new Error('Invalid media storage key.');
  }
  return join(mediaDirectory, filename);
}
