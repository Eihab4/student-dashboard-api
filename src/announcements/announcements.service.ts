/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Injectable, NotFoundException } from '@nestjs/common';
import { Announcement } from './schemas/announcement.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateAnnouncementRequestDto } from './dtos/requests/create-announcement.request.dto';
import { CreateAnnouncementResponseDto } from './dtos/responses/create-announcement.response.dto';
import { FetchAnnouncementResponseDto } from './dtos/responses/fetch-announcement.response.dto';
import { UpdateAnnouncementRequestDto } from './dtos/requests/update-announcement.request.dto';
import { UpdateAnnouncementResponseDto } from './dtos/responses/update-announcement.response.dto';
import { MessageResponseDto } from 'src/common/dtos/responses/message.response.dto';

@Injectable()
export class AnnouncementsService {
  constructor(
    @InjectModel(Announcement.name)
    private announcementModel: Model<Announcement>,
  ) {}

  async createAnnouncement(
    createAnnouncementRequestDto: CreateAnnouncementRequestDto,
    userId: string,
  ): Promise<CreateAnnouncementResponseDto> {
    const newAnnouncement = new this.announcementModel({
      ...createAnnouncementRequestDto,
      postedBy: userId,
    });

    const savedAnnouncement = await newAnnouncement.save();

    const createAnnouncementResponse: CreateAnnouncementResponseDto = {
      title: savedAnnouncement.title,
    };

    return createAnnouncementResponse;
  }

  async getAllAnnouncements(): Promise<FetchAnnouncementResponseDto[]> {
    const announcements = await this.announcementModel
      .find()
      .populate('postedBy', 'name');
    if (!announcements) {
      throw new NotFoundException('No announcements found');
    }
    const fetchedAnnouncementsResponse: FetchAnnouncementResponseDto[] =
      announcements.map((announcement) => ({
        title: announcement.title,
        postedBy: (announcement.postedBy as any).name,
      }));
    return fetchedAnnouncementsResponse;
  }

  async getAnnouncementById(id: string): Promise<FetchAnnouncementResponseDto> {
    const announcement = await this.announcementModel
      .findById(id)
      .populate('postedBy', 'name');
    if (!announcement) {
      throw new NotFoundException('announcement not found');
    }
    const fetchedAnnouncementsResponse: FetchAnnouncementResponseDto = {
      title: announcement.title,
      postedBy: (announcement.postedBy as any).name,
    };
    return fetchedAnnouncementsResponse;
  }

  async updateAnnouncement(
    id: string,
    updateAnnouncementRequestDto: UpdateAnnouncementRequestDto,
  ): Promise<UpdateAnnouncementResponseDto> {
    const updatedAnnouncement = await this.announcementModel
      .findByIdAndUpdate(id, updateAnnouncementRequestDto, { new: true })
      .populate('postedBy', 'name');
    if (!updatedAnnouncement) {
      throw new NotFoundException('Announcement not found');
    }
    const updatedAnnouncementResponse: UpdateAnnouncementResponseDto = {
      title: updatedAnnouncement.title,
      postedBy: (updatedAnnouncement.postedBy as any).name,
    };
    return updatedAnnouncementResponse;
  }

  async deleteAnnouncement(id: string): Promise<MessageResponseDto> {
    const deletedAnnouncement =
      await this.announcementModel.findByIdAndDelete(id);

    if (!deletedAnnouncement) {
      throw new NotFoundException('Announcement not found');
    }

    const deleteAnnouncementResponse: MessageResponseDto = {
      message: 'Announcement deleted successfully',
    };

    return deleteAnnouncementResponse;
  }
}
