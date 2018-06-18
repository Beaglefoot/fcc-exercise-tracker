import fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import logger from './middleware/logger';
import usersRouter from './routes/usersRoutes';
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
app.use('/users', usersRouter);

app.get('/', (_, res) => {
  res.render('index', {}, (err, html) => {
    res.send(html);
  });
});

export default app;
