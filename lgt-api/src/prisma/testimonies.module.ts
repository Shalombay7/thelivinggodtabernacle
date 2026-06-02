import { Module } from '@nestjs/common';
import { TestimoniesService } from './testimonies.service';
import { TestimoniesController } from './testimonies.controller';
import { PrismaService } from './prisma.service';

@Module({
  controllers: [TestimoniesController],
  providers: [TestimoniesService, PrismaService],
})
export class TestimoniesModule {}