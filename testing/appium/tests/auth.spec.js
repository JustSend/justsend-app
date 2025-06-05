const { describe, it, beforeEach } = require('mocha');
const { expect } = require('chai');
const { $, driver } = require('@wdio/globals');

describe('Authentication Flow', () => {
  beforeEach(async () => {
    // Wait for app to load
    await driver.pause(2000);
  });

  it('should show login form', async () => {
    // Check for email input
    const emailInput = await $('~email-input');
    await expect(emailInput).toBeDisplayed();

    // Check for password input
    const passwordInput = await $('~password-input');
    await expect(passwordInput).toBeDisplayed();

    // Check for login button
    const loginButton = await $('~login-button');
    await expect(loginButton).toBeDisplayed();
  });

  it('should handle login with valid credentials', async () => {
    const emailInput = await $('~email-input');
    const passwordInput = await $('~password-input');
    const loginButton = await $('~login-button');

    // Type credentials
    await emailInput.setValue(process.env.TEST_USER_EMAIL);
    await passwordInput.setValue(process.env.TEST_USER_PASSWORD);
    await loginButton.click();

    // Wait for authentication
    await driver.pause(2000);

    // Check if we're logged in
    const homeScreen = await $('~home-screen');
    await expect(homeScreen).toBeDisplayed();
  });

  it('should show error with invalid credentials', async () => {
    const emailInput = await $('~email-input');
    const passwordInput = await $('~password-input');
    const loginButton = await $('~login-button');

    // Type invalid credentials
    await emailInput.setValue('invalid@email.com');
    await passwordInput.setValue('wrongpassword');
    await loginButton.click();

    // Check for error message
    const errorMessage = await $('~error-message');
    await expect(errorMessage).toBeDisplayed();
  });
});
