import { Handler } from 'express';
import User from '../models/User';
import { ExerciseSchema } from '../models/Exercise';

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
  const user = await User.findById(userId);

  if (!user) {
    res
      .status(400)
      .send({ error: `User with provided userId ${userId} does not exist.` });
    return;
  }

  try {
    user.exercises.push(exercise);
    const { _id: userId, name: username, exercises } = await user.save();
    const addedExercise = exercises.slice(-1)[0];
    const { _id: exerciseId, description, duration, date } = addedExercise;

    console.log(
      `Added new exercise for userId ${userId}: ${JSON.stringify(
        addedExercise
      )}.`
    );

    res.send({
      username,
      userId,
      exerciseId,
      description,
      duration,
      date
    });
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
};
