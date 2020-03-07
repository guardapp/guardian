// jest.config.js
const {defaults} = require('jest-config');
module.exports = {
  ...defaults,
  reporters: [
      'default',
      'jest-github-actions-reporter'
  ],
  testLocationInResults: true
};