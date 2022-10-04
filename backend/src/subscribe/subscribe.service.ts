import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe
  ) {}
  
  public async listProducts() {
    return this.stripeClient.products.list();
  }

  public async customer(query) {
    return this.stripeClient.customers.search(query);
  }

  public async createCustomer() {
    return this.stripeClient.customers.create();
  }

  public async createSubscription(id) {
    return this.stripeClient.subscriptions.create(id);
  }

  public async updateCustomer(params: {
    id: string;
    data: string;
  }) {
    return this.stripeClient.customers.update(params.id);
  }

}
