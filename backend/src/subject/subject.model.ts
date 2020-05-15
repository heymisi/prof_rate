import * as mongoose from 'mongoose';

export const SubjectSchema = new mongoose.Schema({
  name: String,
  image: String,
  rateOverallValue: Number,
  rateOverallCounter: Number,
  rateDifficulty: Number,
  rateUsefulness: Number,
  rateCuriosity: Number,
  comments:[String]
});
export interface Subject extends mongoose.Document {
  id: string;
  name: string;
  image: string;
  rateOverallValue: number;
  rateOverallCounter: number;
  rateDifficulty: number;
  rateUsefulness: number;
  rateCuriosity: number;
  comments:[String]
}
