import type { Options } from '@wdio/types';
export const config: Options.Testrunner = {
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
      'appium:deviceName': 'Android GoogleAPI Emulator',
      'appium:platformVersion': '12.0',
      'appium:automationName': 'UiAutomator2',
      'appium:app': './android/app/build/outputs/apk/debug/app-debug.apk',
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
