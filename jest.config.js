module.exports = {
  setupFilesAfterEnv: [
    "<rootDir>test/setupTests.js"
  ],
  testEnvironment: 'jsdom',
  testPathIgnorePatterns: [
    "<rootDir>/temp/",
    "<rootDir>/lib/"
  ],
  transformIgnorePatterns: [
    "node_modules/(?!(document-staging)/)",
  ],
};
