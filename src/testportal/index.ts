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
          input.value = 'a@aa.aa';
          break;
        case 'text':
          if (input.name == 'Nr_w_dzienniku_number' || input.name == 'age')
          input.value = '0';
          else
          input.value = '‎';
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

interface QuestionScreenshot {
  image: Buffer;
  testID: string;
  question: number;
}

export async function* getQuestions(
  testURL: TestURL,
): AsyncGenerator<QuestionScreenshot, void, void> {
  const browser = await puppeteer.launch({
    args: ['--no-sandbox']
  });
  const page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
  await page.goto(testURL.url.href, { waitUntil: 'networkidle0' });
  await fillForm(page);
  await submitForm(page);
  await page.waitForNavigation({ waitUntil: 'load' });

  const questions = await page.$eval('.question_header_content', (el) => el.textContent);
  if(!questions) throw new Error("There was an error with retrieving questions amount data");
  const questionsAmount = parseInt(questions.slice(10));

  for (let i = 0; i < questionsAmount; i++) {
    if (i != 0) await page.waitForNavigation({ waitUntil: 'networkidle2' });
    const totalWidth = await page.evaluate(
      () => document.documentElement.offsetWidth
    );
    const totalHeight = await page.evaluate(
      () => document.documentElement.offsetHeight
    );
    await page.setViewport({
      width: totalWidth,
      height: totalHeight,
      deviceScaleFactor: 1,
    });
    console.log(`Screenshoting question ${i + 1}, TestID: ${testURL.testID}`);
    const image = await page.screenshot({ encoding: 'binary' });
    yield {
      image,
      testID: testURL.testID,
      question: i + 1,
    };
    submitAnswer(page);
  }
  console.log(`Completed test TestID: ${testURL.testID}`);
  await browser.close();
}
