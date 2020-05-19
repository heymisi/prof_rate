import * as mongoose from 'mongoose';

export const SubjectSchema = new mongoose.Schema({
  name: String,
  image: String,
  rateCounter: Number,
  commentCounter: Number,
  ratesByDifficulty: [Number],
  ratesByUsefulness: [Number],
  ratesByCuriosity: [Number],
  //comments: [String],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
});
export interface Subject extends mongoose.Document {
  id: string;
  name: string;
  image: string;
  rateCounter: number;
  commentCounter: number;
  ratesByDifficulty: [number];
  ratesByUsefulness: [number];
  ratesByCuriosity: [number];
  //comments: [string];
  comments: mongoose.Types.ObjectId[];
}
