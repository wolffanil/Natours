const path = require('path');
const express = require('express');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
const cookieParser = require('cookie-parser');
const compression = require('compression');

const AppError = require('./utils/appError');
const globalError = require('./controllers/errorController');
const userRouter = require('./routes/userRouter');
const tourRouter = require('./routes/tourRouter');
const reviewRouter = require('./routes/reviewRouter');
const viewRouter = require('./routes/viewRouter');
const bookingRouter = require('./routes/bookingRouter');

const app = express();

/// Pug
// app.use((req, res, next) => {
//   res.setHeader(
//     'Content-Security-Policy',
//     "script-src 'self' https://js.stripe.com/v3/"
//   );
//   next();
// });

// app.use(
//   helmet.contentSecurityPolicy({
//     directives: {
//       defaultSrc: ["'self'"],
//       scriptSrc: ["'self'", 'https://js.stripe.com/v3/'],
//       // включите другие директивы по мере надобности
//     },
//   })

// app.use((req, res, next) => {
//   res.setHeader(
//     'Content-Security-Policy',
//     "script-src 'self' https://js.stripe.com/v3/"
//   ); // Добавьте скрипт Stripe в allow-list 'script-src'
//   // helmet.contentSecurityPolicy({
//   //   directives: {
//   //     ...helmet.contentSecurityPolicy.getDefaultDirectives(),
//   //     'script-src': ["'self'", 'https://js.stripe.com/v3/'],
//   //     // Дополнительные директивы по мере необходимости
//   //   },
//   // });
//   // res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
//   // res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
//   next();
// });

app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

// css, icon ...

app.use(express.static(path.join(__dirname, 'public')));

// security

if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

app.use(helmet());

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requestes on this IP, please try again in an hour!',
});

app.use('/api', limiter);

app.use(express.json({ limit: '10kb' }));
// app.use(express.urlencoded({ extended: true, limit: '10kb' }));
app.use(cookieParser());

app.use(mongoSanitize()); //email: {"$gt": ""}

app.use(xss()); //<div id="body"></div>

app.use(
  hpp({
    whitelist: [
      'duration',
      'ratingsQuantity',
      'ratingsAverage',
      'maxGroupSize',
      'difficulty',
      'price',
    ],
  })
);

// app.use(express.static(`${__dirname}/public`));
// app.get('/', (req, res) => {
//     res.status(200).json({message: 'hello', app: 'gg'});
// });

// app.post('/', (req, res) => {
//     res.send("hello world");
// });

// middleware

app.use(compression());

app.use((req, res, next) => {
  console.log('hello ser');
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});

// routes

app.use('/', viewRouter);

app.use('/api/v1/tours', tourRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/bookings', bookingRouter);

app.all('*', (req, res, next) => {
  // const err = new Error(`Can dont use this ${req.originalUrl}`);
  // err.statusCode = 404;
  // err.staus = 'fail';

  next(new AppError(`Can dont use this ${req.originalUrl}`, 404));
});

app.use(globalError);

module.exports = app;
