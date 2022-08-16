export default {
  displayName: {
    name: 'core',
    color: 'blue'
  },
  transform: {
    "^.+\.(t|j)sx?$": ["@swc/jest"]
  },
  moduleDirectories: ['node_modules', 'src'],
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage"
};
