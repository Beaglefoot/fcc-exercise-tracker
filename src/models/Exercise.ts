import { Schema } from 'mongoose';
import isValid from 'date-fns/is_valid';

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
      validator: (date: string) => {
        if (!date.match(/^\d{4}-\d{2}-\d{2}$/)) return false;
        return isValid(new Date(date));
      },
      message: 'Date should have a valid format of yyyy-mm-dd.'
    }
  }
});
