require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const errorServer = require('./middlewares/errors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/NotFoundError');

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://soroka.nomorepartiesxyz.ru', 'https://soroka.nomorepartiesxyz.ru'],
    credentials: true,
  }),
);

app.use(requestLogger);

app.use('/', router);

app.use('*', (req, res, next) => {
  next(new NotFoundError('Запрашиваемый маршрут не найден'));
});

app.use(errorLogger);
app.use(errors());

app.use(errorServer);

async function main() {
  try {
    await mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    await app.listen(PORT);
  } catch (error) {
    console.error(error);
  }
}

main();
