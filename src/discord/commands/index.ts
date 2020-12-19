import { checkNewestVersion } from '@/services/misc';
import { embedMessage } from '../misc';
import { Command, CommandHandler } from '../types';

export const onGetQuestions: CommandHandler = async (cmd) => {
  const testURL = cmd.args[0];
  if (!testURL) throw new Error('Test URL is not defined');
  if (!validator.isURL(testURL))
    return embedMessage(
      cmd.msg,
      'Wrong URL',
      'You entered the wrong testportal link, \n here an example `!test (testportal_test_link)`',
    );

  // embedMessage(
  //   message,
  //   'Screenshoting start',
  //   'This may take a while, please be patient',
  // );
  // getQuestions(message, test_link);
};

export const onImportant: CommandHandler = async (cmd) => {
  switch (cmd.command) {
    case 'important':
      embedMessage(
        cmd.msg,
        'Important',
        'The most important informations: \n' +
          ' - the bot **does not send the answers** to the tests, only the content of the questions and answers\n' +
          ' - the bot **is not invisible**, the teacher sees it as an empty field in the results, but if it is not familiar with technology, it will not understand that, example https://i.imgur.com/B9fE0gP.png\n' +
          ' - if there is an **open** question in the test, the answer to which is **required**, the bot will stop\n',
      );
    case 'wazne':
      embedMessage(
        cmd.msg,
        'Ważne',
        'Najważniejsze informacje: \n' +
          ' - bot **nie wysyła odpowiedzi** do testów, tylko treści pytań i odpowiedzi\n' +
          ' - bot **nie jest niewidzialny**, nauczyciel widzi go w wynikach jako puste pole lecz jeżeli nie ogarnia to się nie skapnie, przykład https://i.imgur.com/B9fE0gP.png\n' +
          ' - jeżeli w teście istnieje pytanie **otwarte**, na które odpowiedź jest **wymagana** to bot się zatrzyma\n',
      );
    default:
      throw new Error('Unsupported languague');
  }
};

export const onShowHelp = async (cmd: Command) => {
  embedMessage(
    cmd.msg,
    'Testshots commands help',
    '**Commands: **\n' +
      ':white_check_mark: `' +
      `${prefix}` +
      'test (testportal_test_link)` testportal test screenshoting start\n' +
      ':new: `' +
      `${prefix}` +
      'version` check the bot is up to date\n' +
      ':label: `' +
      `${prefix}` +
      'help` grants help\n' +
      ':bangbang: `' +
      `${prefix}` +
      'important` displays the most important informations\n' +
      ':flag_pl: `' +
      `${prefix}` +
      'wazne` displays the most important informations in Polish\n' +
      '\n**:busts_in_silhouette: Support server: **\n' +
      'https://discord.gg/TWRwsnMzD9 ',
  );
};

export const onCheckUpdates = async (cmd: Command) => {
  const version = await checkNewestVersion();
  const runningVersion = process.env.npm_package_version;

  if (version === runningVersion)
    embedMessage(
      cmd.msg,
      'Version',
      ':tada: Your bot has the latest version of the program :tada:',
    );
  else
    embedMessage(
      cmd.msg,
      'Version',
      ':sob: Your bot does not have the latest version of the program :sob:',
    );
};
