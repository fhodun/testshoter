import inquirier from 'inquirer';
import validator from 'validator';
import { initDiscordClient } from './discord';
import { TestURL, validateTestURL } from './misc';
import { getQuestions } from './testportal';

const init = async () => {
  const discordClient = await initDiscordClient();
};

const getTestURLFromUserInput = async (): Promise<TestURL> => {
  const { testURL } = await inquirier.prompt<{ testURL: string }>([
    {
      type: 'input',
      name: 'testURL',
    },
  ]);
  try {
    const valid = validateTestURL(testURL);
    if (valid.err) throw valid.err;
    return valid;
  } catch (e) {
    console.log(e.message);
    return getTestURLFromUserInput();
  }
};

const initStandalone = async () => {
  console.log("Starting in standalone mode, discord client won't run");

  while (true) {
    const testURL = await getTestURLFromUserInput();
    for await (const question of getQuestions(testURL)) {
      // console.log(question);
    }
  }
};

const standaloneMode =
  process.argv.includes('--standalone') || process.argv.includes('-standalone');
standaloneMode ? initStandalone() : init();
