import { Schema, model, Document } from 'mongoose';
import { ExerciseSchema, IExercise } from './Exercise';

export interface IUser extends Document {
  name: string;
  exercises: IExercise[];
  totalCount: number;
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Username is required.']
  },
  exercises: [ExerciseSchema]
});

UserSchema.virtual('totalCount').get(function() {
  return this.exercises.length;
});

const User = model<IUser>('user', UserSchema);

export default User;
