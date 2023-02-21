import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'email is required.'],
    unique: true,
  },
  fullName: { type: String, require: [true, 'fullName is required.'] },
  password: {
    type: String,
    required: [true, 'password is required.'],
    minlength: [5, 'Password minlength is 5 characters'],
  },
});
