const puppeteer = require("puppeteer");
const fs = require("fs");
const formatData = require("./skiddleDataFormatter");
const URL = require("./link").default;

const fileName = "JSONDATA/mockData.json";

module.exports = async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto(URL);

  await page.content();

  const bodyHandle = await page.$("pre");
  const html = await page.evaluate(
    (body) => JSON.parse(body.innerHTML).results,
    bodyHandle
  );

  const formattedData = formatData(html);

  const stringData = JSON.stringify(formattedData);

  fs.writeFile(fileName, stringData, (err) => console.log(err));
  await bodyHandle.dispose();

  await browser.close();
  return formattedData;
};
