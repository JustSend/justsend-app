const { $, browser } = require('@wdio/globals');

class SendPage {
  get recipientInput() {
    return $('android=new UiSelector().resourceId("Recipient Input")');
  }

  get amountInput() {
    return $('android=new UiSelector().resourceId("Amount Input")');
  }

  get sendButton() {
    return $('android=new UiSelector().resourceId("Send Button")');
  }

  get currencySelector() {
    return $('android=new UiSelector().resourceId("Currency Selector")');
  }

  get searchResults() {
    return $('android=new UiSelector().resourceId("Search Results")');
  }

  get successMessage() {
    return $('android=new UiSelector().resourceId("Success Message")');
  }

  get errorMessage() {
    return $('android=new UiSelector().resourceId("Error Message")');
  }

  async send(recipient, amount, currency = 'USD') {
    await this.recipientInput.setValue(recipient);
    await browser.pause(1000); // Wait for search results
    await this.amountInput.setValue(amount);
    await this.sendButton.click();
  }

  async open() {
    // Navigate to send tab
    await browser.pause(1000);
  }

  async clearInputs() {
    await this.recipientInput.setValue('');
    await this.amountInput.setValue('');
  }
}

module.exports = new SendPage();
