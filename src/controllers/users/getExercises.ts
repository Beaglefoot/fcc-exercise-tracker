import { Handler } from 'express';
import User, { IUser } from '../../models/User';

const getExercises: Handler = async (req, res, next) => {
  const { userId } = req.params;
  let user: IUser;

  try {
    user = await User.findById(userId);
  } catch (err) {
    throw Object.assign(
      new Error(`Cannot get exercises for provided userId ${userId}.`),
      { httpStatusCode: 400 }
    );
  }

  const { name, exercises, totalCount } = user;

  res.send({ userId, name, exercises, totalCount });
};

export default getExercises;
