/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  testEnvironment: "jest-environment-jsdom",
  roots: ["<rootDir>/apps", "<rootDir>/packages"],
  testMatch: [
    "**/__tests__/**/*.+(ts|tsx|js)",
    "**/?(*.)+(spec|test).+(ts|tsx|js)",
  ],
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  setupFiles: ["<rootDir>/jest.setup.ts"],
  moduleFileExtensions: ["js", "jsx", "ts", "tsx"],
};
