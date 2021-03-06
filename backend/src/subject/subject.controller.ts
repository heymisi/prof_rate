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
    @Body('image') subjectImage: string,
  ) {
    const newSubject = await this.subjectService.insertSubject(
      subjectName,
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
    @Body('image') subjectImage: string,
  ) {
    await this.subjectService.updateSubject(
      subjectId,
      subjectName,
      subjectImage,
    );
    return null;
  }

  @Delete(':id')
  async removeSubject(@Param('id') subjectId: string) {
    await this.subjectService.deleteSubject(subjectId);
    return null;
  }

  @Get(':id/comments')
  getComments(@Param('id') subjectId: string) {
    return this.subjectService.getComments(subjectId);
  }

  @Patch(':id/comments')
  addNewComment(
    @Param('id') subjectId: string,
    @Body('comment') comment: string,
  ) {
    this.subjectService.addComment(subjectId, comment);
    return null;
  }

  @Get(':id/rating')
  getRatings(@Param('id') subjectId: string) {
    return this.subjectService.getRatings(subjectId);
  }

  @Patch(':id/rating')
  async updateRating(
    @Param('id') subjectId: string,
    @Body('difficulty') difficulty: number,
    @Body('usefulness') usefulness: number,
    @Body('curiosity') curiosity: number,
  ) {
    await this.subjectService.updateRating(
      subjectId,
      difficulty,
      usefulness,
      curiosity,
    );
    return null;
  }
}
