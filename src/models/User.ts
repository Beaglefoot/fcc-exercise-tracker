import { Schema, model } from 'mongoose';
import { ExerciseSchema } from './Exercise';

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

const User = model('user', UserSchema);

export default User;
