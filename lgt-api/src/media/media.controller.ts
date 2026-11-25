import {
  BadRequestException, Body, Controller, Delete, Get, NotFoundException,
  Param, Post, Req, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { mkdirSync } from 'fs';
import type { Request } from 'express';
import {
  deleteMediaAsset, deletePlaylist, ensureMediaDirectories, findPlaylist,
  getPlaylistAssets, listMedia, listPlaylists, mediaDirectory, saveMediaAsset,
  savePlaylist, type MediaKind,
} from './media-library';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1024;
type UploadedMediaFile = { originalname: string; mimetype: string; size: number; filename: string };
const mimeKinds: Record<string, MediaKind> = {
  'audio/mpeg': 'audio', 'audio/mp4': 'audio', 'audio/aac': 'audio', 'audio/x-m4a': 'audio',
  'audio/ogg': 'audio', 'audio/wav': 'audio', 'audio/x-wav': 'audio', 'audio/wave': 'audio',
  'audio/flac': 'audio', 'audio/webm': 'audio', 'audio/mp3': 'audio', 'audio/vnd.wave': 'audio',
  'video/mp4': 'video', 'video/webm': 'video', 'video/quicktime': 'video',
  'video/x-matroska': 'video',
  'image/jpeg': 'image', 'image/png': 'image', 'image/gif': 'image',
  'image/webp': 'image', 'image/avif': 'image',
};
const safeExtensions: Record<string, string> = {
  'audio/mpeg': '.mp3', 'audio/mp4': '.m4a', 'audio/x-m4a': '.m4a', 'audio/aac': '.aac',
  'audio/ogg': '.ogg', 'audio/wav': '.wav', 'audio/x-wav': '.wav', 'audio/wave': '.wav',
  'audio/vnd.wave': '.wav', 'audio/flac': '.flac', 'audio/webm': '.weba', 'audio/mp3': '.mp3',
  'video/mp4': '.mp4', 'video/webm': '.webm', 'video/quicktime': '.mov', 'video/x-matroska': '.mkv',
  'image/jpeg': '.jpg', 'image/png': '.png', 'image/gif': '.gif', 'image/webp': '.webp', 'image/avif': '.avif',
};

@Controller('media')
export class PublicMediaController {
  @Get('playlists')
  async getPlaylists() {
    const playlists = await listPlaylists();
    return Promise.all(playlists.map(async (playlist) => ({ ...playlist, media: await getPlaylistAssets(playlist) })));
  }

  @Get('playlists/:slug')
  async getPlaylist(@Param('slug') slug: string) {
    const playlist = await findPlaylist(slug);
    if (!playlist) throw new NotFoundException('Playlist not found.');
    return { ...playlist, media: await getPlaylistAssets(playlist) };
  }
}

@Controller('admin')
export class AdminMediaController {
  @Get('media')
  getMedia() { return listMedia(); }

  @Get('playlists')
  getPlaylists() { return listPlaylists(); }

  @Post('media')
  @UseInterceptors(FileInterceptor('file', {
    storage: diskStorage({
      destination: (_request, _file, callback) => {
        try { mkdirSync(mediaDirectory, { recursive: true }); callback(null, mediaDirectory); }
        catch (error) { callback(error as Error, mediaDirectory); }
      },
      filename: (_request, file, callback) => callback(null, `${randomUUID()}${safeExtensions[file.mimetype] ?? '.bin'}`),
    }),
    limits: { fileSize: MAX_UPLOAD_SIZE, files: 1 },
    fileFilter: (_request, file, callback) => {
      if (mimeKinds[file.mimetype]) callback(null, true);
      else callback(new BadRequestException('Upload an audio, video, or image file in a supported format.') as unknown as Error, false);
    },
  }))
  async uploadMedia(@UploadedFile() file: UploadedMediaFile, @Req() request: Request) {
    await ensureMediaDirectories();
    if (!file) throw new BadRequestException('Choose a file to upload.');
    const titleField = (request.body as { title?: unknown }).title;
    const title = typeof titleField === 'string' && titleField.trim() ? titleField.trim() : file.originalname;
    const asset = await saveMediaAsset({
      id: randomUUID(), title, kind: mimeKinds[file.mimetype], mimeType: file.mimetype,
      size: file.size, url: `/media/${file.filename}`, createdAt: new Date().toISOString(),
    });
    return asset;
  }

  @Post('playlists')
  async createPlaylist(@Body() body: PlaylistInput) {
    return this.save(body);
  }

  @Post('playlists/:id')
  async updatePlaylist(@Param('id') id: string, @Body() body: PlaylistInput) {
    return this.save({ ...body, id });
  }

  @Delete('media/:id')
  async removeMedia(@Param('id') id: string) {
    await deleteMediaAsset(id);
    return { ok: true };
  }

  @Delete('playlists/:id')
  async removePlaylist(@Param('id') id: string) {
    try { await deletePlaylist(id); }
    catch (error) { throw new BadRequestException(error instanceof Error ? error.message : 'Unable to delete playlist.'); }
    return { ok: true };
  }

  private async save(body: PlaylistInput & { id?: string }) {
    if (!body || typeof body.title !== 'string' || !body.title.trim()) throw new BadRequestException('Playlist title is required.');
    const year = body.year == null || body.year === '' ? null : Number(body.year);
    if (year !== null && (!Number.isInteger(year) || year < 1900 || year > 2200)) throw new BadRequestException('Enter a valid playlist year.');
    const mediaIds = Array.isArray(body.mediaIds) ? body.mediaIds.filter((id): id is string => typeof id === 'string') : [];
    try {
      return await savePlaylist({ id: body.id, title: body.title, year, description: typeof body.description === 'string' ? body.description : '', mediaIds, replaceExisting: body.replaceExisting === true });
    } catch (error) {
      throw new BadRequestException(error instanceof Error ? error.message : 'Unable to save playlist.');
    }
  }
}

type PlaylistInput = { id?: string; title: string; year?: string | number | null; description?: string; mediaIds?: unknown; replaceExisting?: boolean };
