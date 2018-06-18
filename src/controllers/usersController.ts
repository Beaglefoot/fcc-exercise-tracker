import { Handler } from 'express';
import User from '../models/User';

export const createUser: Handler = async (req, res, next) => {
  const { name } = req.body;
  const user = await User.findOne({ name });

  if (user) {
    res.status(409).send({ error: `User with name "${name}" already exists` });
    return;
  }

  try {
    const { _id } = await new User({ name }).save();
    console.log(`Created ${name} with _id ${_id}`);
    res.send({ name, _id });
  } catch (err) {
    res.status(400).send({ error: err.message });
    next(err);
  }
};
