// jest.config.js

module.exports = {

  "coveragePathIgnorePatterns": [
    "<rootDir>/lib",
    "<rootDir>/test"
  ],

  "preset": "jest-puppeteer",

  "setupFiles": [
    "<rootDir>/test/_setupFiles.js"
  ],

  "transformIgnorePatterns": [
    "node_modules/(?!(document-staging)/)",
  ],
};
