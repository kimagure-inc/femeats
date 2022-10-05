import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { RecommendService } from 'src/recommend/recommend.service';
import { ContractsService } from 'src/contracts/contracts.service';

@Module({
  imports: [
    JwtModule.register({
      secret: 'JWT_SEACRETKEY',
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, RecommendService, ContractsService],
})
export class UsersModule {}
