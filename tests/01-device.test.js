const puppeteer = require("puppeteer");
const expect = require("chai").expect;

const APP_URL = "https://rmkanda.github.io/sample-pwa/";

describe("Device Compatablity", async () => {
  it("Test against custom screen resolution", async () => {
    const browser = await puppeteer.launch({
      headless: true,
      //   args: ["--window-size=540,720"],
    });
    const page = await browser.newPage();
    await page.setViewport({
      width: 540,
      height: 720,
    });
    await page.goto(APP_URL);
    const element = await page.$("#displayDimen");
    const content = await page.evaluate(
      (element) => element.textContent,
      element
    );
    expect(content).to.be.contains("Width: 540");
    expect(content).to.be.contains("Height: 720");
    await browser.close();
  });

  it("Device emulation - iPhone", async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.goto(APP_URL);
    await page.emulate(puppeteer.devices["iPhone X"]);
    const element = await page.$("#browserInfo");
    const content = await page.evaluate(
      (element) => element.textContent,
      element
    );
    expect(content).to.be.contains("Browser: Safari");
    await browser.close();
  });

  it("Device emulation on Landscape", async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    await page.emulate(puppeteer.devices["iPhone X landscape"]);
    await page.goto(APP_URL);
    const element = await page.$("#displayDimen");
    const content = await page.evaluate(
      (element) => element.textContent,
      element
    );
    expect(content).to.be.contains("Orientation: landscape-primary");
    await browser.close();
  });
});
