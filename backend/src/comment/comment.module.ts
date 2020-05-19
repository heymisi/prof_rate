import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { ProfModule } from 'src/prof/prof.module';
import { CommentSchema } from './comment.model';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { SubjectModule } from 'src/subject/subject.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'comment', schema: CommentSchema }]),
    forwardRef(() => ProfModule),
    forwardRef(() => SubjectModule),
  ],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
