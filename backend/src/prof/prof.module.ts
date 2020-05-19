import { ProfController } from './prof.controller';
import { ProfService } from './prof.service';
import { ProfSchema } from './prof.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { SubjectModule } from 'src/subject/subject.module';
import { SubjectSchema } from 'src/subject/subject.model';
import { CommentSchema } from 'src/comment/comment.model';
import { CommentModule } from 'src/comment/comment.module';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'prof', schema: ProfSchema }]),
    MongooseModule.forFeature([{ name: 'subject', schema: SubjectSchema }]),
    MongooseModule.forFeature([{ name: 'comment', schema: CommentSchema }]),
    forwardRef(() => SubjectModule),
    forwardRef(() => CommentModule),
  ],
  controllers: [ProfController],
  providers: [ProfService],
})
export class ProfModule {}
