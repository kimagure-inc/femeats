import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Delivery, Prisma } from '@prisma/client';

@Injectable()
export class DeliveryService {
  constructor(private prisma: PrismaService) {}

  async create(data: any): Promise<Delivery> {
    return this.prisma.delivery.create({
      data,
    });
  }
}
