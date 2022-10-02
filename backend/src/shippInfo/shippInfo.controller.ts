import { Controller, Get } from '@nestjs/common';
import { shippInfoService } from './shippInfo.service';
import { DeliveryCycle, DeliveryTimezone } from '@prisma/client';

@Controller('shippInfo')
export class shippInfoController {
  constructor(private readonly shippInfoService: shippInfoService) {}

  @Get('cycle')
  async cycle(): Promise<DeliveryCycle[]> {
    return this.shippInfoService.cycle();
  }

  @Get('timezone')
  async timezone(): Promise<DeliveryTimezone[]> {
    return this.shippInfoService.timezone();
  }

}
