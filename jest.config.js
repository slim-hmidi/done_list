module.exports = {
  clearMocks: true,
  coverageDirectory: "coverage",
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
};
