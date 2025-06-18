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
  specs: ['./tests/*.spec.ts'],
  capabilities: [
    {
      platformName: 'Android',
      'appium:deviceName': 'emulator-5554',
      'appium:platformVersion': '15.0',
      'appium:automationName': 'UiAutomator2',
      'appium:appPackage': 'com.aseca.justsend',
      'appium:appActivity': '.MainActivity',
      'appium:noReset': true,
      'appium:autoGrantPermissions': true,
      'appium:newCommandTimeout': 60,
      'appium:uiautomator2ServerLaunchTimeout': 60000,
      'appium:uiautomator2ServerInstallTimeout': 60000,
      'appium:androidInstallTimeout': 90000,
      'appium:adbExecTimeout': 60000,
    },
  ],
  logLevel: 'info',
  appWaitForLaunch: true,
  waitforTimeout: 10000,
  connectionRetryTimeout: 120000,
  connectionRetryCount: 3,
  services: ['appium'],
  framework: 'mocha',
  reporters: ['spec'],
  mochaOpts: {
    ui: 'bdd',
    timeout: 60000,
  },
};
