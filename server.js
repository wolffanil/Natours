const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// process.on('uncaughtException', (err) => {
//   console.log(err.name, err.message);
//   server.close(() => {
//     process.exit(1);
//   });
// });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // console.log(con.connections);
    console.log('DB successful');
  });

// const testTour = new Tour({
//     name: "hello2",
//     price: 363
// });

// testTour.save().then(doc => {
//     console.log(doc);
// }).catch(err => {
//     console.log(err);
// });

const port = process.env.PORT || 3000;

const server = app.listen(port, () => {
  console.log(`start searver on port ${port}`);
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
