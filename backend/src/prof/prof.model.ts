import * as mongoose from 'mongoose';
import { Subject } from 'src/subject/subject.model';

export const ProfSchema = new mongoose.Schema({
    name: String,
    rate: Number,
    subjects: [{type: mongoose.Schema.Types.ObjectId, ref: 'Subject'}]
});
export interface Prof extends mongoose.Document{
    id: string;
    name: string;
    rate: number;
    subjects: Subject[];
}
