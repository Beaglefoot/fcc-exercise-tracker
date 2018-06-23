import { Handler } from 'express';
import User, { IUser } from '../../models/User';
import isValidDate from '../../helpers/validateDate';

const getExercises: Handler = async (req, res, next) => {
  const { userId } = req.params;
  const { from, to } = req.query;
  let user: IUser;

  try {
    user = await User.aggregate([
      {
        $project: {
          name: true,
          exercises: {
            $filter: {
              input: '$exercises',
              cond: {
                $and: [[from, '$gte'], [to, '$lte']].map(
                  ([date, op]) =>
                    date && isValidDate(date)
                      ? { [op]: ['$$this.date', date] }
                      : {}
                )
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
