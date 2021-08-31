/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.(styl|css)$': '<rootDir>/src/__mocks__/assetsMock.ts',
    '\\.(jpg|jpeg|png|gif|svg)$': '<rootDir>/src/__mocks__/assetsMock.ts',
  },
};
