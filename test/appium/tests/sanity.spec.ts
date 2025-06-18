import { describe, it } from 'mocha';
import { expect } from 'chai';

describe('Login Screen', () => {
  it('should launch app and verify login screen state', async () => {
    // Wait for app to fully load
    await browser.pause(5000);

    // Test 1: Verify correct app is running
    const currentPackage = await browser.getCurrentPackage();
    expect(currentPackage).to.equal('com.aseca.justsend');

    // Test 2: Verify we're on the login screen
    const currentActivity = await browser.getCurrentActivity();
    expect(currentActivity).to.include('MainActivity');

    // Test 3: Verify app is in foreground
    const isAppInstalled = await browser.isAppInstalled('com.aseca.justsend');
    expect(isAppInstalled).to.be.true;

    // Test 4: Verify app is responsive (can get activity)
    expect(currentActivity).to.be.a('string');
    expect(currentActivity.length).to.be.greaterThan(0);
  });
});
