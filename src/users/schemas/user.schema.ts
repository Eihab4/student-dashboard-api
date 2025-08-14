import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type UserDocument = User & Document;

@Schema()
export class User extends Document {
  @Prop({ required: true, unique: true, index: true })
  email: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  tokenVersion: number;

  @Prop({ type: [{ type: Types.ObjectId, ref: 'Quiz' }] })
  quizzes: Types.ObjectId[];
}

export const UserSchema = SchemaFactory.createForClass(User);
