const { describe, it } = require('mocha');
const { expect } = require('chai');
const { driver } = require('@wdio/globals');

describe('Basic Appium Test', () => {
  it('should launch the app successfully', async () => {
    // Wait for app to load
    await driver.pause(2000);

    // Get the current platform
    const platform = await driver.getPlatform();
    console.log('Running on platform:', platform);

    // Basic assertion to verify app is running
    const appState = await driver.getAppState();
    expect(appState).to.equal(4); // 4 means app is running in foreground
  });
});
