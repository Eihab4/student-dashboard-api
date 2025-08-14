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
import { QuizzesService } from './quizzes.service';
import { CreateQuizRequestDto } from './dto/requests/create-quiz.request.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { CurrentUser } from 'src/auth/decorators/current-user.decorator';
import type JwtPayload from 'src/auth/interfaces/jwt-payload.interface';
import { CreateQuizResponseDto } from './dto/responses/create-quiz.resonse.dto';
import { FetchQuizResponseDto } from './dto/responses/fetch-quiz.response.dto';
import { UpdateQuizRequestDto } from './dto/requests/update-quiz..request.dto';
import { UpdateQuizResponseDto } from './dto/responses/update-quiz.response.dto';
import { MessageResponseDto } from 'src/common/dtos/responses/message.response.dto';

@UseGuards(AuthGuard)
@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  createQuiz(
    @CurrentUser() user: JwtPayload,
    @Body() createQuizDto: CreateQuizRequestDto,
  ): Promise<CreateQuizResponseDto> {
    return this.quizzesService.createQuiz(createQuizDto, user.id);
  }

  @Get()
  getAllQuizzes(): Promise<FetchQuizResponseDto[]> {
    return this.quizzesService.getAllQuizzes();
  }

  @Get(':id')
  getQuizById(@Param('id') id: string): Promise<FetchQuizResponseDto> {
    return this.quizzesService.getQuizById(id);
  }

  @Put(':id')
  updateQuiz(
    @Param('id') id: string,
    @Body() updateQuizRequestDto: UpdateQuizRequestDto,
  ): Promise<UpdateQuizResponseDto> {
    return this.quizzesService.updateQuiz(id, updateQuizRequestDto);
  }

  @Delete(':id')
  deleteQuiz(@Param('id') id: string): Promise<MessageResponseDto> {
    return this.quizzesService.deleteQuiz(id);
  }
}
