import { Module } from '@nestjs/common';
import { PrayerWallService } from './prayer-wall.service';
import { PrayerWallController } from './prayer-wall.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [PrayerWallController],
  providers: [PrayerWallService, PrismaService],
})
export class PrayerWallModule {}