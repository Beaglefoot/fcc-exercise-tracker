import { Handler } from 'express';
import mongoose from 'mongoose';
import User, { IUser } from '../../models/User';
import isValidDate from '../../helpers/validateDate';

const getExercises: Handler = async (req, res, next) => {
  const { userId } = req.params;
  const { from, to } = req.query;
  let user: IUser;

  Object.entries({ from, to }).map(([key, date]) => {
    if (date && !isValidDate(date)) {
      throw Object.assign(
        new Error(
          `"${key}" query parameter should have a valid format of yyyy-mm-dd`
        ),
        { httpStatusCode: 400 }
      );
    }
  });

  try {
    user = await User.aggregate([
      // Have to explicitly create ObjectId in aggregation pipeline
      { $match: { _id: mongoose.Types.ObjectId(userId) } },
      {
        $project: {
          name: true,
          exercises: {
            $filter: {
              input: '$exercises',
              cond: {
                $and: [
                  from ? { $gte: ['$$this.date', from] } : {},
                  to ? { $lte: ['$$this.date', to] } : {}
                ]
              }
            }
          }
        }
      }
    ]).then(([user]) => user);
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
