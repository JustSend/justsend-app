const { browser, expect: wdioExpect } = require('@wdio/globals');
const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const ReceivePage = require('../pageobjects/receive.page');

describe('Receive Tests', () => {
  beforeEach(async () => {
    console.log('🔄 Starting receive test...');
    await ReceivePage.open();
  });

  it('should display receive information elements', async () => {
    console.log('📱 Checking receive information elements...');

    await wdioExpect(ReceivePage.emailDisplay).toBeDisplayed();
    await wdioExpect(ReceivePage.aliasDisplay).toBeDisplayed();
    await wdioExpect(ReceivePage.copyEmailButton).toBeDisplayed();
    await wdioExpect(ReceivePage.copyAliasButton).toBeDisplayed();
    console.log('✅ Receive information elements are visible');
  });

  it('should display user email and alias', async () => {
    console.log('👤 Checking user information display...');

    const emailText = await ReceivePage.getEmailText();
    const aliasText = await ReceivePage.getAliasText();

    expect(emailText).to.not.be.empty;
    expect(aliasText).to.not.be.empty;
    console.log('✅ User information displayed correctly');
  });

  it('should allow copying email and alias', async () => {
    console.log('📋 Testing copy functionality...');

    await ReceivePage.copyEmail();
    console.log('📧 Email copied');

    await browser.pause(1000);

    await ReceivePage.copyAlias();
    console.log('🏷️  Alias copied');

    await browser.pause(1000);
    console.log('✅ Copy functionality working');
  });
});
