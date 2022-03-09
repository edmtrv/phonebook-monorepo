module.exports = {
  projects: [
    {
      displayName: 'frontend',
      testEnvironment: 'jsdom',
      moduleNameMapper: {
        '^@root/(.*)$': '<rootDir>/$1',
        '^Components/(.*)$': '<rootDir>/client/components/$i',
      },
      testMatch: ['<rootDir>/client/components/*.test.js'],
    },
    {
      displayName: 'backend',
      testEnvironment: 'node',
      moduleNameMapper: {
        '^@root/(.*)$': '<rootDir>/$1',
        '^@controllers/(.*)$': '<rootDir>/server/controllers/$1',
        '^@models/(.*)$': '<rootDir>/server/models/$1',
        '^@middleware/(.*)$': '<rootDir>/server/middleware/$1',
        '^@util/(.*)$': '<rootDir>/server/util/$1',
      },
      testMatch: ['<rootDir>/server/tests/*.test.js'],
    },
  ],
};
