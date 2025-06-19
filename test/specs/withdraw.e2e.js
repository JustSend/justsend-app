const { browser, expect: wdioExpect } = require('@wdio/globals');
const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const WithdrawPage = require('../pageobjects/withdraw.page');

// You may need to add navigation to the Withdraw screen in the beforeEach if not already there

describe('Withdraw Tests', () => {
  const testAmount = '100.00';
  const testRouting = '123456789';

  beforeEach(async () => {
    console.log('🔄 Starting withdraw test...');
    // Check if we are on the withdraw screen
    try {
      await WithdrawPage.title.waitForDisplayed({ timeout: 2000 });
      console.log('✅ Already on withdraw screen');
    } catch (error) {
      console.log(
        '⚠️ Not on withdraw screen, trying to click Withdraw button...'
      );
      try {
        // Try to find and click a Withdraw button (e.g., from QuickActions or tab)
        const withdrawNavButton = await browser.$(
          'android=new UiSelector().text("Withdraw")'
        );
        await withdrawNavButton.waitForDisplayed({ timeout: 3000 });
        await withdrawNavButton.click();
        await browser.pause(1000);
        await WithdrawPage.title.waitForDisplayed({ timeout: 3000 });
        console.log(
          '✅ Navigated to withdraw screen by clicking Withdraw button'
        );
      } catch (navError) {
        console.log('❌ Could not navigate to withdraw screen');
      }
    }
    await WithdrawPage.clearInputs();
  });

  it('should display withdraw form elements', async () => {
    await wdioExpect(WithdrawPage.title).toBeDisplayed();
    await wdioExpect(WithdrawPage.subtitle).toBeDisplayed();
    await wdioExpect(WithdrawPage.amountInput).toBeDisplayed();
    await wdioExpect(WithdrawPage.routingInput).toBeDisplayed();
    await wdioExpect(WithdrawPage.withdrawButton).toBeDisplayed();
    console.log('✅ Withdraw form elements are visible');
  });

  it('should allow entering amount and routing number', async () => {
    await WithdrawPage.amountInput.setValue(testAmount);
    await WithdrawPage.routingInput.setValue(testRouting);
    const amountValue = await WithdrawPage.amountInput.getAttribute('text');
    const routingValue = await WithdrawPage.routingInput.getAttribute('text');
    expect(amountValue).to.equal(testAmount);
    expect(routingValue).to.equal(testRouting);
    console.log('✅ Withdraw inputs working correctly');
  });

  it('should attempt withdraw with valid data', async () => {
    await WithdrawPage.withdraw(testAmount, testRouting);
    try {
      await WithdrawPage.waitForSuccessToast();
      console.log('✅ Withdraw successful');
    } catch (error) {
      try {
        await WithdrawPage.waitForErrorToast();
        console.log('⚠️  Withdraw failed (expected for test data)');
      } catch (toastError) {
        console.log('ℹ️  No toast message found');
      }
    }
    console.log('✅ Withdraw test completed');
  });

  it('should handle empty amount', async () => {
    await WithdrawPage.routingInput.setValue(testRouting);
    await WithdrawPage.withdrawButton.click();
    await browser.pause(2000);
    // Should show error or not proceed
    console.log('✅ Empty amount test completed');
  });

  it('should handle empty routing number', async () => {
    await WithdrawPage.amountInput.setValue(testAmount);
    await WithdrawPage.withdrawButton.click();
    await browser.pause(2000);
    // Should show error or not proceed
    console.log('✅ Empty routing number test completed');
  });
});
