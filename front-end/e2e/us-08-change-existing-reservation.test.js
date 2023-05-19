const puppeteer = require("puppeteer");
const { setDefaultOptions } = require("expect-puppeteer");
const fs = require("fs");
const fsPromises = fs.promises;

const { createReservation } = require("./api");

const baseURL = process.env.BASE_URL || "http://localhost:3000";

const onPageConsole = (msg) =>
  Promise.all(msg.args().map((event) => event.jsonValue())).then((eventJson) =>
    console.log(`<LOG::page console ${msg.type()}>`, ...eventJson)
  );

describe("US-08 - Change an existing reservation - E2E", () => {
  let page;
  let browser;
  let reservation;

  const dashboardTestPath = `${baseURL}/dashboard?date=2035-01-04`;

  beforeAll(async () => {
    await fsPromises.mkdir("./.screenshots", { recursive: true });
    setDefaultOptions({ timeout: 1000 });
    browser = await puppeteer.launch();
  });

  beforeEach(async () => {
    reservation = await createReservation({
      first_name: "Change",
      last_name: Date.now().toString(10),
      mobile_number: "800-555-1616",
      reservation_date: "2035-01-04",
      reservation_time: "14:00",
      people: 4,
    });
    page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    page.on("console", onPageConsole);
  });

  afterAll(async () => {
    await browser.close();
  });

  describe("/dashboard page", () => {
    beforeEach(async () => {
      await page.goto(dashboardTestPath, {
        waitUntil: "networkidle0",
      });
    });
    console.log("1");

    describe("reservation edit link", () => {
      test("goes to the /reservations/:reservation_id/edit page", async () => {
        await page.screenshot({
          path: ".screenshots/us-08-dashboard-edit-click-before.png",
          fullPage: true,
        });
        console.log("2");

        const hrefSelector = `[href="/reservations/${reservation.reservation_id}/edit"]`;
        await page.waitForSelector(hrefSelector);
        console.log("3");

        await page.screenshot({
          path: ".screenshots/us-08-dashboard-edit-click-after-no-change-expected.png",
          fullPage: true,
        });
        console.log("4");

        expect(await page.$(hrefSelector)).toBeDefined();
      });
    });
    console.log("5");

    describe("clicking the reservation cancel button", () => {
      test("then clicking OK removes the reservation", async () => {
        await page.screenshot({
          path: ".screenshots/us-08-cancel-reservation-before.png",
          fullPage: true,
        });
        console.log("6");

        const cancelButtonSelector = `[data-reservation-id-cancel="${reservation.reservation_id}"]`;
        console.log("7");

        const cancelButton = await page.$(cancelButtonSelector);
        console.log("8");

        if (!cancelButton) {
          throw new Error(
            `Cancel button for reservation_id ${reservation.reservation_id} was not found.`
          );
        }
        console.log("9");

        page.on("dialog", async (dialog) => {
          expect(dialog.message()).toContain(
            "Do you want to cancel this reservation?"
          );
          await dialog.accept();
        });
        console.log("10");

        await cancelButton.click();
        console.log("11");

        await page.waitForResponse((response) => {
          return response.url().includes("/reservations?date=");
        });
        console.log("12");

        await page.waitForTimeout(500);
        console.log("1");

        expect(await page.$(cancelButtonSelector)).toBeNull();
      });
      console.log("13");

      test("then clicking cancel makes no changes", async () => {
        await page.screenshot({
          path: ".screenshots/us-08-dont-cancel-reservation-before.png",
          fullPage: true,
        });
        console.log("126");

        const cancelButtonSelector = `[data-reservation-id-cancel="${reservation.reservation_id}"]`;

        const cancelButton = await page.$(cancelButtonSelector);
        console.log("131");

        if (!cancelButton) {
          throw new Error("button containing cancel not found.");
        }

        page.on("dialog", async (dialog) => {
          await dialog.dismiss();
        });
        console.log("140");

        await cancelButton.click();
        console.log("143");

        await page.screenshot({
          path: ".screenshots/us-08-dont-cancel-reservation-after.png",
          fullPage: true,
        });
        console.log("149");

        expect(await page.$(cancelButtonSelector)).not.toBeNull();
        console.log("152");
      });
    });
  });

  describe("/reservations/:reservation_id/edit page", () => {
    beforeEach(async () => {
      await page.goto(`${baseURL}/dashboard`, {
        waitUntil: "networkidle0",
      });
      console.log("162");
      await page.goto(
        `${baseURL}/reservations/${reservation.reservation_id}/edit`,
        {
          waitUntil: "networkidle0",
        }
      );
    });
    console.log("170");

    test("canceling form returns to the previous page", async () => {
      const [cancelButton] = await page.$x(
        "//button[contains(translate(., 'ACDEFGHIJKLMNOPQRSTUVWXYZ', 'acdefghijklmnopqrstuvwxyz'), 'cancel')]"
      );
      console.log("176");

      if (!cancelButton) {
        throw new Error("button containing cancel not found.");
      }

      await page.screenshot({
        path: ".screenshots/us-08-edit-reservation-cancel-before.png",
        fullPage: true,
      });
      console.log("186");

      await Promise.all([
        cancelButton.click(),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);
      console.log("192");

      await page.screenshot({
        path: ".screenshots/us-08-edit-reservation-cancel-after.png",
        fullPage: true,
      });
      console.log("198");

      expect(page.url()).toContain("/dashboard");
    });

    test("filling and submitting form updates the reservation", async () => {
      const firstNameInput = await page.$("input[name=first_name]");
      await firstNameInput.click({ clickCount: 3 });
      await firstNameInput.type("John");

      const [submitButton] = await page.$x(
        "//button[contains(translate(., 'ACDEFGHIJKLMNOPQRSTUVWXYZ', 'acdefghijklmnopqrstuvwxyz'), 'submit')]"
      );
      console.log("211");

      if (!submitButton) {
        throw new Error("button containing submit not found.");
      }

      await page.screenshot({
        path: ".screenshots/us-08-edit-reservation-submit-before.png",
        fullPage: true,
      });
      console.log("221");

      await Promise.all([
        submitButton.click(),
        page.waitForNavigation({ waitUntil: "networkidle0" }),
      ]);
      console.log("227");

      expect(page.url()).toContain("/dashboard");

      await page.screenshot({
        path: ".screenshots/us-08-edit-reservation-submit-after.png",
        fullPage: true,
      });
      console.log("235");

      await expect(page).toMatch(/John/);
      console.log("238");
    });
  });
});
