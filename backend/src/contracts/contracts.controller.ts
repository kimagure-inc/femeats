import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ContractsService } from './contracts.service';

import { Contract, Prisma } from '@prisma/client';
import { DeliveryService } from 'src/delivery/delivery.service';

@Controller('contracts')
export class ContractsController {
  constructor(
    private readonly contractsService: ContractsService,
    private deliveryService: DeliveryService,
  ) {}

  @Get(':user_id')
  async findOne(@Param('user_id') user_id: string): Promise<Contract> {
    return this.contractsService.contract(Number(user_id));
  }

  @Post()
  async createContract(
    @Body() data: Prisma.ContractCreateInput,
  ): Promise<Contract> {
    return this.contractsService.createContract(data);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') user_id: string,
    @Body() data: Prisma.ContractUpdateInput,
  ): Promise<Contract> {
    return this.contractsService.updateContract({
      where: { id: Number(user_id) },
      data: data,
    });
  }

  @Delete(':id')
  async deletePost(@Param('id') user_id: string): Promise<Contract> {
    return this.contractsService.deleteContract(Number(user_id));
  }
}
