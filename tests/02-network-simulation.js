const puppeteer = require("puppeteer");
const expect = require("chai").expect;

const APP_URL = "https://rmkanda.github.io/sample-pwa/";

describe("Network Simulation", async () => {
  //TODO: add assertion
  it("Network/CPU Emulation for slow 3G", async () => {
    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    const client = await page.target().createCDPSession();
    const slow3G = {
      offline: false,
      // Download speed (512 kbps)
      downloadThroughput: ((500 * 1024) / 8) * 0.8,
      // Upload speed (512 kbps)
      uploadThroughput: ((500 * 1024) / 8) * 0.8,
      // Latency 2000 (ms)
      latency: 400 * 5,
    };
    await client.send("Network.enable");
    await client.send("Network.emulateNetworkConditions", slow3G);
    await client.send("Emulation.setCPUThrottlingRate", { rate: 4 });
    await page.goto(APP_URL);
    await browser.close();
  });
});
