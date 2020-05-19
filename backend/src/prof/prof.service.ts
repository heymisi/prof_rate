import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { Prof } from './prof.model';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';

@Injectable()
export class ProfService {
  constructor(@InjectModel('prof') private readonly profModel: Model<Prof>) {}

  async insertProf(name: string, subjects: string[]) {
    if (!name) {
      throw new BadRequestException('Required data is missing or incorrect.');
    }
    const newProf = new this.profModel({ name });
    if (subjects) {
      newProf.subjects = subjects.map(subject => new Types.ObjectId(subject));
    }
    newProf.rateCounter = 0;
    newProf.commentCounter = 0;
    const result = await newProf.save();
    return result;
  }

  async getProfs(subjectId: string) {
    let profs = await this.profModel
      .find()
      .populate({ path: 'subjects', select: ['name', 'image'] })
      .populate('comments')
      .exec();
    if (subjectId) {
      const subjectObjectId = new Types.ObjectId(subjectId);
      const foundProfs = [];
      for (const prof of profs) {
        for (const subject of prof.subjects) {
          if (subject.equals(subjectObjectId)) {
            foundProfs.push(prof);
            break;
          }
        }
      }
      profs = foundProfs;
    }
    return profs.map(prof => ({
      id: prof.id,
      name: prof.name,
      subjects: prof.subjects,
      rateCounter: prof.rateCounter,
      commentCounter: prof.commentCounter,
      /*comments: prof.comments,
      ratesByHelpfulness: prof.ratesByHelpfulness,
      ratesByPreparedness: prof.ratesByPreparedness,
      ratesByDiction: prof.ratesByDiction*/
    }));
  }

  async getSingleProf(profId: string) {
    const prof = await this.findProf(profId);
    return {
      _id: prof.id,
      name: prof.name,
      subjects: prof.subjects,
      rateCounter: prof.rateCounter,
      commentCounter: prof.commentCounter,

      /*comments: prof.comments,
      ratesByHelpfulness: prof.ratesByHelpfulness,
      ratesByPreparedness: prof.ratesByPreparedness,
      ratesByDiction: prof.ratesByDiction*/
    };
  }

  async updateProf(profId: string, name: string, subjects: string[]) {
    const updatedProf = await this.findProf(profId);
    if (name) {
      updatedProf.name = name;
    }
    if (subjects) {
      updatedProf.subjects = subjects.map(
        subject => new Types.ObjectId(subject),
      );
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
    let prof;
    try {
      prof = await this.profModel
        .findById(id)
        .populate('subjects')
        .populate('comments')
        .exec();
    } catch (error) {
      throw new NotFoundException('Could not find professor.');
    }
    if (!prof) {
      throw new NotFoundException('Could not find professor.');
    }
    return prof;
  }

  async getComments(profId: string) {
    const foundProf = await this.findProf(profId);
    return foundProf.comments;
  }

  async addComment(profId: string, comment: string) {
    const foundProf = await this.findProf(profId);
    if (comment) {
      const commentObjectId = new Types.ObjectId(comment);
      foundProf.comments.push(commentObjectId);
      foundProf.commentCounter++;
    }
    foundProf.save();
    return foundProf.comments;
  }

  async getRatings(profId: string) {
    const foundProf = await this.findProf(profId);
    const rates: number[] = [0, 0, 0, 0];
    if (foundProf.rateCounter != 0) {
      let rateValue = 0;
      for (const rate of foundProf.ratesByHelpfulness) {
        rateValue += rate;
      }
      rates[0] = rateValue / foundProf.rateCounter;
      rateValue = 0;
      for (const rate of foundProf.ratesByPreparedness) {
        rateValue += rate;
      }
      rates[1] = rateValue / foundProf.rateCounter;
      rateValue = 0;
      for (const rate of foundProf.ratesByDiction) {
        rateValue += rate;
      }
      rates[2] = rateValue / foundProf.rateCounter;
      rates[3] = 0;
      for (let i = 0; i < 3; i++) {
        rates[3] += rates[i];
      }
      rates[3] /= 3;
    }
    return rates;
  }

  async updateRating(
    profId: string,
    helpfulness: number,
    preparedness: number,
    diction: number,
  ) {
    const foundProf = await this.findProf(profId);
    let validRateCount = 0;
    if (helpfulness != null && helpfulness >= 1 && helpfulness <= 5) {
      foundProf.ratesByHelpfulness.push(helpfulness);
      validRateCount++;
    }
    if (preparedness != null && preparedness >= 1 && preparedness <= 5) {
      foundProf.ratesByPreparedness.push(preparedness);
      validRateCount++;
    }
    if (diction != null && diction >= 1 && diction <= 5) {
      foundProf.ratesByDiction.push(diction);
      validRateCount++;
    }
    if (validRateCount == 3) {
      foundProf.rateCounter++;
      foundProf.save();
    }
  }
}
