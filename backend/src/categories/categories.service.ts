import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Category, Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async categories(): Promise<Category[]> {
    return this.prisma.category.findMany();
  }

  async category(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
        where: { id }
    });
  }
}
