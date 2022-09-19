import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Spot } from '@prisma/client';

@Injectable()
export class SpotsService {
  constructor(private prisma: PrismaService) {}

  async spot(
    id: number,
  ): Promise<Spot | null> {
    return this.prisma.spot.findUnique({
      where: { id }
    });
  }

  async spots(): Promise<Spot[]> {
    return this.prisma.spot.findMany();
  }
}
