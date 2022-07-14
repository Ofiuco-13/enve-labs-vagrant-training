const puppeteer = require("puppeteer");
const Xvfb = require("xvfb");

(async () => {
  var xvfb = new Xvfb({
    silent: true,
    xvfb_args: ["-screen", "0", "1280x720x24", "-ac"],
  });
  xvfb.start((err) => {
    if (err) console.error(err);
  });
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null, //otherwise it defaults to 800x600
    args: ["--no-sandbox", "--start-fullscreen", "--display=" + xvfb._display],
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(`https://www.wildriftfire.com/tier-list`);
  await page.screenshot({ path: "result.png", fullPage: true });
  await browser.close();
  xvfb.stop();
})();
