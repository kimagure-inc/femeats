import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { RecommendService } from './recommend.service';
import { Recommend, Prisma } from '@prisma/client';

@Controller('recommend')
export class RecommendController {
  logger: any;
  constructor(private readonly recommendService: RecommendService) {}

  @Get()
  async findAll(): Promise<Recommend[]> {
    return this.recommendService.recommends();
  }

  // @Get(':user_id')
  // async findOne(@Param('user_id') user_id: string): Promise<Recommend> {
  //   return this.recommendService.recommend(Number(user_id));
  // }

  @Post()
  async createRecommend(
    @Body() data: Prisma.RecommendCreateInput,
  ): Promise<Recommend> {
    return this.recommendService.createRecommend(data);
  }

  // @Patch(':email')
  // async updateRecommend(
  //   @Param('email') email: string,
  //   @Body() data: Prisma.RecommendUpdateInput,
  // ): Promise<Recommend> {
  //   return this.recommendService.updateRecommend({
  //     where: { email },
  //     data: data,
  //   });
  // }

  // @Delete(':email')
  // async deletePost(@Param('email') email: string): Promise<Recommend> {
  //   return this.recommendService.deleteRecommend(Number(email));
  // }
}
