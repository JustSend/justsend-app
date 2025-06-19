const { expect } = require('@wdio/globals');
const { describe, it, beforeEach } = require('mocha');
const LoginPage = require('../pageobjects/login.page');

describe('Login Screen', () => {
  beforeEach(async () => {
    await LoginPage.open();
  });

  it('should display login form elements', async () => {
    await expect(LoginPage.emailInput).toBeDisplayed();
    await expect(LoginPage.passwordInput).toBeDisplayed();
    await expect(LoginPage.loginButton).toBeDisplayed();
  });
});
