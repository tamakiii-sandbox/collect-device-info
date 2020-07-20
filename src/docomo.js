const puppeteer = require('puppeteer-core');

(async () => {
  const browser = await puppeteer.launch({
    executablePath: "/usr/bin/chromium",
    args: [
      '--headless',
      '--disable-gpu',
      '--remote-debugging-port=9222',
      '--no-sandbox',
      '--unhandled-rejections=strict',
      '--lang=ja-jp,jp',
    ]
  });
  const page = await browser.newPage();
  await page.goto('https://spec.nttdocomo.co.jp/spmss/');

  const links = await page.evaluate(() => {
    return Array.from(document.querySelectorAll("#season > div > div > table > tbody > tr > td > ul > li > a"))
      .map(a => ({
        href: a.href,
      }));
  });

  const results = await Promise.all(links.map(async link => {
    await page.goto(link.href);
    return await page.evaluate(() => ({
      name: document.querySelector('#spec h1').innerText,
      data: Array.from(document.querySelectorAll(`#spec > div > div > div > .detail[label]`)).map(detail => {
        const h3s = detail.querySelectorAll('h3');
        const tables = detail.querySelectorAll('div.spec.mb20 table');
        return {
          label: detail.getAttribute('label'),
          title: detail.querySelector('h2').innerText.trim(),
          rows: Array.from(h3s).map((h3) => ({
            index: Array.from(h3s).indexOf(h3),
            name: h3.innerText.trim(),
            body: Array.from(Array.from(tables)[Array.from(h3s).indexOf(h3)].querySelectorAll('tr')).map(tr => ({
              key: tr.querySelector('th').innerText.trim(),
              value: tr.querySelector('td').innerText.trim(),
            })),
          })),
        };
      })
    }))
  }))

  await browser.close();

  console.log(JSON.stringify(results));
})();
