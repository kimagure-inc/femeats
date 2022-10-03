import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ContractsService } from './contracts.service';
import { Contract, Prisma } from '@prisma/client';

@Controller('contracts')
export class ContractsController {
  constructor(private readonly contractsService: ContractsService) {}

  @Get()
  async findAll(): Promise<Contract[]> {
    return this.contractsService.contracts();
  }

  @Get(':id')
  async findOne(
    @Param('id') user_id: string,
  ): Promise<Contract> {
    return this.contractsService.contract(Number(user_id));
  }

  @Post()
  async createContract(
    @Body() data: Prisma.ContractCreateInput
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
  async deletePost(
    @Param('id') user_id: string
  ): Promise<Contract> {
    return this.contractsService.deleteContract(Number(user_id));
  }

}
