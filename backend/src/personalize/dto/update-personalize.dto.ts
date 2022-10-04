import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalizeDto } from './create-personalize.dto';

export class UpdatePersonalizeDto extends PartialType(CreatePersonalizeDto) {}
