import { Schema, model, Document } from 'mongoose';
import { ExerciseSchema, IExercise } from './Exercise';

export interface IUser extends Document {
  name: string;
  exercises: IExercise[];
}

const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Username is required.'],
    minlength: [3, 'Username should be at least 3 symbols long.']
  },
  exercises: [ExerciseSchema]
});

const User = model<IUser>('user', UserSchema);

export default User;
