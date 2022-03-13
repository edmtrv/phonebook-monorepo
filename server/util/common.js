require('dotenv').config();
const common = require('@root/config/common');

const PORT = process.env.PORT || 8000;

const MONGODB_URI =
  process.env.NODE_ENV === 'test'
    ? process.env.TEST_MONGODB_URI
    : process.env.MONGODB_URI;
console.log(process.env, MONGODB_URI);
module.exports = {
  ...common,
  MONGODB_URI,
  PORT,
};
