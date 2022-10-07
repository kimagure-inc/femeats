import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingModule } from './logging/logging.module';
import { UsersModule } from './users/users.module';
import { ContractsModule } from './contracts/contracts.module';
import { shippInfoModule } from './shippInfo/shippInfo.module';
import { SubscribeModule } from './subscribe/subscribe.module';
import { ConfigModule } from '@nestjs/config';
import { StripeModule } from 'nestjs-stripe';
import { ProductsModule } from './products/products.module';
import { CategoriesModule } from './categories/categories.module';
import { QuestionsModule } from './questions/questions.module';
import { PersonalizeModule } from './personalize/personalize.module';
import { RecommendModule } from './recommend/recommend.module';
import { DeliveryModule } from './delivery/delivery.module';
import { CronService } from './contracts/cron.service';

@Module({
  imports: [
    LoggingModule,
    UsersModule,
    ContractsModule,
    shippInfoModule,
    SubscribeModule,
    ConfigModule,
    StripeModule,
    ProductsModule,
    CategoriesModule,
    QuestionsModule,
    PersonalizeModule,
    RecommendModule,
    DeliveryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
