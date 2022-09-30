import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Product, Prisma } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prisma: PrismaService) {}

  async products(): Promise<Product[]> {
    return this.prisma.product.findMany();
  }

  async product(id: number): Promise<Product | null> {
    return this.prisma.product.findUnique({
        where: { id }
    });
  }

  async productsByCategory(category_id: number): Promise<Product[] | null> {
    return this.prisma.product.findMany({
        where: { category_id }
    });
  }

}