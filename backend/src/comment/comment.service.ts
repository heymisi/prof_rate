import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Comment } from './comment.model';
import { Model } from 'mongoose';

@Injectable()
export class CommentService {
  constructor(
    @InjectModel('comment') private readonly commentModel: Model<Comment>,
  ) {}

  async getComments() {
    const subjects = await this.commentModel.find().exec();
    return subjects.map(comment => ({
      id: comment.id,
      author: comment.author,
      content: comment.content,
      likeCount: comment.likeCount,
    }));
  }

  async insertComment(author: string, content: string) {
    if (!content) {
      throw new BadRequestException('Required data is missing or incorrect.');
    }
    const newComment = new this.commentModel({ author, content });
    newComment.likeCount = 0;
    const result = await newComment.save();
    return result;
  }

  async deleteComment(commentId: string) {
    const result = await this.commentModel.deleteOne({ _id: commentId }).exec();
    if (result.n === 0) {
      throw new NotFoundException('Could not find that comment.');
    }
  }

  async increaseLikeCount(commentId: string) {
    const foundComment = await this.findComment(commentId);
    foundComment.likeCount++;
    const result = await foundComment.save();
    return result;
  }

  async findComment(id: string): Promise<Comment> {
    let comment;
    try {
      comment = await this.commentModel.findById(id);
    } catch (error) {
      throw new NotFoundException('Could not find that comment.');
    }
    if (!comment) {
      throw new NotFoundException('Could not find that comment.');
    }
    return comment;
  }
}
