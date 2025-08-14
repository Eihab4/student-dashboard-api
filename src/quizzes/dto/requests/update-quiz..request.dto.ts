import { PartialType } from '@nestjs/mapped-types';
import { CreateQuizRequestDto } from './create-quiz.request.dto';

export class UpdateQuizRequestDto extends PartialType(CreateQuizRequestDto) {}
