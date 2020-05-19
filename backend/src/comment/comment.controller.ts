import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Post,
  Delete,
} from '@nestjs/common';
import { CommentService } from './comment.service';

@Controller('comments')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get()
  async getAllComments() {
    const comments = await this.commentService.getComments();
    return comments;
  }

  @Post()
  async addComment(
    @Body('author') author: string,
    @Body('content') content: string,
  ) {
    const newComment = await this.commentService.insertComment(author, content);
    return newComment;
  }

  @Delete(':id')
  async removeComment(@Param('id') commentId: string) {
    await this.commentService.deleteComment(commentId);
    return null;
  }

  @Patch(':id/like')
  increaseLikeCount(@Param('id') commentId: string) {
    return this.commentService.increaseLikeCount(commentId);
  }
}
