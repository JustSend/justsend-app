const { $, browser } = require('@wdio/globals');

class ReceivePage {
  get emailDisplay() {
    return $('android=new UiSelector().resourceId("Email Display")');
  }

  get aliasDisplay() {
    return $('android=new UiSelector().resourceId("Alias Display")');
  }

  get copyEmailButton() {
    return $('android=new UiSelector().resourceId("Copy Email Button")');
  }

  get copyAliasButton() {
    return $('android=new UiSelector().resourceId("Copy Alias Button")');
  }

  get successMessage() {
    return $('android=new UiSelector().resourceId("Success Message")');
  }

  async copyEmail() {
    await this.copyEmailButton.click();
  }

  async copyAlias() {
    await this.copyAliasButton.click();
  }

  async open() {
    // Navigate to receive tab
    await browser.pause(1000);
  }

  async getEmailText() {
    return await this.emailDisplay.getAttribute('text');
  }

  async getAliasText() {
    return await this.aliasDisplay.getAttribute('text');
  }
}

module.exports = new ReceivePage();
