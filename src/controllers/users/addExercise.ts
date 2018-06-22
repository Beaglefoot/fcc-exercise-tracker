import { Handler } from 'express';
import User, { IUser } from '../../models/User';

const addExercise: Handler = async (req, res, next) => {
  const { userId } = req.params;
  const { ...exercise } = req.body;
  let user: IUser;

  try {
    await User.findByIdAndUpdate(
      userId,
      {
        $push: { exercises: exercise }
      },
      { runValidators: true }
    );

    // Apparently there is no way to achieve this in one round-trip
    user = await User.findById(userId);
  } catch (err) {
    err.httpStatusCode = 400;
    throw err;
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
