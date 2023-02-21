import {
  Injectable,
  NotFoundException,
  HttpException,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';

import { createUserDto } from './dto/createUser.dto';
import { loginDto } from './dto/login.dto';

import { User } from './interfaces/register.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  private verifyJWT(@Headers() headers): { email: string; id: string } {
    const token = headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.verify(token);
    return decodedToken;
  }

  async register(body: createUserDto) {
    const { email, fullName, password } = body;

    const isUnique = await this.userModel.findOne({ email });
    if (isUnique)
      throw new HttpException(
        'This email has been already taken.',
        HttpStatus.BAD_REQUEST,
      );

    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const createNewUser = await new this.userModel({
      email,
      fullName,
      password: hashedPassword,
    });

    const payload = { email: createNewUser.email, id: createNewUser._id };
    const accessToken = this.jwtService.sign(payload);

    await createNewUser.save();

    return accessToken;
  }

  async login(body: loginDto) {
    const { email, password } = body;

    const user = await this.userModel.findOne({ email });

    if (!user) throw new NotFoundException(`Invalid credential.`);

    const isMatchedPassword = await bcrypt.compare(password, user.password);
    if (!isMatchedPassword) throw new NotFoundException(`Invalid credential.`);

    const payload = { email: user.email, id: user._id };
    const accessToken = this.jwtService.sign(payload);

    return accessToken;
  }

  async getUserBasicInfo(@Headers() headers) {
    const decodedToken = await this.verifyJWT(headers);

    const user = await this.userModel
      .findById(decodedToken.id)
      .select('-password -__v -_id');

    if (!user) throw new HttpException('Not Found.', HttpStatus.NOT_FOUND);

    return user;
  }

  async updateUserBasicInfo(@Headers() headers, body: createUserDto) {
    const decodedToken = this.verifyJWT(headers);

    await this.userModel.findByIdAndUpdate(decodedToken.id, body);
  }
}
