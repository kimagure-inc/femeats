import { Module } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { RecommendController } from './recommend.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [RecommendController],
  providers: [RecommendService, PrismaService]
})
export class RecommendModule {}
