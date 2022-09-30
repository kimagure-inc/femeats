import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product, Prisma } from '@prisma/client';

@Controller('products')
export class ProductsController {
  logger: any;
  constructor(private readonly productsService: ProductsService) {}
    
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productsService.products();
  }
 
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productsService.product(Number(id));
  }  

  @Get('/category/:category_id')
  async findMany(
    @Param('category_id') id: string,
  ): Promise<Product[]> {
    return this.productsService.productsByCategory(Number(id));
  }  

  // @Get(':id')
  // async findOne(
  //   @Param('id') id: string,
  // ): Promise<Product> {
  //   return this.productsService.product(Number(id));
  // }
      
}