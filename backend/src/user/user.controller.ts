import { Controller, Post, Body } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async addSubject(
    @Body('email') userEmail: string,
    @Body('username') userName: string,
    @Body('name') userRealName: string,
    @Body('password') userPassword: string,
    @Body('image') userImage: string,
  ) {
    const newUser = await this.userService.insertUser(
      userEmail,
      userName,
      userRealName,
      userPassword,
      userImage,
    );
    return newUser;
  }
}
