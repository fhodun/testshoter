import { TestURL } from '@/misc';
import puppeteer from 'puppeteer';

// Max answers per test, used to avoid endless loop
const ANSWER_LIMIT = 200;

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

const submitAnswer = (page: puppeteer.Page) => {
  return page.$eval(
    '#questionForm > div > div.test_button_box.section > a',
    (e) => {
      if (!(e instanceof HTMLElement))
        throw new Error('Submit question button is invalid!');
      if (!e.onclick) throw new Error('Button does not have onclick property');
      e.onclick(new MouseEvent('click'));
    },
  );
};

const isQuestionPage = async (page: puppeteer.Page): Promise<boolean> => {
  return page.evaluate(() =>
    document.querySelector(
      '#questionForm > div > div.test_button_box.section > a',
    ),
  );
};

export async function* getQuestions(
  testURL: TestURL,
): AsyncGenerator<Buffer, void, void> {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox'],
    headless: false,
  });
  const page = await browser.newPage();
  await page.goto(testURL.url.href, { waitUntil: 'networkidle0' });
  await fillForm(page);
  await submitForm(page);
  for (let i = 0; i < ANSWER_LIMIT; i++) {
    await page.waitForNavigation({ waitUntil: 'networkidle2' });
    if (!(await isQuestionPage(page))) {
      console.log(`Completed test ID: ${testURL.testID}`);
      return;
    }
    console.log(`Screenshoting question ${i + 1}, ID: ${testURL.testID}`);
    const screenshot = await page.screenshot({ encoding: 'binary' });
    yield screenshot;

    submitAnswer(page);
  }
  await browser.close();
}
