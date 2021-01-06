const puppeteer = require('puppeteer');
const chalk = require('chalk');
const inquirer = require('inquirer')

const startApp = () => {
  let term
  inquirer.prompt({
    type: 'input',
    name: 'userInput',
    message: 'Enter search term'
  })
    .then(res => {
      term = res.userInput
      getResults(term)
    })
}

async function getResults(term) {
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto('https://developer.mozilla.org/en-US/search?locale=en-US');
	await page.type('#main-q', `prototype.${term}`);
	await page.keyboard.down('Enter');
	await page.waitForSelector('.result');
	const resultUrl = await page.evaluate(() => {
		const topResult = document.querySelector('.result-title');
		return topResult.href;
	});

	await page.goto(result);
	await page.waitForSelector('p');
	const desc = await page.evaluate(() => {
		const itemDesc = document.querySelector('p');
		return itemDesc.innerText;
	});

	console.log(chalk.magentaBright(desc));
	console.log(chalk.underline.dim(resultUrl));

	browser.close();
}

startApp()