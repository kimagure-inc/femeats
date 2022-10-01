import { Module } from '@nestjs/common';
import { PersonalizeService } from './personalize.service';
import { PersonalizeController } from './personalize.controller';

@Module({
  controllers: [PersonalizeController],
  providers: [PersonalizeService]
})
export class PersonalizeModule {}
