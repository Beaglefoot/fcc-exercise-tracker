import { Handler } from 'express';
import User, { IUser } from '../../models/User';

const addExercise: Handler = async (req, res, next) => {
  const { userId } = req.params;
  const { ...exercise } = req.body;
  let user: IUser;

  try {
    user = await User.findByIdAndUpdate(
      userId,
      {
        $push: { exercises: exercise }
      },
      { runValidators: true }
    ).exec();
  } catch (err) {
    res.status(400).send({ error: err.message });
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

export default addExercise;
