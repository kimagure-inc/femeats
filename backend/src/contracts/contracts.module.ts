import { Module } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { ContractsController } from './contracts.controller';
import { PrismaService } from '../prisma.service';
import { DeliveryService } from 'src/delivery/delivery.service';
import { ScheduleModule } from '@nestjs/schedule';
import { CronService } from './cron.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  controllers: [ContractsController],
  providers: [ContractsService, PrismaService, DeliveryService, CronService],
})
export class ContractsModule {}
