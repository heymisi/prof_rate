import { ProfService } from './prof.service';
import { Controller, Post, Body, Get, Patch, Delete, Param } from '@nestjs/common';

@Controller('profs')
export class ProfController{
    constructor(
        private readonly profService: ProfService){}

    @Post()
    async addProf(
        @Body('name') profName: string,
        @Body('rate') profRate: number,
    )  {
        const newProf = await this.profService.insertProf(profName,profRate);
        return newProf;
    }  
        
    @Get()
    async getAllProfs(){
        const profs = await this.profService.getProfs();
        return profs;
    }
    
    @Get(':id')
    getProf(@Param('id') profId: string){
        return this.profService.getSingleProf(profId);
    }

    @Patch(':id')
    async updateProf(
        @Param('id') profId: string,
        @Body('name') profName: string,
        @Body('rate') profRate: number,
    ){
       await this.profService.updateProf(profId,profName,profRate);
       return null;
    }

    @Delete(':id')
    async removeProf(@Param('id') profId: string){
        await this.profService.deleteProf(profId);
        return null;
    }

    // @Patch(':id')
    // async addSubjectToProf(
    //     @Param('id') profId: string,
    //     @Body('subjectId') subjectId: string
    // ){
    //    await this.profService.addSubjectToProf(profId, subjectId);
    //    return null;
    // }
}