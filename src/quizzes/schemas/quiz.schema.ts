import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';

@Schema({ timestamps: true })
export class Quiz extends Document {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  question: string;

  @Prop({ required: true })
  answer: string;

  @Prop()
  score: number;

  @Prop({ type: Types.ObjectId, ref: User.name, required: true })
  user: Types.ObjectId;
}

export const QuizSchema = SchemaFactory.createForClass(Quiz);
