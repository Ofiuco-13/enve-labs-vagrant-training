const puppeteer = require("puppeteer");
const Xvfb = require("xvfb");
const fs = require("fs");

console.log("Running...");

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

  try {
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(`https://www.wildriftfire.com/tier-list`);

    const grabChampions = await page.evaluate(() => {
      const tierList = document.querySelectorAll(
        ".wf-tier-list__tiers__block div a span"
      );
      let champions = [];
      tierList.forEach((tag) => {
        champions.push(tag.innerText);
      });
      return champions;
    });

    await page.screenshot({ path: "tierlist.png", fullPage: true });
    console.log(grabChampions);
    fs.writeFile("./recipes.json", JSON.stringify(grabChampions), (err) =>
      err ? console.log(err) : null
    );

    await browser.close();
    xvfb.stop();
  } catch (error) {
    console.log(error);
  }
})();
