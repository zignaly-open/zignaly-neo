const merge = require('merge')
const ts_preset = require('ts-jest/jest-preset')
const redis_preset = require('jest-redis/jest-preset')

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = merge.recursive(ts_preset, redis_preset, {
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: ['/node_modules\/(?!@zigraffle)(.*)'],
});
