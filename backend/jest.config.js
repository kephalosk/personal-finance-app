module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.ts$': 'ts-jest',
    '^.+\\.(t|j)s$': 'ts-jest',
  },
  testRegex: '.*\\.spec\\.ts$',
  moduleFileExtensions: ['js', 'json', 'ts'],
  rootDir: 'src',
  collectCoverageFrom: ['**/*.(t|j)s'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/test/',
    '<rootDir>/main.ts',
    '<rootDir>/data-source.ts',
    '<rootDir>/env.d.ts',
    '<rootDir>/config.schema.ts',
    '<rootDir>/coverage',
    '/src/.*\\.module.ts',
  ],
  coveragePathIgnorePatterns: [
    '<rootDir>/node_modules/',
    '<rootDir>/dist/',
    '<rootDir>/test/',
    '<rootDir>/main.ts',
    '<rootDir>/data-source.ts',
    '<rootDir>/env.d.ts',
    '<rootDir>/config.schema.ts',
    '<rootDir>/coverage',
    '/src/.*\\.module.ts',
  ],
  collectCoverage: false,
  coverageDirectory: '<rootDir>/coverage',
};
