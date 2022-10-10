require('dotenv').config();
const express = require('express');

const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const { errors } = require('celebrate');
const cors = require('cors');
const router = require('./routes/index');
const errorServer = require('./middlewares/errors');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const { NODE_ENV, MONGO_DB } = process.env;

const { PORT = 3000 } = process.env;
const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(limiter);
app.use(
  helmet({
    referrerPolicy: { policy: 'no-referrer' },
  }),
);
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ['http://evsoroka.nomoredomains.icu', 'https://evsoroka.nomoredomains.icu'],
    credentials: true,
  }),
);

app.use(requestLogger);

app.use('/', router);

app.use(errorLogger);
app.use(errors());

app.use(errorServer);

async function main() {
  try {
    await mongoose.connect(NODE_ENV === 'production' ? MONGO_DB : 'mongodb://localhost:27017/bitfilmsdb', {
      useNewUrlParser: true,
      useUnifiedTopology: false,
    });
    await app.listen(PORT);
  } catch (error) {
    console.error(error);
  }
}

main();
