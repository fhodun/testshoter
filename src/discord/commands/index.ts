import { checkNewestVersion, validateTestURL } from '@/misc';
import { getQuestions } from '@/testportal';
import { embedMessage } from '../misc';
import { Command, CommandHandler } from '../types';

// Duplicated from ../index.ts, maybe fix
const commandPrefix = process.env.COMMAND_PREFIX;
if (!commandPrefix)
  throw new Error(
    "COMMAND_PREFIX is not defined in .env, default value is '>'",
  );

export const onGetQuestions: CommandHandler = async (cmd) => {
  const testURL = cmd.args[0];
  if (!testURL) throw new Error('Test URL is not defined');
  const url = validateTestURL(testURL);
  if (url.err) {
    return embedMessage(
      cmd.msg,
      'Wrong URL',
      `${url.err.message}\nhere an example ${'`!test (testportal_test_link)`'}`,
    );
  }
  for await (const screenshot of getQuestions(url)) {
    await cmd.msg.channel.send(`We got screenshot of question!`, {
      files: [screenshot.image],
    });
  }

  // embedMessage(
  //   message,
  //   'Screenshotting start',
  //   'This may take a while, please be patient',
  // );
  // getQuestions(message, test_link);
};

export const onImportant: CommandHandler = async (cmd) => {
  switch (cmd.command) {
    case 'important':
      await embedMessage(
          cmd.msg,
          'Important',
          'The most important informations: \n' +
          ' - the bot **does not send the answers** to the tests, only the content of the questions and answers\n' +
          ' - the bot **is not invisible**, the teacher sees it as an empty field in the results, but if it is not familiar with technology, it will not understand that, example https://i.imgur.com/B9fE0gP.png\n' +
          ' - if there is an **open** question in the test, the answer to which is **required**, the bot will stop\n',
      );
      break;
    case 'wazne':
      await embedMessage(
          cmd.msg,
          'Ważne',
          'Najważniejsze informacje: \n' +
          ' - bot **nie wysyła odpowiedzi** do testów, tylko treści pytań i odpowiedzi\n' +
          ' - bot **nie jest niewidzialny**, nauczyciel widzi go w wynikach jako puste pole lecz jeżeli nie ogarnia to się nie skapnie, przykład https://i.imgur.com/B9fE0gP.png\n' +
          ' - jeżeli w teście istnieje pytanie **otwarte**, na które odpowiedź jest **wymagana** to bot się zatrzyma\n',
      );
      break;
    default:
      throw new Error('Unsupported language');
  }
};

export const onShowHelp = async (cmd: Command) => {
  await embedMessage(
      cmd.msg,
      'Testshots commands help',
      '**Commands: **\n' +
      ':white_check_mark: `' +
      `${commandPrefix}` +
      'test (testportal_test_link)` testportal test screenshotting start\n' +
      ':new: `' +
      `${commandPrefix}` +
      'version` check the bot is up to date\n' +
      ':label: `' +
      `${commandPrefix}` +
      'help` grants help\n' +
      ':bangbang: `' +
      `${commandPrefix}` +
      'important` displays the most important informations\n' +
      ':flag_pl: `' +
      `${commandPrefix}` +
      'wazne` displays the most important informations in Polish\n' +
      '\n**:busts_in_silhouette: Support server: **\n' +
      'https://discord.gg/TWRwsnMzD9 ',
  );
};

export const onCheckUpdates = async (cmd: Command) => {
  const version = await checkNewestVersion();
  const runningVersion = process.env.npm_package_version;

  if (version === runningVersion)
    await embedMessage(
        cmd.msg,
        'Version',
        ':tada: Your bot has the latest version of the program :tada:',
    );
  else
    await embedMessage(
        cmd.msg,
        'Version',
        ':sob: Your bot does not have the latest version of the program :sob:',
    );
};
