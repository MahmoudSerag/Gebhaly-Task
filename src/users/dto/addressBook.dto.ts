import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  Length,
} from 'class-validator';

export class createAddressBookDto {
  @IsNotEmpty()
  @IsEmail()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @IsPhoneNumber()
  @IsString()
  @Length(11)
  phoneNumber: string;

  @IsNotEmpty()
  @IsString()
  physicalAddress: string;
}
