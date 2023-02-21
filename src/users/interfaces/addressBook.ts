import { Document } from 'mongoose';

export interface AddressBook extends Document {
  readonly email: string;
  readonly fullName: string;
  readonly phoneNumber: string;
  readonly physicalAddress: string;
}
