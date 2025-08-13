import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import JwtPayload from '../interfaces/jwtPayload.interface';

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): JwtPayload => {
    const request = context.switchToHttp().getRequest<Request>();
    return request.user as JwtPayload;
  },
);
