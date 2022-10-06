import { Module } from '@nestjs/common';
import { SubscribeService } from './subscribe.service';
import { SubscribeController } from './subscribe.controller';
import { ConfigService, ConfigModule } from '@nestjs/config';
import { StripeModule } from 'nestjs-stripe';
import { ProductsService } from '../products/products.service';
import { PrismaService } from '../prisma.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env'],
    }),
    StripeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        apiKey: configService.get('STRIPE_SECRET_KEY_MY'),
        apiVersion: '2022-08-01',
      }),
    }),
  ],
  controllers: [SubscribeController],
  providers: [SubscribeService, ProductsService, PrismaService]
})
export class SubscribeModule {}