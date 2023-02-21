import {
  Body,
  Controller,
  Get,
  Post,
  UsePipes,
  ValidationPipe,
  Headers,
  Param,
  Delete,
  Patch,
} from '@nestjs/common';

import { AddressBookService } from './addressBook.service';
import { createAddressBookDto } from './dto/addressBook.dto';

@Controller('api/v1/user/addressBook')
export class UsersController {
  constructor(private readonly addressBookService: AddressBookService) {}

  @Post()
  @UsePipes(ValidationPipe)
  async createNewAddressBook(
    @Headers() headers,
    @Body() body: createAddressBookDto,
  ) {
    const addressBook = await this.addressBookService.createNewAddressBook(
      headers,
      body,
    );

    return { success: true, message: 'New address book.', addressBook };
  }

  @Get()
  async getAllAddressBooksForUser(@Headers() headers) {
    const addressBooks =
      await this.addressBookService.getAllAddressBooksForUser(headers);

    return { success: true, message: 'Address Books Retrieved.', addressBooks };
  }

  @Get(':id')
  async getSingleAddressBookById(@Headers() headers, @Param('id') id: string) {
    const addressBook = await this.addressBookService.getSingleAddressBookById(
      headers,
      id,
    );
    return { success: true, message: 'Address Books Retrieved.', addressBook };
  }
  @Delete(':id')
  async deleteAddressBookById(@Headers() headers, @Param('id') id: string) {
    await this.addressBookService.deleteAddressBookById(headers, id);

    return {
      success: true,
      statusCode: 204,
      message: 'Item deleted successfully',
    };
  }

  @Patch(':id')
  @UsePipes(ValidationPipe)
  async updateAddressBookById(
    @Headers() headers,
    @Body() body: createAddressBookDto,
    @Param('id') id: string,
  ) {
    const updatedAddressBook =
      await this.addressBookService.updateAddressBookById(headers, body, id);

    return {
      success: true,
      message: 'Item updated successfully.',
      updatedAddressBook,
    };
  }
}
