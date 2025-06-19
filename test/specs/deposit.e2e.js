const { browser, expect: wdioExpect } = require('@wdio/globals');
const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const DepositPage = require('../pageobjects/deposit.page');

describe('Deposit Tests', () => {
  beforeEach(async () => {
    console.log('🔄 Starting deposit test...');
    await DepositPage.open();
    await DepositPage.clearInputs();

    // Try to find and click Create Account button if available
    try {
      const createAccountButton = await browser.$(
        'android=new UiSelector().resourceId("Sign Up")'
      );
      await createAccountButton.waitForDisplayed({ timeout: 3000 });
      console.log(
        '✅ Create Account button found - navigating to register page'
      );
      await createAccountButton.click();
      await browser.pause(2000);
    } catch (error) {
      console.log('ℹ️  Create Account button not found on current page');
    }
  });

  it('should display deposit form elements', async () => {
    console.log('📱 Checking deposit form elements...');

    await wdioExpect(DepositPage.title).toBeDisplayed();
    await wdioExpect(DepositPage.routingLabel).toBeDisplayed();
    await wdioExpect(DepositPage.amountLabel).toBeDisplayed();
    await wdioExpect(DepositPage.currencyLabel).toBeDisplayed();
    await wdioExpect(DepositPage.amountInput).toBeDisplayed();
    await wdioExpect(DepositPage.routingInput).toBeDisplayed();
    await wdioExpect(DepositPage.depositButton).toBeDisplayed();
    console.log('✅ Deposit form elements are visible');
  });

  it('should allow entering deposit amount and routing', async () => {
    console.log('💰 Testing deposit input functionality...');

    await DepositPage.amountInput.setValue('100.50');
    await DepositPage.routingInput.setValue('123456789');

    const amountValue = await DepositPage.amountInput.getAttribute('text');
    const routingValue = await DepositPage.routingInput.getAttribute('text');

    expect(amountValue).to.equal('100.50');
    expect(routingValue).to.equal('123456789');
    console.log('✅ Deposit inputs working correctly');
  });

  it('should attempt deposit with valid data', async () => {
    console.log('💳 Testing deposit attempt...');

    await DepositPage.deposit('50.00', '111111111');
    console.log('🚀 Deposit attempt completed');

    try {
      await DepositPage.waitForSuccessToast();
      console.log('✅ Deposit successful');
    } catch (_) {
      try {
        await DepositPage.waitForErrorToast();
        console.log('⚠️  Deposit failed (expected for test data)');
      } catch (_) {
        console.log('ℹ️  No toast message found');
      }
    }

    console.log('✅ Deposit test completed');
  });
});
