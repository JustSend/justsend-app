const { $, browser } = require('@wdio/globals');

class LoginPage {
  get emailInput() {
    return $('android=new UiSelector().resourceId("Email Input")');
  }

  get passwordInput() {
    return $('android=new UiSelector().resourceId("Password Input")');
  }

  get loginButton() {
    return $('android=new UiSelector().resourceId("Login Button")');
  }

  get createAccountButton() {
    return $('android=new UiSelector().resourceId("Sign Up")');
  }

  get errorMessage() {
    return $('android=new UiSelector().resourceId("Error Message")');
  }

  async login(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async navigateToRegister() {
    await this.createAccountButton.click();
  }

  async open() {
    await browser.pause(2000);
  }

  async clearInputs() {
    await this.emailInput.setValue('');
    await this.passwordInput.setValue('');
  }
}

module.exports = new LoginPage();
