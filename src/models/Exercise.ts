import { Schema } from 'mongoose';

export interface IExercise extends Document {
  _id?: string;
  description: string;
  duration: number;
  date: string;
}

export const ExerciseSchema = new Schema({
  description: String,
  duration: Number,
  date: String
});
