import { expect } from 'chai';

describe('Device Connection Test', () => {
  it('should have a valid session and device info', async () => {
    console.log('Checking browser sessionId...');
    expect(browser.sessionId).to.be.a('string').that.is.not.empty;
    console.log('Session ID:', browser.sessionId);

    console.log('Getting capabilities...');
    const caps = await browser.capabilities;
    console.log('Capabilities:', caps);

    expect(caps.platformName).to.equal('Android');
    console.log('Platform name is Android.');

    console.log('Getting current activity from device...');
    const activity = await driver.getCurrentActivity();
    console.log('Current activity:', activity);
    expect(activity).to.be.a('string').that.is.not.empty;
  });
});
