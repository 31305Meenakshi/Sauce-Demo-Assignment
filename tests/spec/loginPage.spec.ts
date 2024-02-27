import { test, expect } from "@playwright/test";
import data from "../Data/firstData.json";
import data1 from "../Data/secondData.json";
import { Login } from "../page/loginPage";
import * as logger from "../logger";
import fs from "fs";
import { parse } from "csv-parse/sync";
test.describe("sauceLab", () => {
  let page;
  let context;
  let login;

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
    login = new Login(page);
  });

  test.beforeEach(async () => {
    await page.goto("https://www.saucedemo.com/v1/index.html");
  });
  test.afterEach(async () => {
    await page.close();
  });
  //iterate over csv data
  for (const record of records) {
    test("positiveTest", async () => {
      try {
        await login.loginPage(record.username, record.password);
        await logger.Logger.info("Completed");
        await login.logoutPage();
      } catch (e: any) {
        await logger.Logger.error("Found Error");
      }
    });
  }
  test("negativeTest", async () => {
    try {
      await login.loginPage(data1.username, data1.password);
      await logger.Logger.info("Completed");
      await login.loginWithInvalidData();
    } catch (e: any) {
      await logger.Logger.error("Found Error");
    }
  });
});
