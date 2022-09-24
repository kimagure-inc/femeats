import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SpotsModule } from './spots/spots.module';
import { LoggingModule } from './logging/logging.module';

@Module({
  imports: [SpotsModule, LoggingModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
