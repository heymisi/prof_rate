import * as mongoose from 'mongoose';
import { isEmail } from 'class-validator';

export const UserSchema = new mongoose.Schema({
  email: { type: String, validate: [isEmail, 'invalid email'] },
  username: { type: String, minlength: 6, maxlength: 20 },
  name: String,
  password: { type: String, required: true },
  image: { type: String, required: false },
});
export interface User extends mongoose.Document {
  id: string;
  email: string;
  username: string;
  name: string;
  image: string;
}
