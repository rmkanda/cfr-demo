const fs = require("fs");
const puppeteer = require("puppeteer");
const { expect } = require("chai");
const lighthouse = require("lighthouse");
const reportGenerator = require("lighthouse/lighthouse-core/report/report-generator");

const APP_URL = "https://rmkanda.github.io/sample-pwa/";

describe("Performance tests", async () => {
  it("Largest contentful paint", async () => {
    const browser = await puppeteer.launch({
      headless: true,
      args: [`--remote-debugging-port=${8042}`],
    });
    const lighthouseResult = await lighthouse(APP_URL, {
      port: 8042,
      disableStorageReset: true,
    });
    
    const lcpTime = lighthouseResult.lhr.audits["largest-contentful-paint"].displayValue

    console.log("Largest Contentful paint " , lcpTime)

    expect(parseInt(lcpTime)).to.lessThan(3)

    //Report
    const html = reportGenerator.generateReport(lighthouseResult.lhr, "html");
    fs.writeFile("LightHouseReport.html", html, (err) => {
      if (err) {
        console.error(err);
      }
    });

    await browser.close();
  });

  it('First Input Delay', async() => {
    const browser = await puppeteer.launch({
      headless: true,
      args: [`--remote-debugging-port=${8042}`],
    });
    const lighthouseResult = await lighthouse(APP_URL, {
      port: 8042,
      disableStorageReset: true,
    });

    const time_to_interactive =
    lighthouseResult.lhr.audits["interactive"].displayValue;

    console.log("First Input Delay" , time_to_interactive)

    expect(parseInt(time_to_interactive)).to.lessThan(3)
    
    //Report
    const html = reportGenerator.generateReport(lighthouseResult.lhr, "html");
    fs.writeFile("LightHouseReport.html", html, (err) => {
      if (err) {
        console.error(err);
      }
    });

    await browser.close();
      
  });

  it('Cumulative Layout Shift', async() => {
    const browser = await puppeteer.launch({
      headless: true,
      args: [`--remote-debugging-port=${8042}`],
    });
    const lighthouseResult = await lighthouse(APP_URL, {
      port: 8042,
      disableStorageReset: true,
    });

    const clsTime =
    lighthouseResult.lhr.audits["cumulative-layout-shift"].displayValue;

    console.log("Cumulative Layout Shift" , clsTime)

    expect(parseInt(clsTime)).to.lessThan(0.1)
    
    //Report
    const html = reportGenerator.generateReport(lighthouseResult.lhr, "html");
    fs.writeFile("LightHouseReport.html", html, (err) => {
      if (err) {
        console.error(err);
      }
    });

    await browser.close();
      
  });
});
