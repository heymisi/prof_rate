import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  UseGuards,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('register')
  async register(
    @Body('username') username: string,
    @Body('password') password: string,
    @Body('name') name: string,
    @Body('email') email: string,
    @Body('image') image: string,
  ) {
    const User = await this.userService.register(
      username,
      password,
      name,
      email,
      image,
    );
    return User;
  }

  @Post('login')
  async login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    const User = await this.userService.login(username, password);
    return User;
  }

  @Get()
  @UseGuards(new AuthGuard())
  async getAllUsers() {
    const Users = await this.userService.getUsers();
    return Users;
  }

  @Patch(':id/role')
  @UseGuards(new AuthGuard())
  async setRole(@Param('id') userId: string, @Body('role') role: string) {
    const user = await this.userService.setRole(userId, role);
    return user;
  }

  @Delete(':id')
  @UseGuards(new AuthGuard())
  async removeUser(@Param('id') userId: string) {
    await this.userService.deleteUser(userId);
    return null;
  }
}
