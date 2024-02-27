import { expect, type Locator, type Page } from "@playwright/test";

export class CheckOut {
  private page: any;
  private firstName: any;
  private lastName: any;
  private zipCode: any;
  private checkOut: any;
  private continue: any;
  private buyBox: any;
  private assertYourInfo: any;
  private finish: any;
  private errorMessageAssert: any;

  constructor(page) {
    this.page = page;
    this.buyBox = page.locator('path[fill="currentColor"]');
    this.checkOut = page.locator('a:text("CHECKOUT")');
    this.firstName = page.locator('input[id="first-name"]');
    this.lastName = page.locator('input[id="last-name"]');
    this.zipCode = page.locator('input[id="postal-code"]');
    this.continue = page.locator('input[class="btn_primary cart_button"]');
    this.assertYourInfo = page.locator('div[class="subheader"]');
    this.finish = page.locator('a[class="btn_action cart_button"]');
    this.errorMessageAssert = page.locator("h3[data-test='error']");
  }

  async checkOutPage(firstName: string, lastName: string, zipCode: string) {
    await this.buyBox.click();
    await this.checkOut.click();
    await expect(this.assertYourInfo).toHaveText("Checkout: Your Information");
    await this.firstName.fill(firstName);
    await expect(this.firstName).toHaveAttribute("value", firstName);
    await this.lastName.fill(lastName);
    await expect(this.lastName).toHaveAttribute("value", lastName);
    await this.zipCode.fill(zipCode);
    await expect(this.zipCode).toHaveAttribute("value", zipCode);
    await this.continue.click();
    if (firstName == "")
      await expect(this.errorMessageAssert).toHaveText(
        "Error: First Name is required"
      );
    else if (lastName == "")
      await expect(this.errorMessageAssert).toHaveText(
        "Error: Last Name is required"
      );
    else if (zipCode == "")
      await expect(this.errorMessageAssert).toHaveText(
        "Error: Postal Code is required"
      );
    else {
      await expect(this.assertYourInfo).toHaveText("Checkout: Overview");
      await this.finish.click();
    }
  }
}
