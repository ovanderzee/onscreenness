// jest.config.js

module.exports = {

  "collectCoverageFrom": [
    "src/*.*"
  ],

  "globalSetup": "<rootDir>test/_globalSetup.js",
  "globalTeardown": "<rootDir>test/_globalTeardown.js",

  "setupFilesAfterEnv": [
    "<rootDir>test/_setupFilesAfterEnv.js"
  ],

  "testEnvironment": "<rootDir>test/_puppeteer_env.js",

};
