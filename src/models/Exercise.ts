import { Schema } from 'mongoose';
import isValid from '../helpers/validateDate';

export interface IExercise extends Document {
  _id?: string;
  description: string;
  duration: number;
  date: string;
}

export const ExerciseSchema = new Schema({
  description: {
    type: String,
    required: [true, 'Exercise description is required.']
  },

  duration: {
    type: Number,
    required: [true, 'Exercise duration is required.']
  },

  date: {
    type: String,
    required: [true, 'Exercise date is required.'],
    validate: {
      validator: isValid,
      message: 'Date should have a valid format of yyyy-mm-dd.'
    }
  }
});
