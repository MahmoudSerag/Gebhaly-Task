import { JwtModule } from '@nestjs/jwt';
import { Module, RequestMethod, MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { LoggedInMiddleware } from '../middleware/isLoggedIn.middleware';

import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

import { UserSchema } from '../models/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        algorithm: 'HS512',
        expiresIn: process.env.JWT_EXPIRE_IN,
      },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggedInMiddleware)
      .forRoutes(
        { path: 'api/v1/user/profile/', method: RequestMethod.GET },
        { path: 'api/v1/user/profile/', method: RequestMethod.PATCH },
      );
  }
}
