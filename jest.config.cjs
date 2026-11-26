module.exports = {
  testEnvironment: 'jsdom',
  roots: ['<rootDir>/src/tests'],
  setupFilesAfterEnv: ['<rootDir>/src/tests/setup.ts'],
  moduleNameMapper: { '\\.css$': 'identity-obj-proxy' },
  transform: { '^.+\\.tsx?$': ['ts-jest', { diagnostics: false, tsconfig: { jsx: 'react-jsx', esModuleInterop: true, module: 'commonjs', target: 'es2020' } }] },
};
