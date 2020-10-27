module.exports = {
  preset: 'jest-puppeteer-preset',
  roots: ['<rootDir>/test/e2e/'],
  globals: {
    'ts-jest': {
      // 关闭错误诊断
      diagnostics: false,
    },
  },
  collectCoverageFrom: ['<rootDir>/**/*.ts'],
  coverageDirectory: 'coverage',
};
