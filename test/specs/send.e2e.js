const { browser, expect: wdioExpect } = require('@wdio/globals');
const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const SendPage = require('../pageobjects/send.page');

describe('Send Tests', () => {
  beforeEach(async () => {
    console.log('🔄 Starting send test...');
    await SendPage.open();
    await SendPage.clearInputs();
  });

  it('should display send form elements', async () => {
    console.log('📱 Checking send form elements...');

    await wdioExpect(SendPage.recipientInput).toBeDisplayed();
    await wdioExpect(SendPage.amountInput).toBeDisplayed();
    await wdioExpect(SendPage.sendButton).toBeDisplayed();
    console.log('✅ Send form elements are visible');
  });

  it('should allow entering recipient and amount', async () => {
    console.log('👤 Testing send input functionality...');

    await SendPage.recipientInput.setValue('test@example.com');
    await SendPage.amountInput.setValue('25.00');

    const recipientValue = await SendPage.recipientInput.getAttribute('text');
    const amountValue = await SendPage.amountInput.getAttribute('text');

    expect(recipientValue).to.equal('test@example.com');
    expect(amountValue).to.equal('25.00');
    console.log('✅ Send inputs working correctly');
  });

  it('should attempt send with valid data', async () => {
    console.log('💸 Testing send attempt...');

    await SendPage.send('recipient@test.com', '10.00');
    console.log('🚀 Send attempt completed');

    await browser.pause(2000);
    console.log('✅ Send test completed');
  });
});
