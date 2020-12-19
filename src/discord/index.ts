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

const resolveReadyClient = (client: Client) => {
  return new Promise<void>((resolve) => client.on('ready', resolve));
};

export const initDiscordClient = async () => {
  const discordToken = process.env.DISCORD_TOKEN;
  if (!discordToken)
    throw new Error('Unable to retreive DISCORD_TOKEN from .env');

  const client = new Client();
  await client.login(discordToken);
  // TODO: Make sure if it works properly
  await resolveReadyClient(client);

  client.on('message', async (msg) => {
    if (!msg.content.startsWith(commandPrefix) || msg.author.bot) return;

    const args = msg.content.slice(commandPrefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();
    if (!command) throw new Error('Unable to retreive command from message');

    const targetCommand = commands.find((cmd) =>
      cmd.triggers.includes(command),
    );
    if (!targetCommand) {
      embedMessage(msg, 'Wrong command', 'Use `!help` for some help...');
      return;
    }
    await targetCommand.handler({
      msg,
      command,
      args,
    });
  });
};
