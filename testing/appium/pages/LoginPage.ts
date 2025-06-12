class LoginPage {
  // Selectors
  private get emailInput() {
    return $('~Email Input');
  }
  private get passwordInput() {
    return $('~Password Input');
  }
  private get loginButton() {
    return $('~Login Button');
  }
  private get forgotPasswordButton() {
    return $('~Forgot Password');
  }
  private get signUpButton() {
    return $('~Sign Up');
  }
  private get errorMessage() {
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
