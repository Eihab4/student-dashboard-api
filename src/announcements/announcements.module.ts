import { Module } from '@nestjs/common';
import { AnnouncementsService } from './announcements.service';
import { AnnouncementsController } from './announcements.controller';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Announcement,
  AnnouncementSchema,
} from './schemas/announcement.schema';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Announcement.name,
        schema: AnnouncementSchema,
      },
    ]),
    UsersModule,
    JwtModule,
    ConfigModule,
  ],
  exports: [MongooseModule],
  providers: [AnnouncementsService],
  controllers: [AnnouncementsController],
})
export class AnnouncementsModule {}
