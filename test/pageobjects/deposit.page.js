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

  get title() {
    return $('android=new UiSelector().text("DEBIN Deposit")');
  }

  get routingLabel() {
    return $('android=new UiSelector().text("Routing Number")');
  }

  get amountLabel() {
    return $('android=new UiSelector().text("Amount")');
  }

  get currencyLabel() {
    return $('android=new UiSelector().text("Currency")');
  }

  get successToast() {
    return $(
      'android=new UiSelector().textContains("DEBIN Deposit Successful")'
    );
  }

  get errorToast() {
    return $('android=new UiSelector().textContains("DEBIN Deposit Failed")');
  }

  async deposit(amount, routingNumber, currency = 'USD') {
    await this.amountInput.setValue(amount);
    await this.routingInput.setValue(routingNumber);
    await this.depositButton.click();
  }

  async open() {
    // Navigate to deposit tab - this would need to be implemented based on your navigation
    await browser.pause(1000);
  }

  async clearInputs() {
    await this.amountInput.setValue('');
    await this.routingInput.setValue('');
  }

  async waitForSuccessToast() {
    await this.successToast.waitForDisplayed({ timeout: 5000 });
  }

  async waitForErrorToast() {
    await this.errorToast.waitForDisplayed({ timeout: 5000 });
  }
}

module.exports = new DepositPage();
