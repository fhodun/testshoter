import { Client } from 'discord.js';
import {
  onCheckUpdates,
  onGetQuestions,
  onImportant,
  onShowHelp,
} from './commands';
import { embedMessage } from './misc';
import { AvailableCommand } from './types';

const commandPrefix = process.env.COMMAND_PREFIX;
if (!commandPrefix)
  throw new Error(
    "COMMAND_PREFIX is not defined in .env, default value is '>'",
  );

export const commands: AvailableCommand[] = [
  {
    handler: onGetQuestions,
    triggers: ['test'],
  },
  {
    handler: onImportant,
    triggers: ['important'],
  },
  {
    handler: onShowHelp,
    triggers: ['help', 'pomoc'],
  },
  {
    handler: onCheckUpdates,
    triggers: ['update'],
  },
];

export const initDiscordClient = async () => {
  const discordToken = process.env.DISCORD_TOKEN;
  if (!discordToken) throw new Error('Unable to retrieve DISCORD_TOKEN from .env');

  const client = new Client();
  await client.login(discordToken);
  client.on('ready', () => { console.log(`Logged in!`); });

  client.on('message', async (msg) => {
    if (!msg.content.startsWith(commandPrefix) || msg.author.bot) return;

    const args = msg.content.slice(commandPrefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();
    if (!command) throw new Error('Unable to retrieve command from message');

    const targetCommand = commands.find((cmd) =>
      cmd.triggers.includes(command),
    );
    if (!targetCommand) {
      await embedMessage(msg, 'Wrong command', 'Use `!help` for some help...');
      return;
    }
    await targetCommand.handler({
      msg,
      command,
      args,
    });
  });
};
