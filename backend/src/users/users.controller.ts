import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { UsersService } from './users.service';
import { User, Prisma } from '@prisma/client';

@Controller('users')
export class UsersController {
  logger: any;
  constructor(private readonly usersService: UsersService) { }

  @Get()
  async findAll(): Promise<User[]> {
    return this.usersService.users();
  }

  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<User> {
    return this.usersService.user(Number(id));
  }

  @Post()
  async createUser(
    @Body() data: Prisma.UserCreateInput
  ): Promise<User> {
    return this.usersService.createUser(data);
  }

  @Patch(':id')
  async updateUser(
    @Param('id') id: string,
    @Body() data: Prisma.UserUpdateInput,
  ): Promise<User> {
    return this.usersService.updateUser({
      where: { id: Number(id) },
      data: data,
    });
  }

  @Delete(':id')
  async deletePost(
    @Param('id') id: string
  ): Promise<User> {
    return this.usersService.deleteUser(Number(id));
  }
}
