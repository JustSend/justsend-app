const { $, browser } = require('@wdio/globals');

class WithdrawPage {
  get amountInput() {
    return $('android=new UiSelector().resourceId("Amount Input")');
  }

  get routingInput() {
    return $('android=new UiSelector().resourceId("Routing Input")');
  }

  get withdrawButton() {
    return $('android=new UiSelector().text("Withdraw")');
  }

  get title() {
    return $('android=new UiSelector().text("Withdraw Funds")');
  }

  get subtitle() {
    return $(
      'android=new UiSelector().textContains("Withdraw money to your bank account")'
    );
  }

  get errorMessage() {
    return $('android=new UiSelector().textContains("Failed")');
  }

  get successToast() {
    return $('android=new UiSelector().textContains("Withdrawal Successful")');
  }

  async open() {
    // Assumes you are already on the withdraw tab/screen
    try {
      await this.title.waitForDisplayed({ timeout: 2000 });
      return;
    } catch (error) {
      // Navigation logic to withdraw screen would go here if needed
      console.log(
        'Not on withdraw page, navigation logic needed if available.'
      );
    }
  }

  async withdraw(amount, routingNumber) {
    await this.amountInput.setValue(amount);
    await this.routingInput.setValue(routingNumber);
    await this.withdrawButton.click();
  }

  async clearInputs() {
    await this.amountInput.setValue('');
    await this.routingInput.setValue('');
  }

  async waitForSuccessToast() {
    await this.successToast.waitForDisplayed({ timeout: 5000 });
  }

  async waitForErrorToast() {
    await this.errorMessage.waitForDisplayed({ timeout: 5000 });
  }
}

module.exports = new WithdrawPage();
