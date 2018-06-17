import { Schema } from 'mongoose';

export interface IExercise extends Document {
  description: string;
  duration: number;
  date: string;
}

export const ExerciseSchema = new Schema({
  description: String,
  duration: Number,
  date: String
});
