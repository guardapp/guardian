// jest.config.js
const {defaults} = require('jest-config');
module.exports = {
  ...defaults,
  testPathIgnorePatterns: [
    "<rootDir>/apps/", 
    "<rootDir>/node_modules/"
  ],
  reporters: [
      'default',
      'jest-github-actions-reporter'
  ],
  testLocationInResults: true
};