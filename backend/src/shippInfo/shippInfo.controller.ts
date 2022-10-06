import { Controller, Get } from '@nestjs/common';
import { shippInfoService } from './shippInfo.service';
import { DeliveryTimezone } from '@prisma/client';

@Controller('shippInfo')
export class shippInfoController {
  constructor(private readonly shippInfoService: shippInfoService) {}

  @Get('timezone')
  async timezone(): Promise<DeliveryTimezone[]> {
    return this.shippInfoService.timezone();
  }

}
