import * as mongoose from 'mongoose';
import { Prof } from 'src/Prof/prof.model';

export const SubjectSchema = new mongoose.Schema({
    name: String,
    rate: Number,
    profs: [{type: mongoose.Schema.Types.ObjectId, ref: 'Prof'}]
});
export interface Subject extends mongoose.Document{
    id: string;
    name: string;
    rate: number;
    profs: Prof[];
}

