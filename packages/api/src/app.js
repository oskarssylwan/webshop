require('dotenv').config()
const express = require('express');
const config = require('./config.js');
const bodyParser = require('body-parser');
const webToken = require('jsonwebtoken');
const morgan = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

app.use(bodyParser.json({limit: config.payload_limit}));
app.use(bodyParser.urlencoded({extended: false}));
app.use(morgan('dev'));
app.use(cors());

const connectWithRetry = () => {
  mongoose.connect(config.db_location, {useMongoClient: true}, error => {
    if (error) {
      console.error(`Failed to connect to DB at ${config.db_location} retrying...`);
      setTimeout(connectWithRetry, 5000)
    }
  });
}

connectWithRetry()

mongoose.Promise = global.Promise;

const itemRoutes = require('./routes/items');
const userRoutes = require('./routes/users');
const storeRoutes = require('./routes/store');
app.use('/items', itemRoutes);
app.use('/user', userRoutes);
app.use('/store', storeRoutes);

app.get('/status', (req, res) => {
  res.json('Server is live!')
})

app.use((req, res, next) => {
  const error = new Error('Route not found');
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    success: false,
    message: error.message
  });
});

app.listen(config.port, () => {
  console.log('Server running on port', config.port);
})
