const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium",
    args: [
      '--headless',
      '--disable-gpu',
      '--remote-debugging-port=9222',
      '--no-sandbox',
      '--lang=ja-jp,jp',
    ]
  });
  const page = await browser.newPage();
  await page.goto('https://example.com');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
