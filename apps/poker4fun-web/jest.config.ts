import type { Config } from '@jest/types';

const jestConfig: Config.InitialOptions = {
  displayName: 'poker4fun-web',
  preset: '../../jest.preset.js',
  collectCoverageFrom: ['{pages,components}/**/*.{ts,tsx}', '!**/*.d.ts'],
  // moduleNameMapper: {
  //   // Handle image imports
  //   // https://jestjs.io/docs/webpack#handling-static-assets
  //   '^.+\\.(jpg|jpeg|png|gif|webp|avif|svg)$': `<rootDir>/__mocks__/fileMock.ts`,
  // },
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nrwl/react/plugins/jest',
    '^.+\\.[tj]sx?$': ['babel-jest', { presets: ['@nrwl/next/babel'] }],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/poker4fun-web',
};

export default jestConfig;
