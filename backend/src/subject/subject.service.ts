import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Subject } from './subject.model';

@Injectable()
export class SubjectService {
    constructor(
        @InjectModel('subject') private readonly subjectModel: Model<Subject>) {}

    async insertSubject(name: string, rate: number) {
        const newSubject = new this.subjectModel({ name, rate});
        newSubject.profs = [];
        const result = await newSubject.save();
        return result;
    }

    async getSubjects() {
        const subjects = await this.subjectModel.find().exec();
        return subjects.map((subject) => ({ id: subject.id, name: subject.name, rate: subject.rate, profs: subject.profs }));
    }

    async getSingleSubject(subjectId: string) {
        const subject = await this.findSubject(subjectId);
        return { id: subject.id, name: subject.name, rate: subject.rate, profs: subject.profs };
    }

    async updateSubject(subjectId: string, name: string, rate: number) {
        const updatedsubject = await this.findSubject(subjectId);
        if (name) {
            updatedsubject.name = name;
        }
        if (rate) {
            updatedsubject.rate = rate;
        }
        updatedsubject.save();
    }

    async deleteSubject(subjectId: string) {
        const result = await this.subjectModel.deleteOne({ _id: subjectId }).exec();
        if (result.n == 0) {
            throw new NotFoundException('Could not find subject.');
        }
    }

    async findSubject(id: string): Promise<Subject> {
        let subject
        try {
            subject = await this.subjectModel.findById(id);
        } catch (error) {
            throw new NotFoundException('Could not find subject.');
        }
        if (!subject) {
            throw new NotFoundException('Could not find subject.');
        }
        return subject;
    }
}