import { Controller, Get, Param } from '@nestjs/common';
import { SpotsService } from './spots.service';
import { Spot } from '@prisma/client';

@Controller('spots')
export class SpotsController {

    constructor(
        private readonly spotsService: SpotsService,
    ) { }

    @Get(':id')
    async findSpotById(
        @Param('id') id: string,
    ): Promise<Spot> {
        return this.spotsService.spot(Number(id));
    }

    @Get()
    async spots(): Promise<Spot[]> {
      return this.spotsService.spots();
    }

}
