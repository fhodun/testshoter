import puppeteer from 'puppeteer';

const fillForm = (page: puppeteer.Page) => {
  return page.$$eval('input', (inputs) =>
    inputs.map((input) => {
      if (!(input instanceof HTMLInputElement)) return;
      switch (input.type) {
        case 'email':
          input.value = 'xyz@xyz.xyz';
          break;
        case 'text':
          input.value = Math.random().toString(16);
          break;
        case 'radio':
          input.checked = true;
          break;
      }
    }),
  );
};

const submitForm = (page: puppeteer.Page) => {
  return page.$eval('#start-form-submit', (e) => {
    if (!(e instanceof HTMLElement))
      throw new Error('Submit form button is invalid!');
    e.click();
  });
};

export const getQuestions = async (testURL: string) => {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(testURL, { waitUntil: 'networkidle0' });
  await fillForm(page);
  await submitForm(page);
  await page.waitForNavigation({ waitUntil: 'networkidle0' });
};
