import { Handler } from 'express';
import User, { IUser } from '../../models/User';

const getExercises: Handler = async (req, res, next) => {
  const { userId } = req.params;
  let user: IUser;

  try {
    user = await User.findById(userId);
  } catch (err) {
    res
      .status(400)
      .send({ error: `Cannot get exercises for provided userId ${userId}.` });
    next(err);
    return;
  }

  const { name, exercises, totalCount } = user;

  res.send({ userId, name, exercises, totalCount });
};

export default getExercises;
