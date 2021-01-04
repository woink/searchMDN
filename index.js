const puppeteer = require('puppeteer');

(async () => {
	const browser = await puppeteer.launch({ headless: false });
	const page = await browser.newPage();
	await page.goto('https://developer.mozilla.org/en-US/');
  await page.type('#main-q', 'splice()');
  await page.keyboard.down('Enter')

  
})();
