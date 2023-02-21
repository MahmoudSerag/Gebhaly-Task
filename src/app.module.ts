import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { AuthModule } from './auth/auth.module';
import { AddressBookModule } from './users/addressBook.module';

import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    AuthModule,
    AddressBookModule,
    ConfigModule.forRoot(),
    MongooseModule.forRoot(process.env.MONGO_URI),
  ],
})
export class AppModule {}
