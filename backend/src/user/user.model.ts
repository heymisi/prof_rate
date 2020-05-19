import * as mongoose from 'mongoose';
import { isEmail } from 'class-validator';

export const UserSchema = new mongoose.Schema({
  username: { type: String, minlength: 6, maxlength: 20 },
  password: { type: String },
  name: String,
  email: { type: String, validate: [isEmail, 'invalid email'] },
  image: { type: String, required: false },
  role: String,
  token: String,
});
export interface User extends mongoose.Document {
  id: string;
  username: string;
  password: string;
  name: string;
  email: string;
  image: string;
  role: string;
  token: string;
}
