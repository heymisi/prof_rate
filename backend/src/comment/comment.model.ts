import * as mongoose from 'mongoose';

export const CommentSchema = new mongoose.Schema({
  author: String,
  content: String,
  likeCount: Number,
});
export interface Comment extends mongoose.Document {
  id: string;
  author: string;
  content: string;
  likeCount: number;
}
