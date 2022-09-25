import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoggingModule } from './logging/logging.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [LoggingModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
