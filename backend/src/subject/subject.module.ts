import { SubjectController } from './subject.controller';
import { SubjectService } from './subject.service';
import { SubjectSchema } from './subject.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { ProfModule } from 'src/prof/prof.module';
import { CommentModule } from 'src/comment/comment.module';
import { CommentSchema } from 'src/comment/comment.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'subject', schema: SubjectSchema }]),
    MongooseModule.forFeature([{ name: 'comment', schema: CommentSchema }]),
    forwardRef(() => ProfModule),
    forwardRef(() => CommentModule),
  ],
  controllers: [SubjectController],
  providers: [SubjectService],
})
export class SubjectModule {}
