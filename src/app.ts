import fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import logger from './middleware/logger';
import User from './models/User';

const { MONGO_URI } = JSON.parse(fs.readFileSync('./.env', 'utf8'));

mongoose.Promise = global.Promise;
mongoose
  .connect(MONGO_URI)
  .catch(err => console.error('Failed to connect to DB:', err));

const app = express();

app.set('view engine', 'ejs');
app.use(logger);
app.use(express.static('public'));
app.use(express.json());

app.get('/', (_, res) => {
  res.render('index', {}, (err, html) => {
    res.send(html);
  });
});

app.post('/users', (req, res, next) => {
  const { name } = req.body;
  const user = new User({ name });

  user
    .save()
    .then(({ name, _id }) => {
      console.log(`Created ${name} with _id ${_id}`);
      res.send({ name, _id });
    })
    .catch(err => {
      res.status(400).send({ error: err.message });
      next(err);
    });
});

export default app;
