import { test, expect } from "@playwright/test";
import data from "../Data/firstData.json";
import { Login } from "../page/loginPage";
import { Cart } from "../page/addToCart";
import { Product } from "../page/productPage";
import * as logger from "../../logger";
import fs from "fs";
import { parse } from "csv-parse/sync";
test.describe("sauceLab", () => {
  let page;
  let context;
  let addtoCart;
  let login;
  let product;
  //store CSV data in variable
  const records = parse(
    fs.readFileSync(
      "C:/Users/meenakshi.sahu/Downloads/typeScript/tests/data/user.csv"
    ),
    {
      columns: true,
      skip_empty_lines: true,
    }
  );

  test.beforeAll("OpenWeb", async ({ browser }) => {
    context = await browser.newContext();
    page = await context.newPage();
    addtoCart = new Cart(page);
    login = new Login(page);
    product = new Product(page);
  });
  for (const record of records) {
    test.beforeEach(async () => {
      await page.goto("https://www.saucedemo.com/v1/index.html");
      await login.loginPage(record.username, record.password);
      await product.productPage1(data.alphabate, data.productName1);
    });
  }
  test.afterEach(async () => {
    await login.logoutPage();
  });
  test("positivetest", async () => {
    try {
      await addtoCart.addToCartPage();
      await logger.Logger.info("Completed");
    } catch (e: any) {
      await logger.Logger.error("Found Error");
    }
  });
});
