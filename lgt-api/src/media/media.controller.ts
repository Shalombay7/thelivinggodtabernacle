import {
  BadRequestException, Body, ConflictException, Controller, Delete, Get,
  NotFoundException, Param, Post, Req, UploadedFile, UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { MediaKind } from '../generated/prisma';
import { PrismaService } from '../prisma/prisma.service';
import { diskStorage } from 'multer';
import { randomUUID } from 'crypto';
import { mkdirSync } from 'fs';
import { unlink } from 'fs/promises';
import type { Request } from 'express';
import { mediaDirectory, mediaFilePath } from './media-storage';

const MAX_UPLOAD_SIZE = 1024 * 1024 * 1024;
type UploadedMediaFile = { originalname: string; mimetype: string; size: number; filename: string };
const mimeKinds: Record<string, MediaKind> = {
  'audio/mpeg': MediaKind.AUDIO, 'audio/mp4': MediaKind.AUDIO, 'audio/aac': MediaKind.AUDIO, 'audio/x-m4a': MediaKind.AUDIO,
  'audio/ogg': MediaKind.AUDIO, 'audio/wav': MediaKind.AUDIO, 'audio/x-wav': MediaKind.AUDIO, 'audio/wave': MediaKind.AUDIO,
  'audio/flac': MediaKind.AUDIO, 'audio/webm': MediaKind.AUDIO, 'audio/mp3': MediaKind.AUDIO, 'audio/vnd.wave': MediaKind.AUDIO,
  'video/mp4': MediaKind.VIDEO, 'video/webm': MediaKind.VIDEO, 'video/quicktime': MediaKind.VIDEO, 'video/x-matroska': MediaKind.VIDEO,
  'image/jpeg': MediaKind.IMAGE, 'image/png': MediaKind.IMAGE, 'image/gif': MediaKind.IMAGE,
  'image/webp': MediaKind.IMAGE, 'image/avif': MediaKind.IMAGE,
};
const safeExtensions: Record<string, string> = {
  'audio/mpeg': '.mp3', 'audio/mp4': '.m4a', 'audio/x-m4a': '.m4a', 'audio/aac': '.aac',
  'audio/ogg': '.ogg', 'audio/wav': '.wav', 'audio/x-wav': '.wav', 'audio/wave': '.wav', 'audio/vnd.wave': '.wav',
  'audio/flac': '.flac', 'audio/webm': '.weba', 'audio/mp3': '.mp3',
  'video/mp4': '.mp4', 'video/webm': '.webm', 'video/quicktime': '.mov', 'video/x-matroska': '.mkv',
  'image/jpeg': '.jpg', 'image/png': '.png', 'image/gif': '.gif', 'image/webp': '.webp', 'image/avif': '.avif',
};

@Controller('media')
export class PublicMediaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('playlists')
  async getPlaylists() {
    await this.ensureStarterPlaylist();
    const playlists = await this.prisma.mediaPlaylist.findMany({
      orderBy: [{ year: 'desc' }, { title: 'asc' }],
      include: { mediaItems: { orderBy: { orderIndex: 'asc' }, include: { media: true } } },
    });
    return playlists.map((playlist) => this.formatPlaylist(playlist));
  }

  @Get('playlists/:slug')
  async getPlaylist(@Param('slug') slug: string) {
    await this.ensureStarterPlaylist();
    const playlist = await this.prisma.mediaPlaylist.findUnique({
      where: { slug }, include: { mediaItems: { orderBy: { orderIndex: 'asc' }, include: { media: true } } },
    });
    if (!playlist) throw new NotFoundException('Playlist not found.');
    return this.formatPlaylist(playlist);
  }

  private ensureStarterPlaylist() {
    return this.prisma.mediaPlaylist.upsert({
      where: { slug: 'audio-sermon-2025' },
      create: {
        slug: 'audio-sermon-2025', title: 'Audio Sermon 2025', year: 2025,
        description: 'Starter playlist for the 2025 audio sermon archive. Add or replace recordings from the admin dashboard.',
      },
      update: {},
    });
  }

  private formatPlaylist(playlist: {
    id: string; slug: string; title: string; year: number | null; description: string;
    replaceExisting: boolean; createdAt: Date; updatedAt: Date;
    mediaItems: { orderIndex: number; media: { id: string; title: string; kind: MediaKind; mimeType: string; size: number; url: string; createdAt: Date } }[];
  }) {
    const media = playlist.mediaItems.map(({ media: asset }) => ({ ...asset, kind: asset.kind.toLowerCase() }));
    const { mediaItems: _mediaItems, ...fields } = playlist;
    return { ...fields, mediaIds: media.map((asset) => asset.id), media };
  }
}

@Controller('admin')
export class AdminMediaController {
  constructor(private readonly prisma: PrismaService) {}

  @Get('media')
  async getMedia() {
    const media = await this.prisma.mediaAsset.findMany({ orderBy: { createdAt: 'desc' } });
    return media.map((asset) => ({ ...asset, kind: asset.kind.toLowerCase() }));
  }

