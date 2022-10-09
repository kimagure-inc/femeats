import { Module } from '@nestjs/common';
import { DeliveryController } from './delivery.controller';
import { PrismaService } from 'src/prisma.service';
import { DeliveryService } from './delivery.service';

@Module({
  controllers: [DeliveryController],
  providers: [PrismaService, DeliveryService],
})
export class DeliveryModule {}
