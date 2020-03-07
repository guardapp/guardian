// jest.config.js
const {defaults} = require('jest-config');
module.exports = {
  reporters: [
      'default',
      'jest-github-actions-reporter'
  ],
  testLocationInResults: true
};