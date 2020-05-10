import * as mongoose from 'mongoose';

export const ProfSchema = new mongoose.Schema({
  name: String,
  rate: Number,
  subjects: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Subject' }],
});
export interface Prof extends mongoose.Document {
  id: string;
  name: string;
  rate: number;
  subjects: mongoose.Types.ObjectId[];
}
