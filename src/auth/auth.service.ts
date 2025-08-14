import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import { LoginRequestDto } from './dto/requests/login.request.dto';
import * as bcrypt from 'bcrypt';
import { LoginResponseDto } from './dto/responses/login.response.dto';
import { RegisterRequestDto } from './dto/requests/register.request.dto';
import { ConfigService } from '@nestjs/config';
import { LogoutResponseDto } from './dto/responses/logout.response.dto';
import { RegisterResponseDto } from './dto/responses/register.response.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly configService: ConfigService,
  ) {}

  async register(
    registerAuthDto: RegisterRequestDto,
  ): Promise<RegisterResponseDto> {
    const { email, password, name } = registerAuthDto;
    const existingUser = await this.userModel.findOne({ email });
    if (existingUser) {
      throw new BadRequestException('User with this email already exists');
    }
    const hashedPassword: string = await bcrypt.hash(
      password,
      parseInt(this.configService.get<string>('BCRYPT_SALT_ROUNDS', '10')),
    );

    const newUser = new this.userModel({
      email,
      name,
      password: hashedPassword,
      tokenVersion: 0,
    });

    await newUser.save();

    return {
      message: 'Registration successful',
    };
  }

  async login(loginRequestDto: LoginRequestDto): Promise<LoginResponseDto> {
    const { email, password } = loginRequestDto;

    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
      id: user._id,
      tokenVersion: user.tokenVersion,
    };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('JWT_EXPIRATION'),
    });

    return {
      accessToken,
      message: 'Login successfully',
    };
  }
  async logout(userId: string): Promise<LogoutResponseDto> {
    await this.userModel.updateOne(
      { _id: userId },
      { $inc: { tokenVersion: 1 } },
    );
    return { message: 'Logout successful' };
  }
}
