import { UserModule } from './user/user.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProfModule } from './prof/prof.module';
import { MongooseModule } from '@nestjs/mongoose';
import { SubjectModule } from './subject/subject.module';
import { CommentModule } from './comment/comment.module';
@Module({
  imports: [
    ProfModule,
    SubjectModule,
    UserModule,
    CommentModule,
    MongooseModule.forRoot(
      'mongodb+srv://misi:misi@cluster0-qc33m.mongodb.net/myDB?retryWrites=true&w=majority',
      { useNewUrlParser: true, useUnifiedTopology: true },
    ),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
