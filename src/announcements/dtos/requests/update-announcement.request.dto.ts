import { PartialType } from '@nestjs/mapped-types';
import { CreateAnnouncementRequestDto } from './create-announcement.request.dto';

export class UpdateAnnouncementRequestDto extends PartialType(
  CreateAnnouncementRequestDto,
) {}
