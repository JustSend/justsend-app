import { describe, it, beforeEach } from 'mocha';
import { expect } from 'chai';
import LoginPage from '../pageobjects/LoginPage';

describe('Login Screen', () => {
  beforeEach(async () => {
    await LoginPage.clearInputs();
  });

  it('should display login form', async () => {
    const emailVisible = await LoginPage.emailInput().isDisplayed();
    const passwordVisible = await LoginPage.passwordInput().isDisplayed();
    const loginVisible = await LoginPage.loginButton().isDisplayed();

    expect(emailVisible).to.be.true;
    expect(passwordVisible).to.be.true;
    expect(loginVisible).to.be.true;
  });
});
