import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category, Prisma } from '@prisma/client';


@Controller('categories')
export class CategoriesController {
  logger: any;
  constructor(private readonly categoriesService: CategoriesService) {}

    @Get()
    async findAll(): Promise<Category[]> {
      return this.categoriesService.categories();
    }
  
    @Get(':id')
    async findOne(
      @Param('id') id: string,
    ): Promise<Category> {
      return this.categoriesService.category(Number(id));
    }
}
