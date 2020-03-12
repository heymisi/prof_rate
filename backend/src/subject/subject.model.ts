import * as mongoose from 'mongoose';

export const SubjectSchema = new mongoose.Schema({
    name: String,
    rate: Number
});
export interface Subject extends mongoose.Document{
    id: string;
    name: string;
    rate: number;
}

