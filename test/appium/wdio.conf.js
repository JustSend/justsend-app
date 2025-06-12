exports.config = {
  runner: 'local',
  autoCompileOpts: {
    autoCompile: true,
    tsNodeOpts: {
      project: '../tsconfig.json',
      transpileOnly: true,
    },
  },

  port: 4723,
  specs: ['./tests/*.ts'],
  exclude: [],
  maxInstances: 10,
  capabilities: [
    {
      platformName: 'Android',
      browserName: '',
      'appium:deviceName': 'emulator-5554',
      'appium:platformVersion': '15.0',
      'appium:automationName': 'UiAutomator2',
      'appium:noReset': true,
    },
  ],
  logLevel: 'info',
  bail: 0,
  baseUrl: 'http://localhost',
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['appium', 'visual'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};
