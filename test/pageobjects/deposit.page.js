const { $, browser } = require('@wdio/globals');

class DepositPage {
  get amountInput() {
    return $('android=new UiSelector().resourceId("Amount Input")');
  }

  get routingInput() {
    return $('android=new UiSelector().resourceId("Routing Input")');
  }

  get depositButton() {
    return $('android=new UiSelector().resourceId("Deposit Button")');
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

  async deposit(amount, routingNumber, currency = 'USD') {
    await this.amountInput.setValue(amount);
    await this.routingInput.setValue(routingNumber);
    await this.depositButton.click();
  }

  async open() {
    // Navigate to deposit tab
    await browser.pause(1000);
  }

  async clearInputs() {
    await this.amountInput.setValue('');
    await this.routingInput.setValue('');
  }
}

module.exports = new DepositPage();
