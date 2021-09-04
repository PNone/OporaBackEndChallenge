import createError from 'http-errors';
import express, { json, urlencoded, static as st } from 'express';
import { join } from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';

import driversRouter from './routes/drivers.route.js';
import seasonsRouter from './routes/seasons.route.js';
import { serve, setup } from 'swagger-ui-express';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);
const swaggerDocument = require('./swagger.json');
var app = express();
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// view engine setup
app.set('views', join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());
app.use(st(join(__dirname, 'public')));

app.use('/drivers', driversRouter);
app.use('/seasons', seasonsRouter);

app.use(
  '/api-docs',
  serve, 
  setup(swaggerDocument)
);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
