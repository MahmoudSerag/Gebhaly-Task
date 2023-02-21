import { JwtModule } from '@nestjs/jwt';
import { Module, MiddlewareConsumer } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { LoggedInMiddleware } from '../middleware/isLoggedIn.middleware';

import { UsersController } from './addressBook.controller';
import { AddressBookService } from './addressBook.service';

import { AddressBookSchema } from 'src/models/addressBook.schema';
import { UserSchema } from 'src/models/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'AddressBook', schema: AddressBookSchema },
      { name: 'User', schema: UserSchema },
    ]),
    ConfigModule.forRoot(),
    JwtModule.register({
      secret: process.env.JWT_SECRET,
      signOptions: {
        algorithm: 'HS512',
        expiresIn: process.env.JWT_EXPIRE_IN,
      },
    }),
  ],
  controllers: [UsersController],
  providers: [AddressBookService],
})
export class AddressBookModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggedInMiddleware).forRoutes('api/v1/user/addressBook');
  }
}
