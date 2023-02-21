import {
  Injectable,
  NestMiddleware,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggedInMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    if (
      !req.headers ||
      !req.headers.authorization ||
      !req.headers.authorization.split(' ')[1]
    )
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    next();
  }
}
