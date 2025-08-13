import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService, JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/users/schemas/user.schema';
import JwtPayload from 'src/auth/interfaces/jwtPayload.interface';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly BEARER_TOKEN_PREFIX = 'Bearer';

  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    @InjectModel(User.name) private readonly userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest<Request>();

    try {
      const token = this.extractTokenFromHeader(request);
      const payload = await this.validateToken(token);
      const user = await this.validateUser(payload);

      request['user'] = payload;
      request['userEntity'] = user;

      return true;
    } catch (error) {
      this.handleAuthenticationError(error);
    }
  }

  private extractTokenFromHeader(request: Request): string {
    const authHeader = request.headers.authorization;

    if (!authHeader) {
      throw new UnauthorizedException('Missing authorization token');
    }

    const [tokenType, token] = authHeader.split(' ');

    if (tokenType !== this.BEARER_TOKEN_PREFIX || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    return token;
  }

  private async validateToken(token: string): Promise<JwtPayload> {
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(token, {
        secret: this.configService.get<string>('JWT_SECRET'),
      });

      if (!payload.id || payload.tokenVersion === undefined) {
        throw new UnauthorizedException('Invalid token payload');
      }

      return payload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new UnauthorizedException('Token has expired');
      }

      if (error instanceof JsonWebTokenError) {
        throw new UnauthorizedException('Invalid token');
      }

      throw error;
    }
  }

  private async validateUser(payload: JwtPayload): Promise<User> {
    try {
      const user = await this.userModel.findById(payload.id).lean().exec();

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      if (user.tokenVersion !== payload.tokenVersion) {
        throw new UnauthorizedException('Token has been revoked');
      }

      return user;
    } catch (error) {
      if (
        error &&
        typeof error === 'object' &&
        'name' in error &&
        (error as { name?: string }).name === 'CastError'
      ) {
        throw new UnauthorizedException('Invalid user ID');
      }

      throw error;
    }
  }

  private handleAuthenticationError(error: any): never {
    if (
      error instanceof UnauthorizedException ||
      error instanceof ForbiddenException
    ) {
      throw error;
    }

    throw new UnauthorizedException('Authentication failed');
  }
}
