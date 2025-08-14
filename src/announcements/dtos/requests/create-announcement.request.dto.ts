import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAnnouncementRequestDto {
  @IsNotEmpty()
  @IsString()
  title: string;
}
