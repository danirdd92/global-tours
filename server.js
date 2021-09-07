// require('dotenv').config({ path: './config.env' });
const mongoose = require('mongoose');
const app = require('./app');
const port = process.env.PORT || 3000;

process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log(err);
  console.log('UNCAUGHT EXCEPTION. Shutting down...');
  process.exit(1);
});

mongoose
  .connect(process.env.CONNECTION_STRING)
  .then(() => console.log('DB connection sucessful!'))
  .catch((err) => console.log(err));

const server = app.listen(port, () => {
  console.log(`App running on port ${port}...`);
  console.log(`Running in ${process.env.NODE_ENV} enviorment`);
});

process.on('unhandledRejection', (err) => {
  console.log(err);
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION. Shutting down...');
  server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
  console.log('SIGTERM RECEIVED. Shutting down gracefully!');
  server.close(() => {
    console.log('Process terminated by SIGTERM!');
  });
});
