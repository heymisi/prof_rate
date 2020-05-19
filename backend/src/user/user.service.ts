import {
  Injectable,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { jwtConstants } from 'src/auth/constants';

@Injectable()
export class UserService {
  constructor(@InjectModel('user') private readonly userModel: Model<User>) {}

  async register(
    username: string,
    password: string,
    name: string,
    email: string,
    image: string,
  ) {
    if (!username || !password) {
      throw new BadRequestException('Missing username or password');
    }

    const foundUser = await this.findUser(username);
    if (foundUser) {
      throw new BadRequestException('Username already exists');
    }

    const newUser = new this.userModel({
      username,
      '': String,
      name,
      email,
      image,
    });
    newUser.role = 'NORMAL';

    const hashedPassword = await bcrypt.hash(password, 10);
    newUser.password = hashedPassword;

    const payload = { username: newUser.username, sub: newUser.id };
    newUser.token = jwt.sign(payload, jwtConstants.secret);

    const result = await newUser.save();
    return result;
  }

  async login(username: string, password: string) {
    const foundUser = await this.findUser(username);
    if (!foundUser || !(await bcrypt.compare(password, foundUser.password))) {
      throw new BadRequestException('Invalid username or password');
    }

    const payload = { username: foundUser.username, sub: foundUser.id };
    foundUser.token = jwt.sign(payload, jwtConstants.secret);
    return foundUser;
  }

  async findUser(username: string): Promise<User> {
    const users = await this.userModel.find().exec();
    let foundUser: User;
    for (const user of users) {
      if (user.username === username) {
        foundUser = user;
      }
    }
    return foundUser;
  }

  async getUsers() {
    const users = await this.userModel.find().exec();
    return users.map(user => ({
      id: user.id,
      username: user.username,
      name: user.name,
      email: user.email,
      role: user.role,
    }));
  }

  async setRole(userId: string, role: string) {
    let user;
    try {
      user = await this.userModel.findById(userId);
    } catch (error) {
      throw new NotFoundException('Could not find user.');
    }
    if (!user) {
      throw new NotFoundException('Could not find user.');
    } else {
      if (role == 'NORMAL' || role == 'MODERATOR') {
        user.role = role;
      } else {
        throw new BadRequestException('Invalid role name');
      }
      user.save();
    }
    return user;
  }

  async deleteUser(userId: string) {
    const result = await this.userModel.deleteOne({ _id: userId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find user.');
    }
  }
}
