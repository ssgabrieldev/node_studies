export default {
  "clearMocks": true,
  "collectCoverage": true,
  "coverageDirectory": "coverage",
  "coverageProvider": "v8",
  "testEnvironment": "jest-environment-node",
  "coverageThreshold": {
    "global": {
      "lines": 100
    }
  },
  "transform": {
    "^.+\\.tsx?$": "ts-jest"
  }
}
