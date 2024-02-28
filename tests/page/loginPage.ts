import { expect, type Locator, type Page } from "@playwright/test";
import { Excel } from "../excel/writeInExcel";

export class Login {
  private page: any;
  private username: any;
  private password: any;
  private logo: any;
  private login: any;
  private menu: any;
  private logout: any;
  private errorMessageAssert: any;
  private errorButton: any;
  readonly excel = new Excel();
  constructor(page) {
    this.page = page;
    this.username = page.locator("input[placeholder='Username']");
    this.password = page.locator("input[placeholder='Password']");
    this.logo = page.locator("body>div:nth-child(1)");
    this.login = page.locator('input[id="login-button"]');
    this.menu = page.locator('button:text("Open Menu")');
    this.logout = page.locator('a:text("Logout")');
    this.errorMessageAssert = page.locator("h3[data-test='error']");
    this.errorButton = page.locator("button[class='error-button']");
  }
  async loginPage(username: string, password: string) {
    expect(this.logo).toHaveClass("login_logo");
    await this.excel.exTest("login", "Login-Details", 1, username, 2, password);
    await this.username.fill(username);
    await this.password.fill(password);
    await this.login.click();
  }

  async loginWithInvalidData() {
    await expect(this.errorMessageAssert).toHaveText(
      "Epic sadface: Username and password do not match any user in this service"
    );
    await this.errorButton.click();
  }
  async logoutPage() {
    await this.menu.click();
    await this.logout.click();
  }
}
