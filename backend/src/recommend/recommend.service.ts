import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Recommend, Prisma } from '@prisma/client';

@Injectable()
export class RecommendService {
    constructor(private prisma: PrismaService) {}

    async recommends(): Promise<Recommend[]> {
      return this.prisma.recommend.findMany();
    }
  
    async recommend(user_id: number): Promise<Recommend | null> {
      return this.prisma.recommend.findUnique({
        where: { user_id }
      });
    }

    async createRecommend(data: Prisma.RecommendCreateInput): Promise<Recommend> {
      return this.prisma.recommend.create({
        data,
      });
    }

    async updateRecommend(params: {
      where: Prisma.RecommendWhereUniqueInput;
      data: Prisma.RecommendUpdateInput;
    }): Promise<Recommend> {
      const { where, data } = params;
      return this.prisma.recommend.update({
        where,
        data,
      });
    }
  
    async deleteRecommend(user_id: number): Promise<Recommend> {
      return this.prisma.recommend.delete({
        where: { user_id }
      });
    }
}
