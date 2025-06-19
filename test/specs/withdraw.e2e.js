const { browser, expect: wdioExpect } = require('@wdio/globals');
const { expect } = require('chai');
const { describe, it, beforeEach } = require('mocha');
const WithdrawPage = require('../pageobjects/withdraw.page');

describe('Withdraw Tests', () => {
  beforeEach(async () => {
    console.log('🔄 Starting withdraw test...');
    await WithdrawPage.open();
    await WithdrawPage.clearInputs();
  });

  it('should display withdraw form elements', async () => {
    console.log('📱 Checking withdraw form elements...');

    await wdioExpect(WithdrawPage.amountInput).toBeDisplayed();
    await wdioExpect(WithdrawPage.routingInput).toBeDisplayed();
    await wdioExpect(WithdrawPage.withdrawButton).toBeDisplayed();
    console.log('✅ Withdraw form elements are visible');
  });

  it('should allow entering withdraw amount and routing', async () => {
    console.log('💰 Testing withdraw input functionality...');

    await WithdrawPage.amountInput.setValue('75.25');
    await WithdrawPage.routingInput.setValue('555666777');

    const amountValue = await WithdrawPage.amountInput.getAttribute('text');
    const routingValue = await WithdrawPage.routingInput.getAttribute('text');

    expect(amountValue).to.equal('75.25');
    expect(routingValue).to.equal('555666777');
    console.log('✅ Withdraw inputs working correctly');
  });

  it('should attempt withdraw with valid data', async () => {
    console.log('🏦 Testing withdraw attempt...');

    await WithdrawPage.withdraw('30.00', '111222333');
    console.log('🚀 Withdraw attempt completed');

    await browser.pause(2000);
    console.log('✅ Withdraw test completed');
  });
});
