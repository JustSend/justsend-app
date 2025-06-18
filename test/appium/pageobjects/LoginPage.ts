import { $ } from '@wdio/globals';

class LoginPage {
  emailInput() {
    return $('android=new UiSelector().resourceId("email")');
  }

  passwordInput() {
    return $('android=new UiSelector().resourceId("password")');
  }

  loginButton() {
    return $('android=new UiSelector().resourceId("login")');
  }

  async login(email: string, password: string) {
    await this.emailInput().setValue(email);
    await this.passwordInput().setValue(password);
    await this.loginButton().click();
  }

  async clearInputs() {
    await this.emailInput().clearValue();
    await this.passwordInput().clearValue();
  }
}

export default LoginPage;
