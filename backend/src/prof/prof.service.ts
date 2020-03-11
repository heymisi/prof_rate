import { Injectable, NotFoundException } from '@nestjs/common';
import { Prof } from './prof.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
//import { SubjectService } from 'src/subject/Subject.service';

@Injectable()
export class ProfService {
    constructor(
        @InjectModel('Prof') private readonly profModel: Model<Prof>) { }

    //private subjectService : SubjectService;

    async insertProf(name: string, rate: number) {
        const newProf = new this.profModel({ name, rate });
        newProf.subjects = [];
        const result = await newProf.save();
        return result;
    }

    async getProfs() {
        const profs = await this.profModel.find().exec();
        return profs.map((prof) => ({ id: prof.id, name: prof.name, rate: prof.rate, subjs: prof.subjects }));
    }

    async getSingleProf(profId: string) {
        const prof = await this.findProf(profId);
        return { _id: prof.id, name: prof.name, rate: prof.rate, subjects: prof.subjects };
    }

    async updateProf(profId: string, name: string, rate: number) {
        const updatedProf = await this.findProf(profId);
        if (name) {
            updatedProf.name = name;
        }
        if (rate) {
            updatedProf.rate = rate;
        }
        updatedProf.save();
    }

    async deleteProf(profId: string) {
        const result = await this.profModel.deleteOne({ _id: profId }).exec();
        if (result.n == 0) {
            throw new NotFoundException('Could not find prof.');
        }
    }

    async findProf(id: string): Promise<Prof> {
        let prof
        try {
            prof = await this.profModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find prof.');
        }
        if (!prof) {
            throw new NotFoundException('Could not find prof.');
        }
        return prof;
    }

    // async addSubjectToProf(profId: string, subjectId: string) {
    //     const foundSubject = await this.subjectService.findSubject(subjectId);
    //     const updatedProf = await this.findProf(profId);
    //     updatedProf.subjects.push(foundSubject);
    //     updatedProf.save();
    // }
}