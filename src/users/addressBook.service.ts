import {
  Injectable,
  // NotFoundException,
  HttpException,
  HttpStatus,
  Headers,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';

import { createAddressBookDto } from './dto/addressBook.dto';

import { AddressBook } from './interfaces/addressBook';
import { User } from 'src/auth/interfaces/register.interface';

@Injectable()
export class AddressBookService {
  constructor(
    @InjectModel('AddressBook')
    private readonly addressBookModel: Model<AddressBook>,
    @InjectModel('User') private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  private verifyJWT(@Headers() headers): { email: string; id: string } {
    const token = headers.authorization.split(' ')[1];
    const decodedToken = this.jwtService.verify(token);
    return decodedToken;
  }

  private async isAuthorized(
    id: string,
    decodedToken: { email: string; id: string },
  ) {
    const addressBook = await this.addressBookModel
      .findById(id)
      .select('email fullName phoneNumber physicalAddress userId -_id');

    if (!addressBook)
      throw new HttpException('Not Found', HttpStatus.NOT_FOUND);

    const userId = addressBook['userId']._id;
    if (userId.toString() !== decodedToken.id.toString())
      throw new HttpException('Forbidden', HttpStatus.FORBIDDEN);

    return addressBook;
  }

  async createNewAddressBook(@Headers() headers, body: createAddressBookDto) {
    const { email, fullName, phoneNumber, physicalAddress } = body;

    const isUnique = await this.addressBookModel.findOne({ email });
    if (isUnique)
      throw new HttpException(
        'This email has been already taken.',
        HttpStatus.BAD_REQUEST,
      );

    const decodedToken = this.verifyJWT(headers);

    const newAddressBook = await this.addressBookModel.create({
      email,
      fullName,
      phoneNumber,
      physicalAddress,
      userId: decodedToken.id,
    });

    return newAddressBook;
  }

  async getAllAddressBooksForUser(@Headers() headers) {
    const decodedToken = this.verifyJWT(headers);

    const addressBooks = await this.addressBookModel
      .find({ userId: decodedToken.id })
      .select('-_id -__v');

    return addressBooks;
  }

  async getSingleAddressBookById(@Headers() headers, id: string) {
    const decodedToken = this.verifyJWT(headers);

    const addressBook = await this.isAuthorized(id, decodedToken);

    return addressBook;
  }

  async deleteAddressBookById(@Headers() headers, id: string) {
    const decodedToken = this.verifyJWT(headers);

    await this.isAuthorized(id, decodedToken);

    await this.addressBookModel.deleteOne({ _id: id });
  }

  async updateAddressBookById(
    @Headers() headers,
    body: createAddressBookDto,
    id: string,
  ) {
    const decodedToken = this.verifyJWT(headers);

    await this.isAuthorized(id, decodedToken);

    await this.addressBookModel.findByIdAndUpdate(id, body);
  }
}
