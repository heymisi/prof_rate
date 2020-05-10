import { ProfController } from './prof.controller';
import { ProfService } from './prof.service';
import { ProfSchema } from './prof.model';
import { MongooseModule } from '@nestjs/mongoose';
import { Module, forwardRef } from '@nestjs/common';
import { SubjectModule } from 'src/subject/subject.module';
import { SubjectSchema } from 'src/subject/subject.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Prof', schema: ProfSchema }]),
    MongooseModule.forFeature([{ name: 'Subject', schema: SubjectSchema }]),
    forwardRef(() => SubjectModule),
  ],
  controllers: [ProfController],
  providers: [ProfService],
})
export class ProfModule {}
