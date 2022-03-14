require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routes = require('@util/routes');
const { MONGODB_URI } = require('@util/common');
const errorMiddleware = require('@middleware/errorMiddleware');

mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('Error connecting to MongoDB', error.message);
  });

app.use(express.json());

app.use(routes);

app.use(errorMiddleware);

module.exports = app;
