import { Injectable } from '@nestjs/common';
import { InjectStripe } from 'nestjs-stripe';
import Stripe from 'stripe';

@Injectable()
export class SubscribeService {
  constructor(
    @InjectStripe() private readonly stripeClient: Stripe
  ) { }

  public async listProducts() {
    return this.stripeClient.products.list();
  }

  public async customer(id: string) {
    return this.stripeClient.customers.retrieve(id);
  }

  // stripeの顧客更新＋契約内容更新を行う関数
  public async updateCustomerAndContract(
    id: string,
    params: Stripe.CustomerUpdateParams
  ) {
    return this.stripeClient.customers.update(id, params);
  }

  // stripeの顧客登録+契約+client_secret取得
  public async createCS(email, stripe_id) {
    console.log('stripe_id:', stripe_id)

    // 顧客登録
    const customerData = {
      email: email,
      payment_method: 'pm_card_visa',
      invoice_settings: {'default_payment_method': 'pm_card_visa'}
    }
    const customer = await this.stripeClient.customers.create(customerData);
    
    // 請求サイクル設定(今日の日付＋5日 => UNIX時間へ)
    let date = new Date();
    date.setDate(date.getDate() + 5);
    console.log('date:', date);
    const unixDate = Math.round(date.getTime() / 1000);
    console.log('unix-date:', unixDate);

    const subscription = await this.stripeClient.subscriptions.create({
      items: [{
        price: stripe_id,
        quantity: 1
      }],
      proration_behavior: 'none',
      customer: customer.id,
      payment_settings: {
        save_default_payment_method: 'on_subscription',
      },
      payment_behavior: 'default_incomplete',
      expand: ['latest_invoice.payment_intent'],
    })

    return (subscription.latest_invoice as any).payment_intent.client_secret;

  }

  // public async createCustomer(params: any) {
  //   return this.stripeClient.customers.create(params);
  // }

  public async updateCustomer(
    id: string,
    params: Stripe.CustomerUpdateParams
  ) {
    return this.stripeClient.customers.update(id, params);
  }

  // public async createSubscription(params: Stripe.SubscriptionCreateParams) {
  //   const subscription = await this.stripeClient.subscriptions.create(params)
  //   console.log(subscription.id)
  //   // console.log( (subscription.latest_invoice as any).payment_intent.client_secret)
  //   return this.stripeClient.subscriptions.create(params);
  // }

  public async subscription(customer: string) {
    return this.stripeClient.subscriptions.retrieve(customer);
  }

}
