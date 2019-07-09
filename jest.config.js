// jest.config.js

module.exports = {

  "collectCoverageFrom": [
    "**/src/*.{js,jsx}",
    "!**/lib/**",
    "!**/node_modules/**",
    "!**/test/**",
  ],

  "globalSetup": "<rootDir>test/_globalSetup.js",

  "globalTeardown": "<rootDir>test/_globalTeardown.js",

  "setupFiles": [
    "<rootDir>/test/_setupFiles.js"
  ],

  "testEnvironment": "<rootDir>test/_puppeteer_env.js",

  "transformIgnorePatterns": [
    "node_modules/(?!(document-staging)/)",
  ],
};
