const puppeteer = require('puppeteer');
const chalk = require('chalk');
const inquirer = require('inquirer')

const start = () => {
  inquirer.prompt({
    type: 'input',
    name: 'userInput',
    message: 'Enter Array method'
  })
    .then(res => getResults(res.userInput))
}

async function getResults(term) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://developer.mozilla.org/en-US/search?locale=en-US');
	await page.type('#main-q', `Array.prototype.${term}`);
	await page.keyboard.down('Enter');
	await page.waitForSelector('.result');
	const resultUrl = await page.evaluate(() => {
    const topResult = document.querySelector('.result-title');
		return topResult.href;
	});

	await page.goto(resultUrl);
	await page.waitForSelector('p');
	const desc = await page.evaluate(() => {
    const itemDesc = document.querySelector('p');
		return itemDesc.innerText;
	});

	console.log(chalk.magentaBright(desc));
	console.log(chalk.underline.dim(resultUrl));

	browser.close();
}

start()
