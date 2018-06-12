import fs from 'fs';
import express from 'express';
import mongoose from 'mongoose';
import logger from './middleware/logger';

const {} = JSON.parse(fs.readFileSync('./.env', 'utf8'));

mongoose.Promise = global.Promise;
// mongoose.connect();

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

export default app;
