class LoginPage {
  // Selectors
  get emailInput() {
    return $('~Email Input');
  }
  get passwordInput() {
    return $('~Password Input');
  }
  get loginButton() {
    return $('~Login Button');
  }
  get forgotPasswordButton() {
    return $('~Forgot Password');
  }
  get signUpButton() {
    return $('~Sign Up');
  }
  get errorMessage() {
    return $('~Error Message');
  }

  // Actions
  async waitForLoad() {
    await this.emailInput.waitForDisplayed();
  }

  async login(email: string, password: string) {
    await this.emailInput.setValue(email);
    await this.passwordInput.setValue(password);
    await this.loginButton.click();
  }

  async clickForgotPassword() {
    await this.forgotPasswordButton.click();
  }

  async clickSignUp() {
    await this.signUpButton.click();
  }

  async getErrorMessage() {
    return await this.errorMessage.getText();
  }

  async isErrorMessageDisplayed() {
    return await this.errorMessage.isDisplayed();
  }

  async clearInputs() {
    await this.emailInput.clearValue();
    await this.passwordInput.clearValue();
  }
}

export default new LoginPage();
