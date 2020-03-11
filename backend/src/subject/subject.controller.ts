import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';
import { SubjectService } from './subject.service';

@Controller('subjects')
export class SubjectController{
    constructor(
        private readonly subjectService: SubjectService){}

    @Post()
    async addSubject(
        @Body('name') SubjectName: string,
        @Body('rate') SubjectRate: number,
    )  {
        const newSubject = await this.subjectService.insertSubject(SubjectName,SubjectRate);
        return newSubject;
    }  
        
    @Get()
    async getAllSubject(){
        const Subjects = await this.subjectService.getSubjects();
        return Subjects;
    }
    
    @Get(':id')
    getSubject(@Param('id') SubjectId: string){
        return this.subjectService.getSingleSubject(SubjectId);
    }

    @Patch(':id')
    async updateSubject(
        @Param('id') SubjectId: string,
        @Body('name') SubjectName: string,
        @Body('rate') SubjectRate: number,
    ){
       await this.subjectService.updateSubject(SubjectId,SubjectName,SubjectRate);
       return null;
    }

    @Delete(':id')
    async removeSubject(@Param('id') SubjectId: string){
        await this.subjectService.deleteSubject(SubjectId);
        return null;
    } 

  
}