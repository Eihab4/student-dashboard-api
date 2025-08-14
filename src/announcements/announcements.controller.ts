import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/currentUser.decorator';
import type JwtPayload from 'src/auth/interfaces/jwtPayload.interface';
import { CreateAnnouncementRequestDto } from './dtos/requests/create-announcement.request.dto';
import { CreateAnnouncementResponseDto } from './dtos/responses/create-announcement.response.dto';
import { FetchAnnouncementResponseDto } from './dtos/responses/fetch-announcement.response.dto';
import { UpdateAnnouncementRequestDto } from './dtos/requests/update-announcement.request.dto';
import { UpdateAnnouncementResponseDto } from './dtos/responses/update-announcement.response.dto';
import { MessageResponseDto } from 'src/common/dtos/responses/message.response.dto';

@UseGuards(AuthGuard)
@Controller('announcements')
export class AnnouncementsController {
  constructor(private readonly announcementsService: AnnouncementsService) {}

  @Post()
  createAnnouncement(
    @CurrentUser() user: JwtPayload,
    @Body() createAnnouncementDto: CreateAnnouncementRequestDto,
  ): Promise<CreateAnnouncementResponseDto> {
    return this.announcementsService.createAnnouncement(
      createAnnouncementDto,
      user.id,
    );
  }

  @Get()
  getAllAnnouncements(): Promise<FetchAnnouncementResponseDto[]> {
    return this.announcementsService.getAllAnnouncements();
  }

  @Get(':id')
  getAnnouncementById(
    @Param('id') id: string,
  ): Promise<FetchAnnouncementResponseDto> {
    return this.announcementsService.getAnnouncementById(id);
  }

  @Put(':id')
  updateAnnouncement(
    @Param('id') id: string,
    @Body() updateAnnouncementDto: UpdateAnnouncementRequestDto,
  ): Promise<UpdateAnnouncementResponseDto> {
    return this.announcementsService.updateAnnouncement(
      id,
      updateAnnouncementDto,
    );
  }

  @Delete(':id')
  deleteAnnouncement(@Param('id') id: string): Promise<MessageResponseDto> {
    return this.announcementsService.deleteAnnouncement(id);
  }
}
