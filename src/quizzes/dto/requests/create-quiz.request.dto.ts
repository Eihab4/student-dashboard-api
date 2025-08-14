import { IsNotEmpty, IsString } from 'class-validator';

export class CreateQuizRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsString()
  question: string;

  @IsNotEmpty()
  @IsString()
  answer: string;
}
