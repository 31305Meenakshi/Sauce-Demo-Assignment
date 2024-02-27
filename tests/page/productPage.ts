import { expect, type Locator, type Page } from "@playwright/test";

export class Product {
  private page: any;
  private logo: any;
  private productsort: any;
  private productName: any;
  private addToCartButton: any;
  private removeButton: any;
  private assert: any;

  constructor(page) {
    this.page = page;
    this.productsort = page.locator("select[class='product_sort_container']");
    this.logo = page.locator("body>div:nth-child(1)");
    this.productName = page.locator('div[class="inventory_item_name"]');
    this.addToCartButton = page.locator(
      'button[class="btn_primary btn_inventory"]'
    );
    this.removeButton = page.locator(
      'button[class="btn_secondary btn_inventory"]'
    );
    this.assert = page.locator(
      "span[class='fa-layers-counter shopping_cart_badge']"
    );
  }
  async productPage1(alphabate, productName1) {
    await expect(this.logo).toHaveClass("page_wrapper");
    await this.productsort.selectOption(alphabate);
    for (let i = 0; i < (await this.productName.count()); i++) {
      if ((await this.productName.nth(i).textContent()) == productName1) {
        await this.addToCartButton.nth(i).click();
        break;
      }
    }
    await expect(this.assert).toHaveText("1");
  }
  async productPage2(productName2) {
    await expect(this.logo).toHaveClass("page_wrapper");
    for (let i = 0; i < (await this.productName.count()); i++) {
      if ((await this.productName.nth(i).textContent()) == productName2) {
        await this.addToCartButton.nth(i).click();
        break;
      }
    }
    await expect(this.assert).toHaveText("2");

    for (let i = 0; i < (await this.productName.count()); i++) {
      if ((await this.productName.nth(i).textContent()) == productName2) {
        await this.removeButton.nth(i).click();
        break;
      }
    }
    await expect(this.assert).toHaveText("1");
  }
}
