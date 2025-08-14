import { Module } from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { QuizzesController } from './quizzes.controller';
import { Quiz, QuizSchema } from './schemas/quiz.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from 'src/auth/auth.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  controllers: [QuizzesController],
  imports: [
    MongooseModule.forFeature([{ name: Quiz.name, schema: QuizSchema }]),
    ConfigModule,
    UsersModule,
    AuthModule,
    JwtModule,
  ],
  exports: [MongooseModule],
  providers: [QuizzesService],
})
export class QuizzesModule {}
