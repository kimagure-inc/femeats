import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Contract, Prisma } from '@prisma/client';

@Injectable()
export class ContractsService {
  constructor(private prisma: PrismaService) {}

  async contracts(): Promise<Contract[]> {
    return this.prisma.contract.findMany({});
  }

  async onContracts(): Promise<Contract[]> {
    return this.prisma.contract.findMany({
      where: {
        status_id: 1,
      },
      include: {
        user: true,
        product: true,
      },
    });
  }

  async contract(user_id: number): Promise<Contract> {
    return this.prisma.contract.findFirst({
      where: { user_id },
      orderBy: {
        id: 'desc',
      },
      include: {
        timezone: true,
        product: true,
      },
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

  async deleteContract(id: number): Promise<Contract> {
    return this.prisma.contract.delete({
      where: { id },
    });
  }
}
