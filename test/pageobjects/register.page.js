const { $, browser } = require('@wdio/globals');

class RegisterPage {
  get emailInput() {
    return $('android=new UiSelector().resourceId("Email Input")');
  }

  get passwordInput() {
    return $('android=new UiSelector().resourceId("Password Input")');
  }

  get registerButton() {
    return $('android=new UiSelector().resourceId("Register Button")');
  }

  get signInButton() {
    return $('android=new UiSelector().resourceId("Sign In Button")');
  }

  get title() {
    return $('android=new UiSelector().textContains("Join JustSend")');
  }

  get subtitle() {
    return $('android=new UiSelector().textContains("Join JustSend")');
  }

  get errorMessage() {
    return $('android=new UiSelector().resourceId("Error Message")');
  }

  get successToast() {
    return $(
      'android=new UiSelector().textContains("Registration successful")'
    );
  }

  get errorToast() {
    return $('android=new UiSelector().textContains("Registration Failed")');
  }

  // Navigation elements (from login page)
  get createAccountButton() {
    return $('android=new UiSelector().resourceId("Sign Up")');
  }

  // Login page elements (for redirect detection)
  get loginTitle() {
    return $('android=new UiSelector().text("Welcome Back")');
  }

  get loginEmailInput() {
    return $('android=new UiSelector().resourceId("Email Input")');
  }

  async register(email, password) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.registerButton.click();
  }

  async open() {
    console.log('🔄 Navigating to register page...');

    try {
      await this.title.waitForDisplayed({ timeout: 2000 });
      return;
    } catch (error) {
      console.log('📱 Not on register page, attempting navigation...');
    }

    // Check if we're on login page (after successful registration)
    try {
      await this.loginTitle.waitForDisplayed({ timeout: 2000 });
      console.log('📱 Currently on login page, navigating to register...');
      await this.createAccountButton.click();
      console.log('✅ Navigated to register page via Create Account button');
      await browser.pause(1000);
    } catch (error) {
      console.log('⚠️  Not on login page, trying other navigation...');

      // Try to navigate from login page
      try {
        await this.createAccountButton.click();
        console.log('✅ Navigated to register page via Create Account button');
        await browser.pause(1000);
      } catch (secondError) {
        console.log(
          '⚠️  Could not find Create Account button, assuming already on register page'
        );
      }
    }

    // Wait for register page to load
    await browser.pause(1000);

    // Verify we're on register page
    try {
      await this.title.waitForDisplayed({ timeout: 3000 });
      console.log('✅ Successfully on register page');
    } catch (error) {
      console.log('❌ Could not verify register page loaded');
    }
  }

  async clearInputs() {
    await this.emailInput.setValue('');
    await this.passwordInput.setValue('');
  }

  async waitForSuccessToast() {
    await this.successToast.waitForDisplayed({ timeout: 5000 });
  }

  async waitForErrorToast() {
    await this.errorToast.waitForDisplayed({ timeout: 5000 });
  }

  async waitForRedirectToLogin() {
    try {
      await this.loginTitle.waitForDisplayed({ timeout: 5000 });
      console.log('✅ Successfully redirected to login page');
      return true;
    } catch (error) {
      console.log('❌ No redirect to login page detected');
      return false;
    }
  }
}

module.exports = new RegisterPage();
