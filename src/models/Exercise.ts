import { Schema } from 'mongoose';

export const ExerciseSchema = new Schema({
  description: String,
  duration: Number,
  date: String
});
