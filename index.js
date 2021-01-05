const puppeteer = require('puppeteer');
const chalk = require('chalk');

  (async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://developer.mozilla.org/en-US/');
    await page.type('#main-q', 'splice()');
    await page.keyboard.down('Enter')
    await page.waitForSelector('.result')
    const result = await page.evaluate(() => {
      const topResult = document.querySelector('.result-title')
      return topResult.href
    })
    await page.goto(result)
    await page.waitForSelector('p')
    const desc = await page.evaluate(() => {
      const itemDesc = document.querySelector('p')
      return itemDesc.innerText
    })

    console.log(chalk.magentaBright(desc))
    console.log(chalk.underline.dim(result))

    browser.close()
  })();