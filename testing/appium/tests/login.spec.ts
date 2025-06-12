import { describe, it } from 'mocha';
import { expect } from 'chai';
import LoginPage from '../pages/LoginPage';

describe('Login Screen', () => {
  beforeEach(async () => {
    await LoginPage.waitForLoad();
    await LoginPage.clearInputs();
  });

  it('should display login form', async () => {
    expect(await LoginPage.emailInput.isDisplayed()).to.be.true;
    expect(await LoginPage.passwordInput.isDisplayed()).to.be.true;
    expect(await LoginPage.loginButton.isDisplayed()).to.be.true;
  });

  it('should show error with invalid credentials', async () => {
    await LoginPage.login('invalid@email.com', 'wrongpassword');
    expect(await LoginPage.isErrorMessageDisplayed()).to.be.true;
  });

  it('should navigate to forgot password', async () => {
    await LoginPage.clickForgotPassword();
    // Add assertions for forgot password screen
  });

  it('should navigate to sign up', async () => {
    await LoginPage.clickSignUp();
    // Add assertions for sign up screen
  });
});
