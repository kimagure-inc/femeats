import { Controller, Get, Param, Post, Body, Patch, Delete } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { Question, Prisma } from '@prisma/client';

@Controller('questions')
export class QuestionsController {
  logger: any;
  constructor(private readonly questionsService: QuestionsService) {}

  @Get()
  async findAll(): Promise<Question[]> {
    return this.questionsService.questions();
  }
 
  @Get(':id')
  async findOne(
    @Param('id') id: string,
  ): Promise<Question> {
    return this.questionsService.question(Number(id));
  }  
}
