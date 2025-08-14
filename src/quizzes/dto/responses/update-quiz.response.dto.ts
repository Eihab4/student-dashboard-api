import { PartialType } from '@nestjs/mapped-types';
import { FetchQuizResponseDto } from './fetch-quiz.response.dto';

export class UpdateQuizResponseDto extends PartialType(FetchQuizResponseDto) {}
