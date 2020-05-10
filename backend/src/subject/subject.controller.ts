import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subjects')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  async addSubject(
    @Body('name') subjectName: string,
    @Body('rate') subjectRate: number,
    @Body('image') subjectImage: string,
  ) {
    const newSubject = await this.subjectService.insertSubject(
      subjectName,
      subjectRate,
      subjectImage,
    );
    return newSubject;
  }

  @Get()
  async getAllSubject() {
    const Subjects = await this.subjectService.getSubjects();
    return Subjects;
  }

  @Get(':id')
  getSubject(@Param('id') subjectId: string) {
    return this.subjectService.getSingleSubject(subjectId);
  }

  @Patch(':id')
  async updateSubject(
    @Param('id') subjectId: string,
    @Body('name') subjectName: string,
    @Body('rate') subjectRate: number,
    @Body('image') subjectImage: string,
  ) {
    await this.subjectService.updateSubject(
      subjectId,
      subjectName,
      subjectRate,
      subjectImage,
    );
    return null;
  }

  @Delete(':id')
  async removeSubject(@Param('id') subjectId: string) {
    await this.subjectService.deleteSubject(subjectId);
    return null;
  }
}
