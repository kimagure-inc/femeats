import { Controller, Get, Patch, Post, Body, Param } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { ProductsService } from '../products/products.service';
import { UsersService } from '../users/users.service';
import { ContractsService } from '../contracts/contracts.service';
import Stripe from 'stripe';
import { Prisma } from '@prisma/client';

@Controller('subscribe')
export class SubscribeController {
  stripeClient: any;
  constructor(
    private readonly subscribeService: SubscribeService,
    private productsService: ProductsService,
    private contractsService: ContractsService,
    private usersService: UsersService,
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

  // users更新+contract作成+stripe顧客更新
  @Post('user/:id')
  async updateCustomerAndCreateContract(
    @Param('id') id: Prisma.UserCreateInput,
    @Body() data
  ) {
    // console.log(data)
    const userInfo = await this.usersService.updateUser({
      where: { id: Number(id) },
      data: data.userData,
    });
    const contractInfo = await this.contractsService.createContract(data.contractData);
    const stripeCustomerInfo = await this.subscribeService.updateCustomer(data.userData.stripe_cus_id, data.stripeCusData);
    // const stripeSubscribeInfo = await this.subscribeService.updateSubscription(data.userData.stripe_sub_id, data.stripeSubData);
    return {
      userInfo,
      contractInfo,
      stripeCustomerInfo,
      // stripeSubscribeInfo
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