import { Module } from '@nestjs/common';
import { SermonsService } from './sermons.service';
import { SermonsController } from './sermons.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [SermonsController],
  providers: [SermonsService, PrismaService],
})
export class SermonsModule {}