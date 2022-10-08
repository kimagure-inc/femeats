import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class SubscribeService {
  constructor(@InjectStripe() private readonly stripeClient: Stripe) {}

  public async listProducts() {
    return this.stripeClient.products.list();
  }

  public async customer(id: string) {
    return this.stripeClient.customers.retrieve(id);
  }

  // stripe顧客登録+stripeサブスク契約+client_secret取得
  public async createCS(email: string, stripe_id: string) {
    // 顧客登録
    const customerData = {
      email: email,
      payment_method: 'pm_card_visa',
      invoice_settings: { default_payment_method: 'pm_card_visa' },
    };
    const customer = await this.stripeClient.customers.create(customerData);

    // 請求サイクル設定(今日の日付＋5日 => UNIX時間へ)
    let date = new Date();
    date.setDate(date.getDate() + 5);
    const unixDate = Math.round(date.getTime() / 1000);

    const subscription = await this.stripeClient.subscriptions.create({
      items: [
        {
          price: stripe_id,
          quantity: 1,
        },
      ],
      proration_behavior: 'none',
      customer: customer.id,
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    });

    const cs = (subscription.latest_invoice as any).payment_intent
      .client_secret;
    const subscribe_id = subscription.id;

    return { cs, subscribe_id };
  }

  public async updateCustomer(id: string, params: Stripe.CustomerUpdateParams) {
    return this.stripeClient.customers.update(String(id), params);
  }

  public async updateSubscription(
    id: string,
    params: Stripe.SubscriptionUpdateParams,
  ) {
    return this.stripeClient.subscriptions.update(id, params);
  }
}
