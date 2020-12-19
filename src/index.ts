import inquirier from 'inquirer';
import validator from 'validator';
import { initDiscordClient } from './discord';
import { getQuestions } from './testportal';

const init = async () => {
  const discordClient = await initDiscordClient();
};

const getTestURLFromUserInput = async (): Promise<string> => {
  const { testURL } = await inquirier.prompt<{ testURL: string }>([
    {
      type: 'input',
      name: 'testURL',
    },
  ]);
  if (!validator.isURL(testURL)) return getTestURLFromUserInput();
  return testURL;
};

const initStandalone = async () => {
  console.log("Starting in standalone mode, discord client won't run");
  const testURL = await getTestURLFromUserInput();
  getQuestions(testURL);
};

const standaloneMode =
  process.argv.includes('--standalone') || process.argv.includes('-standalone');
standaloneMode ? initStandalone() : init();
