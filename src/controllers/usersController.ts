import { Handler } from 'express';
import mongoose from 'mongoose';
import User, { IUser } from '../models/User';
import { ExerciseSchema, IExercise } from '../models/Exercise';

export const createUser: Handler = async (req, res, next) => {
  const { name } = req.body;
  const user = await User.findOne({ name });

  if (user) {
    res.status(409).send({ error: `User with name "${name}" already exists.` });
    return;
  }

  try {
    const { _id } = await new User({ name }).save();
    console.log(`Created ${name} with userId ${_id}`);
    res.send({ username: name, userId: _id });
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
};

export const addExercise: Handler = async (req, res, next) => {
  const { userId } = req.params;
  const { ...exercise } = req.body;
  let user: IUser;

  try {
    user = await User.findByIdAndUpdate(userId, {
      $push: { exercises: exercise }
    }).exec();
  } catch (err) {
    res.status(400).send({ error: `Cannot get user by userId ${userId}.` });
    next(err);
    return;
  }

  const { name: username, exercises } = user;

  // Just a convoluted way to deal with own properties while assembling an object for response
  const addedExercise = exercises.slice(-1)[0];
  const { _id: exerciseId, description, duration, date } = addedExercise;

  console.log(
    `Added new exercise for userId ${userId}: ${JSON.stringify(addedExercise)}.`
  );

  res.send({
    username,
    userId,
    exerciseId,
    description,
    duration,
    date
  });
};
