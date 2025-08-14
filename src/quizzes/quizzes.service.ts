import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateQuizRequestDto } from './dto/requests/create-quiz.request.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Quiz } from './schemas/quiz.schema';
import { Model } from 'mongoose';
import { CreateQuizResponseDto } from './dto/responses/create-quiz.resonse.dto';
import { FetchQuizResponseDto } from './dto/responses/fetch-quiz.response.dto';
import { UpdateQuizRequestDto } from './dto/requests/update-quiz..request.dto';
import { UpdateQuizResponseDto } from './dto/responses/update-quiz.response.dto';
import { MessageResponseDto } from 'src/common/dtos/responses/message.response.dto';

@Injectable()
export class QuizzesService {
  constructor(@InjectModel(Quiz.name) private quizModel: Model<Quiz>) {}

  async createQuiz(
    createQuizRequestDto: CreateQuizRequestDto,
    userId: string,
  ): Promise<CreateQuizResponseDto> {
    const newQuiz = new this.quizModel({
      ...createQuizRequestDto,
      user: userId,
    });
    await newQuiz.save();
    const createdQuizResponse: CreateQuizResponseDto = {
      id: String(newQuiz._id),
      title: newQuiz.title,
      description: newQuiz.description,
      question: newQuiz.question,
      score: newQuiz.score,
    };
    return createdQuizResponse;
  }

  async getAllQuizzes(): Promise<FetchQuizResponseDto[]> {
    const quizzes = await this.quizModel.find();
    if (!quizzes) {
      throw new NotFoundException('No quizzes found');
    }
    const fetchedQuizzes: FetchQuizResponseDto[] = quizzes.map((quiz) => ({
      id: String(quiz._id),
      title: quiz.title,
      description: quiz.description,
      question: quiz.question,
      score: quiz.score,
    }));
    return fetchedQuizzes;
  }

  async getQuizById(id: string): Promise<FetchQuizResponseDto> {
    const quiz = await this.quizModel.findById(id);
    if (!quiz) {
      throw new NotFoundException('Quiz not found');
    }
    const fetchedQuiz: FetchQuizResponseDto = {
      id: String(quiz._id),
      title: quiz.title,
      description: quiz.description,
      question: quiz.question,
      score: quiz.score,
    };
    return fetchedQuiz;
  }

  async updateQuiz(
    id: string,
    updateQuizRequestDto: UpdateQuizRequestDto,
  ): Promise<UpdateQuizResponseDto> {
    const updatedQuiz = await this.quizModel.findByIdAndUpdate(
      id,
      updateQuizRequestDto,
      { new: true },
    );
    if (!updatedQuiz) {
      throw new NotFoundException('Quiz not found');
    }
    const updatedQuizResponse: UpdateQuizResponseDto = {
      id: String(updatedQuiz._id),
      title: updatedQuiz.title,
      description: updatedQuiz.description,
      question: updatedQuiz.question,
      score: updatedQuiz.score,
    };
    return updatedQuizResponse;
  }

  async deleteQuiz(id: string): Promise<MessageResponseDto> {
    const deletedQuiz = await this.quizModel.findByIdAndDelete(id);
    if (!deletedQuiz) {
      throw new NotFoundException('Quiz not found');
    }
    const deletedQuizResponse: MessageResponseDto = {
      message: 'Quiz deleted successfully',
    };
    return deletedQuizResponse;
  }
}
