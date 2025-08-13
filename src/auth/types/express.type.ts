import JwtPayload from '../interfaces/jwtPayload.interface';

declare module 'express-serve-static-core' {
  interface Request {
    user?: JwtPayload;
  }
}

export {};
