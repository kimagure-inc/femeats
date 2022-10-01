import { Module } from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { RecommendController } from './recommend.controller';

@Module({
  controllers: [RecommendController],
  providers: [RecommendService]
})
export class RecommendModule {}
