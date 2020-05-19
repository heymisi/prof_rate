import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Subject } from './subject.model';

@Injectable()
export class SubjectService {
  constructor(
    @InjectModel('subject') private readonly subjectModel: Model<Subject>,
  ) {}

  async insertSubject(name: string, image: string) {
    if (!name) {
      throw new BadRequestException('Required data is missing or incorrect.');
    }

    const newSubject = new this.subjectModel({ name, image });
    newSubject.rateCounter = 0;
    newSubject.commentCounter = 0;
    const result = await newSubject.save();
    return result;
  }

  async getSubjects() {
    const subjects = await this.subjectModel
      .find()
      .populate('comments')
      .exec();
    return subjects.map(subject => ({
      id: subject.id,
      name: subject.name,
      image: subject.image,
      rateCounter: subject.rateCounter,
      commentCounter: subject.commentCounter,

      /*comments: subject.comments,
      ratesByDifficulty: subject.ratesByDifficulty,
      ratesByUsefulness: subject.ratesByUsefulness,
      ratesByCuriosity: subject.ratesByCuriosity*/
    }));
  }

  async getSingleSubject(subjectId: string) {
    const subject = await this.findSubject(subjectId);
    return {
      id: subject.id,
      name: subject.name,
      image: subject.image,
      commentCounter: subject.commentCounter,
      /*comments: subject.comments,
      rateCounter: subject.rateCounter,
      ratesByDifficulty: subject.ratesByDifficulty,
      ratesByUsefulness: subject.ratesByUsefulness,
      ratesByCuriosity: subject.ratesByCuriosity*/
    };
  }

  async updateSubject(subjectId: string, name: string, image: string) {
    const updatedsubject = await this.findSubject(subjectId);
    if (name) {
      updatedsubject.name = name;
    }
    if (image) {
      updatedsubject.image = image;
    }
    updatedsubject.save();
  }

  async deleteSubject(subjectId: string) {
    const result = await this.subjectModel.deleteOne({ _id: subjectId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find subject.');
    }
  }

  async findSubject(id: string): Promise<Subject> {
    let subject;
    try {
      subject = await this.subjectModel
        .findById(id)
        .populate('comments')
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find subject.');
    }
    if (!subject) {
      throw new NotFoundException('Could not find subject.');
    }
    return subject;
  }

  async getComments(subjectId: string) {
    const foundSubject = await this.findSubject(subjectId);
    return foundSubject.comments;
  }

  async addComment(subjectId: string, comment: string) {
    const foundSubject = await this.findSubject(subjectId);
    if (comment) {
      const commentObjectId = new Types.ObjectId(comment);
      foundSubject.comments.push(commentObjectId);
      foundSubject.commentCounter++;
    }
    foundSubject.save();
    return foundSubject.comments;
  }

  async getRatings(subjectId: string) {
    const foundSubject = await this.findSubject(subjectId);
    const rates: number[] = [0, 0, 0, 0];
    if (foundSubject.rateCounter != 0) {
      let rateValue = 0;
      for (const rate of foundSubject.ratesByDifficulty) {
        rateValue += rate;
      }
      rates[0] = rateValue / foundSubject.rateCounter;
      rateValue = 0;
      for (const rate of foundSubject.ratesByUsefulness) {
        rateValue += rate;
      }
      rates[1] = rateValue / foundSubject.rateCounter;
      rateValue = 0;
      for (const rate of foundSubject.ratesByCuriosity) {
        rateValue += rate;
      }
      rates[2] = rateValue / foundSubject.rateCounter;
      rates[3] = 0;
      for (let i = 0; i < 3; i++) {
        rates[3] += rates[i];
      }
      rates[3] /= 3;
    }
    return rates;
  }

  async updateRating(
    subjectId: string,
    difficulty: number,
    usefulness: number,
    curiosity: number,
  ) {
    const updatedsubject = await this.findSubject(subjectId);
    let validRateCount = 0;
    if (difficulty != null && difficulty >= 1 && difficulty <= 5) {
      updatedsubject.ratesByDifficulty.push(difficulty);
      validRateCount++;
    }
    if (usefulness != null && usefulness >= 1 && usefulness <= 5) {
      updatedsubject.ratesByUsefulness.push(usefulness);
      validRateCount++;
    }
    if (curiosity != null && curiosity >= 1 && curiosity <= 5) {
      updatedsubject.ratesByCuriosity.push(curiosity);
      validRateCount++;
    }
    if (validRateCount == 3) {
      updatedsubject.rateCounter++;
      updatedsubject.save();
    }
  }
}
