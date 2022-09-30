import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { DeliveryCycle, DeliveryTimezone } from '@prisma/client';

@Injectable()
export class shippInfoService {
  constructor(private prisma: PrismaService) {}

  async cycle(): Promise<DeliveryCycle[]> {
    return this.prisma.deliveryCycle.findMany();
  }

  async timezone(): Promise<DeliveryTimezone[]> {
    return this.prisma.deliveryTimezone.findMany();
  }

}
