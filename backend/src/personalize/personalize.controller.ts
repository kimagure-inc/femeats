import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalizeService } from './personalize.service';
import { CreatePersonalizeDto } from './dto/create-personalize.dto';
import { UpdatePersonalizeDto } from './dto/update-personalize.dto';

@Controller('personalize')
export class PersonalizeController {
  constructor(private readonly personalizeService: PersonalizeService) {}

  @Post()
  create(@Body() createPersonalizeDto: CreatePersonalizeDto) {
    return this.personalizeService.create(createPersonalizeDto);
  }
}
