import { Controller, Get, Patch, Post, Body, Param } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { ProductsService } from '../products/products.service';
import Stripe from 'stripe';

@Controller('subscribe')
export class SubscribeController {
  constructor(
    private readonly subscribeService: SubscribeService,
    private productsService: ProductsService,
  ) { }

  // 動作確認OK
  @Get('products')
  async listProducts() {
    return this.subscribeService.listProducts();
  }

  // 動作確認OK
  @Get('customer/:id')
  async customer(@Param('id') id: string) {
    return this.subscribeService.customer(String(id));
  }

  // 動作確認OK
  // stripeの顧客登録＋サブスク契約=>client_secretを返す
  @Post('cs')
  async createCS(
    @Body('email') email: string,
    @Body('product_id') product_id: number,
  ) {
    const stripe_id = await this.productsService.stripeId(Number(product_id));
    return this.subscribeService.createCS(email, stripe_id[0].stripe_id);
  }

  // usersテーブル：patch
  // stripe-customer：patch
  // contract:post
  @Post()
  async createStripe(
    @Body() id: Stripe.CustomerUpdateParams,
    @Body() params: Stripe.CustomerUpdateParams
  ) {
    return this.subscribeService.updateCustomerAndContract(String(id), params);
  }

  // 動作確認OK
  // @Post('customer')
  // async createCustomer(@Body() params: string) {
  //   return this.subscribeService.createCustomer(params);
  // }

  // 動作確認OK
  @Patch('customer/:id')
  async updateCustomer(
    @Param('id') id: string,
    @Body() params: Stripe.CustomerUpdateParams
  ) {
    return this.subscribeService.updateCustomer(id, params);
  }

  // 動作確認OK
  // @Post('subscription')
  // async createSubscription(
  //   @Body() params: Stripe.SubscriptionCreateParams
  // ) {
  //   return this.subscribeService.createSubscription(params);
  // }

  // 作成中
  @Get('subscriptions/:customer')
  async subscription(@Param('customer') customer: string) {
    return this.subscribeService.subscription(customer);
  }

}
