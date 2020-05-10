import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { ProfModule } from 'src/prof/prof.module';
import { UserSchema } from './user.model';
import { UserService } from './user.service';
import { UserController } from './user.controller';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'user', schema: UserSchema }]),
    forwardRef(() => ProfModule),
  ],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
