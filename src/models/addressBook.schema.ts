import * as mongoose from 'mongoose';

export const AddressBookSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required.'],
    unique: true,
  },
  fullName: { type: String, required: [true, 'fullName is required.'] },
  phoneNumber: { type: String, required: [true, 'phoneNumber is required.'] },
  physicalAddress: {
    type: String,
    required: [true, 'physicalAddress is required.'],
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: [true, 'UserId is required.'],
    ref: 'User',
  },
});
