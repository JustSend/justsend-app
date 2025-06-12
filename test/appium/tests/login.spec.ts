import { describe, it } from 'mocha';
import { assert } from 'chai';
import LoginPage from '../pages/LoginPage';

describe('Login Screen', () => {
  beforeEach(async () => {
    await LoginPage.waitForLoad();
    await LoginPage.clearInputs();
  });

  it('should display login form', async () => {
    const isEmailDisplayed = await LoginPage.emailInput.isDisplayed();
    const isPasswordDisplayed = await LoginPage.passwordInput.isDisplayed();
    const isLoginButtonDisplayed = await LoginPage.loginButton.isDisplayed();

    assert.isTrue(isEmailDisplayed);
    assert.isTrue(isPasswordDisplayed);
    assert.isTrue(isLoginButtonDisplayed);
  });

  it('should show error with invalid credentials', async () => {
    await LoginPage.login('invalid@email.com', 'wrongpassword');
    const isErrorDisplayed = await LoginPage.isErrorMessageDisplayed();
    assert.isTrue(isErrorDisplayed);
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
