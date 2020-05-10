import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async insertUser(
    email: string,
    username: string,
    name: string,
    password: string,
    image: string,
  ) {
    // if(!name || rate == null || rate > 5 || rate < 1) {
    //    throw new BadRequestException('Required data is missing or incorrect.');
    // }
    const newUser = new this.userModel({
      email,
      username,
      name,
      password,
      image,
    });
    const result = await newUser.save();
    return result;
  }
}
