import { Module } from '@nestjs/common';
import { shippInfoService } from './shippInfo.service';
import { shippInfoController } from './shippInfo.controller';
import { PrismaService } from '../prisma.service';

@Module({
  controllers: [shippInfoController],
  providers: [shippInfoService, PrismaService]
})
export class shippInfoModule {}
