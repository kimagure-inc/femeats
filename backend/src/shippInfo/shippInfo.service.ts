import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DeliveryTimezone } from '@prisma/client';

@Injectable()
export class shippInfoService {
  constructor(private prisma: PrismaService) {}

  async timezone(): Promise<DeliveryTimezone[]> {
    return this.prisma.deliveryTimezone.findMany();
  }

}
