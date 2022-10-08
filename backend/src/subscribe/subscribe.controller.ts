import { Controller, Get, Patch, Post, Body, Param } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { ContractsService } from '../contracts/contracts.service';
import Stripe from 'stripe';
import { LoggingService } from '../logging/logging.service';

@Controller('subscribe')
export class SubscribeController {
  stripeClient: any;
  constructor(
    private readonly subscribeService: SubscribeService,
    private productsService: ProductsService,
    private contractsService: ContractsService,
    private usersService: UsersService,
    private logger: LoggingService
  ) { }

  @Get('products')
  async listProducts() {
    return this.subscribeService.listProducts();
  }

  @Get('customer/:id')
  async customer(@Param('id') id: string) {
    return this.subscribeService.customer(String(id));
  }

  // stripe顧客登録＋stripeサブスク契約=>client_secretとstripeのサブスクIDを返す
  @Post('cs')
  async createCS(
    @Body('email') email: string,
    @Body('product_id') product_id: number,
  ) {
    const stripe_id = await this.productsService.stripeId(Number(product_id));
    return this.subscribeService.createCS(email, stripe_id[0].stripe_id);
  }

  // users更新+contract作成
  @Post('user/:id')
  async updateCustomerAndCreateContract(
    @Param('id') id: string,
    @Body() data
  ) {
    try {
      const userInfo = await this.usersService.updateUser({
        where: { id: Number(id) },
        data: data.userData,
      });
      const contractInfo = await this.contractsService.createContract(data.contractData);
      return {
        userInfo,
        contractInfo,
      }

    } catch (error) {
      throw console.error(error);
   }
  }

  @Patch('customer/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() params: Stripe.CustomerUpdateParams
  ) {
    return this.subscribeService.updateCustomer(id, params);
  }

}