import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Contract, Prisma } from '@prisma/client';

@Injectable()
export class ContractsService {
  constructor(private prisma: PrismaService) {}

  async contracts(): Promise<Contract[]> {
    return this.prisma.contract.findMany();
  }

  async contract(user_id: number): Promise<Contract | null> {
    return this.prisma.contract.findUnique({
      where: { user_id }
    });
  }

  async createContract(data: Prisma.ContractCreateInput): Promise<Contract> {
    return this.prisma.contract.create({
      data,
    });
  }

  async updateContract(params: {
    where: Prisma.ContractWhereUniqueInput;
    data: Prisma.ContractUpdateInput;
  }): Promise<Contract> {
    const { where, data } = params;
    return this.prisma.contract.update({
      where,
      data,
    });
  }

  async deleteContract(user_id: number): Promise<Contract> {
    return this.prisma.contract.delete({
      where: { user_id }
    });
  }
}
