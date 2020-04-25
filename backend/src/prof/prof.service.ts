import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { Prof } from './prof.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProfService {
    constructor(
        @InjectModel('Prof') private readonly profModel: Model<Prof>) {}

    async insertProf(name: string, rate: number, subjects: string[]) {
        if(!name || rate == null || rate > 5 || rate < 1) {
            throw new BadRequestException('Required data is missing or incorrect.');
        }
        const newProf = new this.profModel({ name, rate });
        if(subjects) {
            newProf.subjects = subjects.map(subject => new Types.ObjectId(subject));
        }
        const result = await newProf.save();
        return result;
    }

    async getProfs(subjectId: string) {
        let profs = await this.profModel.find().populate('subjects').exec();
        if(subjectId) {
            const subjectObjectId = new Types.ObjectId(subjectId);
            const foundProfs = [];
            for(const prof of profs) {
                for(const subject of prof.subjects) {
                    if(subject.equals(subjectObjectId)) {
                        foundProfs.push(prof);
                        break;
                    }
                }
            }
            profs = foundProfs;
        }
        return profs.map(
            (prof) => ({
                id: prof.id,
                name: prof.name,
                rate: prof.rate,
                subjects: prof.subjects }));
    }

    async getSingleProf(profId: string) {
        const prof = await this.findProf(profId);
        return {
            _id: prof.id,
            name: prof.name,
            rate: prof.rate,
            subjects: prof.subjects };
    }

    async updateProf(profId: string, name: string, rate: number, subjects: string[]) {
        const updatedProf = await this.findProf(profId);
        if (name) {
            updatedProf.name = name;
        }
        if (rate != null && rate >= 1 && rate <= 5) {
            updatedProf.rate = rate;
        }
        if (subjects) {
            updatedProf.subjects = subjects.map(subject => new Types.ObjectId(subject));
        }
        updatedProf.save();
    }

    async deleteProf(profId: string) {
        const result = await this.profModel.deleteOne({ _id: profId }).exec();
        if (result.n === 0) {
            throw new NotFoundException('Could not find professor.');
        }
    }

    async findProf(id: string): Promise<Prof> {
        let prof
        try {
            prof = await this.profModel
            .findById(id)
            .populate('subjects')
            .exec();
        } catch (error) {
            throw new NotFoundException('Could not find professor.');
        }
        if (!prof) {
            throw new NotFoundException('Could not find professor.');
        }
        return prof;
    }
}