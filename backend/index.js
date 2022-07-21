const puppeteer = require("puppeteer-extra");
const Xvfb = require("xvfb");
const fs = require("fs");
const StealthPlugin = require("puppeteer-extra-plugin-stealth");
puppeteer.use(StealthPlugin());
const express = require("express");
const app = express();
const port = 3000;

(async () => {
  var xvfb = new Xvfb({
    silent: true,
    xvfb_args: ["-screen", "0", "1280x720x24", "-ac"],
  });
  xvfb.start((err) => {
    if (err) console.error(err);
  });
  const browser = await puppeteer.launch({
    headless: true,
    defaultViewport: null, //otherwise it defaults to 800x600
    args: ["--no-sandbox", "--start-fullscreen", "--display=" + xvfb._display],
  });

  try {
    console.log("APP: Starting...");
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(
      `https://www.ticketmaster.com/1st-round-mens-womens-flushing-new-york-08-29-2022/event/1D005C67D2C724AE`
    );
    await page
      .waitForSelector(".modal-dialog__button.button", {
        visible: true,
        timeout: 90000,
      })
      .then(() => console.log("Clicking modal button..."));

    await page
      .click(".modal-dialog__button.button")
      .then(() => console.log("Clicked!"))
      .then(() => console.log("Grabbing seats..."));

    const grabTickets = await page.evaluate(() => {
      const ticketList = document.querySelectorAll(".quick-picks__item-desc");
      let tickets = [];
      ticketList.forEach((tag) => {
        tickets.push(tag.innerText);
      });
      return tickets;
    });

    await page.screenshot({ path: "event.png", fullPage: true });
    console.log(`Seats grabbed: ${grabTickets}`);
    fs.writeFile("./seats.json", JSON.stringify(grabTickets), (err) =>
      err ? console.log(err) : null
    );

    await browser.close();
    xvfb.stop();
  } catch (error) {
    console.log(error);
  }
})();

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log(`Express: Listening on port: ${3000}`);
});
