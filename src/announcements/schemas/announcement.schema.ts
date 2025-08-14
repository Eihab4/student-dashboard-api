import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Announcement extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  postedBy: Types.ObjectId;
}

export const AnnouncementSchema = SchemaFactory.createForClass(Announcement);
