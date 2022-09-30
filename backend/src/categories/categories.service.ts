import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class CategoriesService {
  constructor(private prisma: PrismaService) {}

  async category(id: number): Promise<Category | null> {
    return this.prisma.category.findUnique({
        where: { id }
    });
  }
