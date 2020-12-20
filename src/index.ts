import inquirier from 'inquirer';
import validator from 'validator';
import { initDiscordClient } from './discord';
import { validateTestURL } from './misc';
import { getQuestions } from './testportal';

const init = async () => {
  const discordClient = await initDiscordClient();
};

const getTestURLFromUserInput = async (): Promise<URL> => {
  const { testURL } = await inquirier.prompt<{ testURL: string }>([
    {
      type: 'input',
      name: 'testURL',
    },
  ]);
  try {
    const valid = validateTestURL(testURL);
    if (valid.err) throw valid.err;
    return valid.url;
  } catch (e) {
    console.log(e.message);
    return getTestURLFromUserInput();
  }
};

const initStandalone = async () => {
  console.log("Starting in standalone mode, discord client won't run");
  const testURL = await getTestURLFromUserInput();
  getQuestions(testURL);
};

const standaloneMode =
  process.argv.includes('--standalone') || process.argv.includes('-standalone');
standaloneMode ? initStandalone() : init();
