import { Controller, Get, Patch, Post } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';

@Controller('subscribe')
export class SubscribeController {
  constructor(private readonly subscribeService: SubscribeService) {}

  // 動作確認OK
  @Get('products')
  async listProducts() {
    return this.subscribeService.listProducts();
  }

  // 動作確認×
  @Get('customer/:query')
  async customer(query) {
    return this.subscribeService.customer(query);
  }

  // 動作確認△ => 作成はされるが、nameとmail登録されてない
  @Post('customer')
  async createCustomer() {
    return this.subscribeService.createCustomer();
  }

  @Post('contracts')
  async createSubscription(id) {
    return this.subscribeService.createSubscription(id);
  }

  @Patch('customer')
  async updateCustomer(params: {
    id: string;
    data: string;
  }) {
    return this.subscribeService.updateCustomer(params);
  }

}
