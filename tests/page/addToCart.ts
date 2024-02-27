import { expect, type Locator, type Page } from "@playwright/test";

export class Cart {
  private page: any;
  private logo: any;
  private continueShopping: any;
  private buyBox: any;
  private checkOut: any;
  private assertYourCart: any;
  private assertQuantity: any;

  constructor(page) {
    this.page = page;
    this.logo = page.locator("body>div:nth-child(1)");
    this.continueShopping = page.locator('a[class="btn_secondary"]');
    this.buyBox = page.locator('path[fill="currentColor"]');
    this.checkOut = page.locator('a:text("CHECKOUT")');
    this.assertYourCart = page.locator('div[class="subheader"]');
    this.assertQuantity = page.locator('div[class="cart_quantity_label"]');
  }

  async addToCartPage() {
    await this.buyBox.click();
    await expect(this.logo).toHaveClass("page_wrapper");
    await this.continueShopping.click();
    await this.buyBox.click();
    await expect(this.assertYourCart).toHaveText("Your Cart");
    await this.checkOut.click();
    await this.buyBox.click();
    await expect(this.assertQuantity).toHaveText("QTY");
  }
}
