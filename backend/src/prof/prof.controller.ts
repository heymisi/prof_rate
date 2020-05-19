import { ProfService } from './prof.service';
import {
  Controller,
  Post,
  Body,
  Get,
  Patch,
  Delete,
  Param,
} from '@nestjs/common';

@Controller('profs')
export class ProfController {
  constructor(private readonly profService: ProfService) {}

  @Post()
  async addProf(
    @Body('name') profName: string,
    @Body('subjects') subjects: string[],
  ) {
    const newProf = await this.profService.insertProf(profName, subjects);
    return newProf;
  }

  @Get()
  async getAllProfs(@Body('subjectId') subjectId: string) {
    const profs = await this.profService.getProfs(subjectId);
    return profs;
  }

  @Get(':id')
  getProf(@Param('id') profId: string) {
    return this.profService.getSingleProf(profId);
  }

  @Patch(':id')
  async updateProf(
    @Param('id') profId: string,
    @Body('name') profName: string,
    @Body('subjects') subjects: string[],
  ) {
    await this.profService.updateProf(profId, profName, subjects);
    return null;
  }

  @Delete(':id')
  async removeProf(@Param('id') profId: string) {
    await this.profService.deleteProf(profId);
    return null;
  }

  @Get(':id/comments')
  getComments(@Param('id') profId: string) {
    return this.profService.getComments(profId);
  }

  @Patch(':id/comments')
  addNewComment(@Param('id') profId: string, @Body('comment') comment: string) {
    this.profService.addComment(profId, comment);
    return null;
  }

  @Get(':id/rating')
  getRatings(@Param('id') profId: string) {
    return this.profService.getRatings(profId);
  }

  @Patch(':id/rating')
  async updateRating(
    @Param('id') profId: string,
    @Body('helpfulness') helpfulness: number,
    @Body('preparedness') preparedness: number,
    @Body('diction') diction: number,
  ) {
    await this.profService.updateRating(
      profId,
      helpfulness,
      preparedness,
      diction,
    );
    return null;
  }
}
