import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { Category, Prisma } from '@prisma/client';


@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}
}
