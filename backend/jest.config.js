module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
  setupFilesAfterEnv: ['jest-extended'],
  roots: [
    "./src",
  ],
  testMatch: [
    "**/__tests__/**/*.ts",
    "**/?(*.)+(spec|test).+ts",
  ],
  transform: {
    "^.+\\.(ts)$": "ts-jest",
  },
  moduleDirectories: ['src', 'node_modules'],
};
