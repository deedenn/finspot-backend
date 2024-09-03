const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const { PORT = 4000 } = process.env;
const { errors } = require('celebrate');
const cors = require('cors');

const app = express();

app.use(cors());

const router = require('./routes');
//const signRouter = require('./routes/sign');
//const { auth } = require('./middlewares/auth');
const NotFoundError = require('./errors/notfound');
//const { centralError } = require('./middlewares/centralError');
//const { requestLogger, errorLogger } = require('./middlewares/logger');

mongoose.connect('mongodb+srv://solovyevdenis:Q1YCZ4o1W4K9pjVJ@cluster0.lzqu4u0.mongodb.net/finspotdb')
  .then(() => {
    console.log('База данных подключена');
  }).catch(console.error)

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер падает');
  }, 0);
});

//app.use(signRouter);
//app.use(auth);

app.use(router);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

//app.use(errorLogger);

app.use(errors());
//app.use(centralError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