  @Get('playlists')
  async getPlaylists() {
    await this.prisma.mediaPlaylist.upsert({
      where: { slug: 'audio-sermon-2025' },
      create: {
        slug: 'audio-sermon-2025', title: 'Audio Sermon 2025', year: 2025,
        description: 'Starter playlist for the 2025 audio sermon archive. Add or replace recordings from the admin dashboard.',
      },
      update: {},
    });
    const playlists = await this.prisma.mediaPlaylist.findMany({
      orderBy: [{ year: 'desc' }, { title: 'asc' }],
      include: { mediaItems: { orderBy: { orderIndex: 'asc' }, select: { mediaId: true } } },
    });
    return playlists.map(({ mediaItems, ...playlist }) => ({ ...playlist, mediaIds: mediaItems.map((item) => item.mediaId) }));
  }

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
      else callback(new BadRequestException('Upload an audio, video, or image file in a supported format.'), false);
    },
  }))
  async uploadMedia(@UploadedFile() file: UploadedMediaFile, @Req() request: Request) {
    if (!file) throw new BadRequestException('Choose a file to upload.');
    const titleField = (request.body as { title?: unknown }).title;
    const title = typeof titleField === 'string' && titleField.trim() ? titleField.trim() : file.originalname;
    try {
      const asset = await this.prisma.mediaAsset.create({ data: {
        title, kind: mimeKinds[file.mimetype], mimeType: file.mimetype, size: file.size,
        storageKey: file.filename, url: `/media/${file.filename}`,
      } });
      return { ...asset, kind: asset.kind.toLowerCase() };
    } catch (error) {
      try { await unlink(mediaFilePath(file.filename)); } catch { /* Preserve the database error. */ }
      throw error;
    }
  }

  @Post('playlists')
  createPlaylist(@Body() body: PlaylistInput) { return this.save(body); }

  @Post('playlists/:id')
  updatePlaylist(@Param('id') id: string, @Body() body: PlaylistInput) { return this.save({ ...body, id }); }

  @Delete('media/:id')
  async removeMedia(@Param('id') id: string) {
    const asset = await this.prisma.mediaAsset.findUnique({ where: { id } });
    if (!asset) throw new NotFoundException('Media file not found.');
    await this.prisma.mediaAsset.delete({ where: { id } });
    try { await unlink(mediaFilePath(asset.storageKey)); } catch { /* Remove stale file metadata even if the file is already missing. */ }
    return { ok: true };
  }

  @Delete('playlists/:id')
  async removePlaylist(@Param('id') id: string) {
    const playlist = await this.prisma.mediaPlaylist.findUnique({ where: { id } });
    if (!playlist) throw new NotFoundException('Playlist not found.');
    if (playlist.slug === 'audio-sermon-2025') throw new BadRequestException('The 2025 starter playlist cannot be deleted.');
    await this.prisma.mediaPlaylist.delete({ where: { id } });
    return { ok: true };
  }

  private async save(body: PlaylistInput & { id?: string }) {
    if (!body || typeof body.title !== 'string' || !body.title.trim()) throw new BadRequestException('Playlist title is required.');
    const year = body.year == null || body.year === '' ? null : Number(body.year);
    if (year !== null && (!Number.isInteger(year) || year < 1900 || year > 2200)) throw new BadRequestException('Enter a valid playlist year.');
    const mediaIds = Array.isArray(body.mediaIds) ? [...new Set(body.mediaIds.filter((id): id is string => typeof id === 'string'))] : [];
    const title = body.title.trim();
    const description = typeof body.description === 'string' ? body.description.trim() : '';
    const slug = title.toLowerCase().normalize('NFKD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
    if (!slug) throw new BadRequestException('Enter a valid playlist title.');

    try {
      const result = await this.prisma.$transaction(async (transaction) => {
        const existing = body.id ? await transaction.mediaPlaylist.findUnique({ where: { id: body.id } }) : null;
        if (body.id && !existing) throw new NotFoundException('Playlist not found.');
        const found = mediaIds.length ? await transaction.mediaAsset.count({ where: { id: { in: mediaIds } } }) : 0;
        if (found !== mediaIds.length) throw new BadRequestException('A selected media file is no longer available.');
        const playlist = existing
          ? await transaction.mediaPlaylist.update({ where: { id: existing.id }, data: { title, year, description, replaceExisting: body.replaceExisting === true } })
          : await transaction.mediaPlaylist.create({ data: { slug, title, year, description, replaceExisting: body.replaceExisting === true } });
        await transaction.playlistMedia.deleteMany({ where: { playlistId: playlist.id } });
        if (mediaIds.length) await transaction.playlistMedia.createMany({ data: mediaIds.map((mediaId, orderIndex) => ({ playlistId: playlist.id, mediaId, orderIndex })) });
        return transaction.mediaPlaylist.findUniqueOrThrow({
          where: { id: playlist.id }, include: { mediaItems: { orderBy: { orderIndex: 'asc' }, include: { media: true } } },
        });
      });
      const media = result.mediaItems.map(({ media: asset }) => ({ ...asset, kind: asset.kind.toLowerCase() }));
      const { mediaItems: _mediaItems, ...fields } = result;
      return { ...fields, mediaIds: media.map((asset) => asset.id), media };
    } catch (error) {
      if (error instanceof BadRequestException || error instanceof NotFoundException) throw error;
      if (typeof error === 'object' && error !== null && 'code' in error && error.code === 'P2002') {
        throw new ConflictException('A playlist with that title already exists.');
      }
      throw error;
    }
  }
}

type PlaylistInput = { id?: string; title: string; year?: string | number | null; description?: string; mediaIds?: unknown; replaceExisting?: boolean };
