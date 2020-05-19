import * as mongoose from 'mongoose';

export const ProfSchema = new mongoose.Schema({
  name: String,
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'subject' }],
  rateCounter: Number,
  commentCounter: Number,
  ratesByHelpfulness: [Number],
  ratesByPreparedness: [Number],
  ratesByDiction: [Number],
  //comments: [String],
  comments: [{ type: mongoose.Schema.Types.ObjectId, ref: 'comment' }],
});
export interface Prof extends mongoose.Document {
  id: string;
  name: string;
  subjects: mongoose.Types.ObjectId[];
  rateCounter: number;
  commentCounter: number;
  ratesByHelpfulness: [number];
  ratesByPreparedness: [number];
  ratesByDiction: [number];
  //comments: [string];
  comments: mongoose.Types.ObjectId[];
}
