module.exports = {
  preset: "ts-jest",
  testEnvironment: "node",
  setupFiles: ['dotenv/config'],
  // The glob patterns Jest uses to detect test files
  testMatch: ['**/?(*.)+(test).ts'],
  // An array of regexp pattern strings that are matched against all test paths, matched tests are skipped
  testPathIgnorePatterns: ['\\\\node_modules\\\\'],
};
