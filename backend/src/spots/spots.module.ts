import { Module } from '@nestjs/common';
import { SpotsController } from './spots.controller';
import { SpotsService } from './spots.service';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [SpotsController],
  providers: [SpotsService, PrismaService]
})
export class SpotsModule {}
