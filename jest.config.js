// jest.config.js

module.exports = {

  "coveragePathIgnorePatterns": [
    "<rootDir>/test"
  ],

  "preset": "jest-puppeteer",

  "setupFiles": [
    "<rootDir>test/_setupFiles.js"
  ],

};
