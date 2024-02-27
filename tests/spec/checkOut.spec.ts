import { test, expect } from "@playwright/test";
import data from "../Data/firstData.json";
import data1 from "../Data/secondData.json";
import { Login } from "../page/loginPage";
import { CheckOut } from "../page/checkOut";
import { Product } from "../page/productPage";
import * as logger from "../../logger";
import fs from "fs";
import { parse } from "csv-parse/sync";
test.describe("sauceLab", () => {
  let page;
  let context;
  let checkOut;
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
    checkOut = new CheckOut(page);
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

  test("positiveTest", async () => {
    try {
      await checkOut.checkOutPage(data.firstName, data.lastName, data.zipCode);
      await logger.Logger.info("Completed");
    } catch (e: any) {
      await logger.Logger.error("Found Error");
    }
  });
  test("blankFirstNameTest", async () => {
    try {
      await checkOut.checkOutPage(data1.firstName, data.lastName, data.zipCode);
      await logger.Logger.info("Completed");
    } catch (e: any) {
      await logger.Logger.error("Found Error");
    }
  });
  test("blankLastNameTest", async () => {
    try {
      await checkOut.checkOutPage(data.firstName, data1.lastName, data.zipCode);
      await logger.Logger.info("Completed");
    } catch (e: any) {
      await logger.Logger.error("Found Error");
    }
  });
  test("blankZipCodeTest", async () => {
    try {
      await checkOut.checkOutPage(data.firstName, data.lastName, data1.zipCode);
      await logger.Logger.info("Completed");
    } catch (e: any) {
      await logger.Logger.error("Found Error");
    }
  });
});
