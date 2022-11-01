import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PersonalizeService } from './personalize.service';
import { CreatePersonalizeDto } from './dto/create-personalize.dto';
import { UpdatePersonalizeDto } from './dto/update-personalize.dto';

type UserAnswer = { data: number[] };

@Controller('personalize')
export class PersonalizeController {
  constructor(private readonly personalizeService: PersonalizeService) {}

  @Post()
  create(@Body() userAnswer: UserAnswer) {
    return this.personalizeService.create(userAnswer);
  }
}
