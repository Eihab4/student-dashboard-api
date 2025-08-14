import { Controller, Post, Body, UseGuards, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginRequestDto } from './dto/requests/login.request.dto';
import { RegisterRequestDto } from './dto/requests/register.request.dto';
import { LoginResponseDto } from './dto/responses/login.response.dto';
import { CurrentUser } from './decorators/current-user.decorator';
import type JwtPayload from './interfaces/jwt-payload.interface';
import { RegisterResponseDto } from './dto/responses/register.response.dto';
import { LogoutResponseDto } from './dto/responses/logout.response.dto';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  register(
    @Body() registerRequestDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    return this.authService.register(registerRequestDto);
  }

  @Post('login')
  login(@Body() loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    return this.authService.login(loginRequestDto);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  logout(@CurrentUser() user: JwtPayload): Promise<LogoutResponseDto> {
    return this.authService.logout(user.id);
  }
  @Get('verify')
  @UseGuards(AuthGuard)
  verifyToken(@CurrentUser() user: JwtPayload): {
    valid: boolean;
    user: JwtPayload;
  } {
    return { valid: true, user };
  }
}
