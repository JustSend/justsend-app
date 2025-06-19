const { $, browser } = require('@wdio/globals');

class WithdrawPage {
  get amountInput() {
    return $('android=new UiSelector().resourceId("Amount Input")');
  }

  get routingInput() {
    return $('android=new UiSelector().resourceId("Routing Input")');
  }

  get withdrawButton() {
    return $('android=new UiSelector().resourceId("Withdraw Button")');
  }

  get currencySelector() {
    return $('android=new UiSelector().resourceId("Currency Selector")');
  }

  get successMessage() {
    return $('android=new UiSelector().resourceId("Success Message")');
  }

  get errorMessage() {
    return $('android=new UiSelector().resourceId("Error Message")');
  }

  async withdraw(amount, routingNumber, currency = 'USD') {
    await this.amountInput.setValue(amount);
    await this.routingInput.setValue(routingNumber);
    await this.withdrawButton.click();
  }

  async open() {
    // Navigate to withdraw tab
    await browser.pause(1000);
  }

  async clearInputs() {
    await this.amountInput.setValue('');
    await this.routingInput.setValue('');
  }
}

module.exports = new WithdrawPage();
