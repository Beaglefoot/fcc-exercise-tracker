import { Handler } from 'express';
import User from '../../models/User';

const createUser: Handler = async (req, res, next) => {
  const { name } = req.body;
  const user = await User.findOne({ name });

  if (user) {
    throw Object.assign(new Error(`User with name ${name} already exists.`), {
      httpStatusCode: 409
    });
  }

  try {
    const { _id } = await new User({ name }).save();
    console.log(`Created ${name} with userId ${_id}`);
    res.send({ username: name, userId: _id });
  } catch (err) {
    err.httpStatusCode = 400;
    throw err;
  }
};

export default createUser;
