export default {
  transform: {
    "^.+\.(t|j)sx?$": ["@swc/jest"]
  },
  moduleDirectories: ['node_modules', 'src'],
  clearMocks: true,
  collectCoverage: false,
  coverageDirectory: "coverage"
};
